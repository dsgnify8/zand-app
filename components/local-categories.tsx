// Categories, everywhere.
//
// The choices sit at the top of the page rather than behind a control:
// this page's whole job is choosing, so hiding the options behind a tap
// would be hiding the page behind a tap. They stay put when you pick, too
// — browsing by category means changing your mind, and going back to
// switch from Bakeries to Cafés turns one thought into three taps.
//
// Text in thin boxes, no icons. There are fourteen of these; a picture
// apiece turns a list you scan into a wall you read one item at a time,
// and the words are faster.
//
// Multiple at once, because cafés-and-bakeries is a real question.

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
import { LocalDrawer, type DrawerPick } from '@/components/local-drawer';
import { useAuth } from '@/lib/auth';
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const D = {
  bg: '#100D0C',
  raised: 'rgba(255,255,255,0.06)',
  hair: 'rgba(246,241,236,0.22)',
  text: '#F6F1EC',
  dim: 'rgba(246,241,236,0.62)',
  faint: 'rgba(246,241,236,0.28)',
};

export function CategoryBrowse() {
  useLang();
  const fa = getLang() === 'fa';
  const { width: W } = useWindowDimensions();
  const { session } = useAuth();

  const [drawer, setDrawer] = useState(false);
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [pick, setPick] = useState<string[]>([]);
  const [grid, setGrid] = useState(true);

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

  // Only categories with something in them. An empty box is a dead choice
  // dressed up as a live one.
  const shown = useMemo(
    () => CATEGORIES.filter((c) => (counts[c.key] ?? 0) > 0),
    [counts],
  );

  const list = useMemo(
    () => (pick.length ? items.filter((b) => b.category && pick.includes(b.category)) : items),
    [items, pick],
  );

  const cardW = grid
    ? (W - spacing.lg * 2 - spacing.md) / 2
    : W - spacing.lg * 2;

  const onDrawerPick = (k: DrawerPick) => {
    if (k === 'home') { router.navigate('/local' as any); return; }
    if (k === 'city') { router.navigate('/local-cities' as any); return; }
    if (k === 'category') { setDrawer(false); return; }
    router.navigate(session
      ? ('/business-new' as any)
      : ('/onboarding?step=2&next=/business-new' as any));
  };

  const toggle = (key: string) =>
    setPick((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));

  return (
    <View style={st.dark}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[st.topBar, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => setDrawer(true)}>
            <Ionicons name="menu-outline" size={22} color={D.text} />
          </Pressable>
          <Text style={st.topT}>{t(LOCAL.byCategoryTitle)}</Text>
          <View style={{ width: 22 }} />
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={D.dim} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}>
            <View style={st.boxes}>
              <Pressable
                style={[st.box, pick.length === 0 && st.boxOn]}
                onPress={() => setPick([])}
              >
                <Text style={[st.boxT, pick.length === 0 && st.boxTOn, fa && st.boxTFa]}>
                  {t(LOCAL.everything)}
                </Text>
              </Pressable>

              {shown.map((c) => {
                const on = pick.includes(c.key);
                return (
                  <Pressable
                    key={c.key}
                    style={[st.box, on && st.boxOn]}
                    onPress={() => toggle(c.key)}
                  >
                    <Text style={[st.boxT, on && st.boxTOn, fa && st.boxTFa]}>
                      {categoryLabel(c.key, fa)}
                      <Text style={st.boxN}>{'  ' + counts[c.key]}</Text>
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={[st.resultHead, fa && { flexDirection: 'row-reverse' }]}>
              <Text style={[st.resultN, fa && st.rtl]}>
                {list.length} {t(list.length === 1 ? LOCAL.place : LOCAL.places).toUpperCase()}
              </Text>
              <View style={[st.switchRow, fa && { flexDirection: 'row-reverse' }]}>
                <Pressable hitSlop={8} onPress={() => setGrid(false)}>
                  <Ionicons name="square-outline" size={15} color={grid ? D.faint : D.text} />
                </Pressable>
                <Pressable hitSlop={8} onPress={() => setGrid(true)}>
                  <Ionicons name="grid-outline" size={15} color={grid ? D.text : D.faint} />
                </Pressable>
              </View>
            </View>

            <View style={[st.grid, !grid && { gap: spacing.lg }]}>
              {list.map((b) => {
                const shot = (b.photos ?? [])[0];
                return (
                  <Pressable
                    key={b.id}
                    style={{ width: cardW }}
                    onPress={() => router.navigate(('/business?id=' + b.id) as any)}
                  >
                    <View style={[st.shot, { width: cardW, height: grid ? cardW : cardW * 0.62 }]}>
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
                      {b.city ? '  ·  ' + ((fa && b.city_fa) || b.city) : ''}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>

      <LocalDrawer open={drawer} onClose={() => setDrawer(false)} onPick={onDrawerPick} />
    </View>
  );
}

const st = StyleSheet.create({
  dark: { flex: 1, backgroundColor: D.bg },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.2, color: D.text },

  boxes: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 7,
    paddingHorizontal: spacing.lg, paddingTop: spacing.sm,
  },
  box: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: D.hair,
    borderRadius: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  boxOn: { borderColor: 'rgba(246,241,236,0.8)', backgroundColor: 'rgba(246,241,236,0.12)' },
  boxT: { fontFamily: fonts.body, fontSize: 11.5, color: D.dim },
  boxTOn: { color: D.text },
  boxTFa: { fontFamily: fonts.persian, fontSize: 12 },
  boxN: { fontSize: 10, color: D.faint },

  resultHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md,
  },
  resultN: { fontFamily: fonts.body, fontSize: 10, letterSpacing: 2.2, color: D.dim },
  switchRow: { flexDirection: 'row', gap: spacing.md },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  shot: { borderRadius: 13, overflow: 'hidden', backgroundColor: D.raised },
  blank: { alignItems: 'center', justifyContent: 'center' },
  cardT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: D.text, marginTop: 8 },
  cardX: { fontFamily: fonts.body, fontSize: 11, color: D.dim, marginTop: 1 },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
