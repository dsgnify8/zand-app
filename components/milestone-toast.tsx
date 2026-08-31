// A milestone, arriving.
//
// Deliberately unlike the stage sheet. A stage is an occasion and should
// stop you; a milestone is a nod and should not. So this slides down from
// under the status bar, holds for a few seconds and retracts — no dimming,
// nothing to dismiss, and whatever you were doing carries on underneath.
//
// Tapping it opens the achievements sheet, which is the natural gesture
// and stops the bar being purely decorative.

import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { getLang, useLang } from '@/lib/i18n';

/** A small struck medal. Ribbon, rim, and a notch where the light catches. */
function Medal({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.6 2.5 12 9l3.4-6.5"
        stroke={colors.accent}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="15.2" r="6.3" stroke={colors.accent} strokeWidth={1.3} />
      <Path
        d="M12 11.8v3.4l2.1 1.4"
        stroke={colors.accent}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </Svg>
  );
}

export function MilestoneToast({
  label, onOpen, onDone,
}: {
  /** Null when nothing has just been earned. */
  label: string | null;
  onOpen?: () => void;
  onDone: () => void;
}) {
  useLang();
  const fa = getLang() === 'fa';

  const y = useRef(new Animated.Value(-120)).current;

  useEffect(() => {
    if (!label) return;

    // In, hold, out. The hold is long enough to read a short line twice
    // and short enough that nobody waits for it.
    const seq = Animated.sequence([
      Animated.spring(y, { toValue: 0, friction: 9, tension: 80, useNativeDriver: true }),
      Animated.delay(2600),
      Animated.timing(y, {
        toValue: -120,
        duration: 260,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    seq.start(({ finished }) => { if (finished) onDone(); });
    return () => seq.stop();
  }, [label]);

  if (!label) return null;

  return (
    <Animated.View
      style={[s.wrap, { transform: [{ translateY: y }] }]}
      pointerEvents="box-none"
    >
      <Pressable style={s.bar} onPress={onOpen}>
        <Medal />
        <View style={{ flex: 1 }}>
          <Text style={s.kicker}>{fa ? 'نشان تازه' : 'EARNED'}</Text>
          <Text style={[s.label, fa && s.rtl]} numberOfLines={1}>{label}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 16,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 900,
  },
  bar: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    // Enough lift to read as floating over the page rather than part of it.
    shadowColor: '#2A1C14',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  kicker: {
    fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 2,
    color: colors.textSecondary, marginBottom: 2,
  },
  label: { fontFamily: fonts.heading, fontSize: 15.5, color: colors.textPrimary },
  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
