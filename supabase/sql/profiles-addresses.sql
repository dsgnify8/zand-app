-- Take email addresses out of client reach.
--
-- RUN THIS ONLY ONCE THE NEW BUILD IS LIVE.
--
-- Any signed-in person can read the profiles table, and it holds every
-- user's address and phone number. That is not a screen leaking something
-- it should not print: it is an export of the whole user base to anyone who
-- signs up and knows how to call the API.
--
-- The policy stays as it is — names have to be readable, a friends list
-- needs them — and the grant narrows to the two columns that are nobody's
-- secret. A column grant cannot ask who is calling, so the two places that
-- legitimately need an address go through functions instead, and those are
-- created by rls-lockdown.sql:
--
--   find_profile(addr)  matches one exact address and answers with a name.
--                       Used by friend search, where the person searching
--                       has typed the address already.
--   admin_users()       the admin board, which checks is_admin() inside.
--
-- The reason this waits: the app people have on their phones today selects
-- `email` when it loads the friends list and when it searches. Revoking the
-- column first makes those queries fail, and the friends sheet goes empty
-- for everybody until they update. So: ship the build, then run this.
--
-- No begin/commit: the Supabase editor wraps the last statement, and a
-- trailing commit fails after everything has already run.

do $$
begin
  if to_regclass('public.profiles') is null then
    raise notice 'no profiles table';
    return;
  end if;

  if to_regprocedure('public.find_profile(text)') is null then
    raise notice 'find_profile is missing — run rls-lockdown.sql first, or friend search will break';
    return;
  end if;

  execute 'revoke select on public.profiles from anon, authenticated';
  execute 'grant select (id, name) on public.profiles to authenticated';
  raise notice 'addresses are now server-side only';
end $$;

-- Check: which columns a signed-in person may now read.
select table_name, column_name, privilege_type
  from information_schema.column_privileges
 where table_schema = 'public'
   and table_name = 'profiles'
   and grantee = 'authenticated'
 order by column_name;
