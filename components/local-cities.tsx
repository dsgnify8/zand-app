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

import { fonts, spacing } from '@/constants/zand-theme';
import { loadBusinesses, categoryLabel, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { cityInfo, cityBlurb } from '@/constants/cities';
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

/** city is free text on the row, so group case-insensitively. */
function groupCities(items: Business[]) {
  const by = new Map<string, { label: string; list: Business[] }>();
  for (const b of items) {
    const raw = (b.city ?? '').trim();
    if (!raw) continue;
    const key = raw.toLowerCase();
    const prev = by.get(key);
    if (prev) prev.list.push(b);
    else by.set(key, { label: raw, list: [b] });
  }
  return [...by.entries()]
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.list.length - a.list.length);
}

const coverFor = (key: string, list: Business[]) => {
  const info = cityInfo(key);
  if (info?.cover) return info.cover;
  const shot = list.find((b) => (b.photos ?? []).length > 0);
  return shot ? bizImage((shot.photos ?? [])[0]) : null;
};

/* ================================================================== *
 * The list
 * ================================================================== */

export function CityList() {
  useLang();
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

  const backdrop = cities.length ? coverFor(cities[0].key, cities[0].list) : null;

  return (
    <View style={st.dark}>
      {/* One photograph behind everything, held right down so it reads as
          atmosphere rather than as a picture of somewhere in particular. */}
      {backdrop ? (
        <Image source={backdrop} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
      ) : null}
      <View style={[StyleSheet.absoluteFill as any, { backgroundColor: 'rgba(16,13,12,0.86)' }]} />
      <LinearGradient
        colors={['rgba(16,13,12,0.95)', 'rgba(16,13,12,0.4)', 'rgba(16,13,12,0.95)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill as any}
      />

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[st.topBar, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
            <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
          </Pressable>
          <Text style={st.topT}>{t(LOCAL.byCityTitle)}</Text>
          <View style={{ width: 22 }} />
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={D.dim} />
        ) : (
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true })}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: pad * 0.5, paddingBottom: pad }}
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
                  router.navigate(('/local-city?c=' + encodeURIComponent(c.key) +
                    '&label=' + encodeURIComponent(c.label)) as any)
                }
              />
            ))}
          </Animated.ScrollView>
        )}
      </SafeAreaView>
    </View>
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

export function CityPage() {
  useLang();
  const fa = getLang() === 'fa';
  const { c, label } = useLocalSearchParams<{ c?: string; label?: string }>();
  const { width: W } = useWindowDimensions();

  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

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
  const blurb = cityBlurb(c, fa);
  const cardW = (W - spacing.lg * 2 - spacing.md) / 2;

  return (
    <View style={st.dark}>
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}>
        <View style={{ height: 440 }}>
          {cover ? <Image source={cover} style={StyleSheet.absoluteFill as any} resizeMode="cover" /> : null}
          <LinearGradient
            colors={['rgba(16,13,12,0.55)', 'rgba(16,13,12,0.18)', 'rgba(16,13,12,0.75)', D.bg]}
            locations={[0, 0.35, 0.8, 1]}
            style={StyleSheet.absoluteFill as any}
          />

          <SafeAreaView edges={['top']}>
            <View style={[st.heroTop, fa && { flexDirection: 'row-reverse' }]}>
              <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
                <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
              </Pressable>

              {/* Straight to these listings on the map, not the whole map. */}
              <Pressable
                hitSlop={12}
                style={st.mapBtn}
                onPress={() => router.navigate(('/local-map?city=' + encodeURIComponent(c ?? '')) as any)}
              >
                <Ionicons name="map-outline" size={16} color={D.text} />
              </Pressable>
            </View>
          </SafeAreaView>

          <View style={[st.heroText, fa && { alignItems: 'flex-end' }]}>
            <Text style={st.heroName} numberOfLines={2}>{name}</Text>
            {blurb ? <Text style={[st.heroBlurb, fa && st.rtl]}>{blurb}</Text> : null}
            <Text style={[st.heroCount, fa && st.rtl]}>
              {items.length} {t(items.length === 1 ? LOCAL.place : LOCAL.places)}
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xl }} color={D.dim} />
        ) : (
          <View style={st.grid}>
            {items.map((b) => {
              const shot = (b.photos ?? [])[0];
              return (
                <Pressable
                  key={b.id}
                  style={{ width: cardW }}
                  onPress={() => router.navigate(('/business?id=' + b.id) as any)}
                >
                  <View style={[st.shot, { width: cardW, height: cardW }]}>
                    {shot ? (
                      <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                    ) : (
                      <View style={[StyleSheet.absoluteFill as any, st.blank]}>
                        <Ionicons name="storefront-outline" size={18} color={D.faint} />
                      </View>
                    )}
                  </View>
                  <Text style={[st.cardT, fa && st.rtl]} numberOfLines={1}>
                    {fa && b.name_fa ? b.name_fa : b.name}
                  </Text>
                  <Text style={[st.cardX, fa && st.rtl]} numberOfLines={1}>
                    {categoryLabel(b.category, fa)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  dark: { flex: 1, backgroundColor: D.bg },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 19, color: D.text },

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
  heroText: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: spacing.xl },
  heroName: { fontFamily: fonts.bodyStrong, fontSize: 44, lineHeight: 50, letterSpacing: -1.6, color: D.text },
  heroBlurb: {
    fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21,
    color: D.dim, marginTop: 8, maxWidth: '92%',
  },
  heroCount: { fontFamily: fonts.body, fontSize: 10.5, letterSpacing: 1.6, color: D.faint, marginTop: 10 },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg,
  },
  shot: { borderRadius: 13, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.06)' },
  blank: { alignItems: 'center', justifyContent: 'center' },
  cardT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: D.text, marginTop: 8 },
  cardX: { fontFamily: fonts.body, fontSize: 11, color: D.dim, marginTop: 1 },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
