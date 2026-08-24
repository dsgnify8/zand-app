# Literature moves above Culture.
#
# Order becomes: History, Geography, Literature, Culture, Traditions, Language.
# Culture is still the only entry in WORLDS, so this is one relocation.

p = "app/(tabs)/explore.tsx"
s = open(p).read()

a = """        </Rise>

        {WORLDS.map((w) => <WorldCard key={w.key} w={w} index={2} fa={fa} />)}

        <Rise index={3}>
          <PoetDeck />
        </Rise>"""

b = """        </Rise>

        <Rise index={2}>
          <PoetDeck />
        </Rise>

        {WORLDS.map((w) => <WorldCard key={w.key} w={w} index={3} fa={fa} />)}"""

if a in s:
    s = s.replace(a, b, 1)
    open(p, "w").write(s)
    print("applied")
else:
    print("  not matched")

# sanity: literature should now come before culture
i_deck = s.find("<PoetDeck />")
i_worlds = s.find("{WORLDS.map(")
i_map = s.find("IranProvinceMap")
print("WORLDS.map occurrences:", s.count("{WORLDS.map("))
print("order geography < literature < culture:", i_map < i_deck < i_worlds)
