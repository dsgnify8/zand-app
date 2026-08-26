// Filing a saved listing.
//
// Tapping the bookmark saves, with nothing in the way — that is the common
// act and it should cost one tap and no decisions. Holding it opens this,
// which is the uncommon act and can afford a moment.
//
// Dismissing leaves the listing saved and unfiled, which is where most
// saves belong. Nothing here can lose a save.

import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Easing,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useAuth } from '@/lib/auth';
import {
  addToCollection, collectionsFor, createCollection, loadCollections,
  removeFromCollection, type Collection,
} from '@/lib/collections';
import { loadBusiness } from '@/lib/businesses';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';
import { eduImage } from '@/constants/education-images';
import { getLang, t } from '@/lib/i18n';
import { LOCAL } from '@/constants/i18n/local';

const bizImage = (path: string) =>
  isBundled(path) ? eduImage(bundledKey(path)) : { uri: photoUrl(path) };

export function CollectionSheet({
  businessId,
  open,
  onClose,
}: {
  businessId: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const fa = getLang() === 'fa';
  const { user } = useAuth();

  const [cols, setCols] = useState<Collection[]>([]);
  const [inCols, setInCols] = useState<string[]>([]);
  const [covers, setCovers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState('');

  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) rise.setValue(0);
    Animated.timing(rise, {
      toValue: open ? 1 : 0,
      duration: open ? 260 : 160,
      easing: open ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [open]);

  const refresh = async () => {
    if (!user?.id || !businessId) return;
    setLoading(true);
    const [list, mine] = await Promise.all([
      loadCollections(user.id),
      collectionsFor(businessId),
    ]);
    setCols(list);
    setInCols(mine);

    // One cover per collection, from the first listing put in it.
    const m: Record<string, any> = {};
    await Promise.all(list.map(async (c) => {
      if (!c.cover_business_id) return;
      const biz = await loadBusiness(c.cover_business_id);
      const shot = (biz?.photos ?? [])[0];
      if (shot) m[c.id] = bizImage(shot);
    }));
    setCovers(m);
    setLoading(false);
  };

  useEffect(() => { if (open) refresh(); }, [open, businessId, user?.id]);

  if (!open || !businessId) return null;

  const toggle = async (c: Collection) => {
    const on = inCols.includes(c.id);
    setInCols((v) => (on ? v.filter((x) => x !== c.id) : [...v, c.id]));
    if (on) {
      await removeFromCollection(c.id, businessId);
    } else {
      await addToCollection(c.id, businessId);
      // Filing it is the whole errand. Staying open would make someone
      // dismiss a thing that has already finished.
    }
    onClose();
  };

  const make = async () => {
    if (!user?.id || !name.trim()) return;
    const { data } = await createCollection(user.id, name);
    setName('');
    setNaming(false);
    // Close whatever happened. Leaving the sheet up on a failure told
    // people nothing except that the button did not work.
    if (data) {
      await addToCollection(data.id, businessId);
      // Naming a folder and putting the listing in it is the whole errand.
      // Leaving the sheet up afterwards makes someone dismiss a thing that
      // has already finished.
      onClose();
    }
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={st.wrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View
          style={[
            st.sheet,
            { transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [320, 0] }) }] },
          ]}
        >
          <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, st.veil]} />

          <View style={st.grab} />

          <View style={[st.head, fa && { flexDirection: 'row-reverse' }]}>
            <Text style={st.headT}>{t(LOCAL.saveTo)}</Text>
            <Pressable hitSlop={10} onPress={onClose}>
              <Ionicons name="close" size={20} color={colors.textPrimary} />
            </Pressable>
          </View>

          {!user?.id ? (
            <View style={st.signedOut}>
              <Ionicons name="bookmark" size={20} color={colors.accent} />
              <Text style={[st.signedOutT, fa && st.rtl]}>{t(LOCAL.savedNoAccount)}</Text>
              <Text style={[st.signedOutX, fa && st.rtl]}>{t(LOCAL.foldersNeedAccount)}</Text>
              <Pressable
                style={st.signIn}
                onPress={() => { onClose(); router.navigate('/onboarding?step=2' as any); }}
              >
                <Text style={st.signInT}>{t(LOCAL.signIn)}</Text>
              </Pressable>
            </View>
          ) : loading ? (
            <ActivityIndicator style={{ marginVertical: spacing.xl }} color={colors.accent} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.lg }}>
              {naming ? (
                <View style={[st.row, fa && { flexDirection: 'row-reverse' }]}>
                  <View style={[st.thumb, st.thumbNew]}>
                    <Ionicons name="folder-outline" size={18} color={colors.accent} />
                  </View>
                  <TextInput
                    style={[st.input, fa && st.rtl]}
                    value={name}
                    onChangeText={setName}
                    placeholder={t(LOCAL.folderName)}
                    placeholderTextColor={colors.textSecondary}
                    autoFocus
                    onSubmitEditing={make}
                    returnKeyType="done"
                  />
                  <Pressable hitSlop={8} onPress={make}>
                    <Ionicons name="checkmark" size={20} color={colors.accent} />
                  </Pressable>
                </View>
              ) : (
                <Pressable style={[st.row, fa && { flexDirection: 'row-reverse' }]} onPress={() => setNaming(true)}>
                  <View style={[st.thumb, st.thumbNew]}>
                    <Ionicons name="add" size={20} color={colors.accent} />
                  </View>
                  <Text style={[st.rowT, { flex: 1 }, fa && st.rtl]}>{t(LOCAL.newFolder)}</Text>
                </Pressable>
              )}

              {cols.map((c) => {
                const on = inCols.includes(c.id);
                return (
                  <Pressable
                    key={c.id}
                    style={[st.row, fa && { flexDirection: 'row-reverse' }]}
                    onPress={() => toggle(c)}
                  >
                    <View style={st.thumb}>
                      {covers[c.id] ? (
                        <Image source={covers[c.id]} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                      ) : (
                        <View style={[StyleSheet.absoluteFill as any, st.thumbBlank]}>
                          <Ionicons name="folder-outline" size={16} color={colors.textSecondary} />
                        </View>
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[st.rowT, fa && st.rtl]} numberOfLines={1}>{c.name}</Text>
                      <Text style={[st.rowX, fa && st.rtl]}>
                        {c.count ?? 0} {t((c.count ?? 0) === 1 ? LOCAL.place : LOCAL.places)}
                      </Text>
                    </View>
                    <Ionicons
                      name={on ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={on ? colors.accent : 'rgba(40,28,24,0.22)'}
                    />
                  </Pressable>
                );
              })}

              <Text style={[st.foot, fa && st.rtl]}>{t(LOCAL.savedAnyway)}</Text>
            </ScrollView>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: 'rgba(16,13,12,0.22)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    maxHeight: '70%',
  },
  veil: { backgroundColor: 'rgba(250,247,243,0.34)' },
  grab: {
    width: 34, height: 3.5, borderRadius: 2,
    backgroundColor: 'rgba(40,28,24,0.20)',
    alignSelf: 'center', marginBottom: spacing.md,
  },

  head: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  // The body face here: this is an instruction, not a title, and the
  // serif makes a two-word prompt look like a chapter heading.
  headT: { fontFamily: fonts.body, fontSize: 16, letterSpacing: 0.2, color: colors.textPrimary },

  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 9 },
  thumb: { width: 46, height: 46, borderRadius: 11, overflow: 'hidden', backgroundColor: 'rgba(40,28,24,0.06)' },
  thumbBlank: { alignItems: 'center', justifyContent: 'center' },
  thumbNew: {
    alignItems: 'center', justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(40,28,24,0.20)',
    backgroundColor: 'transparent',
  },
  rowT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, color: colors.textPrimary },
  rowX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },

  input: {
    flex: 1, fontFamily: fonts.body, fontSize: 14.5, color: colors.textPrimary,
    paddingVertical: 4,
  },

  foot: {
    fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary,
    textAlign: 'center', marginTop: spacing.lg,
  },
  rtl: { writingDirection: 'rtl', textAlign: 'right' },
  signedOut: { alignItems: 'center', gap: 6, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg },
  signedOutT: { fontFamily: fonts.bodyStrong, fontSize: 15, color: colors.textPrimary, marginTop: 4 },
  signedOutX: {
    fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19,
    color: colors.textSecondary, textAlign: 'center',
  },
  signIn: {
    backgroundColor: colors.textPrimary, borderRadius: 999,
    paddingHorizontal: spacing.xl, paddingVertical: 10, marginTop: spacing.md,
  },
  signInT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#FFF' },
});
