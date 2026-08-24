import { useEffect, useRef, useState } from 'react';
import { getLang, t, useLang } from '@/lib/i18n';
import { PAGES } from '@/constants/i18n/pages';
import { SaveHeart } from '@/components/save-heart';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lang, LANG_CHAPTERS, type LangBlock } from '@/constants/language';

function FadeIn({ children, delay = 0 }: { children: any; delay?: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(12)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 420, delay, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 420, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>{children}</Animated.View>;
}

function Block({ b }: { b: LangBlock }) {
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
    case 'aside': return <Text style={[styles.aside, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>;
    case 'lead': return (
      <View style={styles.leadWrap}>
        <View style={styles.leadRule} />
        <Text style={[styles.lead, rtl, fa && (b as any).fa && styles.faLead]}>{tx(b)}</Text>
        <View style={styles.leadRule} />
      </View>
    );
    case 'mark': return (
      <View style={styles.mark}>
        <View style={styles.markBar} />
        <Text style={[styles.markText, rtl, fa && (b as any).fa && styles.faMark]}>{tx(b)}</Text>
      </View>
    );
    case 'cognates': return (
      <View style={styles.cog}>
        {b.items.map((it, i) => (
          <View key={i} style={[styles.cogRow, i === b.items.length - 1 && { borderBottomWidth: 0 }]}>
            <Text style={styles.cogFa}>{it.fa}</Text>
            <Text style={styles.cogTr}>{it.tr}</Text>
            <View style={styles.cogLine} />
            <Text style={styles.cogEn}>{it.en}</Text>
          </View>
        ))}
      </View>
    );
    case 'tree': return (
      <View style={styles.tree}>
        <Text style={styles.treeRoot}>one language, long ago</Text>
        <View style={styles.treeStem} />
        <View style={styles.treeBar} />
        <View style={styles.treeCols}>
          {['English', 'Greek', 'Latin', 'Hindi', 'Persian'].map((n) => (
            <View key={n} style={styles.treeCol}>
              <View style={styles.treeDrop} />
              <Text style={[styles.treeLeaf, n === 'Persian' && styles.treeLeafOn]}>{n}</Text>
            </View>
          ))}
        </View>
      </View>
    );
    case 'era': return (
      <View style={styles.era}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.eraItem}>
            <View style={styles.eraDotCol}>
              <View style={styles.eraDot} />
              {i < b.items.length - 1 ? <View style={styles.eraStem} /> : null}
            </View>
            <View style={styles.eraBody}>
              <Text style={[styles.eraAge, rtl]}>{fa && (it as any).ageFa ? (it as any).ageFa : it.age}</Text>
              <Text style={[styles.eraScript, rtl]}>{fa && (it as any).scriptFa ? (it as any).scriptFa : it.script}</Text>
              <Text style={[styles.eraNote, rtl, fa && (it as any).noteFa && styles.faBody]}>{fa && (it as any).noteFa ? (it as any).noteFa : it.note}</Text>
            </View>
          </View>
        ))}
      </View>
    );
    case 'loans': return (
      <View style={styles.loans}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.loanRow}>
            <View style={styles.loanHead}>
              <Text style={styles.loanEn}>{it.en}</Text>
              <Ionicons name="arrow-back" size={12} color={lang.accent} />
              <Text style={styles.loanFrom}>{fa && (it as any).fromFa ? (it as any).fromFa : it.from}</Text>
            </View>
            <Text style={[styles.loanNote, rtl, fa && (it as any).noteFa && styles.faBody]}>{fa && (it as any).noteFa ? (it as any).noteFa : it.note}</Text>
          </View>
        ))}
      </View>
    );
    case 'split': return (
      <View style={styles.split}>
        <View style={styles.splitCol}>
          <Text style={[styles.splitTitle, rtl]}>{fa && (b.left as any).titleFa ? (b.left as any).titleFa : b.left.title}</Text>
          <View style={styles.splitRule} />
          <Text style={[styles.splitText, rtl, fa && (b.left as any).fa && styles.faBody]}>{fa && (b.left as any).fa ? (b.left as any).fa : b.left.x}</Text>
        </View>
        <View style={styles.splitCol}>
          <Text style={[styles.splitTitle, rtl]}>{fa && (b.right as any).titleFa ? (b.right as any).titleFa : b.right.title}</Text>
          <View style={styles.splitRule} />
          <Text style={[styles.splitText, rtl, fa && (b.right as any).fa && styles.faBody]}>{fa && (b.right as any).fa ? (b.right as any).fa : b.right.x}</Text>
        </View>
      </View>
    );
    case 'learncta': return (
      <Pressable style={styles.cta} onPress={() => router.replace('/(tabs)/learn' as any)}>
        <Text style={styles.ctaGlyph}>ا ب پ</Text>
        <Text style={styles.ctaTitle}>{getLang() === 'fa' ? 'فارسی بیاموز' : 'Learn Farsi'}</Text>
        <Text style={styles.ctaSub}>{getLang() === 'fa' ? 'از الفبا تا گفت‌وگوی واقعی؛ قدم به قدم.' : 'From the alphabet to real conversation, step by step.'}</Text>
        <View style={styles.ctaBtn}>
          <Text style={styles.ctaBtnText}>{getLang() === 'fa' ? 'شروع' : 'BEGIN'}</Text>
          <Ionicons name="arrow-forward" size={14} color={lang.bg} />
        </View>
      </Pressable>
    );
    case 'close': return (
      <View style={styles.close}>
        <View style={styles.closeRule} />
        <Text style={styles.closeGlyph}>{b.glyph}</Text>
        <Text style={[styles.closeText, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>
      </View>
    );
    default: return null;
  }
}

export default function LanguageScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const scroller = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const [active, setActive] = useState(LANG_CHAPTERS[0].key);

  const jump = (key: string) => {
    const y = sectionY.current[key];
    if (y !== undefined) scroller.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
    setActive(key);
  };

  const onScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y + 60;
    let cur = LANG_CHAPTERS[0].key;
    for (const c of LANG_CHAPTERS) {
      const cy = sectionY.current[c.key];
      if (cy !== undefined && cy <= y) cur = c.key;
    }
    if (cur !== active) setActive(cur);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={24} color={lang.text} />
        </Pressable>
        <Text style={styles.topTitle}>{t(PAGES.language)}</Text>
        <SaveHeart itemKey="section-language" size={19} tint={lang.text} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.navScroll}
        contentContainerStyle={styles.navRow}
      >
        {LANG_CHAPTERS.map((c) => {
          const on = c.key === active;
          return (
            <Pressable key={c.key} onPress={() => jump(c.key)} style={styles.navTab}>
              <Text style={[styles.navText, on && styles.navTextOn]} numberOfLines={1}>{c.nav}</Text>
              <View style={[styles.navRule, on && styles.navRuleOn]} />
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        ref={scroller}
        onScroll={onScroll}
        scrollEventThrottle={64}
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn>
          <View style={styles.head}>
            <Text style={styles.glyph}>فارسی</Text>
            <Text style={styles.title}>{t(PAGES.langHead)}</Text>
            <Text style={styles.sub}>Where Persian came from, and how it survived.</Text>
          </View>
        </FadeIn>

        {LANG_CHAPTERS.map((c, ci) => (
          <View key={c.key} onLayout={(e) => { sectionY.current[c.key] = e.nativeEvent.layout.y; }}>
            <FadeIn delay={60 + ci * 50}>
              <View style={styles.chapter}>
                <View style={styles.chDiamond} />
                {c.subtitle ? <Text style={styles.chEyebrow}>{getLang() === 'fa' && (c as any).subtitleFa ? (c as any).subtitleFa : c.subtitle}</Text> : null}
                <Text style={[styles.chTitle, getLang() === 'fa' && (c as any).titleFa && { fontFamily: fonts.persian, textAlign: 'right' }]}>{getLang() === 'fa' && (c as any).titleFa ? (c as any).titleFa : c.title}</Text>
              </View>
              {c.pages.map((pg, pi) => (
                <View key={pi} style={styles.page}>
                  {pg.blocks.map((b, bi) => <Block key={bi} b={b} />)}
                </View>
              ))}
            </FadeIn>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rtl: { textAlign: 'right', writingDirection: 'rtl' },
  faBody: { fontFamily: fonts.persian, fontSize: 15.5, lineHeight: 32 },
  faHead: { fontFamily: fonts.persian, fontSize: 19, lineHeight: 34 },
  faLead: { fontFamily: fonts.persian, fontSize: 18, lineHeight: 36 },
  faMark: { fontFamily: fonts.persian, fontSize: 16, lineHeight: 32 },
  safe: { flex: 1, backgroundColor: lang.bg },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lang.text },

  navScroll: { height: 44, flexGrow: 0, flexShrink: 0, borderBottomWidth: 1, borderBottomColor: lang.hair },
  navRow: { paddingLeft: spacing.lg, paddingRight: spacing.md, alignItems: 'flex-start' },
  navTab: { marginRight: 22, height: 44, justifyContent: 'space-between', paddingTop: 6 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: 12, color: lang.textDim },
  navTextOn: { color: lang.text },
  navRule: { height: 2, backgroundColor: 'transparent', borderRadius: 1 },
  navRuleOn: { backgroundColor: lang.gold },

  scroll: { flex: 1 },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  head: { alignItems: 'center', marginTop: spacing.md },
  glyph: { fontFamily: fonts.persian, fontSize: 42, color: lang.gold },
  title: { fontFamily: fonts.heading, fontSize: 32, color: lang.text, marginTop: spacing.xs },
  sub: { fontFamily: fonts.body, fontSize: 13, color: lang.textDim, marginTop: spacing.xs, textAlign: 'center' },

  chapter: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.sm },
  chDiamond: { width: 9, height: 9, backgroundColor: lang.accent, transform: [{ rotate: '45deg' }], marginBottom: spacing.md },
  chEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 3, color: lang.gold },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: lang.text, marginTop: 2, textAlign: 'center' },
  page: { marginTop: spacing.sm },

  p: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: lang.text, marginTop: spacing.md, opacity: 0.92 },
  h: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: lang.text, marginTop: spacing.xl },
  aside: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: lang.textDim, fontStyle: 'italic', marginTop: spacing.md, paddingLeft: spacing.md, borderLeftWidth: 1, borderLeftColor: lang.hair },

  leadWrap: { alignItems: 'center', marginVertical: spacing.xl, backgroundColor: lang.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  leadRule: { width: 40, height: 2, backgroundColor: lang.gold, marginVertical: spacing.lg },
  lead: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: lang.text, textAlign: 'center', fontStyle: 'italic' },

  mark: { flexDirection: 'row', marginVertical: spacing.lg },
  markBar: { width: 3, borderRadius: 2, backgroundColor: lang.accent, marginRight: spacing.md },
  markText: { flex: 1, fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: lang.text, fontStyle: 'italic' },

  cog: { marginVertical: spacing.lg, backgroundColor: lang.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg },
  cogRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lang.hair },
  cogFa: { fontFamily: fonts.persian, fontSize: 19, color: lang.gold, width: 62 },
  cogTr: { fontFamily: fonts.bodyStrong, fontSize: 13, color: lang.text, width: 74 },
  cogLine: { flex: 1, height: 1, backgroundColor: lang.hair, marginHorizontal: spacing.sm },
  cogEn: { fontFamily: fonts.body, fontSize: 13, color: lang.textDim, textAlign: 'right', minWidth: 62 },

  tree: { alignItems: 'center', marginVertical: spacing.xl },
  treeRoot: { fontFamily: fonts.body, fontSize: 11, color: lang.textDim, fontStyle: 'italic' },
  treeStem: { width: 1, height: 22, backgroundColor: lang.hair },
  treeBar: { width: '86%', height: 1, backgroundColor: lang.hair },
  treeCols: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  treeCol: { alignItems: 'center', flex: 1 },
  treeDrop: { width: 1, height: 16, backgroundColor: lang.hair },
  treeLeaf: { fontFamily: fonts.body, fontSize: 10, color: lang.textDim, marginTop: 4 },
  treeLeafOn: { fontFamily: fonts.bodyStrong, color: lang.gold },

  era: { marginVertical: spacing.lg },
  eraItem: { flexDirection: 'row', gap: spacing.md },
  eraDotCol: { width: 12, alignItems: 'center', paddingTop: 5 },
  eraDot: { width: 9, height: 9, borderRadius: 5, borderWidth: 1, borderColor: lang.gold, backgroundColor: lang.bg },
  eraStem: { flex: 1, width: 1, backgroundColor: lang.hair, marginVertical: 3 },
  eraBody: { flex: 1, paddingBottom: spacing.lg },
  eraAge: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lang.text },
  eraScript: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: lang.accent, marginTop: 2 },
  eraNote: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: lang.textDim, marginTop: spacing.xs },

  loans: { marginVertical: spacing.lg },
  loanRow: { paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lang.hair },
  loanHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  loanEn: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lang.text },
  loanFrom: { fontFamily: fonts.bodyStrong, fontSize: 13, color: lang.gold, fontStyle: 'italic' },
  loanNote: { fontFamily: fonts.body, fontSize: 12, lineHeight: 19, color: lang.textDim, marginTop: 3 },

  split: { flexDirection: 'row', gap: spacing.md, marginVertical: spacing.lg },
  splitCol: { flex: 1, backgroundColor: lang.surface, borderRadius: radius.md, padding: spacing.md },
  splitTitle: { fontFamily: fonts.bodyStrong, fontSize: 11, letterSpacing: 1, color: lang.accent },
  splitRule: { width: 18, height: 1, backgroundColor: lang.gold, marginVertical: spacing.sm },
  splitText: { fontFamily: fonts.body, fontSize: 12, lineHeight: 19, color: lang.text, opacity: 0.85 },

  cta: { alignItems: 'center', marginTop: spacing.xxl, backgroundColor: lang.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: lang.hair, padding: spacing.xl },
  ctaGlyph: { fontFamily: fonts.persian, fontSize: 26, color: lang.gold, letterSpacing: 6 },
  ctaTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: lang.text, marginTop: spacing.md },
  ctaSub: { fontFamily: fonts.body, fontSize: 12, color: lang.textDim, textAlign: 'center', marginTop: spacing.xs },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: lang.gold, borderRadius: radius.pill, paddingVertical: spacing.sm, paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  ctaBtnText: { fontFamily: fonts.bodyStrong, fontSize: 11, letterSpacing: 1.5, color: lang.bg },

  close: { alignItems: 'center', marginTop: spacing.xxl },
  closeRule: { width: 1, height: 36, backgroundColor: lang.gold, opacity: 0.5 },
  closeGlyph: { fontFamily: fonts.persian, fontSize: 32, color: lang.gold, marginTop: spacing.lg },
  closeText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 23, color: lang.textDim, textAlign: 'center', marginTop: spacing.lg, fontStyle: 'italic' },
});
