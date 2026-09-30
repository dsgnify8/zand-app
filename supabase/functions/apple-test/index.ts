// Ask Apple to post a test notification at us, then ask how it went.
//
// App Store Connect only shows a test button to apps that once used the
// old notification format. Everyone else asks through the API, which is
// what this does. Two calls: one to request the test, one to read the
// delivery result a moment later.
//
// Locked to the service role, because it is a tool rather than a feature.
//
// Deploy with:  supabase functions deploy apple-test

import { isServiceCall } from '../_shared/caller.ts';
import { readJws } from '../_shared/apple.ts';

const PROD = 'https://api.storekit.itunes.apple.com';
const SANDBOX = 'https://api.storekit-sandbox.itunes.apple.com';

Deno.serve(async (req) => {
  // Its own password rather than the service key, because a project can
  // have several of those and picking the wrong one only wastes time.
  const secret = Deno.env.get('APPLE_TEST_TOKEN') ?? '';
  const given = req.headers.get('x-admin-token') ?? '';
  if (!isServiceCall(req) && !(secret && given === secret)) {
    return json({ error: 'not allowed' }, 401);
  }

  const url = new URL(req.url);
  const base = url.searchParams.get('env') === 'sandbox' ? SANDBOX : PROD;

  try {
    const token = await appleToken();

    const asked = await fetch(base + '/inApps/v1/notifications/test', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    });
    const askedBody = await asked.text();
    if (!asked.ok) {
      return json({ step: 'request', status: asked.status, body: askedBody }, 200);
    }

    const testToken = JSON.parse(askedBody).testNotificationToken as string;

    // Apple posts within a second or two. Give it a moment, then read
    // what it thinks happened at our end.
    await new Promise((r) => setTimeout(r, 4000));

    const check = await fetch(
      base + '/inApps/v1/notifications/test/' + encodeURIComponent(testToken),
      { headers: { Authorization: 'Bearer ' + token } },
    );
    const body = await check.json().catch(() => ({}));
    const history = (body.signedPayload ? readJws(body.signedPayload) : null);

    return json({
      step: 'result',
      status: check.status,
      sendAttempts: body.sendAttempts ?? null,
      firstAttempt: (body.sendAttempts ?? [])[0] ?? null,
      notificationType: (history as any)?.notificationType ?? null,
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

// Same token as the rest, kept here so this file can be deleted later
// without touching anything that matters.
async function appleToken(): Promise<string> {
  const b64url = (buf: ArrayBuffer | Uint8Array) => {
    const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    let s = '';
    for (const b of bytes) s += String.fromCharCode(b);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const pem = (Deno.env.get('APPLE_IAP_KEY') ?? '').replace(/\\n/g, '\n');
  const der = Uint8Array.from(
    atob(pem.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '')),
    (c) => c.charCodeAt(0),
  );
  const key = await crypto.subtle.importKey(
    'pkcs8', der, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign'],
  );
  const now = Math.floor(Date.now() / 1000);
  const enc = new TextEncoder();
  const signing =
    b64url(enc.encode(JSON.stringify({ alg: 'ES256', kid: Deno.env.get('APPLE_IAP_KEY_ID'), typ: 'JWT' }))) + '.' +
    b64url(enc.encode(JSON.stringify({
      iss: Deno.env.get('APPLE_ISSUER_ID'), iat: now, exp: now + 1800,
      aud: 'appstoreconnect-v1', bid: Deno.env.get('APPLE_BUNDLE_ID') ?? 'com.zandapplication.zand',
    })));
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, enc.encode(signing));
  return signing + '.' + b64url(sig);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status, headers: { 'Content-Type': 'application/json' },
  });
}
