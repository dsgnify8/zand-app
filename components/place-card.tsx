import { useState } from 'react';
import { Image, LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark } from '@/constants/education';
import { type Place } from '@/constants/geography';
import { eduImage } from '@/constants/education-images';
import { GlossaryText } from '@/components/glossary-text';
import { useLang, getLang } from '@/lib/i18n';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MAP_RATIO = 700 / 539;

export function PlaceCard({ place }: { place: Place }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [open, setOpen] = useState(false);
  const map = eduImage('iran-silhouette');

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(220, 'easeInEaseOut', 'opacity'));
    setOpen((v) => !v);
  };

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.head} onPress={toggle}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.fa}>{place.persian}</Text>
        <View style={{ flex: 1 }} />
        <Ionicons name={open ? 'chevron-up' : 'location-outline'} size={16} color={dark.gold} />
      </Pressable>

      {open ? (
        <View style={styles.mapWrap}>
          <View style={styles.mapBox}>
            {map ? <Image source={map} style={styles.map} resizeMode="contain" /> : null}
            <View style={[styles.dotHit, { left: (place.x * 100 + '%') as any, top: (place.y * 100 + '%') as any }]}>
              <View style={styles.halo} />
              <View style={styles.dot} />
            </View>
          </View>
          <Text style={styles.mapCap}>{place.name} sits here</Text>
          {place.image && eduImage(place.image) ? (
            <Image source={eduImage(place.image)} style={styles.placeImg} resizeMode="cover" />
          ) : null}
        </View>
      ) : null}

      <View style={styles.body}>
        <GlossaryText text={getLang() === 'fa' && (place as any).textFa ? (place as any).textFa : place.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.xl },
  head: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  name: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text },
  fa: { fontFamily: fonts.persian, fontSize: 13, color: dark.gold },
  mapWrap: { alignItems: 'center', marginTop: spacing.md, width: '100%' },
  mapBox: { width: 150, aspectRatio: MAP_RATIO, position: 'relative' },
  map: { width: '100%', height: '100%', opacity: 0.45 },
  dotHit: { position: 'absolute', width: 20, height: 20, marginLeft: -10, marginTop: -10, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 15, height: 15, borderRadius: 8, borderWidth: 1, borderColor: dark.gold, opacity: 0.7 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: dark.accent },
  placeImg: { width: '100%', height: 170, borderRadius: radius.md, marginTop: spacing.md, backgroundColor: dark.surface },
  mapCap: { fontFamily: fonts.body, fontSize: 10, color: dark.textDim, fontStyle: 'italic', marginTop: 4 },
  body: { marginTop: spacing.xs },
});
