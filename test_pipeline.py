import chromadb
from chromadb.utils import embedding_functions
import ollama
import json

# 1. Connect to ChromaDB
client = chromadb.PersistentClient(path="./gaido_chroma_db")
emb_fn = embedding_functions.DefaultEmbeddingFunction()
collection = client.get_collection(name="gaido_destinations", embedding_function=emb_fn)

# 2. Test RAG Query
query = "Peaceful mountain trip with scenic views and low crowds on a budget"
results = collection.query(
    query_texts=[query],
    n_results=2,
    where={"crowd_index": {"$lte": 50}}
)

print("--- Retrieved Context Chunks ---")
for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
    print(f"[{meta['destination_name']} - {meta['month']} | Crowd: {meta['crowd_index']}/100]")
    print(f"{doc}\n")

# 3. Test Ollama JSON Generation
context_block = "\n".join(results["documents"][0])
prompt = f"""You are Gaido AI. Use ONLY this context to answer:
{context_block}

User request: {query}
Respond strictly in JSON with keys: "destination", "best_month", "estimated_budget_inr", "reason"."""

response = ollama.chat(
    model="llama3",
    messages=[{"role": "user", "content": prompt}],
    format="json",
    options={"temperature": 0.2}
)

print("--- Ollama Structured Output ---")
print(response['message']['content'])