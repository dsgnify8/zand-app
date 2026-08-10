// Shown over the You tab when nobody is signed in.
//
// The page underneath keeps rendering its demo content, so a new user
// sees what the profile becomes rather than an empty state. We blur it
// and float a card on top. The preview is deliberately still legible —
// enough to be enticing, not enough to be mistaken for their own data.

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
      <BlurView intensity={38} tint="light" style={StyleSheet.absoluteFill} />
      <View style={s.veil} pointerEvents="none" />

      <View style={s.card}>
        <View style={s.icon}>
          <Ionicons name="person-outline" size={20} color={colors.accent} />
        </View>

        <Text style={[s.title, fa && s.faTitle]}>
          {fa ? 'برای دیدن پروفایلت وارد شو' : 'Sign in to see your profile'}
        </Text>

        <Text style={[s.blurb, fa && s.faBlurb]}>
          {fa
            ? 'پیشرفتت، دوستانت و هر چه ذخیره کرده‌ای، روی همهٔ دستگاه‌هایت ذخیره و همگام می‌شود.'
            : 'Your progress, your friends, and everything you save — kept and synced across your devices.'}
        </Text>

        <Pressable style={s.primary} onPress={() => router.push('/auth/sign-up' as any)}>
          <Text style={[s.primaryT, fa && s.faBtn]}>
            {fa ? 'ساختن حساب' : 'Create an account'}
          </Text>
        </Pressable>

        <Pressable style={s.ghost} onPress={() => router.push('/auth/sign-in' as any)}>
          <Text style={[s.ghostT, fa && s.faBtn]}>
            {fa ? 'قبلاً حساب دارم' : 'I already have an account'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, zIndex: 20 },
  veil: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(246,243,241,0.45)' },

  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 24,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(34,30,26,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  icon: {
    width: 44, height: 44, borderRadius: 15,
    backgroundColor: 'rgba(201,162,39,0.12)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
  },

  title: { fontFamily: fonts.bodyStrong, fontSize: 17, letterSpacing: -0.3, color: colors.textPrimary, textAlign: 'center' },
  faTitle: { fontFamily: fonts.persian, fontSize: 17, lineHeight: 32 },

  blurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.lg },
  faBlurb: { fontFamily: fonts.persian, fontSize: 13, lineHeight: 27, writingDirection: 'rtl' },

  primary: { alignSelf: 'stretch', backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: 13, alignItems: 'center' },
  primaryT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },

  ghost: { alignSelf: 'stretch', paddingVertical: 12, alignItems: 'center', marginTop: 4 },
  ghostT: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },

  faBtn: { fontFamily: fonts.persian, fontSize: 13.5 },
});
