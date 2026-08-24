// Which lessons have been finished, and how well.
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncTouch } from '@/lib/cloud-sync';

export type Done = { unit: string; lesson: string; score: number; at: number };

let done: Done[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const KEY = 'learn:done';

export async function loadLearnProgress() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    // An empty store must empty the array, not leave the previous
    // account's data sitting in memory.
    done = v ? JSON.parse(v) : [];
    emit();
  } catch {}
}

// A stage counts as finished when every lesson in it is done.
async function syncStages() {
  try {
    const { STAGES } = await import('@/constants/journey');
    const { setField } = await import('@/lib/stats-store');
    const finished = STAGES.filter((st: any) =>
      st.steps
        .filter((x: any) => x.kind === 'lesson' && x.unit && x.lesson)
        .every((x: any) => isLessonDone(x.unit, x.lesson)),
    ).length;
    setField('stagesFinished', finished);
  } catch {}
}

export async function markLessonDone(unit: string, lesson: string, score: number) {
  const prev = done.find((d) => d.unit === unit && d.lesson === lesson);
  // keep the best score, but always refresh the date
  done = [
    { unit, lesson, score: Math.max(score, prev?.score ?? 0), at: Date.now() },
    ...done.filter((d) => !(d.unit === unit && d.lesson === lesson)),
  ];
  emit();
  try { await AsyncStorage.setItem(KEY, JSON.stringify(done)); syncTouch(); } catch {}
  syncStages();
}

// How far through a lesson someone got before leaving. Kept separate
// from `done` because a half-finished lesson is not a completion — it is
// a place to come back to, and the map draws it differently.
let partial: Record<string, number> = {};
const P_KEY = 'learn:partial';

export async function loadPartial() {
  try {
    const v = await AsyncStorage.getItem(P_KEY);
    partial = v ? JSON.parse(v) : {};
  } catch {}
  emit();
}

export async function markPartial(unit: string, lesson: string, pct: number) {
  const k = unit + '|' + lesson;
  // never move backwards, and a finished lesson does not need a marker
  if (pct <= (partial[k] ?? 0) || pct >= 100) return;
  partial[k] = pct;
  console.log('[partial]', k, pct);
  try { await AsyncStorage.setItem(P_KEY, JSON.stringify(partial)); syncTouch(); } catch {}
  emit();
}

export function lessonPartial(unit: string, lesson: string): number {
  return partial[unit + '|' + lesson] ?? 0;
}

export function isLessonDone(unit: string, lesson: string) {
  return done.some((d) => d.unit === unit && d.lesson === lesson);
}
export function lessonScore(unit: string, lesson: string) {
  return done.find((d) => d.unit === unit && d.lesson === lesson)?.score ?? null;
}
export function doneCount() { return done.length; }

// The next thing to do: first unfinished lesson, in order.
export function nextLesson(units: { key: string; lessons: { key: string }[] }[]) {
  for (const u of units) {
    for (const l of u.lessons) {
      if (!isLessonDone(u.key, l.key)) return { unit: u.key, lesson: l.key };
    }
  }
  return null;
}

export function useLearnProgress() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { done, doneCount: done.length };
}


/**
 * Where the learner actually is on the route.
 *
 * `at` is the furthest step they have touched — a lesson either finished or
 * left part way. That is what screens should open on: "the latest thing you
 * were doing", not "the first thing you have not done". The two are only the
 * same on a route where every step can be completed, and four of the six
 * step kinds here cannot be.
 *
 * `next` is what to offer them: the same step if it is unfinished, otherwise
 * the one after it.
 *
 * Nothing touched yet gives both as the very first step, which for a new
 * learner is the alphabet — correct, and the reason this does not simply
 * skip to the first lesson.
 */
export function journeyPosition<T extends { kind: string; unit?: string; lesson?: string }>(
  flat: T[],
) {
  const touchedAt = (st: T) =>
    st.kind === 'lesson' && st.unit && st.lesson
      ? isLessonDone(st.unit, st.lesson) || lessonPartial(st.unit, st.lesson) > 0
      : false;

  let last = -1;
  flat.forEach((st, i) => { if (touchedAt(st)) last = i; });

  const atIndex = last < 0 ? 0 : last;
  const at = flat[atIndex];

  // Finished the thing they were on? Then next is the step after it.
  const atDone =
    at && at.kind === 'lesson' && at.unit && at.lesson && isLessonDone(at.unit, at.lesson);
  const nextIndex =
    last < 0 ? 0 : atDone ? Math.min(atIndex + 1, flat.length - 1) : atIndex;

  return { at, next: flat[nextIndex], atIndex, nextIndex, started: last >= 0 };
}
