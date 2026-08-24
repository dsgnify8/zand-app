import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { STAGES } from '@/constants/journey';
import { UNITS } from '@/constants/curriculum';
import { speak, prewarm } from '@/lib/speak';
import { record } from '@/lib/word-strength';
import { Art } from '@/components/lang-art';
import { LEARN } from '@/constants/i18n/learn';
import { useLang, t as tl } from '@/lib/i18n';

type Q =
  | { kind: 'meaning'; fa: string; tr: string; answer: string; options: string[] }
  | { kind: 'hear'; fa: string; tr: string; en: string; answer: string; options: string[]; trs: Record<string, string> }
  | { kind: 'produce'; en: string; answer: string; tr: string; options: string[]; trs: Record<string, string> };

function shuffle<T>(a: T[]) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

/* Build a mixed test from every word a stage taught. */
function questionsFor(stageKey?: string): Q[] {
  const stage = STAGES.find((s) => s.key === stageKey);
  if (!stage) return [];
  const unitKeys = Array.from(new Set(stage.steps.filter((s) => s.unit).map((s) => s.unit as string)));

  const words: { fa: string; tr: string; en: string }[] = [];
  const seen = new Set<string>();
  for (const uk of unitKeys) {
    const u = UNITS.find((x) => x.key === uk);
    if (!u) continue;
    for (const l of u.lessons) {
      for (const st of l.steps as any[]) {
        if ((st.t === 'meet' || st.t === 'sentence') && st.fa && !seen.has(st.fa)) {
          seen.add(st.fa);
          words.push({ fa: st.fa, tr: st.tr, en: st.en });
        }
      }
    }
  }
  if (words.length < 4) return [];

  const qs: Q[] = [];
  for (const w of shuffle(words).slice(0, 10)) {
    const others = shuffle(words.filter((x) => x.fa !== w.fa)).slice(0, 3);
    const roll = Math.random();

    if (roll < 0.4) {
      qs.push({
        kind: 'meaning', fa: w.fa, tr: w.tr, answer: w.en,
        options: shuffle([w.en, ...others.map((o) => o.en)]),
      });
    } else if (roll < 0.7) {
      const trs: Record<string, string> = {};
      [w, ...others].forEach((o) => { trs[o.fa] = o.tr; });
      qs.push({
        kind: 'hear', fa: w.fa, tr: w.tr, en: w.en, answer: w.fa,
        options: shuffle([w.fa, ...others.map((o) => o.fa)]), trs,
      });
    } else {
      const trs: Record<string, string> = {};
      [w, ...others].forEach((o) => { trs[o.fa] = o.tr; });
      qs.push({
        kind: 'produce', en: w.en, answer: w.fa, tr: w.tr,
        options: shuffle([w.fa, ...others.map((o) => o.fa)]), trs,
      });
    }
  }
  return qs;
}

export default function CheckpointScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { stage } = useLocalSearchParams<{ stage?: string }>();
  const stageInfo = STAGES.find((s) => s.key === stage);
  const qs = useMemo(() => questionsFor(stage), [stage]);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(false);

  useMemo(() => { prewarm(qs.map((q: any) => q.fa ?? q.answer)); }, [qs.length]);

  if (qs.length === 0) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.mid}><Text style={s.muted}>{tl(LEARN.finishLessonsFirst)}</Text></View>
      </SafeAreaView>
    );
  }

  const q = qs[i] as any;
  const correct = picked === q.answer;

  if (done) {
    const pct = Math.round((right / qs.length) * 100);
    const passed = pct >= 70;
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.mid}>
          <Art name="arch" size={96} style={{ opacity: 0.5, marginBottom: 6 }} />
          <Text style={s.finFa}>{passed ? 'قبول' : 'نزدیک بود'}</Text>
          <Text style={s.finT}>{right} of {qs.length}</Text>
          <View style={s.rule} />
          <Text style={s.finX}>
            {passed
              ? 'This chapter is yours. The words you missed will come round again in review.'
              : 'Worth going back through the chapter before moving on. Nothing is lost by rereading.'}
          </Text>
          <Pressable style={s.cta} onPress={() => { console.log('[X] pressed on checkpoint'); router.replace('/learn/map' as any); }}>
            <Text style={s.ctaT}>{passed ? 'Carry on' : 'Back to the chapter'}</Text>
          </Pressable>
          <Pressable hitSlop={10} onPress={() => { setI(0); setPicked(null); setRight(0); setDone(false); }}>
            <Text style={s.again}>{tl(LEARN.tryAgain)}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const answer = (o: string) => {
    if (picked) return;
    setPicked(o);
    const got = o === q.answer;
    record(q.fa ?? q.answer, got);
    if (got) setRight((v) => v + 1);
  };

  const next = () => {
    if (i + 1 >= qs.length) { setDone(true); return; }
    setI((v) => v + 1); setPicked(null);
  };

  const pct = Math.round((i / qs.length) * 100);

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => { console.log('[X] pressed on checkpoint'); router.replace('/learn/map' as any); }}>
          <Ionicons name="close" size={22} color={lw.muted} />
        </Pressable>
        <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>
        <Text style={s.count}>{i + 1}/{qs.length}</Text>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.chapter}>{stageInfo?.roman}  ·  {stageInfo?.title}</Text>

        {q.kind === 'meaning' ? (
          <>
            <Text style={s.label}>{tl(LEARN.whatDoesThisMean)}</Text>
            <Pressable style={s.faWrap} onPress={() => speak(q.fa, 'fa')}>
              <Text style={s.fa}>{q.fa}</Text>
              <Ionicons name="volume-low-outline" size={15} color={lw.muted} />
            </Pressable>
          </>
        ) : q.kind === 'hear' ? (
          <>
            <Text style={s.label}>{tl(LEARN.whatDidYouHear)}</Text>
            <Pressable style={s.playBig} onPress={() => speak(q.fa, 'fa')}>
              <Ionicons name="volume-medium-outline" size={26} color={lw.green} />
            </Pressable>
          </>
        ) : (
          <>
            <Text style={s.label}>{tl(LEARN.howDoYouSay)}</Text>
            <Text style={s.prompt}>{q.en}</Text>
          </>
        )}

        <View style={{ gap: spacing.sm, marginTop: spacing.xl }}>
          {q.options.map((o: string) => {
            const isAnswer = o === q.answer;
            const isPicked = o === picked;
            const persian = q.kind !== 'meaning';
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
                <Text style={[persian ? s.optFa : s.optT, picked && isAnswer && s.optTRight]}>{o}</Text>
                {persian && q.trs?.[o] ? <Text style={s.optTr}>{q.trs[o]}</Text> : null}
              </Pressable>
            );
          })}
        </View>

        {picked ? (
          <View style={[s.why, correct ? s.whyRight : s.whyWrong]}>
            <Text style={s.whyT}>{q.tr}{q.en ? '  ·  ' + q.en : ''}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={s.footer}>
        <Pressable style={[s.cta, !picked && s.ctaOff]} disabled={!picked} onPress={next}>
          <Text style={s.ctaT}>{i + 1 >= qs.length ? 'Finish' : 'Continue'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  mid: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  muted: { fontFamily: fonts.body, fontSize: 14, color: lw.muted, textAlign: 'center' },

  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  track: { flex: 1, height: 3, borderRadius: 2, backgroundColor: lw.greenPale, overflow: 'hidden' },
  fill: { height: 3, borderRadius: 2, backgroundColor: lw.green },
  count: { fontFamily: fonts.body, fontSize: 12, color: lw.muted },

  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  chapter: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2, color: lw.greenPale, textAlign: 'center' },
  label: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2.5, color: lw.muted, textAlign: 'center', marginTop: spacing.lg },

  faWrap: { alignItems: 'center', marginTop: spacing.lg, gap: spacing.sm },
  fa: { fontFamily: fonts.persian, fontSize: 42, lineHeight: 70, color: lw.ink },
  playBig: { width: 62, height: 62, borderRadius: 31, backgroundColor: lw.greenWash, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: spacing.xl },
  prompt: { fontFamily: fonts.body, fontSize: 24, lineHeight: 32, color: lw.ink, textAlign: 'center', marginTop: spacing.lg },

  opt: { borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface, borderRadius: 14, paddingVertical: 14, paddingHorizontal: spacing.lg },
  optRight: { borderColor: lw.green, backgroundColor: lw.greenWash },
  optWrong: { borderColor: lw.wrong },
  optFade: { opacity: 0.4 },
  optT: { fontFamily: fonts.body, fontSize: 15.5, color: lw.ink, textAlign: 'center' },
  optFa: { fontFamily: fonts.persian, fontSize: 20, color: lw.ink, textAlign: 'center' },
  optTr: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, textAlign: 'center', marginTop: 3 },
  optTRight: { color: lw.green },

  why: { borderRadius: 12, padding: spacing.lg, marginTop: spacing.lg, alignItems: 'center' },
  whyRight: { backgroundColor: lw.greenWash },
  whyWrong: { backgroundColor: '#F6ECE9' },
  whyT: { fontFamily: fonts.body, fontSize: 13.5, color: lw.inkSoft },

  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.md },
  cta: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 15, alignItems: 'center', alignSelf: 'stretch' },
  ctaOff: { backgroundColor: lw.greenPale },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },

  finFa: { fontFamily: fonts.persian, fontSize: 44, lineHeight: 70, color: lw.green },
  finT: { fontFamily: fonts.body, fontSize: 21, color: lw.ink, marginTop: spacing.sm },
  finX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: lw.muted, textAlign: 'center', marginBottom: spacing.xxl },
  rule: { width: 40, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg },
  again: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: spacing.lg },
});
