import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

const KEY = 'zand:glossary-saved:v1';

type Value = {
  saved: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const Ctx = createContext<Value | null>(null);

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try { const raw = await AsyncStorage.getItem(KEY); if (raw) setSaved(JSON.parse(raw)); } catch {}
      setReady(true);
    })();
  }, []);
  useEffect(() => { if (ready) AsyncStorage.setItem(KEY, JSON.stringify(saved)).catch(() => {}); }, [saved, ready]);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);
  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  return <Ctx.Provider value={{ saved, isSaved, toggleSaved }}>{children}</Ctx.Provider>;
}

export function useGlossary() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useGlossary must be used within GlossaryProvider');
  return ctx;
}
