// What someone kept.
//
// A folder is a row, not a tile. Tiles with cover images looked like
// somewhere to go; these are shelves, and what matters is what is on them
// — so each folder shows its contents directly and scrolls sideways.
//
// Everything saved sits at the foot, filed or not: a folder is a way of
// finding something again, not a place it disappears into.

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { loadBusinesses, type Business } from '@/lib/businesses';
import { useSavedBusinesses } from '@/lib/saved-businesses';
import { useCollections, collectionItems, type Collection } from '@/lib/collections';
import { BusinessCard } from '@/components/business-card';
import { CollectionSheet } from '@/components/collection-sheet';
import { ShareFolderSheet } from '@/components/share-folder-sheet';
import { LocalDrawer, type DrawerPick } from '@/components/local-drawer';
import { useAuth } from '@/lib/auth';
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const RAIL_W = 244;

export function SavedBusinesses() {
  useLang();
  const fa = getLang() === 'fa';
  const { user, session } = useAuth();

  const savedIds = useSavedBusinesses();
  const { items: collections, loading: colsLoading, refresh: refreshCols } = useCollections(user?.id);

  const [all, setAll] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [filing, setFiling] = useState<string | null>(null);
  const [sharing, setSharing] = useState<Collection | null>(null);

  // Every folder's contents, keyed by folder. Loaded together rather than
  // one at a time, so the page arrives whole.
  const [contents, setContents] = useState<Record<string, string[]>>({});

  useEffect(() => {
    (async () => {
      try { setAll(await loadBusinesses({})); } catch {}
      setLoading(false);
    })();
  }, []);

  useFocusEffect(useCallback(() => { refreshCols(); }, [refreshCols]));

  useEffect(() => {
    (async () => {
      const m: Record<string, string[]> = {};
      await Promise.all(collections.map(async (c) => {
        m[c.id] = await collectionItems(c.id);
      }));
      setContents(m);
    })();
  }, [collections]);

  const saved = useMemo(
    () => all.filter((b) => savedIds.includes(b.id)),
    [all, savedIds],
  );

  const byId = useMemo(() => {
    const m: Record<string, Business> = {};
    for (const b of all) m[b.id] = b;
    return m;
  }, [all]);

  const onDrawerPick = (k: DrawerPick) => {
    if (k === 'home') { router.navigate('/local' as any); return; }
    if (k === 'city') { router.navigate('/local/cities' as any); return; }
    router.navigate(session
      ? ('/local/business-new' as any)
      : ('/onboarding?step=2&next=/local/business-new' as any));
  };

  // Contents as well as the list. Waiting only for the folders meant the
  // page drew empty rails and then filled them, which is the flash.
  const contentsReady =
    collections.length === 0 || collections.every((c) => contents[c.id] !== undefined);
  const busy = loading || colsLoading || !contentsReady;
  const nothing = saved.length === 0 && collections.length === 0;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={[s.top, fa && { flexDirection: 'row-reverse' }]}>
        <Pressable hitSlop={12} onPress={() => setDrawer(true)}>
          <Ionicons name="menu-outline" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[s.topT, s.topTRight]}>{t(LOCAL.savedTitle)}</Text>
      </View>

      {/* A gentle arrival. The page has nothing to show until the
          folders and their contents are both in, and appearing all at
          once at full strength reads as a snap. */}
      {busy ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : nothing ? (
        <View style={s.empty}>
          <Ionicons name="bookmark-outline" size={22} color={colors.textSecondary} />
          <Text style={[s.emptyT, fa && s.rtl]}>{t(LOCAL.nothingSaved)}</Text>
          <Text style={[s.emptyX, fa && s.rtl]}>{t(LOCAL.nothingSavedX)}</Text>
          <Pressable onPress={() => router.navigate('/local' as any)}>
            <Text style={s.emptyCta}>{t(LOCAL.browseLocal)}</Text>
          </Pressable>
        </View>
      ) : (
        <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(240)}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
          {/* Saved things but nowhere to put them. Folders are the point of
              this page and there was no way in from here — you had to know
              to long-press a card somewhere else. */}
          {collections.length === 0 && saved.length > 0 ? (
            <Pressable style={s.makeFolder} onPress={() => setFiling(saved[0].id)}>
              <Ionicons name="folder-open-outline" size={20} color={colors.accent} />
              <View style={{ flex: 1 }}>
                <Text style={[s.makeFolderT, fa && s.rtl]}>
                  {fa ? 'یک پوشه بساز' : 'Make a folder'}
                </Text>
                <Text style={[s.makeFolderX, fa && s.rtl]}>
                  {fa
                    ? 'جاهایی که ذخیره کرده‌ای را دسته‌بندی کن.'
                    : 'Group the places you have saved.'}
                </Text>
              </View>
              <Ionicons name="add" size={18} color={colors.accent} />
            </Pressable>
          ) : null}

          {/* one rail per folder */}
          {collections.map((c) => {
            const ids = contents[c.id] ?? [];
            const list = ids.map((id) => byId[id]).filter(Boolean);
            return (
              <View key={c.id} style={s.section}>
                <View style={[s.sectionHead, fa && { flexDirection: 'row-reverse' }]}>
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => router.navigate(('/local/folder?id=' + c.id) as any)}
                  >
                    <Text style={[s.sectionL, { paddingHorizontal: 0 }, fa && s.rtl]}>
                      {c.name.toUpperCase()}
                      <Text style={s.sectionN}>{'   ' + list.length}</Text>
                    </Text>
                  </Pressable>
                  <View style={[{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }, fa && { flexDirection: 'row-reverse' }]}>
                    <Pressable hitSlop={10} onPress={() => setSharing(c)}>
                      <Ionicons name="person-add-outline" size={16} color={colors.textSecondary} />
                    </Pressable>
                    <Pressable hitSlop={10} onPress={() => router.navigate(('/local/folder?id=' + c.id) as any)}>
                      <Ionicons
                        name={fa ? 'chevron-back' : 'chevron-forward'}
                        size={16}
                        color={colors.textSecondary}
                      />
                    </Pressable>
                  </View>
                </View>

                {list.length === 0 ? (
                  <Text style={[s.railEmpty, fa && s.rtl]}>{t(LOCAL.folderEmpty)}</Text>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={RAIL_W + spacing.md}
                    decelerationRate="fast"
                    contentContainerStyle={[s.rail, fa && { flexDirection: 'row-reverse' }]}
                  >
                    {list.map((b) => (
                      <BusinessCard
                        key={b.id}
                        b={b}
                        fa={fa}
                        width={RAIL_W}
                        onOpen={() => router.navigate(('/local/business?id=' + b.id) as any)}
                        onFile={setFiling}
                      />
                    ))}
                  </ScrollView>
                )}
              </View>
            );
          })}

          {/* and everything, filed or not */}
          <Text style={[s.sectionL, { marginTop: spacing.xl }, fa && s.rtl]}>
            {t(LOCAL.everythingSaved)}
            <Text style={s.sectionN}>{'   ' + saved.length}</Text>
          </Text>

          <View style={s.list}>
            {saved.map((b) => (
              <BusinessCard
                key={b.id}
                b={b}
                fa={fa}
                onOpen={() => router.navigate(('/local/business?id=' + b.id) as any)}
                onFile={setFiling}
              />
            ))}
          </View>
        </ScrollView>
        </Animated.View>
      )}

      <ShareFolderSheet
        collection={sharing}
        open={sharing !== null}
        onClose={() => setSharing(null)}
        onShared={refreshCols}
      />

      <CollectionSheet businessId={filing} open={filing !== null} onClose={() => setFiling(null)} />
      <LocalDrawer open={drawer} onClose={() => setDrawer(false)} onPick={onDrawerPick} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  topT: { fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.2, color: colors.textPrimary },
  topTRight: { flex: 1, textAlign: 'right' },

  body: { paddingBottom: spacing.xxl * 2 },

  // Dashed, so it reads as a space waiting to be filled rather than a
  // card that already holds something.
  makeFolder: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(140,58,46,0.35)',
    backgroundColor: 'rgba(140,58,46,0.045)',
    borderRadius: 14, padding: spacing.lg, marginBottom: spacing.xl,
  },
  makeFolderT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary },
  makeFolderX: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  section: { marginTop: spacing.lg },
  sectionHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, marginBottom: spacing.md,
  },
  sectionL: {
    fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2,
    color: colors.textSecondary, paddingHorizontal: spacing.lg,
  },
  sectionN: { fontFamily: fonts.body, fontSize: 10.5, color: colors.textSecondary },
  rail: { gap: spacing.md, paddingHorizontal: spacing.lg },
  railEmpty: {
    fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
  },

  list: { paddingHorizontal: spacing.lg, marginTop: spacing.md },

  empty: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing.xxl * 2, paddingHorizontal: spacing.xl },
  emptyT: { fontFamily: fonts.heading, fontSize: 20, color: colors.textPrimary, marginTop: spacing.sm },
  emptyX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, textAlign: 'center' },
  emptyCta: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent, marginTop: spacing.md },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
