// The way into Hand in Hand from Explore.
//
// Built as a module card, the same shape Learn uses, so it reads as
// part of the app rather than a panel someone added later. The tint is
// what marks it out, not a layout of its own.

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { t, useLang, getLang } from '@/lib/i18n';
import { HAMDELI } from '@/constants/i18n/hamdeli';
import { HAMDELI_TINT } from '@/lib/hamdeli';

const TINT = HAMDELI_TINT;

export function HamdeliBand() {
  useLang();
  const fa = getLang() === 'fa';

  return (
    <View style={s.wrap}>
      <View style={s.groupHead}>
        <View style={s.groupBar} />
        <View style={{ flex: 1 }}>
          <Text style={[s.groupL, fa && s.groupLFa]}>{fa ? 'همدلی' : 'HAND IN HAND'}</Text>
          <Text style={[s.groupN, fa && s.groupNFa]}>
            {fa ? 'جایی برای دیده شدن کسانی که کار خوب می‌کنند.' : 'A place for the people doing good to be seen.'}
          </Text>
        </View>
      </View>

      <Pressable style={s.card} onPress={() => router.navigate('/hamdeli' as any)}>
        <View style={s.spine} />
        <LinearGradient
          colors={[TINT + '12', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={StyleSheet.absoluteFill as any}
          pointerEvents="none"
        />
        <View style={s.top}>
          <View style={s.icon}><Ionicons name="heart-outline" size={17} color={TINT} /></View>
          <View style={{ flex: 1 }}>
            <View style={[s.nameRow, fa && s.nameRowFa]}>
              <Text style={[s.name, fa && s.nameFa]}>{t(HAMDELI.title)}</Text>
              {!fa ? <Text style={s.other}>همدلی</Text> : null}
            </View>
            <Text style={[s.x, fa && s.xFa]}>
              {fa
                ? 'آدم‌ها و سازمان‌هایی که در ایران کار سخت و بی‌سروصدا می‌کنند.'
                : 'People and organisations doing quiet, difficult work in Iran.'}
            </Text>
          </View>
          <Ionicons name={fa ? 'chevron-back' : 'chevron-forward'} size={15} color={colors.textSecondary} />
        </View>
        <View style={s.foot}>
          <Text style={[s.count, fa && s.countFa]}>{fa ? 'دست‌چین، و در حال رشد' : 'handpicked, and growing'}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: spacing.xxl },

  groupHead: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  groupBar: { width: 3, borderRadius: 2, backgroundColor: TINT },
  groupL: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: TINT },
  groupLFa: { fontFamily: fonts.persian, fontSize: 12, letterSpacing: 0, textAlign: 'right' },
  groupN: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2, fontStyle: 'italic' },
  groupNFa: { fontFamily: fonts.persian, fontSize: 12.5, fontStyle: 'normal', textAlign: 'right', writingDirection: 'rtl' },

  card: { backgroundColor: colors.surface, borderRadius: 13, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, paddingLeft: spacing.xl, overflow: 'hidden' },
  spine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: TINT },

  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, borderColor: TINT, backgroundColor: TINT + '14', alignItems: 'center', justifyContent: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  nameRowFa: { flexDirection: 'row-reverse' },
  name: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary },
  nameFa: { fontFamily: fonts.persian, fontSize: 16 },
  other: { fontFamily: fonts.persian, fontSize: 13, color: TINT },
  x: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: colors.textSecondary, marginTop: 2 },
  xFa: { fontFamily: fonts.persian, fontSize: 12.5, lineHeight: 24, textAlign: 'right', writingDirection: 'rtl' },

  foot: { marginTop: spacing.md },
  count: { fontFamily: fonts.bodyStrong, fontSize: 9.5, color: TINT },
  countFa: { fontFamily: fonts.persian, fontSize: 11, textAlign: 'right' },
});
