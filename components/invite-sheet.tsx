import { useState } from 'react';
import { Modal, Pressable, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { findByEmail, sendRequest } from '@/lib/friends';
import { getLang, t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export function InviteSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const link = `https://zand.app/add?from=${user?.id ?? ''}`;

  const shareLink = async () => {
    try {
      await Share.share({ message: `Learn Persian heritage with me on ZAND. Tap to connect: ${link}` });
    } catch {}
  };

  const inviteEmail = async () => {
    if (!user?.id || !email.trim()) return;
    setBusy(true); setStatus('');
    const prof = await findByEmail(email);
    if (!prof) { setBusy(false); setStatus('No one with that email yet. Share the link to invite them.'); return; }
    if (prof.id === user.id) { setBusy(false); setStatus('That is you.'); return; }
    const { error } = await sendRequest(user.id, prof.id);
    setBusy(false);
    setStatus(error ? 'Already sent, or already friends.' : `Request sent to ${prof.name}.`);
    if (!error) setEmail('');
  };

  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={s.sheet} onPress={() => {}}>
          <View style={s.grab} />
          <View style={s.head}>
            <Text style={s.title}>{t(APP.inviteFriends)}</Text>
            <Pressable hitSlop={10} onPress={onClose}><Ionicons name="close" size={22} color={colors.textPrimary} /></Pressable>
          </View>

          <Pressable style={s.linkCard} onPress={shareLink}>
            <View style={s.linkIcon}><Ionicons name="link" size={20} color="#FFF" /></View>
            <View style={{ flex: 1 }}>
              <Text style={s.linkT}>{t(APP.shareYourLink)}</Text>
              <Text style={[s.linkX, getLang() === 'fa' && { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' }]}>{getLang() === 'fa' ? 'روی لینک می‌زنند، اپ باز می‌شود، و به هم وصل می‌شوید.' : 'They tap it, open the app, and you connect.'}</Text>
            </View>
            <Ionicons name="share-outline" size={20} color={colors.accent} />
          </Pressable>

          <Text style={s.or}>or add by email</Text>

          <View style={s.emailRow}>
            <TextInput style={s.emailInput} placeholder="friend@email.com" placeholderTextColor={colors.textSecondary}
              autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
            <Pressable style={[s.sendBtn, busy && { opacity: 0.6 }]} onPress={inviteEmail} disabled={busy}>
              <Text style={s.sendT}>{busy ? '…' : 'Add'}</Text>
            </Pressable>
          </View>

          {status ? <Text style={s.status}>{status}</Text> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: 24, color: colors.textPrimary },
  linkCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  linkIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  linkT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: colors.textPrimary },
  linkX: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  or: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.lg },
  emailRow: { flexDirection: 'row', gap: spacing.sm },
  emailInput: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  sendBtn: { backgroundColor: colors.accent, borderRadius: 12, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  sendT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },
  status: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' },
});
