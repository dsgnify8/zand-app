import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { PERSIAN_ALPHABET, positionalForms, type PersianLetter } from '@/constants/persian-alphabet';
import { useProgress } from '@/lib/progress-store';
import { ZandHeader } from '@/components/zand-header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CARD_HEIGHT = 300;
const FORM_LABELS = [['FINAL', 'DETACHED'], ['FINAL', 'ATTACHED'], ['MEDIAL', ''], ['INITIAL', '']];

function FlipCard({ letter, index, width, height, letterSize, compact, flipped, onPress, onLongPress }: {
  letter: PersianLetter; index: number; width: number; height?: number; letterSize: number; compact?: boolean; flipped: boolean; onPress: () => void; onLongPress?: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: flipped ? 1 : 0, duration: 400, useNativeDriver: true }).start();
  }, [flipped, anim]);

  const frontRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  const forms = positionalForms(letter.char);
  const formValues = [forms.isolated, forms.final, forms.medial, forms.initial];
  const number = String(index + 1).padStart(2, '0');

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} delayLongPress={280} style={[styles.cardContainer, { width, height: height ?? CARD_HEIGHT }]}>
      <Animated.View style={[styles.face, styles.front, { transform: [{ perspective: 1000 }, { rotateY: frontRotate }] }]}>
        <View style={styles.frontTop}>
          <View style={styles.badge}><Text style={styles.badgeText}>{number}</Text></View>
          <View style={styles.diamond} />
        </View>
        <View style={styles.letterWrap}>
          <Text style={[styles.bigLetter, { fontSize: letterSize }]}>{letter.char}</Text>
        </View>
        {compact ? (
          <Text style={styles.compactName} numberOfLines={1}>{letter.name}</Text>
        ) : (
          <View style={styles.formsRow}>
            {formValues.map((form, i) => (
              <View key={i} style={[styles.formCol, i > 0 && styles.formColBorder]}>
                <Text style={styles.formLabelTop}>{FORM_LABELS[i][0]}</Text>
                {FORM_LABELS[i][1] ? <Text style={styles.formLabelBot}>{FORM_LABELS[i][1]}</Text> : null}
                <Text style={styles.formGlyph}>{form}</Text>
              </View>
            ))}
          </View>
        )}
      </Animated.View>

      <Animated.View style={[styles.face, styles.back, { transform: [{ perspective: 1000 }, { rotateY: backRotate }] }]}>
        <View style={styles.backTop}>
          <View style={[styles.badge, styles.badgeLight]}><Text style={[styles.badgeText, styles.badgeTextDark]}>{number}</Text></View>
          <Text style={styles.backChar}>{letter.char}</Text>
        </View>
        <Text style={styles.name}>{letter.name}</Text>
        <Text style={styles.sound}>/ {letter.sound} /</Text>
        {compact ? <Text style={styles.holdHint}>hold for the forms</Text> : null}
        {!compact ? <Text style={styles.backLabel}>HOW IT SOUNDS</Text> : null}
        {!compact && letter.note ? <Text style={styles.noteText}>{letter.note}</Text> : null}
        {!compact ? <View style={styles.backDivider} /> : null}
        {compact ? null : letter.exampleWord ? (
          <>
            <Text style={styles.backLabel}>ENGLISH EXAMPLE</Text>
            <Text style={styles.exampleText}>
              {letter.exampleWord}
              {letter.exampleHint ? <Text style={styles.exampleHint}>{'  ·  ' + letter.exampleHint}</Text> : null}
            </Text>
          </>
        ) : letter.exampleHint ? (
          <>
            <Text style={styles.backLabel}>HOW TO SAY IT</Text>
            <Text style={styles.exampleText}>{letter.exampleHint}</Text>
          </>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

function LetterSheet({ letter, onClose }: { letter: PersianLetter | null; onClose: () => void }) {
  if (!letter) return null;
  const forms = positionalForms(letter.char);
  const rows = [
    { label: 'INITIAL', glyph: forms.initial, note: 'at the start of a word' },
    { label: 'MEDIAL', glyph: forms.medial, note: 'in the middle' },
    { label: 'FINAL ATTACHED', glyph: forms.final, note: 'at the end, joined' },
    { label: 'FINAL DETACHED', glyph: forms.isolated, note: 'standing alone' },
  ];
  return (
    <Modal transparent visible={!!letter} animationType="fade" onRequestClose={onClose}>
      <Pressable style={sheetS.backdrop} onPress={onClose}>
        <Pressable style={sheetS.card} onPress={() => {}}>
          <Text style={sheetS.big}>{letter.char}</Text>
          <Text style={sheetS.name}>{letter.name}</Text>
          <Text style={sheetS.sound}>/ {letter.sound} /</Text>
          <View style={sheetS.rule} />
          {rows.map((r) => (
            <View key={r.label} style={sheetS.row}>
              <Text style={sheetS.glyph}>{r.glyph}</Text>
              <View style={{ flex: 1 }}>
                <Text style={sheetS.rowLabel}>{r.label}</Text>
                <Text style={sheetS.rowNote}>{r.note}</Text>
              </View>
            </View>
          ))}
          <Pressable style={sheetS.close} onPress={onClose}>
            <Text style={sheetS.closeT}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const sheetS = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(20,16,12,0.5)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { backgroundColor: lw.bg, borderRadius: 20, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg, width: '100%', maxWidth: 320, alignItems: 'center' },
  big: { fontFamily: fonts.persian, fontSize: 62, color: lw.ink, lineHeight: 80 },
  name: { fontFamily: fonts.heading, fontSize: 20, color: lw.ink, marginTop: 2 },
  sound: { fontFamily: fonts.body, fontSize: 14, color: lw.muted, marginTop: 2 },
  rule: { height: 1, alignSelf: 'stretch', backgroundColor: lw.hair, marginVertical: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, alignSelf: 'stretch', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: lw.hair },
  glyph: { fontFamily: fonts.persian, fontSize: 30, color: lw.green, width: 48, textAlign: 'center' },
  rowLabel: { fontFamily: fonts.bodyStrong, fontSize: 11, letterSpacing: 1.5, color: lw.ink },
  rowNote: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, marginTop: 2 },
  close: { marginTop: spacing.md, paddingVertical: spacing.sm, paddingHorizontal: spacing.xl },
  closeT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: lw.green },
});

export default function AlphabetScreen() {
  const { width } = useWindowDimensions();
  const { learnedLetters, markLetterLearned } = useProgress();
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const [view, setView] = useState<'list' | 'grid'>('grid');
  const [sheetLetter, setSheetLetter] = useState<PersianLetter | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const savedY = useRef(0);

  const autoColumns = width >= 1024 ? 3 : width >= 700 ? 2 : 1;
  const columns = view === 'grid' ? 2 : autoColumns;
  const gap = spacing.md;
  const contentWidth = width - spacing.lg * 2;
  const cardWidth = (contentWidth - gap * (columns - 1)) / columns;
  const letterSize = view === 'grid' ? 76 : columns === 1 ? 110 : columns === 2 ? 82 : 68;
  const cardHeight = view === 'grid' ? 190 : undefined;

  const total = PERSIAN_ALPHABET.length;
  const learnedCount = PERSIAN_ALPHABET.filter((l) => learnedLetters.includes(l.char)).length;
  const pct = Math.round((learnedCount / total) * 100);
  const mode = flipped.size === total ? 'names' : flipped.size === 0 ? 'letters' : 'mixed';

  const toggle = (i: number, char: string) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else { next.add(i); markLetterLearned(char); }
      return next;
    });

  const flipAllToNames = () => {
    setFlipped(new Set(PERSIAN_ALPHABET.map((_, i) => i)));
    PERSIAN_ALPHABET.forEach((l) => markLetterLearned(l.char));
  };
  const showLetters = () => setFlipped(new Set());

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={250}
        onScroll={(e) => {
          savedY.current = e.nativeEvent.contentOffset.y;
          AsyncStorage.setItem('K_ALPHA_SCROLL', String(savedY.current)).catch(() => {});
        }}
        onLayout={() => {
          AsyncStorage.getItem('K_ALPHA_SCROLL').then((v) => {
            const y = Number(v ?? 0);
            if (y > 40) setTimeout(() => scrollRef.current?.scrollTo({ y, animated: false }), 80);
          }).catch(() => {});
        }}
      >
        <Pressable style={styles.backBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={20} color={lw.muted} />
          <Text style={styles.backBtnText}>Learn</Text>
        </Pressable>

        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Persian Alphabet</Text>
            <Text style={styles.headerGlyph}>الفبا</Text>
          </View>
          <Text style={styles.headerSub}>34 letters · four positional forms</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: (pct + '%') as any }]} />
          </View>
        </View>

        <View style={styles.toggles}>
          <Pressable style={[styles.toggle, mode === 'names' && styles.toggleActive]} onPress={flipAllToNames}>
            <Text style={[styles.toggleText, mode === 'names' && styles.toggleTextActive]}>Flip all to names</Text>
          </Pressable>
          <Pressable style={[styles.toggle, mode === 'letters' && styles.toggleActive]} onPress={showLetters}>
            <Text style={[styles.toggleText, mode === 'letters' && styles.toggleTextActive]}>Show letters</Text>
          </Pressable>
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.helper}>Tap any card to flip it</Text>
          <View style={styles.viewToggle}>
            <Pressable style={[styles.viewBtn, view === 'list' && styles.viewBtnOn]} onPress={() => setView('list')}>
              <Ionicons name="square-outline" size={15} color={view === 'list' ? lw.surface : lw.muted} />
            </Pressable>
            <Pressable style={[styles.viewBtn, view === 'grid' && styles.viewBtnOn]} onPress={() => setView('grid')}>
              <Ionicons name="grid-outline" size={15} color={view === 'grid' ? lw.surface : lw.muted} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.grid, { gap }]}>
          {PERSIAN_ALPHABET.map((letter, i) => (
            <FlipCard
              key={letter.char}
              letter={letter}
              index={i}
              width={cardWidth}
              height={cardHeight}
              compact={view === 'grid'}
              letterSize={letterSize}
              flipped={flipped.has(i)}
              onPress={() => toggle(i, letter.char)}
              onLongPress={() => setSheetLetter(letter)}
            />
          ))}
        </View>

        <View style={styles.rtlNote}>
          <Text style={styles.rtlNoteText}>
            Reading runs right to left, so a letter’s initial form sits at the right of a word and its
            final form at the left. A few letters — ا د ذ ر ز ژ و — never join to the letter that follows.
          </Text>
        </View>
      </ScrollView>
      <LetterSheet letter={sheetLetter} onClose={() => setSheetLetter(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  holdHint: { fontFamily: fonts.body, fontSize: 10, color: lw.muted, opacity: 0.6, marginTop: spacing.sm },
  compactName: { fontFamily: fonts.bodyStrong, fontSize: 12, letterSpacing: 0.5, color: lw.muted, textAlign: 'center', paddingBottom: spacing.md },
  viewRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  viewToggle: { flexDirection: 'row', gap: 4, backgroundColor: lw.surface, borderRadius: 10, padding: 3, borderWidth: 1, borderColor: lw.hair },
  viewBtn: { paddingVertical: 5, paddingHorizontal: 9, borderRadius: 8 },
  viewBtnOn: { backgroundColor: lw.green },
  safe: { flex: 1, backgroundColor: lw.bg },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: lw.muted },

  headerCard: { backgroundColor: lw.green, borderRadius: radius.lg, padding: spacing.lg },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  headerGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: lw.surface },
  headerTitle: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: lw.surface, flexShrink: 1 },
  headerSub: { fontFamily: fonts.body, fontSize: fontSize.sm, color: 'rgba(255,255,255,0.75)', marginTop: spacing.md },
  progressTrack: { height: 6, borderRadius: radius.pill, backgroundColor: 'rgba(255,255,255,0.25)', marginTop: spacing.md, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: radius.pill, backgroundColor: lw.surface },
  progressText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 1, color: 'rgba(255,255,255,0.85)', marginTop: spacing.sm },

  toggles: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  toggle: { paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.lg, borderRadius: radius.pill, borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface },
  toggleActive: { backgroundColor: lw.green, borderColor: lw.green },
  toggleText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: lw.muted },
  toggleTextActive: { color: lw.surface },

  helper: { fontFamily: fonts.body, fontSize: fontSize.sm, color: lw.muted, marginTop: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.md },

  cardContainer: { marginBottom: 0 },
  face: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: radius.lg, backfaceVisibility: 'hidden', overflow: 'hidden' },
  front: { backgroundColor: lw.surface, borderWidth: 1, borderColor: lw.hair, paddingTop: spacing.md },
  frontTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md },
  badge: { backgroundColor: lw.green, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  badgeLight: { backgroundColor: 'rgba(255,255,255,0.9)' },
  badgeText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, color: lw.surface },
  badgeTextDark: { color: lw.green },
  diamond: { width: 8, height: 8, backgroundColor: lw.hair, transform: [{ rotate: '45deg' }] },
  letterWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bigLetter: { fontFamily: fonts.persian, color: lw.ink },
  formsRow: { flexDirection: 'row', backgroundColor: lw.bg, borderTopWidth: 1, borderTopColor: lw.hair },
  formCol: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  formColBorder: { borderLeftWidth: 1, borderLeftColor: lw.hair },
  formLabelTop: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 0.5, color: lw.green },
  formLabelBot: { fontFamily: fonts.body, fontSize: 8, letterSpacing: 0.5, color: lw.muted },
  formGlyph: { fontFamily: fonts.persian, fontSize: 26, color: lw.ink, marginTop: 4 },

  back: { backgroundColor: lw.green, padding: spacing.lg },
  backTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  backChar: { fontFamily: fonts.persian, fontSize: fontSize.xl, color: 'rgba(255,255,255,0.5)' },
  name: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: lw.surface, marginTop: spacing.lg },
  sound: { fontFamily: fonts.body, fontSize: fontSize.xl, color: lw.surface, marginTop: spacing.md },
  backLabel: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: 'rgba(255,255,255,0.6)', marginTop: spacing.xs },
  noteText: { fontFamily: fonts.body, fontSize: fontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: spacing.xs },
  backDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.18)', marginVertical: spacing.md },
  exampleText: { fontFamily: fonts.body, fontSize: fontSize.base, color: lw.surface, marginTop: 2 },
  exampleHint: { color: 'rgba(255,255,255,0.7)' },

  rtlNote: { marginTop: spacing.xl, paddingHorizontal: spacing.xs },
  rtlNoteText: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 22, color: lw.muted },
});
