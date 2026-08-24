// Replacing the pictures.
//
// Every image key the app knows about, in one searchable list, with the
// current picture beside it. Tap one, pick from the camera roll, and it
// is live for everyone on their next launch.
//
// Keys that ship with the app and keys that exist only as uploads are
// shown together, because from an admin's point of view they are the
// same thing: a slot with a picture in it.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { useIsAdmin } from '@/lib/admin';
import { useAuth } from '@/lib/auth';
import { EDU_IMAGES, eduImage } from '@/constants/education-images';
import { useLang } from '@/lib/i18n';
import {
  pickAndUpload, clearOverride, listOverrides, loadImageOverrides, imageOverride,
} from '@/lib/image-overrides';

export default function AdminImages() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const isAdmin = useIsAdmin();
  const { user } = useAuth();

  const [q, setQ] = useState('');
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    (async () => {
      const rows = await listOverrides();
      const m: Record<string, string> = {};
      rows.forEach((r: any) => { m[r.key] = r.url; });
      setUploaded(m);
    })();
  }, [tick]);

  // Bundled keys plus any key that exists only as an upload.
  const keys = useMemo(() => {
    const all = new Set<string>([...Object.keys(EDU_IMAGES), ...Object.keys(uploaded)]);
    const t = q.trim().toLowerCase();
    return [...all]
      .filter((k) => !t || k.toLowerCase().includes(t))
      .sort((a, b) => {
        // replaced ones first: they are what an admin came here to check
        const ra = uploaded[a] ? 0 : 1;
        const rb = uploaded[b] ? 0 : 1;
        return ra - rb || a.localeCompare(b);
      });
  }, [uploaded, q, tick]);

  if (!isAdmin) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.center}><Text style={s.dim}>Admins only.</Text></View>
      </SafeAreaView>
    );
  }

  const replace = async (key: string) => {
    setBusyKey(key);
    setMsg(null);
    const r = await pickAndUpload(key, user?.id);
    setBusyKey(null);
    if ((r as any)?.error) { setMsg((r as any).error); return; }
    if ((r as any)?.cancelled) return;
    await loadImageOverrides();
    setTick((n) => n + 1);
    setMsg('Replaced. Everyone sees it on their next launch.');
  };

  const revert = async (key: string) => {
    setBusyKey(key);
    await clearOverride(key);
    await loadImageOverrides();
    setBusyKey(null);
    setTick((n) => n + 1);
    setMsg('Back to the one that ships with the app.');
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.head}>
        <Pressable hitSlop={12} onPress={() => router.replace('/admin' as any)}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.headT}>Images</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={s.searchWrap}>
        <View style={s.search}>
          <Ionicons name="search" size={14} color={colors.textSecondary} />
          <TextInput
            style={s.searchIn}
            value={q}
            onChangeText={setQ}
            placeholder="cyrus, geo, hafez…"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {q ? (
            <Pressable hitSlop={8} onPress={() => setQ('')}>
              <Ionicons name="close-circle" size={15} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>
        <Text style={s.count}>
          {keys.length} images · {Object.keys(uploaded).length} replaced
        </Text>
      </View>

      {msg ? <Text style={s.msg}>{msg}</Text> : null}

      <ScrollView contentContainerStyle={s.body}>
        {keys.map((k) => {
          const isUp = !!uploaded[k];
          return (
            <View key={k} style={s.row}>
              <Image source={eduImage(k)} style={s.thumb} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text style={s.key} numberOfLines={1}>{k}</Text>
                <Text style={s.state}>{isUp ? 'Replaced' : 'Shipped with the app'}</Text>
              </View>

              {busyKey === k ? (
                <ActivityIndicator size="small" color={colors.accent} />
              ) : (
                <View style={s.actions}>
                  {isUp ? (
                    <Pressable hitSlop={8} onPress={() => revert(k)}>
                      <Ionicons name="arrow-undo-outline" size={17} color={colors.textSecondary} />
                    </Pressable>
                  ) : null}
                  <Pressable hitSlop={8} onPress={() => replace(k)}>
                    <Ionicons name="camera-outline" size={18} color={colors.accent} />
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },

  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.08)' },
  headT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },

  searchWrap: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 9 },
  searchIn: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.textPrimary, padding: 0 },
  count: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 8 },

  msg: { fontFamily: fonts.body, fontSize: 12, color: colors.accent, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },

  body: { padding: spacing.lg, paddingBottom: spacing.xxl },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.06)' },
  thumb: { width: 56, height: 42, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.05)' },
  key: { fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },
  state: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
