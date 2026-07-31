import { useEffect, useState } from 'react';
import { loadTpmAccess } from '@/lib/tpm-access';
import { loadRemoteFrames } from '@/lib/image-frames';
import { loadReminders } from '@/lib/reminders';
import { loadStrength } from '@/lib/word-strength';
import { loadLearnProgress } from '@/lib/learn-progress';
import { loadLevel } from '@/lib/learn-level';
import { useFriendDeepLink } from '@/lib/deep-links';
import { loadHidden } from '@/lib/admin';
import { AuthProvider, useAuth } from '@/lib/auth';
import { loadStats } from '@/lib/stats-store';
import { loadLang } from '@/lib/i18n';
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

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: '(tabs)',
};

function AuthGate() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  useFriendDeepLink(session?.user?.id);
  useEffect(() => {
    if (loading) return;
    const inAuth = segments[0] === 'auth';
    if (!session && !inAuth) router.replace('/auth/sign-in');
    if (session && inAuth) router.replace('/');
  }, [session, loading, segments]);
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [splashDone, setSplashDone] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Montserrat_600SemiBold,
    Vazirmatn_400Regular,
    Cormorant_500Medium,
    Cormorant_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  useEffect(() => { loadAllFrames(); loadSaved(); loadLang(); loadStats(); loadHidden(); loadLevel(); loadLearnProgress(); loadStrength(); loadReminders(); loadTpmAccess(); loadRemoteFrames(); }, []);

  if (!fontsLoaded) {
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
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
            <Stack.Screen name="admin" options={{ headerShown: false }} />
            <Stack.Screen name="tpm/post" options={{ headerShown: false }} />
            <Stack.Screen name="learn/level" options={{ headerShown: false }} />
            <Stack.Screen name="learn/lesson" options={{ headerShown: false }} />
            <Stack.Screen name="learn/path" options={{ headerShown: false }} />
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
            <Stack.Screen name="article/index" options={{ headerShown: false }} />
            <Stack.Screen name="education/topic" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="education/reader" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="menu" options={{ headerShown: false, presentation: 'transparentModal', animation: 'fade', contentStyle: { backgroundColor: 'transparent' } }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <ShareCatch />
          <StatusBar style="auto" />
          {!splashDone ? <AnimatedSplash onDone={() => setSplashDone(true)} /> : null}
        </ThemeProvider>
          </GlossaryProvider>
        </ReadingProvider>
      </SRSProvider>
    </ProgressProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
