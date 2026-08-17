import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { eduImage } from '@/constants/education-images';
import { READING } from '@/constants/profile';
import { getLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { EmptyState } from '@/components/empty-state';
import { useSaved } from '@/lib/saved-store';
import { resolveMany } from '@/lib/resolve-saved';
import { DEMO } from '@/lib/demo-mode';

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
// Signed out this returns the seeded preview, so a visitor sees what the
// section becomes. Signed in it returns only what this person has
// actually opened, most recent first — which for a new account is empty.
export function continueItems(): ContinueItem[] {
  return READING as ContinueItem[];
}

export function ContinueReading({ label }: { label?: string }) {
  const _lbl = label ?? (getLang() === 'fa' ? 'از همون‌جا ادامه بده' : 'PICK UP WHERE YOU LEFT OFF');
  const fa = getLang() === 'fa';
  const { session } = useAuth();
  const { recent } = useSaved();
  // Signed out we show the seeded preview so a visitor sees the shape of
  // the section. Signed in we show only what this person has opened.
  // Resolved and ContinueItem are different shapes, so map rather than
  // cast: a saved key knows what it is and where it lives, but not how
  // far through it you are, so the progress fields stay neutral until we
  // track per-item position.
  // In demo mode we always show the seeded three, so the screen looks
  // the same whoever is signed in. Off, it is their real history.
  const items: ContinueItem[] = (session && !DEMO)
    ? resolveMany(recent).slice(0, 6).map((r) => ({
        key: r.key,
        title: r.title,
        chapter: r.sub,
        image: r.image ?? '',
        page: 0,
        total: 0,
        route: r.route,
      }))
    : continueItems();
  // Signed out with nothing yet, the seeded preview stands in so a
  // visitor sees what the section becomes. Signed in, an empty account
  // gets a prompt rather than a silently missing section.
  if (items.length === 0) {
    if (!session) return null;
    return (
      <View style={{ marginTop: spacing.xl }}>
        <Text style={s.label}>{_lbl}</Text>
        <EmptyState
          icon="book-outline"
          line="Nothing started yet. Open anything and it will wait for you here."
          lineFa="هنوز چیزی را شروع نکرده‌ای. هر چیزی را باز کنی، همین‌جا منتظرت می‌ماند."
          cta="Explore" ctaFa="گشت‌وگذار" to="/(tabs)/explore"
        />
      </View>
    );
  }

  return (
    <View>
      <Text style={s.label}>{_lbl}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.rail}>
        {items.map((r) => {
          const src = eduImage(r.image);
          // total is 0 for items we know were opened but not how far
          const pct = r.total > 0 ? Math.round((r.page / r.total) * 100) : 0;
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
                {r.total > 0 ? (
                  <Text style={s.pct}>{fa ? 'صفحهٔ ' + r.page + ' از ' + r.total : 'page ' + r.page + ' of ' + r.total}</Text>
                ) : (
                  <Text style={s.pct}>{fa ? 'ادامه بده' : 'Continue'}</Text>
                )}
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
