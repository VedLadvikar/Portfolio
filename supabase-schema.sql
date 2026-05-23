create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table contacts enable row level security;

create policy "Allow anonymous inserts" on contacts
  for insert with check (true);


create table projects (
  id uuid default gen_random_uuid() primary key,
  number text not null,
  title text not null,
  tag text not null,
  description text not null,
  stack text[] not null,
  image_url text not null,
  live_url text default '#',
  code_url text default '#',
  featured boolean default false,
  "order" integer not null
);

alter table projects enable row level security;

create policy "Allow anonymous reads" on projects
  for select using (true);
