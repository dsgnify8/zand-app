import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';
import { eduImage } from '@/constants/education-images';
import { READING } from '@/constants/profile';
import { useLang, getLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { EmptyState } from '@/components/empty-state';
import { useSaved } from '@/lib/saved-store';
import { resolveMany } from '@/lib/resolve-saved';
import { DEMO, showDemoData } from '@/lib/demo-mode';

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
// Signed out this returns the seeded preview, so a visitor sees what the
// section becomes. Signed in it returns only what this person has
// actually opened, most recent first — which for a new account is empty.
// Ways in for someone who has not started anything yet. Eight of them,
// four shown a day, so an app opened every morning does not look like the
// same shelf every morning.
const START_POOL = [
  { key: 'j1', title: 'Great Cities', titleFa: 'شهرهای بزرگ', sub: 'Geography', subFa: 'جغرافیا',
    image: 'geo-great-cities', route: '/geography?jump=g5' },
  { key: 'j2', title: 'Hafez', titleFa: 'حافظ', sub: 'Literature', subFa: 'ادبیات',
    image: 'lit-hafez-cover', route: '/literature/reader?author=hafez&page=0' },
  { key: 'j3', title: 'The land', titleFa: 'سرزمین', sub: 'Geography', subFa: 'جغرافیا',
    image: 'geo-cover', route: '/geography' },
  { key: 'j4', title: 'The Seljuk Empire', titleFa: 'سلجوقیان', sub: 'History', subFa: 'تاریخ',
    image: 'seljuk-cover', route: '/education/topic?topic=seljuk-empire' },
  { key: 'j5', title: 'The Ilkhanate', titleFa: 'ایلخانان', sub: 'History', subFa: 'تاریخ',
    image: 'ilkhanate-cover', route: '/education/topic?topic=ilkhanate' },
  { key: 'j6', title: 'Landscapes', titleFa: 'چشم‌اندازها', sub: 'Geography', subFa: 'جغرافیا',
    image: 'geo-alborz', route: '/geography?jump=g4b' },
  { key: 'j7', title: 'Rumi', titleFa: 'مولانا', sub: 'Literature', subFa: 'ادبیات',
    image: 'lit-rumi-cover', route: '/literature/reader?author=rumi&page=0' },
  { key: 'j8', title: 'Omar Khayyam', titleFa: 'خیام', sub: 'Literature', subFa: 'ادبیات',
    image: 'lit-khayyam-cover', route: '/literature/reader?author=khayyam&page=0' },
];

/**
 * Four of the pool, chosen by the date.
 *
 * A rotating window rather than a shuffle: everyone sees the same four on
 * the same day, nothing repeats within a day, and it does not reorder itself
 * on every render the way Math.random would.
 */
function startPoints(n = 4) {
  const day = Math.floor(Date.now() / 86400000);
  const from = day % START_POOL.length;
  return Array.from({ length: n }, (_, i) => START_POOL[(from + i) % START_POOL.length]);
}

export function continueItems(): ContinueItem[] {
  return READING as ContinueItem[];
}

export function ContinueReading({ label }: { label?: string }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
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
  const demo = showDemoData(session?.user?.email);
  // What they have opened, newest first, topped up to six with places
  // to start. One thing read should not leave a row of one — the rail
  // is an invitation as much as a record, and it thins out at exactly
  // the moment someone has begun.
  const mine: ContinueItem[] = resolveMany(recent).map((r) => ({
    key: r.key,
    title: r.title,
    chapter: r.sub,
    image: r.image ?? '',
    page: 0,
    total: 0,
    route: r.route,
  }));

  const fill = startPoints(6)
    .filter((p: any) => !mine.some((m) => m.key === p.key))
    .map((p: any) => ({
      key: p.key,
      title: getLang() === 'fa' ? (p.titleFa ?? p.title) : p.title,
      chapter: getLang() === 'fa' ? (p.subFa ?? p.sub) : p.sub,
      image: p.image ?? '',
      page: 0,
      total: 0,
      route: p.route,
    }));

  const items: ContinueItem[] = demo
    ? continueItems()
    : [...mine, ...fill].slice(0, 6);
  // Signed out with nothing yet, the seeded preview stands in so a
  // visitor sees what the section becomes. Signed in, an empty account
  // gets a prompt rather than a silently missing section.
  if (items.length === 0) {
    if (demo) return null;
    // Rather than an empty shelf, a few doors in. Fixed picks across the
    // sections, so a new account lands somewhere rather than nowhere.
    // No margin on the wrapper: s.label already carries spacing.xxl above
    // it, and the spacing.xl that used to sit on top of that is why this
    // state rendered lower than the real rail.
    return (
      <View>
        <Text style={s.label}>{fa ? 'از اینجا شروع کن' : 'JUMP INTO'}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
          {startPoints().map((p) => (
            <Pressable key={p.key} style={s.jumpCard} onPress={() => router.navigate(p.route as any)}>
              {eduImage(p.image) ? (
                <Image source={eduImage(p.image)} style={s.jumpShot} />
              ) : (
                <View style={[s.jumpShot, { backgroundColor: 'rgba(0,0,0,0.05)' }]} />
              )}
              <Text style={[s.jumpT, fa && s.jumpTFa]} numberOfLines={1}>
                {fa ? p.titleFa : p.title}
              </Text>
              <Text style={[s.jumpX, fa && s.jumpXFa]} numberOfLines={1}>
                {fa ? p.subFa : p.sub}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
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
  jumpCard: { width: 148 },
  jumpShot: { width: 148, height: 176, borderRadius: 13 },
  jumpT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary, marginTop: 6 },
  jumpX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },
  jumpTFa: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 24, textAlign: 'right' },
  jumpXFa: { fontFamily: fonts.persian, fontSize: 11.5, lineHeight: 20, textAlign: 'right' },
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
