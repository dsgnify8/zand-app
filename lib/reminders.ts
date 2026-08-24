// Daily reminders. Local notifications only: no server, no push tokens,
// nothing leaves the phone. The scheduling happens once a day and the
// message is chosen from what the learner is actually doing.

import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { getLang } from '@/lib/i18n';

const K_ON = 'remind:on';
const K_HOUR = 'remind:hour';
const DAILY_ID = 'daily-reminder';

let enabled = false;
let hour = 19;            // early evening by default
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function loadReminders() {
  try {
    const [on, h] = await AsyncStorage.multiGet([K_ON, K_HOUR]);
    enabled = on[1] === '1';
    hour = h[1] ? Number(h[1]) : 19;
    emit();
    if (enabled) schedule();
  } catch {}
}

async function cancelDaily() {
  try { await Notifications.cancelScheduledNotificationAsync(DAILY_ID); } catch {}
}

export function remindersOn() { return enabled; }
export function reminderHour() { return hour; }

export async function askPermission() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === 'granted') return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.status === 'granted';
}

export async function setReminders(on: boolean) {
  if (on) {
    const ok = await askPermission();
    if (!ok) return false;
  }
  enabled = on;
  emit();
  try { await AsyncStorage.setItem(K_ON, on ? '1' : '0'); } catch {}
  if (on) await schedule();
  // Only this reminder. cancelAll took the idle nudge and every friend
  // nudge with it — turning off one notification should not silently
  // disable the others.
  else await cancelDaily();
  return on;
}

export async function setReminderHour(h: number) {
  hour = h;
  emit();
  try { await AsyncStorage.setItem(K_HOUR, String(h)); } catch {}
  if (enabled) await schedule();
}

// The line the learner sees. Written to be worth reading rather than nagging.
async function pickBody(): Promise<{ title: string; body: string }> {
  try {
    const { dueNow } = await import('@/lib/word-strength');
    const { STAGES } = await import('@/constants/journey');
    const { isLessonDone } = await import('@/lib/learn-progress');
    const { expressionOfDay } = await import('@/constants/expressions');

    const due = dueNow();
    if (due >= 5) {
      return {
        title: 'ده دقیقه فارسی',
        body: due + ' words are ready to come round again. Five minutes will do it.',
      };
    }

    const next = STAGES.flatMap((s: any) => s.steps)
      .find((x: any) => x.kind === 'lesson' && x.unit && x.lesson && !isLessonDone(x.unit, x.lesson));
    if (next) {
      return {
        title: getLang() === 'fa' ? 'از همان‌جا که ماندی' : 'Where you left off',
        body: next.title + '. ' + next.sub + '.',
      };
    }

    const e = expressionOfDay();
    return { title: e.fa, body: e.literal + '  ·  ' + e.en };
  } catch {
    return getLang() === 'fa'
      ? { title: 'ده دقیقه فارسی', body: 'چند دقیقه فارسی کافی است تا از دستت نرود.' }
      : { title: 'Ten minutes of Persian', body: 'A few minutes of Persian is enough to keep it.' };
  }
}

export async function schedule() {
  try {
    // Only this one. cancelAll here wiped the idle nudge and every friend
    // nudge on every launch, since loadReminders calls this at startup.
    await cancelDaily();
    const { title, body } = await pickBody();
    await Notifications.scheduleNotificationAsync({
      // Named, so cancelDaily can find it. Without an identifier the only
      // way to stop it was cancelAll, which took every other scheduled
      // notification with it.
      identifier: DAILY_ID,
      content: { title, body },
      trigger: Platform.OS === 'ios'
        ? ({ hour, minute: 0, repeats: true } as any)
        : ({ hour, minute: 0, repeats: true, channelId: 'default' } as any),
    });
  } catch {}
}

// Called after a lesson, so tomorrow's message reflects what just happened.
export function refreshTomorrow() {
  if (enabled) schedule();
}

export function useReminders() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return { enabled, hour };
}
