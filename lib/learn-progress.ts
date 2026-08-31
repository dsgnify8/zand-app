// Which lessons have been finished, and how well.
import { useSyncExternalStore, useEffect, useState } from 'react';
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
    // Every step, not only the lessons. A stage with a quiz and a deck of
    // flashcards in it was counting as finished while both were untouched,
    // because neither could be seen.
    const stepIsDone = (x: any) =>
      x.kind === 'lesson' && x.unit && x.lesson
        ? isLessonDone(x.unit, x.lesson)
        : isLessonDone(x.key, x.key);

    const finished = STAGES.filter((st: any) => st.steps.every(stepIsDone)).length;
    setField('stagesFinished', finished);

    // And the lessons themselves. Five achievements are keyed to this and
    // nothing had ever set it, so all five were unreachable and the
    // profile counted zero however much anyone learned.
    setField('lessonsFinished', done.length);
  } catch {}
}

/**
 * A step is finished.
 *
 * Named for lessons because that is all it recorded at first, but it is
 * really a pair of keys and a score. Steps that are not lessons — a deck
 * of flashcards, a quiz, the alphabet — pass their own key as both, which
 * keeps one store and one shape for the whole journey.
 */
export async function markStepDone(key: string, score = 100) {
  return markLessonDone(key, key, score);
}

export function isStepDone(key: string) {
  return isLessonDone(key, key);
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
let partialStep: Record<string, number> = {};
const PS_KEY = 'learn:partial-step';

export async function loadPartial() {
  try {
    const v = await AsyncStorage.getItem(P_KEY);
    // Assigned, not merged: a cleared store has to mean an empty one, or
    // stale values survive a wipe.
    partial = v ? JSON.parse(v) : {};
    const sv = await AsyncStorage.getItem(PS_KEY);
    partialStep = sv ? JSON.parse(sv) : {};
  } catch {}
  emit();
}

export async function markPartial(unit: string, lesson: string, pct: number, step?: number) {
  const k = unit + '|' + lesson;
  // never move backwards, and a finished lesson does not need a marker
  if (pct <= (partial[k] ?? 0) || pct >= 100) return;
  partial[k] = pct;
  // The step as well as the percentage. The ring only needs how far;
  // coming back needs where — and a percentage cannot say which question
  // someone was on without assuming the lesson never changes length.
  if (step !== undefined) partialStep[k] = step;
  try {
    await AsyncStorage.setItem(P_KEY, JSON.stringify(partial));
    await AsyncStorage.setItem(PS_KEY, JSON.stringify(partialStep));
    syncTouch();
  } catch {}
  emit();
}

/** Where they stopped, for coming back to. */
export function lessonStep(unit: string, lesson: string): number {
  return partialStep[unit + '|' + lesson] ?? 0;
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
  // Read through the store on every render. The setters reassign `done`,
  // so a hook that closed over it kept handing back the array from first
  // evaluation — a finished lesson would not reach the level screen, the
  // profile counters or the achievements.
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => snapshot(),
  );
}

let snap = { done, doneCount: done.length };
function snapshot() {
  if (snap.done !== done) snap = { done, doneCount: done.length };
  return snap;
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
