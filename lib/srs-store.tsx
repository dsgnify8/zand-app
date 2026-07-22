import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

const KEY = 'zand:srs:v1';
const DAY = 86400000;
// Days until a card is due again, by box. Box 0 = brand new (due now).
const INTERVALS = [0, 1, 2, 4, 8, 16, 32];
const MAX_BOX = INTERVALS.length - 1;

export type SRState = { box: number; due: number; reps: number };
type Store = Record<string, SRState>;

export function cardId(deckKey: string, fa: string) {
  return deckKey + '::' + fa;
}

type Value = {
  ready: boolean;
  review: (id: string, gotIt: boolean) => void;
  isDue: (id: string, now?: number) => boolean;
  dueCount: (ids: string[], now?: number) => number;
  masteredCount: (ids: string[]) => number;
  reset: () => void;
};

const Ctx = createContext<Value | null>(null);

export function SRSProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try { const raw = await AsyncStorage.getItem(KEY); if (raw) setStore(JSON.parse(raw)); } catch {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(store)).catch(() => {});
  }, [store, ready]);

  const review = useCallback((id: string, gotIt: boolean) => {
    setStore((prev) => {
      const cur = prev[id] ?? { box: 0, due: 0, reps: 0 };
      const box = gotIt ? Math.min(cur.box + 1, MAX_BOX) : 1;
      return { ...prev, [id]: { box, due: Date.now() + INTERVALS[box] * DAY, reps: cur.reps + 1 } };
    });
  }, []);

  const isDue = useCallback((id: string, now = Date.now()) => {
    const s = store[id];
    return !s || s.due <= now;
  }, [store]);

  const dueCount = useCallback((ids: string[], now = Date.now()) =>
    ids.filter((id) => { const s = store[id]; return !s || s.due <= now; }).length, [store]);

  const masteredCount = useCallback((ids: string[]) =>
    ids.filter((id) => (store[id]?.box ?? 0) >= 4).length, [store]);

  const reset = useCallback(() => setStore({}), []);

  return (
    <Ctx.Provider value={{ ready, review, isDue, dueCount, masteredCount, reset }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSRS() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSRS must be used within SRSProvider');
  return ctx;
}
