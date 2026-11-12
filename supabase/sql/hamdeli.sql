-- Hamdeli: the people and shelters ZAND points readers towards.
--
-- Everything here is handpicked. There is no submission path and no
-- public write policy, deliberately: the section only means something
-- while every profile in it has been looked at by a person.
--
-- Money never moves through the app. donate_url opens a browser, which
-- is both what Apple requires of donations and what keeps ZAND out of
-- the middle of someone else's fundraising.
--
-- No begin/commit: the Supabase editor wraps the last statement, and a
-- trailing commit fails after everything has already run.

create table if not exists public.hamdeli (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,

  -- Who they are. Persian is written rather than translated, so both
  -- columns are authored and neither is derived from the other.
  name        text not null,
  name_fa     text,
  city        text,
  city_fa     text,

  -- animals | people | children | other. Kept as plain text rather than
  -- an enum so adding a kind is an edit, not a migration.
  kind        text not null default 'other',

  -- One line on the list, a few paragraphs on the page.
  blurb       text not null,
  blurb_fa    text,
  story       text,
  story_fa    text,

  -- The concrete thing that helps. "Food for forty dogs through winter"
  -- reads as a fact; "any support welcome" reads as noise.
  need        text,
  need_fa     text,

  cover       text,            -- path inside the hamdeli storage bucket
  instagram   text,            -- handle, no @
  website     text,
  donate_url  text,
  youtube_ids text[] not null default '{}',

  -- Admin-only, never rendered: who agreed to be featured and when.
  -- A record of permission is worth more than remembering you asked.
  consent_note text,

  published   boolean not null default false,
  sort        int not null default 0,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists hamdeli_published_sort
  on public.hamdeli (published, sort);

alter table public.hamdeli enable row level security;

-- Replace rather than add. Policies are permissive and OR'd together, so
-- a new one beside an old one widens access instead of narrowing it.
drop policy if exists hamdeli_read      on public.hamdeli;
drop policy if exists hamdeli_admin_all on public.hamdeli;

-- Signed in or not: a published profile is public, an unpublished one
-- does not exist.
create policy hamdeli_read on public.hamdeli
  for select to anon, authenticated
  using (published);

create policy hamdeli_admin_all on public.hamdeli
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- updated_at, kept honest by the database rather than by every caller.
create or replace function public.touch_hamdeli()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists hamdeli_touch on public.hamdeli;
create trigger hamdeli_touch
  before update on public.hamdeli
  for each row execute function public.touch_hamdeli();

/* ============================================================
   Covers
   ============================================================ */

insert into storage.buckets (id, name, public)
values ('hamdeli', 'hamdeli', true)
on conflict (id) do update set public = true;

drop policy if exists hamdeli_cover_read  on storage.objects;
drop policy if exists hamdeli_cover_write on storage.objects;

create policy hamdeli_cover_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'hamdeli');

create policy hamdeli_cover_write on storage.objects
  for all to authenticated
  using (bucket_id = 'hamdeli' and public.is_admin())
  with check (bucket_id = 'hamdeli' and public.is_admin());

-- Check: the table, its policies, and the bucket.
select
  (select count(*) from public.hamdeli)                              as profiles,
  (select count(*) from pg_policies
     where schemaname = 'public' and tablename = 'hamdeli')          as table_policies,
  (select count(*) from storage.buckets where id = 'hamdeli')        as bucket;
