import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { ZandHeader } from '@/components/zand-header';
import { DECKS } from '@/constants/flashcards';
import { useSRS, cardId } from '@/lib/srs-store';
import { LEARN } from '@/constants/i18n/learn';
import { t as tl } from '@/lib/i18n';

export default function FlashcardsHome() {
  const { dueCount } = useSRS();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.replace('/learn/map' as any)}>
          <Ionicons name="chevron-back" size={20} color={lw.muted} />
          <Text style={styles.backBtnText}>{tl(LEARN.learn) === 'Learn' ? 'Learn' : ''}</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{tl(LEARN.flashcards)}</Text>
          <Text style={styles.glyph}>کارت‌ها</Text>
        </View>
        <Text style={styles.subtitle}>Build your first Persian words — reviews return when they are due.</Text>

        <View style={styles.list}>
          {DECKS.map((d) => {
            const due = dueCount(d.cards.map((c) => cardId(d.key, c.fa)));
            return (
              <Pressable key={d.key} style={styles.card} onPress={() => router.replace('/learn/flashcard?deck=' + d.key as any)}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{d.title}</Text>
                  <Text style={styles.cardDesc}>{d.cards.length} cards</Text>
                  {due > 0 ? (
                    <View style={styles.duePill}><Text style={styles.dueText}>{due} due</Text></View>
                  ) : (
                    <View style={styles.doneRow}><Ionicons name="checkmark-circle" size={14} color={lw.muted} /><Text style={styles.doneText}>{tl(LEARN.allCaughtUp)}</Text></View>
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
  safe: { flex: 1, backgroundColor: lw.bg },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: lw.muted },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: lw.ink, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: lw.green },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: lw.muted, marginTop: spacing.sm },
  list: { marginTop: spacing.xl, gap: spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: lw.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: lw.hair, padding: spacing.lg },
  cardText: { flex: 1, paddingRight: spacing.md },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lw.ink },
  cardDesc: { fontFamily: fonts.body, fontSize: fontSize.sm, color: lw.muted, marginTop: 2 },
  duePill: { alignSelf: 'flex-start', backgroundColor: lw.green, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 3, marginTop: spacing.sm },
  dueText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 0.5, color: lw.surface },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  doneText: { fontFamily: fonts.body, fontSize: fontSize.xs, color: lw.muted },
  cardGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xl, color: lw.green },
});
