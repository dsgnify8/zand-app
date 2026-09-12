// Whether onboarding has been completed.
//
// Its own module rather than living in _layout: the onboarding screen has
// to set it, and a route importing the layout that renders it is a cycle
// — which resolves as undefined at load time often enough to matter.

import AsyncStorage from '@react-native-async-storage/async-storage';

// Only a true is cached. Caching a false meant a first launch remembered
// "not onboarded" for the session and finishing onboarding could not
// change its mind.
let done: boolean | null = null;
const listeners = new Set<() => void>();

export function onboardedNow() { return done; }

export function onOnboarded(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

export async function readOnboarded(): Promise<boolean> {
  if (done === true) return true;
  try {
    const v = await AsyncStorage.getItem('onboarded');
    if (v === '1') done = true;
    return v === '1';
  } catch {
    // A failed read is not a reason to make someone do it again.
    done = true;
    return true;
  }
}

export function markOnboarded() {
  done = true;
  listeners.forEach((l) => l());
}
