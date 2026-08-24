# Put the new browse pieces into the feed.
#
# The chip row goes: fourteen categories in a sideways scroll meant the last
# few were effectively hidden, and a horizontal gesture above a vertical feed
# competes for the same thumb.
#
# The countries band sits between the categories and the list — the one door
# on this page leading somewhere else.
#
# Also collapses the fa ? '…' : t(...) ternaries in the header. Every one of
# them holds the Persian inline and the English in i18n, which means two
# places to change one string and a guarantee they will drift.

total = 0

# ------------------------------------------------------------- the keys
p = "constants/i18n/local.ts"
s = open(p).read()
if "allCategories" not in s:
    a = "  // the finder"
    b = """  // browsing
  allCategories: { en: 'All categories', fa: 'همهٔ دسته‌ها' },
  everything: { en: 'Everything', fa: 'همه' },
  byCountry: { en: 'BY COUNTRY', fa: 'بر اساس کشور' },
  // Persian does not inflect after a number, so both are جا. Two keys only
  // because English needs them.
  place: { en: 'place', fa: 'جا' },
  places: { en: 'places', fa: 'جا' },

  // the finder"""
    if a in s:
        s = s.replace(a, b, 1)
        open(p, "w").write(s)
        total += 1
        print("local.ts: keys added")
    else:
        print("   skipped: local.ts anchor")
else:
    print("local.ts: keys already present")


# ------------------------------------------------------------- the feed
p = "app/(tabs)/local.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { BusinessCard } from '@/components/business-card';",
    "import { BusinessCard } from '@/components/business-card';\n"
    "import { CategoryPill, CountriesBand } from '@/components/local-browse';",
    "import")

# the chip row out, the pill and band in
sub("""        {/* categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.cats} contentContainerStyle={{ gap: 7, paddingRight: spacing.lg }}>
          <Pressable style={[s.cat, !cat && s.catOn]} onPress={() => setCat(null)}>
            <Text style={[s.catT, !cat && s.catTOn]}>{fa ? 'همه' : 'All'}</Text>
          </Pressable>
          {CATEGORIES.map((c) => {
            const on = cat === c.key;
            return (
              <Pressable key={c.key} style={[s.cat, on && s.catOn]} onPress={() => setCat(on ? null : c.key)}>
                <Ionicons name={c.icon as any} size={12} color={on ? '#FFF' : colors.textSecondary} />
                <Text style={[s.catT, on && s.catTOn]}>{fa ? c.fa : c.en}</Text>
              </Pressable>
            );
          })}
        </ScrollView>""",
"""        {/* one pill, opening all fourteen at once */}
        <CategoryPill
          value={cat}
          onChange={setCat}
          counts={items.reduce((m: Record<string, number>, b: any) => {
            if (b.category) m[b.category] = (m[b.category] ?? 0) + 1;
            return m;
          }, {})}
        />

        {/* the one way through to somewhere else */}
        <CountriesBand
          items={items}
          onPick={(key, label) =>
            router.navigate(('/local-country?c=' + encodeURIComponent(key) + '&label=' + encodeURIComponent(label)) as any)
          }
        />""",
    "chip row")

# the doubled strings in the header
for a, b, label in [
    ("""              {fa
                ? 'کسب‌وکار خودت را اینجا ثبت کن'
                : t(LOCAL.runOne)}""", "              {t(LOCAL.runOne)}", "runOne"),
    ("""              {fa
                ? 'ثبت کن، ما بررسی می‌کنیم، و بعد در فهرست می‌آید.'
                : t(LOCAL.runOneX)}""", "              {t(LOCAL.runOneX)}", "runOneX"),
    ("{fa ? 'ثبت کسب‌وکار' : t(LOCAL.listBusiness)}", "{t(LOCAL.listBusiness)}", "listBusiness"),
    ("{fa ? 'ایرانی‌ها به نام‌ساختن مشهورند.' : t(LOCAL.knownFor)}", "{t(LOCAL.knownFor)}", "knownFor"),
    ("{fa ? 'اینجا می‌توانی پیدایشان کنی.' : t(LOCAL.whereToFind)}", "{t(LOCAL.whereToFind)}", "whereToFind"),
    ("{fa ? 'موقعیت من' : t(LOCAL.useMyLocation)}", "{t(LOCAL.useMyLocation)}", "useMyLocation"),
    ("{fa ? 'استکهلم، دبی، گوتنبرگ…' : t(LOCAL.cityPlaceholder)}", "{t(LOCAL.cityPlaceholder)}", "cityPlaceholder"),
    ("{fa ? 'همه‌جا را نشان بده' : t(LOCAL.showEverywhere)}", "{t(LOCAL.showEverywhere)}", "showEverywhere"),
    ("""                {fa
                  ? 'اینجا هنوز چیزی ثبت نشده. شاید تو اولی باشی.'
                  : t(LOCAL.nothingYet)}""", "                {t(LOCAL.nothingYet)}", "nothingYet"),
    ("{fa ? 'ثبت کسب‌وکار' : 'List a business'}", "{t(LOCAL.listBusiness)}", "listBusiness 2"),
]:
    sub(a, b, "ternary: " + label)

open(p, "w").write(s)
print("\ntotal:", total)

# CATEGORIES may now be unused in the screen
src = open(p).read()
print("CATEGORIES still used in local.tsx:", src.count("CATEGORIES"))
