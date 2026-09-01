// Demo mode.
//
// On each launch this clears everything a previous session left behind,
// so the app opens the way a new user would find it. That includes
// progress and streaks: the whole point is to see what someone sees on
// their first day, and a lived-in app is exactly what we are not
// testing.
//
// Set DEMO to false before shipping.

import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEMO = false;

// Wiped on every launch while DEMO is on.
const REPLAY = [
  'learn:done',       // lessons finished
  'learn:partial',    // half-finished lessons
  'learn:strength',   // word review counts
  'stats:v1',         // streak, counters, milestones
  'saved:articles',
  'liked:articles',
  'recent:articles',
  'saved:businesses',
  'onboarded',        // the welcome and language screens
  'onboarding:seen',
  'learn:level',      // the beginner/elementary questionnaire
  'learn:asked',
  'tpm:read',         // which TPM pieces have been read
  'tpm:sub',          // the TPM subscription state
];

export async function resetForDemo() {
  if (!DEMO) return;
  try {
    await AsyncStorage.multiRemove(REPLAY);
    } catch (e) {
    }
}


/**
 * Whether to dress the app with seeded content.
 *
 * Only the admin account. Everyone else, signed in or out, sees their
 * own state — which for a new arrival is empty, and should be.
 */
export function showDemoData(email?: string | null) {
  // Signed out shows nothing seeded either. A visitor looking at someone
  // else's streak and reading history is worse than a visitor looking at
  // an empty app that explains itself.
  if (!email) return false;
  return email === 'nojan.zandesh@gmail.com';    // the demo account
}
