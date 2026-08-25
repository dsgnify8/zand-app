// Local: Iranian-owned businesses, wherever you are.
//
// The order of the screen is the order of the questions someone actually
// asks: where am I, what kind of thing am I after, and what is near me.
// Everything else — the map, listing your own — sits at the edges so it
// is findable without being in the way.

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Dimensions, FlatList, Image, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { t, useLang, getLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import {
  CATEGORIES, categoryLabel, loadBusinesses, dist, type Business,
} from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

// A listing photo is either a storage path or a bundled demo image.
const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };
import { currentPlace, findPlace, hasLocation, type Place } from '@/lib/geo';
import { BusinessCard } from '@/components/business-card';
import { LocalDrawer } from '@/components/local-drawer';
import { CollectionSheet } from '@/components/collection-sheet';
import { BigRail, NewRail, SeeAllHead, GridCard, feedSections } from '@/components/local-feed';
import { PlaceChip } from '@/components/local-place-chip';
import { LocalHeroBg } from '@/components/local-hero';

import { LOCAL } from '@/constants/i18n/local';
export default function Local() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const { session } = useAuth();

  const [place, setPlace] = useState<Place | null>(null);
  const [placeOpen, setPlaceOpen] = useState(false);
  const [placeText, setPlaceText] = useState('');
  const [locating, setLocating] = useState(false);

  const [cat, setCat] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  // One sheet for the whole feed rather than one per card.
  const [filing, setFiling] = useState<string | null>(null);
  // The wash cannot live inside the list — a ScrollView clips its children,
  // so it could never paint up behind the status bar. It sits outside and
  // is moved by the scroll offset instead, which looks the same and reaches
  // the top of the screen.
  const heroY = useRef(new Animated.Value(0)).current;

  /* ---------------- where ---------------- */

  // On first open, use their location only if they have already granted
  // it. A permission prompt the moment a tab opens is the fastest way to
  // get it refused.
  useEffect(() => {
    (async () => {
      if (await hasLocation()) {
        const p = await currentPlace();
        if (p) setPlace(p);
      }
    })();
  }, []);

  const useMine = async () => {
    setLocating(true);
    const p = await currentPlace();
    setLocating(false);
    if (p) { setPlace(p); setPlaceOpen(false); }
  };

  const lookUp = async () => {
    if (!placeText.trim()) return;
    setLocating(true);
    const p = await findPlace(placeText);
    setLocating(false);
    if (p) { setPlace(p); setPlaceOpen(false); setPlaceText(''); }
  };

  /* ---------------- what ---------------- */

  const load = useCallback(async () => {
    setLoading(true);
    const rows = await loadBusinesses({
      near: place ? { lat: place.lat, lng: place.lng, km: 60 } : undefined,
      category: cat ?? undefined,
      query: query.trim() || undefined,
    });
    setItems(rows);
    setLoading(false);
  }, [place?.lat, place?.lng, cat, query]);

  useEffect(() => { load(); }, [load]);

  const listYours = () => {
    setInfoOpen(false);
    // Listing needs an account: it is theirs to edit and bill, so there
    // has to be someone to attach it to.
    // Signing in should return them to what they were doing, not to the
    // home screen. The onboarding screen honours ?next=.
    router.navigate(session
      ? ('/business-new' as any)
      : ('/onboarding?step=2&next=/business-new' as any));
  };

  // Three passes over the same set: what is near, what is new, and all of
  // it. The last section is "see all", so it keeps everything.
  const { top, fresh, all } = feedSections(items, place ? { lat: place.lat, lng: place.lng } : null);
  const [grid, setGrid] = useState(false);
  // A search is a request for results, not for browsing: the grid shows
  // more of them at once, so it wins while there is a query.
  const searching = !!query.trim();
  const showGrid = grid || searching;
  const cardW = (Dimensions.get('window').width - spacing.lg * 2 - spacing.md) / 2;
  const pairs = all.reduce((rows: any[][], b, i) => {
    if (i % 2 === 0) rows.push([b]);
    else rows[rows.length - 1].push(b);
    return rows;
  }, []);

  const where = place
    ? [place.city, place.country].filter(Boolean).join(', ') || t(LOCAL.nearYou)
    : (fa ? 'همه‌جا' : t(LOCAL.everywhere));

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute', top: -80, left: 0, right: 0,
          transform: [{
            translateY: heroY.interpolate({
              inputRange: [0, 1], outputRange: [0, -1],
              extrapolateLeft: 'clamp',
            }),
          }],
        }}
      >
        <LocalHeroBg />
      </Animated.View>

      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: heroY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        // Chunked into pairs for the grid rather than switching
        // numColumns, which requires a new key and so remounts the list —
        // and remounting throws the reader back to the top of the page.
        data={loading ? [] : (showGrid ? pairs : all) as any}
        keyExtractor={(x: any) => (Array.isArray(x) ? 'row-' + x[0].id : x.id)}
        contentContainerStyle={s.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>

        {/* top bar */}
        <View style={[s.top, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => setDrawer(true)} style={{ marginRight: 12 }}>
            <Ionicons name="menu-outline" size={22} color={colors.textPrimary} />
          </Pressable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <PlaceChip label={where} active={!!place} onPress={() => setPlaceOpen((v) => !v)} />
          </View>
          <Pressable hitSlop={10} onPress={() => router.navigate('/local-saved' as any)}>
            <Ionicons name="bookmark-outline" size={19} color={colors.textPrimary} />
          </Pressable>
        </View>

        {infoOpen ? (
          <Pressable style={s.info} onPress={listYours}>
            <Text style={s.infoT}>
              {t(LOCAL.runOne)}
            </Text>
            <Text style={s.infoX}>
              {t(LOCAL.runOneX)}
            </Text>
            <View style={s.infoCta}>
              <Text style={s.infoCtaT}>{t(LOCAL.listBusiness)}</Text>
              <Ionicons name="arrow-forward" size={13} color={colors.accent} />
            </View>
          </Pressable>
        ) : null}

        {/* header */}
        <Text style={[s.title, fa && s.titleFa]}>
          {(() => {
            // Split on the emphasised word so it can be lifted without
            // holding the headline as three separate strings.
            const full = t(LOCAL.knownFor);
            const em = t(LOCAL.knownForEm);
            const i = full.indexOf(em);
            if (i < 0) return full;
            return (
              <>
                {full.slice(0, i)}
                <Text style={s.titleEm}>{em}</Text>
                {full.slice(i + em.length)}
              </>
            );
          })()}
        </Text>
        <Text style={[s.sub, fa && s.subFa]}>
          {t(LOCAL.whereToFind)}
        </Text>


        {placeOpen ? (
          <View style={s.placeBox}>
            <Pressable style={s.mineBtn} onPress={useMine} disabled={locating}>
              {locating
                ? <ActivityIndicator size="small" color={colors.accent} />
                : <Ionicons name="navigate-outline" size={14} color={colors.accent} />}
              <Text style={s.mineT}>{t(LOCAL.useMyLocation)}</Text>
            </Pressable>
            <View style={s.row}>
              <TextInput
                style={[s.input, { flex: 1 }]}
                value={placeText}
                onChangeText={setPlaceText}
                placeholder={t(LOCAL.cityPlaceholder)}
                placeholderTextColor={colors.textSecondary}
                onSubmitEditing={lookUp}
                returnKeyType="search"
              />
              <Pressable style={s.go} onPress={lookUp}>
                <Ionicons name="arrow-forward" size={15} color="#FFF" />
              </Pressable>
            </View>
            {place ? (
              <Pressable onPress={() => { setPlace(null); setPlaceOpen(false); }}>
                <Text style={s.clearT}>{t(LOCAL.showEverywhere)}</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {/* search */}
        <View style={[s.search, fa && { flexDirection: 'row-reverse' }]}>
          <Ionicons name="search" size={15} color={colors.textSecondary} />
          <TextInput
            style={[s.searchIn, fa && { textAlign: 'right', writingDirection: 'rtl' }]}
            value={query}
            onChangeText={setQuery}
            placeholder={fa ? '' : t(LOCAL.searchPlaceholder)}
            placeholderTextColor={colors.textSecondary}
            autoCorrect={false}
          />
          {/* RN ignores textAlign on a placeholder until the field has
              content, so a Persian placeholder puts its question mark on the
              wrong side. Drawn as our own Text instead. */}
          {fa && !query ? (
            <Text
              pointerEvents="none"
              style={[s.searchIn, { position: 'absolute', right: 40, textAlign: 'right', writingDirection: 'rtl', color: colors.textSecondary }]}
            >
              {t(LOCAL.searchPlaceholder)}
            </Text>
          ) : null}
          {query ? (
            <Pressable hitSlop={8} onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={15} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>

        {searching ? null : <BigRail
          items={top}
          place={place ? { lat: place.lat, lng: place.lng } : null}
          placeLabel={where}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />}

        {searching ? null : <NewRail
          items={fresh}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />}

        <SeeAllHead n={all.length} grid={showGrid} onGrid={setGrid} />



          </>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
          ) : (
            <View style={s.empty}>
              <Ionicons name="storefront-outline" size={20} color={colors.textSecondary} />
              <Text style={s.emptyT}>
                {t(LOCAL.nothingYet)}
              </Text>
              <Pressable onPress={listYours}>
                <Text style={s.emptyCta}>{t(LOCAL.listBusiness)}</Text>
              </Pressable>
            </View>
          )
        }
        renderItem={({ item: biz }) => {
          const km = place && !showGrid && (biz as any).lat != null
            ? dist(place.lat, place.lng, biz.lat, biz.lng ?? 0)
            : null;
          if (showGrid) {
            const row: any[] = biz as any;
            return (
              <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg }}>
                {row.map((one: any) => (
                  <GridCard
                    key={one.id}
                    b={one}
                    width={cardW}
                    onOpen={() => router.navigate(('/business?id=' + one.id) as any)}
                  />
                ))}
              </View>
            );
          }
          return (
            <BusinessCard
              b={biz}
              fa={fa}
              km={km}
              onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
              onFile={setFiling}
            />
          );
        }}
      />

      {/* map */}
      <Pressable style={s.mapBtn} onPress={() => router.navigate('/local-map' as any)}>
        <Ionicons name="map-outline" size={16} color="#FFF" />
        <Text style={s.mapBtnT}>{fa ? 'نقشه' : 'Map'}</Text>
      </Pressable>
      <CollectionSheet businessId={filing} open={filing !== null} onClose={() => setFiling(null)} />

      <LocalDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        onPick={(k) => {
          // Already on the feed: closing the drawer *is* the action. The
          // early return here previously left the overlay mounted with its
          // scrim up, which froze the screen.
          if (k === 'home') { setDrawer(false); return; }
          if (k === 'city') router.navigate('/local-cities' as any);
          else if (k === 'category') router.navigate('/local-categories' as any);
          else listYours();
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },

  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.sm, paddingBottom: spacing.lg },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 10.5, letterSpacing: 2.5, color: colors.textSecondary },

  info: { backgroundColor: 'rgba(201,162,39,0.08)', borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  infoT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  infoX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary, marginTop: 4 },
  infoCta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.md },
  infoCtaT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.accent },

  title: {
    fontFamily: fonts.body, fontSize: 23, lineHeight: 31, letterSpacing: -0.6,
    color: colors.textPrimary,
    textAlign: 'center', marginTop: spacing.xl, paddingHorizontal: spacing.md,
  },
  titleFa: { fontFamily: fonts.persian, fontSize: 17.5, lineHeight: 34, textAlign: 'right' },
  // Lighter and warmer than the rest of the line, so it reads as light
  // falling on the word rather than as a different colour.
  titleEm: { color: 'rgba(60,42,34,0.42)' },
  sub: {
    fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary,
    marginTop: 6, textAlign: 'center',
  },
  subFa: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 28, textAlign: 'right' },

  whereRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.lg },
  whereX: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  where: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.04)' },
  whereT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary },

  placeBox: { marginTop: spacing.sm, gap: spacing.sm },
  mineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 11, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.accent },
  mineT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.accent },
  row: { flexDirection: 'row', gap: 7 },
  input: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 10 },
  go: { width: 42, borderRadius: radius.md, backgroundColor: 'rgba(34,30,26,0.9)', alignItems: 'center', justifyContent: 'center' },
  clearT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, textAlign: 'center', paddingVertical: 6 },

  search: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    // Translucent rather than the flat grey: on the wash a solid field
    // looks stuck on rather than part of the page.
    // Glass rather than a panel: low fill so the colour reads through, and
    // a bright edge to catch the light the way the reference does.
    backgroundColor: 'rgba(255,255,255,0.34)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.68)',
    borderRadius: 999,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    marginTop: spacing.xl,
  },
  searchIn: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, padding: 0 },

  cats: { marginTop: spacing.md, marginBottom: spacing.lg, marginHorizontal: -spacing.lg, paddingHorizontal: spacing.lg },
  cat: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.04)', height: 30 },
  catOn: { backgroundColor: 'rgba(34,30,26,0.07)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(34,30,26,0.22)' },
  catT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  catTOn: { color: colors.textPrimary, fontFamily: fonts.bodyStrong },

  card: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.06)' },
  cover: { width: 76, height: 76, borderRadius: 12 },
  coverEmpty: { backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1 },
  cardT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary },
  cardTFa: { fontFamily: fonts.persian, fontSize: 15, textAlign: 'right' },
  cardX: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 3 },
  cardTag: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 3, opacity: 0.85 },

  empty: { alignItems: 'center', gap: 8, paddingVertical: spacing.xxl },
  emptyT: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, textAlign: 'center', maxWidth: 250 },
  emptyCta: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent, marginTop: 4 },

  mapBtn: { position: 'absolute', bottom: spacing.xl, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 24, backgroundColor: colors.textPrimary },
  mapBtnT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#FFF' },
});
