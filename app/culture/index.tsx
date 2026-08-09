import { useEffect, useRef } from 'react';
import { getLang, t, useLang } from '@/lib/i18n';
import { PAGES } from '@/constants/i18n/pages';
import { Animated, Easing, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { cu, CULTURE_TOPICS, type CultureTopic } from '@/constants/culture';
import { eduImage } from '@/constants/education-images';
import { APP } from '@/constants/i18n/app';

/* The textured ground. Two tiled layers plus a gradient, so it is never flat. */
export function CultureGround() {
  const grain = eduImage('tex-grain');
  const linen = eduImage('tex-linen');
  return (
    <View style={StyleSheet.absoluteFill as any} pointerEvents="none">
      <LinearGradient
        colors={[cu.bgLift, cu.bg, '#363029', cu.bg]}
        locations={[0, 0.35, 0.72, 1]}
        style={StyleSheet.absoluteFill as any}
      />
      {linen ? <Image source={linen} style={[StyleSheet.absoluteFill as any, { opacity: 0.5 }]} resizeMode="repeat" /> : null}
      {grain ? <Image source={grain} style={[StyleSheet.absoluteFill as any, { opacity: 0.6 }]} resizeMode="repeat" /> : null}
    </View>
  );
}

function Rise({ children, delay = 0 }: { children: any; delay?: number }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 560, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  const y = a.interpolate({ inputRange: [0, 1], outputRange: [18, 0] });
  return <Animated.View style={{ opacity: a, transform: [{ translateY: y }] }}>{children}</Animated.View>;
}

function TopicCard({ t, i }: { t: CultureTopic; i: number }) {
  const fa = getLang() === 'fa';
  const press = useRef(new Animated.Value(0)).current;

  const down = () => Animated.timing(press, { toValue: 1, duration: 130, useNativeDriver: true }).start();
  const up = () => Animated.timing(press, { toValue: 0, duration: 190, useNativeDriver: true }).start();

  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.975] });

  return (
    <Rise delay={90 + i * 65}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={down}
          onPressOut={up}
          onPress={() => router.navigate(('/culture/topic?topic=' + t.key) as any)}
          style={styles.card}
        >
          <View style={[styles.spine, { backgroundColor: t.accent }]} />

          <LinearGradient
            colors={[t.accent + '1F', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill as any}
            pointerEvents="none"
          />

          <View style={styles.cardTop}>
            <View style={[styles.iconRing, { borderColor: t.accent }]}>
              <Ionicons name={(t.glyph + '-outline') as any} size={17} color={t.accent} />
            </View>
            <Text style={[styles.tag, { color: t.accent }]}>{fa && (t as any).tagFa ? (t as any).tagFa : t.tag}</Text>
          </View>

          <View style={styles.nameRow}>
            <Text style={[styles.name, fa && (t as any).titleFa && { fontFamily: fonts.persian }]}>{fa && (t as any).titleFa ? (t as any).titleFa : t.title}</Text>
            <Text style={[styles.fa, { color: t.accent }]}>{t.persian}</Text>
          </View>

          <Text style={[styles.blurb, fa && (t as any).blurbFa && { fontFamily: fonts.persian, fontSize: 13.5, lineHeight: 28, textAlign: 'right', writingDirection: 'rtl' }]}>{fa && (t as any).blurbFa ? (t as any).blurbFa : t.blurb}</Text>

          <View style={styles.foot}>
            <View style={[styles.footRule, { backgroundColor: t.accent }]} />
            <Ionicons name="arrow-forward" size={14} color={t.accent} />
          </View>
        </Pressable>
      </Animated.View>
    </Rise>
  );
}

export default function CultureHub() {
  return (
    <View style={styles.root}>
      <CultureGround />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.topBar}>
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={cu.text} />
          </Pressable>
          <Text style={styles.topTitle}>{t(PAGES.culture)}</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Rise>
            <View style={styles.head}>
              <Text style={styles.watermark}>فرهنگ</Text>
              <View style={styles.headRow}>
                <View style={styles.headBar} />
                <Text style={styles.headEyebrow}>{t(APP.theSocialCode)}</Text>
              </View>
              <Text style={styles.title}>{t(PAGES.cultureHead)}</Text>
              <Text style={styles.sub}>
                Nobody sits you down and explains any of this. You are supposed to absorb it, and if you did not grow up inside it, you spend your life half a beat behind.
              </Text>
              <Text style={styles.subHard}>Here it is, written down.</Text>
            </View>
          </Rise>

          <View style={styles.list}>
            {CULTURE_TOPICS.map((t, i) => <TopicCard key={t.key} t={t} i={i} />)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: cu.bg },
  safe: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: cu.text },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },


  head: { paddingTop: spacing.xl, paddingBottom: spacing.xxl, position: 'relative' },
  watermark: { position: 'absolute', right: -14, top: -8, fontFamily: fonts.persian, fontSize: 92, color: cu.gold, opacity: 0.09 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headBar: { width: 18, height: 1, backgroundColor: cu.gold },
  headEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: cu.gold },
  title: { fontFamily: fonts.heading, fontSize: 42, lineHeight: 45, color: cu.text, marginTop: spacing.md },
  sub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: cu.textDim, marginTop: spacing.lg, maxWidth: '92%' },
  subHard: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: cu.gold, marginTop: spacing.sm, fontStyle: 'italic' },
  list: { gap: spacing.md },
  card: { backgroundColor: cu.surface, borderRadius: 14, borderWidth: 1, borderColor: cu.hair, padding: spacing.lg, paddingLeft: spacing.xl, overflow: 'hidden' },
  spine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconRing: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  tag: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.8 },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginTop: spacing.md },
  name: { fontFamily: fonts.heading, fontSize: 25, color: cu.text },
  fa: { fontFamily: fonts.persian, fontSize: 16 },
  blurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21, color: cu.textDim, marginTop: spacing.xs },
  foot: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  footRule: { width: 20, height: 1, opacity: 0.8 },
});
