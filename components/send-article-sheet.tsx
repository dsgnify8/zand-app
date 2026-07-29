import { useState } from 'react';
import { bump } from '@/lib/stats-store';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { pr, FRIENDS } from '@/constants/profile';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

// Sends the specific article the reader is in, to a chosen friend.
export function SendArticleSheet({ open, onClose, articleTitle }: { open: boolean; onClose: () => void; articleTitle: string }) {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const close = () => { setSentTo(null); onClose(); };

  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={close}>
      <Pressable style={s.backdrop} onPress={close}>
        <Pressable style={s.sheet} onPress={() => {}}>
          <View style={s.grab} />
          {sentTo ? (
            <View style={s.sentWrap}>
              <View style={s.tick}><Ionicons name="checkmark" size={26} color="#FFF" /></View>
              <Text style={s.sentT}>Sent to {sentTo}</Text>
              <Text style={s.sentX}>“{articleTitle}”</Text>
              <Text style={s.sentNote}>They will get it to read. Now it is their turn.</Text>
              <Pressable style={s.done} onPress={close}><Text style={s.doneT}>{t(APP.done)}</Text></Pressable>
            </View>
          ) : (
            <>
              <View style={s.head}>
                <Text style={s.headT}>{t(APP.sendToFriend)}</Text>
                <Pressable hitSlop={10} onPress={close}><Ionicons name="close" size={21} color={colors.textPrimary} /></Pressable>
              </View>
              <Text style={s.sub} numberOfLines={2}>Sharing “{articleTitle}”</Text>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
                <View style={{ gap: spacing.sm }}>
                  {FRIENDS.map((f) => (
                    <Pressable key={f.key} style={s.row} onPress={() => { setSentTo(f.name); bump('thingsSent'); }}>
                      <View style={s.avatar}><Text style={s.avatarT}>{f.persian[0]}</Text></View>
                      <View style={{ flex: 1 }}>
                        <Text style={s.name}>{f.name}</Text>
                        <Text style={s.meta}>{f.last}</Text>
                      </View>
                      <Ionicons name="paper-plane-outline" size={16} color={pr.friendA} />
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.lg, maxHeight: '80%' },
  grab: { width: 34, height: 4, borderRadius: 2, backgroundColor: pr.hair, alignSelf: 'center', marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headT: { fontFamily: fonts.heading, fontSize: 24, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: 13, color: pr.dim, fontStyle: 'italic', marginTop: 2, marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(65,114,112,0.14)', alignItems: 'center', justifyContent: 'center' },
  avatarT: { fontFamily: fonts.persian, fontSize: 17, color: pr.friendA },
  name: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  meta: { fontFamily: fonts.body, fontSize: 11, color: pr.dim },
  sentWrap: { alignItems: 'center', paddingVertical: spacing.xxl },
  tick: { width: 58, height: 58, borderRadius: 29, backgroundColor: pr.streakA, alignItems: 'center', justifyContent: 'center' },
  sentT: { fontFamily: fonts.heading, fontSize: 25, color: colors.textPrimary, marginTop: spacing.lg },
  sentX: { fontFamily: fonts.heading, fontSize: 16, color: pr.friendA, marginTop: 4, fontStyle: 'italic', textAlign: 'center', paddingHorizontal: spacing.lg },
  sentNote: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, marginTop: spacing.md, textAlign: 'center' },
  done: { backgroundColor: colors.textPrimary, borderRadius: 22, paddingVertical: 10, paddingHorizontal: spacing.xxl, marginTop: spacing.xl },
  doneT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.surface },
});
