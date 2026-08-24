import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { getLang, t } from '@/lib/i18n';
import { NAV } from '@/constants/i18n/nav';
import { TpmIcon } from '@/components/tpm-mark';
import { tpm } from '@/constants/tpm-theme';

export default function TabLayout() {
  // Deliberately NOT useLang(). Every Tabs.Screen is declared in this
  // function, so subscribing here re-renders the navigator on a language
  // change — which rebuilds its screen registry underneath the screens
  // trying to update, and leaves stale subscribed copies behind. The tab
  // titles below are resolved at render, so they follow the language via
  // whatever re-renders this for navigation reasons.
  const lang = getLang();
  const labelFont = lang === 'fa' ? fonts.persian : fonts.body;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontFamily: labelFont, fontSize: lang === 'fa' ? 12 : 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t(NAV.home), tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="learn" options={{ title: t(NAV.learn), tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: t(NAV.explore), tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} /> }} />
      <Tabs.Screen
        name="tpm"
        options={{
          title: 'TPM',
          tabBarIcon: ({ focused, size }) => <TpmIcon size={size + 8} color={focused ? tpm.red : colors.textSecondary} />,
        }}
      />
      <Tabs.Screen name="local" options={{ title: t(NAV.local), tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: t(NAV.profile), tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
