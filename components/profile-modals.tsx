import { useState } from 'react';
import { bump } from '@/lib/stats-store';
import { sendItem } from '@/lib/inbox';
import { ActivityIndicator, Linking, Modal, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { pr, ME, SEND_CATEGORIES, RECENT, WORD_BANK } from '@/constants/profile';
import { ARTICLES } from '@/constants/articles';
import { applyLanguage } from '@/lib/apply-language';
import { useLang, t as tset } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useIsAdmin } from '@/lib/admin';
import { ReminderRow } from '@/components/reminder-row';
import { FriendsSheet } from '@/components/friends-sheet';
import { InviteSheet } from '@/components/invite-sheet';
import { SETTINGS } from '@/constants/i18n/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { useNotifPrefs, setNotifPref } from '@/lib/notif-prefs';

function Sheet({ open, onClose, children }: any) {
  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={onClose}>
      <Pressable style={m.backdrop} onPress={onClose}>
        <Pressable style={m.sheet} onPress={() => {}}>
          <View style={m.grab} />
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ---------------- Settings ---------------- */

export function SettingsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [panel, setPanel] = useState<null | 'account' | 'language' | 'notifications' | 'help' | 'terms'>(null);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delPass, setDelPass] = useState('');
  const [delErr, setDelErr] = useState<string | null>(null);
  const [delBusy, setDelBusy] = useState(false);

  const doDelete = async () => {
    // Re-authenticate first. This proves it is really them and not
    // someone who picked up an unlocked phone, and it is the standard
    // pattern for a destructive, irreversible action.
    if (!delPass.trim()) { setDelErr('Enter your password to confirm.'); return; }
    setDelBusy(true);
    setDelErr(null);
    const { error: authErr } = await supabase.auth.signInWithPassword({
      email: user?.email ?? '',
      password: delPass,
    });
    if (authErr) {
      setDelBusy(false);
      setDelErr('That password is not right.');
      return;
    }
    try {
      await supabase.functions.invoke('delete-account');
      await AsyncStorage.clear();   // nothing of theirs stays on the device
      await signOut();
      onClose();
    } catch {}
    setDelBusy(false);
    setConfirmDel(false);
  };
  const { lang: curLang } = useLang();
  const { displayName, user, signOut, updateName, updateEmail, updatePhone } = useAuth();
  const phone = (user?.user_metadata?.phone as string) ?? '';
  const [editField, setEditField] = useState<null | 'name' | 'email' | 'phone'>(null);
  const [editVal, setEditVal] = useState('');
  const [editMsg, setEditMsg] = useState('');
  const [editBusy, setEditBusy] = useState(false);
  const startEdit = (f: 'name' | 'email' | 'phone', cur: string) => { setEditField(f); setEditVal(cur); setEditMsg(''); };
  const saveEdit = async () => {
    if (!editField) return;
    setEditBusy(true); setEditMsg('');
    const fn = editField === 'name' ? updateName : editField === 'email' ? updateEmail : updatePhone;
    const { error } = await fn(editVal.trim());
    setEditBusy(false);
    if (error) { setEditMsg(error); return; }
    setEditMsg(editField === 'email' ? 'Check your new email to confirm the change.' : 'Saved.');
    if (editField !== 'email') setTimeout(() => setEditField(null), 700);
  };
  const isAdmin = useIsAdmin();
  const [inviteOpen, setInviteOpen] = useState(false);
  const email = user?.email ?? '';
  // Categories, each independently switchable. 'learning' and 'idle' are
  // local scheduled notifications and work today; 'articles' and
  // 'friends' need real push, which needs a development build.
  const notif = useNotifPrefs();

  const close = () => { setPanel(null); onClose(); };

  const rows = [
    ...(isAdmin ? [{ key: 'admin', i: 'construct-outline', t: tset(SETTINGS.adminPanel), x: tset(SETTINGS.adminPanelX) }] : []),
    { key: 'friends', i: 'people-outline', t: tset(SETTINGS.inviteFriends), x: tset(SETTINGS.inviteFriendsX) },
    { key: 'account', i: 'person-outline', t: tset(SETTINGS.account), x: tset(SETTINGS.accountX) },
    { key: 'language', i: 'language-outline', t: tset(SETTINGS.language), x: { en: 'English', fa: 'فارسی' }[curLang] ?? 'English' },
    { key: 'notifications', i: 'notifications-outline', t: tset(SETTINGS.notifications), x: tset(SETTINGS.notificationsX) },
    { key: 'businesses', i: 'storefront-outline', t: 'Your businesses', x: 'List one, or manage what you have' },
    { key: 'help', i: 'help-circle-outline', t: tset(SETTINGS.help), x: tset(SETTINGS.helpX) },
    { key: 'terms', i: 'document-text-outline', t: tset(SETTINGS.terms), x: tset(SETTINGS.termsX) },
  ] as const;

  const Header = ({ title }: { title: string }) => (
    <View style={m.head}>
      {panel ? (
        <Pressable hitSlop={10} onPress={() => setPanel(null)}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
      ) : <View style={{ width: 22 }} />}
      <Text style={m.headT}>{title}</Text>
      <Pressable hitSlop={10} onPress={close}><Ionicons name="close" size={21} color={colors.textPrimary} /></Pressable>
    </View>
  );

  return (
    <Sheet open={open} onClose={close}>
      {panel === null ? (
        <>
          <Header title={tset(SETTINGS.settingsTitle)} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
            <View style={m.account}>
              <LinearGradient colors={[pr.goldA, pr.goldB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
              <View style={m.accAvatar}><Text style={m.accAvatarT}>{ME.persian[0]}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={m.accName}>{displayName}</Text>
                <Text style={m.accMail}>{email}</Text>
                <Text style={m.accSince}>Member since {ME.since}</Text>
              </View>
            </View>

            <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
              {rows.map((r) => (
                <Pressable key={r.key} style={m.row} onPress={() => { if (r.key === 'admin') { close(); router.navigate('/admin' as any); } else if (r.key === 'friends') { setInviteOpen(true); } else { setPanel(r.key as any); } }}>
                  <View style={m.rowIcon}><Ionicons name={r.i as any} size={16} color={colors.textPrimary} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={m.rowT}>{r.t}</Text>
                    <Text style={m.rowX}>{r.x}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={15} color={pr.dim} />
                </Pressable>
              ))}
            </View>

            <Pressable style={m.signOut} onPress={async () => { await signOut(); onClose(); }}><Ionicons name="log-out-outline" size={16} color={pr.readA} /><Text style={m.signOutT}>{tset(SETTINGS.signOut)}</Text></Pressable>
            <Text style={m.version}>ZAND  ·  Rooted Living</Text>
          </ScrollView>
        </>
      ) : null}

      {panel === 'account' ? (
        <>
          <Header title="Account" />
          <View style={{ paddingBottom: spacing.xxl }}>
            <Pressable style={m.field} onPress={() => startEdit('name', displayName)}>
              <Text style={m.fieldL}>{tset(SETTINGS.name)}</Text>
              <View style={m.fieldRow}><Text style={m.fieldV}>{displayName}</Text><Ionicons name="pencil-outline" size={14} color={pr.dim} /></View>
            </Pressable>
            <Pressable style={m.field} onPress={() => startEdit('email', email)}>
              <Text style={m.fieldL}>{tset(SETTINGS.email)}</Text>
              <View style={m.fieldRow}><Text style={m.fieldV}>{email}</Text><Ionicons name="pencil-outline" size={14} color={pr.dim} /></View>
            </Pressable>
            <Pressable style={m.field} onPress={() => startEdit('phone', phone)}>
              <Text style={m.fieldL}>{tset(SETTINGS.phone)}</Text>
              <View style={m.fieldRow}><Text style={m.fieldV}>{phone || 'Add your number'}</Text><Ionicons name="pencil-outline" size={14} color={pr.dim} /></View>
            </Pressable>
            <View style={m.field}><Text style={m.fieldL}>{tset(SETTINGS.memberSince)}</Text><Text style={m.fieldV}>{ME.since}</Text></View>

            {/* Deliberately quiet and at the bottom: findable by anyone
                looking for it, never hit by accident. Two taps, and the
                second one says exactly what goes. */}
            <Pressable
              style={m.danger}
              onPress={() => (confirmDel ? doDelete() : setConfirmDel(true))}
              disabled={delBusy}
            >
              {delBusy ? (
                <ActivityIndicator size="small" color={pr.readA} />
              ) : (
                <Text style={m.dangerT}>
                  {confirmDel
                    ? 'Tap again to permanently delete your account'
                    : tset(SETTINGS.deleteAccount)}
                </Text>
              )}
            </Pressable>
            {confirmDel && !delBusy ? (
              <>
                <Text style={m.dangerX}>
                  This removes your progress, saves, friends and messages. It cannot be undone.
                </Text>
                <TextInput
                  style={m.delInput}
                  value={delPass}
                  onChangeText={setDelPass}
                  placeholder="Your password"
                  placeholderTextColor={pr.dim}
                  secureTextEntry
                  autoCapitalize="none"
                />
                {delErr ? <Text style={m.delErr}>{delErr}</Text> : null}
                <Pressable onPress={() => setConfirmDel(false)} style={{ paddingVertical: 10 }}>
                  <Text style={m.dangerCancel}>Keep my account</Text>
                </Pressable>
              </>
            ) : null}

            {editField ? (
              <View style={m.editBox}>
                <Text style={m.editLabel}>{editField === 'name' ? 'Your name' : editField === 'email' ? 'New email' : 'Phone number'}</Text>
                <TextInput style={m.editInput} value={editVal} onChangeText={setEditVal}
                  autoCapitalize={editField === 'name' ? 'words' : 'none'}
                  keyboardType={editField === 'email' ? 'email-address' : editField === 'phone' ? 'phone-pad' : 'default'}
                  autoFocus placeholderTextColor={pr.dim} />
                {editMsg ? <Text style={m.editMsg}>{editMsg}</Text> : null}
                <View style={m.editBtns}>
                  <Pressable style={m.editCancel} onPress={() => setEditField(null)}><Text style={m.editCancelT}>{tset(SETTINGS.cancel)}</Text></Pressable>
                  <Pressable style={[m.editSave, editBusy && { opacity: 0.6 }]} onPress={saveEdit} disabled={editBusy}>
                    <Text style={m.editSaveT}>{editBusy ? 'Saving…' : 'Save'}</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
            <Text style={m.footNote}>Any questions about your information? Get in touch at contact@zand.com.</Text>
          </View>
        </>
      ) : null}

      {panel === 'language' ? (
        <>
          <Header title="Language" />
          <View style={{ paddingBottom: spacing.xxl }}>
            {[
              { code: 'en', label: 'English' },
              { code: 'fa', label: 'فارسی' },
            ].map((l) => {
              const on = curLang === l.code;
              return (
                <Pressable key={l.code} style={m.langRow} onPress={() => applyLanguage(l.code as any)}>
                  <Text style={[m.langT, on && { color: pr.goldA }]}>{l.label}</Text>
                  {on ? <Ionicons name="checkmark" size={18} color={pr.goldA} /> : null}
                </Pressable>
              );
            })}
          </View>
        </>
      ) : null}

      {panel === 'notifications' ? (
        <>
          <Header title="Notifications" />
          <View style={{ paddingBottom: spacing.xxl }}>
            <View style={{ marginBottom: spacing.lg }}><ReminderRow /></View>
            {[
              { k: 'learning', t: 'Language practice', x: 'A daily nudge to keep your streak' },
              { k: 'idle', t: 'Pick up where you left off', x: 'If you have not opened something in a few days' },
              { k: 'articles', t: 'Something new', x: 'When a new piece or topic goes up' },
              { k: 'friends', t: 'From friends', x: 'When someone sends you a word or topic' },
            ].map((n) => (
              <Pressable key={n.k} style={m.notifRow} onPress={() => setNotifPref(n.k as any, !(notif as any)[n.k])}>
                <View style={{ flex: 1 }}>
                  <Text style={m.rowT}>{n.t}</Text>
                  <Text style={m.rowX}>{n.x}</Text>
                </View>
                <View style={[m.toggle, (notif as any)[n.k] && m.toggleOn]}>
                  <View style={[m.knob, (notif as any)[n.k] && m.knobOn]} />
                </View>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {panel === 'help' ? (
        <>
          <Header title="Help centre" />
          <View style={{ paddingBottom: spacing.xxl }}>
            <Text style={m.helpLead}>We are a small team and we read everything.</Text>
            <Text style={m.helpBody}>For any question, a problem, an idea, or just to say hello, email us and we will get back to you.</Text>
            <Pressable style={m.mailBtn} onPress={() => Linking.openURL('mailto:contact@zand.com')}>
              <Ionicons name="mail-outline" size={17} color="#FFF" />
              <Text style={m.mailBtnT}>contact@zand.com</Text>
            </Pressable>
          </View>
        </>
      ) : null}

      {panel === 'terms' ? (
        <>
          <Header title="Terms and privacy" />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
            <Text style={m.termsH}>Your data</Text>
            <Text style={m.termsP}>ZAND keeps your progress, saved items, and preferences on your device. We do not sell your data.</Text>
            <Text style={m.termsH}>Content and credit</Text>
            <Text style={m.termsP}>Some articles draw on outside reporting, always credited with a link to the source. Historical and cultural content is written for ZAND.</Text>
            <Text style={m.termsH}>Using the app</Text>
            <Text style={m.termsP}>ZAND is here to help you learn and stay connected to Persian heritage. Please use it kindly.</Text>
            <Text style={m.footNote}>Questions about any of this? Email contact@zand.com.</Text>
          </ScrollView>
        </>
      ) : null}
      <InviteSheet open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </Sheet>
  );
}

/* ---------------- Add a friend ---------------- */

export function AddFriendSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');

  const share = async () => {
    try {
      await Share.share({
        message: 'Learn Persian with me on ZAND. Tap to add me: https://zand.app/add/nojan',
      });
    } catch {}
  };

  return (
    <Sheet open={open} onClose={onClose}>
      <View style={m.head}>
        <Text style={m.headT}>{tset(APP.addSomeone)}</Text>
        <Pressable hitSlop={10} onPress={onClose}>
          <Ionicons name="close" size={21} color={colors.textPrimary} />
        </Pressable>
      </View>

      <Text style={m.headX}>Send them a link, or find them by the email they signed up with.</Text>

      <Pressable style={m.bigOption} onPress={share}>
        <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <Ionicons name="link-outline" size={22} color={pr.friendA} />
        <View style={{ flex: 1 }}>
          <Text style={m.bigT}>Share your link</Text>
          <Text style={m.bigX}>They tap it, and you are connected. Nothing else to do.</Text>
        </View>
        <Ionicons name="arrow-forward" size={16} color={pr.friendA} />
      </Pressable>

      <Text style={m.or}>or</Text>

      <Pressable style={m.emailBox}>
        <Ionicons name="mail-outline" size={16} color={pr.dim} />
        <Text style={m.emailPh}>their email address</Text>
        <View style={m.emailBtn}><Text style={m.emailBtnT}>Find</Text></View>
      </Pressable>

      <Text style={m.footNote}>They must already have an account for this to work. If they do not, send the link instead.</Text>
    </Sheet>
  );
}

/* ---------------- Rename a friend ---------------- */

export function RenameSheet({ open, onClose, friend, onSave }: any) {
  const suggestions = ['Baba', 'Maman', 'Dadash', 'Khaleh', 'Amoo', 'Azizam'];
  return (
    <Sheet open={open} onClose={onClose}>
      <View style={m.head}>
        <Text style={m.headT}>What do you call them</Text>
        <Pressable hitSlop={10} onPress={onClose}>
          <Ionicons name="close" size={21} color={colors.textPrimary} />
        </Pressable>
      </View>
      <Text style={m.headX}>
        This is only for you. {friend?.name} will never see it, and it changes nothing on their side.
      </Text>

      <View style={m.emailBox}>
        <Ionicons name="pencil-outline" size={15} color={pr.dim} />
        <Text style={m.emailPh}>{friend?.name}</Text>
      </View>

      <Text style={[m.or, { marginTop: spacing.lg }]}>or pick one</Text>
      <View style={m.sugRow}>
        {suggestions.map((sug) => (
          <Pressable key={sug} style={m.sug} onPress={() => { onSave?.(sug); onClose(); }}>
            <Text style={m.sugT}>{sug}</Text>
          </Pressable>
        ))}
      </View>
    </Sheet>
  );
}

/* ---------------- Send something back ---------------- */

export function SendSheet({ open, onClose, to, toId }: { open: boolean; onClose: () => void; to: string; toId?: string }) {
  const { user } = useAuth();
  const [mode, setMode] = useState<'browse' | 'recent'>('browse');
  const [cat, setCat] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const articlesCat = {
    key: 'articles', label: 'Articles', icon: 'newspaper-outline', tint: '#8C6A3F', searchable: true,
    items: ARTICLES.map((a) => ({ key: a.key, title: a.title, tr: a.title, en: a.tag + '  ·  ' + a.readMins + ' min', sub: a.tag })),
  };
  const CATS = [articlesCat, ...SEND_CATEGORIES];
  const active = CATS.find((c) => c.key === cat);
  const needle = q.trim().toLowerCase();
  const hits = needle
    ? WORD_BANK.filter((w) => w.fa.includes(q.trim()) || w.tr.toLowerCase().includes(needle) || w.en.toLowerCase().includes(needle))
    : [];

  const deliver = (payload: { kind: string; item_key?: string; title?: string; fa?: string; tr?: string; en?: string }, label: string) => {
    setSent(label);
    bump('thingsSent');
    if (user?.id && toId) {
      sendItem({ sender: user.id, recipient: toId, ...payload }).catch(() => {});
    }
  };

  const close = () => { setCat(null); setSent(null); setMode('browse'); setQ(''); onClose(); };

  if (sent) {
    return (
      <Sheet open={open} onClose={close}>
        <View style={m.sentWrap}>
          <View style={m.sentTick}><Ionicons name="checkmark" size={26} color="#FFF" /></View>
          <Text style={m.sentT}>Sent to {to}</Text>
          <Text style={m.sentX}>{sent}</Text>
          <Text style={m.sentNote}>They will get a notification. Now it is their turn.</Text>
          <Pressable style={m.sentBtn} onPress={close}>
            <Text style={m.sentBtnT}>{tset(APP.done)}</Text>
          </Pressable>
        </View>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onClose={close}>
      <View style={m.head}>
        <Text style={m.headT}>Send to {to}</Text>
        <Pressable hitSlop={10} onPress={close}>
          <Ionicons name="close" size={21} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={m.modeRow}>
        {(['browse', 'recent'] as const).map((mo) => (
          <Pressable key={mo} style={[m.mode, mode === mo && m.modeOn]} onPress={() => { setMode(mo); setCat(null); }}>
            <Text style={[m.modeT, mode === mo && m.modeTOn]}>{mo === 'browse' ? 'Everything' : 'What you just read'}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        {mode === 'recent' ? (
          <View style={{ gap: spacing.sm }}>
            {RECENT.map((r) => (
              <Pressable key={r.key} style={m.pick} onPress={() => deliver({ kind: (r as any).fa ? 'word' : 'topic', item_key: r.key, title: r.title, fa: (r as any).fa, tr: (r as any).tr, en: (r as any).sub }, r.title)}>
                {r.fa ? <Text style={m.pickFa}>{r.fa}</Text> : <View style={m.pickIcon}><Ionicons name="time-outline" size={14} color={pr.dim} /></View>}
                <View style={{ flex: 1 }}>
                  <Text style={m.pickT}>{r.title}</Text>
                  <Text style={m.pickX}>{r.sub}</Text>
                </View>
                <Text style={m.pickWhen}>{r.when}</Text>
              </Pressable>
            ))}
          </View>
        ) : active ? (
          <>
            <Pressable style={m.back} onPress={() => { setCat(null); setQ(''); }}>
              <Ionicons name="chevron-back" size={15} color={pr.dim} />
              <Text style={m.backT}>{tset(SETTINGS.allCategories)}</Text>
            </Pressable>

            {active.searchable ? (
              <>
                <View style={m.search}>
                  <Ionicons name="search" size={14} color={pr.dim} />
                  <TextInput
                    value={q}
                    onChangeText={setQ}
                    placeholder="search in Persian or English"
                    placeholderTextColor={pr.dim}
                    style={m.searchIn}
                  />
                  {q ? (
                    <Pressable hitSlop={8} onPress={() => setQ('')}>
                      <Ionicons name="close-circle" size={15} color={pr.dim} />
                    </Pressable>
                  ) : null}
                </View>
                <Text style={m.searchNote}>
                  {q ? hits.length + ' of ' + WORD_BANK.length + ' words' : 'The ten people send most. Search for any of the ' + WORD_BANK.length + '.'}
                </Text>
              </>
            ) : null}
            <View style={{ gap: spacing.sm }}>
              {(active.searchable && q ? hits : active.items).map((it: any, i: number) => (
                <Pressable key={i} style={m.pick} onPress={() => deliver({ kind: active?.key === 'articles' ? 'article' : (it as any).fa ? 'word' : 'poet', item_key: (it as any).key, title: it.title, fa: (it as any).fa, tr: (it as any).tr, en: (it as any).en }, it.tr ?? it.title)}>
                  {(it.fa) ? <Text style={[m.pickFa, { color: active.tint }]}>{it.fa}</Text> : <View style={[m.pickIcon, { backgroundColor: active.tint + '18' }]}><Ionicons name={active.icon as any} size={14} color={active.tint} /></View>}
                  <View style={{ flex: 1 }}>
                    <Text style={m.pickT}>{it.tr ?? it.title}</Text>
                    <Text style={m.pickX}>{it.en ?? it.sub}</Text>
                  </View>
                  <Ionicons name="paper-plane-outline" size={14} color={active.tint} />
                </Pressable>
              ))}
              {active.searchable && q && hits.length === 0 ? (
                <Text style={m.noHits}>Nothing matches. Try the Persian or the English.</Text>
              ) : null}
            </View>
          </>
        ) : (
          <View style={m.catGrid}>
            {CATS.map((c) => (
              <Pressable key={c.key} style={m.cat} onPress={() => setCat(c.key)}>
                <LinearGradient colors={[c.tint + 'FF', c.tint + 'AA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
                <Ionicons name={c.icon as any} size={20} color="#FFF" />
                <Text style={m.catT}>{c.label}</Text>
                <Text style={m.catN}>{c.items.length}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </Sheet>
  );
}

const m = StyleSheet.create({
  field: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: pr.hair },
  fieldL: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: pr.dim },
  fieldV: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary, marginTop: 3 },
  langRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: pr.hair },
  langT: { fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary },
  notifRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: pr.hair },
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: pr.hair, padding: 3, justifyContent: 'center' },
  toggleOn: { backgroundColor: pr.streakA },
  knob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF' },
  knobOn: { alignSelf: 'flex-end' },
  helpLead: { fontFamily: fonts.heading, fontSize: 22, color: colors.textPrimary, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  helpBody: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: pr.dim, paddingHorizontal: spacing.lg, marginTop: spacing.sm },
  mailBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.textPrimary, borderRadius: 24, paddingVertical: spacing.md, marginHorizontal: spacing.lg, marginTop: spacing.xl },
  mailBtnT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },
  termsH: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  termsP: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21, color: pr.dim, paddingHorizontal: spacing.lg, marginTop: spacing.xs },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.lg, maxHeight: '88%' },
  grab: { width: 34, height: 4, borderRadius: 2, backgroundColor: pr.hair, alignSelf: 'center', marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  headT: { fontFamily: fonts.heading, fontSize: 26, color: colors.textPrimary },
  headX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 20, color: pr.dim, marginBottom: spacing.lg },

  account: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderRadius: 14, overflow: 'hidden' },
  accAvatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  accAvatarT: { fontFamily: fonts.persian, fontSize: 21, color: '#FFF' },
  accName: { fontFamily: fonts.heading, fontSize: 21, color: '#FFF' },
  accMail: { fontFamily: fonts.body, fontSize: 11.5, color: 'rgba(255,255,255,0.9)' },
  accSince: { fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 1 },

  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 11, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  rowIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(36,28,25,0.05)', alignItems: 'center', justifyContent: 'center' },
  rowT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary },
  rowX: { fontFamily: fonts.body, fontSize: 10.5, color: pr.dim },

  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  editBox: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginTop: spacing.md },
  editLabel: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: pr.dim, marginBottom: 6 },
  editInput: { fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 6 },
  editMsg: { fontFamily: fonts.body, fontSize: 12, color: pr.friendA, marginTop: spacing.sm },
  editBtns: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.sm, marginTop: spacing.md },
  editCancel: { paddingVertical: 8, paddingHorizontal: spacing.md },
  editCancelT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: pr.dim },
  editSave: { backgroundColor: colors.accent, borderRadius: 16, paddingVertical: 8, paddingHorizontal: spacing.lg },
  editSaveT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#FFF' },
  delInput: { fontFamily: fonts.body, fontSize: 13.5, color: pr.ink, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 11, paddingHorizontal: spacing.md, paddingVertical: 11, marginTop: spacing.md, marginHorizontal: spacing.lg },
  delErr: { fontFamily: fonts.body, fontSize: 11.5, color: '#B3261E', textAlign: 'center', marginTop: 6 },
  danger: { alignItems: 'center', paddingVertical: spacing.lg, marginTop: spacing.md },
  dangerT: { fontFamily: fonts.body, fontSize: 12.5, color: '#B3261E' },
  dangerX: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: pr.dim, textAlign: 'center', paddingHorizontal: spacing.lg },
  dangerCancel: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: pr.readA, textAlign: 'center' },
  signOut: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: pr.hair, borderRadius: 11, paddingVertical: spacing.md, marginTop: spacing.lg },
  signOutT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: pr.readA },
  version: { fontFamily: fonts.body, fontSize: 10, color: pr.dim, textAlign: 'center', marginTop: spacing.lg },

  bigOption: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderRadius: 14, overflow: 'hidden' },
  bigT: { fontFamily: fonts.heading, fontSize: 19, color: '#241C19' },
  bigX: { fontFamily: fonts.body, fontSize: 11, lineHeight: 16, color: 'rgba(36,28,25,0.65)', marginTop: 1 },
  or: { fontFamily: fonts.body, fontSize: 11, color: pr.dim, textAlign: 'center', marginVertical: spacing.md },
  emailBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: pr.hair, borderRadius: 11, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  emailPh: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: pr.dim },
  emailBtn: { backgroundColor: colors.textPrimary, borderRadius: 16, paddingHorizontal: spacing.md, paddingVertical: 5 },
  emailBtnT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.surface },
  footNote: { fontFamily: fonts.body, fontSize: 10.5, lineHeight: 17, color: pr.dim, marginTop: spacing.lg, textAlign: 'center' },

  modeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  mode: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 9, borderWidth: 1, borderColor: pr.hair },
  modeOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  modeT: { fontFamily: fonts.bodyStrong, fontSize: 11.5, color: pr.dim },
  modeTOn: { color: colors.surface },

  search: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: pr.hair, borderRadius: 10, paddingHorizontal: spacing.md, paddingVertical: 7, marginBottom: 6 },
  searchIn: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary, padding: 0 },
  searchNote: { fontFamily: fonts.body, fontSize: 10, color: pr.dim, marginBottom: spacing.md },
  noHits: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, textAlign: 'center', paddingVertical: spacing.xl, fontStyle: 'italic' },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  cat: { width: '47%', height: 92, borderRadius: 13, overflow: 'hidden', padding: spacing.md, justifyContent: 'space-between' },
  catT: { fontFamily: fonts.heading, fontSize: 19, color: '#FFF' },
  catN: { position: 'absolute', top: spacing.md, right: spacing.md, fontFamily: fonts.bodyStrong, fontSize: 10, color: 'rgba(255,255,255,0.75)' },

  back: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: spacing.md },
  backT: { fontFamily: fonts.bodyStrong, fontSize: 11.5, color: pr.dim },
  pick: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 11, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  pickFa: { fontFamily: fonts.persian, fontSize: 19, color: pr.friendA, minWidth: 34, textAlign: 'center' },
  pickIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(36,28,25,0.05)', alignItems: 'center', justifyContent: 'center' },
  pickT: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  pickX: { fontFamily: fonts.body, fontSize: 10.5, color: pr.dim },
  pickWhen: { fontFamily: fonts.body, fontSize: 9.5, color: pr.dim },

  sugRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  sug: { borderWidth: 1, borderColor: pr.hair, borderRadius: 20, paddingHorizontal: spacing.md, paddingVertical: 7 },
  sugT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: colors.textPrimary },
  sentWrap: { alignItems: 'center', paddingVertical: spacing.xxl },
  sentTick: { width: 58, height: 58, borderRadius: 29, backgroundColor: pr.streakA, alignItems: 'center', justifyContent: 'center' },
  sentT: { fontFamily: fonts.heading, fontSize: 25, color: colors.textPrimary, marginTop: spacing.lg },
  sentX: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: pr.friendA, marginTop: 2, fontStyle: 'italic' },
  sentNote: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, marginTop: spacing.md, textAlign: 'center' },
  sentBtn: { backgroundColor: colors.textPrimary, borderRadius: 22, paddingVertical: 10, paddingHorizontal: spacing.xxl, marginTop: spacing.xl },
  sentBtnT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.surface },
});
