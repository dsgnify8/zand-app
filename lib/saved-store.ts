// Likes and saved-for-later, per device. Persists across restarts.
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncTouch } from '@/lib/cloud-sync';

type Sets = { liked: string[]; saved: string[]; recent: string[]; scroll: Record<string, number> };

let state: Sets = { liked: [], saved: [], recent: [], scroll: {} };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const K_LIKED = 'liked:articles';
const K_SAVED = 'saved:articles';
const K_RECENT = 'recent:articles';
const K_SCROLL = 'scroll:articles';

export async function loadSaved() {
  try {
    const [l, sv, r, sc] = await Promise.all([AsyncStorage.getItem(K_LIKED), AsyncStorage.getItem(K_SAVED), AsyncStorage.getItem(K_RECENT), AsyncStorage.getItem(K_SCROLL)]);
    state = { liked: l ? JSON.parse(l) : [], saved: sv ? JSON.parse(sv) : [], recent: r ? JSON.parse(r) : [], scroll: sc ? JSON.parse(sc) : {} };
    emit();
  } catch {}
}

async function persist() {
  try {
    await AsyncStorage.multiSet([[K_LIKED, JSON.stringify(state.liked)], [K_SAVED, JSON.stringify(state.saved)], [K_RECENT, JSON.stringify(state.recent)], [K_SCROLL, JSON.stringify(state.scroll)]]); syncTouch();
  } catch {}
}

function toggle(list: 'liked' | 'saved', key: string) {
  const has = state[list].includes(key);
  state = { ...state, [list]: has ? state[list].filter((k) => k !== key) : [key, ...state[list]] };
  emit(); persist();
  if (!has && list === 'saved') { import('@/lib/stats-store').then((m) => m.bump('thingsSaved')).catch(() => {}); }
}

export function markRead(key: string) {
  state = { ...state, recent: [key, ...state.recent.filter((k) => k !== key)].slice(0, 12) };
  emit(); persist();
}

export function saveScroll(key: string, y: number) {
  state = { ...state, scroll: { ...state.scroll, [key]: y } };
  persist();
}
export function getScroll(key: string): number {
  return state.scroll[key] ?? 0;
}

export const toggleLike = (k: string) => toggle('liked', k);
export const toggleSave = (k: string) => toggle('saved', k);

export function useSaved() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return {
    liked: state.liked,
    saved: state.saved,
    recent: state.recent,
    isLiked: (k: string) => state.liked.includes(k),
    isSaved: (k: string) => state.saved.includes(k),
    toggleLike,
    toggleSave,
  };
}
