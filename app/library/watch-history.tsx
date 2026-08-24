import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { VideoCard } from '@/components/video-card';
import { useProgress } from '@/lib/progress-store';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export default function WatchHistoryScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { history } = useProgress();
  const videos = history.filter((h) => h.type === 'video');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>{t(APP.profile)}</Text>
        </Pressable>
        <Text style={styles.title}>{t(APP.watchHistory)}</Text>
        {videos.length === 0 ? (
          <Text style={styles.empty}>Videos you open will appear here.</Text>
        ) : (
          videos.map((v) => <VideoCard key={v.id} id={v.id} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm, paddingHorizontal: spacing.lg },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary, paddingHorizontal: spacing.lg, marginTop: spacing.md, marginBottom: spacing.lg },
  empty: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary, paddingHorizontal: spacing.lg, marginTop: spacing.xl },
});
