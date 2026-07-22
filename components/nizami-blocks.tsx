import { useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, fontSize, spacing } from '@/constants/zand-theme';
import { lit } from '@/constants/literature';

/* Farhad at Bisotun. Strike the mountain until it opens, then the messenger comes. */
const NEEDED = 12;

export function Mountain() {
  const [hits, setHits] = useState(0);
  const shake = useRef(new Animated.Value(0)).current;
  const gap = useRef(new Animated.Value(0)).current;
  const news = useRef(new Animated.Value(0)).current;

  const strike = () => {
    if (hits >= NEEDED) return;
    const n = hits + 1;
    setHits(n);

    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
    Animated.timing(gap, { toValue: n / NEEDED, duration: 240, easing: Easing.out(Easing.quad), useNativeDriver: false }).start();

    if (n >= NEEDED) {
      Animated.timing(news, { toValue: 1, duration: 900, delay: 1100, useNativeDriver: true }).start();
    }
  };

  const sx = shake.interpolate({ inputRange: [0, 1], outputRange: [0, 2.5] });
  const cut = gap.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const done = hits >= NEEDED;

  return (
    <Pressable style={styles.mWrap} onPress={strike}>
      <Text style={styles.mKicker}>MOUNT BISOTUN</Text>

      <Animated.View style={[styles.mStage, { transform: [{ translateX: sx }] }]}>
        <View style={styles.mRock} />
        <Animated.View style={[styles.mCut, { width: cut }]} />
      </Animated.View>

      <Text style={styles.mCount}>{done ? 'the mountain is open' : hits + ' of ' + NEEDED + ' strikes'}</Text>

      {!done ? (
        <Text style={styles.mHint}>strike it</Text>
      ) : (
        <Animated.View style={{ opacity: news }}>
          <View style={styles.mRule} />
          <Text style={styles.mNews}>A messenger arrives from the king.</Text>
          <Text style={styles.mNewsHard}>Shirin is dead.</Text>
          <Text style={styles.mNewsSmall}>She was not. Farhad threw his axe into the air and followed it down.</Text>
        </Animated.View>
      )}
    </Pressable>
  );
}

/* The Haft Peykar. Seven domes, seven planets, seven days. */
type Dome = { day: string; colour: string; planet: string; land: string; tale: string; hex: string; dark?: boolean };

const DOMES: Dome[] = [
  { day: 'Saturday', colour: 'Black', planet: 'Saturn', land: 'India', hex: '#241C19', tale: 'A woman in black tells of a city where everyone mourns, and of a paradise glimpsed and lost by asking for too much. The darkest dome, and the week begins here.' },
  { day: 'Sunday', colour: 'Yellow', planet: 'The Sun', land: 'Byzantium', hex: '#C8A23C', tale: 'A king who distrusts all women is outwitted by a slave girl who proves that suspicion is its own prison.' },
  { day: 'Monday', colour: 'Green', planet: 'The Moon', land: 'Khwarazm', hex: '#5F7F5A', tale: 'A tale of a good man tormented by an envious companion, and of virtue that survives being buried.' },
  { day: 'Tuesday', colour: 'Red', planet: 'Mars', land: 'The Slavs', hex: '#9E3B33', tale: 'A princess who will marry no one who cannot answer her riddles, and the suitor who finally does.' },
  { day: 'Wednesday', colour: 'Turquoise', planet: 'Mercury', land: 'The Maghreb', hex: '#3E7F86', tale: 'Two men named Good and Evil cross a desert, and the desert sorts them.' },
  { day: 'Thursday', colour: 'Sandalwood', planet: 'Jupiter', land: 'China', hex: '#A98763', tale: 'A tale of two lovers separated by pride, and of a garden that will not let them in until they drop it.' },
  { day: 'Friday', colour: 'White', planet: 'Venus', land: 'Iran', hex: '#E8E1D4', tale: 'The simplest and the last. Two lovers who are interrupted every time they reach for each other, until they learn to wait, and are given everything. The week ends in white.', dark: true },
];

export function HaftPeykar() {
  const [open, setOpen] = useState<number | null>(null);
  const d = open !== null ? DOMES[open] : null;

  return (
    <View style={styles.hWrap}>
      <Text style={styles.hKicker}>THE SEVEN DOMES</Text>

      <View style={styles.hRow}>
        {DOMES.map((dome, i) => (
          <Pressable key={i} style={styles.hDomeHit} onPress={() => setOpen(open === i ? null : i)}>
            <View style={[styles.hDome, { backgroundColor: dome.hex }, open === i && styles.hDomeOn]} />
            <View style={[styles.hBase, { backgroundColor: dome.hex }]} />
            <Text style={[styles.hDay, open === i && styles.hDayOn]}>{dome.day.slice(0, 2)}</Text>
          </Pressable>
        ))}
      </View>

      {d ? (
        <View style={styles.hCard}>
          <View style={styles.hCardHead}>
            <View style={[styles.hSwatch, { backgroundColor: d.hex }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.hColour}>{d.colour}</Text>
              <Text style={styles.hMeta}>{d.day}   ·   {d.planet}   ·   {d.land}</Text>
            </View>
          </View>
          <Text style={styles.hTale}>{d.tale}</Text>
        </View>
      ) : (
        <Text style={styles.hHint}>touch a dome</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mWrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair, alignItems: 'center' },
  mKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.gold },
  mStage: { width: '100%', height: 64, marginTop: spacing.lg, justifyContent: 'center' },
  mRock: { position: 'absolute', left: 0, right: 0, height: 64, backgroundColor: lit.ink, opacity: 0.55, borderRadius: 4 },
  mCut: { height: 14, backgroundColor: lit.raised, alignSelf: 'center', borderRadius: 2 },
  mCount: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1, color: lit.textDim, marginTop: spacing.md },
  mHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.gold, marginTop: spacing.sm },
  mRule: { width: 30, height: 1, backgroundColor: lit.rose, alignSelf: 'center', marginVertical: spacing.md },
  mNews: { fontFamily: fonts.body, fontSize: 12, color: lit.textDim, textAlign: 'center', fontStyle: 'italic' },
  mNewsHard: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: lit.rose, textAlign: 'center', marginTop: 4, fontStyle: 'italic' },
  mNewsSmall: { fontFamily: fonts.body, fontSize: 11, lineHeight: 18, color: lit.textDim, textAlign: 'center', marginTop: spacing.md },

  hWrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair },
  hKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.gold, textAlign: 'center' },
  hRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg },
  hDomeHit: { alignItems: 'center', flex: 1 },
  hDome: { width: 26, height: 15, borderTopLeftRadius: 14, borderTopRightRadius: 14, borderWidth: 1, borderColor: 'rgba(176,138,70,0.45)' },
  hDomeOn: { borderColor: lit.gold, borderWidth: 1.5 },
  hBase: { width: 20, height: 13, opacity: 0.85 },
  hDay: { fontFamily: fonts.bodyStrong, fontSize: 8, color: lit.textDim, marginTop: 5 },
  hDayOn: { color: lit.gold },
  hCard: { marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: lit.hair },
  hCardHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  hSwatch: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: lit.hair },
  hColour: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lit.text },
  hMeta: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1, color: lit.gold, marginTop: 1 },
  hTale: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: lit.text, marginTop: spacing.md, opacity: 0.9 },
  hHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.textDim, textAlign: 'center', marginTop: spacing.lg },
});
