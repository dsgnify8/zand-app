// The four emails we send ourselves.
//
// Supabase covers password resets and email changes because those carry
// a token it has to mint. Everything else is ours: welcome, password
// changed, phone changed, account deleted.
//
// One function rather than four. The templates differ by a heading and
// two paragraphs, and four near-identical functions is four places to
// forget when the wordmark changes.
//
// Deploy:  supabase functions deploy send-email
// Secrets: RESEND_API_KEY, set in Edge Functions > Secrets.
//
// Who may call it: anyone holding the service role key, or a signed-in
// user sending to their own address. The second matters because the app
// calls this directly after a password change, and it must not become a
// way to send mail to arbitrary addresses.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type Kind = 'welcome' | 'password-changed' | 'phone-changed' | 'account-deleted';

const SUBJECTS: Record<Kind, string> = {
  'welcome': 'Welcome to ZAND',
  'password-changed': 'Your ZAND password was changed',
  'phone-changed': 'Your ZAND phone number was changed',
  'account-deleted': 'Your ZAND account has been deleted',
};

/* ---------------- the shell ---------------- */

// Everything shared: the cream ground, the card, the wordmark set in
// Montserrat rather than placed as an image, and the footer rule.
function shell(heading: string, body: string, footer: string, cta?: { label: string; href: string }) {
  const sans = "'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
  return `
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAF7F3;margin:0;padding:40px 0;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#FFFFFF;border-radius:14px;padding:44px 40px;">

      <tr><td style="font-family:${sans};font-weight:500;font-size:17px;letter-spacing:1.84px;color:#1C1411;padding-bottom:36px;">ZAND</td></tr>

      <tr><td style="font-family:${sans};font-weight:500;font-size:24px;line-height:32px;letter-spacing:-0.2px;color:#8E1B3A;padding-bottom:16px;">${heading}</td></tr>

      ${body}

      ${cta ? `
      <tr><td style="padding-bottom:32px;">
        <a href="${cta.href}" style="display:inline-block;background:#8E1B3A;background-image:linear-gradient(180deg,#B2254A 0%,#9C1D3F 48%,#8E1B3A 100%);color:#FFFFFF;font-family:${sans};font-weight:500;font-size:14px;text-decoration:none;padding:14px 30px;border-radius:10px;">${cta.label}</a>
      </td></tr>` : ''}

      <tr><td style="border-top:1px solid #EDE7E0;padding-top:22px;font-family:${sans};font-weight:400;font-size:11.5px;line-height:19px;color:#A2968E;">${footer}</td></tr>

    </table>
  </td></tr>
</table>`;
}

function p(text: string, last = false) {
  const sans = "'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
  return `<tr><td style="font-family:${sans};font-weight:400;font-size:14px;line-height:25px;color:#4A403A;padding-bottom:${last ? 30 : 22}px;">${text}</td></tr>`;
}

const MAILTO =
  '<a href="mailto:admin@zandapplication.com" style="color:#8E1B3A;text-decoration:none;">admin@zandapplication.com</a>';

/* ---------------- the four ---------------- */

function render(kind: Kind, name?: string): string {
  switch (kind) {
    case 'welcome':
      return shell(
        name ? `Welcome, ${name}` : 'Welcome to ZAND',
        p('Your account is ready. Whatever you read, learn or save from here is kept, and it follows you to whichever device you open next.') +
        p('There is a lot in there: three thousand years of history, the language from its alphabet up, and Iranian places and people wherever you happen to be. Start anywhere.', true),
        `Anything at all, write to us at ${MAILTO}.`,
        { label: 'Open ZAND', href: 'https://zandapplication.com' },
      );

    case 'password-changed':
      return shell(
        'Your password changed',
        p('This is just so you know. The password on your ZAND account was changed. If that was you, there is nothing to do.') +
        p(`If it was not, reset it now and write to us at ${MAILTO}.`, true),
        'We send this every time, so an unexpected one is a signal rather than a surprise.',
      );

    case 'phone-changed':
      return shell(
        'Your number changed',
        p(`The phone number on your ZAND account was updated. If that was you, nothing to do. If not, write to us at ${MAILTO} and we will sort it out.`, true),
        'ZAND',
      );

    case 'account-deleted':
      return shell(
        'Your account has been deleted',
        p('It is done. Your progress, your saved things, your listings and your connections have all been removed, and we no longer hold anything that identifies you.') +
        p(`You are welcome back any time, and you would start fresh. If you deleted this by accident, write to us quickly at ${MAILTO}, though there may be nothing left to recover.`, true),
        'Thank you for the time you spent with us.',
      );
  }
}

/* ---------------- the endpoint ---------------- */

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
    const { kind, to, name } = await req.json() as { kind: Kind; to: string; name?: string };
    if (!kind || !to || !SUBJECTS[kind]) {
      return json({ error: 'kind and to are required' }, 400);
    }

    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const auth = req.headers.get('Authorization') ?? '';
    const jwt = auth.replace('Bearer ', '');

    // Either the service key, or a signed-in user sending to themselves.
    // Without the second check this is an open relay wearing our name.
    let allowed = jwt === service;
    if (!allowed && jwt) {
      const asUser = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: `Bearer ${jwt}` } } },
      );
      const { data: me } = await asUser.auth.getUser();
      allowed = me?.user?.email?.toLowerCase() === to.toLowerCase();
    }
    if (!allowed) return json({ error: 'not allowed' }, 403);

    const key = Deno.env.get('RESEND_API_KEY');
    if (!key) return json({ error: 'not configured' }, 500);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ZAND <hello@zandapplication.com>',
        to: [to],
        subject: SUBJECTS[kind],
        html: render(kind, name),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('resend error', res.status, detail);
      return json({ error: 'could not send', status: res.status }, 502);
    }

    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
