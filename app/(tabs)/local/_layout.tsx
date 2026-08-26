import { Stack } from 'expo-router';

import { colors } from '@/constants/zand-theme';

/**
 * Local, as a stack.
 *
 * Everything here is reached from somewhere else here — a city from the
 * list, a listing from a city, a folder from saved — so it wants history
 * rather than a row of siblings. That is what gives the edge gesture and
 * the push transition; a tab navigator has neither, because it has
 * nothing to go back to.
 */
export default function LocalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        // The reason for all of this.
        gestureEnabled: true,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
