import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/zand-theme';

const WORD = 'ROOTED LIVING';

export function AnimatedSplash({ onDone }: { onDone: () => void }) {
  const zand = useRef(new Animated.Value(0)).current;
  const line = useRef(new Animated.Value(0)).current;
  const swoosh = useRef(new Animated.Value(0)).current;
  const farsi = useRef(new Animated.Value(0)).current;
  const container = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(zand, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(line, { toValue: 1, duration: 520, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      // the swoosh: one long glide in from the left, decelerating into place
      Animated.timing(swoosh, { toValue: 1, duration: 1150, easing: Easing.out(Easing.exp), useNativeDriver: true }),
      Animated.timing(farsi, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.delay(820),
      Animated.timing(container, { toValue: 0, duration: 520, easing: Easing.in(Easing.ease), useNativeDriver: true }),
    ]).start(() => onDone());

    // And a hard stop. If the sequence is interrupted — a backgrounded
    // app, a dropped frame at the wrong moment — the callback never
    // fires and this screen has no exit. Nobody should be trapped on a
    // logo.
    // 620+520+1150+620+820+520 is 4.25s, so this only fires when the
    // sequence has genuinely stalled rather than cutting it short.
    const bail = setTimeout(onDone, 6000);
    return () => clearTimeout(bail);
  }, []);

  const zandScale = zand.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] });

  // the tagline glides in and settles
  const tagX = swoosh.interpolate({ inputRange: [0, 1], outputRange: [-46, 0] });
  const tagSkew = swoosh.interpolate({ inputRange: [0, 0.6, 1], outputRange: ['-9deg', '-2deg', '0deg'] });
  const tagOpacity = swoosh.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 0.5, 1] });

  // a light trail that runs ahead of the words and dies away
  const trailX = swoosh.interpolate({ inputRange: [0, 1], outputRange: [-70, 96] });
  const trailOpacity = swoosh.interpolate({ inputRange: [0, 0.28, 0.72, 1], outputRange: [0, 0.5, 0.16, 0] });
  const trailScale = swoosh.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.16, 1, 0.12] });

  const farsiY = farsi.interpolate({ inputRange: [0, 1], outputRange: [7, 0] });

  return (
    <Animated.View style={[styles.container, { opacity: container }]}>
      <Animated.Text style={[styles.wordmark, { opacity: zand, transform: [{ scale: zandScale }] }]}>ZAND</Animated.Text>

      <Animated.View style={[styles.line, { opacity: line, transform: [{ scaleX: line }] }]} />

      <View style={styles.tagWrap}>
        <Animated.View
          style={[
            styles.trail,
            { opacity: trailOpacity, transform: [{ translateX: trailX }, { scaleX: trailScale }] },
          ]}
          pointerEvents="none"
        />
        <Animated.Text
          style={[
            styles.tagline,
            { opacity: tagOpacity, transform: [{ translateX: tagX }, { skewX: tagSkew }] },
          ]}
        >
          {WORD}
        </Animated.Text>
      </View>

      <Animated.Text style={[styles.farsi, { opacity: farsi, transform: [{ translateY: farsiY }] }]}>
        زند
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  wordmark: { fontFamily: fonts.wordmark, fontSize: 38, letterSpacing: 9, color: colors.textPrimary },
  line: { width: 200, height: 1, backgroundColor: colors.textSecondary, opacity: 0.5, marginVertical: spacing.lg },
  tagWrap: { height: 22, justifyContent: 'center', overflow: 'hidden', paddingHorizontal: spacing.md },
  trail: { position: 'absolute', width: 62, height: 1, backgroundColor: colors.accent, borderRadius: 1 },
  tagline: { fontFamily: fonts.body, fontSize: 13, letterSpacing: 3, color: colors.textSecondary },
  farsi: { fontFamily: fonts.persian, fontSize: 22, color: colors.accent, marginTop: spacing.lg },
});
