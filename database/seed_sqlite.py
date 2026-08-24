import os
import glob
import json
import sqlite3

# Always locate gaido_relational.db in the project root
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
DB_PATH = os.path.join(ROOT_DIR, "gaido_relational.db")

def build_sqlite_database():
    if os.path.exists(DB_PATH):
        try:
            os.remove(DB_PATH)
        except PermissionError:
            pass

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Enable foreign keys
    cursor.execute("PRAGMA foreign_keys = ON;")

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS destinations (
        destination_id TEXT PRIMARY KEY,
        destination_name TEXT NOT NULL,
        state TEXT
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS destination_months (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        destination_id TEXT,
        month TEXT,
        month_num INTEGER,
        min_temp INTEGER,
        max_temp INTEGER,
        crowd_index INTEGER,
        crowd_level TEXT,
        hotel_occupancy_pct INTEGER,
        optimal_window_description TEXT,
        min_budget_stay INTEGER,
        max_budget_stay INTEGER,
        avg_meal_cost INTEGER,
        local_commute_cost INTEGER,
        safety_advisory TEXT,
        chunk_text TEXT,
        FOREIGN KEY (destination_id) REFERENCES destinations (destination_id),
        UNIQUE(destination_id, month_num)
    );
    """)

    # Find all JSON files across root, data/, and database/ folders
    json_candidates = (
        glob.glob(os.path.join(ROOT_DIR, "data", "*.json")) +
        glob.glob(os.path.join(ROOT_DIR, "database", "**", "*.json"), recursive=True) +
        glob.glob(os.path.join(ROOT_DIR, "*.json"))
    )
    # Exclude npm config files
    json_files = [f for f in set(json_candidates) if not any(x in os.path.basename(f) for x in ["package", "tsconfig", "package-lock"])]

    for filepath in json_files:
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)

            # Support list of dicts (which is what we have in Gaido files)
            if isinstance(data, list):
                for item in data:
                    dest_id = item.get("destination_id")
                    dest_name = item.get("destination_name")
                    state = item.get("state", "India")
                    if not dest_id or not dest_name:
                        continue

                    cursor.execute(
                        "INSERT OR REPLACE INTO destinations (destination_id, destination_name, state) VALUES (?, ?, ?)",
                        (dest_id, dest_name, state)
                    )

                    climate = item.get("climate", {})
                    avg_temp = climate.get("avg_temp_celsius", {})
                    crowd_analytics = item.get("crowd_analytics", {})
                    budget_benchmarks = item.get("budget_benchmarks_inr", {})
                    budget_stay = budget_benchmarks.get("budget_stay_per_night", {})

                    cursor.execute("""
                    INSERT OR REPLACE INTO destination_months (
                        destination_id, month, month_num, min_temp, max_temp, crowd_index,
                        crowd_level, hotel_occupancy_pct, optimal_window_description,
                        min_budget_stay, max_budget_stay, avg_meal_cost, local_commute_cost,
                        safety_advisory, chunk_text
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        dest_id,
                        item.get("month", "Unknown"),
                        int(item.get("month_num", 1)),
                        int(avg_temp.get("min", avg_temp.get("min_temp", 20))),
                        int(avg_temp.get("max", avg_temp.get("max_temp", 30))),
                        int(crowd_analytics.get("crowd_index", 50)),
                        crowd_analytics.get("crowd_tier", crowd_analytics.get("crowd_level", "Moderate")),
                        int(crowd_analytics.get("historical_occupancy_rate_percent", crowd_analytics.get("hotel_occupancy_pct", 50))),
                        climate.get("weather_summary", climate.get("optimal_window_description", "")),
                        int(budget_stay.get("min", budget_benchmarks.get("min_budget_stay", 1200))),
                        int(budget_stay.get("max", budget_benchmarks.get("max_budget_stay", 3500))),
                        int(budget_benchmarks.get("avg_daily_meal_cost", budget_benchmarks.get("avg_meal_cost", 500))),
                        int(budget_benchmarks.get("avg_local_commute_per_day", budget_benchmarks.get("local_commute_cost", 600))),
                        item.get("health_and_safety_advisory", item.get("safety_advisory", "Standard precautions apply.")),
                        item.get("rag_chunk_text", item.get("chunk_text", ""))
                    ))

            # Support dict format (original fallback)
            elif isinstance(data, dict):
                if "destination_name" in data or "months" in data or "monthly_data" in data:
                    dest_name = data.get("destination_name", os.path.splitext(os.path.basename(filepath))[0].capitalize())
                    dest_id = data.get("destination_id", dest_name.lower().replace(" ", "_"))
                    state = data.get("state", "India")

                    cursor.execute(
                        "INSERT OR REPLACE INTO destinations (destination_id, destination_name, state) VALUES (?, ?, ?)",
                        (dest_id, dest_name, state)
                    )

                    months_list = data.get("months", data.get("monthly_data", []))
                    for m in months_list:
                        cursor.execute("""
                        INSERT OR REPLACE INTO destination_months (
                            destination_id, month, month_num, min_temp, max_temp, crowd_index,
                            crowd_level, hotel_occupancy_pct, optimal_window_description,
                            min_budget_stay, max_budget_stay, avg_meal_cost, local_commute_cost,
                            safety_advisory, chunk_text
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            dest_id,
                            m.get("month", "Unknown"),
                            int(m.get("month_num", 1)),
                            int(m.get("min_temp_c", m.get("min_temp", 20))),
                            int(m.get("max_temp_c", m.get("max_temp", 30))),
                            int(m.get("crowd_index", 50)),
                            m.get("crowd_level", m.get("crowd_tier", "Moderate")),
                            int(m.get("hotel_occupancy_pct", m.get("hotel_occupancy", 50))),
                            m.get("optimal_window_description", m.get("description", "")),
                            int(m.get("min_budget_stay", 1200)),
                            int(m.get("max_budget_stay", 3500)),
                            int(m.get("avg_meal_cost", 500)),
                            int(m.get("local_commute_cost", 600)),
                            m.get("safety_advisory", "Standard precautions apply."),
                            m.get("chunk_text", m.get("description", ""))
                        ))
        except Exception as e:
            print(f"Skipping {filepath}: {e}")

    conn.commit()

    # Query to count final inserted rows directly from DB
    cursor.execute("SELECT COUNT(*) FROM destinations")
    dest_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM destination_months")
    month_count = cursor.fetchone()[0]

    conn.close()

    print(f"Database successfully populated!")
    print(f"Destinations inserted:       {dest_count}")
    print(f"Monthly records inserted:    {month_count}")

if __name__ == "__main__":
    build_sqlite_database()