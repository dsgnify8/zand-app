// How far through something someone has read.
//
// Deliberately narrow. The stats store already counts what has been
// finished — topicsFinished, pagesRead, the `finished` list the profile
// pillars and the achievements read from — and this does not touch any of
// it. What was missing is the middle: a topic opened and not completed,
// which every one of those counters correctly ignores and which is
// exactly what a progress bar is for.
//
// So: furthest page reached, per key, and nothing else. One number, one
// purpose, no overlap with anything that already exists.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import { syncTouch } from '@/lib/cloud-sync';

const KEY = 'read:progress';

export type Reached = { page: number; total: number; at: number };

let progress: Record<string, Reached> = {};
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export async function loadReadProgress() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    progress = raw ? JSON.parse(raw) : {};
  } catch {}
  emit();
}

/**
 * Reached a page.
 *
 * Never moves backwards: going back to re-read chapter two does not undo
 * having reached chapter nine. The total is stored alongside because a
 * topic can gain pages later, and a fraction needs the denominator it was
 * measured against.
 */
export async function reachedPage(key: string, page: number, total: number) {
  const prev = progress[key];
  if (prev && prev.page >= page && prev.total === total) return;

  progress = {
    ...progress,
    [key]: { page: Math.max(page, prev?.page ?? 0), total, at: Date.now() },
  };
  emit();
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(progress));
    syncTouch();
  } catch {}
}

/** A fraction between 0 and 1, or 0 if this has not been opened. */
export function readFraction(key: string): number {
  const r = progress[key];
  if (!r || !r.total) return 0;
  // page is an index, so reaching the last page is total - 1.
  return Math.max(0, Math.min(1, (r.page + 1) / r.total));
}

export function readReached(key: string): Reached | null {
  return progress[key] ?? null;
}

/** Everything opened, most recent first. For the rails. */
export function readRecent(): { key: string; reached: Reached }[] {
  return Object.entries(progress)
    .map(([key, reached]) => ({ key, reached }))
    .sort((a, b) => b.reached.at - a.reached.at);
}

let snap: Record<string, Reached> = progress;
export function useReadProgress() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    // Read through, not captured: the setters replace `progress`, and a
    // hook closing over it would hand back the value from first render.
    () => { if (snap !== progress) snap = progress; return snap; },
  );
}

export function clearReadProgress() {
  progress = {};
  emit();
  AsyncStorage.removeItem(KEY).catch(() => {});
}
