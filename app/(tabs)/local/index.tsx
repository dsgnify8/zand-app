// Local: Iranian-owned businesses, wherever you are.
//
// The order of the screen is the order of the questions someone actually
// asks: where am I, what kind of thing am I after, and what is near me.
// Everything else — the map, listing your own — sits at the edges so it
// is findable without being in the way.

import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Easing,
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
import { CategorySheet } from '@/components/category-sheet';
import { NewRail, SeeAllHead, GridCard, feedSections } from '@/components/local-feed';
import { PlaceChip } from '@/components/local-place-chip';
import { LocalHeroBg } from '@/components/local-hero';

import { LOCAL } from '@/constants/i18n/local';
import { suggestCities } from '@/constants/cities';
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
  const [locErr, setLocErr] = useState(false);

  const [cat, setCat] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // The list fades rather than swapping. Changing location replaces every
  // card at once, and without this the whole page blinks.
  // Starts hidden. At 1 the list painted once at full opacity before the
  // effect below could hide it — one frame of the previous state, which
  // is the white flash entering the tab.
  const swap = useRef(new Animated.Value(0)).current;
  // One rule: hidden while the rows are coming, faded in when they are
  // here. The previous version tracked which place it had last faded for
  // and bailed out three different ways, which meant entering the tab,
  // switching location and clearing it each behaved differently — and
  // two of the three flashed.
  useEffect(() => {
    if (loading) { swap.setValue(0); return; }
    Animated.timing(swap, {
      toValue: 1, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true,
    }).start();
  }, [loading]);
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
  // Nothing loads until we know where they are. Asking the device takes
  // a moment, and the list used to fetch everywhere first and then jump
  // to their city when the answer arrived — three states on the way to
  // one, which is what the flashing was.
  const [placeReady, setPlaceReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        // Last time's answer first. Somewhere you were yesterday is a
        // better opening guess than everywhere, and it arrives instantly
        // rather than after a GPS fix.
        try {
          const raw = await AsyncStorage.getItem('local:place');
          if (raw) { setPlace(JSON.parse(raw)); setPlaceReady(true); }
        } catch {}

        if (await hasLocation()) {
          // Bounded. A cold GPS fix can take five seconds or more, and
          // the page cannot sit blank that long waiting to be told
          // something it can manage without.
          const p = await Promise.race([
            currentPlace(),
            // Short. Anything longer reads as broken, and everywhere
            // is a perfectly good answer to fall back to.
            new Promise<null>((r) => setTimeout(() => r(null), 700)),
          ]);
          // And kept, so the next launch opens here rather than
          // waiting to be told again.
          if (p) {
            setPlace(p);
            try { await AsyncStorage.setItem('local:place', JSON.stringify(p)); } catch {}
          }
        }
      } finally {
        // Ready either way: no permission, or no fix, both mean
        // everywhere — and that is an answer, not a failure.
        setPlaceReady(true);
      }
    })();
  }, []);

  const useMine = async () => {
    setLocating(true);
    // Fade out while the device is asked where it is. Everywhere is
    // instant so its fade lands on its own; this one takes a moment, and
    // without starting the fade first the list is already redrawing by
    // the time the coordinates arrive.
    Animated.timing(swap, {
      toValue: 0, duration: 160, easing: Easing.in(Easing.quad), useNativeDriver: true,
    }).start();

    // Bounded. A device that has just granted permission may take a
    // long time to get a fix, or never get one indoors — and the list is
    // faded to nothing while we wait, so an unbounded await left the page
    // blank with no way back.
    const p = await Promise.race([
      currentPlace(),
      new Promise<null>((r) => setTimeout(() => r(null), 8000)),
    ]);
    setLocating(false);
    if (p) { setPlace(p); setPlaceOpen(false); }
    else {
      // Nothing came back. Say so — a list that fades out and back with no
      // explanation reads as a broken button.
      setLocErr(true);
      setTimeout(() => setLocErr(false), 4000);
      Animated.timing(swap, {
        toValue: 1, duration: 200, easing: Easing.out(Easing.quad), useNativeDriver: true,
      }).start();
    }
  };

  const lookUp = async () => {
    if (!placeText.trim()) return;
    setLocating(true);
    const p = await findPlace(placeText);
    setLocating(false);
    if (p) { setPlace(p); setPlaceOpen(false); setPlaceText(''); }
  };

  /* ---------------- what ---------------- */

  // The query the list actually runs on, a beat behind what is being
  // typed. Querying per keystroke means a round trip per letter and a
  // page that blanks five times while someone types "kebab".
  const [settled, setSettled] = useState('');
  useEffect(() => {
    const id = setTimeout(() => setSettled(query.trim()), 280);
    return () => clearTimeout(id);
  }, [query]);

  const load = useCallback(async () => {
    // Only a change of place counts as loading. Searching, clearing a
    // search, and picking everywhere all refine a list that is already
    // on screen — fading for those is a flash, not a transition.
    setLoading((was) => (settled ? false : was));
    const rows = await loadBusinesses({
      near: place ? { lat: place.lat, lng: place.lng, km: 60 } : undefined,
      // One category server-side is not enough now that several can be
      // chosen, so the filtering happens below instead.

      query: settled || undefined,
    });
    setItems(rows);
    setLoading(false);
  }, [place?.lat, place?.lng, settled]);

  useEffect(() => {
    if (!placeReady) return;   // one load, once the place is settled
    load();
  }, [load, placeReady]);

  const listYours = () => {
    setInfoOpen(false);
    // Listing needs an account: it is theirs to edit and bill, so there
    // has to be someone to attach it to.
    // Signing in should return them to what they were doing, not to the
    // home screen. The onboarding screen honours ?next=.
    router.navigate(session
      ? ('/local/business-new' as any)
      : ('/onboarding?step=2&next=/local/business-new' as any));
  };

  // Three passes over the same set: what is near, what is new, and all of
  // it. The last section is "see all", so it keeps everything.
  // Defensive: a sheet handing back null rather than an empty list would
  // otherwise take the whole tab down.
  const cats = cat ?? [];
  const shown = cats.length
    ? items.filter((x) => x.category && cats.includes(x.category))
    : items;
  const { top, fresh, all } = feedSections(shown, place ? { lat: place.lat, lng: place.lng } : null);
  // Single cards only here; the filter took the grid's place.
  const [catOpen, setCatOpen] = useState(false);
  // A search is a request for results, not for browsing: the grid shows
  // more of them at once, so it wins while there is a query.
  const searching = !!query.trim();
  const showGrid = false;
  const cardW = (Dimensions.get('window').width - spacing.lg * 2 - spacing.md) / 2;


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

      {/* The page arrives whole. The header draws immediately and the
          sections fill in behind it, so without this the hero, the chip
          and the search bar appear and then everything jumps as the rails
          land underneath them. */}
      <Animated.FlatList
        style={{ opacity: swap }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: heroY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        // Chunked into pairs for the grid rather than switching
        // numColumns, which requires a new key and so remounts the list —
        // and remounting throws the reader back to the top of the page.
        data={loading ? [] : all}
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
          <Pressable hitSlop={10} onPress={() => router.navigate('/local/saved' as any)}>
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
            {locErr ? (
              <Text style={s.locErrT}>
                {fa
                  ? 'موقعیتت پیدا نشد. منطقه را خودت بنویس.'
                  : 'Could not find you. Type an area instead.'}
              </Text>
            ) : null}
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
            {/* Cities we actually list in, matched as they type. Answers on
                the first keystroke and costs nothing — a geocoder round
                trip per letter would be slower and less useful, since a
                directory should offer the places it has. */}
            {placeText.trim().length > 0 && suggestCities(placeText).length > 0 ? (
              <View style={s.sugg}>
                {suggestCities(placeText).map((c) => (
                  <Pressable
                    key={c.key}
                    style={s.suggRow}
                    onPress={async () => {
                      const p = await findPlace(c.label);
                      if (p) { setPlace(p); setPlaceOpen(false); setPlaceText(''); }
                    }}
                  >
                    <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                    <Text style={s.suggT}>{c.label}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

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
            /* Our own placeholder in both languages, drawn below. RN
               applies textAlign to a placeholder unreliably, and the
               direction of the last one can survive a language change on
               the native view — which is why the English one came back
               with its question mark still on the left. */
            placeholder=""

            placeholderTextColor={colors.textSecondary}
            autoCorrect={false}
          />
          {/* RN ignores textAlign on a placeholder until the field has
              content, so a Persian placeholder puts its question mark on the
              wrong side. Drawn as our own Text instead. */}
          {!query ? (
            <Text
              pointerEvents="none"
              style={[
                s.searchIn,
                { position: 'absolute', color: colors.textSecondary },
                fa
                  ? { right: 40, textAlign: 'right', writingDirection: 'rtl' }
                  : { left: 40, textAlign: 'left', writingDirection: 'ltr' },
              ]}
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

        {/* Nothing until the listings are in. The fallback fills the rail
            with whatever is newest when nothing is featured, so on a slow
            load you see ten cards and then one. */}
        {searching || loading ? null : <NewRail
          items={fresh}
          onOpen={(b) => router.navigate(('/local/business?id=' + b.id) as any)}
        />}

        <SeeAllHead
          n={all.length}
          cats={cats}
          counts={items.reduce((m: Record<string, number>, x: any) => {
            if (x.category) m[x.category] = (m[x.category] ?? 0) + 1;
            return m;
          }, {})}
          onCats={() => setCatOpen(true)}
          onClear={() => setCat([])}
        />



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
                    onOpen={() => router.navigate(('/local/business?id=' + one.id) as any)}
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
              onOpen={() => router.navigate(('/local/business?id=' + biz.id) as any)}
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
      <CategorySheet
        open={catOpen}
        value={cats}
        counts={items.reduce((m: Record<string, number>, x: any) => {
          if (x.category) m[x.category] = (m[x.category] ?? 0) + 1;
          return m;
        }, {})}
        onPick={setCat}
        onClose={() => setCatOpen(false)}
      />

      <CollectionSheet businessId={filing} open={filing !== null} onClose={() => setFiling(null)} />

      <LocalDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        onPick={(k) => {
          // Already on the feed: closing the drawer *is* the action. The
          // early return here previously left the overlay mounted with its
          // scrim up, which froze the screen.
          if (k === 'home') { setDrawer(false); return; }
          if (k === 'city') router.navigate('/local/cities' as any);
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
  locErrT: {
    fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary,
    marginTop: 6, marginBottom: 2,
  },
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

  // Clear of the tab bar, which floats over the page now rather than
  // sitting under it — at spacing.xl the button was behind it.
  mapBtn: { position: 'absolute', bottom: spacing.xxl * 2, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 24, backgroundColor: 'rgba(28,20,17,0.82)' },
  mapBtnT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#FFF' },
  sugg: { marginTop: spacing.sm, gap: 2 },
  suggRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 9, paddingHorizontal: spacing.sm,
  },
  suggT: { fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary },
});
