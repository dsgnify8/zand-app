import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ACHIEVEMENTS } from '@/constants/achievements';
import { useReading } from '@/lib/reading-store';
import { useProgress } from '@/lib/progress-store';
import { PERSIAN_ALPHABET } from '@/constants/persian-alphabet';
import { TOPICS } from '@/constants/education';

export function AchievementsGrid() {
  const { reading, percentFor } = useReading();
  const { learnedLetters, currentStreak } = useProgress();

  const finishedTopics = TOPICS.filter((t) => t.status === 'ready' && percentFor(t.key) >= 100).length;
  const anyChapterRead = Object.keys(reading).length > 0;
  const alphabetDone = PERSIAN_ALPHABET.every((l) => learnedLetters.includes(l.char));
  const s = currentStreak ?? 0;

  const earned: Record<string, boolean> = {
    'first-chapter': anyChapterRead,
    'finish-topic': finishedTopics >= 1,
    'alphabet': alphabetDone,
    'streak-3': s >= 3,
    'streak-7': s >= 7,
    'topics-3': finishedTopics >= 3,
    'topics-5': finishedTopics >= 5,
  };
  const earnedCount = Object.values(earned).filter(Boolean).length;

  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.label}>ACHIEVEMENTS</Text>
        <Text style={styles.count}>{earnedCount} of {ACHIEVEMENTS.length}</Text>
      </View>
      <View style={styles.grid}>
        {ACHIEVEMENTS.map((a) => {
          const got = !!earned[a.id];
          return (
            <View key={a.id} style={[styles.badge, got ? styles.badgeOn : styles.badgeOff]}>
              <View style={[styles.iconWrap, got ? styles.iconOn : styles.iconOff]}>
                <Ionicons name={(got ? a.icon : 'lock-closed-outline') as any} size={20} color={got ? colors.surface : colors.textSecondary} />
              </View>
              <Text style={[styles.title, !got && styles.titleOff]}>{a.title}</Text>
              <Text style={styles.desc}>{a.description}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.xl },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  label: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.textSecondary },
  count: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, color: colors.accent },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  badge: { flexGrow: 1, flexBasis: '45%', borderRadius: radius.lg, borderWidth: 1, padding: spacing.md },
  badgeOn: { backgroundColor: colors.surface, borderColor: colors.accent },
  badgeOff: { backgroundColor: colors.surface, borderColor: colors.border, opacity: 0.7 },
  iconWrap: { width: 40, height: 40, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  iconOn: { backgroundColor: colors.accent },
  iconOff: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  title: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  titleOff: { color: colors.textSecondary },
  desc: { fontFamily: fonts.body, fontSize: fontSize.xs, lineHeight: 16, color: colors.textSecondary, marginTop: 2 },
});
