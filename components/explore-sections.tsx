// The last two sections, neither a card.
//
// Traditions is two halves of a year meeting in the middle — Nowruz warm
// and rising, Yalda cold and long — with the gradient bleeding across
// the join, because that is what the year does.
//
// Language is the argument the section makes, shown rather than stated:
// the same word written three ways across two and a half thousand years.
// Cuneiform, Pahlavi, and what a Persian writes today.

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useLang, getLang } from '@/lib/i18n';

/* ---------------- traditions ---------------- */

export function TraditionsPanels() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';

  return (
    <View style={s.year}>
      {/* Traditions, like its Yalda twin below. The standalone Nowruz
          page was left behind when the two were brought together, and
          kept a copy of the content with its own faults. */}
      <Pressable style={s.half} onPress={() => router.navigate('/traditions?t=nowruz' as any)}>
        <LinearGradient
          colors={['#E8C97A', '#D9A15B', '#C97F4A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill as any}
        />
        <Text style={s.halfFa}>نوروز</Text>
        <Text style={s.halfT}>{fa ? 'آغاز سال' : 'The year begins'}</Text>
        <Text style={s.halfX}>
          {fa ? 'به‌وقت اعتدال بهاری، ثانیه به ثانیه.' : 'At the equinox, counted to the second.'}
        </Text>
      </Pressable>

      {/* the two seasons meet here, and neither edge is hard */}
      <LinearGradient
        colors={['rgba(201,127,74,0)', 'rgba(150,110,90,0.55)', 'rgba(60,52,92,0.85)', 'rgba(45,40,72,0)']}
        locations={[0, 0.35, 0.62, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={s.seam}
        pointerEvents="none"
      />

      <Pressable style={s.half} onPress={() => router.navigate('/traditions' as any)}>
        <LinearGradient
          colors={['#3C345C', '#2D2848', '#1E1B33']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill as any}
        />
        <Text style={[s.halfFa, { color: 'rgba(255,255,255,0.9)' }]}>یلدا</Text>
        <Text style={[s.halfT, { color: '#FFF' }]}>{fa ? 'بلندترین شب' : 'The longest night'}</Text>
        <Text style={[s.halfX, { color: 'rgba(255,255,255,0.7)' }]}>
          {fa ? 'می‌نشینند تا سحر، و هندوانه می‌برند.' : 'They sit until dawn, and cut a watermelon.'}
        </Text>
      </Pressable>
    </View>
  );
}

/* ---------------- language ---------------- */

// The same idea — a king, shah — as it was written at three points in
// the language's life. Not a transliteration exercise: the shapes are
// the point, and the shapes changed completely while the word did not.
const SCRIPTS = [
  { era: 'c. 500 BCE', name: 'Old Persian', script: '𐎧𐏁𐎠𐎹𐎰𐎡𐎹', note: 'Cut into stone, in cuneiform.' },
  { era: 'c. 300 CE', name: 'Middle Persian', script: 'ŠĀH', note: 'Written in Pahlavi, on parchment and coin.' },
  { era: 'today', name: 'Persian', script: 'شاه', note: 'In an Arabic script with four letters added.' },
];

export function LanguageScripts() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';

  return (
    <View style={s.scripts}>
      {SCRIPTS.map((x, i) => (
        <Pressable
          key={x.name}
          style={s.scriptRow}
          onPress={() => router.navigate('/language' as any)}
        >
          <View style={s.scriptLeft}>
            <Text style={s.scriptEra}>{x.era}</Text>
            <Text style={s.scriptName}>{x.name}</Text>
          </View>

          <View style={s.scriptMid}>
            <Text style={[s.scriptGlyph, i === 2 && s.scriptGlyphFa]}>{x.script}</Text>
          </View>

          {i < SCRIPTS.length - 1 ? <View style={s.scriptRule} /> : null}
        </Pressable>
      ))}

      <Text style={s.scriptNote}>
        {fa
          ? 'یک واژه، سه خط، و زبانی که از هر سه جان به در برد.'
          : 'One word, three scripts, and a language that outlived all of them.'}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  year: { flexDirection: 'row', height: 178, borderRadius: 20, overflow: 'hidden' },
  half: { flex: 1, padding: spacing.lg, justifyContent: 'flex-end', minHeight: 178 },
  seam: { position: 'absolute', left: '22%', right: '22%', top: 0, bottom: 0 },
  halfFa: { fontFamily: fonts.persian, fontSize: 20, color: 'rgba(60,40,20,0.75)' },
  halfT: { fontFamily: fonts.heading, fontSize: 19, lineHeight: 23, color: '#3A2A18', marginTop: 2 },
  halfX: { fontFamily: fonts.body, fontSize: 11, lineHeight: 16, color: 'rgba(58,42,24,0.75)', marginTop: 4 },

  scripts: { borderRadius: 20, backgroundColor: 'rgba(92,74,120,0.06)', paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  scriptRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  scriptLeft: { width: 112 },
  scriptEra: { fontFamily: fonts.body, fontSize: 9.5, letterSpacing: 0.5, color: colors.textSecondary },
  scriptName: { fontFamily: fonts.heading, fontSize: 15, color: colors.textPrimary, marginTop: 1 },
  scriptMid: { flex: 1, alignItems: 'flex-end' },
  scriptGlyph: { fontSize: 26, color: '#5C4A78', letterSpacing: 2 },
  scriptGlyphFa: { fontFamily: fonts.persian, fontSize: 30, letterSpacing: 0 },
  scriptRule: { position: 'absolute', left: 0, right: 0, bottom: 0, height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(92,74,120,0.18)' },
  scriptNote: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 17, color: colors.textSecondary, paddingVertical: spacing.md },
});
