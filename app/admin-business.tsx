// One business, everything about it.
//
// Three sections rather than three screens: what it says, what its owner
// has said, and whether it has a story. Keeping them together means you
// can read a message, look at the listing it is about, and answer —
// without holding any of it in your head between screens.
//
// Nothing saves as you type. There is one Save, and it says what it did.

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import { CATEGORIES, categoryLabel, loadBusiness, type Business } from '@/lib/businesses';
import { bizImage } from '@/lib/business-photos';

type Msg = {
  id: number;
  body: string;
  from_admin: boolean;
  created_at: string;
  read_at: string | null;
};

type Story = {
  id?: string;
  name?: string;
  state?: string;
  admin_note?: string | null;
  body?: any[];
  photos?: string[];
};

const SOCIALS = ['instagram', 'tiktok', 'facebook', 'telegram'] as const;

export default function AdminBusiness() {
  const admin = useIsAdmin();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [b, setB] = useState<Business | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [said, setSaid] = useState<string | null>(null);
  const [tab, setTab] = useState<'listing' | 'messages' | 'story'>('listing');

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const [biz, { data: m }, { data: st }] = await Promise.all([
      loadBusiness(id),
      supabase.from('business_messages')
        .select('*').eq('business_id', id).order('created_at', { ascending: true }),
      supabase.from('founder_stories')
        .select('*').eq('business_id', id).maybeSingle(),
    ]);
    setB(biz);
    setMsgs((m ?? []) as Msg[]);
    setStory((st as Story) ?? null);
    setLoading(false);

    // Anything the owner sent is now read.
    await supabase.from('business_messages')
      .update({ read_at: new Date().toISOString() })
      .eq('business_id', id).eq('from_admin', false).is('read_at', null);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (!admin) {
    return (
      <SafeAreaView style={s.safe}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  const set = (patch: Partial<Business>) => setB((v) => (v ? { ...v, ...patch } as Business : v));

  const save = async () => {
    if (!b || !id) return;
    setBusy(true);
    const { error } = await supabase.from('businesses').update({
      name: b.name,
      name_fa: (b as any).name_fa,
      description: b.description,
      description_fa: (b as any).description_fa,
      tagline: (b as any).tagline,
      category: b.category,
      city: b.city,
      country: b.country,
      address: (b as any).address,
      phone: (b as any).phone,
      website: (b as any).website,
      website_label: (b as any).website_label,
      socials: (b as any).socials,
      status: b.status,
      opened_year: (b as any).opened_year,
    }).eq('id', id);
    setBusy(false);
    setSaid(error ? error.message : 'Saved.');
    setTimeout(() => setSaid(null), 2200);
  };

  const send = async () => {
    if (!msg.trim() || !id) return;
    setBusy(true);
    await supabase.from('business_messages').insert({
      business_id: id, from_admin: true, body: msg.trim(),
    });
    setMsg('');
    await load();
    setBusy(false);
  };

  const setStoryState = async (state: string) => {
    if (!story?.id) return;
    setBusy(true);
    await supabase.from('founder_stories').update({
      state,
      approved: state === 'approved',
      admin_note: story.admin_note ?? null,
    }).eq('id', story.id);
    await load();
    setBusy(false);
  };

  if (loading || !b) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      </SafeAreaView>
    );
  }

  const socials: Record<string, string> = ((b as any).socials ?? {});

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.topT} numberOfLines={1}>{b.name}</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={s.tabs}>
        {(['listing', 'messages', 'story'] as const).map((k) => (
          <Pressable key={k} style={[s.tab, tab === k && s.tabOn]} onPress={() => setTab(k)}>
            <Text style={[s.tabT, tab === k && s.tabTOn]}>
              {k === 'messages' && msgs.filter((m) => !m.from_admin).length
                ? 'Messages  ' + msgs.filter((m) => !m.from_admin).length
                : k[0].toUpperCase() + k.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">

          {/* ---------------- the listing ---------------- */}
          {tab === 'listing' ? (
            <>
              {(b.photos ?? []).length ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.shots}>
                  {(b.photos ?? []).map((p) => (
                    <View key={p} style={s.shot}>
                      <Image source={bizImage(p)} style={StyleSheet.absoluteFill as any} />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text style={s.hint}>No photographs. The owner adds these from their own page.</Text>
              )}

              <Field label="NAME" value={b.name} onChange={(v) => set({ name: v } as any)} />
              <Field label="NAME (FA)" value={(b as any).name_fa ?? ''} fa onChange={(v) => set({ name_fa: v } as any)} />

              <Text style={s.label}>CATEGORY</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
                {CATEGORIES.map((c) => (
                  <Pressable
                    key={c.key}
                    style={[s.chip, b.category === c.key && s.chipOn]}
                    onPress={() => set({ category: c.key } as any)}
                  >
                    <Text style={[s.chipT, b.category === c.key && s.chipTOn]}>{c.en}</Text>
                  </Pressable>
                ))}
              </ScrollView>

              <Field label="CITY" value={b.city ?? ''} onChange={(v) => set({ city: v } as any)} />
              <Field label="COUNTRY" value={b.country ?? ''} onChange={(v) => set({ country: v } as any)} />
              <Field label="ADDRESS" value={(b as any).address ?? ''} onChange={(v) => set({ address: v } as any)} />

              <Field label="ABOUT" value={b.description ?? ''} big onChange={(v) => set({ description: v } as any)} />
              <Field label="ABOUT (FA)" value={(b as any).description_fa ?? ''} big fa onChange={(v) => set({ description_fa: v } as any)} />

              <Field label="PHONE" value={(b as any).phone ?? ''} onChange={(v) => set({ phone: v } as any)} />
              <Field label="WEBSITE" value={(b as any).website ?? ''} onChange={(v) => set({ website: v } as any)} />

              <Text style={s.label}>SOCIAL</Text>
              {SOCIALS.map((k) => (
                <View key={k} style={s.socialRow}>
                  <Text style={s.socialK}>{k}</Text>
                  <TextInput
                    style={[s.input, { flex: 1 }]}
                    value={socials[k] ?? ''}
                    onChangeText={(v) => set({ socials: { ...socials, [k]: v } } as any)}
                    placeholder="handle"
                    placeholderTextColor={colors.textSecondary}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              ))}

              <Text style={s.label}>STATUS</Text>
              <View style={s.chips}>
                {['active', 'pending', 'hidden'].map((k) => (
                  <Pressable
                    key={k}
                    style={[s.chip, b.status === k && s.chipOn]}
                    onPress={() => set({ status: k } as any)}
                  >
                    <Text style={[s.chipT, b.status === k && s.chipTOn]}>{k}</Text>
                  </Pressable>
                ))}
              </View>

              <Pressable style={s.save} onPress={save} disabled={busy}>
                <Text style={s.saveT}>{busy ? 'Saving…' : 'Save'}</Text>
              </Pressable>
              {said ? <Text style={s.said}>{said}</Text> : null}
            </>
          ) : null}

          {/* ---------------- messages ---------------- */}
          {tab === 'messages' ? (
            <>
              {msgs.length === 0 ? (
                <Text style={s.hint}>Nothing said yet.</Text>
              ) : msgs.map((m) => (
                <View key={m.id} style={[s.msg, m.from_admin ? s.msgMine : s.msgTheirs]}>
                  <Text style={s.msgWho}>{m.from_admin ? 'You' : b.name}</Text>
                  <Text style={s.msgBody}>{m.body}</Text>
                </View>
              ))}

              <View style={s.composer}>
                <TextInput
                  style={[s.input, { flex: 1 }]}
                  value={msg}
                  onChangeText={setMsg}
                  placeholder="Write to the owner"
                  placeholderTextColor={colors.textSecondary}
                  multiline
                />
                <Pressable hitSlop={8} onPress={send} disabled={busy || !msg.trim()}>
                  <Ionicons name="send" size={19} color={msg.trim() ? colors.accent : colors.textSecondary} />
                </Pressable>
              </View>
            </>
          ) : null}

          {/* ---------------- the story ---------------- */}
          {tab === 'story' ? (
            !story ? (
              <>
                <Text style={s.hint}>
                  No story yet. Any live business can offer one at any time from
                  their own page — you do not have to ask at signup.
                </Text>
                <Pressable
                  style={s.ghost}
                  onPress={() => router.navigate(('/admin-stories') as any)}
                >
                  <Text style={s.ghostT}>Write one yourself</Text>
                </Pressable>
              </>
            ) : (
              <>
                <View style={s.stateRow}>
                  <Text style={s.stateT}>{(story.state ?? 'draft').toUpperCase()}</Text>
                </View>

                {(story.body ?? []).map((blk: any, i: number) => (
                  <Text key={i} style={blk.t === 'quote' ? s.storyQ : s.storyP}>
                    {blk.t === 'rule' ? '—' : blk.x}
                  </Text>
                ))}

                <Text style={[s.label, { marginTop: spacing.xl }]}>A NOTE TO THEM</Text>
                <TextInput
                  style={[s.input, s.big]}
                  value={story.admin_note ?? ''}
                  onChangeText={(v) => setStory({ ...story, admin_note: v })}
                  placeholder="Why you are holding or declining it. They see this."
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  textAlignVertical="top"
                />

                <View style={s.acts}>
                  <Pressable style={[s.act, s.actYes]} onPress={() => setStoryState('approved')} disabled={busy}>
                    <Text style={s.actYesT}>Approve</Text>
                  </Pressable>
                  <Pressable style={s.act} onPress={() => setStoryState('held')} disabled={busy}>
                    <Text style={s.actT}>Hold</Text>
                  </Pressable>
                  <Pressable style={s.act} onPress={() => setStoryState('declined')} disabled={busy}>
                    <Text style={s.actT}>Decline</Text>
                  </Pressable>
                </View>
              </>
            )
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({
  label, value, onChange, big, fa,
}: {
  label: string; value: string; onChange: (v: string) => void; big?: boolean; fa?: boolean;
}) {
  return (
    <>
      <Text style={s.label}>{label}</Text>
      <TextInput
        style={[s.input, big && s.big, fa && s.fa]}
        value={value}
        onChangeText={onChange}
        multiline={big}
        textAlignVertical={big ? 'top' : 'center'}
        placeholderTextColor={colors.textSecondary}
      />
    </>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 18, color: colors.textPrimary, flex: 1, textAlign: 'center' },
  denied: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  tabs: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  tab: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: 6,
  },
  tabOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  tabT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary },
  tabTOn: { color: '#FFF' },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },
  hint: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary, marginVertical: spacing.md },

  shots: { gap: 8, paddingBottom: spacing.md },
  shot: { width: 96, height: 96, borderRadius: 8, overflow: 'hidden', backgroundColor: colors.surface },

  label: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.8, color: colors.textSecondary, marginTop: spacing.lg, marginBottom: 6 },
  input: {
    fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary,
    backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: 9,
    paddingHorizontal: spacing.md, paddingVertical: 10,
  },
  big: { minHeight: 96, paddingTop: 10 },
  fa: { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingVertical: 2 },
  chip: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: 6,
  },
  chipOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  chipT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  chipTOn: { color: '#FFF' },

  socialRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 6 },
  socialK: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, width: 68 },

  save: { backgroundColor: colors.textPrimary, borderRadius: 999, paddingVertical: 13, alignItems: 'center', marginTop: spacing.xl },
  saveT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },
  said: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },

  msg: { borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, maxWidth: '88%' },
  msgMine: { backgroundColor: 'rgba(0,0,0,0.05)', alignSelf: 'flex-end' },
  msgTheirs: { backgroundColor: 'rgba(178,74,45,0.10)', alignSelf: 'flex-start' },
  msgWho: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.4, color: colors.textSecondary, marginBottom: 4 },
  msgBody: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textPrimary },

  composer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg },

  stateRow: { alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, marginBottom: spacing.md },
  stateT: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.6, color: colors.textSecondary },
  storyP: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.textPrimary, marginBottom: spacing.md },
  storyQ: { fontFamily: fonts.heading, fontSize: 17, lineHeight: 25, color: colors.textPrimary, marginBottom: spacing.md },

  acts: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  act: {
    flex: 1, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 11, alignItems: 'center',
  },
  actYes: { backgroundColor: colors.accent, borderColor: colors.accent },
  actT: { fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },
  actYesT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#FFF' },

  ghost: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 11, alignItems: 'center', marginTop: spacing.md,
  },
  ghostT: { fontFamily: fonts.body, fontSize: 13, color: colors.accent },
});
