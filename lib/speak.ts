// Persian audio. Generated once by the speak edge function, cached in
// Supabase Storage, then played from that URL forever after.
// Uses expo-audio; expo-av is deprecated and goes away in SDK 54.
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { supabase } from '@/lib/supabase';

let current: AudioPlayer | null = null;
let configured = false;

// url cache for this session, so repeat taps are instant
const urls = new Map<string, string>();

async function urlFor(text: string, slow: boolean) {
  const cacheKey = (slow ? 's|' : 'n|') + text;
  const hit = urls.get(cacheKey);
  if (hit) return hit;

  const { data, error } = await supabase.functions.invoke('speak', {
    body: { text, lang: 'fa', slow },
  });
  if (error || !data?.url) return null;
  urls.set(cacheKey, data.url);
  return data.url as string;
}

export async function speak(text: string, lang = 'fa', opts?: { slow?: boolean }) {
  const slow = opts?.slow ?? false;
  try {
    if (!configured) {
      await setAudioModeAsync({ playsInSilentMode: true });
      configured = true;
    }
    if (current) { try { current.remove(); } catch {} current = null; }

    const uri = await urlFor(text, slow);
    if (!uri) return;

    const player = createAudioPlayer({ uri });
    current = player;
    player.play();
  } catch {}
}

// Warm the cache for a lesson's phrases so the first tap is not a wait.
export function prewarm(texts: string[]) {
  texts.slice(0, 12).forEach((t) => { urlFor(t, false).catch(() => {}); });
}
