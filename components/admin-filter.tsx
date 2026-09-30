// Narrowing a long admin list.
//
// Rows of chips were the old answer, and they do not survive growth: a
// chip per country is a line that runs off the screen, clips at the top
// of its scroller, and changes height as the set changes, which is where
// the jump above the results came from. One button of fixed height, and
// the choices in a sheet, holds its shape whether there are five
// countries or fifty.
//
// Counts are live. Every option shows how many rows you would get if you
// picked it, measured against the filters already on, and an option that
// would give you nothing is not offered at all. So the sheet never leads
// anywhere empty.

import { useMemo, useState } from 'react';
import {
  Modal, Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';

export type FilterGroup<T> = {
  /** Stable key. Also the key in the selection. */
  key: string;
  /** Heading in the sheet. */
  title: string;
  /** What "no choice made" is called here. */
  allLabel?: string;
  options: { value: string; label: string; indent?: boolean }[];
  /** Whether a row belongs to a chosen option. */
  match: (row: T, value: string) => boolean;
};

type Selection = Record<string, string | null>;

export type AdminFilterProps = {
  groups: {
    key: string;
    title: string;
    allLabel: string;
    chosen: string | null;
    chosenLabel: string | null;
    options: { value: string; label: string; indent?: boolean; n: number }[];
    all: number;
  }[];
  shownCount: number;
  total: number;
  /** What the rows are, for the count line. Singular. */
  noun: string;
  onPick: (group: string, value: string | null) => void;
  onClear: () => void;
};

/**
 * The state and the arithmetic. Returns the rows to draw and the props
 * for the bar, so a screen holds neither.
 */
export function useAdminFilter<T>(rows: T[], groups: FilterGroup<T>[]) {
  const [sel, setSel] = useState<Selection>({});

  const shown = useMemo(
    () => rows.filter((r) => groups.every((g) => !sel[g.key] || g.match(r, sel[g.key]!))),
    [rows, groups, sel],
  );

  // How many rows an option would leave, with the other filters kept.
  const countIf = (groupKey: string, value: string) =>
    rows.filter((r) =>
      groups.every((g) =>
        g.key === groupKey
          ? g.match(r, value)
          : !sel[g.key] || g.match(r, sel[g.key]!))).length;

  // And how many with this group's own choice dropped.
  const countWithout = (groupKey: string) =>
    rows.filter((r) =>
      groups.every((g) =>
        g.key === groupKey ? true : !sel[g.key] || g.match(r, sel[g.key]!))).length;

  const props: AdminFilterProps = {
    total: rows.length,
    shownCount: shown.length,
    noun: 'row',
    onPick: (group, value) => setSel((v) => ({ ...v, [group]: value })),
    onClear: () => setSel({}),
    groups: groups.map((g) => {
      const options = g.options
        .map((o) => ({ ...o, n: countIf(g.key, o.value) }))
        // Nothing behind it, and not the one already picked.
        .filter((o) => o.n > 0 || o.value === sel[g.key]);
      return {
        key: g.key,
        title: g.title,
        allLabel: g.allLabel ?? 'All',
        chosen: sel[g.key] ?? null,
        chosenLabel: options.find((o) => o.value === sel[g.key])?.label ?? null,
        options,
        all: countWithout(g.key),
      };
    }),
  };

  return { shown, props, selection: sel };
}

export function AdminFilter({
  groups, shownCount, total, noun, onPick, onClear,
}: AdminFilterProps) {
  const [open, setOpen] = useState(false);
  const active = groups.filter((g) => g.chosen);

  return (
    <>
      <View style={s.bar}>
        <Pressable
          style={[s.trigger, active.length > 0 && s.triggerOn]}
          onPress={() => setOpen(true)}
          hitSlop={6}
        >
          <Ionicons
            name="options-outline"
            size={13}
            color={active.length ? '#FFF' : colors.textSecondary}
          />
          <Text style={[s.triggerT, active.length > 0 && s.triggerTOn]}>
            {active.length ? active.map((g) => g.chosenLabel).join('  ·  ') : 'Filter'}
          </Text>
          <Ionicons
            name="chevron-down"
            size={12}
            color={active.length ? 'rgba(255,255,255,0.7)' : colors.textSecondary}
          />
        </Pressable>

        <Text style={s.count}>
          {shownCount === total
            ? `${total} ${noun}${total === 1 ? '' : 's'}`
            : `${shownCount} of ${total}`}
        </Text>
      </View>

      <Modal
        transparent
        visible={open}
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <View style={s.wrap}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />

          <View style={s.sheet}>
            <View style={s.grip} />

            <ScrollView contentContainerStyle={s.sheetBody} showsVerticalScrollIndicator={false}>
              {groups.map((g) => (
                <View key={g.key} style={s.group}>
                  <Text style={s.groupT}>{g.title}</Text>

                  <Row
                    label={g.allLabel}
                    n={g.all}
                    on={!g.chosen}
                    onPress={() => onPick(g.key, null)}
                  />
                  {g.options.map((o) => (
                    <Row
                      key={o.value}
                      label={o.label}
                      indent={o.indent}
                      n={o.n}
                      on={g.chosen === o.value}
                      onPress={() => onPick(g.key, g.chosen === o.value ? null : o.value)}
                    />
                  ))}
                </View>
              ))}
            </ScrollView>

            <View style={s.foot}>
              {active.length ? (
                <Pressable hitSlop={8} onPress={onClear}>
                  <Text style={s.clear}>Clear</Text>
                </Pressable>
              ) : <View />}
              <Pressable style={s.done} onPress={() => setOpen(false)}>
                <Text style={s.doneT}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function Row({
  label, n, on, indent, onPress,
}: { label: string; n: number; on: boolean; indent?: boolean; onPress: () => void }) {
  return (
    <Pressable style={[s.opt, indent && s.optIn]} onPress={onPress}>
      <Text
        style={[s.optT, indent && s.optTIn, on && s.optTOn]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Text style={s.optN}>{n}</Text>
      <Ionicons
        name={on ? 'checkmark' : 'chevron-forward'}
        size={on ? 15 : 13}
        color={on ? colors.accent : 'rgba(0,0,0,0.18)'}
      />
    </Pressable>
  );
}

const s = StyleSheet.create({
  // Fixed height. The row above the results is the one place a changing
  // height is felt, because everything below it moves.
  bar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    height: 44, paddingHorizontal: spacing.lg,
  },
  trigger: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingHorizontal: 12, height: 30,
    maxWidth: '74%',
  },
  triggerOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  triggerT: {
    fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary,
    flexShrink: 1,
  },
  triggerTOn: { color: '#FFF', fontFamily: fonts.bodyStrong },
  count: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary },

  wrap: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 22, borderTopRightRadius: 22,
    maxHeight: '78%', paddingBottom: spacing.lg,
  },
  grip: {
    width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.12)',
    alignSelf: 'center', marginTop: 10, marginBottom: 4,
  },
  sheetBody: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },

  group: { marginBottom: spacing.lg },
  groupT: {
    fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.8,
    textTransform: 'uppercase', color: colors.textSecondary, marginBottom: 2,
  },
  opt: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  optT: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary },
  // A country under its region. Set in from the edge and a shade quieter,
  // so the region names carry the structure.
  optIn: { paddingLeft: spacing.md },
  optTIn: { fontSize: 13, color: colors.textSecondary },
  optTOn: { fontFamily: fonts.bodyStrong, color: colors.accent },
  optN: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary },

  foot: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border,
  },
  clear: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },
  done: {
    backgroundColor: colors.textPrimary, borderRadius: radius.lg,
    paddingHorizontal: spacing.xl, paddingVertical: 11,
  },
  doneT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#FFF' },
});
