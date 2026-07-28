// Which level the learner picked, and whether they have been asked yet.
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Level = 'beginner' | 'elementary' | 'intermediate' | 'advanced';

export const LEVELS: { key: Level; roman: string; name: string; blurb: string; start: string }[] = [
  { key: 'beginner', roman: 'I', name: 'New to Persian',
    blurb: 'You are starting from the letters.', start: '/learn/map' },
  { key: 'elementary', roman: 'II', name: 'I know some words',
    blurb: 'You can read a little and know a handful of phrases.', start: '/learn/map' },
  { key: 'intermediate', roman: 'III', name: 'I can hold a conversation',
    blurb: 'You want sentences, grammar, and more range.', start: '/learn/map' },
  { key: 'advanced', roman: 'IV', name: 'I read and write',
    blurb: 'You want longer texts and real writing practice.', start: '/learn/map' },
];

let level: Level | null = null;
let asked = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const K_LEVEL = 'learn:level';
const K_ASKED = 'learn:asked';

export async function loadLevel() {
  try {
    const [l, a] = await AsyncStorage.multiGet([K_LEVEL, K_ASKED]);
    level = (l[1] as Level | null) ?? null;
    asked = a[1] === '1';
    emit();
  } catch {}
}

export async function setLevel(v: Level) {
  level = v; asked = true; emit();
  try { await AsyncStorage.multiSet([[K_LEVEL, v], [K_ASKED, '1']]); } catch {}
}

export async function skipLevel() {
  asked = true; emit();
  try { await AsyncStorage.setItem(K_ASKED, '1'); } catch {}
}

export function getLevel() { return level; }
export function hasChosen() { return asked; }

export function levelInfo(v: Level | null) {
  return LEVELS.find((l) => l.key === v) ?? null;
}

export function useLevel() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { level, asked, info: levelInfo(level) };
}
