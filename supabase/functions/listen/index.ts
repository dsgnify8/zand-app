// Speech to text via Azure. Same key and region as the speak function.
//
// The client records a short clip, sends it as base64, and gets back the
// words. Azure's short-audio endpoint takes up to about sixty seconds,
// which is far more than a spoken sentence needs.

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors() });

  try {
    const { audio, lang = 'fa-IR' } = await req.json();
    if (!audio) return json({ error: 'No audio.' }, 400);

    const key = Deno.env.get('AZURE_SPEECH_KEY');
    const region = Deno.env.get('AZURE_SPEECH_REGION');
    if (!key || !region) return json({ error: 'Server not configured.' }, 500);

    // base64 back to bytes
    const bin = atob(audio);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);

    const url =
      'https://' + region + '.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1' +
      '?language=' + encodeURIComponent(lang) + '&format=simple';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Accept': 'application/json',
      },
      body: bytes,
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('azure stt error', res.status, detail);
      return json({ error: 'Could not hear that.', status: res.status }, 502);
    }

    const data = await res.json();
    if (data.RecognitionStatus !== 'Success' || !data.DisplayText) {
      return json({ error: 'nothing heard', status: data.RecognitionStatus }, 200);
    }

    return json({ text: data.DisplayText });
  } catch (e) {
    console.error(e);
    return json({ error: 'Something went wrong.' }, 500);
  }
});

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
