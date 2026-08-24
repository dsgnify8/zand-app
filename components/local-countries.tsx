// Countries, and what is in them.
//
// A different mode to the feed on purpose: dark ground, photography doing
// the work, names at a size that is a statement rather than a label. The
// feed is for finding something specific; this is for browsing, and the
// two should not look alike.
//
// The names are Poppins SemiBold rather than the app's Cormorant. Cormorant
// at this size reads as refined, which is the opposite of what oversized
// caps are for — the weight is the point.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  ScrollView,
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
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

/** The dark palette. Local's own; not the app's cream. */
const D = {
  bg: '#141110',
  raised: '#1E1A18',
  hair: 'rgba(255,255,255,0.10)',
  text: '#F4EFEA',
  dim: 'rgba(244,239,234,0.55)',
  faint: 'rgba(244,239,234,0.28)',
};

/** country is free text, so group case-insensitively and keep first spelling. */
function group(items: Business[]) {
  const by = new Map<string, { label: string; list: Business[] }>();
  for (const b of items) {
    const raw = (b.country ?? '').trim();
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

/** First photo of the newest listing there — real, and needs no new assets. */
function coverFor(list: Business[]) {
  const withShot = list.find((b) => (b.photos ?? []).length > 0);
  return withShot ? bizImage((withShot.photos ?? [])[0]) : null;
}

/* ================================================================== *
 * The list of countries
 * ================================================================== */

export function CountryList() {
  useLang();
  const fa = getLang() === 'fa';
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setItems(await loadBusinesses({})); } catch {}
      setLoading(false);
    })();
  }, []);

  const countries = useMemo(() => group(items), [items]);

  return (
    <View style={st.dark}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[st.topBar, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
            <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
          </Pressable>
          <Text style={[st.topT, fa && st.rtl]}>{t(LOCAL.byCountryTitle)}</Text>
          <View style={{ width: 22 }} />
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={D.dim} />
        ) : (
          <ScrollView contentContainerStyle={st.listBody} showsVerticalScrollIndicator={false}>
            <Text style={[st.lead, fa && st.rtl]}>{t(LOCAL.chooseYourPlace)}</Text>

            {countries.map((c, i) => (
              <CountryRow
                key={c.key}
                label={c.label}
                n={c.list.length}
                cover={coverFor(c.list)}
                first={i === 0}
                onPress={() =>
                  router.navigate(('/local-country?c=' + encodeURIComponent(c.key) +
                    '&label=' + encodeURIComponent(c.label)) as any)
                }
              />
            ))}

            {countries.length === 0 ? (
              <Text style={[st.empty, fa && st.rtl]}>{t(LOCAL.nothingYet)}</Text>
            ) : null}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

/**
 * One country. The photograph sits behind the name rather than beside it,
 * so the row is the place rather than a link to it.
 */
function CountryRow({
  label, n, cover, first, onPress,
}: { label: string; n: number; cover: any; first: boolean; onPress: () => void }) {
  const fa = getLang() === 'fa';
  return (
    <Pressable style={st.row} onPress={onPress}>
      {cover ? (
        <Image source={cover} style={st.rowShot} resizeMode="cover" />
      ) : null}
      {/* Even with a photo the name has to stay legible, so the ground is
          dark first and the picture sits at a whisper behind it. */}
      <View style={st.rowVeil} />

      <View style={[st.rowText, fa && { alignItems: 'flex-end' }]}>
        <Text style={[st.rowName, first && st.rowNameFirst]} numberOfLines={1}>
          {label.toUpperCase()}
        </Text>
        <Text style={[st.rowN, fa && st.rtl]}>
          {n} {t(n === 1 ? LOCAL.place : LOCAL.places)}
        </Text>
      </View>
    </Pressable>
  );
}

/* ================================================================== *
 * One country
 * ================================================================== */

export function CountryPage() {
  useLang();
  const fa = getLang() === 'fa';
  const { c, label } = useLocalSearchParams<{ c?: string; label?: string }>();
  const { width: W } = useWindowDimensions();

  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const all = await loadBusinesses({});
        setItems(all.filter((b) => (b.country ?? '').trim().toLowerCase() === (c ?? '').toLowerCase()));
      } catch {}
      setLoading(false);
    })();
  }, [c]);

  const cover = coverFor(items);
  const name = (label ?? c ?? '').toUpperCase();
  const cities = useMemo(
    () => Array.from(new Set(items.map((b) => (b.city ?? '').trim()).filter(Boolean))),
    [items],
  );

  return (
    <View style={st.dark}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}>
        {/* hero */}
        <View style={{ height: 420 }}>
          {cover ? <Image source={cover} style={StyleSheet.absoluteFill as any} resizeMode="cover" /> : null}
          <LinearGradient
            colors={['rgba(20,17,16,0.45)', 'rgba(20,17,16,0.15)', D.bg]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill as any}
          />

          <SafeAreaView edges={['top']}>
            <View style={[st.heroTop, fa && { flexDirection: 'row-reverse' }]}>
              <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
                <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
              </Pressable>
            </View>
          </SafeAreaView>

          <View style={st.heroText}>
            <Text style={st.heroName} numberOfLines={2}>{name}</Text>
            <Text style={[st.heroMeta, fa && st.rtl]}>
              {items.length} {t(items.length === 1 ? LOCAL.place : LOCAL.places)}
              {cities.length ? '   ·   ' + cities.slice(0, 3).join(', ') : ''}
            </Text>
          </View>
        </View>

        {/* view switch */}
        <View style={[st.switchRow, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={8} onPress={() => setGrid(false)}>
            <Ionicons name="square-outline" size={17} color={grid ? D.faint : D.text} />
          </Pressable>
          <Pressable hitSlop={8} onPress={() => setGrid(true)}>
            <Ionicons name="grid-outline" size={17} color={grid ? D.text : D.faint} />
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xl }} color={D.dim} />
        ) : (
          <View style={[st.cards, grid && st.cardsGrid]}>
            {items.map((b) => (
              <DarkCard
                key={b.id}
                b={b}
                fa={fa}
                width={grid ? (W - spacing.lg * 2 - spacing.md) / 2 : W - spacing.lg * 2}
                tall={!grid}
                onPress={() => router.navigate(('/business?id=' + b.id) as any)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/** A card for the dark pages. The feed's own card is built for cream. */
function DarkCard({
  b, fa, width, tall, onPress,
}: { b: Business; fa: boolean; width: number; tall: boolean; onPress: () => void }) {
  const shot = (b.photos ?? [])[0];
  return (
    <Pressable style={[st.card, { width }]} onPress={onPress}>
      <View style={[st.cardShot, { width, height: tall ? width * 0.72 : width }]}>
        {shot ? (
          <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
        ) : (
          <View style={[StyleSheet.absoluteFill as any, st.cardBlank]}>
            <Ionicons name="storefront-outline" size={20} color={D.faint} />
          </View>
        )}
      </View>
      <Text style={[st.cardT, fa && st.rtl]} numberOfLines={1}>
        {fa && b.name_fa ? b.name_fa : b.name}
      </Text>
      <Text style={[st.cardX, fa && st.rtl]} numberOfLines={1}>
        {categoryLabel(b.category, fa)}
        {b.city ? '  ·  ' + ((fa && b.city_fa) || b.city) : ''}
      </Text>
    </Pressable>
  );
}

const st = StyleSheet.create({
  dark: { flex: 1, backgroundColor: D.bg },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 19, color: D.text },

  listBody: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  lead: { fontFamily: fonts.body, fontSize: 12, letterSpacing: 1.6, color: D.dim, marginBottom: spacing.xl },

  row: {
    height: 132, justifyContent: 'center',
    borderRadius: 18, overflow: 'hidden', marginBottom: spacing.md,
    backgroundColor: D.raised,
  },
  rowShot: { ...StyleSheet.absoluteFillObject, opacity: 0.5 },
  rowVeil: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(20,17,16,0.55)' },
  rowText: { paddingHorizontal: spacing.lg },
  // Poppins, not Cormorant: at this size the weight is the whole effect.
  rowName: { fontFamily: fonts.bodyStrong, fontSize: 34, letterSpacing: -1.2, color: D.text },
  rowNameFirst: { fontSize: 40 },
  rowN: { fontFamily: fonts.body, fontSize: 11, letterSpacing: 1.2, color: D.dim, marginTop: 4 },

  empty: { fontFamily: fonts.body, fontSize: 13, color: D.dim, textAlign: 'center', marginTop: spacing.xxl },

  heroTop: { flexDirection: 'row', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  heroText: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: spacing.xl },
  heroName: { fontFamily: fonts.bodyStrong, fontSize: 46, lineHeight: 52, letterSpacing: -1.6, color: D.text },
  heroMeta: { fontFamily: fonts.body, fontSize: 11.5, letterSpacing: 1.4, color: D.dim, marginTop: 6 },

  switchRow: {
    flexDirection: 'row', gap: spacing.lg, justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },

  cards: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  card: {},
  cardShot: { borderRadius: 14, overflow: 'hidden', backgroundColor: D.raised },
  cardBlank: { alignItems: 'center', justifyContent: 'center' },
  cardT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: D.text, marginTop: 8 },
  cardX: { fontFamily: fonts.body, fontSize: 11.5, color: D.dim, marginTop: 1 },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
