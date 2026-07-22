import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { useReading } from '@/lib/reading-store';
import { findTopic } from '@/constants/education';
import { eduImage } from '@/constants/education-images';
import { useSaved } from '@/lib/saved-store';
import { articleByKey } from '@/constants/articles';
import { isHidden } from '@/lib/admin';
import { FramedImage } from '@/components/framed-image';

type Item = {
  key: string;
  kind: 'topic' | 'article';
  title: string;
  meta: string;
  pct?: number;
  image?: string;
  framed?: boolean;
  route: string;
};

export function KeepReading() {
  const { lastRead, percentFor, inProgress } = useReading() as any;
  const { recent } = useSaved();

  const items: Item[] = [];

  // in-progress topics: use inProgress() if the store exposes it, else the single lastRead
  const topicEntries = typeof inProgress === 'function' ? inProgress() : (lastRead() ? [lastRead()] : []);
  for (const entry of topicEntries) {
    if (!entry) continue;
    const topic = findTopic(entry.topicKey);
    if (!topic) continue;
    const pct = percentFor(entry.topicKey);
    items.push({
      key: 'topic-' + topic.key,
      kind: 'topic',
      title: topic.name,
      meta: pct + '% read',
      pct,
      image: topic.cover,
      route: '/education/reader?topic=' + topic.key + '&page=' + entry.page,
    });
  }

  // recently read articles
  for (const k of recent) {
    const a = articleByKey(k);
    if (!a || isHidden(a.key)) continue;
    items.push({
      key: 'article-' + a.key,
      kind: 'article',
      title: a.title,
      meta: a.readMins + ' min read',
      image: a.cover,
      framed: true, // article
      route: '/article?article=' + a.key,
    });
  }

  if (items.length === 0) return null;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>KEEP READING</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
        {items.map((it) => (
          <Pressable key={it.key} style={styles.card} onPress={() => router.navigate(it.route as any)}>
            <View style={styles.thumb}>
              {it.framed ? (
                <FramedImage name={it.image!} source={it.image ? eduImage(it.image) : undefined} style={StyleSheet.absoluteFill as any} onPress={() => router.navigate(it.route as any)} />
              ) : it.image && eduImage(it.image) ? (
                <Image source={eduImage(it.image)} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
              ) : (
                <View style={[StyleSheet.absoluteFill as any, styles.thumbEmpty]}><Ionicons name="book" size={20} color={colors.textSecondary} /></View>
              )}
              <View style={styles.kindTag}>
                <Text style={styles.kindTagT}>{it.kind === 'topic' ? 'LEARN' : 'READ'}</Text>
              </View>
            </View>
            <Text style={styles.name} numberOfLines={2}>{it.title}</Text>
            {it.pct !== undefined ? (
              <View style={styles.track}><View style={[styles.fill, { width: (it.pct + '%') as any }]} /></View>
            ) : null}
            <Text style={styles.meta}>{it.meta}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.xl },
  label: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.textSecondary, marginBottom: spacing.sm },
  rail: { gap: spacing.md, paddingRight: spacing.lg },
  card: { width: 150 },
  thumb: { width: 150, height: 100, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surface },
  thumbEmpty: { alignItems: 'center', justifyContent: 'center' },
  kindTag: { position: 'absolute', top: 7, left: 7, backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  kindTagT: { fontFamily: fonts.bodyStrong, fontSize: 7, letterSpacing: 1, color: '#FFF' },
  name: { fontFamily: fonts.heading, fontSize: 15, lineHeight: 19, color: colors.textPrimary, marginTop: spacing.sm },
  track: { height: 3, borderRadius: radius.pill, backgroundColor: colors.border, marginTop: spacing.sm, overflow: 'hidden' },
  fill: { height: 3, borderRadius: radius.pill, backgroundColor: colors.accent },
  meta: { fontFamily: fonts.body, fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 4 },
});
