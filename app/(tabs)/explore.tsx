// Explore.
//
// Everything the app knows, on one page. Six worlds, each a large card,
// and History carries a live preview: its timeline scrolls inside the
// card, so the section shows what it is rather than describing it.
//
// The header has a ball hopping across the letters. It loops, fades out
// as you scroll past it, and comes back when you return — and the
// animation stops entirely while hidden, because a loop nobody can see
// is only a battery cost.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated, Dimensions, Easing, Image, Pressable, ScrollView,
  StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useLang, t as tr, getLang } from '@/lib/i18n';
import { SECTIONS } from '@/constants/i18n/sections';
import { eduImage } from '@/constants/education-images';
import { TOPICS as HISTORY_TOPICS } from '@/constants/education';
import { AUTHORS } from '@/constants/literature';
import { CULTURE_TOPICS } from '@/constants/culture';
import { IranProvinceMap } from '@/components/iran-province-map';
import { ZandHeader } from '@/components/zand-header';
import { HistoryChapters } from '@/components/history-chapters';
import { TraditionsPanels, LanguageScripts } from '@/components/explore-sections';
import { LanguageBorrowed } from '@/components/explore-lit-lang';
import { PoetDeck } from '@/components/poet-deck';
import { CultureQuote } from '@/components/culture-quote';
import { TopicsRail } from '@/components/topics-rail';
import { TraditionsWheel } from '@/components/traditions-wheel';
import { LanguageCard } from '@/components/language-card';

import { EXPLORE } from '@/constants/i18n/explore';
const { width: W } = Dimensions.get('window');
const CARD_W = W - spacing.lg * 2;

/* ---------------- the hopping ball ---------------- */

const WORD = 'Explore'.split('');

function BouncingTitle({ visible }: { visible: Animated.Value }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  // One value drives the whole loop; each letter reads its own slice of
  // it. Cheaper than seven animations and keeps the hops evenly spaced.
  const t = useRef(new Animated.Value(0)).current;
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const loop = Animated.loop(
      Animated.timing(t, {
        toValue: WORD.length,
        duration: WORD.length * 380,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [running]);

  // stop the loop once the header is out of sight
  useEffect(() => {
    const id = visible.addListener(({ value }) => setRunning(value > 0.05));
    return () => visible.removeListener(id);
  }, []);

  return (
    <Animated.View style={[s.titleWrap, { opacity: visible }]}>
      <View style={s.letters}>
        {WORD.map((ch, i) => {
          // the ball is above this letter while t is within its slot
          const ballY = t.interpolate({
            inputRange: [i - 0.5, i, i + 0.5, i + 1],
            outputRange: [0, -18, 0, 0],
            extrapolate: 'clamp',
          });
          const ballO = t.interpolate({
            inputRange: [i - 0.5, i - 0.25, i + 0.25, i + 0.5],
            outputRange: [0, 1, 1, 0],
            extrapolate: 'clamp',
          });
          // and the letter itself gives a little under the weight
          const dip = t.interpolate({
            inputRange: [i - 0.15, i, i + 0.15],
            outputRange: [0, 2, 0],
            extrapolate: 'clamp',
          });

          // a shallow arc, so the word sits on a curve rather than a line
          const mid = (WORD.length - 1) / 2;
          const lift = -Math.pow((i - mid) / mid, 2) * 6 + 6;

          return (
            <View key={i} style={{ alignItems: 'center', marginTop: lift }}>
              <Animated.View
                style={[s.ball, { opacity: ballO, transform: [{ translateY: ballY }] }]}
              />
              <Animated.Text style={[s.letter, { transform: [{ translateY: dip }] }]}>
                {ch}
              </Animated.Text>
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
}

/* ---------------- the live preview ---------------- */

// History shows its own timeline, scrolling inside the card. A section
// that demonstrates itself is more persuasive than one that describes
// itself, and this is the test of whether that holds up.

/* ---------------- the worlds ---------------- */

type World = {
  key: string;
  title: string;
  titleT: any;
  persian: string;
  blurb: string;
  image: string;
  route: string;
  tint: string;
  preview?: 'history' | 'poets' | 'culture';
};

const WORLDS: World[] = [
  { key: 'culture', title: 'Culture', titleT: SECTIONS.culture, persian: 'فرهنگ',
    blurb: 'Taarof, the table, and the rules nobody explains.',
    image: 'zand-vakil-bazaar', route: '/culture', tint: '#3E6E78', preview: 'culture' },
];

function PoetsStrip() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.stripInner} style={s.strip}>
      {(AUTHORS as any[]).map((a) => (
        <Pressable
          key={a.key}
          style={s.poet}
          onPress={() => router.navigate(('/literature/reader?author=' + a.key + '&page=0') as any)}
        >
          <Text style={s.poetFa}>{a.persian ?? a.nameFa ?? ''}</Text>
          <Text style={s.poetName} numberOfLines={1}>{a.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function CultureStrip() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.stripInner} style={s.strip}>
      {(CULTURE_TOPICS as any[]).slice(0, 8).map((c) => (
        <Pressable
          key={c.key}
          style={s.chip}
          onPress={() => router.navigate(('/culture/topic?topic=' + c.key) as any)}
        >
          <Text style={s.chipFa}>{c.persian ?? ''}</Text>
          <Text style={s.chipT} numberOfLines={1}>{c.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function Rise({ children, index }: { children: any; index: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const rise = useRef(new Animated.Value(22)).current;
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(rise, { toValue: 0, duration: 520, delay: 90 + index * 80, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 520, delay: 90 + index * 80, useNativeDriver: true }),
    ]).start();
  }, []);
  return <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>{children}</Animated.View>;
}

function WorldCard({ w, index, fa }: { w: World; index: number; fa: boolean }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const rise = useRef(new Animated.Value(22)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rise, { toValue: 0, duration: 520, delay: 90 + index * 80, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 520, delay: 90 + index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  const src = eduImage(w.image);

  return (
    <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>
      <Pressable style={s.card} onPress={() => router.navigate(w.route as any)}>
        <View style={s.cover}>
          {src ? <Image source={src} style={StyleSheet.absoluteFill as any} resizeMode="cover" /> : null}
          <LinearGradient
            colors={['rgba(18,14,11,0.15)', 'rgba(18,14,11,0.55)', 'rgba(18,14,11,0.92)']}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill as any}
          />
          <View style={s.coverBody}>
            <Text style={s.cardFa}>{w.persian}</Text>
            <Text style={[s.cardT, fa && s.cardTFa]}>{tr(w.titleT)}</Text>
            <Text style={s.cardX} numberOfLines={2}>{w.blurb}</Text>
          </View>
          <View style={[s.badge, { backgroundColor: w.tint }]} />
        </View>

        
        {w.preview === 'poets' ? <PoetsStrip /> : null}
        {w.preview === 'culture' ? <CultureStrip /> : null}
      </Pressable>
    </Animated.View>
  );
}

/* ---------------- the page ---------------- */

export default function Explore() {
  // Subscribe to the language. Without this the screen only re-renders
  // when something else pushes it, so a switch made elsewhere does not
  // reach it until you navigate away and back.
  useLang();
  const fa = getLang() === 'fa';
  const y = useRef(new Animated.Value(0)).current;

  // the header fades over the first 90pt and comes back on the way up
  const headOpacity = y.interpolate({
    inputRange: [0, 90],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
        {/* The history spine runs up the page, breaks at the wordmark,
            and carries on above it. 38 = the page's own padding plus the
            spine's offset within the chapters. */}
        {/* The spine belongs to the history section, so it leaves the
            header once that section has scrolled past. Fading over 420pt
            rather than cutting, so it retreats rather than blinking. */}
        <ZandHeader
          spine={{
            x: 42,
            colour: 'rgba(140,58,46,0.3)',
            // On where the timeline runs vertically, off where it turns
            // and runs across. The header's segment is the same line, so
            // it should be present exactly when the line is.
            // On through the first chapter, then in step with the
            // illustration's own turns: off where the line runs across,
            // on where it runs down. The last stretch after the modern
            // age brings it back and it stays.
            // The header's segment is the top of the same run the
            // chapters draw. It belongs on screen while that run is, and
            // the run ends where the first chapter begins — so one fade,
            // not a rhythm. Trying to match the illustration's turns was
            // guessing at geometry the component already knows.
            // One fade, at the first turn. The header's segment is the
            // top of the chapters' own run and it belongs on screen while
            // that run is — bringing it back at later turns made the line
            // flicker rather than travel.
            opacity: y.interpolate({
              inputRange: [0, 260, 340],
              outputRange: [1, 1, 0],
              extrapolate: 'clamp',
            }),
          }}
        />

      <Animated.ScrollView
        contentContainerStyle={s.body}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true })}
      >
        <View style={s.header} pointerEvents="box-none">
          <BouncingTitle visible={headOpacity as any} />
          <Animated.Text style={[s.kicker, { opacity: headOpacity }]}>
            {fa ? 'هر چیزی که اینجا هست' : 'EVERYTHING WE HAVE'}
          </Animated.Text>

          <TopicsRail />
        </View>

        {/* History: a road down the page rather than a card to open. */}
        <Rise index={0}>
          <HistoryChapters />
        </Rise>

        {/* Geography: the map itself, on the page. */}
        <View style={{ height: spacing.xxl }} />
        <Rise index={1}>
          <Pressable onPress={() => router.navigate('/geography' as any)}>
            <View style={s.headRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.sectionFa}>جغرافیا</Text>
                <Text style={s.sectionT}>{tr(SECTIONS.geography)}</Text>
              </View>
              <View style={s.moreRowTop}>
                <Text style={s.moreT}>{tr(EXPLORE.geoInFull)}</Text>
                <Ionicons name="arrow-forward" size={13} color={colors.accent} />
              </View>
            </View>
            <Text style={s.sectionX}>{tr(EXPLORE.geoBlurb)}</Text>
          </Pressable>
          <View style={s.mapWrap}>
            <IranProvinceMap />
          </View>
        </Rise>

        <View style={{ height: spacing.xxl }} />
        <Rise index={2}>
          <PoetDeck />
        </Rise>

        <Rise index={3}>
          <CultureQuote />
        </Rise>

        <Rise index={5}>
          <TraditionsWheel />
        </Rise>

        <Rise index={6}>
          <LanguageCard />
        </Rise>


        <Text style={s.foot}>
          {fa ? 'همه‌اش همین‌جاست. بی‌عجله بخوان.' : 'All of it is here. Take your time.'}
        </Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: { alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.xs, zIndex: 2 },
  titleWrap: { alignItems: 'center' },
  letters: { flexDirection: 'row', alignItems: 'flex-end' },
  letter: { fontFamily: fonts.display, fontSize: 40, lineHeight: 46, color: colors.textPrimary, letterSpacing: 0.5 },
  ball: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent, marginBottom: 2 },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 3, color: colors.textSecondary, marginTop: 2 },

  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxl * 2, gap: spacing.lg },

  sectionHead: { marginBottom: spacing.md },
  sectionFa: { fontFamily: fonts.persian, fontSize: 15, color: colors.accent },
  sectionT: { fontFamily: fonts.display, fontSize: 26, lineHeight: 31, color: colors.textPrimary, marginTop: 1 },
  sectionX: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 3 },


  mapWrap: { marginHorizontal: -spacing.sm },

  headRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md, marginBottom: 2 },
  moreRowTop: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingBottom: 4 },
  moreRow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', marginTop: spacing.md },
  moreT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.accent },

  card: { borderRadius: 20, overflow: 'hidden', backgroundColor: colors.surface },
  cover: { width: CARD_W, height: 240, justifyContent: 'flex-end' },
  coverBody: { padding: spacing.lg },
  cardFa: { fontFamily: fonts.persian, fontSize: 15, color: 'rgba(255,255,255,0.72)', marginBottom: 2 },
  cardT: { fontFamily: fonts.display, fontSize: 27, lineHeight: 32, color: '#FFF' },
  cardTFa: { fontFamily: fonts.persian, fontSize: 22, lineHeight: 40, textAlign: 'right' },
  cardX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  badge: { position: 'absolute', top: 0, left: 0, width: 4, height: 54, borderBottomRightRadius: 3 },

  strip: { backgroundColor: '#1A1512' },
  stripInner: { paddingHorizontal: spacing.md, paddingVertical: spacing.md, gap: spacing.lg },

  tick: { width: 108 },
  tickDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent, marginBottom: 7 },
  tickLine: { position: 'absolute', top: 3, left: 7, width: 108, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  tickYear: { fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.3 },
  tickName: { fontFamily: fonts.bodyStrong, fontSize: 12, lineHeight: 16, color: '#FFF', marginTop: 2 },

  poet: { width: 84, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 4 },
  poetFa: { fontFamily: fonts.persian, fontSize: 19, color: '#FFF' },
  poetName: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 3 },

  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  chipFa: { fontFamily: fonts.persian, fontSize: 14, color: '#FFF' },
  chipT: { fontFamily: fonts.body, fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginTop: 1 },

  foot: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg, opacity: 0.8 },
});
