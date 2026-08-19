// The history track, drawn as one continuous line.
//
// The previous version used border radii to fake the turns, which always
// looks like a cut corner rather than a curve. This is a single bezier
// path: it runs right, sweeps down and back left, sweeps again, and
// finishes right. The stops sit on it at slightly uneven intervals,
// because a perfectly regular spacing reads as a chart and this should
// read as a road.

import { useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';

import { colors, fonts, spacing } from '@/constants/zand-theme';

const W = Dimensions.get('window').width - spacing.lg * 2;
const PAD = 52;                    // keeps the curve off the edges
const ROW_H = 104;
const ROWS = 3;
const H = ROW_H * ROWS + 30;

const LINE = 'rgba(140,58,46,0.3)';
const DOT = '#8C3A2E';

type Era = { key: string; short: string; years: string };

// Nine, not fourteen. A track you can read beats a list you cannot, and
// the rest are one tap away.
const ERAS: Era[] = [
  { key: 'cyrus-the-great', short: 'Achaemenid', years: '550 BCE' },
  { key: 'parthian-empire', short: 'Parthian', years: '247 BCE' },
  { key: 'sasanian-empire', short: 'Sasanian', years: '224 CE' },
  { key: 'two-centuries-silence', short: 'The silence', years: '651' },
  { key: 'seljuk-empire', short: 'Seljuk', years: '1037' },
  { key: 'safavid-empire', short: 'Safavid', years: '1501' },
  { key: 'zand-dynasty', short: 'Zand', years: '1751' },
  { key: 'qajar-dynasty', short: 'Qajar', years: '1789' },
  { key: 'modern-iran', short: 'Now', years: '1979' },
];

/**
 * Where each row sits, and which way it runs. Rows alternate direction
 * so the line never jumps — it turns.
 */
function rowY(r: number) {
  return 22 + r * ROW_H;
}

/** The path: three straights joined by two half-turns. */
function buildPath() {
  const left = PAD;
  const right = W - PAD;
  const r = ROW_H / 2;          // the turn radius, half a row

  let d = `M ${left} ${rowY(0)}`;
  for (let i = 0; i < ROWS; i++) {
    const y = rowY(i);
    const goingRight = i % 2 === 0;
    const from = goingRight ? left : right;
    const to = goingRight ? right : left;

    d += ` L ${to} ${y}`;

    if (i < ROWS - 1) {
      const ny = rowY(i + 1);
      // a cubic that leaves horizontally and arrives horizontally, so
      // the join is smooth in both directions
      // control points stay inside the box, so nothing is cut off
      const out = goingRight ? to + r * 0.9 : to - r * 0.9;
      const bulge = Math.min(out, W - 2);
      const cx = goingRight ? Math.min(out, W - 4) : Math.max(out, 4);
      d += ` C ${cx} ${y}, ${cx} ${ny}, ${to} ${ny}`;
    }
  }
  return d;
}

/** Positions for the stops, spread along each row with a little jitter. */
function stopPositions() {
  const left = PAD;
  const right = W - PAD;
  const perRow = Math.ceil(ERAS.length / ROWS);
  // fixed offsets rather than random, so it does not move between renders
  const jitter = [0, -7, 5, -4, 8, -6, 3, -8, 6];

  return ERAS.map((e, i) => {
    const r = Math.floor(i / perRow);
    const posInRow = i % perRow;
    const goingRight = r % 2 === 0;
    const span = right - left;
    const step = span / (perRow - 1 || 1);
    const raw = goingRight ? left + posInRow * step : right - posInRow * step;
    const x = Math.max(left, Math.min(right, raw));
    return { era: e, x, y: rowY(r) + (jitter[i] ?? 0) * 0.35, row: r, goingRight };
  });
}

export function HistoryTrack() {
  const d = useMemo(buildPath, []);
  const stops = useMemo(stopPositions, []);

  return (
    <View style={{ height: H, width: W }}>
      <Svg width={W} height={H} style={StyleSheet.absoluteFill as any}>
        <Path d={d} stroke={LINE} strokeWidth={1.4} fill="none" strokeLinecap="round" />
        {stops.map((p) => (
          <Circle key={p.era.key} cx={p.x} cy={p.y} r={4.5} fill={DOT} />
        ))}
      </Svg>

      {stops.map((p, i) => {
        // labels sit above or below the line depending on the row, so
        // they never collide with the turn
        const below = p.row % 2 === 0;
        return (
          <Pressable
            key={p.era.key}
            style={[
              s.stop,
              {
                left: Math.max(0, Math.min(W - 84, p.x - 42)),
                top: below ? p.y + 12 : p.y - 46,
              },
            ]}
            onPress={() => router.navigate(('/education/topic?topic=' + p.era.key) as any)}
          >
            <Text style={s.years} numberOfLines={1}>{p.era.years}</Text>
            <Text style={s.name} numberOfLines={1}>{p.era.short}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  stop: { position: 'absolute', width: 84, alignItems: 'center' },
  years: { fontFamily: fonts.body, fontSize: 9, letterSpacing: 0.5, color: colors.textSecondary, opacity: 0.85 },
  name: { fontFamily: fonts.heading, fontSize: 14, lineHeight: 17, color: colors.textPrimary, marginTop: 1 },
});
