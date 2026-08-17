// Local: Iranian-owned businesses, wherever you are.
//
// The order of the screen is the order of the questions someone actually
// asks: where am I, what kind of thing am I after, and what is near me.
// Everything else — the map, listing your own — sits at the edges so it
// is findable without being in the way.

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { getLang } from '@/lib/i18n';
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

export default function Local() {
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

  const where = place
    ? [place.city, place.country].filter(Boolean).join(', ') || 'Near you'
    : (fa ? 'همه‌جا' : 'Everywhere');

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>

        {/* top bar */}
        <View style={s.top}>
          <Text style={s.kicker}>{fa ? 'محلی' : 'LOCAL'}</Text>
          <Pressable hitSlop={10} onPress={() => setInfoOpen((v) => !v)}>
            <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        {infoOpen ? (
          <Pressable style={s.info} onPress={listYours}>
            <Text style={s.infoT}>
              {fa
                ? 'کسب‌وکار خودت را اینجا ثبت کن'
                : 'Run one of these? Put it on the map.'}
            </Text>
            <Text style={s.infoX}>
              {fa
                ? 'ثبت کن، ما بررسی می‌کنیم، و بعد در فهرست می‌آید.'
                : 'Send it in, we read every one, and it goes up once approved.'}
            </Text>
            <View style={s.infoCta}>
              <Text style={s.infoCtaT}>{fa ? 'ثبت کسب‌وکار' : 'List a business'}</Text>
              <Ionicons name="arrow-forward" size={13} color={colors.accent} />
            </View>
          </Pressable>
        ) : null}

        {/* header */}
        <Text style={[s.title, fa && s.titleFa]}>
          {fa ? 'ایرانی‌ها به نام‌ساختن مشهورند.' : 'Persians are known for making\na name for themselves.'}
        </Text>
        <Text style={[s.sub, fa && s.subFa]}>
          {fa ? 'اینجا می‌توانی پیدایشان کنی.' : 'Here is where to find them.'}
        </Text>

        {/* where */}
        <View style={s.whereRow}>
          <Pressable style={s.where} onPress={() => setPlaceOpen((v) => !v)}>
            <Ionicons name="location-outline" size={15} color={colors.textPrimary} />
            <Text style={s.whereT}>{where}</Text>
            <Ionicons name={placeOpen ? 'chevron-up' : 'chevron-down'} size={13} color={colors.textSecondary} />
          </Pressable>
          {/* Clearing the place is a one-tap thing, not something to go
              hunting for inside the picker. */}
          {place ? (
            <Pressable style={s.whereX} hitSlop={8} onPress={() => { setPlace(null); setPlaceOpen(false); }}>
              <Ionicons name="close" size={13} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>

        {placeOpen ? (
          <View style={s.placeBox}>
            <Pressable style={s.mineBtn} onPress={useMine} disabled={locating}>
              {locating
                ? <ActivityIndicator size="small" color={colors.accent} />
                : <Ionicons name="navigate-outline" size={14} color={colors.accent} />}
              <Text style={s.mineT}>{fa ? 'موقعیت من' : 'Use my location'}</Text>
            </Pressable>
            <View style={s.row}>
              <TextInput
                style={[s.input, { flex: 1 }]}
                value={placeText}
                onChangeText={setPlaceText}
                placeholder={fa ? 'استکهلم، دبی، گوتنبرگ…' : 'Stockholm, Dubai, Gothenburg…'}
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
                <Text style={s.clearT}>{fa ? 'همه‌جا را نشان بده' : 'Show everywhere'}</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {/* search */}
        <View style={s.search}>
          <Ionicons name="search" size={15} color={colors.textSecondary} />
          <TextInput
            style={s.searchIn}
            value={query}
            onChangeText={setQuery}
            placeholder={fa ? 'دنبال چه می‌گردی؟' : 'What are you looking for?'}
            placeholderTextColor={colors.textSecondary}
            autoCorrect={false}
          />
          {query ? (
            <Pressable hitSlop={8} onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={15} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>

        {/* categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.cats} contentContainerStyle={{ gap: 7, paddingRight: spacing.lg }}>
          <Pressable style={[s.cat, !cat && s.catOn]} onPress={() => setCat(null)}>
            <Text style={[s.catT, !cat && s.catTOn]}>{fa ? 'همه' : 'All'}</Text>
          </Pressable>
          {CATEGORIES.map((c) => {
            const on = cat === c.key;
            return (
              <Pressable key={c.key} style={[s.cat, on && s.catOn]} onPress={() => setCat(on ? null : c.key)}>
                <Ionicons name={c.icon as any} size={12} color={on ? '#FFF' : colors.textSecondary} />
                <Text style={[s.catT, on && s.catTOn]}>{fa ? c.fa : c.en}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* the list */}
        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
        ) : items.length === 0 ? (
          <View style={s.empty}>
            <Ionicons name="storefront-outline" size={20} color={colors.textSecondary} />
            <Text style={s.emptyT}>
              {fa
                ? 'اینجا هنوز چیزی ثبت نشده. شاید تو اولی باشی.'
                : 'Nothing here yet. Yours could be the first.'}
            </Text>
            <Pressable onPress={listYours}>
              <Text style={s.emptyCta}>{fa ? 'ثبت کسب‌وکار' : 'List a business'}</Text>
            </Pressable>
          </View>
        ) : (
          items.map((biz) => {
            const km = place && biz.lat != null
              ? dist(place.lat, place.lng, biz.lat, biz.lng ?? 0)
              : null;
            return (
              <BusinessCard
                key={biz.id}
                b={biz}
                fa={fa}
                km={km}
                onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
              />
            );
          })
        )}
      </ScrollView>

      {/* map */}
      <Pressable style={s.mapBtn} onPress={() => router.navigate('/local-map' as any)}>
        <Ionicons name="map-outline" size={16} color="#FFF" />
        <Text style={s.mapBtnT}>{fa ? 'نقشه' : 'Map'}</Text>
      </Pressable>
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

  title: { fontFamily: fonts.body, fontSize: 23, lineHeight: 31, letterSpacing: -0.6, color: colors.textPrimary },
  titleFa: { fontFamily: fonts.persian, fontSize: 17.5, lineHeight: 34, textAlign: 'right' },
  sub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, marginTop: 5 },
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

  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 10, marginTop: spacing.lg },
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
