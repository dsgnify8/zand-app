// What sits at the top of Local.
//
// Up to eight listings, chosen here. The order shown to people is shuffled
// once a day rather than fixed — so being seventh is not a life sentence,
// and someone opening the app on Tuesday sees a different arrangement than
// they did on Monday without anything actually changing.
//
// The shuffle is seeded by the date, which means every device agrees on
// today's order without a job running anywhere.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import { categoryLabel, loadBusinesses, type Business } from '@/lib/businesses';
import { bizImage } from '@/lib/business-photos';

const MAX = 8;

export default function AdminFeatured() {
  const admin = useIsAdmin();

  const [all, setAll] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [picking, setPicking] = useState(false);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setAll(await loadBusinesses({})); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const featured = useMemo(
    () => all
      .filter((b: any) => b.featured)
      .sort((a: any, b: any) => (a.featured_rank ?? 999) - (b.featured_rank ?? 999)),
    [all],
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const pool = all.filter((b: any) => !b.featured);
    if (!needle) return pool.slice(0, 40);
    return pool.filter((b) =>
      b.name.toLowerCase().includes(needle)
      || (b.city ?? '').toLowerCase().includes(needle)
      || (b.category ?? '').toLowerCase().includes(needle)
    ).slice(0, 40);
  }, [all, q]);

  if (!admin) {
    return (
      <SafeAreaView style={s.safe}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  const add = async (b: Business) => {
    if (featured.length >= MAX) {
      Alert.alert('Eight is the limit', 'Remove one before adding another.');
      return;
    }
    setBusy(true);
    const rank = Math.max(0, ...featured.map((f: any) => f.featured_rank ?? 0)) + 1;
    await supabase.from('businesses')
      .update({ featured: true, featured_rank: rank })
      .eq('id', b.id);
    await load();
    setBusy(false);
    setPicking(false);
    setQ('');
  };

  const remove = async (b: Business) => {
    setBusy(true);
    await supabase.from('businesses')
      .update({ featured: false, featured_rank: null })
      .eq('id', b.id);
    await load();
    setBusy(false);
  };

  /* ---------------- the picker ---------------- */

  if (picking) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.top}>
          <Pressable hitSlop={12} onPress={() => { setPicking(false); setQ(''); }}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>
          <Text style={s.topT}>Add a listing</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={s.searchWrap}>
          <Ionicons name="search" size={15} color={colors.textSecondary} />
          <TextInput
            style={s.search}
            value={q}
            onChangeText={setQ}
            placeholder="Name, city or category"
            placeholderTextColor={colors.textSecondary}
            autoFocus
            autoCorrect={false}
          />
          {q ? (
            <Pressable hitSlop={10} onPress={() => setQ('')}>
              <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>

        <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
          {results.length === 0 ? (
            <Text style={s.none}>Nothing matches that.</Text>
          ) : results.map((b) => {
            const shot = (b.photos ?? [])[0];
            return (
              <Pressable key={b.id} style={s.row} onPress={() => add(b)} disabled={busy}>
                <View style={s.thumb}>
                  {shot ? <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} /> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.name} numberOfLines={1}>{b.name}</Text>
                  <Text style={s.meta} numberOfLines={1}>
                    {categoryLabel(b.category, false)}{b.city ? '  ·  ' + b.city : ''}
                  </Text>
                </View>
                <Ionicons name="add-circle-outline" size={20} color={colors.accent} />
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ---------------- the chosen eight ---------------- */

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.topT}>Featured</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : (
        <ScrollView contentContainerStyle={s.body}>
          <Text style={s.lead}>
            Up to eight listings at the top of Local. The order people see is
            shuffled once a day, so no one is permanently last.
          </Text>

          {featured.length === 0 ? (
            <Text style={s.none}>Nothing featured yet.</Text>
          ) : featured.map((b: any, i: number) => {
            const shot = (b.photos ?? [])[0];
            return (
              <View key={b.id} style={s.row}>
                <Text style={s.rank}>{i + 1}</Text>
                <View style={s.thumb}>
                  {shot ? <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} /> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.name} numberOfLines={1}>{b.name}</Text>
                  <Text style={s.meta} numberOfLines={1}>
                    {categoryLabel(b.category, false)}{b.city ? '  ·  ' + b.city : ''}
                  </Text>
                </View>
                <Pressable hitSlop={10} onPress={() => remove(b)} disabled={busy}>
                  <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                </Pressable>
              </View>
            );
          })}

          {featured.length < MAX ? (
            <Pressable style={s.add} onPress={() => setPicking(true)}>
              <Ionicons name="add" size={17} color={colors.accent} />
              <Text style={s.addT}>Add a listing</Text>
            </Pressable>
          ) : (
            <Text style={s.full}>Eight of eight. Remove one to add another.</Text>
          )}
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
  denied: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },
  lead: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary, marginBottom: spacing.lg },
  none: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: spacing.lg },
  full: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: spacing.lg, textAlign: 'center' },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 10,
    paddingHorizontal: spacing.md, marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  search: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary, paddingVertical: 11 },

  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  rank: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.textSecondary, width: 14 },
  thumb: { width: 46, height: 46, borderRadius: 8, overflow: 'hidden', backgroundColor: colors.surface },
  name: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary },
  meta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },

  add: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 12, marginTop: spacing.lg,
  },
  addT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: colors.accent },
});
