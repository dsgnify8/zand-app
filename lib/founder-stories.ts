// Founder stories.
//
// A story is a list of blocks rather than a wall of text, so the layout can
// decide where a quote breaks the column and where a photograph runs wide.
//
// The variation is seeded from the business id. Every story on the same
// listing always looks the same, and two listings next to each other never
// look alike — without anyone choosing a layout, which is the point. A
// template that had to be picked per story would end up picked once and
// used forever.

import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { supabase } from '@/lib/supabase';

const BUCKET = 'founder-stories';

export type StoryBlock =
  | { t: 'p'; x: string }
  | { t: 'quote'; x: string }
  | { t: 'rule' }
  | { t: 'photo'; i: number };   // index into photos

export type FounderStory = {
  id?: string;
  business_id: string;
  name: string;
  name_fa?: string | null;
  since?: string | null;
  since_fa?: string | null;
  body: StoryBlock[];
  body_fa: StoryBlock[];
  photos: string[];
  approved: boolean;
};

export function storyPhotoUrl(path: string | null | undefined) {
  if (!path) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl ?? null;
}

/* ---------------- reading ---------------- */

export async function loadStory(businessId: string): Promise<FounderStory | null> {
  try {
    const { data } = await supabase
      .from('founder_stories')
      .select('*')
      .eq('business_id', businessId)
      .maybeSingle();
    return (data as FounderStory) ?? null;
  } catch {
    return null;
  }
}

export function useStory(businessId: string | undefined) {
  const [story, setStory] = useState<FounderStory | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!businessId) { setStory(null); setLoading(false); return; }
      const s = await loadStory(businessId);
      if (alive) { setStory(s); setLoading(false); }
    })();
    return () => { alive = false; };
  }, [businessId]);
  return { story, loading };
}

/* ---------------- how it looks ---------------- */

export type StoryLayout = {
  /** Where the name sits relative to the story. */
  head: 'left' | 'centre';
  /** How a pull-quote is set. */
  quote: 'indent' | 'centre' | 'rule';
  /** Whether the first photograph runs to the edges. */
  bleed: boolean;
  /** Which corner the wash comes from. */
  wash: 0 | 1 | 2 | 3;
  /** A capital on the first paragraph. */
  drop: boolean;
};

/**
 * A stable layout for a given story.
 *
 * Seeded rather than random: a story that reshuffled itself between one
 * visit and the next would feel broken rather than varied.
 */
export function layoutFor(businessId: string): StoryLayout {
  let n = 0;
  for (let i = 0; i < businessId.length; i++) {
    n = (n * 31 + businessId.charCodeAt(i)) % 100003;
  }
  const pick = <T,>(arr: T[], salt: number) => arr[(n >> salt) % arr.length];

  return {
    head: pick(['left', 'centre'] as const, 0),
    quote: pick(['indent', 'centre', 'rule'] as const, 2),
    bleed: ((n >> 5) & 1) === 1,
    wash: ((n >> 7) % 4) as 0 | 1 | 2 | 3,
    // Rare on purpose: a drop capital on every other story stops being a
    // flourish and becomes a template.
    drop: ((n >> 9) % 5) === 0,
  };
}

/* ---------------- admin ---------------- */

export async function pickStoryPhotos(remaining: number) {
  if (remaining <= 0) return [];
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return [];
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: true,
    selectionLimit: remaining,
    quality: 0.75,
    exif: false,
  });
  if (res.canceled) return [];
  return res.assets ?? [];
}

export async function uploadStoryPhoto(businessId: string, uri: string) {
  try {
    const ext = (uri.split('.').pop() ?? 'jpg').split('?')[0].toLowerCase();
    const name = `${businessId}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const res = await fetch(uri);
    const bytes = await res.arrayBuffer();
    const { error } = await supabase.storage.from(BUCKET).upload(name, bytes, {
      contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
      upsert: false,
    });
    return error ? null : name;
  } catch {
    return null;
  }
}

export async function saveStory(story: FounderStory) {
  const row = { ...story, updated_at: new Date().toISOString() };
  const { data, error } = story.id
    ? await supabase.from('founder_stories').update(row).eq('id', story.id).select().maybeSingle()
    : await supabase.from('founder_stories').insert(row).select().maybeSingle();
  return { data: data as FounderStory | null, error: error?.message };
}

/** Listings whose owner said they had something worth telling. */
export async function pitchedStories() {
  const { data } = await supabase
    .from('businesses')
    .select('id, name, city, story_pitch, has_story')
    .eq('has_story', true)
    .order('created_at', { ascending: false });
  return data ?? [];
}

/**
 * Turn typed text into blocks.
 *
 * A line wrapped in quotation marks becomes a pull-quote, three dashes
 * become a rule, everything else is a paragraph. Writing prose in an admin
 * form should not mean thinking about JSON.
 */
export function parseBody(text: string): StoryBlock[] {
  return text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): StoryBlock => {
      if (chunk === '---') return { t: 'rule' };
      const quoted = /^["“](.+)["”]$/s.exec(chunk);
      if (quoted) return { t: 'quote', x: quoted[1].trim() };
      return { t: 'p', x: chunk };
    });
}

/** And back, so an admin can edit what they wrote. */
export function unparseBody(blocks: StoryBlock[]): string {
  return blocks
    .map((b) =>
      b.t === 'rule' ? '---'
        : b.t === 'quote' ? `"${b.x}"`
        : b.t === 'photo' ? ''
        : b.x)
    .filter(Boolean)
    .join('\n\n');
}


/**
 * The shape FounderFlip renders.
 *
 * The card holds both languages on each block; the table keeps two arrays,
 * because an admin writes the English through and then the Persian through
 * rather than alternating. Zipped by position, falling back to English
 * where the Persian is short — a half-translated story should show the
 * half that exists.
 */
export function toCardStory(story: FounderStory) {
  const blocks = (story.body ?? []).map((b, i) => {
    const fa = (story.body_fa ?? [])[i];
    if (b.t === 'rule' || b.t === 'photo') return { t: 'rule' as const };
    return {
      t: b.t,
      x: (b as any).x,
      fa: fa && fa.t === b.t ? (fa as any).x : undefined,
    };
  });

  return {
    founder: story.name,
    founderFa: story.name_fa ?? undefined,
    since: story.since ?? undefined,
    blocks,
  };
}
