// The look of the one screen where money is mentioned.
//
// Kept apart from the buying itself so it can be drawn anywhere,
// including a phone whose build has no StoreKit in it. Everything here
// is presentation: three moments on a rule, a button, and the line Apple
// requires.
//
// The original note:
//
// It appears once, at the moment somebody finishes a listing and taps
// Submit, and it is a timeline rather than a pitch: what happens today,
// what happens in a week, what happens after that. Three lines down one
// rule. Nothing to compare, nothing to choose, nothing to read twice.

import {
  ActivityIndicator, Linking, Modal, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { getLang, t, useLang } from '@/lib/i18n';
import { BILLING } from '@/constants/i18n/billing';
import { PRIVACY_URL, TERMS_URL } from '@/lib/billing';

export function ListingPaywallCard({
  busy, note, onStart, onRestore, onClose,
}: {
  busy?: boolean;
  note?: string | null;
  onStart: () => void;
  onRestore: () => void;
  onClose: () => void;
}) {
  useLang();
  const fa = getLang() === 'fa';

  const steps = [
    { k: 'now',  t: t(BILLING.stepNowT),  x: t(BILLING.stepNowX) },
    { k: 'warn', t: t(BILLING.stepWarnT), x: t(BILLING.stepWarnX) },
    { k: 'pay',  t: t(BILLING.stepPayT),  x: t(BILLING.stepPayX) },
  ];

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <View style={s.wrap}>
        <Pressable style={StyleSheet.absoluteFill} onPress={busy ? undefined : onClose} />

        <View style={s.card}>
          <Text style={[s.title, fa && s.rtl]}>{t(BILLING.title)}</Text>
          <Text style={[s.lead, fa && s.rtl]}>{t(BILLING.lead)}</Text>

          {/* The timeline. One rule down the side, a mark for each moment,
              and the last one filled because it is the one that costs. */}
          <View style={[s.track, fa && s.trackRtl]}>
            <View style={s.rule} />
            {steps.map((st, i) => (
              <View key={st.k} style={[s.step, fa && s.stepRtl]}>
                <View style={[s.dot, i === steps.length - 1 && s.dotOn]} />
                <View style={{ flex: 1 }}>
                  <Text style={[s.stepT, fa && s.rtl]}>{st.t}</Text>
                  <Text style={[s.stepX, fa && s.rtl]}>{st.x}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable style={s.ctaWrap} onPress={onStart} disabled={busy}>
            <LinearGradient
              colors={['#7FB2C0', '#3E6E78']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[s.cta, busy && { opacity: 0.6 }]}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0)']}
                style={s.sheen}
                pointerEvents="none"
              />
              {busy
                ? <ActivityIndicator color="#FFF" />
                : <Text style={s.ctaT}>{t(BILLING.start)}</Text>}
            </LinearGradient>
          </Pressable>

          {note ? <Text style={[s.note, fa && s.rtl]}>{note}</Text> : null}

          <Text style={[s.legal, fa && s.rtl]}>{t(BILLING.legal)}</Text>

          <View style={s.links}>
            <Pressable hitSlop={8} onPress={() => Linking.openURL(TERMS_URL)}>
              <Text style={s.link}>{t(BILLING.terms)}</Text>
            </Pressable>
            <View style={s.linkDot} />
            <Pressable hitSlop={8} onPress={() => Linking.openURL(PRIVACY_URL)}>
              <Text style={s.link}>{t(BILLING.privacy)}</Text>
            </Pressable>
            <View style={s.linkDot} />
            <Pressable hitSlop={8} onPress={onRestore} disabled={busy}>
              <Text style={s.link}>{t(BILLING.restore)}</Text>
            </Pressable>
          </View>

          <Pressable style={s.ghost} onPress={onClose} disabled={busy} hitSlop={8}>
            <Text style={s.ghostT}>{t(BILLING.notNow)}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: 'rgba(24,17,14,0.55)', justifyContent: 'center', padding: spacing.lg },
  card: {
    backgroundColor: colors.background, borderRadius: 22,
    paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.lg,
    shadowColor: '#241C19', shadowOpacity: 0.22, shadowRadius: 28,
    shadowOffset: { width: 0, height: 10 }, elevation: 8,
  },
  title: { fontFamily: fonts.heading, fontSize: 26, color: colors.textPrimary },
  lead: {
    fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21,
    color: colors.textSecondary, marginTop: 6,
  },

  track: { marginTop: spacing.xl, marginBottom: spacing.lg, paddingLeft: 4 },
  trackRtl: { paddingLeft: 0, paddingRight: 4 },
  // The rule runs behind the marks rather than between them, so the
  // spacing of the text decides the rhythm and nothing has to be measured.
  rule: {
    position: 'absolute', left: 7, top: 10, bottom: 14, width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(62,110,120,0.30)',
  },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.lg },
  stepRtl: { flexDirection: 'row-reverse' },
  dot: {
    width: 9, height: 9, borderRadius: 5, marginTop: 5,
    backgroundColor: colors.background,
    borderWidth: 1, borderColor: 'rgba(62,110,120,0.55)',
  },
  dotOn: { backgroundColor: '#3E6E78', borderColor: '#3E6E78' },
  stepT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary },
  stepX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary, marginTop: 1 },

  ctaWrap: {
    borderRadius: radius.pill,
    shadowColor: '#1E3B42', shadowOpacity: 0.22, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  cta: {
    borderRadius: radius.pill, minHeight: 50,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  sheen: { position: 'absolute', left: 0, right: 0, top: 0, height: 18 },
  ctaT: { fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.4, color: '#FFF' },

  note: {
    fontFamily: fonts.body, fontSize: 12.5, color: colors.accent,
    textAlign: 'center', marginTop: spacing.md,
  },
  legal: {
    fontFamily: fonts.body, fontSize: 10.5, lineHeight: 16,
    color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md, opacity: 0.85,
  },
  links: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: 6 },
  link: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, textDecorationLine: 'underline' },
  linkDot: { width: 2, height: 2, borderRadius: 1, backgroundColor: colors.textSecondary, opacity: 0.6 },

  ghost: { alignSelf: 'center', paddingVertical: spacing.md, marginTop: 2 },
  ghostT: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },

  rtl: { textAlign: 'right', writingDirection: 'rtl' },
});
