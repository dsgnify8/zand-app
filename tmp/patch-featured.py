# The top of Local becomes Popular.
#
# It was Newly Opened, which asked the data a question it could rarely
# answer — most listings have no opening year. Popular is chosen by an
# admin, which is honest about what it is: a shelf, not a measurement.
#
# The order shuffles once a day, seeded by the date. Everyone opening the
# app on the same day sees the same arrangement, and it changes overnight
# without anything running at midnight.

total = 0


def sub(s, a, b, label):
    global total
    if a in s:
        total += 1
        return s.replace(a, b, 1)
    print("   skipped:", label)
    return s


# ------------------------------------------------- the shuffle
p = "components/local-feed.tsx"
s = open(p).read()

s = sub(s, "const THIS_YEAR = new Date().getFullYear();",
"""/**
 * Today's order for a fixed set.
 *
 * Seeded by the date rather than random, so every device agrees on what
 * today looks like — and so it changes overnight on its own. Being
 * seventh on Monday is not being seventh forever.
 */
function shuffleForToday<T>(items: T[]): T[] {
  const d = new Date();
  let seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const j = seed % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}""", "shuffle")

# ---------------------------------------------- the section itself
s = sub(s, """  // Opened this year, newest first. Falls back to recently listed while
  // nobody has filled the year in — an empty section would be worse than
  // an approximate one.
  const opened = items
    .filter((b) => (b as any).opened_year === THIS_YEAR)
    .sort((a, b) => String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')));
  const fresh = (opened.length ? opened : byNew).slice(0, NEW_N);""",
"""  // Chosen by an admin rather than measured. "Popular" from view counts
  // would mean the same three listings forever, since being at the top is
  // what makes something popular in the first place.
  const picked = items
    .filter((b: any) => b.featured)
    .sort((a: any, b: any) => (a.featured_rank ?? 999) - (b.featured_rank ?? 999));
  const fresh = shuffleForToday(picked.length ? picked : byNew.slice(0, NEW_N));""",
    "section")

s = sub(s, "<Text style={[st.head, fa && st.rtl]}>{t(LOCAL.newlyOpened)}</Text>",
        "<Text style={[st.head, fa && st.rtl]}>{t(LOCAL.popular)}</Text>",
        "heading")

open(p, "w").write(s)
print("local-feed:", total)


# -------------------------------------------------------- the key
p = "constants/i18n/local.ts"
s = open(p).read()
if "popular:" not in s:
    a = "  newlyOpened:"
    b = "  popular: { en: 'POPULAR', fa: 'محبوب‌ها' },\n  newlyOpened:"
    print("key:", a in s)
    open(p, "w").write(s.replace(a, b, 1))


# ------------------------------------------------------ the route
p = "app/_layout.tsx"
s = open(p).read()
if "admin-featured" not in s:
    a = '            <Stack.Screen name="admin-stories" options={{ headerShown: false }} />'
    b = a + '\n            <Stack.Screen name="admin-featured" options={{ headerShown: false }} />'
    print("route:", a in s)
    open(p, "w").write(s.replace(a, b, 1))

p = "app/admin.tsx"
s = open(p).read()
if "admin-featured" not in s:
    a = """            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-stories' as any)}>
              <Ionicons name="book-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Founder stories</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>"""
    b = a + """

            <Pressable style={s.editRow} onPress={() => router.navigate('/admin-featured' as any)}>
              <Ionicons name="star-outline" size={16} color={colors.accent} />
              <Text style={s.editRowT}>Featured listings</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </Pressable>"""
    print("hub:", a in s)
    open(p, "w").write(s.replace(a, b, 1))
