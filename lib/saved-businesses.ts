// Saving a listing, and passing one on.
//
// Saves live in the same store as everything else the person keeps, so
// they turn up in the library alongside saved articles and topics rather
// than in a separate place nobody remembers to look. That means the
// existing sync carries them without any new plumbing.

import { useSyncExternalStore, useEffect, useState } from 'react';
import { Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncTouch } from '@/lib/cloud-sync';
import type { Business } from '@/lib/businesses';

const KEY = 'saved:businesses';

let saved: string[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export async function loadSavedBusinesses() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    saved = v ? JSON.parse(v) : [];
  } catch {}
  emit();
}

export function isSavedBusiness(id: string) {
  return saved.includes(id);
}

export function savedBusinessIds() {
  return [...saved];
}

export async function toggleSavedBusiness(id: string) {
  saved = saved.includes(id) ? saved.filter((x) => x !== id) : [id, ...saved];
  emit();
  // After the change, not before: the count is of what is now kept.
  import('@/lib/stats-store').then((m) => m.recountSaved()).catch(() => {});
  try { await AsyncStorage.setItem(KEY, JSON.stringify(saved)); syncTouch(); } catch {}
  return saved.includes(id);
}

/** The live list. For counting, where a read from disk would lag. */
export function savedBusinesses() {
  return saved;
}

export function useSavedBusinesses() {
  // Read at render rather than through a tick. The tick's re-render
  // could run before React had committed the change, handing back the
  // previous value — so removing something appeared to do nothing until
  // the screen was left and returned to.
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => saved,
  );
}

/**
 * Hand a listing to whatever the person shares with.
 *
 * The link is a deep link into the app. Anyone without it installed gets
 * the text, which still says what the place is and where — a share that
 * degrades to something readable is better than one that degrades to a
 * dead URL.
 */
export async function shareBusiness(b: Business) {
  const where = [b.city, b.country].filter(Boolean).join(', ');
  const lines = [
    b.name,
    b.tagline ?? '',
    where ? '📍 ' + where : '',
    b.phone ? '☎ ' + b.phone : '',
    '',
    'zand://local/business?id=' + b.id,
  ].filter(Boolean);

  try {
    await Share.share({
      message: lines.join('\n'),
      title: b.name,
    });
  } catch {
    // they cancelled, which is not an error
  }
}
