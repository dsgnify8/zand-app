// What the app is doing, in four questions.
//
// Sections rather than a wall. Each one shows a number, and opens to the
// list behind it — so the screen answers "how are we doing" at a glance
// and "who exactly" only when asked.
//
// Everything here is read from what the app already records. Nothing is
// estimated, and where a number cannot be known honestly it says so.

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, LayoutAnimation, Platform, Pressable,
  ScrollView, StyleSheet, Text, UIManager, View,
} from 'react-native';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { supabase } from '@/lib/supabase';
import { TPM_POSTS } from '@/constants/tpm-content';
import { TOPICS } from '@/constants/education';
import { AUTHORS } from '@/constants/literature';
import { CULTURE_TOPICS } from '@/constants/culture';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Signup = { id: string; name: string | null; email: string | null; created_at: string };
type Count = { key: string; label: string; n: number };

export function AnalyticsBoard() {
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [signups, setSignups] = useState<Signup[]>([]);
  const [listings, setListings] = useState<{ status: string; featured: boolean }[]>([]);
  const [events, setEvents] = useState<{ kind: string; item_key: string }[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: p }, { data: b }, { data: e }] = await Promise.all([
      supabase.from('profiles').select('id, name, email, created_at')
        .order('created_at', { ascending: false }),
      supabase.from('businesses').select('status, featured'),
      supabase.from('events').select('kind, item_key'),
    ]);
    setSignups((p ?? []) as Signup[]);
    setListings((b ?? []) as any[]);
    setEvents((e ?? []) as any[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = (k: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === k ? null : k);
  };

  /* ---- what the events mean ---- */

  const tally = (kind: string, name: (key: string) => string): Count[] => {
    const counts: Record<string, number> = {};
    for (const e of events) {
      if (e.kind !== kind || !e.item_key) continue;
      counts[e.item_key] = (counts[e.item_key] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([key, n]) => ({ key, label: name(key), n }))
      .sort((a, b) => b.n - a.n);
  };

  const tpmReads = useMemo(
    () => tally('tpm', (k) => TPM_POSTS.find((p) => p.key === k)?.title ?? k),
    [events],
  );

  const exploreReads = useMemo(() => [
    ...tally('topic', (k) => (TOPICS.find((x: any) => x.key === k)?.name ?? k) + '  ·  history'),
    ...tally('poet', (k) => (AUTHORS.find((x: any) => x.key === k)?.name ?? k) + '  ·  poetry'),
    ...tally('culture', (k) => ((CULTURE_TOPICS.find((x: any) => x.key === k) as any)?.title ?? k) + '  ·  culture'),
  ].sort((a, b) => b.n - a.n), [events]);

  const live = listings.filter((b) => b.status === 'active').length;
  const pending = listings.filter((b) => b.status === 'pending').length;
  const featured = listings.filter((b) => b.featured).length;

  if (loading) {
    return <ActivityIndicator style={{ marginVertical: spacing.xl }} color={colors.accent} />;
  }

  return (
    <View style={s.wrap}>
      {/* ---- signups ---- */}
      <Section
        k="signups"
        label="Signups"
        n={signups.length}
        open={open === 'signups'}
        onPress={() => toggle('signups')}
      >
        {signups.length === 0 ? (
          <Text style={s.none}>Nobody yet.</Text>
        ) : signups.slice(0, 100).map((u) => (
          <View key={u.id} style={s.row}>
            <View style={{ flex: 1 }}>
              <Text style={s.rowT}>{u.name || '—'}</Text>
              <Text style={s.rowX} numberOfLines={1}>{u.email || 'no email'}</Text>
            </View>
            <Text style={s.rowN}>{u.created_at?.slice(0, 10)}</Text>
          </View>
        ))}
      </Section>

      {/* ---- listings ---- */}
      <Section
        k="listings"
        label="Listings"
        n={live}
        open={open === 'listings'}
        onPress={() => toggle('listings')}
      >
        <View style={s.row}>
          <Text style={[s.rowT, { flex: 1 }]}>Live</Text>
          <Text style={s.rowN}>{live}</Text>
        </View>
        <View style={s.row}>
          <Text style={[s.rowT, { flex: 1 }]}>Waiting for review</Text>
          <Text style={s.rowN}>{pending}</Text>
        </View>
        <View style={s.row}>
          <Text style={[s.rowT, { flex: 1 }]}>Featured</Text>
          <Text style={s.rowN}>{featured}</Text>
        </View>
        <View style={s.row}>
          <Text style={[s.rowT, { flex: 1 }]}>Everything</Text>
          <Text style={s.rowN}>{listings.length}</Text>
        </View>
      </Section>

      {/* ---- tpm ---- */}
      <Section
        k="tpm"
        label="TPM reads"
        n={tpmReads.reduce((t, r) => t + r.n, 0)}
        open={open === 'tpm'}
        onPress={() => toggle('tpm')}
      >
        {tpmReads.length === 0 ? (
          <Text style={s.none}>Nothing opened yet.</Text>
        ) : tpmReads.map((r) => (
          <View key={r.key} style={s.row}>
            <Text style={[s.rowT, { flex: 1 }]} numberOfLines={2}>{r.label}</Text>
            <Text style={s.rowN}>{r.n}</Text>
          </View>
        ))}
      </Section>

      {/* ---- explore ---- */}
      <Section
        k="explore"
        label="Explore reads"
        n={exploreReads.reduce((t, r) => t + r.n, 0)}
        open={open === 'explore'}
        onPress={() => toggle('explore')}
      >
        {exploreReads.length === 0 ? (
          <Text style={s.none}>Nothing opened yet.</Text>
        ) : exploreReads.map((r) => (
          <View key={r.key + r.label} style={s.row}>
            <Text style={[s.rowT, { flex: 1 }]} numberOfLines={2}>{r.label}</Text>
            <Text style={s.rowN}>{r.n}</Text>
          </View>
        ))}
      </Section>
    </View>
  );
}

function Section({
  label, n, open, onPress, children,
}: {
  k: string; label: string; n: number; open: boolean; onPress: () => void; children: any;
}) {
  return (
    <View style={s.section}>
      <Pressable style={s.head} onPress={onPress}>
        <Text style={s.headT}>{label}</Text>
        <Text style={s.headN}>{n}</Text>
        <Text style={[s.chev, open && s.chevOpen]}>›</Text>
      </Pressable>
      {open ? <View style={s.list}>{children}</View> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { gap: spacing.sm },
  section: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 12, overflow: 'hidden', backgroundColor: colors.surface,
  },
  head: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  headT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary, flex: 1 },
  headN: { fontFamily: fonts.heading, fontSize: 19, color: colors.accent },
  chev: { fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary, transform: [{ rotate: '90deg' }] },
  chevOpen: { transform: [{ rotate: '270deg' }] },

  list: {
    paddingHorizontal: spacing.md, paddingBottom: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: 9,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  rowT: { fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },
  rowX: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 1 },
  rowN: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textSecondary },
  none: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, paddingVertical: spacing.md },
});
