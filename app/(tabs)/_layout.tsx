import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { getLang, t, useLang } from '@/lib/i18n';
import { NAV } from '@/constants/i18n/nav';
import { TpmIcon } from '@/components/tpm-mark';
import { tpm } from '@/constants/tpm-theme';

function TabLabel({ k }: { k: any }) {
  useLang();
  const fa = getLang() === 'fa';
  return (
    <Text style={{ fontFamily: fa ? fonts.persian : fonts.body, fontSize: fa ? 12 : 11 }}>
      {t(k)}
    </Text>
  );
}

export default function TabLayout() {
  // Deliberately NOT useLang(). Every Tabs.Screen is declared in this
  // function, so subscribing here re-renders the navigator on a language
  // change — which rebuilds its screen registry underneath the screens
  // trying to update, and leaves stale subscribed copies behind. The tab
  // titles below are resolved at render, so they follow the language via
  // whatever re-renders this for navigation reasons.
  // Subscribing is safe as long as the Tabs.Screen list does not change
  // shape. Labels come through tabBarLabel, which is called per render, so
  // they follow the language without the navigator re-registering screens —
  // the thing that leaked instances before.
  useLang();
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
      <Tabs.Screen name="index" options={{ tabBarLabel: () => <TabLabel k={NAV.home} />, tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="learn" options={{ tabBarLabel: () => <TabLabel k={NAV.learn} />, tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ tabBarLabel: () => <TabLabel k={NAV.explore} />, tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} /> }} />
      <Tabs.Screen
        name="tpm"
        options={{
          title: 'TPM',
          tabBarIcon: ({ focused, size }) => <TpmIcon size={size + 8} color={focused ? tpm.red : colors.textSecondary} />,
        }}
      />
      <Tabs.Screen name="local" options={{ tabBarLabel: () => <TabLabel k={NAV.local} />, tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="local-cities" options={{ href: null }} />
      <Tabs.Screen name="local-city" options={{ href: null }} />
      <Tabs.Screen name="local-categories" options={{ href: null }} />
      <Tabs.Screen name="local-saved" options={{ href: null }} />
      <Tabs.Screen name="business" options={{ href: null }} />
      <Tabs.Screen name="business-new" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: () => <TabLabel k={NAV.profile} />, tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
