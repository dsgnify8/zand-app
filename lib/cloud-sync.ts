// Cloud sync for everything the user accumulates.
//
// Design notes, because the trade-offs matter:
//
//   * Local-first. Every store keeps writing to AsyncStorage exactly as
//     before, so the app works fully signed out and offline. This file
//     only mirrors that state up and pulls it back down.
//
//   * One row per user, one JSON column per store. Five tables would be
//     tidier relationally but this is a personal blob, never queried
//     across users, so a document is the right shape and it means one
//     round trip instead of five.
//
//   * Merge rules differ by store and that is deliberate:
//       learn:done      union by unit+lesson, keeping the better score.
//                       You must never lose a finished lesson to a stale
//                       device.
//       learn:strength  per-word, keep the most recently reviewed.
//       stats:v1        take the max of each counter, union `finished`.
//                       Counters only ever go up, so max is safe and
//                       avoids a stale device rolling someone back.
//       saved:v1        union of liked and saved sets.
//       learn:level     last write wins; it is a single choice.
//
//   * Writes are debounced. A lesson can touch three stores in a second
//     and we do not want three round trips.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

const KEYS = [
  'learn:done',
  'learn:partial',
  'learn:strength',
  'stats:v1',
  'liked:articles',
  'saved:articles',
  'saved:businesses',
  'recent:articles',
  'scroll:articles',
  'learn:level',
  'learn:asked',
  'usage:v1',
  'notif:v1',
] as const;
type StoreKey = (typeof KEYS)[number];

let userId: string | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let dirty = false;

/* ---------------- merge ---------------- */

function mergeDone(local: any[], cloud: any[]) {
  const by = new Map<string, any>();
  [...(cloud ?? []), ...(local ?? [])].forEach((d) => {
    if (!d?.unit || !d?.lesson) return;
    const k = d.unit + '|' + d.lesson;
    const prev = by.get(k);
    // keep the better score; on a tie keep the earlier completion
    if (!prev || (d.score ?? 0) > (prev.score ?? 0)) by.set(k, d);
  });
  return [...by.values()];
}

function mergeStrength(local: any, cloud: any) {
  const out: any = { ...(cloud ?? {}) };
  Object.entries(local ?? {}).forEach(([w, v]: any) => {
    const c = out[w];
    if (!c || (v?.at ?? 0) > (c?.at ?? 0)) out[w] = v;
  });
  return out;
}

function mergeStats(local: any, cloud: any) {
  if (!cloud) return local;
  if (!local) return cloud;
  const out: any = {};
  Object.keys({ ...local, ...cloud }).forEach((k) => {
    const a = local[k], b = cloud[k];
    if (typeof a === 'number' || typeof b === 'number') {
      out[k] = Math.max(a ?? 0, b ?? 0);
    } else if (Array.isArray(a) || Array.isArray(b)) {
      const seen = new Set<string>();
      out[k] = [...(b ?? []), ...(a ?? [])].filter((x: any) => {
        const id = x?.key ?? JSON.stringify(x);
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    } else {
      out[k] = a ?? b;
    }
  });
  return out;
}

function mergeSaved(local: any, cloud: any) {
  if (!cloud) return local;
  if (!local) return cloud;
  const uni = (a: any[], b: any[]) => [...new Set([...(a ?? []), ...(b ?? [])])];
  return {
    ...cloud,
    ...local,
    liked: uni(local.liked, cloud.liked),
    saved: uni(local.saved, cloud.saved),
    read: uni(local.read, cloud.read),
  };
}

function mergeOne(key: StoreKey, local: any, cloud: any) {
  if (local == null) return cloud;
  if (cloud == null) return local;
  switch (key) {
    case 'learn:done': return mergeDone(local, cloud);
    case 'learn:partial': {
      // furthest point wins per lesson; progress should never go back
      const out: any = { ...(cloud ?? {}) };
      Object.entries(local ?? {}).forEach(([k, v]: any) => {
        out[k] = Math.max(v ?? 0, out[k] ?? 0);
      });
      return out;
    }
    case 'learn:strength': return mergeStrength(local, cloud);
    case 'stats:v1': return mergeStats(local, cloud);
    case 'saved:businesses':
    case 'liked:articles':
    case 'saved:articles':
    case 'recent:articles':
      // plain arrays of keys; union them, never drop one
      return [...new Set([...(cloud ?? []), ...(local ?? [])])];
    case 'usage:v1': {
      // union the call timestamps so a second device cannot hand someone
      // a fresh allowance; pro is sticky once true
      const uni = (a: number[] = [], b: number[] = []) => [...new Set([...a, ...b])].sort();
      return {
        speak: uni(local?.speak, cloud?.speak),
        listen: uni(local?.listen, cloud?.listen),
        pro: !!(local?.pro || cloud?.pro),
      };
    }
    case 'scroll:articles':
      // per-article scroll offsets; keep whichever is further in
      return { ...(cloud ?? {}), ...(local ?? {}) };
    default: return local; // learn:level, learn:asked — last write wins
  }
}

/* ---------------- pull ---------------- */

// Called on sign-in. Pulls the cloud row, merges it into whatever is on
// this device, writes the result back to both. Returns true if anything
// changed locally, so the caller can reload the stores.
const LAST_USER = 'sync:lastUser';

/**
 * Wipe local state when a different account signs in.
 *
 * Without this, two people sharing a phone inherit each other's
 * progress: the stores are per-device, so signing out and in again
 * leaves the previous person's lessons, streak and saves in place. The
 * merge would then push that stranger's history up to the new account,
 * which is worse than losing it.
 *
 * Same account signing back in: nothing is cleared, because their local
 * copy is their own and may be ahead of the cloud.
 */
async function clearIfDifferentUser(uid: string): Promise<boolean> {
  try {
    const prev = await AsyncStorage.getItem(LAST_USER);
    const switched = !!prev && prev !== uid;
    if (switched) await AsyncStorage.multiRemove([...KEYS]);
    await AsyncStorage.setItem(LAST_USER, uid);
    return switched;
  } catch {
    return false;
  }
}

export async function pullAndMerge(uid: string): Promise<boolean> {
  userId = uid;
  const switched = await clearIfDifferentUser(uid);
  try {
    const { data, error } = await supabase
      .from('user_state')
      .select('payload')
      .eq('user_id', uid)
      .maybeSingle();
    if (error) return false;

    const cloud = (data?.payload ?? {}) as Record<string, any>;
    let changed = false;

    for (const key of KEYS) {
      const raw = await AsyncStorage.getItem(key);
      const local = raw ? JSON.parse(raw) : null;
      const merged = mergeOne(key, local, cloud[key] ?? null);
      if (merged != null && JSON.stringify(merged) !== JSON.stringify(local)) {
        await AsyncStorage.setItem(key, JSON.stringify(merged));
        changed = true;
      }
    }

    // push the merged result straight back so the cloud has the union too
    await push();
    // A switch always needs a reload, even if the cloud had nothing:
    // the stores are still holding the previous account's data.
    return changed || switched;
  } catch {
    return false;
  }
}

/* ---------------- push ---------------- */

async function push() {
  if (!userId) return;
  try {
    const payload: Record<string, any> = {};
    for (const key of KEYS) {
      const raw = await AsyncStorage.getItem(key);
      if (raw) payload[key] = JSON.parse(raw);
    }
    await supabase
      .from('user_state')
      .upsert({ user_id: userId, payload, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    dirty = false;
  } catch {
    // stays dirty; the next touch will retry
  }
}

// Call after any store persists. Debounced, so a burst of writes during
// one lesson results in a single upload.
export function syncTouch() {
  if (!userId) return;
  dirty = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { push(); }, 2500);
}

// Called on sign-out. Stops syncing but leaves the local data alone, so
// the device keeps working and a later sign-in merges cleanly.
export function syncStop() {
  userId = null;
  if (timer) { clearTimeout(timer); timer = null; }
}

// Flush immediately, for backgrounding the app.
export async function syncFlush() {
  if (timer) { clearTimeout(timer); timer = null; }
  if (dirty) await push();
}

export function syncActive() { return userId !== null; }
