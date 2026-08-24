// Culture, led by a joke.
//
// The old version was a card with a photograph and a rail of topics. This
// puts a Typical Persian line first and lets it do the explaining: the
// section is about rules nobody writes down, so it opens with one instead
// of describing the category.
//
// The panel is the brick the history circles use, with the bazaar blurred
// into it for texture rather than sitting behind it as a photograph. Blur
// comes from React Native's own Image blurRadius — no expo-blur, so it
// works in Expo Go as-is.

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { eduImage } from '@/constants/education-images';
import { t as tr, getLang } from '@/lib/i18n';
import { SECTIONS } from '@/constants/i18n/sections';

const BRICK = '#8C3A2E'; // the history circles
const ON_BRICK = '#F6EFE9'; // type that has to sit on it

export function CultureQuote() {
  const fa = getLang() === 'fa';
  const bg = eduImage('zand-vakil-bazaar');

  return (
    <View style={st.wrap}>
      {/* Centred as a block. The quote is the section's whole argument, so
          it gets the middle of the page rather than sharing a column. */}
      <View style={st.centre}>
        {!fa ? <Text style={st.eyebrow}>فرهنگ</Text> : null}

        {/* The break is deliberate — the second sentence is the punchline
            and wants its own line rather than wherever the width puts it. */}
        <Text style={[st.quote, fa && st.rtl]}>
          {fa
            ? '«پسرخاله‌ات دکتر شده.\nخبرش به گوشت می‌رسد.»'
            : '\u201CYour cousin is a doctor.\nYou will hear about it.\u201D'}
        </Text>

        {/* Attribution — the line comes from the Typical Persian deck. */}
        <View style={st.badge}>
          <Text style={st.badgeT}>{fa ? 'ایرانیِ اصیل' : 'TYPICAL PERSIAN'}</Text>
        </View>

        <Text style={[st.body, fa && st.rtl]}>
          {fa
            ? 'قاعده‌هایی که هیچ‌کس نمی‌نویسد و همه بلدند. چه کسی حساب می‌کند، چه کسی تعارف می‌زند، و آن کشمکش دمِ در چقدر باید طول بکشد.'
            : 'The rules nobody writes down and everybody knows. Who pays, who refuses, and how long the argument at the door is supposed to last.'}
        </Text>
      </View>

      {/* The way in. */}
      <Pressable style={st.panel} onPress={() => router.navigate('/culture' as any)}>
        {bg ? (
          <Image
            source={bg}
            style={[StyleSheet.absoluteFill as any, st.panelImg]}
            blurRadius={30}
            resizeMode="cover"
          />
        ) : null}
        {/* Brick over the blur, not under it — the photograph is texture here,
            not subject, and the panel has to read as one colour. */}
        <View style={[StyleSheet.absoluteFill as any, st.panelScrim]} />

        <View style={[st.panelRow, fa && { flexDirection: 'row-reverse' }]}>
          <View style={fa ? { alignItems: 'flex-end' } : undefined}>
            {!fa ? <Text style={st.panelFa}>فرهنگ</Text> : null}
            <Text style={[st.panelT, fa && st.rtl]}>{tr(SECTIONS.culture)}</Text>
          </View>

          {/* Frosted, so the blur underneath shows through the circle. */}
          <View style={st.dot}>
            <Ionicons name={fa ? 'arrow-back' : 'arrow-forward'} size={15} color={ON_BRICK} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { marginTop: 40 }, // room off the deck above
  centre: { alignItems: 'center', paddingHorizontal: 4 },

  eyebrow: {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.accent,
    textAlign: 'center',
  },

  quote: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 42,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginTop: 14,
  },

  badge: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accent,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginTop: 16,
    opacity: 0.8,
  },
  badgeT: { fontFamily: fonts.body, fontSize: 8, letterSpacing: 1.4, color: colors.accent },

  body: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 18,
    maxWidth: 300,
  },

  panel: {
    marginTop: 40,
    height: 104,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: BRICK,
    alignSelf: 'stretch',
  },
  // Scaled up so the blur has no soft edge showing at the corners.
  panelImg: { opacity: 0.55, transform: [{ scale: 1.3 }] },
  panelScrim: { backgroundColor: 'rgba(140,58,46,0.72)' },

  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  panelFa: { fontFamily: fonts.body, fontSize: 10, letterSpacing: 2, color: ON_BRICK, opacity: 0.75 },
  panelT: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 29,
    color: ON_BRICK,
    letterSpacing: -0.3,
    marginTop: 3,
  },
  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.38)',
  },

  rtl: { writingDirection: 'rtl' },
});
