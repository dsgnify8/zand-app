# Culture becomes the quote section.
#
# WORLDS had exactly one entry left (culture), so this retires the
# WORLDS.map call. WORLDS, World and WorldCard are now dead code in
# explore.tsx — left in place rather than ripped out mid-session, since
# nothing else imports them and removing them is a separate, safe pass.

p = "app/(tabs)/explore.tsx"
s = open(p).read()

PAIRS = [
 ("import { PoetDeck } from '@/components/poet-deck';",
  "import { PoetDeck } from '@/components/poet-deck';\n"
  "import { CultureQuote } from '@/components/culture-quote';"),

 ("        {WORLDS.map((w) => <WorldCard key={w.key} w={w} index={3} fa={fa} />)}",
  "        <Rise index={3}>\n"
  "          <CultureQuote />\n"
  "        </Rise>"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a.strip().splitlines()[0][:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)

print("WORLDS.map still called:", "{WORLDS.map(" in s)
print("CultureQuote rendered:", "<CultureQuote />" in s)
