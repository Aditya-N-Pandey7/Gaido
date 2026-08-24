import json
import chromadb
from chromadb.utils import embedding_functions
import ollama

# -------------------------------------------------------------
# 1. INITIALIZE CHROMADB PERSISTENT CLIENT (STAGE 4)
# -------------------------------------------------------------
client = chromadb.PersistentClient(path="./gaido_chroma_db")

# Default local dense embedding (all-MiniLM-L6-v2)
emb_fn = embedding_functions.DefaultEmbeddingFunction()

collection = client.get_or_create_collection(
    name="gaido_destinations",
    embedding_function=emb_fn,
    metadata={"hnsw:space": "cosine"}
)

# -------------------------------------------------------------
# 2. INGEST & FLATTEN JSON DATA
# -------------------------------------------------------------
def ingest_destination_json(json_data: list):
    documents = []
    metadatas = []
    ids = []

    for item in json_data:
        doc_id = f"{item['destination_id']}_{item['month'].lower()}"
        
        # Flattened metadata fields for strict filtering
        metadata = {
            "destination_id": str(item.get("destination_id")),
            "destination_name": str(item.get("destination_name")),
            "state": str(item.get("state")),
            "month": str(item.get("month")),
            "month_num": int(item.get("month_num")),
            "crowd_index": int(item["crowd_analytics"]["crowd_index"]),
            "crowd_tier": str(item["crowd_analytics"]["crowd_tier"]),
            "min_budget_stay": int(item["budget_benchmarks_inr"]["budget_stay_per_night"]["min"]),
            "max_budget_stay": int(item["budget_benchmarks_inr"]["budget_stay_per_night"]["max"]),
            "avg_meal_cost": int(item["budget_benchmarks_inr"]["avg_daily_meal_cost"]),
            "avg_commute_cost": int(item["budget_benchmarks_inr"]["avg_local_commute_per_day"]),
            "solo_fit": str(item["target_user_fit"]["solo_backpackers"]),
            "budget_student_fit": str(item["target_user_fit"]["budget_students"]),
            "family_fit": str(item["target_user_fit"]["families_with_kids"]),
            "elderly_fit": str(item["target_user_fit"]["elderly_accessibility"]),
        }

        # The dense text chunk used for semantic similarity
        chunk_text = item.get("rag_chunk_text", "")

        ids.append(doc_id)
        documents.append(chunk_text)
        metadatas.append(metadata)

    # Upsert prevents duplication on repeated runs
    collection.upsert(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )
    print(f"Successfully ingested {len(ids)} monthly records into ChromaDB.")

# -------------------------------------------------------------
# 3. HYBRID RETRIEVAL FUNCTION (STAGE 4)
# -------------------------------------------------------------
def retrieve_travel_context(query: str, destination: str = None, max_crowd_index: int = None, n_results: int = 3):
    where_filters = []

    if destination:
        where_filters.append({"destination_name": {"$eq": destination}})
    if max_crowd_index is not None:
        where_filters.append({"crowd_index": {"$lte": max_crowd_index}})

    # Combine ChromaDB where-clauses
    if len(where_filters) == 1:
        where_clause = where_filters[0]
    elif len(where_filters) > 1:
        where_clause = {"$and": where_filters}
    else:
        where_clause = None

    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where=where_clause
    )
    return results

# -------------------------------------------------------------
# 4. ON-PREMISES LLM INFERENCE (STAGE 5)
# -------------------------------------------------------------
def generate_gaido_plan(user_query: str, destination: str = None, max_crowd: int = None, budget: int = 25000):
    # Step A: Retrieve RAG chunks
    retrieval_res = retrieve_travel_context(
        query=user_query,
        destination=destination,
        max_crowd_index=max_crowd,
        n_results=3
    )

    retrieved_docs = retrieval_res["documents"][0]
    retrieved_meta = retrieval_res["metadatas"][0]

    context_str = "\n\n".join([
        f"[Record {i+1}] Destination: {meta['destination_name']} | Month: {meta['month']} | Crowd Index: {meta['crowd_index']}/100\nDetails: {doc}"
        for i, (doc, meta) in enumerate(zip(retrieved_docs, retrieved_meta))
    ])

    # Step B: Construct Strict Prompt
    system_prompt = f"""You are Gaido, an on-premises AI travel companion.
Use ONLY the provided retrieved context below to answer the user's travel request. Do not hallucinate external dates, pricing, or safety details.

Retrieved Context:
{context_str}

User Budget: INR ₹{budget}
User Query: {user_query}

You must return a valid JSON object matching this schema:
{{
  "recommended_destination": "string",
  "optimal_travel_month": "string",
  "crowd_index_score": 0,
  "climate_and_experience": "string",
  "estimated_budget_breakdown": {{
    "stay_cost": 0,
    "meals_and_commute": 0,
    "activities_and_buffer": 0,
    "total_estimated_inr": 0
  }},
  "health_and_safety_tips": "string",
  "recommended_itinerary_highlights": ["Day 1: ...", "Day 2: ...", "Day 3: ..."]
}}"""

    # Step C: Execute local inference via Ollama
    response = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": system_prompt}],
        options={"temperature": 0.2},
        format="json"
    )

    return response['message']['content']

# -------------------------------------------------------------
# 5. EXECUTION EXAMPLE
# -------------------------------------------------------------
if __name__ == "__main__":
    # Load and ingest Member 1's destination data:
    # with open("goa.json") as f:
    #     ingest_destination_json(json.load(f))

    # Example Query
    query = "Looking for a quiet, low-crowd trip with scenic waterfalls and affordable homestays."
    plan_json = generate_gaido_plan(
        user_query=query,
        destination="Goa",
        max_crowd=30,
        budget=18000
    )
    print(plan_json)