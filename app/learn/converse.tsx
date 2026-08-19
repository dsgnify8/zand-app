import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { supabase } from '@/lib/supabase';
import { speak } from '@/lib/speak';
import { askMic, transcribe, STT_LOCALE, WAV_16K, useAudioRecorder } from '@/lib/listen';
import { LEARN } from '@/constants/i18n/learn';
import { t as tl } from '@/lib/i18n';

const LANGS = [
  { code: 'fa', label: 'Persian', native: 'فارسی' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe' },
  { code: 'sv', label: 'Swedish', native: 'Svenska' },
];
const labelOf = (c: string) => LANGS.find((l) => l.code === c)?.label ?? c;
const isRtl = (c: string) => c === 'fa' || c === 'ar' || c === 'ur';

type Turn = { side: 'top' | 'bottom'; heard: string; said: string; from: string; to: string };

function Half({
  side, lang, flip, live, working, ring, ringOp, onPick, onStart, onStop,
}: {
  side: 'top' | 'bottom'; lang: string; flip: boolean;
  live: boolean; working: boolean; ring: any; ringOp: any;
  onPick: () => void; onStart: () => void; onStop: () => void;
}) {
  return (
    <View style={[s.half, flip && s.flipped]}>
      <Pressable hitSlop={8} onPress={onPick} style={s.langBtn}>
        <Text style={s.langT}>{labelOf(lang)}</Text>
        <Ionicons name="chevron-down" size={13} color={lw.muted} />
      </Pressable>

      <Pressable style={s.micWrap} onPress={() => (live ? onStop() : onStart())}>
        {live ? <Animated.View style={[s.ring, { transform: [{ scale: ring }], opacity: ringOp }]} /> : null}
        <View style={[s.mic, live && s.micOn]}>
          {working
            ? <ActivityIndicator color="#FFF" />
            : <Ionicons name="mic" size={26} color={live ? '#FFF' : lw.green} />}
        </View>
      </Pressable>

      <Text style={s.hint}>
        {live ? 'tap to stop' : working ? 'thinking…' : 'tap to speak'}
      </Text>
    </View>
  );
}

export default function ConverseScreen() {
  const [top, setTop] = useState('en');
  const [bottom, setBottom] = useState('fa');
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState<null | 'top' | 'bottom'>(null);
  const [recording, setRecording] = useState<null | 'top' | 'bottom'>(null);
  const [picking, setPicking] = useState<null | 'top' | 'bottom'>(null);
  const [note, setNote] = useState('');

  const recorder = useAudioRecorder(WAV_16K);
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (recording) {
      Animated.loop(Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])).start();
    } else {
      pulse.stopAnimation(); pulse.setValue(0);
    }
  }, [recording]);

  const start = async (side: 'top' | 'bottom') => {
    const ok = await askMic();
    if (!ok) { setNote('Microphone permission is needed to hear you.'); return; }
    setNote('');
    try {
      await recorder.prepareToRecordAsync();
      recorder.record();
      setRecording(side);
    } catch {
      setNote('Could not start recording.');
    }
  };

  const stop = async (side: 'top' | 'bottom') => {
    setRecording(null);
    setBusy(side);
    try {
      await recorder.stop();
      // the file is not always flushed the instant stop resolves
      await new Promise((r) => setTimeout(r, 350));
      const uri = recorder.uri;
      if (!uri) { setBusy(null); return; }

      const from = side === 'top' ? top : bottom;
      const to = side === 'top' ? bottom : top;

      const heard = await transcribe(uri, STT_LOCALE[from] ?? 'en-US');
      if (!heard) { setNote('I did not catch that. Try again, a little closer.'); setBusy(null); return; }

      const { data, error } = await supabase.functions.invoke('translate', {
        body: { text: heard, from, to },
      });
      if (error || !data?.translation) {
        setNote('Could not translate that.'); setBusy(null); return;
      }

      const said = String(data.translation);
      setTurns((v) => [...v, { side, heard, said, from, to }]);
      setNote('');
      speak(said, to);
    } catch {
      setNote('Something went wrong.');
    } finally {
      setBusy(null);
    }
  };

  const ring = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const ringOp = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.nav}>
        <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/learn' as any))}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Text style={s.navT}>{tl(LEARN.conversation)}</Text>
        <Pressable hitSlop={12} onPress={() => setTurns([])}>
          <Ionicons name="refresh-outline" size={19} color={lw.muted} />
        </Pressable>
      </View>

      <Half
        side="top" lang={top} flip
        live={recording === 'top'} working={busy === 'top'}
        ring={ring} ringOp={ringOp}
        onPick={() => setPicking('top')}
        onStart={() => start('top')}
        onStop={() => stop('top')}
      />

      <View style={s.middle}>
        {turns.length === 0 ? (
          <Text style={s.empty}>
            Hold either microphone and speak. Whatever you say will be repeated aloud in the other language.
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: spacing.md }}>
            {turns.map((t, i) => (
              <View key={i} style={[s.turn, t.side === 'top' && s.turnTop]}>
                <Text style={[s.heard, isRtl(t.from) && s.rtl]}>{t.heard}</Text>
                <Pressable onPress={() => speak(t.said, t.to)}>
                  <Text style={[s.said, isRtl(t.to) && s.rtl]}>{t.said}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
        {note ? <Text style={s.note}>{note}</Text> : null}
      </View>

      <Half
        side="bottom" lang={bottom} flip={false}
        live={recording === 'bottom'} working={busy === 'bottom'}
        ring={ring} ringOp={ringOp}
        onPick={() => setPicking('bottom')}
        onStart={() => start('bottom')}
        onStop={() => stop('bottom')}
      />

      <Modal transparent visible={picking !== null} animationType="slide" onRequestClose={() => setPicking(null)}>
        <Pressable style={s.backdrop} onPress={() => setPicking(null)}>
          <Pressable style={s.sheet} onPress={() => {}}>
            <View style={s.grab} />
            <Text style={s.sheetT}>{tl(LEARN.whichLanguage)}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {LANGS.map((l) => {
                const on = (picking === 'top' ? top : bottom) === l.code;
                return (
                  <Pressable key={l.code} style={s.langRow} onPress={() => {
                    if (picking === 'top') { if (l.code === bottom) setBottom(top); setTop(l.code); }
                    else { if (l.code === top) setTop(bottom); setBottom(l.code); }
                    setPicking(null);
                  }}>
                    <Text style={[s.langLabel, on && s.langOn]}>{l.label}</Text>
                    <Text style={s.langNative}>{l.native}</Text>
                    {on ? <Ionicons name="checkmark" size={17} color={lw.green} /> : null}
                  </Pressable>
                );
              })}
              <View style={{ height: spacing.xxl }} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, height: 44 },
  navT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: lw.ink },

  half: { alignItems: 'center', paddingVertical: spacing.lg },
  flipped: {},
  langBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: spacing.md },
  langT: { fontFamily: fonts.body, fontSize: 15, color: lw.inkSoft },

  micWrap: { alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
  ring: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: lw.greenPale },
  mic: { width: 86, height: 86, borderRadius: 43, backgroundColor: lw.surface, borderWidth: 1.5, borderColor: lw.greenPale, alignItems: 'center', justifyContent: 'center' },
  micOn: { backgroundColor: lw.green, borderColor: lw.green },
  hint: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, marginTop: spacing.sm },

  middle: { flex: 1, paddingHorizontal: spacing.xl, borderTopWidth: 1, borderBottomWidth: 1, borderColor: lw.hair, justifyContent: 'flex-end' },
  empty: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 22, color: lw.muted, textAlign: 'center' },
  turn: { paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  turnTop: { opacity: 0.85 },
  heard: { fontFamily: fonts.body, fontSize: 13, color: lw.muted },
  said: { fontFamily: fonts.body, fontSize: 19, lineHeight: 30, color: lw.ink, marginTop: 4 },
  rtl: { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' },
  note: { fontFamily: fonts.body, fontSize: 12.5, color: lw.wrong, textAlign: 'center', paddingBottom: spacing.md },

  backdrop: { flex: 1, backgroundColor: 'rgba(20,26,20,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: lw.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.xl, paddingTop: spacing.sm, maxHeight: '66%' },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: lw.hair, alignSelf: 'center', marginBottom: spacing.lg },
  sheetT: { fontFamily: fonts.body, fontSize: 20, color: lw.ink, marginBottom: spacing.md },
  langRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  langLabel: { flex: 1, fontFamily: fonts.body, fontSize: 16, color: lw.ink },
  langOn: { color: lw.green, fontFamily: fonts.bodyStrong },
  langNative: { fontFamily: fonts.persian, fontSize: 15, color: lw.muted },
});
