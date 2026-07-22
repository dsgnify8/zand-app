import { useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, fontSize, spacing } from '@/constants/zand-theme';
import { lit } from '@/constants/literature';

const SPAN = 5000;

export function CalendarDrift() {
  const [running, setRunning] = useState(false);
  const t = useRef(new Animated.Value(0)).current;
  const [year, setYear] = useState(0);

  const run = () => {
    if (running) return;
    setRunning(true);
    t.setValue(0);
    t.addListener(({ value }) => setYear(Math.round(value * SPAN)));
    Animated.timing(t, { toValue: 1, duration: 4200, easing: Easing.inOut(Easing.quad), useNativeDriver: false }).start(() => {
      setRunning(false);
      t.removeAllListeners();
    });
  };

  // Gregorian slips a day every ~3330 years, Khayyam's every ~5000
  const gregOff = t.interpolate({ inputRange: [0, 1], outputRange: [0, 46] });
  const jalOff = t.interpolate({ inputRange: [0, 1], outputRange: [0, 31] });

  return (
    <Pressable style={styles.wrap} onPress={run}>
      <Text style={styles.kicker}>THE DRIFT OF A CALENDAR</Text>

      <View style={styles.rows}>
        <View style={styles.row}>
          <Text style={styles.name}>Gregorian</Text>
          <View style={styles.track}>
            <View style={styles.trueMark} />
            <Animated.View style={[styles.marker, styles.markerGreg, { transform: [{ translateX: gregOff }] }]} />
          </View>
          <Text style={styles.err}>1 day per 3,330 years</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.name, styles.nameOn]}>Khayyam</Text>
          <View style={styles.track}>
            <View style={styles.trueMark} />
            <Animated.View style={[styles.marker, styles.markerJal, { transform: [{ translateX: jalOff }] }]} />
          </View>
          <Text style={[styles.err, styles.errOn]}>1 day per 5,000 years</Text>
        </View>
      </View>

      <View style={styles.readout}>
        <Text style={styles.years}>{year.toLocaleString()}</Text>
        <Text style={styles.yearsLabel}>YEARS ELAPSED</Text>
      </View>

      <Text style={styles.hint}>{running ? 'watching the centuries' : 'touch to run five thousand years'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.gold, textAlign: 'center' },
  rows: { marginTop: spacing.xl, gap: spacing.lg },
  row: {},
  name: { fontFamily: fonts.bodyStrong, fontSize: 12, color: lit.textDim },
  nameOn: { color: lit.gold },
  track: { height: 22, justifyContent: 'center', marginTop: 5 },
  trueMark: { position: 'absolute', left: 0, width: 1, height: 14, backgroundColor: lit.hair },
  marker: { width: 2, height: 18, borderRadius: 1 },
  markerGreg: { backgroundColor: lit.rose },
  markerJal: { backgroundColor: lit.gold },
  err: { fontFamily: fonts.body, fontSize: 10, color: lit.textDim },
  errOn: { color: lit.text },
  readout: { alignItems: 'center', marginTop: spacing.lg },
  years: { fontFamily: fonts.heading, fontSize: 28, color: lit.text },
  yearsLabel: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 2, color: lit.textDim, marginTop: 2 },
  hint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.textDim, textAlign: 'center', marginTop: spacing.lg },
});
