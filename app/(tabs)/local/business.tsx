// A single listing.
//
// The order is what someone standing on a street actually needs: what it
// looks like, what it is, where it is, and how to get there or ring
// them. Description and hours come after, because they matter once you
// have decided you are interested rather than before.

import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Dimensions, Image, Linking, Platform, Pressable,
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { t, useLang, getLang } from '@/lib/i18n';
import { loadBusiness, categoryLabel, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { FounderFlip } from '@/components/founder-flip';
import { useStory, toCardStory, layoutFor } from '@/lib/founder-stories';
import { ACT_TINT } from '@/components/local-tints';
import { BusinessActionBar } from '@/components/business-action-bar';
import { eduImage } from '@/constants/education-images';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { NearbyPlaces } from '@/components/nearby-places';
import { isSavedBusiness, toggleSavedBusiness, shareBusiness } from '@/lib/saved-businesses';
import { CollectionSheet } from '@/components/collection-sheet';
import { markOpened } from '@/lib/opened-businesses';

import { LOCAL } from '@/constants/i18n/local';
// A listing photo is either a storage path or a bundled demo image.
const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const { width: W } = Dimensions.get('window');

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const DAY_EN: Record<string, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
  fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};
const DAY_FA: Record<string, string> = {
  mon: 'دوشنبه', tue: 'سه‌شنبه', wed: 'چهارشنبه', thu: 'پنجشنبه',
  fri: 'جمعه', sat: 'شنبه', sun: 'یکشنبه',
};

const SOCIAL_ICON: Record<string, string> = {
  instagram: 'logo-instagram',
  tiktok: 'logo-tiktok',
  facebook: 'logo-facebook',
  telegram: 'paper-plane-outline',
  whatsapp: 'logo-whatsapp',
};

function socialUrl(key: string, v: string) {
  if (v.startsWith('http')) return v;
  const handle = v.replace(/^@/, '');
  switch (key) {
    case 'instagram': return 'https://instagram.com/' + handle;
    case 'tiktok': return 'https://tiktok.com/@' + handle;
    case 'facebook': return 'https://facebook.com/' + handle;
    case 'telegram': return 'https://t.me/' + handle;
    case 'whatsapp': return 'https://wa.me/' + handle.replace(/[^\d]/g, '');
    default: return v;
  }
}

export default function BusinessPage() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { id } = useLocalSearchParams<{ id: string }>();
  const fa = getLang() === 'fa';
  const [b, setB] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [shot, setShot] = useState(0);
  const [, setSavedTick] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      setB(await loadBusiness(String(id)));
      setLoading(false);
    })();
  }, [id]);

  // Above the early return: a hook called only when the listing has
  // loaded is a hook called conditionally, and React counts them.
  const { story } = useStory(b?.id);

  // Remembered so the rail at the top of Local can move on. Local only —
  // this is a display preference, not something worth a row.
  useEffect(() => { if (b?.id) markOpened(b.id); }, [b?.id]);
  // Tap saves. Holding files it — the uncommon act, so it can afford a
  // sheet; the common one should cost nothing.
  const [filing, setFiling] = useState(false);
  const savePop = useRef(new Animated.Value(1)).current;
  const bump = () => {
    savePop.setValue(0.8);
    Animated.spring(savePop, { toValue: 1, friction: 4, tension: 180, useNativeDriver: true }).start();
  };

  if (loading) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      </SafeAreaView>
    );
  }

  if (!b) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.head}>
          <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>
        </View>
        <Text style={s.dim}>{fa ? 'پیدا نشد.' : t(LOCAL.notFound)}</Text>
      </SafeAreaView>
    );
  }

  const photos = b.photos ?? [];
  const name = fa && b.name_fa ? b.name_fa : b.name;
  const desc = fa && b.description_fa ? b.description_fa : b.description;
  const socials = Object.entries(b.socials ?? {}).filter(([, v]) => v);
  const hours = DAYS.filter((d) => (b.hours ?? {})[d]);

  const directions = () => {
    if (b.lat == null) return;
    const label = encodeURIComponent(b.name);
    const url = Platform.select({
      ios: `maps://?q=${label}&ll=${b.lat},${b.lng}`,
      android: `geo:${b.lat},${b.lng}?q=${b.lat},${b.lng}(${label})`,
      default: `https://maps.google.com/?q=${b.lat},${b.lng}`,
    })!;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={s.safe}>
      <StatusBar style="light" />
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >

        {/* photos */}
        <Animated.View
          style={{
            transform: [
              // half speed going up, and it stretches rather than tears
              // away when pulled down past the top
              { translateY: scrollY.interpolate({ inputRange: [-200, 0, 400], outputRange: [0, 0, 200], extrapolate: 'clamp' }) },
              { scale: scrollY.interpolate({ inputRange: [-200, 0], outputRange: [1.35, 1], extrapolate: 'clamp' }) },
            ],
            opacity: scrollY.interpolate({ inputRange: [0, 260, 400], outputRange: [1, 1, 0.55], extrapolate: 'clamp' }),
          }}
        >
          {photos.length ? (
            <>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => setShot(Math.round(e.nativeEvent.contentOffset.x / W))}
              >
                {photos.map((p) => (
                  <Image key={p} source={bizImage(p)} style={{ width: W, height: 420 }} />
                ))}
              </ScrollView>
              {photos.length > 1 ? (
                /* A count rather than dots, here. Past four or five, dots
                   stop being countable — and on a page you chose to open,
                   knowing there are six photographs is worth knowing. */
                <View style={s.shotCount}>
                  <Text style={s.shotCountT}>{shot + 1} / {photos.length}</Text>
                </View>
              ) : null}
            </>
          ) : (
            <View style={[s.noShot, { width: W }]}>
              <Ionicons name="storefront-outline" size={26} color={colors.textSecondary} />
            </View>
          )}

          <LinearGradient
            colors={['rgba(0,0,0,0.38)', 'transparent']}
            style={s.topShade}
            pointerEvents="none"
          />
          <View style={s.topRight}>
            <Pressable
              style={s.roundBtn}
              hitSlop={8}
              onPress={() => { toggleSavedBusiness(b.id); setSavedTick((n) => n + 1); bump(); }}
              onLongPress={() => { if (!isSavedBusiness(b.id)) toggleSavedBusiness(b.id); setSavedTick((n) => n + 1); setFiling(true); }}
              delayLongPress={280}
            >
              <Ionicons
                name={isSavedBusiness(b.id) ? 'bookmark' : 'bookmark-outline'}
                size={17}
                color="#FFF"
              />
            </Pressable>
            <Pressable style={s.roundBtn} hitSlop={8} onPress={() => shareBusiness(b)}>
              <Ionicons name="share-outline" size={17} color="#FFF" />
            </Pressable>
          </View>

          <Pressable style={s.back} hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}>
            <Ionicons name="chevron-back" size={20} color="#FFF" />
          </Pressable>
        </Animated.View>

        <FounderFlip
          name={name}
          city={(fa && b.city_fa) || b.city}
          fa={fa}
          motifKey={b.id}
          /* Only an approved story reaches the card. Without one the flip
             control does not render at all — a card that turns over to
             show nothing is worse than one that does not turn. */
          story={story && story.approved ? toCardStory(story) : undefined}
        >
          <View style={s.body}>
          <Text style={[s.name, fa && b.name_fa ? s.nameFa : null]}>{name}</Text>
          <Text style={s.meta}>
            {categoryLabel(b.category, fa)}
            {(fa && b.city_fa) || b.city ? '  ·  ' + ((fa && b.city_fa) || b.city) : ''}
            {b.country ? ', ' + b.country : ''}
          </Text>

          {b.tagline ? <Text style={s.tagline}>{fa && b.tagline_fa ? b.tagline_fa : b.tagline}</Text> : null}

          {/* Only where they said yes. The directory still knows the year;
              this is their page. */}
          {b.opened_year && b.show_opened !== false ? (
            <Text style={s.since}>
              {fa ? 'از ' + b.opened_year : 'Since ' + b.opened_year}
            </Text>
          ) : null}


          {desc ? (
            <Text style={[s.desc, fa && b.description_fa ? s.descFa : null]}>{desc}</Text>
          ) : null}

          {b.address || b.lat != null ? (
            <Pressable
              style={s.block}
              onPress={() => b.lat != null && router.navigate(('/local-map?focus=' + b.id) as any)}
            >
              <Text style={[s.blockL, { color: ACT_TINT.address }]}>{t(LOCAL.addressLabel)}</Text>
              <View style={s.addrRow}>
                <Text style={[s.blockV, fa && s.rtl, { flex: 1 }]}>{b.address || t(LOCAL.seeOnMap)}</Text>
                {b.lat != null ? (
                  <View style={s.mapChip}>
                    <Ionicons name="map-outline" size={14} color={colors.accent} />
                  </View>
                ) : null}
              </View>
            </Pressable>
          ) : b.website ? (
            /* No door, so the website takes the slot. The owner names it,
               because a URL is an instruction to a machine and this line is
               read by a person. */
            <Pressable
              style={s.block}
              onPress={() =>
                Linking.openURL(b.website!.startsWith('http') ? b.website! : 'https://' + b.website)
              }
            >
              <Text style={[s.blockL, { color: ACT_TINT.website }]}>{t(LOCAL.website).toUpperCase()}</Text>
              <View style={s.addrRow}>
                <Text style={[s.blockV, fa && s.rtl, { flex: 1 }]} numberOfLines={1}>
                  {b.website_label
                    || b.website!.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')}
                </Text>
                <View style={s.mapChip}>
                  <Ionicons name="open-outline" size={14} color={colors.accent} />
                </View>
              </View>
            </Pressable>
          ) : null}

          {hours.length ? (
            <View style={s.block}>
              <Text style={s.blockL}>{fa ? 'ساعت کار' : 'HOURS'}</Text>
              {hours.map((d) => (
                <View key={d} style={s.hourRow}>
                  <Text style={s.hourD}>{fa ? DAY_FA[d] : DAY_EN[d]}</Text>
                  <Text style={s.hourV}>{(b.hours ?? {})[d]}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {socials.length ? (
            <View style={s.block}>
              <Text style={s.blockL}>{fa ? 'شبکه‌های اجتماعی' : 'SOCIAL'}</Text>
              <View style={s.socials}>
                {socials.map(([k, v]) => (
                  <Pressable key={k} style={s.social} onPress={() => Linking.openURL(socialUrl(k, v))}>
                    <Ionicons name={(SOCIAL_ICON[k] ?? 'link-outline') as any} size={17} color={colors.textPrimary} />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}

          <NearbyPlaces b={b} fa={fa} />

          </View>
        </FounderFlip>
      </Animated.ScrollView>

      <CollectionSheet businessId={b.id} open={filing} onClose={() => setFiling(false)} />

      <BusinessActionBar
        phone={b.phone}
        website={b.website}
        hasMap={b.lat != null}
        onDirections={directions}
      />
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  head: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  dim: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  topShade: { position: 'absolute', top: 0, left: 0, right: 0, height: 120 },
  topRight: { position: 'absolute', top: 56, right: spacing.lg, flexDirection: 'row', gap: 8 },
  roundBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  mapChip: { width: 30, height: 30, borderRadius: 10, backgroundColor: 'rgba(201,162,39,0.12)', alignItems: 'center', justifyContent: 'center' },
  addrRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  back: { position: 'absolute', top: 56, left: spacing.lg, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  noShot: { height: 200, backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  dots: { position: 'absolute', bottom: 12, alignSelf: 'center', flexDirection: 'row', gap: 5 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.55)' },
  dotOn: { backgroundColor: '#FFF' },

  // The lap over the photo and the rounded top now belong to FounderFlip,
  // which is the card; this is just its front face.
  body: { padding: spacing.lg, backgroundColor: colors.background },
  // The serif the cards use. A listing's name is a name, not a label,
  // and it should look the same wherever it appears.
  name: { fontFamily: fonts.heading, fontSize: 30, lineHeight: 36, letterSpacing: -0.4, color: colors.textPrimary },
  nameFa: { fontFamily: fonts.persian, fontSize: 21, textAlign: 'right' },
  meta: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 4 },
  tagline: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textPrimary, marginTop: spacing.sm },

  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  act: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 11, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.12)' },
  actT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary },

  desc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.textPrimary, marginTop: spacing.xl },
  descFa: { fontFamily: fonts.persian, fontSize: 14.5, lineHeight: 30, textAlign: 'right' },

  block: { marginTop: spacing.xl },
  blockL: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginBottom: 8 },
  blockV: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20, color: colors.textPrimary },
  rtl: { textAlign: 'right', writingDirection: 'rtl' },

  hourRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.05)' },
  hourD: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },
  hourV: { fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },

  socials: { flexDirection: 'row', gap: spacing.md },
  // No tile behind them. These marks are already shapes; a rounded square
  // apiece turns a row of logos into a row of buttons.
  social: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },

  foot: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl, opacity: 0.8 },
  shotCount: {
    position: 'absolute', bottom: 14, right: spacing.lg,
    backgroundColor: 'rgba(20,17,16,0.5)',
    borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4,
  },
  shotCountT: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.95)' },
  since: {
    fontFamily: fonts.body, fontSize: 12, letterSpacing: 1.4,
    color: colors.textSecondary, marginTop: 6,
  },
});
