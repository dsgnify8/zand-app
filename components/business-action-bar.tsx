// Call, directions, website — always within reach.
//
// These used to sit in the body near the top and scroll away. Ringing a
// place is the single most common thing anyone wants from a directory, and
// making someone scroll back up to do it is a wasted tap on the one action
// that matters most.
//
// Glass rather than solid so the photography stays visible underneath: the
// bar belongs to the page rather than sitting on top of it. expo-blur is
// already a dependency — the language overlay uses it.
//
// Only the actions a listing actually has appear. A greyed-out Call on a
// business with no phone number is worse than three buttons where there
// might have been four.

import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { ACT_TINT } from '@/components/local-tints';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

export function BusinessActionBar({
  phone,
  website,
  hasMap,
  onDirections,
}: {
  phone?: string | null;
  website?: string | null;
  hasMap: boolean;
  onDirections: () => void;
}) {
  const fa = getLang() === 'fa';

  const acts = [
    phone && {
      key: 'call',
      icon: 'call-outline',
      tint: ACT_TINT.call,
      label: t(LOCAL.call),
      run: () => Linking.openURL('tel:' + phone),
    },
    hasMap && {
      key: 'directions',
      icon: 'navigate-outline',
      tint: ACT_TINT.directions,
      label: t(LOCAL.directions),
      run: onDirections,
    },
    website && {
      key: 'website',
      icon: 'globe-outline',
      tint: ACT_TINT.website,
      label: t(LOCAL.website),
      run: () =>
        Linking.openURL(website.startsWith('http') ? website : 'https://' + website),
    },
  ].filter(Boolean) as {
    key: string; icon: string; tint: string; label: string; run: () => void;
  }[];

  if (acts.length === 0) return null;

  return (
    <View style={st.wrap} pointerEvents="box-none">
      <View style={st.bar}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 40 : 90}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
        {/* A veil over the blur: on a dark photograph the blur alone goes
            grey and the labels stop being legible. */}
        <View style={[StyleSheet.absoluteFill, st.veil]} />

        <View style={[st.row, fa && { flexDirection: 'row-reverse' }]}>
          {acts.map((a, i) => (
            <View key={a.key} style={[st.slot, fa && { flexDirection: 'row-reverse' }]}>
              {i > 0 ? <View style={st.divider} /> : null}
              <Pressable style={st.act} onPress={a.run}>
                <Ionicons name={a.icon as any} size={17} color={a.tint} />
                <Text style={[st.actT, fa && st.rtl]} numberOfLines={1}>{a.label}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    // Clear of the tab bar rather than tucked against it.
    bottom: spacing.xl,
  },
  bar: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.55)',
    shadowColor: '#2A1A14',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  veil: { backgroundColor: 'rgba(250,247,243,0.62)' },

  row: { flexDirection: 'row', alignItems: 'center' },
  slot: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  divider: { width: StyleSheet.hairlineWidth, height: 22, backgroundColor: 'rgba(40,24,20,0.14)' },

  act: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 15,
  },
  actT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary },

  rtl: { writingDirection: 'rtl' },
});
