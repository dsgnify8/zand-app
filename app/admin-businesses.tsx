// Reviewing listings.
//
// Submissions arrive here. An admin reads one, sees everything the
// public would see, and either approves it or sends it back with a
// reason. Rejection without a reason is useless to the person who wrote
// it, so the note is required when declining.
//
// Approval does not publish. It moves the listing to 'approved', which
// unlocks payment; it goes live only once the subscription is active.
// Keeping those two gates separate means an unpaid listing can never
// appear, whatever happens to a webhook.

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Image, Linking, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import { loadForReview, decide, categoryLabel, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

// A listing photo is either a storage path or a bundled demo image.
const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const FILTERS = [
  { k: 'submitted', label: 'Waiting' },
  { k: 'approved', label: 'Approved' },
  { k: 'active', label: 'Live' },
  { k: 'rejected', label: 'Declined' },
  { k: 'lapsed', label: 'Lapsed' },
] as const;

export default function AdminBusinesses() {
  const isAdmin = useIsAdmin();
  const [all, setAll] = useState<Business[]>([]);
  const [filter, setFilter] = useState<string>('submitted');
  const [open, setOpen] = useState<Business | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setAll(await loadForReview());
  }, []);

  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin, refresh]);

  if (!isAdmin) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.center}><Text style={s.dim}>Admins only.</Text></View>
      </SafeAreaView>
    );
  }

  const rows = all.filter((b) => b.status === filter);
  const waiting = all.filter((b) => b.status === 'submitted').length;

  const act = async (approve: boolean) => {
    if (!open) return;
    if (!approve && !note.trim()) return;   // never decline silently
    setBusy(true);
    await decide(open.id, approve, note.trim() || undefined);

    // Tell them. The listing page shows the outcome too, but a
    // notification is what actually brings someone back to look.
    supabase.functions.invoke('send-push', {
      body: {
        userId: open.owner_id,
        title: approve ? 'Your listing is approved' : 'About your listing',
        body: approve
          ? `${open.name} passed review. Start the subscription and it goes live.`
          : `${open.name} needs a change before it can go up.`,
        category: 'friends',
        data: { businessId: open.id },
      },
    }).catch(() => {});

    setBusy(false);
    setNote('');
    setOpen(null);
    refresh();
  };

  /* ---------------- one listing ---------------- */

  if (open) {
    const photos = open.photos ?? [];
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.head}>
          <Pressable hitSlop={12} onPress={() => { setOpen(null); setNote(''); }}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>
          <Text style={s.headT}>{open.status}</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView contentContainerStyle={s.body}>
          {photos.length ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
              {photos.map((p) => (
                <Image key={p} source={bizImage(p)} style={s.shot} />
              ))}
            </ScrollView>
          ) : (
            <Text style={s.warn}>No photos. This should not have passed the form.</Text>
          )}

          <Text style={s.name}>{open.name}</Text>
          {open.name_fa ? <Text style={s.nameFa}>{open.name_fa}</Text> : null}
          <Text style={s.meta}>
            {categoryLabel(open.category, false)}
            {open.city ? '  ·  ' + open.city : ''}
            {open.country ? ', ' + open.country : ''}
          </Text>

          {open.description ? <Text style={s.desc}>{open.description}</Text> : null}
          {open.description_fa ? <Text style={[s.desc, s.descFa]}>{open.description_fa}</Text> : null}

          <View style={s.factRow}><Text style={s.factL}>Address</Text><Text style={s.factV}>{open.address || '—'}</Text></View>
          <View style={s.factRow}><Text style={s.factL}>Coordinates</Text><Text style={s.factV}>{open.lat != null ? `${open.lat.toFixed(4)}, ${open.lng?.toFixed(4)}` : '—'}</Text></View>
          <View style={s.factRow}><Text style={s.factL}>Phone</Text><Text style={s.factV}>{open.phone || '—'}</Text></View>
          <View style={s.factRow}>
            <Text style={s.factL}>Website</Text>
            {open.website ? (
              <Pressable onPress={() => Linking.openURL(open.website!.startsWith('http') ? open.website! : 'https://' + open.website)}>
                <Text style={[s.factV, s.link]}>{open.website}</Text>
              </Pressable>
            ) : <Text style={s.factV}>—</Text>}
          </View>

          {Object.entries(open.socials ?? {}).filter(([, v]) => v).map(([k, v]) => (
            <View key={k} style={s.factRow}><Text style={s.factL}>{k}</Text><Text style={s.factV}>{v}</Text></View>
          ))}

          {Object.entries(open.hours ?? {}).filter(([, v]) => v).length ? (
            <>
              <Text style={s.sectionL}>HOURS</Text>
              {Object.entries(open.hours ?? {}).filter(([, v]) => v).map(([d, v]) => (
                <View key={d} style={s.factRow}><Text style={s.factL}>{d}</Text><Text style={s.factV}>{v}</Text></View>
              ))}
            </>
          ) : null}

          {open.review_note ? (
            <>
              <Text style={s.sectionL}>LAST NOTE</Text>
              <Text style={s.desc}>{open.review_note}</Text>
            </>
          ) : null}

          <Text style={s.sectionL}>NOTE TO THE OWNER</Text>
          <TextInput
            style={s.input}
            value={note}
            onChangeText={setNote}
            placeholder="Required when declining. Say what would fix it."
            placeholderTextColor={colors.textSecondary}
            multiline
          />

          <View style={s.actions}>
            <Pressable style={[s.act, s.decline]} onPress={() => act(false)} disabled={busy || !note.trim()}>
              <Text style={[s.actT, { color: '#B3261E' }, !note.trim() && { opacity: 0.4 }]}>Decline</Text>
            </Pressable>
            <Pressable style={[s.act, s.approve]} onPress={() => act(true)} disabled={busy}>
              {busy ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={[s.actT, { color: '#FFF' }]}>Approve</Text>}
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ---------------- the queue ---------------- */

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.head}>
        <Pressable hitSlop={12} onPress={() => router.replace('/admin' as any)}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.headT}>Listings{waiting ? `  ·  ${waiting} waiting` : ''}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filters} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 7 }}>
        {FILTERS.map((f) => {
          const n = all.filter((b) => b.status === f.k).length;
          const on = filter === f.k;
          return (
            <Pressable key={f.k} style={[s.filter, on && s.filterOn]} onPress={() => setFilter(f.k)}>
              <Text style={[s.filterT, on && s.filterTOn]}>{f.label}{n ? ` ${n}` : ''}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={s.body}>
        {rows.length === 0 ? (
          <Text style={s.dim}>Nothing here.</Text>
        ) : rows.map((b) => (
          <Pressable key={b.id} style={s.row} onPress={() => { setOpen(b); setNote(b.review_note ?? ''); }}>
            {b.photos?.[0] ? (
              <Image source={bizImage(b.photos[0])} style={s.thumb} />
            ) : (
              <View style={[s.thumb, s.thumbEmpty]}><Ionicons name="image-outline" size={16} color={colors.textSecondary} /></View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={s.rowT}>{b.name}</Text>
              <Text style={s.rowX}>
                {categoryLabel(b.category, false)}{b.city ? '  ·  ' + b.city : ''}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },

  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.08)' },
  headT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary, textTransform: 'capitalize' },

  filters: { maxHeight: 52, paddingVertical: spacing.sm },
  filter: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.04)' },
  filterOn: { backgroundColor: colors.accent },
  filterT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  filterTOn: { color: '#FFF' },

  body: { padding: spacing.lg, paddingBottom: spacing.xxl },

  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.06)' },
  thumb: { width: 46, height: 46, borderRadius: 10 },
  thumbEmpty: { backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  rowT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  rowX: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  shot: { width: 190, height: 130, borderRadius: 12, marginRight: 8 },
  warn: { fontFamily: fonts.body, fontSize: 12.5, color: '#B3261E', marginBottom: spacing.md },

  name: { fontFamily: fonts.bodyStrong, fontSize: 20, letterSpacing: -0.4, color: colors.textPrimary },
  nameFa: { fontFamily: fonts.persian, fontSize: 17, color: colors.textPrimary, marginTop: 2 },
  meta: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.md },

  desc: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textPrimary, marginBottom: spacing.md },
  descFa: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 28, textAlign: 'right' },

  sectionL: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginTop: spacing.lg, marginBottom: 6 },
  factRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.05)' },
  factL: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, textTransform: 'capitalize' },
  factV: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textPrimary, maxWidth: '62%', textAlign: 'right' },
  link: { color: colors.accent },

  input: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: radius.md, padding: spacing.md, minHeight: 78, textAlignVertical: 'top' },

  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  act: { flex: 1, paddingVertical: 13, borderRadius: radius.lg, alignItems: 'center' },
  decline: { borderWidth: StyleSheet.hairlineWidth, borderColor: '#B3261E' },
  approve: { backgroundColor: colors.accent },
  actT: { fontFamily: fonts.bodyStrong, fontSize: 13.5 },
});
