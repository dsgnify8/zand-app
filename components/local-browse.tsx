// Two ways into the directory that are not a scrolling row of chips.
//
// Fourteen categories in a horizontal rail means the fourteenth is
// effectively hidden, and a rail that scrolls sideways above a feed that
// scrolls down is two gestures fighting for the same thumb. One pill that
// opens a grid shows all of them at once and gives the feed its width back.
//
// The countries band is the only other door on this page, deliberately. The
// feed should be understandable at a glance; one clearly-marked way through
// to somewhere else is interesting, three is a menu.

import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { CATEGORIES, categoryLabel, type Business } from '@/lib/businesses';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

/* ------------------------------------------------------------------ *
 * A colour per category.
 *
 * Not decoration: fourteen identical grey icons in a grid are a wall of
 * sameness, and colour is the fastest way to find the one you want on the
 * second visit. Muted enough to sit inside the page's palette.
 * ------------------------------------------------------------------ */
const TINT: Record<string, string> = {
  restaurant: '#B4433F',
  cafe: '#8C6A3F',
  bakery: '#C08A33',
  grocery: '#6E8B4E',
  beauty: '#C4808B',
  clothing: '#7A6E9B',
  jewellery: '#B79246',
  repair: '#5E7A88',
  interior: '#8A7358',
  photo: '#4E6E7A',
  events: '#C46A8B',
  legal: '#5A6B7C',
  medical: '#4E8B7A',
  dental: '#5E9BA8',
};
const tintFor = (key: string) => TINT[key] ?? colors.accent;

/* ================================================================== *
 * The pill, and the sheet it opens
 * ================================================================== */

export function CategoryPill({
  value,
  onChange,
  counts,
}: {
  value: string | null;
  onChange: (key: string | null) => void;
  counts?: Record<string, number>;
}) {
  const fa = getLang() === 'fa';
  const [open, setOpen] = useState(false);
  const chosen = value ? CATEGORIES.find((c) => c.key === value) : null;

  return (
    <>
      <View style={[st.pillRow, fa && { flexDirection: 'row-reverse' }]}>
        <Pressable
          style={[st.pill, chosen && { borderColor: tintFor(chosen.key) }]}
          onPress={() => setOpen(true)}
        >
          {chosen ? (
            <Ionicons name={chosen.icon as any} size={14} color={tintFor(chosen.key)} />
          ) : (
            <Ionicons name="apps-outline" size={14} color={colors.textSecondary} />
          )}
          <Text style={[st.pillT, chosen && { color: colors.textPrimary }]}>
            {chosen ? categoryLabel(chosen.key, fa) : t(LOCAL.allCategories)}
          </Text>
          <Ionicons name="chevron-down" size={12} color={colors.textSecondary} />
        </Pressable>

        {/* Clearing is one tap, not a trip back into the sheet. */}
        {chosen ? (
          <Pressable hitSlop={10} style={st.clear} onPress={() => onChange(null)}>
            <Ionicons name="close" size={13} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      <Modal transparent visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        {/* Backdrop behind rather than around: a Pressable wrapped over a
            scroll view claims the drag. */}
        <View style={st.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />

          <View style={st.sheet}>
            <View style={st.grab} />
            <View style={[st.sheetHead, fa && { flexDirection: 'row-reverse' }]}>
              <Text style={st.sheetT}>{t(LOCAL.allCategories)}</Text>
              <Pressable hitSlop={10} onPress={() => setOpen(false)}>
                <Ionicons name="close" size={21} color={colors.textPrimary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.grid}>
              <Pressable
                style={[st.cell, !value && st.cellOn]}
                onPress={() => { onChange(null); setOpen(false); }}
              >
                <View style={[st.cellIcon, { borderColor: colors.textSecondary }]}>
                  <Ionicons name="apps-outline" size={19} color={colors.textSecondary} />
                </View>
                <Text style={st.cellT} numberOfLines={1}>{t(LOCAL.everything)}</Text>
              </Pressable>

              {CATEGORIES.map((c) => {
                const on = value === c.key;
                const n = counts?.[c.key] ?? 0;
                return (
                  <Pressable
                    key={c.key}
                    style={[st.cell, on && st.cellOn]}
                    onPress={() => { onChange(on ? null : c.key); setOpen(false); }}
                  >
                    <View style={[st.cellIcon, { borderColor: tintFor(c.key) }]}>
                      <Ionicons name={c.icon as any} size={19} color={tintFor(c.key)} />
                    </View>
                    <Text style={[st.cellT, fa && st.cellTFa]} numberOfLines={1}>
                      {categoryLabel(c.key, fa)}
                    </Text>
                    {n > 0 ? <Text style={st.cellN}>{n}</Text> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

/* ================================================================== *
 * The countries band
 * ================================================================== */

/**
 * country is free text on the row, so "Sweden", "sweden" and " SWEDEN "
 * would otherwise be three different countries. Grouped case-insensitively
 * and displayed using the first spelling seen.
 */
export function countriesFrom(items: Business[]) {
  const by = new Map<string, { label: string; n: number }>();
  for (const b of items) {
    const raw = (b.country ?? '').trim();
    if (!raw) continue;
    const key = raw.toLowerCase();
    const prev = by.get(key);
    by.set(key, { label: prev?.label ?? raw, n: (prev?.n ?? 0) + 1 });
  }
  return [...by.entries()]
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.n - a.n);
}

export function CountriesBand({
  items,
  onPick,
}: {
  items: Business[];
  onPick: (countryKey: string, label: string) => void;
}) {
  const fa = getLang() === 'fa';
  const { width: W } = useWindowDimensions();
  const list = useMemo(() => countriesFrom(items).slice(0, 6), [items]);

  if (list.length < 2) return null; // one country is not a choice

  return (
    <View style={st.band}>
      <Text style={[st.bandLabel, fa && st.rtl]}>{t(LOCAL.byCountry)}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={st.bandRow}
      >
        {list.map((c, i) => (
          <CountryName key={c.key} label={c.label} n={c.n} i={i} onPress={() => onPick(c.key, c.label)} />
        ))}
      </ScrollView>
    </View>
  );
}

/** Outlined until touched, then it fills. */
function CountryName({
  label, n, i, onPress,
}: { label: string; n: number; i: number; onPress: () => void }) {
  const fa = getLang() === 'fa';
  const v = useRef(new Animated.Value(0)).current;

  const to = (x: number) =>
    Animated.timing(v, { toValue: x, duration: 180, easing: Easing.out(Easing.quad), useNativeDriver: false }).start();

  return (
    <Pressable onPressIn={() => to(1)} onPressOut={() => to(0)} onPress={onPress} style={st.country}>
      <Animated.Text
        style={[
          st.countryT,
          {
            // Outlined type is not available in RN, so the effect comes from
            // colour: near-transparent ink at rest, solid on touch.
            color: v.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(40,28,25,0.22)', 'rgba(40,28,25,0.92)'],
            }) as any,
          },
        ]}
        numberOfLines={1}
      >
        {label.toUpperCase()}
      </Animated.Text>
      <Text style={[st.countryN, fa && st.rtl]}>
        {n} {t(n === 1 ? LOCAL.place : LOCAL.places)}
      </Text>
    </Pressable>
  );
}

const st = StyleSheet.create({
  /* pill */
  pillRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: spacing.md },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill ?? 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
  },
  pillT: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },
  clear: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },

  /* sheet */
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    maxHeight: '78%',
  },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  sheetHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  sheetT: { fontFamily: fonts.heading, fontSize: 24, color: colors.textPrimary },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: spacing.md, paddingBottom: spacing.xxl,
  },
  cell: {
    width: '30%', alignItems: 'center', paddingVertical: spacing.md,
    borderRadius: 16, borderWidth: 1, borderColor: 'transparent',
  },
  cellOn: { borderColor: colors.border, backgroundColor: colors.surface },
  cellIcon: {
    width: 46, height: 46, borderRadius: 23,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
    marginBottom: 7,
  },
  cellT: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textPrimary, textAlign: 'center' },
  cellTFa: { fontFamily: fonts.persian, fontSize: 12 },
  cellN: { fontFamily: fonts.body, fontSize: 9.5, color: colors.textSecondary, marginTop: 2 },

  /* countries */
  band: { marginTop: spacing.xl },
  bandLabel: {
    fontFamily: fonts.body, fontSize: 10, letterSpacing: 2,
    color: colors.textSecondary, marginBottom: spacing.sm,
  },
  bandRow: { gap: spacing.xl, paddingRight: spacing.lg, alignItems: 'flex-end' },
  country: {},
  countryT: {
    fontFamily: fonts.display,
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -1,
  },
  countryN: { fontFamily: fonts.body, fontSize: 10, letterSpacing: 1.4, color: colors.textSecondary },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
