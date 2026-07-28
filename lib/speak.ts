// Persian audio. Generated once by the speak edge function, cached in
// Supabase Storage, then played from that URL forever after.
// Nothing is required of the user: no voices to install, no settings.
import { Audio } from 'expo-av';
import { supabase } from '@/lib/supabase';

let current: Audio.Sound | null = null;
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
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      configured = true;
    }
    if (current) { try { await current.unloadAsync(); } catch {} current = null; }

    const uri = await urlFor(text, slow);
    if (!uri) return;

    const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
    current = sound;
    sound.setOnPlaybackStatusUpdate((st) => {
      if (st.isLoaded && st.didJustFinish) {
        sound.unloadAsync().catch(() => {});
        if (current === sound) current = null;
      }
    });
  } catch {}
}

// Warm the cache for a lesson's phrases so the first tap is not a wait.
export function prewarm(texts: string[]) {
  texts.slice(0, 12).forEach((t) => { urlFor(t, false).catch(() => {}); });
}
