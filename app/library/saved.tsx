import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { VideoCard } from '@/components/video-card';
import { useProgress, type ContentType } from '@/lib/progress-store';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

const TABS: { key: ContentType; label: string }[] = [
  { key: 'video', label: 'Videos' },
  { key: 'podcast', label: 'Podcasts' },
  { key: 'article', label: 'Articles' },
];

export default function SavedScreen() {
  const { saved } = useProgress();
  const [tab, setTab] = useState<ContentType>('video');

  const items = saved.filter((s) => s.type === tab);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>{t(APP.profile)}</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{t(APP.savedItems)}</Text>
          <Text style={styles.glyph}>ذخیره‌ها</Text>
        </View>

        <View style={styles.tabs}>
          {TABS.map((t) => {
            const count = saved.filter((s) => s.type === t.key).length;
            const active = tab === t.key;
            return (
              <Pressable key={t.key} style={[styles.tab, active && styles.tabActive]} onPress={() => setTab(t.key)}>
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {t.label}{count > 0 ? '  ' + count : ''}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {tab === 'video' ? (
          items.length > 0 ? (
            items.map((v) => <VideoCard key={v.id} id={v.id} />)
          ) : (
            <Text style={styles.empty}>Tap the bookmark on any video to save it for later.</Text>
          )
        ) : (
          <Text style={styles.empty}>
            {tab === 'podcast' ? 'Saved podcasts will appear here.' : 'Saved articles will appear here.'}
          </Text>
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
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.md, paddingHorizontal: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: colors.accent },
  tabs: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, marginTop: spacing.lg, marginBottom: spacing.xl },
  tab: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  tabActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  tabText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.textSecondary },
  tabTextActive: { color: colors.surface },
  empty: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary, paddingHorizontal: spacing.lg, marginTop: spacing.xl },
});
