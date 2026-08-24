import { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { HISTORY_ERAS } from '@/constants/education';

import { useLang } from '@/lib/i18n';
type Node = { name: string; persian?: string; years: string; topicKey?: string; era: string };

function flat(): Node[] {
  const out: Node[] = [];
  HISTORY_ERAS.forEach((g) => g.entries.forEach((e) => out.push({ ...e, era: g.group })));
  return out;
}

function shortYears(y: string) {
  return y.replace(/\s*[–-]\s*/, '–').replace(/\s?(BCE|CE)/g, '');
}

function Node({ n, i }: { n: Node; i: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fade = useRef(new Animated.Value(0)).current;
  const open = !!n.topicKey;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 380, delay: i * 55, useNativeDriver: true }).start();
  }, []);

  const high = i % 2 === 0;

  return (
    <Animated.View style={{ opacity: fade }}>
      <Pressable
        style={styles.node}
        disabled={!open}
        onPress={() => n.topicKey && router.navigate('/education/topic?topic=' + n.topicKey as any)}
      >
        <View style={[styles.labelWrap, high ? styles.labelTop : styles.labelBottomSpace]}>
          {high ? (
            <>
              <Text style={[styles.name, !open && styles.dimText]} numberOfLines={2}>{n.name}</Text>
              <Text style={styles.years}>{shortYears(n.years)}</Text>
            </>
          ) : null}
        </View>

        <View style={styles.railRow}>
          <View style={[styles.stem, high ? styles.stemUp : styles.stemDown, !open && styles.stemDim]} />
        </View>

        <View style={styles.dotRow}>
          <View style={[styles.dotOuter, open && styles.dotOuterOn]}>
            <View style={[styles.dotInner, open ? styles.dotOn : styles.dotOff]} />
          </View>
        </View>

        <View style={[styles.labelWrap, !high ? styles.labelBottom : styles.labelTopSpace]}>
          {!high ? (
            <>
              <Text style={[styles.name, !open && styles.dimText]} numberOfLines={2}>{n.name}</Text>
              <Text style={styles.years}>{shortYears(n.years)}</Text>
            </>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function HistoryTimeline() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const nodes = flat();
  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>THE THREAD OF TIME</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.inner}
      >
        <View style={styles.rail} />
        {nodes.map((n, i) => <Node key={n.name} n={n} i={i} />)}
      </ScrollView>
    </View>
  );
}

const NODE_W = 96;
const RAIL_Y = 92;

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.lg },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2.5, color: colors.textSecondary, marginBottom: spacing.sm },
  scroll: { marginHorizontal: -spacing.lg },
  inner: { paddingHorizontal: spacing.lg, height: 186, alignItems: 'flex-start' },

  rail: { position: 'absolute', left: 0, right: 0, top: RAIL_Y, height: 1, backgroundColor: colors.border },

  node: { width: NODE_W, alignItems: 'center' },

  labelWrap: { width: NODE_W, height: 62, justifyContent: 'flex-end', paddingHorizontal: 2 },
  labelTop: { justifyContent: 'flex-end' },
  labelBottom: { justifyContent: 'flex-start', paddingTop: spacing.xs },
  labelTopSpace: {},
  labelBottomSpace: {},

  name: { fontFamily: fonts.heading, fontSize: 13, lineHeight: 16, color: colors.textPrimary, textAlign: 'center' },
  years: { fontFamily: fonts.body, fontSize: 9, color: colors.textSecondary, textAlign: 'center', marginTop: 1 },
  dimText: { color: colors.textSecondary },

  railRow: { height: 16, justifyContent: 'center' },
  stem: { width: 1, height: 16, backgroundColor: colors.accent, opacity: 0.5 },
  stemUp: {},
  stemDown: {},
  stemDim: { backgroundColor: colors.border, opacity: 1 },

  dotRow: { height: 14, justifyContent: 'center' },
  dotOuter: { width: 14, height: 14, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  dotOuterOn: { borderWidth: 1, borderColor: colors.accent },
  dotInner: { width: 6, height: 6, borderRadius: 3 },
  dotOn: { backgroundColor: colors.accent },
  dotOff: { backgroundColor: colors.border },
});
