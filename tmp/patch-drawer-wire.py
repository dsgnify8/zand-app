# Wire the drawer and the country pages.
#
# The header gains a menu control on the left. The pill and countries band
# added earlier come out of the feed — they were the wrong shape for a page
# that has to be understandable at a glance, and both now live behind the
# drawer where they have room.

total = 0

# ------------------------------------------------------------- the keys
p = "constants/i18n/local.ts"
s = open(p).read()
if "byCountryTitle" not in s:
    a = "  // browsing"
    b = """  // browsing
  byCountryTitle: { en: 'By country', fa: 'بر اساس کشور' },
  byCountryX: { en: 'every place, gathered by where it is', fa: 'همه‌جا، بر اساس کشور' },
  byCategoryTitle: { en: 'By category', fa: 'بر اساس دسته' },
  byCategoryX: { en: 'restaurants, cafés, everything else', fa: 'رستوران، کافه، و بقیه' },
  listBusinessX: { en: 'yours, on the map', fa: 'مال تو، روی نقشه' },
  chooseYourPlace: { en: 'CHOOSE YOUR PLACE', fa: 'کشورت را انتخاب کن' },
  menu: { en: 'Browse', fa: 'گشتن' },
"""
    if a in s:
        s = s.replace(a, b, 1)
        open(p, "w").write(s)
        total += 1
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


sub("import { CategoryPill, CountriesBand } from '@/components/local-browse';",
    "import { LocalDrawer } from '@/components/local-drawer';",
    "import swap")

sub("  const [infoOpen, setInfoOpen] = useState(false);",
    "  const [infoOpen, setInfoOpen] = useState(false);\n"
    "  const [drawer, setDrawer] = useState(false);",
    "drawer state")

# the menu control, left of the LOCAL kicker
sub("""        <View style={[s.top, fa && { flexDirection: 'row-reverse' }]}>
          <Text style={s.kicker}>{fa ? 'محلی' : 'LOCAL'}</Text>""",
"""        <View style={[s.top, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => setDrawer(true)} style={{ marginRight: 12 }}>
            <Ionicons name="menu-outline" size={22} color={colors.textPrimary} />
          </Pressable>
          <Text style={[s.kicker, { flex: 1 }]}>{fa ? 'محلی' : 'LOCAL'}</Text>""",
    "menu control")

# the pill and band out — they belong behind the drawer, not on the feed
sub("""        {/* one pill, opening all fourteen at once */}
        <CategoryPill
          value={cat}
          onChange={setCat}
          counts={items.reduce((m: Record<string, number>, b: any) => {
            if (b.category) m[b.category] = (m[b.category] ?? 0) + 1;
            return m;
          }, {})}
        />

        {/* the one way through to somewhere else */}
        <CountriesBand
          items={items}
          onPick={(key, label) =>
            router.navigate(('/local-country?c=' + encodeURIComponent(key) + '&label=' + encodeURIComponent(label)) as any)
          }
        />""",
    "",
    "pill and band out")

# mount the drawer
sub("""        ListEmptyComponent={""",
"""        ListFooterComponent={
          <LocalDrawer
            open={drawer}
            onClose={() => setDrawer(false)}
            onPick={(k) => {
              if (k === 'country') router.navigate('/local-countries' as any);
              else if (k === 'category') router.navigate('/local-categories' as any);
              else listYours();
            }}
          />
        }
        ListEmptyComponent={""",
    "drawer mount")

open(p, "w").write(s)
print("local.tsx done")

# ------------------------------------------------------------ the routes
import subprocess
out = subprocess.run(["grep", "-n", "learn/map\\|Stack.Screen", "app/_layout.tsx"],
                     capture_output=True, text=True).stdout
print("\nStack.Screen lines in _layout (add the two new routes near these):")
print("\n".join(out.strip().split("\n")[:4]))
print("\ntotal:", total)
