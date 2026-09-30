-- One name in one city, one listing.
--
-- The form checks this as somebody types, which is where it is useful.
-- This is the part that makes it true: two people submitting the same name
-- within a second of each other both pass a check that reads the table and
-- then writes to it, and only the database can settle that.
--
-- Scoped to the city, not to the name alone. The first run of this found
-- Cult Gaia in Cannes and Cult Gaia in New York, which is not a duplicate,
-- it is a brand with two shops — and refusing the second would mean asking
-- its owner to call it something it is not. Two listings of the same name in
-- the same city is the case that is nearly always a mistake, and that is
-- what this refuses. The same name in another city goes through and the
-- admin is told, which is the franchise question answered by a person.
--
-- The flattening has to agree with nameKey() in lib/listing-names.ts. Same
-- steps, same order: lower case, Persian and Arabic digits folded to
-- Latin, the letters people type two ways settled on one, everything that
-- is not a letter or a digit turned into a space, and the words that carry
-- no identity dropped.
--
-- No begin/commit: the Supabase editor wraps the last statement, and a
-- trailing commit fails after everything has already run.

create or replace function public.listing_name_key(raw text)
returns text
language sql
immutable
as $$
  with lowered as (
    select lower(coalesce(raw, '')) as v
  ),
  digits as (
    select translate(v,
      '۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩',
      '01234567890123456789') as v
    from lowered
  ),
  marks as (
    -- Tashkeel, and the maddah and hamza that sit above an alef. Those are
    -- part of the letter rather than an accent on it, and a mark left
    -- behind is not a letter, so the cleanup below would turn it into a
    -- space and split a Persian word in two.
    select regexp_replace(v, E'[\u064B-\u065F\u0670\u06D6-\u06ED]', '', 'g') as v
    from digits
  ),
  letters as (
    -- Letters people type two ways, and the zero-width marks a Persian
    -- keyboard scatters through a name.
    select regexp_replace(
             translate(v,
               E'\u0649\u064A\u0626\u0643\u0629\u0624\u0623\u0625\u0622\u0671',
               E'\u06CC\u06CC\u06CC\u06A9\u0647\u0648\u0627\u0627\u0627\u0627'),
             E'[\u200B-\u200F\u2060\uFEFF]', '', 'g') as v
    from marks
  ),
  folded as (
    -- Accents off, so Cafe and Cafe with an acute are one word. The app
    -- does it by decomposing and dropping the combining marks; here it is
    -- a plain substitution, and the two have to keep agreeing or the form
    -- and the index will disagree about what counts as a duplicate.
    select translate(v,
      'àáâãäåāăąèéêëēĕėęěìíîïĩīĭįıòóôõöøōŏőùúûüũūŭůűųçćĉċčñńņňśŝşšţťżźžýÿŷðďđğĝġģĥħķĺļľłŕŗřŵ',
      'aaaaaaaaaeeeeeeeeeiiiiiiiiiooooooooouuuuuuuuuucccccnnnnssssttzzzyyydddgggghhkllllrrrw') as v
    from letters
  ),
  cleaned as (
    -- Latin letters, digits, and the Arabic block, which is where Persian
    -- lives. Everything else becomes a space.
    select trim(regexp_replace(v, E'[^0-9a-z؀-ۿ]+', ' ', 'g')) as v
    from folded
  )
  -- No trade-word removal here. This is the strict key, the one the unique
  -- index is built on, and it is the only thing that refuses a name. The
  -- softer comparison — the one that asks whether two names are a branch of
  -- each other — happens in the app, where a human is about to see it.
  select v from cleaned;
$$;

-- What is already doubled up, if anything. The index below cannot be
-- created while these exist, so this is the list to settle first.
-- Dropped rather than replaced. `create or replace view` can only change a
-- view's body, not its shape: adding city_key in the middle is a renamed
-- column as far as Postgres is concerned, and it refuses. Plain drop, not
-- cascade — if something has come to depend on this view I would rather be
-- told than have it quietly removed.
drop view if exists public.listing_name_clashes;

create view public.listing_name_clashes as
  select public.listing_name_key(name) as name_key,
         public.listing_name_key(city) as city_key,
         count(*) as n,
         array_agg(name order by created_at) as names,
         array_agg(coalesce(city, '—') order by created_at) as cities,
         array_agg(id order by created_at) as ids
    from public.businesses
   where status in ('submitted', 'approved', 'active', 'lapsed')
     and public.listing_name_key(name) <> ''
   group by 1, 2
  having count(*) > 1;

do $$
declare
  dupes int;
begin
  select count(*) into dupes from public.listing_name_clashes;
  if dupes > 0 then
    raise notice 'not adding the unique index: % names are already doubled up. Read public.listing_name_clashes, settle them, then run this again.', dupes;
    return;
  end if;

  -- Drafts are left out on purpose. A draft nobody ever sent is not a
  -- claim on a name, and somebody who abandons one should not be locked
  -- out of their own business name.
  -- The city is part of the key. A blank city normalises to an empty
  -- string, so two nameless-city listings of the same name still clash,
  -- which is right: without a city there is nothing to tell them apart.
  execute 'drop index if exists businesses_name_key_unique';
  execute 'create unique index if not exists businesses_name_city_unique '
       || 'on public.businesses (public.listing_name_key(name), public.listing_name_key(city)) '
       || $w$where status in ('submitted', 'approved', 'active', 'lapsed')$w$;
  raise notice 'unique index in place';
end $$;

-- Check: what the flattening does to a few real names. Only the last
-- statement's result comes back in the Supabase editor, so this is the one
-- to read; the notice above says whether the index went on.
select n as given, public.listing_name_key(n) as key
  from (values
    ('Azimzadeh Carpets'),
    ('AZIMZADE  Carpet Co.'),
    ('Café Zand'),
    ('Zand Cafe'),
    ('Akbar Joojeh'),
    ('Akbar Joojeh North Vancouver'),
    ('رستوران آکبر جوجه'),
    ('Details by Haleh')
  ) as t(n);
