// Language, as a card with letters moving in it.
//
// The section used to be a grid of twelve borrowed words. Good content, but
// a grid states a fact where this should give an impression: the alphabet is
// older than the words in it and still in motion. So the card is nearly
// empty, the letters drift around its edges at the threshold of visible, and
// the twelve words live on /language where there is room for them.
//
// The outline is two hairlines, not one. A single rule reads as a box; a
// rule with a second rule set inside it reads as a frame, which is the
// difference between a container and a considered edge.
//
// Every letter is on its own loop with its own period, so they never fall
// into step. All native-driven — the JS thread does nothing once they start
// — and they stop when the app goes to the background, because a loop nobody
// can see is only a battery cost.

import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  AppState,
  Easing,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { getLang } from '@/lib/i18n';

const CARD_H = 330;
const RULE = 'rgba(140,58,46,0.22)';
const RULE_IN = 'rgba(140,58,46,0.14)';

/* ------------------------------------------------------------------ *
 * The letter field.
 *
 * x and y are fractions of the card, so the arrangement holds at any
 * width. They sit round the perimeter — the middle is left clear for
 * the type, and a letter drifting under a word makes both unreadable.
 *
 * Periods are all different and deliberately not multiples of each
 * other, so the field never resolves into a pulse.
 * ------------------------------------------------------------------ */
type Glyph = { c: string; x: number; y: number; s: number; o: number; ms: number };

const GLYPHS: Glyph[] = [
  { c: 'ا', x: 0.08, y: 0.11, s: 34, o: 0.13, ms: 9200 },
  { c: 'ش', x: 0.25, y: 0.06, s: 24, o: 0.09, ms: 11700 },
  { c: 'ک', x: 0.43, y: 0.13, s: 20, o: 0.07, ms: 8300 },
  { c: 'ب', x: 0.61, y: 0.07, s: 28, o: 0.11, ms: 13100 },
  { c: 'ی', x: 0.78, y: 0.13, s: 22, o: 0.08, ms: 10400 },
  { c: 'م', x: 0.91, y: 0.06, s: 30, o: 0.1, ms: 7600 },
  { c: 'ن', x: 0.05, y: 0.31, s: 22, o: 0.08, ms: 12900 },
  { c: 'ه', x: 0.93, y: 0.29, s: 26, o: 0.09, ms: 9800 },
  { c: 'د', x: 0.04, y: 0.53, s: 28, o: 0.11, ms: 14200 },
  { c: 'ر', x: 0.95, y: 0.51, s: 24, o: 0.08, ms: 8900 },
  { c: 'ز', x: 0.06, y: 0.73, s: 20, o: 0.07, ms: 11200 },
  { c: 'گ', x: 0.92, y: 0.71, s: 30, o: 0.12, ms: 10100 },
  { c: 'چ', x: 0.14, y: 0.88, s: 26, o: 0.09, ms: 13600 },
  { c: 'س', x: 0.34, y: 0.93, s: 22, o: 0.08, ms: 7900 },
  { c: 'ف', x: 0.55, y: 0.89, s: 30, o: 0.11, ms: 12300 },
  { c: 'ت', x: 0.74, y: 0.94, s: 20, o: 0.07, ms: 9400 },
  { c: 'پ', x: 0.88, y: 0.86, s: 24, o: 0.09, ms: 11900 },
];

function DriftingLetter({ g, W }: { g: Glyph; W: number }) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;

    const start = () => {
      loop?.stop();
      v.setValue(0);
      loop = Animated.loop(
        Animated.timing(v, {
          toValue: 1,
          duration: g.ms,
          easing: Easing.linear, // the sine shape is in the interpolation
          useNativeDriver: true,
        })
      );
      loop.start();
    };

    start();
    const sub = AppState.addEventListener('change', (s) =>
      s === 'active' ? start() : loop?.stop()
    );

    return () => {
      loop?.stop();
      sub.remove();
    };
  }, [g.ms]);

  // A full cycle out and back, so there is no jump at the loop boundary.
  const drift = (a: number) =>
    v.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, a, 0, -a, 0] });

  return (
    <Animated.Text
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: W * g.x,
        top: CARD_H * g.y,
        fontFamily: fonts.persian,
        fontSize: g.s,
        lineHeight: g.s * 1.5,
        color: colors.accent,
        opacity: g.o,
        transform: [
          { translateY: drift(g.s * 0.42) },
          { translateX: drift(g.s * 0.16) },
          {
            rotate: v.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: ['0deg', '2.5deg', '0deg', '-2.5deg', '0deg'],
            }),
          },
        ],
      }}
    >
      {g.c}
    </Animated.Text>
  );
}

export function LanguageCard() {
  const fa = getLang() === 'fa';
  const [W, setW] = useState(340);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && Math.abs(w - W) > 1) setW(w);
  };

  return (
    <View style={st.wrap} onLayout={onLayout}>
      <Pressable style={st.card} onPress={() => router.navigate('/language' as any)}>
        {GLYPHS.map((g) => (
          <DriftingLetter key={g.c + g.x} g={g} W={W} />
        ))}

        {/* The second rule. Inset, lighter, and purely decorative. */}
        <View pointerEvents="none" style={st.ruleIn} />

        <View style={st.centre}>
          {!fa ? <Text style={st.eyebrow}>زبان</Text> : null}

          <Text style={[st.title, fa && st.rtl]}>{fa ? 'زبان' : 'Language'}</Text>

          <Text style={[st.line, fa && st.rtl]}>
            {fa
              ? 'کهن‌تر از خطی که با آن نوشته می‌شود، و پرسفرتر از آنچه گمان می‌بری.'
              : 'Older than the script it is written in, and further travelled than you would think.'}
          </Text>

          <View style={[st.cta, fa && { flexDirection: 'row-reverse' }]}>
            <Text style={[st.ctaT, fa && st.rtl]}>
              {fa ? 'از کجا آمده' : 'Where it came from'}
            </Text>
            <Ionicons name={fa ? 'arrow-back' : 'arrow-forward'} size={13} color={colors.accent} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { marginTop: 56 },

  card: {
    height: CARD_H,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: RULE,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  ruleIn: {
    position: 'absolute',
    top: 9,
    left: 9,
    right: 9,
    bottom: 9,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: RULE_IN,
  },

  centre: { alignItems: 'center', paddingHorizontal: 34 },

  eyebrow: { fontFamily: fonts.body, fontSize: 11, letterSpacing: 2.4, color: colors.accent },
  title: {
    fontFamily: fonts.display,
    fontSize: 46,
    lineHeight: 56,
    color: colors.textPrimary,
    letterSpacing: -0.8,
    marginTop: 6,
  },
  line: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 280,
  },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 22 },
  ctaT: { fontFamily: fonts.body, fontSize: 13, color: colors.accent },

  rtl: { writingDirection: 'rtl' },
});
