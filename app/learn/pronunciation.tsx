import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { PERSIAN_ALPHABET } from '@/constants/persian-alphabet';
import { DECKS } from '@/constants/flashcards';
import { PRON_WORDS } from '@/constants/pron-words';
import { speak } from '@/lib/speak';

type Item = { id: string; fa: string; roman: string; en: string; kind: string };

const LETTER_ITEMS: Item[] = PERSIAN_ALPHABET.map((l, i) => ({
  id: 'L' + i, fa: l.char, roman: l.name, en: 'sounds like “' + l.sound + '”', kind: 'Letter',
}));
const WORD_ITEMS: Item[] = DECKS.flatMap((d) =>
  d.cards.map((c, i) => ({ id: 'W' + d.key + i, fa: c.fa, roman: c.translit, en: c.en, kind: d.title }))
);
const EXTRA_ITEMS: Item[] = PRON_WORDS.map((w, i) => ({ id: 'X' + i, fa: w.fa, roman: w.translit, en: w.en, kind: w.group }));
const ALL = [...LETTER_ITEMS, ...WORD_ITEMS, ...EXTRA_ITEMS];

export default function PronunciationScreen() {
  const [tab, setTab] = useState<'letters' | 'words'>('letters');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null);

  const play = (id: string, text: string) => {
    setActive(id);
    speak(text);
    setTimeout(() => setActive((a) => (a === id ? null : a)), 1400);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? ALL : tab === 'letters' ? LETTER_ITEMS : [...WORD_ITEMS, ...EXTRA_ITEMS];
    if (!q) return base;
    return base.filter(
      (it) => it.fa.includes(query.trim()) || it.roman.toLowerCase().includes(q) || it.en.toLowerCase().includes(q)
    );
  }, [query, tab]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>Learn</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Pronunciation</Text>
          <Text style={styles.glyph}>تلفظ</Text>
        </View>
        <Text style={styles.subtitle}>Tap the speaker to hear it. Search in English or Persian.</Text>

        <View style={styles.field}>
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Search a letter or word…"
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')} hitSlop={8}><Ionicons name="close-circle" size={18} color={colors.textSecondary} /></Pressable>
          ) : null}
        </View>

        {query.length === 0 ? (
          <View style={styles.tabs}>
            <Pressable style={[styles.tab, tab === 'letters' && styles.tabActive]} onPress={() => setTab('letters')}>
              <Text style={[styles.tabText, tab === 'letters' && styles.tabTextActive]}>Letters</Text>
            </Pressable>
            <Pressable style={[styles.tab, tab === 'words' && styles.tabActive]} onPress={() => setTab('words')}>
              <Text style={[styles.tabText, tab === 'words' && styles.tabTextActive]}>Words</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.resultCount}>{results.length} result{results.length === 1 ? '' : 's'}</Text>
        )}

        <View style={styles.list}>
          {results.map((it) => (
            <Pressable key={it.id} style={[styles.row, active === it.id && styles.rowActive]} onPress={() => play(it.id, it.fa)}>
              <View style={styles.rowText}>
                <Text style={styles.rowName}>{it.roman}</Text>
                <Text style={styles.rowSub}>{it.en}{query ? '  ·  ' + it.kind : ''}</Text>
              </View>
              <Text style={it.kind === 'Letter' ? styles.rowGlyph : styles.rowGlyphSm}>{it.fa}</Text>
              <View style={[styles.playBtn, active === it.id && styles.playBtnActive]}>
                <Ionicons name="volume-high" size={18} color={active === it.id ? colors.surface : colors.accent} />
              </View>
            </Pressable>
          ))}
          {results.length === 0 ? <Text style={styles.empty}>No matches for “{query}”.</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: colors.accent },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: colors.textSecondary, marginTop: spacing.sm },
  field: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, height: 46, marginTop: spacing.lg },
  input: { flex: 1, fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textPrimary, padding: 0 },
  tabs: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  tab: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  tabActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  tabText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.textSecondary },
  tabTextActive: { color: colors.surface },
  resultCount: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 1, color: colors.textSecondary, marginTop: spacing.lg },
  list: { marginTop: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  rowActive: { borderColor: colors.accent },
  rowText: { flex: 1 },
  rowName: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  rowSub: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  rowGlyph: { fontFamily: fonts.persian, fontSize: 34, color: colors.textPrimary },
  rowGlyphSm: { fontFamily: fonts.persian, fontSize: 24, color: colors.textPrimary },
  playBtn: { width: 40, height: 40, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  playBtnActive: { backgroundColor: colors.accent },
  empty: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary, marginTop: spacing.lg },
});
