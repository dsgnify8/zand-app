import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark } from '@/constants/education';
import { PROVINCE_DOTS, type ProvinceDot } from '@/constants/geography';
import { eduImage } from '@/constants/education-images';
import { t, useLang, getLang } from '@/lib/i18n';

import { EXPLORE } from '@/constants/i18n/explore';
const MAP_RATIO = 1100 / 847;

export function IranProvinceMap() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [open, setOpen] = useState<ProvinceDot | null>(null);
  const src = eduImage('iran-provinces');

  return (
    <View style={styles.wrap}>
      <View style={styles.mapBox}>
        {src ? <Image source={src} style={styles.map} resizeMode="contain" /> : null}

        {PROVINCE_DOTS.map((p) => (
          <Pressable
            key={p.name}
            style={[styles.dotHit, { left: (p.x * 100 + '%') as any, top: (p.y * 100 + '%') as any }]}
            hitSlop={6}
            onPress={() => setOpen(p)}
          >
            <View style={[styles.dot, open?.name === p.name && styles.dotOn]} />
          </Pressable>
        ))}
      </View>

      <Text style={styles.hint}>{t(EXPLORE.touchProvince)}</Text>

      <Modal transparent visible={!!open} animationType="fade" onRequestClose={() => setOpen(null)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(null)}>
          <Pressable style={styles.card} onPress={() => {}}>
            <View style={styles.cardHead}>
              <View style={styles.cardTitles}>
                <Text style={styles.cardName}>{open?.name}</Text>
                <Text style={styles.cardFa}>{open?.persian}</Text>
              </View>
              <Pressable hitSlop={10} onPress={() => setOpen(null)}>
                <Ionicons name="close" size={20} color={dark.textDim} />
              </Pressable>
            </View>
            <View style={styles.rule} />
            <Text style={[styles.cardFact, getLang() === 'fa' && (open as any)?.factFa && { textAlign: 'right', writingDirection: 'rtl' }]}>{getLang() === 'fa' && (open as any)?.factFa ? (open as any).factFa : open?.fact}</Text>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: spacing.lg },
  mapBox: { width: '100%', aspectRatio: MAP_RATIO, position: 'relative' },
  map: { width: '100%', height: '100%' },
  dotHit: { position: 'absolute', width: 22, height: 22, marginLeft: -11, marginTop: -11, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: dark.gold, opacity: 0.85 },
  dotOn: { width: 12, height: 12, borderRadius: 6, backgroundColor: dark.accent, opacity: 1 },
  hint: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: dark.textDim, textAlign: 'center', marginTop: spacing.sm },

  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 330, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, padding: spacing.lg },
  cardHead: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  cardTitles: { flex: 1 },
  cardName: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text },
  cardFa: { fontFamily: fonts.persian, fontSize: fontSize.sm, color: dark.gold, marginTop: 2 },
  rule: { height: 1, backgroundColor: dark.hair, marginVertical: spacing.md },
  cardFact: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 23, color: dark.text, opacity: 0.9 },
});
