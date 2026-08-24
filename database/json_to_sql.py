import json, glob, os
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
OUT  = os.path.join(HERE, "gaido_seed.sql")

def q(v):
    if v is None or v == "": return "NULL"
    if isinstance(v, (int, float)): return str(v)
    return "'" + str(v).replace("'", "''") + "'"

def dig(d, *keys):
    for k in keys:
        if not isinstance(d, dict): return None
        d = d.get(k)
    return d

dests, months, attrs = {}, [], []
for path in sorted(glob.glob(os.path.join(DATA, "*.json"))):
    recs = json.load(open(path, encoding="utf-8"))
    if isinstance(recs, dict): recs = [recs]
    for r in recs:
        did = r["destination_id"]
        dests[did] = (did, r.get("destination_name"), r.get("state"))
        months.append((did, r.get("month"), r.get("month_num"),
            dig(r,"climate","avg_temp_celsius","min"), dig(r,"climate","avg_temp_celsius","max"),
            dig(r,"climate","rainfall_level"), dig(r,"climate","weather_summary"),
            dig(r,"crowd_analytics","crowd_index"), dig(r,"crowd_analytics","crowd_tier"),
            dig(r,"crowd_analytics","historical_occupancy_rate_percent"),
            dig(r,"crowd_analytics","peak_reasons_or_festivals"),
            dig(r,"budget_benchmarks_inr","budget_stay_per_night","min"),
            dig(r,"budget_benchmarks_inr","budget_stay_per_night","max"),
            dig(r,"budget_benchmarks_inr","midrange_stay_per_night","min"),
            dig(r,"budget_benchmarks_inr","midrange_stay_per_night","max"),
            dig(r,"budget_benchmarks_inr","luxury_resort_per_night","min"),
            dig(r,"budget_benchmarks_inr","luxury_resort_per_night","max"),
            dig(r,"budget_benchmarks_inr","avg_daily_meal_cost"),
            dig(r,"budget_benchmarks_inr","avg_local_commute_per_day"),
            dig(r,"target_user_fit","solo_backpackers"), dig(r,"target_user_fit","budget_students"),
            dig(r,"target_user_fit","families_with_kids"), dig(r,"target_user_fit","elderly_accessibility"),
            r.get("health_and_safety_advisory"), r.get("rag_chunk_text")))
        for a in r.get("key_attractions_status") or []:
            attrs.append((did, r.get("month_num"), a.get("name"), a.get("status"), a.get("crowd")))

L = ["-- Gaido seed data", ""]
L.append("insert into destinations (destination_id, destination_name, state) values")
L.append(",\n".join("  (" + ", ".join(q(v) for v in r) + ")" for r in dests.values()) + ";")
L.append("")
cols = ("destination_id, month, month_num, temp_min_c, temp_max_c, rainfall_level, weather_summary, "
        "crowd_index, crowd_tier, occupancy_rate_percent, peak_reasons, budget_stay_min, budget_stay_max, "
        "midrange_stay_min, midrange_stay_max, luxury_stay_min, luxury_stay_max, avg_daily_meal_cost, "
        "avg_local_commute_cost, fit_solo_backpackers, fit_budget_students, fit_families_with_kids, "
        "fit_elderly, advisory, rag_chunk_text")
L.append("insert into destination_months (" + cols + ") values")
L.append(",\n".join("  (" + ", ".join(q(v) for v in r) + ")" for r in months) + ";")
L.append("")
L.append("insert into attraction_status (destination_id, month_num, attraction_name, status, crowd) values")
L.append(",\n".join("  (" + ", ".join(q(v) for v in r) + ")" for r in attrs) + ";")
open(OUT, "w", encoding="utf-8").write("\n".join(L))
print("Destinations:       %d" % len(dests))
print("Destination-months: %d" % len(months))
print("Attractions:        %d" % len(attrs))
print("Written to:", OUT)
