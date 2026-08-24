// A small, quiet empty state for the You page sections.
//
// New accounts see these rather than a blank space. Each one says what
// the section will hold and gives one way to start filling it, because
// an empty section that explains nothing just reads as broken.

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { fonts, radius, spacing } from '@/constants/zand-theme';
import { pr } from '@/constants/profile';
import { useLang, getLang } from '@/lib/i18n';

export function EmptyState({
  icon = 'sparkles-outline',
  line,
  lineFa,
  cta,
  ctaFa,
  to,
}: {
  icon?: any;
  line: string;
  lineFa?: string;
  cta?: string;
  ctaFa?: string;
  to?: string;
}) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';

  return (
    <View style={s.wrap}>
      <View style={s.icon}>
        <Ionicons name={icon} size={16} color={pr.dim} />
      </View>

      <Text style={[s.line, fa && s.faLine]}>{fa && lineFa ? lineFa : line}</Text>

      {cta && to ? (
        <Pressable style={s.cta} onPress={() => router.navigate(to as any)}>
          <Text style={[s.ctaT, fa && s.faCta]}>{fa && ctaFa ? ctaFa : cta}</Text>
          <Ionicons name="arrow-forward" size={12} color={pr.readA} />
        </Pressable>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: pr.hair,
    borderStyle: 'dashed',
    marginTop: spacing.sm,
  },
  icon: {
    width: 34, height: 34, borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  line: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: pr.dim, textAlign: 'center', maxWidth: 240 },
  faLine: { fontFamily: fonts.persian, fontSize: 12.5, lineHeight: 26, writingDirection: 'rtl' },

  cta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.md },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: pr.readA },
  faCta: { fontFamily: fonts.persian, fontSize: 12.5 },
});
