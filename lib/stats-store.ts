// Tracks lifetime activity for milestones and the progress tab.
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Stats = {
  topicsFinished: number;
  articlesRead: number;
  videosWatched: number;
  pagesRead: number;
  thingsSaved: number;
  thingsSent: number;
  lessonsFinished: number;
  stagesFinished: number;
  wordsSolid: number;
  learnDays: number;
  streakDays: number;
  finished: { key: string; title: string; sub: string; route: string; at: number }[];
};

const EMPTY: Stats = {
  topicsFinished: 0, articlesRead: 0, videosWatched: 0, pagesRead: 0,
  thingsSaved: 0, thingsSent: 0, streakDays: 0, finished: [],
  lessonsFinished: 0, stagesFinished: 0, wordsSolid: 0, learnDays: 0,
};

let state: Stats = { ...EMPTY };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const KEY = 'stats:v1';

export async function loadStats() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    if (v) state = { ...EMPTY, ...JSON.parse(v) };
    emit();
  } catch {}
}
async function persist() { try { await AsyncStorage.setItem(KEY, JSON.stringify(state)); } catch {} }

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
      await AsyncStorage.setItem('learn:days', JSON.stringify(next));
      bump('learnDays');
    }
  } catch {}
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

export function recordFinished(item: { key: string; title: string; sub: string; route: string }) {
  if (state.finished.some((f) => f.key === item.key)) return;
  state = { ...state, finished: [{ ...item, at: Date.now() }, ...state.finished], topicsFinished: state.topicsFinished + 1 };
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
  { key: 'topics4', label: '4 topics finished', field: 'topicsFinished', target: 4 },
  { key: 'articles4', label: '4 articles read', field: 'articlesRead', target: 4 },
  { key: 'videos5', label: '5 videos watched', field: 'videosWatched', target: 5 },
  { key: 'pages20', label: '20 pages read', field: 'pagesRead', target: 20 },
  { key: 'saved10', label: '10 things saved', field: 'thingsSaved', target: 10 },
  { key: 'sent6', label: '6 sent to friends', field: 'thingsSent', target: 6 },
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
