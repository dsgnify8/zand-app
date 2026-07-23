import { useEffect, useRef, useState } from 'react';
import { t, useLang } from '@/lib/i18n';
import { PAGES } from '@/constants/i18n/pages';
import { SaveHeart } from '@/components/save-heart';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark } from '@/constants/education';
import { GEO_CHAPTERS, CITIES, PLACES, type GeoBlock } from '@/constants/geography';
import { eduImage } from '@/constants/education-images';
import { IranProvinceMap } from '@/components/iran-province-map';
import { CityCard } from '@/components/city-card';
import { PlaceCard } from '@/components/place-card';

function FadeIn({ children, delay = 0 }: { children: any; delay?: number }) {
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

function Block({ b }: { b: GeoBlock }) {
  switch (b.t) {
    case 'p': return <Text style={styles.p}>{b.x}</Text>;
    case 'h': return <Text style={styles.h}>{b.x}</Text>;
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
    case 'map':
    case 'img':
    case 'imgwide': {
      const src = eduImage(b.key);
      const h = b.t === 'imgwide' ? 190 : b.t === 'map' ? 230 : 300;
      return (
        <View style={styles.imgWrap}>
          {src ? (
            <Image source={src} style={[styles.img, { height: h }]} resizeMode={b.t === 'map' ? 'contain' : 'cover'} />
          ) : (
            <View style={[styles.img, styles.ph, { height: h }]}>
              <Ionicons name="image-outline" size={22} color={dark.textDim} />
            </View>
          )}
          {b.cap ? <Text style={styles.cap}>{b.cap}</Text> : null}
        </View>
      );
    }
    case 'imgrow2': return (
      <View style={styles.rowWrap}>
        <View style={styles.row2}>
          {b.keys.map((k, i) => {
            const src = eduImage(k);
            return src
              ? <Image key={i} source={src} style={styles.row2Img} resizeMode="cover" />
              : <View key={i} style={[styles.row2Img, styles.ph]}><Ionicons name="image-outline" size={18} color={dark.textDim} /></View>;
          })}
        </View>
        {b.cap ? <Text style={styles.cap}>{b.cap}</Text> : null}
      </View>
    );
    case 'provincemap': return <IranProvinceMap />;
    case 'cities': return <View>{CITIES.map((c) => <CityCard key={c.name} city={c} />)}</View>;
    case 'places': return <View>{PLACES.map((p) => <PlaceCard key={p.name} place={p} />)}</View>;
    case 'stat': return (
      <View style={styles.stat}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.statItem}>
            <Text style={styles.statN}>{it.n}</Text>
            <View style={styles.statBar} />
            <Text style={styles.statLabel}>{it.label}</Text>
          </View>
        ))}
      </View>
    );
    case 'facts': return (
      <View style={styles.facts}>
        {b.items.map((it, i) => (
          <View key={i} style={[styles.factRow, i === b.items.length - 1 && styles.factRowLast]}>
            <Text style={styles.factK}>{it.k}</Text>
            <Text style={styles.factV}>{it.v}</Text>
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
    case 'div': return <View style={styles.div} />;
    default: return null;
  }
}

export default function GeographyScreen() {
  const scroller = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const { jump: wantJump } = useLocalSearchParams<{ jump?: string }>();
  const [active, setActive] = useState(GEO_CHAPTERS[0].key);

  const jump = (key: string) => {
    const y = sectionY.current[key];
    if (y !== undefined) scroller.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
    setActive(key);
  };

  useEffect(() => {
    if (wantJump) { const id = setTimeout(() => jump(String(wantJump)), 450); return () => clearTimeout(id); }
  }, [wantJump]);

  const onScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y + 60;
    let cur = GEO_CHAPTERS[0].key;
    for (const c of GEO_CHAPTERS) {
      const cy = sectionY.current[c.key];
      if (cy !== undefined && cy <= y) cur = c.key;
    }
    if (cur !== active) setActive(cur);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={dark.text} />
        </Pressable>
        <Text style={styles.topTitle}>{t(PAGES.geography)}</Text>
        <SaveHeart itemKey="section-geography" size={19} tint={dark.text} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.navScroll}
        contentContainerStyle={styles.navRow}
      >
        {GEO_CHAPTERS.map((c) => {
          const on = c.key === active;
          return (
            <Pressable key={c.key} onPress={() => jump(c.key)} style={styles.navTab}>
              <Text style={[styles.navText, on && styles.navTextOn]} numberOfLines={1}>{c.nav ?? c.title}</Text>
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
            <Text style={styles.glyph}>جغرافیا</Text>
            <Text style={styles.title}>{t(PAGES.geoHead)}</Text>
            <Text style={styles.sub}>Where Iran sits, and what that has meant.</Text>
          </View>
        </FadeIn>

        {GEO_CHAPTERS.map((c, ci) => (
          <View key={c.key} onLayout={(e) => { sectionY.current[c.key] = e.nativeEvent.layout.y; }}>
          <FadeIn delay={80 + ci * 60}>
            <View style={styles.chapter}>
              <View style={styles.chDiamond} />
              {c.subtitle ? <Text style={styles.chEyebrow}>{c.subtitle}</Text> : null}
              <Text style={styles.chTitle}>{c.title}</Text>
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
  safe: { flex: 1, backgroundColor: dark.bg },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: dark.text },
  navScroll: { height: 44, flexGrow: 0, flexShrink: 0, borderBottomWidth: 1, borderBottomColor: dark.hair },
  navRow: { paddingLeft: spacing.lg, paddingRight: spacing.md, alignItems: 'flex-start' },
  navTab: { marginRight: 22, height: 44, justifyContent: 'space-between', paddingTop: 6 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: 12, color: dark.textDim },
  navTextOn: { color: dark.text },
  navRule: { height: 2, backgroundColor: 'transparent', borderRadius: 1 },
  navRuleOn: { backgroundColor: dark.gold },
  scroll: { flex: 1 },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  head: { alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.lg },
  glyph: { fontFamily: fonts.persian, fontSize: 40, color: dark.gold },
  title: { fontFamily: fonts.heading, fontSize: 32, color: dark.text, marginTop: spacing.xs },
  sub: { fontFamily: fonts.body, fontSize: 13, color: dark.textDim, marginTop: spacing.xs, textAlign: 'center' },

  chapter: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.sm },
  chDiamond: { width: 10, height: 10, backgroundColor: dark.gold, transform: [{ rotate: '45deg' }], marginBottom: spacing.md },
  chEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 3, color: dark.gold },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: dark.text, marginTop: 2, textAlign: 'center' },
  page: { marginTop: spacing.sm },

  p: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: dark.text, marginTop: spacing.md, opacity: 0.92 },
  h: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text, marginTop: spacing.xl },
  leadWrap: { alignItems: 'center', marginVertical: spacing.xl, backgroundColor: dark.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  leadRule: { width: 44, height: 2, backgroundColor: dark.gold, marginVertical: spacing.lg },
  lead: { fontFamily: fonts.heading, fontSize: fontSize.xxl, lineHeight: 36, color: dark.text, textAlign: 'center', fontStyle: 'italic' },

  mark: { flexDirection: 'row', marginVertical: spacing.lg },
  markBar: { width: 4, borderRadius: 2, backgroundColor: dark.gold, marginRight: spacing.md },
  markText: { flex: 1, fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: dark.text, fontStyle: 'italic' },

  imgWrap: { marginVertical: spacing.lg },
  rowWrap: { marginVertical: spacing.lg },
  row2: { flexDirection: 'row', gap: spacing.sm },
  row2Img: { flex: 1, height: 150, borderRadius: radius.md, backgroundColor: dark.surface },
  img: { width: '100%', borderRadius: radius.lg, backgroundColor: dark.surface },
  ph: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: dark.hair },
  cap: { fontFamily: fonts.body, fontSize: 11, color: dark.textDim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },

  stat: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: spacing.lg },
  statItem: { width: '50%', paddingVertical: spacing.md, paddingRight: spacing.md },
  statN: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 30, color: dark.text },
  statBar: { width: 26, height: 3, backgroundColor: dark.gold, marginVertical: spacing.sm, borderRadius: 2 },
  statLabel: { fontFamily: fonts.body, fontSize: 11, lineHeight: 16, color: dark.textDim },

  facts: { marginVertical: spacing.lg, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, paddingHorizontal: spacing.lg },
  factRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: dark.hair, gap: spacing.md },
  factRowLast: { borderBottomWidth: 0 },
  factK: { fontFamily: fonts.body, fontSize: 13, color: dark.textDim },
  factV: { fontFamily: fonts.bodyStrong, fontSize: 13, color: dark.text, flexShrink: 1, textAlign: 'right' },

  close: { alignItems: 'center', marginTop: spacing.xxl, paddingBottom: spacing.xl },
  closeRule: { width: 1, height: 40, backgroundColor: dark.gold, opacity: 0.5 },
  closeGlyph: { fontFamily: fonts.persian, fontSize: 34, color: dark.gold, marginTop: spacing.lg },
  closeText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 23, color: dark.textDim, textAlign: 'center', marginTop: spacing.lg, fontStyle: 'italic' },
  closeDiamond: { width: 6, height: 6, backgroundColor: dark.gold, transform: [{ rotate: '45deg' }], marginTop: spacing.xl },
  div: { height: 1, backgroundColor: dark.hair, marginVertical: spacing.xl },
});
