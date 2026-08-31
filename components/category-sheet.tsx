// Choosing a category, quietly.
//
// Text in thin outlined boxes, no icons, small. There are fourteen of
// these and they are a filter rather than a destination — an icon apiece
// turns a list you scan into a wall you have to read one by one, and at
// this size the words are faster than the pictures anyway.
//
// Opens from the bottom because the control that opens it is near the
// bottom of the reader's reach.

import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';

import { fonts, spacing } from '@/constants/zand-theme';
import { CATEGORIES, categoryLabel } from '@/lib/businesses';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

/** The control that opens it. Deliberately small and quiet. */
export function CategoryBar({
  value,
  counts,
  dark,
  onPress,
  onClear,
}: {
  /** Empty means everything. */
  value: string[];
  counts?: Record<string, number>;
  dark?: boolean;
  onPress: () => void;
  onClear: () => void;
}) {
  const fa = getLang() === 'fa';
  const ink = dark ? 'rgba(246,241,236,0.78)' : 'rgba(40,28,24,0.72)';
  const line = dark ? 'rgba(246,241,236,0.22)' : 'rgba(40,28,24,0.18)';

  return (
    <View style={[st.barRow, fa && { flexDirection: 'row-reverse' }]}>
      <Pressable style={[st.bar, { borderColor: line }]} onPress={onPress}>
        <Text style={[st.barT, { color: '#F6F1EC' }]}>
          {value.length === 0
            ? t(LOCAL.categories)
            : value.length === 1
              ? categoryLabel(value[0], fa)
              : t(LOCAL.categories) + '  ' + value.length}
        </Text>
      </Pressable>
      {value.length > 0 ? (
        <Pressable hitSlop={10} onPress={onClear} style={[st.bar, { borderColor: line }]}>
          <Text style={[st.barT, { color: '#F6F1EC' }]}>×</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function CategorySheet({
  open,
  value,
  counts,
  onPick,
  onClose,
}: {
  open: boolean;
  /** Empty means everything. */
  value: string[];
  counts?: Record<string, number>;
  onPick: (keys: string[]) => void;
  onClose: () => void;
}) {
  const fa = getLang() === 'fa';
  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) rise.setValue(0);
    Animated.timing(rise, {
      toValue: open ? 1 : 0,
      duration: open ? 240 : 160,
      easing: open ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [open]);

  if (!open) return null;

  // Only what is actually there. A category with nothing in it is a dead
  // choice dressed up as a live one.
  const shown = counts
    ? CATEGORIES.filter((c) => (counts[c.key] ?? 0) > 0)
    : CATEGORIES;

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
      <View style={st.wrap}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View
          style={[
            st.sheet,
            {
              transform: [{
                translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [260, 0] }),
              }],
            },
          ]}
        >
          {/* The same material as the drawer: blur with a dark veil, so
              the two overlays in Local read as one thing. */}
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, st.veil]} />

          <View style={st.grab} />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.boxes}>
            <Pressable
              style={[st.box, value.length === 0 && st.boxOn]}
              onPress={() => onPick([])}
            >
              <Text style={[st.boxT, value.length === 0 && st.boxTOn, fa && st.boxTFa]}>
                {t(LOCAL.everything)}
              </Text>
            </Pressable>

            {shown.map((c) => {
              const on = value.includes(c.key);
              const n = counts?.[c.key];
              return (
                <Pressable
                  key={c.key}
                  style={[st.box, on && st.boxOn]}
                  // Stays open: picking several is the point, and closing
                  // after each would make two choices feel like a fight.
                  onPress={() =>
                    onPick(on ? value.filter((k) => k !== c.key) : [...value, c.key])
                  }
                >
                  <Text style={[st.boxT, on && st.boxTOn, fa && st.boxTFa]}>
                    {categoryLabel(c.key, fa)}
                    {n ? <Text style={st.boxN}>{'  ' + n}</Text> : null}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const st = StyleSheet.create({
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  // Dark box, light text. An outlined control on a cream page reads as
  // an empty field waiting to be filled rather than a thing to press.
  bar: {
    backgroundColor: 'rgba(28,20,17,0.92)',
    borderWidth: 0,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  barT: { fontFamily: fonts.body, fontSize: 11, letterSpacing: 0.2 },

  wrap: { flex: 1, backgroundColor: 'rgba(16,13,12,0.18)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    maxHeight: '62%',
  },
  grab: {
    width: 34, height: 3.5, borderRadius: 2,
    backgroundColor: 'rgba(40,28,24,0.16)',
    alignSelf: 'center', marginBottom: spacing.lg,
  },

  boxes: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, paddingBottom: spacing.md },
  box: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(40,28,24,0.18)',
    borderRadius: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  boxOn: { borderColor: 'rgba(40,28,24,0.75)', backgroundColor: 'rgba(40,28,24,0.05)' },
  boxT: { fontFamily: fonts.body, fontSize: 11.5, color: 'rgba(40,28,24,0.88)' },
  boxTOn: { color: 'rgba(40,28,24,0.95)' },
  boxTFa: { fontFamily: fonts.persian, fontSize: 12 },
  veil: { backgroundColor: 'rgba(250,247,243,0.62)' },
  boxN: { fontSize: 10, color: 'rgba(40,28,24,0.38)' },
});
