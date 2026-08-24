import json
import os
import glob

DATA_DIR = "data"
OUTPUT_SQL = "database/gaido_seed.sql"

os.makedirs("database", exist_ok=True)

sql_statements = []

# Standard SQLite Table Creation
sql_statements.append("""
DROP TABLE IF EXISTS destination_months;
DROP TABLE IF EXISTS destinations;

CREATE TABLE destinations (
    destination_id TEXT PRIMARY KEY,
    destination_name TEXT NOT NULL,
    state TEXT,
    tier_level INTEGER,
    airport_code TEXT
);

CREATE TABLE destination_months (
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
    FOREIGN KEY (destination_id) REFERENCES destinations (destination_id)
);
""")

json_files = glob.glob(os.path.join(DATA_DIR, "*.json"))
dest_count = 0
month_count = 0

for filepath in json_files:
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    dest_name = data.get("destination_name", os.path.splitext(os.path.basename(filepath))[0].capitalize())
    dest_id = dest_name.lower().replace(" ", "_")
    state = data.get("state", "India")
    
    # Escape single quotes
    dest_name_clean = dest_name.replace("'", "''")
    state_clean = state.replace("'", "''")
    
    sql_statements.append(
        f"INSERT INTO destinations (destination_id, destination_name, state) "
        f"VALUES ('{dest_id}', '{dest_name_clean}', '{state_clean}');"
    )
    dest_count += 1
    
    # Process monthly records
    monthly_data = data.get("months", data.get("monthly_data", []))
    for m in monthly_data:
        month = m.get("month", "Unknown")
        month_num = int(m.get("month_num", 1))
        min_temp = int(m.get("min_temp_c", m.get("min_temp", 20)))
        max_temp = int(m.get("max_temp_c", m.get("max_temp", 30)))
        crowd_index = int(m.get("crowd_index", 50))
        crowd_level = str(m.get("crowd_level", "Moderate")).replace("'", "''")
        occupancy = int(m.get("hotel_occupancy_pct", m.get("hotel_occupancy", 50)))
        desc = str(m.get("optimal_window_description", m.get("description", ""))).replace("'", "''")
        stay_min = int(m.get("min_budget_stay", 1200))
        stay_max = int(m.get("max_budget_stay", 3500))
        meal = int(m.get("avg_meal_cost", 500))
        commute = int(m.get("local_commute_cost", 600))
        safety = str(m.get("safety_advisory", "Standard precautions apply.")).replace("'", "''")
        chunk = str(m.get("chunk_text", desc)).replace("'", "''")

        sql_statements.append(
            f"INSERT INTO destination_months ("
            f"destination_id, month, month_num, min_temp, max_temp, crowd_index, "
            f"crowd_level, hotel_occupancy_pct, optimal_window_description, "
            f"min_budget_stay, max_budget_stay, avg_meal_cost, local_commute_cost, "
            f"safety_advisory, chunk_text) VALUES ("
            f"'{dest_id}', '{month}', {month_num}, {min_temp}, {max_temp}, {crowd_index}, "
            f"'{crowd_level}', {occupancy}, '{desc}', {stay_min}, {stay_max}, {meal}, "
            f"{commute}, '{safety}', '{chunk}');"
        )
        month_count += 1

with open(OUTPUT_SQL, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_statements))

print(f"Generated SQLite Seed Data:")
print(f"Destinations:       {dest_count}")
print(f"Destination-months: {month_count}")
print(f"Written to:         {OUTPUT_SQL}")