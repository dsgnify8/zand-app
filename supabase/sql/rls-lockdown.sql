-- ZAND: one account, one account's data.
--
-- The client holds the anon key, and the anon key ships inside the app.
-- So every rule below is the only thing standing between one signed-in
-- person and everybody else's rows. The app was scoping some of these in
-- its own queries, which stops an accident and stops nothing else.
--
-- Written to be run more than once. Every block checks that the table and
-- the columns are actually there before it touches them, so a table this
-- script does not know about is skipped with a notice rather than taking
-- the whole run down with it. Run it, then read the notices.
--
-- No begin/commit: the Supabase editor wraps the last statement, and a
-- trailing commit fails with "relation a does not exist" after everything
-- has already run.

/* ============================================================
   Who is the admin
   ============================================================ */

-- One definition, used by every policy below, so the address lives in one
-- place. Gmail ignores dots, so both spellings count as the same inbox —
-- the app already treats them as one person.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) in (
    'nojan.zandesh@gmail.com',
    'nojanzandesh@gmail.com'
  );
$$;

/* ============================================================
   businesses
   ============================================================ */

do $$
begin
  if to_regclass('public.businesses') is null then
    raise notice 'skipping businesses: no such table';
    return;
  end if;

  execute 'alter table public.businesses enable row level security';

  -- Reading. The directory is public, and it is meant to be: anyone,
  -- signed in or not, sees what is live. Everything not yet live is the
  -- owner's business and ours.
  execute 'drop policy if exists biz_read_live on public.businesses';
  execute $p$
    create policy biz_read_live on public.businesses
    for select to anon, authenticated
    using (status = 'active' or owner_id = auth.uid() or public.is_admin())
  $p$;

  -- Anything older and broader than that has to go, or it grants what the
  -- policy above is refusing.
  execute 'drop policy if exists "read businesses" on public.businesses';
  execute 'drop policy if exists "public read businesses" on public.businesses';
  execute 'drop policy if exists "anyone reads businesses" on public.businesses';

  -- Creating. Yours, and starting where a listing starts.
  execute 'drop policy if exists biz_insert_own on public.businesses';
  execute $p$
    create policy biz_insert_own on public.businesses
    for insert to authenticated
    with check (owner_id = auth.uid() and status in ('draft', 'submitted'))
  $p$;

  -- Editing. with check as well as using, which is the part that matters:
  -- without it, a row you are allowed to edit can be edited into somebody
  -- else's row, and reassigning owner_id is exactly how you would steal a
  -- listing.
  execute 'drop policy if exists biz_update_own on public.businesses';
  execute $p$
    create policy biz_update_own on public.businesses
    for update to authenticated
    using (owner_id = auth.uid() or public.is_admin())
    with check (owner_id = auth.uid() or public.is_admin())
  $p$;

  execute 'drop policy if exists biz_delete_own on public.businesses';
  execute $p$
    create policy biz_delete_own on public.businesses
    for delete to authenticated
    using (owner_id = auth.uid() or public.is_admin())
  $p$;

  execute 'drop policy if exists "owners edit businesses" on public.businesses';
  execute 'drop policy if exists "owners delete businesses" on public.businesses';
end $$;

-- The columns an owner must not be able to set on themselves.
--
-- A policy can say which rows you may write. It cannot say which columns,
-- and status is the one that publishes a listing: with only a policy in
-- place, an owner could move their own listing straight to 'active' and
-- be in the directory without ever being read or paying for it.
--
-- The body is assembled from the columns that actually exist, so this
-- works whatever else has been added to the table since.
do $$
declare
  body text := '';
  fn   text;
begin
  if to_regclass('public.businesses') is null then return; end if;

  body := body || '  if public.is_admin() then return new; end if;' || E'\n';
  body := body || '  new.owner_id := old.owner_id;' || E'\n';
  body := body || '  if new.status is distinct from old.status then' || E'\n'
               || '    if not (old.status in (''draft'', ''rejected'') and new.status = ''submitted'') then' || E'\n'
               || '      raise exception ''A listing goes live by being approved, not by being edited'';' || E'\n'
               || '    end if;' || E'\n'
               || '  end if;' || E'\n';

  -- Ours to set, each one only if the table has it.
  for fn in
    select c.column_name
    from information_schema.columns c
    where c.table_schema = 'public' and c.table_name = 'businesses'
      and c.column_name in ('billing_exempt', 'featured', 'approved_at', 'review_note')
  loop
    body := body || format('  new.%I := old.%I;', fn, fn) || E'\n';
  end loop;

  body := body || '  return new;' || E'\n';

  execute 'create or replace function public.businesses_guard() returns trigger '
       || 'language plpgsql security definer set search_path = public as $f$ begin '
       || body
       || ' end $f$';

  execute 'drop trigger if exists businesses_guard on public.businesses';
  execute 'create trigger businesses_guard before update on public.businesses '
       || 'for each row execute function public.businesses_guard()';
end $$;

/* ============================================================
   What a listing knows about its visitors
   ============================================================ */

do $$
begin
  if to_regclass('public.business_events') is null then
    raise notice 'skipping business_events: no such table';
    return;
  end if;

  execute 'alter table public.business_events enable row level security';

  -- Anyone may record that they looked at a listing. Nobody may read
  -- those records but the owner: views, calls, WhatsApp taps and
  -- directions are the one competitive thing a small business has here.
  -- Anyone may record that they looked at a listing, including somebody
  -- who is not signed in: the app is browsable signed out and those views
  -- are real. What they may not do is sign the record with somebody else's
  -- name, which the client used to be trusted about.
  execute 'drop policy if exists events_write on public.business_events';
  execute $p$
    create policy events_write on public.business_events
    for insert to anon, authenticated
    with check (user_id is null or user_id = auth.uid())
  $p$;

  execute 'drop policy if exists events_owner_read on public.business_events';
  execute $p$
    create policy events_owner_read on public.business_events
    for select to authenticated
    using (
      public.is_admin()
      or exists (
        select 1 from public.businesses b
        where b.id = business_events.business_id and b.owner_id = auth.uid()
      )
    )
  $p$;

  execute 'drop policy if exists "read business events" on public.business_events';
  execute 'drop policy if exists "anyone reads business events" on public.business_events';
end $$;

-- The percentile on the insights tab compares one listing against the
-- rest, which the policy above no longer allows from a phone. This does
-- the comparison on the server and hands back a number, which is all the
-- screen ever showed.
do $$
begin
  if to_regclass('public.business_events') is null then return; end if;

  -- Same shape as the comparison the app used to make on the phone: the
  -- last thirty days, against live listings in the same category and the
  -- same city, and null rather than a number when there are too few of
  -- them to say anything honest.
  execute $p$
    create or replace function public.business_view_percentile(b uuid)
    returns integer
    language plpgsql
    security definer
    set search_path = public
    as $f$
    declare
      mine public.businesses;
      peers uuid[];
      my_views int;
      below int;
    begin
      select * into mine from public.businesses where id = b;
      if mine.id is null then return null; end if;

      -- Only the owner, or us. Otherwise this would answer questions
      -- about a listing to anybody who knew its id.
      if not (mine.owner_id = auth.uid() or public.is_admin()) then
        return null;
      end if;

      select array_agg(x.id) into peers
        from public.businesses x
       where x.status = 'active'
         and x.category = mine.category
         and coalesce(x.city, '') = coalesce(mine.city, '')
         and x.id <> mine.id;

      if peers is null or array_length(peers, 1) < 3 then return null; end if;

      select count(*) into my_views
        from public.business_events e
       where e.business_id = b and e.kind = 'view'
         and e.created_at >= now() - interval '30 days';

      select count(*) into below from (
        select p.id, (
          select count(*) from public.business_events e
           where e.business_id = p.id and e.kind = 'view'
             and e.created_at >= now() - interval '30 days'
        ) as n
        from unnest(peers) as p(id)
      ) q
      where q.n < my_views;

      return round(100.0 * below / array_length(peers, 1))::int;
    end $f$
  $p$;

  execute 'revoke all on function public.business_view_percentile(uuid) from public, anon';
  execute 'grant execute on function public.business_view_percentile(uuid) to authenticated';
end $$;

/* ============================================================
   Messages between an owner and us
   ============================================================ */

do $$
begin
  if to_regclass('public.business_messages') is null then
    raise notice 'skipping business_messages: no such table';
    return;
  end if;

  execute 'alter table public.business_messages enable row level security';

  execute 'drop policy if exists msgs_own on public.business_messages';
  execute $p$
    create policy msgs_own on public.business_messages
    for select to authenticated
    using (
      public.is_admin()
      or exists (
        select 1 from public.businesses b
        where b.id = business_messages.business_id and b.owner_id = auth.uid()
      )
    )
  $p$;

  execute 'drop policy if exists msgs_write on public.business_messages';
  execute $p$
    create policy msgs_write on public.business_messages
    for insert to authenticated
    with check (
      public.is_admin()
      or exists (
        select 1 from public.businesses b
        where b.id = business_messages.business_id and b.owner_id = auth.uid()
      )
    )
  $p$;
end $$;

/* ============================================================
   Founder stories: ours to write, everyone's to read once approved
   ============================================================ */

do $$
begin
  if to_regclass('public.founder_stories') is null then
    raise notice 'skipping founder_stories: no such table';
    return;
  end if;

  execute 'alter table public.founder_stories enable row level security';

  execute 'drop policy if exists stories_read on public.founder_stories';
  execute $p$
    create policy stories_read on public.founder_stories
    for select to anon, authenticated
    using (
      approved = true
      or public.is_admin()
      or exists (
        select 1 from public.businesses b
        where b.id = founder_stories.business_id and b.owner_id = auth.uid()
      )
    )
  $p$;

  -- Written by us. `approved` is what puts a story on a listing, so an
  -- owner writing their own would be publishing their own copy.
  execute 'drop policy if exists stories_admin_write on public.founder_stories';
  execute $p$
    create policy stories_admin_write on public.founder_stories
    for all to authenticated
    using (public.is_admin())
    with check (public.is_admin())
  $p$;
end $$;

/* ============================================================
   Subscriptions: yours, and ours
   ============================================================ */

do $$
begin
  if to_regclass('public.subscriptions') is null then
    raise notice 'skipping subscriptions: no such table';
    return;
  end if;

  execute 'alter table public.subscriptions enable row level security';

  execute 'drop policy if exists "own subscriptions" on public.subscriptions';
  execute 'drop policy if exists "admin reads subscriptions" on public.subscriptions';
  execute 'drop policy if exists subs_read on public.subscriptions';
  execute $p$
    create policy subs_read on public.subscriptions
    for select to authenticated
    using (user_id = auth.uid() or public.is_admin())
  $p$;
  -- No write policy at all. Every row here is written by the server after
  -- Apple has been asked, never by a phone.
end $$;

/* ============================================================
   Folders, and who is in them
   ============================================================ */

-- Two helpers, and they have to be security definer.
--
-- A folder is readable if you own it or are a member; a membership row is
-- readable if it is yours or you own the folder. Written as plain policies
-- those two ask each other the same question forever, and Postgres stops
-- with "infinite recursion detected in policy" — which does not fail
-- safe, it fails shut: every folder in the app becomes unreadable. A
-- function that runs as the owner sees the rows without the policy, so the
-- circle is broken.
create or replace function public.owns_collection(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.saved_collections c
     where c.id = cid and c.owner_id = auth.uid()
  );
$$;

create or replace function public.in_collection(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.saved_collections c
     where c.id = cid and c.owner_id = auth.uid()
  ) or exists (
    select 1 from public.collection_members m
     where m.collection_id = cid and m.user_id = auth.uid()
  );
$$;

revoke all on function public.owns_collection(uuid) from public, anon;
revoke all on function public.in_collection(uuid) from public, anon;
grant execute on function public.owns_collection(uuid) to authenticated;
grant execute on function public.in_collection(uuid) to authenticated;

do $$
begin
  if to_regclass('public.saved_collections') is null then
    raise notice 'skipping saved_collections: no such table';
    return;
  end if;

  execute 'alter table public.saved_collections enable row level security';

  execute 'drop policy if exists col_read on public.saved_collections';
  execute $p$
    create policy col_read on public.saved_collections
    for select to authenticated
    using (owner_id = auth.uid() or public.in_collection(id))
  $p$;

  execute 'drop policy if exists col_insert on public.saved_collections';
  execute $p$
    create policy col_insert on public.saved_collections
    for insert to authenticated
    with check (owner_id = auth.uid())
  $p$;

  -- Renaming a folder, deleting it, and minting or revoking its share
  -- link are all the owner's. These were reaching the database with an id
  -- and nothing else.
  execute 'drop policy if exists col_update on public.saved_collections';
  execute $p$
    create policy col_update on public.saved_collections
    for update to authenticated
    using (owner_id = auth.uid())
    with check (owner_id = auth.uid())
  $p$;

  execute 'drop policy if exists col_delete on public.saved_collections';
  execute $p$
    create policy col_delete on public.saved_collections
    for delete to authenticated
    using (owner_id = auth.uid())
  $p$;
end $$;

do $$
begin
  if to_regclass('public.collection_members') is null then
    raise notice 'skipping collection_members: no such table';
    return;
  end if;

  execute 'alter table public.collection_members enable row level security';

  execute 'drop policy if exists mem_read on public.collection_members';
  execute $p$
    create policy mem_read on public.collection_members
    for select to authenticated
    using (user_id = auth.uid() or public.owns_collection(collection_id))
  $p$;

  -- Only the owner adds people. Left open, anybody could have written
  -- themselves into anybody's folder and then read it.
  execute 'drop policy if exists mem_insert on public.collection_members';
  execute $p$
    create policy mem_insert on public.collection_members
    for insert to authenticated
    with check (public.owns_collection(collection_id))
  $p$;

  -- The owner removes anyone; a member may see themselves out.
  execute 'drop policy if exists mem_delete on public.collection_members';
  execute $p$
    create policy mem_delete on public.collection_members
    for delete to authenticated
    using (user_id = auth.uid() or public.owns_collection(collection_id))
  $p$;
end $$;

do $$
begin
  if to_regclass('public.saved_collection_items') is null then
    raise notice 'skipping saved_collection_items: no such table';
    return;
  end if;

  execute 'alter table public.saved_collection_items enable row level security';

  execute 'drop policy if exists items_all on public.saved_collection_items';
  execute $p$
    create policy items_all on public.saved_collection_items
    for all to authenticated
    using (public.in_collection(collection_id))
    with check (public.in_collection(collection_id))
  $p$;
end $$;

/* ============================================================
   Friendships and things sent between people
   ============================================================ */

do $$
begin
  if to_regclass('public.friendships') is null then
    raise notice 'skipping friendships: no such table';
    return;
  end if;

  execute 'alter table public.friendships enable row level security';

  execute 'drop policy if exists fr_read on public.friendships';
  execute $p$
    create policy fr_read on public.friendships
    for select to authenticated
    using (requester = auth.uid() or addressee = auth.uid())
  $p$;

  execute 'drop policy if exists fr_insert on public.friendships';
  execute $p$
    create policy fr_insert on public.friendships
    for insert to authenticated
    with check (requester = auth.uid())
  $p$;

  -- Accepting is the addressee's alone. It was reaching the database as a
  -- row id, so one person could accept a request meant for another.
  execute 'drop policy if exists fr_update on public.friendships';
  execute $p$
    create policy fr_update on public.friendships
    for update to authenticated
    using (addressee = auth.uid())
    with check (addressee = auth.uid())
  $p$;

  -- Either of them may end it, or withdraw a request.
  execute 'drop policy if exists fr_delete on public.friendships';
  execute $p$
    create policy fr_delete on public.friendships
    for delete to authenticated
    using (requester = auth.uid() or addressee = auth.uid())
  $p$;
end $$;

do $$
begin
  if to_regclass('public.sent_items') is null then
    raise notice 'skipping sent_items: no such table';
    return;
  end if;

  execute 'alter table public.sent_items enable row level security';

  execute 'drop policy if exists sent_read on public.sent_items';
  execute $p$
    create policy sent_read on public.sent_items
    for select to authenticated
    using (sender = auth.uid() or recipient = auth.uid())
  $p$;

  -- The sender is who is signed in, not who the client says it is. Taken
  -- on trust, one person could send in another's name.
  execute 'drop policy if exists sent_insert on public.sent_items';
  execute $p$
    create policy sent_insert on public.sent_items
    for insert to authenticated
    with check (sender = auth.uid())
  $p$;

  -- Marking something learned is the recipient's.
  execute 'drop policy if exists sent_update on public.sent_items';
  execute $p$
    create policy sent_update on public.sent_items
    for update to authenticated
    using (recipient = auth.uid())
    with check (recipient = auth.uid())
  $p$;

  execute 'drop policy if exists sent_delete on public.sent_items';
  execute $p$
    create policy sent_delete on public.sent_items
    for delete to authenticated
    using (sender = auth.uid() or recipient = auth.uid())
  $p$;
end $$;

/* ============================================================
   The blob behind everyone's streak, and their devices
   ============================================================ */

do $$
begin
  if to_regclass('public.user_state') is null then
    raise notice 'skipping user_state: no such table';
    return;
  end if;

  execute 'alter table public.user_state enable row level security';
  execute 'drop policy if exists state_own on public.user_state';
  execute $p$
    create policy state_own on public.user_state
    for all to authenticated
    using (user_id = auth.uid())
    with check (user_id = auth.uid())
  $p$;
end $$;

do $$
begin
  if to_regclass('public.push_tokens') is null then
    raise notice 'skipping push_tokens: no such table';
    return;
  end if;

  execute 'alter table public.push_tokens enable row level security';

  -- One row per device. Without this unique index the upsert the app does
  -- on `token` cannot work, and a phone that two people have signed in on
  -- keeps a row for each of them — which is how a notification for one
  -- lands on the other's screen.
  begin
    execute 'create unique index if not exists push_tokens_token_key on public.push_tokens (token)';
  exception when others then
    raise notice 'could not make push_tokens.token unique — there are duplicates to clear out first';
  end;

  execute 'drop policy if exists tok_own on public.push_tokens';
  execute $p$
    create policy tok_own on public.push_tokens
    for all to authenticated
    using (user_id = auth.uid())
    with check (user_id = auth.uid())
  $p$;
end $$;

-- A phone signing a new person in has to be able to clear the old row,
-- and that row belongs to somebody else, so no policy can allow it. The
-- app asks for this instead, and it only ever removes a row for the token
-- it is holding.
create or replace function public.claim_push_token(t text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.push_tokens
   where token = t and user_id is distinct from auth.uid();
$$;

revoke all on function public.claim_push_token(text) from public, anon;
grant execute on function public.claim_push_token(text) to authenticated;

/* ============================================================
   profiles: policies and the two lookups
   ============================================================ */

do $$
begin
  if to_regclass('public.profiles') is null then
    raise notice 'skipping profiles: no such table';
    return;
  end if;

  execute 'alter table public.profiles enable row level security';

  execute 'drop policy if exists "read profiles" on public.profiles';
  execute 'drop policy if exists prof_read on public.profiles';
  execute $p$
    create policy prof_read on public.profiles
    for select to authenticated
    using (true)
  $p$;

  execute 'drop policy if exists prof_write on public.profiles';
  execute $p$
    create policy prof_write on public.profiles
    for update to authenticated
    using (id = auth.uid())
    with check (id = auth.uid())
  $p$;

  -- Finding someone by their address, on the server, answering only an
  -- exact address. Added here so the app has it; taking the email column
  -- out of client reach is a separate file, because doing that before the
  -- new build is out would break the friends list in the app people are
  -- using today.
  execute $p$
    create or replace function public.find_profile(addr text)
    returns table (id uuid, name text)
    language sql
    security definer
    set search_path = public
    as $f$
      select p.id, p.name from public.profiles p
       where lower(p.email) = lower(trim(addr))
       limit 1;
    $f$
  $p$;
  execute 'revoke all on function public.find_profile(text) from public, anon';
  execute 'grant execute on function public.find_profile(text) to authenticated';

  -- And the one screen that has a reason to see addresses: the admin
  -- board. A column grant cannot be conditional, so this is a function
  -- that checks who is asking.
  execute $p$
    create or replace function public.admin_users()
    returns table (id uuid, name text, email text, created_at timestamptz)
    language sql
    security definer
    set search_path = public
    as $f$
      select p.id, p.name, p.email, p.created_at
        from public.profiles p
       where public.is_admin()
       order by p.created_at desc;
    $f$
  $p$;
  execute 'revoke all on function public.admin_users() from public, anon';
  execute 'grant execute on function public.admin_users() to authenticated';
end $$;

/* ============================================================
   Things only we may change
   ============================================================ */

do $$
declare
  t text;
begin
  foreach t in array array[
    'hidden_articles', 'content_overrides', 'image_overrides', 'city_covers'
  ]
  loop
    if to_regclass('public.' || t) is null then
      raise notice 'skipping %: no such table', t;
      continue;
    end if;

    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists %I on public.%I', t || '_read', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      t || '_read', t);

    -- Dropped by the names actually used below. This dropped a name that
    -- was never created, so a second run of this file failed on the
    -- insert policy already existing.
    execute format('drop policy if exists %I on public.%I', t || '_admin_write', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_insert', t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (public.is_admin())',
      t || '_admin_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_update', t);
    execute format(
      'create policy %I on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())',
      t || '_admin_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_delete', t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using (public.is_admin())',
      t || '_admin_delete', t);
  end loop;
end $$;

/* ============================================================
   What is now in force
   ============================================================ */

select tablename,
       policyname,
       cmd,
       roles
  from pg_policies
 where schemaname = 'public'
   and tablename in (
     'businesses', 'business_events', 'business_messages', 'founder_stories',
     'subscriptions', 'saved_collections', 'saved_collection_items',
     'collection_members', 'friendships', 'sent_items', 'user_state',
     'push_tokens', 'profiles', 'hidden_articles', 'content_overrides',
     'image_overrides', 'city_covers'
   )
 order by tablename, cmd, policyname;
