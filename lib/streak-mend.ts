// Mending a streak.
//
// A run of twelve days broken by one missed evening is not really a
// broken habit, and treating it as one is how people stop coming back. So
// a single missed day can be mended — offered rather than applied,
// because a streak someone chose to keep is worth more than one the app
// quietly repaired.
//
// Once every sixty days. Rare enough to matter, often enough to have
// forgotten the last time.

import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_MEND = 'streak:mended';
const MEND_GAP_DAYS = 60;
const DAY_MS = 86400000;

const key = (d: Date) =>
  d.getFullYear() + '-'
  + String(d.getMonth() + 1).padStart(2, '0') + '-'
  + String(d.getDate()).padStart(2, '0');

let lastMended: string | null = null;
let loaded = false;

export async function loadMend() {
  try { lastMended = await AsyncStorage.getItem(LAST_MEND); } catch {}
  loaded = true;
}

/**
 * The day that could be mended, if there is one.
 *
 * Exactly one missing day, immediately before an unbroken run that
 * reaches today. Two gaps is a streak that genuinely ended; a gap further
 * back is history rather than an accident.
 */
export function mendableDay(days: string[]): string | null {
  if (!loaded) return null;

  // Not too soon after the last one.
  if (lastMended) {
    const since = (Date.now() - new Date(lastMended).getTime()) / DAY_MS;
    if (since < MEND_GAP_DAYS) return null;
  }

  const set = new Set(days);
  const today = new Date();
  if (!set.has(key(today))) return null;   // not here today; nothing to mend

  // Yesterday, and only yesterday.
  //
  // Walking back further found gaps from weeks ago, and filling one of
  // those joins two old runs — which is how a three-day streak became
  // eleven. A mend is for the evening someone missed, not for repairing
  // history.
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (set.has(key(yesterday))) return null;      // nothing missed

  // And only if the day before that was visited: otherwise this is not a
  // gap in a run, it is the end of one.
  const before = new Date(today);
  before.setDate(today.getDate() - 2);
  return set.has(key(before)) ? key(yesterday) : null;
}

/** Fill the gap. Returns the mended list of days. */
export async function mendDay(days: string[], day: string): Promise<string[]> {
  const next = Array.from(new Set([...days, day])).sort();
  try {
    await AsyncStorage.setItem('visit:days', JSON.stringify(next));
    const stamp = key(new Date());
    await AsyncStorage.setItem(LAST_MEND, stamp);
    lastMended = stamp;
  } catch {}
  return next;
}

/**
 * Forget that a mend ever happened.
 *
 * For testing, and for the one case where a mend joined runs it should
 * not have. Clears the record so another can be offered; it does not
 * remove the day that was filled, since by then it is indistinguishable
 * from a real visit.
 */
export async function forgetMend() {
  try { await AsyncStorage.removeItem(LAST_MEND); } catch {}
  lastMended = null;
}

/** Whether one is available at all, for anything that wants to know. */
export function mendAvailable() {
  if (!lastMended) return true;
  return (Date.now() - new Date(lastMended).getTime()) / DAY_MS >= MEND_GAP_DAYS;
}
