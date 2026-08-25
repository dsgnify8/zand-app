// City covers, for the admin.
//
// Every city that appears in any listing shows here, whether or not it has
// a cover — the point is seeing which ones are falling back to a
// photograph of somebody's salon, which is the state they start in.
//
// The blurb is two fields rather than one translated at save time: this is
// the line under a city's name on a page people browse, and a machine
// translation of "Tehrangeles. Nowhere outside Iran has more." would not
// survive the trip.

import { useEffect, useMemo, useState } from 'react';
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
import { loadBusinesses, type Business } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import {
  cityCovers, coverUrl, loadCityCovers, pickCityCover,
  saveCityCover, uploadCityCover, type CityCover,
} from '@/lib/city-covers';
import { cityInfo } from '@/constants/cities';
import { useIsAdmin } from '@/lib/admin';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

type Row = {
  key: string;
  label: string;
  n: number;
  fallback: any | null;
};

export default function AdminCities() {
  const admin = useIsAdmin();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [covers, setCovers] = useState<Record<string, CityCover>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [edit, setEdit] = useState<Record<string, { en: string; fa: string }>>({});

  const refresh = async () => {
    const [items] = await Promise.all([loadBusinesses({}), loadCityCovers(true)]);
    const by = new Map<string, Row>();
    for (const b of items as Business[]) {
      const raw = (b.city ?? '').trim();
      if (!raw) continue;
      const key = raw.toLowerCase();
      const prev = by.get(key);
      const shot = (b.photos ?? [])[0];
      if (prev) {
        prev.n += 1;
        if (!prev.fallback && shot) prev.fallback = bizImage(shot);
      } else {
        by.set(key, { key, label: raw, n: 1, fallback: shot ? bizImage(shot) : null });
      }
    }
    setRows([...by.values()].sort((a, b) => b.n - a.n));
    setCovers(cityCovers());
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const changeCover = async (row: Row) => {
    const asset = await pickCityCover();
    if (!asset) return;
    setBusy(row.key);
    const path = await uploadCityCover(row.key, asset.uri);
    if (path) {
      const cur = covers[row.key];
      await saveCityCover({
        key: row.key,
        label: row.label,
        photo: path,
        blurb_en: cur?.blurb_en ?? null,
        blurb_fa: cur?.blurb_fa ?? null,
      });
      await refresh();
    }
    setBusy(null);
  };

  const saveBlurb = async (row: Row) => {
    const e = edit[row.key];
    if (!e) return;
    setBusy(row.key);
    const cur = covers[row.key];
    await saveCityCover({
      key: row.key,
      label: row.label,
      photo: cur?.photo ?? null,
      blurb_en: e.en.trim() || null,
      blurb_fa: e.fa.trim() || null,
    });
    await refresh();
    setBusy(null);
  };

  if (!admin) {
    return (
      <SafeAreaView style={s.safe}>
        <Text style={s.denied}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.topT}>City covers</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
            <Text style={s.lead}>
              Every city with a listing. Without a cover the page falls back to a
              bundled image, then to one of the listings — which says salon, not
              Stockholm.
            </Text>

            {rows.map((row) => {
              const cur = covers[row.key];
              const url = coverUrl(cur?.photo);
              const bundled = cityInfo(row.key)?.cover;
              const source = url ? { uri: url } : bundled ?? row.fallback;
              const state = url ? 'set' : bundled ? 'bundled' : 'listing photo';
              const e = edit[row.key] ?? {
                en: cur?.blurb_en ?? '',
                fa: cur?.blurb_fa ?? '',
              };

              return (
                <View key={row.key} style={s.row}>
                  <View style={s.rowTop}>
                    <Pressable style={s.thumb} onPress={() => changeCover(row)}>
                      {source ? (
                        <Image source={source} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                      ) : (
                        <View style={[StyleSheet.absoluteFill as any, s.thumbBlank]}>
                          <Ionicons name="image-outline" size={18} color={colors.textSecondary} />
                        </View>
                      )}
                      {busy === row.key ? (
                        <View style={[StyleSheet.absoluteFill as any, s.thumbBusy]}>
                          <ActivityIndicator size="small" color="#FFF" />
                        </View>
                      ) : null}
                    </Pressable>

                    <View style={{ flex: 1 }}>
                      <Text style={s.name}>{row.label}</Text>
                      <Text style={s.meta}>
                        {row.n} {row.n === 1 ? 'listing' : 'listings'}  ·  {state}
                      </Text>
                      <Pressable onPress={() => changeCover(row)}>
                        <Text style={s.change}>
                          {url ? 'Replace cover' : 'Set a cover'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>

                  <TextInput
                    style={s.input}
                    value={e.en}
                    onChangeText={(v) => setEdit((m) => ({ ...m, [row.key]: { ...e, en: v } }))}
                    placeholder="A line about this city, in English"
                    placeholderTextColor={colors.textSecondary}
                    multiline
                  />
                  <TextInput
                    style={[s.input, s.inputFa]}
                    value={e.fa}
                    onChangeText={(v) => setEdit((m) => ({ ...m, [row.key]: { ...e, fa: v } }))}
                    placeholder="همان جمله، به فارسی"
                    placeholderTextColor={colors.textSecondary}
                    multiline
                  />

                  {e.en !== (cur?.blurb_en ?? '') || e.fa !== (cur?.blurb_fa ?? '') ? (
                    <Pressable style={s.save} onPress={() => saveBlurb(row)}>
                      <Text style={s.saveT}>Save</Text>
                    </Pressable>
                  ) : null}
                </View>
              );
            })}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary },
  denied: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },
  lead: {
    fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19,
    color: colors.textSecondary, marginBottom: spacing.lg,
  },

  row: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  rowTop: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  thumb: {
    width: 66, height: 88, borderRadius: 10, overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  thumbBlank: { alignItems: 'center', justifyContent: 'center' },
  thumbBusy: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },

  name: { fontFamily: fonts.bodyStrong, fontSize: 15.5, color: colors.textPrimary },
  meta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 2 },
  change: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.accent, marginTop: 7 },

  input: {
    fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary,
    backgroundColor: 'rgba(0,0,0,0.035)', borderRadius: 10,
    paddingHorizontal: spacing.md, paddingVertical: 10,
    minHeight: 42,
  },
  inputFa: { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' },

  save: {
    alignSelf: 'flex-start',
    backgroundColor: colors.textPrimary,
    borderRadius: 999, paddingHorizontal: spacing.lg, paddingVertical: 8,
    marginTop: 4,
  },
  saveT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: '#FFF' },
});
