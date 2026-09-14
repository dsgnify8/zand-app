// Deciding what, if anything, is worth interrupting someone for.
//
// The mechanics of sending already exist — reminders.ts schedules a daily
// one, notif-prefs.ts handles the idle nudge and the push token. What was
// missing is the judgement: which of several possible things to say, and
// whether to say anything at all.
//
// Two rules, enforced here rather than trusted to whoever adds the next
// notification:
//
//   One a day, at most. Every send records its date, and a second on the
//   same day is dropped whatever it was going to be.
//
//   Two a week, at most. An app that can interrupt four times will.
//
// So each kind is a candidate, not a send. They are considered in order
// of how much the person is likely to want them, the first that applies
// wins, and everything else waits for another day.

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { notifCopy, type Kind } from '@/lib/notif-copy';
import { notifPrefs } from '@/lib/notif-prefs';
import { readRecent, readReached } from '@/lib/read-progress';
import { resolveSavedKey } from '@/lib/resolve-saved';
import { stats, visitedDays } from '@/lib/stats-store';

const LOG_KEY = 'notif:log';
const DAY = 86400000;

type Sent = { kind: Kind; at: number };
let log: Sent[] = [];

export async function loadNotifLog() {
  try {
    const raw = await AsyncStorage.getItem(LOG_KEY);
    log = raw ? JSON.parse(raw) : [];
  } catch {}
}

async function record(kind: Kind) {
  // Ninety days is plenty: nothing here asks a question older than that,
  // and an unbounded log grows for the life of the install.
  log = [...log, { kind, at: Date.now() }].filter((s) => Date.now() - s.at < 90 * DAY);
  try { await AsyncStorage.setItem(LOG_KEY, JSON.stringify(log)); } catch {}
}

const sentToday = () =>
  log.some((s) => new Date(s.at).toDateString() === new Date().toDateString());

const sentThisWeek = () =>
  log.filter((s) => Date.now() - s.at < 7 * DAY).length;

const everSent = (k: Kind) => log.some((s) => s.kind === k);

const lastSent = (k: Kind) =>
  log.filter((s) => s.kind === k).sort((a, b) => b.at - a.at)[0]?.at ?? 0;

/** Days since they last opened the app. */
function daysIdle(): number {
  const days = visitedDays();
  if (!days.length) return 0;
  const last = days[days.length - 1];
  return Math.floor((Date.now() - new Date(last).getTime()) / DAY);
}

/**
 * The one thing worth saying tonight, or nothing.
 *
 * Ordered by what someone is most likely to be glad to hear: something
 * they achieved, then something they are in the middle of, then an
 * invitation. A nudge about a streak matters more than a suggestion,
 * and a suggestion matters more than a reminder that the app exists.
 */
/**
 * Which switch governs which notification.
 *
 * The settings screen has four toggles and they were written before
 * these kinds existed, so each new kind answers to the one whose label
 * already describes it. Someone turning off "learning reminders" should
 * not thereby lose a nudge about a history chapter.
 */
const GOVERNED_BY: Record<Kind, keyof ReturnType<typeof notifPrefs>> = {
  firstLesson: 'learning',
  chapterDone: 'learning',
  streakAtRisk: 'learning',
  midChapter: 'articles',    // reading, not the learning world
  dormant: 'idle',
  nearYou: 'articles',
  friendSent: 'friends',
};

const allowed = (k: Kind) => notifPrefs()[GOVERNED_BY[k]] !== false;

function pick(): { kind: Kind; fill: Record<string, string | number> } | null {
  const s: any = stats();

  // Their first lesson, said once ever.
  if (allowed('firstLesson') && !everSent('firstLesson') && (s.lessonsFinished ?? 0) >= 1) {
    return { kind: 'firstLesson', fill: {} };
  }

  // A streak they might lose. Three days is where it starts to feel
  // like something worth keeping.
  const streak = s.streakDays ?? 0;
  if (allowed('streakAtRisk') && streak >= 3 && daysIdle() >= 1) {
    return { kind: 'streakAtRisk', fill: { days: streak, next: streak + 1 } };
  }

  // Something left unfinished, three days ago or more. Named, because
  // "you left something unfinished" is not a reason to come back and
  // "you were reading The Ilkhanate" is.
  const open = readRecent().find((r) => {
    const at = readReached(r.key);
    if (!at || at.total <= 1) return false;
    if (at.page + 1 >= at.total) return false;        // finished
    return Date.now() - at.at > 3 * DAY;
  });
  if (open && allowed('midChapter')) {
    const card = resolveSavedKey(open.key);
    if (card) return { kind: 'midChapter', fill: { thing: card.title } };
  }

  // Nothing started, and a week gone. Weekly at the very most.
  if (
    allowed('dormant') &&
    (s.lessonsFinished ?? 0) === 0 &&
    readRecent().length === 0 &&
    Date.now() - lastSent('dormant') > 7 * DAY
  ) {
    return { kind: 'dormant', fill: {} };
  }

  return null;
}

/**
 * Consider sending something this evening.
 *
 * Called after a session rather than on a timer: the app knows most
 * about someone the moment they put it down.
 */
export async function considerNotification() {
  // No blanket switch: each candidate checks the toggle that governs
  // it, so turning one category off leaves the others working.
  if (sentToday() || sentThisWeek() >= 2) return;

  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') return;
  } catch {
    return;
  }

  const choice = pick();
  if (!choice) return;

  const { title, body } = notifCopy(choice.kind, choice.fill, log.length);

  try {
    await Notifications.scheduleNotificationAsync({
      identifier: 'zand:' + choice.kind,
      content: { title, body },
      // Tomorrow evening. Sending the instant someone closes the app is
      // a notification about what they were just doing.
      trigger: Platform.OS === 'ios'
        ? ({ seconds: hoursUntilEvening() * 3600, repeats: false } as any)
        : ({ seconds: hoursUntilEvening() * 3600, repeats: false, channelId: 'default' } as any),
    });
    await record(choice.kind);
  } catch {}
}

/** Hours until seven in the evening, tomorrow if today has passed. */
function hoursUntilEvening(): number {
  const now = new Date();
  const target = new Date(now);
  target.setHours(19, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return Math.max(1, (target.getTime() - now.getTime()) / 3600000);
}

/** For the admin screen: what has been sent, and what would be next. */
export function notifDebug() {
  return { log, today: sentToday(), thisWeek: sentThisWeek(), next: pick() };
}
