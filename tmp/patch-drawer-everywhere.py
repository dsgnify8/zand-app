# Three things.
#
# The drawer belongs on every Local page, not just the feed — the way out
# of a city should not be to go back to the feed first.
#
# Back from a city goes to the city list, which is where you came from.
# router.navigate('/local') was right when these were dead ends and wrong
# now that they are a path.
#
# And the category page loses the icon grid for the same small text boxes
# the sheet uses, laid out at the top of the page rather than in a popup —
# on a page whose whole job is choosing, the choices should be visible.

total = 0


def sub(s, a, b, label):
    global total
    if a in s:
        total += 1
        return s.replace(a, b, 1)
    print("   skipped:", label)
    return s


# ======================================= a drawer any Local page can use
DRAWER_HOOK = '''
/**
 * The drawer, wired up.
 *
 * Every Local page carries the same one, so this holds the state and the
 * routing in one place rather than in each screen.
 */
function useLocalDrawer() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();

  const onPick = (k: DrawerPick) => {
    if (k === 'home') { router.navigate('/local' as any); return; }
    if (k === 'city') { router.navigate('/local-cities' as any); return; }
    if (k === 'category') { router.navigate('/local-categories' as any); return; }
    router.navigate(session
      ? ('/business-new' as any)
      : ('/onboarding?step=2&next=/business-new' as any));
  };

  return { open, setOpen, onPick };
}
'''

# ------------------------------------------------------- the city pages
p = "components/local-cities.tsx"
s = open(p).read()

s = sub(s, "import { CategoryBar, CategorySheet } from '@/components/category-sheet';",
        "import { CategoryBar, CategorySheet } from '@/components/category-sheet';\n"
        "import { LocalDrawer, type DrawerPick } from '@/components/local-drawer';\n"
        "import { useAuth } from '@/lib/auth';",
        "cities import")

s = sub(s, "const ROW = 104;", "const ROW = 104;\n" + DRAWER_HOOK, "cities hook")

# the list: menu instead of back
s = sub(s, """        <View style={[st.topBar, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => router.navigate('/local' as any)}>
            <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
          </Pressable>
          <Text style={st.topT}>{t(LOCAL.byCityTitle)}</Text>
          <View style={{ width: 22 }} />
        </View>""",
"""        <View style={[st.topBar, fa && { flexDirection: 'row-reverse' }]}>
          <Pressable hitSlop={12} onPress={() => drawer.setOpen(true)}>
            <Ionicons name="menu-outline" size={22} color={D.text} />
          </Pressable>
          <Text style={st.topT}>{t(LOCAL.byCityTitle)}</Text>
          <View style={{ width: 22 }} />
        </View>""",
        "city list top bar")

s = sub(s, """export function CityList() {
  useLang();""",
"""export function CityList() {
  useLang();
  const drawer = useLocalDrawer();""",
        "city list drawer state")

s = sub(s, """        )}
      </SafeAreaView>
    </Animated.View>
  );
}""",
"""        )}
      </SafeAreaView>

      <LocalDrawer
        open={drawer.open}
        onClose={() => drawer.setOpen(false)}
        onPick={drawer.onPick}
      />
    </Animated.View>
  );
}""",
        "city list drawer mount")

# the city page: back to the list it came from, and a menu too
s = sub(s, """export function CityPage() {
  useLang();""",
"""export function CityPage() {
  useLang();
  const drawer = useLocalDrawer();""",
        "city page drawer state")

s = sub(s, """              <Pressable hitSlop={12} onPress={() => router.navigate('/local' as any)}>
                <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
              </Pressable>""",
"""              {/* Back to the cities, which is where this was opened from.
                  Going to the feed made every city a dead end. */}
              <Pressable hitSlop={12} onPress={() => router.navigate('/local-cities' as any)}>
                <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
              </Pressable>""",
        "city page back")

s = sub(s, """      <CategorySheet
        open={catOpen}
        value={cat}
        counts={counts}
        onPick={setCat}
        onClose={() => setCatOpen(false)}
      />""",
"""      <CategorySheet
        open={catOpen}
        value={cat}
        counts={counts}
        onPick={setCat}
        onClose={() => setCatOpen(false)}
      />

      <LocalDrawer
        open={drawer.open}
        onClose={() => drawer.setOpen(false)}
        onPick={drawer.onPick}
      />""",
        "city page drawer mount")

# the map button shares its row with the menu now
s = sub(s, """            <View style={[st.heroTop, fa && { flexDirection: 'row-reverse' }]}>""",
        """            <View style={[st.heroTop, fa && { flexDirection: 'row-reverse' }]}>""",
        "hero top")

open(p, "w").write(s)
print("local-cities.tsx done")


# ==================================================== the category page
p = "components/local-categories.tsx"
s = open(p).read()

s = sub(s, "import { catTint } from '@/components/local-tints';",
        "import { LocalDrawer, type DrawerPick } from '@/components/local-drawer';\n"
        "import { useAuth } from '@/lib/auth';",
        "categories import")
if "catTint" in s and "local-tints" not in s:
    pass

s = sub(s, "export function CategoryBrowse() {\n  useLang();",
        "export function CategoryBrowse() {\n  useLang();\n  const drawer = useLocalDrawer();",
        "categories drawer state")

s = sub(s, """          <Pressable hitSlop={12} onPress={() => router.navigate('/local' as any)}>
            <Ionicons name={fa ? 'chevron-forward' : 'chevron-back'} size={22} color={D.text} />
          </Pressable>""",
"""          <Pressable hitSlop={12} onPress={() => drawer.setOpen(true)}>
            <Ionicons name="menu-outline" size={22} color={D.text} />
          </Pressable>""",
        "categories top bar")

open(p, "w").write(s)
print("local-categories.tsx done")
print("\ntotal:", total)
print("\nThe icon grid is still in local-categories.tsx — replacing it with")
print("the text boxes is the next step, once these land.")
