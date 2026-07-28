import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';

// The standard Iranian layout, minus the punctuation a learner does not need.
// Rows read right to left, as they do on an Iranian phone.
const ROWS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ'],
  ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ'],
  ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و', 'آ', 'ژ'],
];

export function PersianKeyboard({
  onKey, onBackspace, onSpace,
}: {
  onKey: (k: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
}) {
  return (
    <View style={s.wrap}>
      {ROWS.map((row, i) => (
        <View key={i} style={s.row}>
          {row.map((k) => (
            <Pressable key={k} style={s.key} onPress={() => onKey(k)}>
              <Text style={s.keyT}>{k}</Text>
            </Pressable>
          ))}
        </View>
      ))}

      <View style={s.row}>
        <Pressable style={[s.key, s.wide]} onPress={onBackspace}>
          <Ionicons name="backspace-outline" size={18} color={lw.inkSoft} />
        </Pressable>
        <Pressable style={[s.key, s.space]} onPress={onSpace}>
          <Text style={s.spaceT}>فاصله</Text>
        </Pressable>
        <Pressable style={[s.key, s.wide]} onPress={() => onKey('\u200c')}>
          <Text style={s.zwnjT}>نیم‌فاصله</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { backgroundColor: lw.surfaceAlt, paddingVertical: spacing.sm, paddingHorizontal: 4, borderTopWidth: 1, borderTopColor: lw.hair },
  // right to left, like an Iranian keyboard
  row: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 3, marginBottom: 5 },
  key: { flex: 1, maxWidth: 34, height: 42, borderRadius: 6, backgroundColor: lw.surface, alignItems: 'center', justifyContent: 'center' },
  keyT: { fontFamily: fonts.persian, fontSize: 19, color: lw.ink },
  wide: { maxWidth: 62, flexDirection: 'row', gap: 3 },
  space: { maxWidth: 130 },
  spaceT: { fontFamily: fonts.persian, fontSize: 12, color: lw.muted },
  zwnjT: { fontFamily: fonts.persian, fontSize: 10, color: lw.muted },
});
