// Demo mode.
//
// On each launch this clears only the two things worth showing from the
// start: the onboarding flow, and the language-level questionnaire.
// Everything else stays put, so reading progress, lessons completed,
// friends, streaks and stats all look lived-in.
//
// Set DEMO to false before shipping.

import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEMO = false;

// Only these are wiped. Anything not listed here survives.
const REPLAY = [
  'onboarded',        // the welcome and language screens
  'onboarding:seen',
  'learn:level',      // the beginner/elementary questionnaire
  'learn:asked',
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
