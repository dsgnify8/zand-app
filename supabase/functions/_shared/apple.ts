// Talking to Apple about subscriptions.
//
// The rule here: never believe a phone about money, and never bother
// verifying signatures by hand. A purchase arrives from the app as a
// signed transaction, we read the ids out of it, and then we ask Apple's
// own server what the state of that subscription actually is. The answer
// came from Apple over TLS with our key, so it is the truth.
//
// Secrets, set in Edge Functions:
//   APPLE_IAP_KEY_ID    the In-App Purchase key id
//   APPLE_ISSUER_ID     the issuer id from App Store Connect
//   APPLE_IAP_KEY       the .p8 file's contents, newlines and all
//   APPLE_BUNDLE_ID     com.zandapplication.zand

const PROD = 'https://api.storekit.itunes.apple.com';
const SANDBOX = 'https://api.storekit-sandbox.itunes.apple.com';

const b64url = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/** The payload of a JWS, without checking the signature. */
export function readJws<T = any>(token: string): T | null {
  try {
    const part = token.split('.')[1];
    const pad = part.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4));
    return JSON.parse(decodeURIComponent(escape(json))) as T;
  } catch {
    try {
      const part = token.split('.')[1];
      return JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/'))) as T;
    } catch { return null; }
  }
}

/** A short-lived token that proves this is us asking. */
async function appleToken(): Promise<string> {
  const keyId = Deno.env.get('APPLE_IAP_KEY_ID')!;
  const issuer = Deno.env.get('APPLE_ISSUER_ID')!;
  const bundle = Deno.env.get('APPLE_BUNDLE_ID') ?? 'com.zandapplication.zand';
  const pem = (Deno.env.get('APPLE_IAP_KEY') ?? '').replace(/\\n/g, '\n');

  const body = pem.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '');
  const der = Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'pkcs8', der, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign'],
  );

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'ES256', kid: keyId, typ: 'JWT' };
  const payload = {
    iss: issuer, iat: now, exp: now + 1800,
    aud: 'appstoreconnect-v1', bid: bundle,
  };
  const enc = new TextEncoder();
  const signing = b64url(enc.encode(JSON.stringify(header))) + '.' +
                  b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, key, enc.encode(signing),
  );
  return signing + '.' + b64url(sig);
}

export type AppleSubscription = {
  originalTransactionId: string;
  productId: string;
  environment: string;          // Production | Sandbox
  status: number;               // 1 active, 2 expired, 3 retry, 4 grace, 5 revoked
  expiresAt: string | null;
  autoRenew: boolean;
  isTrial: boolean;
  appAccountToken: string | null;
};

/**
 * What Apple currently says about one subscription.
 *
 * Production is asked first. A sandbox purchase answers 4040010 there,
 * which is the documented way to find out you are in the other world.
 */
export async function subscriptionStatus(
  originalTransactionId: string,
): Promise<AppleSubscription | null> {
  const token = await appleToken();

  for (const base of [PROD, SANDBOX]) {
    const res = await fetch(
      `${base}/inApps/v1/subscriptions/${originalTransactionId}`,
      { headers: { Authorization: 'Bearer ' + token } },
    );
    if (res.status === 404) continue;
    if (!res.ok) continue;

    const data = await res.json();
    const group = (data.data ?? [])[0];
    const item = (group?.lastTransactions ?? [])[0];
    if (!item) continue;

    const tx = readJws<any>(item.signedTransactionInfo) ?? {};
    const renewal = readJws<any>(item.signedRenewalInfo) ?? {};

    return {
      originalTransactionId: tx.originalTransactionId ?? originalTransactionId,
      productId: tx.productId ?? '',
      environment: data.environment ?? tx.environment ?? 'Production',
      status: Number(item.status ?? 0),
      expiresAt: tx.expiresDate ? new Date(tx.expiresDate).toISOString() : null,
      autoRenew: renewal.autoRenewStatus === 1,
      // offerType 1 is the introductory offer, which is our free week.
      isTrial: tx.offerType === 1 || tx.offerDiscountType === 'FREE_TRIAL',
      appAccountToken: tx.appAccountToken ?? null,
    };
  }
  return null;
}

/** Apple's number, in words the rest of the app uses. */
export function stateFor(sub: AppleSubscription): string {
  switch (sub.status) {
    case 1: return sub.isTrial ? 'trialing' : 'active';
    // In billing retry and in grace both mean: still theirs for now.
    case 3:
    case 4: return 'grace';
    case 2: return 'expired';
    case 5: return 'revoked';
    default: return 'expired';
  }
}

/**
 * Write what Apple said, and take the listing down if the money stopped.
 *
 * The listing is never published from here. Publishing is the admin's
 * decision; this only removes.
 */
export async function applySubscription(
  admin: any,
  sub: AppleSubscription,
  hints: { userId?: string | null; businessId?: string | null; notification?: string } = {},
) {
  const state = stateFor(sub);

  const { data: existing } = await admin
    .from('subscriptions')
    .select('user_id, business_id')
    .eq('original_transaction_id', sub.originalTransactionId)
    .maybeSingle();

  const userId = hints.userId ?? existing?.user_id ?? sub.appAccountToken;
  const businessId = hints.businessId ?? existing?.business_id ?? null;
  if (!userId) return { ok: false, error: 'no user for this subscription' };

  await admin.from('subscriptions').upsert({
    original_transaction_id: sub.originalTransactionId,
    user_id: userId,
    business_id: businessId,
    product_id: sub.productId,
    state,
    expires_at: sub.expiresAt,
    auto_renew: sub.autoRenew,
    is_trial: sub.isTrial,
    environment: sub.environment,
    last_notification: hints.notification ?? null,
    last_notification_at: hints.notification ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'original_transaction_id' });

  // The money stopped. The listing comes out of the directory, and keeps
  // everything it had, so paying again puts it straight back.
  if (['expired', 'revoked'].includes(state) && businessId) {
    await admin.from('businesses')
      .update({ status: 'lapsed' })
      .eq('id', businessId)
      .eq('billing_exempt', false)
      .in('status', ['active', 'approved']);
  }

  // Paid again after lapsing, and it had already been approved once.
  if (['active', 'trialing', 'grace'].includes(state) && businessId) {
    await admin.from('businesses')
      .update({ status: 'active', paid_until: sub.expiresAt })
      .eq('id', businessId)
      .eq('status', 'lapsed');
    await admin.from('businesses')
      .update({ paid_until: sub.expiresAt })
      .eq('id', businessId);
  }

  return { ok: true, state, businessId, userId };
}
