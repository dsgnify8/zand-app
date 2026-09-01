import { useState } from 'react';
import { getLang, useLang } from '@/lib/i18n';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { BlurView } from 'expo-blur';

import { colors, fonts, spacing } from '@/constants/zand-theme';

const EXPLORE_SECTIONS = [
  // What Explore actually holds. Education and Videos were sections from
  // an earlier shape of the page and led to places nobody arrives at now.
  { label: 'History', fa: 'تاریخ', route: '/education/history', icon: 'hourglass-outline' },
  { label: 'Geography', fa: 'جغرافیا', route: '/geography', icon: 'map-outline' },
  { label: 'Poets', fa: 'شاعران', route: '/literature', icon: 'book-outline' },
  { label: 'Culture', fa: 'فرهنگ', route: '/culture', icon: 'color-palette-outline' },
] as const;

const LINKS = [
  { key: 'home', label: 'Home', persian: 'خانه', route: '/', icon: 'home-outline' },
  { key: 'learn', label: 'Learn Persian', persian: 'فارسی یاد بگیر', route: '/learn', icon: 'book-outline' },
  { key: 'explore', label: 'Explore', persian: 'کشف', route: '/explore', icon: 'compass-outline', expandable: true },
  { key: 'local', label: 'Local', persian: 'محلی', route: '/local', icon: 'storefront-outline' },
  { key: 'profile', label: 'Profile', persian: 'حساب', route: '/profile', icon: 'person-outline' },
] as const;

export default function MenuScreen() {
  useLang();
  const fa = getLang() === 'fa';
  const [openExplore, setOpenExplore] = useState(false);

  const go = (route: string) => {
    (router.canGoBack() ? router.back() : router.replace('/'));
    requestAnimationFrame(() => router.navigate(route as any));
  };

  return (
    <View style={styles.overlay}>
      {/* tap the top area to dismiss */}
      <Pressable style={styles.dismiss} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />

      <View style={styles.sheet}>
        {/* The page underneath, faintly. */}
        <BlurView intensity={34} tint="light" style={StyleSheet.absoluteFill} />
        <SafeAreaView edges={['bottom']}>
          <View style={styles.grab} />

          <View style={styles.topRow}>
            <Text style={styles.wordmark}>ZAND</Text>
            <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
            {LINKS.map((l) => (
              <View key={l.key}>
                <Pressable
                  style={styles.row}
                  onPress={() => (l as any).expandable ? setOpenExplore((v) => !v) : go(l.route)}
                >
                  <Ionicons name={l.icon as any} size={20} color={colors.textSecondary} />
                  <Text style={styles.rowLabel}>{fa ? l.persian : l.label}</Text>
                  {(l as any).expandable ? (
                    <Ionicons name={openExplore ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textSecondary} />
                  ) : (
                    <Text style={styles.rowGlyph}>{fa ? '' : l.persian}</Text>
                  )}
                </Pressable>

                {(l as any).expandable && openExplore ? (
                  <View style={styles.subList}>
                    {EXPLORE_SECTIONS.map((sct) => (
                      <Pressable key={sct.route} style={styles.subRow} onPress={() => go(sct.route)}>
                        <Ionicons name={sct.icon as any} size={18} color={colors.textSecondary} />
                        <Text style={styles.subLabel}>{fa ? (sct as any).fa : sct.label}</Text>
                        <Ionicons name="arrow-forward" size={15} color={colors.textSecondary} />
                      </Pressable>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerMark}>ZAND</Text>
            <Text style={styles.footerTag}>ROOTED LIVING</Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(20,16,12,0.28)', justifyContent: 'flex-end' },
  dismiss: { flex: 1 },
  sheet: {
    // Translucent over a blur, so the page it covers is still faintly
    // there. A solid panel makes the menu feel like a different screen.
    backgroundColor: 'rgba(250,247,243,0.94)',
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  wordmark: { fontFamily: fonts.wordmark, fontSize: 18, letterSpacing: 4, color: colors.textPrimary },

  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary },
  rowGlyph: { fontFamily: fonts.persian, fontSize: 14.5, color: colors.accent },

  subList: { backgroundColor: colors.surface, borderRadius: 12, marginTop: spacing.sm, marginBottom: spacing.sm, paddingHorizontal: spacing.md },
  // The same row as everything else in the menu, indented and a shade
  // darker. Boxing them made them look like a different component
  // dropped into the middle of a list.
  subRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: spacing.md, paddingLeft: spacing.xl,
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  subLabel: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary },

  footer: { paddingVertical: spacing.lg, alignItems: 'center' },
  footerMark: { fontFamily: fonts.wordmark, fontSize: 13, letterSpacing: 4, color: colors.textSecondary },
  footerTag: { fontFamily: fonts.body, fontSize: 10, letterSpacing: 3, color: colors.textSecondary, marginTop: spacing.xs },
});
