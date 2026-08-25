// The place control, for the Local header.
//
// Centred between the menu and the icons rather than filed under the title:
// it governs the feed, both rails and the map together, so it belongs with
// the navigation rather than looking like one filter among several.

import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';

export function PlaceChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={[st.chip, active && st.chipOn]} onPress={onPress}>
      <Ionicons
        name="location-outline"
        size={13}
        color={active ? colors.accent : colors.textSecondary}
      />
      <Text style={[st.chipT, active && { color: colors.textPrimary }]} numberOfLines={1}>
        {label}
      </Text>
      <Ionicons name="chevron-down" size={11} color={colors.textSecondary} />
    </Pressable>
  );
}

const st = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    maxWidth: 190,
  },
  chipOn: { borderColor: colors.accent },
  chipT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, flexShrink: 1 },
});
