import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { tpm } from '@/constants/tpm-theme';
import { TpmMark } from '@/components/tpm-mark';
import { subscribe, FREE_READS } from '@/lib/tpm-access';

// Demo only. Nothing is charged; the App Store flow is not wired.
export function Paywall({ onDone }: { onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const buy = async () => {
    setBusy(true);
    // stands in for the App Store sheet
    await new Promise((r) => setTimeout(r, 900));
    await subscribe();
    setBusy(false);
    setDone(true);
    setTimeout(onDone, 700);
  };

  if (done) {
    return (
      <View style={s.wrap}>
        <View style={s.tick}><Ionicons name="checkmark" size={22} color={tpm.paper} /></View>
        <Text style={s.doneT}>You are in</Text>
        <Text style={s.doneX}>Everything TPM publishes, from here on.</Text>
      </View>
    );
  }

  return (
    <View style={s.wrap}>
      <View style={s.topRule} />
      <TpmMark size={20} />

      <Text style={s.title}>Keep reading</Text>
      <Text style={s.body}>
        You have read your {FREE_READS} free pieces this cycle. Subscribe for everything
        The Persian Mag publishes: the portraits, the studio visits, the archive.
      </Text>

      <View style={s.price}>
        <Text style={s.priceN}>$2.99</Text>
        <Text style={s.priceX}>every two weeks</Text>
      </View>

      <View style={s.perks}>
        {[
          'Every piece, as it is published',
          'The full archive, ten years of it',
          'The people behind the work, in their own words',
          'Cancel any time from the App Store',
        ].map((x) => (
          <View key={x} style={s.perk}>
            <View style={s.perkDot} />
            <Text style={s.perkT}>{x}</Text>
          </View>
        ))}
      </View>

      <Pressable style={[s.cta, busy && { opacity: 0.7 }]} disabled={busy} onPress={buy}>
        {busy ? <ActivityIndicator color={tpm.paper} /> : <Text style={s.ctaT}>Subscribe</Text>}
      </Pressable>

      <Text style={s.small}>
        Billed through the App Store. Renews every two weeks until cancelled.
      </Text>
      <Text style={s.demo}>Demo — nothing is charged</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  topRule: { width: 44, height: 3, backgroundColor: tpm.red, marginBottom: spacing.xl },

  title: { fontFamily: fonts.bodyStrong, fontSize: 30, letterSpacing: -0.5, color: tpm.ink, marginTop: spacing.lg },
  body: { fontFamily: fonts.body, fontSize: 14, lineHeight: 23, color: tpm.inkSoft, textAlign: 'center', marginTop: spacing.md, maxWidth: 320 },

  price: { alignItems: 'center', marginTop: spacing.xl },
  priceN: { fontFamily: fonts.bodyStrong, fontSize: 42, letterSpacing: -1.5, color: tpm.red },
  priceX: { fontFamily: fonts.body, fontSize: 12, color: tpm.muted, marginTop: 2 },

  perks: { alignSelf: 'stretch', marginTop: spacing.xl, gap: spacing.sm },
  perk: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  perkDot: { width: 4, height: 4, backgroundColor: tpm.red },
  perkT: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: tpm.ink },

  cta: { alignSelf: 'stretch', backgroundColor: tpm.ink, paddingVertical: 16, alignItems: 'center', marginTop: spacing.xl },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, letterSpacing: 0.5, color: tpm.paper },

  small: { fontFamily: fonts.body, fontSize: 10.5, lineHeight: 16, color: tpm.muted, textAlign: 'center', marginTop: spacing.md, maxWidth: 280 },
  demo: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 1.6, color: tpm.faint, marginTop: spacing.md },

  tick: { width: 52, height: 52, backgroundColor: tpm.red, alignItems: 'center', justifyContent: 'center' },
  doneT: { fontFamily: fonts.bodyStrong, fontSize: 24, color: tpm.ink, marginTop: spacing.lg },
  doneX: { fontFamily: fonts.body, fontSize: 13.5, color: tpm.inkSoft, marginTop: 6 },
});
