// Who is paying, and for what.
//
// The screen exists for one situation: somebody is still being charged
// for a listing that is no longer in the directory. Apple will not let
// us cancel a subscription on anybody's behalf, so the only honest
// thing we can do is notice, and tell them.

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import { supabase } from '@/lib/supabase';

type Row = {
  original_transaction_id: string;
  user_id: string;
  business_id: string | null;
  state: string;
  expires_at: string | null;
  business_name: string | null;
  business_status: string | null;
};

export default function AdminBilling() {
  const admin = useIsAdmin();
  const [rows, setRows] = useState<Row[]>([]);
  const [paying, setPaying] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [sent, setSent] = useState<string[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: stranded }, { count }] = await Promise.all([
      supabase.from('paying_without_listing').select('*'),
      supabase.from('subscriptions')
        .select('original_transaction_id', { count: 'exact', head: true })
        .in('state', ['trialing', 'active', 'grace']),
    ]);
    setRows((stranded ?? []) as Row[]);
    setPaying(count ?? 0);
    setLoading(false);
  }, []);

  useEffect(() => { if (admin) load(); }, [admin, load]);

  // The nudge. Written to be useful rather than apologetic: they are
  // paying for something they are not getting, and the one thing that
  // fixes it is two taps in Settings.
  const nudge = async (r: Row) => {
    setSent((v) => [...v, r.original_transaction_id]);
    const name = r.business_name ?? 'your listing';
    await supabase.functions.invoke('send-push', {
      body: {
        userId: r.user_id,
        title: 'You are still paying for ' + name,
        body: 'It is not in the directory any more, so the subscription is doing nothing. Cancel it in Settings, Apple ID, Subscriptions. We are sorry for the trouble.',
        category: 'account',
        data: { kind: 'cancel-nudge' },
      },
    }).catch(() => {});
  };

  // Every other admin screen gates on this and this one did not, which
  // meant a deep link to /admin-billing showed anybody other people's
  // subscriptions and let them send a push to any account.
  if (!admin) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.head}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.headT}>Subscriptions</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : (
        <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
          <View style={s.tile}>
            <Text style={s.tileN}>{paying}</Text>
            <Text style={s.tileK}>paying now</Text>
          </View>

          <Text style={s.sectionL}>PAYING WITH NOTHING UP</Text>
          <Text style={s.sectionX}>
            A subscription that is still running while the listing is not in
            the directory. Apple will not let anyone but them cancel it, so
            the nudge is all we can do.
          </Text>

          {rows.length === 0 ? (
            <Text style={s.empty}>Nobody. Everyone paying has a listing up.</Text>
          ) : rows.map((r) => (
            <View key={r.original_transaction_id} style={s.row}>
              <View style={{ flex: 1 }}>
                <Text style={s.rowT}>{r.business_name ?? 'A deleted listing'}</Text>
                <Text style={s.rowX}>
                  {r.state}
                  {r.business_status ? '  ·  listing ' + r.business_status : '  ·  listing gone'}
                  {r.expires_at ? '  ·  renews ' + new Date(r.expires_at).toLocaleDateString() : ''}
                </Text>
              </View>
              <Pressable
                style={[s.nudge, sent.includes(r.original_transaction_id) && s.nudgeOff]}
                disabled={sent.includes(r.original_transaction_id)}
                onPress={() => nudge(r)}
              >
                <Text style={s.nudgeT}>
                  {sent.includes(r.original_transaction_id) ? 'Sent' : 'Nudge'}
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  denied: {
    fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary,
    textAlign: 'center', marginTop: spacing.xxl,
  },
  head: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  headT: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  tile: {
    backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1,
    borderColor: 'rgba(40,28,24,0.10)', padding: spacing.lg, alignItems: 'center',
  },
  tileN: { fontFamily: fonts.heading, fontSize: 34, color: colors.textPrimary },
  tileK: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  sectionL: {
    fontFamily: fonts.bodyStrong, fontSize: 10.5, letterSpacing: 1.6,
    color: colors.textSecondary, marginTop: spacing.xl,
  },
  sectionX: {
    fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19,
    color: colors.textSecondary, marginTop: 6, marginBottom: spacing.md,
  },
  empty: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, paddingVertical: spacing.md },

  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1,
    borderColor: 'rgba(40,28,24,0.10)', padding: spacing.md, marginBottom: spacing.sm,
  },
  rowT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  rowX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },
  nudge: {
    backgroundColor: 'rgba(140,58,46,0.10)', borderRadius: 14,
    paddingHorizontal: spacing.md, paddingVertical: 7,
  },
  nudgeOff: { opacity: 0.45 },
  nudgeT: { fontFamily: fonts.body, fontSize: 12, color: colors.accent },
});
