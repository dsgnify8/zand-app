// The Persian keyboard, with a way to find the letter you mean.
//
// Somebody two weeks into the alphabet knows the word they want and
// cannot find it on the keyboard. ک and گ differ by one stroke, س and ش
// by three dots, and a beginner scanning thirty-two unfamiliar shapes
// gives up before they have spelled anything.
//
// So: a switch that puts each key's sound beneath it. Not the answer —
// the word is still theirs to know and spell — just the alphabet, which
// is the part they have not learned yet and the part the exercise is not
// actually testing.
//
// It stays on once turned on, because somebody who needed it for one
// word needs it for the next, and asking again every time is its own
// small insult.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { getLang } from '@/lib/i18n';

const ROWS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ'],
  ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ'],
  ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و', 'آ', 'ژ'],
];

// How each letter sounds, in the transliteration the rest of the app
// uses. Where a sound has no English equivalent the nearest is given,
// which is what a person would say if you asked them.
const SOUND: Record<string, string> = {
  'ض': 'z',  'ص': 's',  'ث': 's',  'ق': 'gh', 'ف': 'f',
  'غ': 'gh', 'ع': "'",  'ه': 'h',  'خ': 'kh', 'ح': 'h',
  'ج': 'j',  'چ': 'ch', 'ش': 'sh', 'س': 's',  'ی': 'i/y',
  'ب': 'b',  'ل': 'l',  'ا': 'a',  'ت': 't',  'ن': 'n',
  'م': 'm',  'ک': 'k',  'گ': 'g',  'ظ': 'z',  'ط': 't',
  'ز': 'z',  'ر': 'r',  'ذ': 'z',  'د': 'd',  'پ': 'p',
  'و': 'v/u', 'آ': 'aa', 'ژ': 'zh',
};

const KEY = 'learn:key-sounds';

export function PersianKeyboard({
  onKey, onBackspace, onSpace,
}: {
  onKey: (k: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
}) {
  const fa = getLang() === 'fa';
  const [sounds, setSounds] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => setSounds(v === '1')).catch(() => {});
  }, []);

  const toggle = () => {
    const next = !sounds;
    setSounds(next);
    AsyncStorage.setItem(KEY, next ? '1' : '0').catch(() => {});
  };

  return (
    <View style={s.wrap}>
      {/* Quiet, above the keys. Somebody who does not need it should not
          have to look at it. */}
      <Pressable style={s.help} onPress={toggle} hitSlop={8}>
        <Ionicons
          name={sounds ? 'bulb' : 'bulb-outline'}
          size={13}
          color={sounds ? lw.green : lw.muted}
        />
        <Text style={[s.helpT, sounds && { color: lw.green }]}>
          {fa
            ? (sounds ? 'صداها روشن است' : 'صدای حرف‌ها را نشانم بده')
            : (sounds ? 'Sounds on' : 'Show me the sounds')}
        </Text>
      </Pressable>

      {ROWS.map((row, i) => (
        <View key={i} style={s.row}>
          {row.map((k) => (
            <Pressable key={k} style={[s.key, sounds && s.keyTall]} onPress={() => onKey(k)}>
              <Text style={s.keyT}>{k}</Text>
              {sounds ? <Text style={s.sound}>{SOUND[k] ?? ''}</Text> : null}
            </Pressable>
          ))}
        </View>
      ))}

      <View style={s.row}>
        {/* The zero-width non-joiner: the half-space inside می‌روم. It
            has no sound, so it is labelled by what it does. */}
        <Pressable style={[s.key, s.wide, sounds && s.keyTall]} onPress={() => onKey('\u200c')}>
          <Text style={s.keyT}>‌ ‌</Text>
          {sounds ? <Text style={s.sound}>{fa ? 'نیم‌فاصله' : 'half space'}</Text> : null}
        </Pressable>

        <Pressable style={[s.key, s.wide, sounds && s.keyTall]} onPress={onSpace}>
          <Text style={s.keyT}>␣</Text>
          {sounds ? <Text style={s.sound}>{fa ? 'فاصله' : 'space'}</Text> : null}
        </Pressable>

        <Pressable style={[s.key, s.wide, sounds && s.keyTall]} onPress={onBackspace}>
          <Ionicons name="backspace-outline" size={17} color={lw.ink} />
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: spacing.lg },

  help: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    alignSelf: 'center', marginBottom: spacing.sm,
    paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999,
  },
  helpT: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted },

  row: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 5 },
  key: {
    minWidth: 26, paddingHorizontal: 5, paddingVertical: 8,
    borderRadius: 7, backgroundColor: lw.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  // Taller with the sounds showing, so the letter does not shift up.
  keyTall: { paddingVertical: 6, paddingBottom: 4 },
  wide: { minWidth: 58 },
  keyT: { fontFamily: fonts.persian, fontSize: 19, color: lw.ink },
  sound: { fontFamily: fonts.body, fontSize: 8.5, color: lw.muted, marginTop: 1 },
});
