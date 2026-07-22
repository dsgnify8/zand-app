import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';

export function ZandHeader({ showSearch = false }: { showSearch?: boolean }) {
  return (
    <View style={styles.header}>
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
