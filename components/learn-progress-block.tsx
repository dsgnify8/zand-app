import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { STAGES } from '@/constants/journey';
import { isLessonDone, useLearnProgress } from '@/lib/learn-progress';
import { useStrength } from '@/lib/word-strength';
import { useLevel } from '@/lib/learn-level';

export function LearnProgressBlock() {
  useLearnProgress();
  const { solid, shaky, due } = useStrength();
  const { asked, info } = useLevel();

  const lessons = STAGES.flatMap((s) => s.steps).filter((x) => x.kind === 'lesson' && x.unit && x.lesson);
  const done = lessons.filter((x) => isLessonDone(x.unit!, x.lesson!)).length;
  const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;

  // which chapter you are in
  const current = STAGES.find((st) =>
    st.steps.some((x) => x.kind === 'lesson' && x.unit && x.lesson && !isLessonDone(x.unit, x.lesson)),
  );
  const chaptersDone = STAGES.filter((st) =>
    st.steps.filter((x) => x.kind === 'lesson' && x.unit && x.lesson)
      .every((x) => isLessonDone(x.unit!, x.lesson!)),
  ).length;

  if (!asked && done === 0) {
    return (
      <Pressable style={s.empty} onPress={() => router.navigate('/learn/level' as any)}>
        <Text style={s.emptyFa}>فارسی</Text>
        <Text style={s.emptyT}>You have not started Persian yet</Text>
        <Text style={s.emptyX}>Two questions to find your level, then a path from there.</Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={s.card} onPress={() => router.navigate('/learn/map' as any)}>
      <View style={s.head}>
        <View style={{ flex: 1 }}>
          <Text style={s.kicker}>PERSIAN</Text>
          <Text style={s.chapter}>
            {current ? current.roman + '  ·  ' + current.title : 'Route finished'}
          </Text>
        </View>
        {info ? <Text style={s.level}>{info.name}</Text> : null}
      </View>

      <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>
      <Text style={s.pctT}>{done} of {lessons.length} lessons  ·  {pct}%</Text>

      <View style={s.row}>
        <View style={s.cell}>
          <Text style={s.n}>{chaptersDone}</Text>
          <Text style={s.k}>chapters</Text>
        </View>
        <View style={[s.cell, s.div]}>
          <Text style={s.n}>{solid}</Text>
          <Text style={s.k}>words solid</Text>
        </View>
        <View style={[s.cell, s.div]}>
          <Text style={s.n}>{shaky}</Text>
          <Text style={s.k}>still shaky</Text>
        </View>
      </View>

      {due > 0 ? (
        <Pressable style={s.due} onPress={() => router.navigate('/learn/review' as any)}>
          <Ionicons name="repeat-outline" size={14} color={lw.green} />
          <Text style={s.dueT}>{due} word{due === 1 ? '' : 's'} ready to come round again</Text>
          <Ionicons name="chevron-forward" size={14} color={lw.muted} />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: lw.greenWash, borderRadius: 16, padding: spacing.lg },
  head: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 2, color: lw.green },
  chapter: { fontFamily: fonts.body, fontSize: 17, color: lw.greenDeep, marginTop: 3 },
  level: { fontFamily: fonts.body, fontSize: 11, color: lw.muted },

  track: { height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.7)', overflow: 'hidden', marginTop: spacing.md },
  fill: { height: 3, borderRadius: 2, backgroundColor: lw.green },
  pctT: { fontFamily: fonts.body, fontSize: 11, color: lw.inkSoft, marginTop: 5 },

  row: { flexDirection: 'row', marginTop: spacing.lg },
  cell: { flex: 1, alignItems: 'center' },
  div: { borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.8)' },
  n: { fontFamily: fonts.body, fontSize: 22, color: lw.greenDeep },
  k: { fontFamily: fonts.body, fontSize: 10.5, color: lw.inkSoft, marginTop: 1 },

  due: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: 'rgba(255,255,255,0.72)', borderRadius: 11, paddingVertical: 9, paddingHorizontal: spacing.md, marginTop: spacing.lg },
  dueT: { flex: 1, fontFamily: fonts.body, fontSize: 12, color: lw.inkSoft },

  empty: { backgroundColor: lw.greenWash, borderRadius: 16, padding: spacing.xl, alignItems: 'center' },
  emptyFa: { fontFamily: fonts.persian, fontSize: 30, color: lw.green, opacity: 0.5 },
  emptyT: { fontFamily: fonts.body, fontSize: 16, color: lw.greenDeep, marginTop: spacing.sm },
  emptyX: { fontFamily: fonts.body, fontSize: 12, color: lw.inkSoft, textAlign: 'center', marginTop: 4 },
});
