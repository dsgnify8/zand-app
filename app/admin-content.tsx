// Admin content editor.
//
// Lists every text block in Education and Literature and lets an admin
// rewrite the English or the Persian. Edits are stored as overrides
// keyed to the original English, so they apply on everyone's next launch
// without a build, and quietly fall away if a later build rewrites that
// paragraph.
//
// The two languages are deliberately separate fields, each in its own
// script and direction, because they are not translations of each other
// at the point of editing — they are the two things a reader might see.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { TOPICS } from '@/constants/education';
import { AUTHORS } from '@/constants/literature';
import { useAuth } from '@/lib/auth';
import { contentHash, listOverrides, saveOverride, clearOverride, loadOverrides } from '@/lib/content-overrides';

type Row = {
  en: string;          // original English, the identity
  fa: string;          // shipped Persian
  kind: string;        // block type, shown as a hint
  topic: string;
  topicTitle: string;
  section: 'education' | 'literature';
};

/* Walk a topic's blocks and pull out everything with text worth editing. */
function harvest(blocks: any[], topic: string, topicTitle: string, section: Row['section'], out: Row[]) {
  (blocks ?? []).forEach((b: any) => {
    if (!b || typeof b !== 'object') return;
    if (typeof b.x === 'string' && b.x.trim().length > 1) {
      out.push({ en: b.x, fa: b.fa ?? '', kind: b.t ?? '?', topic, topicTitle, section });
    }
    // nested payloads: items, pages, couplets and so on
    Object.values(b).forEach((v: any) => {
      if (Array.isArray(v)) harvest(v, topic, topicTitle, section, out);
    });
  });
}

function useRows(section: Row['section'], topicKey: string | null) {
  return useMemo(() => {
    if (!topicKey) return [];
    const out: Row[] = [];
    if (section === 'education') {
      const t: any = (TOPICS as any[]).find((x) => x.key === topicKey);
      if (t) (t.chapters ?? []).forEach((c: any) =>
        (c.pages ?? []).forEach((pg: any) => harvest(pg.blocks, t.key, t.name ?? t.key, 'education', out)));
    } else {
      const a: any = (AUTHORS as any[]).find((x) => x.key === topicKey);
      if (a) (a.chapters ?? []).forEach((c: any) =>
        (c.pages ?? []).forEach((pg: any) => harvest(pg.blocks, a.key, a.name ?? a.key, 'literature', out)));
    }
    // de-duplicate: the same sentence can appear twice and one override
    // covers both, so showing it twice would only confuse
    const seen = new Set<string>();
    return out.filter((r) => {
      const h = contentHash(r.en);
      if (seen.has(h)) return false;
      seen.add(h);
      return true;
    });
  }, [section, topicKey]);
}

export default function AdminContent() {
  const { user } = useAuth();
  const [section, setSection] = useState<Row['section']>('education');
  const [topicKey, setTopicKey] = useState<string | null>(null);
  const [edited, setEdited] = useState<Record<string, { x?: string; fa?: string }>>({});
  const [open, setOpen] = useState<Row | null>(null);
  const [enVal, setEnVal] = useState('');
  const [faVal, setFaVal] = useState('');
  const [busy, setBusy] = useState(false);

  const [query, setQuery] = useState('');
  const allRows = useRows(section, topicKey);
  // match on either language, so an admin can find a block by the Persian
  // they remember writing as easily as by the English
  const rows = query.trim()
    ? allRows.filter((r) => (r.en + ' ' + r.fa).toLowerCase().includes(query.trim().toLowerCase()))
    : allRows;

  const topics = section === 'education'
    ? (TOPICS as any[]).map((t) => ({ key: t.key, name: t.name ?? t.key }))
    : (AUTHORS as any[]).map((a) => ({ key: a.key, name: a.name ?? a.key }));

  useEffect(() => {
    (async () => {
      const list = await listOverrides();
      const m: Record<string, { x?: string; fa?: string }> = {};
      list.forEach((r: any) => { m[r.hash] = { x: r.x ?? undefined, fa: r.fa ?? undefined }; });
      setEdited(m);
    })();
  }, []);

  const openRow = (r: Row) => {
    const h = contentHash(r.en);
    setOpen(r);
    setEnVal(edited[h]?.x ?? r.en);
    setFaVal(edited[h]?.fa ?? r.fa ?? '');
  };

  const save = async () => {
    if (!open) return;
    setBusy(true);
    const h = contentHash(open.en);
    const changedEn = enVal.trim() !== open.en.trim() ? enVal : undefined;
    const changedFa = faVal.trim() !== (open.fa ?? '').trim() ? faVal : undefined;

    if (!changedEn && !changedFa) { setBusy(false); setOpen(null); return; }

    const { error } = await saveOverride({
      section: open.section,
      topic: open.topic,
      originalEn: open.en,
      x: changedEn,
      fa: changedFa,
      userId: user?.id,
    });
    if (!error) {
      setEdited((m) => ({ ...m, [h]: { x: changedEn, fa: changedFa } }));
      await loadOverrides();
      setOpen(null);
    }
    setBusy(false);
  };

  const reset = async () => {
    if (!open) return;
    setBusy(true);
    const h = contentHash(open.en);
    await clearOverride(open.en);
    setEdited((m) => { const n = { ...m }; delete n[h]; return n; });
    await loadOverrides();
    setBusy(false);
    setOpen(null);
  };

  /* ---------------- the editor sheet ---------------- */

  if (open) {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={s.head}>
            <Pressable hitSlop={12} onPress={() => setOpen(null)}>
              <Ionicons name="close" size={22} color={colors.textPrimary} />
            </Pressable>
            <Text style={s.headT}>{open.kind}</Text>
            <Pressable hitSlop={12} onPress={save} disabled={busy}>
              {busy ? <ActivityIndicator size="small" /> : <Text style={s.save}>Save</Text>}
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
            <Text style={s.fieldL}>ENGLISH</Text>
            <TextInput
              style={s.input}
              value={enVal}
              onChangeText={setEnVal}
              multiline
              placeholder="English text"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={[s.fieldL, { marginTop: spacing.xl }]}>فارسی</Text>
            <TextInput
              style={[s.input, s.inputFa]}
              value={faVal}
              onChangeText={setFaVal}
              multiline
              textAlign="right"
              placeholder="متن فارسی"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={s.origL}>ORIGINAL, AS SHIPPED</Text>
            <Text style={s.orig}>{open.en}</Text>

            {edited[contentHash(open.en)] ? (
              <Pressable style={s.reset} onPress={reset}>
                <Ionicons name="refresh" size={13} color={colors.textSecondary} />
                <Text style={s.resetT}>Remove this edit</Text>
              </Pressable>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  /* ---------------- the list ---------------- */

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.head}>
        <Pressable hitSlop={12} onPress={() => (topicKey ? setTopicKey(null) : router.replace('/admin' as any))}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.headT}>{topicKey ? rows[0]?.topicTitle ?? 'Content' : 'Content'}</Text>
        <View style={{ width: 22 }} />
      </View>

      {!topicKey ? (
        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <View style={s.segs}>
            {(['education', 'literature'] as const).map((k) => (
              <Pressable key={k} onPress={() => setSection(k)} style={[s.seg, section === k && s.segOn]}>
                <Text style={[s.segT, section === k && s.segTOn]}>{k}</Text>
              </Pressable>
            ))}
          </View>

          {topics.map((t) => (
            <Pressable key={t.key} style={s.row} onPress={() => { setQuery(''); setTopicKey(t.key); }}>
              <Text style={s.rowT}>{t.name}</Text>
              <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
          <View style={s.search}>
            <Ionicons name="search" size={14} color={colors.textSecondary} />
            <TextInput
              style={s.searchIn}
              value={query}
              onChangeText={setQuery}
              placeholder="Search this topic"
              placeholderTextColor={colors.textSecondary}
              autoCorrect={false}
            />
            {query ? (
              <Pressable hitSlop={8} onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={15} color={colors.textSecondary} />
              </Pressable>
            ) : null}
          </View>
          <Text style={s.count}>{rows.length} of {allRows.length} blocks</Text>
          {rows.map((r, i) => {
            const h = contentHash(r.en);
            const isEdited = !!edited[h];
            return (
              <Pressable key={h + i} style={s.block} onPress={() => openRow(r)}>
                <View style={s.blockTop}>
                  <Text style={s.kind}>{r.kind}</Text>
                  {isEdited ? <View style={s.dot} /> : null}
                </View>
                <Text style={s.blockEn} numberOfLines={2}>{edited[h]?.x ?? r.en}</Text>
                {(edited[h]?.fa ?? r.fa) ? (
                  <Text style={s.blockFa} numberOfLines={1}>{edited[h]?.fa ?? r.fa}</Text>
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.08)' },
  headT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  save: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.accent },

  segs: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  seg: { flex: 1, paddingVertical: 9, borderRadius: radius.md, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.04)' },
  segOn: { backgroundColor: colors.accent },
  segT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.textSecondary, textTransform: 'capitalize' },
  segTOn: { color: '#FFF' },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.06)' },
  rowT: { fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary },

  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 9, marginBottom: spacing.md },
  searchIn: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, padding: 0 },
  count: { fontFamily: fonts.body, fontSize: 11, letterSpacing: 1, color: colors.textSecondary, marginBottom: spacing.md, textTransform: 'uppercase' },

  block: { paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.06)' },
  blockTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  kind: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1, color: colors.textSecondary, textTransform: 'uppercase' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  blockEn: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textPrimary },
  blockFa: { fontFamily: fonts.persian, fontSize: 12.5, lineHeight: 24, color: colors.textSecondary, textAlign: 'right', marginTop: 3 },

  fieldL: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginBottom: 6 },
  input: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.textPrimary, backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: radius.md, padding: spacing.md, minHeight: 110, textAlignVertical: 'top' },
  inputFa: { fontFamily: fonts.persian, fontSize: 14.5, lineHeight: 30, writingDirection: 'rtl' },

  origL: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.5, color: colors.textSecondary, marginTop: spacing.xl, marginBottom: 6 },
  orig: { fontFamily: fonts.body, fontSize: 12, lineHeight: 19, color: colors.textSecondary, opacity: 0.8 },

  reset: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.xl, paddingVertical: 12, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.12)' },
  resetT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary },
});
