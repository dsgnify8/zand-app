// Hamdeli: handpicked people and shelters worth pointing readers at.
//
// Everything is read from the database so a profile can be added, fixed
// or taken down without an App Store release. That is the whole reason
// this is not a constants file: a shelter that closes should stop being
// listed the same afternoon, not at the next review cycle.
//
// Cached in module scope. The list asks for every profile and the page
// asks again on arrival; without it that is two round trips for rows
// that change a few times a month.

import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { supabase } from '@/lib/supabase';

const BUCKET = 'hamdeli';

// The section borrows Nowruz's palette, the warmest world in the app:
// its gold for rules and ornaments, its ink and dim text, and a dusty
// rose of its own, deepened from Nowruz's rose so white text sits on it
// and it reads as text on white. The page background stays the app's
// own paper, so the section feels warm without leaving the app.
export const HH = {
  rose: '#9C5468',
  roseSoft: '#F5EAEE',
  gold: '#B08A46',
  green: '#6E8C5A',
  text: '#2E2823',
  textDim: '#8A7F73',
  // The wash, the cards and the hairlines lean a shade towards rose, so
  // the section is a cousin of Nowruz rather than a copy: Nowruz's wash
  // is sand, this one is sand with a little blush in it.
  hair: '#E7D9D6',
  surface: '#FCF8F7',
  fade: ['#E7D5CF', '#EFE3DF'] as const,
};
export const HAMDELI_TINT = HH.rose;

export type HamdeliKind = 'animals' | 'people' | 'children' | 'other';

/** An Instagram video: where it lives, and the cover we show for it. */
export type Reel = { url: string; cover: string };

// Two is enough to give a sense of the work without turning a profile
// into a feed. Raise it here if that stops being true.
export const MAX_REELS = 2;

export type Hamdeli = {
  id: string;
  slug: string;
  name: string;
  name_fa?: string | null;
  city?: string | null;
  city_fa?: string | null;
  kind: HamdeliKind;
  blurb: string;
  blurb_fa?: string | null;
  story?: string | null;
  story_fa?: string | null;
  need?: string | null;
  need_fa?: string | null;
  cover?: string | null;
  instagram?: string | null;
  website?: string | null;
  donate_url?: string | null;
  youtube_ids?: string[] | null;
  reels?: Reel[] | null;
  consent_note?: string | null;
  published: boolean;
  sort: number;
};

/* ------------------------------------------------------------------ *
 * Rotation.
 *
 * A seed picked once per launch. Ordering by a hash of the seed and an
 * item's own key means the order changes every time the app opens,
 * holds still while someone is browsing, and takes in anything added
 * since without a list to maintain.
 * ------------------------------------------------------------------ */

const SESSION_SEED = Math.floor(Math.random() * 2 ** 31);

function mix(key: string) {
  let h = (0x811c9dc5 ^ SESSION_SEED) >>> 0;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

export function sessionShuffle<T>(items: T[], key: (t: T) => string): T[] {
  return [...items].sort((a, b) => mix(key(a)) - mix(key(b)));
}

/** A coin tossed once per launch, for layout choices that should vary. */
export const sessionCoin = (SESSION_SEED & 1) === 1;

/**
 * The same list with everyone's first appearance before anyone's second.
 *
 * Most profiles carry two videos, so a plain shuffle could fill five
 * tiles with two people. This keeps the rotation's order but spends it
 * on variety first.
 */
export function spreadByOwner<T extends { slug: string }>(items: T[]): T[] {
  const firsts: T[] = [];
  const rest: T[] = [];
  const seen = new Set<string>();
  for (const it of items) {
    if (seen.has(it.slug)) rest.push(it);
    else { seen.add(it.slug); firsts.push(it); }
  }
  return [...firsts, ...rest];
}

/** Every video across published profiles, with whose it is. */
export type OwnedReel = Reel & { slug: string; name: string; name_fa?: string | null };

export function allReels(rows: Hamdeli[]): OwnedReel[] {
  const out: OwnedReel[] = [];
  for (const r of rows) {
    if (!r.published) continue;
    for (const reel of r.reels ?? []) {
      if (reel?.url && reel?.cover) out.push({ ...reel, slug: r.slug, name: r.name, name_fa: r.name_fa });
    }
  }
  return out;
}

let cache: Hamdeli[] | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

/**
 * Every profile the caller is allowed to see.
 *
 * Admins get the unpublished ones too, but that is the database's call
 * rather than this function's: the read policy decides, so there is no
 * second code path here that could disagree with it.
 */
export async function loadHamdeli(force = false) {
  if (cache && !force) return cache;
  try {
    const { data } = await supabase
      .from('hamdeli')
      .select('*')
      .order('sort', { ascending: true })
      .order('name', { ascending: true });
    cache = (data ?? []) as Hamdeli[];
  } catch {
    // A failed load leaves whatever was already there. An empty section
    // on a flaky connection is worse than a slightly old one.
    cache = cache ?? [];
  }
  emit();
  return cache;
}

export function hamdeliRows() {
  return cache ?? [];
}

export function hamdeliBySlug(slug: string) {
  return (cache ?? []).find((r) => r.slug === slug) ?? null;
}

/** Subscribe a screen to the list, loading it once on first mount. */
export function useHamdeli() {
  const [rows, setRows] = useState<Hamdeli[]>(cache ?? []);
  const [busy, setBusy] = useState(cache === null);

  useEffect(() => {
    const onChange = () => setRows(cache ?? []);
    listeners.add(onChange);
    // Show what is cached straight away, then ask the database again
    // every time a screen opens. Loading once per session meant a reader
    // who had looked once would not see a new profile, a fixed typo or a
    // removed one until they closed the app completely, which defeats
    // the reason this lives in the database at all.
    if (cache === null) {
      loadHamdeli().then(() => setBusy(false));
    } else {
      setBusy(false);
      loadHamdeli(true).catch(() => {});
    }
    return () => { listeners.delete(onChange); };
  }, []);

  const refresh = async () => {
    setBusy(true);
    await loadHamdeli(true);
    setBusy(false);
  };

  return { rows, busy, refresh };
}

export function coverUrl(cover: string | null | undefined) {
  if (!cover) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(cover);
  return data?.publicUrl ?? null;
}

/* ------------------------------------------------------------------ *
 * Links out.
 *
 * Instagram cannot be embedded: Meta withdrew that, and their image URLs
 * expire within hours, so anything rendered inline would break quietly
 * some days later. These build the links instead, and the profile page
 * opens them.
 * ------------------------------------------------------------------ */

export function instagramUrl(handle: string | null | undefined) {
  if (!handle) return null;
  const h = handle.trim().replace(/^@/, '').replace(/\/+$/, '');
  if (!h) return null;
  // A full URL pasted into the handle field is a thing that happens.
  if (/^https?:\/\//i.test(h)) return h;
  return 'https://instagram.com/' + h;
}

export function webUrl(url: string | null | undefined) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  return /^https?:\/\//i.test(u) ? u : 'https://' + u;
}

/**
 * A clean Instagram post or reel link out of whatever was pasted, or
 * null if it is not one. Share links carry tracking parameters
 * (?igsh=…) that are worth dropping before they are stored.
 */
export function instagramPostUrl(input: string): string | null {
  const m = input.trim().match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)/i);
  if (!m) return null;
  const kind = m[1].toLowerCase() === 'p' ? 'p' : m[1].toLowerCase() === 'tv' ? 'tv' : 'reel';
  return `https://www.instagram.com/${kind}/${m[2]}/`;
}

/**
 * A YouTube id out of whatever an admin pasted: a watch URL, a share
 * link, a Shorts URL, an embed, or the bare id.
 */
export function youtubeId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  if (/^[\w-]{11}$/.test(s)) return s;
  const m =
    s.match(/[?&]v=([\w-]{11})/) ??
    s.match(/youtu\.be\/([\w-]{11})/) ??
    s.match(/\/shorts\/([\w-]{11})/) ??
    s.match(/\/embed\/([\w-]{11})/);
  return m ? m[1] : null;
}

/* ------------------------------------------------------------------ *
 * Admin
 * ------------------------------------------------------------------ */

export async function pickCover(shape: 'round' | 'portrait' = 'round') {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;

  // iOS only offers a square crop, which is right for a round photo and
  // wrong for a reel. A reel cover is taken whole and cropped on screen.
  if (shape === 'portrait') {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], allowsMultipleSelection: false,
      allowsEditing: false, quality: 0.8, exif: false,
    });
    if (res.canceled) return null;
    return res.assets?.[0] ?? null;
  }

  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: false,
    // Square, because every photo is shown in a circle. An Instagram
    // profile picture cropped square lands exactly inside it.
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    exif: false,
  });
  if (res.canceled) return null;
  return res.assets?.[0] ?? null;
}

/** Upload and return the stored path, or null if it did not land. */
export async function uploadCover(slug: string, uri: string) {
  try {
    const ext = (uri.split('.').pop() ?? 'jpg').split('?')[0].toLowerCase();
    const name = `${slug}/${Date.now()}.${ext}`;

    const res = await fetch(uri);
    const bytes = await res.arrayBuffer();

    const { error } = await supabase.storage.from(BUCKET).upload(name, bytes, {
      contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
      upsert: false,
    });
    if (error) return null;
    return name;
  } catch {
    return null;
  }
}

export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * A slug nobody else is using.
 *
 * Saving upserts on slug, so a new profile that happened to share a
 * slug with an existing one would have quietly replaced it. Two people
 * with the same name is not far-fetched in this section.
 */
async function freeSlug(base: string) {
  const root = base || 'profile';
  const { data } = await supabase.from('hamdeli').select('slug').like('slug', root + '%');
  const taken = new Set((data ?? []).map((r: any) => r.slug));
  if (!taken.has(root)) return root;
  for (let n = 2; n < 100; n++) {
    if (!taken.has(`${root}-${n}`)) return `${root}-${n}`;
  }
  return `${root}-${Date.now()}`;
}

export async function saveHamdeli(row: Partial<Hamdeli> & { slug: string; name: string; blurb: string }) {
  if (!row.id) row = { ...row, slug: await freeSlug(row.slug) };
  const { error } = await supabase.from('hamdeli').upsert(
    {
      ...(row.id ? { id: row.id } : {}),
      slug: row.slug,
      name: row.name,
      name_fa: row.name_fa ?? null,
      city: row.city ?? null,
      city_fa: row.city_fa ?? null,
      kind: row.kind ?? 'other',
      blurb: row.blurb,
      blurb_fa: row.blurb_fa ?? null,
      story: row.story ?? null,
      story_fa: row.story_fa ?? null,
      need: row.need ?? null,
      need_fa: row.need_fa ?? null,
      cover: row.cover ?? null,
      instagram: row.instagram ?? null,
      website: row.website ?? null,
      donate_url: row.donate_url ?? null,
      youtube_ids: row.youtube_ids ?? [],
      reels: row.reels ?? [],
      consent_note: row.consent_note ?? null,
      published: row.published ?? false,
      sort: row.sort ?? 0,
    },
    { onConflict: 'slug' },
  );
  if (error) return error.message;
  await loadHamdeli(true);
  return null;
}

export async function deleteHamdeli(id: string, cover?: string | null, reels?: Reel[] | null) {
  const { error } = await supabase.from('hamdeli').delete().eq('id', id);
  // The pictures go too, so storage does not fill with images of people
  // who are no longer featured. Best effort: a failure here leaves an
  // orphaned file, not a broken profile.
  const files = [cover, ...(reels ?? []).map((r) => r.cover)].filter(Boolean) as string[];
  if (!error && files.length) {
    try { await supabase.storage.from(BUCKET).remove(files); } catch {}
  }
  if (error) return error.message;
  await loadHamdeli(true);
  return null;
}
