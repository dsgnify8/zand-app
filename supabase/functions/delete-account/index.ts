// Deletes the calling user's account and everything attached to it.
//
// This has to run server-side: removing an auth user needs the service
// role key, and that key must never reach the client. The function
// authenticates the caller from their own JWT and can only ever delete
// whoever is calling — there is no user id parameter, deliberately, so
// there is nothing to tamper with.
//
// Deploy with:  supabase functions deploy delete-account

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  try {
    const auth = req.headers.get('Authorization') ?? '';
    const jwt = auth.replace('Bearer ', '');
    if (!jwt) return new Response(JSON.stringify({ error: 'not signed in' }), { status: 401 });

    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Who is calling? Ask with their own token, not ours.
    const asUser = createClient(url, anon, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: me, error: meErr } = await asUser.auth.getUser();
    if (meErr || !me?.user) {
      return new Response(JSON.stringify({ error: 'not signed in' }), { status: 401 });
    }
    const uid = me.user.id;

    const admin = createClient(url, service);

    // Their own rows first. Friendships are two-sided, so both columns.
    await admin.from('user_state').delete().eq('user_id', uid);
    await admin.from('events').delete().eq('user_id', uid);
    await admin.from('sent_items').delete().or(`sender.eq.${uid},recipient.eq.${uid}`);
    await admin.from('friendships').delete().or(`requester.eq.${uid},addressee.eq.${uid}`);
    await admin.from('profiles').delete().eq('id', uid);

    // Then the account itself.
    const { error } = await admin.auth.admin.deleteUser(uid);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});
