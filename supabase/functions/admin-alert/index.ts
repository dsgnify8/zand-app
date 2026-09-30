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
import { callerKey, overLimit } from '../_shared/limit.ts';

type Kind = 'listing-submitted' | 'listing-removed' | 'signup' | 'listing-similar';

const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') ?? 'nojan.zandesh@gmail.com';

const TRIM = (v: unknown, n: number) =>
  typeof v === 'string' ? v.trim().slice(0, n) : '';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors() });

  try {
    const { kind, name, city, who, like } = await req.json() as {
      kind: Kind; name?: string; city?: string; who?: string; like?: string;
    };

    if (!['listing-submitted', 'listing-removed', 'signup', 'listing-similar'].includes(kind)) {
      return json({ error: 'Unknown kind' }, 400);
    }

    const service = isServiceCall(req);
    const from = service ? null : await callerId(req);

    // 'signup' is sent from the moment an account is created, and where
    // the address needs confirming there is no session yet — so requiring
    // one meant the admin never heard about a new account at all. It is
    // allowed unsigned, counted against the IP instead. Everything else
    // needs a real session.
    if (!service && !from && kind !== 'signup') {
      return json({ error: 'Sign in first' }, 401);
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // A ceiling, so nobody can use this to ring the admin's phone and
    // fill their inbox. Our own server code is not counted.
    if (!service && await overLimit(admin, 'admin-alert', callerKey(req, from), 5, 40)) {
      return json({ error: 'Too many' }, 429);
    }

    // The words, built here from the kind rather than sent by the client.
    const place = TRIM(name, 80) || 'A listing';
    const where = TRIM(city, 60);
    const person = TRIM(who, 120);
    const near = TRIM(like, 200);

    const title =
      kind === 'listing-submitted' ? 'A listing needs review'
      : kind === 'listing-removed' ? 'A listing was taken down'
      : kind === 'listing-similar' ? 'Two listings with nearly the same name'
      : 'Someone signed up';

    const body =
      kind === 'listing-submitted' ? place + (where ? ', ' + where : '') + '. Open admin to read it.'
      : kind === 'listing-removed' ? place + (where ? ', ' + where : '') + ' is no longer in the directory.'
      : kind === 'listing-similar'
        ? place + (where ? ', ' + where : '') + ' looks like ' + (near || 'something already listed')
          + '. A branch, a franchise, or two different places worth telling apart.'
      : (person || 'A new account') + ' joined ZAND.';

    // Who to reach. The admin's own account, found by the address rather
    // than by an id written into the code, so changing the address is
    // one secret rather than a deploy.
    const adminId = await findAdmin(admin);

    let pushed = 0;
    if (adminId) {
      const { data: rows } = await admin
        .from('push_tokens')
        .select('token')
        .eq('user_id', adminId);
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

/**
 * The admin's user id.
 *
 * profiles first, because it is one indexed read. The user list is the
 * fallback, and it is paged: it used to ask for the first two hundred
 * accounts and give up, so the alerts would have stopped arriving once
 * ZAND had more users than that, with nothing to say why.
 */
async function findAdmin(admin: any): Promise<string | null> {
  const wanted = ADMIN_EMAIL.toLowerCase();
  try {
    const { data } = await admin
      .from('profiles').select('id').ilike('email', wanted).maybeSingle();
    if ((data as any)?.id) return (data as any).id;
  } catch { /* fall through */ }

  try {
    for (let page = 1; page <= 20; page++) {
      const { data: list } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      const users = list?.users ?? [];
      const hit = users.find((u: any) => (u.email ?? '').toLowerCase() === wanted);
      if (hit) return hit.id;
      if (users.length < 200) break;
    }
  } catch { /* no push, the email still goes */ }
  return null;
}

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
