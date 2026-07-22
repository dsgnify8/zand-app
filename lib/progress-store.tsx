import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'zand:progress:v1';
const MAX_FREEZES = 2;
const MAX_HISTORY = 300;

export type ContentType = 'video' | 'podcast' | 'article';
export type Ref = { type: ContentType; id: string; ts: number };

type ProgressState = {
  currentStreak: number;
  longestStreak: number;
  freezes: number;
  lastActiveDate: string | null;
  activeDates: string[];
  learnedLetters: string[];
  saved: Ref[];
  history: Ref[];
};

const DEFAULT_STATE: ProgressState = {
  currentStreak: 0,
  longestStreak: 0,
  freezes: MAX_FREEZES,
  lastActiveDate: null,
  activeDates: [],
  learnedLetters: [],
  saved: [],
  history: [],
};

function todayStr(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}
function dayDiff(from: string, to: string) {
  const a = new Date(from + 'T00:00:00');
  const b = new Date(to + 'T00:00:00');
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}
function applyActivity(prev: ProgressState, today: string): ProgressState {
  if (prev.lastActiveDate === today) return prev;
  let { currentStreak, longestStreak, freezes } = prev;
  if (prev.lastActiveDate === null) currentStreak = 1;
  else {
    const gap = dayDiff(prev.lastActiveDate, today);
    if (gap <= 0) return prev;
    else if (gap === 1) currentStreak += 1;
    else if (gap === 2 && freezes > 0) { freezes -= 1; currentStreak += 1; }
    else currentStreak = 1;
  }
  longestStreak = Math.max(longestStreak, currentStreak);
  if (currentStreak > 0 && currentStreak % 7 === 0 && freezes < MAX_FREEZES) freezes = Math.min(MAX_FREEZES, freezes + 1);
  const activeDates = [...prev.activeDates.filter((x) => x !== today), today].slice(-30);
  return { ...prev, currentStreak, longestStreak, freezes, lastActiveDate: today, activeDates };
}

type Value = {
  ready: boolean;
  currentStreak: number;
  longestStreak: number;
  freezes: number;
  learnedLetters: string[];
  weeklyActivity: { label: string; active: boolean }[];
  saved: Ref[];
  history: Ref[];
  markActivity: () => void;
  markLetterLearned: (char: string) => void;
  recordView: (type: ContentType, id: string) => void;
  toggleSaved: (type: ContentType, id: string) => void;
  isSaved: (type: ContentType, id: string) => boolean;
  resetProgress: () => void;
};

const Ctx = createContext<Value | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
      } catch {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const markActivity = useCallback(() => setState((p) => applyActivity(p, todayStr())), []);

  const markLetterLearned = useCallback((char: string) => {
    setState((prev) => {
      const next = applyActivity(prev, todayStr());
      if (next.learnedLetters.includes(char)) return next;
      return { ...next, learnedLetters: [...next.learnedLetters, char] };
    });
  }, []);

  const recordView = useCallback((type: ContentType, id: string) => {
    setState((prev) => {
      const next = applyActivity(prev, todayStr());
      const history = [{ type, id, ts: Date.now() }, ...next.history.filter((h) => !(h.type === type && h.id === id))].slice(0, MAX_HISTORY);
      return { ...next, history };
    });
  }, []);

  const toggleSaved = useCallback((type: ContentType, id: string) => {
    setState((prev) => {
      const exists = prev.saved.some((s) => s.type === type && s.id === id);
      const saved = exists
        ? prev.saved.filter((s) => !(s.type === type && s.id === id))
        : [{ type, id, ts: Date.now() }, ...prev.saved];
      return { ...prev, saved };
    });
  }, []);

  const isSaved = useCallback((type: ContentType, id: string) => state.saved.some((s) => s.type === type && s.id === id), [state.saved]);

  const resetProgress = useCallback(() => setState(DEFAULT_STATE), []);

  const weeklyActivity = useMemo(() => {
    const initials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const out: { label: string; active: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      out.push({ label: initials[d.getDay()], active: state.activeDates.includes(todayStr(d)) });
    }
    return out;
  }, [state.activeDates]);

  const value: Value = {
    ready,
    currentStreak: state.currentStreak,
    longestStreak: state.longestStreak,
    freezes: state.freezes,
    learnedLetters: state.learnedLetters,
    weeklyActivity,
    saved: state.saved,
    history: state.history,
    markActivity,
    markLetterLearned,
    recordView,
    toggleSaved,
    isSaved,
    resetProgress,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
