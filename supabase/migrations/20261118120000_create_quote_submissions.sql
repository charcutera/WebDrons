create table if not exists public.quote_submissions (
  id uuid primary key,
  form_data jsonb not null,
  drones jsonb not null,
  submitted_at timestamptz not null default now()
);

alter table public.quote_submissions enable row level security;
revoke all on table public.quote_submissions from anon, authenticated;
grant all on table public.quote_submissions to service_role;
