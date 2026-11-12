import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { HISTORY_ERAS } from '@/constants/education';
import { HistoryTimeline } from '@/components/history-timeline';
import { t, useLang, getLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

// The four people open and keep coming back to. Read off the popularity
// board rather than guessed, and set here by hand: a pill that claims
// something about readers should only change when someone has looked.
const MOST_LIKED = new Set([
  'safavid-empire',
  'qajar-dynasty',
  'mohammad-reza-shah',
  'modern-iran',
]);

export default function HistoryHub() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>{t(APP.explore)}</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{t(APP.history)}</Text>
          <Text style={styles.glyph}>تاریخ</Text>
        </View>
        <Text style={[styles.subtitle, getLang() === 'fa' && { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl', fontSize: 15, lineHeight: 30 }]}>{getLang() === 'fa' ? 'داستان ایران، از نخستین امپراتوری‌ها تا روزگار نو، از خلال زندگی‌ها و سلسله‌هایی که آن را شکل دادند.' : 'The story of Iran, from the first empires to the modern age, told through the lives and dynasties that shaped it.'}</Text>

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
                        {e.topicKey && MOST_LIKED.has(e.topicKey) && (
                          <View style={styles.liked}>
                            {/* A pearl rather than a stamp: white at the top
                                warming into the faintest garnet, with a light
                                band across the upper half catching the shine. */}
                            <LinearGradient
                              colors={['#FFFFFF', colors.accent + '24']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 0, y: 1 }}
                              style={StyleSheet.absoluteFill as any}
                              pointerEvents="none"
                            />
                            <View style={styles.likedShine} pointerEvents="none" />
                            <Text style={[styles.likedText, getLang() === 'fa' && styles.likedTextFa]}>{t(APP.mostLiked)}</Text>
                          </View>
                        )}
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
  // Quieter than NEW, which is filled: this one states a fact about
  // readers rather than announcing something, so it only outlines.
  // Smaller than NEW and SOON: it is a note about readers, not a status.
  liked: { borderRadius: 999, borderWidth: 0.75, borderColor: colors.accent + '66', paddingHorizontal: 6, paddingVertical: 2, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  likedShine: { position: 'absolute', left: 1, right: 1, top: 1, height: '45%', borderTopLeftRadius: 999, borderTopRightRadius: 999, backgroundColor: 'rgba(255,255,255,0.75)' },
  likedText: { fontFamily: fonts.bodyStrong, fontSize: 7.5, letterSpacing: 0.9, color: colors.accent },
  // Persian is set, not spaced out: letterSpacing breaks the joins.
  likedTextFa: { fontFamily: fonts.persian, fontSize: 9, letterSpacing: 0 },
});
