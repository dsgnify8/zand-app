// The Local directory: reading and writing business listings.
//
// Everything about what a listing is, and who may see it, lives here so
// the screens stay about presentation. Row-level security does the real
// enforcement server-side; the filters below are about asking the right
// question, not about trust.

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
  paid_until?: string | null;
  created_at?: string;
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
  { key: 'salon',      en: 'Hair',        fa: 'آرایشگاه',  icon: 'cut-outline' },
  { key: 'nails',      en: 'Nails',       fa: 'ناخن',      icon: 'hand-left-outline' },
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
export async function loadBusinesses(opts: {
  near?: Near;
  city?: string;
  country?: string;
  category?: string;
  query?: string;
  limit?: number;
} = {}): Promise<Business[]> {
  let q = supabase.from('businesses').select('*').eq('status', 'active');

  if (opts.category) q = q.eq('category', opts.category);
  if (opts.city) q = q.ilike('city', opts.city);
  if (opts.country) q = q.ilike('country', opts.country);
  if (opts.query) {
    const t = opts.query.trim();
    // keywords are an array, so they need a containment check rather
    // than a like; the rest is a plain text match across the fields
    // someone would reasonably expect to search.
    q = q.or(
      `name.ilike.%${t}%,name_fa.ilike.%${t}%,tagline.ilike.%${t}%,` +
      `description.ilike.%${t}%,keywords.cs.{"${t.toLowerCase()}"}`,
    );
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
  const rows = (data ?? []) as Business[];

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

export async function saveBusiness(b: Partial<Business> & { owner_id: string }) {
  const row = { ...b, updated_at: new Date().toISOString() };
  const { data, error } = b.id
    ? await supabase.from('businesses').update(row).eq('id', b.id).select().maybeSingle()
    : await supabase.from('businesses').insert(row).select().maybeSingle();
  return { data: data as Business | null, error: error?.message };
}

export async function submitBusiness(id: string) {
  const { error } = await supabase
    .from('businesses')
    .update({ status: 'submitted', submitted_at: new Date().toISOString() })
    .eq('id', id);
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

export async function decide(id: string, approve: boolean, note?: string) {
  const { error } = await supabase
    .from('businesses')
    .update({
      status: approve ? 'approved' : 'rejected',
      review_note: note ?? null,
      approved_at: approve ? new Date().toISOString() : null,
    })
    .eq('id', id);
  return { error: error?.message };
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
