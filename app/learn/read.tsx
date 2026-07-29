import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { READINGS, readingByKey, type Gloss } from '@/constants/readings';
import { speak } from '@/lib/speak';
import { Art } from '@/components/lang-art';

export default function ReadScreen() {
  const { text } = useLocalSearchParams<{ text?: string }>();
  const r = readingByKey(text);
  const [word, setWord] = useState<Gloss | null>(null);
  const [showEn, setShowEn] = useState(false);

  // no text chosen: list them
  if (!r) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.top}>
          <Pressable hitSlop={12} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
          <Art name="book" size={88} style={{ alignSelf: 'flex-end', opacity: 0.5, marginBottom: -4 }} />
          <Text style={s.eyebrow}>READING</Text>
          <Text style={s.title}>Real Persian,{'\n'}a little at a time</Text>
          <Text style={s.sub}>Tap any word you do not know. Nothing is hidden from you.</Text>
          <View style={s.list}>
            {READINGS.map((x) => (
              <Pressable key={x.key} style={s.row} onPress={() => router.navigate(('/learn/read?text=' + x.key) as any)}>
                <View style={{ flex: 1 }}>
                  <Text style={s.rowT}>{x.title}</Text>
                  <Text style={s.rowFa}>{x.titleFa}</Text>
                  <Text style={s.rowX}>{x.blurb}</Text>
                </View>
                <Text style={s.rowMin}>{x.minutes} min</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.navigate('/learn/read' as any)}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Pressable hitSlop={10} onPress={() => setShowEn((v) => !v)}>
          <Text style={s.toggle}>{showEn ? 'hide English' : 'show English'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.readTitle}>{r.title}</Text>
        <Text style={s.readFa}>{r.titleFa}</Text>

        <View style={s.textWrap}>
          {r.lines.map((line, li) => (
            <View key={li} style={s.lineBlock}>
              <View style={s.line}>
                {line.map((w, wi) => (
                  <Pressable key={wi} onPress={() => setWord(r.gloss[w] ?? null)}>
                    <Text style={s.word}>{w}</Text>
                  </Pressable>
                ))}
              </View>
              <Pressable style={s.sayLine} onPress={() => speak(line.join(' '), 'fa')}>
                <Ionicons name="volume-low-outline" size={13} color={lw.muted} />
              </Pressable>
              {showEn ? <Text style={s.trans}>{r.translation[li]}</Text> : null}
            </View>
          ))}
        </View>

        {r.note ? (
          <View style={s.note}>
            <Text style={s.noteT}>{r.note}</Text>
          </View>
        ) : null}
      </ScrollView>

      <Modal transparent visible={!!word} animationType="fade" onRequestClose={() => setWord(null)}>
        <Pressable style={s.backdrop} onPress={() => setWord(null)}>
          <Pressable style={s.card} onPress={() => {}}>
            <Text style={s.cardFa}>{word?.fa}</Text>
            <Text style={s.cardTr}>{word?.tr}</Text>
            <View style={s.cardRule} />
            <Text style={s.cardEn}>{word?.en}</Text>
            <Pressable style={s.cardSay} onPress={() => word && speak(word.fa, 'fa')}>
              <Ionicons name="volume-medium-outline" size={17} color={lw.green} />
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  toggle: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted },

  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 3, color: lw.muted },
  title: { fontFamily: fonts.body, fontSize: 32, lineHeight: 40, color: lw.green, marginTop: spacing.sm },
  sub: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20, color: lw.inkSoft, marginTop: spacing.sm },

  list: { marginTop: spacing.xl },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg, borderBottomWidth: 1, borderBottomColor: lw.hair },
  rowT: { fontFamily: fonts.body, fontSize: 16, color: lw.ink },
  rowFa: { fontFamily: fonts.persian, fontSize: 14, color: lw.green, marginTop: 2 },
  rowX: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, marginTop: 4 },
  rowMin: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted },

  readTitle: { fontFamily: fonts.body, fontSize: 26, color: lw.ink },
  readFa: { fontFamily: fonts.persian, fontSize: 18, color: lw.green, marginTop: 2 },

  textWrap: { marginTop: spacing.xl },
  lineBlock: { marginBottom: spacing.xl },
  // right to left, as the text is read
  line: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 },
  word: { fontFamily: fonts.persian, fontSize: 25, lineHeight: 48, color: lw.ink },
  sayLine: { alignSelf: 'flex-end', paddingVertical: 4, paddingHorizontal: 2 },
  trans: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: lw.muted, marginTop: 4 },

  note: { backgroundColor: lw.greenWash, borderRadius: 16, padding: spacing.lg, marginTop: spacing.lg },
  noteT: { fontFamily: fonts.body, fontSize: 14, lineHeight: 24, color: lw.inkSoft },

  backdrop: { flex: 1, backgroundColor: 'rgba(20,26,20,0.4)', alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  card: { backgroundColor: lw.bg, borderRadius: 20, padding: spacing.xl, alignItems: 'center', minWidth: 240 },
  cardFa: { fontFamily: fonts.persian, fontSize: 40, lineHeight: 64, color: lw.ink },
  cardTr: { fontFamily: fonts.body, fontSize: 14, color: lw.muted },
  cardRule: { width: 34, height: 1, backgroundColor: lw.rule, marginVertical: spacing.md },
  cardEn: { fontFamily: fonts.body, fontSize: 17, color: lw.green, textAlign: 'center' },
  cardSay: { marginTop: spacing.lg, width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: lw.rule, alignItems: 'center', justifyContent: 'center' },
});
