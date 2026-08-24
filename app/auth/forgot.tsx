import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export default function Forgot() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!email) { setError('Enter your email.'); return; }
    setBusy(true); setError('');
    const { error } = await resetPassword(email.trim());
    setBusy(false);
    if (error) setError(error);
    else setDone(true);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.flex}>
        <View style={s.body}>
          <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} style={s.back}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
            <Text style={s.backT}>{t(APP.back)}</Text>
          </Pressable>

          {done ? (
            <>
              <View style={s.tick}><Ionicons name="mail-outline" size={26} color="#FFF" /></View>
              <Text style={s.title}>{t(APP.checkYourEmail)}</Text>
              <Text style={s.sub}>If an account exists for {email}, a reset link is on its way.</Text>
              <Pressable style={s.btn} onPress={() => router.replace('/auth/sign-in')}>
                <Text style={s.btnT}>{t(APP.backToSignIn)}</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={s.title}>{t(APP.resetPassword)}</Text>
              <Text style={s.sub}>Enter your email and we will send a link to set a new password.</Text>
              <TextInput style={s.input} placeholder="Email" placeholderTextColor={colors.textSecondary}
                autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
              {error ? <Text style={s.error}>{error}</Text> : null}
              <Pressable style={[s.btn, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy}>
                <Text style={s.btnT}>{busy ? 'Sending…' : 'Send reset link'}</Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  back: { flexDirection: 'row', alignItems: 'center', gap: 3, position: 'absolute', top: spacing.lg, left: spacing.lg },
  backT: { fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary },
  title: { fontFamily: fonts.heading, fontSize: 32, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.sm, marginBottom: spacing.xl },
  input: { fontFamily: fonts.body, fontSize: 16, color: colors.textPrimary, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, marginBottom: spacing.md },
  error: { fontFamily: fonts.body, fontSize: 13, color: '#C4433F', marginBottom: spacing.md },
  btn: { backgroundColor: colors.accent, borderRadius: 24, paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  btnT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },
  tick: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#3E6E78', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
});
