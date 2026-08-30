-- ZOVRO TECH Supabase setup
-- Run this whole file in Supabase Dashboard -> SQL Editor -> Run.
-- It creates public form tables plus protected admin RPCs.
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  message text default '',
  status text not null default 'new' check (status in ('new','contacted','converted')),
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  preferred_date date not null,
  preferred_time text not null,
  message text default '',
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists appointments_created_at_idx on public.appointments(created_at desc);

alter table public.leads enable row level security;
alter table public.appointments enable row level security;

drop policy if exists "public can submit leads" on public.leads;
create policy "public can submit leads" on public.leads for insert to anon, authenticated with check (true);

drop policy if exists "public can submit appointments" on public.appointments;
create policy "public can submit appointments" on public.appointments for insert to anon, authenticated with check (true);

create table if not exists public.admin_credentials (
  username text primary key,
  password_hash text not null
);
alter table public.admin_credentials enable row level security;

-- Creates the requested login:
-- username: zovrotech
-- password: zovro@1234
insert into public.admin_credentials(username,password_hash)
values ('zovrotech', crypt('zovro@1234', gen_salt('bf')))
on conflict(username) do update set password_hash=excluded.password_hash;

create or replace function public.admin_login(p_username text,p_password text)
returns jsonb
language plpgsql
security definer
set search_path=public,extensions
as $$
declare ok boolean;
begin
  select exists(
    select 1 from public.admin_credentials
    where username=p_username and password_hash=crypt(p_password,password_hash)
  ) into ok;
  return jsonb_build_object('ok',ok);
end $$;

create or replace function public.admin_get_dashboard(p_username text,p_password text)
returns jsonb
language plpgsql
security definer
set search_path=public,extensions
as $$
declare ok boolean; total_l integer; new_l integer; contacted_l integer; converted_l integer;
begin
  select exists(select 1 from public.admin_credentials where username=p_username and password_hash=crypt(p_password,password_hash)) into ok;
  if not ok then return jsonb_build_object('ok',false); end if;

  select count(*) into total_l from public.leads;
  select count(*) into new_l from public.leads where status='new';
  select count(*) into contacted_l from public.leads where status='contacted';
  select count(*) into converted_l from public.leads where status='converted';

  return jsonb_build_object(
    'ok',true,
    'metrics',jsonb_build_object('total_leads',total_l,'appointments',(select count(*) from public.appointments),'new_leads',new_l,'contacted',contacted_l,'converted',converted_l),
    'leads',coalesce((select jsonb_agg(x order by x.created_at desc) from (select id,name,email,phone,service,status,created_at from public.leads order by created_at desc limit 100)x),'[]'::jsonb),
    'appointments',coalesce((select jsonb_agg(x order by x.created_at desc) from (select id,name,email,phone,service,preferred_date,preferred_time,status,created_at from public.appointments order by created_at desc limit 100)x),'[]'::jsonb),
    'activity',coalesce((select jsonb_agg(c order by day) from (select date(created_at) day,count(*) c from public.leads where created_at >= now()-interval '7 days' group by date(created_at))a),'[]'::jsonb)
  );
end $$;

revoke all on function public.admin_login(text,text) from public;
grant execute on function public.admin_login(text,text) to anon,authenticated;
revoke all on function public.admin_get_dashboard(text,text) from public;
grant execute on function public.admin_get_dashboard(text,text) to anon,authenticated;

-- Optional: if your old tables already exist with different columns,
-- either rename them or adapt the two INSERT queries in assets/js/app.js.
