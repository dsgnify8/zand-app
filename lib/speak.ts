import { Audio } from 'expo-av';

let current: Audio.Sound | null = null;
let configured = false;

export async function speak(text: string, lang = 'fa') {
  try {
    if (!configured) {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      configured = true;
    }
    if (current) { try { await current.unloadAsync(); } catch {} current = null; }
    const url =
      'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=' +
      lang + '&q=' + encodeURIComponent(text);
    const { sound } = await Audio.Sound.createAsync(
      { uri: url, headers: { 'User-Agent': 'Mozilla/5.0' } },
      { shouldPlay: true }
    );
    current = sound;
    sound.setOnPlaybackStatusUpdate((st) => {
      if (st.isLoaded && st.didJustFinish) {
        sound.unloadAsync().catch(() => {});
        if (current === sound) current = null;
      }
    });
  } catch {}
}
