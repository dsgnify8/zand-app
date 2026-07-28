import { useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { lessonByKey } from '@/constants/curriculum';
import { MeetStep, SenseStep, SentenceStep, NoteStep, ChoiceStep, BuildStep, WriteStep, LetterStep, VowelStep, GapStep, TypeStep } from '@/components/lesson-steps';
import { bump } from '@/lib/stats-store';
import { prewarm } from '@/lib/speak';
import { markLessonDone } from '@/lib/learn-progress';
import { markLearnDay } from '@/lib/stats-store';
import { useEffect } from 'react';

export default function LessonScreen() {
  const { unit, lesson } = useLocalSearchParams<{ unit: string; lesson: string }>();
  const l = lessonByKey(unit, lesson);

  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [done, setDone] = useState(false);
  const fade = useRef(new Animated.Value(1)).current;

  if (!l) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.mid}><Text style={s.muted}>Lesson not found.</Text></View>
      </SafeAreaView>
    );
  }

  // generate the audio for this lesson up front, so no tap waits on the network
  useEffect(() => {
    const phrases = l.steps
      .map((st: any) => st.fa)
      .filter(Boolean) as string[];
    prewarm(phrases);
  }, [l.key]);

  const step = l.steps[i];
  const isQuiz = step.t === 'choose' || step.t === 'listen' || step.t === 'build' || step.t === 'write' || step.t === 'gap' || step.t === 'type';
  const canGo = !isQuiz || answered;
  const pct = Math.round(((i + (answered ? 1 : 0)) / l.steps.length) * 100);

  const advance = () => {
    if (i + 1 >= l.steps.length) {
      bump('pagesRead');
      bump('lessonsFinished');
      markLearnDay();
      const pct = score.total ? Math.round((score.right / score.total) * 100) : 100;
      markLessonDone(String(unit), String(lesson), pct);
      setDone(true);
      return;
    }
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
    setTimeout(() => { setI((v) => v + 1); setAnswered(false); }, 120);
  };

  // Tapping the left edge steps back, but only on teaching screens.
  // On a question that would let you dodge having answered.
  const back = () => {
    if (i === 0) return;
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
    setTimeout(() => { setI((v) => v - 1); setAnswered(false); }, 120);
  };

  const resolve = (right: boolean) => {
    setAnswered(true);
    setScore((v) => ({ right: v.right + (right ? 1 : 0), total: v.total + 1 }));
  };

  if (done) {
    const pctScore = score.total ? Math.round((score.right / score.total) * 100) : 100;
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.finish}>
          <Text style={s.finishFa}>آفرین</Text>
          <Text style={s.finishT}>{l.title}</Text>
          <View style={s.finishRule} />
          {score.total > 0 ? (
            <Text style={s.finishScore}>{score.right} of {score.total} right  ·  {pctScore}%</Text>
          ) : (
            <Text style={s.finishScore}>Lesson complete</Text>
          )}
          <Pressable style={[s.cta, s.finishBtn]} onPress={() => router.back()}>
            <Text style={s.ctaT}>Done</Text>
          </Pressable>
          <Pressable hitSlop={10} onPress={() => { setI(0); setAnswered(false); setScore({ right: 0, total: 0 }); setDone(false); }}>
            <Text style={s.again}>Go through it again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="close" size={22} color={lw.muted} />
        </Pressable>
        <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>
        <Text style={s.count}>{i + 1}/{l.steps.length}</Text>
      </View>

      {!isQuiz && i > 0 ? (
        <Pressable style={s.backEdge} onPress={back} accessibilityLabel="Previous step">
          <View style={s.backHint}>
            <Ionicons name="chevron-back" size={15} color={lw.muted} />
          </View>
        </Pressable>
      ) : null}

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fade }}>
          {step.t === 'meet' ? <MeetStep s={step} /> : null}
          {step.t === 'sense' ? <SenseStep s={step} /> : null}
          {step.t === 'sentence' ? <SentenceStep s={step} /> : null}
          {step.t === 'note' ? <NoteStep s={step} /> : null}
          {step.t === 'letter' ? <LetterStep s={step} /> : null}
          {step.t === 'vowel' ? <VowelStep s={step} /> : null}
          {step.t === 'choose' ? (
            <ChoiceStep prompt={step.prompt} options={step.options} answer={step.answer} why={step.why} trs={(step as any).optionTrs} onResolve={resolve} />
          ) : null}
          {step.t === 'listen' ? (
            <ChoiceStep prompt="What did you hear?" options={step.options} answer={step.fa} why={step.tr + '  ·  ' + step.en} audio={step.fa} trs={(step as any).optionTrs} onResolve={resolve} />
          ) : null}
          {step.t === 'gap' ? <GapStep s={step} onResolve={resolve} /> : null}
          {step.t === 'build' ? <BuildStep s={step} onResolve={resolve} /> : null}
          {step.t === 'write' ? <WriteStep s={step} onResolve={resolve} /> : null}
          {step.t === 'type' ? <TypeStep s={step} onResolve={resolve} /> : null}
        </Animated.View>
      </ScrollView>

      <View style={s.footer}>
        <Pressable style={[s.cta, !canGo && s.ctaOff]} disabled={!canGo} onPress={advance}>
          <Text style={s.ctaT}>{i + 1 >= l.steps.length ? 'Finish' : 'Continue'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  mid: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { fontFamily: fonts.body, fontSize: 14, color: lw.muted },

  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  track: { flex: 1, height: 3, borderRadius: 2, backgroundColor: lw.greenPale, overflow: 'hidden' },
  fill: { height: 3, borderRadius: 2, backgroundColor: lw.green },
  count: { fontFamily: fonts.body, fontSize: 12, color: lw.muted },

  backEdge: { position: 'absolute', left: 0, top: 60, bottom: 90, width: 56, zIndex: 5, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 4 },
  backHint: { width: 26, height: 26, borderRadius: 13, backgroundColor: lw.greenWash, alignItems: 'center', justifyContent: 'center', opacity: 0.75 },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.md },

  cta: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 15, alignItems: 'center' },
  ctaOff: { backgroundColor: lw.greenPale },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },

  finish: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  finishBtn: { alignSelf: 'stretch' },
  finishFa: { fontFamily: fonts.persian, fontSize: 52, lineHeight: 80, color: lw.green },
  finishT: { fontFamily: fonts.body, fontSize: 22, color: lw.ink, marginTop: spacing.sm },
  finishRule: { width: 40, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg },
  finishScore: { fontFamily: fonts.body, fontSize: 14, color: lw.muted, marginBottom: spacing.xxl },
  again: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: spacing.lg },
});
