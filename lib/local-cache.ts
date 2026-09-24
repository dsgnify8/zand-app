// The feed someone saw last time.
//
// Entering Local meant a spinner while a query went to the other side of
// the world and came back, every single time. The listings do not change
// between one tap and the next, so the last answer is shown at once and
// replaced quietly when the new one lands. Nothing is lost by being a
// few minutes stale; a blank page while waiting costs more.

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Business } from '@/lib/businesses';

const KEY = 'local:feed:v1';

// Held in memory too, so a second visit in the same session does not
// even touch storage.
let mem: { rows: Business[]; at: number } | null = null;

export function cachedFeedNow(): Business[] | null {
  return mem?.rows ?? null;
}

export async function readCachedFeed(): Promise<Business[] | null> {
  if (mem) return mem.rows;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (!Array.isArray(v?.rows)) return null;
    mem = { rows: v.rows as Business[], at: v.at ?? 0 };
    return mem.rows;
  } catch {
    return null;
  }
}

export async function writeCachedFeed(rows: Business[]) {
  mem = { rows, at: Date.now() };
  try {
    // Enough to fill the page and the rails; the rest is refetched
    // anyway and a large blob is slower to read than the query it saves.
    await AsyncStorage.setItem(KEY, JSON.stringify({ rows: rows.slice(0, 60), at: mem.at }));
  } catch {}
}
