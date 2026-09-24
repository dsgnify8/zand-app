// A listing photograph.
//
// Two reasons this exists rather than <Image source={bizImage(p)} />:
//
//  - expo-image keeps a disk cache, so a photo seen once on the feed is
//    already there when the listing opens. React Native's Image only
//    caches in memory, which is why scrolling back re-downloaded.
//  - a phone drawing a 380pt card does not need a 4000px photograph.
//    Supabase can resize on the way out, which is most of the wait.
//
// Resizing is a paid feature, so it is probed once per launch rather
// than assumed: until the answer is in, originals are used, and if the
// answer is no they keep being used. Asking for a size that the project
// cannot serve would add a failed request in front of every photo.

import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { StyleProp, ImageStyle } from 'react-native';

import { bizImage } from '@/lib/business-photos';

const PUBLIC = '/storage/v1/object/public/';
const RENDER = '/storage/v1/render/image/public/';

/**
 * The same photo, asked for at the size and shape it will be drawn.
 *
 * Both sides, always. Given a width alone the server does not scale the
 * picture to match: it keeps the original height and crops the width, so
 * a 1206 by 1059 photograph came back 760 by 1059 and every card looked
 * zoomed in. With both, and cover, the crop is the one the card would
 * have made anyway.
 */
export function sizedUrl(url: string, width: number, height: number): string {
  if (!url.includes(PUBLIC)) return url;
  return url.replace(PUBLIC, RENDER)
    + `?width=${Math.round(width)}&height=${Math.round(height)}&resize=cover&quality=70`;
}

// null while unknown, then true or false for the rest of the launch.
let resizes: boolean | null = null;
let probing: Promise<boolean> | null = null;
const listeners = new Set<(ok: boolean) => void>();

function probe(url: string) {
  if (resizes !== null || probing) return;
  probing = fetch(sizedUrl(url, 32, 32))
    .then((r) => r.ok)
    .catch(() => false)
    .then((ok) => {
      resizes = ok;
      listeners.forEach((f) => f(ok));
      return ok;
    });
}

export function BizPhoto({
  path, style, width, height, priority,
}: {
  path: string;
  style?: StyleProp<ImageStyle>;
  /** Drawn size in points. Doubled for the request, for retina screens.
   *  Both are needed, or the picture comes back the wrong shape. */
  width?: number;
  height?: number;
  priority?: 'low' | 'normal' | 'high';
}) {
  const src: any = bizImage(path);
  const uri: string | undefined = src?.uri;
  const [ok, setOk] = useState(resizes);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!uri) return;
    if (resizes === null) {
      probe(uri);
      const f = (v: boolean) => setOk(v);
      listeners.add(f);
      return () => { listeners.delete(f); };
    }
    if (ok !== resizes) setOk(resizes);
  }, [uri]);

  const source =
    uri && width && height && ok && !failed
      ? { uri: sizedUrl(uri, width * 2, height * 2) }
      : src;

  return (
    <Image
      source={source}
      style={style as any}
      contentFit="cover"
      transition={160}
      cachePolicy="memory-disk"
      priority={priority ?? 'normal'}
      recyclingKey={path}
      onError={() => setFailed(true)}
    />
  );
}

/** Warm the cache for photos about to appear, at the size they will be. */
export function prefetchBiz(paths: string[], width?: number, height?: number) {
  const urls = paths
    .map((p) => (bizImage(p) as any)?.uri)
    .filter((u): u is string => !!u)
    .map((u) => (width && height && resizes ? sizedUrl(u, width * 2, height * 2) : u));
  if (urls.length) Image.prefetch(urls, { cachePolicy: 'memory-disk' });
}
