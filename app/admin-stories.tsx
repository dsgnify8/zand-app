// Founder stories, for the admin.
//
// Two halves. A list of everyone who said they had something worth
// telling, and an editor for turning one of those into a page.
//
// The story is typed as prose, not as blocks. A blank line starts a
// paragraph, a line in quotation marks becomes a pull-quote, three dashes
// make a rule. Anything more structured would mean thinking about the
// shape of the page while writing the words, which is the wrong order.
//
// Nothing appears on a listing until Approved is on — the flip button does
// not even show. So a half-written story is safe to leave.

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import {
  loadStory, parseBody, pickStoryPhotos, pitchedStories, saveStory,
  storyPhotoUrl, unparseBody, uploadStoryPhoto,
  type FounderStory,
} from '@/lib/founder-stories';

type Pitched = {
  id: string;
  name: string;
  city?: string | null;
  story_pitch?: string | null;
};

const EMPTY = (businessId: string): FounderStory => ({
  business_id: businessId,
  name: '',
  name_fa: '',
  since: '',
  since_fa: '',
  body: [],
  body_fa: [],
  photos: [],
  approved: false,
});

export default function AdminStories() {
  const admin = useIsAdmin();

  const [rows, setRows] = useState<Pitched[]>([]);
  const [has, setHas] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Pitched | null>(null);

  const refresh = async () => {
    const list = (await pitchedStories()) as Pitched[];
    setRows(list);
    // Which of them already have a story written.
    const m: Record<string, boolean> = {};
    await Promise.all(list.map(async (r) => {
      const s = await loadStory(r.id);
      if (s) m[r.id] = s.approved;
    }));
    setHas(m);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  if (!admin) {
    return (
      <SafeAreaView style={s.safe}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  if (open) {
    return <Editor biz={open} onDone={() => { setOpen(null); refresh(); }} />;
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.topT}>Founder stories</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : (
        <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
          <Text style={s.lead}>
            Everyone who ticked the box when they listed. What they wrote is
            their pitch, not the story — the story is what you make of it.
          </Text>

          {rows.length === 0 ? (
            <Text style={s.none}>Nobody has offered one yet.</Text>
          ) : null}

          {rows.map((r) => {
            const state = r.id in has
              ? (has[r.id] ? 'live' : 'written, not approved')
              : 'nothing written';
            return (
              <Pressable key={r.id} style={s.row} onPress={() => setOpen(r)}>
                <View style={s.rowTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.name}>{r.name}</Text>
                    <Text style={s.meta}>
                      {r.city ? r.city + '  ·  ' : ''}{state}
                    </Text>
                  </View>
                  <Ionicons
                    name={has[r.id] ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={has[r.id] ? colors.accent : colors.textSecondary}
                  />
                </View>
                {r.story_pitch ? (
                  <Text style={s.pitch} numberOfLines={4}>{r.story_pitch}</Text>
                ) : (
                  <Text style={[s.pitch, { fontStyle: 'italic' }]}>
                    Ticked the box but left it blank.
                  </Text>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/* ================================================================== *
 * The editor
 * ================================================================== */

function Editor({ biz, onDone }: { biz: Pitched; onDone: () => void }) {
  const [story, setStory] = useState<FounderStory>(EMPTY(biz.id));
  const [text, setText] = useState('');
  const [textFa, setTextFa] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const s = await loadStory(biz.id);
      if (s) {
        setStory(s);
        setText(unparseBody(s.body ?? []));
        setTextFa(unparseBody(s.body_fa ?? []));
      } else {
        setStory({ ...EMPTY(biz.id), name: biz.name });
      }
      setLoading(false);
    })();
  }, [biz.id]);

  const set = (patch: Partial<FounderStory>) => setStory((v) => ({ ...v, ...patch }));

  const addPhotos = async () => {
    const assets = await pickStoryPhotos(6 - (story.photos?.length ?? 0));
    if (assets.length === 0) return;
    setBusy(true);
    const paths: string[] = [];
    for (const a of assets) {
      const p = await uploadStoryPhoto(biz.id, a.uri);
      if (p) paths.push(p);
    }
    set({ photos: [...(story.photos ?? []), ...paths] });
    setBusy(false);
  };

  const save = async () => {
    setBusy(true);
    setMsg(null);
    const { error } = await saveStory({
      ...story,
      body: parseBody(text),
      body_fa: parseBody(textFa),
    });
    setBusy(false);
    setMsg(error ? error : 'Saved.');
    if (!error) setTimeout(onDone, 600);
  };

  if (loading) {
    return (
      <SafeAreaView style={s.safe}>
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={onDone}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.topT} numberOfLines={1}>{biz.name}</Text>
        <View style={{ width: 22 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
          {biz.story_pitch ? (
            <View style={s.pitchBox}>
              <Text style={s.pitchL}>WHAT THEY SENT</Text>
              <Text style={s.pitchBoxT}>{biz.story_pitch}</Text>
            </View>
          ) : null}

          <Text style={s.label}>WHOSE STORY</Text>
          <TextInput
            style={s.input}
            value={story.name}
            onChangeText={(v) => set({ name: v })}
            placeholder="Name"
            placeholderTextColor={colors.textSecondary}
          />
          <TextInput
            style={[s.input, s.fa, { marginTop: spacing.sm }]}
            value={story.name_fa ?? ''}
            onChangeText={(v) => set({ name_fa: v })}
            placeholder="نام"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[s.label, { marginTop: spacing.xl }]}>SINCE</Text>
          <TextInput
            style={s.input}
            value={story.since ?? ''}
            onChangeText={(v) => set({ since: v })}
            placeholder="Since 1998 · Opened during the pandemic"
            placeholderTextColor={colors.textSecondary}
          />
          <TextInput
            style={[s.input, s.fa, { marginTop: spacing.sm }]}
            value={story.since_fa ?? ''}
            onChangeText={(v) => set({ since_fa: v })}
            placeholder="از ۱۳۷۷"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[s.label, { marginTop: spacing.xl }]}>THE STORY</Text>
          <Text style={s.hint}>
            A blank line starts a paragraph. A line in "quotation marks"
            becomes a pull-quote. Three dashes on their own make a rule.
          </Text>
          <TextInput
            style={[s.input, s.big]}
            value={text}
            onChangeText={setText}
            placeholder="In English."
            placeholderTextColor={colors.textSecondary}
            multiline
            textAlignVertical="top"
          />
          <TextInput
            style={[s.input, s.big, s.fa, { marginTop: spacing.sm }]}
            value={textFa}
            onChangeText={setTextFa}
            placeholder="به فارسی."
            placeholderTextColor={colors.textSecondary}
            multiline
            textAlignVertical="top"
          />

          <Text style={[s.label, { marginTop: spacing.xl }]}>
            PHOTOS {story.photos?.length ? `· ${story.photos.length} of 6` : ''}
          </Text>
          <View style={s.photos}>
            {(story.photos ?? []).map((p) => {
              const url = storyPhotoUrl(p);
              return (
                <Pressable
                  key={p}
                  style={s.thumb}
                  onPress={() => set({ photos: (story.photos ?? []).filter((x) => x !== p) })}
                >
                  {url ? <Image source={{ uri: url }} style={StyleSheet.absoluteFill as any} /> : null}
                  <View style={s.thumbX}>
                    <Ionicons name="close" size={11} color="#FFF" />
                  </View>
                </Pressable>
              );
            })}
            {(story.photos?.length ?? 0) < 6 ? (
              <Pressable style={[s.thumb, s.thumbAdd]} onPress={addPhotos} disabled={busy}>
                {busy
                  ? <ActivityIndicator size="small" color={colors.accent} />
                  : <Ionicons name="add" size={20} color={colors.textSecondary} />}
              </Pressable>
            ) : null}
          </View>

          <Pressable
            style={[s.approve, story.approved && s.approveOn]}
            onPress={() => set({ approved: !story.approved })}
          >
            <Ionicons
              name={story.approved ? 'checkmark-circle' : 'ellipse-outline'}
              size={17}
              color={story.approved ? '#FFF' : colors.textSecondary}
            />
            <Text style={[s.approveT, story.approved && { color: '#FFF' }]}>
              {story.approved ? 'Live on the listing' : 'Not shown yet'}
            </Text>
          </Pressable>

          <Pressable style={s.save} onPress={save} disabled={busy}>
            <Text style={s.saveT}>{busy ? 'Saving…' : 'Save'}</Text>
          </Pressable>

          {msg ? <Text style={s.msg}>{msg}</Text> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary, flex: 1, textAlign: 'center' },
  denied: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },
  lead: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary, marginBottom: spacing.lg },
  none: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: spacing.xl },

  row: {
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border,
    paddingVertical: spacing.lg, gap: spacing.sm,
  },
  rowTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  name: { fontFamily: fonts.bodyStrong, fontSize: 15.5, color: colors.textPrimary },
  meta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },
  pitch: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary },

  pitchBox: {
    backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: 12,
    padding: spacing.md, marginBottom: spacing.lg,
  },
  pitchL: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.6, color: colors.textSecondary },
  pitchBoxT: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textPrimary, marginTop: 6 },

  label: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.8, color: colors.textSecondary, marginBottom: spacing.sm },
  hint: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: colors.textSecondary, marginBottom: spacing.sm },
  input: {
    fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary,
    backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: 10,
    paddingHorizontal: spacing.md, paddingVertical: 11,
  },
  big: { minHeight: 190, paddingTop: 12 },
  fa: { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' },

  photos: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  thumb: { width: 72, height: 72, borderRadius: 10, overflow: 'hidden', backgroundColor: colors.surface },
  thumbAdd: { alignItems: 'center', justifyContent: 'center', borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  thumbX: {
    position: 'absolute', top: 4, right: 4,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center',
  },

  approve: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: 10,
    alignSelf: 'flex-start', marginTop: spacing.xl,
  },
  approveOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  approveT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary },

  save: {
    backgroundColor: colors.textPrimary, borderRadius: 999,
    paddingVertical: 14, alignItems: 'center', marginTop: spacing.lg,
  },
  saveT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },
  msg: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },
});
