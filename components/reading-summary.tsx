import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { useReading } from '@/lib/reading-store';
import { TOPICS } from '@/constants/education';

export function ReadingSummary() {
  const { reading, percentFor } = useReading();
  const entries = Object.values(reading);
  const started = entries.length;
  const finished = TOPICS.filter((t) => t.status === 'ready' && percentFor(t.key) >= 100).length;
  const pagesRead = entries.reduce((n, e) => n + (e.maxPageReached + 1), 0);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>YOUR READING</Text>
      <View style={styles.row}>
        <View style={styles.stat}><Text style={styles.value}>{started}</Text><Text style={styles.name}>Topics started</Text></View>
        <View style={styles.stat}><Text style={styles.value}>{finished}</Text><Text style={styles.name}>Finished</Text></View>
        <View style={styles.stat}><Text style={styles.value}>{pagesRead}</Text><Text style={styles.name}>Pages read</Text></View>
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
