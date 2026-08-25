// City covers, from the database.
//
// Three places a cover can come from, in order: a row an admin set, a
// bundled image in constants/cities.ts, or the first photograph of a
// listing in that city. The last is a poor cover — it says "salon", not
// "Stockholm" — but it is never nothing.
//
// Cached in module scope because the city list asks for every city at once
// and the city page asks again on arrival; without it that is two round
// trips for the same handful of rows.

import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { supabase } from '@/lib/supabase';
import { cityInfo } from '@/constants/cities';

const BUCKET = 'city-covers';

export type CityCover = {
  key: string;
  label?: string | null;
  photo?: string | null;
  blurb_en?: string | null;
  blurb_fa?: string | null;
};

let cache: Record<string, CityCover> | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export async function loadCityCovers(force = false) {
  if (cache && !force) return cache;
  try {
    const { data } = await supabase.from('city_covers').select('*');
    const m: Record<string, CityCover> = {};
    for (const row of (data ?? []) as CityCover[]) m[row.key] = row;
    cache = m;
  } catch {
    cache = cache ?? {};
  }
  emit();
  return cache;
}

export function cityCovers() {
  return cache ?? {};
}

export function coverUrl(photo: string | null | undefined) {
  if (!photo) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(photo);
  return data?.publicUrl ?? null;
}

/**
 * What to show behind a city, whatever exists.
 *
 * Returns an Image source, so callers do not have to know whether it came
 * from storage or from the bundle.
 */
export function cityCoverSource(key: string, fallbackListingPhoto?: any) {
  const row = cityCovers()[key.toLowerCase()];
  const url = coverUrl(row?.photo);
  if (url) return { uri: url };

  const bundled = cityInfo(key)?.cover;
  if (bundled) return bundled;

  return fallbackListingPhoto ?? null;
}

/** The line under the title, admin-set if there is one. */
export function cityCoverBlurb(key: string, fa: boolean) {
  const row = cityCovers()[key.toLowerCase()];
  const set = fa ? row?.blurb_fa : row?.blurb_en;
  if (set) return set;
  const info = cityInfo(key);
  return info ? (fa ? info.fa : info.en) : null;
}

export function useCityCovers() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    loadCityCovers();
    return () => { listeners.delete(l); };
  }, []);
  return cityCovers();
}

/* ---------------- admin ---------------- */

/** One image, cropped tall: the hero is full width and 440pt deep. */
export async function pickCityCover() {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;

  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: false,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 0.75,
    exif: false,
  });
  if (res.canceled) return null;
  return res.assets?.[0] ?? null;
}

/** Upload and return the stored path. Same shape as uploadPhoto. */
export async function uploadCityCover(key: string, uri: string) {
  try {
    const ext = (uri.split('.').pop() ?? 'jpg').split('?')[0].toLowerCase();
    const name = `${key.toLowerCase().replace(/\s+/g, '-')}/${Date.now()}.${ext}`;

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

export async function saveCityCover(row: CityCover) {
  const { error } = await supabase.from('city_covers').upsert({
    key: row.key.toLowerCase(),
    label: row.label ?? null,
    photo: row.photo ?? null,
    blurb_en: row.blurb_en ?? null,
    blurb_fa: row.blurb_fa ?? null,
    updated_at: new Date().toISOString(),
  });
  await loadCityCovers(true);
  return !error;
}
