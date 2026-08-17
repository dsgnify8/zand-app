// The listings you own.
//
// Everything about a business from the owner's side lives here: what
// state it is in, what it needs next, and the way in to edit it. The
// status line is the important part — someone who submitted a listing
// four days ago wants to know whether it is waiting on us or on them.

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView,
  StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { getLang } from '@/lib/i18n';
import { myBusinesses, categoryLabel, type Business, type BusinessStatus } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

// What each state means to the person who owns it, and what happens next.
const STATE: Record<BusinessStatus, { label: string; note: string; tone: 'wait' | 'act' | 'live' | 'off' }> = {
  draft:     { label: 'Draft',            note: 'Not sent yet. Finish it whenever you like.', tone: 'off' },
  submitted: { label: 'With us',          note: 'We are reading it. Usually a couple of days.', tone: 'wait' },
  rejected:  { label: 'Needs a change',   note: 'Have a look at the note, then send it again.', tone: 'act' },
  approved:  { label: 'Approved',         note: 'Start the subscription and it goes live.', tone: 'act' },
  active:    { label: 'Live',             note: 'People can find you in Local.', tone: 'live' },
  lapsed:    { label: 'Paused',           note: 'The subscription stopped, so it came down.', tone: 'off' },
};

export default function MyBusinesses() {
  const { user, session } = useAuth();
  const fa = getLang() === 'fa';
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    setItems(await myBusinesses(user.id));
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { refresh(); }, [refresh]);

  if (!session) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <Head onBack={() => router.back()} title="Your businesses" />
        <View style={s.empty}>
          <Ionicons name="storefront-outline" size={22} color={colors.textSecondary} />
          <Text style={s.emptyT}>Sign in to list a business or manage one you already have.</Text>
          <Pressable onPress={() => router.navigate('/onboarding?step=2&next=/my-businesses' as any)}>
            <Text style={s.emptyCta}>Sign in</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <Head onBack={() => router.back()} title="Your businesses" />

      <ScrollView contentContainerStyle={s.body}>
        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
        ) : items.length === 0 ? (
          <View style={s.empty}>
            <Ionicons name="storefront-outline" size={22} color={colors.textSecondary} />
            <Text style={s.emptyT}>
              Nothing listed yet. If you run something Iranian-owned, put it on the map.
            </Text>
            <Pressable style={s.newBtn} onPress={() => router.navigate('/business-new' as any)}>
              <Text style={s.newBtnT}>List a business</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {items.map((b) => {
              const st = STATE[b.status];
              return (
                <View key={b.id} style={s.card}>
                  <Pressable
                    style={s.cardTop}
                    onPress={() => router.navigate(('/business-new?id=' + b.id) as any)}
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
                      <View style={[s.pill, s['pill_' + st.tone as keyof typeof s]]}>
                        <Text style={[s.pillT, s['pillT_' + st.tone as keyof typeof s]]}>{st.label}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
                  </Pressable>

                  <Text style={s.note}>{st.note}</Text>

                  {b.status === 'rejected' && b.review_note ? (
                    <View style={s.reviewNote}>
                      <Text style={s.reviewNoteT}>{b.review_note}</Text>
                    </View>
                  ) : null}

                  {b.status === 'approved' ? (
                    <Pressable
                      style={s.pay}
                      onPress={() => router.navigate(('/business-billing?id=' + b.id) as any)}
                    >
                      <Text style={s.payT}>Start subscription  ·  $15 a month</Text>
                    </Pressable>
                  ) : null}

                  {b.status === 'active' ? (
                    <View style={s.liveRow}>
                      <Pressable onPress={() => router.navigate(('/business?id=' + b.id) as any)}>
                        <Text style={s.liveLink}>View listing</Text>
                      </Pressable>
                      <Pressable onPress={() => router.navigate(('/business-billing?id=' + b.id) as any)}>
                        <Text style={s.liveLink}>Manage subscription</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              );
            })}

            <Pressable style={s.newBtn} onPress={() => router.navigate('/business-new' as any)}>
              <Ionicons name="add" size={16} color="#FFF" />
              <Text style={s.newBtnT}>Add another</Text>
            </Pressable>
            <Text style={s.foot}>
              Each business is its own listing and its own subscription.
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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
  reviewNoteT: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textPrimary },

  pay: { backgroundColor: colors.accent, borderRadius: radius.md, paddingVertical: 11, alignItems: 'center', marginTop: spacing.md },
  payT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: '#FFF' },

  liveRow: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.sm },
  liveLink: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.accent },

  empty: { alignItems: 'center', gap: 10, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg },
  emptyT: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, textAlign: 'center', maxWidth: 260 },
  emptyCta: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent },

  newBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.textPrimary, borderRadius: radius.lg, paddingVertical: 13, marginTop: spacing.sm },
  newBtnT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: '#FFF' },
  foot: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md, opacity: 0.85 },
});
