import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { nz, NOWRUZ_CHAPTERS, type NzBlock } from '@/constants/nowruz';
import { yl, YALDA_CHAPTERS, type YlBlock } from '@/constants/yalda';
import { eduImage } from '@/constants/education-images';
import { GlossaryText } from '@/components/glossary-text';
import { Tahvil, HaftSeen, Guests, Fire, Knot } from '@/components/nowruz-blocks';
import { Solstice, Anar, NightArc } from '@/components/yalda-blocks';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

type Tab = 'nowruz' | 'yalda';

function FadeIn({ children, delay = 0 }: { children: any; delay?: number }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 420, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  const y = a.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
  return <Animated.View style={{ opacity: a, transform: [{ translateY: y }] }}>{children}</Animated.View>;
}

/* ---------------- Nowruz ---------------- */

function NzBlockView({ b }: { b: NzBlock }) {
  const s = nzStyles;
  switch (b.t) {
    case 'p': return <Text style={s.p}>{b.x}</Text>;
    case 'ptext': return <View style={{ marginTop: spacing.md }}><GlossaryText text={b.x} /></View>;
    case 'h': return <Text style={s.h}>{b.x}</Text>;
    case 'aside': return <Text style={s.aside}>{b.x}</Text>;
    case 'lead': return (
      <View style={s.leadWrap}>
        <View style={s.leadRule} /><Text style={s.lead}>{b.x}</Text><View style={s.leadRule} />
      </View>
    );
    case 'mark': return (
      <View style={s.mark}><View style={s.markBar} /><Text style={s.markText}>{b.x}</Text></View>
    );
    case 'tahvil': return <Tahvil />;
    case 'haftseen': return <HaftSeen />;
    case 'guests': return <Guests />;
    case 'fire': return <Fire />;
    case 'knot': return <Knot />;
    case 'img': {
      const src = eduImage(b.key);
      return (
        <View style={s.imgWrap}>
          {src ? <Image source={src} style={s.img} resizeMode="cover" /> : <View style={[s.img, s.ph]} />}
          {b.cap ? <Text style={s.cap}>{b.cap}</Text> : null}
        </View>
      );
    }
    case 'days': return (
      <View style={s.days}>
        {b.items.map((it, i) => (
          <View key={i} style={s.dayRow}>
            <View style={s.dayCol}>
              <View style={s.dayDot} />
              {i < b.items.length - 1 ? <View style={s.dayStem} /> : null}
            </View>
            <View style={s.dayBody}>
              <Text style={s.dayD}>{it.d}</Text>
              <Text style={s.dayN}>{it.n}</Text>
              <Text style={s.dayX}>{it.x}</Text>
            </View>
          </View>
        ))}
      </View>
    );
    case 'close': return (
      <View style={s.close}>
        <View style={s.closeRule} />
        <Text style={s.closeGlyph}>{b.glyph}</Text>
        <Text style={s.closeText}>{b.x}</Text>
        <View style={s.closeDiamond} />
      </View>
    );
    default: return null;
  }
}

/* ---------------- Yalda ---------------- */

function YlBlockView({ b }: { b: YlBlock }) {
  const s = ylStyles;
  switch (b.t) {
    case 'p': return <Text style={s.p}>{b.x}</Text>;
    case 'ptext': return <View style={{ marginTop: spacing.md }}><GlossaryText text={b.x} /></View>;
    case 'h': return <Text style={s.h}>{b.x}</Text>;
    case 'aside': return <Text style={s.aside}>{b.x}</Text>;
    case 'lead': return (
      <View style={s.leadWrap}>
        <View style={s.leadRule} /><Text style={s.lead}>{b.x}</Text><View style={s.leadRule} />
      </View>
    );
    case 'mark': return (
      <View style={s.mark}><View style={s.markBar} /><Text style={s.markText}>{b.x}</Text></View>
    );
    case 'solstice': return <Solstice />;
    case 'anar': return <Anar />;
    case 'nightarc': return <NightArc />;
    case 'table': return (
      <View style={s.table}>
        {b.items.map((it, i) => (
          <View key={i} style={s.tRow}>
            <View style={s.tHead}>
              <Text style={s.tFa}>{it.fa}</Text>
              <Text style={s.tEn}>{it.en}</Text>
            </View>
            <Text style={s.tX}>{it.x}</Text>
          </View>
        ))}
      </View>
    );
    case 'img': {
      const src = eduImage(b.key);
      return (
        <View style={s.imgWrap}>
          {src ? <Image source={src} style={s.img} resizeMode="cover" /> : <View style={[s.img, s.ph]} />}
          {b.cap ? <Text style={s.cap}>{b.cap}</Text> : null}
        </View>
      );
    }
    case 'close': return (
      <View style={s.close}>
        <View style={s.closeRule} />
        <Text style={s.closeGlyph}>{b.glyph}</Text>
        <Text style={s.closeText}>{b.x}</Text>
        <View style={s.closeDiamond} />
      </View>
    );
    default: return null;
  }
}

/* ---------------- The page ---------------- */

export default function Traditions() {
  const [tab, setTab] = useState<Tab>('nowruz');
  const scroller = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const chapters: any[] = tab === 'nowruz' ? NOWRUZ_CHAPTERS : YALDA_CHAPTERS;
  const [active, setActive] = useState(chapters[0].key);
  const th = tab === 'nowruz' ? nz : yl;

  const swap = (t: Tab) => {
    if (t === tab) return;
    sectionY.current = {};
    setTab(t);
    setActive((t === 'nowruz' ? NOWRUZ_CHAPTERS : YALDA_CHAPTERS)[0].key);
    scroller.current?.scrollTo({ y: 0, animated: false });
  };

  const jump = (key: string) => {
    const y = sectionY.current[key];
    if (y !== undefined) scroller.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
    setActive(key);
  };

  const onScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y + 60;
    let cur = chapters[0].key;
    for (const c of chapters) {
      const cy = sectionY.current[c.key];
      if (cy !== undefined && cy <= y) cur = c.key;
    }
    if (cur !== active) setActive(cur);
  };

  return (
    <View style={{ flex: 1, backgroundColor: th.bg }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.topBar}>
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={th.text} />
          </Pressable>
          <Text style={[styles.topTitle, { color: th.text }]}>{t(APP.traditions)}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* the celebration switch */}
        <View style={[styles.switch, { borderColor: th.hair, backgroundColor: tab === 'nowruz' ? nz.raised : yl.bgLift }]}>
          {(['nowruz', 'yalda'] as Tab[]).map((t) => {
            const on = t === tab;
            const c = t === 'nowruz' ? nz : yl;
            return (
              <Pressable key={t} style={[styles.swTab, on && { backgroundColor: c.surface, borderColor: c.gold }]} onPress={() => swap(t)}>
                <Text style={[styles.swFa, { color: on ? c.gold : th.textDim }]}>{t === 'nowruz' ? 'نوروز' : 'یلدا'}</Text>
                <Text style={[styles.swEn, { color: on ? c.text : th.textDim }]}>{t === 'nowruz' ? 'Nowruz' : 'Yalda'}</Text>
                <Text style={[styles.swSub, { color: on ? c.gold : 'transparent' }]}>{t === 'nowruz' ? 'THE SPRING' : 'THE LONGEST NIGHT'}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* the chapter nav for whichever is open */}
        <ScrollView
          key={tab}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.navScroll, { borderBottomColor: th.hair }]}
          contentContainerStyle={styles.navRow}
        >
          {chapters.map((c) => {
            const on = c.key === active;
            return (
              <Pressable key={c.key} onPress={() => jump(c.key)} style={styles.navTab}>
                <Text style={[styles.navText, { color: on ? th.text : th.textDim }]} numberOfLines={1}>{c.nav}</Text>
                <View style={[styles.navRule, { backgroundColor: on ? th.gold : 'transparent' }]} />
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView
          ref={scroller}
          onScroll={onScroll}
          scrollEventThrottle={64}
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headWrap}>
            <LinearGradient
              colors={tab === 'nowruz'
                ? ['#E3D3BC', '#EAE0D0', '#F0E8DB', nz.bg]
                : ['#4A3038', '#3A262D', '#2C1F23', yl.bg]}
              locations={[0, 0.45, 0.78, 1]}
              style={styles.headFade}
              pointerEvents="none"
            />
            <FadeIn key={tab + '-head'}>
              <View style={styles.head}>
                <Text style={[styles.glyph, { color: th.gold }]}>{tab === 'nowruz' ? 'نوروز' : 'یلدا'}</Text>
                <Text style={[styles.title, { color: th.text }]}>{tab === 'nowruz' ? 'Nowruz' : 'Shab e Yalda'}</Text>
                <View style={[styles.headRule, { backgroundColor: th.gold }]} />
                <Text style={[styles.sub, { color: th.textDim }]}>
                  {tab === 'nowruz'
                    ? 'The new day. Three thousand years old, and it arrives at a second.'
                    : 'The longest night. The dark reaches as far as it can go, and then begins to lose.'}
                </Text>
              </View>
            </FadeIn>
          </View>

          {chapters.map((c, ci) => (
            <View key={tab + c.key} style={styles.chWrap} onLayout={(e) => { sectionY.current[c.key] = e.nativeEvent.layout.y; }}>
              <FadeIn delay={40 + ci * 35}>
                <View style={styles.chapter}>
                  <View style={[styles.chDiamond, { backgroundColor: tab === 'nowruz' ? nz.green : yl.anar }]} />
                  {c.subtitle ? <Text style={[styles.chEyebrow, { color: th.gold }]}>{c.subtitle}</Text> : null}
                  <Text style={[styles.chTitle, { color: th.text }]}>{c.title}</Text>
                </View>
                {c.blocks.map((b: any, bi: number) =>
                  tab === 'nowruz' ? <NzBlockView key={bi} b={b} /> : <YlBlockView key={bi} b={b} />
                )}
              </FadeIn>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  topTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg },

  switch: { flexDirection: 'row', marginHorizontal: spacing.lg, borderRadius: 12, borderWidth: 1, padding: 3, gap: 3 },
  swTab: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: 9, borderWidth: 1, borderColor: 'transparent' },
  swFa: { fontFamily: fonts.persian, fontSize: 15 },
  swEn: { fontFamily: fonts.heading, fontSize: fontSize.lg, marginTop: 1 },
  swSub: { fontFamily: fonts.bodyStrong, fontSize: 7, letterSpacing: 1.5, marginTop: 1 },

  navScroll: { height: 42, flexGrow: 0, flexShrink: 0, borderBottomWidth: 1, marginTop: spacing.md },
  navRow: { paddingLeft: spacing.lg, paddingRight: spacing.md, alignItems: 'flex-start' },
  navTab: { marginRight: 20, height: 42, justifyContent: 'space-between', paddingTop: 5 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: 12 },
  navRule: { height: 2, borderRadius: 1 },

  container: { paddingBottom: spacing.xxl },
  headWrap: { position: 'relative', paddingHorizontal: spacing.lg },
  headFade: { position: 'absolute', left: 0, right: 0, top: 0, height: 250 },
  head: { alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  glyph: { fontFamily: fonts.persian, fontSize: 44 },
  title: { fontFamily: fonts.heading, fontSize: 32, marginTop: spacing.xs },
  headRule: { width: 34, height: 1, marginVertical: spacing.md, opacity: 0.7 },
  sub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, textAlign: 'center' },

  chWrap: { paddingHorizontal: spacing.lg },
  chapter: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.sm },
  chDiamond: { width: 8, height: 8, transform: [{ rotate: '45deg' }], marginBottom: spacing.md },
  chEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3 },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, marginTop: 2, textAlign: 'center' },
});

const nzStyles = StyleSheet.create({
  p: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: nz.text, marginTop: spacing.md },
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
  ph: { borderWidth: 1, borderColor: nz.hair },
  cap: { fontFamily: fonts.body, fontSize: 11, color: nz.textDim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },
  days: { marginVertical: spacing.lg },
  dayRow: { flexDirection: 'row', gap: spacing.md },
  dayCol: { width: 12, alignItems: 'center', paddingTop: 6 },
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

const ylStyles = StyleSheet.create({
  p: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: yl.text, marginTop: spacing.md, opacity: 0.93 },
  h: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: yl.text, marginTop: spacing.xl },
  aside: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: yl.textDim, fontStyle: 'italic', marginTop: spacing.md, paddingLeft: spacing.md, borderLeftWidth: 1, borderLeftColor: yl.hair },
  leadWrap: { alignItems: 'center', marginVertical: spacing.xl },
  leadRule: { width: 36, height: 1, backgroundColor: yl.gold, marginVertical: spacing.lg },
  lead: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 29, color: yl.text, textAlign: 'center', fontStyle: 'italic' },
  mark: { flexDirection: 'row', marginVertical: spacing.lg },
  markBar: { width: 3, borderRadius: 2, backgroundColor: yl.anar, marginRight: spacing.md },
  markText: { flex: 1, fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: yl.text, fontStyle: 'italic' },
  table: { marginVertical: spacing.lg, gap: spacing.sm },
  tRow: { backgroundColor: yl.surface, borderRadius: 11, borderWidth: 1, borderColor: yl.hair, padding: spacing.lg },
  tHead: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  tFa: { fontFamily: fonts.persian, fontSize: 17, color: yl.anar },
  tEn: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: yl.text },
  tX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 21, color: yl.textDim, marginTop: spacing.sm },
  imgWrap: { marginVertical: spacing.lg },
  img: { width: '100%', height: 210, borderRadius: radius.lg, backgroundColor: yl.raised },
  ph: { borderWidth: 1, borderColor: yl.hair },
  cap: { fontFamily: fonts.body, fontSize: 11, color: yl.textDim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },
  close: { alignItems: 'center', marginTop: spacing.xxl, paddingBottom: spacing.xl },
  closeRule: { width: 1, height: 36, backgroundColor: yl.gold, opacity: 0.5 },
  closeGlyph: { fontFamily: fonts.persian, fontSize: 32, color: yl.gold, marginTop: spacing.lg },
  closeText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 23, color: yl.textDim, textAlign: 'center', marginTop: spacing.lg, fontStyle: 'italic' },
  closeDiamond: { width: 6, height: 6, backgroundColor: yl.gold, transform: [{ rotate: '45deg' }], marginTop: spacing.xl },
});
