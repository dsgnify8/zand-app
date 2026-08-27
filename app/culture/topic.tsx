import { useEffect, useRef, useState } from 'react';
import { SaveHeart } from '@/components/save-heart';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { logEvent } from '@/lib/admin';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, fontSize, spacing } from '@/constants/zand-theme';
import { cu, CULTURE_TOPICS, CULTURE_PAGES, type CuBlock } from '@/constants/culture';
import { CultureGround } from '@/app/culture/index';
import { TaarofSim, DelMap, TypicalCards, Zurkhaneh, RicePot, Dishes, Sweets } from '@/components/culture-blocks';
import { useLang, getLang } from '@/lib/i18n';

function Rise({ children, delay = 0 }: { children: any; delay?: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 480, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  const y = a.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });
  return <Animated.View style={{ opacity: a, transform: [{ translateY: y }] }}>{children}</Animated.View>;
}

function Block({ b, accent }: { b: CuBlock; accent: string }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const tx = (o: any) => (fa && o.fa ? o.fa : o.x);
  const rtl = fa ? styles.rtl : undefined;
  switch (b.t) {
    case 'p': return <Text style={[styles.p, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>;
    case 'h': return <Text style={[styles.h, rtl, fa && (b as any).fa && styles.faHead]}>{tx(b)}</Text>;
    case 'aside': return <Text style={[styles.aside, { borderLeftColor: accent }, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>;
    case 'lead': return (
      <View style={styles.leadWrap}>
        <View style={[styles.leadRule, { backgroundColor: accent }]} />
        <Text style={[styles.lead, rtl, fa && (b as any).fa && styles.faLead]}>{tx(b)}</Text>
        <View style={[styles.leadRule, { backgroundColor: accent }]} />
      </View>
    );
    case 'mark': return (
      <View style={styles.mark}>
        <View style={[styles.markBar, { backgroundColor: accent }]} />
        <Text style={[styles.markText, rtl, fa && (b as any).fa && styles.faMark]}>{tx(b)}</Text>
      </View>
    );
    case 'phrase': return (
      <View style={[styles.phrase, { borderColor: accent + '55' }]}>
        <Text style={[styles.phFa, { color: accent }]}>{b.fa}</Text>
        <Text style={styles.phTr}>{b.tr}</Text>
        <View style={styles.phLitRow}>
          <View style={styles.phHair} />
          <Text style={styles.phLit}>{b.lit}</Text>
          <View style={styles.phHair} />
        </View>
        <Text style={[styles.phMeans, rtl, fa && (b as any).meansFa && styles.faBody]}>{fa && (b as any).meansFa ? (b as any).meansFa : b.means}</Text>
      </View>
    );
    case 'story': return (
      <View style={styles.story}>
        <View style={styles.storyHead}>
          <View style={[styles.storyDot, { backgroundColor: accent }]} />
          <Text style={[styles.storyTitle, { color: accent }, rtl]}>{fa && (b as any).titleFa ? (b as any).titleFa : b.title}</Text>
        </View>
        <Text style={[styles.storyX, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>
        <View style={[styles.storyRule, { backgroundColor: accent }]} />
        <Text style={styles.storyMoral}>{b.moral}</Text>
      </View>
    );
    case 'steps': return (
      <View style={styles.steps}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepCol}>
              <View style={[styles.stepDot, { borderColor: accent }]}>
                <Text style={[styles.stepN, { color: accent }]}>{i + 1}</Text>
              </View>
              {i < b.items.length - 1 ? <View style={styles.stepStem} /> : null}
            </View>
            <View style={styles.stepBody}>
              <Text style={[styles.stepName, rtl, fa && (it as any).nFa && styles.faHead]}>{fa && (it as any).nFa ? (it as any).nFa : it.n}</Text>
              <Text style={[styles.stepX, rtl, fa && (it as any).fa && styles.faBody]}>{fa && (it as any).fa ? (it as any).fa : it.x}</Text>
            </View>
          </View>
        ))}
      </View>
    );
    case 'close': return (
      <View style={styles.close}>
        <View style={[styles.closeRule, { backgroundColor: accent }]} />
        <Text style={[styles.closeText, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>
        <View style={[styles.closeDiamond, { backgroundColor: accent }]} />
      </View>
    );
    case 'taarofsim': return <TaarofSim />;
    case 'delmap': return <DelMap />;
    case 'cards': return <TypicalCards />;
    case 'zurkhaneh': return <Zurkhaneh />;
    case 'rice': return <RicePot />;
    case 'dishes': return <Dishes />;
    case 'sweets': return <Sweets />;
    default: return null;
  }
}

export default function CultureTopic() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { topic } = useLocalSearchParams<{ topic: string }>();

  // For the admin board: which pieces people open.
  useEffect(() => { if (topic) logEvent('culture', topic); }, [topic]);
  const t = CULTURE_TOPICS.find((x) => x.key === topic) ?? CULTURE_TOPICS[0];
  const pages = CULTURE_PAGES[t.key] ?? [];

  const scroller = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const [active, setActive] = useState(pages[0]?.key ?? '');

  const jump = (key: string) => {
    const y = sectionY.current[key];
    if (y !== undefined) scroller.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
    setActive(key);
  };

  const onScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y + 60;
    let cur = pages[0]?.key ?? '';
    for (const p of pages) {
      const py = sectionY.current[p.key];
      if (py !== undefined && py <= y) cur = p.key;
    }
    if (cur !== active) setActive(cur);
  };

  return (
    <View style={styles.root}>
      <CultureGround />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.topBar}>
          <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
            <Ionicons name="chevron-back" size={24} color={cu.text} />
          </Pressable>
          <Text style={[styles.topTitle, getLang() === 'fa' && (t as any).titleFa && { fontFamily: fonts.persian }]}>{getLang() === 'fa' && (t as any).titleFa ? (t as any).titleFa : t.title}</Text>
          <SaveHeart itemKey={'culture-' + t.key} size={19} tint={cu.text} />
        </View>

        {pages.length > 1 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.navScroll, { borderBottomColor: cu.hair }]}
            contentContainerStyle={styles.navRow}
          >
            {pages.map((p) => {
              const on = p.key === active;
              return (
                <Pressable key={p.key} onPress={() => jump(p.key)} style={styles.navTab}>
                  <Text style={[styles.navText, on && { color: cu.text }]} numberOfLines={1}>{getLang() === 'fa' && (p as any).navFa ? (p as any).navFa : p.nav}</Text>
                  <View style={[styles.navRule, on && { backgroundColor: t.accent }]} />
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null}

        <ScrollView
          ref={scroller}
          onScroll={onScroll}
          scrollEventThrottle={64}
          style={styles.scroll}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Rise>
            <View style={styles.head}>
              <LinearGradient colors={[t.accent + '26', 'transparent']} style={styles.headGlow} pointerEvents="none" />
              <Text style={[styles.watermark, { color: t.accent }]}>{t.persian}</Text>
              <View style={styles.headRow}>
                <View style={[styles.headBar, { backgroundColor: t.accent }]} />
                <Text style={[styles.headTag, { color: t.accent }]}>{t.tag}</Text>
              </View>
              <Text style={[styles.headTitle, getLang() === 'fa' && (t as any).titleFa && { fontFamily: fonts.persian, textAlign: 'right' }]}>{getLang() === 'fa' && (t as any).titleFa ? (t as any).titleFa : t.title}</Text>
            </View>
          </Rise>

          {pages.map((pg, pi) => (
            <View key={pg.key} onLayout={(e) => { sectionY.current[pg.key] = e.nativeEvent.layout.y; }}>
              <Rise delay={60 + pi * 50}>
                <View style={styles.chapter}>
                  {pg.eyebrow ? <Text style={[styles.chEyebrow, { color: t.accent }]}>{pg.eyebrow}</Text> : null}
                  <Text style={[styles.chTitle, getLang() === 'fa' && (pg as any).titleFa && { fontFamily: fonts.persian, textAlign: 'right' }]}>{getLang() === 'fa' && (pg as any).titleFa ? (pg as any).titleFa : pg.title}</Text>
                </View>
                {pg.blocks.map((b, bi) => <Block key={bi} b={b} accent={t.accent} />)}
              </Rise>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rtl: { textAlign: 'right', writingDirection: 'rtl' },
  faBody: { fontFamily: fonts.persian, fontSize: 15.5, lineHeight: 32 },
  faHead: { fontFamily: fonts.persian, fontSize: 19, lineHeight: 34 },
  faLead: { fontFamily: fonts.persian, fontSize: 18, lineHeight: 36 },
  faMark: { fontFamily: fonts.persian, fontSize: 16, lineHeight: 32 },
  root: { flex: 1, backgroundColor: cu.bg },
  safe: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: cu.text },

  navScroll: { height: 44, flexGrow: 0, flexShrink: 0, borderBottomWidth: 1 },
  navRow: { paddingLeft: spacing.lg, paddingRight: spacing.md, alignItems: 'flex-start' },
  navTab: { marginRight: 22, height: 44, justifyContent: 'space-between', paddingTop: 6 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: 12, color: cu.textDim },
  navRule: { height: 2, backgroundColor: 'transparent', borderRadius: 1 },

  scroll: { flex: 1 },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  head: { paddingTop: spacing.lg, paddingBottom: spacing.md, position: 'relative' },
  headGlow: { position: 'absolute', top: -20, left: -60, right: -60, height: 190, borderRadius: 100 },
  watermark: { position: 'absolute', right: -10, top: -14, fontFamily: fonts.persian, fontSize: 78, opacity: 0.12 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headBar: { width: 16, height: 1 },
  headTitle: { fontFamily: fonts.heading, fontSize: 38, color: cu.text, marginTop: spacing.sm },
  headRule: { width: 30, height: 1, marginVertical: spacing.md, opacity: 0.8 },
  headTag: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 2 },

  chapter: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.sm },
  chEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3 },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: cu.text, marginTop: 3, textAlign: 'center' },

  p: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: cu.text, marginTop: spacing.md, opacity: 0.93 },
  h: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: cu.text, marginTop: spacing.xl },
  aside: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: cu.textDim, fontStyle: 'italic', marginTop: spacing.md, paddingLeft: spacing.md, borderLeftWidth: 1 },

  leadWrap: { alignItems: 'center', marginVertical: spacing.xl },
  leadRule: { width: 30, height: 1, marginVertical: spacing.lg, opacity: 0.8 },
  lead: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 29, color: cu.text, textAlign: 'center', fontStyle: 'italic' },

  mark: { flexDirection: 'row', marginVertical: spacing.lg },
  markBar: { width: 3, borderRadius: 2, marginRight: spacing.md },
  markText: { flex: 1, fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: cu.text, fontStyle: 'italic' },

  phrase: { marginVertical: spacing.lg, padding: spacing.lg, borderRadius: 12, borderWidth: 1, backgroundColor: cu.surface, alignItems: 'center' },
  phFa: { fontFamily: fonts.persian, fontSize: 24 },
  phTr: { fontFamily: fonts.bodyStrong, fontSize: 12, color: cu.text, marginTop: 4 },
  phLitRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.md },
  phHair: { width: 14, height: 1, backgroundColor: cu.hair },
  phLit: { fontFamily: fonts.body, fontSize: 11, color: cu.textDim, fontStyle: 'italic' },
  phMeans: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: cu.text, textAlign: 'center', opacity: 0.9 },

  story: { marginVertical: spacing.lg, padding: spacing.lg, borderRadius: 12, borderWidth: 1, borderColor: cu.hair, backgroundColor: cu.surface },
  storyHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  storyDot: { width: 5, height: 5, transform: [{ rotate: '45deg' }] },
  storyTitle: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5 },
  storyX: { fontFamily: fonts.body, fontSize: 14, lineHeight: 24, color: cu.text, marginTop: spacing.md, opacity: 0.92 },
  storyRule: { width: 24, height: 1, opacity: 0.7, marginVertical: spacing.md },
  storyMoral: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 27, color: cu.text, fontStyle: 'italic' },

  steps: { marginVertical: spacing.lg },
  stepRow: { flexDirection: 'row', gap: spacing.md },
  stepCol: { width: 24, alignItems: 'center' },
  stepDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  stepN: { fontFamily: fonts.bodyStrong, fontSize: 10 },
  stepStem: { flex: 1, width: 1, backgroundColor: cu.hair, marginVertical: 4 },
  stepBody: { flex: 1, paddingBottom: spacing.lg },
  stepName: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: cu.text },
  stepX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 21, color: cu.textDim, marginTop: 3 },

  close: { alignItems: 'center', marginTop: spacing.xxl, paddingBottom: spacing.xl },
  closeRule: { width: 1, height: 34, opacity: 0.6 },
  closeText: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 24, color: cu.text, textAlign: 'center', marginTop: spacing.lg, fontStyle: 'italic', opacity: 0.92 },
  closeDiamond: { width: 6, height: 6, transform: [{ rotate: '45deg' }], marginTop: spacing.xl },
});
