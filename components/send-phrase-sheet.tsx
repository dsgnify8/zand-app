import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { useAuth } from '@/lib/auth';
import { useFriends } from '@/lib/friends';
import { sendItem } from '@/lib/inbox';
import { bump } from '@/lib/stats-store';

type Phrase = { fa: string; tr: string; en: string; note?: string };

export function SendPhraseSheet({ phrase, onClose }: { phrase: Phrase | null; onClose: () => void }) {
  const { user } = useAuth();
  const { accepted } = useFriends(user?.id);
  const [note, setNote] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!phrase) { setNote(''); setSentTo(null); }
  }, [phrase]);

  const send = async (toId: string, toName: string) => {
    if (!user?.id || !phrase) return;
    setBusy(true);
    await sendItem({
      sender: user.id,
      recipient: toId,
      kind: 'word',
      item_key: phrase.fa,
      title: phrase.en,
      fa: phrase.fa,
      tr: phrase.tr,
      en: phrase.en,
      note: note.trim() || undefined,
    });
    bump('thingsSent');
    setBusy(false);
    setSentTo(toName);
  };

  return (
    <Modal transparent visible={!!phrase} animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Pressable style={s.sheet} onPress={() => {}}>
            <View style={s.grab} />

            {sentTo ? (
              <View style={s.sentWrap}>
                <View style={s.tick}><Ionicons name="checkmark" size={22} color="#FFF" /></View>
                <Text style={s.sentT}>Sent to {sentTo}</Text>
                <Text style={s.sentX}>It is waiting in their inbox.</Text>
                <Pressable style={s.cta} onPress={onClose}>
                  <Text style={s.ctaT}>Done</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <View style={s.card}>
                  <Text style={s.fa}>{phrase?.fa}</Text>
                  <Text style={s.tr}>{phrase?.tr}</Text>
                  <View style={s.hair} />
                  <Text style={s.en}>{phrase?.en}</Text>
                </View>

                <TextInput
                  style={s.note}
                  placeholder="Say something with it (optional)"
                  placeholderTextColor={lw.muted}
                  value={note}
                  onChangeText={setNote}
                  multiline
                />

                <Text style={s.label}>SEND TO</Text>

                {accepted.length === 0 ? (
                  <Text style={s.empty}>
                    No friends yet. Add someone from your profile and you can start sending words back and forth.
                  </Text>
                ) : (
                  <ScrollView style={{ maxHeight: 240 }} showsVerticalScrollIndicator={false}>
                    {accepted.map((f) => (
                      <Pressable
                        key={f.id}
                        style={s.friend}
                        disabled={busy}
                        onPress={() => send(f.profile.id, f.profile.name)}
                      >
                        <View style={s.avatar}>
                          <Text style={s.avatarT}>{(f.profile.name || '?')[0].toUpperCase()}</Text>
                        </View>
                        <Text style={s.friendT}>{f.profile.name}</Text>
                        <Ionicons name="arrow-forward" size={16} color={lw.green} />
                      </Pressable>
                    ))}
                  </ScrollView>
                )}
              </>
            )}
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(20,26,20,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: lw.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: lw.hair, alignSelf: 'center', marginBottom: spacing.lg },

  card: { alignItems: 'center', backgroundColor: lw.greenWash, borderRadius: 16, paddingVertical: spacing.xl },
  fa: { fontFamily: fonts.persian, fontSize: 34, lineHeight: 54, color: lw.ink },
  tr: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: 2 },
  hair: { width: 34, height: 1, backgroundColor: lw.rule, marginVertical: spacing.md },
  en: { fontFamily: fonts.body, fontSize: 16, color: lw.green },

  note: { fontFamily: fonts.body, fontSize: 14.5, color: lw.ink, backgroundColor: lw.surface, borderWidth: 1, borderColor: lw.hair, borderRadius: 12, padding: spacing.md, marginTop: spacing.lg, minHeight: 62, textAlignVertical: 'top' },

  label: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2.5, color: lw.muted, marginTop: spacing.xl, marginBottom: spacing.sm },
  empty: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: lw.muted, paddingVertical: spacing.md },

  friend: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: lw.green, alignItems: 'center', justifyContent: 'center' },
  avatarT: { fontFamily: fonts.body, fontSize: 15, color: '#FFF' },
  friendT: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: lw.ink },

  sentWrap: { alignItems: 'center', paddingVertical: spacing.xl },
  tick: { width: 52, height: 52, borderRadius: 26, backgroundColor: lw.green, alignItems: 'center', justifyContent: 'center' },
  sentT: { fontFamily: fonts.body, fontSize: 19, color: lw.ink, marginTop: spacing.lg },
  sentX: { fontFamily: fonts.body, fontSize: 13, color: lw.muted, marginTop: 4, marginBottom: spacing.xl },

  cta: { backgroundColor: lw.green, borderRadius: 26, paddingVertical: 14, paddingHorizontal: spacing.xxl },
  ctaT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: '#FFF' },
});
