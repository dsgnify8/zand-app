import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

const KEY = 'zand:reading:v1';

export type ReadingEntry = {
  topicKey: string;
  page: number;          // last page index viewed
  maxPageReached: number; // furthest page reached
  totalPages: number;
  updatedAt: number;
};

type Store = {
  reading: Record<string, ReadingEntry>;
  achievements: string[]; // earned achievement ids
};

type Value = {
  ready: boolean;
  reading: Record<string, ReadingEntry>;
  achievements: string[];
  recordReading: (topicKey: string, page: number, totalPages: number) => void;
  awardAchievement: (id: string) => void;
  lastRead: () => ReadingEntry | null;
  percentFor: (topicKey: string) => number;
};

const Ctx = createContext<Value | null>(null);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>({ reading: {}, achievements: [] });
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

  const recordReading = useCallback((topicKey: string, page: number, totalPages: number) => {
    setStore((prev) => {
      const existing = prev.reading[topicKey];
      const maxPageReached = Math.max(existing?.maxPageReached ?? 0, page);
      return {
        ...prev,
        reading: {
          ...prev.reading,
          [topicKey]: { topicKey, page, maxPageReached, totalPages, updatedAt: Date.now() },
        },
      };
    });
  }, []);

  const awardAchievement = useCallback((id: string) => {
    setStore((prev) => (prev.achievements.includes(id) ? prev : { ...prev, achievements: [...prev.achievements, id] }));
  }, []);

  const lastRead = useCallback((): ReadingEntry | null => {
    const all = Object.values(store.reading);
    if (!all.length) return null;
    return all.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  }, [store.reading]);

  const percentFor = useCallback((topicKey: string) => {
    const e = store.reading[topicKey];
    if (!e || !e.totalPages) return 0;
    return Math.round(((e.maxPageReached + 1) / e.totalPages) * 100);
  }, [store.reading]);

  return (
    <Ctx.Provider value={{ ready, reading: store.reading, achievements: store.achievements, recordReading, awardAchievement, lastRead, percentFor }}>
      {children}
    </Ctx.Provider>
  );
}

export function useReading() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useReading must be used within ReadingProvider');
  return ctx;
}
