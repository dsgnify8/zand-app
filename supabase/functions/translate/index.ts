// Translate + transliterate via the Anthropic Messages API.
// The API key lives here as a Supabase secret and never ships in the app.

const MODEL = 'claude-haiku-4-5-20251001';

const LANG: Record<string, string> = {
  fa: 'Persian (Farsi)', en: 'English', ar: 'Arabic', fr: 'French', es: 'Spanish',
  de: 'German', tr: 'Turkish', sv: 'Swedish', ru: 'Russian', ur: 'Urdu',
  hi: 'Hindi', zh: 'Chinese (Simplified)',
};

// Scripts where a Latin transliteration is useful to a learner.
const NEEDS_TRANSLIT = new Set(['fa', 'ar', 'ur', 'ru', 'hi', 'zh']);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors() });
  }

  try {
    const { text, from, to } = await req.json();
    if (!text || !to) {
      return json({ error: 'Missing text or target language.' }, 400);
    }

    const key = Deno.env.get('ANTHROPIC_API_KEY');
    if (!key) return json({ error: 'Server is not configured.' }, 500);

    const srcName = LANG[from] ?? from;
    const tgtName = LANG[to] ?? to;
    const wantTranslit = NEEDS_TRANSLIT.has(to);

    const prompt =
      'Translate the following text from ' + srcName + ' into ' + tgtName + '.\n\n' +
      'Text:\n' + text + '\n\n' +
      'Rules:\n' +
      '- Translate naturally, the way a fluent native speaker would actually say it. Not word by word.\n' +
      '- Keep the register of the original: casual stays casual, formal stays formal.\n' +
      (wantTranslit
        ? '- Also give a Latin transliteration of the translation, with the short vowels written out as they are pronounced, not just the letters that appear in the script. For Persian use standard romanization (for example salaam is written salām, ketāb, man, chetori).\n'
        : '- No transliteration is needed; set translit to null.\n') +
      '\n' +
      'Reply with ONLY a JSON object, no markdown, no commentary:\n' +
      '{"translation": "...", "translit": ' + (wantTranslit ? '"..."' : 'null') + '}';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('anthropic error', res.status, detail);
      return json({ error: 'Translation service failed.' }, 502);
    }

    const data = await res.json();
    const raw = (data.content ?? [])
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('')
      .trim();

    const cleaned = raw.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();

    let out: { translation?: string; translit?: string | null } = {};
    try {
      out = JSON.parse(cleaned);
    } catch {
      // if the model returned bare text, treat it as the translation
      out = { translation: cleaned, translit: null };
    }

    if (!out.translation) return json({ error: 'Could not translate that.' }, 502);

    return json({ translation: out.translation, translit: out.translit ?? null });
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
    status,
    headers: { ...cors(), 'content-type': 'application/json' },
  });
}
