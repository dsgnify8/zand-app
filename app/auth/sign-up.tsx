import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export default function SignUp() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!name || !email || !password) { setError('Fill in every field.'); return; }
    if (password.length < 6) { setError('Password needs at least 6 characters.'); return; }
    setBusy(true); setError('');
    const { error } = await signUp(email.trim(), password, name.trim());
    setBusy(false);
    if (error) setError(error);
    else setDone(true);
  };

  if (done) {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.body}>
          <View style={s.tick}><Ionicons name="checkmark" size={28} color="#FFF" /></View>
          <Text style={s.title}>{t(APP.checkYourEmail)}</Text>
          <Text style={s.sub}>We sent a confirmation link to {email}. Tap it, then sign in.</Text>
          <Pressable style={s.btn} onPress={() => router.replace('/auth/sign-in')}>
            <Text style={s.btnT}>{t(APP.goToSignIn)}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.flex}>
        {/* Scrollable, so the keyboard pushes the form up rather than
            covering it. Padding behaviour needs something that can move;
            a fixed View gives it nothing to work with. */}
        <ScrollView
          contentContainerStyle={s.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.wordmark}>ZAND</Text>
          <Text style={s.title}>{t(APP.createYourAccount)}</Text>
          <Text style={s.sub}>Keep your progress, save what you love, and learn with friends.</Text>

          <TextInput style={s.input} placeholder="Your name" placeholderTextColor={colors.textSecondary}
            value={name} onChangeText={setName} />
          <TextInput style={s.input} placeholder="Email" placeholderTextColor={colors.textSecondary}
            autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <View style={s.pwWrap}>
            <TextInput style={s.pwInput} placeholder="Password" placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPw} value={password} onChangeText={setPassword}
              returnKeyType="go" onSubmitEditing={submit} />
            <Pressable hitSlop={8} onPress={() => setShowPw((v) => !v)} style={s.eye}>
              <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {error ? <Text style={s.error}>{error}</Text> : null}

          <Pressable style={[s.btn, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy}>
            <Text style={s.btnT}>{busy ? 'Creating…' : 'Create account'}</Text>
          </Pressable>

          <View style={s.footer}>
            <Text style={s.footerT}>Already have one? </Text>
            <Pressable hitSlop={8} onPress={() => router.replace('/auth/sign-in')}>
              <Text style={s.footerLink}>{t(APP.signIn)}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  // flexGrow rather than flex: as a scroll container this needs to be
  // able to grow past the screen when the keyboard arrives, which flex: 1
  // forbids.
  body: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.xxl },
  wordmark: { fontFamily: fonts.wordmark, fontSize: 20, letterSpacing: 5, color: colors.accent, marginBottom: spacing.xxl },
  title: { fontFamily: fonts.heading, fontSize: 32, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.sm, marginBottom: spacing.xl },
  input: { fontFamily: fonts.body, fontSize: 16, color: colors.textPrimary, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, marginBottom: spacing.md },
  pwWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, marginBottom: spacing.md, paddingRight: spacing.md },
  pwInput: { flex: 1, fontFamily: fonts.body, fontSize: 16, color: colors.textPrimary, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  eye: { padding: 4 },
  error: { fontFamily: fonts.body, fontSize: 13, color: '#C4433F', marginBottom: spacing.md },
  btn: { backgroundColor: colors.accent, borderRadius: 24, paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  btnT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },
  tick: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#6E8C5A', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xxl },
  footerT: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },
  footerLink: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent },
});
