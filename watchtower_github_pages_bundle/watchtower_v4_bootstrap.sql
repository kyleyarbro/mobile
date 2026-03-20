create table if not exists public.watchtower_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  bail_intake_id uuid not null references public.bail_intakes(id) on delete cascade,
  event_type text,
  event_label text,
  details text
);

create index if not exists idx_watchtower_events_bail_intake_id
  on public.watchtower_events (bail_intake_id);

create index if not exists idx_watchtower_events_created_at
  on public.watchtower_events (created_at desc);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.bail_intakes to anon, authenticated;
grant select, insert, update, delete on table public.watchtower_events to anon, authenticated;

alter table public.bail_intakes enable row level security;
alter table public.watchtower_events enable row level security;

drop policy if exists "watchtower_open_access" on public.bail_intakes;
drop policy if exists "watchtower_events_open_access" on public.watchtower_events;

create policy "watchtower_open_access"
on public.bail_intakes
for all
to anon, authenticated
using (true)
with check (true);

create policy "watchtower_events_open_access"
on public.watchtower_events
for all
to anon, authenticated
using (true)
with check (true);
