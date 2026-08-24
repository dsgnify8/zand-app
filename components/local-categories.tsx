// Categories, everywhere.
//
// The squares stay at the top rather than disappearing once you pick one:
// browsing a directory by category means changing your mind, and having to
// go back to switch from Bakeries to Cafés turns one thought into three
// taps. Picking again just changes what is underneath.
//
// Same dark ground as the country pages — these are the browsing mode, and
// the feed is the finding mode.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { CATEGORIES, categoryLabel, loadBusinesses, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const D = {
  bg: '#141110',
  raised: '#1E1A18',
  hair: 'rgba(255,255,255,0.10)',
  text: '#F4EFEA',
  dim: 'rgba(244,239,234,0.55)',
  faint: 'rgba(244,239,234,0.28)',
};

// Muted enough for a dark ground, distinct enough to find one by hue on the
// second visit. Fourteen identical icons is a wall.
const TINT: Record<string, string> = {
  restaurant: '#D2695F', cafe: '#C09A6B', bakery: '#D9A94C', grocery: '#8FA86B',
  beauty: '#D69AA6', clothing: '#9B8FC4', jewellery: '#D4B45E', repair: '#7FA0B0',
  interior: '#B49A7A', photo: '#6E96A6', events: '#D68BAA', legal: '#8494A8',
  medical: '#6FB09B', dental: '#7FBAC8',
};
const tintFor = (k: string) => TINT[k] ?? D.dim;

export function CategoryBrowse() {
  useLang();
  const fa = getLang() === 'fa';
  const { width: W } = useWindowDimensions();

  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [pick, setPick] = useState<string | null>(null);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    (async () => {
      try { setItems(await loadBusinesses({})); } catch {}
      setLoading(false);
    })();
  }, []);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const b of items) if (b.category) m[b.category] = (m[b.category] ?? 0) + 1;
    return m;
  }, [items]);

  // Only categories that have something in them. An empty square is a dead
  // end dressed up as a choice.
  const shown = useMemo(() => CATEGORIES.filter((c) => (counts[c.key] ?? 0) > 0), [counts]);

  const list = useMemo(
    () => (pick ? items.filter((b) => b.category === pick) : []),
    [items, pick],
  );

  const cell = (W - spacing.lg * 2 - spacing.md * 2) / 3;
  const cardW = grid ? (W - spacing.lg * 2 - spacing.md) / 2 : W - spacing.lg * 2;

  return (
    <View style={st.dark}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[st.topBar, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
            <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
          </Pressable>
          <Text style={[st.topT, fa && st.rtl]}>{t(LOCAL.byCategoryTitle)}</Text>
          <View style={{ width: 22 }} />
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={D.dim} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}>
            {/* the squares */}
            <View style={st.grid}>
              {shown.map((c) => {
                const on = pick === c.key;
                return (
                  <Pressable
                    key={c.key}
                    style={[st.cell, { width: cell, height: cell }, on && { borderColor: tintFor(c.key) }]}
                    onPress={() => setPick(on ? null : c.key)}
                  >
                    <Ionicons name={c.icon as any} size={21} color={on ? tintFor(c.key) : D.dim} />
                    <Text style={[st.cellT, on && { color: D.text }, fa && st.cellTFa]} numberOfLines={2}>
                      {categoryLabel(c.key, fa)}
                    </Text>
                    <Text style={st.cellN}>{counts[c.key]}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* what is in it */}
            {pick ? (
              <>
                <View style={[st.resultHead, fa && { flexDirection: 'row-reverse' }]}>
                  <Text style={[st.resultT, fa && st.rtl]}>
                    {categoryLabel(pick, fa)}
                    <Text style={st.resultN}>{'   ' + list.length}</Text>
                  </Text>
                  <View style={[st.switchRow, fa && { flexDirection: 'row-reverse' }]}>
                    <Pressable hitSlop={8} onPress={() => setGrid(false)}>
                      <Ionicons name="square-outline" size={16} color={grid ? D.faint : D.text} />
                    </Pressable>
                    <Pressable hitSlop={8} onPress={() => setGrid(true)}>
                      <Ionicons name="grid-outline" size={16} color={grid ? D.text : D.faint} />
                    </Pressable>
                  </View>
                </View>

                <View style={[st.cards, grid && st.cardsGrid]}>
                  {list.map((b) => {
                    const shot = (b.photos ?? [])[0];
                    return (
                      <Pressable
                        key={b.id}
                        style={{ width: cardW }}
                        onPress={() => router.navigate(('/business?id=' + b.id) as any)}
                      >
                        <View style={[st.shot, { width: cardW, height: grid ? cardW : cardW * 0.68 }]}>
                          {shot ? (
                            <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                          ) : (
                            <View style={[StyleSheet.absoluteFill as any, st.blank]}>
                              <Ionicons name="storefront-outline" size={20} color={D.faint} />
                            </View>
                          )}
                        </View>
                        <Text style={[st.cardT, fa && st.rtl]} numberOfLines={1}>
                          {fa && b.name_fa ? b.name_fa : b.name}
                        </Text>
                        <Text style={[st.cardX, fa && st.rtl]} numberOfLines={1}>
                          {[(fa && b.city_fa) || b.city, b.country].filter(Boolean).join('  ·  ')}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </>
            ) : (
              <Text style={[st.hint, fa && st.rtl]}>{t(LOCAL.pickACategory)}</Text>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
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

  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingBottom: spacing.lg,
  },
  cell: {
    borderRadius: 14, borderWidth: 1, borderColor: D.hair,
    backgroundColor: D.raised,
    alignItems: 'center', justifyContent: 'center', gap: 5,
    paddingHorizontal: 6,
  },
  cellT: { fontFamily: fonts.body, fontSize: 11, color: D.dim, textAlign: 'center' },
  cellTFa: { fontFamily: fonts.persian, fontSize: 11.5 },
  cellN: { fontFamily: fonts.body, fontSize: 9.5, color: D.faint },

  resultHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md,
  },
  resultT: { fontFamily: fonts.bodyStrong, fontSize: 22, letterSpacing: -0.5, color: D.text },
  resultN: { fontFamily: fonts.body, fontSize: 12, color: D.faint },
  switchRow: { flexDirection: 'row', gap: spacing.md },

  cards: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  shot: { borderRadius: 14, overflow: 'hidden', backgroundColor: D.raised },
  blank: { alignItems: 'center', justifyContent: 'center' },
  cardT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: D.text, marginTop: 8 },
  cardX: { fontFamily: fonts.body, fontSize: 11.5, color: D.dim, marginTop: 1 },

  hint: {
    fontFamily: fonts.body, fontSize: 12.5, color: D.faint,
    textAlign: 'center', marginTop: spacing.xxl, paddingHorizontal: spacing.xl,
  },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
