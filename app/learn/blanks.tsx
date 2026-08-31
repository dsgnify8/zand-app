import { useEffect, useRef, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { lessonStep, markPartial, markStepDone } from '@/lib/learn-progress';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { UNITS } from '@/constants/curriculum';
import { speak, prewarm } from '@/lib/speak';
import { LEARN } from '@/constants/i18n/learn';
import { useLang, t as tl } from '@/lib/i18n';

type Round = {
  before: string;   // words before the gap
  after: string;    // words after it
  answer: string;   // the missing word
  tr: string;       // transliteration of the whole sentence
  en: string;
  full: string;
  options: string[];
  optionTrs: Record<string, string>;
};

/* Build gap-fill rounds out of the sentences each stage taught. */
function roundsFor(stage?: string): Round[] {
  const units = stage ? UNITS.filter((u) => u.key === stage) : UNITS;
  const sentences: { fa: string; tr: string; en: string }[] = [];
  const words = new Set<string>();

  for (const u of units) {
    for (const l of u.lessons) {
      for (const st of l.steps as any[]) {
        if (st.t === 'sentence' && st.fa) sentences.push({ fa: st.fa, tr: st.tr, en: st.en });
        if (st.t === 'meet' && st.fa && !st.fa.includes(' ')) words.add(st.fa);
      }
    }
  }

  const pool = Array.from(words);
  const out: Round[] = [];

  for (const sen of sentences) {
    const parts = sen.fa.split(' ').filter(Boolean);
    if (parts.length < 2) continue;
    // hide a word that is not the first, so there is context to read
    const idx = Math.max(1, Math.floor(Math.random() * parts.length));
    const answer = parts[idx].replace(/[،؟]/g, '');
    if (!answer) continue;

    const decoys = pool.filter((w) => w !== answer).sort(() => Math.random() - 0.5).slice(0, 3);
    if (decoys.length < 2) continue;

    const options = [answer, ...decoys].sort(() => Math.random() - 0.5);
    const optionTrs: Record<string, string> = {};
    for (const o of options) {
      // find the transliteration from whichever step taught it
      for (const u of UNITS) for (const l of u.lessons) for (const st of l.steps as any[]) {
        if (st.t === 'meet' && st.fa === o) optionTrs[o] = st.tr;
      }
    }

    out.push({
      before: parts.slice(0, idx).join(' '),
      after: parts.slice(idx + 1).join(' '),
      answer,
      tr: sen.tr,
      en: sen.en,
      full: sen.fa,
      options,
      optionTrs,
    });
  }

  return out.sort(() => Math.random() - 0.5).slice(0, 8);
}

export default function BlanksScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  // Which door, not just which neighbourhood — a stage holds several
  // steps and the screen has to know which one it is to record it.
  const { stage, step } = useLocalSearchParams<{ stage?: string; step?: string }>();
  const rounds = useMemo(() => roundsFor(stage), [stage]);

  // Resume where they stopped. Keyed by the step, which for these is
  // both halves of the pair — they have no unit and lesson of their own.
  const [i, setI] = useState(0);
  const resumed = useRef(false);
  useEffect(() => {
    if (resumed.current || !step) return;
    const at = lessonStep(String(step), String(step));
    if (at > 0) setI(at);
    resumed.current = true;
  }, [step]);
  const [picked, setPicked] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(false);

  useMemo(() => { prewarm(rounds.map((r) => r.full)); }, [rounds.length]);

  if (rounds.length === 0) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.top}>
          <Pressable hitSlop={12} onPress={() => {
            // How far in, so coming back returns them here.
            if (step && i > 0) markPartial(String(step), String(step), Math.round((i / rounds.length) * 100), i);
            router.replace('/learn/map' as any);
          }}>
            <Ionicons name="close" size={22} color={lw.muted} />
          </Pressable>
        </View>
        <View style={s.mid}>
          <Text style={s.muted}>{tl(LEARN.notEnoughSentences)}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const r = rounds[i];
  const correct = picked === r.answer;

  if (done) {
    const pct = Math.round((right / rounds.length) * 100);
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.mid}>
          <Text style={s.finFa}>{pct >= 75 ? 'آفرین' : 'ادامه بده'}</Text>
          <Text style={s.finT}>{right} of {rounds.length}</Text>
          <View style={s.rule} />
          <Text style={s.finX}>
            {pct >= 75 ? 'You are reading, not guessing.' : 'Go back through the lessons and these will come.'}
          </Text>
          <Pressable style={s.cta} onPress={() => { router.replace('/learn/map' as any); }}>
            <Text style={s.ctaT}>{tl(LEARN.done)}</Text>
          </Pressable>
          <Pressable hitSlop={10} onPress={() => { setI(0); setPicked(null); setRight(0); setDone(false); }}>
            <Text style={s.again}>{tl(LEARN.again)}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const answer = (o: string) => {
    if (picked) return;
    setPicked(o);
    if (o === r.answer) setRight((v) => v + 1);
  };

  const next = () => {
    if (i + 1 >= rounds.length) {
      setDone(true);
      // With the score. A quiz finished at forty percent is finished, but
      // the number is what tells the map whether to send them back.
      // With the score. `next` fires from its own button press, so the
      // last answer has already settled into `right`.
      if (step) markStepDone(String(step), Math.round((right / rounds.length) * 100));
      return;
    }
    setI((v) => v + 1); setPicked(null);
  };

  const pct = Math.round((i / rounds.length) * 100);

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => {
            // How far in, so coming back returns them here.
            if (step && i > 0) markPartial(String(step), String(step), Math.round((i / rounds.length) * 100), i);
            router.replace('/learn/map' as any);
          }}>
          <Ionicons name="close" size={22} color={lw.muted} />
        </Pressable>
        <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>
        <Text style={s.count}>{i + 1}/{rounds.length}</Text>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.label}>{tl(LEARN.finishTheSentence)}</Text>
        <Text style={s.en}>{r.en}</Text>

        <View style={s.sentence}>
          <Text style={s.fa}>
            {r.before}
            <Text style={picked ? (correct ? s.gapRight : s.gapWrong) : s.gap}>
              {picked ? ' ' + picked + ' ' : '  ——  '}
            </Text>
            {r.after}
          </Text>
          {picked ? (
            <Pressable style={s.say} onPress={() => speak(r.full, 'fa')}>
              <Ionicons name="volume-medium-outline" size={15} color={lw.muted} />
              <Text style={s.sayT}>hear the whole sentence</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={{ gap: spacing.sm, marginTop: spacing.xl }}>
          {r.options.map((o) => {
            const isAnswer = o === r.answer;
            const isPicked = o === picked;
            return (
              <Pressable
                key={o}
                disabled={!!picked}
                onPress={() => answer(o)}
                style={[
                  s.opt,
                  picked && isAnswer && s.optRight,
                  picked && isPicked && !isAnswer && s.optWrong,
                  picked && !isAnswer && !isPicked && s.optFade,
                ]}
              >
                <Text style={[s.optT, picked && isAnswer && s.optTRight]}>{o}</Text>
                {r.optionTrs[o] ? <Text style={s.optTr}>{r.optionTrs[o]}</Text> : null}
              </Pressable>
            );
          })}
        </View>

        {picked ? (
          <View style={[s.why, correct ? s.whyRight : s.whyWrong]}>
            <Text style={s.whyT}>{r.tr}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={s.footer}>
        <Pressable style={[s.cta, !picked && s.ctaOff]} disabled={!picked} onPress={next}>
          <Text style={s.ctaT}>{i + 1 >= rounds.length ? 'Finish' : 'Continue'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  mid: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  muted: { fontFamily: fonts.body, fontSize: 14, color: lw.muted },

  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  track: { flex: 1, height: 3, borderRadius: 2, backgroundColor: lw.greenPale, overflow: 'hidden' },
  fill: { height: 3, borderRadius: 2, backgroundColor: lw.green },
  count: { fontFamily: fonts.body, fontSize: 12, color: lw.muted },

  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  label: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2.5, color: lw.muted },
  en: { fontFamily: fonts.body, fontSize: 19, lineHeight: 27, color: lw.ink, marginTop: spacing.sm },

  sentence: { backgroundColor: lw.surface, borderWidth: 1, borderColor: lw.hair, borderRadius: 16, padding: spacing.xl, marginTop: spacing.lg, alignItems: 'center' },
  fa: { fontFamily: fonts.persian, fontSize: 26, lineHeight: 50, color: lw.ink, textAlign: 'center' },
  gap: { color: lw.muted },
  gapRight: { color: lw.green },
  gapWrong: { color: lw.wrong },
  say: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.md },
  sayT: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted },

  opt: { borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface, borderRadius: 14, paddingVertical: 13, paddingHorizontal: spacing.lg },
  optRight: { borderColor: lw.green, backgroundColor: lw.greenWash },
  optWrong: { borderColor: lw.wrong },
  optFade: { opacity: 0.4 },
  optT: { fontFamily: fonts.persian, fontSize: 20, color: lw.ink, textAlign: 'center' },
  optTRight: { color: lw.green },
  optTr: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, textAlign: 'center', marginTop: 3 },

  why: { borderRadius: 12, padding: spacing.lg, marginTop: spacing.lg, alignItems: 'center' },
  whyRight: { backgroundColor: lw.greenWash },
  whyWrong: { backgroundColor: '#F6ECE9' },
  whyT: { fontFamily: fonts.body, fontSize: 13.5, color: lw.inkSoft },

  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.md },
  cta: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 15, alignItems: 'center', alignSelf: 'stretch' },
  ctaOff: { backgroundColor: lw.greenPale },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },

  finFa: { fontFamily: fonts.persian, fontSize: 40, lineHeight: 64, color: lw.green },
  finT: { fontFamily: fonts.body, fontSize: 20, color: lw.ink, marginTop: spacing.sm },
  finX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: lw.muted, textAlign: 'center', marginBottom: spacing.xxl },
  rule: { width: 40, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg },
  again: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: spacing.lg },
});
