// What someone kept, and how they filed it.
//
// Folders first, two to a row, each carrying the photograph of the first
// listing put in it. Then everything saved, filed or not — a folder is a
// way of finding things again, not a place they disappear into.
//
// A soft shadow under each card rather than a border: these are objects on
// a shelf, and an outline would make them look like buttons.

import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { categoryLabel, loadBusinesses, type Business } from '@/lib/businesses';
import { useSavedBusinesses } from '@/lib/saved-businesses';
import { useCollections, collectionItems, type Collection } from '@/lib/collections';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { LocalDrawer, type DrawerPick } from '@/components/local-drawer';
import { useAuth } from '@/lib/auth';
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

export function SavedBusinesses() {
  useLang();
  const fa = getLang() === 'fa';
  const { width: W } = useWindowDimensions();
  const { user, session } = useAuth();

  const savedIds = useSavedBusinesses();
  const { items: collections, loading: colsLoading } = useCollections(user?.id);
  const [all, setAll] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [openCol, setOpenCol] = useState<Collection | null>(null);
  const [colIds, setColIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try { setAll(await loadBusinesses({})); } catch {}
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!openCol) { setColIds([]); return; }
      setColIds(await collectionItems(openCol.id));
    })();
  }, [openCol?.id]);

  const saved = useMemo(
    () => all.filter((b) => savedIds.includes(b.id)),
    [all, savedIds],
  );

  const shown = openCol
    ? all.filter((b) => colIds.includes(b.id))
    : saved;

  const byId = useMemo(() => {
    const m: Record<string, Business> = {};
    for (const b of all) m[b.id] = b;
    return m;
  }, [all]);

  const cardW = (W - spacing.lg * 2 - spacing.md) / 2;

  const onDrawerPick = (k: DrawerPick) => {
    if (k === 'home') { router.navigate('/local' as any); return; }
    if (k === 'city') { router.navigate('/local-cities' as any); return; }
    if (k === 'category') { router.navigate('/local-categories' as any); return; }
    router.navigate(session
      ? ('/business-new' as any)
      : ('/onboarding?step=2&next=/business-new' as any));
  };

  const busy = loading || colsLoading;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={[s.top, fa && { flexDirection: 'row-reverse' }]}>
        {openCol ? (
          <Pressable hitSlop={12} onPress={() => setOpenCol(null)}>
            <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={colors.textPrimary} />
          </Pressable>
        ) : (
          <Pressable hitSlop={12} onPress={() => setDrawer(true)}>
            <Ionicons name="menu-outline" size={22} color={colors.textPrimary} />
          </Pressable>
        )}
        <Text style={s.topT} numberOfLines={1}>
          {openCol ? openCol.name : t(LOCAL.savedTitle)}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      {busy ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : saved.length === 0 && collections.length === 0 ? (
        <View style={s.empty}>
          <Ionicons name="bookmark-outline" size={22} color={colors.textSecondary} />
          <Text style={[s.emptyT, fa && s.rtl]}>{t(LOCAL.nothingSaved)}</Text>
          <Text style={[s.emptyX, fa && s.rtl]}>{t(LOCAL.nothingSavedX)}</Text>
          <Pressable onPress={() => router.navigate('/local' as any)}>
            <Text style={s.emptyCta}>{t(LOCAL.browseLocal)}</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
          {/* folders */}
          {!openCol && collections.length > 0 ? (
            <View style={s.folders}>
              {collections.map((c) => {
                const cover = c.cover_business_id ? byId[c.cover_business_id] : null;
                const shot = (cover?.photos ?? [])[0];
                return (
                  <Pressable key={c.id} style={{ width: cardW }} onPress={() => setOpenCol(c)}>
                    <View style={[s.folderShot, { width: cardW, height: cardW }]}>
                      {shot ? (
                        <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                      ) : (
                        <View style={[StyleSheet.absoluteFill as any, s.blank]}>
                          <Ionicons name="folder-outline" size={20} color={colors.textSecondary} />
                        </View>
                      )}
                    </View>
                    <Text style={[s.folderT, fa && s.rtl]} numberOfLines={1}>{c.name}</Text>
                    <Text style={[s.folderX, fa && s.rtl]}>
                      {c.count ?? 0} {t((c.count ?? 0) === 1 ? LOCAL.place : LOCAL.places)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          {/* everything, or the open folder */}
          {!openCol ? (
            <Text style={[s.sectionL, fa && s.rtl]}>
              {t(LOCAL.everythingSaved)}
              <Text style={s.sectionN}>{'   ' + saved.length}</Text>
            </Text>
          ) : null}

          <View style={s.grid}>
            {shown.map((b) => {
              const shot = (b.photos ?? [])[0];
              return (
                <Pressable
                  key={b.id}
                  style={{ width: cardW }}
                  onPress={() => router.navigate(('/business?id=' + b.id) as any)}
                >
                  <View style={[s.shot, { width: cardW, height: cardW }]}>
                    {shot ? (
                      <Image source={bizImage(shot)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                    ) : (
                      <View style={[StyleSheet.absoluteFill as any, s.blank]}>
                        <Ionicons name="storefront-outline" size={18} color={colors.textSecondary} />
                      </View>
                    )}
                  </View>
                  <Text style={[s.name, fa && s.rtl]} numberOfLines={1}>
                    {fa && b.name_fa ? b.name_fa : b.name}
                  </Text>
                  <Text style={[s.meta, fa && s.rtl]} numberOfLines={1}>
                    {categoryLabel(b.category, fa)}
                    {b.city ? '  ·  ' + ((fa && b.city_fa) || b.city) : ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {openCol && shown.length === 0 ? (
            <Text style={[s.emptyX, { marginTop: spacing.xl }, fa && s.rtl]}>
              {t(LOCAL.folderEmpty)}
            </Text>
          ) : null}
        </ScrollView>
      )}

      <LocalDrawer open={drawer} onClose={() => setDrawer(false)} onPick={onDrawerPick} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary, flex: 1, textAlign: 'center' },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },

  folders: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xl },
  folderShot: {
    borderRadius: 16, overflow: 'hidden', backgroundColor: colors.surface,
    // Shadow rather than a border: these are objects on a shelf, and an
    // outline would make them look like buttons.
    shadowColor: '#2A1A14',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  folderT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary, marginTop: 9 },
  folderX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },

  sectionL: {
    fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2,
    color: colors.textSecondary, marginBottom: spacing.md,
  },
  sectionN: { fontFamily: fonts.body, fontSize: 10.5, color: colors.textSecondary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  shot: { borderRadius: 13, overflow: 'hidden', backgroundColor: colors.surface },
  blank: { alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary, marginTop: 7 },
  meta: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary, marginTop: 1 },

  empty: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing.xxl * 2, paddingHorizontal: spacing.xl },
  emptyT: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary, marginTop: spacing.sm },
  emptyX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, textAlign: 'center' },
  emptyCta: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent, marginTop: spacing.md },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
