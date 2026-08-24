import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, fontSize, spacing } from '@/constants/zand-theme';
import { yl, YALDA_MOMENTS } from '@/constants/yalda';

import { useLang } from '@/lib/i18n';
/* The countdown to the longest night. */
function nextMoment() {
  const now = Date.now();
  for (const iso of YALDA_MOMENTS) {
    const t = new Date(iso).getTime();
    if (t > now) return t;
  }
  return new Date(YALDA_MOMENTS[YALDA_MOMENTS.length - 1]).getTime();
}

export function Solstice() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [target] = useState(nextMoment);
  const [left, setLeft] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const s = Math.max(0, Math.floor(left / 1000));
  const cells = [
    { n: Math.floor(s / 86400), l: 'DAYS' },
    { n: Math.floor((s % 86400) / 3600), l: 'HOURS' },
    { n: Math.floor((s % 3600) / 60), l: 'MINUTES' },
    { n: s % 60, l: 'SECONDS' },
  ];

  const local = new Date(target).toLocaleString(undefined, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <View style={styles.sWrap}>
      <Text style={styles.sKicker}>THE DARK PEAKS IN</Text>
      <View style={styles.sRow}>
        {cells.map((c, i) => (
          <View key={i} style={styles.sCell}>
            <Text style={styles.sN}>{String(c.n).padStart(2, '0')}</Text>
            <Text style={styles.sL}>{c.l}</Text>
          </View>
        ))}
      </View>
      <View style={styles.sRule} />
      <Text style={styles.sWhen}>{local}</Text>
      <Text style={styles.sNote}>and from that minute, every night is shorter</Text>
    </View>
  );
}

/* The pomegranate. Break it open. */
const SEEDS = Array.from({ length: 46 }).map((_, i) => {
  const ring = i < 12 ? 0 : i < 28 ? 1 : 2;
  const inRing = ring === 0 ? 12 : ring === 1 ? 16 : 18;
  const idx = ring === 0 ? i : ring === 1 ? i - 12 : i - 28;
  const ang = (idx / inRing) * Math.PI * 2 + ring * 0.4;
  const rad = 12 + ring * 15;
  return { x: Math.cos(ang) * rad, y: Math.sin(ang) * rad * 0.92, d: i * 11 };
});

export function Anar() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [open, setOpen] = useState(false);
  const a = useRef(new Animated.Value(0)).current;
  const seeds = useRef(SEEDS.map(() => new Animated.Value(0))).current;

  const crack = () => {
    if (open) return;
    setOpen(true);
    Animated.timing(a, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    Animated.stagger(14, seeds.map((v) =>
      Animated.spring(v, { toValue: 1, friction: 6, tension: 70, useNativeDriver: true })
    )).start();
  };

  const lHalf = a.interpolate({ inputRange: [0, 1], outputRange: [0, -44] });
  const rHalf = a.interpolate({ inputRange: [0, 1], outputRange: [0, 44] });
  const lRot = a.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-16deg'] });
  const rRot = a.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '16deg'] });

  return (
    <Pressable style={styles.aWrap} onPress={crack}>
      <Text style={styles.aKicker}>انار</Text>

      <View style={styles.aStage}>
        {SEEDS.map((sd, i) => {
          const sc = seeds[i];
          return (
            <Animated.View
              key={i}
              style={[
                styles.seed,
                {
                  opacity: sc,
                  transform: [
                    { translateX: sc.interpolate({ inputRange: [0, 1], outputRange: [0, sd.x] }) },
                    { translateY: sc.interpolate({ inputRange: [0, 1], outputRange: [0, sd.y] }) },
                    { scale: sc },
                  ],
                },
              ]}
            />
          );
        })}

        <Animated.View style={[styles.half, styles.halfL, { transform: [{ translateX: lHalf }, { rotate: lRot }] }]} />
        <Animated.View style={[styles.half, styles.halfR, { transform: [{ translateX: rHalf }, { rotate: rRot }] }]} />
        <Animated.View style={[styles.crown, { opacity: a.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]} />
      </View>

      <Text style={styles.aHint}>{open ? 'the colour of the sunrise' : 'touch to break it open'}</Text>
      {open ? <Text style={styles.aNote}>Red skin, red seeds, red juice. Broken open on the longest night, on purpose.</Text> : null}
    </Pressable>
  );
}

/* The arc of the year's darkness. */
const BARS = 24;

export function NightArc() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const grow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(grow, { toValue: 1, duration: 1600, delay: 250, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, []);

  return (
    <View style={styles.nWrap}>
      <Text style={styles.nKicker}>HOURS OF DARKNESS, THROUGH THE YEAR</Text>

      <View style={styles.nRow}>
        {Array.from({ length: BARS }).map((_, i) => {
          // trough at midsummer, peak at midwinter
          const phase = (i / (BARS - 1)) * Math.PI * 2;
          const v = 0.5 - Math.cos(phase) * 0.5;
          const peak = i === 0 || i === BARS - 1;
          const h = grow.interpolate({ inputRange: [0, 1], outputRange: [2, 12 + v * 52] });
          return (
            <Animated.View
              key={i}
              style={[styles.nBar, peak && styles.nBarPeak, { height: h as any }]}
            />
          );
        })}
      </View>

      <View style={styles.nLabels}>
        <Text style={styles.nLabelOn}>Yalda</Text>
        <Text style={styles.nLabel}>Nowruz</Text>
        <Text style={styles.nLabel}>summer</Text>
        <Text style={styles.nLabelOn}>Yalda</Text>
      </View>

      <Text style={styles.nNote}>The two ends are the same night. Everything in between is the sun coming back and going away again.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, backgroundColor: yl.surface, borderRadius: 14, borderWidth: 1, borderColor: yl.hair },
  sKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: yl.gold },
  sRow: { flexDirection: 'row', marginTop: spacing.lg },
  sCell: { alignItems: 'center', paddingHorizontal: spacing.md },
  sN: { fontFamily: fonts.heading, fontSize: 30, color: yl.text },
  sL: { fontFamily: fonts.bodyStrong, fontSize: 7, letterSpacing: 1.5, color: yl.textDim, marginTop: 2 },
  sRule: { width: 40, height: 1, backgroundColor: yl.gold, opacity: 0.5, marginVertical: spacing.lg },
  sWhen: { fontFamily: fonts.heading, fontSize: fontSize.base, color: yl.text, textAlign: 'center' },
  sNote: { fontFamily: fonts.body, fontSize: 10, color: yl.textDim, marginTop: 3, fontStyle: 'italic' },

  aWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, backgroundColor: yl.raised, borderRadius: 14, borderWidth: 1, borderColor: yl.hair },
  aKicker: { fontFamily: fonts.persian, fontSize: 20, color: yl.gold },
  aStage: { width: 190, height: 130, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
  seed: { position: 'absolute', width: 6, height: 7, borderRadius: 3, backgroundColor: yl.anar },
  half: { position: 'absolute', width: 34, height: 70, backgroundColor: yl.wine, borderWidth: 1, borderColor: yl.anar },
  halfL: { borderTopLeftRadius: 34, borderBottomLeftRadius: 34, right: '50%' },
  halfR: { borderTopRightRadius: 34, borderBottomRightRadius: 34, left: '50%' },
  crown: { position: 'absolute', top: 24, width: 9, height: 12, backgroundColor: yl.wine, borderWidth: 1, borderColor: yl.anar, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  aHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: yl.textDim, marginTop: spacing.md },
  aNote: { fontFamily: fonts.body, fontSize: 11, lineHeight: 18, color: yl.textDim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },

  nWrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: yl.surface, borderRadius: 14, borderWidth: 1, borderColor: yl.hair },
  nKicker: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 2, color: yl.gold, textAlign: 'center' },
  nRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 68, marginTop: spacing.lg },
  nBar: { flex: 1, marginHorizontal: 1, borderRadius: 2, backgroundColor: yl.hair },
  nBarPeak: { backgroundColor: yl.anar },
  nLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  nLabel: { fontFamily: fonts.body, fontSize: 9, color: yl.textDim },
  nLabelOn: { fontFamily: fonts.bodyStrong, fontSize: 9, color: yl.anar },
  nNote: { fontFamily: fonts.body, fontSize: 11, lineHeight: 18, color: yl.textDim, textAlign: 'center', marginTop: spacing.md, fontStyle: 'italic' },
});
