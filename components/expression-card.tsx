import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { EXPRESSIONS, expressionOfDay, type Expression } from '@/constants/expressions';
import { speak } from '@/lib/speak';

function Detail({ e, onClose }: { e: Expression | null; onClose: () => void }) {
  if (!e) return null;
  return (
    <Modal transparent visible={!!e} animationType="slide" onRequestClose={onClose}>
      <Pressable style={d.backdrop} onPress={onClose}>
        <Pressable style={d.sheet} onPress={() => {}}>
          <View style={d.grab} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable style={d.faWrap} onPress={() => speak(e.fa, 'fa')}>
              <Text style={d.fa}>{e.fa}</Text>
              <View style={d.sayRow}>
                <Ionicons name="volume-medium-outline" size={15} color={lw.muted} />
                <Text style={d.tr}>{e.tr}</Text>
              </View>
            </Pressable>

            <View style={d.rule} />

            <Text style={d.label}>WHAT IT DOES</Text>
            <Text style={d.en}>{e.en}</Text>

            <Text style={d.label}>WHAT IT SAYS</Text>
            <Text style={d.literal}>{e.literal}</Text>

            <Text style={d.label}>WHEN</Text>
            <Text style={d.body}>{e.when}</Text>

            {e.note ? (
              <View style={d.note}><Text style={d.body}>{e.note}</Text></View>
            ) : null}

            <View style={{ height: spacing.xxl }} />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function ExpressionCard() {
  const today = expressionOfDay();
  const [open, setOpen] = useState<Expression | null>(null);
  const [all, setAll] = useState(false);

  return (
    <View>
      <Pressable style={s.card} onPress={() => setOpen(today)}>
        <Text style={s.kicker}>EXPRESSION OF THE DAY</Text>
        <Text style={s.fa}>{today.fa}</Text>
        <Text style={s.tr}>{today.tr}</Text>
        <View style={s.rule} />
        <Text style={s.literal}>{today.literal}</Text>
        <Text style={s.en}>{today.en}</Text>
      </Pressable>

      <Pressable hitSlop={8} onPress={() => setAll((v) => !v)}>
        <Text style={s.more}>{all ? 'hide the rest' : 'see all ' + EXPRESSIONS.length}</Text>
      </Pressable>

      {all ? (
        <View style={s.list}>
          {EXPRESSIONS.filter((e) => e.key !== today.key).map((e) => (
            <Pressable key={e.key} style={s.row} onPress={() => setOpen(e)}>
              <View style={{ flex: 1 }}>
                <Text style={s.rowFa}>{e.fa}</Text>
                <Text style={s.rowEn}>{e.en}</Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color={lw.muted} />
            </Pressable>
          ))}
        </View>
      ) : null}

      <Detail e={open} onClose={() => setOpen(null)} />
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: lw.greenWash, borderRadius: 18, padding: spacing.xl, alignItems: 'center' },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2.5, color: lw.green },
  fa: { fontFamily: fonts.persian, fontSize: 32, lineHeight: 56, color: lw.ink, marginTop: spacing.md, textAlign: 'center' },
  tr: { fontFamily: fonts.body, fontSize: 13, color: lw.muted },
  rule: { width: 34, height: 1, backgroundColor: lw.rule, marginVertical: spacing.md },
  literal: { fontFamily: fonts.body, fontSize: 14, color: lw.green, fontStyle: 'italic', textAlign: 'center' },
  en: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, marginTop: 4, textAlign: 'center' },
  more: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, textAlign: 'center', marginTop: spacing.md },

  list: { marginTop: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  rowFa: { fontFamily: fonts.persian, fontSize: 19, color: lw.ink, textAlign: 'right' },
  rowEn: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, marginTop: 2 },
});

const d = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(20,26,20,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: lw.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.xl, paddingTop: spacing.sm, maxHeight: '82%' },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: lw.hair, alignSelf: 'center', marginBottom: spacing.lg },
  faWrap: { alignItems: 'center' },
  fa: { fontFamily: fonts.persian, fontSize: 38, lineHeight: 62, color: lw.ink, textAlign: 'center' },
  sayRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
  tr: { fontFamily: fonts.body, fontSize: 14, color: lw.muted },
  rule: { width: 40, height: 1, backgroundColor: lw.rule, alignSelf: 'center', marginVertical: spacing.xl },
  label: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2.5, color: lw.muted, marginTop: spacing.lg },
  en: { fontFamily: fonts.body, fontSize: 17, color: lw.ink, marginTop: 6 },
  literal: { fontFamily: fonts.body, fontSize: 17, color: lw.green, fontStyle: 'italic', marginTop: 6 },
  body: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 25, color: lw.inkSoft, marginTop: 6 },
  note: { backgroundColor: lw.greenWash, borderRadius: 14, padding: spacing.lg, marginTop: spacing.xl },
});
