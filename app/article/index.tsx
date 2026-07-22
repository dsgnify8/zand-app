import { useState, useEffect, useRef } from 'react';
import { Image, Linking, Share, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { ar, articleByKey, type ArBlock } from '@/constants/articles';
import { eduImage } from '@/constants/education-images';
import { FramedImage } from '@/components/framed-image';
import { useSaved, markRead, saveScroll, getScroll } from '@/lib/saved-store';
import { bump, recordFinished } from '@/lib/stats-store';
import { logEvent } from '@/lib/admin';
import { SendArticleSheet } from '@/components/send-article-sheet';

function Block({ b }: { b: ArBlock }) {
  switch (b.t) {
    case 'lead': return <Text style={s.lead}>{b.x}</Text>;
    case 'p': return <Text style={s.p}>{b.x}</Text>;
    case 'h': return <Text style={s.h}>{b.x}</Text>;
    case 'pull': return (
      <View style={s.pull}>
        <View style={s.pullRule} />
        <Text style={s.pullText}>{b.x}</Text>
      </View>
    );
    case 'line': return (
      <View style={s.lineWrap}>
        <Text style={s.lineText}>{b.x}</Text>
      </View>
    );
    case 'divider': return (
      <View style={s.divWrap}>
        <View style={s.divBar} />
        <View style={s.divDot} />
        <View style={s.divBar} />
      </View>
    );
    case 'quote': return (
      <View style={s.quote}>
        <Text style={s.quoteText}>{b.x}</Text>
        {b.who ? <Text style={s.quoteWho}>{b.who}</Text> : null}
      </View>
    );
    case 'img': {
      const src = eduImage(b.key);
      return (
        <View style={s.imgWrap}>
          <FramedImage name={b.key} source={src} style={s.img} />
          {b.cap ? <Text style={s.cap}>{b.cap}</Text> : null}
        </View>
      );
    }
    default: return null;
  }
}

export default function ArticleScreen() {
  const { article } = useLocalSearchParams<{ article: string }>();
  const a = articleByKey(article);

  if (!a) {
    return (
      <SafeAreaView style={s.safe}>
        <Pressable style={s.back} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={ar.ink} />
        </Pressable>
        <Text style={s.missing}>This piece could not be found.</Text>
      </SafeAreaView>
    );
  }

  const { isLiked, isSaved, toggleLike, toggleSave } = useSaved();
  const [sendOpen, setSendOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => { if (a) { markRead(a.key); bump('articlesRead'); logEvent('article', a.key); recordFinished({ key: 'art-' + a.key, title: a.title, sub: a.tag + '  ·  read', route: '/article?article=' + a.key }); } }, [a?.key]);
  const heroKey = a.hero ?? (a.cover + '-hero');
  const cover = eduImage(a.hero ?? a.cover);

  return (
    <View style={{ flex: 1, backgroundColor: ar.bg }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={s.topBar}>
          <Pressable style={s.back} hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={ar.ink} />
            <Text style={s.backT}>Articles</Text>
          </Pressable>
          <View style={s.topActions}>
            <Pressable hitSlop={8} onPress={() => toggleLike(a.key)} style={s.actBtn}>
              <Ionicons name={isLiked(a.key) ? 'heart' : 'heart-outline'} size={20} color={isLiked(a.key) ? '#C4433F' : ar.ink} />
            </Pressable>
            <Pressable hitSlop={8} onPress={() => toggleSave(a.key)} style={s.actBtn}>
              <Ionicons name={isSaved(a.key) ? 'bookmark' : 'bookmark-outline'} size={19} color={isSaved(a.key) ? ar.accent : ar.ink} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={s.container}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={200}
          onScroll={(e) => { if (a) saveScroll(a.key, e.nativeEvent.contentOffset.y); }}
          onLayout={() => { if (a) { const y = getScroll(a.key); if (y > 0) setTimeout(() => scrollRef.current?.scrollTo({ y, animated: false }), 60); } }}
        >
          <FramedImage name={heroKey} source={cover} style={s.cover} />

          <View style={s.body}>
            <Text style={s.kicker}>{a.kicker}</Text>
            <Text style={s.title}>{a.title}</Text>
            <Text style={s.standfirst}>{a.standfirst}</Text>

            <View style={s.meta}>
              <Text style={s.metaT}>{a.author ? a.author : 'ZAND'}</Text>
              <View style={s.metaDot} />
              <Text style={s.metaT}>{a.readMins} min read</Text>
            </View>

            <View style={s.divide} />

            {a.blocks.map((b, i) => <Block key={i} b={b} />)}

            <View style={s.iconRow}>
              <Pressable style={s.iconBtn} hitSlop={8} onPress={() => toggleLike(a.key)}>
                <Ionicons name={isLiked(a.key) ? 'heart' : 'heart-outline'} size={22} color={isLiked(a.key) ? '#C4433F' : ar.ink} />
              </Pressable>
              <Pressable style={s.iconBtn} hitSlop={8} onPress={() => toggleSave(a.key)}>
                <Ionicons name={isSaved(a.key) ? 'bookmark' : 'bookmark-outline'} size={21} color={isSaved(a.key) ? ar.accent : ar.ink} />
              </Pressable>
              <Pressable style={s.iconBtn} hitSlop={8} onPress={() => Share.share({ message: a.title + ' — on ZAND', url: 'https://zand.app/article/' + a.key })}>
                <Ionicons name="share-outline" size={22} color={ar.ink} />
              </Pressable>
              <Pressable style={s.iconBtn} hitSlop={8} onPress={() => setSendOpen(true)}>
                <Ionicons name="paper-plane-outline" size={20} color={ar.ink} />
              </Pressable>
            </View>

            {a.source ? (
              <Pressable style={s.source} onPress={() => Linking.openURL(a.source!.url)}>
                <View style={s.sourceRule} />
                <Text style={s.sourceT}>
                  {a.source.label}
                  <Text style={s.sourceLink}> here.</Text>
                </Text>
              </Pressable>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
      <SendArticleSheet open={sendOpen} onClose={() => setSendOpen(false)} articleTitle={a.title} />
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: ar.bg },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: spacing.lg },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  actBtn: { padding: 6 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  backT: { fontFamily: fonts.body, fontSize: 15, color: ar.ink },
  missing: { fontFamily: fonts.body, fontSize: 14, color: ar.soft, textAlign: 'center', marginTop: spacing.xxl },

  container: { paddingBottom: spacing.xxl },
  cover: { width: '100%', height: 300, backgroundColor: ar.hair },
  ph: { alignItems: 'center', justifyContent: 'center' },

  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, maxWidth: 680, alignSelf: 'center', width: '100%' },
  kicker: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2.5, color: ar.accent },
  title: { fontFamily: fonts.heading, fontSize: 32, lineHeight: 38, color: ar.ink, marginTop: spacing.sm },
  standfirst: { fontFamily: fonts.body, fontSize: 16, lineHeight: 25, color: ar.soft, marginTop: spacing.md, fontStyle: 'italic' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg },
  metaT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: ar.faint, letterSpacing: 0.5 },
  metaDot: { width: 2, height: 2, borderRadius: 1, backgroundColor: ar.faint },
  divide: { height: 1, backgroundColor: ar.hair, marginVertical: spacing.xl },

  lead: { fontFamily: fonts.heading, fontSize: 22, lineHeight: 32, color: ar.ink, marginBottom: spacing.lg },
  p: { fontFamily: fonts.body, fontSize: 16, lineHeight: 27, color: ar.ink, marginBottom: spacing.lg },
  h: { fontFamily: fonts.heading, fontSize: 22, lineHeight: 28, color: ar.ink, marginTop: spacing.md, marginBottom: spacing.md },

  pull: { alignItems: 'center', marginVertical: spacing.xl, paddingHorizontal: spacing.md },
  pullRule: { width: 40, height: 2, backgroundColor: ar.accent, marginBottom: spacing.lg },
  pullText: { fontFamily: fonts.heading, fontSize: 25, lineHeight: 34, color: ar.accent, textAlign: 'center', fontStyle: 'italic' },

  lineWrap: { borderLeftWidth: 3, borderLeftColor: ar.accent, paddingLeft: spacing.lg, marginVertical: spacing.lg },
  lineText: { fontFamily: fonts.heading, fontSize: 21, lineHeight: 30, color: ar.ink },
  divWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md, marginVertical: spacing.xl },
  divBar: { width: 40, height: 1, backgroundColor: ar.rule },
  divDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: ar.accent, transform: [{ rotate: '45deg' }] },
  quote: { borderLeftWidth: 2, borderLeftColor: ar.rule, paddingLeft: spacing.lg, marginVertical: spacing.lg },
  quoteText: { fontFamily: fonts.heading, fontSize: 19, lineHeight: 28, color: ar.ink, fontStyle: 'italic' },
  quoteWho: { fontFamily: fonts.bodyStrong, fontSize: 11, color: ar.faint, marginTop: spacing.sm, letterSpacing: 0.5 },

  imgWrap: { marginVertical: spacing.lg, marginHorizontal: -spacing.md },
  img: { width: '100%', height: 260, borderRadius: 8, backgroundColor: ar.hair },
  cap: { fontFamily: fonts.body, fontSize: 12, color: ar.faint, marginTop: spacing.sm, textAlign: 'center', fontStyle: 'italic' },

  iconRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, marginTop: spacing.xxl, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: ar.hair },
  iconBtn: { padding: 4 },
  footActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl },
  footBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderWidth: 1, borderColor: ar.hair, borderRadius: 24, paddingVertical: spacing.md },
  footBtnOn: { backgroundColor: '#FFF', borderColor: ar.rule },
  footBtnT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: ar.ink },
  source: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, paddingTop: spacing.lg },
  sourceRule: { width: 3, backgroundColor: ar.hair, borderRadius: 2 },
  sourceT: { flex: 1, fontFamily: fonts.body, fontSize: 11.5, lineHeight: 18, color: ar.faint },
  sourceLink: { fontFamily: fonts.bodyStrong, color: ar.accent, textDecorationLine: 'underline' },
});
