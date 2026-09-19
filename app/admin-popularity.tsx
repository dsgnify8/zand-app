// What people are actually keeping.
//
// The analytics board counts opens, which tells you what gets tapped.
// This counts what gets liked and saved, which is a different and more
// interesting question: a thing someone opens once is a thing that
// looked interesting, and a thing someone saves is a thing they meant to
// come back to.
//
// Reads content_popularity, a view over every user's synced liked and
// saved lists. Keys resolve through the same function the profile rails
// use, so a row shows a title rather than `topic-cyrus-the-great`.

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { supabase } from '@/lib/supabase';
import { resolveSavedKey } from '@/lib/resolve-saved';
import { useIsAdmin } from '@/lib/admin';

type Row = { key: string; likes: number; saves: number };

// The kinds, in the order they are worth reading. Topics first because
// they are the bulk of the app; businesses last because a saved listing
// means something different from a saved poem.
const GROUPS: { id: string; label: string; match: (k: string) => boolean }[] = [
  { id: 'topic',   label: 'History',   match: (k) => k.startsWith('topic-') },
  { id: 'poet',    label: 'Poets',     match: (k) => k.startsWith('poet-') },
  { id: 'culture', label: 'Culture',   match: (k) => k.startsWith('culture-') },
  { id: 'tpm',     label: 'TPM',       match: (k) => k.startsWith('tpm:') },
  { id: 'section', label: 'Sections',  match: (k) => k.startsWith('section-') },
  { id: 'other',   label: 'Everything else', match: () => true },
];

export default function AdminPopularity() {
  const admin = useIsAdmin();
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(true);

  const load = useCallback(async () => {
    setBusy(true);
    const { data } = await supabase
      .from('content_popularity')
      .select('key, likes, saves')
      .limit(300);
    setRows((data as Row[]) ?? []);
    setBusy(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (!admin) {
    return (
      <SafeAreaView style={s.safe}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  // Each row to its group, first match wins, so `other` catches the rest.
  const grouped = GROUPS.map((g) => ({
    ...g,
    items: rows.filter((r) =>
      GROUPS.find((x) => x.match(r.key))?.id === g.id),
  })).filter((g) => g.items.length > 0);

  const totalLikes = rows.reduce((n, r) => n + (r.likes ?? 0), 0);
  const totalSaves = rows.reduce((n, r) => n + (r.saves ?? 0), 0);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.head}>
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.title}>What people keep</Text>
        <Pressable hitSlop={10} onPress={load}>
          <Ionicons name="refresh" size={19} color={colors.textSecondary} />
        </Pressable>
      </View>

      {busy ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : (
        <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
          <View style={s.totals}>
            <View style={s.total}>
              <Text style={s.totalN}>{totalLikes}</Text>
              <Text style={s.totalL}>liked</Text>
            </View>
            <View style={s.total}>
              <Text style={s.totalN}>{totalSaves}</Text>
              <Text style={s.totalL}>saved</Text>
            </View>
            <View style={s.total}>
              <Text style={s.totalN}>{rows.length}</Text>
              <Text style={s.totalL}>things</Text>
            </View>
          </View>

          {grouped.map((g) => (
            <View key={g.id} style={s.group}>
              <Text style={s.groupT}>{g.label}</Text>
              {g.items.map((r) => {
                // A key that no longer resolves is content that was
                // renamed or removed while someone still had it saved.
                // Worth showing rather than hiding: it is a loose end.
                const card = resolveSavedKey(r.key);
                return (
                  <Pressable
                    key={r.key}
                    style={s.row}
                    disabled={!card}
                    onPress={() => card && router.navigate(card.route as any)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[s.rowT, !card && s.rowGone]} numberOfLines={1}>
                        {card ? card.title : r.key}
                      </Text>
                      {!card ? <Text style={s.rowX}>no longer resolves</Text> : null}
                    </View>
                    <View style={s.counts}>
                      {r.likes > 0 ? (
                        <View style={s.count}>
                          <Ionicons name="heart" size={12} color="#A33A2E" />
                          <Text style={s.countN}>{r.likes}</Text>
                        </View>
                      ) : null}
                      {r.saves > 0 ? (
                        <View style={s.count}>
                          <Ionicons name="bookmark" size={12} color={colors.accent} />
                          <Text style={s.countN}>{r.saves}</Text>
                        </View>
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}

          {rows.length === 0 ? (
            <Text style={s.empty}>
              Nothing kept yet. This fills as people like and save things.
            </Text>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  denied: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  head: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  title: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  totals: {
    flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl,
  },
  total: {
    flex: 1, alignItems: 'center', paddingVertical: spacing.md,
    borderRadius: 12, backgroundColor: 'rgba(65,114,112,0.07)',
  },
  totalN: { fontFamily: fonts.heading, fontSize: 22, color: colors.textPrimary },
  totalL: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },

  group: { marginBottom: spacing.xl },
  groupT: {
    fontFamily: fonts.bodyStrong, fontSize: 10.5, letterSpacing: 1.6,
    textTransform: 'uppercase', color: colors.textSecondary,
    marginBottom: spacing.sm,
  },

  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  rowT: { fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary },
  rowGone: { color: colors.textSecondary, fontStyle: 'italic' },
  rowX: { fontFamily: fonts.body, fontSize: 10.5, color: colors.textSecondary, marginTop: 1 },

  counts: { flexDirection: 'row', gap: spacing.md },
  count: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  countN: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary },

  empty: {
    fontFamily: fonts.body, fontSize: 13, lineHeight: 20,
    color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
});
