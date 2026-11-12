// Hand in Hand, for the admin.
//
// This is the whole reason the section reads from the database: a
// profile can be added, corrected or taken down this afternoon rather
// than at the next App Store review. Nothing is submitted from outside,
// so this screen is the only way a profile exists.
//
// Built in the same language as the rest of the app: module cards with
// a tinted spine, round photos, pill buttons. Persian is authored, not
// translated, and consent is written down rather than remembered.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StyleSheet, Switch, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import {
  loadHamdeli, hamdeliRows, coverUrl, pickCover, uploadCover, saveHamdeli,
  deleteHamdeli, slugify, youtubeId, instagramPostUrl, MAX_REELS, HAMDELI_TINT,
  type Hamdeli, type HamdeliKind,
} from '@/lib/hamdeli';

const TINT = HAMDELI_TINT;

const KINDS: { key: HamdeliKind; label: string; icon: any }[] = [
  { key: 'animals', label: 'Animals', icon: 'paw-outline' },
  { key: 'people', label: 'People', icon: 'people-outline' },
  { key: 'children', label: 'Children', icon: 'happy-outline' },
  { key: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
];
const kindLabel = (k?: string) => KINDS.find((x) => x.key === k)?.label ?? 'Other';

const BLANK: Partial<Hamdeli> = {
  slug: '', name: '', blurb: '', kind: 'animals', published: false, sort: 0,
  youtube_ids: [],
};

/* ------------------------------------------------------------------ */

function GroupHead({ label, note }: { label: string; note?: string }) {
  return (
    <View style={s.groupHead}>
      <View style={s.groupBar} />
      <View style={{ flex: 1 }}>
        <Text style={s.groupL}>{label}</Text>
        {note ? <Text style={s.groupN}>{note}</Text> : null}
      </View>
    </View>
  );
}

function Field({
  label, value, onChange, hint, multiline, rtl, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  hint?: string; multiline?: boolean; rtl?: boolean; placeholder?: string;
}) {
  return (
    <View style={s.field}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        style={[s.input, multiline && s.inputTall, rtl && s.inputRtl]}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary + '99'}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {hint ? <Text style={s.hint}>{hint}</Text> : null}
    </View>
  );
}

function Avatar({ path, size }: { path?: string | null; size: number }) {
  const url = coverUrl(path);
  const round = { width: size, height: size, borderRadius: size / 2 };
  return url
    ? <Image source={{ uri: url }} style={[s.avatar, round]} />
    : (
      <View style={[s.avatar, s.avatarEmpty, round]}>
        <Ionicons name="heart-outline" size={size * 0.34} color={TINT} />
      </View>
    );
}

/* ------------------------------------------------------------------ */

export default function AdminHamdeli() {
  const admin = useIsAdmin();
  const [rows, setRows] = useState<Hamdeli[]>([]);
  const [busy, setBusy] = useState(true);
  const [editing, setEditing] = useState<Partial<Hamdeli> | null>(null);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [videoInput, setVideoInput] = useState('');
  const [reelInput, setReelInput] = useState('');

  const refresh = async () => {
    setBusy(true);
    await loadHamdeli(true);
    setRows(hamdeliRows());
    setBusy(false);
  };

  useEffect(() => { refresh(); }, []);

  const draft = editing ?? null;
  const set = (patch: Partial<Hamdeli>) => setEditing((d) => ({ ...(d ?? {}), ...patch }));

  const canSave = useMemo(
    () => !!draft?.name?.trim() && !!draft?.blurb?.trim(),
    [draft?.name, draft?.blurb],
  );

  const live = rows.filter((r) => r.published).length;
  const drafts = rows.length - live;

  const open = (r: Partial<Hamdeli>) => { setEditing({ ...r }); setNote(null); setVideoInput(''); setReelInput(''); };

  const onPickCover = async () => {
    if (!draft) return;
    const slug = draft.slug?.trim() || slugify(draft.name ?? 'profile');
    const asset = await pickCover();
    if (!asset?.uri) return;
    setSaving(true);
    const path = await uploadCover(slug, asset.uri);
    setSaving(false);
    if (!path) { setNote('The photo did not upload. Check the connection and try again.'); return; }
    set({ cover: path, slug });
  };

  const addVideo = () => {
    const id = youtubeId(videoInput);
    if (!id) { setNote('That is not a YouTube link this can read. Paste the full link from the Share button.'); return; }
    const have = draft?.youtube_ids ?? [];
    if (have.includes(id)) { setVideoInput(''); return; }
    set({ youtube_ids: [...have, id] });
    setVideoInput('');
    setNote(null);
  };

  // Link first, so a mistyped link is caught before anyone hunts for a
  // screenshot. Then the cover, which uploads straight away.
  const addReel = async () => {
    if (!draft) return;
    const have = draft.reels ?? [];
    if (have.length >= MAX_REELS) { setNote(`Two videos is the most a profile shows. Remove one to add another.`); return; }
    const url = instagramPostUrl(reelInput);
    if (!url) { setNote('That is not an Instagram reel or post link. Use Share, then Copy link, in Instagram.'); return; }
    if (have.some((r) => r.url === url)) { setReelInput(''); return; }

    const asset = await pickCover('portrait');
    if (!asset?.uri) return;
    const slug = draft.slug?.trim() || slugify(draft.name ?? 'profile');
    setSaving(true);
    const cover = await uploadCover(slug + '/reels', asset.uri);
    setSaving(false);
    if (!cover) { setNote('The cover did not upload. Check the connection and try again.'); return; }

    set({ reels: [...have, { url, cover }], slug });
    setReelInput('');
    setNote(null);
  };

  const onSave = async () => {
    if (!draft || !canSave) return;
    setSaving(true);
    const err = await saveHamdeli({
      ...draft,
      slug: draft.slug?.trim() || slugify(draft.name!),
      name: draft.name!.trim(),
      blurb: draft.blurb!.trim(),
    } as any);
    setSaving(false);
    if (err) { setNote(err); return; }
    setEditing(null);
    setNote(null);
    await refresh();
  };

  // Deleting is permanent and a live reader may be looking at it, so it
  // asks first and offers the reversible option alongside.
  const onDelete = (r: Hamdeli) => {
    Alert.alert(
      'Delete ' + r.name + '?',
      'This removes the profile and its photo for good. Turning off Published hides it instead, and can be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => reallyDelete(r) },
      ],
    );
  };

  const reallyDelete = async (r: Hamdeli) => {
    setSaving(true);
    const err = await deleteHamdeli(r.id, r.cover, r.reels);
    setSaving(false);
    if (err) { setNote(err); return; }
    setEditing(null);
    await refresh();
  };

  if (!admin) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={s.flex} contentContainerStyle={s.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Pressable style={s.backBtn} onPress={() => (draft ? setEditing(null) : router.back())}>
            <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
            <Text style={s.backBtnText}>{draft ? 'All profiles' : 'Admin'}</Text>
          </Pressable>

          {!draft ? (
            /* ---------------------------- the list ---------------------------- */
            <>
              <View style={s.head}>
                <Text style={s.title}>Hand in Hand</Text>
                <Text style={s.titleFa}>همدلی</Text>
                <Text style={s.summary}>
                  {busy && !rows.length ? 'Loading' : `${live} live, ${drafts} ${drafts === 1 ? 'draft' : 'drafts'}`}
                </Text>
              </View>

              <Pressable style={s.pill} onPress={() => open({ ...BLANK, sort: rows.length })}>
                <Text style={s.pillText}>Add a profile</Text>
                <View style={s.pillGo}><Ionicons name="add" size={17} color="#FFF" /></View>
              </Pressable>

              {note ? <View style={s.noteBox}><Text style={s.noteText}>{note}</Text></View> : null}

              <View style={s.list}>
                {rows.map((r) => (
                  <Pressable key={r.id} style={s.card} onPress={() => open(r)}>
                    <View style={s.spine} />
                    <LinearGradient
                      colors={[TINT + '10', 'transparent']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0.9, y: 1 }}
                      style={StyleSheet.absoluteFill as any}
                      pointerEvents="none"
                    />
                    <View style={s.cardRow}>
                      <Avatar path={r.cover} size={50} />
                      <View style={{ flex: 1 }}>
                        <View style={s.nameRow}>
                          <Text style={s.cardName} numberOfLines={1}>{r.name}</Text>
                          {r.name_fa ? <Text style={s.cardFa} numberOfLines={1}>{r.name_fa}</Text> : null}
                        </View>
                        <Text style={s.cardMeta}>
                          {kindLabel(r.kind)}{r.city ? '  ·  ' + r.city : ''}
                        </Text>
                      </View>
                      <View style={[s.status, r.published ? s.statusLive : s.statusDraft]}>
                        <Text style={[s.statusText, r.published ? s.statusTextLive : s.statusTextDraft]}>
                          {r.published ? 'Live' : 'Draft'}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
                {!busy && rows.length === 0 ? (
                  <Text style={s.empty}>No profiles yet. Add the first one above.</Text>
                ) : null}
              </View>
            </>
          ) : (
            /* ---------------------------- the editor -------------------------- */
            <>
              <View style={s.editorHead}>
                <Pressable onPress={onPickCover} style={s.photoWrap}>
                  <Avatar path={draft.cover} size={128} />
                  <View style={s.photoBadge}>
                    {saving
                      ? <ActivityIndicator size="small" color="#FFF" />
                      : <Ionicons name="camera-outline" size={16} color="#FFF" />}
                  </View>
                </Pressable>
                <Text style={s.photoHint}>
                  {draft.cover ? 'Tap to change the photo' : 'Tap to add a photo'}
                </Text>
                <Text style={s.editorTitle}>{draft.name?.trim() || 'New profile'}</Text>
                {draft.name_fa ? <Text style={s.titleFa}>{draft.name_fa}</Text> : null}
              </View>

              {note ? <View style={s.noteBox}><Text style={s.noteText}>{note}</Text></View> : null}

              {/* Visibility first: it is the setting that matters most and
                  the one most worth seeing before anything else. */}
              <View style={s.publishCard}>
                <View style={{ flex: 1 }}>
                  <Text style={s.publishT}>{draft.published ? 'Live' : 'Draft'}</Text>
                  <Text style={s.publishX}>
                    {draft.published ? 'Everyone can see this profile.' : 'Only you can see this profile.'}
                  </Text>
                </View>
                <Switch
                  value={!!draft.published}
                  onValueChange={(v) => set({ published: v })}
                  trackColor={{ true: colors.success, false: colors.border }}
                />
              </View>

              <GroupHead label="WHO THEY ARE" />
              <Field label="Name" value={draft.name ?? ''} onChange={(v) => set({ name: v })} />
              <Field label="Name in Persian" value={draft.name_fa ?? ''} onChange={(v) => set({ name_fa: v })} rtl />
              <View style={s.twoUp}>
                <View style={{ flex: 1 }}>
                  <Field label="City" value={draft.city ?? ''} onChange={(v) => set({ city: v })} />
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="City in Persian" value={draft.city_fa ?? ''} onChange={(v) => set({ city_fa: v })} rtl />
                </View>
              </View>

              <Text style={s.label}>Kind</Text>
              <View style={s.kinds}>
                {KINDS.map((k) => {
                  const on = draft.kind === k.key;
                  return (
                    <Pressable key={k.key} style={[s.chip, on && s.chipOn]} onPress={() => set({ kind: k.key })}>
                      <Ionicons name={k.icon} size={14} color={on ? '#FFF' : TINT} />
                      <Text style={[s.chipText, on && s.chipTextOn]}>{k.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <GroupHead label="ON THE LIST" note="One line under their name. A fact, not a plea." />
              <Field label="One line" value={draft.blurb ?? ''} onChange={(v) => set({ blurb: v })} multiline />
              <Field label="One line in Persian" value={draft.blurb_fa ?? ''} onChange={(v) => set({ blurb_fa: v })} multiline rtl />

              <GroupHead label="ON THEIR PAGE" note="A few paragraphs, and the concrete thing that helps." />
              <Field label="Story" value={draft.story ?? ''} onChange={(v) => set({ story: v })} multiline />
              <Field label="Story in Persian" value={draft.story_fa ?? ''} onChange={(v) => set({ story_fa: v })} multiline rtl />
              <Field
                label="What helps"
                value={draft.need ?? ''}
                onChange={(v) => set({ need: v })}
                multiline
                hint="Food for forty dogs through winter, not any support welcome."
              />
              <Field label="What helps, in Persian" value={draft.need_fa ?? ''} onChange={(v) => set({ need_fa: v })} multiline rtl />

              <GroupHead label="LINKS" note="All of these open outside the app." />
              <Field label="Instagram" value={draft.instagram ?? ''} onChange={(v) => set({ instagram: v })} placeholder="handle, without the @" />
              <Field label="Website" value={draft.website ?? ''} onChange={(v) => set({ website: v })} placeholder="example.com" />
              <Field label="Donate" value={draft.donate_url ?? ''} onChange={(v) => set({ donate_url: v })} placeholder="GoFundMe or their own page" />

              <GroupHead
                label="INSTAGRAM VIDEOS"
                note="Up to two. Paste the reel link, then choose a screenshot of it as the cover. Tapping opens the reel in Instagram."
              />
              {(draft.reels ?? []).length ? (
                <View style={s.reels}>
                  {(draft.reels ?? []).map((r) => (
                    <View key={r.url} style={s.reel}>
                      {coverUrl(r.cover)
                        ? <Image source={{ uri: coverUrl(r.cover)! }} style={s.reelImg} resizeMode="cover" />
                        : <View style={[s.reelImg, s.avatarEmpty]} />}
                      <View style={s.reelPlay}><Ionicons name="play" size={14} color="#FFF" /></View>
                      <Pressable
                        hitSlop={10}
                        style={s.reelRemove}
                        onPress={() => set({ reels: (draft.reels ?? []).filter((x) => x.url !== r.url) })}
                      >
                        <Ionicons name="close" size={14} color="#FFF" />
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : null}
              {(draft.reels ?? []).length < MAX_REELS ? (
                <View style={s.vidRow}>
                  <TextInput
                    style={[s.input, s.flex, { marginTop: 0 }]}
                    value={reelInput}
                    onChangeText={setReelInput}
                    placeholder="Paste an Instagram reel link"
                    placeholderTextColor={colors.textSecondary + '99'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={addReel}
                  />
                  <Pressable style={s.vidAdd} onPress={addReel} disabled={saving}>
                    {saving ? <ActivityIndicator size="small" color="#FFF" /> : <Ionicons name="image-outline" size={18} color="#FFF" />}
                  </Pressable>
                </View>
              ) : null}

              <GroupHead label="YOUTUBE" note="These show their real thumbnail and title automatically." />
              <View style={s.vidRow}>
                <TextInput
                  style={[s.input, s.flex, { marginTop: 0 }]}
                  value={videoInput}
                  onChangeText={setVideoInput}
                  placeholder="Paste a YouTube link"
                  placeholderTextColor={colors.textSecondary + '99'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={addVideo}
                />
                <Pressable style={s.vidAdd} onPress={addVideo}>
                  <Ionicons name="add" size={18} color="#FFF" />
                </Pressable>
              </View>
              {(draft.youtube_ids ?? []).map((id) => (
                <View key={id} style={s.vidItem}>
                  <Ionicons name="logo-youtube" size={15} color={TINT} />
                  <Text style={s.vidId}>{id}</Text>
                  <Pressable hitSlop={10} onPress={() => set({ youtube_ids: (draft.youtube_ids ?? []).filter((x) => x !== id) })}>
                    <Ionicons name="close" size={16} color={colors.textSecondary} />
                  </Pressable>
                </View>
              ))}

              <GroupHead label="BEHIND THE SCENES" note="Never shown in the app." />
              <Field
                label="Permission"
                value={draft.consent_note ?? ''}
                onChange={(v) => set({ consent_note: v })}
                multiline
                hint="Who agreed, how, and when."
              />
              <Field
                label="Order"
                value={String(draft.sort ?? 0)}
                onChange={(v) => set({ sort: Number(v.replace(/[^0-9-]/g, '')) || 0 })}
                hint="Lower comes first."
              />

              <Pressable style={[s.pill, s.savePill, !canSave && s.pillOff]} onPress={onSave} disabled={!canSave || saving}>
                {saving
                  ? <ActivityIndicator color="#FFF" />
                  : (
                    <>
                      <Text style={s.pillText}>Save</Text>
                      <View style={s.pillGo}><Ionicons name="checkmark" size={16} color="#FFF" /></View>
                    </>
                  )}
              </Pressable>
              {!canSave ? <Text style={s.saveHint}>A name and the one line are needed to save.</Text> : null}

              {draft.id ? (
                <Pressable style={s.deleteBtn} onPress={() => onDelete(draft as Hamdeli)} disabled={saving}>
                  <Ionicons name="trash-outline" size={15} color={colors.error} />
                  <Text style={s.deleteBtnText}>Delete this profile</Text>
                </Pressable>
              ) : null}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  container: { paddingHorizontal: spacing.lg, paddingBottom: 110 },
  denied: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, padding: spacing.lg },

  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: 15, color: colors.textSecondary },

  head: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.lg },
  title: { fontFamily: fonts.display, fontSize: 34, lineHeight: 42, color: colors.textPrimary },
  titleFa: { fontFamily: fonts.persian, fontSize: 14, color: TINT, marginTop: 2 },
  summary: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: colors.textSecondary, marginTop: spacing.sm, textTransform: 'uppercase' },

  // The same pill as Learn's Continue: label, then a circled glyph.
  pill: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md, backgroundColor: TINT, borderRadius: 999, paddingVertical: 14, paddingHorizontal: spacing.lg },
  pillText: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },
  pillGo: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  pillOff: { opacity: 0.4 },
  savePill: { marginTop: spacing.xl },
  saveHint: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },

  noteBox: { backgroundColor: colors.errorSoft, borderRadius: 12, padding: spacing.md, marginTop: spacing.md },
  noteText: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: colors.error },

  list: { marginTop: spacing.lg, gap: spacing.sm },
  empty: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg },

  card: { backgroundColor: colors.surface, borderRadius: 13, borderWidth: 1, borderColor: colors.border, padding: spacing.md, paddingLeft: spacing.lg + 2, overflow: 'hidden' },
  spine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: TINT },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  cardName: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary, flexShrink: 1 },
  cardFa: { fontFamily: fonts.persian, fontSize: 12, color: TINT, flexShrink: 1 },
  cardMeta: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1, color: colors.textSecondary, marginTop: 3, textTransform: 'uppercase' },

  status: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  statusLive: { backgroundColor: colors.successSoft, borderColor: colors.successSoft },
  statusDraft: { backgroundColor: 'transparent', borderColor: colors.border },
  statusText: { fontFamily: fonts.bodyStrong, fontSize: 10 },
  statusTextLive: { color: colors.success },
  statusTextDraft: { color: colors.textSecondary },

  avatar: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  avatarEmpty: { alignItems: 'center', justifyContent: 'center', backgroundColor: TINT + '10', borderColor: TINT + '40' },

  editorHead: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.lg },
  photoWrap: { position: 'relative' },
  photoBadge: { position: 'absolute', right: 4, bottom: 4, width: 34, height: 34, borderRadius: 17, backgroundColor: TINT, borderWidth: 3, borderColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  photoHint: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: spacing.sm },
  editorTitle: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.textPrimary, marginTop: spacing.md, textAlign: 'center' },

  publishCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 13, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm },
  publishT: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary },
  publishX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },

  groupHead: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, marginBottom: spacing.md },
  groupBar: { width: 3, borderRadius: 2, backgroundColor: TINT },
  groupL: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: TINT },
  groupN: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2, fontStyle: 'italic' },

  twoUp: { flexDirection: 'row', gap: spacing.sm },
  field: { marginBottom: spacing.md },
  label: { fontFamily: fonts.bodyStrong, fontSize: 11.5, color: colors.textPrimary },
  hint: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 5 },
  input: { fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: 12, marginTop: 6 },
  inputTall: { minHeight: 96, textAlignVertical: 'top' },
  inputRtl: { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' },

  kinds: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: TINT + '55', backgroundColor: colors.surface, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  chipOn: { backgroundColor: TINT, borderColor: TINT },
  chipText: { fontFamily: fonts.bodyStrong, fontSize: 12, color: TINT },
  chipTextOn: { color: '#FFF' },

  reels: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  reel: { width: 96, aspectRatio: 9 / 16, borderRadius: 12, overflow: 'hidden', backgroundColor: colors.border },
  reelImg: { width: '100%', height: '100%' },
  reelPlay: { position: 'absolute', left: '50%', top: '50%', marginLeft: -15, marginTop: -15, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
  reelRemove: { position: 'absolute', right: 6, top: 6, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' },
  vidRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  vidAdd: { width: 46, height: 46, borderRadius: 23, backgroundColor: TINT, alignItems: 'center', justifyContent: 'center' },
  vidItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12 },
  vidId: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },

  deleteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.xl, paddingVertical: spacing.sm },
  deleteBtnText: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.error },
});
