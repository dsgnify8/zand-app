import { useEffect, useState } from 'react';
import { Modal, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, spacing } from '@/constants/zand-theme';

/* Catch a screenshot and offer to share the page it came from, the way Pinterest does. */

const TITLES: { match: string; label: string }[] = [
  { match: '/literature/reader', label: 'a poet on ZAND' },
  { match: '/literature', label: 'the poets of Iran' },
  { match: '/geography', label: 'the land of Iran' },
  { match: '/language', label: 'the Persian language' },
  { match: '/culture/topic', label: 'the unwritten rules' },
  { match: '/culture', label: 'Persian culture' },
  { match: '/traditions', label: 'Nowruz and Yalda' },
  { match: '/education/topic', label: 'a piece of Persian history' },
  { match: '/education', label: 'Persian history' },
  { match: '/learn', label: 'learning Persian' },
];

function describe(path: string) {
  const hit = TITLES.find((t) => path.startsWith(t.match));
  return hit ? hit.label : 'ZAND';
}

export function ShareCatch() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    let sub: any;
    (async () => {
      try {
        const SC = await import('expo-screen-capture');
        sub = SC.addScreenshotListener(() => setOpen(true));
      } catch {
        // not available in this runtime; the dev build will have it
      }
    })();
    return () => { try { sub?.remove(); } catch {} };
  }, []);

  const url = 'https://zand.app' + (path || '/');
  const label = describe(path || '/');

  const share = async () => {
    setOpen(false);
    try {
      await Share.share({ message: 'Found this on ZAND, ' + label + '.\n' + url, url });
    } catch {}
  };

  if (!open) return null;

  return (
    <Modal transparent visible animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable style={sc.backdrop} onPress={() => setOpen(false)}>
        <Pressable style={sc.card} onPress={() => {}}>
          <LinearGradient
            colors={['#8C3A2E', '#C4705A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={sc.top}
          >
            <Ionicons name="camera-outline" size={22} color="#FFF" />
            <Text style={sc.topT}>Nice screenshot</Text>
          </LinearGradient>

          <View style={sc.body}>
            <Text style={sc.t}>Share this instead?</Text>
            <Text style={sc.x}>
              A link goes with it, so whoever you send it to lands on {label} rather than looking at a picture of it.
            </Text>

            <View style={sc.linkRow}>
              <Ionicons name="link-outline" size={13} color={colors.textSecondary} />
              <Text style={sc.link} numberOfLines={1}>{url}</Text>
            </View>

            <Pressable style={sc.btn} onPress={share}>
              <Ionicons name="share-outline" size={15} color={colors.surface} />
              <Text style={sc.btnT}>Share this post</Text>
            </Pressable>

            <Pressable style={sc.skip} onPress={() => setOpen(false)}>
              <Text style={sc.skipT}>Keep the screenshot</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const sc = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 330, backgroundColor: colors.background, borderRadius: 18, overflow: 'hidden' },
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  topT: { fontFamily: fonts.bodyStrong, fontSize: 12, letterSpacing: 1, color: '#FFF' },
  body: { padding: spacing.lg },
  t: { fontFamily: fonts.heading, fontSize: 25, color: colors.textPrimary },
  x: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 20, color: colors.textSecondary, marginTop: spacing.sm },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(36,28,25,0.05)', borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: 7, marginTop: spacing.md },
  link: { flex: 1, fontFamily: fonts.body, fontSize: 10.5, color: colors.textSecondary },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.textPrimary, borderRadius: 22, paddingVertical: 11, marginTop: spacing.lg },
  btnT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.surface },
  skip: { alignItems: 'center', paddingVertical: spacing.md },
  skipT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
});
