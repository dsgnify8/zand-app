-- An invitation that actually connects two people.
--
-- The link used to carry the inviter's user id: /add?from=<uuid>. That
-- cannot be the basis for making a friendship, because a user id is not a
-- secret. Any signed-in person can read every row of profiles, so ids are
-- there for the taking — and being somebody's friend is what lets you put
-- words on their lock screen. Accepting "knows their id" as proof of an
-- invitation would hand that to anyone who signed up.
--
-- So the link carries a token instead, the same way a shared folder does.
-- It is 32 hex characters, it only ever appears in a link its owner chose
-- to send, and the two functions below are the only way to mint one or
-- spend one. Both run as the owner so that neither the token column nor
-- the friendships table has to be writable from a phone.
--
-- No begin/commit: the Supabase editor wraps the last statement and a
-- trailing commit fails after the work is done.

alter table public.profiles
  add column if not exists invite_token text;

-- Unique, so two people can never share one. Partial, so the many rows
-- with no token yet do not collide with each other.
create unique index if not exists profiles_invite_token_key
  on public.profiles (invite_token)
  where invite_token is not null;

/* ---------------- minting ---------------- */

/**
 * This person's invite token, made on first use.
 *
 * Security definer because the token column is not readable from a phone:
 * profiles only grants id and name once the addresses are locked down, and
 * a token is nobody's business but its owner's.
 */
create or replace function public.invite_token()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  t text;
begin
  if auth.uid() is null then return null; end if;

  select p.invite_token into t from public.profiles p where p.id = auth.uid();

  if t is null or length(t) < 32 then
    -- gen_random_uuid is a strong random source and is built in, so this
    -- needs no extension. 122 bits, which is not guessable.
    t := replace(gen_random_uuid()::text, '-', '');
    update public.profiles set invite_token = t where id = auth.uid();
  end if;

  return t;
end $$;

revoke all on function public.invite_token() from public, anon;
grant execute on function public.invite_token() to authenticated;

/* ---------------- spending ---------------- */

/**
 * Tap an invitation, and the two of you are connected.
 *
 * Accepted outright rather than left pending. The inviter made the link,
 * which is their consent, and whoever tapped it went looking, which is
 * theirs. Asking one of them to confirm again is asking a question that
 * has already been answered twice.
 *
 * Returns the inviter so the app can say who, and so it can tell them.
 * Returns nothing at all when the token is unknown, which is also what a
 * revoked or mistyped link looks like.
 */
create or replace function public.accept_invite(t text)
returns table (inviter uuid, inviter_name text)
language plpgsql
security definer
set search_path = public
as $$
declare
  me  uuid := auth.uid();
  who uuid;
  nm  text;
begin
  if me is null or t is null or length(t) < 32 then return; end if;

  select p.id, p.name into who, nm
    from public.profiles p
   where p.invite_token = t;

  -- Unknown token, or their own link.
  if who is null or who = me then return; end if;

  if exists (
    select 1 from public.friendships f
     where (f.requester = who and f.addressee = me)
        or (f.requester = me  and f.addressee = who)
  ) then
    -- A request was already in flight in one direction or the other.
    -- Tapping the link settles it.
    update public.friendships f
       set status = 'accepted'
     where ((f.requester = who and f.addressee = me)
         or (f.requester = me  and f.addressee = who))
       and f.status <> 'accepted';
  else
    -- The inviter is the requester, because they are the one who asked.
    insert into public.friendships (requester, addressee, status)
    values (who, me, 'accepted');
  end if;

  return query select who, nm;
end $$;

revoke all on function public.accept_invite(text) from public, anon;
grant execute on function public.accept_invite(text) to authenticated;

/* ---------------- and the hole this closes ---------------- */

-- A phone may ask for a friendship. It may not grant itself one.
--
-- fr_insert said only `requester = auth.uid()`, which leaves the status
-- to the client. So anybody could insert a row saying they were already
-- accepted friends with anyone whose id they had — and profiles is
-- readable, so that is everyone. Being somebody's friend is what lets you
-- write your own words onto their lock screen, so this was the real way
-- in, and no amount of care over the invite link would have mattered
-- while it was open.
--
-- Pending only from here. 'accepted' can now be reached in exactly two
-- ways: the addressee accepting it themselves (fr_update), or
-- accept_invite above, which runs as the owner and has seen a token. The
-- join-folder function also makes accepted friendships and keeps working,
-- because it uses the service role and is not subject to this at all.
drop policy if exists fr_insert on public.friendships;
create policy fr_insert on public.friendships
for insert to authenticated
with check (requester = auth.uid() and status = 'pending');

-- Check: the column, the index and both functions.
select
  (select count(*) from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles'
      and column_name = 'invite_token')                                as has_column,
  (to_regclass('public.profiles_invite_token_key') is not null)        as has_index,
  (to_regprocedure('public.invite_token()') is not null)               as has_mint,
  (to_regprocedure('public.accept_invite(text)') is not null)          as has_accept,
  (select count(*) from pg_policies
    where schemaname = 'public' and tablename = 'friendships'
      and policyname = 'fr_insert'
      and with_check like '%pending%')                                  as insert_is_pending_only;
