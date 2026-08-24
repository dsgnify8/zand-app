import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { REMEMBERED, type Remembered } from '@/constants/memorial';
import { DroopingRose } from '@/components/drooping-rose';
import { FramedImage } from '@/components/framed-image';
import { eduImage } from '@/constants/education-images';
import { useLang, getLang } from '@/lib/i18n';

const BOX = 300;   // the illustration is square; dots are placed as fractions

// A flower past saving: stem bent, head down, petals on the ground.
// Drawn rather than photographed so it carries no one's face.
export function Memorial({ dark = true }: { dark?: boolean }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [open, setOpen] = useState<Remembered | null>(null);

  const ink = dark ? 'rgba(239,231,220,0.7)' : 'rgba(34,30,26,0.7)';
  const faint = dark ? 'rgba(239,231,220,0.28)' : 'rgba(34,30,26,0.28)';
  const text = dark ? '#EFE7DC' : '#221E1A';
  const dim = dark ? 'rgba(239,231,220,0.5)' : 'rgba(34,30,26,0.5)';
  const dot = '#C4433F';
  const card = dark ? '#221E1A' : '#FFFFFF';

  return (
    <View style={s.wrap}>
      <View style={{ height: BOX, position: 'relative' }}>
        <DroopingRose ink={ink} faint={faint} blush={dot} />

        {REMEMBERED.map((r) => (
          <Pressable
            key={r.key}
            style={[s.hit, { left: r.x * BOX - 16, top: r.y * BOX - 16 }]}
            onPress={() => setOpen(r)}
            hitSlop={6}
          >
            <View style={[s.halo, { borderColor: dot }]} />
            <View style={[s.dot, { backgroundColor: dot }]} />
          </Pressable>
        ))}
      </View>

      <Text style={[s.caption, { color: dim }]}>
        {fa ? 'چند تن، از دریایی. روی هرکدام بزن.' : 'A few, from a sea. Tap any one of them.'}
      </Text>

      <Modal transparent visible={!!open} animationType="fade" onRequestClose={() => setOpen(null)}>
        <Pressable style={s.backdrop} onPress={() => setOpen(null)}>
          <Pressable style={[s.card, { backgroundColor: card }]} onPress={() => {}}>
            <Pressable style={s.xBtn} hitSlop={12} onPress={() => setOpen(null)}>
              <Ionicons name="close" size={20} color={dim} />
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={s.portrait}>
                <FramedImage
                  name={open?.image ?? ''}
                  source={open ? eduImage(open.image) : undefined}
                  style={StyleSheet.absoluteFill as any}
                />
              </View>

              <Text style={[s.name, { color: text }, fa && s.faName]}>{fa && open?.persian ? open.persian : open?.name}</Text>
              {!fa && open?.persian ? <Text style={[s.persian, { color: dim }]}>{open.persian}</Text> : null}

              <View style={s.metaRow}>
                {open?.age ? <Text style={[s.meta, { color: dim }]}>{fa && (open as any).ageFa ? (open as any).ageFa : open.age}</Text> : null}
                {open?.age ? <View style={[s.metaDot, { backgroundColor: dim }]} /> : null}
                <Text style={[s.meta, { color: dim }]}>{fa && (open as any)?.whenFa ? (open as any).whenFa : open?.when}</Text>
                <View style={[s.metaDot, { backgroundColor: dim }]} />
                <Text style={[s.meta, { color: dim }]}>{fa && (open as any)?.whereFa ? (open as any).whereFa : open?.where}</Text>
              </View>

              <View style={[s.rule, { backgroundColor: faint }]} />
              <Text style={[s.what, { color: text }, fa && s.faWhat]}>{fa && (open as any)?.whatFa ? (open as any).whatFa : open?.what}</Text>

              <Pressable style={s.close} onPress={() => setOpen(null)}>
                <Ionicons name="close" size={16} color={dim} />
                <Text style={[s.closeT, { color: dim }]}>close</Text>
              </Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  faName: { fontFamily: fonts.persian, fontSize: 21, textAlign: 'right' },
  faWhat: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' },
  wrap: { marginVertical: spacing.xl },
  hit: { position: 'absolute', width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 20, height: 20, borderRadius: 10, borderWidth: 1, opacity: 0.55 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  caption: { fontFamily: fonts.body, fontSize: 11.5, textAlign: 'center', marginTop: spacing.md, fontStyle: 'italic' },

  backdrop: { flex: 1, backgroundColor: 'rgba(10,8,6,0.72)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { borderRadius: 18, padding: spacing.xl, width: '100%', maxWidth: 360, maxHeight: '82%' },
  portrait: { width: '100%', height: 200, borderRadius: 12, overflow: 'hidden', backgroundColor: 'rgba(128,128,128,0.16)', marginBottom: spacing.lg },
  name: { fontFamily: fonts.heading, fontSize: 24, lineHeight: 30 },
  persian: { fontFamily: fonts.persian, fontSize: 15, marginTop: 3, textAlign: 'left' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' },
  meta: { fontFamily: fonts.body, fontSize: 11.5 },
  metaDot: { width: 3, height: 3, borderRadius: 2 },
  rule: { height: 1, marginVertical: spacing.lg },
  what: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 25 },
  xBtn: { position: 'absolute', top: 10, right: 10, zIndex: 10, padding: 6 },
  close: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: spacing.xl, paddingVertical: spacing.sm },
  closeT: { fontFamily: fonts.body, fontSize: 12.5 },
});
