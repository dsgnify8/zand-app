// Notification preferences, and the two kinds we can schedule locally.
//
// Four categories:
//
//   learning  a daily practice reminder. This is the existing reminder
//             in lib/reminders.ts; we just gate it on the toggle.
//   idle      a nudge after some days without opening anything. Local,
//             rescheduled on every launch, so it only ever fires if you
//             genuinely stop coming back.
//   articles  when something new goes up.
//   friends   when someone sends you a word or topic.
//
// The last two need real push — a development build, an APNs key, device
// tokens on the server. They are stored here now so the preference is
// respected the moment push exists, rather than being retrofitted.

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { syncTouch } from '@/lib/cloud-sync';

export type NotifPrefs = {
  learning: boolean;
  idle: boolean;
  articles: boolean;
  friends: boolean;
};

const KEY = 'notif:v1';
const IDLE_ID = 'idle-nudge';
const IDLE_DAYS = 4;

const DEFAULTS: NotifPrefs = { learning: true, idle: true, articles: true, friends: true };

let prefs: NotifPrefs = { ...DEFAULTS };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export async function loadNotifPrefs() {
  try {
    const v = await AsyncStorage.getItem(KEY);
    if (v) prefs = { ...DEFAULTS, ...JSON.parse(v) };
  } catch {}
  emit();
  scheduleIdle();
}

export function notifPrefs() { return prefs; }

export async function setNotifPref<K extends keyof NotifPrefs>(k: K, v: NotifPrefs[K]) {
  prefs = { ...prefs, [k]: v };
  emit();
  try { await AsyncStorage.setItem(KEY, JSON.stringify(prefs)); syncTouch(); } catch {}

  if (k === 'idle') {
    if (v) await scheduleIdle();
    else await cancelIdle();
  }
  return prefs;
}

/* ---------------- the idle nudge ---------------- */

// Cancelled and rebooked every launch. If someone keeps opening the app
// it never fires; if they stop, it arrives a few days later. That is the
// only honest way to do "we noticed you were gone" without a server.
export async function scheduleIdle() {
  if (!prefs.idle) return;
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') return;

    await cancelIdle();
    await Notifications.scheduleNotificationAsync({
      identifier: IDLE_ID,
      content: {
        title: 'Still here when you are',
        body: 'Your place is saved. Pick up where you left off.',
      },
      trigger: Platform.OS === 'ios'
        ? ({ seconds: IDLE_DAYS * 24 * 60 * 60, repeats: false } as any)
        : ({ seconds: IDLE_DAYS * 24 * 60 * 60, repeats: false, channelId: 'default' } as any),
    });
  } catch {}
}

async function cancelIdle() {
  try { await Notifications.cancelScheduledNotificationAsync(IDLE_ID); } catch {}
}

/* ---------------- push registration ---------------- */

// Stores the device token so the server can reach this device. Returns
// null in Expo Go, where push is not available at all — the caller
// should treat that as "not yet", not as an error.
export async function registerForPush(userId: string | undefined) {
  if (!userId) return null;
  if (!prefs.articles && !prefs.friends) return null;
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const req = await Notifications.requestPermissionsAsync();
      if (req.status !== 'granted') return null;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    if (!token?.data) return null;

    const { supabase } = await import('@/lib/supabase');
    await supabase.from('push_tokens').upsert(
      { user_id: userId, token: token.data, platform: Platform.OS, updated_at: new Date().toISOString() },
      { onConflict: 'token' },
    );
    return token.data;
  } catch {
    // Expo Go, no dev build, no credentials — all land here and all mean
    // the same thing: push is not available yet.
    return null;
  }
}

export function useNotifPrefs() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return prefs;
}
