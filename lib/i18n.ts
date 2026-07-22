// Language state + a tiny translation helper.
// Strings live in section files (constants/i18n/*.ts) as { en, fa } pairs.
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

export type Lang = 'en' | 'fa' | 'es' | 'fr';

let lang: Lang = 'en';
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const KEY = 'app:lang';

export async function loadLang() {
  try {
    const v = (await AsyncStorage.getItem(KEY)) as Lang | null;
    if (v) lang = v;
    emit();
  } catch {}
}

export async function setLang(v: Lang) {
  lang = v;
  emit();
  try { await AsyncStorage.setItem(KEY, v); } catch {}
}

export function getLang() { return lang; }
export function isRTL() { return lang === 'fa'; }

// a translation entry: at minimum en + fa. es/fr optional, fall back to en.
export type T = { en: string; fa?: string; es?: string; fr?: string };

export function t(entry: T): string {
  return entry[lang] ?? entry.en;
}

export function useLang() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { lang, isRTL: lang === 'fa', t, setLang };
}
