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
  ActivityIndicator, Dimensions, Image, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, type Region } from 'react-native-maps';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { getLang } from '@/lib/i18n';
import { CATEGORIES, categoryLabel, loadBusinesses, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

// A listing photo is either a storage path or a bundled demo image.
const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };
import { currentPlace, findPlace, hasLocation } from '@/lib/geo';

// Somewhere sensible to open if we know nothing: the middle of Europe,
// zoomed out far enough to show most of where the diaspora is.
const CARD_W = Dimensions.get('window').width - spacing.lg * 2 - 10;

const FALLBACK: Region = {
  latitude: 48.5, longitude: 15.0, latitudeDelta: 28, longitudeDelta: 28,
};

export default function LocalMap() {
  const fa = getLang() === 'fa';
  const map = useRef<MapView>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [region, setRegion] = useState<Region>(FALLBACK);
  const [items, setItems] = useState<Business[]>([]);
  const [sel, setSel] = useState<Business | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  /* ---------------- start where they are ---------------- */

  useEffect(() => {
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
    setItems(rows.filter((b) => b.lat != null && b.lng != null));
    setLoading(false);
  }, [cat]);

  useEffect(() => { loadHere(region); }, [cat]);

  const onRegion = (r: Region) => {
    setRegion(r);
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
        onPress={() => { setSel(null); setListOpen(false); }}
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
              onPress={(e) => { e.stopPropagation(); setListOpen(false); setSel(b); }}
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
      {sel ? (
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
              {categoryLabel(sel.category, fa)}{sel.city ? '  ·  ' + sel.city : ''}
            </Text>
            {sel.tagline ? <Text style={s.peekTag} numberOfLines={1}>{sel.tagline}</Text> : null}
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </Pressable>
      ) : listOpen && items.length ? (
        // A swipeable row of every business in view, nearest first. Moving
        // through it pans the map, so the card and the pin stay in step.
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={s.rail}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          onMomentumScrollEnd={(e) => {
            const i = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + 10));
            const b = items[i];
            if (b?.lat != null) {
              map.current?.animateToRegion({
                latitude: b.lat, longitude: b.lng!,
                latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta,
              }, 350);
            }
          }}
        >
          {items.map((b) => (
            <Pressable
              key={b.id}
              style={s.railCard}
              onPress={() => router.navigate(('/business?id=' + b.id) as any)}
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
                  {categoryLabel(b.category, fa)}{b.city ? '  ·  ' + b.city : ''}
                </Text>
                {b.tagline ? <Text style={s.peekTag} numberOfLines={2}>{b.tagline}</Text> : null}
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <Pressable style={s.count} onPress={() => setListOpen(true)}>
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
  count: { flexDirection: 'row', alignItems: 'center', gap: 6, position: 'absolute', alignSelf: 'center', bottom: spacing.xl + 6, backgroundColor: 'rgba(255,255,255,0.94)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  countT: { fontFamily: fonts.body, fontSize: 12, color: colors.textPrimary },
});
