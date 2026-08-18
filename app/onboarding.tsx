import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { onboardingDone } from '@/app/_layout';
import { useAuth } from '@/lib/auth';
import { setLang as setAppLang, getLang } from '@/lib/i18n';
import { TpmIcon } from '@/components/tpm-mark';

const LANGS = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'fa', label: 'Persian', native: 'فارسی' },
];

/* A frosted panel. The blur and its tint sit behind, never over, the content. */
function Frosted({ children, style, intensity = 30 }: { children: any; style?: any; intensity?: number }) {
  return (
    <View style={[s.frost, style]}>
      <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill as any} />
      <View style={s.frostTint} pointerEvents="none" />
      <View style={s.frostEdge} pointerEvents="none" />
      <View style={s.frostInner}>{children}</View>
    </View>
  );
}

/* One field: its own frosted pill, so nothing nests and nothing overlaps. */
function Field({
  label, value, onChange, placeholder, secure, keyboard, autoCap,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
  secure?: boolean; keyboard?: any; autoCap?: any;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[s.field, focused && s.fieldOn]}>
      <BlurView intensity={34} tint="light" style={StyleSheet.absoluteFill as any} />
      <View style={s.fieldTint} pointerEvents="none" />
      <View style={s.fieldInner}>
        <Text style={[s.fieldL, getLang() === 'fa' && { textAlign: 'right' }]}>{label}</Text>
        <TextInput
          style={[s.input, getLang() === 'fa' && { textAlign: 'right', writingDirection: 'rtl' }]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="rgba(34,30,26,0.3)"
          secureTextEntry={secure}
          keyboardType={keyboard}
          autoCapitalize={autoCap ?? 'none'}
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

function GlassButton({
  label, onPress, primary, icon, style,
}: {
  label: string; onPress: () => void; primary?: boolean; icon?: any; style?: any;
}) {
  const press = useRef(new Animated.Value(0)).current;
  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.975] });
  return (
    <Animated.View style={[{ transform: [{ scale }], alignSelf: 'stretch' }, style]}>
      <Pressable
        onPressIn={() => Animated.timing(press, { toValue: 1, duration: 90, useNativeDriver: true }).start()}
        onPressOut={() => Animated.timing(press, { toValue: 0, duration: 150, useNativeDriver: true }).start()}
        onPress={onPress}
      >
        <View style={[s.btn, primary && s.btnPrimary]}>
          {!primary ? (
            <>
              <BlurView intensity={44} tint="light" style={StyleSheet.absoluteFill as any} />
              <View style={s.btnTint} pointerEvents="none" />
              <View style={s.btnEdge} pointerEvents="none" />
            </>
          ) : null}
          <View style={s.btnRow}>
            <Text style={[s.btnT, primary && s.btnTPrimary]}>{label}</Text>
            {icon ? <Ionicons name={icon} size={16} color={primary ? '#FFF' : colors.textPrimary} /> : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function Onboarding() {
  // Entered with ?step=2 when a signed-out user asks to sign in, so the
  // auth page reuses this screen's design rather than the bare form.
  const { step: wantStep, next: nextRoute } = useLocalSearchParams<{ step?: string; next?: string }>();
  const { signUp, signIn } = useAuth();
  const [step, setStep] = useState(Number(wantStep) || 0);
  const [lang, setLangLocal] = useState<'en' | 'fa'>(getLang());

  // Applying immediately rather than at the end: the rest of onboarding
  // should already be in the language they just chose, which is the
  // first proof the app speaks it.
  const chooseLang = async (code: 'en' | 'fa') => {
    setLangLocal(code);
    await setAppLang(code);
  };
  const [mode, setMode] = useState<'up' | 'in'>('up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const fade = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    fade.setValue(0);
    lift.setValue(16);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 560, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(lift, { toValue: 0, duration: 640, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [step]);

  const finish = async () => {
    try {
      await AsyncStorage.setItem('onboarded', '1');
      await AsyncStorage.setItem('lang', lang);
    } catch {}
    onboardingDone();
    router.replace('/(tabs)' as any);
  };

  const [authBusy, setAuthBusy] = useState(false);
  const [authErr, setAuthErr] = useState<string | null>(null);

  // The form on this screen is the real one. Sending someone to another
  // auth page to retype what they just typed was the bug.
  const doAuth = async () => {
    setAuthErr(null);
    if (!email.trim() || !pass) { setAuthErr('Email and password are needed.'); return; }
    setAuthBusy(true);
    const { error } = mode === 'up'
      ? await signUp(email.trim(), pass, name.trim())
      : await signIn(email.trim(), pass);
    setAuthBusy(false);
    if (error) { setAuthErr(error); return; }
    try { await AsyncStorage.setItem('onboarded', '1'); } catch {}
    onboardingDone();
    // Back to whatever sent them here, if anything did.
    router.replace((nextRoute ? String(nextRoute) : '/(tabs)') as any);
  };

  const goAuth = async (to: string) => {
    try { await AsyncStorage.setItem('onboarded', '1'); } catch {}
    onboardingDone();
    router.replace(to as any);
  };

  return (
    <View style={s.root}>
      <LinearGradient
        colors={
          step === 0
            ? ['#EFE5D5', '#FDFBF7', '#EFE5D5']   // light centred, beige above and below
            : step === 1
            ? ['#FDFBF7', '#F2EADC', '#DFD0B6']   // light at the top, deepening down
            : ['#DFD0B6', '#E6DCCB', '#f6f3f1']   // resolves into the home paper
        }
        locations={step === 0 ? [0, 0.5, 1] : [0, 0.45, 1]}
        locations={[0, 0.55, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill as any}
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={s.head}>
          {step > 0 ? (
            <Pressable hitSlop={12} onPress={() => setStep(step - 1)}>
              <Ionicons name="chevron-back" size={22} color={colors.textSecondary} />
            </Pressable>
          ) : <View style={{ width: 22 }} />}
          <Text style={s.wordmark}>ZAND</Text>
          {step > 0 ? (
            <Pressable hitSlop={12} onPress={finish}>
              <Text style={s.skip}>{lang === 'fa' ? 'رد کن' : 'Skip'}</Text>
            </Pressable>
          ) : <View style={{ width: 34 }} />}
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={s.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={{ opacity: fade, transform: [{ translateY: lift }] }}>
              {step === 0 ? (
                <>
                  <Text style={s.fa}>زند</Text>
                  <Text style={[s.title, lang === 'fa' && s.rtl]}>{lang === 'fa' ? 'خوش آمدی' : 'Welcome'}</Text>
                  <Text style={[s.blurb, lang === 'fa' && s.rtl]}>
                    {lang === 'fa'
                      ? 'جهانی برای ایرانی‌ها. یک قطب‌نما برای تاریخ، فرهنگ، هنر، آدم‌ها و کسب‌وکارها، هر جای دنیا که باشی.'
                      : 'One compass for history, culture, arts, people and businesses — wherever you are.'}
                  </Text>

                  <Frosted style={s.card}>
                    {[
                      { i: 'book-outline', t: 'Learn the language', x: 'And know where it comes from' },
                      { i: 'tpm', t: 'See what we are', x: 'What our creative world is making today' },
                      { i: 'storefront-outline', t: 'Local', x: 'Iranian businesses, all over the world' },
                    ].map((r, i) => (
                      <View key={r.t} style={[s.row, i > 0 && s.rowTop]}>
                        <View style={s.rowIcon}>
                          {r.i === 'tpm'
                            ? <TpmIcon size={19} color={colors.accent} />
                            : <Ionicons name={r.i as any} size={16} color={colors.accent} />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={s.rowT}>{r.t}</Text>
                          <Text style={s.rowX}>{r.x}</Text>
                        </View>
                      </View>
                    ))}
                  </Frosted>
                </>
              ) : step === 1 ? (
                <>
                  <Text style={[s.title, lang === 'fa' && s.rtl]}>{lang === 'fa' ? 'برنامه به کدام زبان باشد؟' : 'Which language\nshould the app use?'}</Text>
                  <Text style={[s.blurb, lang === 'fa' && s.rtl]}>{lang === 'fa' ? 'هر وقت خواستی می‌توانی در تنظیمات عوضش کنی.' : 'You can change this at any time in settings.'}</Text>

                  <View style={s.langs}>
                    {LANGS.map((l) => {
                      const on = lang === l.code;
                      return (
                        <Pressable key={l.code} onPress={() => chooseLang(l.code as 'en' | 'fa')} style={{ flex: 1 }}>
                          <View style={on ? s.langWrapOn : undefined}>
                          <Frosted style={s.langCard} intensity={on ? 60 : 18}>
                            <Text style={[s.langNative, on && s.langOn, l.code === 'fa' && s.langFa]}>
                              {l.native}
                            </Text>
                            <Text style={[s.langLabel, on && s.langLabelOn]}>{l.label}</Text>
                          </Frosted>
                          {on ? <View style={s.langEdgeOn} pointerEvents="none" /> : null}
                          </View>
                          {on ? (
                            <View style={s.tick}>
                              <Ionicons name="checkmark" size={13} color="#FFF" />
                            </View>
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                </>
              ) : (
                <>
                  <Text style={s.formTitle}>
                    {lang === 'fa' ? (mode === 'up' ? 'یک حساب بساز' : 'خوش آمدی') : (mode === 'up' ? 'Create an account' : 'Welcome back')}
                  </Text>
                  <Text style={[s.blurb, lang === 'fa' && s.rtl]}>
                    {lang === 'fa'
                      ? (mode === 'up'
                        ? 'تا آنچه می‌خوانی و یاد می‌گیری نگه داشته شود، و با دوستانت در ارتباط بمانی.'
                        : 'وارد شو و از همان‌جا که ماندی ادامه بده.')
                      : (mode === 'up'
                        ? 'To keep track of what you read and learn, and to stay connected with your friends.'
                        : 'Sign in to pick up where you left off.')}
                  </Text>

                  <View style={s.form}>
                    {mode === 'up' ? (
                      <Field
                        label={lang === 'fa' ? 'نام' : 'NAME'}
                        value={name}
                        onChange={setName}
                        placeholder={lang === 'fa' ? 'نام' : 'What should we call you?'}
                        autoCap="words"
                      />
                    ) : null}
                    <Field
                      label={lang === 'fa' ? 'ایمیل' : 'EMAIL'}
                      value={email}
                      onChange={setEmail}
                      placeholder={lang === 'fa' ? 'ایمیل' : 'you@example.com'}
                      keyboard="email-address"
                    />
                    <Field
                      label={lang === 'fa' ? 'رمز عبور' : 'PASSWORD'}
                      value={pass}
                      onChange={setPass}
                      placeholder={lang === 'fa' ? 'دست‌کم شش نویسه' : 'At least six characters'}
                      secure
                    />
                  </View>

                  <Pressable hitSlop={8} onPress={() => setMode(mode === 'up' ? 'in' : 'up')}>
                    <Text style={s.switchT}>
                      {lang === 'fa' ? (mode === 'up' ? 'حساب دارم' : 'باید یکی بسازم') : (mode === 'up' ? 'I already have an account' : 'I need to create one')}
                    </Text>
                  </Pressable>
                </>
              )}
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={s.dots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[s.dot, i === step && s.dotOn]} />
          ))}
        </View>

        <View style={s.foot}>
          {step < 2 ? (
            <GlassButton label={lang === 'fa' ? 'ادامه' : 'Continue'} icon="arrow-forward" primary onPress={() => setStep(step + 1)} />
          ) : (
            <>
              {authErr ? <Text style={s.authErr}>{authErr}</Text> : null}
              <GlassButton
                label={authBusy ? (lang === 'fa' ? 'یک لحظه…' : 'One moment…') : lang === 'fa' ? (mode === 'up' ? 'ساختن حساب' : 'ورود') : (mode === 'up' ? 'Create account' : 'Sign in')}
                primary
                onPress={doAuth}
              />
              <Pressable hitSlop={10} onPress={finish} style={{ marginTop: spacing.lg }}>
                <Text style={s.later}>{lang === 'fa' ? 'شاید بعداً' : 'Maybe later'}</Text>
              </Pressable>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FBF8F3' },

  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingTop: spacing.md },
  wordmark: { fontFamily: fonts.wordmark, fontSize: 16, letterSpacing: 4, color: colors.textPrimary },
  skip: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textSecondary },

  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.xl },

  fa: { fontFamily: fonts.persian, fontSize: 44, lineHeight: 70, color: colors.accent, opacity: 0.8 },
  rtl: { textAlign: 'right', writingDirection: 'rtl' },
  title: { fontFamily: fonts.body, fontSize: 30, lineHeight: 41, letterSpacing: -0.8, color: colors.textPrimary, marginTop: spacing.sm },
  formTitle: { fontFamily: fonts.body, fontSize: 27, lineHeight: 36, letterSpacing: -0.7, color: colors.textPrimary },
  blurb: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 25, color: colors.textSecondary, marginTop: spacing.sm, maxWidth: 320, opacity: 0.9 },

  frost: { borderRadius: 24, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.16)' },
  frostTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.18)' },
  frostEdge: { ...StyleSheet.absoluteFillObject, borderRadius: 24, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.55)' },
  frostInner: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },

  card: { marginTop: spacing.xl, maxWidth: 340 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm + 4 },
  rowTop: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(34,30,26,0.1)' },
  rowIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' },
  rowT: { fontFamily: fonts.body, fontSize: 14, letterSpacing: -0.1, color: colors.textPrimary },
  rowX: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 17, color: colors.textSecondary, marginTop: 2, opacity: 0.8 },

  langs: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, maxWidth: 330 },
  langCard: { height: 108, paddingHorizontal: spacing.sm, alignItems: 'center', justifyContent: 'center' },
  langNative: { fontFamily: fonts.body, fontSize: 18, letterSpacing: -0.2, color: colors.textPrimary },
  langFa: { fontFamily: fonts.persian, fontSize: 24, lineHeight: 38 },
  langOn: { color: colors.accent },
  langWrapOn: { transform: [{ scale: 1.03 }] },
  langEdgeOn: { ...StyleSheet.absoluteFillObject, borderRadius: 24, borderWidth: 1.5, borderColor: colors.accent, opacity: 0.55 },
  langLabel: { fontFamily: fonts.body, fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: colors.textSecondary, marginTop: 6, opacity: 0.8 },
  langLabelOn: { color: colors.textPrimary },
  tick: { position: 'absolute', top: 9, right: 9, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },

  // the form: each field is its own pill, nothing nested
  form: { marginTop: spacing.xl, gap: spacing.md },
  field: { borderRadius: 18, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.14)' },
  fieldOn: { borderColor: colors.accent },
  fieldTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.42)' },
  fieldInner: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },
  fieldL: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 2.2, color: colors.textSecondary, marginBottom: 5 },
  input: { fontFamily: fonts.body, fontSize: 16.5, lineHeight: 21, color: colors.textPrimary, padding: 0, margin: 0 },
  switchT: { fontFamily: fonts.body, fontSize: 13.5, color: colors.accent, textAlign: 'center', marginTop: spacing.xl },

  dots: { flexDirection: 'row', justifyContent: 'center', gap: 7, marginBottom: spacing.lg },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(34,30,26,0.14)' },
  dotOn: { width: 20, backgroundColor: colors.accent },

  foot: { paddingHorizontal: spacing.xl, paddingBottom: spacing.md, alignItems: 'center' },
  btn: { borderRadius: 30, overflow: 'hidden', paddingVertical: 18, paddingHorizontal: spacing.xl, alignItems: 'center', justifyContent: 'center' },
  btnPrimary: { backgroundColor: colors.textPrimary },
  btnTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.34)' },
  btnEdge: { ...StyleSheet.absoluteFillObject, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.85)' },
  btnRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnT: { fontFamily: fonts.body, fontSize: 16, color: colors.textPrimary },
  btnTPrimary: { color: '#FFF' },
  authErr: { fontFamily: fonts.body, fontSize: 12.5, color: '#B3261E', textAlign: 'center', marginBottom: spacing.sm },
  later: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textSecondary },
});
