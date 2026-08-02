import { useEffect, useRef, useState } from 'react';
import { SECTIONS } from '@/constants/i18n/sections';
import { t, useLang, getLang } from '@/lib/i18n';
import { HOME } from '@/constants/i18n/home';
import { Animated, Image, LayoutAnimation, Platform, Pressable, ScrollView, StyleSheet, Text, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { getDailyFact } from '@/constants/daily-facts';
import { getNewThisWeek, initials } from '@/constants/featured';
import { PERSIAN_ALPHABET } from '@/constants/persian-alphabet';
import { useProgress } from '@/lib/progress-store';
import { ZandHeader } from '@/components/zand-header';
import { ContinueReading } from '@/components/continue-reading';
import { ContinueLearning } from '@/components/continue-learning';
import { TOPICS } from '@/constants/education';
import { TRADITIONS } from '@/constants/traditions';
import { LITERATURE_FIGURES, AUTHORS } from '@/constants/literature';
import { eduImage } from '@/constants/education-images';
import { STORIES, dailyFor } from '@/constants/stories';
import { ARTICLES, orderedArticles, articleOfDay } from '@/constants/articles';
import { isHidden, useHidden } from '@/lib/admin';
import { FramedImage } from '@/components/framed-image';
import { CultureCover } from '@/components/culture-cover';
import { LanguageCover } from '@/components/language-cover';
import { getFrame } from '@/lib/image-frames';
import { NOWRUZ_MOMENTS } from '@/constants/nowruz';
import { YALDA_MOMENTS } from '@/constants/yalda';
import { typicalDeck, typicalOfDay, CULTURE_TOPICS } from '@/constants/culture';
import { GEO_CHAPTERS } from '@/constants/geography';
import { INBOX, pr } from '@/constants/profile';
import { APP } from '@/constants/i18n/app';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Card = { key: string; title: string; sub: string; image?: string; route: string; kind?: string; accent?: string; glyph?: string; persian?: string; geoKey?: string };

const PILLAR_T: Record<string, any> = {
  History: SECTIONS.history, Culture: SECTIONS.culture, Geography: SECTIONS.geography,
  Literature: SECTIONS.literature, Language: SECTIONS.language, Articles: SECTIONS.articles,
};
const PILLARS = ['History', 'Culture', 'Geography', 'Literature', 'Language', 'Articles'] as const;
type Pillar = (typeof PILLARS)[number];

function coverFor(authorKey?: string) {
  const a = AUTHORS.find((x) => x.key === authorKey);
  return a?.cover;
}

function cardsFor(pillar: Pillar): Card[] {
  if (pillar === 'History') {
    return TOPICS.map((t) => ({ key: t.key, title: t.name, sub: t.years, image: t.cover, route: '/education/topic?topic=' + t.key }));
  }
  if (pillar === 'Articles') {
    return orderedArticles().filter((a: any) => !isHidden(a.key)).map((a: any) => ({
      key: a.key, title: a.title, sub: a.tag, image: a.cover,
      route: '/article?article=' + a.key,
    }));
  }
  if (pillar === 'Culture') {
    const culture = CULTURE_TOPICS.filter((t: any) => t.key !== 'nowruz').map((t: any) => ({
      key: t.key, title: t.title, sub: t.tag, image: 'culture-' + t.key,
      route: '/culture/topic?topic=' + t.key,
      kind: 'culture', accent: t.accent, glyph: t.glyph, persian: t.persian,
    }));
    const trad = TRADITIONS.filter((t: any) => t.key !== 'nowruz').map((t: any) => ({
      key: 'trad-' + t.key, title: t.name, sub: t.season ?? 'TRADITION', image: t.cover,
      route: (t.key === 'nowruz' || t.key === 'yalda') ? '/traditions' : '/traditions/tradition?tradition=' + t.key,
    }));
    return [...culture, ...trad];
  }
  const GEO_HOME = [
    { key: 'g1', title: 'The Heart', sub: 'WHERE IRAN SITS', image: 'iran-crossroads' },
    { key: 'g3', title: 'Neighbours', sub: 'IRAN TODAY', image: 'iran-neighbours' },
    { key: 'g4b', title: 'Landscapes', sub: 'THE LAND', image: 'geo-alborz' },
    { key: 'g5', title: 'Great Cities', sub: 'WHERE THE PEOPLE ARE', image: 'GEO_CITY_IMG' },
  ];
  if (pillar === 'Geography') {
    return GEO_HOME.map((c) => ({
      key: c.key, title: c.title, sub: c.sub, image: c.image,
      route: '/geography?jump=' + c.key,
    }));
  }
  if (pillar === 'Literature') {
    return LITERATURE_FIGURES.filter((f: any) => f.status === 'ready').map((f: any) => ({
      key: f.name, title: f.name, sub: f.years,
      image: coverFor(f.authorKey),
      route: '/literature/reader?author=' + f.authorKey + '&page=0',
    }));
  }
  return [
    { key: 'story', title: 'Where It Comes From', sub: 'The story of Persian', image: 'lang-story', route: '/language', kind: 'lang' },
    { key: 'alphabet', title: 'The Alphabet', sub: '32 letters', image: 'lang-alphabet', route: '/learn/alphabet', kind: 'lang' },
    { key: 'flashcards', title: 'Flashcards', sub: 'Build your words', image: 'lang-flashcards', route: '/learn/flashcards', kind: 'lang' },
    { key: 'writing', title: 'Writing', sub: 'Shape the letters', image: 'lang-writing', route: '/learn/writing', kind: 'lang' },
    { key: 'quizzes', title: 'Quizzes', sub: 'Test yourself', image: 'lang-quizzes', route: '/learn/quizzes', kind: 'lang' },
  ];
}

function FadeIn({ children, delay = 0 }: { children: any; delay?: number }) {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(12)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 420, delay, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 420, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>{children}</Animated.View>;
}

/* the page changes temperature as you go down it */
function ScrollTint({ y }: { y: Animated.Value }) {
  const bands = [
    { c: '#B08A46', at: [0, 300, 700] },
    { c: '#8C3A2E', at: [500, 1100, 1800] },
    { c: '#417270', at: [1400, 2100, 3000] },
  ];
  return (
    <View style={StyleSheet.absoluteFill as any} pointerEvents="none">
      {bands.map((b, i) => {
        const op = y.interpolate({ inputRange: b.at as number[], outputRange: [0, 0.075, 0], extrapolate: 'clamp' });
        return (
          <Animated.View key={i} style={[StyleSheet.absoluteFill as any, { opacity: op }]}>
            <LinearGradient colors={[b.c, b.c + '44', 'transparent']} locations={[0, 0.42, 1]}
              start={{ x: 0.95, y: 0 }} end={{ x: 0.05, y: 0.8 }} style={StyleSheet.absoluteFill as any} />
          </Animated.View>
        );
      })}
    </View>
  );
}

/* whichever turn of the year is closer */
const WINDOW_DAYS = 45;

function nextTurn() {
  const now = Date.now();
  const nz = NOWRUZ_MOMENTS.map((s) => new Date(s).getTime()).find((t) => t > now);
  const yl = YALDA_MOMENTS.map((s) => new Date(s).getTime()).find((t) => t > now);
  const pick = (!yl || (nz && nz < yl))
    ? { t: nz!, name: 'Nowruz', fa: 'نوروز', x: 'the year turns', a: '#B08A46', b: '#D9B96C' }
    : { t: yl!, name: 'Shab e Yalda', fa: 'یلدا', x: 'the longest night', a: '#7E4550', b: '#BF949F' };
  if (!pick.t) return null;
  const days = (pick.t - now) / 86400000;
  return days <= WINDOW_DAYS ? pick : null;
}

function Countdown() {
  const [turn] = useState(nextTurn);
  const [left, setLeft] = useState(turn ? turn.t - Date.now() : 0);

  useEffect(() => {
    if (!turn) return;
    const id = setInterval(() => setLeft(turn.t - Date.now()), 1000);
    return () => clearInterval(id);
  }, [turn]);

  if (!turn) return null;
  const s = Math.max(0, Math.floor(left / 1000));
  const cells = [
    { n: Math.floor(s / 86400), l: 'D' },
    { n: Math.floor((s % 86400) / 3600), l: 'H' },
    { n: Math.floor((s % 3600) / 60), l: 'M' },
    { n: s % 60, l: 'S' },
  ];

  return (
    <Pressable style={styles.cd} onPress={() => router.navigate('/traditions' as any)}>
      <LinearGradient colors={[turn.a, turn.b]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cdFa}>{turn.fa}</Text>
        <Text style={styles.cdName}>{turn.name}</Text>
        <Text style={styles.cdX}>{turn.x}</Text>
      </View>
      <View style={styles.cdRow}>
        {cells.map((c, i) => (
          <View key={i} style={styles.cdCell}>
            <Text style={styles.cdN}>{String(c.n).padStart(2, '0')}</Text>
            <Text style={styles.cdL}>{c.l}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

function ArticleStoryCard({ a }: { a: any }) {
  const src = eduImage(a.cover);
  return (
    <Pressable style={styles.story} onPress={() => router.navigate(('/article?article=' + a.key) as any)}>
      <FramedImage name={a.cover} source={src} style={StyleSheet.absoluteFill as any}
        onPress={() => router.navigate(('/article?article=' + a.key) as any)}>
        <LinearGradient colors={['rgba(20,14,10,0.6)', 'rgba(20,14,10,0.1)', 'rgba(20,14,10,0.55)', 'rgba(20,14,10,0.96)']} locations={[0, 0.32, 0.62, 1]} style={StyleSheet.absoluteFill as any} />
        <View style={styles.storyTop} pointerEvents="none">
          <Text style={styles.storyWho}>{a.tag}</Text>
          <View style={styles.storyDot} />
          <Text style={styles.storyWho}>{a.readMins} min</Text>
        </View>
        <View style={styles.storyBody} pointerEvents="none">
          <Text style={styles.storyHook}>{a.title}</Text>
          <Text style={styles.storyTitle} numberOfLines={2}>{a.excerpt ?? a.standfirst}</Text>
        </View>
      </FramedImage>
    </Pressable>
  );
}

function StoryCard({ st }: { st: any }) {
  const src = eduImage(st.image);
  const go = st.article ? ('/article?article=' + st.article) : '/section/articles';
  return (
    <Pressable style={styles.story} onPress={() => router.navigate(go as any)}>
      {src ? <Image source={src} style={styles.storyImg} resizeMode="cover" /> : <View style={[styles.storyImg, styles.bandPh]} />}
      <LinearGradient colors={['transparent', 'rgba(20,14,10,0.55)', 'rgba(20,14,10,0.95)']} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFill as any} />
      <View style={styles.storyBody}>
        <View style={[styles.storyTag, { borderColor: st.tint }]}>
          <Text style={[styles.storyTagT, { color: st.tint }]}>{st.tag}</Text>
        </View>
        <Text style={styles.storyHook}>{st.hook}</Text>
        <Text style={styles.storyTitle}>{st.title}</Text>
        <View style={styles.storyFoot}>
          <Text style={styles.storyWho}>{st.where}</Text>
          <View style={styles.storyDot} />
          <Text style={styles.storyWho}>{st.read}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function BandCard({ card }: { card: Card }) {
  const src = card.image ? eduImage(card.image) : undefined;
  const uploaded = card.image ? !!getFrame(card.image).uri : false;
  const showTile = card.kind === 'culture' && !src && !uploaded && card.accent && card.glyph;
  const showLang = card.kind === 'lang' && !src && !uploaded;
  return (
    <Pressable style={styles.bandCard} onPress={() => router.navigate(card.route as any)}>
      <View style={styles.bandImgWrap}>
        {showTile ? (
          <FramedImage name={card.image ?? card.key} source={undefined} style={StyleSheet.absoluteFill as any}
            onPress={() => router.navigate(card.route as any)}>
            <CultureCover accent={card.accent!} glyph={card.glyph!} persian={card.persian} />
          </FramedImage>
        ) : showLang ? (
          <FramedImage name={card.image ?? card.key} source={undefined} style={StyleSheet.absoluteFill as any}
            onPress={() => router.navigate(card.route as any)}>
            <LanguageCover name={card.image ?? card.key} />
          </FramedImage>
        ) : (
          <FramedImage name={card.image ?? card.key} source={src} style={StyleSheet.absoluteFill as any}
            onPress={() => router.navigate(card.route as any)}>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.22)']} locations={[0, 0.55, 1]} style={StyleSheet.absoluteFill as any} pointerEvents="none" />
          </FramedImage>
        )}
      </View>
      <Text style={styles.bandTitle} numberOfLines={1}>{card.title}</Text>
      <Text style={styles.bandSub} numberOfLines={1}>{card.sub}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  useLang();
  const fact = getDailyFact();
  useHidden();
  const dailyArticle = articleOfDay();
  const { learnedLetters, markActivity } = useProgress();
  const [pillar, setPillar] = useState<Pillar>('History');
  const [daily] = useState(() => dailyFor());
  const [dailyOpen, setDailyOpenRaw] = useState(false);
  const setDailyOpen = (fn: any) => { LayoutAnimation.configureNext(LayoutAnimation.create(220, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity)); setDailyOpenRaw(fn); };
  const [weekly] = useState(() => typicalOfDay());
  const [flipped, setFlipped] = useState(false);
  const y = useRef(new Animated.Value(0)).current;

  const pending = INBOX.filter((i) => !i.done);

  useEffect(() => { markActivity(); }, [markActivity]);

  const total = PERSIAN_ALPHABET.length;
  const learned = PERSIAN_ALPHABET.filter((l) => learnedLetters.includes(l.char)).length;
  const started = learned > 0 && learned < total;
  const done = learned >= total;

  const resumeTitle = done ? 'Review the alphabet' : started ? 'Continue the alphabet' : 'Start with the alphabet';
  const resumeSub = done ? 'All ' + total + ' letters learned. Keep them sharp.'
    : started ? learned + ' of ' + total + ' letters so far.'
    : 'Learn the letters, their shapes and sounds.';

  const cards = cardsFor(pillar);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollTint y={y} />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ZandHeader />
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
          style={styles.scroll}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <FadeIn><Text style={styles.greeting}>{t(HOME.greeting)}</Text></FadeIn>

          {pending.length > 0 ? (
            <FadeIn delay={40}>
              <Pressable style={styles.nudge} onPress={() => router.navigate('/profile?tab=friends' as any)}>
                <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
                <View style={styles.nudgeAv}><Text style={styles.nudgeAvT}>{pending[0].fromFa[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nudgeT}>{pending[0].from} {pending[0].kind === 'word' ? t(HOME.sentYouWord) : t(HOME.sentYouTopic)}</Text>
                  <Text style={styles.nudgeX}>
                    {pending.length > 1 ? t(HOME.and) + ' ' + (pending.length - 1) + ' ' + t(HOME.moreWaiting) : '“' + pending[0].note + '”'}
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color={pr.friendA} />
              </Pressable>
            </FadeIn>
          ) : null}

          <FadeIn delay={60}>
            <Text style={styles.sectionLabel}>{t(HOME.today)}</Text>
            <Pressable style={styles.daily} onPress={() => daily.route ? setDailyOpen((v) => !v) : undefined}>
              <View style={styles.dailyHead}>
                <View style={styles.dailyRule} />
                <Text style={styles.dailyKind}>
                  {t(({ fact: HOME.kindFact, word: HOME.kindWord, verse: HOME.kindVerse, story: HOME.kindStory, dish: HOME.kindDish, card: HOME.kindCard } as any)[daily.kind] ?? HOME.kindFact)}
                </Text>
              </View>
              {daily.fa ? (
                <View style={styles.dailyFaRow}>
                  <Text style={styles.dailyFa}>{daily.fa}</Text>
                  {daily.tr ? <Text style={styles.dailyTr}>{daily.tr}</Text> : null}
                </View>
              ) : null}
              <Text style={[styles.dailyT, getLang() === 'fa' && (daily as any).titleFa && { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' }]}>{getLang() === 'fa' && (daily as any).titleFa ? (daily as any).titleFa : daily.title}</Text>

              {!daily.route ? (
                <Text style={[styles.dailyX, getLang() === 'fa' && (daily as any).xFa && { fontFamily: fonts.persian, fontSize: 15, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' }]}>{getLang() === 'fa' && (daily as any).xFa ? (daily as any).xFa : daily.x}</Text>
              ) : !dailyOpen ? (
                <View style={styles.dailyCta}>
                  <Text style={styles.dailyCtaT}>{t(HOME.tapToRead)}</Text>
                  <Ionicons name="chevron-down" size={12} color={colors.accent} />
                </View>
              ) : (
                <>
                  <Text style={[styles.dailyX, getLang() === 'fa' && (daily as any).xFa && { fontFamily: fonts.persian, fontSize: 15, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' }]}>{getLang() === 'fa' && (daily as any).xFa ? (daily as any).xFa : daily.x}</Text>
                  <Pressable style={styles.dailyCta} onPress={() => router.navigate(daily.route as any)}>
                    <Text style={styles.dailyCtaT}>{daily.cta}</Text>
                    <Ionicons name="arrow-forward" size={12} color={colors.accent} />
                  </Pressable>
                </>
              )}
            </Pressable>
          </FadeIn>

          <FadeIn delay={120}><Countdown /></FadeIn>

          <FadeIn delay={150}><ContinueReading label="KEEP READING" /></FadeIn>

          <FadeIn delay={210}>
            <View style={styles.labelRow}>
              <Text style={styles.sectionLabelInline}>{t(APP.stories)}</Text>
              <Pressable hitSlop={8} onPress={() => router.navigate('/section/articles' as any)}>
                <Text style={styles.seeAll}>all of them</Text>
              </Pressable>
            </View>
          </FadeIn>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.band} contentContainerStyle={styles.bandInner}>
            {ARTICLES.filter((a) => !isHidden(a.key)).slice(0, 8).map((a) => <ArticleStoryCard key={a.key} a={a} />)}
          </ScrollView>

          <FadeIn delay={180}><Text style={styles.sectionLabel}>{t(HOME.explore)}</Text></FadeIn>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll} contentContainerStyle={styles.tabRow}>
            {PILLARS.map((p) => {
              const on = p === pillar;
              return (
                <Pressable key={p} onPress={() => setPillar(p)} style={styles.tab}>
                  <Text style={[styles.tabText, on && styles.tabTextOn]}>{PILLAR_T[p] ? t(PILLAR_T[p]) : p.toUpperCase()}</Text>
                  <View style={[styles.tabRule, on && styles.tabRuleOn]} />
                </Pressable>
              );
            })}
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.band} contentContainerStyle={styles.bandInner}>
            {cards.map((c) => <BandCard key={pillar + c.key} card={c} />)}
          </ScrollView>

          {dailyArticle ? (
          <FadeIn delay={240}>
            <Text style={styles.sectionLabel}>{t(HOME.newThisWeek)}</Text>
            <Pressable style={styles.featuredCard} onPress={() => router.navigate(('/article?article=' + dailyArticle.key) as any)}>
              <View style={styles.formatTag}><Text style={styles.formatTagText}>{dailyArticle.tag}</Text></View>
              <Text style={styles.featuredTitle}>{dailyArticle.title}</Text>
              <Text style={styles.featuredBlurb} numberOfLines={2}>{dailyArticle.excerpt ?? dailyArticle.standfirst}</Text>
              <View style={styles.guestRow}>
                <View style={styles.guestText}>
                  <Text style={styles.guestName}>{dailyArticle.subject ?? ''}</Text>
                  <Text style={styles.guestRole}>{dailyArticle.readMins} min read</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color={colors.accent} />
              </View>
            </Pressable>
          </FadeIn>
          ) : null}

          <FadeIn delay={270}>
            <Text style={styles.sectionLabel}>{t(HOME.jumpBackIn)}</Text>
            <ContinueLearning />
          </FadeIn>

          <FadeIn delay={300}>
            <Text style={styles.sectionLabel}>{t(HOME.typical)}</Text>
            <Pressable style={styles.tp} onPress={() => setFlipped((v) => !v)}>
              {!flipped ? (
                <>
                  {weekly.fa ? <Text style={styles.tpFa}>{weekly.fa}</Text> : null}
                  <Text style={styles.tpFront}>{weekly.front}</Text>
                  <Text style={styles.tpHint}>touch for the truth underneath</Text>
                </>
              ) : (
                <>
                  <Text style={styles.tpBack}>{weekly.back}</Text>
                  <Pressable onPress={() => router.navigate('/culture/topic?topic=typical' as any)}>
                    <Text style={styles.tpMore}>all fourteen cards</Text>
                  </Pressable>
                </>
              )}
            </Pressable>
          </FadeIn>

          <FadeIn delay={330}>
            <Pressable style={styles.fal} onPress={() => router.navigate('/literature/reader?author=hafez&page=6' as any)}>
              <Text style={styles.falFa}>فال حافظ</Text>
              <Text style={styles.falT}>{t(APP.askTheBook)}</Text>
              <Text style={styles.falX}>Hold something in your heart and open it at random. Iranians have been doing this for six hundred years.</Text>
              <View style={styles.falBtn}><Text style={styles.falBtnT}>{t(APP.openIt)}</Text></View>
            </Pressable>
          </FadeIn>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const CARD_W = 150;
const STORY_W = 250;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  greeting: { fontFamily: fonts.heading, fontSize: 30, color: colors.textPrimary, marginTop: spacing.md },
  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.textSecondary, letterSpacing: 2.5, marginTop: spacing.xl, marginBottom: spacing.sm },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl, marginBottom: spacing.sm },
  sectionLabelInline: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.textSecondary, letterSpacing: 2.5 },
  seeAll: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.accent },

  nudge: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: 12, overflow: 'hidden', marginTop: spacing.md },
  nudgeAv: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' },
  nudgeAvT: { fontFamily: fonts.persian, fontSize: 15, color: '#241C19' },
  nudgeT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#241C19' },
  nudgeX: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(36,28,25,0.65)', fontStyle: 'italic' },

  factCard: { backgroundColor: colors.accent, borderRadius: radius.lg, padding: spacing.lg, overflow: 'hidden' },
  factKicker: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.surface, opacity: 0.9 },
  factText: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: colors.surface, marginTop: spacing.sm },
  factGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xl, color: colors.surface, opacity: 0.6, textAlign: 'right', marginTop: spacing.md },

  daily: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.md },
  dailyHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dailyRule: { width: 14, height: 1, backgroundColor: colors.accent },
  dailyKind: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 2, color: colors.accent },
  dailyFaRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginTop: spacing.md },
  dailyFa: { fontFamily: fonts.persian, fontSize: 26, color: colors.textPrimary },
  dailyTr: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, fontStyle: 'italic' },
  dailyT: { fontFamily: fonts.heading, fontSize: 21, lineHeight: 27, color: colors.textPrimary, marginTop: spacing.xs },
  dailyX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.xs },
  dailyCta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.md },
  dailyCtaT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.accent },

  cd: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: radius.lg, overflow: 'hidden', marginTop: spacing.md },
  cdFa: { fontFamily: fonts.persian, fontSize: 17, color: 'rgba(255,255,255,0.85)' },
  cdName: { fontFamily: fonts.heading, fontSize: 21, color: '#FFF' },
  cdX: { fontFamily: fonts.body, fontSize: 10.5, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' },
  cdRow: { flexDirection: 'row', gap: 6 },
  cdCell: { alignItems: 'center', minWidth: 26 },
  cdN: { fontFamily: fonts.heading, fontSize: 19, color: '#FFF' },
  cdL: { fontFamily: fonts.bodyStrong, fontSize: 7, color: 'rgba(255,255,255,0.7)' },

  tabScroll: { marginHorizontal: -spacing.lg },
  tabRow: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  tab: { paddingBottom: spacing.sm },
  tabText: { fontFamily: fonts.bodyStrong, fontSize: 12, letterSpacing: 1.5, color: colors.textSecondary },
  tabTextOn: { color: colors.textPrimary },
  tabRule: { height: 2, backgroundColor: 'transparent', marginTop: spacing.sm, borderRadius: 1 },
  tabRuleOn: { backgroundColor: colors.accent },

  band: { marginHorizontal: -spacing.lg, marginTop: spacing.md },
  bandInner: { paddingHorizontal: spacing.lg, gap: spacing.md },
  bandCard: { width: CARD_W },
  bandImgWrap: { width: CARD_W, height: 200, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surface },
  bandImg: { width: '100%', height: '100%' },
  bandPh: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  bandFade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 90 },
  bandTitle: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary, marginTop: spacing.sm },
  bandSub: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 1 },

  story: { width: STORY_W, height: 300, borderRadius: radius.md, overflow: 'hidden', justifyContent: 'flex-end', backgroundColor: colors.surface },
  storyImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  storyBody: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: spacing.md },
  storyTop: { position: 'absolute', top: spacing.md, left: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 6 },
  storyTag: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: 'rgba(0,0,0,0.3)' },
  storyTagT: { fontFamily: fonts.bodyStrong, fontSize: 7, letterSpacing: 1.2 },
  storyHook: { fontFamily: fonts.heading, fontSize: 19, lineHeight: 24, color: '#FFF', marginTop: spacing.sm },
  storyTitle: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: 'rgba(255,255,255,0.85)', marginTop: 3, fontStyle: 'italic' },
  storyFoot: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
  storyWho: { fontFamily: fonts.bodyStrong, fontSize: 9, color: 'rgba(255,255,255,0.7)' },
  storyDot: { width: 2, height: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.5)' },

  featuredCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  formatTag: { alignSelf: 'flex-start', backgroundColor: colors.background, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 4, borderWidth: 1, borderColor: colors.border },
  formatTagText: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.accent },
  featuredTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 25, color: colors.textPrimary, marginTop: spacing.md },
  featuredBlurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, marginTop: spacing.xs },
  guestRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  avatar: { width: 40, height: 40, borderRadius: radius.pill, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.surface },
  guestText: { flex: 1 },
  guestName: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  guestRole: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },

  tp: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: '#417270', padding: spacing.lg, alignItems: 'center', minHeight: 150, justifyContent: 'center' },
  tpTag: { position: 'absolute', top: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: '#417270', borderRadius: radius.pill, paddingHorizontal: 7, paddingVertical: 2 },
  tpTagT: { fontFamily: fonts.bodyStrong, fontSize: 7, letterSpacing: 1.2, color: '#417270' },
  tpFa: { fontFamily: fonts.persian, fontSize: 19, color: '#417270', marginTop: spacing.lg },
  tpFront: { fontFamily: fonts.heading, fontSize: 20, lineHeight: 28, color: colors.textPrimary, textAlign: 'center', marginTop: spacing.sm },
  tpHint: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.2, color: '#417270', marginTop: spacing.lg },
  tpBack: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: colors.textPrimary, textAlign: 'center', marginTop: spacing.lg },
  tpMore: { fontFamily: fonts.bodyStrong, fontSize: 10, color: '#417270', marginTop: spacing.md },

  resumeCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  resumeIcon: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  resumeText: { flex: 1 },
  resumeTitle: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  resumeSub: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  fal: { alignItems: 'center', backgroundColor: '#241C19', borderRadius: radius.lg, padding: spacing.xl, marginTop: spacing.xl },
  falFa: { fontFamily: fonts.persian, fontSize: 24, color: '#C6A15B' },
  falT: { fontFamily: fonts.heading, fontSize: 23, color: '#F2EAE4', marginTop: spacing.xs },
  falX: { fontFamily: fonts.body, fontSize: 12, lineHeight: 19, color: '#A99C95', textAlign: 'center', marginTop: spacing.sm },
  falBtn: { borderWidth: 1, borderColor: '#C6A15B', borderRadius: radius.pill, paddingHorizontal: spacing.xl, paddingVertical: 7, marginTop: spacing.lg },
  falBtnT: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: '#C6A15B' },
});
