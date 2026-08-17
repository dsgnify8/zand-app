// A business, as it appears in the feed.
//
// Airbnb's shape, and for the same reason: a place is sold by its
// photographs, so the image gets the space and everything else sits
// under it. Arrows and dots because a card in a scrolling list cannot
// rely on people discovering they can swipe.
//
// The contact icons are here rather than only on the detail page because
// the most common thing someone wants from a directory is to ring the
// place, and making them open a page first to do it is a wasted tap.

import { useRef, useState } from 'react';
import {
  Dimensions, Image, Linking, NativeScrollEvent, NativeSyntheticEvent,
  Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { categoryLabel, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

const GAP = spacing.lg;
const W = Dimensions.get('window').width - GAP * 2;

export function BusinessCard({
  b, fa, km, onOpen,
}: {
  b: Business;
  fa: boolean;
  km?: number | null;
  onOpen: () => void;
}) {
  const shots = b.photos ?? [];
  const [i, setI] = useState(0);
  const scroll = useRef<ScrollView>(null);

  const go = (n: number) => {
    const next = Math.max(0, Math.min(shots.length - 1, n));
    setI(next);
    scroll.current?.scrollTo({ x: next * W, animated: true });
  };

  const onEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setI(Math.round(e.nativeEvent.contentOffset.x / W));
  };

  const wa = (b.socials ?? {}).whatsapp;
  const name = fa && b.name_fa ? b.name_fa : b.name;
  const blurb = b.tagline ?? b.description;

  return (
    <View style={s.card}>
      {/* photos */}
      <Pressable onPress={onOpen}>
        <View style={s.shotWrap}>
          {shots.length ? (
            <ScrollView
              ref={scroll}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onEnd}
            >
              {shots.map((p) => (
                <Image key={p} source={bizImage(p)} style={{ width: W, height: 210 }} />
              ))}
            </ScrollView>
          ) : (
            <View style={[s.shotEmpty, { width: W, height: 210 }]}>
              <Ionicons name="storefront-outline" size={24} color={colors.textSecondary} />
            </View>
          )}

          {/* a whisper of shade so white arrows and dots stay legible
              over a pale photograph */}
          <LinearGradient
            colors={['rgba(0,0,0,0.16)', 'transparent', 'rgba(0,0,0,0.22)']}
            locations={[0, 0.35, 1]}
            style={StyleSheet.absoluteFill as any}
            pointerEvents="none"
          />

          {shots.length > 1 ? (
            <>
              {i > 0 ? (
                <Pressable style={[s.arrow, s.arrowL]} hitSlop={6} onPress={() => go(i - 1)}>
                  <Ionicons name="chevron-back" size={22} color="rgba(255,255,255,0.9)" />
                </Pressable>
              ) : null}
              {i < shots.length - 1 ? (
                <Pressable style={[s.arrow, s.arrowR]} hitSlop={6} onPress={() => go(i + 1)}>
                  <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.9)" />
                </Pressable>
              ) : null}

              <View style={s.dots}>
                {shots.map((_, n) => (
                  <View key={n} style={[s.dot, n === i && s.dotOn]} />
                ))}
              </View>
            </>
          ) : null}

          {b.badge ? (
            <View style={s.badge}>
              <Text style={s.badgeT}>{b.badge}</Text>
            </View>
          ) : null}

          {km != null ? (
            <View style={s.km}>
              <Text style={s.kmT}>{km < 1 ? '<1' : Math.round(km)} km</Text>
            </View>
          ) : null}
        </View>
      </Pressable>

      {/* words */}
      <Pressable onPress={onOpen} style={s.body}>
        <View style={s.titleRow}>
          <Text style={[s.name, fa && b.name_fa ? s.nameFa : null]} numberOfLines={1}>{name}</Text>
        </View>
        <Text style={s.meta} numberOfLines={1}>
          {categoryLabel(b.category, fa)}
          {b.city ? '  ·  ' + b.city : ''}
        </Text>
        {blurb ? <Text style={s.blurb} numberOfLines={2}>{blurb}</Text> : null}
      </Pressable>

      {/* reach them */}
      {(b.phone || wa || b.website) ? (
        <View style={s.acts}>
          {b.phone ? (
            <Pressable style={s.act} onPress={() => Linking.openURL('tel:' + b.phone)}>
              <Ionicons name="call-outline" size={14} color={colors.textPrimary} />
              <Text style={s.actT}>{fa ? 'تماس' : 'Call'}</Text>
            </Pressable>
          ) : null}
          {wa ? (
            <Pressable
              style={s.act}
              onPress={() => Linking.openURL('https://wa.me/' + wa.replace(/[^\d]/g, ''))}
            >
              <Ionicons name="logo-whatsapp" size={14} color={colors.textPrimary} />
              <Text style={s.actT}>WhatsApp</Text>
            </Pressable>
          ) : null}
          {b.website ? (
            <Pressable
              style={s.act}
              onPress={() => Linking.openURL(b.website!.startsWith('http') ? b.website! : 'https://' + b.website)}
            >
              <Ionicons name="globe-outline" size={14} color={colors.textPrimary} />
              <Text style={s.actT}>{fa ? 'وب‌سایت' : 'Website'}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  card: { marginBottom: spacing.xl },

  shotWrap: { width: W, height: 210, borderRadius: 16, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.04)' },
  shotEmpty: { alignItems: 'center', justifyContent: 'center' },

  arrow: { position: 'absolute', top: '50%', marginTop: -14, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  arrowL: { left: 10 },
  arrowR: { right: 10 },

  dots: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row', gap: 4 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.55)' },
  dotOn: { backgroundColor: '#FFF', width: 6, height: 6, borderRadius: 3 },

  badge: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(20,17,14,0.82)', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 10 },
  badgeT: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 0.3, color: '#FFF' },
  km: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.92)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  kmT: { fontFamily: fonts.bodyStrong, fontSize: 10.5, color: colors.textPrimary },

  body: { paddingTop: spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontFamily: fonts.bodyStrong, fontSize: 15.5, letterSpacing: -0.2, color: colors.textPrimary, flex: 1 },
  nameFa: { fontFamily: fonts.persian, fontSize: 16, textAlign: 'right' },
  meta: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 2 },
  blurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginTop: 5 },

  acts: { flexDirection: 'row', gap: 7, marginTop: spacing.md },
  act: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 15, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.14)' },
  actT: { fontFamily: fonts.bodyStrong, fontSize: 11.5, color: colors.textPrimary },
});
