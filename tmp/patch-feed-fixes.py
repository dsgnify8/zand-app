# Five corrections to the feed.
#
# The grid toggle jumped to the top because changing numColumns forces the
# list to remount — React Native requires a new key when it changes. Fixed
# by never changing it: in grid mode the data is chunked into pairs and each
# row renders two cards. The list stays mounted, the scroll position holds.
#
# Also: taller, narrower big cards; the info icon replaced by saved; and
# search results always in the grid, with the rails out of the way since
# they have nothing to do with what was typed.

total = 0


def sub(s, a, b, label):
    global total
    if a in s:
        total += 1
        return s.replace(a, b, 1)
    print("   skipped:", label)
    return s


# ------------------------------------------------ 1. card proportions
p = "components/local-feed.tsx"
s = open(p).read()
s = sub(s, "  const cardW = Math.min(290, W - spacing.lg * 2 - 40);",
        "  // Narrower and taller than a photo's natural crop: a portrait card\n"
        "  // holds a shopfront better and lets the next one show at the edge.\n"
        "  const cardW = Math.min(238, W - spacing.lg * 2 - 70);",
        "card width")
s = sub(s, "  big: { height: 340, borderRadius: 20, overflow: 'hidden', backgroundColor: colors.surface },",
        "  big: { height: 368, borderRadius: 20, overflow: 'hidden', backgroundColor: colors.surface },",
        "card height")
s = sub(s, "  bigName: {\n    fontFamily: fonts.heading, fontSize: 25, lineHeight: 30,",
        "  bigName: {\n    fontFamily: fonts.heading, fontSize: 23, lineHeight: 28,",
        "name size")
open(p, "w").write(s)
print("local-feed.tsx done")


# ------------------------------------------------------- 2. the screen
p = "app/(tabs)/local.tsx"
s = open(p).read()

# the grid, without remounting the list
s = sub(s, """        key={grid ? 'grid' : 'single'}
        numColumns={grid ? 2 : 1}
        columnWrapperStyle={grid ? { gap: spacing.md } : undefined}
        keyExtractor={(x) => x.id}""",
"""        keyExtractor={(x: any) => (Array.isArray(x) ? 'row-' + x[0].id : x.id)}""",
        "numColumns out")

s = sub(s, "        data={loading ? [] : all}",
"""        // Chunked into pairs for the grid rather than switching
        // numColumns, which requires a new key and so remounts the list —
        // and remounting throws the reader back to the top of the page.
        data={loading ? [] : (showGrid ? pairs : all) as any}""",
        "data")

s = sub(s, """  const [grid, setGrid] = useState(false);
  const cardW = (Dimensions.get('window').width - spacing.lg * 2 - spacing.md) / 2;""",
"""  const [grid, setGrid] = useState(false);
  // A search is a request for results, not for browsing: the grid shows
  // more of them at once, so it wins while there is a query.
  const searching = !!query.trim();
  const showGrid = grid || searching;
  const cardW = (Dimensions.get('window').width - spacing.lg * 2 - spacing.md) / 2;
  const pairs = all.reduce((rows: any[][], b, i) => {
    if (i % 2 === 0) rows.push([b]);
    else rows[rows.length - 1].push(b);
    return rows;
  }, []);""",
        "grid state")

# the two rails stand down during a search
s = sub(s, """        <BigRail""", """        {searching ? null : <BigRail""", "rails open")
s = sub(s, """        <SeeAllHead n={all.length} grid={grid} onGrid={setGrid} />""",
        """        <SeeAllHead n={all.length} grid={showGrid} onGrid={setGrid} />""",
        "see all")
s = sub(s, """          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />

        <NewRail
          items={fresh}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />""",
"""          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />}

        {searching ? null : <NewRail
          items={fresh}
          onOpen={(b) => router.navigate(('/business?id=' + b.id) as any)}
        />}""",
        "rails close")

# render a pair, or a card
s = sub(s, """          return grid ? (
            <GridCard
              b={biz}
              width={cardW}
              onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
            />
          ) : (""",
"""          if (showGrid) {
            const row: any[] = biz as any;
            return (
              <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg }}>
                {row.map((one: any) => (
                  <GridCard
                    key={one.id}
                    b={one}
                    width={cardW}
                    onOpen={() => router.navigate(('/business?id=' + one.id) as any)}
                  />
                ))}
              </View>
            );
          }
          return (""",
        "render pair")

s = sub(s, """            <BusinessCard
              b={biz}
              fa={fa}
              km={km}
              onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
            />
          );""",
"""            <BusinessCard
              b={biz}
              fa={fa}
              km={km}
              onOpen={() => router.navigate(('/business?id=' + biz.id) as any)}
            />
          );""",
        "card render")

# km is computed from biz, which is a row in grid mode
s = sub(s, """          const km = place && biz.lat != null""",
        """          const km = place && !showGrid && (biz as any).lat != null""",
        "km guard")

# the header icon: saved rather than info
s = sub(s, """          <Pressable hitSlop={10} onPress={() => setInfoOpen((v) => !v)}>
            <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
          </Pressable>""",
"""          <Pressable hitSlop={10} onPress={() => router.navigate('/local-saved' as any)}>
            <Ionicons name="bookmark-outline" size={19} color={colors.textPrimary} />
          </Pressable>""",
        "saved icon")

open(p, "w").write(s)
print("local.tsx done")
print("\ntotal:", total)
print("infoOpen still referenced:", s.count("infoOpen"))
