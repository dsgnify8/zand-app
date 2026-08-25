# The feed, in its three sections.
#
# Replaces the single rail with: big cards for what is near (or what is
# worth seeing, with no location), a rail of small cards for what has just
# arrived, and everything under a see-all heading with a grid toggle.
#
# local-rail.tsx goes. Two rail components with overlapping jobs is how a
# codebase becomes hard to reason about, and that one lasted an hour.

import os

total = 0

# ------------------------------------------------------------- the keys
p = "constants/i18n/local.ts"
s = open(p).read()
if "justAdded" not in s:
    a = "  closestTo:"
    b = """  popular: { en: 'POPULAR', fa: 'محبوب‌ها' },
  justAdded: { en: 'JUST ADDED', fa: 'تازه‌ها' },
  seeAll: { en: 'SEE ALL', fa: 'همه' },
  closestTo:"""
    if a in s:
        s = s.replace(a, b, 1); open(p, "w").write(s); total += 1
        print("local.ts: keys added")
    else:
        print("   skipped: local.ts anchor")
else:
    print("local.ts: keys already present")


# ------------------------------------------------- featured on the type
p = "lib/businesses.ts"
s = open(p).read()
if "featured?" not in s:
    a = "  created_at?: string;"
    b = "  created_at?: string;\n  // Set by an admin, not by owners. Fills the top of the feed when there\n  // is no location to sort by.\n  featured?: boolean;"
    if a in s:
        s = s.replace(a, b, 1); open(p, "w").write(s); total += 1
        print("businesses.ts: featured added")
    else:
        print("   skipped: created_at anchor")
else:
    print("businesses.ts: featured already there")


# ------------------------------------------------------------- the feed
p = "app/(tabs)/local.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { NearRail, PlaceChip, splitForFeed } from '@/components/local-rail';",
    "import { BigRail, NewRail, SeeAllHead, GridCard, feedSections } from '@/components/local-feed';\n"
    "import { PlaceChip } from '@/components/local-place-chip';",
    "import")

sub("""  // The rail takes the nearest few; the list gets the remainder, so
  // nothing appears in both.
  const { rail, rest } = splitForFeed(items, place);""",
"""  // Three passes over the same set: what is near, what is new, and all of
  // it. The last section is "see all", so it keeps everything.
  const { top, fresh, all } = feedSections(items, place ? { lat: place.lat, lng: place.lng } : null);
  const [grid, setGrid] = useState(false);
  const cardW = (Dimensions.get('window').width - spacing.lg * 2 - spacing.md) / 2;""",
    "sections")

sub("        data={loading ? [] : rest}", "        data={loading ? [] : all}", "data")

sub("""        <NearRail
          items={rail}
          place={place ? { lat: place.lat, lng: place.lng } : null}
          placeLabel={where}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />""",
"""        <BigRail
          items={top}
          place={place ? { lat: place.lat, lng: place.lng } : null}
          placeLabel={where}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />

        <NewRail
          items={fresh}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />

        <SeeAllHead n={all.length} grid={grid} onGrid={setGrid} />""",
    "sections in header")

# the grid needs two columns and a different card
sub("""        keyExtractor={(x) => x.id}""",
"""        key={grid ? 'grid' : 'single'}
        numColumns={grid ? 2 : 1}
        columnWrapperStyle={grid ? { gap: spacing.md } : undefined}
        keyExtractor={(x) => x.id}""",
    "numColumns")

sub("""          return (
            <BusinessCard
              b={biz}
              fa={fa}
              km={km}
              onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
            />
          );""",
"""          return grid ? (
            <GridCard
              b={biz}
              width={cardW}
              onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
            />
          ) : (
            <BusinessCard
              b={biz}
              fa={fa}
              km={km}
              onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
            />
          );""",
    "grid card")

# Dimensions for the grid width
if "Dimensions" not in s.split("from 'react-native'")[0]:
    s = s.replace("  ActivityIndicator, FlatList, Image, Pressable, ScrollView,",
                  "  ActivityIndicator, Dimensions, FlatList, Image, Pressable, ScrollView,", 1)
    print("Dimensions imported")

open(p, "w").write(s)
print("local.tsx done")

print("\ntotal:", total)
print("BigRail mounted:", s.count("<BigRail"))
print("NewRail mounted:", s.count("<NewRail"))
print("SeeAllHead mounted:", s.count("<SeeAllHead"))
print("Dimensions available:", "Dimensions" in s.split("from 'react-native'")[0])
