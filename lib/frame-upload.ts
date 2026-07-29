// Uploading a replacement image so it actually stays.
//
// The picker hands back a cache path, and iOS clears that cache within days,
// which is why locally stored frames vanished. This puts the file in Supabase
// Storage instead: permanent, and visible to every user rather than only the
// admin who uploaded it.

import { supabase } from '@/lib/supabase';

const BUCKET = 'frames';

export async function uploadFrameImage(name: string, localUri: string): Promise<string | null> {
  try {
    const res = await fetch(localUri);
    const blob = await res.blob();
    const buf = await new Response(blob).arrayBuffer();

    const ext = (localUri.split('.').pop() || 'jpg').split('?')[0].toLowerCase();
    const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
    // a fresh name each time, so caches cannot serve the old file
    const path = name + '-' + Date.now() + '.' + safeExt;

    const { error } = await supabase.storage.from(BUCKET).upload(path, buf, {
      contentType: 'image/' + (safeExt === 'jpg' ? 'jpeg' : safeExt),
      upsert: true,
    });
    if (error) {
      console.log('[frame] upload failed', error.message);
      return null;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data?.publicUrl ?? null;
  } catch (e) {
    console.log('[frame] upload error', e);
    return null;
  }
}
