// Finding where someone is, or where they say they are.
//
// Two paths, and both matter:
//
//   * Live location, if they grant it. Fastest and most accurate, and
//     the one most people will take.
//   * A typed place — "central Gothenburg", "Stockholm", "Dubai Marina"
//     — geocoded to coordinates. Needed for anyone who declines the
//     permission, and for listing a business that is not where the owner
//     happens to be standing.
//
// Nothing here throws. A refused permission and a failed lookup both
// return null, because from the screen's point of view they are the same
// thing: we do not know where you are, so ask.

import * as Location from 'expo-location';

export type Coords = { lat: number; lng: number };
export type Place = Coords & { city?: string; country?: string; label?: string };

/** Have we already been granted location? Does not prompt. */
export async function hasLocation(): Promise<boolean> {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

/** Ask, if we have not already. Returns whether we may read location. */
export async function askLocation(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

/**
 * Where they are now. Balanced accuracy on purpose: street-level is
 * plenty for "what is near me", and the highest setting costs battery
 * and several seconds for precision nobody here needs.
 */
export async function currentPlace(): Promise<Place | null> {
  try {
    if (!(await hasLocation())) {
      const ok = await askLocation();
      if (!ok) return null;
    }
    // Bounded. getCurrentPositionAsync never returns on a simulator with
    // no location set, and it can hang for a very long time on a handset
    // that cannot get a fix — indoors, in a lift, somewhere with the sky
    // blocked. Two screens awaited it with a spinner up and nothing else,
    // so a stuck fix was a stuck screen. Giving up after eight seconds and
    // saying so is the honest answer.
    const pos = await withTimeout(
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
      8000,
    );
    if (!pos) return null;
    const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    // Never let a failing reverse geocode lose a good fix: the
    // coordinates are the useful part, the name is decoration.
    const named = (await withTimeout(describe(coords), 4000)) ?? {};
    return { ...coords, ...named };
  } catch {
    return null;
  }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), ms);
    p.then((v) => { clearTimeout(t); resolve(v); },
           () => { clearTimeout(t); resolve(null); });
  });
}

/** Turn "central Gothenburg" into coordinates. */
export async function findPlace(text: string): Promise<Place | null> {
  const q = text.trim();
  if (q.length < 2) return null;
  try {
    const hits = await Location.geocodeAsync(q);
    if (!hits?.length) return null;
    const coords = { lat: hits[0].latitude, lng: hits[0].longitude };
    const named = await describe(coords);
    return { ...coords, label: q, ...named };
  } catch {
    return null;
  }
}

/** Turn coordinates into a city and country, for labelling. */
export async function describe(c: Coords): Promise<{ city?: string; country?: string }> {
  try {
    const [hit] = await Location.reverseGeocodeAsync({ latitude: c.lat, longitude: c.lng });
    if (!hit) return {};
    return {
      city: hit.city ?? hit.subregion ?? hit.region ?? undefined,
      country: hit.country ?? undefined,
    };
  } catch {
    return {};
  }
}
