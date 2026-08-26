import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { getLang, t, useLang } from '@/lib/i18n';
import { NAV } from '@/constants/i18n/nav';
import { TpmIcon } from '@/components/tpm-mark';
import { tpm } from '@/constants/tpm-theme';

function TabLabel({ k, focused }: { k: any; focused?: boolean }) {
  useLang();
  const fa = getLang() === 'fa';
  return (
    <Text
      style={{
        // Weight as well as colour. A tint difference alone is easy to
        // miss at this size, and the label is the part people read.
        fontFamily: focused ? fonts.bodyStrong : (fa ? fonts.persian : fonts.body),
        fontSize: fa ? 12 : 11,
        color: focused ? colors.accent : 'rgba(40,28,24,0.38)',
      }}
    >
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
        // A fade rather than a hard cut. These pages are the same world —
        // Local, its cities, its folders — and snapping between them makes
        // each feel like somewhere else entirely.
        animation: 'fade',
        // And a swipe back, since several of these are reached from one
        // another rather than from the bar.
        gestureEnabled: true,
        // A real difference, not a shade. The active tab was a slightly
        // darker version of the inactive one, which reads as a rendering
        // artefact rather than as an answer to "where am I".
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: 'rgba(40,28,24,0.38)',
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontFamily: labelFont, fontSize: lang === 'fa' ? 12 : 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarLabel: ({ focused }) => <TabLabel k={NAV.home} focused={focused} />, tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="learn" options={{ tabBarLabel: ({ focused }) => <TabLabel k={NAV.learn} focused={focused} />, tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ tabBarLabel: ({ focused }) => <TabLabel k={NAV.explore} focused={focused} />, tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} /> }} />
      <Tabs.Screen
        name="tpm"
        options={{
          title: 'TPM',
          tabBarIcon: ({ focused, size }) => <TpmIcon size={size + 8} color={focused ? tpm.red : colors.textSecondary} />,
        }}
      />
      <Tabs.Screen name="local" options={{ tabBarLabel: ({ focused }) => <TabLabel k={NAV.local} focused={focused} />, tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="business-new" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: ({ focused }) => <TabLabel k={NAV.profile} focused={focused} />, tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
