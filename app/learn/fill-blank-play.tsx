import { useMemo, useRef, useState, useEffect } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { findCategory } from '@/constants/fill-blank';
import { useProgress } from '@/lib/progress-store';

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FillBlankPlay() {
  const { cat } = useLocalSearchParams<{ cat: string }>();
  const category = findCategory(cat);
  const { markActivity } = useProgress();

  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const banner = useRef(new Animated.Value(0)).current;

  useEffect(() => { markActivity(); }, [markActivity]);

  if (!category) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.center}><Text style={styles.notFound}>Category not found.</Text></View>
      </SafeAreaView>
    );
  }

  const q = category.questions[i];
  const options = useMemo(() => shuffle(q.options, i + 3), [i]);
  const total = category.questions.length;
  const correct = checked && selected === q.answer;

  const check = () => {
    if (!selected) return;
    const right = selected === q.answer;
    setChecked(true);
    if (right) setScore((s) => s + 1);
    Haptics.notificationAsync(right ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error).catch(() => {});
    Animated.spring(banner, { toValue: 1, friction: 8, tension: 90, useNativeDriver: true }).start();
  };
  const next = () => {
    banner.setValue(0);
    if (i + 1 >= total) { setDone(true); return; }
    setI((v) => v + 1); setSelected(null); setChecked(false);
  };
  const restart = () => { banner.setValue(0); setI(0); setSelected(null); setChecked(false); setScore(0); setDone(false); };

  const optState = (opt: string) => {
    if (!checked) return selected === opt ? 'selected' : 'idle';
    if (opt === q.answer) return 'correct';
    if (opt === selected) return 'wrong';
    return 'muted';
  };
  const bannerTranslate = banner.interpolate({ inputRange: [0, 1], outputRange: [160, 0] });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {!done ? (
          <>
            <View style={styles.topBar}>
              <Pressable hitSlop={10} onPress={() => router.back()}>
                <Ionicons name="close" size={26} color={colors.textSecondary} />
              </Pressable>
              <View style={styles.progressTrack}><View style={[styles.progressFill, { width: (Math.round(((checked ? i + 1 : i) / total) * 100) + '%') as any }]} /></View>
              <Text style={styles.counter}>{i + 1}/{total}</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.promptLabel}>COMPLETE THE SENTENCE</Text>
              <Text style={styles.prompt}>{q.en}</Text>

              <View style={styles.sentenceCard}>
                <Text style={styles.sentence}>
                  {q.before}
                  <Text style={[styles.blank, selected ? styles.blankFilled : null]}>{selected ?? ' ____ '}</Text>
                  {q.after}
                </Text>
                {checked ? <Text style={styles.sentenceTranslit}>{q.translit}</Text> : null}
              </View>

              <View style={styles.options}>
                {options.map((opt) => {
                  const st = optState(opt);
                  return (
                    <Pressable key={opt} style={[styles.option, st === 'selected' && styles.optSelected, st === 'correct' && styles.optCorrect, st === 'wrong' && styles.optWrong, st === 'muted' && styles.optMuted]} disabled={checked} onPress={() => setSelected(opt)}>
                      <Text style={[styles.optText, st === 'selected' && styles.optTextSelected, st === 'correct' && styles.optTextCorrect, st === 'wrong' && styles.optTextWrong, st === 'muted' && styles.optTextMuted]}>{opt}</Text>
                      {st === 'correct' ? <Ionicons name="checkmark-circle" size={20} color={colors.success} /> : null}
                      {st === 'wrong' ? <Ionicons name="close-circle" size={20} color={colors.error} /> : null}
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            <View style={styles.footer}>
              {!checked ? (
                <Pressable style={[styles.cta, !selected && styles.ctaDisabled]} disabled={!selected} onPress={check}>
                  <Text style={styles.ctaText}>Check</Text>
                </Pressable>
              ) : (
                <Animated.View style={[styles.bannerBox, correct ? styles.bannerGood : styles.bannerBad, { transform: [{ translateY: bannerTranslate }] }]}>
                  <View style={styles.bannerRow}>
                    <Ionicons name={correct ? 'checkmark-circle' : 'close-circle'} size={26} color={correct ? colors.success : colors.error} />
                    <View style={styles.bannerText}>
                      <Text style={[styles.bannerTitle, { color: correct ? colors.success : colors.error }]}>{correct ? 'Correct!' : 'Not quite'}</Text>
                      {!correct ? <Text style={styles.bannerAnswer}>Answer: {q.answer}  ·  {q.translit}</Text> : null}
                    </View>
                  </View>
                  <Pressable style={[styles.continue, { backgroundColor: correct ? colors.success : colors.error }]} onPress={next}>
                    <Text style={styles.continueText}>{i + 1 >= total ? 'Finish' : 'Continue'}</Text>
                  </Pressable>
                </Animated.View>
              )}
            </View>
          </>
        ) : (
          <View style={styles.summary}>
            <Text style={styles.summaryGlyph}>آفرین</Text>
            <Text style={styles.summaryTitle}>{category.title} complete</Text>
            <Text style={styles.summaryLine}>{score} of {total} correct</Text>
            <Pressable style={styles.primaryBtn} onPress={restart}><Text style={styles.primaryText}>Try again</Text></Pressable>
            <Pressable style={styles.secondaryBtn} onPress={() => router.back()}><Text style={styles.secondaryText}>Choose another category</Text></Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: spacing.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingTop: spacing.md },
  progressTrack: { flex: 1, height: 8, borderRadius: radius.pill, backgroundColor: colors.border, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: radius.pill, backgroundColor: colors.accent },
  counter: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.textSecondary },
  scroll: { flex: 1 },
  scrollBody: { paddingBottom: spacing.lg },
  promptLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.textSecondary, marginTop: spacing.xl },
  prompt: { fontFamily: fonts.heading, fontSize: 22, color: colors.textPrimary, marginTop: spacing.xs, lineHeight: 28 },
  sentenceCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.lg },
  sentence: { fontFamily: fonts.persian, fontSize: 23, lineHeight: 42, color: colors.textPrimary, textAlign: 'center', writingDirection: 'rtl' },
  blank: { color: colors.textSecondary, letterSpacing: 1 },
  blankFilled: { color: colors.accent, fontFamily: fonts.persian },
  sentenceTranslit: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },
  options: { marginTop: spacing.xl, gap: spacing.sm },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, paddingVertical: 14 },
  optSelected: { borderColor: colors.accent, backgroundColor: '#F1E7E9' },
  optCorrect: { borderColor: colors.success, backgroundColor: colors.successSoft },
  optWrong: { borderColor: colors.error, backgroundColor: colors.errorSoft },
  optMuted: { opacity: 0.45 },
  optText: { fontFamily: fonts.persian, fontSize: 19, color: colors.textPrimary },
  optTextSelected: { color: colors.accent },
  optTextCorrect: { color: colors.success },
  optTextWrong: { color: colors.error },
  optTextMuted: { color: colors.textSecondary },
  footer: { paddingVertical: spacing.md },
  cta: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center' },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.surface },
  bannerBox: { borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md },
  bannerGood: { backgroundColor: colors.successSoft },
  bannerBad: { backgroundColor: colors.errorSoft },
  bannerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  bannerText: { flex: 1 },
  bannerTitle: { fontFamily: fonts.heading, fontSize: fontSize.xl },
  bannerAnswer: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textPrimary, marginTop: 2 },
  continue: { borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center' },
  continueText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.surface },
  summary: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  summaryGlyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: colors.accent },
  summaryTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary, marginTop: spacing.sm },
  summaryLine: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary, marginTop: spacing.xs, marginBottom: spacing.xl },
  primaryBtn: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
  primaryText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.surface },
  secondaryBtn: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, marginTop: spacing.sm },
  secondaryText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.textSecondary },
});
