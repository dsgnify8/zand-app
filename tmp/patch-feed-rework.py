# The feed, reworked.
#
# Card titles take the serif the big cards already use. A directory of
# places named in a UI face reads as a database; the serif makes each one
# a name rather than a row.
#
# The top rail shortens and holds eight, preferring what has not been
# opened — a rail showing the same places every visit stops being looked at.
#
# "Just added" becomes "Newly opened", which is a different question: not
# what we listed recently, but who opened their doors recently. Bigger
# cards, since it is the section most worth looking at.

total = 0
p = "components/local-feed.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { getLang, t } from '@/lib/i18n';",
    "import { getLang, t } from '@/lib/i18n';\n"
    "import { preferUnseen } from '@/lib/opened-businesses';",
    "import")

# ------------------------------------------------- the sections
sub("""const TOP_N = 8;
const NEW_N = 10;""",
"""const TOP_N = 8;
const NEW_N = 10;

// What counts as newly opened. Not a rolling window: "opened this year" is
// a thing someone can say out loud, and a rolling twelve months would drop
// a place in January for no reason it could explain.
const THIS_YEAR = new Date().getFullYear();""",
    "constants")

sub("""  let top: Business[];
  if (place) {
    top = [...items]
      .filter((b) => b.lat != null)
      .sort((a, b) =>
        dist(place.lat, place.lng, a.lat!, a.lng ?? 0) - dist(place.lat, place.lng, b.lat!, b.lng ?? 0))
      .slice(0, TOP_N);
  } else {
    const flagged = items.filter((b) => (b as any).featured);
    top = (flagged.length ? flagged : byNew).slice(0, TOP_N);
  }

  return { top, fresh: byNew.slice(0, NEW_N), all: items };""",
"""  // Ranked first, then filtered for what has not been seen — ranking the
  // unseen alone would put a far-away new place above a near one.
  let ranked: Business[];
  if (place) {
    ranked = [...items]
      .filter((b) => b.lat != null)
      .sort((a, b) =>
        dist(place.lat, place.lng, a.lat!, a.lng ?? 0) - dist(place.lat, place.lng, b.lat!, b.lng ?? 0));
  } else {
    const flagged = items.filter((b) => (b as any).featured);
    ranked = flagged.length ? flagged : byNew;
  }
  const top = preferUnseen(ranked, TOP_N);

  // Opened this year, newest first. Falls back to recently listed while
  // nobody has filled the year in — an empty section would be worse than
  // an approximate one.
  const opened = items
    .filter((b) => (b as any).opened_year === THIS_YEAR)
    .sort((a, b) => String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')));
  const fresh = (opened.length ? opened : byNew).slice(0, NEW_N);

  return { top, fresh, all: items };""",
    "sections")

# ------------------------------------------------- the top rail
sub("  big: { height: 318, borderRadius: 20, overflow: 'hidden', backgroundColor: colors.surface },",
    "  big: { height: 286, borderRadius: 20, overflow: 'hidden', backgroundColor: colors.surface },",
    "big height")

# ------------------------------------------------- newly opened
sub("""      <Text style={[st.head, fa && st.rtl]}>{t(LOCAL.justAdded)}</Text>""",
    """      <Text style={[st.head, fa && st.rtl]}>{t(LOCAL.newlyOpened)}</Text>""",
    "heading")

sub("""            <Pressable key={b.id} style={st.small} onPress={() => onOpen(b)}>
              <View style={st.smallShot}>""",
"""            <Pressable key={b.id} style={st.small} onPress={() => onOpen(b)}>
              <View style={st.smallShot}>""",
    "small card")

sub("""  /* small */
  small: { width: 116 },
  smallShot: { width: 116, height: 116, borderRadius: 13, overflow: 'hidden', backgroundColor: colors.surface },
  smallName: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary, marginTop: 7 },
  smallMeta: { fontFamily: fonts.body, fontSize: 10.5, color: colors.textSecondary, marginTop: 1 },""",
"""  /* newly opened: closer to the see-all card than to a thumbnail, since
     this is the section most worth stopping on */
  small: { width: 208 },
  smallShot: { width: 208, height: 140, borderRadius: 14, overflow: 'hidden', backgroundColor: colors.surface },
  smallName: { fontFamily: fonts.heading, fontSize: 18, lineHeight: 23, color: colors.textPrimary, marginTop: 8 },
  smallMeta: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },""",
    "small styles")

# ------------------------------------------------- serif titles everywhere
sub("  cardT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary, marginTop: 8 },",
    "  cardT: { fontFamily: fonts.heading, fontSize: 18, lineHeight: 22, color: colors.textPrimary, marginTop: 8 },",
    "grid title")

open(p, "w").write(s)
print("local-feed.tsx:", total)

# ------------------------------------------------- the key
p = "constants/i18n/local.ts"
s = open(p).read()
if "newlyOpened" not in s:
    a = "  justAdded:"
    b = "  newlyOpened: { en: 'NEWLY OPENED', fa: 'تازه‌بازشده‌ها' },\n  justAdded:"
    print("key:", a in s)
    open(p, "w").write(s.replace(a, b, 1))
