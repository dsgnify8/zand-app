# Wire the remaining screens.
#
# Most of Learn is already translated and simply not being called: translate,
# phrasebook, phrasebookCount and phrasebookX all exist in learn.ts with
# Persian. Only the alphabet panel lines, the journey card and the
# "where does this come from" box are genuinely new.
#
# The business day names are already handled — DAYS are three-letter keys
# with DAY_EN and DAY_FA maps, which is the right shape. Left alone.

total = 0

def edit(path, pairs, label=None):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", (label or path).split("/")[-1], "|", a.strip()[:56])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


# --------------------------------------------------- new learn keys
p = "constants/i18n/learn.ts"
s = open(p).read()
if "tapWhatYouRead" not in s:
    a = "  // the alphabet"
    b = """  // the alphabet panel on the learn tab
  tapWhatYouRead: {
    en: 'Tap the ones you can read on sight. Be honest, it is only for you.',
    fa: 'آن‌هایی را که به‌محض دیدن می‌خوانی بزن. راستش را بزن، فقط برای خودت است.',
  },
  noneMarked: {
    en: 'Nothing marked yet. Start with alef, be, pe. They are the easy three.',
    fa: 'هنوز چیزی علامت نزده‌ای. با الف، ب، پ شروع کن. این سه از همه ساده‌ترند.',
  },
  allThirtyTwo: { en: 'All thirty two. Now go and read something.', fa: 'هر سی‌ودو تا. حالا برو یک چیزی بخوان.' },

  // the way into the journey
  startPersian: { en: 'Start Persian', fa: 'فارسی را شروع کن' },
  enterJourney: { en: 'Enter your journey', fa: 'وارد مسیرت شو' },
  twoQuestions: {
    en: 'Two questions, then we begin where you actually are.',
    fa: 'دو تا سؤال، بعد از همان‌جایی که واقعاً هستی شروع می‌کنیم.',
  },
  lettersThenWords: {
    en: 'The letters, then words, then whole sentences. Pick up wherever you stopped.',
    fa: 'اول حروف، بعد واژه‌ها، بعد جمله‌های کامل. از هر جا که ماندی ادامه بده.',
  },
  whereFrom: { en: 'Where does any of this come from?', fa: 'این‌ها همه از کجا آمده‌اند؟' },
  whereFromX: { en: 'The story of the language, in Education.', fa: 'داستان این زبان، در بخش آموزش.' },
  learnFarsi: { en: 'Learn Farsi', fa: 'فارسی یاد بگیر' },
  learnFarsiX: {
    en: 'From the alphabet to real conversation, step by step.',
    fa: 'از الفبا تا گفت‌وگوی واقعی، قدم‌به‌قدم.',
  },
  cameFromSurvived: {
    en: 'Where Persian came from, and how it survived.',
    fa: 'فارسی از کجا آمد، و چطور ماند.',
  },

  // the alphabet"""
    open(p, "w").write(s.replace(a, b, 1))
    total += 1
    print("learn.ts: keys added")
else:
    print("learn.ts: keys already present")


# ------------------------------------------------------------- learn
edit("app/(tabs)/learn.tsx", [
    ("'Tap the ones you can read on sight. Be honest, it is only for you.'", "tl(LEARN.tapWhatYouRead)"),
    ("'Nothing marked yet. Start with alef, be, pe. They are the easy three.'", "tl(LEARN.noneMarked)"),
    ("'All thirty two. Now go and read something.'", "tl(LEARN.allThirtyTwo)"),
    ("'Start Persian'", "tl(LEARN.startPersian)"),
    ("'Enter your journey'", "tl(LEARN.enterJourney)"),
    ("'Two questions, then we begin where you actually are.'", "tl(LEARN.twoQuestions)"),
    ("'The letters, then words, then whole sentences. Pick up wherever you stopped.'", "tl(LEARN.lettersThenWords)"),
    (">Where does any of this come from?<", ">{tl(LEARN.whereFrom)}<"),
    (">The story of the language, in Education.<", ">{tl(LEARN.whereFromX)}<"),
])

# ------------------------------------------------------------- local
edit("app/(tabs)/local.tsx", [
    ("'Near you'", "t(LOCAL.nearYou)"),
    ("'Everywhere'", "t(LOCAL.everywhere)"),
    ("'Show everywhere'", "t(LOCAL.showEverywhere)"),
    ("'Use my location'", "t(LOCAL.useMyLocation)"),
    ("'Stockholm, Dubai, Gothenburg…'", "t(LOCAL.cityPlaceholder)"),
    ("'What are you looking for?'", "t(LOCAL.searchPlaceholder)"),
    ("'Persians are known for making\\na name for themselves.'", "t(LOCAL.knownFor)"),
    ("'Here is where to find them.'", "t(LOCAL.whereToFind)"),
    ("'Run one of these? Put it on the map.'", "t(LOCAL.runOne)"),
    ("'Send it in, we read every one, and it goes up once approved.'", "t(LOCAL.runOneX)"),
    ("'List a business'", "t(LOCAL.listBusiness)"),
    ("'Nothing here yet. Yours could be the first.'", "t(LOCAL.nothingYet)"),
])

# ---------------------------------------------------------- business
edit("app/business.tsx", [
    ("'Not found.'", "t(LOCAL.notFound)"),
    ("'Directions'", "t(LOCAL.directions)"),
    ("'Website'", "t(LOCAL.website)"),
    ("'See it on the map'", "t(LOCAL.seeOnMap)"),
    ("'This business listed itself on Zand.'", "t(LOCAL.selfListed)"),
])

# ---------------------------------------------------------- language
edit("app/language/index.tsx", [
    ("'Learn Farsi'", "tl(LEARN.learnFarsi)"),
    ("'From the alphabet to real conversation, step by step.'", "tl(LEARN.learnFarsiX)"),
    ("'Where Persian came from, and how it survived.'", "tl(LEARN.cameFromSurvived)"),
])

# ------------------------------------------------------------ imports
for path, need in [
    ("app/(tabs)/local.tsx", [("LOCAL", "@/constants/i18n/local"), ("t", "@/lib/i18n")]),
    ("app/business.tsx", [("LOCAL", "@/constants/i18n/local"), ("t", "@/lib/i18n")]),
    ("app/(tabs)/learn.tsx", [("LEARN", "@/constants/i18n/learn")]),
    ("app/language/index.tsx", [("LEARN", "@/constants/i18n/learn")]),
]:
    s = open(path).read()
    for sym, mod in need:
        if sym == "t":
            has = ("t as t" in s) or (" t," in s.split("from '@/lib/i18n'")[0][-90:] if "@/lib/i18n" in s else False)
            print(path.split("/")[-1], "| t available:", has)
            continue
        if mod in s:
            continue
        last = None
        import re
        for im in re.finditer(r"^import .*?;\s*$", s, re.M):
            last = im
        s = s[: last.end()] + f"\nimport {{ {sym} }} from '{mod}';" + s[last.end():]
        open(path, "w").write(s)
        print("  imported", sym, "into", path.split("/")[-1])

print("\ntotal:", total)
print("\nCheck the t/tl helper name in each file before reloading.")
