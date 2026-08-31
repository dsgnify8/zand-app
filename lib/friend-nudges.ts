// Nudging someone who has not opened what a friend sent.
//
// Local notifications only, following the pattern scheduleIdle already
// uses: a named identifier, cancel-then-schedule, permission checked
// first. Nothing goes to a server, so this works in Expo Go and needs no
// push token.
//
// One nudge per item, identified by that item's id, so learning one thing
// cancels exactly that nudge and leaves the others alone. And at most one
// outstanding per sender — five unlearned things from the same friend
// should not produce five buzzes.
//
// Written in the recipient's language, because it is composed on the
// recipient's own device. That is the difference between this and the push
// notifications, which are still built on the sender's phone in whatever
// language they happen to be using.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { notifPrefs } from '@/lib/notif-prefs';
import { getLang } from '@/lib/i18n';
import type { SentItem } from '@/lib/inbox';

const PREFIX = 'friend-nudge-';
const AFTER_DAYS = 3;

/**
 * Nine ways of saying the same thing.
 *
 * Chosen by the item's id rather than at random, so a given item always
 * gets the same line — a notification that rewords itself between one
 * launch and the next reads as a machine talking.
 */
const LINES: { en: string; fa: string }[] = [
  { en: '{name} sent you something three days ago.', fa: '{name} سه روز پیش چیزی برایت فرستاد.' },
  { en: 'Still waiting: the word {name} sent.', fa: 'هنوز منتظر توست: واژه‌ای که {name} فرستاده.' },
  { en: '{name} is waiting to hear what you thought.', fa: '{name} منتظر است بداند نظرت چه بوده.' },
  { en: 'Three days. {name} has not forgotten.', fa: 'سه روز گذشته. {name} فراموشت نکرده.' },
  { en: 'Learn it, then send {name} one back.', fa: 'یادش بگیر، بعد یکی هم برای {name} بفرست.' },
  { en: 'Something from {name} is still unopened.', fa: 'چیزی که {name} فرستاده هنوز باز نشده.' },
  { en: 'Your turn. {name} went first.', fa: 'نوبت توست. {name} اول فرستاد.' },
  { en: 'One word from {name}, still waiting.', fa: 'یک واژه از {name}، هنوز منتظر است.' },
  { en: 'Three days since {name} sent you something.', fa: 'سه روز است که {name} چیزی برایت فرستاده.' },
];

const TITLE = { en: 'From a friend', fa: 'از یک دوست' };

const idFor = (itemId: number) => PREFIX + itemId;

/** Cancel the nudge for one item. Called the moment it is learned. */
export async function cancelNudge(itemId: number) {
  try {
    await Notifications.cancelScheduledNotificationAsync(idFor(itemId));
  } catch {}
}

/**
 * Look at the inbox and make sure the right nudges are pending.
 *
 * Safe to call on every inbox load: scheduling the same identifier twice
 * replaces rather than duplicates, and anything learned gets cancelled.
 */
export async function syncNudges(inbox: SentItem[]) {
  if (!notifPrefs().friends) {
    // Respecting the toggle means clearing what is already pending, not
    // just declining to add more.
    await Promise.all(inbox.map((it) => cancelNudge(it.id)));
    return;
  }

  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') return;
  } catch {
    return;
  }

  const fa = getLang() === 'fa';

  // Learned things never nudge.
  const unlearned = inbox.filter((it) => !it.learned);
  await Promise.all(
    inbox.filter((it) => it.learned).map((it) => cancelNudge(it.id)),
  );

  // One per sender: the oldest unlearned thing they sent. Being reminded
  // five times about one friend is worse than not being reminded at all.
  const oldestPerSender = new Map<string, SentItem>();
  for (const it of unlearned) {
    const prev = oldestPerSender.get(it.sender);
    if (!prev || new Date(it.created_at) < new Date(prev.created_at)) {
      oldestPerSender.set(it.sender, it);
    }
  }

  // Anything unlearned that is not the chosen one gets its nudge cleared,
  // in case it was the chosen one on a previous pass.
  const chosen = new Set([...oldestPerSender.values()].map((it) => it.id));
  await Promise.all(
    unlearned.filter((it) => !chosen.has(it.id)).map((it) => cancelNudge(it.id)),
  );

  for (const it of oldestPerSender.values()) {
    const sent = new Date(it.created_at).getTime();
    const due = sent + AFTER_DAYS * 24 * 60 * 60 * 1000;
    const seconds = Math.round((due - Date.now()) / 1000);

    // Already past three days and still unlearned: nudge shortly rather
    // than immediately, so opening the app does not set one off in hand.
    const fire = seconds > 0 ? seconds : 60 * 60;

    const line = LINES[it.id % LINES.length];
    const name = it.senderName ?? (fa ? 'یک دوست' : 'a friend');

    try {
      await Notifications.scheduleNotificationAsync({
        identifier: idFor(it.id),
        content: {
          title: fa ? TITLE.fa : TITLE.en,
          body: (fa ? line.fa : line.en).replace('{name}', name),
          data: { tab: 'friends' },
        },
        trigger: Platform.OS === 'ios'
          ? ({ seconds: fire, repeats: false } as any)
          : ({ seconds: fire, repeats: false, channelId: 'default' } as any),
      });
    } catch {}
  }
}
