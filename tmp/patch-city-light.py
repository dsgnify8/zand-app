# The city page, light below the fold.
#
# The hero stays dark — a photograph with a name over it wants darkness
# under the type — but it now fades into the app's own background rather
# than into a black page. Everything below is the cream ground the rest of
# the app uses, which means the cards drop their dark variant and the
# category boxes go back to dark-on-light.
#
# The city list keeps its dark treatment: that page is nothing but names
# over a photograph, and there is no content below the fold to hand over to.

total = 0
p = "components/local-cities.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { fonts, spacing } from '@/constants/zand-theme';",
    "import { colors, fonts, spacing } from '@/constants/zand-theme';\n"
    "import { backdropForNow } from '@/constants/city-images';",
    "import")

# ---------------------------------------------- the list's backdrop
sub("""  const backdrop = cities.length ? coverFor(cities[0].key, cities[0].list) : null;""",
"""  // One of four, for a week at a time. A photograph of the first city in
  // the list would make the page look like it was about that city.
  const backdrop = backdropForNow();""",
    "backdrop")

# ------------------------------------------------- the city page
sub("""export function CityPage() {""",
"""/**
 * One city.
 *
 * Dark at the top, light underneath. The hero needs darkness for the name
 * to sit on; the listings below do not, and putting them on a dark ground
 * meant maintaining a second version of every card.
 */
export function CityPage() {""",
    "doc")

sub("""    <View style={st.dark}>
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}>
        <View style={{ height: 440, overflow: 'hidden' }}>""",
"""    <View style={st.light}>
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }}>
        <View style={{ height: 440, overflow: 'hidden' }}>""",
    "page ground")

sub("""          <LinearGradient
            colors={['rgba(16,13,12,0.55)', 'rgba(16,13,12,0.18)', 'rgba(16,13,12,0.75)', D.bg]}
            locations={[0, 0.35, 0.8, 1]}
            style={StyleSheet.absoluteFill as any}
          />""",
"""          {/* Out to the page colour rather than to black, so the hero ends
              where the app begins instead of ending in a band. */}
          <LinearGradient
            colors={[
              'rgba(16,13,12,0.55)',
              'rgba(16,13,12,0.16)',
              'rgba(16,13,12,0.62)',
              colors.background,
            ]}
            locations={[0, 0.32, 0.78, 1]}
            style={StyleSheet.absoluteFill as any}
          />""",
    "hero fade")

# the controls and cards are on cream now
sub("""          <CategoryBar
            value={cat}
            counts={counts}
            dark
            onPress={() => setCatOpen(true)}
            onClear={() => setCat([])}
          />""",
"""          <CategoryBar
            value={cat}
            counts={counts}
            onPress={() => setCatOpen(true)}
            onClear={() => setCat([])}
          />""",
    "category bar")

sub("""              <BusinessCard
                key={b.id}
                b={b}
                fa={fa}
                dark
                onOpen={() => router.navigate(('/business?id=' + b.id) as any)}
              />""",
"""              <BusinessCard
                key={b.id}
                b={b}
                fa={fa}
                onOpen={() => router.navigate(('/business?id=' + b.id) as any)}
              />""",
    "cards")

sub("""  dark: { flex: 1, backgroundColor: D.bg },""",
"""  dark: { flex: 1, backgroundColor: D.bg },
  // The city page: dark only where the photograph is.
  light: { flex: 1, backgroundColor: colors.background },""",
    "light style")

open(p, "w").write(s)
print("total:", total)
print("dark props left on city page:", s.count("                dark\n"))
