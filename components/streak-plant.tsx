import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { fonts, spacing } from '@/constants/zand-theme';

import { useLang } from '@/lib/i18n';
/* Sabzeh. It grows with the streak and it never stops moving. */
export function StreakPlant({ streak, size = 1 }: { streak: number; size?: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const blades = Math.max(3, Math.min(11, 3 + Math.floor(streak / 2)));
  const grow = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(grow, { toValue: 1, duration: 1500, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(sway, { toValue: 1, duration: 2100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(sway, { toValue: 0, duration: 2100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, [streak]);

  return (
    <View style={[styles.wrap, { transform: [{ scale: size }] }]}>
      <View style={styles.stage}>
        {Array.from({ length: blades }).map((_, i) => {
          const mid = (blades - 1) / 2;
          const off = i - mid;
          const h = 30 + (1 - Math.abs(off) / (mid + 1)) * 30;
          const lean = off * 4;
          const delay = i / blades;

          const scaleY = grow.interpolate({ inputRange: [0, 1], outputRange: [0.05, 1] });
          const tilt = sway.interpolate({
            inputRange: [0, 1],
            outputRange: [(lean - 3 - delay * 2) + 'deg', (lean + 3 + delay * 2) + 'deg'],
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.blade,
                { height: h, transform: [{ translateY: h / 2 }, { scaleY }, { rotate: tilt }, { translateY: -h / 2 }] },
              ]}
            />
          );
        })}

        <View style={styles.soil} />
        {Array.from({ length: 3 }).map((_, i) => {
          const rootH = grow.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
          return (
            <Animated.View
              key={'r' + i}
              style={[
                styles.root,
                { left: 26 + i * 12, transform: [{ scaleY: rootH }, { rotate: (i - 1) * 14 + 'deg' }] },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  stage: { width: 92, height: 92, alignItems: 'center', justifyContent: 'flex-end' },
  blade: { position: 'absolute', bottom: 26, width: 3, borderRadius: 3, backgroundColor: '#7FA05F' },
  soil: { position: 'absolute', bottom: 22, width: 66, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.32)' },
  root: { position: 'absolute', bottom: 4, width: 1.5, height: 18, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.22)', transformOrigin: 'top' as any },
});
