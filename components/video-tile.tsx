import { useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { thumbUrl, watchUrl, useYouTubeMeta } from '@/lib/use-youtube-meta';
import { useProgress } from '@/lib/progress-store';

export const TILE_W = 168;

export function VideoTile({ id }: { id: string }) {
  const { meta, loading } = useYouTubeMeta(id);
  const { recordView, isSaved } = useProgress();
  const [quality, setQuality] = useState('mqdefault');
  const saved = isSaved('video', id);

  const title = meta?.title || (loading ? 'Loading' : 'Watch on YouTube');
  const author = meta?.author || 'YouTube';

  const open = () => { recordView('video', id); Linking.openURL(watchUrl(id)); };

  return (
    <Pressable style={styles.tile} onPress={open}>
      <View style={styles.thumbWrap}>
        <Image
          source={{ uri: thumbUrl(id, quality) }}
          style={styles.thumb}
          resizeMode="cover"
          onError={() => quality !== 'default' && setQuality('default')}
        />
        {saved ? (
          <View style={styles.savedBadge}>
            <Ionicons name="bookmark" size={11} color="#FFFFFF" />
          </View>
        ) : null}
        <View style={styles.playBadge}>
          <Ionicons name="logo-youtube" size={12} color="#FFFFFF" />
        </View>
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.author} numberOfLines={1}>{author}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: { width: TILE_W },
  thumbWrap: { width: TILE_W, aspectRatio: 16 / 9, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.border },
  thumb: { width: '100%', height: '100%' },
  playBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: radius.sm, paddingHorizontal: 4, paddingVertical: 2 },
  savedBadge: { position: 'absolute', top: 5, left: 5, backgroundColor: colors.accent, borderRadius: radius.sm, paddingHorizontal: 4, paddingVertical: 2 },
  title: { fontFamily: fonts.bodyStrong, fontSize: 13, lineHeight: 18, color: colors.textPrimary, marginTop: spacing.sm },
  author: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 1 },
});
