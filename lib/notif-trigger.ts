// When a local notification should fire.
//
// expo-notifications changed the shape of a trigger: it now has to say
// what kind it is, and one without a `type` is rejected outright. Every
// trigger in the app was still written the old way, as a bare
// `{ seconds }` or `{ hour, minute, repeats }`, so on iOS the call threw
// and the notification was never scheduled at all. Every caller wrapped
// that in a try/catch and carried on, which is why it was quiet rather
// than loud.
//
// So the shapes live here, in one place, rather than being spelled out at
// five call sites and drifting apart again.

import { Platform } from 'react-native';
import {
  AndroidImportance,
  SchedulableTriggerInputTypes,
  setNotificationChannelAsync,
  type NotificationTriggerInput,
} from 'expo-notifications';

// Android delivers through a channel; iOS has no notion of one.
const channel = Platform.OS === 'android' ? { channelId: 'default' } : {};

/** Once, this many seconds from now. */
export function inSeconds(seconds: number): NotificationTriggerInput {
  return {
    type: SchedulableTriggerInputTypes.TIME_INTERVAL,
    // iOS refuses anything under a second, and a fraction rounds to zero.
    seconds: Math.max(1, Math.round(seconds)),
    repeats: false,
    ...channel,
  };
}

/** Every day at this hour, local time. */
export function everyDayAt(hour: number, minute = 0): NotificationTriggerInput {
  return {
    type: SchedulableTriggerInputTypes.DAILY,
    hour,
    minute,
    ...channel,
  };
}

/**
 * Make sure the channel we address exists.
 *
 * Android 8 and later drop a notification posted to a channel that was
 * never created, silently, and every scheduling call in the app is
 * wrapped in a catch — so without this every local notification on
 * Android vanished with nothing to show for it. Cheap and idempotent, so
 * it runs at every boot.
 */
export async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  try {
    await setNotificationChannelAsync('default', {
      name: 'ZAND',
      importance: AndroidImportance.DEFAULT,
    });
  } catch {}
}
