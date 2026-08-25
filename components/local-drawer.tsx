// The way into the rest of Local.
//
// Half-width and sliding rather than a full takeover: there are three rows
// in it, and a full-screen menu for three rows makes going back feel like
// leaving. The feed staying visible behind means the drawer reads as a
// detour rather than a departure.
//
// Backdrop tap closes; so does picking anything, before the navigation
// happens, so the panel is never still on screen under the new page.

import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

export type DrawerPick = 'country' | 'category' | 'list';

const ROWS: { key: DrawerPick; icon: string; label: any; sub: any }[] = [
  { key: 'country', icon: 'earth-outline', label: LOCAL.byCountryTitle, sub: LOCAL.byCountryX },
  { key: 'category', icon: 'grid-outline', label: LOCAL.byCategoryTitle, sub: LOCAL.byCategoryX },
  { key: 'list', icon: 'add-circle-outline', label: LOCAL.listBusiness, sub: LOCAL.listBusinessX },
];

export function LocalDrawer({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (k: DrawerPick) => void;
}) {
  const fa = getLang() === 'fa';
  const { width: W } = useWindowDimensions();
  const panel = Math.min(340, W * 0.78);

  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: open ? 1 : 0,
      duration: open ? 260 : 200,
      easing: open ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [open]);

  // In Persian the drawer comes from the right, since that is where the
  // menu control sits and where the eye starts.
  const from = fa ? panel : -panel;

  const pick = (k: DrawerPick) => {
    onClose();
    // Let the panel start closing before the route changes, so it is not
    // still sitting on screen underneath the new page.
    setTimeout(() => onPick(k), 160);
  };

  // Nothing mounted at all when closed, so it cannot eat touches.
  if (!open && (slide as any).__getValue?.() === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={open ? 'auto' : 'none'}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: slide }]}>
        <Pressable style={[StyleSheet.absoluteFill, st.scrim]} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          st.panel,
          fa ? { right: 0, borderTopLeftRadius: 22, borderBottomLeftRadius: 22 }
             : { left: 0, borderTopRightRadius: 22, borderBottomRightRadius: 22 },
          {
            width: panel,
            transform: [
              { translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) },
            ],
          },
        ]}
      >
        <BlurView intensity={38} tint="light" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, st.veil]} />
        <View style={st.inner}>
          <Text style={[st.kicker, fa && st.rtl]}>{fa ? 'محلی' : 'LOCAL'}</Text>

          {ROWS.map((r) => (
            <Pressable
              key={r.key}
              style={[st.row, fa && { flexDirection: 'row-reverse' }]}
              onPress={() => pick(r.key)}
            >
              <View style={st.rowIcon}>
                <Ionicons name={r.icon as any} size={18} color={colors.accent} />
              </View>
              <View style={[{ flex: 1 }, fa && { alignItems: 'flex-end' }]}>
                <Text style={[st.rowT, fa && st.rtl]}>{t(r.label)}</Text>
                <Text style={[st.rowX, fa && st.rtl]} numberOfLines={1}>{t(r.sub)}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const st = StyleSheet.create({
  scrim: { backgroundColor: 'rgba(24,18,14,0.42)' },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    // Glass, not a panel: a little of the feed reads through so the drawer
    // feels laid over the page rather than replacing it.
    overflow: 'hidden',
    shadowColor: '#2A1A14',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 16,
  },
  veil: { backgroundColor: 'rgba(250,247,243,0.72)' },
  inner: { paddingTop: 90, paddingHorizontal: spacing.lg, gap: spacing.xs },

  kicker: {
    fontFamily: fonts.bodyStrong,
    fontSize: 10,
    letterSpacing: 2.4,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  rowIcon: {
    width: 38, height: 38, borderRadius: 19,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  rowT: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary },
  rowX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
