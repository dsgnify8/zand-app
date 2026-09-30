// Paying for a listing.
//
// Apple holds the money and the truth. This file is the thin layer
// between the app and StoreKit: what the product is, how to start it,
// how to put it back on a new phone, and how to tell our own server what
// Apple just said so the listing can be published.
//
// Deliberately small. Anything that decides whether a listing is paid
// for belongs on the server, because a phone can be told anything.

import { supabase } from '@/lib/supabase';

/** The subscription in App Store Connect. Never shown to anyone. */
export const LISTING_PRODUCT_ID = 'com.zandapplication.zand.directory.monthly';

export const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
export const PRIVACY_URL = 'https://zandapplication.com/en/privacy';

/**
 * Hand a purchase to our server for checking.
 *
 * The phone sends the signed transaction exactly as Apple gave it. The
 * server verifies the signature with Apple's own keys, writes the
 * subscription row, and only then is the listing considered paid for.
 * A client that simply claimed "I paid" would be trusted by nobody.
 */
export async function recordPurchase(args: {
  businessId: string | null;
  jws: string | null | undefined;
  transactionId?: string | null;
}): Promise<{ ok: boolean; error?: string }> {
  if (!args.jws) return { ok: false, error: 'no token' };
  try {
    const { data, error } = await supabase.functions.invoke('verify-purchase', {
      body: {
        businessId: args.businessId,
        jws: args.jws,
        transactionId: args.transactionId ?? null,
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: !!(data as any)?.ok, error: (data as any)?.error };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}

/** Is this listing covered right now, according to our own records. */
export async function listingIsPaid(businessId: string): Promise<boolean> {
  try {
    const [{ data: biz }, { data: subs }] = await Promise.all([
      supabase.from('businesses').select('billing_exempt').eq('id', businessId).maybeSingle(),
      supabase.from('subscriptions')
        .select('state')
        .eq('business_id', businessId)
        .in('state', ['trialing', 'active', 'grace'])
        .limit(1),
    ]);
    if ((biz as any)?.billing_exempt) return true;
    return !!(subs && subs.length);
  } catch {
    return false;
  }
}

/* ---------------- what the admin has to watch ---------------- */

export type SubWatchKind = 'gone' | 'down' | 'ending' | 'ended';

export type SubWatch = {
  id: string;                 // original_transaction_id
  userId: string;
  businessId: string | null;
  businessName: string | null;
  businessStatus: string | null;
  state: string;
  autoRenew: boolean;
  isTrial: boolean;
  expiresAt: string | null;
  kind: SubWatchKind;
};

/**
 * Subscriptions that are ending, have ended, or are paying for nothing.
 *
 * Four cases, in the order they matter:
 *
 *   gone    money still coming in and the listing has been deleted
 *   down    money still coming in and the listing is not in the directory
 *   ending  they turned renewal off; it runs to the date and then stops
 *   ended   over, whether it expired, was refunded or was revoked
 *
 * The first two are the ones to act on. The last two are here so a
 * listing that quietly comes down has a reason attached to it rather
 * than just disappearing.
 */
export async function subscriptionWatch(): Promise<SubWatch[]> {
  const { data: subs } = await supabase
    .from('subscriptions')
    .select('original_transaction_id, user_id, business_id, state, auto_renew, is_trial, expires_at, environment')
    .order('updated_at', { ascending: false });

  const rows = ((subs ?? []) as any[]).filter((r) => r.environment !== 'Sandbox');
  if (rows.length === 0) return [];

  // One query for the listings rather than one per row. A missing id here
  // is the interesting case, not an error: the owner deleted the listing
  // and Apple is still charging them.
  const ids = [...new Set(rows.map((r) => r.business_id).filter(Boolean))];
  const byId: Record<string, { name: string; status: string }> = {};
  if (ids.length) {
    const { data: biz } = await supabase
      .from('businesses')
      .select('id, name, status')
      .in('id', ids);
    for (const b of (biz ?? []) as any[]) byId[b.id] = { name: b.name, status: b.status };
  }

  const live = (st: string) => st === 'trialing' || st === 'active' || st === 'grace';

  const out: SubWatch[] = [];
  for (const r of rows) {
    const b = r.business_id ? byId[r.business_id] : undefined;
    const paying = live(r.state);

    let kind: SubWatchKind | null = null;
    if (paying && r.business_id && !b) kind = 'gone';
    else if (paying && b && b.status !== 'active') kind = 'down';
    else if (paying && !r.auto_renew) kind = 'ending';
    else if (!paying) kind = 'ended';

    if (!kind) continue;   // paying, live, renewing. Nothing to see.

    out.push({
      id: r.original_transaction_id,
      userId: r.user_id,
      businessId: r.business_id ?? null,
      businessName: b?.name ?? null,
      businessStatus: b?.status ?? null,
      state: r.state,
      autoRenew: !!r.auto_renew,
      isTrial: !!r.is_trial,
      expiresAt: r.expires_at ?? null,
      kind,
    });
  }

  const order: SubWatchKind[] = ['gone', 'down', 'ending', 'ended'];
  return out.sort((a, z) => order.indexOf(a.kind) - order.indexOf(z.kind));
}
