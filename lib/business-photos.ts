// Uploading listing photos.
//
// Photos go to Supabase Storage and the row keeps their paths. Kept
// separate from the form so the form stays about layout, and so the
// same logic serves editing an existing listing later.

import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

export const MAX_PHOTOS = 6;

/** Pick images, up to whatever slots remain. */
export async function pickPhotos(remaining: number) {
  if (remaining <= 0) return [];
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return [];

  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: true,
    selectionLimit: remaining,
    quality: 0.7,          // listing photos, not prints
    exif: false,           // strip location metadata; the shop's address
                           // is a field they choose to fill in, not
                           // something we lift out of their camera roll
  });
  if (res.canceled) return [];
  return res.assets ?? [];
}

/**
 * Upload one image and return its storage path. Paths are namespaced by
 * business so a listing's photos can be found and removed together.
 */
export async function uploadPhoto(businessId: string, uri: string): Promise<string | null> {
  try {
    const ext = (uri.split('.').pop() ?? 'jpg').split('?')[0].toLowerCase();
    const name = `${businessId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // React Native gives us a file uri; fetch turns it into bytes that
    // supabase-js can take.
    const res = await fetch(uri);
    const bytes = await res.arrayBuffer();

    const { error } = await supabase.storage
      .from('business-photos')
      .upload(name, bytes, {
        contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
        upsert: false,
      });
    if (error) return null;
    return name;
  } catch {
    return null;
  }
}

// Demo listings reference images already bundled in the app rather than
// anything in storage, so the directory can be shown before a single
// real business has uploaded a photo. Real paths are untouched.
export function isBundled(path: string) {
  return path.startsWith('demo:');
}

export function bundledKey(path: string) {
  return path.slice(5);
}

export function photoUrl(path: string): string {
  if (isBundled(path)) return '';   // callers use eduImage() for these
  const { data } = supabase.storage.from('business-photos').getPublicUrl(path);
  return data.publicUrl;
}

export async function removePhoto(path: string) {
  try { await supabase.storage.from('business-photos').remove([path]); } catch {}
}
