// What Apple tells us, unprompted.
//
// Renewals, cancellations, failed cards, refunds, a family sharing
// change. Apple posts here and we treat the post as a nudge rather than
// as fact: whatever it says, we then ask Apple's server for the current
// state of that subscription and write that. It means a forged post can
// do nothing, and a missed post is repaired by the next one.
//
// This one is called by Apple, not by a person, so deploy it without a
// token check:
//   supabase functions deploy apple-notifications --no-verify-jwt

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { applySubscription, readJws, subscriptionStatus } from '../_shared/apple.ts';

Deno.serve(async (req) => {
  try {
    const { signedPayload } = await req.json() as { signedPayload?: string };
    if (!signedPayload) return new Response('no payload', { status: 400 });

    const outer = readJws<any>(signedPayload);
    const type: string = outer?.notificationType ?? 'UNKNOWN';
    const subtype: string = outer?.subtype ?? '';
    const tx = readJws<any>(outer?.data?.signedTransactionInfo ?? '');
    const originalId = tx?.originalTransactionId;

    // Apple also sends a test notification with no transaction in it.
    if (!originalId) {
      console.log('[apple] ' + type + ' ' + subtype + ' (no transaction)');
      return new Response('ok');
    }

    const sub = await subscriptionStatus(String(originalId));
    if (!sub) {
      console.log('[apple] ' + type + ' unknown to the server: ' + originalId);
      return new Response('ok');
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const res = await applySubscription(admin, sub, {
      notification: type + (subtype ? ' ' + subtype : ''),
    });
    console.log('[apple] ' + type + ' ' + subtype + ' -> ' + res.state);

    // Told the owner, told the admin. Only the two that change what
    // somebody has to do: the listing came down, or the card failed.
    if (res.ok && res.businessId && res.userId) {
      const { data: biz } = await admin
        .from('businesses').select('name').eq('id', res.businessId).maybeSingle();
      const name = biz?.name ?? 'Your listing';

      if (res.state === 'expired' || res.state === 'revoked') {
        await push(admin, res.userId,
          name + ' is no longer listed',
          'The subscription ended, so it has come out of the directory. Resubscribe any time and it goes straight back.');
        await alertAdmin(admin, 'A listing came down', name + ': subscription ' + res.state + '.');
      } else if (subtype === 'GRACE_PERIOD' || type === 'DID_FAIL_TO_RENEW') {
        await push(admin, res.userId,
          'A payment did not go through',
          name + ' stays up for now. Updating the card in Settings keeps it there.');
      }
    }

    return new Response('ok');
  } catch (e) {
    console.error('[apple] ' + String(e));
    // Apple retries on anything but a 2xx, and a retry storm helps
    // nobody: the next notification, or the nightly sweep, repairs it.
    return new Response('ok');
  }
});

async function push(admin: any, userId: string, title: string, body: string) {
  try {
    const { data: rows } = await admin.from('push_tokens').select('token').eq('user_id', userId);
    const tokens = (rows ?? []).map((r: any) => r.token).filter(Boolean);
    if (!tokens.length) return;
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokens.map((to: string) => ({
        to, title, body, sound: 'default', data: { tab: 'listings' },
      }))),
    });
  } catch { /* a notification must not break the accounting */ }
}

async function alertAdmin(admin: any, title: string, body: string) {
  try {
    const email = (Deno.env.get('ADMIN_EMAIL') ?? 'nojan.zandesh@gmail.com');
    const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const me = (list?.users ?? []).find(
      (u: any) => (u.email ?? '').toLowerCase() === email.toLowerCase(),
    );
    if (me) await push(admin, me.id, title, body);

    const key = Deno.env.get('RESEND_API_KEY');
    if (key) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'ZAND <hello@zandapplication.com>',
          to: [email], subject: title, text: body,
        }),
      });
    }
  } catch { /* as above */ }
}
