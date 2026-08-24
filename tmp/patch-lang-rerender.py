# Language switching should re-render, not remount.
#
# ThemeProvider was keyed on the language so that changing it tore down the
# whole tree and built it again — the blunt way to refresh 50-odd files that
# call getLang() at render without subscribing to it.
#
# But the root already calls useLang(), which ticks on every change and
# re-renders the entire tree beneath it. A re-render is all those getLang()
# calls need: they read the module value at render time, so they pick up the
# new language on the next pass. The key adds nothing to that. What it adds
# is a remount, which destroys every piece of local state in the app.
#
# That is why the settings sheet shows the wrong language after switching:
# the sheet is not stale, it has been unmounted and rebuilt, along with
# profile's `settings` flag, every open panel, and every scroll position.
#
# The useLang() call on line 82 must stay even though appLang now looks
# unused — it is the subscription that causes the re-render. Removing it
# would stop language changes propagating at all.

p = "app/_layout.tsx"
s = open(p).read()

a = "        <ThemeProvider key={appLang} value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>"
b = """        {/* Deliberately not keyed on the language. useLang() above re-renders
            this tree on every change, which is enough for the getLang() calls
            throughout the app; keying it here remounted everything instead and
            wiped all local state — open sheets, selected panels, scroll
            positions — on every switch. */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>"""

if a in s:
    open(p, "w").write(s.replace(a, b, 1))
    print("key removed")
else:
    print("  not matched — paste line 138")

# The subscription is what makes this work. If it goes, nothing updates.
print("useLang subscription still present:", "const { lang: appLang } = useLang();" in s)
