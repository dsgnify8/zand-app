import { useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lit } from '@/constants/literature';
import { FAL_VERSES, type FalVerse } from '@/constants/fal';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export function FalBook() {
  const [open, setOpen] = useState(false);
  const [verse, setVerse] = useState<FalVerse | null>(null);
  const [count, setCount] = useState(0);
  const [scold, setScold] = useState(false);
  const last = useRef<string | null>(null);

  const flip = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const pick = () => {
    let v = FAL_VERSES[Math.floor(Math.random() * FAL_VERSES.length)];
    let guard = 0;
    while (v.id === last.current && guard < 8) {
      v = FAL_VERSES[Math.floor(Math.random() * FAL_VERSES.length)];
      guard++;
    }
    last.current = v.id;
    return v;
  };

  const ask = () => {
    const next = count + 1;
    if (next > 3) {
      setScold(true);
      return;
    }
    setCount(next);
    setVerse(pick());

    flip.setValue(0);
    glow.setValue(0);
    Animated.sequence([
      Animated.timing(glow, { toValue: 1, duration: 340, useNativeDriver: true }),
      Animated.timing(flip, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start(() => setOpen(true));
  };

  const cover = flip.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-150deg'] });
  const lift = glow.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });

  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>{t(APP.falTitle)}</Text>
      <Text style={styles.instruction}>Hold your question in your heart, then open the book.</Text>

      <Pressable onPress={ask}>
        <Animated.View style={[styles.book, { transform: [{ translateY: lift }] }]}>
          <View style={styles.pages}>
            <View style={styles.pageEdge} />
            <View style={[styles.pageEdge, { left: 3 }]} />
            <View style={[styles.pageEdge, { left: 6 }]} />
          </View>

          <Animated.View
            style={[
              styles.cover,
              { transform: [{ perspective: 900 }, { rotateY: cover }] },
            ]}
          >
            <View style={styles.coverInner}>
              <View style={styles.medallion}>
                <View style={styles.medallionRing} />
                <Text style={styles.medallionGlyph}>حافظ</Text>
              </View>
              <View style={styles.coverRule} />
              <Text style={styles.coverTitle}>{t(APP.theDivan)}</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>

      <Text style={styles.hint}>{t(APP.touchToOpen)}</Text>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.card} onPress={() => {}}>
            <View style={styles.cardTop}>
              <Text style={styles.cardKicker}>{t(APP.yourOmen)}</Text>
              <Pressable hitSlop={10} onPress={() => setOpen(false)}>
                <Ionicons name="close" size={19} color={lit.textDim} />
              </Pressable>
            </View>

            <Text style={styles.fa}>{verse?.persian}</Text>
            <View style={styles.rule} />
            {verse?.lines.map((l, i) => (
              <Text key={i} style={styles.line}>{l}</Text>
            ))}
            <View style={styles.rule} />
            <Text style={styles.readingLabel}>{t(APP.whatItSays)}</Text>
            <Text style={styles.reading}>{verse?.reading}</Text>

            <Pressable style={styles.done} onPress={() => setOpen(false)}>
              <Text style={styles.doneText}>{t(APP.closeTheBook)}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal transparent visible={scold} animationType="fade" onRequestClose={() => setScold(false)}>
        <Pressable style={styles.backdrop} onPress={() => setScold(false)}>
          <Pressable style={styles.scoldCard} onPress={() => {}}>
            <Text style={styles.scoldGlyph}>حافظ</Text>
            <Text style={styles.scoldText}>
              The fal is for your intuition, not for your amusement. Ask once, with a real question, and sit with the answer you were given.
            </Text>
            <Text style={styles.scoldSub}>Come back another day.</Text>
            <Pressable style={styles.done} onPress={() => setScold(false)}>
              <Text style={styles.doneText}>{t(APP.iUnderstand)}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const BW = 172;
const BH = 232;

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginVertical: spacing.xl },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 3, color: lit.gold },
  instruction: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: lit.textDim, textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.lg, fontStyle: 'italic' },

  book: { width: BW, height: BH },
  pages: { position: 'absolute', left: 4, top: 4, right: 4, bottom: 4, backgroundColor: '#F3EDE2', borderRadius: 4 },
  pageEdge: { position: 'absolute', top: 6, bottom: 6, width: 1, backgroundColor: lit.hair, opacity: 0.8 },

  cover: { width: BW, height: BH, backgroundColor: '#5C3A2E', borderRadius: 5, borderWidth: 1, borderColor: lit.gold, backfaceVisibility: 'hidden', alignItems: 'center', justifyContent: 'center' },
  coverInner: { alignItems: 'center' },
  medallion: { width: 78, height: 78, alignItems: 'center', justifyContent: 'center' },
  medallionRing: { position: 'absolute', width: 78, height: 78, borderRadius: 39, borderWidth: 1, borderColor: lit.gold, opacity: 0.75 },
  medallionGlyph: { fontFamily: fonts.persian, fontSize: 26, color: lit.gold },
  coverRule: { width: 46, height: 1, backgroundColor: lit.gold, opacity: 0.6, marginVertical: spacing.md },
  coverTitle: { fontFamily: fonts.heading, fontSize: fontSize.base, color: '#EBDFC8', letterSpacing: 1 },

  hint: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: lit.textDim, marginTop: spacing.lg },

  backdrop: { flex: 1, backgroundColor: 'rgba(30,24,18,0.72)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 340, backgroundColor: lit.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: lit.gold, padding: spacing.xl },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardKicker: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 3, color: lit.gold },
  fa: { fontFamily: fonts.persian, fontSize: 17, lineHeight: 32, color: lit.ink, textAlign: 'center', marginTop: spacing.lg },
  rule: { width: 40, height: 1, backgroundColor: lit.gold, opacity: 0.5, alignSelf: 'center', marginVertical: spacing.lg },
  line: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 30, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  readingLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.rose, textAlign: 'center' },
  reading: { fontFamily: fonts.body, fontSize: 13, lineHeight: 23, color: lit.text, textAlign: 'center', marginTop: spacing.sm, opacity: 0.9 },
  done: { alignSelf: 'center', marginTop: spacing.xl, borderWidth: 1, borderColor: lit.hair, borderRadius: radius.pill, paddingVertical: spacing.sm, paddingHorizontal: spacing.xl },
  doneText: { fontFamily: fonts.bodyStrong, fontSize: 12, color: lit.textDim },

  scoldCard: { width: '100%', maxWidth: 320, backgroundColor: lit.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: lit.hair, padding: spacing.xl, alignItems: 'center' },
  scoldGlyph: { fontFamily: fonts.persian, fontSize: 30, color: lit.gold },
  scoldText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 24, color: lit.text, textAlign: 'center', marginTop: spacing.lg },
  scoldSub: { fontFamily: fonts.body, fontSize: 12, color: lit.textDim, marginTop: spacing.md, fontStyle: 'italic' },
});
