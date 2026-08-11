// Shown only when someone hits a limit, never before.
//
// The reasoning: a paywall in front of a feature nobody has tried yet is
// asking for a decision on no information. A paywall at the moment
// someone has just used the thing forty times is asking someone who
// already knows what it is worth.

import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { getLang } from '@/lib/i18n';
import { LIMITS, resetsAt, type Meter } from '@/lib/usage';

function hoursUntil(ts: number | null) {
  if (!ts) return 24;
  return Math.max(1, Math.ceil((ts - Date.now()) / (60 * 60 * 1000)));
}

export function Paywall({
  open,
  meter,
  onClose,
  onSubscribe,
}: {
  open: boolean;
  meter: Meter;
  onClose: () => void;
  onSubscribe: () => void;
}) {
  const fa = getLang() === 'fa';
  const hrs = hoursUntil(resetsAt(meter));

  const what = meter === 'speak'
    ? (fa ? 'شنیدن تلفظ' : 'listening to pronunciation')
    : (fa ? 'تمرین گفتار' : 'speaking practice');

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.back}>
        <BlurView intensity={22} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={s.card}>
          <Pressable style={s.x} hitSlop={12} onPress={onClose}>
            <Ionicons name="close" size={19} color={colors.textSecondary} />
          </Pressable>

          <View style={s.icon}>
            <Ionicons name="infinite-outline" size={22} color={colors.accent} />
          </View>

          <Text style={[s.title, fa && s.faTitle]}>
            {fa ? 'به سقف امروز رسیدی' : 'You have reached today\u2019s limit'}
          </Text>

          <Text style={[s.blurb, fa && s.faBlurb]}>
            {fa
              ? `امروز ${LIMITS[meter]} بار از ${what} استفاده کردی. حدود ${hrs} ساعت دیگر دوباره باز می‌شود، یا همین حالا نامحدودش کن.`
              : `You have used ${what} ${LIMITS[meter]} times today. It opens up again in about ${hrs} hours, or you can make it unlimited now.`}
          </Text>

          <View style={s.rows}>
            {[
              fa ? 'شنیدن و گفتن بی‌نهایت' : 'Unlimited listening and speaking',
              fa ? 'همهٔ درس‌ها و تمرین‌ها' : 'Every lesson and exercise',
              fa ? 'پشتیبانی از کاری که می‌سازیم' : 'Supports what we are building',
            ].map((line) => (
              <View key={line} style={[s.row, fa && s.rowFa]}>
                <Ionicons name="checkmark" size={13} color={colors.accent} />
                <Text style={[s.rowT, fa && s.faRowT]}>{line}</Text>
              </View>
            ))}
          </View>

          <Pressable style={s.cta} onPress={onSubscribe}>
            <Text style={s.ctaT}>
              {fa ? 'ماهی ۹٫۹۹ دلار' : '$9.99 a month'}
            </Text>
          </Pressable>

          <Pressable style={s.later} onPress={onClose}>
            <Text style={[s.laterT, fa && s.faLaterT]}>
              {fa ? `صبر می‌کنم` : 'I will wait'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  back: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  card: {
    width: '100%', maxWidth: 330,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  x: { position: 'absolute', top: 14, right: 14, zIndex: 2 },

  icon: {
    width: 46, height: 46, borderRadius: 16,
    backgroundColor: 'rgba(201,162,39,0.12)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
  },

  title: { fontFamily: fonts.bodyStrong, fontSize: 17, letterSpacing: -0.3, color: colors.textPrimary, textAlign: 'center' },
  faTitle: { fontFamily: fonts.persian, fontSize: 17, lineHeight: 32 },

  blurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
  faBlurb: { fontFamily: fonts.persian, fontSize: 13, lineHeight: 27, writingDirection: 'rtl' },

  rows: { alignSelf: 'stretch', gap: 9, marginTop: spacing.lg, marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowFa: { flexDirection: 'row-reverse' },
  rowT: { fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary, flex: 1 },
  faRowT: { fontFamily: fonts.persian, fontSize: 13, textAlign: 'right' },

  cta: { alignSelf: 'stretch', backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: 14, alignItems: 'center' },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: '#FFF' },

  later: { paddingVertical: 12, marginTop: 2 },
  laterT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary },
  faLaterT: { fontFamily: fonts.persian, fontSize: 13 },
});
