// Language state + a tiny translation helper.
// Strings live in section files (constants/i18n/*.ts) as { en, fa } pairs.
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

export type Lang = 'en' | 'fa';

let lang: Lang = 'en';
const listeners = new Set<() => void>();
const emit = () => { console.log('[lang] emit to', listeners.size, 'listeners'); listeners.forEach((l) => l()); }; // TEMP-LANG-LOG

/** Subscribe to language changes. Returns an unsubscribe. */
export function onLangChange(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

const KEY = 'app:lang';

export async function loadLang() {
  try {
    const v = (await AsyncStorage.getItem(KEY)) as Lang | null;
    if (v) lang = v;
    emit();
  } catch {}
}

export async function setLang(v: Lang) {
  console.log('[lang] setLang called with', v, 'was', lang); // TEMP-LANG-LOG
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
    const l = () => { console.log('[lang] subscriber ticked'); tick((n) => n + 1); }; // TEMP-LANG-LOG
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  // Read through getLang() rather than closing over `lang`. The module
  // binding resolves once, so returning it directly handed back the value
  // from first evaluation on every render — the subscribers ticked, the
  // component re-rendered, and useLang reported the old language forever
  // while t() reported the new one.
  const now = getLang();
  return { lang: now, isRTL: now === 'fa', t, setLang };
}
