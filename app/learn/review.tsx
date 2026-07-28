import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { UNITS } from '@/constants/curriculum';
import { isLessonDone, useLearnProgress } from '@/lib/learn-progress';
import { speak, prewarm } from '@/lib/speak';
import { prioritise, record } from '@/lib/word-strength';

type Card = { fa: string; tr: string; en: string };

/* Every word you have met in a finished lesson. */
function harvest(): Card[] {
  const out: Card[] = [];
  const seen = new Set<string>();
  for (const u of UNITS) {
    for (const l of u.lessons) {
      if (!isLessonDone(u.key, l.key)) continue;
      for (const st of l.steps as any[]) {
        if ((st.t === 'meet' || st.t === 'sentence') && st.fa && !seen.has(st.fa)) {
          seen.add(st.fa);
          out.push({ fa: st.fa, tr: st.tr, en: st.en });
        }
      }
    }
  }
  return out;
}

function shuffle<T>(a: T[]) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function ReviewScreen() {
  useLearnProgress();
  const pool = useMemo(() => harvest(), []);
  // shakiest and most overdue first, so review targets what is slipping
  const rounds = useMemo(() => prioritise(pool).slice(0, 10), [pool]);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(false);

  useMemo(() => { prewarm(rounds.map((r) => r.fa)); }, [rounds.length]);

  if (pool.length < 4) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.top}>
          <Pressable hitSlop={12} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
          </Pressable>
        </View>
        <View style={s.mid}>
          <Text style={s.emptyFa}>هنوز نه</Text>
          <Text style={s.emptyT}>Nothing to review yet</Text>
          <Text style={s.emptyX}>Finish a lesson or two and your words will collect here.</Text>
          <Pressable style={s.cta} onPress={() => router.replace('/learn/path' as any)}>
            <Text style={s.ctaT}>Go to your path</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const card = rounds[i];
  const options = useMemo(() => {
    const wrong = shuffle(pool.filter((p) => p.fa !== card.fa)).slice(0, 3);
    return shuffle([card, ...wrong]);
  }, [card.fa, pool.length]);

  const answer = (c: Card) => {
    if (picked) return;
    setPicked(c.fa);
    const got = c.fa === card.fa;
    record(card.fa, got);
    if (got) setRight((v) => v + 1);
  };

  const next = () => {
    if (i + 1 >= rounds.length) { setDone(true); return; }
    setI((v) => v + 1); setPicked(null);
  };

  if (done) {
    const pct = Math.round((right / rounds.length) * 100);
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.mid}>
          <Text style={s.emptyFa}>{pct >= 80 ? 'عالی' : 'خوب'}</Text>
          <Text style={s.emptyT}>{right} of {rounds.length}</Text>
          <View style={s.rule} />
          <Text style={s.emptyX}>
            {pct >= 80 ? 'These are yours now.' : 'The ones you missed will come round again.'}
          </Text>
          <Pressable style={s.cta} onPress={() => router.back()}>
            <Text style={s.ctaT}>Done</Text>
          </Pressable>
          <Pressable hitSlop={10} onPress={() => { setI(0); setPicked(null); setRight(0); setDone(false); }}>
            <Text style={s.again}>Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const pct = Math.round((i / rounds.length) * 100);

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="close" size={22} color={lw.muted} />
        </Pressable>
        <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>
        <Text style={s.count}>{i + 1}/{rounds.length}</Text>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.label}>WHAT DOES THIS MEAN</Text>

        <Pressable style={s.faWrap} onPress={() => speak(card.fa, 'fa')}>
          <Text style={s.fa}>{card.fa}</Text>
          <View style={s.sayRow}>
            <Ionicons name="volume-medium-outline" size={15} color={lw.muted} />
            <Text style={s.sayT}>hear it</Text>
          </View>
        </Pressable>

        <View style={{ gap: spacing.sm, marginTop: spacing.xl }}>
          {options.map((o) => {
            const isAnswer = o.fa === card.fa;
            const isPicked = o.fa === picked;
            return (
              <Pressable
                key={o.fa}
                disabled={!!picked}
                onPress={() => answer(o)}
                style={[
                  s.opt,
                  picked && isAnswer && s.optRight,
                  picked && isPicked && !isAnswer && s.optWrong,
                  picked && !isAnswer && !isPicked && s.optFade,
                ]}
              >
                <Text style={[s.optT, picked && isAnswer && s.optTRight]}>{o.en}</Text>
              </Pressable>
            );
          })}
        </View>

        {picked ? (
          <View style={s.reveal}>
            <Text style={s.revealTr}>{card.tr}</Text>
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
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  track: { flex: 1, height: 3, borderRadius: 2, backgroundColor: lw.greenPale, overflow: 'hidden' },
  fill: { height: 3, borderRadius: 2, backgroundColor: lw.green },
  count: { fontFamily: fonts.body, fontSize: 12, color: lw.muted },

  mid: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptyFa: { fontFamily: fonts.persian, fontSize: 44, lineHeight: 70, color: lw.green },
  emptyT: { fontFamily: fonts.body, fontSize: 21, color: lw.ink, marginTop: spacing.sm },
  emptyX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: lw.muted, textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.xxl },
  rule: { width: 40, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg },

  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  label: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2.5, color: lw.muted, textAlign: 'center' },
  faWrap: { alignItems: 'center', marginTop: spacing.xl },
  fa: { fontFamily: fonts.persian, fontSize: 46, lineHeight: 74, color: lw.ink },
  sayRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.sm },
  sayT: { fontFamily: fonts.body, fontSize: 12, color: lw.muted },

  opt: { borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface, borderRadius: 14, paddingVertical: 15, paddingHorizontal: spacing.lg },
  optRight: { borderColor: lw.green, backgroundColor: lw.greenWash },
  optWrong: { borderColor: lw.wrong },
  optFade: { opacity: 0.4 },
  optT: { fontFamily: fonts.body, fontSize: 15.5, color: lw.ink, textAlign: 'center' },
  optTRight: { color: lw.green },

  reveal: { alignItems: 'center', marginTop: spacing.xl },
  revealTr: { fontFamily: fonts.body, fontSize: 14, color: lw.muted },

  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.md },
  cta: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 15, alignItems: 'center', alignSelf: 'stretch' },
  ctaOff: { backgroundColor: lw.greenPale },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },
  again: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: spacing.lg },
});
