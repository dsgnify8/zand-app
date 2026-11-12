-- What people keep, without the people who build the app.
--
-- content_popularity counts every account's liked and saved articles.
-- That included the admin's own taps from testing, and Apple's review
-- account, neither of which says anything about what readers value.
--
-- Deleting those likes would not hold: sync merges the phone's lists
-- with the database's, so the next sync from the admin's phone would put
-- them straight back. Leaving the accounts out of the count holds for
-- good, and the admin can keep liking and saving normally.
--
-- Same columns, same order, same grants: only the rows that feed it
-- change. Until now this view existed only in the database; it lives
-- here from now on.
--
-- No begin/commit: the Supabase editor wraps the last statement, and a
-- trailing commit fails after everything has already run.

create or replace view public.content_popularity as
with readers as (
  select u.payload
    from public.user_state u
   where u.user_id not in (
     select id from auth.users
      where lower(email) in (
        'nojan.zandesh@gmail.com',
        'nojanzandesh@gmail.com',
        'apple@appletest.com'
      )
   )
)
select key,
       count(*) filter (where kind = 'liked') as likes,
       count(*) filter (where kind = 'saved') as saves
  from (
    select 'liked'::text as kind,
           jsonb_array_elements_text(r.payload -> 'liked:articles') as key
      from readers r
     where r.payload ? 'liked:articles'
    union all
    select 'saved'::text as kind,
           jsonb_array_elements_text(r.payload -> 'saved:articles') as key
      from readers r
     where r.payload ? 'saved:articles'
  ) x
 group by key
 order by count(*) desc;

-- Check: how many accounts are left out, and how many items are still
-- counted once they are.
select
  (select count(*) from auth.users
    where lower(email) in ('nojan.zandesh@gmail.com', 'nojanzandesh@gmail.com', 'apple@appletest.com')) as accounts_left_out,
  (select count(*) from public.content_popularity) as items_still_counted;
