// Sharing a folder.
//
// Not a copy handed over — the same folder, with another person in it.
// Whatever either of them adds, both see. A copy would drift apart inside
// a week and neither would know which was which.
//
// Only friends: a folder is a private thing, and a link anyone could open
// would make it a public one by accident.

import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, Easing, Modal, Pressable,
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { useFriends } from '@/lib/friends';
import { membersOf, shareCollection, type Collection } from '@/lib/collections';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

export function ShareFolderSheet({
  collection,
  open,
  onClose,
  onShared,
}: {
  collection: Collection | null;
  open: boolean;
  onClose: () => void;
  onShared?: () => void;
}) {
  const fa = getLang() === 'fa';
  const { user } = useAuth();
  const { accepted } = useFriends(user?.id);

  const [members, setMembers] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const rise = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    if (open) rise.setValue(0);
    Animated.timing(rise, {
      toValue: open ? 1 : 0,
      duration: open ? 240 : 160,
      easing: open ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [open]);

  useEffect(() => {
    (async () => {
      if (!open || !collection) return;
      setLoading(true);
      const m = await membersOf(collection.id);
      setMembers(m.map((x) => x.id));
      setLoading(false);
    })();
  }, [open, collection?.id]);

  if (!open || !collection) return null;

  const share = async (id: string) => {
    setBusy(id);
    const ok = await shareCollection(collection.id, id);
    if (ok) setMembers((v) => [...v, id]);
    setBusy(null);
    onShared?.();
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
      <View style={st.wrap}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View
          style={[
            st.sheet,
            { transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] },
          ]}
        >
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, st.veil]} />

          <View style={st.grab} />

          <View style={[st.head, fa && { flexDirection: 'row-reverse' }]}>
            <Text style={st.headT} numberOfLines={1}>
              {t(LOCAL.shareFolder)}  ·  {collection.name}
            </Text>
            <Pressable hitSlop={10} onPress={onClose}>
              <Ionicons name="close" size={20} color={colors.textPrimary} />
            </Pressable>
          </View>

          <Text style={[st.note, fa && st.rtl]}>{t(LOCAL.shareFolderX)}</Text>

          {loading ? (
            <ActivityIndicator style={{ marginVertical: spacing.xl }} color={colors.accent} />
          ) : (accepted?.length ?? 0) === 0 ? (
            <Text style={[st.none, fa && st.rtl]}>{t(LOCAL.noFriendsYet)}</Text>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.lg }}>
              {(accepted ?? []).map((r: any) => {
                const id = r.profile?.id ?? r.id;
                const name = r.profile?.name ?? '—';
                const already = members.includes(id);
                return (
                  <Pressable
                    key={id}
                    style={[st.row, fa && { flexDirection: 'row-reverse' }]}
                    disabled={already || busy === id}
                    onPress={() => share(id)}
                  >
                    <View style={st.avatar}>
                      <Text style={st.avatarT}>{(name || '?')[0].toUpperCase()}</Text>
                    </View>
                    <Text style={[st.rowT, { flex: 1 }, fa && st.rtl]} numberOfLines={1}>{name}</Text>
                    {busy === id ? (
                      <ActivityIndicator size="small" color={colors.accent} />
                    ) : already ? (
                      <Text style={st.in}>{t(LOCAL.alreadyIn)}</Text>
                    ) : (
                      <Ionicons name="add-circle-outline" size={20} color={colors.accent} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: 'rgba(16,13,12,0.22)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderTopLeftRadius: 22, borderTopRightRadius: 22,
    paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl,
    maxHeight: '70%',
  },
  veil: { backgroundColor: 'rgba(250,247,243,0.62)' },
  grab: {
    width: 34, height: 3.5, borderRadius: 2,
    backgroundColor: 'rgba(40,28,24,0.20)', alignSelf: 'center', marginBottom: spacing.md,
  },

  head: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 4,
  },
  headT: { fontFamily: fonts.body, fontSize: 15.5, color: colors.textPrimary, flex: 1 },
  note: {
    fontFamily: fonts.body, fontSize: 12, lineHeight: 18,
    color: colors.textSecondary, marginBottom: spacing.md,
  },
  none: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginVertical: spacing.xl },

  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 10 },
  avatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(40,28,24,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  rowT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary },
  in: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary },

  rtl: { writingDirection: 'rtl', textAlign: 'right' },
});
