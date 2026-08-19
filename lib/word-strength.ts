// How well you know each word, and when it should come back.
//
// A simplified spaced repetition schedule: every word carries a strength
// from 0 to 5. Get it right and the strength rises and the gap before you
// see it again grows. Get it wrong and it drops to 1 and comes back the
// next day. Words you never miss fade into the background; words that keep
// slipping keep returning.

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncTouch } from '@/lib/cloud-sync';

export type WordState = {
  fa: string;
  strength: number;   // 0 unseen, 1 shaky, 5 solid
  due: number;        // timestamp; when it should next appear
  seen: number;       // how many times it has come round
  missed: number;     // how many of those you got wrong
};

// days to wait at each strength
const GAP_DAYS = [0, 1, 2, 5, 10, 21];
const DAY = 86400000;

let words: Record<string, WordState> = {};
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const KEY = 'learn:strength';

export async function loadStrength() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    words = v ? JSON.parse(v) : {};
    emit();
  } catch {}
}

async function persist() {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(words)); syncTouch(); } catch {}
}

// keep the profile's solid-word count in step
async function syncSolid() {
  try {
    const { setField } = await import('@/lib/stats-store');
    (setField as any)?.('wordsSolid', solidCount());
  } catch {}
}

export function record(fa: string, right: boolean) {
  const w = words[fa] ?? { fa, strength: 0, due: 0, seen: 0, missed: 0 };
  const strength = right ? Math.min(5, w.strength + 1) : 1;
  words[fa] = {
    fa,
    strength,
    due: Date.now() + GAP_DAYS[strength] * DAY,
    seen: w.seen + 1,
    missed: w.missed + (right ? 0 : 1),
  };
  emit(); persist(); syncSolid();
}

export function strengthOf(fa: string) {
  return words[fa]?.strength ?? 0;
}

export function isDue(fa: string) {
  const w = words[fa];
  if (!w) return true;               // never seen: always due
  return Date.now() >= w.due;
}

// Order a pool so the shakiest and most overdue come first.
export function prioritise<T extends { fa: string }>(pool: T[]): T[] {
  const score = (x: T) => {
    const w = words[x.fa];
    if (!w) return 1000;                       // unseen words first
    const overdue = (Date.now() - w.due) / DAY;
    return (5 - w.strength) * 100 + Math.max(0, overdue) * 10 + w.missed * 5;
  };
  return [...pool].sort((a, b) => score(b) - score(a));
}

// How many words are ready to be reviewed right now.
export function dueCount(pool: { fa: string }[]) {
  return pool.filter((p) => isDue(p.fa)).length;
}

export function solidCount() {
  return Object.values(words).filter((w) => w.strength >= 4).length;
}
export function shakyCount() {
  return Object.values(words).filter((w) => w.strength > 0 && w.strength < 3).length;
}

// Everything the learner has met that is ready to come round again.
export function dueNow(): number {
  const now = Date.now();
  return Object.values(words).filter((w) => w.strength > 0 && w.strength < 5 && now >= w.due).length;
}

export function useStrength() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { solid: solidCount(), shaky: shakyCount(), due: dueNow() };
}
