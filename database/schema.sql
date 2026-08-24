-- Gaido | Team ORBIT | SIH 2026
-- Schema for Supabase (PostgreSQL). Paste into SQL Editor and run.

drop table if exists attraction_status cascade;
drop table if exists destination_months cascade;
drop table if exists destinations cascade;

create table destinations (
    destination_id    text primary key,
    destination_name  text not null,
    state             text not null
);

create table destination_months (
    id                      bigserial primary key,
    destination_id          text not null references destinations(destination_id)
                              on delete cascade on update cascade,
    month                   text not null,
    month_num               smallint not null check (month_num between 1 and 12),
    temp_min_c              smallint,
    temp_max_c              smallint,
    rainfall_level          text,
    weather_summary         text,
    crowd_index             smallint check (crowd_index between 0 and 100),
    crowd_tier              text,
    occupancy_rate_percent  smallint,
    peak_reasons            text,
    budget_stay_min         integer,
    budget_stay_max         integer,
    midrange_stay_min       integer,
    midrange_stay_max       integer,
    luxury_stay_min         integer,
    luxury_stay_max         integer,
    avg_daily_meal_cost     integer,
    avg_local_commute_cost  integer,
    fit_solo_backpackers    text,
    fit_budget_students     text,
    fit_families_with_kids  text,
    fit_elderly             text,
    advisory                text,
    rag_chunk_text          text,
    unique (destination_id, month_num)
);

create table attraction_status (
    id                  bigserial primary key,
    destination_id      text not null references destinations(destination_id)
                          on delete cascade on update cascade,
    month_num           smallint not null check (month_num between 1 and 12),
    attraction_name     text not null,
    status              text,
    crowd               text
);

create index idx_dm_dest         on destination_months (destination_id);
create index idx_dm_month        on destination_months (month_num);
create index idx_dm_crowd        on destination_months (crowd_index);
create index idx_attr_dest_month on attraction_status (destination_id, month_num);

create or replace view best_months as
select distinct on (destination_id)
       destination_id, month, month_num, crowd_index, crowd_tier
from   destination_months
order  by destination_id, crowd_index asc;

-- Read-only access for the app's anon key
create policy "public read destinations" on destinations
  for select to anon, authenticated using (true);
create policy "public read months" on destination_months
  for select to anon, authenticated using (true);
create policy "public read attractions" on attraction_status
  for select to anon, authenticated using (true);
