// Persian text to speech, generated once and cached forever.
//
// Azure Speech has real Persian neural voices; Google Cloud has none.
// We hash the phrase, look for that file in Storage, and return its public
// URL if it exists. Otherwise we generate it, store it, and return the URL.
// Each phrase costs one API call in its entire lifetime.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const BUCKET = 'tts';
const VOICE_M = 'fa-IR-FaridNeural';
const VOICE_F = 'fa-IR-DilaraNeural';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors() });

  try {
    const { text, lang = 'fa', slow = false, voice = 'f' } = await req.json();
    if (!text) return json({ error: 'No text.' }, 400);

    const key = Deno.env.get('AZURE_SPEECH_KEY');
    const region = Deno.env.get('AZURE_SPEECH_REGION');
    const url = Deno.env.get('SUPABASE_URL');
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!key || !region || !url || !service) return json({ error: 'Server not configured.' }, 500);

    const supabase = createClient(url, service);
    const voiceName = voice === 'm' ? VOICE_M : VOICE_F;

    // a stable filename for this exact phrase, speed and voice
    const digest = await crypto.subtle.digest(
      'SHA-1',
      new TextEncoder().encode(lang + '|' + voiceName + '|' + (slow ? 'slow' : 'normal') + '|' + text),
    );
    const hash = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
    const path = lang + '/' + hash + '.mp3';
    const publicUrl = url + '/storage/v1/object/public/' + BUCKET + '/' + path;

    // already generated?
    const head = await fetch(publicUrl, { method: 'HEAD' });
    if (head.ok) return json({ url: publicUrl, cached: true });

    // Azure wants SSML. The slow rate is for learners hearing a phrase apart.
    const ssml =
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fa-IR">' +
      '<voice name="' + voiceName + '">' +
      '<prosody rate="' + (slow ? '-35%' : '-8%') + '">' +
      escapeXml(text) +
      '</prosody></voice></speak>';

    const res = await fetch('https://' + region + '.tts.speech.microsoft.com/cognitiveservices/v1', {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'zand-app',
      },
      body: ssml,
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('azure tts error', res.status, detail);
      return json({ error: 'Could not generate audio.', status: res.status }, 502);
    }

    const bytes = new Uint8Array(await res.arrayBuffer());

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: 'audio/mpeg', upsert: true });

    if (upErr) {
      console.error('upload failed', upErr);
      return json({ error: 'Generated but could not cache.' }, 502);
    }

    return json({ url: publicUrl, cached: false });
  } catch (e) {
    console.error(e);
    return json({ error: 'Something went wrong.' }, 500);
  }
});

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...cors(), 'content-type': 'application/json' },
  });
}
