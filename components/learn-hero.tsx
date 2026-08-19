import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { STAGES } from '@/constants/journey';
import { isLessonDone, useLearnProgress } from '@/lib/learn-progress';
import { useLevel } from '@/lib/learn-level';
import { useStrength } from '@/lib/word-strength';
import { useAuth } from '@/lib/auth';
import { getLang } from '@/lib/i18n';

export function LearnHero() {
  const { session } = useAuth();
  useLearnProgress();
  const { asked, info } = useLevel();
  const { solid, due } = useStrength();

  // where you are on the route
  const all = STAGES.flatMap((st) => st.steps.map((x) => ({ ...x, stage: st })));
  const lessons = all.filter((x) => x.kind === 'lesson' && x.unit && x.lesson);
  const doneCount = lessons.filter((x) => isLessonDone(x.unit!, x.lesson!)).length;
  const next = all.find((x) => !(x.kind === 'lesson' && x.unit && x.lesson && isLessonDone(x.unit, x.lesson)));
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  // first run: the questionnaire is the way in
  if (!asked) {
    return (
      <Pressable style={s.card} onPress={() => router.navigate('/learn/level' as any)}>
        <LinearGradient colors={['#E9F0E6', '#D6E4D2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <Text style={s.fa}>فارسی</Text>
        <Text style={s.kicker}>BEGIN HERE</Text>
        <Text style={s.title}>Learn Persian</Text>
        <Text style={s.blurb}>
          Two questions to find your level, then a path that starts exactly where you are.
        </Text>
        <View style={s.go}>
          <Text style={s.goT}>Start</Text>
          <Ionicons name="arrow-forward" size={15} color="#FFF" />
        </View>
      </Pressable>
    );
  }

  return (
    <View>
      {!session ? (
        <Pressable
          style={s.signInLine}
          onPress={() => router.navigate('/onboarding?step=2&next=/learn' as any)}
        >
          <Ionicons name="cloud-outline" size={12} color={lw.muted} />
          <Text style={s.signInT}>
            {getLang() === 'fa' ? 'برای ذخیرهٔ مسیرت وارد شو' : 'Sign in to keep your journey'}
          </Text>
        </Pressable>
      ) : null}

      <Pressable style={s.card} onPress={() => router.navigate('/learn/map' as any)}>
        <LinearGradient colors={['#E9F0E6', '#D6E4D2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <Text style={s.fa}>فارسی</Text>

        <Text style={s.kicker}>
          {doneCount === 0
            ? 'YOUR LEARNING WORLD'
            : (next?.stage ? next.stage.roman + '  ·  ' + next.stage.title : 'YOUR PATH')}
        </Text>
        <Text style={s.title}>
          {doneCount === 0
            ? 'Your journey starts here'
            : (next ? next.title : 'You have finished the route')}
        </Text>
        <Text style={s.blurb}>
          {doneCount === 0
            ? 'The letters, then words, then whole sentences. One short step at a time.'
            : (next ? next.sub : 'Keep the words alive with review.')}
        </Text>

        <View style={s.track}>
          <View style={[s.fill, { width: (pct + '%') as any }]} />
        </View>
        <View style={s.metaRow}>
          <Text style={s.meta}>{doneCount} of {lessons.length} lessons</Text>
          {info ? <Text style={s.meta}>{info.name}</Text> : null}
        </View>

        <View style={s.go}>
          <Text style={s.goT}>{doneCount === 0 ? 'Start' : 'Continue'}</Text>
          <Ionicons name="arrow-forward" size={15} color="#FFF" />
        </View>
      </Pressable>

      <View style={s.strip}>
<Pressable
          style={[s.chip, due === 0 && s.chipOff]}
          disabled={due === 0}
          onPress={() => router.navigate('/learn/review' as any)}
        >
          <Ionicons name="repeat-outline" size={15} color={due === 0 ? lw.muted : lw.green} />
          <Text style={[s.chipT, due === 0 && { color: lw.muted }]}>Review</Text>
          {due > 0 ? <View style={s.badge}><Text style={s.badgeT}>{due}</Text></View> : null}
        </Pressable>
        <Pressable style={s.chip} onPress={() => router.navigate('/learn/read' as any)}>
          <Ionicons name="book-outline" size={15} color={lw.green} />
          <Text style={s.chipT}>Read</Text>
        </Pressable>
        <Pressable style={s.chip} onPress={() => router.navigate('/learn/phrasebook' as any)}>
          <Ionicons name="chatbubbles-outline" size={15} color={lw.green} />
          <Text style={s.chipT}>Phrases</Text>
        </Pressable>
      </View>

      {solid > 0 ? (
        <Text style={s.solid}>
          {solid} word{solid === 1 ? '' : 's'} you know for certain
          {due > 0 ? '  ·  ' + due + ' ready to come round again' : ''}
        </Text>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  signInLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 6, marginBottom: 8 },
  signInT: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted },
  card: { borderRadius: 22, overflow: 'hidden', padding: spacing.xl, paddingTop: spacing.xxl, minHeight: 230, justifyContent: 'flex-end' },
  fa: { position: 'absolute', top: 14, right: 18, fontFamily: fonts.persian, fontSize: 54, color: lw.green, opacity: 0.14 },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2.2, color: lw.green },
  title: { fontFamily: fonts.body, fontSize: 27, lineHeight: 34, color: lw.greenDeep, marginTop: spacing.sm },
  blurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: lw.inkSoft, marginTop: 6, maxWidth: 280 },

  track: { height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.6)', overflow: 'hidden', marginTop: spacing.lg },
  fill: { height: 3, borderRadius: 2, backgroundColor: lw.green },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  meta: { fontFamily: fonts.body, fontSize: 11, color: lw.inkSoft },

  go: { flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'flex-start', backgroundColor: lw.green, borderRadius: 22, paddingVertical: 10, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  goT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },

  strip: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  chipOff: { opacity: 0.75 },
  chip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: lw.surface, borderWidth: 1, borderColor: lw.hair, borderRadius: 14, paddingVertical: 12 },
  chipT: { fontFamily: fonts.body, fontSize: 13, color: lw.ink },
  badge: { backgroundColor: lw.green, borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeT: { fontFamily: fonts.bodyStrong, fontSize: 10, color: '#FFF' },

  solid: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, textAlign: 'center', marginTop: spacing.md },
});
