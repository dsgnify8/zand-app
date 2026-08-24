// A brief full-screen note while the language changes.
//
// Mounted once at the root so it sits above every screen. It does not
// block anything — the switch has already happened — it just marks the
// moment so the app does not appear to flicker on its own.

import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { registerLangOverlay } from '@/lib/apply-language';

import { useLang } from '@/lib/i18n';
export function LangSwitchOverlay() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => registerLangOverlay(setMsg), []);

  if (!msg) return null;

  const fa = /[\u0600-\u06FF]/.test(msg);

  return (
    <View style={s.wrap} pointerEvents="auto">
      <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
      <View style={s.veil} />
      <ActivityIndicator size="small" color={colors.accent} />
      <Text style={[s.t, fa && s.fa]}>{msg}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    zIndex: 999,
  },
  veil: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(246,243,241,0.72)' },
  t: { fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary },
  fa: { fontFamily: fonts.persian, fontSize: 15, lineHeight: 30 },
});
