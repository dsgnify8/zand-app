// How many TPM posts have been read, and whether the reader has subscribed.
// Demo only: the subscription is not wired to the App Store.

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FREE_READS = 5;

let read: string[] = [];
let subscribed = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const K_READ = 'tpm:read';
const K_SUB = 'tpm:sub';

export async function loadTpmAccess() {
  try {
    const [r, s] = await AsyncStorage.multiGet([K_READ, K_SUB]);
    read = r[1] ? JSON.parse(r[1]) : [];
    subscribed = s[1] === '1';
    emit();
  } catch {}
}

export function readCount() { return read.length; }
export function isSubscribed() { return subscribed; }
export function hasRead(key: string) { return read.includes(key); }

// True when this post can be opened.
export function canRead(key: string) {
  if (subscribed) return true;
  if (read.includes(key)) return true;      // already opened, never lock it again
  return read.length < FREE_READS;
}

export function readsLeft() {
  return Math.max(0, FREE_READS - read.length);
}

export async function markRead(key: string) {
  if (read.includes(key)) return;
  read = [...read, key];
  emit();
  try { await AsyncStorage.setItem(K_READ, JSON.stringify(read)); } catch {}
}

// Demo: flips the flag, no payment involved.
export async function subscribe() {
  subscribed = true;
  emit();
  try { await AsyncStorage.setItem(K_SUB, '1'); } catch {}
}

export async function unsubscribe() {
  subscribed = false;
  emit();
  try { await AsyncStorage.setItem(K_SUB, '0'); } catch {}
}

export function useTpmAccess() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { read: read.length, subscribed, left: readsLeft() };
}
