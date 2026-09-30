-- What the original policies actually say, as ONE query.
--
-- The previous version asked three questions in three statements, and the
-- Supabase editor only ever shows you the result of the last one — the same
-- quirk that makes a trailing `commit` fail. So everything is folded into a
-- single result set here.
--
-- Three kinds of row come back, marked in the first column:
--
--   a table name   an existing policy, with the rule it applies. `qual` is
--                  which rows a command may touch, `with_check` what a row
--                  is allowed to become.
--   ~check~        whether the duplicate-name index got created.
--   ~clash~        the names that are already doubled up, which is what
--                  stops that index being created.
--
-- Paste the whole thing back, wide as it is.

select tablename::text                        as what,
       policyname::text                       as name,
       cmd::text                              as cmd,
       coalesce(qual, '(none)')               as qual,
       coalesce(with_check, '(none)')         as with_check
  from pg_policies
 where schemaname = 'public'
   and policyname not in (
     'biz_read_live','biz_insert_own','biz_update_own','biz_delete_own',
     'events_write','events_owner_read',
     'msgs_own','msgs_write',
     'stories_read','stories_admin_write',
     'subs_read',
     'col_read','col_insert','col_update','col_delete',
     'mem_read','mem_insert','mem_delete',
     'items_all',
     'fr_read','fr_insert','fr_update','fr_delete',
     'sent_read','sent_insert','sent_update','sent_delete',
     'state_own','tok_own','prof_read','prof_write'
   )
   and policyname not like '%\_admin\_%'
   and policyname <> tablename || '_read'

union all

select '~check~',
       'duplicate name index',
       case when to_regclass('public.businesses_name_key_unique') is null
            then 'MISSING' else 'present' end,
       '', ''

union all

select '~clash~',
       name_key,
       n::text,
       array_to_string(names, '  |  '),
       array_to_string(cities, '  |  ')
  from public.listing_name_clashes

 order by 1, 2;
