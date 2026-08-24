import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { STAGES } from '@/constants/journey';
import { isLessonDone, journeyPosition, useLearnProgress } from '@/lib/learn-progress';
import { useLevel } from '@/lib/learn-level';
import { useStats } from '@/lib/stats-store';

export function ContinueLearning() {
  useLearnProgress();
  const { asked } = useLevel();
  const stats = useStats();

  const all = STAGES.flatMap((st) => st.steps.map((x) => ({ ...x, stage: st })));
  const next = journeyPosition(all).next;
  const days = stats.learnDays ?? 0;

  return (
    <Pressable
      style={s.card}
      onPress={() => router.navigate((asked ? (next?.route ?? '/learn/map') : '/learn/level') as any)}
    >
      <LinearGradient colors={['#E9F0E6', '#D6E4D2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
      <Text style={s.fa}>فارسی</Text>

      <View style={{ flex: 1 }}>
        <Text style={s.kicker}>
          {!asked ? 'START LEARNING' : days > 0 ? 'CONTINUE LEARNING' : 'PICK IT BACK UP'}
        </Text>
        <Text style={s.title}>
          {!asked ? 'Learn Persian' : (next?.title ?? 'You have finished the route')}
        </Text>
        <Text style={s.sub} numberOfLines={2}>
          {!asked
            ? 'Find your level, then start exactly where you are.'
            : (next?.sub ?? 'Keep the words alive with review.')}
        </Text>

        {asked && days > 0 ? (
          <View style={s.streakRow}>
            <Ionicons name="leaf" size={12} color={lw.green} />
            <Text style={s.streakT}>{days} day{days === 1 ? '' : 's'} of Persian. Do not lose it.</Text>
          </View>
        ) : null}
      </View>

      <View style={s.go}>
        <Ionicons name="arrow-forward" size={16} color="#FFF" />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderRadius: 18, overflow: 'hidden', padding: spacing.lg, minHeight: 118 },
  fa: { position: 'absolute', top: 6, right: 14, fontFamily: fonts.persian, fontSize: 44, color: lw.green, opacity: 0.12 },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 2, color: lw.green },
  title: { fontFamily: fonts.body, fontSize: 19, lineHeight: 25, color: lw.greenDeep, marginTop: 5 },
  sub: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: lw.inkSoft, marginTop: 3, maxWidth: 230 },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.sm },
  streakT: { fontFamily: fonts.body, fontSize: 11, color: lw.green },
  go: { width: 34, height: 34, borderRadius: 17, backgroundColor: lw.green, alignItems: 'center', justifyContent: 'center' },
});
