import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';

export function ZandHeader({
  showSearch = false, spine,
}: {
  showSearch?: boolean;
  /** Draw the timeline's continuation above the wordmark. Explore's
   *  history spine runs up the page and breaks at the mark; this is the
   *  piece that carries on above it. */
  spine?: { x: number; colour: string; opacity?: any };
}) {
  return (
    <View style={styles.header}>
      {spine ? (
        <>
          {/* Above the mark, off the top of the screen. */}
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute', left: spine.x - 0.7, top: -400,
              width: 1.4, height: 400 + 15,
              backgroundColor: spine.colour,
              opacity: spine.opacity ?? 1,
            }}
          />
          {/* And below it, meeting the page's own line. The break is the
              mark itself, not the whole header. */}
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute', left: spine.x - 0.7, top: 35,
              width: 1.4, bottom: -1,
              backgroundColor: spine.colour,
              opacity: spine.opacity ?? 1,
            }}
          />
        </>
      ) : null}
      <Pressable hitSlop={8} onPress={() => router.navigate('/')}>
        <Text style={styles.wordmark}>ZAND</Text>
      </Pressable>
      <View style={styles.actions}>
        {showSearch ? (
          <Pressable hitSlop={10} onPress={() => router.navigate('/search')}>
            <Ionicons name="search" size={22} color={colors.textPrimary} />
          </Pressable>
        ) : null}
        <Pressable hitSlop={10} onPress={() => router.navigate('/menu')}>
          <Ionicons name="menu" size={26} color={colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  wordmark: { fontFamily: fonts.wordmark, fontSize: 18, letterSpacing: 4, color: colors.textPrimary },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
});
