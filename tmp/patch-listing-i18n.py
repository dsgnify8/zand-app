# The listing form, in both languages.
#
# The admin screens stay English — one reader, who reads English. This one
# is filled in by shop owners, and a Persian speaker meeting it in English
# is being told the app was built for somebody else.
#
# Day names and platform names are left alone: DAY_FA already exists for
# the first, and Instagram is Instagram.

total = 0
p = "app/(tabs)/business-new.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { colors, fonts, radius, spacing } from '@/constants/zand-theme';",
    "import { colors, fonts, radius, spacing } from '@/constants/zand-theme';\n"
    "import { LISTING } from '@/constants/i18n/listing';",
    "import")

PAIRS = [
    ("'We could not read your location. You can type the area instead.'", "t(LISTING.noLocation)"),
    ("'We could not find that place. Try a city or district.'", "t(LISTING.noPlace)"),
    ("'Could not save.'", "t(LISTING.couldNotSave)"),
    (">Sent for review<", ">{t(LISTING.sent)}<"),
    (">Back to Local<", ">{t(LISTING.backToLocal)}<"),
    ("'Edit listing'", "t(LISTING.titleEdit)"),
    ("'List a business'", "t(LISTING.titleNew)"),
    (">Listing<", ">{t(LISTING.tabListing)}<"),
    (">How it is doing<", ">{t(LISTING.tabStats)}<"),
    (">NAME<", ">{t(LISTING.nameLabel)}<"),
    ('placeholder="What it is called"', "placeholder={t(LISTING.namePlaceholder)}"),
    (">CATEGORY<", ">{t(LISTING.categoryLabel)}<"),
    (">WHERE IT IS<", ">{t(LISTING.whereItIs)}<"),
    (">Use my current location<", ">{t(LISTING.useMyLocation)}<"),
    ('placeholder="Central Gothenburg, Dubai Marina…"', "placeholder={t(LISTING.areaPlaceholder)}"),
    (">Pinned<", ">{t(LISTING.pinned)}<"),
    ('placeholder="Street address (optional)"', "placeholder={t(LISTING.streetAddress)}"),
    (">The first one is the cover.<", ">{t(LISTING.firstIsCover)}<"),
    (">COVER<", ">{t(LISTING.coverLabel)}<"),
    (">ABOUT<", ">{t(LISTING.aboutLabel)}<"),
    ('placeholder="What you do, and what makes it worth the trip."', "placeholder={t(LISTING.aboutPlaceholder)}"),
    (">CONTACT<", ">{t(LISTING.contactLabel)}<"),
    ('placeholder="Phone"', "placeholder={t(LISTING.phone)}"),
    ('placeholder="Website"', "placeholder={t(LISTING.website)}"),
    ('placeholder="Call it something — Our online store"', "placeholder={t(LISTING.websiteLabel)}"),
    ('placeholder="WhatsApp number"', "placeholder={t(LISTING.whatsapp)}"),
    (">KEYWORDS<", ">{t(LISTING.keywordsLabel)}<"),
    (">Up to four. Helps people find you when they search.<", ">{t(LISTING.keywordsHint)}<"),
    (">SOCIAL<", ">{t(LISTING.socialLabel)}<"),
    (">WHAT'S YOUR STORY?<", ">{t(LISTING.storyLabel)}<"),
    (">Yes, and I'd like to tell it<", ">{t(LISTING.storyYes)}<"),
    ('placeholder="Take as long as you like."', "placeholder={t(LISTING.storyPlaceholder)}"),
    (">HOURS<", ">{t(LISTING.hoursLabel)}<"),
    (">Leave a day blank if you are closed.<", ">{t(LISTING.hoursHint)}<"),
    ("'Save changes'", "t(LISTING.saveChanges)"),
    ("'Send for review'", "t(LISTING.sendForReview)"),
]

for a, b in PAIRS:
    sub(a, b, a[:52])

# the story note is a bare paragraph, so it needs its own match
sub("""                Not required, and listing does not depend on it. If there is
                something worth telling — how it started, who started it, what
                nearly stopped it — write it here.""",
    "                {t(LISTING.storyNote)}",
    "story note")

open(p, "w").write(s)
print("\ntotal:", total, "of", len(PAIRS) + 2)

# what is left in English
import re
left = []
for i, line in enumerate(s.split("\n"), 1):
    if re.search(r"(alignItems|justifyContent|flexDirection|fontFamily|backgroundColor|borderColor|color):", line):
        continue
    for m in re.finditer(r"placeholder=\"([A-Z][^\"]{2,60})\"|>\s*([A-Z][A-Za-z][^<>{}\n]{4,60})\s*<", line):
        v = (m.group(1) or m.group(2) or "").strip()
        if v and v not in ("Instagram", "TikTok", "Facebook", "Telegram"):
            left.append(f"{i}: {v}")
print("\nstill English:")
for l in left[:14]:
    print("   ", l)

print("\nt imported:", "t," in s.split("from '@/lib/i18n'")[0][-80:] if "@/lib/i18n" in s else "NO i18n import")
