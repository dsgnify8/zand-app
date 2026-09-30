// A purchase, checked.
//
// The app calls this the moment Apple says a subscription started. It
// reads the ids out of the signed transaction, asks Apple's server what
// that subscription really is, writes the row, and answers yes or no.
// The app is never believed on its own.
//
// Deploy with:  supabase functions deploy verify-purchase

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { callerId } from '../_shared/caller.ts';
import { applySubscription, readJws, subscriptionStatus } from '../_shared/apple.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors() });

  try {
    const who = await callerId(req);
    if (!who) return json({ ok: false, error: 'Sign in first' }, 401);

    const { jws, businessId } = await req.json() as {
      jws?: string; businessId?: string | null;
    };
    if (!jws) return json({ ok: false, error: 'No transaction' }, 400);

    // Only to find out which subscription is being talked about. Nothing
    // in here is trusted.
    const claimed = readJws<any>(jws);
    const originalId = claimed?.originalTransactionId ?? claimed?.transactionId;
    if (!originalId) return json({ ok: false, error: 'Unreadable transaction' }, 400);

    const sub = await subscriptionStatus(String(originalId));
    if (!sub) return json({ ok: false, error: 'Apple does not know this one' }, 400);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // The listing has to belong to the person paying for it.
    let listing: string | null = null;
    if (businessId) {
      const { data: biz } = await admin
        .from('businesses').select('id, owner_id').eq('id', businessId).maybeSingle();
      if (biz && biz.owner_id === who) listing = biz.id;
    }

    const res = await applySubscription(admin, sub, {
      userId: who, businessId: listing, notification: 'VERIFY',
    });

    const live = ['trialing', 'active', 'grace'].includes(String(res.state));
    return json({ ok: res.ok && live, state: res.state, error: res.error });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
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
    status, headers: { 'Content-Type': 'application/json', ...cors() },
  });
}
