// Free-tier limits for the paid APIs.
//
// Two things cost real money per call: `speak` (text to speech) and
// `listen` (speech to text). Everything else in the app is static
// content and costs nothing to serve, so nothing else is metered.
//
// Design decisions worth stating:
//
//   * A rolling 24-hour window, not a calendar day. Someone who starts
//     studying at 11pm should not lose their allowance an hour later.
//     We keep timestamps and count what falls inside the window.
//
//   * Counted locally and mirrored into user_state, so the count follows
//     the account rather than the install. Reinstalling does not reset
//     it, and a signed-out user is metered on the device.
//
//   * Deliberately generous. The point is that a normal learner never
//     meets the ceiling and a heavy user meets it after they are already
//     invested. Listening is the cheaper call and the more useful one
//     for learning, so it gets the larger allowance.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncTouch } from '@/lib/cloud-sync';

const KEY = 'usage:v1';
const WINDOW = 24 * 60 * 60 * 1000;

export const LIMITS = { speak: 60, listen: 40 } as const;
export type Meter = keyof typeof LIMITS;

type Usage = { speak: number[]; listen: number[]; pro?: boolean };

let usage: Usage = { speak: [], listen: [] };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export async function loadUsage() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    if (v) usage = { speak: [], listen: [], ...JSON.parse(v) };
  } catch {}
  prune();
  emit();
}

function prune() {
  const cut = Date.now() - WINDOW;
  usage.speak = (usage.speak ?? []).filter((t) => t > cut);
  usage.listen = (usage.listen ?? []).filter((t) => t > cut);
}

async function persist() {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(usage)); syncTouch(); } catch {}
}

/** True while the user still has calls left, or is subscribed. */
export function canUse(m: Meter): boolean {
  if (usage.pro) return true;
  prune();
  return usage[m].length < LIMITS[m];
}

/** Record a call. Returns false if it should not have been allowed. */
export async function useOne(m: Meter): Promise<boolean> {
  if (usage.pro) return true;
  prune();
  if (usage[m].length >= LIMITS[m]) return false;
  usage[m].push(Date.now());
  await persist();
  emit();
  return true;
}

export function remaining(m: Meter): number {
  if (usage.pro) return Infinity;
  prune();
  return Math.max(0, LIMITS[m] - usage[m].length);
}

/** When the oldest call in the window ages out, freeing one back up. */
export function resetsAt(m: Meter): number | null {
  prune();
  const oldest = usage[m][0];
  return oldest ? oldest + WINDOW : null;
}

export function isPro() { return !!usage.pro; }

export async function setPro(on: boolean) {
  usage.pro = on;
  await persist();
  emit();
}

export function subscribeUsage(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
