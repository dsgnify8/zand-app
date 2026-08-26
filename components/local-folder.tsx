// One folder.
//
// Reached from the chevron on a rail, or by opening someone's link. Shows
// what is in it, who keeps it, and the two ways to bring someone else in.
//
// A shared folder is a space rather than a list, so leaving is a first
// class action here — the alternative is people staying in folders they
// stopped caring about because there was no way out.

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, Pressable, ScrollView, Share,
  StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { loadBusinesses, type Business } from '@/lib/businesses';
import {
  collectionItems, deleteCollection, folderLink, leaveCollection, loadCollections,
  membersOf, type Collection,
} from '@/lib/collections';
import { BusinessCard } from '@/components/business-card';
import { CollectionSheet } from '@/components/collection-sheet';
import { ShareFolderSheet } from '@/components/share-folder-sheet';
import { useAuth } from '@/lib/auth';
import { getLang, t, useLang } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

export function FolderPage() {
  useLang();
  const fa = getLang() === 'fa';
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user } = useAuth();

  const [folder, setFolder] = useState<Collection | null>(null);
  const [items, setItems] = useState<Business[]>([]);
  const [members, setMembers] = useState<{ id: string; name?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [share, setShare] = useState(false);
  const [filing, setFiling] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id || !user?.id) return;
    const [cols, ids, mem, all] = await Promise.all([
      loadCollections(user.id),
      collectionItems(id),
      membersOf(id),
      loadBusinesses({}),
    ]);
    setFolder(cols.find((c) => c.id === id) ?? null);
    setMembers(mem);
    const byId: Record<string, Business> = {};
    for (const b of all) byId[b.id] = b;
    setItems(ids.map((x) => byId[x]).filter(Boolean));
    setLoading(false);
  }, [id, user?.id]);

  useEffect(() => { load(); }, [load]);
  // Someone else may have added something while this was open.
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const sendLink = async () => {
    if (!id) return;
    const url = await folderLink(id);
    await Share.share({
      message: `Join my ${folder?.name ?? ''} board — ${url}`,
      url,
    });
  };

  const leave = () => {
    Alert.alert(
      t(LOCAL.leaveFolder),
      t(LOCAL.leaveFolderX),
      [
        { text: t(LOCAL.cancel), style: 'cancel' },
        {
          text: t(LOCAL.leaveFolder),
          style: 'destructive',
          onPress: async () => {
            if (id) await leaveCollection(id);
            router.navigate('/local-saved' as any);
          },
        },
      ],
    );
  };

  const mine = folder?.owner_id === user?.id;

  const remove = () => {
    // Naming the consequence rather than asking "are you sure": someone
    // deleting a folder two people keep should be told it goes for both.
    const shared = members.length > 1;
    Alert.alert(
      t(LOCAL.deleteFolder),
      shared ? t(LOCAL.deleteFolderShared) : t(LOCAL.deleteFolderX),
      [
        { text: t(LOCAL.cancel), style: 'cancel' },
        {
          text: t(LOCAL.deleteFolder),
          style: 'destructive',
          onPress: async () => {
            if (id) await deleteCollection(id);
            router.navigate('/local-saved' as any);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={[s.top, fa && { flexDirection: 'row-reverse' }]}>
        <Pressable hitSlop={12} onPress={() => router.navigate('/local-saved' as any)}>
          <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={s.topT} numberOfLines={1}>{folder?.name ?? ''}</Text>
        <View style={[{ flexDirection: 'row', gap: spacing.lg }, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => setShare(true)}>
            <Ionicons name="person-add-outline" size={20} color={colors.textPrimary} />
          </Pressable>
          {mine ? (
            <Pressable hitSlop={12} onPress={remove}>
              <Ionicons name="trash-outline" size={19} color={colors.textPrimary} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
          {/* who keeps it */}
          {members.length > 0 ? (
            <View style={[s.people, fa && { flexDirection: 'row-reverse' }]}>
              {members.slice(0, 5).map((m) => (
                <View key={m.id} style={s.avatar}>
                  <Text style={s.avatarT}>{(m.name || '?')[0].toUpperCase()}</Text>
                </View>
              ))}
              <Text style={[s.peopleT, fa && s.rtl]}>
                {members.length === 1
                  ? t(LOCAL.justYou)
                  : members.length + ' ' + t(LOCAL.keepThis)}
              </Text>
            </View>
          ) : null}

          <View style={[s.actions, fa && { flexDirection: 'row-reverse' }]}>
            <Pressable style={s.act} onPress={() => setShare(true)}>
              <Ionicons name="people-outline" size={15} color={colors.textPrimary} />
              <Text style={s.actT}>{t(LOCAL.shareWithFriend)}</Text>
            </Pressable>
            <Pressable style={s.act} onPress={sendLink}>
              <Ionicons name="link-outline" size={15} color={colors.textPrimary} />
              <Text style={s.actT}>{t(LOCAL.shareLinkShort)}</Text>
            </Pressable>
          </View>

          {items.length === 0 ? (
            <Text style={[s.empty, fa && s.rtl]}>{t(LOCAL.folderEmpty)}</Text>
          ) : (
            <View style={s.list}>
              {items.map((b) => (
                <BusinessCard
                  key={b.id}
                  b={b}
                  fa={fa}
                  onOpen={() => router.navigate(('/business?id=' + b.id) as any)}
                  onFile={setFiling}
                />
              ))}
            </View>
          )}

          {/* leaving, for a folder someone else made */}
          {!mine ? (
            <Pressable style={s.leave} onPress={leave}>
              <Text style={s.leaveT}>{t(LOCAL.leaveFolder)}</Text>
            </Pressable>
          ) : null}
        </ScrollView>
      )}

      <ShareFolderSheet
        collection={folder}
        open={share}
        onClose={() => setShare(false)}
        onShared={load}
      />
      <CollectionSheet businessId={filing} open={filing !== null} onClose={() => setFiling(null)} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md,
  },
  topT: {
    fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.2,
    color: colors.textPrimary, flex: 1, textAlign: 'center',
  },

  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },

  people: { flexDirection: 'row', alignItems: 'center', gap: -8, marginBottom: spacing.md },
  avatar: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(40,28,24,0.08)',
    borderWidth: 2, borderColor: colors.background,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.textPrimary },
  peopleT: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginLeft: 14 },

  actions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  act: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: 8,
  },
  actT: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textPrimary },

  list: { gap: 0 },
  empty: {
    fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary,
    textAlign: 'center', marginTop: spacing.xxl,
  },

  leave: { alignSelf: 'center', marginTop: spacing.xxl, padding: spacing.md },
  leaveT: { fontFamily: fonts.body, fontSize: 13, color: colors.accent },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
