import json, re, pathlib, sys
root = pathlib.Path.home() / 'mnt' / 'zand'
def read(p): return (root / p).read_text()
def write(p, s): (root / p).write_text(s); print('wrote', p)

# ---------- 1. splash: plain cream, no icon, no dark variant ----------
cfg = json.loads(read('app.json'))
for pl in cfg['expo']['plugins']:
    if isinstance(pl, list) and pl[0] == 'expo-splash-screen':
        pl[1] = {'backgroundColor': '#FAF7F3'}
write('app.json', json.dumps(cfg, indent=2) + '\n')

# ---------- 2. one place for outward links ----------
write('lib/links.ts', '''// Links that leave the app.
//
// They lived inline in three files and pointed at zand.app, a domain
// nobody owns, so every shared invite landed on a 404. One constant
// here, and the site can take over later without touching the screens.

export const SITE = 'https://zandapplication.com';
export const APP_STORE = 'https://apps.apple.com/app/id6807573204';

/**
 * What a friend receives. The App Store page works whether or not they
 * have the app; once the site serves /add it can carry the inviter's id
 * and connect the two automatically.
 */
export function inviteMessage(): string {
  return `Join my Iranian world on ZAND. ${APP_STORE}`;
}
''')

# ---------- 3. invite sheet: live Add button, working link ----------
s = read('components/invite-sheet.tsx')
s = s.replace(
  "import { colors, fonts, spacing } from '@/constants/zand-theme';",
  "import { LinearGradient } from 'expo-linear-gradient';\n\nimport { colors, fonts, spacing } from '@/constants/zand-theme';")
s = s.replace(
  "import { APP } from '@/constants/i18n/app';",
  "import { APP } from '@/constants/i18n/app';\nimport { inviteMessage } from '@/lib/links';")
s = s.replace("""  const link = `https://zand.app/add?from=${user?.id ?? ''}`;

  const shareLink = async () => {
    try {
      await Share.share({ message: `Join my Iranian world on ZAND. ${link}` });
    } catch {}
  };
""", """  // Enabled the moment the address looks like one. The button sat faded
  // until the request was in flight, which read as broken rather than
  // waiting.
  const canSend = /^\\S+@\\S+\\.\\S+$/.test(email.trim());

  const shareLink = async () => {
    try {
      await Share.share({ message: inviteMessage() });
    } catch {}
  };
""")
s = s.replace("""            <Pressable style={[s.sendBtn, busy && { opacity: 0.6 }]} onPress={inviteEmail} disabled={busy}>
              <Text style={s.sendT}>{busy ? '…' : 'Add'}</Text>
            </Pressable>""",
"""            <Pressable
              style={[s.sendWrap, (!canSend || busy) && { opacity: 0.38 }]}
              onPress={inviteEmail}
              disabled={busy || !canSend}
            >
              <LinearGradient
                colors={['#A8493A', '#8C3A2E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={s.sendBtn}
              >
                {/* a thin band of light across the top third, which is all
                    the gloss this needs */}
                <LinearGradient
                  colors={['rgba(255,255,255,0.30)', 'rgba(255,255,255,0)']}
                  style={s.sendSheen}
                  pointerEvents="none"
                />
                <Text style={s.sendT}>{busy ? '…' : 'Add'}</Text>
              </LinearGradient>
            </Pressable>""")
s = s.replace("""  sendBtn: {
    backgroundColor: 'rgba(140,58,46,0.10)',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(140,58,46,0.22)',
    borderRadius: 12, paddingHorizontal: spacing.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  sendT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },""",
"""  // The gloss is a gradient, so the shadow belongs to the wrapper and the
  // rounding to both — a clipped child cannot cast one.
  sendWrap: {
    borderRadius: 12,
    shadowColor: '#3A1C16', shadowOpacity: 0.18, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  sendBtn: {
    borderRadius: 12, paddingHorizontal: spacing.xl,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    minHeight: 46,
  },
  sendSheen: { position: 'absolute', left: 0, right: 0, top: 0, height: 16 },
  sendT: { fontFamily: fonts.body, fontSize: 14, letterSpacing: 0.6, color: '#FFF' },""")
write('components/invite-sheet.tsx', s)

# profile-modals shares the same dead domain
s = read('components/profile-modals.tsx')
if 'zand.app/add' in s:
    s = s.replace("        message: 'Learn Persian with me on ZAND. Tap to add me: https://zand.app/add/nojan',",
                  "        message: inviteMessage(),")
    if "from '@/lib/links'" not in s:
        s = s.replace("import { colors, fonts, spacing }", "import { inviteMessage } from '@/lib/links';\nimport { colors, fonts, spacing }", 1)
    write('components/profile-modals.tsx', s)

# ---------- 4. listing photos: cached, and smaller where the server allows ----------
write('components/biz-photo.tsx', '''// A listing photograph.
//
// Two reasons this exists rather than <Image source={bizImage(p)} />:
//
//  - expo-image keeps a disk cache, so a photo seen once on the feed is
//    already there when the listing opens. React Native's Image only
//    caches in memory, which is why every scroll back re-downloaded.
//  - a phone showing a 380pt card does not need a 4000px photograph.
//    Supabase can resize on the way out; where that is not enabled the
//    request fails and we fall back to the original file.

import { useState } from 'react';
import { Image } from 'expo-image';
import { StyleProp, ImageStyle } from 'react-native';

import { bizImage } from '@/lib/business-photos';

const PUBLIC = '/storage/v1/object/public/';
const RENDER = '/storage/v1/render/image/public/';

/** The same photo, asked for at the size it will be drawn. */
export function sizedUrl(url: string, width: number): string {
  if (!url.includes(PUBLIC)) return url;
  return url.replace(PUBLIC, RENDER) + `?width=${Math.round(width)}&quality=70`;
}

export function BizPhoto({
  path, style, width, priority,
}: {
  path: string;
  style?: StyleProp<ImageStyle>;
  /** Drawn width in points. Doubled for the request, for retina screens. */
  width?: number;
  priority?: 'low' | 'normal' | 'high';
}) {
  const [full, setFull] = useState(false);
  const src: any = bizImage(path);
  const uri: string | undefined = src?.uri;

  const source =
    uri && width && !full ? { uri: sizedUrl(uri, width * 2) } : src;

  return (
    <Image
      source={source}
      style={style as any}
      contentFit="cover"
      transition={160}
      cachePolicy="memory-disk"
      priority={priority ?? 'normal'}
      recyclingKey={path}
      // Resizing is a paid feature on some projects. If it is off, the
      // resized request 400s and the original still has to arrive.
      onError={() => setFull(true)}
    />
  );
}

/** Warm the cache for photos about to appear. */
export function prefetchBiz(paths: string[], width?: number) {
  const urls = paths
    .map((p) => (bizImage(p) as any)?.uri)
    .filter((u): u is string => !!u)
    .map((u) => (width ? sizedUrl(u, width * 2) : u));
  if (urls.length) Image.prefetch(urls, { cachePolicy: 'memory-disk' });
}
''')

def swap(path, pairs, imp_after):
    s = read(path)
    for a, b in pairs:
        if a not in s:
            print('!! not found in', path, ':', a[:60]); sys.exit(1)
        s = s.replace(a, b)
    if "from '@/components/biz-photo'" not in s:
        s = s.replace(imp_after, imp_after + "\nimport { BizPhoto } from '@/components/biz-photo';", 1)
    write(path, s)

swap('components/business-card.tsx',
     [("<Image source={bizImage(p)} style={{ width: w, height: small ? 150 : 210 }} />",
       "<BizPhoto path={p} width={w} style={{ width: w, height: small ? 150 : 210 }} />")],
     "import { eduImage } from '@/constants/education-images';")

swap('app/(tabs)/local/business.tsx',
     [("<Image key={p} source={bizImage(p)} style={{ width: W, height: 420 }} />",
       "<BizPhoto key={p} path={p} width={W} style={{ width: W, height: 420 }} />")],
     "import { eduImage } from '@/constants/education-images';")

swap('app/local-map.tsx',
     [("<Image key={p} source={bizImage(p)} style={{ width: SHEET_W, height: 210 }} />",
       "<BizPhoto key={p} path={p} width={SHEET_W} style={{ width: SHEET_W, height: 210 }} />"),
      ("<Image source={bizImage(sel.photos[0])} style={s.peekShot} />",
       "<BizPhoto path={sel.photos[0]} width={120} style={s.peekShot} />"),
      ("<Image source={bizImage(b.photos[0])} style={s.railShot} />",
       "<BizPhoto path={b.photos[0]} width={120} style={s.railShot} />")],
     "import { eduImage } from '@/constants/education-images';")
