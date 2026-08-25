# Reshape the feed.
#
# The place control moves into the header, centred between the menu and the
# icons. It governs the feed, the rail and the map together, so filing it
# under the title made it look like one filter among several.
#
# The rail goes above the cards, and the FlatList is handed only what the
# rail did not take — otherwise the six nearest appear twice, once small and
# once large, which reads as a bug.

total = 0

# ------------------------------------------------------------- the keys
p = "constants/i18n/local.ts"
s = open(p).read()
if "closestTo" not in s:
    a = "  // browsing"
    b = """  closestTo: { en: 'CLOSEST TO', fa: 'نزدیک‌ترین‌ها به' },
  newestHere: { en: 'JUST ADDED', fa: 'تازه اضافه‌شده‌ها' },

  // browsing"""
    if a in s:
        s = s.replace(a, b, 1); open(p, "w").write(s); total += 1
        print("local.ts: keys added")
    else:
        print("   skipped: local.ts anchor")
else:
    print("local.ts: keys already present")


# ------------------------------------------------------------- the feed
p = "app/(tabs)/local.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { LocalDrawer } from '@/components/local-drawer';",
    "import { LocalDrawer } from '@/components/local-drawer';\n"
    "import { NearRail, PlaceChip, splitForFeed } from '@/components/local-rail';",
    "import")

# split once, above the return
sub("""  const where = place""",
"""  // The rail takes the nearest few; the list gets the remainder, so
  // nothing appears in both.
  const { rail, rest } = splitForFeed(items, place);

  const where = place""",
    "split")

sub("        data={loading ? [] : items}", "        data={loading ? [] : rest}", "data")

# the place chip into the header, between the menu and the icons
sub("""          <Text style={[s.kicker, { flex: 1 }]}>{fa ? 'محلی' : 'LOCAL'}</Text>
          <Pressable hitSlop={10} onPress={() => setInfoOpen((v) => !v)}>""",
"""          <View style={{ flex: 1, alignItems: 'center' }}>
            <PlaceChip label={where} active={!!place} onPress={() => setPlaceOpen((v) => !v)} />
          </View>
          <Pressable hitSlop={10} onPress={() => setInfoOpen((v) => !v)}>""",
    "place chip in header")

# the old place row under the title comes out — it is in the header now
sub("""        {/* where */}
        <View style={[s.whereRow, fa && { flexDirection: 'row-reverse', alignSelf: 'flex-end' }]}>
          <Pressable style={[s.where, fa && { flexDirection: 'row-reverse' }]} onPress={() => setPlaceOpen((v) => !v)}>
            <Ionicons name="location-outline" size={15} color={colors.textPrimary} />
            <Text style={s.whereT}>{where}</Text>
            <Ionicons name={placeOpen ? 'chevron-up' : 'chevron-down'} size={13} color={colors.textSecondary} />
          </Pressable>
          {/* Clearing the place is a one-tap thing, not something to go
              hunting for inside the picker. */}
          {place ? (
            <Pressable style={s.whereX} hitSlop={8} onPress={() => { setPlace(null); setPlaceOpen(false); }}>
              <Ionicons name="close" size={13} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>
""", "", "old where row")

# the rail, after the search
sub("""        {/* categories */}""",
"""        <NearRail
          items={rail}
          place={place ? { lat: place.lat, lng: place.lng } : null}
          placeLabel={where}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />

        {/* categories */}""",
    "rail")

# if the categories comment is gone, put the rail after the search block
if "<NearRail" not in s:
    a = """        {/* search */}"""
    if a in s:
        # the rail belongs after the search, not before it
        i = s.index(a)
        end = s.index("</View>", s.index("</Pressable>", i)) + len("</View>")
        s = s[:end] + """

        <NearRail
          items={rail}
          place={place ? { lat: place.lat, lng: place.lng } : null}
          placeLabel={where}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />""" + s[end:]
        total += 1
        print("rail placed after search")

open(p, "w").write(s)
print("\ntotal:", total)
print("NearRail mounted:", s.count("<NearRail"))
print("whereRow still used:", s.count("s.whereRow"))
