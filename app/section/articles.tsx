import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, spacing } from '@/constants/zand-theme';
import { ar, orderedArticles, type Article } from '@/constants/articles';
import { isHidden, useHidden } from '@/lib/admin';
import { eduImage } from '@/constants/education-images';
import { FramedImage } from '@/components/framed-image';

function Rise({ children, delay = 0 }: { children: any; delay?: number }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 480, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  const y = a.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });
  return <Animated.View style={{ opacity: a, transform: [{ translateY: y }] }}>{children}</Animated.View>;
}

const go = (k: string) => router.navigate(('/article?article=' + k) as any);

/* the big lead */
function Hero({ a }: { a: Article }) {
  return (
    <View style={s.hero}>
      <FramedImage name={a.cover} source={eduImage(a.cover)} style={StyleSheet.absoluteFill as any} onPress={() => go(a.key)}>
        <LinearGradient colors={['rgba(18,14,10,0.5)', 'rgba(18,14,10,0.05)', 'rgba(18,14,10,0.55)', 'rgba(18,14,10,0.97)']} locations={[0, 0.3, 0.62, 1]} style={StyleSheet.absoluteFill as any} pointerEvents="none" />
        <View style={s.overTopRow} pointerEvents="none">
          <Text style={s.overTag}>{a.tag}</Text>
          <View style={s.dotLight} />
          <Text style={s.overTag}>{a.readMins} min</Text>
        </View>
        <View style={s.overBody} pointerEvents="none">
          <Text style={s.heroTitle}>{a.title}</Text>
          <Text style={s.heroDeck} numberOfLines={2}>{a.excerpt ?? a.standfirst}</Text>
        </View>
      </FramedImage>
    </View>
  );
}

/* a full-width big card, same weight as the hero */
function BigCard({ a, h = 380 }: { a: Article; h?: number }) {
  return (
    <View style={[s.big, { height: h }]}>
      <FramedImage name={a.cover} source={eduImage(a.cover)} style={StyleSheet.absoluteFill as any} onPress={() => go(a.key)}>
        <LinearGradient colors={['rgba(18,14,10,0.45)', 'rgba(18,14,10,0.05)', 'rgba(18,14,10,0.55)', 'rgba(18,14,10,0.96)']} locations={[0, 0.32, 0.64, 1]} style={StyleSheet.absoluteFill as any} pointerEvents="none" />
        <View style={s.overTopRow} pointerEvents="none">
          <Text style={s.overTag}>{a.tag}</Text>
          <View style={s.dotLight} />
          <Text style={s.overTag}>{a.readMins} min</Text>
        </View>
        <View style={s.overBody} pointerEvents="none">
          <Text style={s.bigTitle}>{a.title}</Text>
          <Text style={s.heroDeck} numberOfLines={2}>{a.excerpt ?? a.standfirst}</Text>
        </View>
      </FramedImage>
    </View>
  );
}

/* two side by side */
function MediumPair({ items }: { items: Article[] }) {
  return (
    <View style={s.pairRow}>
      {items.map((a) => (
        <View key={a.key} style={s.medium}>
          <FramedImage name={a.cover} source={eduImage(a.cover)} style={StyleSheet.absoluteFill as any} onPress={() => go(a.key)}>
            <LinearGradient colors={['rgba(18,14,10,0.25)', 'rgba(18,14,10,0.1)', 'rgba(18,14,10,0.95)']} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFill as any} pointerEvents="none" />
            <Text style={s.medTag} pointerEvents="none">{a.tag}</Text>
            <View style={s.medBody} pointerEvents="none">
              <Text style={s.medTitle} numberOfLines={3}>{a.title}</Text>
              <Text style={s.medMeta}>{a.readMins} MIN</Text>
            </View>
          </FramedImage>
        </View>
      ))}
    </View>
  );
}

export default function ArticlesScreen() {
  useHidden();
  const all = orderedArticles().filter((a) => !isHidden(a.key));
  const hero = all[0];

  // After the hero the page repeats: two mediums, then two bigs, forever.
  // Heights alternate per cycle so long lists never look mechanical.
  type Row = { kind: 'pair' | 'big'; items: Article[]; h?: number };
  const rows: Row[] = [];
  let i = 1;
  let cycle = 0;
  while (i < all.length) {
    const pair = all.slice(i, i + 2);
    if (pair.length) { rows.push({ kind: 'pair', items: pair }); i += pair.length; }
    for (let b = 0; b < 2 && i < all.length; b++) {
      const tall = cycle % 2 === 0 ? (b === 0 ? 380 : 420) : (b === 0 ? 410 : 360);
      rows.push({ kind: 'big', items: [all[i]], h: tall });
      i += 1;
    }
    cycle += 1;
  }

  return (
    <View style={{ flex: 1, backgroundColor: ar.bg }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Pressable style={s.back} hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={ar.ink} />
          <Text style={s.backT}>Explore</Text>
        </Pressable>

        <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
          <Rise>
            <View style={s.head}>
              <Text style={s.watermark}>مقاله‌ها</Text>
              <View style={s.headRow}>
                <Text style={s.title}>Articles</Text>
                <View style={s.headRule} />
              </View>
              <Text style={s.headSub}>The people behind the work</Text>
            </View>
          </Rise>

          {hero ? <Rise delay={50}><Hero a={hero} /></Rise> : null}
          {rows.map((row, ri) => (
            <Rise key={row.items[0].key} delay={Math.min(90 + ri * 30, 300)}>
              {row.kind === 'pair' ? (
                <View style={ri === 0 ? undefined : s.gap}><MediumPair items={row.items} /></View>
              ) : (
                <View style={s.gap}><BigCard a={row.items[0]} h={row.h} /></View>
              )}
            </Rise>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  backT: { fontFamily: fonts.body, fontSize: 15, color: ar.ink },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  head: { marginTop: spacing.md, marginBottom: spacing.xl, position: 'relative' },
  watermark: { position: 'absolute', right: -6, top: -18, fontFamily: fonts.persian, fontSize: 58, color: ar.ink, opacity: 0.06 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: 40, color: ar.ink },
  headRule: { flex: 1, height: 1, backgroundColor: ar.hair, marginTop: 8 },
  headSub: { fontFamily: fonts.body, fontSize: 13, color: ar.soft, marginTop: 4, fontStyle: 'italic' },

  overTag: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.9)' },
  dotLight: { width: 2, height: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.7)' },
  overTopRow: { position: 'absolute', top: spacing.lg, left: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: 6 },
  overBody: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: spacing.xl },

  hero: { height: 420, borderRadius: 16, overflow: 'hidden', backgroundColor: ar.hair },
  heroTitle: { fontFamily: fonts.heading, fontSize: 30, lineHeight: 34, color: '#FFF' },
  heroDeck: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: 'rgba(255,255,255,0.9)', marginTop: spacing.sm },

  big: { borderRadius: 16, overflow: 'hidden', backgroundColor: ar.hair },
  bigTitle: { fontFamily: fonts.heading, fontSize: 27, lineHeight: 31, color: '#FFF' },
  gap: { marginTop: spacing.md },

  pairRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  medium: { flex: 1, height: 240, borderRadius: 14, overflow: 'hidden', backgroundColor: ar.hair },
  medTag: { position: 'absolute', top: spacing.md, left: spacing.md, fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.5, color: 'rgba(255,255,255,0.9)' },
  medBody: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: spacing.md },
  medTitle: { fontFamily: fonts.heading, fontSize: 18, lineHeight: 22, color: '#FFF' },
  medMeta: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.5, color: 'rgba(255,255,255,0.75)', marginTop: 5 },
});
