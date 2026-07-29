import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const submit = async () => {
    if (!email || !password) { setError('Enter your email and password.'); return; }
    setBusy(true); setError('');
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) setError(error);
    else router.replace('/');
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.flex}>
        <View style={s.body}>
          <Text style={s.wordmark}>ZAND</Text>
          <Text style={s.title}>{t(APP.welcomeBack)}</Text>
          <Text style={s.sub}>Sign in to keep your streak, saves, and friends.</Text>

          <TextInput style={s.input} placeholder="Email" placeholderTextColor={colors.textSecondary}
            autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <View style={s.pwWrap}>
            <TextInput style={s.pwInput} placeholder="Password" placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPw} value={password} onChangeText={setPassword} />
            <Pressable hitSlop={8} onPress={() => setShowPw((v) => !v)} style={s.eye}>
              <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {error ? <Text style={s.error}>{error}</Text> : null}

          <Pressable style={[s.btn, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy}>
            <Text style={s.btnT}>{busy ? 'Signing in…' : 'Sign in'}</Text>
          </Pressable>

          <Pressable hitSlop={8} onPress={() => router.navigate('/auth/forgot')}>
            <Text style={s.link}>Forgot your password?</Text>
          </Pressable>

          <View style={s.footer}>
            <Text style={s.footerT}>New here? </Text>
            <Pressable hitSlop={8} onPress={() => router.replace('/auth/sign-up')}>
              <Text style={s.footerLink}>{t(APP.createAccount)}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  wordmark: { fontFamily: fonts.wordmark, fontSize: 20, letterSpacing: 5, color: colors.accent, marginBottom: spacing.xxl },
  title: { fontFamily: fonts.heading, fontSize: 34, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.sm, marginBottom: spacing.xl },
  input: { fontFamily: fonts.body, fontSize: 16, color: colors.textPrimary, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, marginBottom: spacing.md },
  pwWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, marginBottom: spacing.md, paddingRight: spacing.md },
  pwInput: { flex: 1, fontFamily: fonts.body, fontSize: 16, color: colors.textPrimary, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  eye: { padding: 4 },
  error: { fontFamily: fonts.body, fontSize: 13, color: '#C4433F', marginBottom: spacing.md },
  btn: { backgroundColor: colors.accent, borderRadius: 24, paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  btnT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },
  link: { fontFamily: fonts.body, fontSize: 13, color: colors.accent, textAlign: 'center', marginTop: spacing.lg },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xxl },
  footerT: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },
  footerLink: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent },
});
