import json
import glob
import os
import chromadb
from chromadb.utils import embedding_functions

# Initialize persistent local storage
client = chromadb.PersistentClient(path="./gaido_chroma_db")
emb_fn = embedding_functions.DefaultEmbeddingFunction()

collection = client.get_or_create_collection(
    name="gaido_destinations",
    embedding_function=emb_fn,
    metadata={"hnsw:space": "cosine"}
)

def run_ingestion():
    json_files = glob.glob("./data/*.json")
    if not json_files:
        print("No JSON files found in ./data/")
        return

    total_records = 0
    for file_path in json_files:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        ids, documents, metadatas = [], [], []
        for item in data:
            doc_id = f"{item['destination_id']}_{item['month'].lower()}"
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
                "avg_commute_cost": int(item["budget_benchmarks_inr"]["avg_local_commute_per_day"])
            }
            ids.append(doc_id)
            documents.append(item.get("rag_chunk_text", ""))
            metadatas.append(metadata)

        collection.upsert(ids=ids, documents=documents, metadatas=metadatas)
        total_records += len(ids)
        print(f"Indexed {len(ids)} records from {os.path.basename(file_path)}")

    print(f"\nIngestion Complete! Total {total_records} records in ChromaDB.")

if __name__ == "__main__":
    run_ingestion()