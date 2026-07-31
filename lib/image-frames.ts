import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Focal-point model: the image always fills its slot with cover (never
// distorts). fx/fy say which part of the image to keep centred (0..1),
// and zoom lets you push in further. Apple's wallpaper model.
export type Frame = {
  fx: number;   // 0..1 horizontal focus, 0.5 = centre
  fy: number;   // 0..1 vertical focus
  zoom: number; // 1 = plain cover, >1 = zoomed in
  uri?: string; // uploaded replacement
};

export const DEFAULT_FRAME: Frame = { fx: 0.5, fy: 0.5, zoom: 1 };

const KEY = (name: string) => 'frame:' + name;

let cache: Record<string, Frame> = {};
const listeners = new Set<() => void>();

export async function loadAllFrames() {
  try {
    const keys = (await AsyncStorage.getAllKeys()).filter((k) => k.startsWith('frame:'));
    const pairs = await AsyncStorage.multiGet(keys);
    const next: Record<string, Frame> = {};
    for (const [k, v] of pairs) if (v) next[k.slice(6)] = JSON.parse(v);
    cache = next;
    listeners.forEach((l) => l());
  } catch {}
}

export function getFrame(name: string): Frame {
  return cache[name] ?? DEFAULT_FRAME;
}

// Frames are content decisions, not personal settings: framing an image once
// should hold for everyone, on every device. Local storage keeps it instant;
// Supabase makes it permanent.
async function syncFrameUp(name: string, frame: { fx: number; fy: number; zoom: number }) {
  try {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('image_frames').upsert({
      name, fx: frame.fx, fy: frame.fy, zoom: frame.zoom, updated_at: new Date().toISOString(),
    });
  } catch {}
}

export async function loadRemoteFrames() {
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('image_frames').select('name, fx, fy, zoom');
    if (!data) return;
    for (const row of data as any[]) {
      const existing = cache[row.name];
      // a locally uploaded image wins; only the framing comes from the server
      cache[row.name] = { ...(existing ?? DEFAULT_FRAME), fx: row.fx, fy: row.fy, zoom: row.zoom };
    }
    listeners.forEach((l) => l());
  } catch {}
}

export async function saveFrame(name: string, frame: Frame) {
  syncFrameUp(name, { fx: frame.fx, fy: frame.fy, zoom: frame.zoom });
  cache = { ...cache, [name]: frame };
  listeners.forEach((l) => l());
  try { await AsyncStorage.setItem(KEY(name), JSON.stringify(frame)); } catch {}
}

export async function clearFrame(name: string) {
  const next = { ...cache }; delete next[name]; cache = next;
  listeners.forEach((l) => l());
  try { await AsyncStorage.removeItem(KEY(name)); } catch {}
}

export function useFrame(name: string): Frame {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return getFrame(name);
}
