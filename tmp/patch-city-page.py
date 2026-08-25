# The city pages, finished.
#
# Headings move from Cormorant to the body face — at this size the serif
# reads as a masthead, and these are labels on a utility screen.
#
# The list gets an entry fade, because mounting a dark screen over a light
# one shows every millisecond of the image decode.
#
# And the city page gains what the feed has: a view toggle and a category
# filter, both quiet enough not to compete with the cover.

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
    "import { fonts, spacing } from '@/constants/zand-theme';\n"
    "import { CategoryBar, CategorySheet } from '@/components/category-sheet';",
    "import")

# --- the headings, in the body face
sub("  topT: { fontFamily: fonts.heading, fontSize: 19, color: D.text },",
"""  // The body face, not the serif. Cormorant at this size reads as a
  // masthead; these are labels.
  topT: { fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.2, color: D.text },""",
    "heading font")

# --- lighter over the backdrop
sub("""      <View style={[StyleSheet.absoluteFill as any, { backgroundColor: 'rgba(16,13,12,0.86)' }]} />
      <LinearGradient
        colors={['rgba(16,13,12,0.95)', 'rgba(16,13,12,0.4)', 'rgba(16,13,12,0.95)']}
        locations={[0, 0.45, 1]}""",
"""      <View style={[StyleSheet.absoluteFill as any, { backgroundColor: 'rgba(16,13,12,0.62)' }]} />
      <LinearGradient
        colors={['rgba(16,13,12,0.86)', 'rgba(16,13,12,0.18)', 'rgba(16,13,12,0.88)']}
        locations={[0, 0.45, 1]}""",
    "backdrop")

# --- an entry, so the dark screen arrives rather than snapping in
sub("""export function CityList() {
  useLang();""",
"""export function CityList() {
  useLang();
  // Mounting a dark screen over a light one shows every millisecond of the
  // image decode, which reads as a flash. Fading in covers it.
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
  }, []);""",
    "list enter")

sub("""    <View style={st.dark}>
      {/* One photograph behind everything""",
"""    <Animated.View style={[st.dark, { opacity: enter }]}>
      {/* One photograph behind everything""",
    "list wrap open")

sub("""        )}
      </SafeAreaView>
    </View>
  );
}

/**
 * One name, sized by how close it is to the focus line.""",
"""        )}
      </SafeAreaView>
    </Animated.View>
  );
}

/**
 * One name, sized by how close it is to the focus line.""",
    "list wrap close")

# --- the city page: filter and view
sub("""  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await loadBusinesses({});""",
"""  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<string | null>(null);
  const [catOpen, setCatOpen] = useState(false);
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await loadBusinesses({});""",
    "city state")

sub("""  const cardW = (W - spacing.lg * 2 - spacing.md) / 2;""",
"""  const counts = items.reduce((m: Record<string, number>, b) => {
    if (b.category) m[b.category] = (m[b.category] ?? 0) + 1;
    return m;
  }, {});
  const shown = cat ? items.filter((b) => b.category === cat) : items;
  const cardW = grid
    ? (W - spacing.lg * 2 - spacing.md) / 2
    : W - spacing.lg * 2;""",
    "city derived")

# the controls, between hero and grid
sub("""        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xl }} color={D.dim} />
        ) : (
          <View style={st.grid}>
            {items.map((b) => {""",
"""        <View style={[st.controls, fa && { flexDirection: 'row-reverse' }]}>
          <CategoryBar
            value={cat}
            counts={counts}
            dark
            onPress={() => setCatOpen(true)}
            onClear={() => setCat(null)}
          />
          <View style={[st.switchRow, fa && { flexDirection: 'row-reverse' }]}>
            <Pressable hitSlop={8} onPress={() => setGrid(false)}>
              <Ionicons name="square-outline" size={15} color={grid ? D.faint : D.text} />
            </Pressable>
            <Pressable hitSlop={8} onPress={() => setGrid(true)}>
              <Ionicons name="grid-outline" size={15} color={grid ? D.text : D.faint} />
            </Pressable>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xl }} color={D.dim} />
        ) : (
          <View style={st.grid}>
            {shown.map((b) => {""",
    "controls")

sub("""                  <View style={[st.shot, { width: cardW, height: cardW }]}>""",
"""                  <View style={[st.shot, { width: cardW, height: grid ? cardW : cardW * 0.62 }]}>""",
    "card shape")

# the sheet itself
sub("""      </Animated.ScrollView>
    </View>
  );
}

const st = StyleSheet.create({""",
"""      </Animated.ScrollView>

      <CategorySheet
        open={catOpen}
        value={cat}
        counts={counts}
        onPick={setCat}
        onClose={() => setCatOpen(false)}
      />
    </View>
  );
}

const st = StyleSheet.create({""",
    "sheet")

sub("""  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg,
  },""",
"""  controls: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg,
  },
  switchRow: { flexDirection: 'row', gap: spacing.md },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingTop: spacing.md,
  },""",
    "control styles")

open(p, "w").write(s)
print("total:", total)

# --- the key
p = "constants/i18n/local.ts"
s = open(p).read()
if "categories:" not in s:
    a = "  allCategories:"
    b = "  categories: { en: 'Categories', fa: 'دسته‌ها' },\n  allCategories:"
    print("key:", a in s)
    open(p, "w").write(s.replace(a, b, 1))
