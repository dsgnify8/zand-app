// Finishing a stage should feel like finishing something.
//
// Until now the map simply redrew: a node changed colour and the next one
// unlocked. That is a state change, not an occasion, and a route someone
// walks for weeks needs occasions.
//
// So: a sheet, a drawn seal with the stage's numeral, and confetti. The
// confetti is hand-rolled rather than a dependency — forty pieces, each
// with its own fall, drift and spin, driven by one Animated.Value so the
// whole thing runs on the native thread.

import { useEffect, useMemo, useRef } from 'react';
import {
  Animated, Dimensions, Easing, Modal, Pressable,
  StyleSheet, Text, View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { getLang, useLang } from '@/lib/i18n';

const { width: W, height: H } = Dimensions.get('window');

// Warm, and few. Confetti in fifteen colours reads as a birthday card;
// four drawn from the app's own palette reads as ceremony.
const PAPER = ['#B24A2D', '#C9A227', '#7A6A52', '#8A4A52'];

type Piece = {
  x: number;
  delay: number;
  drift: number;
  spin: number;
  size: number;
  colour: string;
};

function makePieces(n: number): Piece[] {
  const out: Piece[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      x: Math.random() * W,
      delay: Math.random() * 420,
      // Left or right, never straight down — paper does not fall plumb.
      drift: (Math.random() - 0.5) * 160,
      spin: (Math.random() - 0.5) * 1080,
      size: 6 + Math.random() * 7,
      colour: PAPER[i % PAPER.length],
    });
  }
  return out;
}

// Exported so the streak card can use the same paper. Two confetti
// implementations in one app is two things to keep looking alike.
export function Confetti({ run }: { run: Animated.Value }) {
  const pieces = useMemo(() => makePieces(40), []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p, i) => {
        // Each piece reads the same clock but starts at its own moment,
        // so one value drives forty falls without forty animations.
        const t = run.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });

        const translateY = t.interpolate({
          inputRange: [0, 1],
          outputRange: [-60 - p.delay, H + 80],
        });
        const translateX = t.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, p.drift, p.drift * 0.6],
        });
        const rotate = t.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', p.spin + 'deg'],
        });
        const opacity = t.interpolate({
          inputRange: [0, 0.08, 0.75, 1],
          outputRange: [0, 1, 1, 0],
        });

        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              width: p.size,
              height: p.size * 1.6,
              borderRadius: 1.5,
              backgroundColor: p.colour,
              opacity,
              transform: [{ translateY }, { translateX }, { rotate }],
            }}
          />
        );
      })}
    </View>
  );
}

/** The seal. A ring, a wreath, and the stage's numeral inside it. */
function Seal({ roman }: { roman: string }) {
  return (
    <View style={s.sealWrap}>
      <Svg width={132} height={132} viewBox="0 0 132 132" fill="none">
        <Circle cx="66" cy="66" r="58" stroke={colors.accent} strokeWidth={1.2} opacity={0.35} />
        <Circle cx="66" cy="66" r="49" stroke={colors.accent} strokeWidth={1.6} />
        {/* two sprigs, meeting at the foot */}
        <Path
          d="M50 104c-6-10-6-22 0-32M50 78c-5 2-9 6-10 11M50 87c-5 1-9 5-11 10"
          stroke={colors.accent}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.75}
        />
        <Path
          d="M82 104c6-10 6-22 0-32M82 78c5 2 9 6 10 11M82 87c5 1 9 5 11 10"
          stroke={colors.accent}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.75}
        />
      </Svg>
      <Text style={s.sealRoman}>{roman}</Text>
    </View>
  );
}

export function StageComplete({
  open, roman, title, titleFa, onClose, onNext,
}: {
  open: boolean;
  roman: string;
  title: string;
  titleFa?: string;
  onClose: () => void;
  onNext?: () => void;
}) {
  useLang();
  const fa = getLang() === 'fa';

  const run = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!open) { run.setValue(0); rise.setValue(0); return; }

    Animated.parallel([
      Animated.timing(run, {
        toValue: 1,
        duration: 2600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(rise, {
        toValue: 1,
        friction: 8,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open]);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.dim}>
        <Confetti run={run} />

        <Animated.View
          style={[
            s.card,
            {
              opacity: rise,
              transform: [
                { translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
                { scale: rise.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) },
              ],
            },
          ]}
        >
          <Seal roman={roman} />

          <Text style={s.kicker}>
            {fa ? 'این بخش تمام شد' : 'STAGE COMPLETE'}
          </Text>
          <Text style={[s.title, fa && s.rtl]}>{fa ? (titleFa ?? title) : title}</Text>

          {onNext ? (
            <Pressable style={s.cta} onPress={onNext}>
              <Text style={s.ctaT}>{fa ? 'برو به بعدی' : 'Keep going'}</Text>
            </Pressable>
          ) : null}

          <Pressable hitSlop={10} onPress={onClose}>
            <Text style={s.later}>{fa ? 'بعداً' : 'Not now'}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  dim: {
    flex: 1, backgroundColor: 'rgba(20,16,12,0.55)',
    alignItems: 'center', justifyContent: 'center', padding: spacing.xl,
  },
  card: {
    width: '100%', maxWidth: 340, alignItems: 'center',
    backgroundColor: colors.background, borderRadius: 22,
    paddingVertical: spacing.xxl, paddingHorizontal: spacing.xl,
  },

  sealWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  sealRoman: {
    position: 'absolute',
    fontFamily: fonts.heading, fontSize: 34, color: colors.accent,
  },

  kicker: {
    fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2.4,
    color: colors.textSecondary, marginBottom: 8,
  },
  title: {
    fontFamily: fonts.heading, fontSize: 24, lineHeight: 31,
    color: colors.textPrimary, textAlign: 'center',
    marginBottom: spacing.xl,
  },
  rtl: { writingDirection: 'rtl' },

  cta: {
    alignSelf: 'stretch', backgroundColor: colors.accent,
    borderRadius: 999, paddingVertical: 14, alignItems: 'center',
  },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: '#FFF' },
  later: {
    fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
