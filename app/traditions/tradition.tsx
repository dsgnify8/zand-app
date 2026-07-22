import { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { light, findTradition, type TraditionSection } from '@/constants/traditions';
import { TraditionSymbol } from '@/components/tradition-symbol';
import { speak } from '@/lib/speak';
import { eduImage } from '@/constants/education-images';
import { Image } from 'react-native';

function ThreadShimmer({ delay }: { delay: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: 1800, delay, useNativeDriver: true }),
        Animated.timing(v, { toValue: 1, duration: 1400, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [-30, 120] });
  const opacity = v.interpolate({ inputRange: [0, 0.15, 0.85, 1], outputRange: [0, 1, 1, 0] });
  return <Animated.View style={[styles.shimmer, { opacity, transform: [{ translateY }] }]} />;
}

function FloatingSymbol({ symbol, delay }: { symbol: string; delay: number }) {
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2200, delay, useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });
  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <TraditionSymbol symbol={symbol} />
    </Animated.View>
  );
}

function Section({ section, index, last }: { section: TraditionSection; index: number; last: boolean }) {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 500, delay: index * 120, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 500, delay: index * 120, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.section, { opacity: fade, transform: [{ translateY: rise }] }]}>
      {/* the connecting thread column */}
      <View style={styles.threadCol}>
        <View style={[styles.threadLineTop, index === 0 && styles.threadHidden]} />
        <View style={styles.node}>
          <FloatingSymbol symbol={section.symbol} delay={index * 200} />
        </View>
        <View style={[styles.threadLineBottom, last && styles.threadHidden]}>
          {!last ? <ThreadShimmer delay={index * 300} /> : null}
        </View>
      </View>

      {/* the content */}
      <View style={styles.body}>
        {section.glyph ? (
          <Pressable style={styles.glyphRow} onPress={() => speak(section.glyph!)}>
            <Text style={styles.glyph}>{section.glyph}</Text>
            <Ionicons name="volume-medium-outline" size={16} color={light.gold} />
          </Pressable>
        ) : null}
        <Text style={styles.title}>{section.title}</Text>
        {section.body.map((p, i) => <Text key={i} style={styles.p}>{p}</Text>)}

        {section.items ? (
          <View style={styles.items}>
            {section.items.map((it) => (
              <Pressable key={it.label} style={styles.item} onPress={() => speak(it.label)}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemLabel}>{it.label}</Text>
                  <Ionicons name="volume-medium-outline" size={15} color={light.accent} />
                </View>
                <Text style={styles.itemMeaning}>{it.meaning}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {section.note ? (
          <View style={styles.note}>
            <Text style={styles.noteText}>{section.note}</Text>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
}

function AnimatedHeader({ t }: { t: any }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);
  const cover = eduImage(t.cover);
  return (
    <Animated.View style={[styles.header, { opacity: fade, transform: [{ scale }] }]}>
      <Pressable onPress={() => speak(t.persian)} style={styles.hGlyphRow}>
        <Text style={styles.hGlyph}>{t.persian}</Text>
        <Ionicons name="volume-medium-outline" size={18} color={light.gold} />
      </Pressable>
      <Text style={styles.hName}>{t.name}</Text>
      <Text style={styles.hSeason}>{t.season.toUpperCase()}</Text>
      <View style={styles.hRule} />
      <Text style={styles.hIntro}>{t.intro}</Text>
    </Animated.View>
  );
}

export default function TraditionScreen() {
  const { tradition: key } = useLocalSearchParams<{ tradition: string }>();
  const t = findTradition(key);

  if (!t) {
    return <SafeAreaView style={styles.safe} edges={['top']}><View style={styles.center}><Text style={styles.dim}>Not found.</Text></View></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={light.textDim} />
          <Text style={styles.backText}>Traditions</Text>
        </Pressable>

        <AnimatedHeader t={t} />

        <View style={styles.sections}>
          {t.sections.map((s, i) => (
            <Section key={s.key} section={s} index={i} last={i === t.sections.length - 1} />
          ))}
        </View>

        <View style={styles.end}>
          <Text style={styles.endGlyph}>نوروز مبارک</Text>
          <Text style={styles.endText}>Happy Nowruz. May your new year be green.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const T = 76; // symbol size
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, color: light.textDim },
  back: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  backText: { fontFamily: fonts.body, fontSize: fontSize.base, color: light.textDim },
  header: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.xl },
  cover: { width: '100%', height: 200, borderRadius: radius.lg, marginBottom: spacing.lg },
  hGlyph: { fontFamily: fonts.persian, fontSize: 44, color: light.gold },
  hName: { fontFamily: fonts.heading, fontSize: fontSize.display, color: light.text, marginTop: spacing.sm },
  hSeason: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 3, color: light.accent, marginTop: spacing.xs },
  hRule: { width: 40, height: 2, backgroundColor: light.gold, marginTop: spacing.lg, opacity: 0.6 },
  hIntro: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 26, color: light.textDim, textAlign: 'center', marginTop: spacing.lg },
  sections: { marginTop: spacing.md },
  section: { flexDirection: 'row', gap: spacing.md },
  threadCol: { width: T, alignItems: 'center' },
  threadLineTop: { width: 2, flex: 0, height: spacing.lg, backgroundColor: light.gold, opacity: 0.4 },
  threadLineBottom: { width: 2, flex: 1, backgroundColor: light.gold, opacity: 0.4, marginTop: 4, overflow: 'visible' },
  shimmer: { position: 'absolute', left: -1.5, width: 5, height: 30, borderRadius: 3, backgroundColor: light.gold },
  threadHidden: { backgroundColor: 'transparent' },
  node: { width: T, height: T, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, paddingBottom: spacing.xxl },
  glyphRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.lg, color: light.gold },
  hGlyphRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: light.text, marginTop: spacing.xs },
  p: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 26, color: light.text, marginTop: spacing.md },
  items: { marginTop: spacing.lg, gap: spacing.sm },
  item: { backgroundColor: light.surface, borderRadius: radius.md, borderWidth: 1, borderColor: light.hair, padding: spacing.md },
  itemLabel: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: light.accent },
  itemMeaning: { fontFamily: fonts.body, fontSize: fontSize.sm, color: light.textDim, marginTop: 2 },
  note: { backgroundColor: light.accentSoft, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
  noteText: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 22, color: light.text, fontStyle: 'italic' },
  end: { alignItems: 'center', marginTop: spacing.xl, paddingTop: spacing.xl, borderTopWidth: 1, borderTopColor: light.hair },
  endGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: light.gold },
  endText: { fontFamily: fonts.body, fontSize: fontSize.base, color: light.textDim, marginTop: spacing.sm, textAlign: 'center' },
});
