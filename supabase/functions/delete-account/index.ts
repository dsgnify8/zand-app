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

    // How long they stayed, read before anything is removed. Asking
    // afterwards would always return nothing, which is the sort of
    // metric that looks like it works and is quietly always null.
    const { data: st } = await admin
      .from('user_state')
      .select('created_at')
      .eq('user_id', uid)
      .maybeSingle();
    const daysActive = st?.created_at
      ? Math.round((Date.now() - new Date(st.created_at).getTime()) / 86400000)
      : null;

    // Their own rows first. Friendships are two-sided, so both columns.
    await admin.from('user_state').delete().eq('user_id', uid);
    await admin.from('events').delete().eq('user_id', uid);
    await admin.from('sent_items').delete().or(`sender.eq.${uid},recipient.eq.${uid}`);
    await admin.from('friendships').delete().or(`requester.eq.${uid},addressee.eq.${uid}`);
    await admin.from('profiles').delete().eq('id', uid);

    // The device registration, or a deleted account's phone keeps
    // receiving notifications addressed to a user that no longer exists.
    await admin.from('push_tokens').delete().eq('user_id', uid);

    // Anything they own. A listing whose owner has gone is unreachable
    // by anyone: no one can edit it and no one can take it down.
    const { data: mine } = await admin.from('businesses').select('id').eq('owner_id', uid);
    for (const b of mine ?? []) {
      await admin.from('founder_stories').delete().eq('business_id', b.id);
      await admin.from('business_messages').delete().eq('business_id', b.id);
    }
    await admin.from('businesses').delete().eq('owner_id', uid);

    // And their folders, and their membership of other people's.
    await admin.from('collection_members').delete().eq('user_id', uid);

    // Their folders, and everything in them. The table is
    // saved_collections rather than collections, which is the sort of
    // thing a delete gets wrong silently: no error, nothing removed.
    const { data: folders } = await admin.from('saved_collections').select('id').eq('owner_id', uid);
    for (const f of folders ?? []) {
      await admin.from('saved_collection_items').delete().eq('collection_id', f.id);
      await admin.from('collection_members').delete().eq('collection_id', f.id);
    }
    await admin.from('saved_collections').delete().eq('owner_id', uid);

    // A tombstone, before the account goes. No email, no name, no id
    // that could be joined back to anything: just that somebody left,
    // when, and roughly how long they stayed. Enough to see a pattern,
    // and nothing that would make the deletion less than complete.
    try {
      await admin.from('deleted_accounts').insert({
        days_active: daysActive,
        had_listing: (mine ?? []).length > 0,
      });
    } catch {}

    // Last thing they hear from us, and it has to go before the
    // account does: afterwards there is no address left to send to.
    // Failing to send is not a reason to fail the deletion.
    try {
      const key = Deno.env.get('RESEND_API_KEY');
      if (key && me.user.email) {
        await fetch(url + '/functions/v1/send-email', {
          method: 'POST',
          headers: { Authorization: `Bearer ${service}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ kind: 'account-deleted', to: me.user.email }),
        });
      }
    } catch {}

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
