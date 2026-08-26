// Which listings someone has already opened.
//
// The rail at the top of Local is meant to be a way in, not a shelf. If it
// shows the same eight places every time, it stops being looked at within
// a week — so anything already opened drops out and something else takes
// its place.
//
// Local only, and deliberately: this is a display preference, not
// something worth a row or a sync. Losing it on a reinstall means seeing a
// few familiar places again, which is no loss at all.

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'local:opened';
const CAP = 60;

let opened: string[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export async function loadOpened() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    opened = v ? JSON.parse(v) : [];
  } catch {}
  emit();
}

export function hasOpened(id: string) {
  return opened.includes(id);
}

export function openedIds() {
  return [...opened];
}

export async function markOpened(id: string) {
  if (opened[0] === id) return;
  // Newest first, capped: an unbounded list would eventually exclude the
  // whole directory and leave the rail empty.
  opened = [id, ...opened.filter((x) => x !== id)].slice(0, CAP);
  emit();
  try { await AsyncStorage.setItem(KEY, JSON.stringify(opened)); } catch {}
}

export function useOpened() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return opened;
}

/**
 * Pick from a list, preferring what has not been seen.
 *
 * Falls back to the seen ones rather than showing an empty rail — on a
 * small directory someone will exhaust it, and a rail that disappears
 * because you have been thorough is a punishment for using the app.
 */
export function preferUnseen<T extends { id: string }>(items: T[], n: number): T[] {
  const fresh = items.filter((x) => !hasOpened(x.id));
  if (fresh.length >= n) return fresh.slice(0, n);
  const seen = items.filter((x) => hasOpened(x.id));
  return [...fresh, ...seen].slice(0, n);
}
