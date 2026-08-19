import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { ZandHeader } from '@/components/zand-header';
import { PERSIAN_ALPHABET } from '@/constants/persian-alphabet';
import { DECKS } from '@/constants/flashcards';
import { PRON_WORDS } from '@/constants/pron-words';
import { useMetered } from '@/lib/use-metered';
import { LEARN } from '@/constants/i18n/learn';
import { t as tl } from '@/lib/i18n';

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
  const { say, listen: metListen, PaywallHost } = useMetered();
  const [tab, setTab] = useState<'letters' | 'words'>('letters');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null);

  const play = (id: string, text: string) => {
    setActive(id);
    say(text);
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
        <Pressable style={styles.backBtn} onPress={() => router.replace('/learn/map' as any)}>
          <Ionicons name="chevron-back" size={20} color={lw.muted} />
          <Text style={styles.backBtnText}>{tl(LEARN.learn) === 'Learn' ? 'Learn' : ''}</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{tl(LEARN.pronunciation)}</Text>
          <Text style={styles.glyph}>تلفظ</Text>
        </View>
        <Text style={styles.subtitle}>{tl(LEARN.pronunciationX)}</Text>

        <View style={styles.field}>
          <Ionicons name="search" size={18} color={lw.muted} />
          <TextInput
            style={styles.input}
            placeholder={tl(LEARN.searchLetterOrWord)}
            placeholderTextColor={lw.muted}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')} hitSlop={8}><Ionicons name="close-circle" size={18} color={lw.muted} /></Pressable>
          ) : null}
        </View>

        {query.length === 0 ? (
          <View style={styles.tabs}>
            <Pressable style={[styles.tab, tab === 'letters' && styles.tabActive]} onPress={() => setTab('letters')}>
              <Text style={[styles.tabText, tab === 'letters' && styles.tabTextActive]}>{tl(LEARN.letters)}</Text>
            </Pressable>
            <Pressable style={[styles.tab, tab === 'words' && styles.tabActive]} onPress={() => setTab('words')}>
              <Text style={[styles.tabText, tab === 'words' && styles.tabTextActive]}>{tl(LEARN.words)}</Text>
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
                <Ionicons name="volume-high" size={18} color={active === it.id ? lw.surface : lw.green} />
              </View>
            </Pressable>
          ))}
          {results.length === 0 ? <Text style={styles.empty}>No matches for “{query}”.</Text> : null}
        </View>
      </ScrollView>
      {PaywallHost}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: lw.muted },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: lw.ink, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: lw.green },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: lw.muted, marginTop: spacing.sm },
  field: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: lw.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: lw.hair, paddingHorizontal: spacing.md, height: 46, marginTop: spacing.lg },
  input: { flex: 1, fontFamily: fonts.body, fontSize: fontSize.base, color: lw.ink, padding: 0 },
  tabs: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  tab: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.pill, borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface },
  tabActive: { backgroundColor: lw.green, borderColor: lw.green },
  tabText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: lw.muted },
  tabTextActive: { color: lw.surface },
  resultCount: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 1, color: lw.muted, marginTop: spacing.lg },
  list: { marginTop: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: lw.surface, borderRadius: radius.md, borderWidth: 1, borderColor: lw.hair, padding: spacing.md },
  rowActive: { borderColor: lw.green },
  rowText: { flex: 1 },
  rowName: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lw.ink },
  rowSub: { fontFamily: fonts.body, fontSize: fontSize.sm, color: lw.muted, marginTop: 2 },
  rowGlyph: { fontFamily: fonts.persian, fontSize: 34, color: lw.ink },
  rowGlyphSm: { fontFamily: fonts.persian, fontSize: 24, color: lw.ink },
  playBtn: { width: 40, height: 40, borderRadius: radius.pill, borderWidth: 1, borderColor: lw.green, alignItems: 'center', justifyContent: 'center' },
  playBtnActive: { backgroundColor: lw.green },
  empty: { fontFamily: fonts.body, fontSize: fontSize.base, color: lw.muted, marginTop: spacing.lg },
});
