// Persian audio. Generated once by the speak edge function, cached in
// Supabase Storage, then played from that URL forever after.
// Uses expo-audio; expo-av is deprecated and goes away in SDK 54.
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { supabase } from '@/lib/supabase';
import { canUse, useOne } from '@/lib/usage';

let current: AudioPlayer | null = null;

// url cache for this session, so repeat taps are instant
const urls = new Map<string, string>();

async function urlFor(text: string, slow: boolean, lang: string) {
  // the language has to be part of the key, or the same words in two
  // languages collide and one gets served the other's audio
  const cacheKey = lang + '|' + (slow ? 's' : 'n') + '|' + text;
  const hit = urls.get(cacheKey);
  if (hit) return hit;

  const { data, error } = await supabase.functions.invoke('speak', {
    body: { text, lang, slow },
  });
  if (error || !data?.url) {
    console.log('[speak] edge function said', error?.message ?? 'no url', JSON.stringify(data ?? {}).slice(0, 200));
    return null;
  }
  urls.set(cacheKey, data.url);
  return data.url as string;
}

// Returns 'limit' when the free allowance is spent, so the caller can
// show the paywall. Returns undefined otherwise, as before.
export async function speak(text: string, lang = 'fa', opts?: { slow?: boolean }): Promise<'limit' | void> {
  const slow = opts?.slow ?? false;

  // A cached url costs nothing to play, so replaying something already
  // fetched this session does not count against the allowance.
  const cached = urls.has(lang + '|' + (slow ? 's' : 'n') + '|' + text);
  if (!cached) {
    if (!canUse('speak')) { console.log('[speak] allowance spent'); return 'limit'; }
    await useOne('speak');
  }

  try {
    // Always reset the mode before playing. If a recording session ran
    // earlier, iOS is still routed to the earpiece and playback is quiet;
    // clearing allowsRecording puts it back on the speaker.
    await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false });
    if (current) { try { current.remove(); } catch {} current = null; }

    const uri = await urlFor(text, slow, lang);
    if (!uri) return;

    const player = createAudioPlayer({ uri });
    current = player;
    player.play();
  } catch {}
}

// Warm the cache for a lesson's phrases so the first tap is not a wait.
export function prewarm(texts: string[]) {
  texts.slice(0, 12).forEach((t) => { urlFor(t, false, 'fa').catch(() => {}); });
}
