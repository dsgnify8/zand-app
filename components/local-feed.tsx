// The feed, in three passes.
//
// Big cards first: whatever is nearest, or if there is no "here", whatever
// has been marked worth seeing. Then a rail of small cards for what has
// just arrived. Then everything, in a grid or one at a time.
//
// Each section answers a different question — what is close, what is new,
// what is there — so scrolling is progress rather than the same listings at
// three sizes.
//
// The text on the big cards sits over a gradient rather than a blur. Real
// blur on several cards inside a horizontal scroll costs a great deal for a
// result the eye reads as the same thing.

import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { categoryLabel, dist, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const TOP_N = 8;
const NEW_N = 10;

/**
 * How the feed divides.
 *
 * `top` is the nearest when a place is set, and the featured ones when it
 * is not — falling back to newest while nothing has been flagged, so the
 * section is never empty on a young directory.
 *
 * `fresh` is what has just arrived. `all` stays whole: the last section is
 * "see all", so it should mean it.
 */
export function feedSections(items: Business[], place: { lat: number; lng: number } | null) {
  const byNew = [...items].sort((a, b) =>
    String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')));

  let top: Business[];
  if (place) {
    top = [...items]
      .filter((b) => b.lat != null)
      .sort((a, b) =>
        dist(place.lat, place.lng, a.lat!, a.lng ?? 0) - dist(place.lat, place.lng, b.lat!, b.lng ?? 0))
      .slice(0, TOP_N);
  } else {
    const flagged = items.filter((b) => (b as any).featured);
    top = (flagged.length ? flagged : byNew).slice(0, TOP_N);
  }

  return { top, fresh: byNew.slice(0, NEW_N), all: items };
}

/* ================================================================== *
 * Section one: the big cards
 * ================================================================== */

export function BigRail({
  items, place, placeLabel, onOpen,
}: {
  items: Business[];
  place: { lat: number; lng: number } | null;
  placeLabel: string;
  onOpen: (b: Business) => void;
}) {
  const fa = getLang() === 'fa';
  const { width: W } = useWindowDimensions();
  // Narrower and taller than a photo's natural crop: a portrait card
  // holds a shopfront better and lets the next one show at the edge.
  const cardW = Math.min(238, W - spacing.lg * 2 - 70);

  if (items.length === 0) return null;

  return (
    <View style={st.section}>
      <Text style={[st.head, fa && st.rtl]}>
        {place ? t(LOCAL.nearYou) + '  ·  ' + placeLabel : t(LOCAL.popular)}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardW + spacing.md}
        decelerationRate="fast"
        contentContainerStyle={[st.rail, fa && { flexDirection: 'row-reverse' }]}
      >
        {items.map((b) => {
          const shot = (b.photos ?? [])[0];
          return (
            <Pressable key={b.id} style={[st.big, { width: cardW }]} onPress={() => onOpen(b)}>
              {shot ? (
                <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
              ) : (
                <View style={[StyleSheet.absoluteFill as any, st.blank]}>
                  <Ionicons name="storefront-outline" size={22} color={colors.textSecondary} />
                </View>
              )}

              {/* The reference's soft foot: light rising off the bottom so
                  the type sits on something without a hard band. */}
              <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.72)', 'rgba(255,255,255,0.94)']}
                locations={[0, 0.55, 1]}
                style={st.foot}
              />

              <View style={[st.bigText, fa && { alignItems: 'flex-end' }]}>
                <Text style={[st.bigName, fa && st.rtl]} numberOfLines={1}>
                  {fa && b.name_fa ? b.name_fa : b.name}
                </Text>
                <Text style={[st.bigMeta, fa && st.rtl]} numberOfLines={1}>
                  {categoryLabel(b.category, fa)}
                  {b.country ? '  ·  ' + b.country : ''}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ================================================================== *
 * Section two: what has just arrived
 * ================================================================== */

export function NewRail({
  items, onOpen,
}: {
  items: Business[];
  onOpen: (b: Business) => void;
}) {
  const fa = getLang() === 'fa';
  if (items.length === 0) return null;

  return (
    <View style={st.section}>
      <Text style={[st.head, fa && st.rtl]}>{t(LOCAL.justAdded)}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[st.rail, fa && { flexDirection: 'row-reverse' }]}
      >
        {items.map((b) => {
          const shot = (b.photos ?? [])[0];
          return (
            <Pressable key={b.id} style={st.small} onPress={() => onOpen(b)}>
              <View style={st.smallShot}>
                {shot ? (
                  <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                ) : (
                  <View style={[StyleSheet.absoluteFill as any, st.blank]}>
                    <Ionicons name="storefront-outline" size={16} color={colors.textSecondary} />
                  </View>
                )}
              </View>
              <Text style={[st.smallName, fa && st.rtl]} numberOfLines={1}>
                {fa && b.name_fa ? b.name_fa : b.name}
              </Text>
              <Text style={[st.smallMeta, fa && st.rtl]} numberOfLines={1}>
                {categoryLabel(b.category, fa)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ================================================================== *
 * Section three: the heading above everything
 * ================================================================== */

export function SeeAllHead({
  n, grid, onGrid,
}: {
  n: number;
  grid: boolean;
  onGrid: (g: boolean) => void;
}) {
  const fa = getLang() === 'fa';
  return (
    <View style={[st.seeAll, fa && { flexDirection: 'row-reverse' }]}>
      <Text style={[st.head, { marginBottom: 0 }, fa && st.rtl]}>
        {t(LOCAL.seeAll)}
        <Text style={st.seeAllN}>{'   ' + n}</Text>
      </Text>
      <View style={[st.switchRow, fa && { flexDirection: 'row-reverse' }]}>
        <Pressable hitSlop={8} onPress={() => onGrid(false)}>
          <Ionicons name="square-outline" size={16} color={grid ? colors.textSecondary : colors.textPrimary} />
        </Pressable>
        <Pressable hitSlop={8} onPress={() => onGrid(true)}>
          <Ionicons name="grid-outline" size={16} color={grid ? colors.textPrimary : colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );
}

/** The compact card the grid view uses. */
export function GridCard({
  b, width, onOpen,
}: { b: Business; width: number; onOpen: () => void }) {
  const fa = getLang() === 'fa';
  const shot = (b.photos ?? [])[0];
  return (
    <Pressable style={{ width }} onPress={onOpen}>
      <View style={[st.gridShot, { width, height: width }]}>
        {shot ? (
          <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
        ) : (
          <View style={[StyleSheet.absoluteFill as any, st.blank]}>
            <Ionicons name="storefront-outline" size={18} color={colors.textSecondary} />
          </View>
        )}
      </View>
      <Text style={[st.smallName, fa && st.rtl]} numberOfLines={1}>
        {fa && b.name_fa ? b.name_fa : b.name}
      </Text>
      <Text style={[st.smallMeta, fa && st.rtl]} numberOfLines={1}>
        {categoryLabel(b.category, fa)}
        {b.city ? '  ·  ' + ((fa && b.city_fa) || b.city) : ''}
      </Text>
    </Pressable>
  );
}

const st = StyleSheet.create({
  section: { marginTop: spacing.xl },
  head: {
    fontFamily: fonts.bodyStrong,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  rail: { gap: spacing.md, paddingRight: spacing.lg },

  /* big */
  big: { height: 318, borderRadius: 20, overflow: 'hidden', backgroundColor: colors.surface },
  foot: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 150 },
  bigText: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: spacing.lg },
  bigName: {
    fontFamily: fonts.heading, fontSize: 23, lineHeight: 28,
    letterSpacing: -0.4, color: colors.textPrimary,
  },
  bigMeta: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  /* small */
  small: { width: 116 },
  smallShot: { width: 116, height: 116, borderRadius: 13, overflow: 'hidden', backgroundColor: colors.surface },
  smallName: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary, marginTop: 7 },
  smallMeta: { fontFamily: fonts.body, fontSize: 10.5, color: colors.textSecondary, marginTop: 1 },

  /* see all */
  seeAll: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: spacing.xxl, marginBottom: spacing.md,
  },
  seeAllN: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary },
  switchRow: { flexDirection: 'row', gap: spacing.md },

  gridShot: { borderRadius: 13, overflow: 'hidden', backgroundColor: colors.surface },

  blank: { alignItems: 'center', justifyContent: 'center' },
  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
