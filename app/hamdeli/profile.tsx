// One Hand in Hand profile, in Nowruz's clothes: a warm wash at the top,
// the portrait in a fine gold ring, gold rules and small diamonds, and
// the line that says what helps set in italic on a rose bar.
//
// The page ends in links out, which is the point: ZAND is an
// introduction, not an intermediary. Instagram opens Instagram, a
// fundraiser opens the fundraiser in a browser, and no money or message
// passes through here.

import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Image, Linking, Platform, Pressable, ScrollView, Share,
  StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { VideoCard } from '@/components/video-card';
import { t, useLang, getLang } from '@/lib/i18n';
import { HAMDELI } from '@/constants/i18n/hamdeli';
import {
  loadHamdeli, hamdeliBySlug, coverUrl, instagramUrl, webUrl,
  HH, type Hamdeli, type Reel,
} from '@/lib/hamdeli';

function Diamond({ color = HH.gold, size = 7 }: { color?: string; size?: number }) {
  return <View style={{ width: size, height: size, backgroundColor: color, transform: [{ rotate: '45deg' }] }} />;
}

/** Nowruz's chapter head: a diamond, a gold eyebrow, nothing louder. */
function Chapter({ label, note }: { label: string; note?: string }) {
  const fa = getLang() === 'fa';
  return (
    <View style={s.chapter}>
      <Diamond color={HH.rose} />
      <Text style={[s.eyebrow, fa && s.eyebrowFa]}>{label}</Text>
      {note ? <Text style={[s.chNote, fa && s.chNoteFa]}>{note}</Text> : null}
    </View>
  );
}

function LinkCard({ icon, label, url }: { icon: any; label: string; url: string }) {
  const fa = getLang() === 'fa';
  return (
    <Pressable style={[s.link, fa && s.linkFa]} onPress={() => Linking.openURL(url).catch(() => {})}>
      <View style={s.linkIcon}><Ionicons name={icon} size={16} color={HH.rose} /></View>
      <Text style={[s.linkText, fa && s.linkTextFa]}>{label}</Text>
      <View style={{ flex: 1 }} />
      <Ionicons name="open-outline" size={15} color={HH.gold} />
    </Pressable>
  );
}

/**
 * One Instagram video, as a tall tile that opens the reel itself. Not
 * played here on purpose: a view inside ZAND counts for nothing on their
 * account, and a tap that lands on their reel is where a reader can
 * follow, comment and pass it on.
 */
function ReelTile({ reel }: { reel: Reel }) {
  const fa = getLang() === 'fa';
  const url = coverUrl(reel.cover);
  return (
    <Pressable style={s.reel} onPress={() => Linking.openURL(reel.url).catch(() => {})}>
      {url ? <Image source={{ uri: url }} style={StyleSheet.absoluteFill as any} resizeMode="cover" /> : null}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.55)']}
        start={{ x: 0, y: 0.55 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill as any}
        pointerEvents="none"
      />
      <View style={s.reelPlay}><Ionicons name="play" size={18} color="#FFF" style={{ marginLeft: 2 }} /></View>
      <View style={[s.reelFoot, fa && s.reelFootFa]}>
        <Ionicons name="logo-instagram" size={13} color="#FFF" />
        <Text style={[s.reelFootT, fa && s.reelFootTFa]}>{t(HAMDELI.openIg)}</Text>
      </View>
    </Pressable>
  );
}

export default function HamdeliProfile() {
  useLang();
  const fa = getLang() === 'fa';
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const [row, setRow] = useState<Hamdeli | null>(slug ? hamdeliBySlug(slug) : null);
  const [busy, setBusy] = useState(!row);

  // Arriving here directly, from a cold start or a shared link, means the
  // list has never run. Load before deciding there is nothing to show.
  useEffect(() => {
    if (row || !slug) { setBusy(false); return; }
    loadHamdeli().then(() => { setRow(hamdeliBySlug(slug)); setBusy(false); });
  }, [slug]);

  const back = () => (router.canGoBack() ? router.back() : router.replace('/hamdeli' as any));
  const BackBtn = (
    <Pressable style={s.backBtn} onPress={back}>
      <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={20} color={HH.textDim} />
      <Text style={s.backBtnText}>{t(HAMDELI.title)}</Text>
    </Pressable>
  );

  if (busy || !row) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <ZandHeader />
        <View style={s.body}>
          {BackBtn}
          {busy
            ? <ActivityIndicator color={HH.textDim} style={{ marginTop: spacing.xl }} />
            : <Text style={s.story}>{t(HAMDELI.empty)}</Text>}
        </View>
      </SafeAreaView>
    );
  }

  const url = coverUrl(row.cover);
  const name = (fa && row.name_fa) || row.name;
  const nameOther = fa ? row.name : row.name_fa;
  const city = (fa && row.city_fa) || row.city;
  const story = (fa && row.story_fa) || row.story;
  const need = (fa && row.need_fa) || row.need;
  const blurb = (fa && row.blurb_fa) || row.blurb;

  const ig = instagramUrl(row.instagram);
  const site = webUrl(row.website);
  const donate = webUrl(row.donate_url);
  const videos = (row.youtube_ids ?? []).filter(Boolean);
  const reels = (row.reels ?? []).filter((r) => r?.url);

  // What gets shared is their link, not a link back into ZAND. A reader
  // forwarding this should land their friend on the shelter's own page,
  // which is the whole point of the section.
  const onShare = async () => {
    const out = ig ?? site ?? donate;
    if (!out) return;
    // The link goes in once. Given it both inside the text and as the
    // url, iOS passes both along and Instagram draws a card for each.
    // Android ignores the url field, so there it has to live in the text.
    try {
      await Share.share(
        Platform.OS === 'ios'
          ? { message: `${name}\n\n${blurb}`, url: out }
          : { message: `${name}\n\n${blurb}\n\n${out}` },
      );
    } catch {}
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={s.scroll} contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        <View style={s.headWrap}>
          <LinearGradient
            colors={[HH.fade[0], HH.fade[1], colors.background]}
            locations={[0, 0.55, 1]}
            style={s.headFade}
            pointerEvents="none"
          />
          {BackBtn}
          <View style={s.head}>
            <View style={s.ring}>
              {url
                ? <Image source={{ uri: url }} style={s.portrait} resizeMode="cover" />
                : <View style={[s.portrait, s.portraitEmpty]}><Ionicons name="heart-outline" size={34} color={HH.rose} /></View>}
            </View>
            <Text style={[s.name, fa && s.nameFa]}>{name}</Text>
            {nameOther ? <Text style={[s.other, fa && s.otherFa]}>{nameOther}</Text> : null}
            <View style={s.rule} />
            {city ? <Text style={[s.city, fa && s.cityFa]}>{city}</Text> : null}
          </View>
        </View>

        <View style={s.body}>
          <Text style={[s.story, fa && s.storyFa]}>{story || blurb}</Text>

          {need ? (
            <>
              <Chapter label={t(HAMDELI.whatHelps)} />
              <View style={[s.mark, fa && s.markFa]}>
                <View style={s.markBar} />
                <Text style={[s.markText, fa && s.markTextFa]}>{need}</Text>
              </View>
            </>
          ) : null}

          {(reels.length || videos.length) ? (
            <>
              <Chapter label={t(HAMDELI.watch)} note={reels.length ? t(HAMDELI.opensIg) : undefined} />
              {reels.length ? (
                <View style={[s.reels, fa && s.reelsFa]}>
                  {reels.map((r) => <ReelTile key={r.url} reel={r} />)}
                </View>
              ) : null}
              {videos.length ? (
                <View style={[s.videos, reels.length ? { marginTop: spacing.md } : null]}>
                  {videos.map((id) => <VideoCard key={id} id={id} />)}
                </View>
              ) : null}
            </>
          ) : null}

          {(ig || site || donate) ? (
            <>
              <Chapter label={fa ? 'پیدایشان کن' : 'Find them'} />
              <View style={s.links}>
                {ig ? <LinkCard icon="logo-instagram" label={t(HAMDELI.openIg)} url={ig} /> : null}
                {site ? <LinkCard icon="globe-outline" label={t(HAMDELI.openWeb)} url={site} /> : null}
                {donate ? <LinkCard icon="heart-outline" label={t(HAMDELI.donate)} url={donate} /> : null}
              </View>
              {donate ? <Text style={[s.note, fa && s.noteFa]}>{t(HAMDELI.donateNote)}</Text> : null}

              <Pressable style={s.share} onPress={onShare}>
                <Text style={[s.shareText, fa && s.shareTextFa]}>{t(HAMDELI.share)}</Text>
                <View style={s.shareGo}>
                  <Ionicons name={fa ? 'arrow-back' : 'arrow-forward'} size={15} color="#FFF" />
                </View>
              </Pressable>
            </>
          ) : null}

          <View style={s.close}>
            <View style={s.closeRule} />
            <Text style={[s.closeLine, fa && s.closeLineFa]}>{t(HAMDELI.anything)}</Text>
            <Diamond size={6} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PORTRAIT = 112;

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { paddingBottom: 96 },

  headWrap: { position: 'relative', paddingHorizontal: spacing.lg },
  headFade: { position: 'absolute', left: 0, right: 0, top: 0, height: 300 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: 15, color: HH.textDim },

  head: { alignItems: 'center', paddingTop: spacing.lg, paddingBottom: spacing.lg },
  ring: { width: PORTRAIT + 8, height: PORTRAIT + 8, borderRadius: (PORTRAIT + 8) / 2, borderWidth: 1.5, borderColor: HH.gold, alignItems: 'center', justifyContent: 'center', backgroundColor: HH.surface },
  portrait: { width: PORTRAIT, height: PORTRAIT, borderRadius: PORTRAIT / 2 },
  portraitEmpty: { backgroundColor: HH.roseSoft, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.heading, fontSize: 30, lineHeight: 36, color: HH.text, marginTop: spacing.md, textAlign: 'center' },
  nameFa: { fontFamily: fonts.persian, fontSize: 24, lineHeight: 40 },
  other: { fontFamily: fonts.persian, fontSize: 15, color: HH.rose, marginTop: 2 },
  otherFa: { fontFamily: fonts.body, fontSize: 13 },
  rule: { width: 34, height: 1, backgroundColor: HH.gold, opacity: 0.7, marginVertical: spacing.md },
  city: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2.5, color: HH.gold, textTransform: 'uppercase' },
  cityFa: { fontFamily: fonts.persian, fontSize: 12, letterSpacing: 0 },

  body: { paddingHorizontal: spacing.lg },
  story: { fontFamily: fonts.body, fontSize: 15, lineHeight: 26, color: HH.text, marginTop: spacing.md },
  storyFa: { fontFamily: fonts.persian, fontSize: 15, lineHeight: 32, textAlign: 'right', writingDirection: 'rtl' },

  chapter: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.lg },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: HH.gold, marginTop: spacing.md, textTransform: 'uppercase' },
  eyebrowFa: { fontFamily: fonts.persian, fontSize: 13, letterSpacing: 0, textTransform: 'none' },
  chNote: { fontFamily: fonts.body, fontStyle: 'italic', fontSize: 11.5, color: HH.textDim, marginTop: 4 },
  chNoteFa: { fontFamily: fonts.persian, fontStyle: 'normal', fontSize: 12 },

  // Nowruz's mark: a bar and an italic line.
  mark: { flexDirection: 'row' },
  markFa: { flexDirection: 'row-reverse' },
  markBar: { width: 3, borderRadius: 2, backgroundColor: HH.rose, marginHorizontal: spacing.md },
  markText: { flex: 1, fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 19, lineHeight: 28, color: HH.text },
  markTextFa: { fontFamily: fonts.persian, fontStyle: 'normal', fontSize: 15, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' },

  reels: { flexDirection: 'row', gap: spacing.sm },
  reelsFa: { flexDirection: 'row-reverse' },
  reel: { width: '48.5%', aspectRatio: 9 / 16, borderRadius: 16, overflow: 'hidden', backgroundColor: HH.hair },
  reelPlay: { position: 'absolute', left: '50%', top: '50%', marginLeft: -22, marginTop: -22, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.35)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center' },
  reelFoot: { position: 'absolute', left: 12, right: 12, bottom: 12, flexDirection: 'row', alignItems: 'center', gap: 6 },
  reelFootFa: { flexDirection: 'row-reverse' },
  reelFootT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: '#FFF' },
  reelFootTFa: { fontFamily: fonts.persian },
  videos: { gap: spacing.md },

  links: { gap: spacing.sm },
  link: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: HH.surface, borderWidth: 1, borderColor: HH.hair, borderRadius: 16, paddingVertical: 14, paddingHorizontal: spacing.lg },
  linkFa: { flexDirection: 'row-reverse' },
  linkIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: HH.roseSoft, alignItems: 'center', justifyContent: 'center' },
  linkText: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: HH.text },
  linkTextFa: { fontFamily: fonts.persian, fontSize: 14 },
  note: { fontFamily: fonts.body, fontStyle: 'italic', fontSize: 11.5, lineHeight: 18, color: HH.textDim, marginTop: spacing.sm, textAlign: 'center' },
  noteFa: { fontFamily: fonts.persian, fontStyle: 'normal', fontSize: 12, lineHeight: 24 },

  share: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md, backgroundColor: HH.rose, borderRadius: 999, paddingVertical: 15, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  shareText: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },
  shareTextFa: { fontFamily: fonts.persian },
  shareGo: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },

  close: { alignItems: 'center', marginTop: spacing.xxl },
  closeRule: { width: 1, height: 36, backgroundColor: HH.gold, opacity: 0.5 },
  closeLine: { fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 18, color: HH.textDim, marginVertical: spacing.md, textAlign: 'center' },
  closeLineFa: { fontFamily: fonts.persian, fontStyle: 'normal', fontSize: 15 },
});
