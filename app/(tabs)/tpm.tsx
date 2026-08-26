import { useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { tpm } from '@/constants/tpm-theme';
import { TPM_POSTS, TPM_CREATIVES, type TpmPost } from '@/constants/tpm-content';
import { FramedImage } from '@/components/framed-image';
import { eduImage } from '@/constants/education-images';
import { TpmMark } from '@/components/tpm-mark';
import { readCount, resetTpm } from '@/lib/tpm-access';
import { useIsAdmin } from '@/lib/admin';
import { useLang, getLang } from '@/lib/i18n';

const W = Dimensions.get('window').width;

/**
 * What the magazine actually covers.
 *
 * The old filters were portrait/studio/feature/archive, which describe how
 * a piece was filed rather than what it is about. Nobody browsing wants
 * "features"; they want music, or film, or food.
 *
 * Built from the posts, so a new discipline appears on its own.
 */
const FILTERS = [
  { key: 'all', label: 'Everything' },
  ...Array.from(new Set(TPM_POSTS.map((p) => p.discipline)))
    .sort()
    .map((d) => ({ key: d, label: d })),
];

function Rise({ children, delay = 0 }: { children: any; delay?: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const a = useRef(new Animated.Value(0)).current;
  Animated.timing(a, { toValue: 1, duration: 460, delay, useNativeDriver: true }).start();
  const y = a.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });
  return <Animated.View style={{ opacity: a, transform: [{ translateY: y }] }}>{children}</Animated.View>;
}

/* A full-bleed post: the image is the whole thing, text sits under it. */
function BigPost({ p }: { p: TpmPost }) {
  return (
    <Pressable style={s.big} onPress={() => router.navigate(('/tpm/post?post=' + p.key) as any)}>
      <View style={s.bigImg}>
        <FramedImage name={p.cover} source={eduImage(p.cover)} style={StyleSheet.absoluteFill as any} />
      </View>
      <View style={s.bigBody}>
        <Text style={s.kicker}>{p.discipline.toUpperCase()}</Text>
        <Text style={s.bigTitle}>{p.title}</Text>
        <Text style={s.stand}>{p.standfirst}</Text>
      </View>
    </Pressable>
  );
}

/* Two side by side, square, the way a feed reads. */
function PairPost({ items }: { items: TpmPost[] }) {
  return (
    <View style={s.pair}>
      {items.map((p) => (
        <Pressable key={p.key} style={s.pairItem} onPress={() => router.navigate(('/tpm/post?post=' + p.key) as any)}>
          <View style={s.pairImg}>
            <FramedImage name={p.cover} source={eduImage(p.cover)} style={StyleSheet.absoluteFill as any} />
          </View>
          <Text style={s.pairKicker}>{p.discipline.toUpperCase()}</Text>
          <Text style={s.pairTitle} numberOfLines={2}>{p.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

/* A wide editorial band, image left, text right. */
function BandPost({ p }: { p: TpmPost }) {
  return (
    <Pressable style={s.band} onPress={() => router.navigate(('/tpm/post?post=' + p.key) as any)}>
      <View style={s.bandImg}>
        <FramedImage name={p.cover} source={eduImage(p.cover)} style={StyleSheet.absoluteFill as any} />
      </View>
      <View style={s.bandBody}>
        <Text style={s.kicker}>{p.discipline.toUpperCase()}</Text>
        <Text style={s.bandTitle}>{p.title}</Text>
        <Text style={s.bandMins}>{p.minutes} min</Text>
      </View>
    </Pressable>
  );
}

export default function TpmScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [filter, setFilter] = useState('all');
  const read = readCount();
  const isAdmin = useIsAdmin();

  const posts = filter === 'all' ? TPM_POSTS : TPM_POSTS.filter((p) => p.discipline === filter);

  // lay the feed out in a repeating rhythm: big, pair, band, pair
  const rows: { kind: 'big' | 'pair' | 'band'; items: TpmPost[] }[] = [];
  let i = 0;
  let beat = 0;
  while (i < posts.length) {
    const shape = beat % 4;
    if (shape === 0 || shape === 2) {
      rows.push({ kind: shape === 0 ? 'big' : 'band', items: [posts[i]] });
      i += 1;
    } else {
      const two = posts.slice(i, i + 2);
      rows.push({ kind: 'pair', items: two });
      i += two.length;
    }
    beat += 1;
  }

  return (
    <View style={{ flex: 1, backgroundColor: tpm.paper }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={s.head}>
          <TpmMark size={56} />
          <View style={{ width: 20 }} />
        </View>

        <View style={s.rule} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
          <Rise>
            <View style={s.intro}>
              <Text style={s.introT}>Curated{'\n'}by TPM</Text>
              <Text style={s.introX}>
                The people making things, and the rooms they make them in. Published by The Persian Mag.
              </Text>
            </View>
          </Rise>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filters}>
            {FILTERS.map((f) => (
              <Pressable key={f.key} style={[s.filter, filter === f.key && s.filterOn]} onPress={() => setFilter(f.key)}>
                <Text style={[s.filterT, filter === f.key && s.filterTOn]}>{f.label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {rows.map((row, ri) => (
            <Rise key={row.items[0].key} delay={Math.min(60 + ri * 40, 260)}>
              {row.kind === 'big' ? <BigPost p={row.items[0]} />
                : row.kind === 'band' ? <BandPost p={row.items[0]} />
                : <PairPost items={row.items} />}
            </Rise>
          ))}

          {/* The people, as a rail — hidden until there are real ones.
              A heading over an empty rail says the section is broken; no
              heading says the section has not started. */}
          {TPM_CREATIVES.length > 0 ? <>
          <View style={s.creativesHead}>
            <View style={s.hairRule} />
            <Text style={s.creativesL}>{getLang() === 'fa' ? 'آدم‌ها' : 'THE PEOPLE'}</Text>
            <View style={s.hairRule} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.rail}>
            {TPM_CREATIVES.map((c) => (
              <View key={c.key} style={s.person}>
                <View style={s.personImg}>
                  <FramedImage name={c.image} source={eduImage(c.image)} style={StyleSheet.absoluteFill as any} />
                </View>
                <Text style={s.personName}>{c.name}</Text>
                <Text style={s.personX}>{c.discipline}  ·  {c.city}</Text>
              </View>
            ))}
          </ScrollView>
          </> : null}

          <View style={s.foot}>
            <TpmMark size={14} />
            <Text style={s.footT}>THE PERSIAN MAG</Text>
            {read > 0 ? <Text style={s.footRead}>{read} read</Text> : null}
            {isAdmin ? (
              <Pressable hitSlop={10} onPress={() => resetTpm()}>
                <Text style={s.footReset}>reset demo</Text>
              </Pressable>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 2, paddingRight: spacing.lg, paddingVertical: spacing.sm },
  rule: { height: 2, backgroundColor: tpm.ink },

  intro: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.lg },
  introT: { fontFamily: fonts.bodyStrong, fontSize: 38, lineHeight: 42, letterSpacing: -1, color: tpm.ink },
  introX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: tpm.inkSoft, marginTop: spacing.md, maxWidth: 300 },

  filters: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: spacing.lg },
  filter: { borderWidth: 1, borderColor: tpm.hair, paddingVertical: 7, paddingHorizontal: spacing.md },
  filterOn: { backgroundColor: tpm.ink, borderColor: tpm.ink },
  filterT: { fontFamily: fonts.body, fontSize: 12.5, color: tpm.inkSoft },
  filterTOn: { color: tpm.paper },

  big: { marginBottom: spacing.xxl },
  bigImg: { width: W, height: W * 1.15, backgroundColor: tpm.paperAlt },
  bigBody: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: tpm.red },
  bigTitle: { fontFamily: fonts.bodyStrong, fontSize: 24, lineHeight: 29, letterSpacing: -0.4, color: tpm.ink, marginTop: 6 },
  stand: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: tpm.inkSoft, marginTop: 6 },

  pair: { flexDirection: 'row', gap: 2, marginBottom: spacing.xxl },
  pairItem: { flex: 1 },
  pairImg: { width: '100%', aspectRatio: 1, backgroundColor: tpm.paperAlt },
  pairKicker: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 1.6, color: tpm.red, marginTop: spacing.sm, paddingHorizontal: spacing.sm },
  pairTitle: { fontFamily: fonts.bodyStrong, fontSize: 14, lineHeight: 18, color: tpm.ink, marginTop: 3, paddingHorizontal: spacing.sm },

  band: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.xxl },
  bandImg: { width: 128, height: 160, backgroundColor: tpm.paperAlt },
  bandBody: { flex: 1, justifyContent: 'center' },
  bandTitle: { fontFamily: fonts.bodyStrong, fontSize: 19, lineHeight: 24, color: tpm.ink, marginTop: 5 },
  bandMins: { fontFamily: fonts.body, fontSize: 11.5, color: tpm.muted, marginTop: 8 },

  creativesHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  hairRule: { flex: 1, height: 1, backgroundColor: tpm.hair },
  creativesL: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2.4, color: tpm.ink },

  rail: { paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  person: { width: 132 },
  personImg: { width: 132, height: 168, backgroundColor: tpm.paperAlt },
  personName: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: tpm.ink, marginTop: spacing.sm },
  personX: { fontFamily: fonts.body, fontSize: 11, color: tpm.muted, marginTop: 2 },

  foot: { alignItems: 'center', gap: 6, paddingTop: spacing.xl, borderTopWidth: 1, borderTopColor: tpm.hair, marginHorizontal: spacing.lg },
  footT: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 2.5, color: tpm.faint },
  footReset: { fontFamily: fonts.body, fontSize: 10.5, color: tpm.red, marginTop: 4 },
  footRead: { fontFamily: fonts.body, fontSize: 10.5, color: tpm.faint },
});
