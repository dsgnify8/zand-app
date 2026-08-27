// The founder's story, on the back of the card.
//
// The listing tells you what a place is. This tells you why it exists —
// which for a directory of Iranian-owned businesses is often the more
// interesting half, and it is the thing a chain cannot have.
//
// The card turns on rotateY with both faces backface-hidden, so it reads as
// one object rather than a swap. Two animated values drive it: the spin on
// the native thread, and the height on the JS thread, because a single value
// cannot do both. The height matters — a story is rarely the same length as
// a hours-and-socials panel, and a card that jumps size at the end of the
// flip looks broken. Measuring both faces and easing between them means the
// card grows into the story as it turns.
//
// The content below is demonstration copy. Replace `story` with real
// records — the block types are the point, not the words.

import { useRef, useState } from 'react';
import { Image, Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { layoutFor } from '@/lib/founder-stories';

import { useLang } from '@/lib/i18n';
/* ------------------------------------------------------------------ *
 * The shape a real story would take. Three block kinds, so a story can
 * be written as prose with a quote dropped in wherever it belongs.
 * ------------------------------------------------------------------ */
export type StoryBlock =
  | { t: 'p'; x: string; fa?: string }
  | { t: 'quote'; x: string; fa?: string; by?: string; byFa?: string }
  | { t: 'rule' };

export type FounderStory = {
  founder?: string;
  founderFa?: string;
  role?: string;
  roleFa?: string;
  since?: string;
  blocks: StoryBlock[];
};

/** Stand-in copy until the real stories are written. */
function demoStory(name: string, city?: string): FounderStory {
  const where = city ? ' in ' + city : ' here';
  return {
    founder: 'Maryam Tehrani',
    founderFa: 'مریم تهرانی',
    role: 'Founder',
    roleFa: 'بنیان‌گذار',
    since: '2016',
    blocks: [
      {
        t: 'p',
        x:
          'My mother cooked for thirty people every Friday and never once called it work. ' +
          'When we left Tehran she brought two things: a copper pot, and the conviction that ' +
          'nobody should eat alone.',
        fa:
          'مادرم هر جمعه برای سی نفر آشپزی می‌کرد و یک بار هم اسمش را کار نگذاشت. ' +
          'وقتی از تهران رفتیم دو چیز با خودش آورد: یک دیگ مسی، و این باور که هیچ‌کس نباید تنها غذا بخورد.',
      },
      {
        t: 'quote',
        x: 'We did not open a business. We set a longer table.',
        fa: 'ما کسب‌وکار باز نکردیم. سفره را درازتر کردیم.',
        by: 'Maryam',
        byFa: 'مریم',
      },
      {
        t: 'p',
        x:
          'Opening' +
          where +
          ' was not a plan so much as an argument I kept losing with myself. ' +
          'The first year was two of us and a rented kitchen. The pot came too.',
        fa:
          'باز کردن اینجا نقشه نبود؛ بحثی بود که مدام با خودم می‌باختم. ' +
          'سال اول دو نفر بودیم و یک آشپزخانهٔ اجاره‌ای. دیگ مسی هم آمد.',
      },
      { t: 'rule' },
      {
        t: 'p',
        x:
          'People come in and hear the language and something in their shoulders drops. ' +
          'That is the whole business. ' +
          name +
          ' is just the room it happens in.',
        fa:
          'مردم می‌آیند تو، زبان را می‌شنوند، و چیزی در شانه‌هایشان پایین می‌آید. ' +
          'تمام کار همین است. اینجا فقط اتاقی است که این اتفاق در آن می‌افتد.',
      },
    ],
  };
}

const SPIN = { duration: 520, easing: Easing.inOut(Easing.cubic) };

/** Four corners for the wash, indexed by the story's seed. */
const WASH = [
  { start: { x: 0.1, y: 0 }, end: { x: 0.9, y: 1 } },
  { start: { x: 0.9, y: 0 }, end: { x: 0.1, y: 1 } },
  { start: { x: 0, y: 0.85 }, end: { x: 1, y: 0.1 } },
  { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
] as const;

export function FounderFlip({
  children,
  name,
  city,
  fa,
  story,
  motifKey,
}: {
  children: any;
  name: string;
  city?: string;
  fa: boolean;
  story?: FounderStory;
  /** Usually the business id. Decides which mark sits behind the story. */
  motifKey?: string;
}) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  // No story, no back. demoStory was a placeholder while the real ones
  // were being written; leaving it in would mean every listing appearing
  // to have a founder's account, most of them the same invented woman.
  const s = story;

  const [flipped, setFlipped] = useState(false);
  const layout = layoutFor(motifKey ?? name);
  const [frontH, setFrontH] = useState(0);
  const [backH, setBackH] = useState(0);

  // Transforms go on the native thread; height cannot. Two values, started
  // together — one Animated.Value cannot serve both drivers.
  const spin = useRef(new Animated.Value(0)).current;
  const h = useRef(new Animated.Value(0)).current;

  const measured = frontH > 0 && backH > 0;

  const onFront = (e: LayoutChangeEvent) => {
    const v = Math.round(e.nativeEvent.layout.height);
    if (v > 0 && v !== frontH) {
      setFrontH(v);
      if (!flipped) h.setValue(v);
    }
  };
  const onBack = (e: LayoutChangeEvent) => {
    const v = Math.round(e.nativeEvent.layout.height);
    if (v > 0 && v !== backH) setBackH(v);
  };

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    Animated.parallel([
      Animated.timing(spin, { toValue: next ? 1 : 0, ...SPIN, useNativeDriver: true }),
      Animated.timing(h, {
        toValue: next ? Math.max(backH, 280) : frontH,
        ...SPIN,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const frontSpin = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backSpin = spin.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  // Nothing to turn over. The card keeps its chrome — the rounded top and
  // the lap over the photograph belong to it — but there is no back face
  // and no control implying there is one.
  if (!s) {
    return <View style={st.card}>{children}</View>;
  }

  return (
    <Animated.View style={[st.card, measured ? { height: h } : null]}>
      {/* Front — the listing. Stays in flow so it sets the card's height. */}
      <Animated.View
        onLayout={onFront}
        pointerEvents={flipped ? 'none' : 'auto'}
        style={[st.face, { transform: [{ perspective: 1200 }, { rotateY: frontSpin }] }]}
      >
        {children}
      </Animated.View>

      {/* Back — the story. Absolute and unconstrained, so onLayout reports
          the height it actually wants rather than the front's. */}
      <Animated.View
        onLayout={onBack}
        pointerEvents={flipped ? 'auto' : 'none'}
        style={[
          st.face,
          st.back,
          { opacity: measured ? 1 : 0, transform: [{ perspective: 1200 }, { rotateY: backSpin }] },
        ]}
      >
        {/* A warm wash over the paper, strongest at the top, plus an inset
            hairline. The story should feel like a different surface to the
            listing, not the same page with other words on it. */}
        <View pointerEvents="none" style={st.frost} />
        {/* A wash rather than a mark: a drawing behind the text was
            competing with it. The corner it comes from from a different corner per story. Small, but
            it is the first thing the eye reads on turning the card, and
            four of them means two listings side by side never open the
            same way. */}
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(196,168,148,0.22)', 'rgba(214,196,180,0.10)', 'rgba(255,255,255,0)']}
          start={WASH[layout.wash].start}
          end={WASH[layout.wash].end}
          style={StyleSheet.absoluteFill as any}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(255,255,255,0.66)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0)']}
          locations={[0, 0.42, 1]}
          style={StyleSheet.absoluteFill as any}
        />
        <View pointerEvents="none" style={st.frostEdge} />

        <View style={[st.inner, fa && { alignItems: 'flex-end' }]}>
          {/* Centred or ranged left, by the story's seed. The most
              visible of the variations, so it carries most of the work of
              making two stories look unlike each other. */}
          <View style={layout.head === 'centre' ? st.headCentre : undefined}>
            <Text style={[st.eyebrow, fa && st.rtl, layout.head === 'centre' && st.tc]}>
              {fa ? 'داستان بنیان‌گذار' : 'FOUNDER\u2019S STORY'}
            </Text>

            <Text style={[st.founder, fa && st.rtl, layout.head === 'centre' && st.tc]}>
              {fa ? s.founderFa ?? s.founder : s.founder}
            </Text>
            <Text style={[st.role, fa && st.rtl, layout.head === 'centre' && st.tc]}>
              {(fa ? s.roleFa ?? s.role : s.role) ?? ''}
              {s.since ? '  ·  ' + (fa ? 'از ' + s.since : 'since ' + s.since) : ''}
            </Text>
          </View>

          {/* The founder, where there is one. Above the story rather than
              inside it: you want to see who is talking before you read
              what they said. */}
          {(s as any).photo ? (
            <View style={st.portrait}>
              <Image source={{ uri: (s as any).photo }} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
            </View>
          ) : null}

          {s.blocks.map((b, i) => {
            if (b.t === 'rule') return <View key={i} style={st.rule} />;

            if (b.t === 'quote') {
              // Three settings, chosen by the story's seed. Different
              // enough to read as different designs, quiet enough that
              // none of them shouts — a pull-quote that competes with the
              // prose is a pull-quote nobody finishes.
              const body = fa ? b.fa ?? b.x : b.x;
              const attrib = b.by ? '\u2014 ' + (fa ? b.byFa ?? b.by : b.by) : null;

              if (layout.quote === 'centre') {
                return (
                  <View key={i} style={st.qCentre}>
                    <Text style={[st.qCentreT, fa && st.rtl]}>{body}</Text>
                    {attrib ? <Text style={[st.qCentreBy, fa && st.rtl]}>{attrib}</Text> : null}
                  </View>
                );
              }

              if (layout.quote === 'rule') {
                return (
                  <View key={i} style={st.qRule}>
                    <View style={st.qRuleLine} />
                    <Text style={[st.qRuleT, fa && st.rtl]}>{body}</Text>
                    {attrib ? <Text style={[st.qRuleBy, fa && st.rtl]}>{attrib}</Text> : null}
                    <View style={st.qRuleLine} />
                  </View>
                );
              }

              return (
                <View
                  key={i}
                  style={[st.quoteWrap, fa ? st.quoteWrapFa : st.quoteWrapEn]}
                >
                  <Text style={[st.mark, fa && st.markFa]}>{fa ? '»' : '\u201C'}</Text>
                  <Text style={[st.quote, fa && st.rtl]}>{body}</Text>
                  {attrib ? <Text style={[st.by, fa && st.rtl]}>{attrib}</Text> : null}
                </View>
              );
            }

            // A capital on the opening paragraph, on roughly one story in
            // five. Any more often and it reads as a template rather than
            // as something someone chose. Never in Persian: the script has
            // no capitals and a large first letter would simply be a large
            // letter.
            const text = fa ? b.fa ?? b.x : b.x;
            if (layout.drop && !fa && i === 0 && text.length > 40) {
              return (
                <Text key={i} style={st.para}>
                  <Text style={st.dropCap}>{text.slice(0, 1)}</Text>
                  {text.slice(1)}
                </Text>
              );
            }

            return (
              <Text key={i} style={[st.para, fa && st.rtlPara]}>
                {text}
              </Text>
            );
          })}
        </View>
      </Animated.View>

      {/* The toggle sits outside both faces, so it never mirrors. */}
      <Pressable
        onPress={toggle}
        hitSlop={14}
        accessibilityRole="button"
        accessibilityLabel={
          flipped ? (fa ? 'بازگشت به اطلاعات' : 'Back to details') : fa ? 'داستان بنیان‌گذار' : 'Founder story'
        }
        style={[st.sBtn, fa ? { left: spacing.lg } : { right: spacing.lg }, flipped && st.sBtnOn]}
      >
        <Text style={[st.sT, flipped && st.sTOn]}>{flipped ? '\u00D7' : 'S'}</Text>
      </Pressable>
    </Animated.View>
  );
}

const st = StyleSheet.create({
  // Matches s.body on the business page: the white card that laps the photo.
  card: {
    marginTop: -22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  face: { backfaceVisibility: 'hidden' },
  back: { position: 'absolute', top: 0, left: 0, right: 0 },
  // Glass is a lift, not a tint. Garnet over cream reads pink at every
  // opacity there is, so the veil is cool and near-neutral instead, and the
  // sheen above it does the rest of the work.
  frost: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(247,246,245,0.80)' },
  frostEdge: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.70)',
  },
  inner: { padding: spacing.lg, paddingTop: spacing.xl },

  eyebrow: {
    fontFamily: fonts.bodyStrong,
    fontSize: 9.5,
    letterSpacing: 2.2,
    color: colors.accent,
  },

  founder: {
    fontFamily: fonts.heading,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textPrimary,
    letterSpacing: -0.4,
    marginTop: 10,
  },
  role: {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 1.4,
    color: colors.textSecondary,
    marginTop: 5,
  },

  // Longer measure and looser leading than the listing above it — this is
  // meant to be read, not scanned.
  para: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 26,
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  rtlPara: { writingDirection: 'rtl', textAlign: 'right', fontFamily: fonts.persian, lineHeight: 30 },

  rule: {
    height: StyleSheet.hairlineWidth,
    width: 40,
    backgroundColor: colors.accent,
    opacity: 0.45,
    marginTop: spacing.xl,
  },

  quoteWrap: { marginTop: spacing.xl, paddingLeft: spacing.lg },
  quoteWrapEn: { borderLeftWidth: 2, borderLeftColor: colors.accent, paddingLeft: spacing.lg },
  quoteWrapFa: {
    borderRightWidth: 2,
    borderRightColor: colors.accent,
    paddingRight: spacing.lg,
    paddingLeft: 0,
    alignItems: 'flex-end',
  },
  // The mark hangs above the quote rather than sitting in the line.
  mark: {
    fontFamily: fonts.heading,
    fontSize: 34,
    lineHeight: 34,
    color: colors.accent,
    opacity: 0.5,
    marginBottom: -6,
  },
  markFa: { textAlign: 'right' },
  quote: {
    fontFamily: fonts.heading,
    fontSize: 21,
    lineHeight: 31,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  by: {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.textSecondary,
    marginTop: 10,
  },

  sBtn: {
    position: 'absolute',
    top: spacing.lg,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accent,
    backgroundColor: colors.background,
  },
  sBtnOn: { backgroundColor: colors.accent },
  sT: { fontFamily: fonts.heading, fontSize: 16, lineHeight: 20, color: colors.accent },
  sTOn: { color: colors.background, fontSize: 19 },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
  /* centred: alone between paragraphs, no marks, wider leading */
  qCentre: { marginVertical: spacing.xl, paddingHorizontal: spacing.md },
  qCentreT: {
    fontFamily: fonts.heading, fontSize: 21, lineHeight: 32,
    color: colors.textPrimary, textAlign: 'center',
  },
  qCentreBy: {
    fontFamily: fonts.body, fontSize: 11, letterSpacing: 1.2,
    color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm,
  },

  /* ruled: a hairline above and below, running the full measure */
  qRule: { marginVertical: spacing.xl, gap: spacing.md },
  qRuleLine: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(40,28,24,0.22)' },
  qRuleT: {
    fontFamily: fonts.body, fontSize: 15, lineHeight: 25,
    color: colors.textPrimary,
  },
  qRuleBy: {
    fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.6,
    color: colors.textSecondary,
  },
  headCentre: { alignItems: 'center' },
  tc: { textAlign: 'center' },
  dropCap: {
    fontFamily: fonts.heading,
    fontSize: 40,
    lineHeight: 40,
    color: colors.textPrimary,
  },
  portrait: {
    width: '100%', aspectRatio: 1.3, borderRadius: 12, overflow: 'hidden',
    backgroundColor: 'rgba(40,28,24,0.06)', marginBottom: spacing.lg,
  },
});
