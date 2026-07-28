import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { PHRASE_SETS, type PhraseSet } from '@/constants/phrasebook';
import { speak } from '@/lib/speak';

function PhraseRow({ p }: { p: { fa: string; tr: string; en: string; note?: string } }) {
  return (
    <Pressable style={s.row} onPress={() => speak(p.fa, 'fa')}>
      <View style={{ flex: 1 }}>
        <Text style={s.en}>{p.en}</Text>
        <Text style={s.fa}>{p.fa}</Text>
        <Text style={s.tr}>{p.tr}</Text>
        {p.note ? <Text style={s.note}>{p.note}</Text> : null}
      </View>
      <Ionicons name="volume-medium-outline" size={17} color={lw.muted} />
    </Pressable>
  );
}

export default function PhrasebookScreen() {
  const [open, setOpen] = useState<PhraseSet | null>(null);
  const [q, setQ] = useState('');

  const needle = q.trim().toLowerCase();
  const hits = needle
    ? PHRASE_SETS.flatMap((set) =>
        set.phrases.filter(
          (p) =>
            p.en.toLowerCase().includes(needle) ||
            p.tr.toLowerCase().includes(needle) ||
            p.fa.includes(q.trim()),
        ),
      )
    : [];

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => (open ? setOpen(null) : router.back())}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Text style={s.topT}>{open ? open.title : 'Phrasebook'}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {!open ? (
          <>
            <Text style={s.title}>Say it{'\n'}right away</Text>
            <Text style={s.sub}>Tap any line to hear it. No lesson required.</Text>

            <View style={s.search}>
              <Ionicons name="search" size={15} color={lw.muted} />
              <TextInput
                style={s.searchIn}
                placeholder="Search in English or Persian"
                placeholderTextColor={lw.muted}
                value={q}
                onChangeText={setQ}
              />
              {q ? (
                <Pressable hitSlop={8} onPress={() => setQ('')}>
                  <Ionicons name="close-circle" size={16} color={lw.muted} />
                </Pressable>
              ) : null}
            </View>

            {needle ? (
              hits.length === 0 ? (
                <Text style={s.empty}>Nothing for “{q}”.</Text>
              ) : (
                <View style={s.list}>{hits.map((p, i) => <PhraseRow key={p.fa + i} p={p} />)}</View>
              )
            ) : (
              <View style={s.sets}>
                {PHRASE_SETS.map((set) => (
                  <Pressable key={set.key} style={s.set} onPress={() => setOpen(set)}>
                    <Text style={s.setGlyph}>{set.glyph}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={s.setT}>{set.title}</Text>
                      <Text style={s.setX}>{set.blurb}</Text>
                    </View>
                    <Text style={s.setN}>{set.phrases.length}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        ) : (
          <>
            <Text style={s.setFa}>{open.titleFa}</Text>
            <View style={s.list}>{open.phrases.map((p, i) => <PhraseRow key={p.fa + i} p={p} />)}</View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topT: { fontFamily: fonts.body, fontSize: 15, color: lw.ink },

  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  title: { fontFamily: fonts.body, fontSize: 34, lineHeight: 41, color: lw.green },
  sub: { fontFamily: fonts.body, fontSize: 13.5, color: lw.inkSoft, marginTop: spacing.sm },

  search: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: lw.surface, borderWidth: 1, borderColor: lw.hair, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: 10, marginTop: spacing.xl },
  searchIn: { flex: 1, fontFamily: fonts.body, fontSize: 14.5, color: lw.ink },
  empty: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: spacing.xl },

  sets: { marginTop: spacing.xl, gap: spacing.sm },
  set: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, backgroundColor: lw.surface, borderWidth: 1, borderColor: lw.hair, borderRadius: 14, padding: spacing.lg },
  setGlyph: { fontFamily: fonts.persian, fontSize: 26, color: lw.green, width: 34, textAlign: 'center' },
  setT: { fontFamily: fonts.body, fontSize: 16, color: lw.ink },
  setX: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, marginTop: 2 },
  setN: { fontFamily: fonts.body, fontSize: 12, color: lw.muted },

  setFa: { fontFamily: fonts.persian, fontSize: 26, color: lw.green, textAlign: 'right', marginBottom: spacing.md },
  list: { marginTop: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg, borderBottomWidth: 1, borderBottomColor: lw.hair },
  en: { fontFamily: fonts.body, fontSize: 15, color: lw.ink },
  fa: { fontFamily: fonts.persian, fontSize: 22, color: lw.green, marginTop: 6, textAlign: 'right' },
  tr: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, marginTop: 3 },
  note: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, marginTop: 5, fontStyle: 'italic' },
});
