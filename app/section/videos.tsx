import { useEffect, useMemo, useRef, useState } from 'react';
import { t, useLang } from '@/lib/i18n';
import { SECTIONS } from '@/constants/i18n/sections';
import { PAGES } from '@/constants/i18n/pages';
import { syncVideosWatched } from '@/lib/stats-store';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { VideoTile } from '@/components/video-tile';
import { VideoCard } from '@/components/video-card';
import { PLAYLISTS, type Playlist } from '@/constants/videos';
import { prefetchMeta } from '@/lib/use-youtube-meta';
import { useProgress } from '@/lib/progress-store';

const ALL_IDS = Array.from(new Set(PLAYLISTS.flatMap((p) => p.videos.map((v) => v.id))));

function FadeIn({ children, delay = 0 }: { children: any; delay?: number }) {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, delay, useNativeDriver: true }).start();
  }, []);
  return <Animated.View style={{ opacity: fade }}>{children}</Animated.View>;
}

function Row({ title, persian, ids, onOpen }: { title: string; persian?: string; ids: string[]; onOpen?: () => void }) {
  if (ids.length === 0) return null;
  return (
    <View style={styles.row}>
      <Pressable style={styles.rowHead} onPress={onOpen} disabled={!onOpen}>
        <Text style={styles.rowTitle}>{title}</Text>
        {persian ? <Text style={styles.rowGlyph}>{persian}</Text> : null}
        {onOpen ? <Ionicons name="chevron-forward" size={17} color={colors.textSecondary} /> : null}
      </Pressable>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.rowScroll}
        contentContainerStyle={styles.rowInner}
      >
        {ids.map((id) => <VideoTile key={id} id={id} />)}
      </ScrollView>
    </View>
  );
}

export default function VideosScreen() {
  const [active, setActive] = useState('all');
  const { history } = useProgress();

  useEffect(() => { prefetchMeta(ALL_IDS); }, []);

  const watchedSet = useMemo(
    () => new Set(history.filter((h) => h.type === 'video').map((h) => h.id)),
    [history]
  );

  const watched = useMemo(() => ALL_IDS.filter((id) => watchedSet.has(id)), [watchedSet]);
  useEffect(() => { syncVideosWatched(watched.length); }, [watched.length]);

  const tabs = [{ key: 'all', title: 'All' }, ...PLAYLISTS.map((p) => ({ key: p.key, title: p.title }))];
  const selected = PLAYLISTS.find((p) => p.key === active);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>Explore</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{t(SECTIONS.videos)}</Text>
          <Text style={styles.glyph}>ویدیوها</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
          contentContainerStyle={styles.tabRow}
        >
          {tabs.map((t) => {
            const on = active === t.key;
            return (
              <Pressable key={t.key} onPress={() => setActive(t.key)} style={styles.tab}>
                <Text style={[styles.tabText, on && styles.tabTextOn]}>{t.title}</Text>
                <View style={[styles.tabRule, on && styles.tabRuleOn]} />
              </Pressable>
            );
          })}
        </ScrollView>

        {active === 'all' ? (
          <>
            {watched.length > 0 ? (
              <FadeIn>
                <Row title="Keep Watching" ids={watched.slice(0, 12)} />
              </FadeIn>
            ) : null}

            {PLAYLISTS.map((pl, i) => (
              <FadeIn key={pl.key} delay={60 + i * 70}>
                <Row
                  title={pl.title}
                  persian={pl.persian}
                  ids={pl.videos.map((v) => v.id)}
                  onOpen={() => setActive(pl.key)}
                />
              </FadeIn>
            ))}
          </>
        ) : selected ? (
          <PlaylistDetail pl={selected} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function PlaylistDetail({ pl }: { pl: Playlist }) {
  const seasons = Array.from(new Set(pl.videos.map((v) => v.season).filter(Boolean))) as string[];
  return (
    <FadeIn>
      <View style={styles.detail}>
        {seasons.length > 0 ? (
          seasons.map((se) => (
            <View key={se}>
              <Text style={styles.seasonLabel}>{se.toUpperCase()}</Text>
              {pl.videos.filter((v) => v.season === se).map((v) => <VideoCard key={v.id} id={v.id} />)}
            </View>
          ))
        ) : (
          pl.videos.map((v) => <VideoCard key={v.id} id={v.id} />)
        )}
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { paddingBottom: spacing.xxl },

  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm, paddingHorizontal: spacing.lg },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.sm, paddingHorizontal: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: 30, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: colors.accent },

  tabScroll: { marginTop: spacing.lg },
  tabRow: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  tab: { paddingBottom: spacing.sm },
  tabText: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textSecondary },
  tabTextOn: { color: colors.textPrimary },
  tabRule: { height: 2, backgroundColor: 'transparent', marginTop: spacing.sm, borderRadius: 1 },
  tabRuleOn: { backgroundColor: colors.accent },

  row: { marginTop: spacing.xl },
  rowHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  rowTitle: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: colors.textPrimary },
  rowGlyph: { fontFamily: fonts.persian, fontSize: fontSize.base, color: colors.accent, flex: 1 },
  rowScroll: {},
  rowInner: { paddingHorizontal: spacing.lg, gap: spacing.md },

  detail: { marginTop: spacing.xl },
  seasonLabel: { fontFamily: fonts.bodyStrong, fontSize: 11, letterSpacing: 2, color: colors.textSecondary, paddingHorizontal: spacing.lg, marginTop: spacing.sm, marginBottom: spacing.md },
});
