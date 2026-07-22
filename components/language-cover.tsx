import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/zand-theme';

// Clean minimal cover for language cards: a paper background with a large
// faded Farsi letter/word set lower-right, echoing the Articles header.
const COVERS: Record<string, { glyph: string; small?: string }> = {
  'lang-story': { glyph: 'الف‌با', small: 'ا' },
  'lang-alphabet': { glyph: 'ا ب پ', small: 'ب' },
  'lang-flashcards': { glyph: 'واژه', small: 'و' },
  'lang-writing': { glyph: 'نوشتن', small: 'ن' },
  'lang-quizzes': { glyph: 'آزمون', small: 'آ' },
};

export function LanguageCover({ name }: { name: string }) {
  const c = COVERS[name] ?? { glyph: 'فارسی' };
  return (
    <View style={s.wrap}>
      <Text style={s.faded}>{c.glyph}</Text>
      <Text style={s.mark}>{c.glyph}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#F3EEE4', overflow: 'hidden' },
  faded: { position: 'absolute', right: -8, bottom: -14, fontFamily: fonts.persian, fontSize: 90, color: colors.textPrimary, opacity: 0.05 },
  mark: { position: 'absolute', right: 12, bottom: 12, fontFamily: fonts.persian, fontSize: 30, color: colors.accent, opacity: 0.9 },
});
