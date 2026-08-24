# The jump-into rail: a rotating pool, and the gap closed.
#
# Three changes.
#
# 1. Cyrus becomes Great Cities and Taarof becomes the Seljuk Empire, and the
#    four fixed cards become a pool of eight that rotates daily. Someone who
#    opens the app every morning without starting anything sees a different
#    four each day rather than the same shelf.
#
#    Deterministic by day, like dailyFor: everyone sees the same four on the
#    same date, and it does not reshuffle on every render.
#
# 2. Persian titles. The cards printed English names in the Persian build.
#
# 3. The gap. This branch wrapped everything in marginTop: spacing.xl while
#    s.label already carries marginTop: spacing.xxl, so the demo state paid
#    both margins and the real rail paid one. That is the extra space.
#
# Unchanged: the moment `recent` has anything in it, items.length is non-zero
# and none of this renders. One thing opened clears the whole shelf.

p = "components/continue-reading.tsx"
s = open(p).read()

# ------------------------------------------------------------- the pool
a = """// Four ways in, one from each part of the app.
const START_POINTS = [
  { key: 'j1', title: 'Cyrus the Great', sub: 'History', image: 'cyrus-cover', route: '/education/topic?topic=cyrus-the-great' },
  { key: 'j2', title: 'Hafez', sub: 'Literature', image: 'lit-hafez-cover', route: '/literature/reader?author=hafez&page=0' },
  { key: 'j3', title: 'The land', sub: 'Geography', image: 'geo-cover', route: '/geography' },
  { key: 'j4', title: 'Taarof', sub: 'Culture', image: 'culture-taarof', route: '/culture/topic?topic=taarof' },
];"""

b = """// Ways in for someone who has not started anything yet. Eight of them,
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
}"""

n = 0
if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: START_POINTS")

# ------------------------------------------------------------ the render
a = """      <View style={{ marginTop: spacing.xl }}>
        <Text style={s.label}>{getLang() === 'fa' ? 'از اینجا شروع کن' : 'JUMP INTO'}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
          {START_POINTS.map((p) => (
            <Pressable key={p.key} style={s.jumpCard} onPress={() => router.navigate(p.route as any)}>
              {eduImage(p.image) ? (
                <Image source={eduImage(p.image)} style={s.jumpShot} />
              ) : (
                <View style={[s.jumpShot, { backgroundColor: 'rgba(0,0,0,0.05)' }]} />
              )}
              <Text style={s.jumpT} numberOfLines={1}>{p.title}</Text>
              <Text style={s.jumpX} numberOfLines={1}>{p.sub}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>"""

b = """      {/* No margin here: s.label already carries spacing.xxl above it. The
          wrapper used to add spacing.xl on top, which is why this state sat
          lower than the real rail. */}
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
      </View>"""

if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: jump render")

# --------------------------------------------------------- persian styles
a = "  jumpX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },"
b = ("  jumpX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },\n"
     "  jumpTFa: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 24, textAlign: 'right' },\n"
     "  jumpXFa: { fontFamily: fonts.persian, fontSize: 11.5, lineHeight: 20, textAlign: 'right' },")
if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: jump styles")

open(p, "w").write(s)
print("applied", n, "of 3")
print("START_POINTS gone:", "START_POINTS" not in s)
print("pool size 8:", s.count("route: '/") >= 8)
