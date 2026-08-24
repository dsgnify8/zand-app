import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark } from '@/constants/education';
import { type City } from '@/constants/geography';
import { eduImage } from '@/constants/education-images';
import { useLang, getLang } from '@/lib/i18n';

const MAP_RATIO = 700 / 539;
const MAP_W = 128;
const MAP_H = MAP_W / MAP_RATIO;

export function CityCard({ city }: { city: City }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [open, setOpen] = useState(false);
  const map = eduImage('iran-silhouette');

  return (
    <View style={styles.row}>
      <View style={styles.mapCol}>
        <View style={styles.mapBox}>
          {map ? <Image source={map} style={styles.map} resizeMode="contain" /> : null}

          <Pressable
            style={[styles.dotHit, { left: (city.x * 100 + '%') as any, top: (city.y * 100 + '%') as any }]}
            hitSlop={10}
            onPress={() => setOpen(true)}
          >
            <View style={styles.halo} />
            <View style={styles.dot} />
          </Pressable>
        </View>

        <LinearGradient
          colors={['rgba(23,17,15,0)', 'rgba(23,17,15,0.7)', dark.bg]}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.mapFade}
          pointerEvents="none"
        />
      </View>

      <View style={styles.line} />

      <View style={styles.textCol}>
        <Text style={styles.name}>{city.name}</Text>
        <Text style={styles.fa}>{city.persian}</Text>
        <Text style={[styles.blurb, getLang() === 'fa' && (city as any).blurbFa && { fontFamily: fonts.persian, fontSize: 13, lineHeight: 26, textAlign: 'right', writingDirection: 'rtl' }]}>{getLang() === 'fa' && (city as any).blurbFa ? (city as any).blurbFa : city.blurb}</Text>
        <Pressable style={styles.seeBtn} onPress={() => setOpen(true)}>
          <Ionicons name="images-outline" size={13} color={dark.gold} />
          <Text style={styles.seeText}>SEE IT</Text>
        </Pressable>
      </View>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.card} onPress={() => {}}>
            <View style={styles.cardHead}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{city.name}</Text>
                <Text style={styles.cardFa}>{city.persian}</Text>
              </View>
              <Pressable hitSlop={10} onPress={() => setOpen(false)}>
                <Ionicons name="close" size={20} color={dark.textDim} />
              </Pressable>
            </View>

            <View style={styles.shots}>
              {city.images.map((k, i) => {
                const src = eduImage(k);
                return (
                  <View key={i} style={styles.shot}>
                    {src ? (
                      <Image source={src} style={styles.shotImg} resizeMode="cover" />
                    ) : (
                      <View style={[styles.shotImg, styles.shotPh]}>
                        <Ionicons name="image-outline" size={18} color={dark.textDim} />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  mapCol: { width: MAP_W, height: MAP_H },
  mapBox: { width: MAP_W, height: MAP_H, position: 'relative' },
  map: { width: '100%', height: '100%', opacity: 0.5 },
  mapFade: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 46 },
  dotHit: { position: 'absolute', width: 24, height: 24, marginLeft: -12, marginTop: -12, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: dark.gold, opacity: 0.7 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: dark.accent },

  line: { width: 26, height: 1, backgroundColor: dark.gold, opacity: 0.45 },

  textCol: { flex: 1, paddingLeft: spacing.md },
  name: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text },
  fa: { fontFamily: fonts.persian, fontSize: 12, color: dark.gold, marginTop: 1 },
  blurb: { fontFamily: fonts.body, fontSize: 12, lineHeight: 19, color: dark.textDim, marginTop: spacing.xs },
  seeBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.sm },
  seeText: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: dark.gold },

  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.72)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 340, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, padding: spacing.lg },
  cardHead: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md },
  cardName: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text },
  cardFa: { fontFamily: fonts.persian, fontSize: 13, color: dark.gold, marginTop: 1 },
  shots: { gap: spacing.sm },
  shot: { width: '100%' },
  shotImg: { width: '100%', height: 200, borderRadius: radius.md, backgroundColor: dark.bg },
  shotPh: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: dark.hair },
});
