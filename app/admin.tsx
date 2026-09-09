import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useIsAdmin, useHidden, hideArticle, unhideArticle, isHidden } from '@/lib/admin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { forgetMend } from '@/lib/streak-mend';
import { refreshStreakFromDays } from '@/lib/stats-store';
import { AnalyticsBoard } from '@/components/analytics-board';
import { supabase } from '@/lib/supabase';

import { useLang } from '@/lib/i18n';
export default function AdminScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const isAdmin = useIsAdmin();
  useHidden();


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

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: spacing.lg }}>
            {/* Trims the visit log to the current unbroken run and
                recounts. For undoing a mend that joined runs it should
                not have — this device only. */}
            <Pressable style={s.editRow} onPress={async () => {
              const raw = await AsyncStorage.getItem('visit:days');
              const days: string[] = raw ? JSON.parse(raw) : [];
              const sorted = Array.from(new Set(days)).sort();
              const run: string[] = [];
              for (let i = sorted.length - 1; i >= 0; i--) {
                if (!run.length) { run.unshift(sorted[i]); continue; }
                const gap = (new Date(run[0]).getTime() - new Date(sorted[i]).getTime()) / 86400000;
                if (gap !== 1) break;
                run.unshift(sorted[i]);
              }
              await AsyncStorage.setItem('visit:days', JSON.stringify(run));
              await forgetMend();
              refreshStreakFromDays(run);
            }}>
              <Ionicons name="refresh-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Trim streak to current run</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-listings' as any)}>
              <Ionicons name="storefront-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Business listings</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            {/* Pending submissions, waiting on a yes or a no. Separate
                from the listings table: one is a queue you work through,
                the other is everything that already exists. */}
            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-businesses' as any)}>
              <Ionicons name="checkmark-circle-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Review queue</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-featured' as any)}>
              <Ionicons name="star-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Featured listings</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-images' as any)}>
              <Ionicons name="image-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Images</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-cities' as any)}>
              <Ionicons name="business-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>City covers</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-stories' as any)}>
              <Ionicons name="book-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Founder stories</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-content' as any)}>
              <Ionicons name="create-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Edit content</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>

            {/* Four questions, each answered by a number and opening to
                the list behind it. The old block put every read on the
                screen at once, most of them from a page that no longer
                exists. */}
            <AnalyticsBoard />
          </View>
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
