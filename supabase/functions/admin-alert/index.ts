// Tells the admin when something happens that they would want to know
// about: a listing sent for review, a listing taken down, a new account.
//
// It exists rather than going through send-push because these are not
// notifications between friends. The caller says what happened; this
// function decides who hears about it, which is always the same person,
// and it never takes an arbitrary recipient or arbitrary words from the
// client — only a kind and a couple of names to put in the sentence.
//
// Deploy with:  supabase functions deploy admin-alert

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { callerId, isServiceCall } from '../_shared/caller.ts';

type Kind = 'listing-submitted' | 'listing-removed' | 'signup';

const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') ?? 'nojan.zandesh@gmail.com';

const TRIM = (v: unknown, n: number) =>
  typeof v === 'string' ? v.trim().slice(0, n) : '';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors() });

  try {
    const { kind, name, city, who } = await req.json() as {
      kind: Kind; name?: string; city?: string; who?: string;
    };

    if (!['listing-submitted', 'listing-removed', 'signup'].includes(kind)) {
      return json({ error: 'Unknown kind' }, 400);
    }

    // Signed in, or our own server code. Nothing here is worth much to
    // an attacker, but an open endpoint is still an open endpoint.
    const from = isServiceCall(req) ? null : await callerId(req);
    if (!isServiceCall(req) && !from) return json({ error: 'Sign in first' }, 401);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // The words, built here from the kind rather than sent by the client.
    const place = TRIM(name, 80) || 'A listing';
    const where = TRIM(city, 60);
    const person = TRIM(who, 120);

    const title =
      kind === 'listing-submitted' ? 'A listing needs review'
      : kind === 'listing-removed' ? 'A listing was taken down'
      : 'Someone signed up';

    const body =
      kind === 'listing-submitted' ? place + (where ? ', ' + where : '') + '. Open admin to read it.'
      : kind === 'listing-removed' ? place + (where ? ', ' + where : '') + ' is no longer in the directory.'
      : (person || 'A new account') + ' joined ZAND.';

    // Who to reach. The admin's own account, found by the address rather
    // than by an id written into the code, so changing the address is
    // one secret rather than a deploy.
    const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const adminUser = (list?.users ?? []).find(
      (u: any) => (u.email ?? '').toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    );

    let pushed = 0;
    if (adminUser) {
      const { data: rows } = await admin
        .from('push_tokens')
        .select('token')
        .eq('user_id', adminUser.id);
      const tokens = (rows ?? []).map((r: any) => r.token).filter(Boolean);
      if (tokens.length) {
        // Straight to Expo rather than through send-push: an admin alert
        // should not be silenced by a category someone switched off.
        const res = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tokens.map((to: string) => ({
            to, title, body, sound: 'default',
            data: { admin: true, kind },
          }))),
        });
        if (res.ok) pushed = tokens.length;
      }
    }

    // And an email, because a phone that is face down misses everything.
    const key = Deno.env.get('RESEND_API_KEY');
    if (key) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'ZAND <hello@zandapplication.com>',
          to: [ADMIN_EMAIL],
          subject: title,
          text: body,
        }),
      }).catch(() => {});
    }

    return json({ ok: true, pushed });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}
