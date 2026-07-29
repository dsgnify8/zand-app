import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { searchProfiles, sendRequest, acceptRequest, removeFriendship, useFriends, type Profile } from '@/lib/friends';
import { InviteSheet } from '@/components/invite-sheet';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export function FriendsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const myId = user?.id;
  const { accepted, incoming, outgoing, refresh } = useFriends(myId);
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Profile[]>([]);
  const [searching, setSearching] = useState(false);
  const [sentTo, setSentTo] = useState<string[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);

  useEffect(() => {
    if (!open) { setQ(''); setResults([]); }
  }, [open]);

  useEffect(() => {
    if (!myId || q.trim().length < 2) { setResults([]); return; }
    let alive = true;
    setSearching(true);
    const t = setTimeout(async () => {
      const r = await searchProfiles(q, myId);
      if (alive) { setResults(r); setSearching(false); }
    }, 300);
    return () => { alive = false; clearTimeout(t); };
  }, [q, myId]);

  const friendIds = new Set([...accepted, ...outgoing].map((r) => r.profile.id).concat(sentTo));

  const invite = async (otherId: string) => {
    if (!myId) return;
    setSentTo((v) => [...v, otherId]);
    await sendRequest(myId, otherId);
    refresh();
  };

  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={s.sheet} onPress={() => {}}>
          <View style={s.grab} />
          <View style={s.head}>
            <Text style={s.title}>{t(APP.friends)}</Text>
            <Pressable hitSlop={10} onPress={onClose}><Ionicons name="close" size={22} color={colors.textPrimary} /></Pressable>
          </View>

          <View style={s.searchBar}>
            <Ionicons name="search" size={17} color={colors.textSecondary} />
            <TextInput style={s.searchInput} placeholder="Find people by name or handle"
              placeholderTextColor={colors.textSecondary} autoCapitalize="none" value={q} onChangeText={setQ} />
            {searching ? <ActivityIndicator size="small" /> : null}
          </View>

          <Pressable style={s.inviteRow} onPress={() => setInviteOpen(true)}>
            <Ionicons name="link" size={16} color={colors.accent} />
            <Text style={s.inviteRowT}>{t(APP.inviteByLink)}</Text>
            <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
          </Pressable>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
            {/* search results */}
            {q.trim().length >= 2 ? (
              results.length === 0 && !searching ? (
                <Text style={s.empty}>No one found for "{q}".</Text>
              ) : results.map((p) => (
                <View key={p.id} style={s.row}>
                  <View style={s.avatar}><Text style={s.avatarT}>{(p.name || '?')[0].toUpperCase()}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.name}>{p.name}</Text>
                    <Text style={s.handle}>{p.email}</Text>
                  </View>
                  {friendIds.has(p.id) ? (
                    <Text style={s.pending}>{t(APP.sent)}</Text>
                  ) : (
                    <Pressable style={s.addBtn} onPress={() => invite(p.id)}>
                      <Text style={s.addT}>Add</Text>
                    </Pressable>
                  )}
                </View>
              ))
            ) : (
              <>
                {/* incoming requests */}
                {incoming.length > 0 ? (
                  <>
                    <Text style={s.sectionL}>{t(APP.requests)}</Text>
                    {incoming.map((r) => (
                      <View key={r.id} style={s.row}>
                        <View style={s.avatar}><Text style={s.avatarT}>{(r.profile.name || '?')[0].toUpperCase()}</Text></View>
                        <View style={{ flex: 1 }}>
                          <Text style={s.name}>{r.profile.name}</Text>
                          <Text style={s.handle}>{r.profile.email}</Text>
                        </View>
                        <Pressable style={s.addBtn} onPress={async () => { await acceptRequest(r.id); refresh(); }}>
                          <Text style={s.addT}>{t(APP.accept)}</Text>
                        </Pressable>
                        <Pressable hitSlop={8} style={s.decline} onPress={async () => { await removeFriendship(r.id); refresh(); }}>
                          <Ionicons name="close" size={16} color={colors.textSecondary} />
                        </Pressable>
                      </View>
                    ))}
                  </>
                ) : null}

                {/* accepted friends */}
                <Text style={s.sectionL}>{t(APP.yourFriends)}</Text>
                {accepted.length === 0 ? (
                  <Text style={s.empty}>No friends yet. Search above to add someone.</Text>
                ) : accepted.map((r) => (
                  <View key={r.id} style={s.row}>
                    <View style={s.avatar}><Text style={s.avatarT}>{(r.profile.name || '?')[0].toUpperCase()}</Text></View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.name}>{r.profile.name}</Text>
                      <Text style={s.handle}>{r.profile.email}</Text>
                    </View>
                    <Pressable hitSlop={8} onPress={async () => { await removeFriendship(r.id); refresh(); }}>
                      <Ionicons name="ellipsis-horizontal" size={18} color={colors.textSecondary} />
                    </Pressable>
                  </View>
                ))}

                {outgoing.length > 0 ? (
                  <>
                    <Text style={s.sectionL}>{t(APP.pending)}</Text>
                    {outgoing.map((r) => (
                      <View key={r.id} style={s.row}>
                        <View style={s.avatar}><Text style={s.avatarT}>{(r.profile.name || '?')[0].toUpperCase()}</Text></View>
                        <View style={{ flex: 1 }}>
                          <Text style={s.name}>{r.profile.name}</Text>
                          <Text style={s.handle}>{r.profile.email}</Text>
                        </View>
                        <Text style={s.pending}>{t(APP.sent)}</Text>
                      </View>
                    ))}
                  </>
                ) : null}
              </>
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
      <InviteSheet open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, maxHeight: '85%' },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: 24, color: colors.textPrimary },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: 10, marginBottom: spacing.md },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary },
  inviteRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: spacing.sm },
  inviteRowT: { flex: 1, fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.accent },
  sectionL: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: colors.textSecondary, marginTop: spacing.lg, marginBottom: spacing.sm },
  empty: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, paddingVertical: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  avatarT: { fontFamily: fonts.heading, fontSize: 17, color: '#FFF' },
  name: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },
  handle: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  addBtn: { backgroundColor: colors.accent, borderRadius: 16, paddingVertical: 6, paddingHorizontal: spacing.md },
  addT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: '#FFF' },
  decline: { padding: 4 },
  pending: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.textSecondary },
});
