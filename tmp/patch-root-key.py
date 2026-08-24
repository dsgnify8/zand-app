# One language, everywhere, every time.
#
# The per-screen approach — subscribe with useLang(), key the screen's own
# container — works most of the time and fails unpredictably: the nav bar,
# Profile and the Learn cards would each hold the previous language until
# something else forced them to render. Hours went into finding out why and
# the honest answer is that I do not know.
#
# So: key the tree on the language, which is what this app did originally.
# A remount is not subtle, but it is total. Nothing can be left behind in
# the old language because nothing survives the switch.
#
# The cost is real and accepted: local state is lost on a language change —
# scroll positions, open sheets, the tab you were on. Someone changes
# language roughly once, ever. A lost scroll position on that one occasion
# is a far smaller thing than half an app in the wrong language.
#
# The per-screen keys come out. They cannot help once the root remounts and
# leaving them would suggest they were doing something.
#
# The useLang() subscriptions stay. They are harmless, and if the remount is
# ever removed they are what the app would fall back on.

total = 0

# ------------------------------------------------------------ the root
p = "app/_layout.tsx"
s = open(p).read()

a = """        {/* Deliberately not keyed on the language. useLang() above re-renders
            this tree on every change, which is enough for the getLang() calls
            throughout the app; keying it here remounted everything instead and
            wiped all local state — open sheets, selected panels, scroll
            positions — on every switch. */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>"""
b = """        {/* Keyed on the language, deliberately.
            
            Fifty-odd files read the language at render. Making each of them
            re-render reliably on a change proved not to be achievable —
            subscriptions fire, components render with the right value, and
            some of them still show the old language until navigated away
            from. A remount sidesteps all of it: the tree is rebuilt, so
            there is nothing left holding the previous language.
            
            This costs local state on every switch. That is the trade, and
            it is worth it — changing language is a once-ever action, and a
            half-translated screen is not something a Persian-only reader
            should ever see. */}
        <ThemeProvider key={appLang} value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>"""

if a in s:
    s = s.replace(a, b, 1); total += 1
    open(p, "w").write(s)
    print("root keyed on appLang")
else:
    print("   root anchor not matched — check app/_layout.tsx line ~138")

print("appLang subscription present:", "const { lang: appLang } = useLang();" in s)


# ------------------------------------------------ the per-screen keys
for p in ["app/(tabs)/profile.tsx", "app/(tabs)/explore.tsx"]:
    s = open(p).read()
    a = "<SafeAreaView key={require('@/lib/i18n').getLang()} style={s.safe} edges={['top']}>"
    b = "<SafeAreaView style={s.safe} edges={['top']}>"
    if a in s:
        s = s.replace(a, b, 1)
        # and the comment that went with it, if the profile one is still there
        s = s.replace("""    // Keyed on the language: changing writingDirection and textAlign on
    // already-mounted native Text views does not reliably take effect on
    // iOS. Recreating this subtree is what makes a live switch repaint.
""", "")
        open(p, "w").write(s)
        total += 1
        print("per-screen key removed:", p.split("/")[-1])
    else:
        print("   no per-screen key in:", p.split("/")[-1])

print("\ntotal:", total)
