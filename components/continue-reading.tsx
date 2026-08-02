import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { eduImage } from '@/constants/education-images';
import { READING } from '@/constants/profile';
import { getLang } from '@/lib/i18n';

export type ContinueItem = {
  key: string;
  title: string;
  chapter: string;
  image: string;
  page: number;
  total: number;
  route: string;
};

// Single source for both the home rail and the profile rail.
// TODO at launch: return real progress from the reading store instead of READING.
export function continueItems(): ContinueItem[] {
  return READING as ContinueItem[];
}

export function ContinueReading({ label = 'PICK UP WHERE YOU LEFT OFF' }: { label?: string }) {
  const fa = getLang() === 'fa';
  const items = continueItems();
  if (items.length === 0) return null;

  return (
    <View>
      <Text style={s.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.rail}>
        {items.map((r) => {
          const src = eduImage(r.image);
          const pct = Math.round((r.page / r.total) * 100);
          return (
            <Pressable key={r.key} style={s.card} onPress={() => router.navigate(r.route as any)}>
              {src ? <Image source={src} style={s.img} resizeMode="cover" /> : <View style={[s.img, s.ph]} />}
              <LinearGradient
                colors={['transparent', 'rgba(24,18,12,0.55)', 'rgba(24,18,12,0.93)']}
                locations={[0, 0.45, 1]}
                style={StyleSheet.absoluteFill as any}
              />
              <View style={s.body}>
                <Text style={[s.title, fa && (r as any).titleFa && s.faTitle]} numberOfLines={2}>{fa && (r as any).titleFa ? (r as any).titleFa : r.title}</Text>
                <Text style={[s.sub, fa && (r as any).chapterFa && s.faSub]}>{fa && (r as any).chapterFa ? (r as any).chapterFa : r.chapter}</Text>
                <View style={s.track}><View style={[s.fill, { width: (pct + '%') as any }]} /></View>
                <Text style={s.pct}>page {r.page} of {r.total}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  faTitle: { fontFamily: fonts.persian, fontSize: 15, lineHeight: 26, textAlign: 'right' },
  faSub: { fontFamily: fonts.persian, fontSize: 12, textAlign: 'right' },
  label: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: colors.textSecondary, marginTop: spacing.xxl, marginBottom: spacing.lg },
  rail: { gap: spacing.md, paddingRight: spacing.lg },
  card: { width: 148, height: 176, borderRadius: 13, overflow: 'hidden', backgroundColor: colors.surface, justifyContent: 'flex-end' },
  img: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  ph: { backgroundColor: 'rgba(36,28,25,0.25)' },
  body: { padding: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: '#FFF' },
  sub: { fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  track: { height: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.28)', marginTop: spacing.sm },
  fill: { height: 2, borderRadius: 1, backgroundColor: '#E0C079' },
  pct: { fontFamily: fonts.body, fontSize: 9, color: 'rgba(255,255,255,0.65)', marginTop: 4 },
});
