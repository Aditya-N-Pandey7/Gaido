import json
from typing import List, Optional
import chromadb
from chromadb.utils import embedding_functions
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama
from pydantic import BaseModel, Field

# -------------------------------------------------------------
# 1. APP & CORS SETUP
# -------------------------------------------------------------
app = FastAPI(title="Gaido AI Engine", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# 2. CHROMADB CONNECTION
# -------------------------------------------------------------
client = chromadb.PersistentClient(path="./gaido_chroma_db")
emb_fn = embedding_functions.DefaultEmbeddingFunction()
collection = client.get_collection(
    name="gaido_destinations", embedding_function=emb_fn
)

# -------------------------------------------------------------
# 3. REQUEST & RESPONSE SCHEMAS
# -------------------------------------------------------------
class PlanRequest(BaseModel):
    query: str
    destination: Optional[str] = None
    max_crowd: Optional[int] = None
    budget: Optional[int] = 25000

class BudgetBreakdown(BaseModel):
    stay: int = Field(default=0)
    food_and_local_travel: int = Field(default=0)
    buffer: int = Field(default=0)
    total: int = Field(default=0)

class TravelPlanOutput(BaseModel):
    destination: str
    recommended_month: str
    crowd_index: int
    summary: str
    budget_breakdown: BudgetBreakdown
    itinerary_highlights: List[str]
    health_and_safety_advisory: str

# -------------------------------------------------------------
# 4. API ROUTE: /api/plan
# -------------------------------------------------------------
@app.post("/api/plan", response_model=TravelPlanOutput)
async def generate_plan(req: PlanRequest):
    try:
        # Step A: Build ChromaDB Filters
        where_filters = []
        if req.destination:
            where_filters.append({"destination_name": {"$eq": req.destination}})
        if req.max_crowd is not None:
            where_filters.append({"crowd_index": {"$lte": req.max_crowd}})

        where_clause = None
        if len(where_filters) == 1:
            where_clause = where_filters[0]
        elif len(where_filters) > 1:
            where_clause = {"$and": where_filters}

        # Step B: Retrieve Top Context from ChromaDB
        search_res = collection.query(
            query_texts=[req.query],
            n_results=3,
            where=where_clause
        )

        docs = search_res["documents"][0] if search_res["documents"] else []
        metas = search_res["metadatas"][0] if search_res["metadatas"] else []

        if not docs:
            raise HTTPException(
                status_code=404,
                detail="No destination matching your filter criteria was found."
            )

        context_str = "\n\n".join([
            f"[Destination: {m['destination_name']} | Month: {m['month']} | Crowd: {m['crowd_index']}/100]\n{d}"
            for d, m in zip(docs, metas)
        ])

        # Step C: Formulate Strict Prompt
        system_prompt = f"""You are Gaido, an on-premises AI travel planner for India.
Use ONLY the context below to generate the travel plan. Do not hallucinate external pricing or details.

Context:
{context_str}

User Budget: INR ₹{req.budget}
User Preferences: {req.query}

Respond strictly in valid JSON matching this structure:
{{
  "destination": "string",
  "recommended_month": "string",
  "crowd_index": 0,
  "summary": "string",
  "budget_breakdown": {{
    "stay": 0,
    "food_and_local_travel": 0,
    "buffer": 0,
    "total": 0
  }},
  "itinerary_highlights": ["Highlight 1", "Highlight 2"],
  "health_and_safety_advisory": "string"
}}"""

        # Step D: Execute Local Ollama LLM Inference
        response = ollama.chat(
            model="llama3",
            messages=[{"role": "user", "content": system_prompt}],
            options={"temperature": 0.2},
            format="json"
        )

        # Step E: Schema Validation & Graceful Fallback
        try:
            parsed_json = json.loads(response['message']['content'])
            validated_plan = TravelPlanOutput(**parsed_json)
            return validated_plan.model_dump()
        except Exception:
            top_meta = metas[0]
            stay_calc = int(top_meta.get("min_budget_stay", 1500)) * 3
            travel_calc = int(top_meta.get("avg_meal_cost", 600)) * 3
            return TravelPlanOutput(
                destination=top_meta.get("destination_name", "Destination"),
                recommended_month=top_meta.get("month", "Optimal Window"),
                crowd_index=int(top_meta.get("crowd_index", 50)),
                summary=docs[0][:250] + "...",
                budget_breakdown=BudgetBreakdown(
                    stay=stay_calc,
                    food_and_local_travel=travel_calc,
                    buffer=2000,
                    total=stay_calc + travel_calc + 2000
                ),
                itinerary_highlights=[
                    "Scenic local exploration",
                    "Off-peak sightseeing activities"
                ],
                health_and_safety_advisory="Check local weather advisories before traveling."
            ).model_dump()

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------------------------------------------------------------
# 5. ENTRYPOINT
# -------------------------------------------------------------
# ... (all your existing code, imports, schemas, and @app.post("/api/plan"))

# -------------------------------------------------------------
# 5. HEALTH CHECK ROUTE (Add it here)
# -------------------------------------------------------------
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "chromadb_records": collection.count(),
        "llm_engine": "Ollama / Llama3"
    }

# -------------------------------------------------------------
# 6. ENTRYPOINT (Keep this at the very bottom)
# -------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)