// Two pages behind one door.
//
// An admin opening this needs a console: everything in the system,
// searchable, grouped by what needs attention. An owner needs a small
// portal: what their listing is doing, and what it needs from them.
//
// Same route, because "your business" is the honest name for both, and
// because an admin also owns listings and should not have to go
// somewhere else to see them.

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { useIsAdmin } from '@/lib/admin';
import { useLang, getLang } from '@/lib/i18n';
import {
  categoryLabel, loadForReview, myBusinesses,
  type Business, type BusinessStatus,
} from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const STATE: Record<BusinessStatus, { label: string; note: string; tone: string }> = {
  draft:     { label: 'Draft',          note: 'Not sent yet. Finish it whenever you like.', tone: 'off' },
  submitted: { label: 'With us',        note: 'We are reading it. Usually a couple of days.', tone: 'wait' },
  rejected:  { label: 'Needs a change', note: 'Have a look at the note, then send it again.', tone: 'act' },
  approved:  { label: 'Approved',       note: 'Start the subscription and it goes live.', tone: 'act' },
  active:    { label: 'Live',           note: 'People can find you in Local.', tone: 'live' },
  lapsed:    { label: 'Paused',         note: 'The subscription stopped, so it came down.', tone: 'off' },
};

const FILTERS = [
  { k: 'submitted', label: 'Waiting' },
  { k: 'rejected', label: 'Sent back' },
  { k: 'active', label: 'Live' },
  { k: 'all', label: 'Everything' },
] as const;

export default function MyBusinesses() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { user, session } = useAuth();
  const isAdmin = useIsAdmin();
  const fa = getLang() === 'fa';

  const [all, setAll] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('submitted');
  const [q, setQ] = useState('');

  const refresh = useCallback(async () => {
    if (isAdmin) setAll(await loadForReview());
    else if (user?.id) setAll(await myBusinesses(user.id));
    setLoading(false);
  }, [isAdmin, user?.id]);

  useEffect(() => { refresh(); }, [refresh]);

  const shown = useMemo(() => {
    let rows = all;
    if (isAdmin && filter !== 'all') rows = rows.filter((b) => b.status === filter);
    const t = q.trim().toLowerCase();
    if (t) {
      rows = rows.filter((b) =>
        (b.name + ' ' + (b.city ?? '') + ' ' + (b.category ?? '')).toLowerCase().includes(t));
    }
    return rows;
  }, [all, filter, q, isAdmin]);

  if (!session) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <Head onBack={() => router.back()} title="Your business" />
        <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
          <Pitch onStart={() => router.navigate('/onboarding?step=2&next=/my-businesses' as any)} cta="Sign in to start" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ---------------- admin console ---------------- */

  if (isAdmin) {
    const count = (k: string) => (k === 'all' ? all.length : all.filter((b) => b.status === k).length);

    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <Head onBack={() => router.back()} title={'Listings  ·  ' + all.length} />

        <View style={s.searchWrap}>
          <View style={s.search}>
            <Ionicons name="search" size={14} color={colors.textSecondary} />
            <TextInput
              style={s.searchIn}
              value={q}
              onChangeText={setQ}
              placeholder="Name, city or category"
              placeholderTextColor={colors.textSecondary}
              autoCorrect={false}
            />
            {q ? (
              <Pressable hitSlop={8} onPress={() => setQ('')}>
                <Ionicons name="close-circle" size={15} color={colors.textSecondary} />
              </Pressable>
            ) : null}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={s.filters}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 6 }}
        >
          {FILTERS.map((f) => {
            const on = filter === f.k;
            const n = count(f.k);
            return (
              <Pressable key={f.k} style={[s.filter, on && s.filterOn]} onPress={() => setFilter(f.k)}>
                <Text style={[s.filterT, on && s.filterTOn]}>{f.label}{n ? ' ' + n : ''}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView contentContainerStyle={s.body}>
          {loading ? (
            <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
          ) : shown.length === 0 ? (
            <Text style={s.dim}>Nothing here.</Text>
          ) : shown.map((b) => (
            <Pressable
              key={b.id}
              style={s.adminRow}
              onPress={() => router.navigate(('/admin-review?id=' + b.id) as any)}
            >
              {b.photos?.[0] ? (
                <Image source={bizImage(b.photos[0])} style={s.adminShot} />
              ) : (
                <View style={[s.adminShot, s.shotEmpty]}>
                  <Ionicons name="image-outline" size={15} color={colors.textSecondary} />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={s.adminName} numberOfLines={1}>{b.name}</Text>
                <Text style={s.adminMeta} numberOfLines={1}>
                  {categoryLabel(b.category, false)}{b.city ? '  ·  ' + b.city : ''}
                </Text>
              </View>
              <View style={[s.pill, (s as any)['pill_' + STATE[b.status].tone]]}>
                <Text style={[s.pillT, (s as any)['pillT_' + STATE[b.status].tone]]}>
                  {STATE[b.status].label}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ---------------- owner portal ---------------- */

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <Head onBack={() => router.back()} title="Your business" />

      <ScrollView contentContainerStyle={all.length === 0 ? undefined : s.body}>
        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
        ) : all.length === 0 ? (
          <Pitch onStart={() => router.navigate('/local/business-new' as any)} cta="List a business" />
        ) : (
          <>
            {all.map((b) => {
              const st = STATE[b.status];
              return (
                <View key={b.id} style={s.card}>
                  <Pressable
                    style={s.cardTop}
                    onPress={() => router.navigate(('/local/business-new?id=' + b.id) as any)}
                  >
                    {b.photos?.[0] ? (
                      <Image source={bizImage(b.photos[0])} style={s.shot} />
                    ) : (
                      <View style={[s.shot, s.shotEmpty]}>
                        <Ionicons name="image-outline" size={16} color={colors.textSecondary} />
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={s.name} numberOfLines={1}>{b.name || 'Untitled'}</Text>
                      <Text style={s.meta} numberOfLines={1}>
                        {categoryLabel(b.category, fa)}{b.city ? '  ·  ' + b.city : ''}
                      </Text>
                      <View style={[s.pill, (s as any)['pill_' + st.tone]]}>
                        <Text style={[s.pillT, (s as any)['pillT_' + st.tone]]}>{st.label}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
                  </Pressable>

                  <Text style={s.note}>{st.note}</Text>

                  {b.status === 'rejected' && b.review_note ? (
                    <View style={s.reviewNote}>
                      <Text style={s.reviewNoteL}>WHAT WE ASKED FOR</Text>
                      <Text style={s.reviewNoteT}>{b.review_note}</Text>
                      <Pressable onPress={() => router.navigate(('/local/business-new?id=' + b.id) as any)}>
                        <Text style={s.reviewNoteCta}>Make the change and send it again</Text>
                      </Pressable>
                    </View>
                  ) : null}

                  {b.status === 'approved' ? (
                    <Pressable style={s.pay} onPress={() => router.navigate(('/business-billing?id=' + b.id) as any)}>
                      <Text style={s.payT}>Start subscription</Text>
                    </Pressable>
                  ) : null}

                  {b.status === 'active' ? (
                    <View style={s.liveRow}>
                      <Pressable onPress={() => router.navigate(('/local/business?id=' + b.id) as any)}>
                        <Text style={s.liveLink}>View listing</Text>
                      </Pressable>
                      <Pressable onPress={() => router.navigate(('/local/business-new?id=' + b.id) as any)}>
                        <Text style={s.liveLink}>Edit or see how it is doing</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              );
            })}

            <Pressable style={s.newBtn} onPress={() => router.navigate('/local/business-new' as any)}>
              <Ionicons name="add" size={16} color="#FFF" />
              <Text style={s.newBtnT}>Add another</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Pitch({ onStart, cta }: { onStart: () => void; cta: string }) {
  return (
    <View style={s.pitch}>
      <View style={s.pitchIcon}>
        <Ionicons name="storefront-outline" size={22} color={colors.accent} />
      </View>
      <Text style={s.pitchT}>Put your business where Persians are already looking.</Text>
      <Text style={s.pitchX}>
        Local is Iranian-owned businesses, anywhere in the world. People come to it looking for
        what you do — a grocer who stocks the right things, a garage they can speak Persian in,
        a salon that knows the hair.
      </Text>

      {[
        { i: 'map-outline', t: 'On the map and in the feed', x: 'Found by people nearby, and by anyone searching your city.' },
        { i: 'call-outline', t: 'One tap to reach you', x: 'Call, WhatsApp, website, directions.' },
        { i: 'stats-chart-outline', t: 'See what it is doing', x: 'How many people opened your listing, and what they did next.' },
      ].map((r) => (
        <View key={r.t} style={s.pitchRow}>
          <View style={s.pitchRowIcon}>
            <Ionicons name={r.i as any} size={15} color={colors.textPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.pitchRowT}>{r.t}</Text>
            <Text style={s.pitchRowX}>{r.x}</Text>
          </View>
        </View>
      ))}

      <Pressable style={s.pitchCta} onPress={onStart}>
        <Text style={s.pitchCtaT}>{cta}</Text>
      </Pressable>
      <Text style={s.pitchFoot}>
        We read every listing before it goes up. Nothing to pay until it is approved.
      </Text>
    </View>
  );
}

function Head({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <View style={s.head}>
      <Pressable hitSlop={12} onPress={onBack}>
        <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
      </Pressable>
      <Text style={s.headT}>{title}</Text>
      <View style={{ width: 22 }} />
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.08)' },
  headT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  body: { padding: spacing.lg, paddingBottom: spacing.xxl },
  dim: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },

  searchWrap: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 9 },
  searchIn: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, padding: 0 },

  filters: { flexGrow: 0, paddingVertical: spacing.sm, minHeight: 46 },
  filter: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.04)', justifyContent: 'center' },
  filterOn: { backgroundColor: 'rgba(34,30,26,0.9)' },
  filterT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, includeFontPadding: false },
  filterTOn: { color: '#FFF' },

  adminRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.06)' },
  adminShot: { width: 44, height: 44, borderRadius: 10 },
  adminName: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: colors.textPrimary },
  adminMeta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },

  card: { borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.1)', borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  shot: { width: 60, height: 60, borderRadius: 12 },
  shotEmpty: { backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary },
  meta: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  pill: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9, marginTop: 6, backgroundColor: 'rgba(0,0,0,0.05)' },
  pill_wait: { backgroundColor: 'rgba(201,162,39,0.14)' },
  pill_act: { backgroundColor: 'rgba(179,38,30,0.10)' },
  pill_live: { backgroundColor: 'rgba(123,160,91,0.16)' },
  pill_off: { backgroundColor: 'rgba(0,0,0,0.05)' },
  pillT: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 0.4, color: colors.textSecondary },
  pillT_wait: { color: '#8A6D1F' },
  pillT_act: { color: '#B3261E' },
  pillT_live: { color: '#4F6B39' },
  pillT_off: { color: colors.textSecondary },

  note: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: colors.textSecondary, marginTop: spacing.sm },
  reviewNote: { backgroundColor: 'rgba(179,38,30,0.06)', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.sm },
  reviewNoteL: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.2, color: '#B3261E', marginBottom: 5 },
  reviewNoteT: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textPrimary },
  reviewNoteCta: { fontFamily: fonts.bodyStrong, fontSize: 12, color: '#B3261E', marginTop: spacing.sm },

  pay: { backgroundColor: colors.accent, borderRadius: radius.md, paddingVertical: 11, alignItems: 'center', marginTop: spacing.md },
  payT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: '#FFF' },

  liveRow: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.sm, flexWrap: 'wrap' },
  liveLink: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.accent },

  newBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.textPrimary, borderRadius: radius.lg, paddingVertical: 13, marginTop: spacing.sm },
  newBtnT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: '#FFF' },

  pitch: { padding: spacing.lg },
  pitchIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(201,162,39,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  pitchT: { fontFamily: fonts.body, fontSize: 21, lineHeight: 28, letterSpacing: -0.5, color: colors.textPrimary },
  pitchX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.sm, marginBottom: spacing.xl },

  pitchRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start', marginBottom: spacing.lg },
  pitchRowIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  pitchRowT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: colors.textPrimary },
  pitchRowX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary, marginTop: 2 },

  pitchCta: { backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: 14, alignItems: 'center', marginTop: spacing.sm },
  pitchCtaT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: '#FFF' },
  pitchFoot: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md, opacity: 0.85 },
});
