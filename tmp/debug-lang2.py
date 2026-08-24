# One more probe.
#
# The emit reaches four subscribers and all four tick, but the language row
# never renders again — so SettingsSheet is not re-rendering, even though it
# calls useLang() at line 71.
#
# Either that hook is in a different component than the row, or the sheet's
# content is not re-rendering with its parent. A log at the very top of the
# function body distinguishes the two: if it prints on a switch, the
# component re-renders and the row is the problem; if it does not, the
# component itself is frozen or its hook is elsewhere.

p = "components/profile-modals.tsx"
s = open(p).read()

i = s.find("function SettingsSheet")
if i == -1:
    print("  SettingsSheet not found")
else:
    # first opening brace of the function body, after the parameter list
    j = s.index("{", s.index(")", i))
    log = ("\n  console.log('[lang] SettingsSheet render, curLang =', "
           "(require('@/lib/i18n').getLang())); // TEMP-LANG-LOG")
    s = s[: j + 1] + log + s[j + 1 :]
    open(p, "w").write(s)
    print("probe added at offset", j)

    # Show what the function signature actually is, and where useLang sits
    head = s[i : i + 200].splitlines()[0]
    print("signature:", head[:100])

for n, line in enumerate(s.splitlines(), 1):
    if "useLang()" in line or "function " in line and "Sheet" in line:
        print(f"  {n}: {line.strip()[:80]}")
