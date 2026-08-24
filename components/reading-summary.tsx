import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { useReading } from '@/lib/reading-store';
import { TOPICS } from '@/constants/education';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export function ReadingSummary() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { reading, percentFor } = useReading();
  const entries = Object.values(reading);
  const started = entries.length;
  const finished = TOPICS.filter((t) => t.status === 'ready' && percentFor(t.key) >= 100).length;
  const pagesRead = entries.reduce((n, e) => n + (e.maxPageReached + 1), 0);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{t(APP.yourReading)}</Text>
      <View style={styles.row}>
        <View style={styles.stat}><Text style={styles.value}>{started}</Text><Text style={styles.name}>{t(APP.topicsStarted)}</Text></View>
        <View style={styles.stat}><Text style={styles.value}>{finished}</Text><Text style={styles.name}>{t(APP.finished)}</Text></View>
        <View style={styles.stat}><Text style={styles.value}>{pagesRead}</Text><Text style={styles.name}>{t(APP.pagesRead)}</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.xl },
  label: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.textSecondary, marginBottom: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.lg, alignItems: 'center' },
  value: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.accent },
  name: { fontFamily: fonts.body, fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2, textAlign: 'center' },
});
