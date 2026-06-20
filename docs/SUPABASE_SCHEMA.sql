-- Atletico Xeneizes admin schema v1
-- Run this in Supabase SQL Editor after creating the project.

create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('News', 'Comunicato', 'Match report')),
  title text not null,
  excerpt text not null default '',
  author text not null default 'Atletico Xeneizes',
  cover_image_src text not null default '',
  cover_image_alt text not null default '',
  content jsonb not null default '[]'::jsonb,
  published_at timestamptz not null default now(),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.players (
  id text primary key,
  name text not null,
  role text not null check (role in ('Portiere', 'Difensore', 'Centrocampista', 'Attaccante')),
  number integer,
  photo_src text not null default '',
  photo_alt text not null default '',
  bio text not null default '',
  appearances integer not null default 0,
  goals integer not null default 0,
  assists integer,
  yellow_cards integer not null default 0,
  red_cards integer not null default 0,
  own_goals integer not null default 0,
  best_player_awards integer,
  best_goalkeeper_awards integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matches (
  id text primary key,
  season text not null,
  competition text not null,
  phase text not null,
  round text not null,
  match_date date not null,
  kickoff text not null default '',
  home text not null,
  away text not null,
  venue text not null default '',
  score text,
  status text not null check (status in ('played', 'scheduled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.standings (
  id uuid primary key default gen_random_uuid(),
  position integer not null,
  season text not null,
  competition text not null,
  team text not null,
  played integer not null default 0,
  wins integer not null default 0,
  draws integer not null default 0,
  losses integer not null default 0,
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  points integer not null default 0,
  difference integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text not null default '',
  description text not null default '',
  href text,
  logo_src text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('Foto', 'Video')),
  title text not null,
  image text not null default '',
  alt text not null default '',
  href text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news_articles enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.standings enable row level security;
alter table public.sponsors enable row level security;
alter table public.media_items enable row level security;

create policy "Authenticated users can manage news" on public.news_articles for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage players" on public.players for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage matches" on public.matches for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage standings" on public.standings for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage sponsors" on public.sponsors for all to authenticated using (true) with check (true);
create policy "Authenticated users can manage media" on public.media_items for all to authenticated using (true) with check (true);
