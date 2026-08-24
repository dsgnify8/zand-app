// History, as four chapters instead of nine dots.
//
// Why chapters: nine eras drawn at a circle size worth looking at runs to two
// and a half screens. Grouping them into four keeps the section to one screen
// and gives the circles room to be the thing you notice.
//
// Why nothing reflows on open: an SVG path cannot be tweened by Animated, so
// growing a row would make the whole track snap to its new shape. Instead the
// geometry is fixed and the eras bloom *out of* the circle on top of it. Every
// animation here runs on the native driver.
//
// This component draws its own section header, unlike the other worlds on
// Explore. It has to: the spine starts above the section and runs down past
// the title before the track begins, so the title has to indent to clear it
// and the two cannot be authored separately.

import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { useLang, getLang } from '@/lib/i18n';

const LINE = 'rgba(140,58,46,0.3)'; // same hairline the old track used
const BRICK = '#8C3A2E'; // same brick the old dots used, at 84pt

/* ------------------------------------------------------------------ *
 * Geometry.
 *
 * ROW_TOP is derived from the *measured* header, not guessed. The first
 * attempt hardcoded it and the subtitle wrapped to two lines on a real
 * phone, which dropped the title straight on top of chapter 01.
 * ------------------------------------------------------------------ */
const SPINE_X = 18; // where the line runs down, inside the page's own padding
const LEAD = 150; // spine drawn above the section, up toward the page title
// Where the topics rail crosses the lead-in, measured up from the section top.
const RAIL_TOP = 58; // the break opens here
const RAIL_BOTTOM = 24; // and closes here
const CORNER = 30; // radius of the U-turns
const ROW_H = 124; // vertical gap between horizontal runs
const HEAD_GAP = 96; // header bottom to the first run
const CIRCLE_R = 42;
// 02 and 04 run smaller, so the track has a rhythm rather than four
// identical discs. Index matches CHAPTERS.
const RADII = [36, 30, 36, 28];
const TAIL = 44; // the line carries on past the last chapter
const SAT_R = 88; // how far an era sits from its chapter's centre
const TEXT_LIFT = 16; // chapter text clears the line by this much

const faNum = (s: string) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

/* ------------------------------------------------------------------ *
 * Content. era.key matches the topic keys the old track used, so the
 * route is unchanged.
 * ------------------------------------------------------------------ */
type Era = { key: string; en: string; fa: string; year: string; yearFa: string };
type Chapter = {
  id: string;
  n: string;
  en: string;
  fa: string;
  range: string;
  rangeFa: string;
  eras: Era[];
};

const CHAPTERS: Chapter[] = [
  {
    id: 'empires',
    n: '01',
    en: 'The first empires',
    fa: 'شاهنشاهی‌های کهن',
    range: '550 BCE — 651 CE',
    rangeFa: '۵۵۰ پ.م — ۶۵۱ م',
    eras: [
      { key: 'cyrus-the-great', en: 'Achaemenid', fa: 'هخامنشی', year: '550 BCE', yearFa: '۵۵۰ پ.م' },
      { key: 'parthian-empire', en: 'Parthian', fa: 'اشکانی', year: '247 BCE', yearFa: '۲۴۷ پ.م' },
      { key: 'sasanian-empire', en: 'Sasanian', fa: 'ساسانی', year: '224 CE', yearFa: '۲۲۴ م' },
    ],
  },
  {
    id: 'silence',
    n: '02',
    en: 'Silence and return',
    fa: 'خاموشی و بازگشت',
    range: '651 — 1501',
    rangeFa: '۶۵۱ — ۱۵۰۱',
    eras: [
      { key: 'two-centuries-silence', en: 'The silence', fa: 'خاموشی', year: '651', yearFa: '۶۵۱' },
      { key: 'seljuk-empire', en: 'Seljuk', fa: 'سلجوقی', year: '1037', yearFa: '۱۰۳۷' },
    ],
  },
  {
    id: 'reforged',
    n: '03',
    en: 'A country reforged',
    fa: 'ایران از نو',
    range: '1501 — 1789',
    rangeFa: '۱۵۰۱ — ۱۷۸۹',
    eras: [
      { key: 'safavid-empire', en: 'Safavid', fa: 'صفوی', year: '1501', yearFa: '۱۵۰۱' },
      { key: 'zand-dynasty', en: 'Zand', fa: 'زند', year: '1751', yearFa: '۱۷۵۱' },
    ],
  },
  {
    id: 'modern',
    n: '04',
    en: 'The modern age',
    fa: 'ایران امروز',
    range: '1789 — today',
    rangeFa: '۱۷۸۹ — امروز',
    eras: [
      { key: 'qajar-dynasty', en: 'Qajar', fa: 'قاجار', year: '1789', yearFa: '۱۱۶۸' },
      // The revolution is 1357 in the Persian calendar. Writing 1979 in a
      // Persian sentence is the tell that the string was translated.
      { key: 'modern-iran', en: 'Now', fa: 'اکنون', year: '1979', yearFa: '۱۳۵۷' },
    ],
  },
];

// Wide enough that two stacked labels clear each other vertically. The first
// pass used ±24° at radius 76 and they overlapped.
const fanAngles = (n: number) => (n === 3 ? [-40, 0, 40] : n === 2 ? [-30, 30] : [0]);

const openTopic = (key: string) => router.navigate(('/education/topic?topic=' + key) as any);

export function HistoryChapters() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';

  // Measured rather than taken from Dimensions, because this sits inside the
  // page's horizontal padding and the track has to end where the page does.
  const [W, setW] = useState(Dimensions.get('window').width - 40);
  const [headH, setHeadH] = useState(170);
  const [open, setOpen] = useState<number | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && Math.abs(w - W) > 1) setW(w);
  };
  const onHeadLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && Math.abs(h - headH) > 1) setHeadH(h);
  };

  const ROW_TOP = headH + HEAD_GAP;
  const SECTION_H = ROW_TOP + ROW_H * 3 + CIRCLE_R + TAIL;

  // Mirror every x for Persian. Doing it at the coordinate level means the
  // path, the circles and the fans all flip together and stay in sync.
  const X = useMemo(() => (v: number) => (fa ? W - v : v), [fa, W]);

  const rowFade = useRef(CHAPTERS.map(() => new Animated.Value(1))).current;
  const openV = useRef(CHAPTERS.map(() => new Animated.Value(0))).current;
  const sat = useRef(CHAPTERS.map((c) => c.eras.map(() => new Animated.Value(0)))).current;

  const setOpenChapter = (next: number | null) => {
    setOpen(next);

    CHAPTERS.forEach((c, k) => {
      const isOpen = next === k;
      Animated.parallel([
        Animated.timing(rowFade[k], {
          toValue: next === null || isOpen ? 1 : 0.22,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(openV[k], {
          toValue: isOpen ? 1 : 0,
          duration: 240,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // Eras leave together and arrive one after another — the stagger is
      // what makes it read as a bloom rather than a fade.
      if (isOpen) {
        Animated.stagger(
          55,
          sat[k].map((v) =>
            Animated.spring(v, { toValue: 1, friction: 7, tension: 58, useNativeDriver: true })
          )
        ).start();
      } else {
        Animated.parallel(
          sat[k].map((v) =>
            Animated.timing(v, {
              toValue: 0,
              duration: 160,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            })
          )
        ).start();
      }
    });
  };

  const toggle = (i: number) => setOpenChapter(open === i ? null : i);

  const L = SPINE_X;
  const Rt = W - SPINE_X;
  const rowY = (i: number) => ROW_TOP + i * ROW_H;

  // One continuous line: down the spine, then four runs joined by U-turns,
  // then a short tail past the last chapter because history hasn't stopped.
  const d = useMemo(() => {
    const p: string[] = [`M ${X(L)} 0`];
    for (let i = 0; i < 4; i++) {
      const y = rowY(i);
      const near = i % 2 === 0 ? L : Rt; // end the line arrives at
      const far = i % 2 === 0 ? Rt : L; // end it leaves from
      const inset = (v: number, towards: number) => (v < towards ? v + CORNER : v - CORNER);

      p.push(`V ${y - CORNER}`);
      p.push(`Q ${X(near)} ${y} ${X(inset(near, far))} ${y}`); // turn into the run
      p.push(`L ${X(inset(far, near))} ${y}`); // the run itself
      p.push(`Q ${X(far)} ${y} ${X(far)} ${y + CORNER}`); // turn down
    }
    p.push(`V ${rowY(3) + CORNER + TAIL}`);
    return p.join(' ');
  }, [W, fa, X, ROW_TOP]);

  return (
    <View style={{ height: SECTION_H, overflow: 'visible' }} onLayout={onLayout}>
      {/* The spine's lead-in, drawn above this section so the line reads as
          arriving from the top of the page rather than starting mid-scroll. */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -LEAD,
          left: X(SPINE_X) - 0.7,
          width: 1.4,
          height: LEAD - RAIL_TOP,
          backgroundColor: LINE,
        }}
      />
      {/* …the rail sits in the gap here… */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -RAIL_BOTTOM,
          left: X(SPINE_X) - 0.7,
          width: 1.4,
          height: RAIL_BOTTOM,
          backgroundColor: LINE,
        }}
      />

      {/* The track. Drawn first so the circles cover it where they meet. */}
      <Svg width={W} height={SECTION_H} style={StyleSheet.absoluteFill as any} pointerEvents="none">
        <Path d={d} stroke={LINE} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      </Svg>

      {/* Section header, indented to clear the spine on whichever side it runs. */}
      <Pressable
        onLayout={onHeadLayout}
        onPress={() => router.navigate('/education/history' as any)}
        style={[
          st.header,
          fa
            ? { paddingRight: SPINE_X + 26, paddingLeft: 4, alignItems: 'flex-end' }
            : { paddingLeft: SPINE_X + 26, paddingRight: 4 },
        ]}
      >
        {!fa ? <Text style={st.eyebrow}>تاریخ</Text> : null}
        <View style={[st.headRow, fa && { flexDirection: 'row-reverse' }]}>
          <Text style={[st.h1, fa && st.rtl]}>{fa ? 'تاریخ' : 'History'}</Text>
          <View style={[st.moreRow, fa && { flexDirection: 'row-reverse' }]}>
            <Text style={[st.moreT, fa && st.rtl]}>{fa ? 'تاریخ را بیاموز' : 'Learn history'}</Text>
            <Ionicons name={fa ? 'arrow-back' : 'arrow-forward'} size={13} color={colors.accent} />
          </View>
        </View>
        <Text style={[st.sub, fa && st.rtl]}>
          {fa
            ? 'بیست‌وپنج سده، به همان ترتیب که گذشت.'
            : 'Twenty-five centuries, in the order they happened.'}
        </Text>
      </Pressable>

      {/* Tapping the empty track closes an open chapter. Sits under the rows,
          so anything interactive still wins the touch. */}
      {open !== null && (
        <Pressable
          style={[StyleSheet.absoluteFill, { top: headH }]}
          onPress={() => setOpenChapter(null)}
        />
      )}

      {CHAPTERS.map((c, i) => {
        const cy = rowY(i);
        const r = RADII[i] ?? CIRCLE_R;
        const cx = X(i % 2 === 0 ? L + r : Rt - r);
        const leftSide = cx < W / 2;

        // Text sits fully above the run. The first pass centred it on the line
        // and the hairline drew straight through the words.
        const zoneStart = leftSide ? cx + r + 18 : SPINE_X + 4;
        const zoneWidth = Math.max(
          80,
          leftSide ? W - SPINE_X - 4 - zoneStart : cx - r - 18 - zoneStart
        );
        const align: 'left' | 'right' = fa ? 'right' : leftSide ? 'left' : 'right';

        const angles = fanAngles(c.eras.length);

        return (
          <Animated.View
            key={c.id}
            style={[StyleSheet.absoluteFill, { opacity: rowFade[i] }]}
            pointerEvents="box-none"
          >
            {/* Tethers, drawn before the circle so their inner ends are hidden. */}
            {c.eras.map((e, j) => {
              const deg = leftSide ? angles[j] : 180 - angles[j];
              return (
                <Animated.View
                  key={`t-${e.key}`}
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    left: cx,
                    top: cy - 0.7,
                    width: SAT_R - 8,
                    height: 1.4,
                    backgroundColor: LINE,
                    transformOrigin: 'left center',
                    opacity: sat[i][j],
                    transform: [{ rotate: `${deg}deg` }, { scaleX: sat[i][j] }],
                  }}
                />
              );
            })}

            {/* The chapter. */}
            <Pressable
              onPress={() => toggle(i)}
              accessibilityRole="button"
              accessibilityLabel={fa ? c.fa : c.en}
              style={{
                position: 'absolute',
                left: cx - r,
                top: cy - r,
                width: r * 2,
                height: r * 2,
              }}
            >
              <Animated.View
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderRadius: r,
                  backgroundColor: BRICK,
                  transform: [
                    { scale: openV[i].interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) },
                  ],
                }}
              />
            </Pressable>

            {/* Chapter title, above the line, fading out as its eras arrive. */}
            <Animated.View
              pointerEvents={open === i ? 'none' : 'auto'}
              style={{
                position: 'absolute',
                left: zoneStart,
                top: cy - TEXT_LIFT - 62,
                width: zoneWidth,
                opacity: openV[i].interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                transform: [
                  { translateY: openV[i].interpolate({ inputRange: [0, 1], outputRange: [0, 8] }) },
                ],
              }}
            >
              <Pressable onPress={() => toggle(i)}>
                <Text style={[st.num, { textAlign: align }, fa && st.rtl]}>
                  {fa ? faNum(c.n) : c.n}
                </Text>
                <Text style={[st.chapter, { textAlign: align }, fa && st.rtl]} numberOfLines={1}>
                  {fa ? c.fa : c.en}
                </Text>
                <Text style={[st.range, { textAlign: align }, fa && st.rtl]} numberOfLines={1}>
                  {fa ? c.rangeFa : c.range}
                </Text>
              </Pressable>
            </Animated.View>

            {/* The eras. Layout puts each one at its resting coordinate; the
                animation only slides it the last few points back toward the
                circle. Positioning them purely by transform meant a failed
                interpolation stacked every label on the circle's centre. */}
            {c.eras.map((e, j) => {
              const deg = leftSide ? angles[j] : 180 - angles[j];
              const rad = (deg * Math.PI) / 180;
              const px = cx + Math.cos(rad) * SAT_R;
              const py = cy + Math.sin(rad) * SAT_R;
              const v = sat[i][j];

              return (
                <Animated.View
                  key={e.key}
                  pointerEvents={open === i ? 'auto' : 'none'}
                  style={{
                    position: 'absolute',
                    top: py - 17,
                    ...(leftSide
                      ? { left: px, width: Math.max(70, W - px - 4), alignItems: 'flex-start' }
                      : { left: 4, width: Math.max(70, px - 4), alignItems: 'flex-end' }),
                    opacity: v,
                    transform: [
                      {
                        translateX: v.interpolate({
                          inputRange: [0, 1],
                          outputRange: [leftSide ? -30 : 30, 0],
                        }),
                      },
                      { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
                    ],
                  }}
                >
                  <Pressable
                    onPress={() => openTopic(e.key)}
                    hitSlop={12}
                    style={[st.satRow, { flexDirection: leftSide ? 'row' : 'row-reverse' }]}
                  >
                    <View style={st.satDot} />
                    <View style={leftSide ? { marginLeft: 10 } : { marginRight: 10 }}>
                      <Text
                        style={[st.satName, { textAlign: leftSide ? 'left' : 'right' }, fa && st.rtl]}
                        numberOfLines={1}
                      >
                        {fa ? e.fa : e.en}
                      </Text>
                      <Text
                        style={[st.satYear, { textAlign: leftSide ? 'left' : 'right' }, fa && st.rtl]}
                        numberOfLines={1}
                      >
                        {fa ? e.yearFa : e.year}
                      </Text>
                    </View>
                  </Pressable>
                </Animated.View>
              );
            })}
          </Animated.View>
        );
      })}
    </View>
  );
}

const st = StyleSheet.create({
  header: { paddingTop: 40 },
  eyebrow: {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.accent,
    marginBottom: 4,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  h1: { fontFamily: fonts.heading, fontSize: 32, color: colors.textPrimary, letterSpacing: -0.4 },
  moreRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  moreT: { fontFamily: fonts.body, fontSize: 13, color: colors.accent },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, marginTop: 8 },

  num: {
    fontFamily: fonts.body,
    fontSize: 10,
    letterSpacing: 2.5,
    color: colors.textSecondary,
    opacity: 0.8,
    marginBottom: 4,
  },
  chapter: {
    fontFamily: fonts.heading,
    fontSize: 19,
    lineHeight: 23,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  range: {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 1.4,
    color: colors.textSecondary,
    marginTop: 5,
  },

  satRow: { alignItems: 'center' },
  satDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: BRICK },
  satName: { fontFamily: fonts.heading, fontSize: 15, lineHeight: 18, color: colors.textPrimary },
  satYear: {
    fontFamily: fonts.body,
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.textSecondary,
    opacity: 0.85,
    marginTop: 2,
  },

  rtl: { writingDirection: 'rtl' },
});
