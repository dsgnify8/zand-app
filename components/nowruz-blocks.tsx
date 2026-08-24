import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { nz, HAFT_SEEN, SEEN_GUESTS, NOWRUZ_MOMENTS } from '@/constants/nowruz';
import { useLang, getLang } from '@/lib/i18n';

const W = Dimensions.get('window').width;

/* The live countdown to the exact instant the year turns. */
function nextMoment() {
  const now = Date.now();
  for (const iso of NOWRUZ_MOMENTS) {
    const t = new Date(iso).getTime();
    if (t > now) return t;
  }
  return new Date(NOWRUZ_MOMENTS[NOWRUZ_MOMENTS.length - 1]).getTime();
}

export function Tahvil() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [target] = useState(nextMoment);
  const [left, setLeft] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const s = Math.max(0, Math.floor(left / 1000));
  const days = Math.floor(s / 86400);
  const hrs = Math.floor((s % 86400) / 3600);
  const min = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  const local = new Date(target).toLocaleString(undefined, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const cells = [
    { n: days, l: 'DAYS' },
    { n: hrs, l: 'HOURS' },
    { n: min, l: 'MINUTES' },
    { n: sec, l: 'SECONDS' },
  ];

  return (
    <View style={styles.tWrap}>
      <Text style={styles.tKicker}>{fa ? 'تا سال تحویل' : 'THE YEAR TURNS IN'}</Text>
      <View style={styles.tRow}>
        {cells.map((c, i) => (
          <View key={i} style={styles.tCell}>
            <Text style={styles.tN}>{String(c.n).padStart(2, '0')}</Text>
            <Text style={styles.tL}>{c.l}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tRule} />
      <Text style={styles.tWhen}>{local}</Text>
      <Text style={[styles.tNote, fa && styles.faSmall]}>{fa ? 'به وقت محلی شما، تا دقیقه' : 'your local time, to the minute'}</Text>
    </View>
  );
}

/* The Haft Seen. Swipe through the seven. */
const CARD_W = W - 72;

function SeenGlyph({ k }: { k: string }) {
  if (k === 'sabzeh') return (
    <View style={styles.gWrap}>
      <View style={styles.sabzehDish} />
      <View style={styles.sabzehBlades}>
        {[16, 24, 30, 26, 19, 27, 22].map((h, i) => (
          <View key={i} style={[styles.blade, { height: h }]} />
        ))}
      </View>
    </View>
  );
  if (k === 'samanu') return (
    <View style={styles.gWrap}>
      <View style={styles.samanuBowl} />
      <View style={styles.samanuTop} />
      <View style={styles.steamRow}>
        {[0, 1, 2].map((i) => <View key={i} style={styles.steam} />)}
      </View>
    </View>
  );
  if (k === 'senjed') return (
    <View style={styles.gWrap}>
      <View style={styles.senjedPile}>
        {[0, 1, 2, 3, 4].map((i) => <View key={i} style={styles.senjedBerry} />)}
      </View>
    </View>
  );
  if (k === 'seer') return (
    <View style={styles.gWrap}>
      <View style={styles.garlicBulb} />
      <View style={styles.garlicNeck} />
      {[-1, 0, 1].map((i) => (
        <View key={i} style={[styles.garlicLine, { transform: [{ translateX: i * 6 }] }]} />
      ))}
    </View>
  );
  if (k === 'seeb') return (
    <View style={styles.gWrap}>
      <View style={styles.apple} />
      <View style={styles.appleStem} />
      <View style={styles.appleLeaf} />
    </View>
  );
  if (k === 'somaq') return (
    <View style={styles.gWrap}>
      <View style={styles.somaqSun} />
      <View style={styles.somaqHorizon} />
      {[0, 1, 2, 3, 4].map((i) => (
        <View key={i} style={[styles.somaqRay, { transform: [{ rotate: (i * 36 - 72) + 'deg' }] }]} />
      ))}
    </View>
  );
  if (k === 'serkeh') return (
    <View style={styles.gWrap}>
      <View style={styles.vinegarNeck} />
      <View style={styles.vinegarBody} />
      <View style={styles.vinegarLevel} />
    </View>
  );
  return <View style={styles.gWrap} />;
}

export function HaftSeen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [i, setI] = useState(0);
  const ref = useRef<ScrollView>(null);

  const onEnd = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    setI(Math.round(x / (CARD_W + spacing.md)));
  };

  const go = (n: number) => {
    ref.current?.scrollTo({ x: n * (CARD_W + spacing.md), animated: true });
    setI(n);
  };

  return (
    <View style={styles.hsWrap}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled={false}
        snapToInterval={CARD_W + spacing.md}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onEnd}
        contentContainerStyle={styles.hsRow}
      >
        {HAFT_SEEN.map((it, n) => (
          <View key={it.key} style={[styles.hsCard, { width: CARD_W }]}>
            <View style={styles.hsNum}><Text style={styles.hsNumT}>{n + 1}</Text></View>
            <SeenGlyph k={it.key} />
            <Text style={styles.hsFa}>{it.fa}</Text>
            <Text style={styles.hsTr}>{it.tr}</Text>
            <View style={styles.hsMeansRow}>
              <View style={styles.hsHair} />
              <Text style={[styles.hsMeans, fa && styles.faSmall]}>{fa && (it as any).meansFa ? (it as any).meansFa : it.means}</Text>
              <View style={styles.hsHair} />
            </View>
            <Text style={[styles.hsX, fa && styles.faBody]}>{fa && (it as any).fa2 ? (it as any).fa2 : (fa && (it as any).xFa ? (it as any).xFa : it.x)}</Text>
            {it.note ? <Text style={[styles.hsNote, fa && styles.faSmall]}>{fa && (it as any).noteFa ? (it as any).noteFa : it.note}</Text> : null}
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {HAFT_SEEN.map((_, n) => (
          <Pressable key={n} onPress={() => go(n)} hitSlop={8}>
            <View style={[styles.dot, n === i && styles.dotOn]} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* The guests: everything on the table that is not an S. */
export function Guests() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [open, setOpen] = useState<string | null>(null);
  return (
    <View style={styles.guWrap}>
      {SEEN_GUESTS.map((g) => {
        const on = open === g.key;
        return (
          <Pressable key={g.key} style={[styles.guRow, on && styles.guRowOn]} onPress={() => setOpen(on ? null : g.key)}>
            <View style={styles.guHead}>
              <Text style={styles.guFa}>{g.fa}</Text>
              <Text style={[styles.guEn, fa && styles.faSmall]}>{fa && (g as any).enFa ? (g as any).enFa : g.en}</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name={on ? 'remove' : 'add'} size={14} color={nz.gold} />
            </View>
            {on ? <Text style={[styles.guX, fa && styles.faBody]}>{fa && (g as any).xFa ? (g as any).xFa : g.x}</Text> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

/* Chaharshanbe Suri. Jump it. */
export function Fire() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [jumped, setJumped] = useState(false);
  const y = useRef(new Animated.Value(0)).current;
  const flame = useRef(new Animated.Value(0)).current;
  const said = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flame, { toValue: 1, duration: 620, useNativeDriver: true }),
        Animated.timing(flame, { toValue: 0, duration: 620, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const jump = () => {
    if (jumped) return;
    setJumped(true);
    Animated.sequence([
      Animated.timing(y, { toValue: 1, duration: 700, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(said, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  };

  const hop = y.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -46, 0] });
  const across = y.interpolate({ inputRange: [0, 1], outputRange: [-52, 52] });
  const flick = flame.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] });

  return (
    <Pressable style={styles.fWrap} onPress={jump}>
      <Text style={styles.fKicker}>{fa ? 'چهارشنبه‌سوری' : 'CHAHARSHANBE SURI'}</Text>

      <View style={styles.fStage}>
        <Animated.View style={[styles.flame, { transform: [{ scaleY: flick }] }]} />
        <View style={styles.flameCore} />
        <View style={styles.logs} />
        <Animated.View style={[styles.jumper, { transform: [{ translateX: across }, { translateY: hop }] }]}>
          <View style={styles.jHead} />
          <View style={styles.jBody} />
        </Animated.View>
      </View>

      {!jumped ? (
        <Text style={styles.fHint}>{fa ? 'لمس کن تا بپری' : 'touch to jump'}</Text>
      ) : (
        <Animated.View style={{ opacity: said, alignItems: 'center' }}>
          <Text style={styles.fFa}>زردی من از تو، سرخی تو از من</Text>
          {!fa ? <Text style={styles.fEn}>My yellow is yours, your red is mine.</Text> : null}
          <Text style={[styles.fNote, fa && styles.faSmall]}>{fa ? 'خستگی‌ات را به آتش می‌دهی و گرمایش را می‌گیری.' : 'You give the fire your tiredness and take its heat.'}</Text>
        </Animated.View>
      )}
    </Pressable>
  );
}

/* Sizdah Bedar. Tie a knot, make a wish, let it go. */
export function Knot() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [state, setState] = useState<0 | 1 | 2>(0);
  const tie = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  const next = () => {
    if (state === 0) {
      setState(1);
      Animated.timing(tie, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    } else if (state === 1) {
      setState(2);
      Animated.timing(float, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }).start();
    }
  };

  const knotScale = tie.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const bladeBend = tie.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '22deg'] });
  const away = float.interpolate({ inputRange: [0, 1], outputRange: [0, 120] });
  const gone = float.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <Pressable style={styles.kWrap} onPress={next}>
      <Text style={styles.kKicker}>{fa ? 'سیزده‌بدر' : 'SIZDAH BEDAR'}</Text>

      <View style={styles.kStage}>
        <Animated.View style={{ transform: [{ translateX: away }], opacity: gone }}>
          <View style={styles.kBlades}>
            {[0, 1, 2].map((i) => (
              <Animated.View key={i} style={[styles.kBlade, { transform: [{ rotate: bladeBend }] }]} />
            ))}
            <Animated.View style={[styles.kKnot, { transform: [{ scale: knotScale }] }]} />
          </View>
        </Animated.View>
        <View style={styles.kWater} />
      </View>

      <Text style={styles.kHint}>
        {fa ? (state === 0 ? 'لمس کن تا گره بزنی' : state === 1 ? 'آرزویت را بکن، بعد دوباره لمس کن' : 'به آب سپرده شد') : (state === 0 ? 'touch to tie the knot' : state === 1 ? 'make your wish, then touch again' : 'gone downstream')}
      </Text>
      {state === 2 ? <Text style={styles.kNote}>Whatever the year put into it goes with the water.</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  faSmall: { fontFamily: fonts.persian, fontSize: 11.5, textAlign: 'right', writingDirection: 'rtl' },
  faBody: { fontFamily: fonts.persian, fontSize: 14.5, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' },
  tWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, backgroundColor: nz.surface, borderRadius: 14, borderWidth: 1, borderColor: nz.hair },
  tKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: nz.gold },
  tRow: { flexDirection: 'row', marginTop: spacing.lg },
  tCell: { alignItems: 'center', paddingHorizontal: spacing.md },
  tN: { fontFamily: fonts.heading, fontSize: 30, color: nz.text },
  tL: { fontFamily: fonts.bodyStrong, fontSize: 7, letterSpacing: 1.5, color: nz.textDim, marginTop: 2 },
  tRule: { width: 40, height: 1, backgroundColor: nz.gold, opacity: 0.5, marginVertical: spacing.lg },
  tWhen: { fontFamily: fonts.heading, fontSize: fontSize.base, color: nz.text, textAlign: 'center' },
  tNote: { fontFamily: fonts.body, fontSize: 10, color: nz.textDim, marginTop: 3, fontStyle: 'italic' },

  hsWrap: { marginVertical: spacing.lg, marginHorizontal: -spacing.lg },
  hsRow: { paddingHorizontal: spacing.lg, gap: spacing.md },
  hsCard: { backgroundColor: nz.surface, borderRadius: 14, borderWidth: 1, borderColor: nz.hair, padding: spacing.xl, alignItems: 'center' },
  hsNum: { position: 'absolute', top: spacing.md, right: spacing.md, width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: nz.hair, alignItems: 'center', justifyContent: 'center' },
  hsNumT: { fontFamily: fonts.bodyStrong, fontSize: 9, color: nz.textDim },
  hsFa: { fontFamily: fonts.persian, fontSize: 26, color: nz.gold, marginTop: spacing.md },
  hsTr: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: nz.text, marginTop: 2 },
  hsMeansRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.md },
  hsHair: { width: 18, height: 1, backgroundColor: nz.gold, opacity: 0.5 },
  hsMeans: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: nz.accent },
  hsX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: nz.text, textAlign: 'center', opacity: 0.9 },
  hsNote: { fontFamily: fonts.body, fontSize: 11, lineHeight: 18, color: nz.textDim, textAlign: 'center', marginTop: spacing.md, fontStyle: 'italic' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: spacing.lg },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: nz.hair },
  dotOn: { backgroundColor: nz.gold, width: 16 },

  gWrap: { width: 66, height: 66, alignItems: 'center', justifyContent: 'center' },
  sabzehDish: { position: 'absolute', bottom: 6, width: 46, height: 13, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: nz.raised, borderWidth: 1, borderColor: nz.hair },
  sabzehBlades: { position: 'absolute', bottom: 17, flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  blade: { width: 2, backgroundColor: nz.green, borderRadius: 2 },
  samanuBowl: { position: 'absolute', bottom: 10, width: 44, height: 22, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: nz.raised, borderWidth: 1, borderColor: nz.hair },
  samanuTop: { position: 'absolute', bottom: 27, width: 38, height: 7, borderRadius: 5, backgroundColor: '#6B4A32' },
  steamRow: { position: 'absolute', top: 8, flexDirection: 'row', gap: 7 },
  steam: { width: 1.5, height: 13, backgroundColor: nz.hair, borderRadius: 1 },
  senjedPile: { flexDirection: 'row', flexWrap: 'wrap', width: 44, justifyContent: 'center', gap: 4 },
  senjedBerry: { width: 13, height: 9, borderRadius: 5, backgroundColor: '#A9704F' },
  garlicBulb: { width: 34, height: 30, borderRadius: 16, backgroundColor: nz.surface, borderWidth: 1, borderColor: nz.hair, marginTop: 8 },
  garlicNeck: { position: 'absolute', top: 12, width: 5, height: 12, backgroundColor: nz.raised, borderTopLeftRadius: 4, borderTopRightRadius: 4, borderWidth: 1, borderColor: nz.hair },
  garlicLine: { position: 'absolute', bottom: 18, width: 1, height: 22, backgroundColor: nz.hair },
  apple: { width: 36, height: 34, borderRadius: 17, backgroundColor: '#B5453F', marginTop: 10 },
  appleStem: { position: 'absolute', top: 8, width: 2, height: 8, backgroundColor: '#6B4A32' },
  appleLeaf: { position: 'absolute', top: 9, left: 36, width: 10, height: 5, borderRadius: 4, backgroundColor: nz.green },
  somaqSun: { width: 22, height: 11, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: '#9E3B33', marginBottom: 1 },
  somaqHorizon: { width: 44, height: 1, backgroundColor: nz.gold },
  somaqRay: { position: 'absolute', top: 8, width: 1, height: 12, backgroundColor: '#9E3B33', opacity: 0.5 },
  vinegarNeck: { width: 7, height: 13, backgroundColor: nz.raised, borderWidth: 1, borderColor: nz.hair, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  vinegarBody: { width: 26, height: 30, backgroundColor: nz.raised, borderWidth: 1, borderColor: nz.hair, borderRadius: 5, marginTop: -1 },
  vinegarLevel: { position: 'absolute', bottom: 19, width: 24, height: 15, backgroundColor: '#7C4A3A', opacity: 0.5, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },

  guWrap: { marginVertical: spacing.lg, gap: spacing.sm },
  guRow: { backgroundColor: nz.surface, borderRadius: 10, borderWidth: 1, borderColor: nz.hair, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  guRowOn: { borderColor: nz.gold },
  guHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  guFa: { fontFamily: fonts.persian, fontSize: 15, color: nz.gold, minWidth: 54 },
  guEn: { fontFamily: fonts.heading, fontSize: fontSize.base, color: nz.text },
  guX: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: nz.textDim, marginTop: spacing.sm },

  fWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, backgroundColor: nz.raised, borderRadius: 14, borderWidth: 1, borderColor: nz.hair },
  fKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: nz.gold },
  fStage: { width: '100%', height: 92, alignItems: 'center', justifyContent: 'flex-end', marginVertical: spacing.lg },
  flame: { position: 'absolute', bottom: 10, width: 26, height: 40, backgroundColor: '#E08A3C', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, opacity: 0.85 },
  flameCore: { position: 'absolute', bottom: 12, width: 12, height: 22, backgroundColor: '#F0C24B', borderTopLeftRadius: 7, borderTopRightRadius: 7, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
  logs: { width: 44, height: 5, borderRadius: 3, backgroundColor: '#6B4A32' },
  jumper: { position: 'absolute', bottom: 6, alignItems: 'center' },
  jHead: { width: 8, height: 8, borderRadius: 4, backgroundColor: nz.text },
  jBody: { width: 3, height: 16, backgroundColor: nz.text, marginTop: 1 },
  fHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: nz.gold },
  fFa: { fontFamily: fonts.persian, fontSize: 17, color: nz.text, textAlign: 'center' },
  fEn: { fontFamily: fonts.heading, fontSize: fontSize.base, color: nz.accent, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },
  fNote: { fontFamily: fonts.body, fontSize: 11, color: nz.textDim, textAlign: 'center', marginTop: spacing.md },

  kWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, backgroundColor: nz.raised, borderRadius: 14, borderWidth: 1, borderColor: nz.hair },
  kKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: nz.gold },
  kStage: { width: '100%', height: 76, justifyContent: 'flex-end', alignItems: 'center', marginVertical: spacing.md },
  kBlades: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginBottom: 10 },
  kBlade: { width: 2, height: 40, backgroundColor: nz.green, borderRadius: 2 },
  kKnot: { position: 'absolute', top: 12, alignSelf: 'center', width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: nz.green },
  kWater: { width: '100%', height: 3, borderRadius: 2, backgroundColor: '#7FA6C0', opacity: 0.5 },
  kHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: nz.gold },
  kNote: { fontFamily: fonts.body, fontSize: 11, color: nz.textDim, textAlign: 'center', marginTop: spacing.md, fontStyle: 'italic' },
});
