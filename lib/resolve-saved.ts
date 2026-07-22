// Turns any liked/saved/recent key into a displayable, routable item.
// Keys are prefixed by type: topic-, poet-, culture-, art-, or a bare article key.
import { TOPICS, findTopic } from '@/constants/education';
import { AUTHORS, findAuthor } from '@/constants/literature';
import { CULTURE_TOPICS } from '@/constants/culture';
import { articleByKey } from '@/constants/articles';
import { isHidden } from '@/lib/admin';

export type Resolved = {
  key: string;          // the original store key
  kind: 'article' | 'topic' | 'poet' | 'culture';
  title: string;
  sub: string;
  image?: string;       // eduImage key for a cover
  route: string;
  accent?: string;
  glyph?: string;
  persian?: string;
};

export function resolveSavedKey(key: string): Resolved | null {
  if (key.startsWith('topic-')) {
    const raw = key.slice(6);
    let t = findTopic(raw);
    if (!t) t = TOPICS.find((x: any) => x.key.startsWith(raw) || raw.startsWith(x.key) || x.key.includes(raw));
    if (!t) return null;
    return { key, kind: 'topic', title: t.name, sub: 'History  ·  ' + (t.years ?? ''), image: t.cover, route: '/education/topic?topic=' + t.key };
  }
  if (key.startsWith('poet-')) {
    const a = findAuthor(key.slice(5));
    if (!a) return null;
    return { key, kind: 'poet', title: a.name, sub: 'Literature  ·  ' + (a.years ?? ''), image: (a as any).cover, route: '/literature/reader?author=' + a.key + '&page=0' };
  }
  if (key.startsWith('culture-')) {
    const c = CULTURE_TOPICS.find((x: any) => x.key === key.slice(8));
    if (!c) return null;
    return { key, kind: 'culture', title: (c as any).title, sub: 'Culture', image: 'culture-' + (c as any).key, route: '/culture/topic?topic=' + (c as any).key, accent: (c as any).accent, glyph: (c as any).glyph, persian: (c as any).persian };
  }
  // bare article key, or art- prefix
  const ak = key.startsWith('art-') ? key.slice(4) : key;
  const a = articleByKey(ak);
  if (a && !isHidden(a.key)) return { key, kind: 'article', title: a.title, sub: a.tag + '  ·  ' + a.readMins + ' min', image: a.cover, route: '/article?article=' + a.key };
  return null;
}

export function resolveMany(keys: string[]): Resolved[] {
  return keys.map(resolveSavedKey).filter(Boolean) as Resolved[];
}
