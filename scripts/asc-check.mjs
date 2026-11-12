#!/usr/bin/env node
// Read-only. Lists every app version and why 1.2.0 may not be reviewable.
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const APP_ID = '6807573204';
const need = (n) => { const v = process.env[n]; if (!v) { console.error(`Missing ${n}`); process.exit(1); } return v; };
const KEY_ID = need('ASC_KEY_ID'), ISSUER_ID = need('ASC_ISSUER_ID');
const KEY_PATH = need('ASC_KEY_PATH').replace(/^~/, homedir());

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const head = b64({ alg: 'ES256', kid: KEY_ID, typ: 'JWT' });
const body = b64({ iss: ISSUER_ID, iat: now, exp: now + 600, aud: 'appstoreconnect-v1' });
const sgn = createSign('SHA256'); sgn.update(`${head}.${body}`); sgn.end();
const JWT = `${head}.${body}.${sgn.sign({ key: readFileSync(KEY_PATH, 'utf8'), dsaEncoding: 'ieee-p1363' }).toString('base64url')}`;

async function api(path) {
  const res = await fetch('https://api.appstoreconnect.apple.com' + path, {
    headers: { Authorization: `Bearer ${JWT}` },
  });
  const t = await res.text();
  let j = null; try { j = t ? JSON.parse(t) : null; } catch {}
  if (!res.ok) { console.error(`  ${path} -> ${res.status}`); console.error('  ' + JSON.stringify(j?.errors ?? t, null, 2)); return null; }
  return j;
}

console.log('All app store versions:');
const all = await api(`/v1/apps/${APP_ID}/appStoreVersions?limit=200`);
for (const v of all?.data ?? []) {
  const a = v.attributes;
  console.log(`  ${a.versionString.padEnd(8)} ${String(a.platform).padEnd(8)} ${a.appStoreState ?? a.appVersionState}  id ${v.id}`);
}

const target = (all?.data ?? []).find((v) => v.attributes.versionString === '1.2.0' && v.attributes.platform === 'IOS');
if (!target) { console.log('\nNo iOS 1.2.0 found'); process.exit(0); }

console.log(`\n1.2.0 (${target.id}) checks:`);
for (const rel of ['build', 'appStoreReviewDetail', 'appStoreVersionLocalizations', 'appStoreVersionPhasedRelease', 'ageRatingDeclaration']) {
  const r = await api(`/v1/appStoreVersions/${target.id}/${rel}`);
  if (!r) continue;
  const d = r.data;
  if (Array.isArray(d)) console.log(`  ${rel}: ${d.length} item(s)`);
  else if (d) console.log(`  ${rel}: present (${d.id})`);
  else console.log(`  ${rel}: MISSING`);
}

console.log('\nIn-app purchases / subscriptions attached to 1.2.0:');
for (const rel of ['appStoreVersionExperiments', 'customerReviews']) { /* skip */ }
const rd = await api(`/v1/appStoreVersions/${target.id}/appStoreReviewDetail`);
if (rd?.data) {
  const a = rd.data.attributes;
  console.log(`  contactFirstName: ${a.contactFirstName || 'MISSING'}`);
  console.log(`  contactLastName:  ${a.contactLastName || 'MISSING'}`);
  console.log(`  contactPhone:     ${a.contactPhone || 'MISSING'}`);
  console.log(`  contactEmail:     ${a.contactEmail || 'MISSING'}`);
  console.log(`  demoAccountRequired: ${a.demoAccountRequired}`);
  console.log(`  demoAccountName:  ${a.demoAccountName || 'MISSING'}`);
  console.log(`  demoAccountPassword: ${a.demoAccountPassword ? 'set' : 'MISSING'}`);
  console.log(`  notes:            ${a.notes ? 'set' : 'MISSING'}`);
}
