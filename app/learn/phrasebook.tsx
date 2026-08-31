import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { PHRASE_SETS, type PhraseSet } from '@/constants/phrasebook';
import { speak } from '@/lib/speak';
import { Art } from '@/components/lang-art';
import { SendPhraseSheet } from '@/components/send-phrase-sheet';
import { LEARN } from '@/constants/i18n/learn';
import { useLang, t as tl } from '@/lib/i18n';

function PhraseRow({ p, onSend }: { p: { fa: string; tr: string; en: string; note?: string }; onSend: (p: any) => void }) {
  return (
    <Pressable style={s.row} onPress={() => speak(p.fa, 'fa')} onLongPress={() => onSend(p)} delayLongPress={600}>
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
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const [open, setOpen] = useState<PhraseSet | null>(null);
  const [q, setQ] = useState('');
  const [sending, setSending] = useState<any>(null);

  // Back closes an open category before it leaves the screen.
  //
  // The categories are state rather than routes, so a system back — the iOS
  // edge swipe, the Android button — has nothing to pop but the whole
  // phrasebook, which is how you ended up on Learn. This intercepts exactly
  // one level: with a category open it clears it, otherwise it lets the pop
  // through untouched.
  //
  // The ref is what keeps this to one level. Reading `open` straight from
  // the closure would go stale, and resubscribing on every change is how you
  // end up with a stack of listeners each swallowing one press — which is
  // the bug that once made back walk through every exercise in a lesson.
  const navigation = useNavigation();
  const openRef = useRef(open);
  openRef.current = open;

  // Back closes an open phrase before it leaves the screen. On a native
  // stack that cannot be done by preventing the removal — iOS has already
  // taken the view away by the time JS is consulted, and the router is
  // then out of step with what is on screen.
  //
  // So the swipe is turned off while something is open. The gesture never
  // starts, the hardware back button still routes through the listener,
  // and nothing is ever half-removed.
  useEffect(() => {
    (navigation as any).setOptions({ gestureEnabled: !open });
  }, [navigation, open]);

  useEffect(() => {
    const stop = (navigation as any).addListener('beforeRemove', (e: any) => {
      if (!openRef.current) return;
      // Android's hardware back only. The swipe is disabled above, so
      // this never fires for a gesture.
      e.preventDefault();
      setOpen(null);
    });
    return stop;
  }, [navigation]);


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
        <Pressable hitSlop={12} onPress={() => (open ? setOpen(null) : (router.canGoBack() ? router.back() : router.replace('/')))}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Text style={s.topT}>{open ? open.title : 'Phrasebook'}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {!open ? (
          <>
            <Art name="samovar" size={84} style={{ alignSelf: 'flex-end', opacity: 0.45, marginBottom: -6 }} />
            <Text style={s.title}>Say it{'\n'}right away</Text>
            <Text style={s.sub}>{tl(LEARN.phrasebookX)}</Text>

            <View style={s.search}>
              <Ionicons name="search" size={15} color={lw.muted} />
              <TextInput
                style={s.searchIn}
                placeholder={tl(LEARN.searchBoth)}
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
                <View style={s.list}>{hits.map((p, i) => <PhraseRow key={p.fa + i} p={p} onSend={setSending} />)}</View>
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
            <View style={s.list}>{open.phrases.map((p, i) => <PhraseRow key={p.fa + i} p={p} onSend={setSending} />)}</View>
          </>
        )}
      </ScrollView>

      <SendPhraseSheet phrase={sending} onClose={() => setSending(null)} />
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
