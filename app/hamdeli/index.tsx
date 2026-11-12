// Hand in Hand.
//
// Dressed in Nowruz's clothes: the warm wash at the top, the Persian word
// large and gold, a short gold rule under the title, the line that
// matters set in italic, and small diamonds for markers. The page itself
// stays on the app's paper, so it feels warm without feeling like a
// different app.
//
// The list is read from the database, so a shelter that closes stops
// being listed the same afternoon instead of at the next release.

import { useCallback } from 'react';
import {
  ActivityIndicator, Image, Pressable, RefreshControl, ScrollView,
  StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { HamdeliReelWall } from '@/components/hamdeli-reel-wall';
import { t, useLang, getLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';
import { HAMDELI } from '@/constants/i18n/hamdeli';
import { useHamdeli, coverUrl, HH, type Hamdeli } from '@/lib/hamdeli';

function Diamond({ color = HH.gold, size = 7 }: { color?: string; size?: number }) {
  return <View style={{ width: size, height: size, backgroundColor: color, transform: [{ rotate: '45deg' }] }} />;
}

/** A round photo with a fine gold ring, the way Nowruz frames things. */
function Portrait({ path, size }: { path?: string | null; size: number }) {
  const url = coverUrl(path);
  const inner = size - 6;
  return (
    <View style={[s.ring, { width: size, height: size, borderRadius: size / 2 }]}>
      {url
        ? <Image source={{ uri: url }} style={{ width: inner, height: inner, borderRadius: inner / 2 }} resizeMode="cover" />
        : (
          <View style={[s.portraitEmpty, { width: inner, height: inner, borderRadius: inner / 2 }]}>
            <Ionicons name="heart-outline" size={inner * 0.36} color={HH.rose} />
          </View>
        )}
    </View>
  );
}

function Card({ r }: { r: Hamdeli }) {
  useLang();
  const fa = getLang() === 'fa';
  const name = (fa && r.name_fa) || r.name;
  const nameOther = fa ? r.name : r.name_fa;
  const city = (fa && r.city_fa) || r.city;
  const blurb = (fa && r.blurb_fa) || r.blurb;

  return (
    <Pressable style={s.card} onPress={() => router.navigate(('/hamdeli/profile?slug=' + r.slug) as any)}>
      <View style={[s.cardRow, fa && s.cardRowFa]}>
        <Portrait path={r.cover} size={60} />
        <View style={{ flex: 1 }}>
          <View style={[s.nameRow, fa && s.nameRowFa]}>
            <Text style={[s.name, fa && s.nameFa]} numberOfLines={1}>{name}</Text>
            {nameOther ? <Text style={[s.other, fa && s.otherFa]} numberOfLines={1}>{nameOther}</Text> : null}
          </View>
          {city ? <Text style={[s.city, fa && s.cityFa]}>{city}</Text> : null}
        </View>
        <Ionicons name={fa ? 'chevron-back' : 'chevron-forward'} size={15} color={HH.gold} />
      </View>
      <Text style={[s.blurb, fa && s.blurbFa]} numberOfLines={3}>{blurb}</Text>
    </Pressable>
  );
}

export default function HamdeliList() {
  useLang();
  const fa = getLang() === 'fa';
  const { rows, busy, refresh } = useHamdeli();

  // The database already hides unpublished rows from everyone but an
  // admin. Filtering again is for the admin's benefit: a draft should
  // not sit in the real list while it is still being written.
  const live = rows.filter((r) => r.published);
  const onRefresh = useCallback(() => { refresh(); }, [refresh]);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={busy} onRefresh={onRefresh} tintColor={HH.textDim} />}
      >
        <View style={s.headWrap}>
          <LinearGradient
            colors={[HH.fade[0], HH.fade[1], colors.background]}
            locations={[0, 0.5, 1]}
            style={s.headFade}
            pointerEvents="none"
          />
          <Pressable style={s.backBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
            <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={20} color={HH.textDim} />
            <Text style={s.backBtnText}>{t(APP.explore)}</Text>
          </Pressable>

          <View style={s.head}>
            <Text style={s.glyph}>همدلی</Text>
            {!fa ? <Text style={s.title}>{t(HAMDELI.title)}</Text> : null}
            <View style={s.rule} />
            <Text style={[s.sub, fa && s.subFa]}>{t(HAMDELI.sub)}</Text>
          </View>
        </View>

        <View style={s.body}>
          <Text style={[s.intro, fa && s.introFa]}>{t(HAMDELI.intro)}</Text>

          <View style={s.leadWrap}>
            <View style={s.leadRule} />
            <Text style={[s.lead, fa && s.leadFa]}>{t(HAMDELI.anything)}</Text>
            <View style={s.leadRule} />
          </View>

          {busy && live.length === 0 ? (
            <ActivityIndicator color={HH.textDim} style={{ marginTop: spacing.xl }} />
          ) : live.length === 0 ? (
            <Text style={[s.intro, fa && s.introFa, { textAlign: 'center' }]}>{t(HAMDELI.empty)}</Text>
          ) : (
            <View style={s.list}>
              {live.map((r) => <Card key={r.id} r={r} />)}
            </View>
          )}

          <HamdeliReelWall rows={live} />

          {/* Nowruz closes on a gold line, the word, and a diamond. */}
          <View style={s.close}>
            <View style={s.closeRule} />
            <Text style={s.closeGlyph}>همدلی</Text>
            <Diamond size={6} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { paddingBottom: 96 },

  headWrap: { position: 'relative', paddingHorizontal: spacing.lg },
  headFade: { position: 'absolute', left: 0, right: 0, top: 0, height: 280 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: 15, color: HH.textDim },

  head: { alignItems: 'center', paddingTop: spacing.lg, paddingBottom: spacing.xl },
  glyph: { fontFamily: fonts.persian, fontSize: 44, lineHeight: 68, color: HH.gold },
  title: { fontFamily: fonts.heading, fontSize: 32, color: HH.text, marginTop: -2 },
  rule: { width: 34, height: 1, backgroundColor: HH.gold, opacity: 0.7, marginVertical: spacing.md },
  sub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: HH.textDim, textAlign: 'center', maxWidth: 300 },
  subFa: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 26, writingDirection: 'rtl' },

  body: { paddingHorizontal: spacing.lg },
  intro: { fontFamily: fonts.body, fontSize: 14, lineHeight: 24, color: HH.text },
  introFa: { fontFamily: fonts.persian, fontSize: 14.5, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' },

  leadWrap: { alignItems: 'center', marginVertical: spacing.xl },
  leadRule: { width: 36, height: 1, backgroundColor: HH.gold, opacity: 0.7 },
  lead: { fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 22, lineHeight: 30, color: HH.text, textAlign: 'center', marginVertical: spacing.md },
  leadFa: { fontFamily: fonts.persian, fontStyle: 'normal', fontSize: 17, lineHeight: 30 },

  list: { gap: spacing.md },

  card: { backgroundColor: HH.surface, borderRadius: 16, borderWidth: 1, borderColor: HH.hair, padding: spacing.lg },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  cardRowFa: { flexDirection: 'row-reverse' },
  ring: { borderWidth: 1.5, borderColor: HH.gold, alignItems: 'center', justifyContent: 'center', backgroundColor: HH.surface },
  portraitEmpty: { backgroundColor: HH.roseSoft, alignItems: 'center', justifyContent: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  nameRowFa: { flexDirection: 'row-reverse' },
  name: { fontFamily: fonts.heading, fontSize: 21, color: HH.text, flexShrink: 1 },
  nameFa: { fontFamily: fonts.persian, fontSize: 16 },
  other: { fontFamily: fonts.persian, fontSize: 13, color: HH.rose, flexShrink: 1 },
  otherFa: { fontFamily: fonts.body, fontSize: 12 },
  city: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: HH.gold, marginTop: 4, textTransform: 'uppercase' },
  cityFa: { fontFamily: fonts.persian, fontSize: 11, letterSpacing: 0, textAlign: 'right' },
  blurb: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 20, color: HH.textDim, marginTop: spacing.md },
  blurbFa: { fontFamily: fonts.persian, fontSize: 13, lineHeight: 26, textAlign: 'right', writingDirection: 'rtl' },

  close: { alignItems: 'center', marginTop: spacing.xxl },
  closeRule: { width: 1, height: 36, backgroundColor: HH.gold, opacity: 0.5 },
  closeGlyph: { fontFamily: fonts.persian, fontSize: 26, color: HH.gold, marginVertical: spacing.md },
});
