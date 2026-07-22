import { useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { thumbUrl, watchUrl, useYouTubeMeta, formatViews, timeAgo } from '@/lib/use-youtube-meta';
import { useProgress } from '@/lib/progress-store';

function initialsOf(name: string) {
  const parts = name.replace(/\s+/g, ' ').trim().split(' ');
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'YT';
}

export function VideoCard({ id }: { id: string }) {
  const { meta, loading } = useYouTubeMeta(id);
  const { isSaved, toggleSaved, recordView } = useProgress();
  const [quality, setQuality] = useState('maxresdefault');
  const saved = isSaved('video', id);

  const title = meta?.title || (loading ? 'Loading…' : 'Watch on YouTube');
  const author = meta?.author || 'YouTube';
  const views = formatViews(meta?.viewCount);
  const ago = timeAgo(meta?.publishedAt);
  const line2 = [author, views ? views + ' views' : null, ago].filter(Boolean).join('  ·  ');

  const open = () => { recordView('video', id); Linking.openURL(watchUrl(id)); };

  return (
    <View style={styles.card}>
      <Pressable onPress={open} style={styles.thumbWrap}>
        <Image
          source={{ uri: thumbUrl(id, quality) }}
          style={styles.thumb}
          resizeMode="cover"
          onError={() => quality !== 'mqdefault' && setQuality('mqdefault')}
        />
        <View style={styles.playBadge}><Ionicons name="logo-youtube" size={15} color="#FFFFFF" /></View>
      </Pressable>

      <View style={styles.metaRow}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{initialsOf(author)}</Text></View>
        <Pressable style={styles.metaText} onPress={open}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.sub} numberOfLines={1}>{line2}</Text>
        </Pressable>
        <Pressable hitSlop={10} onPress={() => toggleSaved('video', id)} style={styles.saveBtn}>
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? colors.accent : colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.xl },
  thumbWrap: { width: '100%', aspectRatio: 16 / 9, backgroundColor: colors.border },
  thumb: { width: '100%', height: '100%' },
  playBadge: { position: 'absolute', bottom: spacing.sm, right: spacing.sm, backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 3, flexDirection: 'row', alignItems: 'center' },
  metaRow: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, marginTop: spacing.md, alignItems: 'flex-start' },
  avatar: { width: 36, height: 36, borderRadius: radius.pill, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, color: colors.surface },
  metaText: { flex: 1 },
  title: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, lineHeight: 22, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  saveBtn: { paddingTop: 2 },
});
