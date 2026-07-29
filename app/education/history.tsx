import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { HISTORY_ERAS } from '@/constants/education';
import { HistoryTimeline } from '@/components/history-timeline';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export default function HistoryHub() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>{t(APP.education)}</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{t(APP.history)}</Text>
          <Text style={styles.glyph}>تاریخ</Text>
        </View>
        <Text style={styles.subtitle}>The story of Iran, from the first empires to the modern age, told through the lives and dynasties that shaped it.</Text>

        <HistoryTimeline />

        {HISTORY_ERAS.map((era) => (
          <View key={era.group}>
            <Text style={styles.eraLabel}>{era.group.toUpperCase()}</Text>
            <View style={styles.list}>
              {era.entries.map((e) => {
                const tappable = e.status === 'ready' || e.status === 'priority';
                return (
                  <Pressable
                    key={e.name}
                    style={[styles.card, e.status === 'priority' && styles.cardPriority]}
                    disabled={!e.topicKey}
                    onPress={() => e.topicKey && router.navigate('/education/topic?topic=' + e.topicKey as any)}
                  >
                    <View style={styles.dotCol}>
                      <View style={[styles.dot, tappable ? styles.dotOn : styles.dotOff]} />
                    </View>
                    <View style={styles.cardText}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{e.name}</Text>
                        {e.status === 'priority' && <Text style={styles.tagNew}>NEW</Text>}
                        {e.status === 'soon' && <Text style={styles.tagSoon}>{t(APP.soon)}</Text>}
                      </View>
                      <Text style={styles.cardYears}>{e.years}{e.persian ? '  ·  ' + e.persian : ''}</Text>
                    </View>
                    {e.topicKey ? <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} /> : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
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
  eraLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.accent, marginTop: spacing.xl, marginBottom: spacing.sm },
  list: { gap: spacing.sm },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  cardPriority: { borderColor: colors.accent },
  dotCol: { width: 14, alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6 },
  dotOn: { backgroundColor: colors.accent },
  dotOff: { backgroundColor: colors.border },
  cardText: { flex: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  cardYears: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  tagNew: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1, color: colors.surface, backgroundColor: colors.accent, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2, overflow: 'hidden' },
  tagSoon: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1, color: colors.textSecondary, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2, overflow: 'hidden' },
});
