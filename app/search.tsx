import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { searchZand, type SearchEntry } from '@/constants/search-index';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

const SUGGESTIONS = ['Alphabet', 'History', 'Poetry', 'Nowruz', 'Food', 'Podcasts'];

export default function SearchScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchZand(query), [query]);

  const grouped = useMemo(() => {
    const map: Record<string, SearchEntry[]> = {};
    for (const r of results) (map[r.category] ||= []).push(r);
    return Object.entries(map);
  }, [results]);

  const go = (route: string) => {
    (router.canGoBack() ? router.back() : router.replace('/'));
    requestAnimationFrame(() => router.navigate(route as any));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.searchRow}>
        <View style={styles.field}>
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Search ZAND"
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            autoFocus
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} hitSlop={8}>
          <Text style={styles.cancel}>{t(APP.cancel)}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {query.length === 0 ? (
          <View>
            <Text style={styles.sectionLabel}>{t(APP.trySearching)}</Text>
            <View style={styles.chips}>
              {SUGGESTIONS.map((s) => (
                <Pressable key={s} style={styles.chip} onPress={() => setQuery(s)}>
                  <Text style={styles.chipText}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : results.length === 0 ? (
          <Text style={styles.empty}>No results for “{query}”.</Text>
        ) : (
          grouped.map(([category, entries]) => (
            <View key={category} style={styles.group}>
              <Text style={styles.sectionLabel}>{category.toUpperCase()}</Text>
              {entries.map((e) => (
                <Pressable key={e.id} style={styles.result} onPress={() => go(e.route)}>
                  <View style={styles.resultText}>
                    <Text style={styles.resultTitle}>{e.title}</Text>
                    <Text style={styles.resultSub}>{e.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
                </Pressable>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  input: { flex: 1, fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textPrimary, padding: 0 },
  cancel: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.accent },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { backgroundColor: colors.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  chipText: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textPrimary },
  empty: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary, marginTop: spacing.xl },
  group: { marginBottom: spacing.md },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  resultText: { flex: 1, paddingRight: spacing.md },
  resultTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  resultSub: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
});
