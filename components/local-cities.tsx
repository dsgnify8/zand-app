// Cities, and what is in them.
//
// The names carry the page. No cards, no boxes — the type sits on the
// background and the one you are on grows while the others recede, so
// scrolling feels like turning a dial rather than moving a list. That is
// the whole interaction: the size *is* the selection.
//
// One photograph runs behind the lot, heavily darkened. It gives the names
// something to sit on without competing, and it makes this feel like a
// different mode to the feed rather than another screen of it.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { CITY_BACKDROP } from '@/constants/city-images';
import { BusinessCard } from '@/components/business-card';
import { CategoryBar, CategorySheet } from '@/components/category-sheet';
import { CollectionSheet } from '@/components/collection-sheet';
import { LocalDrawer, type DrawerPick } from '@/components/local-drawer';
import { useAuth } from '@/lib/auth';
import { loadBusinesses, categoryLabel, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { cityCoverSource, cityCoverBlurb, useCityCovers } from '@/lib/city-covers';
import { isDestination } from '@/constants/cities';
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const D = {
  bg: '#100D0C',
  text: '#F6F1EC',
  dim: 'rgba(246,241,236,0.62)',
  faint: 'rgba(246,241,236,0.26)',
};

const ROW = 104;

/**
 * The drawer, wired up.
 *
 * Every Local page carries the same one, so this holds the state and the
 * routing in one place rather than in each screen.
 */
function useLocalDrawer() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();

  const onPick = (k: DrawerPick) => {
    if (k === 'home') { router.navigate('/local' as any); return; }
    if (k === 'city') { router.navigate('/local/cities' as any); return; }
    router.navigate(session
      ? ('/local/business-new' as any)
      : ('/onboarding?step=2&next=/local/business-new' as any));
  };

  return { open, setOpen, onPick };
}


/** city is free text on the row, so group case-insensitively. */
function groupCities(items: Business[]) {
  const by = new Map<string, { label: string; list: Business[] }>();
  for (const b of items) {
    const raw = (b.city ?? '').trim();
    // Somewhere with one listing is not somewhere to browse to.
    if (!raw || !isDestination(raw)) continue;
    const key = raw.toLowerCase();
    const prev = by.get(key);
    if (prev) prev.list.push(b);
    else by.set(key, { label: raw, list: [b] });
  }
  // Three or more. A city with one or two listings is a page someone
  // opens once and does not return to, and a long list of those makes
  // the cities worth visiting harder to find.
  return [...by.entries()]
    .map(([key, v]) => ({ key, ...v }))
    .filter((c) => c.list.length >= 3)
    .sort((a, b) => b.list.length - a.list.length);
}

const coverFor = (key: string, list: Business[]) => {
  // An admin-set cover first, then the bundled one, then a listing photo.
  const shot = list.find((b) => (b.photos ?? []).length > 0);
  return cityCoverSource(key, shot ? bizImage((shot.photos ?? [])[0]) : null);
};

/* ================================================================== *
 * The list
 * ================================================================== */

export function CityList() {
  useLang();
  useCityCovers();
  const drawer = useLocalDrawer();
  // Mounting a dark screen over a light one shows every millisecond of the
  // image decode, which reads as a flash. Fading in covers it.
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
  }, []);
  const fa = getLang() === 'fa';
  const { height: H } = useWindowDimensions();

  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      try { setItems(await loadBusinesses({})); } catch {}
      setLoading(false);
    })();
  }, []);

  const cities = useMemo(() => groupCities(items), [items]);

  // The name nearest this line is the one that grows.
  const focus = H * 0.42;
  const pad = Math.max(0, focus - ROW);


  return (
    <Animated.View style={[st.dark, { opacity: enter }]}>
      {/* One of four, changing weekly. Held well down so the names stay
          the thing being read. */}
      {/* Fixed rather than rotating. The rotation was a nice idea and this
          one is better than the others; a page that changes weekly for its
          own sake is change without a reason. */}
      <Image source={CITY_BACKDROP} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
      <View style={[StyleSheet.absoluteFill as any, { backgroundColor: 'rgba(16,13,12,0.72)' }]} />

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[st.topBar, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => drawer.setOpen(true)}>
            <Ionicons name="menu-outline" size={22} color={D.text} />
          </Pressable>
          <Text style={[st.topT, st.topTRight]}>{t(LOCAL.byCityTitle)}</Text>
          <View style={{ width: 22 }} />
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={D.dim} />
        ) : (
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true })}
            scrollEventThrottle={16}
            // The first name starts on the line and the last one can still
            // reach it: without both pads the ends are never selectable.
            contentContainerStyle={{ paddingTop: focus - ROW, paddingBottom: H - focus }}
          >
            {cities.map((c, i) => (
              <CityName
                key={c.key}
                label={c.label}
                n={c.list.length}
                index={i}
                scrollY={y}
                focus={focus}
                onPress={() =>
                  router.navigate(('/local/city?c=' + encodeURIComponent(c.key) +
                    '&label=' + encodeURIComponent(c.label)) as any)
                }
              />
            ))}
          </Animated.ScrollView>
        )}
      </SafeAreaView>

      <LocalDrawer
        open={drawer.open}
        onClose={() => drawer.setOpen(false)}
        onPick={drawer.onPick}
      />
    </Animated.View>
  );
}

/**
 * One name, sized by how close it is to the focus line.
 *
 * The interpolation is on scroll position rather than on a selected index:
 * driving it from state would mean a re-render per frame, and the whole
 * effect depends on it being smooth.
 */
function CityName({
  label, n, index, scrollY, focus, onPress,
}: {
  label: string; n: number; index: number;
  scrollY: Animated.Value; focus: number; onPress: () => void;
}) {
  const fa = getLang() === 'fa';

  // Where this row sits when it is exactly on the line.
  const at = index * ROW;
  const range = [at - ROW * 1.6, at, at + ROW * 1.6];

  const scale = scrollY.interpolate({
    inputRange: range,
    outputRange: [0.62, 1, 0.62],
    extrapolate: 'clamp',
  });
  const opacity = scrollY.interpolate({
    inputRange: range,
    outputRange: [0.3, 1, 0.3],
    extrapolate: 'clamp',
  });

  return (
    <Pressable onPress={onPress} style={[st.row, fa && { alignItems: 'flex-end' }]}>
      <Animated.Text
        numberOfLines={1}
        style={[
          st.name,
          {
            opacity,
            transform: [
              { scale },
              // Scaling alone pulls the name toward the centre; this keeps
              // its left edge planted so the column stays a column.
              { translateX: fa ? 0 : 0 },
            ],
          },
          fa && { textAlign: 'right' },
        ]}
      >
        {label.toUpperCase()}
      </Animated.Text>
      <Animated.Text style={[st.count, { opacity }, fa && st.rtl]}>
        {n} {t(n === 1 ? LOCAL.place : LOCAL.places)}
      </Animated.Text>
    </Pressable>
  );
}

/* ================================================================== *
 * One city
 * ================================================================== */

/**
 * One city.
 *
 * Dark at the top, light underneath. The hero needs darkness for the name
 * to sit on; the listings below do not, and putting them on a dark ground
 * meant maintaining a second version of every card.
 */
/**
 * A city's two colours.
 *
 * Seeded from the name, so Dubai is always the same and never the same as
 * Doha. Four pairs rather than a generated hue, because a random warm
 * colour is usually a bad warm colour — these were chosen.
 */
const CITY_PALETTES: [string, string][] = [
  ['#5A473E', '#9C8270'],   // terracotta
  ['#4E463A', '#9A8A66'],   // saffron
  ['#544048', '#9A7078'],   // rose
  ['#454A40', '#7E8468'],   // olive
  ['#4A3E48', '#8A7280'],   // plum
];

function cityColours(name: string): [string, string] {
  let n = 0;
  for (let i = 0; i < name.length; i++) n = (n * 31 + name.charCodeAt(i)) % 9973;
  return CITY_PALETTES[n % CITY_PALETTES.length];
}

export function CityPage() {
  useLang();
  useCityCovers();
  const drawer = useLocalDrawer();
  // Arriving should settle rather than appear. Cheap, native-driven, and
  // it covers the moment the cover image decodes.
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
  }, []);
  const fa = getLang() === 'fa';
  const { c, label } = useLocalSearchParams<{ c?: string; label?: string }>();
  const { width: W, height: H } = useWindowDimensions();

  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<string[]>([]);
  const [catOpen, setCatOpen] = useState(false);
  // Holding a bookmark files it, on every page that shows a card.
  const [filing, setFiling] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const all = await loadBusinesses({});
        setItems(all.filter((b) => (b.city ?? '').trim().toLowerCase() === (c ?? '').toLowerCase()));
      } catch {}
      setLoading(false);
    })();
  }, [c]);

  const name = (label ?? c ?? '').toUpperCase();
  const cover = coverFor(c ?? '', items);
  const blurb = cityCoverBlurb(c ?? '', fa);
  const counts = items.reduce((m: Record<string, number>, b) => {
    if (b.category) m[b.category] = (m[b.category] ?? 0) + 1;
    return m;
  }, {});
  const shown = cat.length ? items.filter((b) => b.category && cat.includes(b.category)) : items;

  return (
    <View style={st.light}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}
        style={{
          opacity: enter,
          transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
        }}
      >
        {/* The frame is the photograph. Not a fixed height with a picture
            somewhere inside it — that is what produced a band across the
            middle every time, because the gradient had to guess where the
            image ended. */}
        {/* A colour field rather than a photograph.
        
            The covers were five different shapes and no single frame fits
            a portrait and a panorama both; matching them at source meant
            re-saving every one and re-doing it whenever a city was added.
            A gradient costs nothing, never crops, and looks the same on
            every city — and the page was always about the name anyway. */}
        <View style={{ height: Math.round(H * 0.44) }}>
          <LinearGradient
            colors={[...cityColours(name), colors.background]}
            locations={[0, 0.72, 1]}
            style={StyleSheet.absoluteFill as any}
          />

          <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <View style={[st.heroTop, fa && { flexDirection: 'row-reverse' }]}>
              <Pressable hitSlop={12} onPress={() => router.navigate('/local/cities' as any)}>
                <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
              </Pressable>
              <Pressable
                hitSlop={12}
                style={st.mapBtn}
                onPress={() => {
                  const pts = items.filter((b) => b.lat != null && b.lng != null);
                  if (pts.length === 0) { router.navigate('/local-map' as any); return; }
                  const lat = pts.reduce((n, b) => n + (b.lat ?? 0), 0) / pts.length;
                  const lng = pts.reduce((n, b) => n + (b.lng ?? 0), 0) / pts.length;
                  router.navigate(('/local-map?lat=' + lat + '&lng=' + lng + '&z=0.35') as any);
                }}
              >
                <Ionicons name="map-outline" size={16} color={D.text} />
              </Pressable>
            </View>
          </SafeAreaView>

          <View style={st.heroText}>
            <Text style={st.heroName} numberOfLines={2}>{name}</Text>
            <Text style={st.heroCount}>
              {items.length} {t(items.length === 1 ? LOCAL.place : LOCAL.places).toUpperCase()}
            </Text>
            {blurb ? <Text style={st.heroBlurb}>{blurb}</Text> : null}
          </View>
        </View>

        <View style={[st.controls, fa && { flexDirection: 'row-reverse' }]}>
          <CategoryBar
            value={cat}
            counts={counts}
            onPress={() => setCatOpen(true)}
            onClear={() => setCat([])}
          />

        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xl }} color={D.dim} />
        ) : (
          <View style={st.grid}>
            {shown.map((b) => (
              <BusinessCard
                key={b.id}
                b={b}
                fa={fa}
                onOpen={() => router.navigate(('/local/business?id=' + b.id) as any)}
              onFile={setFiling}
                onFile={setFiling}
              />
            ))}
          </View>
        )}
      </Animated.ScrollView>

      <CategorySheet
        open={catOpen}
        value={cat}
        counts={counts}
        onPick={setCat}
        onClose={() => setCatOpen(false)}
      />

      <CollectionSheet businessId={filing} open={filing !== null} onClose={() => setFiling(null)} />

      <LocalDrawer
        open={drawer.open}
        onClose={() => drawer.setOpen(false)}
        onPick={drawer.onPick}
      />
    </View>
  );
}

const st = StyleSheet.create({
  dark: { flex: 1, backgroundColor: D.bg },
  // The city page: dark only where the photograph is.
  light: { flex: 1, backgroundColor: colors.background },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  // The body face, not the serif. Cormorant at this size reads as a
  // masthead; these are labels.
  topT: { fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.2, color: D.text },
  // Ranged right rather than centred: a centred title needs a matching
  // shape on the other side to look deliberate, and there is only a menu
  // icon over there.
  topTRight: { flex: 1, textAlign: 'right' },

  row: { height: ROW, justifyContent: 'center', paddingHorizontal: spacing.lg },
  name: {
    fontFamily: fonts.bodyStrong,
    fontSize: 44,
    letterSpacing: -1.6,
    color: D.text,
  },
  count: {
    fontFamily: fonts.body, fontSize: 10.5, letterSpacing: 1.6,
    color: D.dim, marginTop: 2,
  },

  heroTop: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.sm,
  },
  mapBtn: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.28)',
  },
  // Centred, following the reference: the name, the count beneath it in
  // caps, then the line of prose.
  // Below the photograph, not over it. Type on a picture needs the
  // picture darkened to stay legible, and darkening a photograph to make
  // room for words is a poor trade when there is space underneath.
  // Up on the colour rather than down in the fade. The panel grew to
  // give the gradient room; the type should not travel with it.
  heroText: {
    position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: '32%',
    alignItems: 'center',
  },
  heroName: {
    fontFamily: fonts.bodyStrong, fontSize: 42, lineHeight: 48,
    letterSpacing: -1.4, color: D.text, textAlign: 'center',
  },
  heroBlurb: {
    fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21,
    color: 'rgba(246,241,236,0.80)', marginTop: spacing.md, textAlign: 'center', maxWidth: 300,
  },
  heroCount: {
    fontFamily: fonts.body, fontSize: 10, letterSpacing: 2.4,
    color: 'rgba(246,241,236,0.72)', marginTop: 10, textAlign: 'center',
  },

  // Up under the banner. Only this block moves — the name, the count and
  // the blurb stay where they sit on the colour.
  controls: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: 0, marginTop: -spacing.lg,
  },
  switchRow: { flexDirection: 'row', gap: spacing.md },
  grid: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  shot: { borderRadius: 13, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.06)' },
  blank: { alignItems: 'center', justifyContent: 'center' },
  cardT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: D.text, marginTop: 8 },
  cardX: { fontFamily: fonts.body, fontSize: 11, color: D.dim, marginTop: 1 },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
