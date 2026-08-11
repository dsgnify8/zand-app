// Applies admin edits over the shipped content.
//
// How it fits together:
//
//   1. On launch we fetch every override row. The table is small — only
//      blocks someone has actually edited — so one query is fine and it
//      means no per-screen loading states.
//   2. Blocks are matched by a hash of their original English. Reading a
//      block goes through `txt()` below rather than touching `.x` and
//      `.fa` directly, so the override is applied at the point of use.
//   3. If nothing is fetched — offline, first launch, a failed request —
//      every call falls through to the shipped text. The app never waits
//      on this and never breaks without it.

import { supabase } from '@/lib/supabase';

export type Override = { x?: string | null; fa?: string | null };

let overrides = new Map<string, Override>();
let loaded = false;

/* ---------------- hashing ---------------- */

// A small, stable, dependency-free hash. This is not security, it is an
// identity for a paragraph, so speed and determinism matter and
// collision resistance barely does. FNV-1a, 32-bit, hex.
export function contentHash(s: string): string {
  let h = 0x811c9dc5;
  const str = (s ?? '').trim().replace(/\s+/g, ' ');
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/* ---------------- load ---------------- */

export async function loadOverrides() {
  try {
    const { data, error } = await supabase
      .from('content_overrides')
      .select('hash, x, fa');
    if (error || !data) return;
    const next = new Map<string, Override>();
    data.forEach((r: any) => next.set(r.hash, { x: r.x, fa: r.fa }));
    overrides = next;
    loaded = true;
  } catch {
    // shipped content stands
  }
}

export function overridesReady() { return loaded; }

/* ---------------- read ---------------- */

// The single accessor every reader should use. Give it a block and the
// current language; it returns the text to display, override first,
// shipped text second.
export function txt(block: any, fa: boolean, field: 'x' | 'title' | 'cap' = 'x'): string {
  if (!block) return '';

  const shippedEn = block[field] ?? '';
  const shippedFa = field === 'x'
    ? (block.fa ?? '')
    : (block[field + 'Fa'] ?? '');

  const o = overrides.get(contentHash(shippedEn));

  if (fa) {
    // an edited Persian wins; then shipped Persian; then English, because
    // an untranslated block should still say something
    return (o?.fa || shippedFa || shippedEn) as string;
  }
  return (o?.x || shippedEn) as string;
}

/* ---------------- write, admin only ---------------- */

export async function saveOverride(args: {
  section: 'education' | 'literature';
  topic?: string;
  originalEn: string;
  x?: string;
  fa?: string;
  userId?: string;
}) {
  const hash = contentHash(args.originalEn);
  const row = {
    hash,
    section: args.section,
    topic: args.topic ?? null,
    original_en: args.originalEn,
    x: args.x?.trim() || null,
    fa: args.fa?.trim() || null,
    updated_by: args.userId ?? null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase
    .from('content_overrides')
    .upsert(row, { onConflict: 'hash' });
  if (!error) overrides.set(hash, { x: row.x, fa: row.fa });
  return { error: error?.message };
}

export async function clearOverride(originalEn: string) {
  const hash = contentHash(originalEn);
  const { error } = await supabase.from('content_overrides').delete().eq('hash', hash);
  if (!error) overrides.delete(hash);
  return { error: error?.message };
}

// What the admin list needs: every edit, newest first.
export async function listOverrides() {
  const { data } = await supabase
    .from('content_overrides')
    .select('hash, section, topic, original_en, x, fa, updated_at')
    .order('updated_at', { ascending: false });
  return data ?? [];
}
