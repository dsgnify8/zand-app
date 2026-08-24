// Other places close by.
//
// Sits at the foot of a listing, because someone who has just read about
// a café is often really planning an afternoon rather than a single
// stop. Nearest first, the listing itself excluded, and a mix of
// categories rather than only more of the same — six cafés in a row is
// a worse answer than a café, a bakery and a bookshop.

import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { categoryLabel, dist, loadBusinesses, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

import { useLang } from '@/lib/i18n';
const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

export function NearbyPlaces({ b, fa }: { b: Business; fa: boolean }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [items, setItems] = useState<Business[]>([]);

  useEffect(() => {
    (async () => {
      if (b.lat == null) return;
      const rows = await loadBusinesses({
        near: { lat: b.lat, lng: b.lng ?? 0, km: 15 },
        limit: 40,
      });

      // Drop this listing, then take at most two from any one category
      // so the strip is a neighbourhood rather than a category page.
      const seen = new Map<string, number>();
      const picked: Business[] = [];
      for (const r of rows) {
        if (r.id === b.id) continue;
        const n = seen.get(r.category) ?? 0;
        if (n >= 2) continue;
        seen.set(r.category, n + 1);
        picked.push(r);
        if (picked.length >= 8) break;
      }
      setItems(picked);
    })();
  }, [b.id, b.lat, b.lng]);

  if (items.length === 0) return null;

  return (
    <View style={s.wrap}>
      <Text style={s.label}>{fa ? 'همین نزدیکی' : 'NEARBY'}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.md, paddingRight: spacing.lg }}
      >
        {items.map((x) => {
          const km = b.lat != null && x.lat != null
            ? dist(b.lat, b.lng ?? 0, x.lat, x.lng ?? 0)
            : null;
          return (
            <Pressable
              key={x.id}
              style={s.card}
              onPress={() => router.replace(('/business?id=' + x.id) as any)}
            >
              {x.photos?.[0] ? (
                <Image source={bizImage(x.photos[0])} style={s.shot} />
              ) : (
                <View style={[s.shot, s.shotEmpty]}>
                  <Ionicons name="storefront-outline" size={18} color={colors.textSecondary} />
                </View>
              )}
              <Text style={[s.name, fa && x.name_fa ? s.nameFa : null]} numberOfLines={1}>
                {fa && x.name_fa ? x.name_fa : x.name}
              </Text>
              <Text style={s.meta} numberOfLines={1}>
                {categoryLabel(x.category, fa)}
                {km != null ? '  ·  ' + (km < 1 ? '<1' : Math.round(km)) + ' km' : ''}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: spacing.xxl },
  label: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginBottom: spacing.md },

  card: { width: 148 },
  shot: { width: 148, height: 110, borderRadius: 13 },
  shotEmpty: { backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: colors.textPrimary, marginTop: 7 },
  nameFa: { fontFamily: fonts.persian, fontSize: 14, textAlign: 'right' },
  meta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },
});
