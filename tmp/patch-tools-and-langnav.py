# The last two untranslated things.
#
# Both are content rather than UI strings, and both are half-done already:
# the tool cards carry `persian` for the title but their description is
# English only, and the language chapters carry titleFa and subtitleFa but
# no navFa. Adding the missing field to each, and having the renderer prefer
# it — the same nav/navFa pattern culture.ts already uses.

total = 0

# ------------------------------------------------------- the tool cards
p = "constants/learn.ts"
s = open(p).read()

PAIRS = [
    ("x: 'Any language into Persian, and back.',",
     "x: 'Any language into Persian, and back.', xFa: 'هر زبانی به فارسی، و برعکس.',"),
    ("x: 'Fifty things worth being able to say. Tap any line to hear it.',",
     "x: 'Fifty things worth being able to say. Tap any line to hear it.', xFa: 'پنجاه چیز که ارزش گفتن دارد. هر سطر را بزن تا بشنوی.',"),
    # the group label above them
    ("key: 'tools', label: 'TOOLS', note: 'For when you need it, not for study.',",
     "key: 'tools', label: 'TOOLS', labelFa: 'ابزارها', note: 'For when you need it, not for study.', noteFa: 'برای وقتی که لازمت می‌شود، نه برای درس خواندن.',"),
]
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped [learn.ts]:", a[:52])
open(p, "w").write(s)
print("learn.ts done")

# --------------------------------------------------- the language nav
p = "constants/language.ts"
s = open(p).read()

# The Arab conquest, so فتح rather than تسخیر. "In English" is the chapter
# about Persian words that entered English, so در انگلیسی reads right.
NAV = [
    ("    nav: 'The Root',", "    nav: 'The Root', navFa: 'ریشه',"),
    ("    nav: 'The Journey',", "    nav: 'The Journey', navFa: 'سفر',"),
    ("    nav: 'The Conquest',", "    nav: 'The Conquest', navFa: 'فتح',"),
    ("    nav: 'In English',", "    nav: 'In English', navFa: 'در انگلیسی',"),
]
n = 0
for a, b in NAV:
    if a in s:
        s = s.replace(a, b, 1); n += 1
    else:
        print("   skipped [language.ts]:", a.strip()[:40])
open(p, "w").write(s)
total += n
print("language.ts:", n, "of", len(NAV))

# Any chapter left without a navFa?
import re
navs = re.findall(r"nav: '([^']+)'", s)
withfa = re.findall(r"nav: '[^']+', navFa:", s)
print("chapters with nav:", len(navs), "| with navFa:", len(withfa))

# ----------------------------------------------------- the renderers
p = "app/(tabs)/learn.tsx"
s = open(p).read()
a = "<Text style={s.modX}>{mod.x}</Text>"
b = "<Text style={s.modX}>{getLang() === 'fa' && (mod as any).xFa ? (mod as any).xFa : mod.x}</Text>"
if a in s:
    s = s.replace(a, b, 1); total += 1
    open(p, "w").write(s)
    print("learn.tsx: tool description wired")
else:
    print("   skipped: mod.x")

p = "app/language/index.tsx"
s = open(p).read()
a = "<Text style={[styles.navText, on && styles.navTextOn]} numberOfLines={1}>{c.nav}</Text>"
b = "<Text style={[styles.navText, on && styles.navTextOn]} numberOfLines={1}>{getLang() === 'fa' && (c as any).navFa ? (c as any).navFa : c.nav}</Text>"
if a in s:
    s = s.replace(a, b, 1); total += 1
    open(p, "w").write(s)
    print("language/index.tsx: nav wired")
else:
    print("   skipped: c.nav")

print("\ntotal:", total)
