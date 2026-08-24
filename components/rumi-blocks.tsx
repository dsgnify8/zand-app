import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, fontSize, spacing } from '@/constants/zand-theme';
import { lit } from '@/constants/literature';
import { useLang, getLang } from '@/lib/i18n';

/* The sama. Every part of it means something. */
const PARTS = [
  { k: 'The white robe', kFa: 'تنورهٔ سپید', v: 'a shroud', vFa: 'کفن' },
  { k: 'The black cloak', kFa: 'خرقهٔ سیاه', v: 'the tomb, dropped at the start', vFa: 'گور، که در آغاز از تن می‌افتد' },
  { k: 'The tall hat', kFa: 'کلاه بلند', v: 'a headstone', vFa: 'سنگ گور' },
  { k: 'The right hand, up', kFa: 'دست راست، رو به بالا', v: 'receiving from heaven', vFa: 'گرفتن از آسمان' },
  { k: 'The left hand, down', kFa: 'دست چپ، رو به پایین', v: 'giving to the earth', vFa: 'بخشیدن به زمین' },
  { k: 'The turn, leftward', kFa: 'چرخش، به چپ', v: 'around the heart, as the planets go', vFa: 'گرد دل، چنان‌که ستارگان می‌گردند' },
];

export function Sama() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [on, setOn] = useState(false);
  const spin = useRef(new Animated.Value(0)).current;
  const flare = useRef(new Animated.Value(0)).current;
  const loop = useRef<any>(null);

  useEffect(() => {
    if (on) {
      Animated.timing(flare, { toValue: 1, duration: 1400, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
      spin.setValue(0);
      loop.current = Animated.loop(
        Animated.timing(spin, { toValue: 1, duration: 2600, easing: Easing.linear, useNativeDriver: true })
      );
      loop.current.start();
    } else {
      loop.current?.stop();
      Animated.timing(flare, { toValue: 0, duration: 700, useNativeDriver: true }).start();
    }
    return () => loop.current?.stop();
  }, [on]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });
  const skirtW = flare.interpolate({ inputRange: [0, 1], outputRange: [1, 2.25] });
  const armL = flare.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-32deg'] });
  const armR = flare.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '28deg'] });

  return (
    <View style={styles.sWrap}>
      <Text style={styles.sKicker}>{fa ? 'سماع' : 'THE SAMA'}</Text>

      <Pressable onPress={() => setOn((v) => !v)} style={styles.sStage}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <View style={styles.sFigure}>
            <View style={styles.sHat} />
            <View style={styles.sHead} />
            <View style={styles.sArms}>
              <Animated.View style={[styles.sArm, { transform: [{ rotate: armR }] }]} />
              <Animated.View style={[styles.sArm, { transform: [{ rotate: armL }] }]} />
            </View>
            <View style={styles.sBody} />
            <Animated.View style={[styles.sSkirt, { transform: [{ scaleX: skirtW }] }]} />
          </View>
        </Animated.View>
      </Pressable>

      <Text style={styles.sHint}>{fa ? (on ? 'برای آرام کردنش لمس کن' : 'لمس کن تا بچرخد') : (on ? 'touch to still him' : 'touch to let him turn')}</Text>

      {on ? (
        <View style={styles.sParts}>
          {PARTS.map((p, i) => (
            <View key={i} style={styles.sPartRow}>
              <Text style={[styles.sPartK, fa && styles.faSmall]}>{fa && (p as any).kFa ? (p as any).kFa : p.k}</Text>
              <View style={styles.sPartLine} />
              <Text style={[styles.sPartV, fa && styles.faSmall]}>{fa && (p as any).vFa ? (p as any).vFa : p.v}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

/* The ney. Cut from the reed bed, and crying about it. */
export function Reed() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [cut, setCut] = useState(false);
  const sep = useRef(new Animated.Value(0)).current;
  const cry = useRef(new Animated.Value(0)).current;

  const doCut = () => {
    if (cut) return;
    setCut(true);
    Animated.sequence([
      Animated.timing(sep, { toValue: 1, duration: 1200, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(cry, { toValue: 1, duration: 900, useNativeDriver: true }),
    ]).start();
  };

  const away = sep.interpolate({ inputRange: [0, 1], outputRange: [0, 74] });
  const fade = sep.interpolate({ inputRange: [0, 1], outputRange: [1, 0.28] });

  return (
    <Pressable style={styles.rWrap} onPress={doCut}>
      <Text style={styles.rKicker}>{fa ? 'نی' : 'THE NEY'}</Text>

      <View style={styles.rStage}>
        <Animated.View style={[styles.rBed, { opacity: fade }]}>
          {Array.from({ length: 7 }).map((_, i) => (
            <View key={i} style={[styles.rStalk, { height: 40 + (i % 3) * 9 }]} />
          ))}
          <Text style={[styles.rBedLabel, fa && styles.faSmall]}>{fa ? 'نیستان' : 'the reed bed'}</Text>
        </Animated.View>

        <Animated.View style={[styles.rCutReed, { transform: [{ translateX: away }] }]}>
          <View style={styles.rReedBody}>
            {[0, 1, 2, 3].map((i) => <View key={i} style={styles.rHole} />)}
          </View>
          <Text style={[styles.rReedLabel, fa && styles.faSmall]}>{fa ? 'نی' : 'the flute'}</Text>
        </Animated.View>
      </View>

      {!cut ? (
        <Text style={styles.rHint}>{fa ? 'برای بریدن، لمس کن' : 'touch to cut it'}</Text>
      ) : (
        <Animated.View style={{ opacity: cry }}>
          <View style={styles.rRule} />
          {fa ? (
            <>
              <Text style={[styles.rLine, styles.faVerse]}>بشنو این نی چون شکایت می‌کند</Text>
              <Text style={[styles.rLine, styles.faVerse]}>از جدایی‌ها حکایت می‌کند</Text>
              <Text style={[styles.rLine, styles.faVerse]}>کز نیستان تا مرا ببریده‌اند</Text>
              <Text style={[styles.rLine, styles.faVerse]}>در نفیرم مرد و زن نالیده‌اند</Text>
              <Text style={[styles.rNote, styles.faSmall]}>آغاز مثنوی معنوی</Text>
            </>
          ) : (
            <>
              <Text style={styles.rLine}>Listen to this reed, how it complains,</Text>
              <Text style={styles.rLine}>telling the tale of separations.</Text>
              <Text style={styles.rLine}>Since they cut me from the reed bed,</Text>
              <Text style={styles.rLine}>every man and woman has wept at my cry.</Text>
              <Text style={styles.rNote}>The first four lines of the Masnavi. Plain rendering.</Text>
            </>
          )}
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  faVerse: { fontFamily: fonts.persian, fontSize: 16, lineHeight: 34, textAlign: 'center', writingDirection: 'rtl' },
  faSmall: { fontFamily: fonts.persian, fontSize: 11, fontStyle: 'normal' },
  sWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair },
  sKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.gold },
  sStage: { width: 150, height: 150, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
  sFigure: { alignItems: 'center' },
  sHat: { width: 12, height: 19, backgroundColor: lit.ink, opacity: 0.75, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  sHead: { width: 9, height: 9, borderRadius: 5, backgroundColor: lit.gold, marginTop: 1 },
  sArms: { flexDirection: 'row', gap: 26, marginTop: 3 },
  sArm: { width: 20, height: 2, borderRadius: 1, backgroundColor: lit.gold, opacity: 0.85 },
  sBody: { width: 7, height: 26, backgroundColor: '#EDE6D8', marginTop: 2 },
  sSkirt: { width: 44, height: 34, backgroundColor: '#EDE6D8', opacity: 0.92, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginTop: -1 },
  sHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.textDim, marginTop: spacing.md },
  sParts: { width: '100%', marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: lit.hair, gap: spacing.sm },
  sPartRow: { flexDirection: 'row', alignItems: 'center' },
  sPartK: { fontFamily: fonts.bodyStrong, fontSize: 10, color: lit.text },
  sPartLine: { flex: 1, height: 1, backgroundColor: lit.hair, marginHorizontal: spacing.sm },
  sPartV: { fontFamily: fonts.body, fontSize: 10, color: lit.gold, fontStyle: 'italic' },

  rWrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair },
  rKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.gold, textAlign: 'center' },
  rStage: { height: 86, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: spacing.lg, gap: 30 },
  rBed: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  rStalk: { width: 2, backgroundColor: lit.gold, opacity: 0.55, borderRadius: 1 },
  rBedLabel: { position: 'absolute', bottom: -16, left: 0, fontFamily: fonts.body, fontSize: 9, color: lit.textDim, fontStyle: 'italic' },
  rCutReed: { alignItems: 'center' },
  rReedBody: { width: 8, height: 52, backgroundColor: lit.gold, opacity: 0.9, borderRadius: 3, alignItems: 'center', justifyContent: 'space-evenly', paddingVertical: 5 },
  rHole: { width: 2.5, height: 2.5, borderRadius: 2, backgroundColor: lit.raised },
  rReedLabel: { fontFamily: fonts.body, fontSize: 9, color: lit.textDim, fontStyle: 'italic', marginTop: 4 },
  rHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.gold, textAlign: 'center', marginTop: spacing.xl },
  rRule: { width: 30, height: 1, backgroundColor: lit.gold, opacity: 0.5, alignSelf: 'center', marginVertical: spacing.lg },
  rLine: { fontFamily: fonts.heading, fontSize: fontSize.base, lineHeight: 26, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  rNote: { fontFamily: fonts.body, fontSize: 10, color: lit.textDim, textAlign: 'center', marginTop: spacing.md, fontStyle: 'italic' },
});
