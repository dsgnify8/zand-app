import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const ADMIN_EMAIL = 'nojan.zandesh@gmail.com';

// Gmail ignores dots in the local part, so nojan.zandesh and nojanzandesh are
// the same inbox. A plain string compare would treat them as different people.
function sameAddress(a?: string | null, b?: string | null) {
  const norm = (x?: string | null) => {
    if (!x) return '';
    const [local, domain = ''] = x.trim().toLowerCase().split('@');
    const isGoogle = domain === 'gmail.com' || domain === 'googlemail.com';
    return (isGoogle ? local.replace(/\./g, '').split('+')[0] : local) + '@' + domain;
  };
  return norm(a) === norm(b) && norm(a) !== '@';
}

// plain check used outside React (e.g. FramedImage). Reads cached session email.
let _adminEmail: string | null = null;
const adminListeners = new Set<() => void>();
export function setAdminEmail(email: string | null) {
  _adminEmail = email; adminListeners.forEach((l) => l()); }
export function isAdmin() { return sameAddress(_adminEmail, ADMIN_EMAIL); }

export function useIsAdmin() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    adminListeners.add(l);
    return () => { adminListeners.delete(l); };
  }, []);
  return sameAddress(_adminEmail, ADMIN_EMAIL);
}

// log a read/open event for analytics (fire and forget)
export async function logEvent(kind: string, itemKey: string) {
  try {
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return;
    await supabase.from('events').insert({ user_id: uid, kind, item_key: itemKey });
  } catch {}
}

// hidden articles: the app reads this list and filters them out
let hiddenCache: string[] = [];
const listeners = new Set<() => void>();

export async function loadHidden() {
  try {
    const { data } = await supabase.from('hidden_articles').select('article_key');
    hiddenCache = (data ?? []).map((r: any) => r.article_key);
    listeners.forEach((l) => l());
  } catch {}
}
export function isHidden(key: string) { return hiddenCache.includes(key); }
export function getHidden() { return hiddenCache; }

export async function hideArticle(key: string) {
  try {
    await supabase.from('hidden_articles').insert({ article_key: key });
    hiddenCache = [...hiddenCache, key]; listeners.forEach((l) => l());
  } catch {}
}
export async function unhideArticle(key: string) {
  try {
    await supabase.from('hidden_articles').delete().eq('article_key', key);
    hiddenCache = hiddenCache.filter((k) => k !== key); listeners.forEach((l) => l());
  } catch {}
}

export function useHidden() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return hiddenCache;
}
