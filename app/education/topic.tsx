import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SaveHeart } from '@/components/save-heart';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { logEvent } from '@/lib/admin';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark, findTopic, flattenPages, TOPICS } from '@/constants/education';
import { eduImage } from '@/constants/education-images';
import { t, useLang, getLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export default function TopicScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { topic: key } = useLocalSearchParams<{ topic: string }>();

  // For the admin board: which pieces people open.
  useEffect(() => { if (key) logEvent('topic', key); }, [key]);
  const topic = findTopic(key);

  if (!topic) {
    return <SafeAreaView style={styles.safe} edges={['top']}><View style={styles.center}><Text style={styles.dim}>Topic not found.</Text></View></SafeAreaView>;
  }

  const cover = eduImage(topic.cover);
  const totalPages = flattenPages(topic).length;
  let pageCursor = 0;
  const others = TOPICS.filter((t) => t.key !== topic.key).slice(0, 3);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.cover}>
          {cover ? <Image source={cover} style={styles.coverImg} resizeMode="cover" /> : <View style={styles.coverIcon}><Ionicons name="image-outline" size={30} color={dark.textDim} /></View>}
          <LinearGradient
            colors={['rgba(23,17,15,0)', 'rgba(23,17,15,0.35)', 'rgba(23,17,15,0.8)', 'rgba(23,17,15,0.97)']}
            locations={[0, 0.42, 0.78, 1]}
            style={styles.scrim}
            pointerEvents="none"
          />
          <Pressable style={styles.close} hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
            <Ionicons name="close" size={24} color={dark.text} />
          </Pressable>
          <View style={styles.coverText}>
            <Text style={styles.eyebrow}>{getLang() === 'fa' ? 'تاریخ' : 'HISTORY'}</Text>
            <Text style={styles.name}>{topic.name}</Text>
            <Text style={styles.years}>{topic.years}  ·  {topic.persian}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={[styles.essence, getLang() === 'fa' && (topic as any).essenceFa && { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl', fontSize: 15, lineHeight: 30 }]}>{getLang() === 'fa' && (topic as any).essenceFa ? (topic as any).essenceFa : topic.essence}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaChip}><Ionicons name="book-outline" size={15} color={dark.gold} /><Text style={styles.metaText}>{topic.chapters.length} {getLang() === 'fa' ? 'فصل' : 'chapters'}</Text></View>
            <View style={styles.metaChip}><Ionicons name="document-text-outline" size={15} color={dark.gold} /><Text style={styles.metaText}>{totalPages} {getLang() === 'fa' ? 'صفحه' : 'pages'}</Text></View>
            <View style={{ flex: 1 }} />
            <SaveHeart itemKey={'topic-' + topic.key} size={19} tint={dark.gold} />
          </View>

          <Pressable style={styles.startBtn} onPress={() => router.navigate('/education/reader?topic=' + topic.key + '&page=0' as any)}>
            <Text style={styles.startText}>{t(APP.startReading)}</Text>
            <Ionicons name="arrow-forward" size={18} color={dark.bg} />
          </Pressable>

          <Text style={styles.sectionLabel}>{t(APP.chapters)}</Text>
          <View style={styles.chapters}>
            {topic.chapters.map((c, i) => {
              const startPage = pageCursor;
              pageCursor += c.pages.length;
              return (
                <Pressable key={c.key} style={styles.chRow} onPress={() => router.navigate('/education/reader?topic=' + topic.key + '&page=' + startPage as any)}>
                  <Text style={styles.chNum}>{String(i + 1).padStart(2, '0')}</Text>
                  <View style={styles.chText}>
                    <Text style={[styles.chTitle, getLang() === 'fa' && (c as any).titleFa && { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' }]}>{getLang() === 'fa' && (c as any).titleFa ? (c as any).titleFa : c.title}</Text>
                    {c.subtitle ? <Text style={styles.chSub}>{c.subtitle}  ·  {c.pages.length} pages</Text> : null}
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={dark.textDim} />
                </Pressable>
              );
            })}
          </View>

          {topic.sources.length ? (
            <>
              <Text style={styles.sectionLabel}>{t(APP.sources)}</Text>
              <View style={styles.sources}>{topic.sources.map((s) => <Text key={s} style={styles.source}>· {s}</Text>)}</View>
            </>
          ) : null}

          <Text style={styles.sectionLabel}>{t(APP.continueExploring)}</Text>
          <View style={styles.chapters}>
            {others.map((t) => (
              <Pressable key={t.key} style={styles.chRow} disabled={t.status === 'soon'} onPress={() => router.replace('/education/topic?topic=' + t.key as any)}>
                <View style={styles.chText}>
                  <Text style={styles.chTitle}>{t.name}</Text>
                  <Text style={styles.chSub}>{t.status === 'soon' ? 'Coming soon' : t.years}</Text>
                </View>
                <Text style={styles.otherGlyph}>{t.persian}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: dark.bg },
  container: { paddingBottom: spacing.xxl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { fontFamily: fonts.body, fontSize: fontSize.base, color: dark.textDim },
  cover: { height: 420, backgroundColor: dark.surface, justifyContent: 'flex-end' },
  coverImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  coverIcon: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  scrim: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 340 },
  close: { position: 'absolute', top: spacing.md, right: spacing.lg, width: 40, height: 40, borderRadius: radius.pill, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
  coverText: { padding: spacing.lg },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 3, color: dark.gold },
  name: { fontFamily: fonts.heading, fontSize: fontSize.display, color: dark.text, marginTop: spacing.xs },
  years: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.textDim, marginTop: spacing.xs },
  body: { padding: spacing.lg },
  essence: { fontFamily: fonts.body, fontSize: fontSize.lg, lineHeight: 28, color: dark.text, marginTop: spacing.sm },
  metaRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: dark.hair, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  metaText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: dark.textDim },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: dark.text, borderRadius: radius.pill, paddingVertical: spacing.md, marginTop: spacing.xl },
  startText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.base, color: dark.bg },
  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: dark.textDim, marginTop: spacing.xxl, marginBottom: spacing.md },
  chapters: { gap: spacing.sm },
  chRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: dark.surface, borderRadius: radius.md, borderWidth: 1, borderColor: dark.hair, padding: spacing.md },
  chNum: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: dark.gold, width: 30 },
  chText: { flex: 1 },
  chTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: dark.text },
  chSub: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.textDim, marginTop: 2 },
  sources: { gap: 4 },
  source: { fontFamily: fonts.body, fontSize: fontSize.sm, color: dark.textDim, lineHeight: 22 },
  otherGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xl, color: dark.accent },
});
