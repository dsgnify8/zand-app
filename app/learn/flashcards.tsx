import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { DECKS } from '@/constants/flashcards';
import { useSRS, cardId } from '@/lib/srs-store';

export default function FlashcardsHome() {
  const { dueCount } = useSRS();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>Learn</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Flashcards</Text>
          <Text style={styles.glyph}>کارت‌ها</Text>
        </View>
        <Text style={styles.subtitle}>Build your first Persian words — reviews return when they are due.</Text>

        <View style={styles.list}>
          {DECKS.map((d) => {
            const due = dueCount(d.cards.map((c) => cardId(d.key, c.fa)));
            return (
              <Pressable key={d.key} style={styles.card} onPress={() => router.navigate('/learn/flashcard?deck=' + d.key as any)}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{d.title}</Text>
                  <Text style={styles.cardDesc}>{d.cards.length} cards</Text>
                  {due > 0 ? (
                    <View style={styles.duePill}><Text style={styles.dueText}>{due} due</Text></View>
                  ) : (
                    <View style={styles.doneRow}><Ionicons name="checkmark-circle" size={14} color={colors.textSecondary} /><Text style={styles.doneText}>All caught up</Text></View>
                  )}
                </View>
                <Text style={styles.cardGlyph}>{d.persian}</Text>
              </Pressable>
            );
          })}
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
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: colors.accent },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: colors.textSecondary, marginTop: spacing.sm },
  list: { marginTop: spacing.xl, gap: spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  cardText: { flex: 1, paddingRight: spacing.md },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  cardDesc: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  duePill: { alignSelf: 'flex-start', backgroundColor: colors.accent, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 3, marginTop: spacing.sm },
  dueText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 0.5, color: colors.surface },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  doneText: { fontFamily: fonts.body, fontSize: fontSize.xs, color: colors.textSecondary },
  cardGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xl, color: colors.accent },
});
