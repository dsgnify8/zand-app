import { useEffect, useRef } from 'react';
import { t as tr, useLang } from '@/lib/i18n';
import { SECTIONS } from '@/constants/i18n/sections';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark } from '@/constants/education';
import { ZandHeader } from '@/components/zand-header';
import { eduImage } from '@/constants/education-images';

type Topic = {
  key: string;
  title: string;
  persian: string;
  description: string;
  image?: string;
  status: 'ready' | 'soon';
  route?: string;
};

const TOPICS: Topic[] = [
  { key: 'history', title: 'History', titleT: SECTIONS.history, descT: SECTIONS.historyX, persian: 'تاریخ', description: 'From ancient empires to the modern age.', image: 'cyrus-cover', status: 'ready', route: '/education/history' },
  { key: 'geography', title: 'Geography', titleT: SECTIONS.geography, descT: SECTIONS.geographyX, persian: 'جغرافیا', description: 'Land, cities, and landscapes.', image: 'iran-crossroads', status: 'ready', route: '/geography' },
  { key: 'traditions', title: 'Traditions', titleT: SECTIONS.traditions, descT: SECTIONS.traditionsX, persian: 'آیین‌ها', description: 'The customs and celebrations of the Persian year.', image: 'nowruz-cover', status: 'ready', route: '/traditions' },
  { key: 'literature', title: 'Literature', titleT: SECTIONS.literature, descT: SECTIONS.literatureX, persian: 'ادبیات', description: 'The poets and writers who shaped the Persian soul.', image: 'lit-ferdowsi-cover', status: 'ready', route: '/literature' },
  { key: 'language', title: 'Language', titleT: SECTIONS.language, descT: SECTIONS.languageX, persian: 'زبان', description: 'The roots and life of Persian.', image: 'silence-cover', status: 'ready', route: '/language' },
  { key: 'culture', title: 'Culture', titleT: SECTIONS.culture, descT: SECTIONS.cultureX, persian: 'فرهنگ', description: 'Taarof, the guest, the table, and the rules nobody explains.', image: 'zand-vakil-bazaar', status: 'ready', route: '/culture' },
  { key: 'art', title: 'Art', titleT: SECTIONS.art, descT: SECTIONS.artX, persian: 'هنر', description: 'Miniature, calligraphy, and beyond.', image: 'timurid-miniature', status: 'soon' },
  { key: 'architecture', title: 'Architecture', titleT: SECTIONS.architecture, descT: SECTIONS.architectureX, persian: 'معماری', description: 'Domes, gardens, and sacred geometry.', image: 'safavid-mosque-1', status: 'soon' },
];

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

function TopicCard({ t }: { t: Topic }) {
  const src = t.image ? eduImage(t.image) : null;
  const open = t.status === 'ready' && !!t.route;
  return (
    <Pressable
      style={[styles.card, !open && styles.cardSoon]}
      disabled={!open}
      onPress={() => t.route && router.navigate(t.route as any)}
    >
      <View style={styles.imgSide}>
        {src ? (
          <Image source={src} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={[styles.img, styles.ph]}>
            <Text style={styles.phGlyph}>{t.persian}</Text>
          </View>
        )}
        <LinearGradient
          colors={['rgba(36,28,25,0)', 'rgba(36,28,25,0.55)', 'rgba(36,28,25,0.92)', dark.surface]}
          locations={[0, 0.28, 0.62, 0.9]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill as any}
          pointerEvents="none"
        />
      </View>

      <View style={styles.textSide}>
        <View style={styles.headRow}>
          <Text style={styles.cardTitle}>{(t as any).titleT ? tr((t as any).titleT) : t.title}</Text>
          {!open ? <Text style={styles.soon}>{tr(SECTIONS.soon)}</Text> : null}
        </View>
        <Text style={styles.cardDescription}>{(t as any).descT ? tr((t as any).descT) : t.description}</Text>
        <Text style={styles.cardGlyph}>{t.persian}</Text>
      </View>

      {open ? (
        <View style={styles.arrow}>
          <Ionicons name="arrow-forward" size={16} color={dark.gold} />
        </View>
      ) : null}
    </Pressable>
  );
}

export default function EducationScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>Explore</Text>
        </Pressable>

        <FadeIn>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{tr(SECTIONS.education)}</Text>
            <Text style={styles.glyph}>آموزش</Text>
          </View>
          <Text style={styles.subtitle}>The story of Persian heritage, one theme at a time.</Text>
        </FadeIn>

        <View style={styles.list}>
          {TOPICS.map((t, i) => (
            <FadeIn key={t.key} delay={60 + i * 45}>
              <TopicCard t={t} />
            </FadeIn>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_H = 116;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.sm },
  title: { fontFamily: fonts.heading, fontSize: 30, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: colors.accent },
  subtitle: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.xs },

  list: { marginTop: spacing.xl, gap: spacing.md },

  card: { height: CARD_H, borderRadius: radius.lg, backgroundColor: dark.surface, overflow: 'hidden', flexDirection: 'row' },
  cardSoon: { opacity: 0.55 },
  imgSide: { width: '52%', height: '100%', backgroundColor: dark.bg },
  img: { width: '100%', height: '100%' },
  ph: { alignItems: 'center', justifyContent: 'center' },
  phGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xl, color: dark.textDim, opacity: 0.5 },

  textSide: { position: 'absolute', right: 0, top: 0, bottom: 0, width: '62%', paddingVertical: spacing.md, paddingRight: spacing.xl, justifyContent: 'center' },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text },
  soon: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1, color: dark.textDim, borderWidth: 1, borderColor: dark.hair, borderRadius: radius.sm, paddingHorizontal: 5, paddingVertical: 1, overflow: 'hidden' },
  cardDescription: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: dark.textDim, marginTop: 3 },
  cardGlyph: { fontFamily: fonts.persian, fontSize: 13, color: dark.gold, marginTop: 5, opacity: 0.75 },

  arrow: { position: 'absolute', right: spacing.md, bottom: spacing.md },
});
