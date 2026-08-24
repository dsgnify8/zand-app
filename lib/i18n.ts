// Language state + a tiny translation helper.
// Strings live in section files (constants/i18n/*.ts) as { en, fa } pairs.
import { useSyncExternalStore } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

export type Lang = 'en' | 'fa';

let lang: Lang = 'en';
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

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
  // useSyncExternalStore, not useState + a listener set. `lang` is an
  // external store read during render, and React 18 is free to bail out of
  // a re-render driven by a plain setState from outside its own graph —
  // which is why some subscribed components updated on a switch and others
  // did not. This is the API for exactly this shape.
  const now = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => lang,
  );
  return { lang: now, isRTL: now === 'fa', t, setLang };
}

