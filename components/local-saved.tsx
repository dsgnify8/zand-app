// What someone kept.
//
// Light rather than dark, unlike the browse pages: this is the reader's own
// shelf, closer to the feed than to the countries. The filter row only
// shows categories they have actually saved something in — offering to
// filter by Dental when nothing dental is saved is a dead control.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { categoryLabel, loadBusinesses, type Business } from '@/lib/businesses';
import { useSavedBusinesses } from '@/lib/saved-businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { catTint } from '@/components/local-tints';
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

export function SavedBusinesses() {
  useLang();
  const fa = getLang() === 'fa';
  const { width: W } = useWindowDimensions();

  // The hook returns the id list itself, not a wrapper around it.
  const savedIds = useSavedBusinesses();
  const [all, setAll] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try { setAll(await loadBusinesses({})); } catch {}
      setLoading(false);
    })();
  }, []);

  // toggleSavedBusiness reassigns rather than mutating, so the array
  // identity changes on every save and this recomputes.
  const saved = useMemo(
    () => all.filter((b) => savedIds.includes(b.id)),
    [all, savedIds],
  );

  // Only categories actually represented. A filter that returns nothing is
  // worse than no filter.
  const cats = useMemo(() => {
    const m: Record<string, number> = {};
    for (const b of saved) if (b.category) m[b.category] = (m[b.category] ?? 0) + 1;
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [saved]);

  const shown = cat ? saved.filter((b) => b.category === cat) : saved;
  const cardW = (W - spacing.lg * 2 - spacing.md) / 2;

  return (
    <SafeAreaView style={st.safe} edges={['top']}>
      <View style={[st.top, fa && { flexDirection: 'row-reverse' }]}>
        <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
          <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={st.topT}>{t(LOCAL.savedTitle)}</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : saved.length === 0 ? (
        <View style={st.empty}>
          <Ionicons name="bookmark-outline" size={22} color={colors.textSecondary} />
          <Text style={[st.emptyT, fa && st.rtl]}>{t(LOCAL.nothingSaved)}</Text>
          <Text style={[st.emptyX, fa && st.rtl]}>{t(LOCAL.nothingSavedX)}</Text>
          <Pressable onPress={() => router.replace('/local' as any)}>
            <Text style={st.emptyCta}>{t(LOCAL.browseLocal)}</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.body}>
          {cats.length > 1 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[st.chips, fa && { flexDirection: 'row-reverse' }]}
            >
              <Pressable style={[st.chip, !cat && st.chipOn]} onPress={() => setCat(null)}>
                <Text style={[st.chipT, !cat && st.chipTOn]}>
                  {t(LOCAL.everything)}  {saved.length}
                </Text>
              </Pressable>
              {cats.map(([k, n]) => {
                const on = cat === k;
                return (
                  <Pressable
                    key={k}
                    style={[st.chip, on && { borderColor: catTint(k), backgroundColor: colors.surface }]}
                    onPress={() => setCat(on ? null : k)}
                  >
                    <Ionicons name="ellipse" size={7} color={catTint(k)} />
                    <Text style={[st.chipT, on && st.chipTOn]}>
                      {categoryLabel(k, fa)}  {n}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : null}

          <View style={st.grid}>
            {shown.map((b) => {
              const shot = (b.photos ?? [])[0];
              return (
                <Pressable
                  key={b.id}
                  style={{ width: cardW }}
                  onPress={() => router.navigate(('/business?id=' + b.id) as any)}
                >
                  <View style={[st.shot, { width: cardW, height: cardW }]}>
                    {shot ? (
                      <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                    ) : (
                      <View style={[StyleSheet.absoluteFill as any, st.blank]}>
                        <Ionicons name="storefront-outline" size={18} color={colors.textSecondary} />
                      </View>
                    )}
                  </View>
                  <Text style={[st.name, fa && st.rtl]} numberOfLines={1}>
                    {fa && b.name_fa ? b.name_fa : b.name}
                  </Text>
                  <Text style={[st.meta, fa && st.rtl]} numberOfLines={1}>
                    {categoryLabel(b.category, fa)}
                    {b.city ? '  ·  ' + ((fa && b.city_fa) || b.city) : ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },

  chips: { gap: 7, paddingBottom: spacing.lg, paddingRight: spacing.lg },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: 7,
  },
  chipOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  chipT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  chipTOn: { color: colors.textPrimary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  shot: { borderRadius: 13, overflow: 'hidden', backgroundColor: colors.surface },
  blank: { alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary, marginTop: 7 },
  meta: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 1 },

  empty: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing.xxl * 2, paddingHorizontal: spacing.xl },
  emptyT: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary, marginTop: spacing.sm },
  emptyX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, textAlign: 'center' },
  emptyCta: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent, marginTop: spacing.md },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
