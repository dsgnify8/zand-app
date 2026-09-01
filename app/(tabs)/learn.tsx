import { useCallback, useEffect, useRef, useState } from 'react';
import { useLevel } from '@/lib/learn-level';
import { LearnHero } from '@/components/learn-hero';
import { UNITS } from '@/constants/curriculum';
import { Animated, Easing, LayoutAnimation, Platform, Pressable, ScrollView, StyleSheet, Text, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { ALPHABET, LEARN_GROUPS, CONTINUE, LEARN_STATS, type LearnModule } from '@/constants/learn';
import { useLearnProgress } from '@/lib/learn-progress';
import { useStats } from '@/lib/stats-store';
import { STAGES } from '@/constants/journey';
import { t, useLang, getLang } from '@/lib/i18n';
import { showDemoData } from '@/lib/demo-mode';
import { useAuth } from '@/lib/auth';

import { LEARN } from '@/constants/i18n/learn';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TINTS = ['#4A6B50', '#5C7F63', '#3F5D46'];

function Rise({ children, delay = 0 }: { children: any; delay?: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 520, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  const y = a.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });
  return <Animated.View style={{ opacity: a, transform: [{ translateY: y }] }}>{children}</Animated.View>;
}

/* The colour under the page shifts as you move down it. */
function ScrollTint({ y }: { y: Animated.Value }) {
  const bands = [
    { c: '#4A6B50', at: [0, 340, 780] },
    { c: '#5C7F63', at: [340, 900, 1500] },
    { c: '#3F5D46', at: [900, 1600, 2600] },
  ];
  return (
    <View style={StyleSheet.absoluteFill as any} pointerEvents="none">
      {bands.map((b, i) => {
        const op = y.interpolate({
          inputRange: b.at as number[],
          outputRange: [0, 0.085, 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View key={i} style={[StyleSheet.absoluteFill as any, { opacity: op }]}>
            <LinearGradient
              colors={[b.c, b.c + '55', 'transparent']}
              locations={[0, 0.4, 1]}
              start={{ x: 0.9, y: 0 }}
              end={{ x: 0.1, y: 0.85 }}
              style={StyleSheet.absoluteFill as any}
            />
          </Animated.View>
        );
      })}
    </View>
  );
}

/* Mark the letters you actually know. Nobody else can do this for you. */
function AlphabetPanel({ known, toggle }: { known: string[]; toggle: (n: string) => void }) {
  const pct = Math.round((known.length / ALPHABET.length) * 100);
  return (
    <View style={s.panel}>
      <View style={s.panelHead}>
        <View style={{ flex: 1 }}>
          <Text style={s.panelT}>{known.length} of {ALPHABET.length}</Text>
          <Text style={s.panelX}>{t(LEARN.tapWhatYouRead)}</Text>
        </View>
        <Text style={s.panelPct}>{pct}%</Text>
      </View>

      <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>

      <View style={s.letters}>
        {ALPHABET.map((l) => {
          const on = known.includes(l.id);
          return (
            <Pressable key={l.id} onPress={() => toggle(l.id)} style={[s.letter, on && s.letterOn]}>
              <Text style={[s.letterFa, on && s.letterFaOn]}>{l.fa}</Text>
              <Text style={[s.letterName, on && s.letterNameOn]}>{l.name}</Text>
            </Pressable>
          );
        })}
      </View>

      {known.length === 0 ? (
        <Text style={s.panelNote}>{t(LEARN.noneMarked)}</Text>
      ) : known.length === ALPHABET.length ? (
        <Text style={s.panelNote}>{t(LEARN.allThirtyTwo)}</Text>
      ) : (
        <Text style={s.panelNote}>{ALPHABET.length - known.length} to go.</Text>
      )}
    </View>
  );
}

function ContinueCard() {
  const { asked: chosen, ready } = useLevel();
  // Unknown counts as chosen, so a returning learner never sees the card
  // flash the questionnaire for a frame before the stored answer lands.
  const asked = !ready || chosen;
  // Not chosen a level yet: this card is the way in.
  const first = UNITS[0]?.lessons[0];
  const dest = !asked
    ? '/learn/level'
    : '/learn/map';
  return (
    <Pressable style={s.cont} onPress={() => router.navigate(dest as any)}>
      <LinearGradient colors={['#E3EBE0', '#CBDAC8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
      <Text style={s.contFa}>{!asked ? 'فا' : 'زند'}</Text>
      <View style={{ flex: 1 }}>
        <Text style={s.contK}>{!asked ? 'BEGIN HERE' : 'YOUR LEARNING WORLD'}</Text>
        <Text style={s.contT}>{!asked ? t(LEARN.startPersian) : t(LEARN.enterJourney)}</Text>
        <Text style={s.contD}>{!asked ? 'find your level' : 'راه تو'}</Text>
        <Text style={s.contX}>
          {!asked
            ? t(LEARN.twoQuestions)
            : t(LEARN.lettersThenWords)}
        </Text>
      </View>
      <View style={s.contGo}><Ionicons name="arrow-forward" size={17} color="#FFF" /></View>
    </Pressable>
  );
}

function ModuleCard({ mod, i }: { mod: LearnModule; i: number }) {
  const pct = mod.total > 0 && mod.done > 0 ? Math.round((mod.done / mod.total) * 100) : 0;
  return (
    <Rise delay={40 + i * 45}>
      <Pressable style={s.mod} onPress={() => router.navigate(mod.route as any)}>
        <View style={[s.modSpine, { backgroundColor: mod.tint }]} />
        <LinearGradient colors={[mod.tint + '12', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 0.9, y: 1 }} style={StyleSheet.absoluteFill as any} pointerEvents="none" />

        <View style={s.modTop}>
          <View style={[s.modIcon, { borderColor: mod.tint, backgroundColor: mod.tint + '14' }]}>
            <Ionicons name={mod.icon as any} size={17} color={mod.tint} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.modNameRow}>
              <Text style={s.modT}>{mod.title}</Text>
              <Text style={[s.modFa, { color: mod.tint }]}>{mod.persian}</Text>
            </View>
            <Text style={s.modX}>{getLang() === 'fa' && (mod as any).xFa ? (mod as any).xFa : mod.x}</Text>
          </View>
          <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
        </View>

        <View style={s.modFoot}>
          {mod.total > 0 ? (
            <>
              <View style={s.modTrack}><View style={[s.modFill, { width: (pct + '%') as any, backgroundColor: mod.tint }]} /></View>
              <Text style={s.modCount}>{mod.done > 0 ? mod.done + ' of ' + mod.total + ' ' + mod.unit : mod.total + ' ' + mod.unit + ' waiting'}</Text>
            </>
          ) : (
            <Text style={[s.modCount, { color: mod.tint }]}>open any time</Text>
          )}
        </View>
      </Pressable>
    </Rise>
  );
}

export default function LearnScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { user: demoUser, session } = useAuth();
  const demo = showDemoData(demoUser?.email);
  // First time in: the level questionnaire is the whole screen.
  const { asked: levelAsked, ready: levelReady } = useLevel();
  useEffect(() => {
    // Wait for the stored answer. Redirecting on !levelAsked alone fired
    // before the read resolved, which is why the questionnaire came back on
    // every cold start no matter what had been picked.
    // Only for someone signed in. Signing out clears the level, and
    // without this the first thing a signed-out person sees is a
    // questionnaire about where to start learning.
    if (session && levelReady && !levelAsked) router.replace('/learn/level' as any);
  }, [session, levelReady, levelAsked]);

  const [open, setOpen] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const y = useRef(new Animated.Value(0)).current;

  // Where they were. A long route means finishing a lesson halfway down
  // and coming back to the top, hunting for your place each time.
  const scroller = useRef<any>(null);
  const lastY = useRef(0);
  useFocusEffect(
    useCallback(() => {
      if (lastY.current > 0) {
        // No animation: this is a restoration, not a movement.
        requestAnimationFrame(() => scroller.current?.scrollTo({ y: lastY.current, animated: false }));
      }
    }, []),
  );

  const toggle = (n: string) =>
    setKnown((k) => (k.includes(n) ? k.filter((x) => x !== n) : [...k, n]));

  const flip = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(260, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity));
    setOpen((v) => !v);
  };

  const { done: learnDone } = useLearnProgress();
  const learnStats = useStats();
  const allLessons = STAGES.flatMap((st) => st.steps).filter((x) => x.kind === 'lesson' && x.unit && x.lesson);
  const lessonsLeft = Math.max(0, allLessons.length - learnDone.length);

  const stats = [
    { v: String(lessonsLeft), k: 'lessons to go' },
    { v: String(learnStats.learnDays ?? 0), k: 'days learning' },
    { v: String(learnStats.stagesFinished ?? 0), k: 'chapters done' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollTint y={y} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* The scroll survives a lesson. Coming back to the top of a long
            route after finishing something halfway down means hunting for
            your place every time. */}
        <Animated.ScrollView
          ref={scroller}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y } } }],
            {
              useNativeDriver: true,
              listener: (e: any) => { lastY.current = e.nativeEvent.contentOffset.y; },
            },
          )}
          scrollEventThrottle={16}
          contentContainerStyle={s.container}
          showsVerticalScrollIndicator={false}
        >
          <Rise>
            <View style={s.head}>
              <Text style={s.watermark}>فارسی</Text>
              <View style={s.headRow}>
                <View style={s.headBar} />
                <Text style={s.headEyebrow}>{getLang() === 'fa' ? 'آموختن' : 'THE STUDY'}</Text>
              </View>
              <Text style={s.title}>Learn{'\n'}Persian</Text>
            </View>
          </Rise>

          <Rise delay={60}>
            <View style={{ marginTop: spacing.lg }}><LearnHero /></View>
          </Rise>





          {LEARN_GROUPS.map((g, gi) => (
            <View key={g.key} style={{ marginTop: spacing.xxl }}>
              <Rise delay={140 + gi * 40}>
                <View style={s.groupHead}>
                  <View style={[s.groupBar, { backgroundColor: TINTS[gi % TINTS.length] }]} />
                  <View>
                    <Text style={[s.groupL, { color: TINTS[gi % TINTS.length] }]}>{g.label}</Text>
                    <Text style={s.groupN}>{g.note}</Text>
                  </View>
                </View>
              </Rise>
              <View style={{ gap: spacing.md }}>
                {g.modules.map((mod, i) => <ModuleCard key={mod.key} mod={mod} i={i} />)}
              </View>
            </View>
          ))}

          <Rise delay={190}>
            <View style={s.statsWrap}>
              <View style={s.stats}>
                {stats.map((st, i) => (
                  <View key={st.k} style={[s.stat, i < stats.length - 1 && s.statDiv]}>
                    <Text style={s.statV}>{st.v}</Text>
                    <Text style={s.statK}>{st.k}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Rise>

          <Rise delay={200}>
            <Pressable style={s.tie} onPress={() => router.navigate('/language' as any)}>
              <Ionicons name="book-outline" size={15} color="#4A6B50" />
              <View style={{ flex: 1 }}>
                <Text style={s.tieT}>{t(LEARN.whereFrom)}</Text>
                <Text style={s.tieX}>{t(LEARN.whereFromX)}</Text>
              </View>
              <Ionicons name="arrow-forward" size={14} color="#4A6B50" />
            </Pressable>
          </Rise>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  statsWrap: { marginTop: spacing.xxl },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2.4 },

  head: { paddingTop: spacing.lg, paddingBottom: spacing.lg, position: 'relative' },
  watermark: { position: 'absolute', right: -12, top: -12, fontFamily: fonts.persian, fontSize: 86, color: '#241C19', opacity: 0.07 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headBar: { width: 18, height: 1, backgroundColor: '#B08A46' },
  headEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: '#B08A46' },
  title: { fontFamily: fonts.heading, fontSize: 42, lineHeight: 45, color: colors.textPrimary, marginTop: spacing.md },

  stats: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, paddingRight: 22 },
  statsOpen: { borderColor: '#B08A46', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  stat: { flex: 1, alignItems: 'center' },
  statDiv: { borderRightWidth: 1, borderRightColor: colors.border },
  statV: { fontFamily: fonts.heading, fontSize: 24, color: colors.textPrimary },
  statK: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 1, color: colors.textSecondary, marginTop: 1 },
  chev: { position: 'absolute', right: 8, top: 0, bottom: 0, justifyContent: 'center' },

  panel: { backgroundColor: colors.surface, borderWidth: 1, borderTopWidth: 0, borderColor: '#B08A46', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: spacing.lg },
  panelHead: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  panelT: { fontFamily: fonts.heading, fontSize: 22, color: colors.textPrimary },
  panelX: { fontFamily: fonts.body, fontSize: 11, lineHeight: 17, color: colors.textSecondary, marginTop: 1 },
  panelPct: { fontFamily: fonts.heading, fontSize: 22, color: '#B08A46' },
  track: { height: 3, borderRadius: 2, backgroundColor: colors.border, marginTop: spacing.md },
  fill: { height: 3, borderRadius: 2, backgroundColor: '#B08A46' },
  letters: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.lg, justifyContent: 'center' },
  letter: { width: 44, height: 44, borderRadius: 9, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  letterOn: { backgroundColor: 'rgba(176,138,70,0.12)', borderColor: '#B08A46' },
  letterFa: { fontFamily: fonts.persian, fontSize: 16, color: colors.textSecondary },
  letterFaOn: { color: '#B08A46' },
  letterName: { fontFamily: fonts.body, fontSize: 7, color: colors.textSecondary, opacity: 0.6 },
  letterNameOn: { color: '#B08A46', opacity: 1 },
  panelNote: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg, fontStyle: 'italic' },

  cont: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderRadius: 14, overflow: 'hidden' },
  contFa: { fontFamily: fonts.persian, fontSize: 46, color: 'rgba(36,28,25,0.55)' },
  contK: { fontFamily: fonts.bodyStrong, fontSize: 7.5, letterSpacing: 1.5, color: 'rgba(36,28,25,0.6)' },
  contT: { fontFamily: fonts.heading, fontSize: 23, color: '#241C19', marginTop: 1 },
  contD: { fontFamily: fonts.bodyStrong, fontSize: 11, color: 'rgba(36,28,25,0.75)' },
  contX: { fontFamily: fonts.body, fontSize: 10.5, color: 'rgba(36,28,25,0.6)', marginTop: 2, fontStyle: 'italic' },
  contGo: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#241C19', alignItems: 'center', justifyContent: 'center' },

  groupHead: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  groupBar: { width: 3, borderRadius: 2 },
  groupL: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3 },
  groupN: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2, fontStyle: 'italic' },

  mod: { backgroundColor: colors.surface, borderRadius: 13, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, paddingLeft: spacing.xl, overflow: 'hidden' },
  modSpine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3 },
  modTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  modIcon: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  modNameRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  modT: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary },
  modFa: { fontFamily: fonts.persian, fontSize: 13 },
  modX: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: colors.textSecondary, marginTop: 2 },
  modFoot: { marginTop: spacing.md },
  modTrack: { height: 3, borderRadius: 2, backgroundColor: colors.border },
  modFill: { height: 3, borderRadius: 2 },
  modCount: { fontFamily: fonts.bodyStrong, fontSize: 9.5, color: colors.textSecondary, marginTop: 5 },

  tie: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.xxl, padding: spacing.lg, borderRadius: 12, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  tieT: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  tieX: { fontFamily: fonts.body, fontSize: 10.5, color: colors.textSecondary },
});
