// Literature, as a deck you throw.
//
// Text on one side, seven cards on the other, cascading like something left
// on a table. Throw the top card away from you and the next poet is face up;
// throw it back and the previous one slides in over the top.
//
// The cards carry no text. Whoever is on top is named in the column beside
// the deck instead, which crossfades as the order changes — it keeps the
// cards as clean as photographs and gives the column something to do.
//
// Two things here exist only to stop the image flashing white:
//
//  1. Every card is an Animated.View with identical nesting, top or not.
//     Rendering the top one as Animated.View and the rest as View meant
//     promotion changed the element type, so React tore the card down and
//     rebuilt it, and the Image re-decoded — a white card for a beat.
//  2. The card that swiping back would bring in is rendered invisibly
//     behind the stack, so its image is already decoded when it arrives.
//
// Built on PanResponder rather than gesture-handler + reanimated. Both are
// installed, but reanimated 4 needs react-native-worklets and a
// GestureHandlerRootView at the app root, and neither is confirmed here.

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  LayoutChangeEvent,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { SectionBand } from '@/components/section-band';
import { eduImage } from '@/constants/education-images';
import { AUTHORS } from '@/constants/literature';
import { useLang, t as tr, getLang } from '@/lib/i18n';
import { SECTIONS } from '@/constants/i18n/sections';

const CARD_R = 12;
const CARD_RATIO = 1.34; // close to the median cover, so most crop barely at all
const DEPTH = 3; // how many cards are visible; one more is preloaded behind

/* ------------------------------------------------------------------ *
 * The covers have no shared aspect ratio — they run from 1:1.71 to
 * 16:9 — so resizeMode="cover" cropped each by a different amount from
 * the centre, with no say in which part survived. These are the real
 * pixel dimensions; the face is positioned by hand from them.
 *
 * fx / fy are the focal point, 0..1. 0.5 is centred; lower fy keeps the
 * top of a tall picture, lower fx keeps the left of a wide one.
 *
 * Rumi is 1280x720. In a portrait card that loses well over half the
 * width whatever we do — that asset wants replacing with a portrait crop.
 * ------------------------------------------------------------------ */
const COVER: Record<string, { w: number; h: number; fx?: number; fy?: number }> = {
  ferdowsi: { w: 735, h: 1117, fy: 0.42 },
  hafez: { w: 882, h: 1200 },
  saadi: { w: 1582, h: 2701, fy: 0.4 },
  rudaki: { w: 500, h: 500 },
  khayyam: { w: 818, h: 770 },
  nizami: { w: 666, h: 888 },
  rumi: { w: 1280, h: 720 },
};

// A cascade, not a scatter. Stepping consistently right and down reads as a
// stack; fanning both directions read as mess.
const OFFSETS = [
  { x: 0, y: 0, r: 0, s: 1, o: 1 },
  { x: 13, y: 9, r: 1.5, s: 0.965, o: 0.9 },
  { x: 24, y: 17, r: 3, s: 0.93, o: 0.62 },
];

// How far past the top card the cascade reaches. Deliberately not reserved
// in the layout — it bleeds toward the screen edge, which is the point.
const CASCADE = 26;

const faNum = (s: string) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
const pad2 = (n: number) => (n < 10 ? '0' + n : String(n));

type Poet = { key: string; name: string; persian?: string; years?: string; cover?: string };

/** The image, sized and offset so the focal point survives the crop. */
function Face({ poet, w, h }: { poet?: Poet; w: number; h: number }) {
  const key = poet?.key ?? '';
  const src = eduImage(poet?.cover ?? 'lit-' + key + '-cover');

  if (!src) {
    return (
      <View style={[StyleSheet.absoluteFill as any, st.blank]}>
        <Text style={st.blankT}>{poet?.persian ?? poet?.name ?? ''}</Text>
      </View>
    );
  }

  const meta = COVER[key];
  if (!meta) {
    // Unknown dimensions — fall back to the old behaviour rather than guess.
    return <Image source={src} style={StyleSheet.absoluteFill as any} resizeMode="cover" />;
  }

  const sa = meta.w / meta.h;
  const ca = w / h;
  const fx = meta.fx ?? 0.5;
  const fy = meta.fy ?? 0.5;

  // Fill the card on whichever axis would otherwise leave a gap, then slide
  // the overflow to put the focal point where it belongs.
  const rw = sa > ca ? h * sa : w;
  const rh = sa > ca ? h : w / sa;

  return (
    <Image
      source={src}
      style={{
        position: 'absolute',
        width: rw,
        height: rh,
        left: -(rw - w) * fx,
        top: -(rh - h) * fy,
      }}
      resizeMode="cover"
    />
  );
}

export function PoetDeck() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const poets = AUTHORS as unknown as Poet[];

  const [order, setOrder] = useState<string[]>(() => poets.map((p) => p.key));
  const byKey = useMemo(() => {
    const m: Record<string, Poet> = {};
    poets.forEach((p) => (m[p.key] = p));
    return m;
  }, [poets]);

  // Width is measured; the section sits inside the page's own padding and the
  // deck has to be sized from what is actually left.
  const [CW, setCW] = useState(340);
  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && Math.abs(w - CW) > 1) setCW(w);
  };

  const CARD_W = Math.min(184, Math.round(CW * 0.5));
  const CARD_H = Math.round(CARD_W * CARD_RATIO);
  const COL_W = Math.max(120, CW - CARD_W - 16);

  // Which way is "forward". In Persian the page runs the other way, so the
  // gesture does too.
  const nextDir = fa ? 1 : -1;

  // The pan handlers are created once, so anything that changes has to be
  // read through a ref rather than captured.
  const cardW = useRef(CARD_W);
  cardW.current = CARD_W;
  const nextRef = useRef(nextDir);
  nextRef.current = nextDir;

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const nameFade = useRef(new Animated.Value(1)).current;

  // Where the incoming card should start, when going back. Read and cleared
  // by the layout effect below.
  const incoming = useRef<number | null>(null);

  const advance = () => setOrder((o) => (o.length < 2 ? o : [...o.slice(1), o[0]]));
  const retreat = () =>
    setOrder((o) => (o.length < 2 ? o : [o[o.length - 1], ...o.slice(0, -1)]));

  // Forward: the top card leaves. Only reorder in the callback — resetting
  // the pan here put the thrown card back at centre for one frame first.
  const fling = (toX: number, toY: number, duration: number) =>
    Animated.timing(pan, {
      toValue: { x: toX, y: toY },
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // pan drives layout-space transforms
    }).start(({ finished }) => {
      if (finished) advance();
    });

  const goNext = () => fling(nextRef.current * (cardW.current + 220), 26, 240);

  // Back: nothing leaves. The previous card is put on top and slides in from
  // the side you swiped toward.
  const goPrev = () => {
    incoming.current = -nextRef.current * (cardW.current + 200);
    retreat();
  };

  const responder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, g) =>
        Math.abs(g.dx) > 4 && Math.abs(g.dx) > Math.abs(g.dy),
      onMoveShouldSetPanResponderCapture: (_e, g) =>
        Math.abs(g.dx) > 4 && Math.abs(g.dx) > Math.abs(g.dy),

      // Without this the ScrollView can ask for the gesture back mid-drag and
      // the card hands it over, which is what made the swipe feel stiff.
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,

      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_e, g) => {
        const thrown = Math.abs(g.dx) > 36 || Math.abs(g.vx) > 0.3;
        if (!thrown) {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 6,
            tension: 60,
            useNativeDriver: false,
          }).start();
          return;
        }
        const forward = (g.dx < 0 ? -1 : 1) === nextRef.current;
        if (forward) fling(nextRef.current * (cardW.current + 220), g.dy * 0.6, 200);
        else goPrev();
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 6,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const topKey = order[0];
  const top = byKey[topKey];

  // Runs after render but before paint, so the incoming card is never drawn
  // at the outgoing card's position.
  useLayoutEffect(() => {
    if (incoming.current !== null) {
      pan.setValue({ x: incoming.current, y: 0 });
      incoming.current = null;
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 8,
        tension: 55,
        useNativeDriver: false,
      }).start();
    } else {
      pan.setValue({ x: 0, y: 0 });
    }
  }, [topKey]);

  // The name changes with the deck, so it should not simply cut.
  useEffect(() => {
    nameFade.setValue(0);
    Animated.timing(nameFade, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [topKey]);

  // The hub, not the reader. The deck is for choosing; opening page one of
  // whoever is face up would make the choice for them.
  const openTop = () => router.navigate('/literature' as any);

  const rotate = pan.x.interpolate({
    inputRange: [-CARD_W, 0, CARD_W],
    outputRange: ['-11deg', '0deg', '11deg'],
  });
  const flyOpacity = pan.x.interpolate({
    inputRange: [-CARD_W * 1.45, -CARD_W * 0.8, 0, CARD_W * 0.8, CARD_W * 1.45],
    outputRange: [0, 1, 1, 1, 0],
  });

  const position = poets.findIndex((p) => p.key === topKey) + 1;

  // Back to front: the preloaded card first, then depth 2, 1, 0.
  const visible = order.slice(0, DEPTH).map((key, k) => ({ key, k }));
  const draw =
    order.length > DEPTH
      ? [{ key: order[order.length - 1], k: -1 }, ...visible.slice().reverse()]
      : visible.slice().reverse();

  return (
    <View style={[st.row, fa && { flexDirection: 'row-reverse' }]} onLayout={onLayout}>
      {/* Cards and a column of type, with nothing else holding them down. */}
      <SectionBand top={44} bottom={44} />
      {/* The column. */}
      <View style={[st.col, { width: COL_W }, fa && { alignItems: 'flex-end' }]}>
        <Pressable onPress={() => router.navigate('/literature' as any)}>
          {!fa ? <Text style={st.eyebrow}>ادبیات</Text> : null}
          <Text style={[st.h1, fa && st.rtl]}>{tr(SECTIONS.literature)}</Text>
          <Text style={[st.blurb, fa && st.rtl]}>
            {fa ? 'هفت شاعر، هزار سال، یک زبان.' : 'Seven poets, a thousand years, one language.'}
          </Text>
        </Pressable>

        <View style={[st.rule, fa && { alignSelf: 'flex-end' }]} />

        {/* Whoever is face up. */}
        <Animated.View style={{ opacity: nameFade }}>
          <Text style={[st.poetFa, fa && st.rtl]} numberOfLines={1}>
            {top?.persian ?? ''}
          </Text>
          <Text style={[st.poetName, fa && st.rtl]} numberOfLines={1}>
            {top?.name ?? ''}
          </Text>
          {top?.years ? (
            <Text style={[st.poetYears, fa && st.rtl]} numberOfLines={1}>
              {fa ? faNum(top.years) : top.years}
            </Text>
          ) : null}

          <Pressable onPress={openTop} hitSlop={8} style={[st.read, fa && st.readRtl]}>
            <Text style={[st.readT, fa && st.rtl]}>{fa ? 'بخوان' : 'Read'}</Text>
            <Ionicons name={fa ? 'arrow-back' : 'arrow-forward'} size={12} color={colors.accent} />
          </Pressable>
        </Animated.View>

        <Text style={[st.count, fa && st.rtl]}>
          {fa
            ? faNum(pad2(position)) + ' / ' + faNum(pad2(poets.length))
            : pad2(position) + ' / ' + pad2(poets.length)}
        </Text>
      </View>

      {/* The deck. */}
      <View style={{ width: CARD_W, height: CARD_H + CASCADE }}>
        {draw.map(({ key, k }) => {
          const p = byKey[key];
          const isTop = k === 0;
          const isGhost = k === -1; // mounted only so its image is ready
          const o = OFFSETS[Math.max(0, k)];

          const base = {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: CARD_W,
            height: CARD_H,
            borderRadius: CARD_R,
            backgroundColor: colors.background,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'rgba(40,24,20,0.10)',
            overflow: 'hidden' as const,
          };

          const motion = isTop
            ? {
                opacity: flyOpacity,
                transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
              }
            : {
                opacity: isGhost ? 0 : o.o,
                transform: [
                  { translateX: (fa ? -1 : 1) * o.x },
                  { translateY: o.y },
                  { rotate: `${(fa ? -1 : 1) * o.r}deg` },
                  { scale: o.s },
                ],
              };

          return (
            <Animated.View
              key={key}
              {...(isTop ? responder.panHandlers : null)}
              style={[base, isTop ? st.shadowTop : st.shadow, motion]}
            >
              {/* Tapping the face sends it forward, same as a throw. */}
              <Pressable
                style={StyleSheet.absoluteFill as any}
                pointerEvents={isTop ? 'auto' : 'none'}
                onPress={isTop ? goNext : undefined}
                accessibilityRole="button"
                accessibilityLabel={fa ? 'کارت بعدی' : 'Next poet — ' + (p?.name ?? '')}
              >
                <Face poet={p} w={CARD_W} h={CARD_H} />
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  col: { paddingTop: 6 },

  eyebrow: { fontFamily: fonts.body, fontSize: 11, letterSpacing: 2, color: colors.accent },
  h1: {
    fontFamily: fonts.heading,
    fontSize: 28,
    lineHeight: 32,
    color: colors.textPrimary,
    letterSpacing: -0.4,
    marginTop: 4,
  },
  blurb: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 8,
  },

  rule: {
    height: StyleSheet.hairlineWidth,
    width: 34,
    backgroundColor: colors.accent,
    opacity: 0.4,
    marginVertical: 18,
  },

  poetFa: { fontFamily: fonts.heading, fontSize: 15, color: colors.accent, opacity: 0.9 },
  poetName: {
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 26,
    color: colors.textPrimary,
    marginTop: 2,
  },
  poetYears: {
    fontFamily: fonts.body,
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.textSecondary,
    marginTop: 4,
  },

  read: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 12 },
  readRtl: { flexDirection: 'row-reverse', alignSelf: 'flex-end' },
  readT: { fontFamily: fonts.body, fontSize: 13, color: colors.accent },

  count: {
    fontFamily: fonts.body,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.textSecondary,
    opacity: 0.65,
    marginTop: 20,
  },

  shadow: {
    shadowColor: '#2A1A14',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  // The top card sits highest, so it casts the deepest shadow.
  shadowTop: {
    shadowColor: '#2A1A14',
    shadowOpacity: 0.26,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },

  blank: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(140,58,46,0.10)' },
  blankT: { fontFamily: fonts.heading, fontSize: 22, color: colors.accent, opacity: 0.7 },

  rtl: { writingDirection: 'rtl' },
});
