import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetForDemo } from '@/lib/demo-mode';
import { MilestoneToast } from '@/components/milestone-toast';
import { onMilestone } from '@/lib/stats-store';
import { loadTpmAccess } from '@/lib/tpm-access';
import { loadRemoteFrames } from '@/lib/image-frames';
import { loadReminders } from '@/lib/reminders';
import { loadStrength } from '@/lib/word-strength';
import { loadLearnProgress, loadPartial } from '@/lib/learn-progress';
import { loadMend } from '@/lib/streak-mend';
import { loadLevel } from '@/lib/learn-level';
import { useFriendDeepLink } from '@/lib/deep-links';
import { loadHidden } from '@/lib/admin';
import { AuthProvider, useAuth } from '@/lib/auth';
import { loadStats, markVisitDay } from '@/lib/stats-store';
import { loadLang, useLang } from '@/lib/i18n';
import { loadSaved } from '@/lib/saved-store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { loadAllFrames } from '@/lib/image-frames';
import { ShareCatch } from '@/components/share-catch';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useSegments, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Vazirmatn_400Regular } from '@expo-google-fonts/vazirmatn';
import { Cormorant_500Medium, Cormorant_600SemiBold } from '@expo-google-fonts/cormorant';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ProgressProvider } from '@/lib/progress-store';
import { SRSProvider } from '@/lib/srs-store';
import { ReadingProvider } from '@/lib/reading-store';
import { GlossaryProvider } from '@/lib/glossary-store';
import { AnimatedSplash } from '@/components/animated-splash';
import { AppState } from 'react-native';
import { syncFlush } from '@/lib/cloud-sync';
import { loadOverrides } from '@/lib/content-overrides';
import { loadUsage } from '@/lib/usage';
import { LangSwitchOverlay } from '@/components/lang-switch-overlay';
import { loadNotifPrefs } from '@/lib/notif-prefs';
import { loadSavedBusinesses } from '@/lib/saved-businesses';
import { loadOpened } from '@/lib/opened-businesses';
import { loadImageOverrides } from '@/lib/image-overrides';

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: '(tabs)',
};

export let onboardingDone: () => void = () => {};

// Held outside the component. A language change remounts this whole tree,
// and the state version reset to null, re-read storage, and redirected on
// the stale answer in between — which is why choosing Persian, or
// creating an account, sent people back to the first screen.
let onboardedOnce: boolean | null = null;

function AuthGate() {
  // Onboarding runs before anything else, once, unless demo mode clears it.
  const [onboarded, setOnboarded] = useState<boolean | null>(onboardedOnce);
  useEffect(() => {
    if (onboardedOnce !== null) return;   // already known this session
    AsyncStorage.getItem('onboarded')
      .then((v) => { onboardedOnce = v === '1'; setOnboarded(onboardedOnce); })
      .catch(() => { onboardedOnce = true; setOnboarded(true); });
  }, []);

  // The onboarding screen calls this when it finishes, so the gate does not
  // keep redirecting back on its stale value.
  useEffect(() => { onboardingDone = () => { onboardedOnce = true; setOnboarded(true); }; }, []);
  const { session, loading } = useAuth();
  const segments = useSegments();
  useFriendDeepLink(session?.user?.id);
  useEffect(() => {
    if (loading) return;
    const inAuth = segments[0] === 'auth';
    if (onboarded === null) return;               // still reading storage
    if (!onboarded) {
      console.log('[gate] redirecting to onboarding | onboardedOnce =', onboardedOnce, '| session =', !!session);
      router.replace('/onboarding' as any); return;
    }
    // Signed out is a supported state: the whole app is browsable and
    // progress is kept locally until they sign in, at which point it is
    // merged up. So we do not force anyone to the auth screen.
    if (session && inAuth) router.replace('/');
  }, [session, loading, segments]);
  return null;
}

export default function RootLayout() {
  const { lang: appLang } = useLang();
  // push anything pending when the app goes to the background, so a
  // force quit inside the debounce window does not lose progress
  useEffect(() => {
    const sub = AppState.addEventListener('change', (st) => {
      if (st !== 'active') syncFlush();
    });
    return () => sub.remove();
  }, []);
  const colorScheme = useColorScheme();

  // What was just earned, if anything. Subscribed once at the root.
  const [milestone, setMilestone] = useState<string | null>(null);
  useEffect(() => onMilestone(setMilestone), []);
  const [splashDone, setSplashDone] = useState(false);
  // Four seconds is far longer than a bundled font needs. Past that,
  // something is wrong and the app should open anyway.
  const [fontsTimedOut, setFontsTimedOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFontsTimedOut(true), 4000);
    return () => clearTimeout(t);
  }, []);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Montserrat_600SemiBold,
    Vazirmatn_400Regular,
    Cormorant_500Medium,
    Cormorant_600SemiBold,
  });

  useEffect(() => {
    // Hidden when the fonts land, or after four seconds regardless. A
    // font that fails to load in a release build leaves this false
    // forever, and the app then sits on the splash screen with no way
    // out — which is worse than a page in a fallback face.
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
    const bail = setTimeout(() => SplashScreen.hideAsync().catch(() => {}), 4000);
    return () => clearTimeout(bail);
  }, [fontsLoaded]);

  // Order matters here. The demo wipe has to finish before anything
  // reads storage, or every store loads the previous session's data into
  // memory and then the wipe deletes it from underneath them — leaving
  // the app showing numbers that no longer exist anywhere on disk.
  useEffect(() => {
    (async () => {
      try { await resetForDemo(); } catch (e) { console.log('[boot] resetForDemo', e); }
      // Awaited together rather than fired and forgotten. Any screen
      // that reads a store as it mounts was racing these — the lesson
      // resume lost, which is why a half-finished lesson restarted.
      //
      // In parallel, so this costs the slowest read rather than the sum.
      await Promise.all([
        loadAllFrames(), loadSaved(), loadLang(), loadHidden(), loadOpened(),
        loadLevel(), loadLearnProgress(), loadPartial(), loadStrength(),
        loadReminders(), loadTpmAccess(), loadRemoteFrames(), loadOverrides(),
        loadUsage(), loadNotifPrefs(), loadImageOverrides(), loadSavedBusinesses(),
        loadMend(),
      ].map((p) => Promise.resolve(p).catch(() => {})));

      // Awaited, unlike the rest. markVisitDay writes the streak through the
      // stats store, so if the load were still in flight it would land on top
      // and the streak would quietly reset to whatever was on disk.
      //
      // Guarded individually: an unhandled throw anywhere above meant this
      // never ran, which is why the streak sat at zero for days with no
      // error to show for it.
      try { await loadStats(); } catch (e) { console.log('[boot] loadStats', e); }
      try { markVisitDay(); } catch (e) { console.log('[boot] markVisitDay', e); }
    })();
  }, []);

  // Render regardless. Hiding the native splash meant nothing if this
  // still returned null — a font that fails in a release build then left
  // a blank screen with no way out. Falling back to the system face is a
  // worse-looking app; returning null is no app at all.
  if (!fontsLoaded && !fontsTimedOut) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
    <AuthGate />
    <ProgressProvider>
      <SRSProvider>
        <ReadingProvider>
          <GlossaryProvider>
        {/* Keyed on the language, deliberately.
            
            Fifty-odd files read the language at render. Making each of them
            re-render reliably on a change proved not to be achievable —
            subscriptions fire, components render with the right value, and
            some of them still show the old language until navigated away
            from. A remount sidesteps all of it: the tree is rebuilt, so
            there is nothing left holding the previous language.
            
            This costs local state on every switch. That is the trade, and
            it is worth it — changing language is a once-ever action, and a
            half-translated screen is not something a Persian-only reader
            should ever see. */}
        {/* Over everything, so a milestone earned mid-lesson appears
            there rather than waiting for someone to visit the map. */}
        <MilestoneToast
          label={milestone}
          onOpen={() => { setMilestone(null); router.navigate('/profile' as any); }}
          onDone={() => setMilestone(null)}
        />

        <ThemeProvider key={appLang} value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              animation: 'fade',
              animationDuration: 260,
              contentStyle: { backgroundColor: '#FAF6EF' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="auth/forgot" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="admin" options={{ headerShown: false }} />
            <Stack.Screen name="tpm/post" options={{ headerShown: false }} />
            <Stack.Screen name="local-map" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
            <Stack.Screen name="admin-review" options={{ headerShown: false }} />
            <Stack.Screen name="my-businesses" options={{ headerShown: false }} />
            <Stack.Screen name="admin-businesses" options={{ headerShown: false }} />
            <Stack.Screen name="admin-images" options={{ headerShown: false }} />
            <Stack.Screen name="admin-cities" options={{ headerShown: false }} />
            <Stack.Screen name="admin-stories" options={{ headerShown: false }} />
            <Stack.Screen name="admin-featured" options={{ headerShown: false }} />
            <Stack.Screen name="admin-listings" options={{ headerShown: false }} />
            <Stack.Screen name="admin-business" options={{ headerShown: false }} />
            <Stack.Screen name="admin-content" options={{ headerShown: false }} />
            <Stack.Screen name="learn/level" options={{ headerShown: false, gestureEnabled: true }} />
            <Stack.Screen name="learn/lesson" options={{ headerShown: false }} />
            <Stack.Screen name="learn/map" options={{ headerShown: false }} />
            <Stack.Screen name="learn/cards" options={{ headerShown: false }} />
            <Stack.Screen name="learn/blanks" options={{ headerShown: false }} />
            <Stack.Screen name="learn/read" options={{ headerShown: false }} />
            <Stack.Screen name="learn/converse" options={{ headerShown: false }} />
            <Stack.Screen name="learn/checkpoint" options={{ headerShown: false }} />
            <Stack.Screen name="learn/phrasebook" options={{ headerShown: false }} />
            <Stack.Screen name="learn/review" options={{ headerShown: false }} />
            <Stack.Screen name="learn/alphabet" options={{ headerShown: false }} />
            <Stack.Screen name="learn/flashcards" options={{ headerShown: false }} />
            <Stack.Screen name="learn/flashcard" options={{ headerShown: false }} />
            <Stack.Screen name="learn/fill-blank" options={{ headerShown: false }} />
            <Stack.Screen name="learn/fill-blank-play" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="learn/quizzes" options={{ headerShown: false }} />
            <Stack.Screen name="learn/quiz-play" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="learn/writing" options={{ headerShown: false }} />
            <Stack.Screen name="learn/pronunciation" options={{ headerShown: false }} />
            <Stack.Screen name="learn/translate" options={{ headerShown: false }} />
            <Stack.Screen name="section" options={{ headerShown: false }} />
            <Stack.Screen name="library" options={{ headerShown: false }} />
            <Stack.Screen name="education/history" options={{ headerShown: false }} />
            <Stack.Screen name="traditions/index" options={{ headerShown: false }} />
            <Stack.Screen name="traditions/tradition" options={{ headerShown: false }} />
            <Stack.Screen name="literature/index" options={{ headerShown: false }} />
            <Stack.Screen name="literature/reader" options={{ headerShown: false }} />
            <Stack.Screen name="geography/index" options={{ headerShown: false }} />
            <Stack.Screen name="language/index" options={{ headerShown: false }} />
            <Stack.Screen name="nowruz/index" options={{ headerShown: false }} />
            <Stack.Screen name="culture/index" options={{ headerShown: false }} />
            <Stack.Screen name="culture/topic" options={{ headerShown: false }} />
            <Stack.Screen name="education/topic" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="education/reader" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="menu" options={{ headerShown: false, presentation: 'transparentModal', animation: 'fade', contentStyle: { backgroundColor: 'transparent' } }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
          {!splashDone ? <AnimatedSplash onDone={() => setSplashDone(true)} /> : null}
          <LangSwitchOverlay />
        </ThemeProvider>
          </GlossaryProvider>
        </ReadingProvider>
      </SRSProvider>
    </ProgressProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
