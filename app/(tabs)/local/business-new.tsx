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
import { LISTING } from '@/constants/i18n/listing';
import { useAuth } from '@/lib/auth';
import { useIsAdmin } from '@/lib/admin';
import { t as tr, useLang, getLang } from '@/lib/i18n';
import {
  CATEGORIES, checkName, loadBusiness, saveBusiness, submitBusiness, type Business,
} from '@/lib/businesses';
import { MAX_PHOTOS, pickPhotos, uploadPhoto, photoUrl, removePhoto, isBundled, bundledKey } from '@/lib/business-photos';
import { listingIsPaid } from '@/lib/billing';
import { alertAdmin } from '@/lib/admin-alert';
import type { NameMatch } from '@/lib/listing-names';
import { ListingPaywall } from '@/components/listing-paywall';
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
  { key: 'email', label: 'Email', icon: 'mail-outline' },
  { key: 'instagram', label: 'Instagram', icon: 'logo-instagram' },
  { key: 'tiktok', label: 'TikTok', icon: 'logo-tiktok' },
  { key: 'facebook', label: 'Facebook', icon: 'logo-facebook' },
  { key: 'telegram', label: 'Telegram', icon: 'paper-plane-outline' },
] as const;

export default function BusinessForm() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  // Editing and creating are the same screen: same fields, same rules.
  // With an id we load the row first; without one we start empty.
  const { id: editId } = useLocalSearchParams<{ id?: string }>();
  const fa = getLang() === 'fa';

  const [b, setB] = useState<Partial<Business>>({
    name: '', category: '', socials: {}, hours: {}, photos: [],
  });
  const [saving, setSaving] = useState(false);
  // The listing waiting on a subscription, if there is one.
  const [payFor, setPayFor] = useState<string | null>(null);
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

  // Is this name already in the directory?
  //
  // Checked as it is typed rather than at the end. Being told a name is
  // taken while you are still writing it is a correction; being told after
  // review is a rejection, and it wastes a week of somebody's time.
  const [taken, setTaken] = useState<NameMatch | null>(null);
  const [like, setLike] = useState<NameMatch[]>([]);
  const nameTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const raw = (b.name ?? '').trim();
    if (nameTimer.current) clearTimeout(nameTimer.current);
    if (raw.length < 2) { setTaken(null); setLike([]); return; }
    nameTimer.current = setTimeout(async () => {
      try {
        const res = await checkName(raw, b.city, b.id);
        setTaken(res.taken);
        setLike(res.similar);
      } catch {}
    }, 600);
    return () => { if (nameTimer.current) clearTimeout(nameTimer.current); };
  }, [b.name, b.city, b.id]);

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

  // Somebody else's listing is not yours to open.
  //
  // This form loads by id and autosaves what it is holding, so opening it
  // on an id that is not yours and touching one key was enough to write
  // over that listing. The database has to refuse it as well, but the
  // form should not put a stranger's business on the screen in the first
  // place — the stats tab alone shows their views, calls and directions.
  // The admin edits through here too, so they are let through.
  useEffect(() => {
    if (!editId) return;
    let alive = true;
    (async () => {
      const row = await loadBusiness(String(editId));
      if (!alive) return;
      if (!row) return;
      if (row.owner_id && user?.id && row.owner_id !== user.id && !isAdmin) {
        setErr(tr(LISTING.notYours));
        router.replace('/my-businesses' as any);
        return;
      }
      setB(row);
    })();
    return () => { alive = false; };
  }, [editId, user?.id, isAdmin]);

  useEffect(() => () => { if (saveTimer.current) clearTimeout(saveTimer.current); }, []);

  /* ---------------- location ---------------- */

  const useMyLocation = async () => {
    setLocating(true);
    const p = await currentPlace();
    setLocating(false);
    if (!p) { setErr(tr(LISTING.noLocation)); return; }
    applyPlace(p);
  };

  const lookUp = async () => {
    if (!placeText.trim()) return;
    setLocating(true);
    const p = await findPlace(placeText);
    setLocating(false);
    if (!p) { setErr(tr(LISTING.noPlace)); return; }
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
  // A name already in the directory is not a thing we can fix for them,
  // and two identical rows would leave anyone reading the list with no way
  // of telling which is which.
  if (taken) missing.push('a name that is not already taken');
  if (!b.category) missing.push('a category');
  if (b.lat == null && !b.city?.trim()) missing.push('a location');
  if (!(b.photos?.length)) missing.push('at least one photo');
  // Say what is actually wrong. "A description" when one is written
  // reads as a bug, and the person then has no idea what to change.
  const dlen = b.description?.trim().length ?? 0;
  if (dlen === 0) missing.push('a description');
  else if (dlen < 40) missing.push('a longer description (at least 40 characters)');
  const ready = missing.length === 0;

  // Sending it in, once there is something to send it with.
  const finishSubmit = async (id: string) => {
    const { error: e2 } = await submitBusiness(id, user?.id);
    setSaving(false);
    if (e2) { setErr(e2); return; }
    setSent(true);
  };

  const submit = async () => {
    if (!ready || !user?.id) return;
    setSaving(true);
    setErr(null);
    const { data, error } = await saveBusiness({ ...(b as any), owner_id: user.id });
    if (error || !data?.id) { setSaving(false); setErr(error ?? tr(LISTING.couldNotSave)); return; }

    // Close to something already here. Allowed, because a second branch
    // and a franchise both look exactly like this, but not silently: it
    // goes to the admin to be told apart.
    if (like.length) {
      alertAdmin('listing-similar', {
        name: b.name ?? undefined,
        city: b.city ?? undefined,
        like: like.slice(0, 3)
          .map((m) => m.name + (m.city ? ' (' + m.city + ')' : ''))
          .join(', '),
      });
    }
    // Something already live or approved is being edited, not submitted;
    // pushing it back through review would take it down for no reason.
    if (b.status === 'active' || b.status === 'approved') {
      setSaving(false);
      router.replace('/my-businesses' as any);
      return;
    }

    // The one moment money is mentioned. A listing already covered — a
    // resubmission, or one of the founding listings — goes straight
    // through without being asked again.
    const covered = await listingIsPaid(data.id);
    if (!covered) {
      setPayFor(data.id);
      setSaving(false);
      return;
    }
    await finishSubmit(data.id);
  };

  /* ---------------- sent ---------------- */

  if (sent) {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.doneWrap}>
          <View style={s.doneIcon}><Ionicons name="checkmark" size={26} color={colors.accent} /></View>
          <Text style={s.doneT}>{tr(LISTING.sent)}</Text>
          <Text style={s.doneX}>
            We read every listing before it goes up. You will hear back here, usually within a
            couple of days. Nothing to pay until it is approved.
          </Text>
          <Pressable style={s.cta} onPress={() => router.replace('/local' as any)}>
            <Text style={s.ctaT} numberOfLines={1}>{tr(LISTING.backToLocal)}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  /* ---------------- form ---------------- */

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ListingPaywall
        open={payFor !== null}
        businessId={payFor}
        onDone={() => {
          const id = payFor;
          setPayFor(null);
          setSaving(true);
          if (id) finishSubmit(id);
        }}
        // Dismissed. The listing is saved as a draft and waiting in My
        // listings, so nothing anybody typed is lost.
        onClose={() => { setPayFor(null); setErr(tr(LISTING.savedAsDraft)); }}
      />

      <View style={s.head}>
        {/* Back, not onward. Replacing pushed a new copy of Local on
            top, so leaving the form slid in from the right as though it
            were somewhere new. */}
        <Pressable
          hitSlop={12}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/local' as any))}
        >
          <Ionicons name="close" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.headT}>{editId ? tr(LISTING.titleEdit) : tr(LISTING.titleNew)}</Text>
        <View style={{ width: 22 }} />
      </View>

      {b.status === 'active' ? (
        <View style={s.tabs}>
          {(['edit', 'stats'] as const).map((t) => (
            <Pressable key={t} style={[s.tab, tab === t && s.tabOn]} onPress={() => setTab(t)}>
              <Text style={[s.tabT, tab === t && s.tabTOn]}>
                {t === 'edit' ? tr(LISTING.tabListing) : tr(LISTING.tabStats)}
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
          <Text style={s.label}>{tr(LISTING.nameLabel)}</Text>
          <TextInput
            style={s.input}
            value={b.name ?? ''}
            onChangeText={(v) => set({ name: v })}
            placeholder={tr(LISTING.namePlaceholder)}
            {...(fa ? { textAlign: "right" as const, writingDirection: "rtl" as const } : {})}
            placeholderTextColor={colors.textSecondary}
          />

          {taken ? (
            <Text style={s.nameBad}>
              {tr(LISTING.nameTaken)}
              {taken.city ? '  ·  ' + taken.name + ', ' + taken.city : '  ·  ' + taken.name}
            </Text>
          ) : like.length ? (
            <Text style={s.nameNote}>
              {tr(LISTING.nameLike)}
              {'  ·  ' + like.map((m) => m.name + (m.city ? ', ' + m.city : '')).join('  ·  ')}
            </Text>
          ) : null}

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
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.categoryLabel)}</Text>
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
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.whereItIs)}</Text>
          {/* Why, before the button rather than on it. The system asks the
              actual question; this only explains what it is for. */}
          <Text style={s.locWhy}>{tr(LISTING.locationWhy)}</Text>
          <Pressable style={s.locBtn} onPress={useMyLocation} disabled={locating}>
            {locating
              ? <ActivityIndicator size="small" color={colors.accent} />
              : <Ionicons name="navigate-outline" size={15} color={colors.accent} />}
            <Text style={s.locBtnT}>{tr(LISTING.useMyLocation)}</Text>
          </Pressable>

          <Text style={s.or}>or type the area</Text>
          <View style={s.row}>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={placeText}
              onChangeText={setPlaceText}
              placeholder={tr(LISTING.areaPlaceholder)}
                {...(fa ? { textAlign: "right" as const, writingDirection: "rtl" as const } : {})}
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
                {[b.city, b.country].filter(Boolean).join(', ') || tr(LISTING.pinned)}
              </Text>
            </View>
          ) : null}

          <TextInput
            style={[s.input, { marginTop: spacing.md }]}
            value={b.address ?? ''}
            onChangeText={(v) => set({ address: v })}
            placeholder={tr(LISTING.streetAddress)}
            {...(fa ? { textAlign: "right" as const, writingDirection: "rtl" as const } : {})}
            placeholderTextColor={colors.textSecondary}
          />

          {/* When it opened. Two things: the year, which decides whether it
              shows under Newly opened, and whether the owner wants it on
              their own page. Someone can tell us 1998 without wanting
              "since 1998" printed under their name. */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.openedLabel)}</Text>
          <Text style={[s.hint, fa && { textAlign: 'right', writingDirection: 'rtl' }]}>
            {tr(LISTING.openedHint)}
          </Text>
          <View style={[s.row, fa && { flexDirection: 'row-reverse' }]}>
            <TextInput
              style={[s.input, { width: 110 }]}
              value={b.opened_year ? String(b.opened_year) : ''}
              onChangeText={(v) => {
                const n = parseInt(v.replace(/[^0-9]/g, ''), 10);
                set({ opened_year: Number.isFinite(n) ? n : undefined });
              }}
              placeholder={tr(LISTING.openedPlaceholder)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
              maxLength={4}
            />
            <Pressable
              style={[s.row, { flex: 1, alignItems: 'center' }, fa && { flexDirection: 'row-reverse' }]}
              onPress={() => set({ show_opened: b.show_opened === false })}
            >
              <View style={[s.check, b.show_opened !== false && s.checkOn]}>
                {b.show_opened !== false ? <Ionicons name="checkmark" size={13} color="#FFF" /> : null}
              </View>
              <Text style={s.checkT}>{tr(LISTING.showOpened)}</Text>
            </Pressable>
          </View>

          {/* photos */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>
            PHOTOS {(b.photos?.length ?? 0) > 0 ? `· ${b.photos!.length} of ${MAX_PHOTOS}` : ''}
          </Text>
          <Text style={s.hint}>{tr(LISTING.firstIsCover)}</Text>
          <View style={s.photos}>
            {(b.photos ?? []).map((p, i) => (
              <View key={p} style={s.photoWrap}>
                <Image source={bizImage(p)} style={s.photo} />
                {i === 0 ? <View style={s.coverTag}><Text style={s.coverTagT}>{tr(LISTING.coverLabel)}</Text></View> : null}
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
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.aboutLabel)}</Text>
          <TextInput
            style={[s.input, s.area]}
            value={b.description ?? ''}
            onChangeText={(v) => set({ description: v })}
            placeholder={tr(LISTING.aboutPlaceholder)}
            {...(fa ? { textAlign: "right" as const, writingDirection: "rtl" as const } : {})}
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
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.contactLabel)}</Text>
          <View style={s.row}>
            <View style={s.socIcon}><Ionicons name="call-outline" size={15} color={colors.textSecondary} /></View>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={b.phone ?? ''}
              onChangeText={(v) => set({ phone: v })}
              placeholder={tr(LISTING.phone)}
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
              placeholder={tr(LISTING.website)}
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
            />
          </View>

          {/* Only once there is a link to name. Asking someone to title a
              website they have not given is a question with no answer.
              This is what the page shows in place of an address when a
              listing has no door — the URL still opens, it is just not
              what gets read. */}
          {(b.website ?? '').trim() ? (
            <View style={[s.row, { marginTop: spacing.sm }]}>
              <View style={s.socIcon}>
                <Ionicons name="pricetag-outline" size={15} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[s.input, { flex: 1 }]}
                value={b.website_label ?? ''}
                onChangeText={(v) => set({ website_label: v })}
                placeholder={tr(LISTING.websiteLabel)}
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          ) : null}
          <View style={[s.row, { marginTop: spacing.sm }]}>
            <View style={s.socIcon}><Ionicons name="logo-whatsapp" size={15} color={colors.textSecondary} /></View>
            <TextInput
              style={[s.input, { flex: 1 }]}
              value={(b.socials ?? {}).whatsapp ?? ''}
              onChangeText={(v) => set({ socials: { ...(b.socials ?? {}), whatsapp: v } })}
              placeholder={tr(LISTING.whatsapp)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>

          {/* keywords */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.keywordsLabel)}</Text>
          <Text style={s.hint}>{tr(LISTING.keywordsHint)}</Text>
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
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.socialLabel)}</Text>
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

          {/* The last question, and the only one that is not a fact.
              Separated from the rest so it reads as an invitation rather
              than another required field — and it changes nothing about
              whether the listing goes up. */}
          <View style={s.storyRule} />
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.storyLabel)}</Text>

          <Pressable
            style={[s.row, { marginTop: spacing.sm, alignItems: 'flex-start' }]}
            onPress={() => set({ has_story: !b.has_story })}
          >
            <View style={[s.check, b.has_story && s.checkOn]}>
              {b.has_story ? <Ionicons name="checkmark" size={13} color="#FFF" /> : null}
            </View>
            <Text style={s.checkT}>{tr(LISTING.storyYes)}</Text>
          </Pressable>

          {b.has_story ? (
            <>
              <Text style={s.storyNote}>
                {tr(LISTING.storyNote)}
              </Text>
              <TextInput
                style={[s.input, s.storyBox]}
                value={b.story_pitch ?? ''}
                onChangeText={(v) => set({ story_pitch: v })}
                placeholder={tr(LISTING.storyPlaceholder)}
                {...(fa ? { textAlign: "right" as const, writingDirection: "rtl" as const } : {})}
                placeholderTextColor={colors.textSecondary}
                multiline
                textAlignVertical="top"
              />
            </>
          ) : null}

          {/* hours */}
          <Text style={[s.label, { marginTop: spacing.xl }]}>{tr(LISTING.hoursLabel)}</Text>
          <Text style={s.hint}>{tr(LISTING.hoursHint)}</Text>
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
              : <Text style={s.ctaT}>{b.status === 'active' || b.status === 'approved' ? tr(LISTING.saveChanges) : tr(LISTING.sendForReview)}</Text>}
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
  // Said once, under the field, in the colour of the thing it is.
  locWhy: {
    fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18,
    color: colors.textSecondary, marginBottom: spacing.sm,
  },
  nameBad: {
    fontFamily: fonts.body, fontSize: 11.5, lineHeight: 17,
    color: '#B3261E', marginTop: 6,
  },
  nameNote: {
    fontFamily: fonts.body, fontSize: 11.5, lineHeight: 17,
    color: colors.textSecondary, marginTop: 6,
  },
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
  // Direction as well as the face. A Persian string in a left-aligned
  // field puts its trailing punctuation on the wrong side, which is the
  // same fault the Local search had.
  inputFa: {
    fontFamily: fonts.persian, fontSize: 14.5, lineHeight: 28,
    textAlign: 'right', writingDirection: 'rtl',
  },
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

  storyRule: {
    height: StyleSheet.hairlineWidth, backgroundColor: colors.border,
    marginTop: spacing.xxl,
  },
  check: {
    width: 22, height: 22, borderRadius: 6, marginTop: 1,
    // A hairline in the border colour was invisible against cream, so
    // the one control on this page that has to be found was the hardest
    // thing on it to see.
    borderWidth: 1.5, borderColor: 'rgba(40,28,24,0.38)',
    alignItems: 'center', justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  checkT: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, flex: 1 },
  storyNote: {
    fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19,
    color: colors.textSecondary, marginTop: spacing.md,
  },
  storyBox: {
    marginTop: spacing.sm, minHeight: 130, paddingTop: 12,
    borderWidth: 1, borderColor: 'rgba(40,28,24,0.16)',
  },
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
  missing: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl, backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  err: { fontFamily: fonts.body, fontSize: 12.5, color: '#B3261E', marginTop: spacing.md },

  // Pale and thin, matching Translate and the invite sheet. A solid
  // block of accent red was the loudest thing on a form that is mostly
  // quiet fields.
  cta: {
    backgroundColor: 'rgba(140,58,46,0.09)',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(140,58,46,0.24)',
    borderRadius: radius.lg, paddingVertical: 14, alignItems: 'center',
    // Room either side. The label is uppercase and widely tracked, and
    // with no horizontal padding the frame ended a letter short of the
    // word at both ends.
    paddingHorizontal: spacing.xxl,
    justifyContent: 'center',
  },
  ctaOff: { opacity: 0.4 },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.accent, textAlign: 'center', marginLeft: 1.6 },

  foot: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg, opacity: 0.85 },

  doneWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  doneIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: 'rgba(201,162,39,0.12)', alignItems: 'center', justifyContent: 'center' },
  doneT: { fontFamily: fonts.bodyStrong, fontSize: 18, color: colors.textPrimary },
  doneX: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 21, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.md },
});
