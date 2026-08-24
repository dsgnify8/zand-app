import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { nz, NOWRUZ_CHAPTERS, type NzBlock } from '@/constants/nowruz';
import { eduImage } from '@/constants/education-images';
import { Tahvil, HaftSeen, Guests, Fire, Knot } from '@/components/nowruz-blocks';
import { GlossaryText } from '@/components/glossary-text';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

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

function Block({ b }: { b: NzBlock }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  switch (b.t) {
    case 'p': return <Text style={styles.p}>{b.x}</Text>;
    case 'ptext': return <View style={styles.ptext}><GlossaryText text={b.x} /></View>;
    case 'h': return <Text style={styles.h}>{b.x}</Text>;
    case 'aside': return <Text style={styles.aside}>{b.x}</Text>;
    case 'lead': return (
      <View style={styles.leadWrap}>
        <View style={styles.leadRule} />
        <Text style={styles.lead}>{b.x}</Text>
        <View style={styles.leadRule} />
      </View>
    );
    case 'mark': return (
      <View style={styles.mark}>
        <View style={styles.markBar} />
        <Text style={styles.markText}>{b.x}</Text>
      </View>
    );
    case 'tahvil': return <Tahvil />;
    case 'haftseen': return <HaftSeen />;
    case 'guests': return <Guests />;
    case 'fire': return <Fire />;
    case 'knot': return <Knot />;
    case 'img': {
      const src = eduImage(b.key);
      return (
        <View style={styles.imgWrap}>
          {src ? <Image source={src} style={styles.img} resizeMode="cover" />
               : <View style={[styles.img, styles.ph]}><Ionicons name="image-outline" size={20} color={nz.textDim} /></View>}
          {b.cap ? <Text style={styles.cap}>{getLang() === 'fa' && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
        </View>
      );
    }
    case 'days': return (
      <View style={styles.days}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.dayRow}>
            <View style={styles.dayDotCol}>
              <View style={styles.dayDot} />
              {i < b.items.length - 1 ? <View style={styles.dayStem} /> : null}
            </View>
            <View style={styles.dayBody}>
              <Text style={styles.dayD}>{it.d}</Text>
              <Text style={styles.dayN}>{it.n}</Text>
              <Text style={styles.dayX}>{it.x}</Text>
            </View>
          </View>
        ))}
      </View>
    );
    case 'close': return (
      <View style={styles.close}>
        <View style={styles.closeRule} />
        <Text style={styles.closeGlyph}>{b.glyph}</Text>
        <Text style={styles.closeText}>{b.x}</Text>
        <View style={styles.closeDiamond} />
      </View>
    );
    default: return null;
  }
}

export default function NowruzScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const scroller = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const [active, setActive] = useState(NOWRUZ_CHAPTERS[0].key);

  const jump = (key: string) => {
    const y = sectionY.current[key];
    if (y !== undefined) scroller.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
    setActive(key);
  };

  const onScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y + 60;
    let cur = NOWRUZ_CHAPTERS[0].key;
    for (const c of NOWRUZ_CHAPTERS) {
      const cy = sectionY.current[c.key];
      if (cy !== undefined && cy <= y) cur = c.key;
    }
    if (cur !== active) setActive(cur);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={24} color={nz.text} />
        </Pressable>
        <Text style={styles.topTitle}>{t(APP.nowruz)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.navScroll}
        contentContainerStyle={styles.navRow}
      >
        {NOWRUZ_CHAPTERS.map((c) => {
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
        <View style={styles.headWrap}>
          <LinearGradient
            colors={['#E3D3BC', '#EAE0D0', '#F0E8DB', nz.bg]}
            locations={[0, 0.45, 0.78, 1]}
            style={styles.headFade}
            pointerEvents="none"
          />
          <FadeIn>
            <View style={styles.head}>
              <Text style={styles.glyph}>نوروز</Text>
              <Text style={styles.title}>{t(APP.nowruz)}</Text>
              <View style={styles.headRule} />
              <Text style={styles.sub}>The new day. Three thousand years old, and it arrives at a second.</Text>
            </View>
          </FadeIn>
        </View>

        {NOWRUZ_CHAPTERS.map((c, ci) => (
          <View key={c.key} style={styles.chWrap} onLayout={(e) => { sectionY.current[c.key] = e.nativeEvent.layout.y; }}>
            <FadeIn delay={50 + ci * 40}>
              <View style={styles.chapter}>
                <View style={styles.chDiamond} />
                {c.subtitle ? <Text style={styles.chEyebrow}>{c.subtitle}</Text> : null}
                <Text style={styles.chTitle}>{c.title}</Text>
              </View>
              {c.blocks.map((b, bi) => <Block key={bi} b={b} />)}
            </FadeIn>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: nz.bg },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: nz.text },

  navScroll: { height: 44, flexGrow: 0, flexShrink: 0, borderBottomWidth: 1, borderBottomColor: nz.hair },
  navRow: { paddingLeft: spacing.lg, paddingRight: spacing.md, alignItems: 'flex-start' },
  navTab: { marginRight: 22, height: 44, justifyContent: 'space-between', paddingTop: 6 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: 12, color: nz.textDim },
  navTextOn: { color: nz.text },
  navRule: { height: 2, backgroundColor: 'transparent', borderRadius: 1 },
  navRuleOn: { backgroundColor: nz.gold },

  scroll: { flex: 1 },
  container: { paddingBottom: spacing.xxl },

  headWrap: { position: 'relative', paddingHorizontal: spacing.lg, marginHorizontal: -0, marginBottom: spacing.md },
  headFade: { position: 'absolute', left: 0, right: 0, top: 0, height: 250 },
  head: { alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  headRule: { width: 34, height: 1, backgroundColor: nz.gold, marginVertical: spacing.md, opacity: 0.7 },
  glyph: { fontFamily: fonts.persian, fontSize: 44, color: nz.gold },
  title: { fontFamily: fonts.heading, fontSize: 32, color: nz.text, marginTop: spacing.xs },
  sub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: nz.textDim, marginTop: spacing.xs, textAlign: 'center' },

  chWrap: { paddingHorizontal: spacing.lg },
  chapter: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.sm },
  chDiamond: { width: 8, height: 8, backgroundColor: nz.green, transform: [{ rotate: '45deg' }], marginBottom: spacing.md },
  chEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: nz.gold },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: nz.text, marginTop: 2, textAlign: 'center' },

  p: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: nz.text, marginTop: spacing.md },
  ptext: { marginTop: spacing.md },
  h: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: nz.text, marginTop: spacing.xl },
  aside: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: nz.textDim, fontStyle: 'italic', marginTop: spacing.md, paddingLeft: spacing.md, borderLeftWidth: 1, borderLeftColor: nz.hair },

  leadWrap: { alignItems: 'center', marginVertical: spacing.xl },
  leadRule: { width: 36, height: 1, backgroundColor: nz.gold, marginVertical: spacing.lg },
  lead: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 29, color: nz.text, textAlign: 'center', fontStyle: 'italic' },

  mark: { flexDirection: 'row', marginVertical: spacing.lg },
  markBar: { width: 3, borderRadius: 2, backgroundColor: nz.accent, marginRight: spacing.md },
  markText: { flex: 1, fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: nz.text, fontStyle: 'italic' },

  imgWrap: { marginVertical: spacing.lg },
  img: { width: '100%', height: 210, borderRadius: radius.lg, backgroundColor: nz.raised },
  ph: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: nz.hair },
  cap: { fontFamily: fonts.body, fontSize: 11, color: nz.textDim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },

  days: { marginVertical: spacing.lg },
  dayRow: { flexDirection: 'row', gap: spacing.md },
  dayDotCol: { width: 12, alignItems: 'center', paddingTop: 6 },
  dayDot: { width: 9, height: 9, borderRadius: 5, borderWidth: 1, borderColor: nz.gold, backgroundColor: nz.bg },
  dayStem: { flex: 1, width: 1, backgroundColor: nz.hair, marginVertical: 3 },
  dayBody: { flex: 1, paddingBottom: spacing.lg },
  dayD: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: nz.gold },
  dayN: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: nz.text, marginTop: 1 },
  dayX: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: nz.textDim, marginTop: spacing.xs },

  close: { alignItems: 'center', marginTop: spacing.xxl, paddingBottom: spacing.xl },
  closeRule: { width: 1, height: 36, backgroundColor: nz.gold, opacity: 0.5 },
  closeGlyph: { fontFamily: fonts.persian, fontSize: 32, color: nz.gold, marginTop: spacing.lg },
  closeText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 23, color: nz.textDim, textAlign: 'center', marginTop: spacing.lg, fontStyle: 'italic' },
  closeDiamond: { width: 6, height: 6, backgroundColor: nz.gold, transform: [{ rotate: '45deg' }], marginTop: spacing.xl },
});
