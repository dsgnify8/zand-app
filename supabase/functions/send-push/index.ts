// Sends a push notification to a user's devices.
//
// Call it with a user id, a title and a body. It looks up that user's
// device tokens, checks the category is one they have left switched on,
// and hands the batch to Expo's push service.
//
// Two things it deliberately does not do:
//
//   * It does not trust the caller about the words either, where the
//     caller is a stranger. A pending friend request is something anyone
//     can create, so it earns a fixed line rather than whatever text they
//     sent.
//
//   * It does not trust the caller about who to send to beyond the id.
//     Only the service role can invoke it, so it is called from other
//     server code — when an article publishes, when an item is sent —
//     never from a client.
//
//   * It does not retry. Expo's receipts endpoint is the right place to
//     handle failures properly, and a naive retry loop on a push service
//     is how you end up sending someone the same thing nine times.
//
// Deploy with:  supabase functions deploy send-push

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { callerId, isServiceCall } from '../_shared/caller.ts';
import { callerKey, overLimit } from '../_shared/limit.ts';

type Category = 'articles' | 'friends' | 'account';
const CATEGORIES: Category[] = ['articles', 'friends', 'account'];

Deno.serve(async (req) => {
  try {
    const { userId, title, body, category, data } = await req.json() as {
      userId: string;
      title: string;
      body: string;
      category: Category;
      data?: Record<string, unknown>;
    };

    if (!userId || !title || !body) {
      return new Response(JSON.stringify({ error: 'userId, title and body are required' }), { status: 400 });
    }

    // The category is what the preference check hangs on, so it is not
    // optional. Left out, a push went to someone who had switched
    // everything off, which is the one thing a preference has to mean.
    if (!category || !CATEGORIES.includes(category)) {
      return new Response(JSON.stringify({ error: 'category must be one of ' + CATEGORIES.join(', ') }), { status: 400 });
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Who is asking, and may they.
    //
    // This used to take the caller's word for all of it. The anon key
    // ships inside the app, so anyone holding it could have written any
    // words onto any phone whose user id they knew — and ids travel, in
    // invite links among other places. Now a push has to come from our
    // own server code, or from someone who already has a line to this
    // person: a friend, or a folder they both keep.
    let outTitle = title;
    let outBody = body;

    if (!isServiceCall(req)) {
      const from = await callerId(req);
      if (!from) {
        return new Response(JSON.stringify({ error: 'Sign in first' }), { status: 401 });
      }

      // A ceiling on everyone who is not our own server. Without one, a
      // single account could write to a friend's lock screen all day.
      if (await overLimit(admin, 'send-push', callerKey(req, from), 20, 200)) {
        return new Response(JSON.stringify({ error: 'Too many' }), { status: 429 });
      }

      if (from !== userId) {
        const rel = await relation(admin, from, userId);
        if (rel === 'none') {
          return new Response(JSON.stringify({ error: 'Not allowed' }), { status: 403 });
        }

        // A friend request you sent is the one case where a stranger can
        // make a notification appear. Anyone can insert a pending row, so
        // taking their words for the contents let them write whatever they
        // liked onto the screen of anybody whose id they knew. They get a
        // fixed line instead, with their own name as the server has it.
        if (rel === 'asked') {
          if (await overLimit(admin, 'send-push-request', callerKey(req, from), 3, 20)) {
            return new Response(JSON.stringify({ error: 'Too many' }), { status: 429 });
          }
          const { data: who } = await admin
            .from('profiles').select('name').eq('id', from).maybeSingle();
          const name = String((who as any)?.name ?? '').trim().slice(0, 40) || 'Someone';
          outTitle = name + ' wants to connect';
          outBody = 'Open ZAND to accept.';
        }
      }
    }

    // Long enough for a sentence about a place. A notification is not a
    // message box.
    if (outTitle.length > 120 || outBody.length > 300) {
      return new Response(JSON.stringify({ error: 'Too long' }), { status: 400 });
    }

    // Has this person switched this category off? Their preferences live
    // in the same blob as the rest of their state.
    const { data: state } = await admin
      .from('user_state')
      .select('payload')
      .eq('user_id', userId)
      .maybeSingle();

    const prefs = (state?.payload as any)?.['notif:v1'];
    if (prefs && prefs[category] === false) {
      return new Response(JSON.stringify({ skipped: 'category off' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data: rows } = await admin
      .from('push_tokens')
      .select('token')
      .eq('user_id', userId);

    const tokens = (rows ?? []).map((r: any) => r.token).filter(Boolean);
    if (tokens.length === 0) {
      return new Response(JSON.stringify({ skipped: 'no devices' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const messages = tokens.map((to: string) => ({
      to,
      title: outTitle,
      body: outBody,
      sound: 'default',
      data: data ?? {},
    }));

    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify(messages),
    });

    const out = await res.json();
    return new Response(JSON.stringify({ sent: tokens.length, out }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});

type Relation = 'admin' | 'friend' | 'asked' | 'none';

/**
 * What line there is between these two people.
 *
 *   admin   us, writing to an owner about their listing
 *   friend  an accepted friendship, or a folder one keeps and the other
 *           is in, or a request this person sent to the caller
 *   asked   the caller has a request outstanding to them, and nothing
 *           else. Anyone can create that, so it buys a fixed line and
 *           nothing more
 *   none    no business notifying them at all
 */
async function relation(admin: any, from: string, to: string): Promise<Relation> {
  // The admin writes to owners about their listings, and an owner is
  // usually nobody's friend here.
  try {
    const adminEmail = (Deno.env.get('ADMIN_EMAIL') ?? 'nojan.zandesh@gmail.com').toLowerCase();
    const { data: who } = await admin.auth.admin.getUserById(from);
    if ((who?.user?.email ?? '').toLowerCase() === adminEmail) return 'admin';
  } catch { /* fall through to the ordinary checks */ }

  const { data: friends } = await admin
    .from('friendships')
    .select('status, requester, addressee')
    .or(`and(requester.eq.${from},addressee.eq.${to}),and(requester.eq.${to},addressee.eq.${from})`)
    .limit(2);

  let asked = false;
  for (const f of (friends ?? []) as any[]) {
    // Settled both ways, so either of them may write to the other.
    if (f.status === 'accepted') return 'friend';
    // They asked the caller. Answering someone who reached out first is
    // theirs to expect.
    if (f.requester === to) return 'friend';
    // The caller asked them. Unilateral, and free to create.
    if (f.requester === from) asked = true;
  }

  // Folders: either of them may be the owner, the other a member.
  const [{ data: mine }, { data: theirs }] = await Promise.all([
    admin.from('collection_members').select('collection_id').eq('user_id', from),
    admin.from('collection_members').select('collection_id').eq('user_id', to),
  ]);
  const ids = new Set(((mine ?? []) as any[]).map((r) => r.collection_id));
  for (const r of (theirs ?? []) as any[]) if (ids.has(r.collection_id)) return 'friend';

  const [{ data: ownedByFrom }, { data: ownedByTo }] = await Promise.all([
    admin.from('saved_collections').select('id').eq('owner_id', from),
    admin.from('saved_collections').select('id').eq('owner_id', to),
  ]);
  const fromOwns = new Set(((ownedByFrom ?? []) as any[]).map((r) => r.id));
  const toOwns = new Set(((ownedByTo ?? []) as any[]).map((r) => r.id));
  for (const r of (theirs ?? []) as any[]) if (fromOwns.has(r.collection_id)) return 'friend';
  for (const r of (mine ?? []) as any[]) if (toOwns.has(r.collection_id)) return 'friend';

  return asked ? 'asked' : 'none';
}
