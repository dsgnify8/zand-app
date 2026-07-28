import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { speak } from '@/lib/speak';
import type { Step } from '@/constants/curriculum';

/* A word, its sound, its meaning. The quiet foundation of everything. */
export function MeetStep({ s }: { s: Extract<Step, { t: 'meet' }> }) {
  return (
    <View style={st.center}>
      <Pressable hitSlop={12} onPress={() => speak(s.fa, 'fa')} style={st.sayBtn}>
        <Ionicons name="volume-medium-outline" size={19} color={lw.green} />
      </Pressable>
      <Text style={st.bigFa}>{s.fa}</Text>
      <Text style={st.tr}>{s.tr}</Text>
      <View style={st.hair} />
      <Text style={st.en}>{s.en}</Text>
      {s.literal ? <Text style={st.literal}>literally: {s.literal}</Text> : null}
    </View>
  );
}

/* What the word actually means in use. */
export function SenseStep({ s }: { s: Extract<Step, { t: 'sense' }> }) {
  return (
    <View>
      <Text style={st.midFa}>{s.fa}</Text>
      <Text style={st.trLeft}>{s.tr}  ·  {s.en}</Text>
      <View style={st.hairLeft} />
      <Text style={st.body}>{s.body}</Text>
    </View>
  );
}

/* The word inside a real sentence. */
export function SentenceStep({ s }: { s: Extract<Step, { t: 'sentence' }> }) {
  return (
    <View style={st.center}>
      <Text style={st.label}>IN A SENTENCE</Text>
      <Pressable hitSlop={12} onPress={() => speak(s.fa, 'fa')} style={st.sayBtn}>
        <Ionicons name="volume-medium-outline" size={19} color={lw.green} />
      </Pressable>
      <Text style={st.sentenceFa}>{s.fa}</Text>
      <Text style={st.tr}>{s.tr}</Text>
      <View style={st.hair} />
      <Text style={st.en}>{s.en}</Text>
    </View>
  );
}

/* A cultural or grammatical aside. */
export function NoteStep({ s }: { s: Extract<Step, { t: 'note' }> }) {
  return (
    <View style={st.note}>
      <Text style={st.noteTitle}>{s.title}</Text>
      <View style={st.noteRule} />
      <Text style={st.body}>{s.body}</Text>
    </View>
  );
}

/* Pick the right answer. Used for both `choose` and `listen`. */
export function ChoiceStep({
  prompt, options, answer, why, audio, trs, onResolve,
}: {
  prompt: string; options: string[]; answer: string; why?: string;
  audio?: string; trs?: Record<string, string>; onResolve: (right: boolean) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const done = picked !== null;
  const right = picked === answer;

  return (
    <View>
      {audio ? (
        <View style={st.playRow}>
          <Pressable style={st.playBig} onPress={() => speak(audio, 'fa')}>
            <Ionicons name="volume-medium-outline" size={26} color={lw.green} />
          </Pressable>
          <Pressable style={st.playSlow} onPress={() => speak(audio, 'fa', { slow: true })}>
            <Ionicons name="play-outline" size={14} color={lw.muted} />
            <Text style={st.playSlowT}>slower</Text>
          </Pressable>
        </View>
      ) : null}
      <Text style={st.prompt}>{prompt}</Text>

      <View style={{ gap: spacing.sm, marginTop: spacing.xl }}>
        {options.map((o) => {
          const isAnswer = o === answer;
          const isPicked = o === picked;
          return (
            <Pressable
              key={o}
              disabled={done}
              onPress={() => { setPicked(o); onResolve(o === answer); }}
              style={[
                st.opt,
                done && isAnswer && st.optRight,
                done && isPicked && !isAnswer && st.optWrong,
                done && !isAnswer && !isPicked && st.optFade,
              ]}
            >
              <Text style={[st.optT, done && isAnswer && st.optTRight, done && isPicked && !isAnswer && st.optTWrong]}>{o}</Text>
              {trs?.[o] ? <Text style={st.optTr}>{trs[o]}</Text> : null}
            </Pressable>
          );
        })}
      </View>

      {done && why ? (
        <View style={[st.why, right ? st.whyRight : st.whyWrong]}>
          <Text style={st.whyT}>{why}</Text>
        </View>
      ) : null}
    </View>
  );
}

/* Assemble the sentence from its parts, in order. */
export function BuildStep({
  s, onResolve,
}: { s: Extract<Step, { t: 'build' }>; onResolve: (right: boolean) => void }) {
  const target = s.fa.replace(/[،؟]/g, '').split(' ').filter(Boolean);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const right = chosen.join(' ') === target.join(' ');

  const pool = s.parts.filter((p) => !chosen.includes(p));

  return (
    <View>
      <Text style={st.prompt}>{s.en}</Text>

      <View style={st.tray}>
        {chosen.length === 0 ? <Text style={st.trayHint}>tap the words in order</Text> : null}
        <View style={st.trayRow}>
          {chosen.map((c, i) => (
            <Pressable key={c + i} disabled={checked} onPress={() => setChosen((v) => v.filter((_, j) => j !== i))} style={st.chipOn}>
              <Text style={st.chipOnT}>{c}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={st.pool}>
        {pool.map((p) => (
          <Pressable key={p} disabled={checked} onPress={() => setChosen((v) => [...v, p])} style={st.chip}>
            <Text style={st.chipT}>{p}</Text>
            {s.partTrs?.[p] ? <Text style={st.chipTr}>{s.partTrs[p]}</Text> : null}
          </Pressable>
        ))}
      </View>

      {!checked ? (
        <Pressable
          style={[st.check, chosen.length === 0 && st.checkOff]}
          disabled={chosen.length === 0}
          onPress={() => { setChecked(true); onResolve(chosen.join(' ') === target.join(' ')); }}
        >
          <Text style={st.checkT}>Check</Text>
        </Pressable>
      ) : (
        <View style={[st.why, right ? st.whyRight : st.whyWrong]}>
          <Text style={st.whyT}>{right ? 'That is it.' : s.fa + '   ·   ' + s.tr}</Text>
        </View>
      )}
    </View>
  );
}

// What each letter sounds like, so a beginner is not picking shapes blind.
const LETTER_SOUND: Record<string, string> = {
  'ا': 'a', 'آ': 'ā', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch',
  'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's',
  'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'ʿ', 'غ': 'gh', 'ف': 'f',
  'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'v/u', 'ه': 'h',
  'ی': 'y/i',
};

/* Write it by assembling letters right to left. */
export function WriteStep({
  s, onResolve,
}: { s: Extract<Step, { t: 'write' }>; onResolve: (right: boolean) => void }) {
  const target = Array.from(s.fa.replace(/ /g, ''));
  const [typed, setTyped] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [wrong, setWrong] = useState<{ got: string; want: string } | null>(null);
  const right = typed.join('') === target.join('');

  // the real letters plus a few decoys, shuffled once
  const [pool] = useState(() => {
    const decoys = ['ب', 'ت', 'ن', 'ک', 'ر', 'د'].filter((d) => !target.includes(d)).slice(0, 3);
    return [...target, ...decoys].sort(() => Math.random() - 0.5);
  });

  return (
    <View>
      <Text style={st.prompt}>Write “{s.en}”</Text>
      <Text style={st.writeTr}>{s.tr}</Text>

      <View style={st.writeLine}>
        <Text style={st.writeTyped}>{typed.join('') || ' '}</Text>
      </View>

      {wrong ? (
        <Text style={st.nudge}>Not that one. The next letter is <Text style={st.nudgeFa}>{wrong.want}</Text></Text>
      ) : s.hint ? <Text style={st.hint}>{s.hint}</Text> : null}

      <View style={st.pool}>
        {pool.map((l, i) => (
          <Pressable
            key={l + i}
            disabled={checked}
            onPress={() => {
              const nextIdx = typed.length;
              if (l === target[nextIdx]) { setWrong(null); setTyped((v) => [...v, l]); }
              else { setWrong({ got: l, want: target[nextIdx] }); }
            }}
            style={[st.letter, wrong?.got === l && st.letterWrong, wrong && l === wrong.want && st.letterWant]}
          >
            <Text style={[st.letterT, wrong?.got === l && st.letterTWrong, wrong && l === wrong.want && st.letterTWant]}>{l}</Text>
            {LETTER_SOUND[l] ? <Text style={st.letterSound}>{LETTER_SOUND[l]}</Text> : null}
          </Pressable>
        ))}
      </View>

      <View style={st.writeTools}>
        <Pressable hitSlop={8} disabled={checked} onPress={() => setTyped((v) => v.slice(0, -1))}>
          <Text style={st.undo}>undo</Text>
        </Pressable>
      </View>

      {!checked ? (
        <Pressable
          style={[st.check, typed.length === 0 && st.checkOff]}
          disabled={typed.length === 0}
          onPress={() => { setChecked(true); onResolve(typed.join('') === target.join('')); }}
        >
          <Text style={st.checkT}>Check</Text>
        </Pressable>
      ) : (
        <View style={[st.why, right ? st.whyRight : st.whyWrong]}>
          <Text style={st.whyT}>{right ? 'Exactly right.' : s.fa}</Text>
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  center: { alignItems: 'center', paddingVertical: spacing.xl },
  sayBtn: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, borderColor: lw.rule, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },

  bigFa: { fontFamily: fonts.persian, fontSize: 56, lineHeight: 84, color: lw.ink },
  midFa: { fontFamily: fonts.persian, fontSize: 40, lineHeight: 64, color: lw.ink, textAlign: 'right' },
  sentenceFa: { fontFamily: fonts.persian, fontSize: 32, lineHeight: 56, color: lw.ink, textAlign: 'center' },

  tr: { fontFamily: fonts.body, fontSize: 15, color: lw.muted, marginTop: 4 },
  trLeft: { fontFamily: fonts.body, fontSize: 14, color: lw.muted, textAlign: 'right', marginTop: 2 },
  hair: { width: 44, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg },
  hairLeft: { width: 44, height: 1, backgroundColor: lw.rule, marginVertical: spacing.lg, alignSelf: 'flex-end' },
  en: { fontFamily: fonts.body, fontSize: 19, color: lw.green },
  literal: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: spacing.sm, fontStyle: 'italic' },
  label: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2.5, color: lw.muted, marginBottom: spacing.lg },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: lw.inkSoft },

  note: { backgroundColor: lw.greenWash, borderRadius: 16, padding: spacing.xl },
  noteTitle: { fontFamily: fonts.body, fontSize: 20, color: lw.green },
  noteRule: { width: 34, height: 1, backgroundColor: lw.rule, marginVertical: spacing.md },

  prompt: { fontFamily: fonts.body, fontSize: 21, lineHeight: 30, color: lw.ink },
  playRow: { alignItems: 'center', marginBottom: spacing.xl },
  playSlow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.md, paddingVertical: 6, paddingHorizontal: spacing.md },
  playSlowT: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted },
  playBig: { width: 62, height: 62, borderRadius: 31, backgroundColor: lw.greenWash, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },

  opt: { borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface, borderRadius: 14, paddingVertical: 15, paddingHorizontal: spacing.lg },
  optRight: { borderColor: lw.green, backgroundColor: lw.greenWash },
  optWrong: { borderColor: lw.wrong },
  optFade: { opacity: 0.4 },
  optT: { fontFamily: fonts.persian, fontSize: 19, color: lw.ink, textAlign: 'center' },
  optTRight: { color: lw.green },
  optTWrong: { color: lw.wrong },

  optTr: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, textAlign: 'center', marginTop: 3 },
  chipTr: { fontFamily: fonts.body, fontSize: 11, color: lw.muted, textAlign: 'center', marginTop: 2 },
  letterSound: { fontFamily: fonts.body, fontSize: 9.5, color: lw.muted, marginTop: 1 },
  letterWrong: { borderColor: lw.wrong, backgroundColor: '#F6ECE9' },
  letterTWrong: { color: lw.wrong },
  letterWant: { borderColor: lw.green, backgroundColor: lw.greenWash },
  letterTWant: { color: lw.green },
  nudge: { fontFamily: fonts.body, fontSize: 13, color: lw.wrong, marginTop: spacing.sm },
  nudgeFa: { fontFamily: fonts.persian, fontSize: 17, color: lw.green },
  why: { borderRadius: 12, padding: spacing.lg, marginTop: spacing.lg },
  whyRight: { backgroundColor: lw.greenWash },
  whyWrong: { backgroundColor: '#F6ECE9' },
  whyT: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: lw.inkSoft },

  tray: { minHeight: 74, borderBottomWidth: 1, borderBottomColor: lw.rule, marginTop: spacing.xl, justifyContent: 'center' },
  trayHint: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, textAlign: 'center' },
  trayRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: spacing.sm, paddingBottom: spacing.md },
  pool: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl, justifyContent: 'center' },
  chip: { borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface, borderRadius: 12, paddingVertical: 11, paddingHorizontal: spacing.lg },
  chipT: { fontFamily: fonts.persian, fontSize: 19, color: lw.ink },
  chipOn: { backgroundColor: lw.greenPale, borderRadius: 12, paddingVertical: 11, paddingHorizontal: spacing.lg },
  chipOnT: { fontFamily: fonts.persian, fontSize: 19, color: lw.greenDeep },

  letter: { width: 56, height: 60, borderWidth: 1, borderColor: lw.hair, backgroundColor: lw.surface, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  letterT: { fontFamily: fonts.persian, fontSize: 26, color: lw.ink },
  writeTr: { fontFamily: fonts.body, fontSize: 14, color: lw.muted, marginTop: 6 },
  writeLine: { minHeight: 78, borderBottomWidth: 1, borderBottomColor: lw.rule, justifyContent: 'center', marginTop: spacing.xl },
  writeTyped: { fontFamily: fonts.persian, fontSize: 40, lineHeight: 64, color: lw.ink, textAlign: 'right' },
  hint: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, marginTop: spacing.sm },
  writeTools: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: spacing.md },
  undo: { fontFamily: fonts.body, fontSize: 13, color: lw.muted },

  check: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 15, alignItems: 'center', marginTop: spacing.xxl },
  checkOff: { backgroundColor: lw.greenPale },
  checkT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },
});
