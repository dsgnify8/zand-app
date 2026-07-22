import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { BLANK_CATEGORIES } from '@/constants/fill-blank';

export default function FillBlankHome() {
  const totalWords = BLANK_CATEGORIES.reduce((n, c) => n + c.questions.length, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>Learn</Text>
        </Pressable>

        <View style={styles.hero}>
          <View style={styles.heroIcon}><Ionicons name="create-outline" size={34} color={colors.surface} /></View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Fill the Blank</Text>
            <Text style={styles.glyph}>جای خالی</Text>
          </View>
          <Text style={styles.subtitle}>Complete the sentence with the right word. Choose a category to begin.</Text>
          <Text style={styles.count}>{totalWords} sentences across {BLANK_CATEGORIES.length} categories</Text>
        </View>

        <Text style={styles.sectionLabel}>CHOOSE A CATEGORY</Text>
        <View style={styles.list}>
          {BLANK_CATEGORIES.map((c) => (
            <Pressable key={c.key} style={styles.card} onPress={() => router.navigate('/learn/fill-blank-play?cat=' + c.key as any)}>
              <View style={styles.cardIcon}><Ionicons name={c.icon as any} size={22} color={colors.accent} /></View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{c.title}</Text>
                <Text style={styles.cardDesc}>{c.questions.length} sentences</Text>
              </View>
              <Text style={styles.cardGlyph}>{c.persian}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary },
  hero: { alignItems: 'center', marginTop: spacing.lg },
  heroIcon: { width: 72, height: 72, borderRadius: radius.lg, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: colors.accent },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' },
  count: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.accent, marginTop: spacing.md },
  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.textSecondary, marginTop: spacing.xxl, marginBottom: spacing.sm },
  list: { gap: spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  cardIcon: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  cardText: { flex: 1 },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  cardDesc: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  cardGlyph: { fontFamily: fonts.persian, fontSize: fontSize.lg, color: colors.accent },
});
