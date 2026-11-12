#!/usr/bin/env node
// Submit ZAND X 1.2.0 + the Business Listing Monthly subscription for review
// through the App Store Connect API, bypassing the web UI.
//
// Usage:
//   export ASC_KEY_ID=XXXXXXXXXX
//   export ASC_ISSUER_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//   export ASC_KEY_PATH=~/Downloads/AuthKey_XXXXXXXXXX.p8
//   node scripts/asc-submit.mjs            # inspect only, changes nothing
//   node scripts/asc-submit.mjs --submit   # actually create and submit

import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const APP_ID = '6807573204';
const VERSION = '1.2.0';
const PRODUCT_ID = 'com.zandapplication.zand.directory.monthly';
const GO = process.argv.includes('--submit');

const need = (n) => {
  const v = process.env[n];
  if (!v) { console.error(`Missing env var ${n}`); process.exit(1); }
  return v;
};
const KEY_ID = need('ASC_KEY_ID');
const ISSUER_ID = need('ASC_ISSUER_ID');
const KEY_PATH = need('ASC_KEY_PATH').replace(/^~/, homedir());

function token() {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'ES256', kid: KEY_ID, typ: 'JWT' });
  const body = b64({ iss: ISSUER_ID, iat: now, exp: now + 600, aud: 'appstoreconnect-v1' });
  const s = createSign('SHA256');
  s.update(`${head}.${body}`);
  s.end();
  const sig = s.sign({ key: readFileSync(KEY_PATH, 'utf8'), dsaEncoding: 'ieee-p1363' }).toString('base64url');
  return `${head}.${body}.${sig}`;
}

const JWT = token();
const BASE = 'https://api.appstoreconnect.apple.com';

async function api(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { Authorization: `Bearer ${JWT}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* not json */ }
  if (!res.ok) {
    const errs = json?.errors ?? [];
    console.error(`\n  ${method} ${path} -> HTTP ${res.status}`);
    if (errs.length) {
      for (const e of errs) {
        console.error(`    ${e.code}`);
        console.error(`    ${e.title}`);
        if (e.detail) console.error(`    ${e.detail}`);
        if (e.source) console.error(`    source: ${JSON.stringify(e.source)}`);
        if (e.meta) console.error(`    meta: ${JSON.stringify(e.meta, null, 2)}`);
      }
    } else {
      console.error(`    ${text.slice(0, 1200)}`);
    }
    const err = new Error(`HTTP ${res.status}`);
    err.errors = errs;
    throw err;
  }
  return json;
}

const line = (s) => console.log(s);

line('Looking up version ' + VERSION);
const vres = await api('GET', `/v1/apps/${APP_ID}/appStoreVersions?filter[versionString]=${VERSION}&limit=1`);
const version = vres.data[0];
if (!version) { console.error('Version ' + VERSION + ' not found'); process.exit(1); }
line(`  id ${version.id}  state ${version.attributes.appStoreState ?? version.attributes.appVersionState}`);

line('Looking up subscription ' + PRODUCT_ID);
const groups = await api('GET', `/v1/apps/${APP_ID}/subscriptionGroups?limit=50`);
let sub = null;
for (const g of groups.data) {
  const list = await api('GET', `/v1/subscriptionGroups/${g.id}/subscriptions?limit=50`);
  const hit = list.data.find((s) => s.attributes.productId === PRODUCT_ID);
  if (hit) { sub = hit; break; }
}
if (!sub) { console.error('Subscription not found'); process.exit(1); }
line(`  id ${sub.id}  state ${sub.attributes.state}`);

line('Checking for an existing review submission');
const rsList = await api('GET', `/v1/reviewSubmissions?filter[app]=${APP_ID}&filter[platform]=IOS&limit=50`);
const open = rsList.data.filter((r) => !['COMPLETE', 'CANCELING'].includes(r.attributes.state));
for (const r of open) {
  line(`  found ${r.id}  state ${r.attributes.state}  submitted ${r.attributes.submitted}`);
  const items = await api('GET', `/v1/reviewSubmissions/${r.id}/items?limit=50`);
  for (const it of items.data) {
    const rel = Object.entries(it.relationships ?? {})
      .filter(([, v]) => v?.data)
      .map(([k, v]) => `${k}:${v.data.id}`)
      .join(' ');
    line(`    item ${it.id}  state ${it.attributes.state}  ${rel}`);
  }
}

if (!GO) {
  line('\nInspect only. Nothing changed. Re-run with --submit to act.');
  process.exit(0);
}

for (const r of open) {
  line(`Cancelling ${r.id} (state ${r.attributes.state})`);
  try {
    await api('PATCH', `/v1/reviewSubmissions/${r.id}`, {
      data: { type: 'reviewSubmissions', id: r.id, attributes: { canceled: true } },
    });
    line('  cancelled');
  } catch {
    line('  cancel refused, removing items instead');
    const items = await api('GET', `/v1/reviewSubmissions/${r.id}/items?limit=50`);
    for (const it of items.data) {
      if (it.attributes.state === 'REMOVED') continue;
      line(`  removing item ${it.id}`);
      await api('PATCH', `/v1/reviewSubmissionItems/${it.id}`, {
        data: { type: 'reviewSubmissionItems', id: it.id, attributes: { removed: true } },
      });
    }
  }
}

// Give Apple a moment to settle the cancellation before opening a new one.
await new Promise((r) => setTimeout(r, 5000));

line('Creating a review submission');
const made = await api('POST', '/v1/reviewSubmissions', {
  data: {
    type: 'reviewSubmissions',
    attributes: { platform: 'IOS' },
    relationships: { app: { data: { type: 'apps', id: APP_ID } } },
  },
});
const rsId = made.data.id;
line(`  ${rsId}`);

line('Adding the app version');
await api('POST', '/v1/reviewSubmissionItems', {
  data: {
    type: 'reviewSubmissionItems',
    relationships: {
      reviewSubmission: { data: { type: 'reviewSubmissions', id: rsId } },
      appStoreVersion: { data: { type: 'appStoreVersions', id: version.id } },
    },
  },
});

line('Adding the subscription');
await api('POST', '/v1/reviewSubmissionItems', {
  data: {
    type: 'reviewSubmissionItems',
    relationships: {
      reviewSubmission: { data: { type: 'reviewSubmissions', id: rsId } },
      subscription: { data: { type: 'subscriptions', id: sub.id } },
    },
  },
});

line('Submitting');
const done = await api('PATCH', `/v1/reviewSubmissions/${rsId}`, {
  data: { type: 'reviewSubmissions', id: rsId, attributes: { submitted: true } },
});
line(`\nDone. State is now ${done.data.attributes.state}.`);
