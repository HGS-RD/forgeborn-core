-- Supabase schema for Forgeborn
create schema if not exists forgeborn;

create table if not exists forgeborn.blueprints (
  id uuid primary key default gen_random_uuid(),
  rc_id text not null,
  timestamp timestamptz default now(),
  content text,
  source text,
  agent_hash text
);

create table if not exists forgeborn.agent_runs (
  id uuid primary key default gen_random_uuid(),
  rc_id text,
  agent text,
  status text,
  started_at timestamptz,
  duration_ms integer,
  output_file text
);

create table if not exists forgeborn.reflections (
  id uuid primary key default gen_random_uuid(),
  rc_id text,
  insight text,
  generated_by text,
  timestamp timestamptz default now()
);

create table if not exists forgeborn.logs (
  id uuid primary key default gen_random_uuid(),
  rc_id text,
  agent text,
  message text,
  level text,
  timestamp timestamptz default now()
);

create table if not exists forgeborn.memory_chunks (
  id uuid primary key default gen_random_uuid(),
  rc_id text,
  chunk_type text,
  content text,
  vector_embedding vector(1536),
  timestamp timestamptz default now()
);

create table if not exists forgeborn.skills (
  id uuid primary key default gen_random_uuid(),
  name text,
  generated_by_agent text,
  code text,
  used_in_rc text,
  linked_file text
);
