// Listing a business.
//
// One long screen rather than a wizard: the fields are mostly optional
// and someone filling this in wants to see the whole shape of what they
// are being asked, not discover it three steps in.
//
// Saved as a draft on every meaningful change, so leaving mid-way loses
// nothing. Only name, category and a location are required — everything
// else can be added later from the same screen.

import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { getLang } from '@/lib/i18n';
import {
  CATEGORIES, loadBusiness, saveBusiness, submitBusiness, type Business,
} from '@/lib/businesses';
import { MAX_PHOTOS, pickPhotos, uploadPhoto, photoUrl, removePhoto, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };
import { currentPlace, findPlace, type Place } from '@/lib/geo';
import { BusinessInsights } from '@/components/business-insights';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const DAY_LABEL: Record<string, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
  fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};
const SOCIALS = [
  { key: 'instagram', label: 'Instagram', icon: 'logo-instagram' },
  { key: 'tiktok', label: 'TikTok', icon: 'logo-tiktok' },
  { key: 'facebook', label: 'Facebook', icon: 'logo-facebook' },
  { key: 'telegram', label: 'Telegram', icon: 'paper-plane-outline' },
] as const;

export default function BusinessForm() {
  const { user } = useAuth();
  // Editing and creating are the same screen: same fields, same rules.
  // With an id we load the row first; without one we start empty.
  const { id: editId } = useLocalSearchParams<{ id?: string }>();
  const fa = getLang() === 'fa';

  const [b, setB] = useState<Partial<Business>>({
    name: '', category: '', socials: {}, hours: {}, photos: [],
  });
  const [saving, setSaving] = useState(false);
  const [locating, setLocating] = useState(false);
  const [placeText, setPlaceText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [kw, setKw] = useState('');
  const [tab, setTab] = useState<'edit' | 'stats'>('edit');

  // Four is the cap: enough to catch the things a category misses, few
  // enough that nobody stuffs it with every word they can think of.
  const addKw = () => {
    const v = kw.trim().toLowerCase();
    if (!v) return;
    const have = b.keywords ?? [];
    if (have.length >= 4 || have.includes(v)) { setKw(''); return; }
    set({ keywords: [...have, v] });
    setKw('');
  };
  const [sent, setSent] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = (patch: Partial<Business>) => {
    setB((v) => ({ ...v, ...patch }));
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persist({ ...b, ...patch }), 1200);
  };

  // Drafts are saved quietly. Nobody should have to think about it.
  const persist = async (next: Partial<Business>) => {
    if (!user?.id || !next.name?.trim()) return;
    const { data } = await saveBusiness({
      ...next,
      owner_id: user.id,
      status: next.status ?? 'draft',   // an edit keeps whatever it was
    } as any);
    if (data?.id && !b.id) setB((v) => ({ ...v, id: data.id }));
  };

  useEffect(() => {
    if (!editId) return;
    (async () => {
      const row = await loadBusiness(String(editId));
      if (row) setB(row);
    })();
  }, [editId]);

  useEffect(() => () => { if (saveTimer.current) clearTimeout(saveTimer.current); }, []);

  /* ---------------- location ---------------- */

  const useMyLocation = async () => {
    setLocating(true);
    const p = await currentPlace();
    setLocating(false);
    if (!p) { setErr('We could not read your location. You can type the area instead.'); return; }
    applyPlace(p);
  };

  const lookUp = async () => {
    if (!placeText.trim()) return;
    setLocating(true);
    const p = await findPlace(placeText);
    setLocating(false);
    if (!p) { setErr('We could not find that place. Try a city or district.'); return; }
    applyPlace(p);
  };

  const applyPlace = (p: Place) => {
    setErr(null);
    set({ lat: p.lat, lng: p.lng, city: p.city ?? b.city, country: p.country ?? b.country });
  };

  /* ---------------- photos ---------------- */

  const addPhotos = async () => {
    const have = b.photos?.length ?? 0;
    const assets = await pickPhotos(MAX_PHOTOS - have);
    if (!assets.length) return;

    // A listing needs an id before its photos have somewhere to live.
    let id = b.id;
    if (!id) {
      const { data } = await saveBusiness({
        ...(b as any), owner_id: user!.id, status: 'draft',
      });
      id = data?.id;
      if (id) setB((v) => ({ ...v, id }));
    }
    if (!id) return;

    setUploading(true);
    const paths: string[] = [];
    for (const a of assets) {
      const p = await uploadPhoto(id, a.uri);
      if (p) paths.push(p);
    }
    setUploading(false);
    set({ photos: [...(b.photos ?? []), ...paths] });
  };

  const dropPhoto = async (path: string) => {
    removePhoto(path);
    set({ photos: (b.photos ?? []).filter((p) => p !== path) });
  };

  /* ---------------- submit ---------------- */

  // Everything a listing needs to look finished on the day it goes live.
  // Hours and socials can come later; a name, a photo, a description and
  // a place cannot, because without them the listing is a stub and the
  // directory looks abandoned.
  const missing: string[] = [];
  if (!b.name?.trim()) missing.push('a name');
  if (!b.category) missing.push('a category');
  if (b.lat == null && !b.city?.trim()) missing.push('a location');
  if (!(b.photos?.length)) missing.push('at least one photo');
  if ((b.description?.trim().length ?? 0) < 40) missing.push('a description');
  const ready = missing.length === 0;

  const submit = async () => {
    if (!ready || !user?.id) return;
    setSaving(true);
    setErr(null);
    const { data, error } = await saveBusiness({ ...(b as any), owner_id: user.id });
    if (error || !data?.id) { setSaving(false); setErr(error ?? 'Could not save.'); return; }
    // Something already live or approved is being edited, not submitted;
    // pushing it back through review would take it down for no reason.
    if (b.status === 'active' || b.status === 'approved') {
      setSaving(false);
      router.replace('/my-businesses' as any);
      return;
    }
    const { error: e2 } = await submitBusiness(data.id);
    setSaving(false);
    if (e2) { setErr(e2); return; }
    setSent(true);
  };

  /* ---------------- sent ---------------- */

  if (sent) {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.doneWrap}>
          <View style={s.doneIcon}><Ionicons name="checkmark" size={26} color={colors.accent} /></View>
          <Text style={s.doneT}>Sent for review</Text>
          <Text style={s.doneX}>
            We read every listing before it goes up. You will hear back here, usually within a
            couple of days. Nothing to pay until it is approved.
          </Text>
          <Pressable style={s.cta} onPress={() => router.replace('/local' as any)}>
            <Text style={s.ctaT}>Back to Local</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  /* ---------------- form ---------------- */

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.head}>
        <Pressable hitSlop={12} onPress={() => router.replace('/local' as any)}>
          <Ionicons name="close" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.headT}>{editId ? 'Edit listing' : 'List a business'}</Text>
        <View style={{ width: 22 }} />
      </View>

      {b.status === 'active' ? (
        <View style={s.tabs}>
          {(['edit', 'stats'] as const).map((t) => (
            <Pressable key={t} style={[s.tab, tab === t && s.tabOn]} onPress={() => setTab(t)}>
              <Text style={[s.tabT, tab === t && s.tabTOn]}>
                {t === 'edit' ? 'Listing' : 'How it is doing'}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {tab === 'stats' && b.status === 'active' ? (
        <ScrollView contentContainerStyle={s.body}>
          <BusinessInsights b={b as any} />
        </ScrollView>
      ) : (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">

          <Text style={s.intro}>
            Iranian-owned, anywhere. Tell us what it is and where, and we will put it on the map.
          </Text>

          {/* name */}
          <Text style={s.label}>NAME</Text>
          <TextInput
            style={s.input}
            value={b.name ?? ''}
            onChangeText={(v) => set({ name: v })}
            placeholder="What it is called"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[s.label, s.labelFa]}>نام فارسی</Text>
          <TextInput
            style={[s.input, s.inputFa]}
            value={b.name_fa ?? ''}
            onChangeText={(v) => set({ name_fa: v })}
            placeholder="اختیاری"
            placeholderTextColor={colors.textSecondary}
            textAlign="right"
          />

          {/* category */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>CATEGORY</Text>
          <View style={s.cats}>
            {CATEGORIES.map((c) => {
              const on = b.category === c.key;
              return (
                <Pressable
                  key={c.key}
                  style={[s.cat, on && s.catOn]}
                  onPress={() => set({ category: c.key })}
                >
                  <Ionicons name={c.icon as any} size={13} color={on ? '#FFF' : colors.textSecondary} />
                  <Text style={[s.catT, on && s.catTOn]}>{fa ? c.fa : c.en}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* location */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>WHERE IT IS</Text>
          <Pressable style={s.locBtn} onPress={useMyLocation} disabled={locating}>
            {locating
              ? <ActivityIndicator size="small" color={colors.accent} />
              : <Ionicons name="navigate-outline" size={15} color={colors.accent} />}
            <Text style={s.locBtnT}>Use my current location</Text>
          </Pressable>

          <Text style={s.or}>or type the area</Text>
          <View style={s.row}>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={placeText}
              onChangeText={setPlaceText}
              placeholder="Central Gothenburg, Dubai Marina…"
              placeholderTextColor={colors.textSecondary}
              onSubmitEditing={lookUp}
              returnKeyType="search"
            />
            <Pressable style={s.find} onPress={lookUp}>
              <Ionicons name="search" size={16} color="#FFF" />
            </Pressable>
          </View>

          {b.lat != null ? (
            <View style={s.found}>
              <Ionicons name="location" size={13} color={colors.accent} />
              <Text style={s.foundT}>
                {[b.city, b.country].filter(Boolean).join(', ') || 'Pinned'}
              </Text>
            </View>
          ) : null}

          <TextInput
            style={[s.input, { marginTop: spacing.md }]}
            value={b.address ?? ''}
            onChangeText={(v) => set({ address: v })}
            placeholder="Street address (optional)"
            placeholderTextColor={colors.textSecondary}
          />

          {/* photos */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>
            PHOTOS {(b.photos?.length ?? 0) > 0 ? `· ${b.photos!.length} of ${MAX_PHOTOS}` : ''}
          </Text>
          <Text style={s.hint}>The first one is the cover.</Text>
          <View style={s.photos}>
            {(b.photos ?? []).map((p, i) => (
              <View key={p} style={s.photoWrap}>
                <Image source={bizImage(p)} style={s.photo} />
                {i === 0 ? <View style={s.coverTag}><Text style={s.coverTagT}>COVER</Text></View> : null}
                <Pressable style={s.photoX} hitSlop={6} onPress={() => dropPhoto(p)}>
                  <Ionicons name="close" size={12} color="#FFF" />
                </Pressable>
              </View>
            ))}
            {(b.photos?.length ?? 0) < MAX_PHOTOS ? (
              <Pressable style={s.addPhoto} onPress={addPhotos} disabled={uploading}>
                {uploading
                  ? <ActivityIndicator size="small" color={colors.textSecondary} />
                  : <Ionicons name="add" size={22} color={colors.textSecondary} />}
              </Pressable>
            ) : null}
          </View>

          {/* about */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>ABOUT</Text>
          <TextInput
            style={[s.input, s.area]}
            value={b.description ?? ''}
            onChangeText={(v) => set({ description: v })}
            placeholder="What you do, and what makes it worth the trip."
            placeholderTextColor={colors.textSecondary}
            multiline
          />
          <TextInput
            style={[s.input, s.area, s.inputFa, { marginTop: spacing.sm }]}
            value={b.description_fa ?? ''}
            onChangeText={(v) => set({ description_fa: v })}
            placeholder="توضیح فارسی، اختیاری"
            placeholderTextColor={colors.textSecondary}
            textAlign="right"
            multiline
          />

          {/* contact */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>CONTACT</Text>
          <View style={s.row}>
            <View style={s.socIcon}><Ionicons name="call-outline" size={15} color={colors.textSecondary} /></View>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={b.phone ?? ''}
              onChangeText={(v) => set({ phone: v })}
              placeholder="Phone"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
          <View style={[s.row, { marginTop: spacing.sm }]}>
            <View style={s.socIcon}><Ionicons name="globe-outline" size={15} color={colors.textSecondary} /></View>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={b.website ?? ''}
              onChangeText={(v) => set({ website: v })}
              placeholder="Website"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
            />
          </View>
          <View style={[s.row, { marginTop: spacing.sm }]}>
            <View style={s.socIcon}><Ionicons name="logo-whatsapp" size={15} color={colors.textSecondary} /></View>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={(b.socials ?? {}).whatsapp ?? ''}
              onChangeText={(v) => set({ socials: { ...(b.socials ?? {}), whatsapp: v } })}
              placeholder="WhatsApp number"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>

          {/* keywords */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>KEYWORDS</Text>
          <Text style={s.hint}>Up to four. Helps people find you when they search.</Text>
          <View style={s.row}>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={kw}
              onChangeText={setKw}
              placeholder="ice cream, hair styling, arcade…"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              onSubmitEditing={addKw}
              returnKeyType="done"
            />
            <Pressable style={s.find} onPress={addKw}>
              <Ionicons name="add" size={18} color="#FFF" />
            </Pressable>
          </View>
          {(b.keywords?.length ?? 0) > 0 ? (
            <View style={s.kws}>
              {(b.keywords ?? []).map((k) => (
                <Pressable key={k} style={s.kw} onPress={() => set({ keywords: (b.keywords ?? []).filter((x) => x !== k) })}>
                  <Text style={s.kwT}>{k}</Text>
                  <Ionicons name="close" size={11} color={colors.textSecondary} />
                </Pressable>
              ))}
            </View>
          ) : null}

          {/* socials */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>SOCIAL</Text>
          {SOCIALS.map((sc) => (
            <View key={sc.key} style={[s.row, { marginTop: spacing.sm }]}>
              <View style={s.socIcon}>
                <Ionicons name={sc.icon as any} size={15} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[s.input, { flex: 1 }]}
                value={(b.socials ?? {})[sc.key] ?? ''}
                onChangeText={(v) => set({ socials: { ...(b.socials ?? {}), [sc.key]: v } })}
                placeholder={sc.label + ' handle or link'}
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
            </View>
          ))}

          {/* hours */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>HOURS</Text>
          <Text style={s.hint}>Leave a day blank if you are closed.</Text>
          {DAYS.map((d) => (
            <View key={d} style={[s.row, { marginTop: 6, alignItems: 'center' }]}>
              <Text style={s.day}>{DAY_LABEL[d]}</Text>
              <TextInput
                style={[s.input, { flex: 1 }]}
                value={(b.hours ?? {})[d] ?? ''}
                onChangeText={(v) => set({ hours: { ...(b.hours ?? {}), [d]: v } })}
                placeholder="9 – 17"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          ))}

          {err ? <Text style={s.err}>{err}</Text> : null}

          {!ready ? (
            <Text style={s.missing}>
              Still needed: {missing.join(', ')}.
            </Text>
          ) : null}

          <Pressable
            style={[s.cta, !ready && s.ctaOff, { marginTop: spacing.xl }]}
            onPress={submit}
            disabled={!ready || saving}
          >
            {saving
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={s.ctaT}>{b.status === 'active' || b.status === 'approved' ? 'Save changes' : 'Send for review'}</Text>}
          </Pressable>

          <Text style={s.foot}>
            We read every listing before it goes up.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.08)' },
  headT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },

  tabs: { flexDirection: 'row', gap: 6, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xs },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 14, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.04)' },
  tabOn: { backgroundColor: 'rgba(34,30,26,0.9)' },
  tabT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary },
  tabTOn: { color: '#FFF', fontFamily: fonts.bodyStrong },
  body: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  intro: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textSecondary, marginBottom: spacing.xl },

  label: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginBottom: 6 },
  labelFa: { fontFamily: fonts.persian, fontSize: 11, letterSpacing: 0, marginTop: spacing.md },
  hint: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, opacity: 0.8, marginBottom: 8 },

  input: { fontFamily: fonts.body, fontSize: 14, color: colors.textPrimary, backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 11 },
  inputFa: { fontFamily: fonts.persian, fontSize: 14.5, lineHeight: 28 },
  area: { minHeight: 92, textAlignVertical: 'top', paddingTop: 11 },

  row: { flexDirection: 'row', gap: spacing.sm },

  cats: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  cat: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.04)' },
  catOn: { backgroundColor: colors.accent },
  catT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  catTOn: { color: '#FFF' },

  locBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 12, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.accent },
  locBtnT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent },
  or: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.sm },
  find: { width: 44, borderRadius: radius.md, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  found: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.sm },
  foundT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textPrimary },

  photos: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photoWrap: { width: 88, height: 88, borderRadius: 12, overflow: 'hidden' },
  photo: { width: '100%', height: '100%' },
  photoX: { position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' },
  coverTag: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.55)', paddingVertical: 2, alignItems: 'center' },
  coverTagT: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1, color: '#FFF' },
  addPhoto: { width: 88, height: 88, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.15)', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },

  socIcon: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: 'rgba(0,0,0,0.035)', alignItems: 'center', justifyContent: 'center' },
  day: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, width: 82 },

  kws: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.sm },
  kw: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 13, backgroundColor: 'rgba(0,0,0,0.045)' },
  kwT: { fontFamily: fonts.body, fontSize: 12, color: colors.textPrimary },
  err: { fontFamily: fonts.body, fontSize: 12.5, color: '#B3261E', marginTop: spacing.md },

  cta: { backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: 14, alignItems: 'center' },
  ctaOff: { opacity: 0.4 },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: '#FFF' },

  foot: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg, opacity: 0.85 },

  doneWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  doneIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: 'rgba(201,162,39,0.12)', alignItems: 'center', justifyContent: 'center' },
  doneT: { fontFamily: fonts.bodyStrong, fontSize: 18, color: colors.textPrimary },
  doneX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.md },
});
