// The map.
//
// Pins for every live listing, a card that rises when you tap one, and
// the full page a tap further in. Coming back from a listing leaves the
// map exactly where it was — the region is held in state, so panning
// across a city and opening three places in turn does not keep throwing
// you back to where you started.
//
// Listings load for the visible region rather than all at once, with a
// small debounce, so dragging the map does not fire a request per frame.

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Dimensions, Image, Linking, PanResponder, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, type Region } from 'react-native-maps';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useLang, getLang } from '@/lib/i18n';
import { CATEGORIES, categoryLabel, loadBusinesses, trackBusiness, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

// A listing photo is either a storage path or a bundled demo image.
const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };
import { currentPlace, findPlace, hasLocation } from '@/lib/geo';

// Somewhere sensible to open if we know nothing: the middle of Europe,
// zoomed out far enough to show most of where the diaspora is.
const SHEET_W = Dimensions.get('window').width - spacing.lg * 2;
const CARD_W = Dimensions.get('window').width - spacing.lg * 2 - 10;

const FALLBACK: Region = {
  latitude: 48.5, longitude: 15.0, latitudeDelta: 28, longitudeDelta: 28,
};

export default function LocalMap() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const map = useRef<MapView>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rail = useRef<ScrollView>(null);

  // Opened from a city page with a centre already worked out, so start
  // there rather than at the fallback and then panning.
  const { lat: qLat, lng: qLng, z: qZ } = useLocalSearchParams<{ lat?: string; lng?: string; z?: string }>();
  const opened = qLat && qLng
    ? {
        latitude: Number(qLat),
        longitude: Number(qLng),
        latitudeDelta: Number(qZ) || 0.35,
        longitudeDelta: Number(qZ) || 0.35,
      }
    : null;
  const [region, setRegion] = useState<Region>(opened ?? FALLBACK);
  const [items, setItems] = useState<Business[]>([]);
  const [sel, setSel] = useState<Business | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const sheetFade = useRef(new Animated.Value(0)).current;

  // How far down the sheet has been dragged. Separate from the fade so
  // the two can be driven independently: the fade is the open and close
  // animation, this is the finger.
  const dragY = useRef(new Animated.Value(0)).current;

  const sheetPan = useRef(
    PanResponder.create({
      // Claim only a downward drag, and only once it is clearly vertical
      // — otherwise a swipe across the photograph gets swallowed.
      onMoveShouldSetPanResponder: (_e, g) =>
        g.dy > 6 && Math.abs(g.dy) > Math.abs(g.dx) * 1.6,
      onPanResponderMove: (_e, g) => {
        if (g.dy > 0) dragY.setValue(g.dy);
      },
      onPanResponderRelease: (_e, g) => {
        // far enough, or thrown hard enough
        const gone = g.dy > 110 || g.vy > 0.9;
        if (gone) {
          Animated.timing(dragY, { toValue: 420, duration: 180, useNativeDriver: true })
            .start(() => {
              setSheet(false);
              dragY.setValue(0);
            });
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 6,
            speed: 14,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragY, { toValue: 0, useNativeDriver: true }).start();
      },
    }),
  ).current;
  const [shot, setShot] = useState(0);

  useEffect(() => {
    Animated.timing(sheetFade, {
      toValue: sheet ? 1 : 0,
      duration: sheet ? 220 : 140,
      useNativeDriver: true,
    }).start();
  }, [sheet]);

  /* ---------------- start where they are ---------------- */

  useEffect(() => {
    // Unless they were sent somewhere specific. Arriving on a city and
    // then being slid back to your own location a second later is worse
    // than never having centred at all.
    if (opened) return;
    (async () => {
      if (await hasLocation()) {
        const p = await currentPlace();
        if (p) {
          const r = { latitude: p.lat, longitude: p.lng, latitudeDelta: 0.4, longitudeDelta: 0.4 };
          setRegion(r);
          map.current?.animateToRegion(r, 600);
        }
      }
    })();
  }, []);

  /* ---------------- load for what is on screen ---------------- */

  const loadHere = useCallback(async (r: Region) => {
    setLoading(true);
    // half the visible span, in km, is a fair radius for the box query
    const km = Math.max(2, (r.latitudeDelta * 111) / 2);
    const rows = await loadBusinesses({
      near: { lat: r.latitude, lng: r.longitude, km },
      category: cat ?? undefined,
      limit: 300,
    });

    // Fewer markers the further out you are. Three hundred pins on a
    // continent-wide view is both unreadable and enough native views to
    // take the app down — which is what a silent crash on zooming out is.
    const cap = r.latitudeDelta > 20 ? 40 : r.latitudeDelta > 5 ? 90 : 300;
    setItems(rows.filter((b) => b.lat != null && b.lng != null).slice(0, cap));
    setLoading(false);
  }, [cat]);

  useEffect(() => { loadHere(region); }, [cat]);

  const onRegion = (r: Region) => {
    setRegion(r);
    // While the rail is open it is moving the map itself, and refetching
    // on every one of those moves reorders the list under the user's
    // finger. So we only reload when they are driving the map directly.
    if (listOpen) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => loadHere(r), 450);
  };

  const search = async () => {
    if (!q.trim()) return;
    const p = await findPlace(q);
    if (!p) return;
    const r = { latitude: p.lat, longitude: p.lng, latitudeDelta: 0.3, longitudeDelta: 0.3 };
    map.current?.animateToRegion(r, 700);
    setSearchOpen(false);
    setQ('');
  };

  // Hands off to whatever the person uses. On iOS the maps: scheme
  // opens Apple Maps; on Android geo: lets the system offer Google Maps,
  // Waze and anything else installed, which is the polite thing to do.
  const openDirections = (x: Business) => {
    if (x.lat == null) return;
    trackBusiness(x.id, 'directions');
    const label = encodeURIComponent(x.name);
    const url = Platform.select({
      ios: `maps://?q=${label}&ll=${x.lat},${x.lng}`,
      android: `geo:${x.lat},${x.lng}?q=${x.lat},${x.lng}(${label})`,
      default: `https://maps.google.com/?q=${x.lat},${x.lng}`,
    })!;
    Linking.openURL(url).catch(() => {});
  };

  const goToMe = async () => {
    const p = await currentPlace();
    if (!p) return;
    map.current?.animateToRegion(
      { latitude: p.lat, longitude: p.lng, latitudeDelta: 0.25, longitudeDelta: 0.25 }, 600,
    );
  };

  return (
    <View style={s.wrap}>
      <MapView
        ref={map}
        style={StyleSheet.absoluteFill}
        initialRegion={FALLBACK}
        onRegionChangeComplete={onRegion}
        onPress={() => { setSel(null); setListOpen(false); setSheet(false); }}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        {items.map((b) => {
          const on = sel?.id === b.id;
          return (
            <Marker
              key={b.id}
              coordinate={{ latitude: b.lat!, longitude: b.lng! }}
              onPress={(e) => {
                e.stopPropagation();
                setSel(b);
                setListOpen(true);
                const i = items.findIndex((x) => x.id === b.id);
                if (i >= 0) setTimeout(() => rail.current?.scrollTo({ x: i * (CARD_W + 10), animated: true }), 60);
              }}
              tracksViewChanges={false}
            >
              <View style={[s.pin, on && s.pinOn]}>
                <Ionicons
                  name={(CATEGORIES.find((c) => c.key === b.category)?.icon ?? 'ellipse') as any}
                  size={on ? 15 : 13}
                  color={on ? '#FFF' : colors.textPrimary}
                />
              </View>
            </Marker>
          );
        })}
      </MapView>

      <SafeAreaView style={s.top} edges={['top']} pointerEvents="box-none">
        <View style={s.topRow}>
          <Pressable style={s.round} onPress={() => router.replace('/local' as any)}>
            <Ionicons name="chevron-back" size={19} color={colors.textPrimary} />
          </Pressable>

          {searchOpen ? (
            <View style={s.searchBar}>
              <TextInput
                style={s.searchIn}
                value={q}
                onChangeText={setQ}
                placeholder={fa ? 'شهر یا محله' : 'City or area'}
                placeholderTextColor={colors.textSecondary}
                autoFocus
                onSubmitEditing={search}
                returnKeyType="search"
              />
              <Pressable hitSlop={8} onPress={() => { setSearchOpen(false); setQ(''); }}>
                <Ionicons name="close" size={16} color={colors.textSecondary} />
              </Pressable>
            </View>
          ) : (
            <Pressable style={s.round} onPress={() => setSearchOpen(true)}>
              <Ionicons name="search" size={17} color={colors.textPrimary} />
            </Pressable>
          )}
        </View>

        {/* categories filter the pins in place */}
        <View style={s.cats} pointerEvents="box-none">
          <Pressable style={[s.cat, !cat && s.catOn]} onPress={() => setCat(null)}>
            <Text style={[s.catT, !cat && s.catTOn]}>{fa ? 'همه' : 'All'}</Text>
          </Pressable>
          {CATEGORIES.slice(0, 8).map((c) => {
            const on = cat === c.key;
            return (
              <Pressable key={c.key} style={[s.cat, on && s.catOn]} onPress={() => setCat(on ? null : c.key)}>
                <Text style={[s.catT, on && s.catTOn]}>{fa ? c.fa : c.en}</Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>

      {loading ? (
        <View style={s.loading}><ActivityIndicator size="small" color={colors.textPrimary} /></View>
      ) : null}

      {/* my location */}
      <Pressable style={s.locate} onPress={goToMe}>
        <Ionicons name="navigate" size={17} color={colors.textPrimary} />
      </Pressable>

      {/* the peek card */}
      {sheet && sel ? (
        <>
          <Animated.View style={[s.sheetBack, { opacity: sheetFade }]}>
            <Pressable style={{ flex: 1 }} onPress={() => setSheet(false)} />
          </Animated.View>
          <Animated.View
            {...sheetPan.panHandlers}
            style={[
              s.sheet,
              {
                opacity: sheetFade,
                transform: [
                  // the open animation and the drag, added together
                  { translateY: Animated.add(
                    sheetFade.interpolate({ inputRange: [0, 1], outputRange: [26, 0] }),
                    dragY,
                  ) },
                ],
              },
            ]}
          >
            {/* a wider grip than the bar itself, so the drag is easy to
                start without aiming */}
            <View style={s.grabZone}>
              <View style={s.grab} />
            </View>

            {sel.photos?.length ? (
              <View>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(e) => setShot(Math.round(e.nativeEvent.contentOffset.x / SHEET_W))}
                  style={s.sheetShotWrap}
                >
                  {sel.photos.map((p) => (
                    <Image key={p} source={bizImage(p)} style={{ width: SHEET_W, height: 210 }} />
                  ))}
                </ScrollView>
                {sel.photos.length > 1 ? (
                  <View style={s.sheetDots}>
                    {sel.photos.map((_, i) => (
                      <View key={i} style={[s.sheetDot, i === shot && s.sheetDotOn]} />
                    ))}
                  </View>
                ) : null}
              </View>
            ) : null}

            <Pressable onPress={() => router.navigate(('/business?id=' + sel.id) as any)}>
              <Text style={s.sheetName}>{fa && sel.name_fa ? sel.name_fa : sel.name}</Text>
              <Text style={s.sheetMeta}>
                {categoryLabel(sel.category, fa)}
                {(fa && sel.city_fa) || sel.city ? '  ·  ' + ((fa && sel.city_fa) || sel.city) : ''}
              </Text>
              {sel.tagline ? <Text style={s.sheetTag} numberOfLines={2}>{sel.tagline}</Text> : null}
            </Pressable>

            {/* The address is why someone is on a map. It gets the space
                and it opens whichever app they actually navigate with. */}
            {sel.address || sel.lat != null ? (
              <Pressable style={s.addr} onPress={() => openDirections(sel)}>
                <Ionicons name="navigate" size={17} color={colors.accent} />
                <View style={{ flex: 1 }}>
                  <Text style={s.addrT}>{sel.address || (fa ? 'روی نقشه' : 'On the map')}</Text>
                  <Text style={s.addrX}>{fa ? 'باز کردن در نقشه' : 'Open in Maps'}</Text>
                </View>
                <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
              </Pressable>
            ) : null}

            <View style={s.sheetActs}>
              {sel.phone ? (
                <Pressable style={s.sheetAct} onPress={() => { trackBusiness(sel.id, 'call'); Linking.openURL('tel:' + sel.phone); }}>
                  <Ionicons name="call-outline" size={15} color={colors.textPrimary} />
                  <Text style={s.sheetActT}>{fa ? 'تماس' : 'Call'}</Text>
                </Pressable>
              ) : null}
              {(sel.socials ?? {}).whatsapp ? (
                <Pressable
                  style={s.sheetAct}
                  onPress={() => {
                    trackBusiness(sel.id, 'whatsapp');
                    Linking.openURL('https://wa.me/' + (sel.socials ?? {}).whatsapp!.replace(/[^\d]/g, ''));
                  }}
                >
                  <Ionicons name="logo-whatsapp" size={15} color={colors.textPrimary} />
                  <Text style={s.sheetActT}>WhatsApp</Text>
                </Pressable>
              ) : null}
              <Pressable
                style={[s.sheetAct, s.sheetActMain]}
                onPress={() => router.navigate(('/business?id=' + sel.id) as any)}
              >
                <Text style={[s.sheetActT, { color: '#FFF' }]}>{fa ? 'صفحهٔ کامل' : 'Full page'}</Text>
              </Pressable>
            </View>
          </Animated.View>
        </>
      ) : null}

      {sel && !listOpen && !sheet ? (
        <Pressable
          style={s.peek}
          onPress={() => router.navigate(('/business?id=' + sel.id) as any)}
        >
          {sel.photos?.[0] ? (
            <Image source={bizImage(sel.photos[0])} style={s.peekShot} />
          ) : (
            <View style={[s.peekShot, s.peekEmpty]}>
              <Ionicons name="storefront-outline" size={18} color={colors.textSecondary} />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={s.peekT} numberOfLines={1}>
              {fa && sel.name_fa ? sel.name_fa : sel.name}
            </Text>
            <Text style={s.peekX} numberOfLines={1}>
              {categoryLabel(sel.category, fa)}{(fa && sel.city_fa) || sel.city ? '  ·  ' + ((fa && sel.city_fa) || sel.city) : ''}
            </Text>
            {sel.tagline ? <Text style={s.peekTag} numberOfLines={1}>{sel.tagline}</Text> : null}
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </Pressable>
      ) : listOpen && items.length ? (
        // A swipeable row of every business in view, nearest first. Moving
        // through it pans the map, so the card and the pin stay in step.
        <ScrollView
          ref={rail}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_W + 10}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum
          scrollEventThrottle={16}
          style={s.rail}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          onMomentumScrollEnd={(e) => {
            const i = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + 10));
            const b = items[i];
            if (!b) return;
            // the panel above follows the rail
            if (sheet) setShot(0);
            // Highlight the pin for whatever card is now in front, so the
            // map and the rail always agree about what you are looking at.
            setSel(b);
            if (b.lat != null) {
              map.current?.animateToRegion({
                latitude: b.lat, longitude: b.lng!,
                latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta,
              }, 320);
            }
          }}
        >
          {items.map((b) => (
            <Pressable
              key={b.id}
              style={s.railCard}
              onPress={() => { setShot(0); setSel(b); setSheet(true); }}
            >
              {b.photos?.[0] ? (
                <Image source={bizImage(b.photos[0])} style={s.railShot} />
              ) : (
                <View style={[s.railShot, s.peekEmpty]}>
                  <Ionicons name="storefront-outline" size={18} color={colors.textSecondary} />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={s.peekT} numberOfLines={1}>{fa && b.name_fa ? b.name_fa : b.name}</Text>
                <Text style={s.peekX} numberOfLines={1}>
                  {categoryLabel(b.category, fa)}{(fa && b.city_fa) || b.city ? '  ·  ' + ((fa && b.city_fa) || b.city) : ''}
                </Text>
                {b.tagline ? <Text style={s.peekTag} numberOfLines={2}>{b.tagline}</Text> : null}
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <Pressable style={[s.count, sheet && { opacity: 0 }]} pointerEvents={sheet ? 'none' : 'auto'} onPress={() => setListOpen(true)}>
          <Text style={s.countT}>
            {items.length} {fa ? 'کسب‌وکار اینجا' : (items.length === 1 ? 'business here' : 'businesses here')}
          </Text>
          <Ionicons name="chevron-up" size={12} color={colors.textPrimary} />
        </Pressable>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.background },

  top: { position: 'absolute', top: 0, left: 0, right: 0 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  round: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.94)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.96)', paddingHorizontal: spacing.md, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  searchIn: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, padding: 0 },

  cats: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  cat: { paddingHorizontal: 11, paddingVertical: 6, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.94)' },
  catOn: { backgroundColor: colors.textPrimary },
  catT: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textPrimary },
  catTOn: { color: '#FFF' },

  pin: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.18)', shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  pinOn: { backgroundColor: colors.textPrimary, width: 36, height: 36, borderRadius: 18 },

  loading: { position: 'absolute', top: 96, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.94)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },

  locate: { position: 'absolute', right: spacing.lg, bottom: 118, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.96)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },

  peek: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: spacing.xl, flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: '#FFF', borderRadius: 18, padding: spacing.sm, shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 6 },
  peekShot: { width: 76, height: 76, borderRadius: 14 },
  peekEmpty: { backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  peekT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  peekX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },
  peekTag: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2, opacity: 0.85 },

  rail: { position: 'absolute', left: 0, right: 0, bottom: spacing.xl, maxHeight: 108 },
  railCard: { width: CARD_W, marginRight: 10, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: '#FFF', borderRadius: 18, padding: spacing.sm, shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 5 },
  railShot: { width: 76, height: 76, borderRadius: 14 },
  sheetBack: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 128, maxHeight: '64%', backgroundColor: '#FFF', borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: 10, paddingBottom: spacing.xxl, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 20, shadowOffset: { width: 0, height: -6 }, elevation: 12 },
  grabZone: { paddingTop: 4, paddingBottom: 10, alignItems: 'center' },
  grab: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.14)', marginBottom: spacing.md },
  sheetShotWrap: { borderRadius: 16, overflow: 'hidden', marginBottom: spacing.md },
  sheetDots: { position: 'absolute', bottom: 22, alignSelf: 'center', flexDirection: 'row', gap: 4 },
  sheetDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.6)' },
  sheetDotOn: { backgroundColor: '#FFF' },
  sheetShot: { width: '100%', height: 210, borderRadius: 16, marginBottom: spacing.md },
  sheetName: { fontFamily: fonts.bodyStrong, fontSize: 18, letterSpacing: -0.3, color: colors.textPrimary },
  sheetMeta: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 3 },
  sheetTag: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginTop: 6 },
  addr: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: 'rgba(201,162,39,0.08)', borderRadius: 14, padding: spacing.md, marginTop: spacing.lg },
  addrT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: colors.textPrimary },
  addrX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.accent, marginTop: 2 },
  sheetActs: { flexDirection: 'row', gap: 7, marginTop: spacing.md },
  sheetAct: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.14)' },
  sheetActMain: { flex: 1, backgroundColor: 'rgba(34,30,26,0.92)', borderColor: 'transparent' },
  sheetActT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary },
  count: { flexDirection: 'row', alignItems: 'center', gap: 6, position: 'absolute', alignSelf: 'center', bottom: spacing.xl + 6, backgroundColor: 'rgba(255,255,255,0.94)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  countT: { fontFamily: fonts.body, fontSize: 12, color: colors.textPrimary },
});
