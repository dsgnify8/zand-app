import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { ARTICLES } from '@/constants/articles';
import { useIsAdmin, useHidden, hideArticle, unhideArticle, isHidden } from '@/lib/admin';
import { supabase } from '@/lib/supabase';

export default function AdminScreen() {
  const isAdmin = useIsAdmin();
  useHidden();
  const [tab, setTab] = useState<'articles' | 'analytics'>('articles');
  const [signups, setSignups] = useState<number | null>(null);
  const [topReads, setTopReads] = useState<{ item_key: string; n: number }[]>([]);
  const [totalReads, setTotalReads] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin || tab !== 'analytics') return;
    (async () => {
      // total events + top read items
      const { data: events } = await supabase.from('events').select('item_key');
      if (events) {
        setTotalReads(events.length);
        const counts: Record<string, number> = {};
        for (const e of events as any[]) counts[e.item_key] = (counts[e.item_key] ?? 0) + 1;
        setTopReads(Object.entries(counts).map(([item_key, n]) => ({ item_key, n })).sort((a, b) => b.n - a.n).slice(0, 10));
      }
      // signups: count profiles via auth admin is not available client-side; approximate by distinct users in events
      const { data: users } = await supabase.from('events').select('user_id');
      if (users) setSignups(new Set((users as any[]).map((u) => u.user_id)).size);
    })();
  }, [isAdmin, tab]);

  if (!isAdmin) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.center}><Text style={s.dim}>Admins only.</Text></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.head}>
        <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}><Ionicons name="chevron-back" size={24} color={colors.textPrimary} /></Pressable>
        <Text style={s.title}>Admin</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={s.tabs}>
        {(['articles', 'analytics'] as const).map((t) => (
          <Pressable key={t} style={[s.tab, tab === t && s.tabOn]} onPress={() => setTab(t)}>
            <Text style={[s.tabT, tab === t && s.tabTOn]}>{t === 'articles' ? 'Articles' : 'Analytics'}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }} showsVerticalScrollIndicator={false}>
        {tab === 'articles' ? (
          <View style={{ gap: spacing.sm }}>
            <Text style={s.hint}>Hide an article to remove it from the app for everyone. Unhide to bring it back.</Text>
            {ARTICLES.map((a) => {
              const hidden = isHidden(a.key);
              return (
                <View key={a.key} style={[s.row, hidden && s.rowHidden]}>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.rowT, hidden && s.rowTHidden]} numberOfLines={1}>{a.title}</Text>
                    <Text style={s.rowS}>{a.tag}  ·  {hidden ? 'HIDDEN' : 'live'}</Text>
                  </View>
                  <Pressable style={[s.btn, hidden ? s.btnUnhide : s.btnHide]} onPress={() => {
                    if (hidden) {
                      Alert.alert('Bring it back?', 'This article will return to the app for everyone.', [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Unhide', onPress: () => unhideArticle(a.key) },
                      ]);
                    } else {
                      Alert.alert('Remove from app?', 'This archives the article and removes it from everyone\u2019s app, including their saves and favourites. You can bring it back any time.', [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Remove', style: 'destructive', onPress: () => hideArticle(a.key) },
                      ]);
                    }
                  }}>
                    <Text style={[s.btnT, { color: hidden ? colors.accent : '#C4433F' }]}>{hidden ? 'Unhide' : 'Remove'}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={{ gap: spacing.lg }}>
            <View style={s.statRow}>
              <View style={s.statCard}><Text style={s.statN}>{signups ?? '—'}</Text><Text style={s.statL}>ACTIVE READERS</Text></View>
              <View style={s.statCard}><Text style={s.statN}>{totalReads ?? '—'}</Text><Text style={s.statL}>TOTAL READS</Text></View>
            </View>
            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-content' as any)}>
              <Ionicons name="create-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Edit content</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-content' as any)}>
              <Ionicons name="create-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Edit content</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Text style={s.sectionL}>MOST READ</Text>
            {topReads.length === 0 ? (
              <Text style={s.dim}>No reads logged yet.</Text>
            ) : topReads.map((r, i) => {
              const art = ARTICLES.find((a) => a.key === r.item_key);
              return (
                <View key={r.item_key} style={s.analyRow}>
                  <Text style={s.analyRank}>{i + 1}</Text>
                  <Text style={s.analyT} numberOfLines={1}>{art?.title ?? r.item_key}</Text>
                  <Text style={s.analyN}>{r.n}</Text>
                </View>
              );
            })}
            <Text style={s.hint}>Signup totals are also in your Supabase dashboard under Authentication.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  editRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 14, borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.08)', marginBottom: 18 },
  editRowT: { flex: 1, fontFamily: fonts.bodyStrong, fontSize: 13.5, color: colors.textPrimary },
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary },
  tabs: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  tab: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  tabOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  tabT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textSecondary },
  tabTOn: { color: '#FFF' },
  hint: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: colors.textSecondary, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  rowHidden: { opacity: 0.6 },
  rowT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  rowTHidden: { textDecorationLine: 'line-through' },
  rowS: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  btn: { paddingVertical: 7, paddingHorizontal: spacing.md, borderRadius: 16, borderWidth: 1 },
  btnHide: { borderColor: '#C4433F' },
  btnUnhide: { borderColor: colors.accent },
  btnT: { fontFamily: fonts.bodyStrong, fontSize: 12 },
  statRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, alignItems: 'center' },
  statN: { fontFamily: fonts.heading, fontSize: 32, color: colors.textPrimary },
  statL: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: colors.textSecondary, marginTop: 4 },
  sectionL: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: colors.textSecondary },
  analyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  analyRank: { fontFamily: fonts.heading, fontSize: 16, color: colors.accent, width: 22 },
  analyT: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },
  analyN: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textSecondary },
});
