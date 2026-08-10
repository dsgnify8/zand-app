import { useState } from 'react';
import { SaveHeart } from '@/components/save-heart';
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lit, findAuthor, type LitBlock, type Author } from '@/constants/literature';
import { eduImage } from '@/constants/education-images';
import { LitMotif } from '@/components/lit-motif';
import { LitOrnament } from '@/components/lit-ornament';
import { FalBook } from '@/components/fal-book';
import { BaniAdam } from '@/components/bani-adam';
import { CalendarDrift } from '@/components/calendar-drift';
import { Chang, LostVerses } from '@/components/rudaki-blocks';
import { Mountain, HaftPeykar } from '@/components/nizami-blocks';
import { Sama, Reed } from '@/components/rumi-blocks';
import { GlossaryText } from '@/components/glossary-text';
import { getLang, t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

function chapterStarts(a: Author) {
  const out: { key: string; title: string; nav?: string; page: number }[] = [];
  let n = 0;
  a.chapters.forEach((c) => { out.push({ key: c.key, title: c.title, titleFa: (c as any).titleFa, nav: (c as any).nav, navFa: (c as any).navFa, page: n }); n += c.pages.length; });
  return out;
}

function flatten(a: Author) {
  const out: { ci: number; ck: string; title: string; sub?: string; pi: number; total: number; blocks: LitBlock[] }[] = [];
  a.chapters.forEach((c, ci) => c.pages.forEach((pg, pi) => out.push({ ci, ck: c.key, title: c.title, titleFa: (c as any).titleFa, sub: c.subtitle, subFa: (c as any).subtitleFa, pi, total: c.pages.length, blocks: pg.blocks })));
  return out;
}

function Veil({ surface, hidden, fa }: { surface: string; hidden: string; fa?: boolean }) {
  const [lifted, setLifted] = useState(false);
  return (
    <Pressable style={styles.veil} onPress={() => setLifted((v) => !v)}>
      <Text style={[styles.veilSurface, fa && styles.faVerse]}>{surface}</Text>
      {lifted ? (
        <>
          <View style={styles.veilRule} />
          <Text style={styles.veilHiddenLabel}>{fa ? 'در پرده' : 'BENEATH'}</Text>
          <Text style={[styles.veilHidden, fa && styles.faBody]}>{hidden}</Text>
        </>
      ) : (
        <Text style={styles.veilHint}>{fa ? 'برای کنار زدن پرده لمس کن' : 'touch to lift the veil'}</Text>
      )}
    </Pressable>
  );
}

function Block({ b }: { b: LitBlock }) {
  const fa = getLang() === 'fa';
  const tx = (o: any, k = 'x') => (fa && (k === 'x' ? o.fa : o[k + 'Fa']) ? (k === 'x' ? o.fa : o[k + 'Fa']) : o[k]);
  const rtl = fa ? styles.rtl : undefined;
  switch (b.t) {
    case 'mark': return (
      <View style={styles.markWrap}>
        <View style={styles.markRule} />
        <Text style={[styles.markText, rtl, fa && (b as any).fa && styles.faMark]}>{tx(b)}</Text>
      </View>
    );
    case 'h': return <Text style={[styles.h, rtl, fa && (b as any).fa && styles.faHead]}>{tx(b)}</Text>;
    case 'p': return <Text style={[styles.p, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>;
    case 'ptext': return <View style={styles.glossWrap}><GlossaryText text={tx(b)} /></View>;
    case 'lead': return (
      <View style={styles.leadWrap}>
        <Text style={[styles.lead, rtl, fa && (b as any).fa && styles.faLead]}>{tx(b)}</Text>
        <LitOrnament mark={(b as any).mark} />
      </View>
    );
    case 'verse': return (
      <View style={styles.verse}>
        {((fa && (b as any).linesFa) ? (b as any).linesFa : b.lines).map((l: string, i: number) => <Text key={i} style={[styles.verseLine, rtl, fa && (b as any).linesFa && styles.faVerse]}>{l}</Text>)}
        {b.by ? <Text style={[styles.verseBy, rtl]}>{fa && (b as any).byFa ? (b as any).byFa : b.by}</Text> : null}
      </View>
    );
    case 'couplet': return (
      <View style={styles.couplet}>
        <Text style={[styles.coupletLine, rtl, fa && (b as any).aFa && styles.faVerse]}>{fa && (b as any).aFa ? (b as any).aFa : b.a}</Text>
        <View style={styles.coupletDot} />
        <Text style={[styles.coupletLine, rtl, fa && (b as any).bFa && styles.faVerse]}>{fa && (b as any).bFa ? (b as any).bFa : b.b}</Text>
      </View>
    );
    case 'illumin': return (
      <View style={styles.illumin}>
        <Text style={styles.illuminMark}>&#8220;</Text>
        <Text style={[styles.illuminText, rtl, fa && (b as any).fa && styles.faIllumin]}>{tx(b)}</Text>
      </View>
    );
    case 'gloss': return (
      <View style={styles.gloss}>
        <Text style={[styles.glossTerm, rtl]}>{fa && (b as any).termFa ? (b as any).termFa : b.term}</Text>
        <Text style={[styles.glossMeaning, rtl, fa && (b as any).meaningFa && styles.faBody]}>{fa && (b as any).meaningFa ? (b as any).meaningFa : b.meaning}</Text>
      </View>
    );
    case 'motif': return <LitMotif symbol={b.symbol} caption={fa && (b as any).captionFa ? (b as any).captionFa : b.caption} />;
    case 'scene': return (
      <View style={styles.scene}>
        <Text style={styles.sceneKicker}>{fa ? 'حکایت' : 'A TALE'}</Text>
        <Text style={[styles.sceneTitle, rtl]}>{fa && (b as any).titleFa ? (b as any).titleFa : b.title}</Text>
        <Text style={[styles.sceneBody, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>
      </View>
    );
    case 'aside': return (
      <View style={styles.aside}>
        <View style={styles.asideBar} />
        <Text style={[styles.asideText, rtl, fa && (b as any).fa && styles.faBody]}>{tx(b)}</Text>
      </View>
    );
    case 'img': {
      const src = eduImage(b.key);
      return (
        <View style={styles.imgWrap}>
          {src ? <Image source={src} style={styles.img} resizeMode="cover" /> : <View style={[styles.img, styles.ph]}><Ionicons name="image-outline" size={22} color={lit.textDim} /></View>}
          {b.cap ? <Text style={styles.cap}>{fa && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
        </View>
      );
    }
    case 'imgframe': {
      const src = eduImage(b.key);
      return (
        <View style={styles.frameWrap}>
          <View style={styles.frame}>
            {src ? <Image source={src} style={styles.frameImg} resizeMode="cover" /> : <View style={[styles.frameImg, styles.ph]}><Ionicons name="image-outline" size={22} color={lit.textDim} /></View>}
          </View>
          {b.cap ? <Text style={styles.cap}>{fa && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
        </View>
      );
    }
    case 'fal': return <FalBook />;
    case 'baniadam': return <BaniAdam />;
    case 'drift': return <CalendarDrift />;
    case 'chang': return <Chang />;
    case 'mountain': return <Mountain />;
    case 'sama': return <Sama />;
    case 'reed': return <Reed />;
    case 'haftpeykar': return <HaftPeykar />;
    case 'lostverses': return <LostVerses />;
    case 'rubai': return (
      <View style={styles.rubai}>
        {((fa && (b as any).linesFa) ? (b as any).linesFa : b.lines).map((l: string, i: number) => <Text key={i} style={[styles.rubaiLine, i === 2 && styles.rubaiTurn, rtl, fa && (b as any).linesFa && styles.faVerse]}>{l}</Text>)}
        {b.note ? <Text style={[styles.rubaiNote, rtl]}>{fa && (b as any).noteFa ? (b as any).noteFa : b.note}</Text> : null}
      </View>
    );
    case 'twotrans': return (
      <View style={styles.two}>
        <View style={styles.twoCol}>
          <Text style={styles.twoLabel}>{b.a.label}</Text>
          <View style={styles.twoRule} />
          <Text style={styles.twoText}>{b.a.x}</Text>
        </View>
        <View style={styles.twoDivider} />
        <View style={styles.twoCol}>
          <Text style={[styles.twoLabel, styles.twoLabelB]}>{b.b.label}</Text>
          <View style={[styles.twoRule, styles.twoRuleB]} />
          <Text style={styles.twoText}>{b.b.x}</Text>
        </View>
      </View>
    );
    case 'story': return (
      <View style={styles.story}>
        <View style={styles.storyHead}>
          <View style={styles.storyDot} />
          <Text style={[styles.storyTitle, rtl]}>{fa && (b as any).titleFa ? (b as any).titleFa : b.title}</Text>
        </View>
        <Text style={styles.storyText}>{b.x}</Text>
        <View style={styles.storyRule} />
        <Text style={[styles.storyMoral, rtl, fa && (b as any).moralFa && styles.faBody]}>{fa && (b as any).moralFa ? (b as any).moralFa : b.moral}</Text>
      </View>
    );
    case 'ghazal': return (
      <View style={styles.ghazal}>
        {b.couplets.map((c, i) => (
          <View key={i} style={styles.couplet2}>
            <Text style={[styles.ghazalLine, rtl, fa && (c as any).aFa && styles.faVerse]}>{fa && (c as any).aFa ? (c as any).aFa : c.a}</Text>
            <Text style={[styles.ghazalLine, rtl, fa && (c as any).bFa && styles.faVerse]}>{fa && (c as any).bFa ? (c as any).bFa : c.b}</Text>
            {i < b.couplets.length - 1 ? <View style={styles.ghazalDot} /> : null}
          </View>
        ))}
        {b.note ? <Text style={[styles.ghazalNote, rtl]}>{fa && (b as any).noteFa ? (b as any).noteFa : b.note}</Text> : null}
      </View>
    );
    case 'veil': return <Veil surface={fa && (b as any).surfaceFa ? (b as any).surfaceFa : b.surface} hidden={fa && (b as any).hiddenFa ? (b as any).hiddenFa : b.hidden} fa={fa} />;
    case 'rule': return (
      <View style={styles.ruleWrap}>
        <View style={styles.ruleLine} />
        <View style={styles.ruleDiamond} />
        <View style={styles.ruleLine} />
      </View>
    );
    default: return null;
  }
}

export default function LitReader() {
  const fa = getLang() === 'fa';
  const params = useLocalSearchParams<{ author: string; page: string }>();
  const author = findAuthor(params.author);
  if (!author) return <SafeAreaView style={styles.safe} edges={['top']}><View style={styles.center}><Text style={styles.dim}>Not found.</Text></View></SafeAreaView>;

  const pages = flatten(author);
  const total = pages.length;
  const p = Math.max(0, Math.min(total, parseInt(params.page ?? '0', 10) || 0));
  const isEnd = p >= total;
  const goto = (n: number) => router.replace('/literature/reader?author=' + author.key + '&page=' + n as any);

  if (isEnd) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.endWrap}>
          <LitMotif symbol="book" />
          <Text style={styles.endTitle}>Fin</Text>
          <Text style={styles.endName}>{author.name}</Text>
          <Text style={styles.endYears}>{author.years}</Text>
          <Pressable style={styles.endBtn} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}><Text style={styles.endBtnText}>{t(APP.back)}</Text></Pressable>
          <Pressable style={styles.endGhost} onPress={() => goto(0)}><Text style={styles.endGhostText}>{t(APP.readAgain)}</Text></Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const page = pages[p];
  const head = page.pi === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}><Ionicons name="chevron-back" size={24} color={lit.text} /></Pressable>
        <Text style={styles.topTitle}>{author.name}</Text>
        <SaveHeart itemKey={'poet-' + author.key} size={20} tint={lit.text} />
      </View>
      <View style={styles.track}><View style={[styles.fill, { width: (Math.round(((p + 1) / total) * 100) + '%') as any }]} /></View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.navScroll}
        contentContainerStyle={styles.navRow}
      >
        {chapterStarts(author).map((c) => {
          const on = c.key === page.ck;
          return (
            <Pressable key={c.key} onPress={() => goto(c.page)} style={styles.navTab}>
              <Text style={[styles.navText, on && styles.navTextOn]} numberOfLines={1}>{fa ? ((c as any).navFa ?? (c as any).titleFa ?? (c as any).nav ?? c.title) : ((c as any).nav ?? c.title)}</Text>
              <View style={[styles.navRule, on && styles.navRuleOn]} />
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {head ? (
          <View style={styles.chapterHead}>
            <View style={styles.chapterOrn}><View style={styles.chapterDiamond} /></View>
            {page.sub ? <Text style={styles.chEyebrow}>{page.sub}</Text> : null}
            <Text style={[styles.chTitle, fa && (page as any).titleFa && styles.faChTitle]}>{fa && (page as any).titleFa ? (page as any).titleFa : page.title}</Text>
          </View>
        ) : <Text style={[styles.chRunning, fa && (page as any).titleFa && styles.faChRun]}>{fa && (page as any).titleFa ? (page as any).titleFa : page.title}</Text>}

        <View style={styles.dots}>
          {Array.from({ length: page.total }).map((_, i) => <View key={i} style={[styles.dot, i === page.pi && styles.dotOn]} />)}
        </View>

        {page.blocks.map((b, i) => <Block key={i} b={b} />)}

        <View style={styles.nav}>
          <Pressable style={[styles.navBtn, p === 0 && styles.navOff]} disabled={p === 0} onPress={() => goto(p - 1)}>
            <Ionicons name="chevron-back" size={18} color={p === 0 ? lit.hair : lit.text} />
            <Text style={[styles.navText, p === 0 && styles.navTextOff]}>{t(APP.previous)}</Text>
          </Pressable>
          <Pressable style={styles.navPrimary} onPress={() => goto(p + 1)}>
            <Text style={styles.navPrimaryText}>{p + 1 >= total ? 'Finish' : 'Next'}</Text>
            <Ionicons name={p + 1 >= total ? 'checkmark' : 'chevron-forward'} size={18} color={lit.bg} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h: { fontFamily: fonts.heading, fontSize: 23, lineHeight: 30, color: lit.text, marginTop: spacing.xxl, marginBottom: spacing.sm },
  faChTitle: { fontFamily: fonts.persian, fontSize: 26, lineHeight: 44, textAlign: 'right' },
  faChRun: { fontFamily: fonts.persian, fontSize: 13, textAlign: 'right' },
  markWrap: { marginVertical: spacing.xl, alignItems: 'center' },
  markRule: { width: 34, height: 1, backgroundColor: lit.gold, opacity: 0.6, marginBottom: spacing.md },
  markText: { fontFamily: fonts.heading, fontSize: 19, lineHeight: 31, color: lit.ink, textAlign: 'center', paddingHorizontal: spacing.md },
  faMark: { fontFamily: fonts.persian, fontSize: 17, lineHeight: 34 },
  faHead: { fontFamily: fonts.persian, fontSize: 20, lineHeight: 36 },
  rtl: { textAlign: 'right', writingDirection: 'rtl' },
  faLead: { fontFamily: fonts.persian, fontSize: 22, lineHeight: 42 },
  faBody: { fontFamily: fonts.persian, fontSize: 16.5, lineHeight: 34 },
  faVerse: { fontFamily: fonts.persian, fontSize: 19, lineHeight: 40, textAlign: 'center' },
  faIllumin: { fontFamily: fonts.persian, fontSize: 18, lineHeight: 36 },
  navScroll: { height: 42, flexGrow: 0, flexShrink: 0, marginTop: spacing.sm, borderBottomWidth: 1, borderBottomColor: lit.hair },
  navRow: { paddingLeft: spacing.lg, paddingRight: spacing.md, alignItems: 'flex-start' },
  navTab: { marginRight: 20, height: 42, justifyContent: 'space-between', paddingTop: 5 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: 11, color: lit.textDim },
  navTextOn: { color: lit.text },
  navRule: { height: 2, backgroundColor: 'transparent', borderRadius: 1 },
  navRuleOn: { backgroundColor: lit.gold },
  safe: { flex: 1, backgroundColor: lit.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, color: lit.textDim },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: lit.text },
  track: { height: 2, backgroundColor: lit.hair, marginHorizontal: spacing.lg, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: 2, backgroundColor: lit.gold },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  chapterHead: { alignItems: 'center', marginTop: spacing.md },
  chapterOrn: { marginBottom: spacing.md },
  chapterDiamond: { width: 12, height: 12, backgroundColor: lit.gold, transform: [{ rotate: '45deg' }] },
  chEyebrow: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 3, color: lit.gold, textAlign: 'center' },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.display, color: lit.text, textAlign: 'center', marginTop: spacing.xs },
  chRunning: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: lit.textDim, textTransform: 'uppercase', textAlign: 'center', marginTop: spacing.sm },
  dots: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginTop: spacing.md, marginBottom: spacing.lg },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: lit.hair },
  dotOn: { backgroundColor: lit.gold, width: 16 },
  p: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 28, color: lit.text, marginTop: spacing.md, opacity: 0.92 },
  glossWrap: { marginTop: 0 },
  leadWrap: { alignItems: 'center', marginVertical: spacing.xl, paddingHorizontal: spacing.sm },
  lead: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 29, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  verse: { backgroundColor: lit.raised, borderRadius: radius.lg, borderWidth: 1, borderColor: lit.hair, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, marginVertical: spacing.lg, alignItems: 'center' },
  verseLine: { fontFamily: fonts.heading, fontSize: fontSize.xl, lineHeight: 34, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  verseBy: { fontFamily: fonts.body, fontSize: fontSize.xs, color: lit.gold, letterSpacing: 1, marginTop: spacing.md },
  couplet: { marginVertical: spacing.lg, alignItems: 'center' },
  coupletLine: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 30, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  coupletDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: lit.gold, marginVertical: spacing.sm },
  illumin: { marginVertical: spacing.lg, paddingLeft: spacing.lg, position: 'relative' },
  illuminMark: { position: 'absolute', left: -6, top: -18, fontFamily: fonts.heading, fontSize: 64, color: lit.goldSoft },
  illuminText: { fontFamily: fonts.heading, fontSize: fontSize.xl, lineHeight: 32, color: lit.gold },
  gloss: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginVertical: spacing.sm, backgroundColor: lit.inkSoft, borderRadius: radius.md, padding: spacing.md },
  glossTerm: { fontFamily: fonts.persian, fontSize: fontSize.lg, color: lit.ink },
  glossMeaning: { flex: 1, fontFamily: fonts.body, fontSize: fontSize.sm, color: lit.text },
  scene: { backgroundColor: lit.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: lit.hair, borderLeftWidth: 3, borderLeftColor: lit.rose, padding: spacing.lg, marginVertical: spacing.lg },
  sceneKicker: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: lit.rose },
  sceneTitle: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: lit.text, marginTop: spacing.xs },
  sceneBody: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 24, color: lit.text, marginTop: spacing.sm, opacity: 0.9 },
  aside: { flexDirection: 'row', marginVertical: spacing.lg },
  asideBar: { width: 2, backgroundColor: lit.gold, marginRight: spacing.md, opacity: 0.5 },
  asideText: { flex: 1, fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 24, color: lit.textDim, fontStyle: 'italic' },
  imgWrap: { marginVertical: spacing.lg },
  img: { width: '100%', height: 240, borderRadius: radius.lg, backgroundColor: lit.raised },
  ph: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: lit.hair },
  cap: { fontFamily: fonts.body, fontSize: fontSize.xs, color: lit.textDim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },
  frameWrap: { marginVertical: spacing.lg, alignItems: 'center' },
  frame: { padding: spacing.sm, borderWidth: 1, borderColor: lit.gold, borderRadius: radius.md, backgroundColor: lit.surface },
  frameImg: { width: 220, height: 280, borderRadius: 4, backgroundColor: lit.raised },
  rubai: { marginVertical: spacing.xl, alignItems: 'center', paddingVertical: spacing.lg, borderTopWidth: 1, borderBottomWidth: 1, borderColor: lit.hair },
  rubaiLine: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 30, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  rubaiTurn: { color: lit.gold },
  rubaiNote: { fontFamily: fonts.body, fontSize: 10, color: lit.textDim, marginTop: spacing.md, fontStyle: 'italic' },
  two: { marginVertical: spacing.lg, backgroundColor: lit.surface, borderRadius: 10, borderWidth: 1, borderColor: lit.hair, padding: spacing.lg },
  twoCol: {},
  twoLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.textDim },
  twoLabelB: { color: lit.gold },
  twoRule: { width: 20, height: 1, backgroundColor: lit.hair, marginVertical: spacing.sm },
  twoRuleB: { backgroundColor: lit.gold },
  twoText: { fontFamily: fonts.heading, fontSize: fontSize.base, lineHeight: 25, color: lit.text, fontStyle: 'italic' },
  twoDivider: { height: 1, backgroundColor: lit.hair, marginVertical: spacing.lg },
  story: { marginVertical: spacing.lg, padding: spacing.lg, backgroundColor: lit.surface, borderRadius: 10, borderWidth: 1, borderColor: lit.hair },
  storyHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  storyDot: { width: 5, height: 5, backgroundColor: lit.gold, transform: [{ rotate: '45deg' }] },
  storyTitle: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: lit.gold },
  storyText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 25, color: lit.text, marginTop: spacing.md, opacity: 0.92 },
  storyRule: { width: 26, height: 1, backgroundColor: lit.gold, opacity: 0.5, marginVertical: spacing.md },
  storyMoral: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 27, color: lit.text, fontStyle: 'italic' },
  ghazal: { marginVertical: spacing.xl, paddingVertical: spacing.lg, paddingHorizontal: spacing.md, borderLeftWidth: 1, borderLeftColor: lit.gold, backgroundColor: lit.raised, borderRadius: radius.md },
  couplet2: { alignItems: 'center', marginBottom: spacing.md },
  ghazalLine: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 30, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  ghazalDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: lit.gold, opacity: 0.5, marginTop: spacing.md },
  ghazalNote: { fontFamily: fonts.body, fontSize: 11, color: lit.textDim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },
  veil: { marginVertical: spacing.lg, padding: spacing.lg, borderRadius: radius.md, borderWidth: 1, borderColor: lit.hair, backgroundColor: lit.surface },
  veilSurface: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: lit.text, textAlign: 'center', fontStyle: 'italic' },
  veilHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: lit.gold, textAlign: 'center', marginTop: spacing.md, opacity: 0.7 },
  veilRule: { width: 30, height: 1, backgroundColor: lit.gold, alignSelf: 'center', marginVertical: spacing.md, opacity: 0.5 },
  veilHiddenLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: lit.rose, textAlign: 'center' },
  veilHidden: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: lit.text, textAlign: 'center', marginTop: spacing.xs, opacity: 0.9 },
  ruleWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md, marginVertical: spacing.xl },
  ruleLine: { width: 60, height: 1, backgroundColor: lit.gold, opacity: 0.4 },
  ruleDiamond: { width: 8, height: 8, backgroundColor: lit.gold, transform: [{ rotate: '45deg' }] },
  nav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xxl },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, borderWidth: 1, borderColor: lit.hair },
  navOff: { opacity: 0.4 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: lit.text },
  navTextOff: { color: lit.hair },
  navPrimary: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.pill, backgroundColor: lit.text },
  navPrimaryText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: lit.bg },
  endWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  endTitle: { fontFamily: fonts.heading, fontSize: fontSize.display, color: lit.gold, marginTop: spacing.md },
  endName: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: lit.text, marginTop: spacing.sm },
  endYears: { fontFamily: fonts.body, fontSize: fontSize.sm, color: lit.textDim, marginTop: 2 },
  endBtn: { backgroundColor: lit.text, borderRadius: radius.pill, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, marginTop: spacing.xl },
  endBtnText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: lit.bg },
  endGhost: { paddingVertical: spacing.md, marginTop: spacing.xs },
  endGhostText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: lit.textDim },
});
