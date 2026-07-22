import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useSaved } from '@/lib/saved-store';

// A small heart + bookmark pair, wired to the saved-store. Works for any
// keyed item: articles, topics, poets, culture cards. Stops propagation so
// tapping an icon toggles without triggering a parent press.
export function SaveHeart({ itemKey, size = 18, tint = '#241C19', gap = 14, likeColor = '#C4433F', saveColor = '#8C6A3F' }: {
  itemKey: string; size?: number; tint?: string; gap?: number; likeColor?: string; saveColor?: string;
}) {
  const { isLiked, isSaved, toggleLike, toggleSave } = useSaved();
  return (
    <View style={[styles.row, { gap }]}>
      <Pressable hitSlop={8} onPress={(e) => { (e as any).stopPropagation?.(); toggleLike(itemKey); }}>
        <Ionicons name={isLiked(itemKey) ? 'heart' : 'heart-outline'} size={size} color={isLiked(itemKey) ? likeColor : tint} />
      </Pressable>
      <Pressable hitSlop={8} onPress={(e) => { (e as any).stopPropagation?.(); toggleSave(itemKey); }}>
        <Ionicons name={isSaved(itemKey) ? 'bookmark' : 'bookmark-outline'} size={size - 1} color={isSaved(itemKey) ? saveColor : tint} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
