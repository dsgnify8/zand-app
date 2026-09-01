// Tracks lifetime activity for milestones and the progress tab.
import { useSyncExternalStore, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncTouch } from '@/lib/cloud-sync';

export type Stats = {
  topicsFinished: number;
  poetsRead: number;
  articlesRead: number;
  videosWatched: number;
  pagesRead: number;
  thingsSaved: number;
  thingsSent: number;
  lessonsFinished: number;
  stagesFinished: number;
  wordsSolid: number;
  learnDays: number;
  visitDays: number;
  // Whether to show the come-back line. See analyseVisits.
  streakNudge: boolean;
  streakDays: number;
  finished: { key: string; title: string; sub: string; route: string; at: number }[];
};

const EMPTY: Stats = {
  topicsFinished: 0, poetsRead: 0, articlesRead: 0, videosWatched: 0, pagesRead: 0,
  thingsSaved: 0, thingsSent: 0, streakDays: 0, finished: [],
  lessonsFinished: 0, stagesFinished: 0, wordsSolid: 0, learnDays: 0, visitDays: 0,
  streakNudge: true,
};

let state: Stats = { ...EMPTY };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const KEY = 'stats:v1';

export async function loadStats() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    state = v ? { ...EMPTY, ...JSON.parse(v) } : { ...EMPTY };

  // Two things here are readings rather than records, and both are
  // recomputed on every load for the same reason: a stored count has to be
  // remembered at every site that could change it, and it only takes one
  // that forgets — or one reload like this — for it to drift.
  //
  // The streak is computed from visit:days.
  // auth.tsx calls this again once the session resolves, which is after
  // boot, which is why the streak was set correctly and then vanished.
  try {
    const raw = await AsyncStorage.getItem('visit:days');
    const days: string[] = raw ? JSON.parse(raw) : [];
    // Kept for the week's pips, which need the dates rather than a count.
    visitDays = days;
    if (days.length) {
      const v = analyseVisits(days);
      state = { ...state, streakDays: v.streak, streakNudge: v.nudge, visitDays: days.length };
    }
  } catch {}

  recountSent().catch(() => {});

  // And what is kept is counted from what is actually there — every list
  // in the saved store, plus saved listings. bump('thingsSaved') only
  // fired for one of those lists, so favourites and businesses never
  // counted at all.
  try {
    // Read from storage rather than asking each store, deliberately: a
    // store has to have loaded before it can answer, and depending on load
    // order is what put the streak wrong for five days.
    const [likedRaw, savedRaw, bizRaw] = await Promise.all([
      AsyncStorage.getItem('liked:articles'),
      AsyncStorage.getItem('saved:articles'),
      AsyncStorage.getItem('saved:businesses'),
    ]);
    const count = (raw: string | null) => {
      if (!raw) return 0;
      const v = JSON.parse(raw);
      return Array.isArray(v) ? v.length : Object.keys(v ?? {}).length;
    };
    state = {
      ...state,
      thingsSaved: count(likedRaw) + count(savedRaw) + count(bizRaw),
    };
  } catch {}
    emit();
  } catch {}
}
async function persist() { try { await AsyncStorage.setItem(KEY, JSON.stringify(state)); syncTouch(); } catch {} }

// Counts a day only once, and only when a lesson was finished on it.
let lastLearnDay = '';
export async function markLearnDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (lastLearnDay === today) return;
  lastLearnDay = today;
  try {
    const raw = await AsyncStorage.getItem('learn:days');
    const days: string[] = raw ? JSON.parse(raw) : [];
    if (!days.includes(today)) {
      const next = [...days, today];
      await AsyncStorage.setItem('learn:days', JSON.stringify(next)); syncTouch();
      bump('learnDays');
    }
  } catch {}
}

/**
 * A day the app was opened.
 *
 * Separate from markLearnDay on purpose. learnDays means days Persian was
 * actually studied and two milestones depend on that meaning; visits are a
 * different thing and get their own count. The streak follows visits, so it
 * belongs to everyone using the app rather than only the language learners.
 */
// TEMP: one per module instance. If the boot code and the profile card
// print different ids, there are two copies of this file in the bundle
// and each has its own state.
const MODULE_ID = Math.random().toString(36).slice(2, 7);

let lastVisitDay = '';
export async function markVisitDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (lastVisitDay === today) return;
  lastVisitDay = today;
  try {
    const raw = await AsyncStorage.getItem('visit:days');
    const days: string[] = raw ? JSON.parse(raw) : [];
    // Bounded: a streak only ever needs to look back from today, and an
    // unbounded array would grow for the life of the install.
    const next = days.includes(today) ? days : [...days, today].slice(-400);
    // Set unconditionally. Inside the branch below it only ran on the
    // first launch of a day — open the app twice and the pips reverted to
    // the list as it was at boot, one day short.
    visitDays = next;
    if (!days.includes(today)) {
      await AsyncStorage.setItem('visit:days', JSON.stringify(next));
      // And in memory, or the week's pips keep reading the list as it was
      // at boot — without today in it, which is one pip short every time.
      visitDays = next;
      setField('visitDays', next.length);
    }
    const v = analyseVisits(next);
    setStreak(v.streak);
    setNudge(v.nudge);
    syncTouch();
  } catch {}
}

export function setNudge(v: boolean) {
  if (state.streakNudge !== v) { state = { ...state, streakNudge: v }; emit(); persist(); }
}

const DAY_MS = 86400000;
const asDate = (d: string) => new Date(d + 'T00:00:00Z').getTime();

/**
 * The shape of someone's visiting, not just today's number.
 *
 * A run is consecutive days. `breaks` counts runs of two or more that have
 * already ended — a real streak that was lost, as opposed to a single day
 * that never became one. That distinction is the whole point: missing one
 * day after a good run is normal and should pass without comment; losing
 * streak after streak is a habit worth naming.
 */
function analyseVisits(days: string[]) {
  const sorted = Array.from(new Set(days)).sort();
  const runs: number[] = [];
  let cur = 0;
  let prev = 0;
  for (const d of sorted) {
    const t = asDate(d);
    if (prev && t - prev === DAY_MS) cur += 1;
    else { if (cur) runs.push(cur); cur = 1; }
    prev = t;
  }
  if (cur) runs.push(cur);

  const streak = streakFrom(sorted);
  // The current run is still alive, so it is not a break.
  const ended = streak > 0 ? runs.slice(0, -1) : runs;
  const breaks = ended.filter((r) => r >= 2).length;
  const everHeld = runs.some((r) => r >= 2);
  const gap =
    sorted.length >= 2
      ? Math.round((asDate(sorted[sorted.length - 1]) - asDate(sorted[sorted.length - 2])) / DAY_MS)
      : 0;

  return {
    streak,
    nudge: streak < 2 && (!everHeld || gap >= 3 || breaks >= 2),
  };
}

/** Consecutive days ending today. A gap of one day ends it. */
function streakFrom(days: string[]) {
  const seen = new Set(days);
  const d = new Date();
  let n = 0;
  while (seen.has(d.toISOString().slice(0, 10))) {
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// Set an absolute value, for counts that are recalculated rather than incremented.
export function setField(field: keyof Stats, value: number) {
  if ((state as any)[field] === value) return;
  state = { ...state, [field]: value };
  emit(); persist();
  // Every milestone is keyed to a stat, so a stat changing is the only
  // moment one can be earned.
  checkMilestones();
}

export function bump(field: keyof Stats, by = 1) {
  if (typeof (state as any)[field] === 'number') {
    state = { ...state, [field]: (state as any)[field] + by };
    emit(); persist();
    // Same as setField: this is a stat changing, so a milestone may have
    // just been reached.
    checkMilestones();
  }
}

export function recordFinished(
  item: { key: string; title: string; sub: string; route: string },
  field: keyof Stats = 'topicsFinished',
) {
  // Reading something a second time is not finishing it a second time.
  // Without this the counter climbed on every revisit.
  if (state.finished.some((f) => f.key === item.key)) return;
  if (state.finished.some((f) => f.key === item.key)) return;
  state = {
    ...state,
    finished: [{ ...item, at: Date.now() }, ...state.finished],
    [field]: (((state as any)[field] as number) ?? 0) + 1,
  } as Stats;
  emit(); persist();
}

export function syncVideosWatched(count: number) {
  if (state.videosWatched !== count) { state = { ...state, videosWatched: count }; emit(); persist(); }
}

/**
 * Recount from a list of days.
 *
 * For mending: the gap has been filled in storage, and the streak has to
 * be recomputed from the repaired list rather than incremented, since
 * filling one day can join two runs into a much longer one.
 */
export function refreshStreakFromDays(days: string[]) {
  visitDays = days;
  const v = analyseVisits(days);
  setStreak(v.streak);
  setField('visitDays', days.length);
}

export function setStreak(days: number) {
  if (state.streakDays !== days) { state = { ...state, streakDays: days }; emit(); persist(); }
}

// Milestone definitions
export type Milestone = { key: string; label: string; field: keyof Stats; target: number };
export const MILESTONES: Milestone[] = [
  { key: 'lesson1', label: 'First lesson done', field: 'lessonsFinished', target: 1 },
  { key: 'letters', label: 'Through the letters', field: 'lessonsFinished', target: 6 },
  { key: 'lessons12', label: 'Past the basics', field: 'lessonsFinished', target: 12 },
  { key: 'lessons20', label: 'Holding a conversation', field: 'lessonsFinished', target: 20 },
  { key: 'lessons30', label: 'Reading and writing', field: 'lessonsFinished', target: 30 },
  { key: 'chapter1', label: 'First chapter finished', field: 'stagesFinished', target: 1 },
  { key: 'chapter5', label: '5 chapters finished', field: 'stagesFinished', target: 5 },
  { key: 'words50', label: '50 words solid', field: 'wordsSolid', target: 50 },
  { key: 'words150', label: '150 words solid', field: 'wordsSolid', target: 150 },
  { key: 'learn7', label: '7 days of Persian', field: 'learnDays', target: 7 },
  { key: 'learn30', label: '30 days of Persian', field: 'learnDays', target: 30 },
  { key: 'streak7', label: '7 day streak', field: 'streakDays', target: 7 },
  { key: 'streak30', label: '30 day streak', field: 'streakDays', target: 30 },
  // Reading the app, not the course.
  { key: 'topic1', label: 'First topic finished', field: 'topicsFinished', target: 1 },
  { key: 'topics4', label: '4 topics finished', field: 'topicsFinished', target: 4 },
  { key: 'topics10', label: '10 topics finished', field: 'topicsFinished', target: 10 },
  { key: 'poet1', label: 'First poet read', field: 'poetsRead', target: 1 },
  { key: 'poets4', label: '4 poets read', field: 'poetsRead', target: 4 },
  { key: 'poets7', label: 'All seven poets', field: 'poetsRead', target: 7 },
  { key: 'pages20', label: '20 pages read', field: 'pagesRead', target: 20 },
  { key: 'pages100', label: '100 pages read', field: 'pagesRead', target: 100 },
  { key: 'pages500', label: '500 pages read', field: 'pagesRead', target: 500 },
  { key: 'saved1', label: 'Kept something', field: 'thingsSaved', target: 1 },
  { key: 'saved10', label: '10 things saved', field: 'thingsSaved', target: 10 },
  { key: 'saved30', label: '30 things saved', field: 'thingsSaved', target: 30 },
  { key: 'sent1', label: 'Sent your first thing', field: 'thingsSent', target: 1 },
  { key: 'sent6', label: '6 sent to friends', field: 'thingsSent', target: 6 },
  { key: 'stages10', label: '10 chapters finished', field: 'stagesFinished', target: 10 },
];

/**
 * Milestones earned since the last check.
 *
 * Kept here rather than in a screen: a milestone is usually earned in the
 * middle of a lesson, and a watcher living on the map would only notice
 * once someone happened to walk past it.
 */
let seen: Set<string> | null = null;
const milestoneListeners = new Set<(label: string) => void>();

export function onMilestone(fn: (label: string) => void) {
  milestoneListeners.add(fn);
  return () => { milestoneListeners.delete(fn); };
}

export function checkMilestones() {
  const now = new Set(
    milestoneStatus(stats()).filter((m) => m.achieved).map((m) => m.key),
  );

  // The first pass sets the baseline. Without it, opening the app would
  // announce everything ever earned, one after another.
  if (seen === null) { seen = now; return; }

  for (const m of milestoneStatus(stats())) {
    if (m.achieved && !seen.has(m.key)) {
      milestoneListeners.forEach((fn) => fn(m.label));
      break;   // one at a time; the rest will announce on the next change
    }
  }
  seen = now;
}

export function milestoneStatus(s: Stats) {
  return MILESTONES.map((m) => {
    const cur = (s as any)[m.field] as number;
    return { ...m, current: Math.min(cur, m.target), achieved: cur >= m.target, pct: Math.min(100, Math.round((cur / m.target) * 100)) };
  });
}

/**
 * The current stats.
 *
 * A function rather than the exported binding: every setter here replaces
 * the object, so anything holding a reference keeps whatever existed when
 * it took it.
 */
/**
 * Count what is kept, from the stores themselves.
 *
 * Exported so a save can call it: the count is a reading of three lists,
 * and a reading taken once at launch is wrong the moment anything changes.
 */
/**
 * How many things have gone to friends.
 *
 * From sent_items rather than a counter: thingsSent was declared and read
 * but never written, so the milestone for six sends could never be
 * reached however many you sent.
 */
export async function recountSent() {
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data: me } = await supabase.auth.getUser();
    if (!me.user?.id) return;
    const { count } = await supabase
      .from('sent_items')
      .select('id', { count: 'exact', head: true })
      .eq('sender', me.user.id);
    const n = count ?? 0;
    if (state.thingsSent !== n) {
      state = { ...state, thingsSent: n };
      emit();
      persist();
    }
  } catch {}
}

export async function recountSaved() {
  try {
    // From the stores' own state, not from storage. Both write
    // asynchronously and neither awaits, so a count read from disk is
    // always one save behind — it would show yesterday's number.
    const [saved, biz] = await Promise.all([
      import('@/lib/saved-store'),
      import('@/lib/saved-businesses'),
    ]);
    const sv: any = saved.savedState?.() ?? {};
    const n = (sv.liked?.length ?? 0)
      + (sv.saved?.length ?? 0)
      + (biz.savedBusinesses?.().length ?? 0);
    if (state.thingsSaved !== n) {
      state = { ...state, thingsSaved: n };
      emit();
      persist();
    }
  } catch {}
}

/**
 * The days someone opened the app, as YYYY-MM-DD.
 *
 * Kept in memory by the same read that computes the streak, because the
 * week's pips render synchronously and cannot await a store.
 */
let visitDays: string[] = [];
export function visitedDays() { return visitDays; }

export function stats() {
  return state;
}

// TEMP
export function debugState() {
  return { id: MODULE_ID, streak: state.streakDays, listeners: listeners.size };
}

export function storeId() { return MODULE_ID; }

export function useStats() {
  // useSyncExternalStore rather than useState plus a listener set.
  //
  // `state` here is an external store read during render, and React is
  // free to bail out of a re-render driven by a setState fired outside its
  // own graph — which is what left the card showing zero while the store
  // held five. This is the API for exactly this shape, and it re-reads on
  // every render rather than closing over anything.
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => state,
  );
}
