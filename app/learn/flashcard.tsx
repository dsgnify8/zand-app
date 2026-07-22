import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { findDeck } from '@/constants/flashcards';
import { useProgress } from '@/lib/progress-store';
import { useSRS, cardId } from '@/lib/srs-store';

export default function DeckStudyScreen() {
  const { deck: deckKey } = useLocalSearchParams<{ deck: string }>();
  const deck = findDeck(deckKey);
  const { markActivity } = useProgress();
  const { ready, isDue, review } = useSRS();

  const [queue, setQueue] = useState<number[] | null>(null);
  const [reviewingAll, setReviewingAll] = useState(false);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const anim = useRef(new Animated.Value(0)).current;
  const applied = useRef(false);

  useEffect(() => { markActivity(); }, [markActivity]);

  useEffect(() => {
    if (deck && ready && queue === null) {
      const all = deck.cards.map((_, i) => i);
      const due = all.filter((i) => isDue(cardId(deck.key, deck.cards[i].fa)));
      setReviewingAll(due.length === 0);
      setQueue(due.length ? due : all);
    }
  }, [deck, ready, queue, isDue]);

  const total = queue?.length ?? 0;
  const done = queue !== null && pos >= total;
  const idx = queue && !done && pos < total ? queue[pos] : -1;
  const card = deck && idx >= 0 ? deck.cards[idx] : null;

  useEffect(() => {
    if (deck && queue && done && !applied.current) {
      applied.current = true;
      Object.entries(results).forEach(([i, g]) => review(cardId(deck.key, deck.cards[+i].fa), g));
    }
  }, [done, deck, queue]);

  const flip = () => {
    const to = flipped ? 0 : 1;
    setFlipped(!flipped);
    Animated.timing(anim, { toValue: to, duration: 350, useNativeDriver: true }).start();
  };
  const grade = (gotIt: boolean) => {
    setResults((r) => ({ ...r, [idx]: gotIt }));
    setFlipped(false); anim.setValue(0); setPos((p) => p + 1);
  };
  const goBack = () => { if (pos > 0) { setFlipped(false); anim.setValue(0); setPos((p) => p - 1); } };

  const reviewMissed = () => {
    const missed = Object.entries(results).filter(([, g]) => !g).map(([i]) => +i);
    applied.current = false; setResults({}); setQueue(missed); setPos(0); setFlipped(false); anim.setValue(0);
  };
  const restart = () => {
    applied.current = false; setResults({}); setQueue(deck!.cards.map((_, i) => i)); setReviewingAll(true);
    setPos(0); setFlipped(false); anim.setValue(0);
  };

  const frontRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const progress = total > 0 ? Math.round((pos / total) * 100) : 0;
  const knownCount = Object.values(results).filter(Boolean).length;
  const missedCount = Object.values(results).filter((g) => !g).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      {!deck ? (
        <View style={styles.center}><Text style={styles.notFound}>Deck not found.</Text></View>
      ) : queue === null ? (
        <View style={styles.center}><ActivityIndicator color={colors.accent} /></View>
      ) : (
        <View style={styles.container}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
            <Text style={styles.backBtnText}>Flashcards</Text>
          </Pressable>

          <View style={styles.titleRow}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.glyph}>{deck.persian}</Text>
          </View>

          {!done ? (
            <>
              <View style={styles.progressTrack}><View style={[styles.progressFill, { width: (progress + '%') as any }]} /></View>
              <View style={styles.counterRow}>
                <Text style={styles.counter}>
                  {pos + 1} of {total}{reviewingAll ? '  ·  reviewing all' : '  ·  due today'}
                </Text>
                <Pressable style={[styles.prevBtn, pos === 0 && styles.prevDisabled]} onPress={goBack} disabled={pos === 0}>
                  <Ionicons name="arrow-undo" size={15} color={pos === 0 ? colors.border : colors.textSecondary} />
                  <Text style={[styles.prevText, pos === 0 && styles.prevTextDisabled]}>Previous</Text>
                </Pressable>
              </View>

              <Pressable style={styles.cardArea} onPress={flip}>
                <Animated.View style={[styles.face, styles.front, { transform: [{ perspective: 1000 }, { rotateY: frontRotate }] }]}>
                  <Text style={styles.fa}>{card!.fa}</Text>
                  {card!.symbol ? <Text style={styles.symbol}>{card!.symbol}</Text> : null}
                  <Text style={styles.tapHint}>tap to reveal</Text>
                </Animated.View>
                <Animated.View style={[styles.face, styles.back, { transform: [{ perspective: 1000 }, { rotateY: backRotate }] }]}>
                  {card!.symbol ? <Text style={styles.backSymbol}>{card!.symbol}</Text> : null}
                  <Text style={styles.translit}>{card!.translit}</Text>
                  <Text style={styles.en}>{card!.en}</Text>
                  {card!.note ? <Text style={styles.note}>{card!.note}</Text> : null}
                </Animated.View>
              </Pressable>

              <View style={styles.actions}>
                <Pressable style={[styles.actionBtn, styles.learningBtn]} onPress={() => grade(false)}>
                  <Ionicons name="refresh" size={18} color={colors.textSecondary} />
                  <Text style={styles.learningText}>Still learning</Text>
                </Pressable>
                <Pressable style={[styles.actionBtn, styles.knownBtn]} onPress={() => grade(true)}>
                  <Ionicons name="checkmark" size={18} color={colors.surface} />
                  <Text style={styles.knownText}>Got it</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <View style={styles.summary}>
              <Text style={styles.summaryGlyph}>آفرین</Text>
              <Text style={styles.summaryTitle}>Session complete</Text>
              <Text style={styles.summaryLine}>{knownCount} known · {missedCount} to review</Text>
              {missedCount > 0 ? (
                <Pressable style={styles.primaryBtn} onPress={reviewMissed}>
                  <Text style={styles.primaryText}>Review {missedCount} still learning</Text>
                </Pressable>
              ) : null}
              <Pressable style={styles.secondaryBtn} onPress={restart}><Text style={styles.secondaryText}>Study whole deck</Text></Pressable>
              <Pressable style={styles.secondaryBtn} onPress={() => router.back()}><Text style={styles.secondaryText}>Back to decks</Text></Pressable>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const CARD_HEIGHT = 330;
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: spacing.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.sm },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: colors.accent },
  progressTrack: { height: 6, borderRadius: radius.pill, backgroundColor: colors.border, marginTop: spacing.lg, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: radius.pill, backgroundColor: colors.accent },
  counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  counter: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 1, color: colors.textSecondary },
  prevBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  prevDisabled: { opacity: 0.5 },
  prevText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.textSecondary },
  prevTextDisabled: { color: colors.border },
  cardArea: { height: CARD_HEIGHT, marginTop: spacing.lg },
  face: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden', padding: spacing.lg },
  front: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  back: { backgroundColor: colors.accent },
  fa: { fontFamily: fonts.persian, fontSize: 60, color: colors.textPrimary, textAlign: 'center' },
  symbol: { fontFamily: fonts.persian, fontSize: 40, color: colors.accent, marginTop: spacing.sm },
  backSymbol: { fontFamily: fonts.persian, fontSize: 34, color: 'rgba(255,255,255,0.7)', marginBottom: spacing.sm },
  tapHint: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, position: 'absolute', bottom: spacing.lg },
  translit: { fontFamily: fonts.body, fontSize: fontSize.xl, color: 'rgba(255,255,255,0.85)' },
  en: { fontFamily: fonts.heading, fontSize: fontSize.display, color: colors.surface, textAlign: 'center', marginTop: spacing.sm },
  note: { fontFamily: fonts.body, fontSize: fontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: spacing.md, textAlign: 'center' },
  actions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: radius.pill },
  learningBtn: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  learningText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.textSecondary },
  knownBtn: { backgroundColor: colors.accent },
  knownText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.surface },
  summary: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  summaryGlyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: colors.accent },
  summaryTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary, marginTop: spacing.sm },
  summaryLine: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary, marginTop: spacing.xs, marginBottom: spacing.xl },
  primaryBtn: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, marginTop: spacing.sm },
  primaryText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.surface },
  secondaryBtn: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, marginTop: spacing.sm },
  secondaryText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: colors.textSecondary },
});
