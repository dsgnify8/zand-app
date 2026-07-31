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
  const [plan, setPlan] = useState<'year' | 'month'>('year');
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

      <View style={s.plans}>
        <Pressable style={[s.plan, plan === 'year' && s.planOn]} onPress={() => setPlan('year')}>
          <View style={s.planTop}>
            <Text style={[s.planN, plan === 'year' && s.planNOn]}>$75</Text>
            <View style={s.saveTag}><Text style={s.saveTagT}>SAVE 22%</Text></View>
          </View>
          <Text style={s.planX}>for a year, paid once</Text>
          <Text style={s.planSub}>works out at $6.25 a month</Text>
        </Pressable>

        <Pressable style={[s.plan, plan === 'month' && s.planOn]} onPress={() => setPlan('month')}>
          <View style={s.planTop}>
            <Text style={[s.planN, plan === 'month' && s.planNOn]}>$7.99</Text>
          </View>
          <Text style={s.planX}>a month</Text>
          <Text style={s.planSub}>cancel whenever you like</Text>
        </Pressable>
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
        {busy ? <ActivityIndicator color={tpm.paper} /> : <Text style={s.ctaT}>{plan === 'year' ? 'Subscribe for a year' : 'Subscribe monthly'}</Text>}
      </Pressable>

      <Text style={s.small}>
        {plan === 'year' ? 'Billed once through the App Store. Renews yearly until cancelled.' : 'Billed monthly through the App Store. Cancel any time.'}
      </Text>
      <Text style={s.demo}>Demo — nothing is charged, and the wall will return</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  topRule: { width: 44, height: 3, backgroundColor: tpm.red, marginBottom: spacing.xl },

  title: { fontFamily: fonts.bodyStrong, fontSize: 30, letterSpacing: -0.5, color: tpm.ink, marginTop: spacing.lg },
  body: { fontFamily: fonts.body, fontSize: 14, lineHeight: 23, color: tpm.inkSoft, textAlign: 'center', marginTop: spacing.md, maxWidth: 320 },

  plans: { alignSelf: 'stretch', gap: spacing.sm, marginTop: spacing.xl },
  plan: { borderWidth: 1.5, borderColor: tpm.hair, padding: spacing.lg },
  planOn: { borderColor: tpm.red, backgroundColor: tpm.redWash },
  planTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  planN: { fontFamily: fonts.bodyStrong, fontSize: 28, letterSpacing: -1, color: tpm.ink },
  planNOn: { color: tpm.red },
  planX: { fontFamily: fonts.body, fontSize: 13.5, color: tpm.ink, marginTop: 2 },
  planSub: { fontFamily: fonts.body, fontSize: 11.5, color: tpm.muted, marginTop: 2 },
  saveTag: { backgroundColor: tpm.red, paddingVertical: 3, paddingHorizontal: 7 },
  saveTagT: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.2, color: tpm.paper },
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
