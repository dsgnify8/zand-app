// Reviewing one listing.
//
// This is not the owner's edit form with different buttons — it is a
// reviewer's view. Everything they submitted, laid out to be read
// quickly, and one decision at the bottom.
//
// Declining requires a note. A rejection with no reason produces a
// resubmission with the same problem, which wastes everyone's time and
// makes us look arbitrary.

import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Image, Linking, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import { loadBusiness, categoryLabel, decide, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { DAYS, DAY_EN, fmtDay, uses12Hour } from '@/lib/hours';
import { BusinessInsights } from '@/components/business-insights';

import { useLang } from '@/lib/i18n';
const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

export default function AdminReview() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isAdmin = useIsAdmin();

  const [b, setB] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<'review' | 'stats'>('review');

  useEffect(() => {
    (async () => {
      const row = await loadBusiness(String(id));
      setB(row);
      setNote(row?.review_note ?? '');
      setLoading(false);
    })();
  }, [id]);

  if (!isAdmin) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.center}><Text style={s.dim}>Admins only.</Text></View>
      </SafeAreaView>
    );
  }

  if (loading || !b) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      </SafeAreaView>
    );
  }

  const act = async (approve: boolean) => {
    if (!approve && !note.trim()) return;
    setBusy(true);

    // Approving charges the saved card and publishes. Until Stripe is
    // wired the charge is a no-op, so this goes straight to active —
    // when billing lands, a failed charge moves it to payment_failed
    // instead, and the owner is asked to fix the card.
    await decide(b.id, approve, note.trim() || undefined);

    supabase.functions.invoke('send-push', {
      body: {
        userId: b.owner_id,
        title: approve ? 'Your listing is live' : 'About your listing',
        body: approve
          ? `${b.name} is now on Local.`
          : `${b.name} needs a change before it can go up.`,
        category: 'friends',
        data: { businessId: b.id },
      },
    }).catch(() => {});

    setBusy(false);
    router.replace('/my-businesses' as any);
  };

  const waiting = b.status === 'submitted';
  const hours = DAYS.filter((d) => (b.hours_v2 as any)?.[d]?.length);
  const ampm = uses12Hour();

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.head}>
        <Pressable hitSlop={12} onPress={() => router.replace('/my-businesses' as any)}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.headT}>{b.status}</Text>
        <Pressable hitSlop={12} onPress={() => router.navigate(('/local/business-new?id=' + b.id) as any)}>
          <Ionicons name="create-outline" size={19} color={colors.textPrimary} />
        </Pressable>
      </View>

      {b.status === 'active' ? (
        <View style={s.tabs}>
          {(['review', 'stats'] as const).map((t) => (
            <Pressable key={t} style={[s.tab, tab === t && s.tabOn]} onPress={() => setTab(t)}>
              <Text style={[s.tabT, tab === t && s.tabTOn]}>
                {t === 'review' ? 'The listing' : 'How it is doing'}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <ScrollView contentContainerStyle={s.body}>
        {tab === 'stats' && b.status === 'active' ? (
          <BusinessInsights b={b} admin />
        ) : (
          <>
            {b.photos?.length ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
                {b.photos.map((p) => (
                  <Image key={p} source={bizImage(p)} style={s.shot} />
                ))}
              </ScrollView>
            ) : (
              <Text style={s.warn}>No photos.</Text>
            )}

            <Text style={s.name}>{b.name}</Text>
            {b.name_fa ? <Text style={s.nameFa}>{b.name_fa}</Text> : null}
            <Text style={s.meta}>
              {categoryLabel(b.category, false)}
              {b.city ? '  ·  ' + b.city : ''}{b.country ? ', ' + b.country : ''}
            </Text>

            {b.tagline ? <Text style={s.tagline}>{b.tagline}</Text> : null}
            {b.description ? <Text style={s.desc}>{b.description}</Text> : null}
            {b.description_fa ? <Text style={[s.desc, s.descFa]}>{b.description_fa}</Text> : null}

            {/* Their pitch, if they made one. Approving the listing does
                not approve this — it is only here so the person deciding
                has seen it. */}
            {b.has_story ? (
              <View style={s.pitch}>
                <Text style={s.pitchL}>THEY OFFERED A STORY</Text>
                <Text style={s.pitchT}>
                  {b.story_pitch?.trim() || 'Ticked the box but left it blank.'}
                </Text>
              </View>
            ) : null}

            <Fact label="Address" value={b.address || '—'} />
            <Fact label="Coordinates" value={b.lat != null ? `${b.lat.toFixed(4)}, ${b.lng?.toFixed(4)}` : '—'} />
            <Fact label="Timezone" value={b.timezone || '—'} />
            <Fact label="Phone" value={b.phone || '—'} />
            <Fact label="Website" value={b.website || '—'}
              onPress={b.website ? () => Linking.openURL(b.website!.startsWith('http') ? b.website! : 'https://' + b.website) : undefined} />
            {Object.entries(b.socials ?? {}).filter(([, v]) => v).map(([k, v]) => (
              <Fact key={k} label={k} value={v as string} />
            ))}
            {b.keywords?.length ? <Fact label="Keywords" value={b.keywords.join(', ')} /> : null}

            {hours.length ? (
              <>
                <Text style={s.sectionL}>HOURS</Text>
                {hours.map((d) => (
                  <Fact key={d} label={DAY_EN[d]} value={fmtDay((b.hours_v2 as any)[d], ampm)} />
                ))}
              </>
            ) : <Text style={s.warn}>No hours set.</Text>}

            {/* the decision */}
            {waiting || b.status === 'payment_failed' ? (
              <>
                <Text style={s.sectionL}>NOTE TO THE OWNER</Text>
                <Text style={s.noteHint}>
                  Required if you send it back. Say plainly what would fix it — they see this
                  word for word.
                </Text>
                <TextInput
                  style={s.input}
                  value={note}
                  onChangeText={setNote}
                  placeholder="The photos are lovely but we cannot tell what you serve…"
                  placeholderTextColor={colors.textSecondary}
                  multiline
                />

                <View style={s.actions}>
                  <Pressable
                    style={[s.act, s.decline, !note.trim() && { opacity: 0.4 }]}
                    onPress={() => act(false)}
                    disabled={busy || !note.trim()}
                  >
                    <Text style={[s.actT, { color: '#B3261E' }]}>Send back</Text>
                  </Pressable>
                  <Pressable style={[s.act, s.approve]} onPress={() => act(true)} disabled={busy}>
                    {busy
                      ? <ActivityIndicator size="small" color="#FFF" />
                      : <Text style={[s.actT, { color: '#FFF' }]}>Approve and publish</Text>}
                  </Pressable>
                </View>
                <Text style={s.chargeNote}>
                  Approving charges their saved card and puts the listing live.
                </Text>
              </>
            ) : b.status === 'rejected' && b.review_note ? (
              <>
                <Text style={s.sectionL}>SENT BACK WITH</Text>
                <Text style={s.desc}>{b.review_note}</Text>
                <Text style={s.noteHint}>Waiting on them. It returns here when they resubmit.</Text>
              </>
            ) : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Fact({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) {
  const body = (
    <View style={s.factRow}>
      <Text style={s.factL}>{label}</Text>
      <Text style={[s.factV, onPress && { color: colors.accent }]} numberOfLines={2}>{value}</Text>
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{body}</Pressable> : body;
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },

  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.08)' },
  headT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary, textTransform: 'capitalize' },

  tabs: { flexDirection: 'row', gap: 6, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 14, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.04)' },
  tabOn: { backgroundColor: 'rgba(34,30,26,0.9)' },
  tabT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary },
  tabTOn: { color: '#FFF', fontFamily: fonts.bodyStrong },

  body: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  shot: { width: 190, height: 130, borderRadius: 12, marginRight: 8 },
  warn: { fontFamily: fonts.body, fontSize: 12.5, color: '#B3261E', marginTop: spacing.md },

  name: { fontFamily: fonts.bodyStrong, fontSize: 20, letterSpacing: -0.4, color: colors.textPrimary },
  nameFa: { fontFamily: fonts.persian, fontSize: 17, color: colors.textPrimary, marginTop: 2 },
  meta: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 4 },
  tagline: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textPrimary, marginTop: spacing.sm },
  desc: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textPrimary, marginTop: spacing.md },
  descFa: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 28, textAlign: 'right' },

  sectionL: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginTop: spacing.xl, marginBottom: 6 },
  factRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md, paddingVertical: 7, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.05)' },
  factL: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, textTransform: 'capitalize' },
  factV: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textPrimary, maxWidth: '62%', textAlign: 'right' },

  noteHint: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: colors.textSecondary, marginBottom: 8 },
  input: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: radius.md, padding: spacing.md, minHeight: 86, textAlignVertical: 'top' },

  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  act: { flex: 1, paddingVertical: 13, borderRadius: radius.lg, alignItems: 'center' },
  decline: { borderWidth: StyleSheet.hairlineWidth, borderColor: '#B3261E' },
  approve: { flex: 1.4, backgroundColor: colors.accent },
  actT: { fontFamily: fonts.bodyStrong, fontSize: 13 },
  chargeNote: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },
  pitch: {
    backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: 12,
    padding: spacing.md, marginTop: spacing.md,
  },
  pitchL: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.6, color: colors.textSecondary },
  pitchT: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textPrimary, marginTop: 6 },
});
