import { Image, Linking, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { bump, recordFinished } from '@/lib/stats-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark, findTopic, flattenPages, type Block } from '@/constants/education';
import { eduImage } from '@/constants/education-images';
import { eduVideo } from '@/constants/education-media';
import { IranMap } from '@/components/iran-map';
import { GlossaryText } from '@/components/glossary-text';
import { CurrencyChart, BasketTable } from '@/components/currency-chart';
import { Memorial } from '@/components/memorial-flower';
import { SvgTest } from '@/components/svg-test';
import { useReading } from '@/lib/reading-store';
import { useProgress } from '@/lib/progress-store';
import { useEffect, useState } from 'react';
import { t, useLang, getLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';
import { FramedImage } from '@/components/framed-image';

function BlockView({ b }: { b: Block }) {
  // Farsi when the app is in Farsi and this block has been translated.
  const fa = getLang() === 'fa';
  const tx = (blk: any) => (fa && blk.fa ? blk.fa : blk.x);
  const faOn = (blk: any) => fa && !!blk.fa;
  const rtl = fa ? styles.rtl : undefined;

  switch (b.t) {
    case 'h': return <Text style={[styles.h, rtl, faOn(b) && styles.faHead]}>{tx(b)}</Text>;
    case 'p': return <Text style={[styles.p, rtl, faOn(b) && styles.faBody]}>{tx(b)}</Text>;
    case 'ptext': return <GlossaryText text={tx(b)} />;
    case 'pull': return <Text style={[styles.pull, rtl, faOn(b) && styles.faPull]}>{tx(b)}</Text>;
    case 'chart': return <CurrencyChart />;
    case 'basket': return <BasketTable />;
    case 'memorial': return <Memorial />;
    case 'q': return (
      <View style={styles.quote}>
        <Text style={[styles.quoteText, rtl, faOn(b) && styles.faQuote]}>{tx(b)}</Text>
        {b.by ? <Text style={styles.quoteBy}>{'\u2014 ' + (getLang() === 'fa' && (b as any).byFa ? (b as any).byFa : b.by)}</Text> : null}
      </View>
    );
    case 'call': return (
      <View style={styles.call}>
        <Text style={[styles.callTitle, rtl]}>{fa && (b as any).titleFa ? (b as any).titleFa : b.title}</Text>
        <Text style={[styles.callText, rtl, faOn(b) && styles.faBody]}>{tx(b)}</Text>
      </View>
    );
    case 'fact': return (
      <View style={styles.fact}>
        <Text style={styles.factLabel}>{fa && (b as any).labelFa ? (b as any).labelFa : b.label}</Text>
        <Text style={[styles.factValue, rtl]}>{fa && (b as any).valueFa ? (b as any).valueFa : b.value}</Text>
      </View>
    );
    case 'stat': return (
      <View style={styles.statRow}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.statItem}>
            <Text style={styles.statValue}>{it.value}</Text>
            <Text style={styles.statLabel}>{it.label}</Text>
          </View>
        ))}
      </View>
    );
    case 'timeline': return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tlScroll} contentContainerStyle={styles.tl}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.tlNode}>
            <Text style={styles.tlYear}>{it.year}</Text>
            <View style={styles.tlDotRow}>
              <View style={[styles.tlLine, i === 0 && styles.tlLineHidden]} />
              <View style={styles.tlDot} />
              <View style={[styles.tlLine, i === b.items.length - 1 && styles.tlLineHidden]} />
            </View>
            <Text style={[styles.tlLabel, rtl]}>{fa && (it as any).labelFa ? (it as any).labelFa : it.label}</Text>
          </View>
        ))}
      </ScrollView>
    );
    case 'img': {
      const src = eduImage(b.key);
      // FramedImage rather than Image, so an admin can long-press to upload
      // and reframe, and so empty slots still show a placeholder.
      return (
        <View style={styles.imgWrap}>
          <View style={styles.imgReal}>
            <FramedImage name={b.key} source={src} style={StyleSheet.absoluteFill as any} />
          </View>
          {b.cap ? <Text style={styles.imgCap}>{fa && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
        </View>
      );
    }
    case 'imgwide': {
      const src = eduImage(b.key);
      return (
        <View style={styles.imgWideWrap}>
          {src ? <Image source={src} style={styles.imgWide} resizeMode="cover" /> : <View style={[styles.imgWide, styles.ph]}><Ionicons name="image-outline" size={22} color={dark.textDim} /></View>}
          {b.cap ? <Text style={styles.cap}>{fa && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
        </View>
      );
    }
    case 'imgsm': {
      const src = eduImage(b.key);
      return (
        <View style={styles.imgSmWrap}>
          {src ? <Image source={src} style={styles.imgSm} resizeMode="cover" /> : <Placeholder cap={b.cap} small />}
          {src && b.cap ? <Text style={styles.imgCap}>{fa && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
        </View>
      );
    }
    case 'imgrow': return (
      <View style={styles.rowWrap}>
        <View style={styles.imgRowBox}>
          {b.keys.map((k, i) => {
            const src = eduImage(k);
            return src
              ? <Image key={i} source={src} style={styles.imgRowItem} resizeMode="cover" />
              : <View key={i} style={[styles.imgRowItem, styles.rowPlaceholder]}><Ionicons name="image-outline" size={22} color={dark.textDim} /></View>;
          })}
        </View>
        {b.cap ? <Text style={styles.imgCap}>{fa && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
      </View>
    );
    case 'video': {
      const v = eduVideo(b.key);
      if (!v) return null;
      return (
        <Pressable style={styles.video} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + v.id)}>
          <Image source={{ uri: 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg' }} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
          <View style={styles.videoScrim} />
          <View style={styles.playCircle}><Ionicons name="play" size={26} color={dark.bg} /></View>
          <Text style={styles.videoLabel}>{b.cap ?? v.label}</Text>
        </Pressable>
      );
    }
    case 'collage': {
      const a = eduImage(b.keys[0]);
      const c2 = eduImage(b.keys[1]);
      return (
        <View style={styles.collageWrap}>
          <View style={styles.collageBox}>
            {a ? <Image source={a} style={styles.collageA} resizeMode="cover" /> : <View style={[styles.collageA, styles.rowPlaceholder]}><Ionicons name="image-outline" size={20} color={dark.textDim} /></View>}
            {c2 ? <Image source={c2} style={styles.collageB} resizeMode="cover" /> : <View style={[styles.collageB, styles.rowPlaceholder]}><Ionicons name="image-outline" size={20} color={dark.textDim} /></View>}
          </View>
          {b.cap ? <Text style={styles.imgCap}>{fa && (b as any).capFa ? (b as any).capFa : b.cap}</Text> : null}
        </View>
      );
    }
    case 'circles': return (
      <View style={styles.circlesWrap}>
        <View style={styles.circlesRow}>
          {b.items.map((it, i) => (
            <View key={i} style={styles.circleCol}>
              <View style={styles.circle}>
                <Text style={styles.circleValue} numberOfLines={1} adjustsFontSizeToFit>{it.value}</Text>
              </View>
              <Text style={styles.circleLabel} numberOfLines={2}>{it.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
    case 'boxes': return (
      <View style={styles.boxGrid}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.box}>
            <Text style={styles.boxTitle}>{getLang() === 'fa' && (it as any).titleFa ? (it as any).titleFa : it.title}</Text>
            <Text style={styles.boxText}>{getLang() === 'fa' && (it as any).fa ? (it as any).fa : it.x}</Text>
          </View>
        ))}
      </View>
    );
    case 'map': return <SvgTest />;
    case 'steps': return (
      <View style={styles.steps}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.stepRow}>
            <Text style={styles.stepNum}>{String(i + 1).padStart(2, '0')}</Text>
            <View style={styles.stepText}>
              <Text style={styles.stepTitle}>{getLang() === 'fa' && (it as any).titleFa ? (it as any).titleFa : it.title}</Text>
              <Text style={styles.stepBody}>{getLang() === 'fa' && (it as any).fa ? (it as any).fa : it.x}</Text>
            </View>
          </View>
        ))}
      </View>
    );
    case 'keyvalue': return (
      <View style={styles.kv}>
        {b.items.map((it, i) => (
          <View key={i} style={[styles.kvRow, i === b.items.length - 1 && styles.kvRowLast]}>
            <Text style={styles.kvK}>{it.k}</Text>
            <Text style={styles.kvV}>{it.v}</Text>
          </View>
        ))}
      </View>
    );
    case 'quotebig': return (
      <View style={styles.qbig}>
        <View style={styles.qbigRule} />
        <Text style={styles.qbigText}>{b.x}</Text>
        {b.by ? <Text style={styles.qbigBy}>{b.by}</Text> : null}
        <View style={styles.qbigRule} />
      </View>
    );
    case 'era': return (
      <View style={styles.era}>
        <Text style={styles.eraValue}>{b.value}</Text>
        <Text style={[styles.eraLabel, rtl]}>{fa && (b as any).labelFa ? (b as any).labelFa : b.label}</Text>
      </View>
    );
    case 'numstat': return (
      <View style={styles.numstat}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.numstatItem}>
            <Text style={styles.numstatN}>{fa && (it as any).nFa ? (it as any).nFa : it.n}</Text>
            <View style={styles.numstatBar} />
            <Text style={[styles.numstatLabel, rtl]}>{fa && (it as any).labelFa ? (it as any).labelFa : it.label}</Text>
          </View>
        ))}
      </View>
    );
    case 'ribbon': return (
      <View style={styles.ribbon}>
        {b.items.map((it, i) => (
          <View key={i} style={styles.ribbonItem}>
            <View style={styles.ribbonYearWrap}><Text style={styles.ribbonYear}>{fa && (it as any).yearFa ? (it as any).yearFa : it.year}</Text></View>
            <Text style={[styles.ribbonLabel, rtl]}>{fa && (it as any).labelFa ? (it as any).labelFa : it.label}</Text>
            {i < b.items.length - 1 ? <View style={styles.ribbonConnector} /> : null}
          </View>
        ))}
      </View>
    );
    case 'splitimg': {
      const src = eduImage(b.key);
      return (
        <View style={styles.split}>
          <View style={styles.splitImgWrap}>
            {src ? <Image source={src} style={styles.splitImg} resizeMode="cover" /> : <View style={[styles.splitImg, styles.splitPh]}><Ionicons name="image-outline" size={22} color={dark.textDim} /></View>}
          </View>
          <View style={styles.splitText}>
            <Text style={[styles.splitTitle, rtl]}>{fa && (b as any).titleFa ? (b as any).titleFa : b.title}</Text>
            <Text style={styles.splitBody}>{b.x}</Text>
          </View>
        </View>
      );
    }
    case 'markline': return (
      <View style={styles.markline}>
        <View style={styles.marklineBar} />
        <Text style={styles.marklineText}>{b.x}</Text>
      </View>
    );
    case 'duo': return (
      <View style={styles.duo}>
        <View style={styles.duoCol}>
          <Text style={[styles.duoTitle, rtl]}>{fa && (b.left as any).titleFa ? (b.left as any).titleFa : b.left.title}</Text>
          <Text style={styles.duoBody}>{b.left.x}</Text>
        </View>
        <View style={styles.duoDivider} />
        <View style={styles.duoCol}>
          <Text style={[styles.duoTitle, rtl]}>{fa && (b.right as any).titleFa ? (b.right as any).titleFa : b.right.title}</Text>
          <Text style={styles.duoBody}>{b.right.x}</Text>
        </View>
      </View>
    );
    case 'div': return <View style={styles.div} />;
    default: return null;
  }
}

function Placeholder({ cap, tall, small }: { cap?: string; tall?: boolean; small?: boolean }) {
  return (
    <View style={[styles.ph, tall && styles.phTall, small && styles.phSmall]}>
      <Ionicons name="image-outline" size={26} color={dark.textDim} />
      {cap ? <Text style={styles.imgCap}>{cap}</Text> : null}
    </View>
  );
}

function AutoImage({ source, style, maxRatioTall = 0.6, minRatioWide = 1.9 }: { source: any; style?: any; maxRatioTall?: number; minRatioWide?: number }) {
  const [ratio, setRatio] = useState<number | null>(null);
  useEffect(() => {
    if (!source) return;
    const resolved = Image.resolveAssetSource(source);
    if (resolved?.width && resolved?.height) {
      setRatio(resolved.width / resolved.height);
    }
  }, [source]);
  // clamp extreme ratios so nothing gets absurdly tall/wide, but keep natural shape otherwise
  const r = ratio ? Math.max(maxRatioTall, Math.min(minRatioWide, ratio)) : 1.5;
  return <Image source={source} style={[{ width: '100%', aspectRatio: r }, style]} resizeMode="cover" />;
}

export default function ReaderScreen() {
  const params = useLocalSearchParams<{ topic: string; page: string }>();
  const topic = findTopic(params.topic);

  if (!topic) {
    return <SafeAreaView style={styles.safe} edges={['top']}><View style={styles.center}><Text style={styles.dim}>Not found.</Text></View></SafeAreaView>;
  }

  const pages = flattenPages(topic);
  const total = pages.length;
  const p = Math.max(0, Math.min(total, parseInt(params.page ?? '0', 10) || 0));
  const isEnd = p >= total;
  const { recordReading, awardAchievement } = useReading();
  const { markActivity } = useProgress();
  useEffect(() => {
    if (!topic) return;
    markActivity();
    bump('pagesRead');
    if (!isEnd) {
      recordReading(topic.key, p, total);
      awardAchievement('first-chapter');
      if (p + 1 >= total) {
        awardAchievement('finish-topic');
        recordFinished({ key: 'topic-' + topic.key, title: topic.name, sub: 'History  ·  finished', route: '/education/topic?topic=' + topic.key });
      }
    } else {
      awardAchievement('finish-topic');
      recordFinished({ key: 'topic-' + topic.key, title: topic.name, sub: 'History  ·  finished', route: '/education/topic?topic=' + topic.key });
    }
  }, [topic && topic.key, p, isEnd]);
  const goto = (n: number) => router.replace('/education/reader?topic=' + topic.key + '&page=' + n as any);

  if (isEnd) {
    const closing = eduImage(topic.closing);
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.endWrap}>
          {closing ? <Image source={closing} style={styles.endImg} resizeMode="cover" /> : null}
          <View style={styles.endScrim} />
          <View style={styles.endContent}>
            <Ionicons name="checkmark-circle" size={44} color={dark.gold} />
            <Text style={styles.endTitle}>{t(APP.readingComplete)}</Text>
            <Text style={styles.endName}>{topic.name}</Text>
            <Text style={styles.endYears}>{topic.years}</Text>
            <Pressable style={styles.endBtn} onPress={() => router.dismissAll ? router.dismissAll() : router.back()}>
              <Text style={styles.endBtnText}>{t(APP.backToTopic)}</Text>
            </Pressable>
            <Pressable style={styles.endGhost} onPress={() => goto(0)}>
              <Text style={styles.endGhostText}>{t(APP.readAgain)}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const page = pages[p];
  const showChapterHead = page.pageInChapter === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable hitSlop={10} onPress={() => p > 0 ? goto(p - 1) : router.back()}>
          <Ionicons name="chevron-back" size={26} color={dark.text} />
        </Pressable>
        <Text style={styles.topTitle}>Chapter {page.chapterIndex + 1}</Text>
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={dark.text} />
        </Pressable>
      </View>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: (Math.round(((p + 1) / total) * 100) + '%') as any }]} /></View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {showChapterHead ? (
          <>
            {page.chapterSubtitle ? <Text style={styles.chEyebrow}>{page.chapterSubtitle}</Text> : null}
            <Text style={styles.chTitle}>{page.chapterTitle}</Text>
          </>
        ) : (
          <Text style={styles.chRunning}>{page.chapterTitle}</Text>
        )}

        <View style={styles.pageDots}>
          {Array.from({ length: page.pagesInChapter }).map((_, i) => (
            <View key={i} style={[styles.pageDot, i === page.pageInChapter && styles.pageDotActive]} />
          ))}
        </View>

        {page.blocks.map((b, i) => <BlockView key={i} b={b} />)}

        <View style={styles.nav}>
          <Pressable style={[styles.navBtn, p === 0 && styles.navDisabled]} disabled={p === 0} onPress={() => goto(p - 1)}>
            <Ionicons name="chevron-back" size={18} color={p === 0 ? dark.hair : dark.text} />
            <Text style={[styles.navText, p === 0 && styles.navTextDim]}>{t(APP.previous)}</Text>
          </Pressable>
          <Pressable style={styles.navBtnPrimary} onPress={() => goto(p + 1)}>
            <Text style={styles.navTextPrimary}>{p + 1 >= total ? 'Finish' : 'Next'}</Text>
            <Ionicons name={p + 1 >= total ? 'checkmark' : 'chevron-forward'} size={18} color={dark.bg} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rtl: { textAlign: 'right', writingDirection: 'rtl' },
  faBody: { fontFamily: fonts.persian, fontSize: 16.5, lineHeight: 34 },
  faHead: { fontFamily: fonts.persian, fontSize: 21, lineHeight: 36 },
  faPull: { fontFamily: fonts.persian, fontSize: 20, lineHeight: 38 },
  faQuote: { fontFamily: fonts.persian, fontSize: 19, lineHeight: 36 },
  safe: { flex: 1, backgroundColor: dark.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, fontSize: fontSize.base, color: dark.textDim },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  topTitle: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: dark.text },
  progressTrack: { height: 3, backgroundColor: dark.hair, marginHorizontal: spacing.lg, borderRadius: radius.pill, overflow: 'hidden' },
  progressFill: { height: 3, backgroundColor: dark.gold },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  chEyebrow: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: dark.gold, marginTop: spacing.md },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.display, color: dark.text, marginTop: spacing.xs, lineHeight: 40 },
  chRunning: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: dark.textDim, textTransform: 'uppercase', marginTop: spacing.md },
  pageDots: { flexDirection: 'row', gap: 6, marginTop: spacing.md, marginBottom: spacing.sm },
  pageDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: dark.hair },
  pageDotActive: { backgroundColor: dark.gold, width: 18 },
  h: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text, marginTop: spacing.lg, marginBottom: spacing.xs },
  p: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 28, color: dark.text, marginTop: spacing.md, opacity: 0.92 },
  pull: { fontFamily: fonts.heading, fontSize: fontSize.xl, lineHeight: 32, color: dark.gold, marginVertical: spacing.lg, textAlign: 'center' },
  quote: { borderLeftWidth: 3, borderLeftColor: dark.accent, paddingLeft: spacing.md, marginVertical: spacing.lg },
  quoteText: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: dark.text, fontStyle: 'italic' },
  quoteBy: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.textDim, marginTop: spacing.sm },
  call: { backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, padding: spacing.lg, marginVertical: spacing.lg },
  callTitle: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 1.5, color: dark.accent, textTransform: 'uppercase' },
  callText: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 26, color: dark.text, marginTop: spacing.sm, opacity: 0.92 },
  fact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: dark.surface, borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  factLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 1.5, color: dark.gold },
  factValue: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.text, flexShrink: 1, textAlign: 'right', marginLeft: spacing.md },
  statRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginVertical: spacing.lg },
  statItem: { flexGrow: 1, flexBasis: '30%', backgroundColor: dark.surface, borderRadius: radius.md, borderWidth: 1, borderColor: dark.hair, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, alignItems: 'center' },
  statValue: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: dark.gold },
  statLabel: { fontFamily: fonts.body, fontSize: fontSize.xs, lineHeight: 16, color: dark.textDim, textAlign: 'center', marginTop: 4 },
  tlScroll: { marginVertical: spacing.lg },
  tl: { paddingVertical: spacing.sm },
  tlNode: { width: 112, alignItems: 'center' },
  tlYear: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: dark.gold, marginBottom: spacing.sm },
  tlDotRow: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  tlLine: { flex: 1, height: 1.5, backgroundColor: dark.hair },
  tlLineHidden: { backgroundColor: 'transparent' },
  tlDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: dark.accent },
  tlLabel: { fontFamily: fonts.body, fontSize: fontSize.xs, lineHeight: 16, color: dark.text, textAlign: 'center', marginTop: spacing.sm, paddingHorizontal: 4 },
  imgWrap: { marginVertical: spacing.lg },
  imgReal: { width: '100%', height: 400, borderRadius: radius.lg, backgroundColor: dark.surface },
  imgSmWrap: { marginVertical: spacing.lg, alignItems: 'center' },
  imgSm: { width: '80%', height: 240, borderRadius: radius.lg, backgroundColor: dark.surface, alignSelf: 'center' },
  rowWrap: { marginVertical: spacing.lg },
  imgRowBox: { flexDirection: 'row', gap: spacing.sm },
  imgRowItem: { flex: 1, height: 180, borderRadius: radius.md, backgroundColor: dark.surface },
  rowPlaceholder: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: dark.hair },
  imgCap: { fontFamily: fonts.body, fontSize: fontSize.xs, color: dark.textDim, paddingHorizontal: spacing.lg, textAlign: 'center', marginTop: spacing.sm },
  ph: { aspectRatio: 16 / 10, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  phTall: { aspectRatio: 4 / 3 },
  phSmall: { width: '70%', aspectRatio: 3 / 2, alignSelf: 'center' },
  video: { height: 200, borderRadius: radius.lg, overflow: 'hidden', marginVertical: spacing.lg, justifyContent: 'center', alignItems: 'center', backgroundColor: dark.surface },
  videoScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(23,17,15,0.45)' },
  playCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: dark.gold, alignItems: 'center', justifyContent: 'center' },
  videoLabel: { position: 'absolute', bottom: spacing.md, left: spacing.md, right: spacing.md, fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: dark.text, textAlign: 'center' },
  div: { height: 1, backgroundColor: dark.hair, marginVertical: spacing.lg },
  nav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xxl },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, borderWidth: 1, borderColor: dark.hair },
  navDisabled: { opacity: 0.4 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: dark.text },
  navTextDim: { color: dark.hair },
  navBtnPrimary: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.pill, backgroundColor: dark.text },
  navTextPrimary: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: dark.bg },
  endWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  endImg: { ...StyleSheet.absoluteFillObject, opacity: 0.25 },
  endScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(23,17,15,0.75)' },
  endContent: { alignItems: 'center', padding: spacing.xl },
  endTitle: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: dark.text, marginTop: spacing.md },
  endName: { fontFamily: fonts.body, fontSize: fontSize.base, color: dark.textDim, marginTop: spacing.sm, textAlign: 'center' },
  endYears: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.textDim, marginTop: 2 },
  endBtn: { backgroundColor: dark.text, borderRadius: radius.pill, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, marginTop: spacing.xl },
  endBtnText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: dark.bg },
  endGhost: { paddingVertical: spacing.md, marginTop: spacing.xs },
  endGhostText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: dark.textDim },
  numstat: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: spacing.lg },
  numstatItem: { width: '50%', paddingVertical: spacing.md, paddingRight: spacing.md },
  numstatN: { fontFamily: fonts.heading, fontSize: 28, lineHeight: 32, color: dark.text },
  numstatBar: { width: 28, height: 3, backgroundColor: dark.gold, marginVertical: spacing.sm, borderRadius: 2 },
  numstatLabel: { fontFamily: fonts.body, fontSize: fontSize.xs, lineHeight: 17, color: dark.textDim },
  ribbon: { marginVertical: spacing.lg, paddingLeft: spacing.sm },
  ribbonItem: { paddingLeft: spacing.lg, paddingBottom: spacing.lg, borderLeftWidth: 2, borderLeftColor: dark.hair, position: 'relative' },
  ribbonYearWrap: { alignSelf: 'flex-start', backgroundColor: dark.gold, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2, marginLeft: -spacing.lg - 1, marginBottom: spacing.xs },
  ribbonYear: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, color: dark.bg, letterSpacing: 1 },
  ribbonLabel: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 22, color: dark.text },
  ribbonConnector: {},
  split: { flexDirection: 'row', gap: spacing.md, marginVertical: spacing.lg, alignItems: 'center' },
  splitImgWrap: { width: 120, height: 150 },
  splitImg: { width: 120, height: 150, borderRadius: radius.md, backgroundColor: dark.surface },
  splitPh: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: dark.hair },
  splitText: { flex: 1 },
  splitTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: dark.text, marginBottom: spacing.xs },
  splitBody: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 23, color: dark.text, opacity: 0.9 },
  markline: { flexDirection: 'row', marginVertical: spacing.lg, alignItems: 'stretch' },
  marklineBar: { width: 4, borderRadius: 2, backgroundColor: dark.gold, marginRight: spacing.md },
  marklineText: { flex: 1, fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: dark.text, fontStyle: 'italic' },
  duo: { flexDirection: 'row', marginVertical: spacing.lg, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, padding: spacing.lg },
  duoCol: { flex: 1 },
  duoTitle: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 1, color: dark.gold, textTransform: 'uppercase', marginBottom: spacing.xs },
  duoBody: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 21, color: dark.text, opacity: 0.9 },
  duoDivider: { width: 1, backgroundColor: dark.hair, marginHorizontal: spacing.md },
  kv: { marginVertical: spacing.lg, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, paddingHorizontal: spacing.lg },
  kvRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: dark.hair },
  kvRowLast: { borderBottomWidth: 0 },
  kvK: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.textDim, flex: 1 },
  kvV: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: dark.text, flexShrink: 1, textAlign: 'right', marginLeft: spacing.md },
  qbig: { marginVertical: spacing.xl, alignItems: 'center' },
  qbigRule: { width: 40, height: 2, backgroundColor: dark.gold, marginVertical: spacing.lg },
  qbigText: { fontFamily: fonts.heading, fontSize: fontSize.xxl, lineHeight: 38, color: dark.text, textAlign: 'center', fontStyle: 'italic' },
  qbigBy: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.gold, textAlign: 'center', marginTop: spacing.md, letterSpacing: 1 },
  era: { marginVertical: spacing.xl, alignItems: 'center' },
  eraValue: { fontFamily: fonts.heading, fontSize: 72, lineHeight: 78, color: dark.gold },
  eraLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, letterSpacing: 2, color: dark.textDim, textTransform: 'uppercase', marginTop: spacing.xs, textAlign: 'center' },
  steps: { marginVertical: spacing.lg, gap: spacing.lg },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  stepNum: { fontFamily: fonts.heading, fontSize: 40, lineHeight: 44, color: dark.accent, width: 66 },
  stepText: { flex: 1, paddingTop: 4 },
  stepTitle: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: dark.text },
  stepBody: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 22, color: dark.textDim, marginTop: spacing.xs },
  collageWrap: { marginVertical: spacing.lg, alignItems: 'center' },
  collageBox: { width: '86%', height: 210 },
  collageA: { position: 'absolute', left: 0, top: 0, width: '62%', height: 175, borderRadius: radius.md, borderWidth: 2, borderColor: dark.bg, backgroundColor: dark.surface },
  collageB: { position: 'absolute', right: 0, bottom: 0, width: '62%', height: 175, borderRadius: radius.md, borderWidth: 2, borderColor: dark.bg, backgroundColor: dark.surface },
  circlesWrap: { marginVertical: spacing.lg, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, paddingVertical: spacing.lg },
  circlesRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around', paddingHorizontal: spacing.sm },
  circleCol: { alignItems: 'center', flex: 1, paddingHorizontal: 4 },
  circle: { width: 56, height: 56, borderRadius: 28, backgroundColor: dark.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  circleValue: { fontFamily: fonts.bodyStrong, fontSize: 13, color: dark.text, textAlign: 'center' },
  circleLabel: { fontFamily: fonts.body, fontSize: fontSize.xs, lineHeight: 15, color: dark.textDim, textAlign: 'center', marginTop: spacing.sm },
  boxGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginVertical: spacing.lg },
  box: { flexGrow: 1, flexBasis: '45%', backgroundColor: dark.surface, borderRadius: radius.md, borderWidth: 1, borderColor: dark.hair, padding: spacing.md },
  boxTitle: { fontFamily: fonts.heading, fontSize: fontSize.base, color: dark.gold },
  boxText: { fontFamily: fonts.body, fontSize: fontSize.xs, lineHeight: 18, color: dark.text, marginTop: spacing.xs, opacity: 0.9 },
});
