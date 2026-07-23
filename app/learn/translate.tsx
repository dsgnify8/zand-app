import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { speak } from '@/lib/speak';
import { supabase } from '@/lib/supabase';

const LANGS: { code: string; label: string; native: string }[] = [
  { code: 'fa', label: 'Persian', native: 'فارسی' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe' },
  { code: 'sv', label: 'Swedish', native: 'Svenska' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'ur', label: 'Urdu', native: 'اردو' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'zh', label: 'Chinese', native: '中文' },
];

const labelOf = (c: string) => LANGS.find((l) => l.code === c)?.label ?? c;
const K_HISTORY = 'translate:history';

type Entry = { q: string; a: string; tr?: string | null; from: string; to: string };

export default function TranslateScreen() {
  const [from, setFrom] = useState('en');
  const [to, setTo] = useState('fa');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [translit, setTranslit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picking, setPicking] = useState<null | 'from' | 'to'>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Entry[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    AsyncStorage.getItem(K_HISTORY).then((v) => { if (v) { try { setHistory(JSON.parse(v)); } catch {} } });
  }, []);

  const remember = (e: Entry) => {
    const next = [e, ...history.filter((h) => h.q !== e.q)].slice(0, 8);
    setHistory(next);
    AsyncStorage.setItem(K_HISTORY, JSON.stringify(next)).catch(() => {});
  };

  const swap = () => {
    setFrom(to); setTo(from);
    setInput(output); setOutput(input);
  };

  const translate = async () => {
    const q = input.trim();
    if (!q) return;
    Keyboard.dismiss();
    setLoading(true); setError(null); setOutput(''); setTranslit(null); setCopied(false);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('translate', {
        body: { text: q, from, to },
      });
      if (fnError || !data?.translation) {
        setError('Could not translate that. Try again in a moment.');
      } else {
        setOutput(String(data.translation));
        setTranslit(data.translit ?? null);
        remember({ q, a: String(data.translation), tr: data.translit ?? null, from, to });
      }
    } catch {
      setError('No connection. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await Clipboard.setStringAsync(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const clear = () => { setInput(''); setOutput(''); setError(null); inputRef.current?.focus(); };

  const isFa = (c: string) => c === 'fa' || c === 'ar' || c === 'ur';

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.nav}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.navTitle}>Translate</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" showsVerticalScrollIndicator={false}
        contentContainerStyle={s.body}>

        {/* language pair */}
        <View style={s.pair}>
          <Pressable style={s.pairSide} onPress={() => setPicking('from')}>
            <Text style={s.pairLabel}>FROM</Text>
            <Text style={s.pairLang}>{labelOf(from)}</Text>
          </Pressable>
          <Pressable style={s.swapBtn} onPress={swap} hitSlop={10}>
            <Ionicons name="swap-horizontal" size={18} color={colors.accent} />
          </Pressable>
          <Pressable style={[s.pairSide, { alignItems: 'flex-end' }]} onPress={() => setPicking('to')}>
            <Text style={s.pairLabel}>TO</Text>
            <Text style={s.pairLang}>{labelOf(to)}</Text>
          </Pressable>
        </View>

        <View style={s.rule} />

        {/* input, borderless */}
        <TextInput
          ref={inputRef}
          style={[s.input, isFa(from) && s.inputRtl]}
          placeholder="Type anything"
          placeholderTextColor={colors.textSecondary}
          value={input}
          onChangeText={setInput}
          multiline
          returnKeyType="go"
          onSubmitEditing={translate}
        />

        {input.length > 0 ? (
          <View style={s.inputTools}>
            <Pressable hitSlop={8} onPress={clear}><Text style={s.clearT}>Clear</Text></Pressable>
            <Pressable style={[s.go, loading && { opacity: 0.6 }]} onPress={translate} disabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={s.goT}>Translate</Text>}
            </Pressable>
          </View>
        ) : null}

        {error ? <Text style={s.error}>{error}</Text> : null}

        {/* result */}
        {output ? (
          <View style={s.result}>
            <Text style={s.resultLabel}>{labelOf(to).toUpperCase()}</Text>
            <Text style={[s.resultText, isFa(to) && s.resultRtl]}>{output}</Text>
            {translit ? <Text style={[s.translit, isFa(to) && { textAlign: 'right' }]}>{translit}</Text> : null}
            <View style={s.actions}>
              <Pressable style={s.action} hitSlop={8} onPress={() => speak(output, to)}>
                <Ionicons name="volume-high-outline" size={19} color={colors.textSecondary} />
              </Pressable>
              <Pressable style={s.action} hitSlop={8} onPress={copy}>
                <Ionicons name={copied ? 'checkmark' : 'copy-outline'} size={18} color={copied ? colors.accent : colors.textSecondary} />
              </Pressable>
            </View>
          </View>
        ) : null}

        {/* recents */}
        {history.length > 0 && !output ? (
          <View style={{ marginTop: spacing.xxl * 2.5 }}>
            <Text style={s.recentLabel}>RECENT</Text>
            {history.map((h, i) => (
              <Pressable key={i} style={s.recentRow}
                onPress={() => { setFrom(h.from); setTo(h.to); setInput(h.q); setOutput(h.a); setTranslit(h.tr ?? null); }}>
                <View style={{ flex: 1 }}>
                  <Text style={s.recentQ} numberOfLines={1}>{h.q}</Text>
                  <Text style={[s.recentA, isFa(h.to) && s.resultRtl]} numberOfLines={1}>{h.a}</Text>
                </View>
                <Ionicons name="arrow-up-outline" size={15} color={colors.textSecondary} style={{ transform: [{ rotate: '45deg' }] }} />
              </Pressable>
            ))}
          </View>
        ) : null}

        <Text style={s.note}>Machine translation. Double-check anything that matters.</Text>
      </ScrollView>

      {/* language picker */}
      <Modal transparent visible={picking !== null} animationType="slide" onRequestClose={() => setPicking(null)}>
        <Pressable style={s.backdrop} onPress={() => setPicking(null)}>
          <Pressable style={s.sheet} onPress={() => {}}>
            <View style={s.grab} />
            <Text style={s.sheetTitle}>{picking === 'from' ? 'Translate from' : 'Translate to'}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {LANGS.map((l) => {
                const active = (picking === 'from' ? from : to) === l.code;
                return (
                  <Pressable key={l.code} style={s.langRow} onPress={() => {
                    if (picking === 'from') { if (l.code === to) setTo(from); setFrom(l.code); }
                    else { if (l.code === from) setFrom(to); setTo(l.code); }
                    setPicking(null);
                  }}>
                    <Text style={[s.langLabel, active && s.langActive]}>{l.label}</Text>
                    <Text style={s.langNative}>{l.native}</Text>
                    {active ? <Ionicons name="checkmark" size={18} color={colors.accent} /> : null}
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
  safe: { flex: 1, backgroundColor: colors.background },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, height: 48 },
  navTitle: { fontFamily: fonts.bodyStrong, fontSize: 16, color: colors.textPrimary },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  pair: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  pairSide: { flex: 1 },
  pairLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.8, color: colors.textSecondary },
  pairLang: { fontFamily: fonts.heading, fontSize: 22, color: colors.textPrimary, marginTop: 2 },
  swapBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },

  rule: { height: 1, backgroundColor: colors.border, marginTop: spacing.lg },

  input: { fontFamily: fonts.body, fontSize: 26, lineHeight: 36, color: colors.textPrimary, paddingTop: spacing.xl, minHeight: 120, textAlignVertical: 'top' },
  inputRtl: { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' },
  inputTools: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
  clearT: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary },
  go: { backgroundColor: colors.accent, borderRadius: 22, paddingVertical: 11, paddingHorizontal: spacing.xl, minWidth: 116, alignItems: 'center' },
  goT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },

  error: { fontFamily: fonts.body, fontSize: 13, color: colors.error, marginTop: spacing.lg },

  result: { marginTop: spacing.xxl, paddingTop: spacing.xl, borderTopWidth: 1, borderTopColor: colors.border },
  resultLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.8, color: colors.textSecondary },
  resultText: { fontFamily: fonts.body, fontSize: 28, lineHeight: 40, color: colors.textPrimary, marginTop: spacing.md },
  resultRtl: { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' },
  translit: { fontFamily: fonts.body, fontSize: 15, color: colors.textSecondary, marginTop: spacing.sm, opacity: 0.65 },
  actions: { flexDirection: 'row', gap: spacing.xl, marginTop: spacing.xl },
  action: { padding: 2 },

  recentLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.8, color: colors.textSecondary, marginBottom: spacing.sm },
  recentRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  recentQ: { fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary },
  recentA: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: 2 },

  note: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, maxHeight: '72%' },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  sheetTitle: { fontFamily: fonts.heading, fontSize: 22, color: colors.textPrimary, marginBottom: spacing.md },
  langRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  langLabel: { flex: 1, fontFamily: fonts.body, fontSize: 16, color: colors.textPrimary },
  langActive: { fontFamily: fonts.bodyStrong, color: colors.accent },
  langNative: { fontFamily: fonts.persian, fontSize: 15, color: colors.textSecondary },
});
