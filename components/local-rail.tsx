// The rail at the top of the feed.
//
// Two sections doing different jobs rather than the same listings at two
// sizes: the rail is what is closest, the cards below are everything else.
// Scrolling past the rail is progress, not repetition.
//
// With no place chosen there is nothing to be nearest to, so the rail
// becomes the newest listings instead. The section always has a reason to
// exist and only its heading changes — a section that appears and vanishes
// depending on a setting elsewhere is harder to understand than one that
// simply says something different.
//
// Below about eight listings the rail would hold everything and leave the
// section under it empty, so it stands down. That is the state a young
// directory is in, and it should look deliberate.

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { categoryLabel, dist, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const RAIL_N = 6;
const MIN_FOR_RAIL = 8;
const SHOT = 132;

/** Which listings belong in the rail, and which are left for the cards. */
export function splitForFeed(
  items: Business[],
  place: { lat: number; lng: number } | null,
) {
  if (items.length < MIN_FOR_RAIL) return { rail: [] as Business[], rest: items };

  const ranked = place
    ? [...items].sort((a, b) => {
        // Anything without coordinates cannot be near; it goes last rather
        // than sorting as if it were at the origin.
        const da = a.lat != null ? dist(place.lat, place.lng, a.lat, a.lng ?? 0) : Infinity;
        const db = b.lat != null ? dist(place.lat, place.lng, b.lat, b.lng ?? 0) : Infinity;
        return da - db;
      })
    : [...items].sort((a, b) =>
        String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')));

  const rail = ranked.slice(0, RAIL_N);
  const ids = new Set(rail.map((b) => b.id));
  return { rail, rest: items.filter((b) => !ids.has(b.id)) };
}

export function NearRail({
  items,
  place,
  placeLabel,
  onOpen,
}: {
  items: Business[];
  place: { lat: number; lng: number } | null;
  placeLabel: string;
  onOpen: (b: Business) => void;
}) {
  const fa = getLang() === 'fa';
  if (items.length === 0) return null;

  return (
    <View style={st.wrap}>
      <Text style={[st.head, fa && st.rtl]}>
        {place ? t(LOCAL.closestTo) + ' ' + placeLabel : t(LOCAL.newestHere)}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[st.row, fa && { flexDirection: 'row-reverse' }]}
      >
        {items.map((b) => {
          const shot = (b.photos ?? [])[0];
          const km = place && b.lat != null ? dist(place.lat, place.lng, b.lat, b.lng ?? 0) : null;
          return (
            <Pressable key={b.id} style={st.card} onPress={() => onOpen(b)}>
              <View style={st.shot}>
                {shot ? (
                  <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                ) : (
                  <View style={[StyleSheet.absoluteFill as any, st.blank]}>
                    <Ionicons name="storefront-outline" size={18} color={colors.textSecondary} />
                  </View>
                )}
                {km != null && km < 100 ? (
                  <View style={st.km}>
                    <Text style={st.kmT}>{km < 1 ? '<1' : Math.round(km)} km</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[st.name, fa && st.rtl]} numberOfLines={1}>
                {fa && b.name_fa ? b.name_fa : b.name}
              </Text>
              <Text style={[st.meta, fa && st.rtl]} numberOfLines={1}>
                {categoryLabel(b.category, fa)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/**
 * The place control, for the header.
 *
 * Centred rather than filed under the title: it governs the feed, the rail
 * and the map together, so it belongs with the navigation rather than
 * looking like one filter among several.
 */
export function PlaceChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={[st.chip, active && st.chipOn]} onPress={onPress}>
      <Ionicons
        name="location-outline"
        size={13}
        color={active ? colors.accent : colors.textSecondary}
      />
      <Text style={[st.chipT, active && { color: colors.textPrimary }]} numberOfLines={1}>
        {label}
      </Text>
      <Ionicons name="chevron-down" size={11} color={colors.textSecondary} />
    </Pressable>
  );
}

const st = StyleSheet.create({
  wrap: { marginTop: spacing.xl },
  head: {
    fontFamily: fonts.bodyStrong,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  row: { gap: spacing.md, paddingRight: spacing.lg },

  card: { width: SHOT },
  shot: {
    width: SHOT, height: SHOT,
    borderRadius: 14, overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  blank: { alignItems: 'center', justifyContent: 'center' },
  km: {
    position: 'absolute', left: 7, bottom: 7,
    backgroundColor: 'rgba(20,17,16,0.62)',
    borderRadius: 999, paddingHorizontal: 7, paddingVertical: 3,
  },
  kmT: { fontFamily: fonts.body, fontSize: 9.5, color: '#FFF' },

  name: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary, marginTop: 7 },
  meta: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 1 },

  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: 6,
    maxWidth: 190,
  },
  chipOn: { borderColor: colors.accent },
  chipT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, flexShrink: 1 },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
