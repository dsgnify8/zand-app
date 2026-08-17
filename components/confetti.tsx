// A short confetti burst for finishing a chapter.
//
// Written rather than installed: it is forty lines of Animated, it uses
// the app's own colours rather than generic party brights, and it avoids
// adding a dependency for one moment of delight.
//
// Deliberately brief — about two seconds — and non-blocking. It is a
// flourish over the screen, not a state anyone has to dismiss.

import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';

import { lw } from '@/constants/lang-theme';

const { width: W, height: H } = Dimensions.get('window');
const COLOURS = [lw.gold, lw.green, '#C9634B', '#7BA05B', '#E4C062'];
const COUNT = 34;

function Piece({ delay }: { delay: number }) {
  const t = useRef(new Animated.Value(0)).current;

  // fixed per piece, so nothing jitters between frames
  const cfg = useRef({
    x: Math.random() * W,
    drift: (Math.random() - 0.5) * 120,
    size: 6 + Math.random() * 7,
    colour: COLOURS[Math.floor(Math.random() * COLOURS.length)],
    spin: (Math.random() - 0.5) * 8,
    delay,
  }).current;

  useEffect(() => {
    Animated.timing(t, {
      toValue: 1,
      duration: 1800 + Math.random() * 700,
      delay: cfg.delay,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = t.interpolate({ inputRange: [0, 1], outputRange: [-40, H * 0.75] });
  const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [0, cfg.drift] });
  const rotate = t.interpolate({ inputRange: [0, 1], outputRange: ['0deg', cfg.spin * 90 + 'deg'] });
  const opacity = t.interpolate({ inputRange: [0, 0.75, 1], outputRange: [1, 1, 0] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: cfg.x,
        top: 0,
        width: cfg.size,
        height: cfg.size * 1.6,
        borderRadius: 1.5,
        backgroundColor: cfg.colour,
        opacity,
        transform: [{ translateY }, { translateX }, { rotate }],
      }}
    />
  );
}

export function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: COUNT }).map((_, i) => (
        <Piece key={i} delay={i * 22} />
      ))}
    </View>
  );
}
