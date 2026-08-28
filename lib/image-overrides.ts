// Admin-uploaded images, layered over the ones bundled in the app.
//
// Every image in the app resolves through eduImage(), so intercepting
// there means an upload reaches everywhere that key appears — the
// covers, the readers, the carousels — without touching any of them.
//
// The bundled images remain the fallback, which matters: the app opens
// correctly with no network, on first launch, and if this table is
// empty. An upload is an improvement on the shipped state, never a
// dependency of it.

import { useSyncExternalStore } from 'react';

import { supabase } from '@/lib/supabase';
import * as ImagePicker from 'expo-image-picker';

let overrides = new Map<string, string>();

// Anything showing an overridden image needs telling when they arrive.
// The load is async and the pages render first, so without this a
// chapter draws its bundled placeholder and never looks again.
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function useImageOverrides() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => overrides,
  );
}

export async function loadImageOverrides() {
  try {
    const { data, error } = await supabase.from('image_overrides').select('key, url');
    if (error || !data) return;
    const next = new Map<string, string>();
    data.forEach((r: any) => next.set(r.key, r.url));
    overrides = next;
    emit();
  } catch {
    // the bundled images stand
  }
}

/** The uploaded url for a key, if one exists. */
export function imageOverride(key?: string): string | undefined {
  return key ? overrides.get(key) : undefined;
}

export function overrideCount() { return overrides.size; }

/* ---------------- uploading, admin only ---------------- */

export async function pickAndUpload(key: string, userId?: string) {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return { error: 'Photo access is needed to upload.' };

  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.85,
    exif: false,
  });
  if (res.canceled || !res.assets?.[0]) return { cancelled: true };

  return uploadFor(key, res.assets[0].uri, userId);
}

export async function uploadFor(key: string, uri: string, userId?: string) {
  try {
    const ext = (uri.split('.').pop() ?? 'jpg').split('?')[0].toLowerCase();
    // The timestamp in the path matters: storage caches aggressively, and
    // reusing a path would leave the old picture showing for hours.
    const path = `${key}/${Date.now()}.${ext}`;

    const res = await fetch(uri);
    const bytes = await res.arrayBuffer();

    const { error: upErr } = await supabase.storage
      .from('content-images')
      .upload(path, bytes, {
        contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
        upsert: false,
      });
    if (upErr) return { error: upErr.message };

    const { data } = supabase.storage.from('content-images').getPublicUrl(path);
    const url = data.publicUrl;

    const { error } = await supabase
      .from('image_overrides')
      .upsert({ key, url, updated_by: userId ?? null, updated_at: new Date().toISOString() },
              { onConflict: 'key' });
    if (error) return { error: error.message };

    overrides.set(key, url);
    emit();
    return { url };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function clearOverride(key: string) {
  const { error } = await supabase.from('image_overrides').delete().eq('key', key);
  if (!error) overrides.delete(key);
  return { error: error?.message };
}

export async function listOverrides() {
  const { data } = await supabase
    .from('image_overrides')
    .select('key, url, updated_at')
    .order('updated_at', { ascending: false });
  return data ?? [];
}
