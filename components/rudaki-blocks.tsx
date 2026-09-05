import { useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, spacing } from '@/constants/zand-theme';
import { lit } from '@/constants/literature';
import { useLang, getLang } from '@/lib/i18n';

/* The chang: Rudaki's harp. Touch a string and it sounds, silently, for now. */
const STRINGS = 9;

export function Chang() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const vibes = useRef(Array.from({ length: STRINGS }, () => new Animated.Value(0))).current;

  const pluck = (i: number) => {
    vibes[i].setValue(1);
    Animated.timing(vibes[i], { toValue: 0, duration: 1100, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
  };

  return (
    <View style={styles.changWrap}>
      <Text style={styles.changKicker}>{fa ? 'چنگ' : 'THE CHANG'}</Text>
      <View style={styles.changFrame}>
        <View style={styles.changNeck} />
        <View style={styles.changBody} />
        {Array.from({ length: STRINGS }).map((_, i) => {
          const h = 34 + i * 9;
          const wobble = vibes[i].interpolate({ inputRange: [0, 1], outputRange: [0, 1.9] });
          return (
            <Pressable key={i} style={[styles.stringHit, { left: 20 + i * 15 }]} hitSlop={5} onPress={() => pluck(i)}>
              <Animated.View
                style={[
                  styles.string,
                  { height: h, transform: [{ translateX: wobble }, { scaleX: vibes[i].interpolate({ inputRange: [0, 1], outputRange: [1, 2.4] }) }] },
                  ]}
              />
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.changHint}>{fa ? 'سیم‌ها را لمس کن' : 'touch the strings'}</Text>
      <Text style={[styles.changNote, fa && styles.faSmall]}>{fa ? 'صدایش گم شده است. ساز، نه.' : 'His voice is lost. The instrument is not.'}</Text>
    </View>
  );
}

/* The lost verses: 1000 marks. Ten are gold. That is the ratio. */
const COLS = 25;
const ROWS = 40;
const TOTAL = COLS * ROWS;
const KEPT = 10;

export function LostVerses() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [faded, setFaded] = useState(false);
  const fade = useRef(new Animated.Value(1)).current;

  const keptSet = useRef(
    new Set(Array.from({ length: KEPT }, (_, i) => Math.floor((i + 0.5) * (TOTAL / KEPT))))
  ).current;

  const run = () => {
    const to = faded ? 1 : 0;
    setFaded(!faded);
    Animated.timing(fade, { toValue: to, duration: 2600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }).start();
  };

  return (
    <Pressable style={styles.lostWrap} onPress={run}>
      <View style={styles.lostHead}>
        <View>
          <Text style={styles.lostN}>100,000</Text>
          <Text style={styles.lostLabel}>{fa ? 'بیتِ سروده' : 'VERSES WRITTEN'}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.lostN, styles.lostNOn]}>~1,000</Text>
          <Text style={[styles.lostLabel, styles.lostLabelOn]}>{fa ? 'بیتِ به جا مانده' : 'VERSES SURVIVING'}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {Array.from({ length: TOTAL }).map((_, i) => {
          const kept = keptSet.has(i);
          if (kept) return <View key={i} style={[styles.mark, styles.markKept]} />;
          return <Animated.View key={i} style={[styles.mark, { opacity: fade }]} />;
        })}
      </View>

      <Text style={styles.lostHint}>{fa ? (faded ? 'آنچه مانده' : 'لمس کن تا از دست بروند') : (faded ? 'what remains' : 'touch to lose them')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  faSmall: { fontFamily: fonts.persian, fontSize: 11.5, fontStyle: 'normal' },
  changWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair },
  changKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.gold },
  changFrame: { width: 170, height: 140, marginTop: spacing.md },
  changNeck: { position: 'absolute', left: 12, top: 8, width: 3, height: 128, backgroundColor: lit.gold, opacity: 0.75, borderRadius: 2 },
  changBody: { position: 'absolute', left: 12, bottom: 4, right: 8, height: 4, backgroundColor: lit.gold, opacity: 0.75, borderRadius: 2, transform: [{ rotate: '-13deg' }] },
  stringHit: { position: 'absolute', top: 10, width: 14, height: 118, alignItems: 'center' },
  string: { width: 1, backgroundColor: lit.gold, opacity: 0.65 },
  changHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.textDim, marginTop: spacing.sm },
  changNote: { fontFamily: fonts.body, fontSize: 11, color: lit.textDim, fontStyle: 'italic', marginTop: spacing.md },

  lostWrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair },
  lostHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  lostN: { fontFamily: fonts.heading, fontSize: 22, color: lit.textDim },
  lostNOn: { color: lit.gold },
  lostLabel: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.5, color: lit.textDim, marginTop: 1 },
  lostLabelOn: { color: lit.gold },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.lg, justifyContent: 'center' },
  mark: { width: 4, height: 4, margin: 1.4, borderRadius: 1, backgroundColor: lit.ink, opacity: 0.5 },
  markKept: { backgroundColor: lit.gold, opacity: 1 },
  lostHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.textDim, textAlign: 'center', marginTop: spacing.lg },
});
