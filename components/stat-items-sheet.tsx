// What is behind a number.
//
// The Progress tab used to end with a long "Finished" list — everything you
// had completed, in one undifferentiated column below the stats that already
// counted it. This replaces it: hold a stat box and see the things that made
// that number, each one openable.
//
// Deliberately only opened by the boxes that have a list. Pages read and
// Sent to friends are counters with nothing behind them — nothing records
// which pages, or which sends — so those boxes do not respond to a hold. An
// empty sheet would be worse than no sheet.

import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { colors, fonts, spacing } from '@/constants/zand-theme';

export type StatItem = {
  key: string;
  title: string;
  sub?: string;
  route?: string;
  meta?: string;
};

export function StatItemsSheet({
  open,
  title,
  items,
  onClose,
}: {
  open: boolean;
  title: string;
  items: StatItem[];
  onClose: () => void;
}) {
  const go = (route?: string) => {
    onClose();
    if (route) router.navigate(route as any);
  };

  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={onClose}>
      {/* Backdrop behind rather than around: a Pressable wrapped round the
          sheet claims the drag and the list stops scrolling. */}
      <View style={s.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={s.sheet}>
          <View style={s.grab} />
          <View style={s.head}>
            <View style={{ flex: 1 }}>
              <Text style={s.title}>{title}</Text>
              <Text style={s.sub}>
                {items.length} {items.length === 1 ? 'thing' : 'things'}
              </Text>
            </View>
            <Pressable hitSlop={10} onPress={onClose}>
              <Ionicons name="close" size={22} color={colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: spacing.xxl, gap: spacing.sm }}
          >
            {items.map((it) => (
              <Pressable key={it.key} style={s.row} onPress={() => go(it.route)}>
                <View style={s.tick}>
                  <Ionicons name="checkmark" size={12} color="#FFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.rowT} numberOfLines={1}>{it.title}</Text>
                  {it.sub ? <Text style={s.rowS} numberOfLines={1}>{it.sub}</Text> : null}
                </View>
                {it.meta ? <Text style={s.meta}>{it.meta}</Text> : null}
                <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    maxHeight: '82%',
  },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: 24, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 13,
    padding: spacing.md,
  },
  tick: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  rowT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  rowS: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },
  meta: { fontFamily: fonts.body, fontSize: 10, color: colors.textSecondary },
});
