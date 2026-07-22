import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { YOUTUBE_API_KEY } from '@/constants/config';

const CACHE_PREFIX = 'zand:yt:v2:';

export type Meta = { title: string; author: string; viewCount?: number; publishedAt?: string };
const memory = new Map<string, Meta>();

export function thumbUrl(id: string, quality = 'maxresdefault') {
  return 'https://i.ytimg.com/vi/' + id + '/' + quality + '.jpg';
}
export function watchUrl(id: string) {
  return 'https://www.youtube.com/watch?v=' + id;
}

async function readCache(id: string): Promise<Meta | null> {
  if (memory.has(id)) return memory.get(id)!;
  try {
    const c = await AsyncStorage.getItem(CACHE_PREFIX + id);
    if (c) { const m = JSON.parse(c) as Meta; memory.set(id, m); return m; }
  } catch {}
  return null;
}
function writeCache(id: string, m: Meta) {
  memory.set(id, m);
  AsyncStorage.setItem(CACHE_PREFIX + id, JSON.stringify(m)).catch(() => {});
}

async function fetchOEmbed(id: string): Promise<Meta | null> {
  try {
    const res = await fetch('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json');
    if (!res.ok) return null;
    const d = await res.json();
    return { title: d.title ?? '', author: d.author_name ?? '' };
  } catch { return null; }
}

async function fetchDataApi(ids: string[]): Promise<Map<string, Meta>> {
  const out = new Map<string, Meta>();
  if (!YOUTUBE_API_KEY || ids.length === 0) return out;
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    try {
      const res = await fetch(
        'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=' + chunk.join(',') + '&key=' + YOUTUBE_API_KEY
      );
      if (!res.ok) continue;
      const d = await res.json();
      for (const it of d.items ?? []) {
        out.set(it.id, {
          title: it.snippet?.title ?? '',
          author: it.snippet?.channelTitle ?? '',
          viewCount: it.statistics?.viewCount != null ? Number(it.statistics.viewCount) : undefined,
          publishedAt: it.snippet?.publishedAt,
        });
      }
    } catch {}
  }
  return out;
}

export async function prefetchMeta(ids: string[]) {
  const missing: string[] = [];
  for (const id of ids) if (!(await readCache(id))) missing.push(id);
  if (missing.length === 0) return;
  if (YOUTUBE_API_KEY) {
    const map = await fetchDataApi(missing);
    for (const [id, m] of map) writeCache(id, m);
  }
  for (const id of missing) {
    if (!memory.has(id)) { const m = await fetchOEmbed(id); if (m) writeCache(id, m); }
  }
}

export function useYouTubeMeta(id: string) {
  const [meta, setMeta] = useState<Meta | null>(() => memory.get(id) ?? null);
  const [loading, setLoading] = useState(!memory.has(id));
  useEffect(() => {
    let alive = true;
    (async () => {
      const cached = await readCache(id);
      if (cached) { if (alive) { setMeta(cached); setLoading(false); } return; }
      setLoading(true);
      let m: Meta | null = null;
      if (YOUTUBE_API_KEY) { const map = await fetchDataApi([id]); m = map.get(id) ?? null; }
      if (!m) m = await fetchOEmbed(id);
      if (m) writeCache(id, m);
      if (alive) { setMeta(m); setLoading(false); }
    })();
    return () => { alive = false; };
  }, [id]);
  return { meta, loading };
}

export function formatViews(n?: number): string | null {
  if (n == null) return null;
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

export function timeAgo(iso?: string): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (isNaN(then)) return null;
  const s = Math.floor((Date.now() - then) / 1000);
  const units: [number, string][] = [[31536000, 'year'], [2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
  for (const [sec, label] of units) { const v = Math.floor(s / sec); if (v >= 1) return v + ' ' + label + (v > 1 ? 's' : '') + ' ago'; }
  return 'just now';
}
