# The Ilkhanate, in Nojan's Persian.
#
# Thirteen of the fourteen pairs. The Baghdad paragraph is held back:
# its Persian carries a stray CJK character where a word should be —
# "را به震 درآورد" — which looks like a slip for "را به لرزه درآورد".
# Better to leave it in English for a day than to write a typo into the
# hardest page in the app.

import re

PAIRS = [
 ("The Ilkhanate", "ایلخانان"),
 ("The Storm from the East", "توفانی از شرق"),

 ("In the early thirteenth century, out of the steppes of Mongolia, came the most terrible conquerors the world had ever known. Under Genghis Khan, the Mongols built a war machine of unmatched speed and ferocity, and when their fury turned toward Iran, it fell upon the land like the end of the world.",
  "در آغاز سدهٔ سیزدهم، از دشت‌های مغولستان، هولناک‌ترین فاتحانی که جهان به خود دیده بود سر رسیدند. مغولان به فرمان چنگیزخان ماشین جنگی‌ای با شتاب و درندگی بی‌همتا ساخته بودند و وقتی خشمشان متوجه ایران شد، بر این سرزمین فرود آمدند؛ گویی پایان جهان فرا رسیده بود."),

 ("The Mongol storm was one of the greatest catastrophes Iran ever endured.",
  "توفان مغول یکی از بزرگ‌ترین فاجعه‌هایی بود که ایران در تاریخ خود از سر گذراند."),

 ("A wound to a civilization", "زخمی بر پیکر یک تمدن"),

 ("The Taming of the Conquerors", "رام شدن فاتحان"),

 ("The civilization they had nearly destroyed rose up and remade them in its image.",
  "تمدنی که نزدیک بود آن را نابود کنند، دوباره سر برآورد و آنان را به شکل خود از نو ساخت."),

 ("A flowering from the ashes", "شکوفایی از دل خاکستر"),

 ("Persian painting, enriched now by contact with the art of China, entered one of its most beautiful periods. Architecture, history, and science flourished under Mongol patronage. From the ashes of the greatest catastrophe, Iran had conjured a new flowering of its genius.",
  "نگارگری ایرانی که اکنون از پیوند با هنر چین غنا یافته بود، وارد یکی از زیباترین دوره‌های خود شد. معماری، تاریخ‌نگاری و دانش زیر حمایت مغولان شکوفا شدند. ایران از دل خاکستر بزرگ‌ترین فاجعه‌اش، شکوفایی تازه‌ای از نبوغ خود پدید آورد."),

 ("Rashid al-Din", "رشیدالدین فضل‌الله"),

 ("The Persian vizier and scholar who wrote a history of the world, and helped transform the Mongol conquerors into patrons of Persian civilization.",
  "وزیر و دانشمند ایرانی که تاریخ جهان را نوشت و به تبدیل فاتحان مغول به حامیان تمدن ایرانی کمک کرد."),

 ("This has been a glimpse of the Ilkhanate, the age of the Mongols in Iran, a story of catastrophe and, against all odds, of renewal. The Mongol invasion was among the most destructive events the nation ever suffered, and its wounds were deep and lasting.",
  "این نگاهی کوتاه بود به ایلخانان، روزگار مغول در ایران؛ روایتی از فاجعه و، برخلاف همهٔ انتظارها، از نوزایی. هجوم مغول یکی از ویرانگرترین رویدادهایی بود که این ملت در تاریخ خود از سر گذراند و زخم‌هایش عمیق و ماندگار بود."),

 ("Even the Mongols, in the end, were conquered by the soul of Iran.",
  "سرانجام حتی مغولان هم مغلوب جان ایران شدند."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


p = "constants/education.ts"
s = open(p).read()
applied = 0

for en, fa in PAIRS:
    pat = re.compile(
        r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb|years|value): '"
        + re.escape(esc(en))
        + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
    )
    s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
    applied += n

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
print("\nheld back: the Baghdad paragraph — its Persian has a stray")
print("character where a word should be. Send it again and it goes in.")
