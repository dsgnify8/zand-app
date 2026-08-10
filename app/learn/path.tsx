import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { UNITS } from '@/constants/curriculum';
import { useLearnProgress, isLessonDone, lessonScore } from '@/lib/learn-progress';
import { useLevel } from '@/lib/learn-level';

export default function PathScreen() {
  useLearnProgress();
  const { info } = useLevel();

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Pressable hitSlop={10} onPress={() => router.navigate('/learn/level' as any)}>
          <Text style={s.change}>{info ? info.name : 'set your level'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.eyebrow}>YOUR PATH</Text>
        <Text style={s.title}>Persian,{'\n'}in order</Text>
        <Text style={s.sub}>
          Work down it, or go anywhere you like. Nothing is locked.
        </Text>

        <Pressable style={s.review} onPress={() => router.navigate('/learn/review' as any)}>
          <View style={s.reviewIcon}><Ionicons name="repeat" size={17} color={lw.green} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.reviewT}>Review what you know</Text>
            <Text style={s.reviewX}>Ten words, drawn from everything you have finished.</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={lw.muted} />
        </Pressable>

        {UNITS.map((u) => {
          const finished = u.lessons.filter((l) => isLessonDone(u.key, l.key)).length;
          return (
            <View key={u.key} style={s.unit}>
              <View style={s.unitHead}>
                <Text style={s.roman}>{u.roman}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.unitTitle}>{u.title}</Text>
                  <Text style={s.unitFa}>{u.titleFa}</Text>
                </View>
                <Text style={s.unitCount}>{finished}/{u.lessons.length}</Text>
              </View>

              <Text style={s.unitBlurb}>{u.blurb}</Text>

              <View style={s.lessons}>
                {u.lessons.map((l, i) => {
                  const done = isLessonDone(u.key, l.key);
                  const score = lessonScore(u.key, l.key);
                  return (
                    <Pressable
                      key={l.key}
                      style={s.lesson}
                      onPress={() => router.navigate(('/learn/lesson?unit=' + u.key + '&lesson=' + l.key) as any)}
                    >
                      <View style={[s.dot, done && s.dotOn]}>
                        {done ? <Ionicons name="checkmark" size={12} color="#FFF" /> : <Text style={s.dotN}>{i + 1}</Text>}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[s.lessonT, done && s.lessonTDone]}>{l.title}</Text>
                        <Text style={s.lessonX}>
                          {l.minutes} min
                          {score !== null ? '  ·  ' + score + '%' : ''}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={lw.muted} />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}

        <View style={s.more}>
          <Text style={s.moreT}>More units are being written.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  change: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted },

  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 3, color: lw.muted },
  title: { fontFamily: fonts.body, fontSize: 34, lineHeight: 41, color: lw.green, marginTop: spacing.sm },
  sub: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20, color: lw.inkSoft, marginTop: spacing.sm },

  review: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: lw.greenWash, borderRadius: 14, padding: spacing.lg, marginTop: spacing.xl },
  reviewIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: lw.surface, alignItems: 'center', justifyContent: 'center' },
  reviewT: { fontFamily: fonts.body, fontSize: 15.5, color: lw.ink },
  reviewX: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, marginTop: 2 },
  unit: { marginTop: spacing.xxl },
  unitHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  roman: { fontFamily: fonts.body, fontSize: 22, color: lw.greenPale, width: 34 },
  unitTitle: { fontFamily: fonts.body, fontSize: 19, color: lw.ink },
  unitFa: { fontFamily: fonts.persian, fontSize: 14, color: lw.muted, marginTop: 2 },
  unitCount: { fontFamily: fonts.body, fontSize: 12, color: lw.muted },
  unitBlurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: lw.muted, marginTop: spacing.sm, marginLeft: 34 + spacing.lg },

  lessons: { marginTop: spacing.lg, marginLeft: 34 + spacing.lg, gap: 2 },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  dot: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: lw.rule, alignItems: 'center', justifyContent: 'center' },
  dotOn: { backgroundColor: lw.green, borderColor: lw.green },
  dotN: { fontFamily: fonts.body, fontSize: 11, color: lw.muted },
  lessonT: { fontFamily: fonts.body, fontSize: 15.5, color: lw.ink },
  lessonTDone: { color: lw.inkSoft },
  lessonX: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, marginTop: 2 },

  more: { marginTop: spacing.xxl, paddingTop: spacing.xl, borderTopWidth: 1, borderTopColor: lw.hair, alignItems: 'center' },
  moreT: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted },
});
