// Tracks lifetime activity for milestones and the progress tab.
import { useEffect, useState } from 'react';
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
    if (!days.includes(today)) {
      await AsyncStorage.setItem('visit:days', JSON.stringify(next));
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
}

export function bump(field: keyof Stats, by = 1) {
  if (typeof (state as any)[field] === 'number') {
    state = { ...state, [field]: (state as any)[field] + by };
    emit(); persist();
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

export function milestoneStatus(s: Stats) {
  return MILESTONES.map((m) => {
    const cur = (s as any)[m.field] as number;
    return { ...m, current: Math.min(cur, m.target), achieved: cur >= m.target, pct: Math.min(100, Math.round((cur / m.target) * 100)) };
  });
}

export function useStats() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return state;
}
