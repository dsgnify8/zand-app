// Likes and saved-for-later, per device. Persists across restarts.
import { useSyncExternalStore, useEffect, useState } from 'react';
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
  // Recount rather than bump. A bump only fired for one of the lists and
  // only when adding, so favourites never counted and nothing ever came
  // back off. Counting what is there cannot drift.
  import('@/lib/stats-store').then((m) => m.recountSaved()).catch(() => {});
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

/** The live sets. For counting, where a read from disk would lag. */
export function savedState() {
  return state;
}

export function useSaved() {
  // useSyncExternalStore rather than a tick. With the tick, `emit()`
  // scheduled a re-render that ran before React had committed the state
  // change — so the first render after a toggle still read the old
  // arrays, and only the render after that was right. Un-hearting
  // something appeared to do nothing until you left and came back.
  const snap = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => state,
  );
  return {
    liked: snap.liked,
    saved: snap.saved,
    recent: snap.recent,
    isLiked: (k: string) => state.liked.includes(k),
    isSaved: (k: string) => state.saved.includes(k),
    toggleLike,
    toggleSave,
  };
}
