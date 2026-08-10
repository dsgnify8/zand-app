// Shown over the You tab when nobody is signed in.
//
// Deliberately light: the page underneath stays readable so a visitor
// sees what the profile becomes. Enough blur to signal "not yours",
// not so much that it hides the thing we are advertising.

import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { getLang } from '@/lib/i18n';

export function SignedOutOverlay() {
  const fa = getLang() === 'fa';

  return (
    <View style={s.wrap} pointerEvents="box-none">
      <BlurView intensity={8} tint="light" style={StyleSheet.absoluteFill} />
      <View style={s.veil} pointerEvents="none" />

      <BlurView intensity={80} tint="light" style={s.card}>
        <View style={s.cardEdge} pointerEvents="none" />

        <View style={s.icon}>
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          <Ionicons name="person-outline" size={16} color={colors.accent} />
        </View>

        <Text style={[s.title, fa && s.faTitle]}>
          {fa ? 'برای دیدن پروفایلت وارد شو' : 'Sign in to see your profile'}
        </Text>

        <Text style={[s.blurb, fa && s.faBlurb]}>
          {fa
            ? 'پیشرفت و ذخیره‌هایت، روی همهٔ دستگاه‌هایت.'
            : 'Your progress and saves, on every device.'}
        </Text>

        <Pressable style={s.primary} onPress={() => router.push('/onboarding?step=2' as any)}>
          <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
          <View style={s.primaryTint} pointerEvents="none" />
          <Text style={[s.primaryT, fa && s.faBtn]}>
            {fa ? 'ورود یا ثبت‌نام' : 'Sign in or create an account'}
          </Text>
        </Pressable>
      </BlurView>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, zIndex: 20 },
  veil: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(246,243,241,0.10)' },

  card: {
    width: '100%',
    maxWidth: 290,
    borderRadius: 22,
    overflow: 'hidden',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  cardEdge: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.85)',
    backgroundColor: 'rgba(255,255,255,0.52)',
  },

  icon: {
    width: 36, height: 36, borderRadius: 13,
    overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.sm,
  },

  title: { fontFamily: fonts.bodyStrong, fontSize: 15, letterSpacing: -0.2, color: colors.textPrimary, textAlign: 'center' },
  faTitle: { fontFamily: fonts.persian, fontSize: 15, lineHeight: 29 },

  blurb: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: colors.textSecondary, textAlign: 'center', marginTop: 4, marginBottom: spacing.md },
  faBlurb: { fontFamily: fonts.persian, fontSize: 12, lineHeight: 24, writingDirection: 'rtl' },

  primary: {
    alignSelf: 'stretch',
    borderRadius: radius.lg,
    overflow: 'hidden',
    paddingVertical: 11,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  primaryTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(201,162,39,0.16)' },
  primaryT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary },

  faBtn: { fontFamily: fonts.persian, fontSize: 13 },
});
