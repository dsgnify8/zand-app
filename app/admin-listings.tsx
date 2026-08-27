// Every listing, in one place.
//
// Built for a hundred rather than for ten: search across name, city and
// category, a filter by country, and a count so you know what you are
// looking at. The row itself carries enough to recognise a business
// without opening it — photo, name, where, and whether anything needs
// attention.
//
// Editing lives on the next screen. This one is for finding.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import { categoryLabel, loadBusinesses, type Business } from '@/lib/businesses';
import { bizImage } from '@/lib/business-photos';

type Row = Business & {
  featured?: boolean;
  has_story?: boolean;
  story_state?: string | null;
  unread?: number;
};

export default function AdminBusinesses() {
  const admin = useIsAdmin();

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [country, setCountry] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = (await loadBusinesses({})) as Row[];

      // What needs attention, in one pass rather than a query per row.
      const [{ data: stories }, { data: msgs }] = await Promise.all([
        supabase.from('founder_stories').select('business_id, state'),
        supabase.from('business_messages')
          .select('business_id')
          .eq('from_admin', false)
          .is('read_at', null),
      ]);

      const byStory: Record<string, string> = {};
      for (const r of (stories ?? []) as any[]) byStory[r.business_id] = r.state;

      const unread: Record<string, number> = {};
      for (const r of (msgs ?? []) as any[]) {
        unread[r.business_id] = (unread[r.business_id] ?? 0) + 1;
      }

      setRows(list.map((b) => ({
        ...b,
        story_state: byStory[b.id] ?? null,
        unread: unread[b.id] ?? 0,
      })));
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);
  // Coming back from an edit should show what changed.
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const countries = useMemo(() => {
    const set = new Set<string>();
    for (const b of rows) if (b.country) set.add(b.country);
    return [...set].sort();
  }, [rows]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((b) => {
      if (country && b.country !== country) return false;
      if (!needle) return true;
      return b.name.toLowerCase().includes(needle)
        || (b.city ?? '').toLowerCase().includes(needle)
        || (b.category ?? '').toLowerCase().includes(needle)
        || (b.country ?? '').toLowerCase().includes(needle);
    });
  }, [rows, q, country]);

  // The ones that want doing something about, first.
  const needsAttention = rows.filter(
    (b) => b.story_state === 'submitted' || (b.unread ?? 0) > 0 || b.status === 'pending',
  ).length;

  if (!admin) {
    return (
      <SafeAreaView style={s.safe}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.topT}>Listings</Text>
        <Text style={s.count}>{rows.length}</Text>
      </View>

      <View style={s.searchWrap}>
        <Ionicons name="search" size={15} color={colors.textSecondary} />
        <TextInput
          style={s.search}
          value={q}
          onChangeText={setQ}
          placeholder="Name, city, category or country"
          placeholderTextColor={colors.textSecondary}
          autoCorrect={false}
        />
        {q ? (
          <Pressable hitSlop={10} onPress={() => setQ('')}>
            <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      {countries.length > 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.chips}
        >
          <Pressable
            style={[s.chip, !country && s.chipOn]}
            onPress={() => setCountry(null)}
          >
            <Text style={[s.chipT, !country && s.chipTOn]}>All</Text>
          </Pressable>
          {countries.map((c) => (
            <Pressable
              key={c}
              style={[s.chip, country === c && s.chipOn]}
              onPress={() => setCountry(country === c ? null : c)}
            >
              <Text style={[s.chipT, country === c && s.chipTOn]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      {needsAttention > 0 && !q && !country ? (
        <Text style={s.attention}>
          {needsAttention} {needsAttention === 1 ? 'listing needs' : 'listings need'} attention
        </Text>
      ) : null}

      {loading ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : (
        <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
          {shown.length === 0 ? (
            <Text style={s.none}>Nothing matches that.</Text>
          ) : shown.map((b) => {
            const shot = (b.photos ?? [])[0];
            const flags: string[] = [];
            if (b.status === 'pending') flags.push('pending');
            if (b.story_state === 'submitted') flags.push('story waiting');
            if (b.story_state === 'held') flags.push('story held');
            if ((b.unread ?? 0) > 0) flags.push(b.unread + ' unread');
            if (b.featured) flags.push('featured');

            return (
              <Pressable
                key={b.id}
                style={s.row}
                onPress={() => router.navigate(('/admin-business?id=' + b.id) as any)}
              >
                <View style={s.thumb}>
                  {shot ? (
                    <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} />
                  ) : (
                    <Ionicons name="storefront-outline" size={16} color={colors.textSecondary} />
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={s.name} numberOfLines={1}>{b.name}</Text>
                  <Text style={s.meta} numberOfLines={1}>
                    {categoryLabel(b.category, false)}
                    {b.city ? '  ·  ' + b.city : ''}
                    {b.country ? ',  ' + b.country : ''}
                  </Text>
                  {flags.length ? (
                    <View style={s.flags}>
                      {flags.map((f) => (
                        <View
                          key={f}
                          style={[
                            s.flag,
                            (f === 'pending' || f.includes('unread') || f === 'story waiting')
                              && s.flagWarm,
                          ]}
                        >
                          <Text
                            style={[
                              s.flagT,
                              (f === 'pending' || f.includes('unread') || f === 'story waiting')
                                && s.flagTWarm,
                            ]}
                          >
                            {f}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>

                <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary, flex: 1, textAlign: 'center' },
  count: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, minWidth: 22, textAlign: 'right' },
  denied: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 10,
    paddingHorizontal: spacing.md, marginHorizontal: spacing.lg,
  },
  search: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary, paddingVertical: 11 },

  chips: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  chip: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: 6,
  },
  chipOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  chipT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  chipTOn: { color: '#FFF' },

  attention: {
    fontFamily: fonts.body, fontSize: 12, color: colors.accent,
    paddingHorizontal: spacing.lg, paddingBottom: spacing.sm,
  },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },
  none: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: spacing.xl },

  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  thumb: {
    width: 46, height: 46, borderRadius: 8, overflow: 'hidden',
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
  },
  name: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary },
  meta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },

  flags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 6 },
  flag: {
    backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  flagWarm: { backgroundColor: 'rgba(178,74,45,0.12)' },
  flagT: { fontFamily: fonts.body, fontSize: 9.5, color: colors.textSecondary },
  flagTWarm: { color: '#B24A2D' },
});
