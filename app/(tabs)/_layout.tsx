import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/zand-theme';
import { useLang } from '@/lib/i18n';
import { NAV } from '@/constants/i18n/nav';

export default function TabLayout() {
  const { t, lang } = useLang();
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
      <Tabs.Screen name="profile" options={{ title: t(NAV.profile), tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
