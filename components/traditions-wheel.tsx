// Traditions, as one circle cut in half.
//
// Nowruz and Yalda are the same event twice: the year's two hinges, six
// months apart, one at the light end and one at the dark. A single disc
// split down the middle says that in one glance.
//
// The dark half is not a semicircle with a moon drawn inside it — the half
// *is* the moon. Its outer edge is the disc's own rim and its inner edge is
// a wider arc cutting back across, so the crescent and the circle are one
// shape rather than an illustration sitting in a container.
//
// Drawn in thin strokes rather than fills, so it sits with the history
// track's hairlines rather than competing with the poet cards' photographs.

import { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { SectionBand } from '@/components/section-band';
import { useLang, getLang } from '@/lib/i18n';

// Taken from the two-panel version this replaces, so the seasons keep the
// colours people already associate with them elsewhere in the app.
const GOLD = '#C08A33';
const PURPLE = '#332D5E';
const DIVIDER = 'rgba(40,24,20,0.16)';

// How far the crescent's inner arc cuts back. Closer to 1 gives a thinner
// moon; 1.06 leaves it about a quarter of the radius thick.
const INNER = 1.06;

export function TraditionsWheel() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';

  const [W, setW] = useState(340);
  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && Math.abs(w - W) > 1) setW(w);
  };

  const R = Math.min(96, Math.round(W / 2) - 32);
  const H = R * 2 + 34;
  const cx = W / 2;
  const cy = R + 14;

  // Gold keeps the side the reader starts from.
  const goldLeft = !fa;
  const sign = goldLeft ? 1 : -1; // +1 when the moon is on the right

  // Sweep 1 from the top runs clockwise, which is the right half.
  const goldSweep = goldLeft ? 0 : 1;
  const moonSweep = goldLeft ? 1 : 0;

  const goldArc = `M ${cx} ${cy - R} A ${R} ${R} 0 0 ${goldSweep} ${cx} ${cy + R}`;

  // Out along the rim, then back across on a wider radius — one closed
  // crescent whose outer edge is the disc itself.
  const moon =
    `M ${cx} ${cy - R} A ${R} ${R} 0 0 ${moonSweep} ${cx} ${cy + R}` +
    ` A ${(R * INNER).toFixed(1)} ${(R * INNER).toFixed(1)} 0 0 ${goldLeft ? 0 : 1} ${cx} ${cy - R} Z`;

  // Rays sit just outside the gold arc, pointing away from the centre.
  const rays = [130, 155, 180, 205, 230].map((d) => {
    const a = ((goldLeft ? d : 180 - d) * Math.PI) / 180;
    return {
      x1: cx + Math.cos(a) * (R + 9),
      y1: cy + Math.sin(a) * (R + 9),
      x2: cx + Math.cos(a) * (R + 20),
      y2: cy + Math.sin(a) * (R + 20),
    };
  });

  // In the open ground the crescent leaves behind.
  const stars = [
    { o: 0.3, v: -0.5, r: 1.7 },
    { o: 0.55, v: -0.2, r: 1.2 },
    { o: 0.24, v: -0.02, r: 1.4 },
  ].map((s) => ({ x: cx + sign * s.o * R, y: cy + s.v * R, r: s.r }));

  return (
    <View style={st.wrap} onLayout={onLayout}>
      {/* A disc on open paper needs something under it. */}
      <SectionBand top={30} bottom={40} />
      <Pressable onPress={() => router.navigate('/traditions' as any)}>
        <View style={{ height: H }}>
          <Svg width={W} height={H} style={StyleSheet.absoluteFill as any} pointerEvents="none">
            {/* The light half, barely tinted — the stroke carries the colour. */}
            <Path d={`${goldArc} Z`} fill={GOLD} fillOpacity={0.08} />
            <Path d={goldArc} stroke={GOLD} strokeWidth={1.2} fill="none" />

            {/* The dark half, which is the moon. */}
            <Path
              d={moon}
              fill={PURPLE}
              fillOpacity={0.1}
              stroke={PURPLE}
              strokeWidth={1.2}
              strokeLinejoin="round"
            />

            {/* Six months, drawn as one line. */}
            <Line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke={DIVIDER} strokeWidth={1} />

            {rays.map((r, i) => (
              <Line
                key={i}
                x1={r.x1}
                y1={r.y1}
                x2={r.x2}
                y2={r.y2}
                stroke={GOLD}
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            ))}

            {stars.map((s, i) => (
              <Circle key={i} cx={s.x} cy={s.y} r={s.r} fill={PURPLE} opacity={0.75} />
            ))}
          </Svg>

          {/* Names sit inside their own half. Lifted from cy+40 to cy+22 and
              given real line heights — Persian was clipping at the descender. */}
          <View
            style={[
              st.name,
              { top: cy + 22, width: R - 10 },
              goldLeft ? { left: cx - R + 12 } : { left: cx + 10 },
            ]}
          >
            <Text style={[st.nameFa, { color: GOLD }]}>نوروز</Text>
            {!fa ? <Text style={[st.nameEn, { color: GOLD }]}>NOWRUZ</Text> : null}
          </View>

          <View
            style={[
              st.name,
              { top: cy + 22, width: R - 10 },
              goldLeft ? { left: cx + 10 } : { left: cx - R + 12 },
            ]}
          >
            <Text style={[st.nameFa, { color: PURPLE }]}>یلدا</Text>
            {!fa ? <Text style={[st.nameEn, { color: PURPLE }]}>YALDA</Text> : null}
          </View>
        </View>

        <View style={st.copy}>
          <Text style={[st.h1, fa && st.rtl]}>
            {fa ? 'آیین‌هایمان را بشناس' : 'Learn about our traditions'}
          </Text>
          <Text style={[st.sub, fa && st.rtl]}>
            {fa
              ? 'دو شب که سال بر آن دو می‌گردد، شش ماه دور از هم.'
              : 'Two nights the year turns on, six months apart.'}
          </Text>

          <View style={[st.cta, fa && { flexDirection: 'row-reverse' }]}>
            <Text style={[st.ctaT, fa && st.rtl]}>{fa ? 'تمام سال' : 'The whole year'}</Text>
            <Ionicons name={fa ? 'arrow-back' : 'arrow-forward'} size={13} color={colors.accent} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { marginTop: 56 }, // the illustration needs air around it to read

  name: { position: 'absolute', alignItems: 'center' },
  nameFa: { fontFamily: fonts.heading, fontSize: 17, lineHeight: 26 },
  nameEn: { fontFamily: fonts.body, fontSize: 9, letterSpacing: 2, lineHeight: 13, opacity: 0.85 },

  copy: { alignItems: 'center', marginTop: 34 },
  h1: {
    fontFamily: fonts.heading,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textPrimary,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 300,
  },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 18 },
  ctaT: { fontFamily: fonts.body, fontSize: 13, color: colors.accent },

  rtl: { writingDirection: 'rtl' },
});
