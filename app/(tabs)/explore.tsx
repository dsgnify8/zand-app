import { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { eduImage } from '@/constants/education-images';

type Section = {
  key: string;
  title: string;
  persian: string;
  description: string;
  image: string;
  route: string;
};

const SECTIONS: Section[] = [
  { key: 'education', title: 'Education', persian: 'آموزش', description: 'History, culture, art, architecture, and more.', image: 'safavid-isfahan', route: '/section/education' },
  { key: 'articles', title: 'Articles', persian: 'مقاله‌ها', description: 'The people behind the work.', image: 'article-khalili-cover', route: '/section/articles' },
  { key: 'videos', title: 'Videos', persian: 'ویدیوها', description: 'Watch stories, lessons, and interviews.', image: 'cyrus-pasargadae', route: '/section/videos' },
];

function FadeIn({ children, delay = 0 }: { children: any; delay?: number }) {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(14)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 460, delay, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 460, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>{children}</Animated.View>;
}

function SectionCard({ s }: { s: Section }) {
  const src = eduImage(s.image);
  return (
    <Pressable style={styles.card} onPress={() => router.navigate(s.route as any)}>
      <View style={styles.imgWrap}>
        {src ? (
          <Image source={src} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={[styles.img, styles.ph]} />
        )}
        <LinearGradient
          colors={['rgba(250,247,242,0)', 'rgba(250,247,242,0.65)', colors.surface]}
          locations={[0, 0.62, 1]}
          style={styles.fade}
          pointerEvents="none"
        />
      </View>

      <View style={styles.body}>
        <View style={styles.headRow}>
          <Text style={styles.cardTitle}>{s.title}</Text>
          <Text style={styles.cardGlyph}>{s.persian}</Text>
        </View>
        <Text style={styles.cardDescription}>{s.description}</Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>OPEN</Text>
          <Ionicons name="arrow-forward" size={15} color={colors.accent} />
        </View>
      </View>
    </Pressable>
  );
}

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader showSearch />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <FadeIn>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.glyph}>کاوش</Text>
          </View>
          <Text style={styles.subtitle}>Persian heritage and modern creativity, in every form.</Text>
        </FadeIn>

        <View style={styles.list}>
          {SECTIONS.map((s, i) => (
            <FadeIn key={s.key} delay={80 + i * 90}>
              <SectionCard s={s} />
            </FadeIn>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: 30, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: colors.accent },
  subtitle: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.xs },

  list: { marginTop: spacing.xl, gap: spacing.xl },

  card: { borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  imgWrap: { width: '100%', height: 150, backgroundColor: colors.surface },
  img: { width: '100%', height: '100%' },
  ph: { backgroundColor: colors.border, opacity: 0.4 },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 130 },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, marginTop: -spacing.sm },
  headRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: colors.textPrimary },
  cardGlyph: { fontFamily: fonts.persian, fontSize: fontSize.lg, color: colors.accent },
  cardDescription: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, marginTop: spacing.xs },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  ctaText: { fontFamily: fonts.bodyStrong, fontSize: 11, letterSpacing: 1.5, color: colors.accent },
});
