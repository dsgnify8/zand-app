import { useEffect, useState } from 'react';
import { Keyboard, Platform, Pressable, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import { findByEmail, sendRequest } from '@/lib/friends';
import { getLang, t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';
import { inviteMessage } from '@/lib/links';

export function InviteSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  // Lifted by hand. A KeyboardAvoidingView inside the one the friends
  // sheet already has lifts the panel twice, and the settings sheet has
  // none at all, so neither parent can be relied on.
  const [lift, setLift] = useState(0);
  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setLift(e.endCoordinates.height),
    );
    const hide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setLift(0),
    );
    return () => { show.remove(); hide.remove(); };
  }, []);

  // Enabled the moment the address looks like one. The button sat faded
  // until the request was in flight, which read as broken rather than
  // waiting.
  const canSend = /^\S+@\S+\.\S+$/.test(email.trim());

  const shareLink = async () => {
    try {
      await Share.share({ message: inviteMessage(user?.id) });
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

  // Not a Modal.
  //
  // This sheet is always opened from inside another one — the friends
  // sheet, or settings — and iOS does not take kindly to a second modal
  // presented over the first while a keyboard is up: touches start
  // landing on a window that is no longer there and the app stops
  // responding altogether. An overlay inside the sheet that opened it
  // looks the same and cannot deadlock.
  if (!open) return null;

  return (
    <View style={StyleSheet.absoluteFill as any}>
      <Pressable style={s.backdrop} onPress={() => { Keyboard.dismiss(); onClose(); }}>
        {/* The email field sits at the foot of the sheet, which is exactly
            where the keyboard arrives. Without this it covers the thing
            being typed into. */}
        <Pressable style={[s.sheet, { marginBottom: lift }]} onPress={() => {}}>
          <View style={s.grab} />
          <View style={s.head}>
            <Text style={s.title}>{t(APP.inviteFriends)}</Text>
            <Pressable hitSlop={10} onPress={onClose}><Ionicons name="close" size={22} color={colors.textPrimary} /></Pressable>
          </View>

          <Pressable style={s.linkCard} onPress={shareLink}>
            <View style={s.linkIcon}><Ionicons name="link" size={20} color={colors.accent} /></View>
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
            <Pressable
              style={[s.sendWrap, (!canSend || busy) && { opacity: 0.38 }]}
              onPress={inviteEmail}
              disabled={busy || !canSend}
            >
              <LinearGradient
                colors={['#A8493A', '#8C3A2E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={s.sendBtn}
              >
                {/* a thin band of light across the top third, which is all
                    the gloss this needs */}
                <LinearGradient
                  colors={['rgba(255,255,255,0.30)', 'rgba(255,255,255,0)']}
                  style={s.sendSheen}
                  pointerEvents="none"
                />
                <Text style={s.sendT}>{busy ? '…' : 'Add'}</Text>
              </LinearGradient>
            </Pressable>
          </View>

          {status ? <Text style={s.status}>{status}</Text> : null}
        </Pressable>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: 24, color: colors.textPrimary },
  linkCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  // Frosted rather than solid. A block of accent red on a cream sheet
  // reads as an alert; these are invitations.
  linkIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(140,58,46,0.10)',
    alignItems: 'center', justifyContent: 'center',
  },
  linkT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: colors.textPrimary },
  linkX: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  or: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.lg },
  emailRow: { flexDirection: 'row', gap: spacing.sm },
  emailInput: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  // The gloss is a gradient, so the shadow belongs to the wrapper and the
  // rounding to both — a clipped child cannot cast one.
  sendWrap: {
    borderRadius: 12,
    shadowColor: '#3A1C16', shadowOpacity: 0.18, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  sendBtn: {
    borderRadius: 12, paddingHorizontal: spacing.xl,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    minHeight: 46,
  },
  sendSheen: { position: 'absolute', left: 0, right: 0, top: 0, height: 16 },
  sendT: { fontFamily: fonts.body, fontSize: 14, letterSpacing: 0.6, color: '#FFF' },
  status: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' },
});
