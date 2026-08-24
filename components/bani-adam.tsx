import { useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, fontSize, spacing } from '@/constants/zand-theme';
import { lit } from '@/constants/literature';
import { useLang, getLang } from '@/lib/i18n';

const FIGURES = 5;

export function BaniAdam() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [joined, setJoined] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const to = joined ? 0 : 1;
    setJoined(!joined);
    Animated.timing(anim, { toValue: to, duration: 900, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }).start();
  };

  return (
    <Pressable style={styles.wrap} onPress={toggle}>
      <Text style={styles.fa}>بنی‌آدم اعضای یک پیکرند</Text>

      <View style={styles.stage}>
        <Animated.View style={[styles.thread, { opacity: anim, transform: [{ scaleX: anim }] }]} />
        {Array.from({ length: FIGURES }).map((_, i) => {
          const mid = (FIGURES - 1) / 2;
          const drift = (i - mid) * 16;
          const tx = anim.interpolate({ inputRange: [0, 1], outputRange: [drift, 0] });
          const ty = anim.interpolate({ inputRange: [0, 1], outputRange: [(i % 2 === 0 ? -9 : 9), 0] });
          const sc = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
          return (
            <Animated.View key={i} style={[styles.figure, { transform: [{ translateX: tx }, { translateY: ty }, { scale: sc }] }]}>
              <View style={styles.head} />
              <View style={styles.body} />
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.lines}>
        {fa ? (
          <>
            <Text style={[styles.line, styles.faVerse]}>بنی‌آدم اعضای یک پیکرند</Text>
            <Text style={[styles.line, styles.faVerse]}>که در آفرینش ز یک گوهرند</Text>
            <Text style={[styles.line, styles.faVerse]}>چو عضوی به درد آورد روزگار</Text>
            <Text style={[styles.line, styles.faVerse]}>دگر عضوها را نماند قرار</Text>
          </>
        ) : (
          <>
            <Text style={styles.line}>The children of Adam are limbs of one body,</Text>
            <Text style={styles.line}>made, in creation, from a single essence.</Text>
            <Text style={styles.line}>When one limb is struck by pain,</Text>
            <Text style={styles.line}>the others cannot rest.</Text>
          </>
        )}
        <View style={styles.gap} />
        {fa ? (
          <>
            <Text style={[styles.lineHard, styles.faVerse]}>تو کز محنت دیگران بی‌غمی</Text>
            <Text style={[styles.lineHard, styles.faVerse]}>نشاید که نامت نهند آدمی</Text>
          </>
        ) : (
          <>
            <Text style={styles.lineHard}>And you, untroubled by the suffering of others,</Text>
            <Text style={styles.lineHard}>do not deserve the name of human.</Text>
          </>
        )}
      </View>

      <Text style={styles.hint}>{fa ? (joined ? 'یک پیکر' : 'لمسشان کن') : (joined ? 'one body' : 'touch them')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  faVerse: { fontFamily: fonts.persian, fontSize: 16, lineHeight: 34, textAlign: 'center', writingDirection: 'rtl' },
  wrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, backgroundColor: lit.raised, borderRadius: 12, borderWidth: 1, borderColor: lit.hair },
  fa: { fontFamily: fonts.persian, fontSize: 18, color: lit.gold, marginBottom: spacing.xl },

  stage: { height: 66, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18 },
  thread: { position: 'absolute', width: '78%', height: 1, backgroundColor: lit.gold, opacity: 0.5 },
  figure: { alignItems: 'center' },
  head: { width: 9, height: 9, borderRadius: 5, backgroundColor: lit.gold },
  body: { width: 3, height: 17, borderRadius: 2, backgroundColor: lit.gold, opacity: 0.75, marginTop: 2 },

  lines: { alignItems: 'center', marginTop: spacing.xl },
  line: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 29, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  gap: { height: spacing.md },
  lineHard: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 29, color: lit.rose, textAlign: 'center', fontStyle: 'italic' },
  hint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.textDim, marginTop: spacing.xl },
});
