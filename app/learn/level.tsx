import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { LEVELS, setLevel, skipLevel, type Level } from '@/lib/learn-level';
import { Art } from '@/components/lang-art';

export default function LevelScreen() {
  const [picked, setPicked] = useState<Level | null>(null);

  const go = async () => {
    if (!picked) return;
    await setLevel(picked);
    const dest = LEVELS.find((l) => l.key === picked)?.start ?? '/learn';
    router.replace((dest ?? '/learn') as any);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Pressable hitSlop={12} style={s.back} onPress={() => (router.canGoBack() ? router.back() : router.replace('/' as any))}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Art name="cypress" size={92} style={s.art} />
        <Text style={s.eyebrow}>PERSIAN  ·  فارسی</Text>
        <Text style={s.title}>Where do{'\n'}you start?</Text>
        <Text style={s.sub}>
          This only sets where your path begins. Everything else stays open to you.
        </Text>

        <View style={s.rule} />

        <View style={s.list}>
          {LEVELS.map((l) => {
            const on = picked === l.key;
            return (
              <Pressable key={l.key} style={[s.row, on && s.rowOn]} onPress={() => setPicked(l.key)}>
                <Text style={[s.roman, on && s.romanOn]}>{l.roman}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[s.name, on && s.nameOn]}>{l.name}</Text>
                  <Text style={s.blurb}>{l.blurb}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={[s.cta, !picked && s.ctaOff]} disabled={!picked} onPress={go}>
          <Text style={s.ctaT}>Begin</Text>
        </Pressable>

        <Pressable hitSlop={10} onPress={async () => { await skipLevel(); router.replace('/learn' as any); }}>
          <Text style={s.skip}>I would rather just look around</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.lg },

  back: { alignSelf: 'flex-start', paddingVertical: 6, paddingRight: 12 },
  art: { alignSelf: 'flex-end', opacity: 0.5, marginBottom: -8 },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 3, color: lw.muted },
  title: { fontFamily: fonts.body, fontSize: 25, lineHeight: 32, color: lw.green, marginTop: spacing.sm },
  sub: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: lw.inkSoft, marginTop: 6 },

  rule: { height: 1, backgroundColor: lw.rule, marginTop: spacing.lg, opacity: 0.7 },

  list: { marginTop: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  rowOn: { },
  roman: { fontFamily: fonts.body, fontSize: 17, color: lw.muted, width: 30 },
  romanOn: { color: lw.green },
  name: { fontFamily: fonts.body, fontSize: 16, color: lw.ink },
  nameOn: { fontFamily: fonts.bodyStrong, color: lw.green },
  blurb: { fontFamily: fonts.body, fontSize: 12, lineHeight: 17, color: lw.muted, marginTop: 2 },

  cta: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 14, alignItems: 'center', marginTop: spacing.xl },
  ctaOff: { backgroundColor: lw.greenPale },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF', letterSpacing: 0.3 },

  skip: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, textAlign: 'center', marginTop: spacing.md },
});
