-- Run this now.
--
-- profiles-addresses.sql has been applied, and it was meant to wait until
-- the new build was live. The app on people's phones today reads the email
-- column when it loads the friends list and when it searches, so those
-- queries are being refused right now: the friends sheet will be empty and
-- search by address will find nobody.
--
-- This puts the column grant back. Nothing else from the lockdown is
-- undone: the row policies, the functions and the admin gates all stay.
-- Once the new build is out, run profiles-addresses.sql again.

grant select on public.profiles to authenticated;

-- Check: id, name, email, phone and handle should all be listed again.
select column_name
  from information_schema.column_privileges
 where table_schema = 'public'
   and table_name = 'profiles'
   and grantee = 'authenticated'
   and privilege_type = 'SELECT'
 order by column_name;
