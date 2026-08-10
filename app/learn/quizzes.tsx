import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { ZandHeader } from '@/components/zand-header';
import { QUIZ_CATEGORIES } from '@/constants/quizzes';

export default function QuizzesHome() {
  const totalQs = QUIZ_CATEGORIES.reduce((n, c) => n + c.questions.length, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.replace('/learn/map' as any)}>
          <Ionicons name="chevron-back" size={20} color={lw.muted} />
          <Text style={styles.backBtnText}>Learn</Text>
        </Pressable>

        <View style={styles.hero}>
          <View style={styles.heroIcon}><Ionicons name="ribbon-outline" size={34} color={lw.surface} /></View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Quizzes</Text>
            <Text style={styles.glyph}>آزمون</Text>
          </View>
          <Text style={styles.subtitle}>Test what you have learned. Choose a quiz to begin.</Text>
          <Text style={styles.count}>{totalQs} questions across {QUIZ_CATEGORIES.length} quizzes</Text>
        </View>

        <Text style={styles.sectionLabel}>CHOOSE A QUIZ</Text>
        <View style={styles.list}>
          {QUIZ_CATEGORIES.map((c) => (
            <Pressable key={c.key} style={styles.card} onPress={() => router.replace('/learn/quiz-play?cat=' + c.key as any)}>
              <View style={styles.cardIcon}><Ionicons name={c.icon as any} size={22} color={lw.green} /></View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{c.title}</Text>
                <Text style={styles.cardDesc}>{c.questions.length} questions</Text>
              </View>
              <Text style={styles.cardGlyph}>{c.persian}</Text>
              <Ionicons name="chevron-forward" size={18} color={lw.muted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: lw.muted },
  hero: { alignItems: 'center', marginTop: spacing.lg },
  heroIcon: { width: 72, height: 72, borderRadius: radius.lg, backgroundColor: lw.green, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: lw.ink },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: lw.green },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: lw.muted, marginTop: spacing.sm, textAlign: 'center' },
  count: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: lw.green, marginTop: spacing.md },
  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: lw.muted, marginTop: spacing.xxl, marginBottom: spacing.sm },
  list: { gap: spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: lw.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: lw.hair, padding: spacing.lg },
  cardIcon: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: lw.bg, borderWidth: 1, borderColor: lw.hair, alignItems: 'center', justifyContent: 'center' },
  cardText: { flex: 1 },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lw.ink },
  cardDesc: { fontFamily: fonts.body, fontSize: fontSize.sm, color: lw.muted, marginTop: 2 },
  cardGlyph: { fontFamily: fonts.persian, fontSize: fontSize.lg, color: lw.green },
});
