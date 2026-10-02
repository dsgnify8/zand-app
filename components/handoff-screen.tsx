// The look of every screen reached from a shared link.
//
// One frame, because all four of them say the same kind of thing: here is
// what is happening, and here is the way on. Someone arriving from a text
// message may never have seen ZAND before, so it is quiet and it explains
// itself.

import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { getLang } from '@/lib/i18n';

export function HandoffScreen({
  title, line, busy, cta, onPress,
}: {
  title: string;
  line?: string;
  busy?: boolean;
  cta?: string;
  onPress?: () => void;
}) {
  const fa = getLang() === 'fa';
  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.body}>
        <Text style={[s.mark, fa && s.markFa]}>ZAND</Text>
        <Text style={[s.title, fa && s.rtl]}>{title}</Text>
        {line ? <Text style={[s.line, fa && s.rtl]}>{line}</Text> : null}
        {busy ? (
          <ActivityIndicator style={{ marginTop: spacing.xl }} color={colors.accent} />
        ) : cta && onPress ? (
          <Pressable style={s.cta} onPress={onPress}>
            <Text style={s.ctaT}>{cta}</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  mark: {
    fontFamily: fonts.wordmark, fontSize: 13, letterSpacing: 5,
    color: colors.accent, marginBottom: spacing.xl,
  },
  markFa: { letterSpacing: 5 },
  title: {
    fontFamily: fonts.heading, fontSize: 28, lineHeight: 34,
    color: colors.textPrimary, textAlign: 'center',
  },
  line: {
    fontFamily: fonts.body, fontSize: 14, lineHeight: 22,
    color: colors.textSecondary, textAlign: 'center',
    marginTop: spacing.md, maxWidth: 320,
  },
  rtl: { writingDirection: 'rtl' },
  cta: {
    backgroundColor: colors.textPrimary, borderRadius: radius.lg,
    paddingHorizontal: spacing.xl, paddingVertical: 14, marginTop: spacing.xl,
  },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: '#FFF' },
});
