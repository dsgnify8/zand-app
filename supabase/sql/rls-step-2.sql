-- Replace the original policies with the new ones.
--
-- rls-lockdown.sql added its policies beside the originals rather than in
-- place of them, because it could only guess at their names. Policies are
-- OR'd: a row passes if EITHER permits it, so until the old ones go the new
-- ones change nothing. This is written from their actual definitions.
--
-- Most of the originals turned out to be sound, and simply duplicate what
-- the lockdown now says. Four were not:
--
--   businesses / owners write their own
--       INSERT with check (auth.uid() = owner_id) and no word about status,
--       so an owner could insert a listing that was already 'active' and be
--       in the directory without review and without paying. The trigger only
--       guards updates, so this was the way around it.
--
--   founder_stories / owner writes own story
--       ALL, so an owner could write their own story and set approved
--       themselves. The whole point of that flag is that we decide.
--
--   collection_members / members add members
--       with check ((invited_by = auth.uid()) OR (user_id = auth.uid())).
--       The second clause lets anybody add themselves to any folder, and
--       then read it.
--
--   business_events / anyone logs
--       with check (true), so the user_id on a view could be anyone's.
--
-- Three of the originals were STRICTER than the lockdown, and those are
-- folded in below rather than lost: an owner's message must have
-- from_admin = false, an owner may mark their own messages read, and a
-- person may create their own profile row.
--
-- Safe to run more than once. No begin/commit: the Supabase editor wraps
-- the last statement and a trailing commit fails after the work is done.

/* ============================================================
   1. Keep what the originals did better
   ============================================================ */

do $$
begin
  -- The admin creates listings too, and dropping 'admin all businesses'
  -- takes their insert with it.
  if to_regclass('public.businesses') is not null then
    execute 'drop policy if exists biz_insert_own on public.businesses';
    execute $p$
      create policy biz_insert_own on public.businesses
      for insert to authenticated
      with check (
        public.is_admin()
        or (owner_id = auth.uid() and status in ('draft', 'submitted'))
      )
    $p$;
  end if;

  if to_regclass('public.business_messages') is not null then
    -- from_admin = false. The original had this and the lockdown did not,
    -- so an owner could have posted a message that looked like ours.
    execute 'drop policy if exists msgs_write on public.business_messages';
    execute $p$
      create policy msgs_write on public.business_messages
      for insert to authenticated
      with check (
        public.is_admin()
        or (
          from_admin = false
          and exists (
            select 1 from public.businesses b
            where b.id = business_messages.business_id and b.owner_id = auth.uid()
          )
        )
      )
    $p$;

    -- Marking a message read is an update, and the lockdown had no update
    -- policy at all — dropping the originals would have taken the ability
    -- with them.
    execute 'drop policy if exists msgs_update on public.business_messages';
    execute $p$
      create policy msgs_update on public.business_messages
      for update to authenticated
      using (
        public.is_admin()
        or exists (
          select 1 from public.businesses b
          where b.id = business_messages.business_id and b.owner_id = auth.uid()
        )
      )
      with check (
        public.is_admin()
        or exists (
          select 1 from public.businesses b
          where b.id = business_messages.business_id and b.owner_id = auth.uid()
        )
      )
    $p$;

    execute 'drop policy if exists msgs_delete on public.business_messages';
    execute $p$
      create policy msgs_delete on public.business_messages
      for delete to authenticated
      using (public.is_admin())
    $p$;
  end if;

  -- Creating your own profile row at signup.
  if to_regclass('public.profiles') is not null then
    execute 'drop policy if exists prof_insert on public.profiles';
    execute $p$
      create policy prof_insert on public.profiles
      for insert to authenticated
      with check (id = auth.uid())
    $p$;
  end if;

  -- A member may bring somebody else into a shared folder, which is how a
  -- shared folder grows and what the button in the app does. What they may
  -- not do is add themselves, which is what the original also allowed.
  if to_regclass('public.collection_members') is not null then
    execute 'drop policy if exists mem_insert on public.collection_members';
    execute $p$
      create policy mem_insert on public.collection_members
      for insert to authenticated
      with check (
        public.owns_collection(collection_id)
        or (
          invited_by = auth.uid()
          and user_id <> auth.uid()
          and public.in_collection(collection_id)
        )
      )
    $p$;
  end if;
end $$;

/* ============================================================
   2. image_frames, which the lockdown missed entirely
   ============================================================ */

do $$
begin
  if to_regclass('public.image_frames') is null then
    raise notice 'skipping image_frames: no such table';
    return;
  end if;

  execute 'alter table public.image_frames enable row level security';

  -- Read by everybody, including signed out: the frames are how images are
  -- cropped and the app draws them before anyone signs in.
  execute 'drop policy if exists image_frames_read on public.image_frames';
  execute $p$
    create policy image_frames_read on public.image_frames
    for select to anon, authenticated
    using (true)
  $p$;

  execute 'drop policy if exists image_frames_admin_insert on public.image_frames';
  execute $p$
    create policy image_frames_admin_insert on public.image_frames
    for insert to authenticated with check (public.is_admin())
  $p$;
  execute 'drop policy if exists image_frames_admin_update on public.image_frames';
  execute $p$
    create policy image_frames_admin_update on public.image_frames
    for update to authenticated using (public.is_admin()) with check (public.is_admin())
  $p$;
  execute 'drop policy if exists image_frames_admin_delete on public.image_frames';
  execute $p$
    create policy image_frames_admin_delete on public.image_frames
    for delete to authenticated using (public.is_admin())
  $p$;
end $$;

/* ============================================================
   3. Now the originals go
   ============================================================ */

do $$
declare
  r record;
begin
  for r in
    select * from (values
      ('business_events',        'admin reads all events'),
      ('business_events',        'anyone logs'),
      ('business_events',        'owners read their own'),

      ('business_messages',      'admin all messages'),
      ('business_messages',      'owner reads own messages'),
      ('business_messages',      'owner updates own messages'),
      ('business_messages',      'owner writes own messages'),

      ('businesses',             'active listings are public'),
      ('businesses',             'admin all businesses'),
      ('businesses',             'owners delete their own'),
      ('businesses',             'owners see their own'),
      ('businesses',             'owners update their own'),
      ('businesses',             'owners write their own'),

      ('city_covers',            'admins write city covers'),
      ('city_covers',            'city covers are public'),

      ('collection_members',     'leave a folder'),
      ('collection_members',     'members add members'),
      ('collection_members',     'members see members'),

      ('content_overrides',      'admins write overrides'),
      ('content_overrides',      'overrides readable'),

      ('founder_stories',        'admins do everything with stories'),
      ('founder_stories',        'approved stories are public'),
      ('founder_stories',        'owner writes own story'),

      ('friendships',            'addressee updates'),
      ('friendships',            'create request'),
      ('friendships',            'either deletes'),
      ('friendships',            'see own friendships'),

      ('hidden_articles',        'admin writes hidden'),
      ('hidden_articles',        'anyone reads hidden'),

      ('image_frames',           'admin writes frames'),
      ('image_frames',           'admin writes image frames'),
      ('image_frames',           'anyone reads frames'),
      ('image_frames',           'anyone reads image frames'),

      ('image_overrides',        'admin writes images'),
      ('image_overrides',        'images readable'),

      ('profiles',               'insert own profile'),
      ('profiles',               'update own profile'),

      ('push_tokens',            'own tokens'),

      ('saved_collection_items', 'members use collection items'),

      ('saved_collections',      'members read collections'),
      ('saved_collections',      'owner changes collections'),
      ('saved_collections',      'owner deletes collections'),
      ('saved_collections',      'owner writes collections'),

      ('sent_items',             'read own items'),
      ('sent_items',             'recipient updates'),
      ('sent_items',             'send items'),

      ('user_state',             'own state insert'),
      ('user_state',             'own state select'),
      ('user_state',             'own state update')
    ) as t(tbl, pol)
  loop
    if to_regclass('public.' || r.tbl) is null then continue; end if;
    execute format('drop policy if exists %I on public.%I', r.pol, r.tbl);
  end loop;
end $$;

-- deleted_accounts and events keep their own policies. Nothing in the
-- lockdown replaces them and there is nothing wrong with them: one is read
-- by the admin only, the other lets a person record their own reads.

/* ============================================================
   What is in force now
   ============================================================ */

select tablename::text as tbl,
       policyname::text as policy,
       cmd::text as cmd,
       coalesce(qual, '(none)') as qual,
       coalesce(with_check, '(none)') as with_check
  from pg_policies
 where schemaname = 'public'
 order by tablename, cmd, policyname;
