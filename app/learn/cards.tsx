import { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { UNITS } from '@/constants/curriculum';
import { speak, prewarm } from '@/lib/speak';

type Card = { fa: string; tr: string; en: string; literal?: string };

/* Every word taught in a stage, in the order it was taught. */
function cardsFor(stage?: string): Card[] {
  const seen = new Set<string>();
  const out: Card[] = [];
  const units = stage ? UNITS.filter((u) => u.key === stage) : UNITS;
  for (const u of units) {
    for (const l of u.lessons) {
      for (const st of l.steps as any[]) {
        if (st.t === 'meet' && st.fa && !seen.has(st.fa)) {
          seen.add(st.fa);
          out.push({ fa: st.fa, tr: st.tr, en: st.en, literal: st.literal });
        }
      }
    }
  }
  return out;
}

export default function CardsScreen() {
  const { stage } = useLocalSearchParams<{ stage?: string }>();
  const cards = useMemo(() => cardsFor(stage), [stage]);

  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const flip = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(0)).current;

  useMemo(() => { prewarm(cards.map((c) => c.fa)); }, [cards.length]);

  if (cards.length === 0) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.mid}><Text style={s.muted}>No cards here yet.</Text></View>
      </SafeAreaView>
    );
  }

  const card = cards[i];

  const reveal = () => {
    setShown(true);
    Animated.spring(flip, { toValue: 1, friction: 9, tension: 70, useNativeDriver: true }).start();
  };

  const advance = (gotIt: boolean) => {
    if (gotIt) setKnown((v) => [...v, card.fa]);
    if (i + 1 >= cards.length) { setDone(true); return; }
    Animated.sequence([
      Animated.timing(slide, { toValue: -1, duration: 160, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]).start();
    setTimeout(() => { setI((v) => v + 1); setShown(false); flip.setValue(0); }, 160);
  };

  if (done) {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.mid}>
          <Text style={s.finFa}>{known.length === cards.length ? 'همه رو بلدی' : 'خوب بود'}</Text>
          <Text style={s.finT}>{known.length} of {cards.length} known</Text>
          <View style={s.rule} />
          <Text style={s.finX}>
            {known.length === cards.length
              ? 'Every one of them. Come back tomorrow and see if they stayed.'
              : 'The ones you did not know will keep coming back until they stick.'}
          </Text>
          <Pressable style={s.cta} onPress={() => router.back()}>
            <Text style={s.ctaT}>Done</Text>
          </Pressable>
          <Pressable hitSlop={10} onPress={() => { setI(0); setShown(false); setKnown([]); setDone(false); flip.setValue(0); }}>
            <Text style={s.again}>Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const frontOp = flip.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 0] });
  const backOp = flip.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });
  const lift = flip.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
  const slideX = slide.interpolate({ inputRange: [-1, 0], outputRange: [-40, 0] });
  const slideOp = slide.interpolate({ inputRange: [-1, 0], outputRange: [0, 1] });

  const pct = Math.round((i / cards.length) * 100);

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="close" size={22} color={lw.muted} />
        </Pressable>
        <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>
        <Text style={s.count}>{i + 1}/{cards.length}</Text>
      </View>

      <Animated.View style={[s.body, { transform: [{ translateX: slideX }], opacity: slideOp }]}>
        <Pressable style={s.cardWrap} onPress={() => (shown ? undefined : reveal())}>
          <Animated.View style={[s.face, { opacity: frontOp, transform: [{ translateY: lift }] }]}>
            <Text style={s.fa}>{card.fa}</Text>
            <Pressable hitSlop={12} onPress={() => speak(card.fa, 'fa')} style={s.say}>
              <Ionicons name="volume-medium-outline" size={18} color={lw.muted} />
            </Pressable>
            {!shown ? <Text style={s.tapHint}>tap to see what it means</Text> : null}
          </Animated.View>

          <Animated.View style={[s.faceBack, { opacity: backOp }]} pointerEvents={shown ? 'auto' : 'none'}>
            <Text style={s.faSmall}>{card.fa}</Text>
            <Text style={s.tr}>{card.tr}</Text>
            <View style={s.hair} />
            <Text style={s.en}>{card.en}</Text>
            {card.literal ? <Text style={s.literal}>literally: {card.literal}</Text> : null}
          </Animated.View>
        </Pressable>
      </Animated.View>

      <View style={s.footer}>
        {!shown ? (
          <Pressable style={s.cta} onPress={reveal}>
            <Text style={s.ctaT}>Show me</Text>
          </Pressable>
        ) : (
          <View style={s.judge}>
            <Pressable style={[s.judgeBtn, s.judgeNo]} onPress={() => advance(false)}>
              <Text style={s.judgeNoT}>Not yet</Text>
            </Pressable>
            <Pressable style={[s.judgeBtn, s.judgeYes]} onPress={() => advance(true)}>
              <Text style={s.judgeYesT}>I knew it</Text>
            </Pressable>
          </View>
        )}
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

  body: { flex: 1, paddingHorizontal: spacing.xl, justifyContent: 'center' },
  cardWrap: { minHeight: 300, alignItems: 'center', justifyContent: 'center' },
  face: { alignItems: 'center', position: 'absolute' },
  faceBack: { alignItems: 'center' },

  fa: { fontFamily: fonts.persian, fontSize: 62, lineHeight: 96, color: lw.ink },
  faSmall: { fontFamily: fonts.persian, fontSize: 42, lineHeight: 66, color: lw.ink },
  say: { marginTop: spacing.md, padding: 6 },
  tapHint: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, marginTop: spacing.lg },

  tr: { fontFamily: fonts.body, fontSize: 15, color: lw.muted, marginTop: 4 },
  hair: { width: 44, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg },
  en: { fontFamily: fonts.body, fontSize: 22, color: lw.green },
  literal: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, marginTop: spacing.md, fontStyle: 'italic' },

  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.md },
  cta: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 15, alignItems: 'center', alignSelf: 'stretch' },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },

  judge: { flexDirection: 'row', gap: spacing.md },
  judgeBtn: { flex: 1, borderRadius: 26, paddingVertical: 15, alignItems: 'center' },
  judgeNo: { borderWidth: 1, borderColor: lw.rule },
  judgeNoT: { fontFamily: fonts.body, fontSize: 15, color: lw.inkSoft },
  judgeYes: { backgroundColor: lw.green },
  judgeYesT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },

  finFa: { fontFamily: fonts.persian, fontSize: 40, lineHeight: 64, color: lw.green },
  finT: { fontFamily: fonts.body, fontSize: 20, color: lw.ink, marginTop: spacing.sm },
  finX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: lw.muted, textAlign: 'center', marginBottom: spacing.xxl },
  rule: { width: 40, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg },
  again: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: spacing.lg },
});
