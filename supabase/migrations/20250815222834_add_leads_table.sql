create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  source text,
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

drop policy if exists "allow anon inserts" on public.leads;
create policy "allow anon inserts"
  on public.leads
  for insert
  to anon
  with check (true);