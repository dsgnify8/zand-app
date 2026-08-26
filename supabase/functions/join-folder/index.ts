// Joining a shared folder.
//
// A token buys exactly one thing: membership of the folder it belongs to.
// This runs with the service key so the table itself stays closed — a
// policy permitting "read any row that has a token" would let anyone
// signed in enumerate every shared folder in the app, which is a lot of
// access to grant for the sake of one screen.
//
// Three things happen, in order: the token is checked, the two people are
// made friends if they are not already, and the caller is added to the
// folder. Friendship first, because a folder you share with someone is a
// friendship whether or not it was formally requested.
//
// Deploy:  supabase functions deploy join-folder

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  try {
    const { token } = await req.json();
    if (!token) {
      return json({ error: 'no token' }, 400);
    }

    // Who is asking. The caller's JWT comes through on the header; this
    // is the only thing we trust from the client.
    const auth = req.headers.get('Authorization') ?? '';
    const asUser = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: auth } } },
    );
    const { data: me } = await asUser.auth.getUser();
    const myId = me?.user?.id;
    if (!myId) return json({ error: 'sign in first' }, 401);

    // Everything else runs with the service key.
    const db = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: folder } = await db
      .from('saved_collections')
      .select('id, name, owner_id')
      .eq('share_token', token)
      .maybeSingle();

    // Same answer for a wrong token and a revoked one: a link that used to
    // work should not tell someone it used to work.
    if (!folder) return json({ error: 'not found' }, 404);
    if (folder.owner_id === myId) {
      return json({ ok: true, id: folder.id, name: folder.name, mine: true });
    }

    // Friends, if they are not already. Accept a pending request from the
    // owner rather than adding a second one in the other direction.
    const { data: existing } = await db
      .from('friendships')
      .select('id, status, requester, addressee')
      .or(`and(requester.eq.${myId},addressee.eq.${folder.owner_id}),` +
          `and(requester.eq.${folder.owner_id},addressee.eq.${myId})`)
      .limit(1);

    if (!existing || existing.length === 0) {
      await db.from('friendships').insert({
        requester: folder.owner_id,
        addressee: myId,
        // Opening someone's folder link is consent enough; making them
        // approve a request afterwards would be asking twice.
        status: 'accepted',
      });
    } else if (existing[0].status !== 'accepted') {
      await db.from('friendships').update({ status: 'accepted' }).eq('id', existing[0].id);
    }

    await db.from('collection_members').upsert({
      collection_id: folder.id,
      user_id: myId,
      invited_by: folder.owner_id,
    });

    return json({ ok: true, id: folder.id, name: folder.name });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
