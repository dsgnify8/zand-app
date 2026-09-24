// Sends a push notification to a user's devices.
//
// Call it with a user id, a title and a body. It looks up that user's
// device tokens, checks the category is one they have left switched on,
// and hands the batch to Expo's push service.
//
// Two things it deliberately does not do:
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

type Category = 'articles' | 'friends';

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
    if (!isServiceCall(req)) {
      const from = await callerId(req);
      if (!from) {
        return new Response(JSON.stringify({ error: 'Sign in first' }), { status: 401 });
      }
      if (from !== userId && !(await mayNotify(admin, from, userId))) {
        return new Response(JSON.stringify({ error: 'Not allowed' }), { status: 403 });
      }
    }

    // Long enough for a sentence about a place. A notification is not a
    // message box.
    if (title.length > 120 || body.length > 300) {
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
    if (prefs && category && prefs[category] === false) {
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
      title,
      body,
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

/**
 * Is there already a line between these two people?
 *
 * A friendship in either direction, accepted or still pending — someone
 * you have asked to connect may be told that you accepted — or a folder
 * one of them keeps and the other is in.
 */
async function mayNotify(admin: any, from: string, to: string): Promise<boolean> {
  // The admin writes to owners about their listings, and an owner is
  // usually nobody's friend here.
  try {
    const adminEmail = (Deno.env.get('ADMIN_EMAIL') ?? 'nojan.zandesh@gmail.com').toLowerCase();
    const { data: who } = await admin.auth.admin.getUserById(from);
    if ((who?.user?.email ?? '').toLowerCase() === adminEmail) return true;
  } catch { /* fall through to the ordinary checks */ }

  const { data: friends } = await admin
    .from('friendships')
    .select('id')
    .or(`and(requester.eq.${from},addressee.eq.${to}),and(requester.eq.${to},addressee.eq.${from})`)
    .limit(1);
  if (friends && friends.length) return true;

  // Folders: either of them may be the owner, the other a member.
  const [{ data: mine }, { data: theirs }] = await Promise.all([
    admin.from('collection_members').select('collection_id').eq('user_id', from),
    admin.from('collection_members').select('collection_id').eq('user_id', to),
  ]);
  const ids = new Set(((mine ?? []) as any[]).map((r) => r.collection_id));
  for (const r of (theirs ?? []) as any[]) if (ids.has(r.collection_id)) return true;

  const [{ data: ownedByFrom }, { data: ownedByTo }] = await Promise.all([
    admin.from('saved_collections').select('id').eq('owner_id', from),
    admin.from('saved_collections').select('id').eq('owner_id', to),
  ]);
  const fromOwns = new Set(((ownedByFrom ?? []) as any[]).map((r) => r.id));
  const toOwns = new Set(((ownedByTo ?? []) as any[]).map((r) => r.id));
  for (const r of (theirs ?? []) as any[]) if (fromOwns.has(r.collection_id)) return true;
  for (const r of (mine ?? []) as any[]) if (toOwns.has(r.collection_id)) return true;

  return false;
}
