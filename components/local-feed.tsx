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
import { CategoryBar } from '@/components/category-sheet';
import { BusinessCard } from '@/components/business-card';
import { getLang, t } from '@/lib/i18n';
import { preferUnseen } from '@/lib/opened-businesses';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const TOP_N = 8;
const NEW_N = 10;

// What counts as newly opened. Not a rolling window: "opened this year" is
// a thing someone can say out loud, and a rolling twelve months would drop
// a place in January for no reason it could explain.
/**
 * Today's order for a fixed set.
 *
 * Seeded by the date rather than random, so every device agrees on what
 * today looks like — and so it changes overnight on its own. Being
 * seventh on Monday is not being seventh forever.
 */
function shuffleForToday<T>(items: T[]): T[] {
  const d = new Date();
  let seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const j = seed % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

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

  // Ranked first, then filtered for what has not been seen — ranking the
  // unseen alone would put a far-away new place above a near one.
  let ranked: Business[];
  if (place) {
    ranked = [...items]
      .filter((b) => b.lat != null)
      .sort((a, b) =>
        dist(place.lat, place.lng, a.lat!, a.lng ?? 0) - dist(place.lat, place.lng, b.lat!, b.lng ?? 0));
  } else {
    const flagged = items.filter((b) => (b as any).featured);
    ranked = flagged.length ? flagged : byNew;
  }
  const top = preferUnseen(ranked, TOP_N);

  // Chosen by an admin rather than measured. "Popular" from view counts
  // would mean the same three listings forever, since being at the top is
  // what makes something popular in the first place.
  const picked = items
    .filter((b: any) => b.featured)
    .sort((a: any, b: any) => (a.featured_rank ?? 999) - (b.featured_rank ?? 999));
  const fresh = shuffleForToday(picked.length ? picked : byNew.slice(0, NEW_N));

  return { top, fresh, all: items };
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
      <Text style={[st.head, fa && st.rtl]}>{t(LOCAL.popular)}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={244 + spacing.md}
        decelerationRate="fast"
        contentContainerStyle={[st.rail, fa && { flexDirection: 'row-reverse' }]}
      >
        {/* The same card as the feed, narrower. One card at two sizes
            rather than a second card that drifts from the first. */}
        {items.map((b) => (
          <BusinessCard
            key={b.id}
            b={b}
            fa={fa}
            width={244}
            onOpen={() => onOpen(b)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

/* ================================================================== *
 * Section three: the heading above everything
 * ================================================================== */

export function SeeAllHead({
  n, cats, counts, onCats, onClear,
}: {
  n: number;
  /** Empty means everything. */
  cats: string[];
  counts?: Record<string, number>;
  onCats: () => void;
  onClear: () => void;
}) {
  const fa = getLang() === 'fa';
  return (
    <View style={[st.seeAll, fa && { flexDirection: 'row-reverse' }]}>
      <Text style={[st.head, { marginBottom: 0 }, fa && st.rtl]}>
        {t(LOCAL.seeAll)}
      </Text>
      {/* The grid went: on the feed these cards are the point, and half of
          one is not worth seeing. The room it leaves goes to the filter,
          which is what someone scrolling a long list actually wants. */}
      <CategoryBar value={cats} counts={counts} onPress={onCats} onClear={onClear} />
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
  big: { height: 286, borderRadius: 20, overflow: 'hidden', backgroundColor: colors.surface },
  foot: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 150 },
  bigText: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: spacing.lg },
  bigName: {
    fontFamily: fonts.heading, fontSize: 23, lineHeight: 28,
    letterSpacing: -0.4, color: colors.textPrimary,
  },
  bigMeta: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  /* newly opened: closer to the see-all card than to a thumbnail, since
     this is the section most worth stopping on */
  small: { width: 208 },
  smallShot: { width: 208, height: 140, borderRadius: 14, overflow: 'hidden', backgroundColor: colors.surface },
  smallName: { fontFamily: fonts.heading, fontSize: 18, lineHeight: 23, color: colors.textPrimary, marginTop: 8 },
  smallMeta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },

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
