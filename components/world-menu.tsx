// The quick way around Explore.
//
// A very small hamburger, turned on its side, sitting on the Explore
// title's line. Press it and the page dissolves to cream and the six worlds
// fan out around it on hairline tethers — the same gesture language as the
// history chapters, so the page has one idea about what a tap does.
//
// It is mounted *inside* the header View rather than absolutely against the
// SafeAreaView. Positioning it against the safe area put it up under the
// status bar, because the inset padding and an absolute offset don't
// compose the way you'd guess. Sitting in the header, it lines up with the
// title by construction.
//
// It renders through a Modal so the fan can cross the header and the tab
// bar without fighting z-order or the scroll view's clipping. The anchor's
// screen position is measured on press, so it draws from wherever it is.
//
// Each world goes straight to its own page. Scrolling the person to the
// section would defeat the point — this exists for people who don't want to
// scroll at all.

import { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';

import { colors, fonts } from '@/constants/zand-theme';
import { getLang } from '@/lib/i18n';

const LINE = 'rgba(140,58,46,0.3)';
const SCRIM = 'rgba(247,242,236,0.965)'; // the page's own cream, near-opaque

const BAR_W = 13; // the hamburger's bars, before rotation
const BAR_H = 1.3;
const BAR_GAP = 3.5;

type World = { id: string; en: string; fa: string; route: string; deg: number; r: number };

// An arc down the left of the anchor, radius growing as it descends. The
// first version bunched six two-line labels into 30pt of vertical gap each
// and they overlapped; these are spaced ~45pt apart, which single-line
// labels clear comfortably.
const WORLDS: World[] = [
  { id: 'history', en: 'History', fa: 'تاریخ', route: '/education/history', deg: 174, r: 150 },
  { id: 'geography', en: 'Geography', fa: 'جغرافیا', route: '/geography', deg: 160, r: 170 },
  { id: 'literature', en: 'Literature', fa: 'ادبیات', route: '/literature', deg: 146, r: 186 },
  { id: 'culture', en: 'Culture', fa: 'فرهنگ', route: '/culture', deg: 133, r: 205 },
  { id: 'traditions', en: 'Traditions', fa: 'آیین‌ها', route: '/traditions', deg: 121, r: 230 },
  { id: 'language', en: 'Language', fa: 'زبان', route: '/language', deg: 110, r: 258 },
];

export function WorldMenu() {
  const fa = getLang() === 'fa';
  const { width: SW } = useWindowDimensions();
  const anchorRef = useRef<View>(null);

  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState({ cx: SW - 34, cy: 90 });

  const scrim = useRef(new Animated.Value(0)).current;
  const items = useRef(WORLDS.map(() => new Animated.Value(0))).current;

  const open = () => {
    // Measure first, then open — the fan has to know where it grew from.
    anchorRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ cx: x + w / 2, cy: y + h / 2 });
      setVisible(true);
      scrim.setValue(0);
      items.forEach((v) => v.setValue(0));
      Animated.sequence([
        Animated.timing(scrim, {
          toValue: 1,
          duration: 170,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.stagger(
          46,
          items.map((v) =>
            Animated.spring(v, { toValue: 1, friction: 7, tension: 55, useNativeDriver: true })
          )
        ),
      ]).start();
    });
  };

  const close = (then?: () => void) => {
    Animated.parallel([
      ...items.map((v) =>
        Animated.timing(v, {
          toValue: 0,
          duration: 140,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        })
      ),
      Animated.timing(scrim, {
        toValue: 0,
        duration: 180,
        delay: 60,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      then?.();
    });
  };

  const pick = (route: string) => close(() => router.navigate(route as any));

  return (
    <>
      {/* Stretched over the title's height and centred inside it, so the mark
          sits on the title's line whatever the header padding turns out to be. */}
      <Pressable
        ref={anchorRef}
        onPress={open}
        hitSlop={22}
        accessibilityRole="button"
        accessibilityLabel={fa ? 'فهرست' : 'Jump to a world'}
        style={[st.anchor, fa ? { left: 14 } : { right: 14 }]}
      >
        {/* Three bars, turned ninety degrees so they stand upright. */}
        <View style={st.burger}>
          <View style={st.bar} />
          <View style={st.bar} />
          <View style={st.bar} />
        </View>
      </Pressable>

      <Modal visible={visible} transparent animationType="none" onRequestClose={() => close()}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: scrim }]}>
          <Pressable
            style={[StyleSheet.absoluteFill, { backgroundColor: SCRIM }]}
            onPress={() => close()}
          />

          {/* Where the page folded up to. */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: anchor.cx - 19,
              top: anchor.cy - 19,
              width: 38,
              height: 38,
              borderRadius: 19,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: LINE,
            }}
          />

          {WORLDS.map((w, i) => {
            // Mirror the constellation in Persian, where the menu sits on the
            // other side and has to open the other way.
            const deg = fa ? 180 - w.deg : w.deg;
            const rad = (deg * Math.PI) / 180;
            const px = anchor.cx + Math.cos(rad) * w.r;
            const py = anchor.cy + Math.sin(rad) * w.r;
            const v = items[i];

            return (
              <View key={w.id}>
                <Animated.View
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    left: anchor.cx,
                    top: anchor.cy - 0.5,
                    width: Math.max(30, w.r - 34),
                    height: 1,
                    backgroundColor: LINE,
                    transformOrigin: 'left center',
                    opacity: v,
                    transform: [{ rotate: `${deg}deg` }, { scaleX: v }],
                  }}
                />

                {/* Anchored by the edge nearest the menu, so labels grow away
                    from the corner instead of off the screen. */}
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: py - 15,
                    maxWidth: 200,
                    ...(fa
                      ? { left: px, alignItems: 'flex-start' }
                      : { right: SW - px, alignItems: 'flex-end' }),
                    opacity: v,
                    transform: [
                      {
                        translateX: v.interpolate({
                          inputRange: [0, 1],
                          outputRange: [fa ? -22 : 22, 0],
                        }),
                      },
                      { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.86, 1] }) },
                    ],
                  }}
                >
                  {/* One line, in the language being read. Both languages at
                      once doubled the label height and the fan collided. */}
                  <Pressable onPress={() => pick(w.route)} hitSlop={14} style={st.label}>
                    <Text style={[st.labelT, fa && st.rtl]}>{fa ? w.fa : w.en}</Text>
                  </Pressable>
                </Animated.View>
              </View>
            );
          })}

          <Animated.Text style={[st.hint, { opacity: items[items.length - 1] }]}>
            {fa ? 'برای بستن، هر جا را بزن' : 'Tap anywhere to close'}
          </Animated.Text>
        </Animated.View>
      </Modal>
    </>
  );
}

const st = StyleSheet.create({
  anchor: {
    position: 'absolute',
    top: 0,
    height: 54, // roughly the title's line box
    justifyContent: 'center',
    paddingHorizontal: 10,
    zIndex: 30,
  },
  burger: { transform: [{ rotate: '90deg' }], alignItems: 'center', gap: BAR_GAP },
  bar: { width: BAR_W, height: BAR_H, borderRadius: 1, backgroundColor: colors.textPrimary },

  label: { paddingVertical: 6 },
  labelT: {
    fontFamily: fonts.heading,
    fontSize: 21,
    lineHeight: 27,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },

  hint: {
    position: 'absolute',
    bottom: 54,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: 10,
    letterSpacing: 1.6,
    color: colors.textSecondary,
    opacity: 0.7,
  },

  rtl: { writingDirection: 'rtl' },
});
