// Demo mode.
//
// On each launch this clears only the two things worth showing from the
// start: the onboarding flow, and the language-level questionnaire.
// Everything else stays put, so reading progress, lessons completed,
// friends, streaks and stats all look lived-in.
//
// Set DEMO to false before shipping.

import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEMO = true;

// Only these are wiped. Anything not listed here survives.
const REPLAY = [
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
    console.log('[demo] intro and level reset; progress kept');
  } catch (e) {
    console.log('[demo] reset failed', e);
  }
}


/**
 * Whether to dress the app with seeded content.
 *
 * True when nobody is signed in — a visitor should see what the app
 * becomes rather than an empty shell — and true for the admin account,
 * which is the one used to show the app. False for everyone else,
 * because a real user seeing a stranger's streak and reading history as
 * their own is worse than seeing nothing at all.
 */
export function showDemoData(email?: string | null) {
  if (!email) return true;                       // signed out
  return email === 'nojan.zandesh@gmail.com';    // the demo account
}
