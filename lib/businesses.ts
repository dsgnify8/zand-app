// The Local directory: reading and writing business listings.
//
// Everything about what a listing is, and who may see it, lives here so
// the screens stay about presentation. Row-level security does the real
// enforcement server-side; the filters below are about asking the right
// question, not about trust.

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { alertAdmin } from '@/lib/admin-alert';
import { compareNames, nameKey, type NameMatch } from '@/lib/listing-names';
import { listingIsPaid } from '@/lib/billing';
import { removePhoto } from '@/lib/business-photos';
import { expandQuery, buildSearchIndex } from '@/lib/business-search';
import { categoriesFor } from '@/constants/search-synonyms';

export type BusinessStatus =
  | 'draft' | 'submitted' | 'rejected' | 'approved' | 'active' | 'lapsed';

export type Business = {
  id: string;
  owner_id: string;
  name: string;
  name_fa?: string | null;
  tagline?: string | null;
  tagline_fa?: string | null;
  description?: string | null;
  description_fa?: string | null;
  category: string;
  status: BusinessStatus;
  review_note?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  phone?: string | null;
  website?: string | null;
  socials?: Record<string, string>;
  hours?: Record<string, string>;
  photos?: string[];
  keywords?: string[];
  badge?: string | null;
  badge_fa?: string | null;
  city_fa?: string | null;
  search_fa?: string | null;
  paid_until?: string | null;
  /** Listed before any of this, and never asked to pay. */
  billing_exempt?: boolean;
  created_at?: string;
  // Set by an admin, not by owners. Fills the top of the feed when there
  // is no location to sort by.
  featured?: boolean;
  /** Gregorian. Decides what appears under Newly opened. */
  opened_year?: number | null;
  /** Whether the owner wants it on their own page. The section uses the
   *  year either way — this is about their page, not about what we know. */
  show_opened?: boolean;
  /**
   * What to call the website on the page — "Our online store" rather than
   * a forty-character URL. Only used where there is no address, since an
   * address always takes that slot.
   */
  website_label?: string | null;
  /** Offered at submission; whether it becomes a page is decided later. */
  has_story?: boolean;
  story_pitch?: string | null;
  submitted_at?: string | null;
};

/* ---------------- categories ---------------- */

// Fixed and ordered. These become a filter row, so they want to be
// stable — adding is cheap, renaming or removing orphans listings.
export const CATEGORIES = [
  { key: 'restaurant', en: 'Restaurants', fa: 'رستوران', icon: 'restaurant-outline' },
  { key: 'cafe',       en: 'Cafés',       fa: 'کافه',     icon: 'cafe-outline' },
  { key: 'bakery',     en: 'Bakeries',    fa: 'شیرینی‌پزی', icon: 'nutrition-outline' },
  { key: 'grocery',    en: 'Grocers',     fa: 'سوپرمارکت', icon: 'basket-outline' },
  { key: 'candy',      en: 'Candy',       fa: 'شیرینی و آبنبات', icon: 'ice-cream-outline' },
  { key: 'dessert',    en: 'Desserts',    fa: 'دسر',       icon: 'ice-cream-outline' },
  { key: 'winery',     en: 'Wineries',    fa: 'تاکستان',   icon: 'wine-outline' },
  // Libraries, galleries, bookshops, community rooms. Not a shop and not
  // a restaurant, and the directory is poorer without them.
  { key: 'culture',    en: 'Culture',     fa: 'فرهنگی',    icon: 'library-outline' },
  { key: 'beauty',     en: 'Beauty',      fa: 'زیبایی',    icon: 'sparkles-outline' },
  { key: 'clothing',   en: 'Clothing',    fa: 'پوشاک',     icon: 'shirt-outline' },
  { key: 'jewellery',  en: 'Jewellery',   fa: 'طلا و جواهر', icon: 'diamond-outline' },
  { key: 'repair',     en: 'Car repair',  fa: 'تعمیرگاه',  icon: 'car-outline' },
  { key: 'interior',   en: 'Interiors',   fa: 'دکوراسیون',  icon: 'bed-outline' },
  { key: 'photo',      en: 'Photography', fa: 'عکاسی',     icon: 'camera-outline' },
  { key: 'events',     en: 'Events',      fa: 'تشریفات',   icon: 'balloon-outline' },
  { key: 'legal',      en: 'Legal',       fa: 'حقوقی',     icon: 'document-text-outline' },
  { key: 'medical',    en: 'Medical',     fa: 'پزشکی',     icon: 'medkit-outline' },
  { key: 'dental',     en: 'Dental',      fa: 'دندان‌پزشکی', icon: 'happy-outline' },
  { key: 'tutoring',   en: 'Tutoring',    fa: 'آموزش',     icon: 'school-outline' },
  { key: 'finance',    en: 'Finance',     fa: 'مالی',      icon: 'calculator-outline' },
  { key: 'property',   en: 'Property',    fa: 'املاک',     icon: 'home-outline' },
  { key: 'arts',       en: 'Arts',        fa: 'هنر',       icon: 'color-palette-outline' },
  { key: 'music',      en: 'Music',       fa: 'موسیقی',    icon: 'musical-notes-outline' },
  { key: 'travel',     en: 'Travel',      fa: 'سفر',       icon: 'airplane-outline' },
  { key: 'fitness',    en: 'Fitness',     fa: 'ورزش',      icon: 'barbell-outline' },
  { key: 'other',      en: 'Other',       fa: 'دیگر',      icon: 'ellipsis-horizontal-outline' },
] as const;

export function categoryLabel(key: string, fa: boolean) {
  const c = CATEGORIES.find((x) => x.key === key);
  return c ? (fa ? c.fa : c.en) : key;
}

/* ---------------- public reads ---------------- */

export type Near = { lat: number; lng: number; km?: number };

/**
 * Live listings. With a location we take a bounding box and sort by
 * rough distance — good enough over a city, and far cheaper than
 * anything involving trigonometry in the database.
 */
/**
 * What a card draws.
 *
 * select('*') also carries the Persian search index, the keyword array
 * and the story pitch, none of which a card reads. On a feed of a
 * hundred listings that is most of the response, and the feed is the
 * one query someone waits on.
 */
const CARD_COLUMNS =
  'id, owner_id, name, name_fa, tagline, tagline_fa, description, description_fa, ' +
  'category, status, country, city, city_fa, address, lat, lng, phone, website, ' +
  'website_label, socials, hours, photos, badge, badge_fa, featured, opened_year, ' +
  'show_opened, has_story, created_at';

export async function loadBusinesses(opts: {
  near?: Near;
  city?: string;
  country?: string;
  category?: string;
  query?: string;
  limit?: number;
  /** The feed. Full rows are for the listing's own page. */
  slim?: boolean;
} = {}): Promise<Business[]> {
  let q = supabase
    .from('businesses')
    .select(opts.slim ? CARD_COLUMNS : '*')
    .eq('status', 'active');

  if (opts.category) q = q.eq('category', opts.category);
  if (opts.city) q = q.ilike('city', opts.city);
  if (opts.country) q = q.ilike('country', opts.country);
  if (opts.query) {
    const t = opts.query.trim();
    // A Persian query is widened into the English terms it implies, so
    // someone typing غذا finds a listing that only ever said "food".
    const terms = expandQuery(t);
    const ors: string[] = [];
    terms.forEach((w) => {
      ors.push(`name.ilike.%${w}%`, `name_fa.ilike.%${w}%`, `tagline.ilike.%${w}%`,
               `description.ilike.%${w}%`, `search_fa.ilike.%${w}%`,
               `keywords.cs.{"${w.toLowerCase()}"}`);
    });

    // And the categories the words imply. Nobody searches "restaurant" —
    // they search kebab, or dinner, or غذا, and a listing that never uses
    // any of those words is still the answer. Matching the category means
    // the right places turn up whatever words they happen to contain.
    categoriesFor(t).forEach((c) => ors.push(`category.eq.${c}`));

    q = q.or(ors.join(','));
  }

  if (opts.near) {
    // one degree of latitude is ~111km; longitude shrinks with latitude
    const km = opts.near.km ?? 40;
    const dLat = km / 111;
    const dLng = km / (111 * Math.max(0.2, Math.cos((opts.near.lat * Math.PI) / 180)));
    q = q
      .gte('lat', opts.near.lat - dLat).lte('lat', opts.near.lat + dLat)
      .gte('lng', opts.near.lng - dLng).lte('lng', opts.near.lng + dLng);
  }

  const { data } = await q.limit(opts.limit ?? 100);
  const rows = (data ?? []) as unknown as Business[];

  if (!opts.near) return rows;

  const { lat, lng } = opts.near;
  return rows
    .map((b) => ({ b, d: dist(lat, lng, b.lat ?? 0, b.lng ?? 0) }))
    .sort((a, z) => a.d - z.d)
    .map((x) => x.b);
}

// Kilometres between two points. Haversine, because the flat
// approximation drifts noticeably once you are comparing cities.
export function dist(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371;
  const p = Math.PI / 180;
  const h =
    0.5 - Math.cos((bLat - aLat) * p) / 2 +
    (Math.cos(aLat * p) * Math.cos(bLat * p) * (1 - Math.cos((bLng - aLng) * p))) / 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export async function loadBusiness(id: string): Promise<Business | null> {
  const { data } = await supabase.from('businesses').select('*').eq('id', id).maybeSingle();
  return (data as Business) ?? null;
}

/* ---------------- owner ---------------- */

export async function myBusinesses(ownerId: string): Promise<Business[]> {
  const { data } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  return (data ?? []) as Business[];
}

/**
 * Write a listing.
 *
 * Both the update and the delete below name the owner as well as the id.
 * The database has to enforce this — a phone can be told anything — but
 * saying it here too means a bug that hands this function somebody
 * else's id writes nothing instead of writing over them, and it is one
 * line.
 *
 * owner_id and status are stripped from an update. Ownership is not a
 * field anybody edits, and letting a client set the status is letting it
 * publish itself: those moves go through submitBusiness and decide.
 */
/**
 * Is this name free?
 *
 * Asked as the name is typed and again on submit, because the form is
 * where this is useful: being told at the top of the page is a correction,
 * being told after a review is a rejection.
 *
 * Only listings that are somewhere in the directory count. A draft nobody
 * ever sent is not a claim on a name.
 */
export async function checkName(name: string, city?: string | null, excludeId?: string) {
  const key = nameKey(name);
  if (!key || key.length < 2) return { taken: null, similar: [] as NameMatch[] };

  const { data } = await supabase
    .from('businesses')
    .select('id, name, name_fa, city, country, status')
    .in('status', ['submitted', 'approved', 'active', 'lapsed'])
    .limit(2000);

  return compareNames(name, city, (data ?? []) as any[], excludeId);
}

export async function saveBusiness(b: Partial<Business> & { owner_id: string }) {
  const row: Record<string, any> = { ...b, updated_at: new Date().toISOString() };
  if (b.id) {
    delete row.owner_id;
    delete row.status;
  }
  const { data, error } = b.id
    ? await supabase.from('businesses').update(row)
        .eq('id', b.id).eq('owner_id', b.owner_id)
        .select().maybeSingle()
    : await supabase.from('businesses').insert(row).select().maybeSingle();
  // Rebuild the Persian index in the background. Never awaited: a slow
  // translation must not make saving feel slow.
  if (data) buildSearchIndex(data as any);
  return { data: data as Business | null, error: error?.message };
}

export async function submitBusiness(id: string, ownerId?: string) {
  let q = supabase
    .from('businesses')
    .update({ status: 'submitted', submitted_at: new Date().toISOString() })
    .eq('id', id);
  // Submitting is a status change, so it is scoped to the owner like the
  // rest of them.
  if (ownerId) q = q.eq('owner_id', ownerId);
  const { error } = await q;

  // Somebody is now waiting on a decision, so say so rather than hoping
  // the admin opens the review screen.
  if (!error) {
    loadBusiness(id)
      .then((b) => alertAdmin('listing-submitted', { name: b?.name, city: b?.city ?? undefined }))
      .catch(() => {});
  }
  return { error: error?.message };
}

/**
 * Take a listing out of the directory, photographs and all.
 *
 * Files left in the bucket with no row pointing at them are invisible
 * and permanent, so they go first. Lived in the admin screen until the
 * alert needed to happen wherever a listing is removed from.
 */
export async function deleteBusiness(
  id: string,
  opts: { silent?: boolean; ownerId?: string } = {},
) {
  const b = await loadBusiness(id);

  for (const p of b?.photos ?? []) {
    if (!p.startsWith('demo:')) await removePhoto(p);
  }
  let q = supabase.from('businesses').delete().eq('id', id);
  if (opts.ownerId) q = q.eq('owner_id', opts.ownerId);
  const { error } = await q;

  // The admin doing the removing does not need telling about it.
  if (!error && !opts.silent) {
    alertAdmin('listing-removed', { name: b?.name, city: b?.city ?? undefined });
  }
  return { error: error?.message };
}

/* ---------------- admin ---------------- */

export async function loadForReview(): Promise<Business[]> {
  const { data } = await supabase
    .from('businesses')
    .select('*')
    .in('status', ['submitted', 'approved', 'active', 'rejected', 'lapsed'])
    .order('submitted_at', { ascending: false, nullsFirst: false });
  return (data ?? []) as Business[];
}

/**
 * The review decision, in one write.
 *
 * Approving publishes: there is no waiting room between yes and live,
 * because the charge happens at the same moment. When billing lands, a
 * failed charge is what moves a listing to 'payment_failed' — approval
 * itself stays a single transition.
 */
export async function decide(id: string, approve: boolean, note?: string) {
  // Yes means live, and live means paid for. Somebody who cancelled
  // between submitting and being read would otherwise be published for
  // nothing, and the listing would sit there until the next sweep.
  if (approve) {
    const paid = await listingIsPaid(id);
    if (!paid) {
      return { error: 'Not subscribed. The listing stays in the queue until it is.' };
    }
  }

  const { error } = await supabase
    .from('businesses')
    .update({
      status: approve ? 'active' : 'rejected',
      review_note: note ?? null,
      approved_at: approve ? new Date().toISOString() : null,
    })
    .eq('id', id);
  return { error: error?.message };
}

/**
 * Take a listing out of the directory without deleting it.
 *
 * The listing keeps everything it had and can go back up. Whoever owns
 * it is told, because they are still being charged until they cancel and
 * we cannot do that for them.
 */
export async function suspendBusiness(id: string, reason?: string) {
  const b = await loadBusiness(id);
  const { error } = await supabase
    .from('businesses')
    .update({ status: 'lapsed', review_note: reason ?? null })
    .eq('id', id);
  if (error) return { error: error.message };

  if (b?.owner_id) {
    supabase.functions.invoke('send-push', {
      body: {
        userId: b.owner_id,
        title: (b.name ?? 'Your listing') + ' has come down',
        body: 'It is no longer in the directory. Your subscription does not stop by itself, so cancel it in Settings to avoid another charge.',
        // Their own business, not a friend. Filed under 'friends' this was
        // silenced by a switch that has nothing to do with it.
        category: 'account',
        data: { businessId: id, kind: 'suspended' },
      },
    }).catch(() => {});
  }
  return {};
}

/* ---------------- hooks ---------------- */

export function useBusinesses(opts: Parameters<typeof loadBusinesses>[0] = {}) {
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const key = JSON.stringify(opts);
  const refresh = useCallback(async () => {
    setLoading(true);
    setItems(await loadBusinesses(opts));
    setLoading(false);
  }, [key]);

  useEffect(() => { refresh(); }, [key]);
  return { items, loading, refresh };
}


/* ---------------- what people do with a listing ---------------- */

export type EventKind = 'view' | 'card' | 'call' | 'whatsapp' | 'website' | 'directions';

/**
 * Record an interaction. Fire and forget on purpose: analytics must
 * never slow down or break the thing being measured, so a failure here
 * is silent and the user notices nothing.
 */
export function trackBusiness(businessId: string, kind: EventKind, userId?: string) {
  supabase
    .from('business_events')
    .insert({ business_id: businessId, kind, user_id: userId ?? null })
    .then(() => {}, () => {});
}

export type Insight = {
  views: number;          // opened the full listing
  cards: number;          // saw it in the feed or on the map
  calls: number;
  whatsapp: number;
  website: number;
  directions: number;
  byDay: { day: string; views: number }[];
};

/** Everything an owner sees on their analytics tab, for one listing. */
export async function insightsFor(businessId: string, days = 30): Promise<Insight> {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const { data } = await supabase
    .from('business_events')
    .select('kind, created_at')
    .eq('business_id', businessId)
    .gte('created_at', since);

  const rows = data ?? [];
  const count = (k: string) => rows.filter((r: any) => r.kind === k).length;

  // one bucket per day, so a sparse series still draws a continuous line
  const buckets = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    buckets.set(d, 0);
  }
  rows.forEach((r: any) => {
    if (r.kind !== 'view') return;
    const d = String(r.created_at).slice(0, 10);
    if (buckets.has(d)) buckets.set(d, (buckets.get(d) ?? 0) + 1);
  });

  return {
    views: count('view'),
    cards: count('card'),
    calls: count('call'),
    whatsapp: count('whatsapp'),
    website: count('website'),
    directions: count('directions'),
    byDay: [...buckets.entries()].map(([day, views]) => ({ day, views })),
  };
}

/**
 * How this listing compares to others in the same category and city.
 * Returned as a percentile rather than a rank, because "better than 80%
 * of salons in Gothenburg" is useful to an owner and "seventh" is not.
 */
export async function percentileFor(b: Business, _myViews: number): Promise<number | null> {
  // Done on the server now. A listing's view counts belong to whoever owns
  // it, so reading every competitor's events from a phone in order to work
  // out a ranking meant every listing's numbers were readable by anyone.
  // The function answers with the ranking and nothing else, and only to
  // the owner.
  const { data, error } = await supabase.rpc('business_view_percentile', { b: b.id });
  if (error) return null;
  return typeof data === 'number' ? data : null;
}
