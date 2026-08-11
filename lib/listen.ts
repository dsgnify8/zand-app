// Recording speech and turning it into text.
//
// Azure's REST endpoint wants 16 kHz mono PCM in a WAV container, which is
// not what iOS records by default, so the options below are explicit.

import { AudioModule, RecordingPresets, useAudioRecorder, setAudioModeAsync } from 'expo-audio';
// SDK 54 deprecated the old methods on the main entry point; the legacy
// module keeps them working and is the documented migration path.
import * as FileSystem from 'expo-file-system/legacy';
import { supabase } from '@/lib/supabase';
import { canUse, useOne } from '@/lib/usage';

export const WAV_16K = {
  extension: '.wav',
  sampleRate: 16000,
  numberOfChannels: 1,
  bitRate: 256000,
  android: {
    extension: '.wav',
    outputFormat: 'default',
    audioEncoder: 'default',
  },
  ios: {
    extension: '.wav',
    audioQuality: 96,
    outputFormat: 'lpcm',
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: { mimeType: 'audio/wav', bitsPerSecond: 128000 },
} as any;

export async function askMic() {
  const res = await AudioModule.requestRecordingPermissionsAsync();
  if (res.granted) {
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
  }
  return res.granted;
}

// Send a recorded file off to be transcribed.
// Returns the literal 'limit' when the allowance is spent. Callers
// already handle null for a failed transcription, so the sentinel is a
// distinct value rather than another null.
export async function transcribe(uri: string, lang = 'fa-IR'): Promise<string | null | 'limit'> {
  if (!canUse('listen')) return 'limit';
  await useOne('listen');
  try {
    // what did we actually record?
    try {
      const info = await FileSystem.getInfoAsync(uri);
      console.log('[listen] file', uri.split('/').pop(), 'exists:', info.exists, 'size:', (info as any).size);
    } catch {}
    const audio = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' as any });
    const { data, error } = await supabase.functions.invoke('listen', { body: { audio, lang } });
    if (error) { console.log('[listen] fn error', error.message); return null; }
    if (!data?.text) { console.log('[listen] response was:', JSON.stringify(data)); return null; }
    return data.text as string;
  } catch (e) {
    console.log('[listen] failed', e);
    return null;
  }
}

// Azure wants a full locale rather than a bare language code.
export const STT_LOCALE: Record<string, string> = {
  fa: 'fa-IR', en: 'en-US', ar: 'ar-SA', fr: 'fr-FR', es: 'es-ES',
  de: 'de-DE', tr: 'tr-TR', sv: 'sv-SE', ru: 'ru-RU', ur: 'ur-PK',
  hi: 'hi-IN', zh: 'zh-CN',
};

export { useAudioRecorder, RecordingPresets };
