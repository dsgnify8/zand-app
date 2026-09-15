# Taarof, revised.
#
# A second pass over what went in earlier. The register is deliberately
# less formal than the history topics — this is someone explaining a
# thing to a friend, not a chronicle, and the Persian follows.

import re

PAIRS = [
 ("Taarof", "تعارف"),
 ("THE RULE NOBODY EXPLAINS", "قاعده‌ای که هیچ‌کس توضیحش نمی‌دهد"),

 ("Offering what you will not give. Refusing what you want. The most confusing thing about Iranians, to everyone including Iranians.",
  "پیشنهاد دادنِ چیزی که قرار نیست بدهی. رد کردنِ چیزی که واقعاً می‌خواهی. گیج‌کننده‌ترین چیز دربارهٔ ایرانی‌ها برای همه، حتی خود ایرانی‌ها."),

 ("The Offer You Must Refuse", "پیشنهادی که باید ردش کنی"),

 ("Everything is offered. Almost nothing is meant. And everyone in the room knows exactly which is which.",
  "همه‌چیز تعارف می‌شود. تقریباً هیچ‌کدام واقعاً جدی نیست. و همهٔ کسانی که در جمع هستند دقیقاً می‌دانند کدام‌یک جدی است و کدام‌یک نیست."),

 ("To an outsider it looks like lying. It is closer to the opposite. It is a system for protecting people from ever having to be humiliated by a direct no.",
  "برای کسی که از بیرون نگاه می‌کند، ممکن است شبیه دروغ به نظر برسد. اما در واقع، تقریباً برعکس آن است. تعارف راهی است برای اینکه هیچ‌کس مجبور نشود با شنیدن یک «نه» مستقیم، احساس خجالت یا تحقیر کند."),

 ("Three Times", "سه بار"),

 ("Almost always empty. It is politeness. Take it and you have misread the room.",
  "تقریباً همیشه توخالی است؛ فقط نشانهٔ ادب است. اگر همان بار اول قبولش کنی، یعنی فضای جمع را درست درک نکرده‌ای."),

 ("Getting warmer. Still refuse. This is where the other person shows they meant it.",
  "دارد جدی‌تر می‌شود. اما هنوز باید ردش کنی. اینجاست که طرف مقابل نشان می‌دهد پیشنهادش واقعاً جدی بوده است."),

 ("Now it is real. Now you may accept, and everyone is satisfied, and nobody was ever exposed.",
  "حالا دیگر واقعی است. حالا می‌توانی قبولش کنی؛ همه راضی‌اند و هیچ‌کس هم در موقعیتی قرار نگرفته که احساس شرمندگی کند."),

 ("The rule of three exists so that nobody ever has to hear a real no.",
  "قانون سه بار وجود دارد تا هیچ‌کس مجبور نشود یک «نه» واقعی و مستقیم بشنود."),

 ("The shopkeeper", "مغازه‌دار"),
 ("What It Is For", "تعارف برای چیست؟"),

 ("It is also, genuinely, a form of care. The offer is a way of saying you matter more to me than the thing. Even when it is empty, the shape of it is generous, and the shape is the message.",
  "تعارف در عین حال، واقعاً نوعی محبت و توجه است. آن پیشنهاد راهی است برای گفتن اینکه تو برای من از آن چیز مهم‌تری. حتی وقتی پیشنهادی واقعی در کار نیست، خودِ این رفتار سخاوتمندانه است و همین شکلِ رفتار، پیام را می‌رساند."),

 ("And it costs", "و بی‌هزینه هم نیست"),

 ("This is the thing most Iranians abroad say they get wrong with their own relatives.",
  "بیشتر ایرانی‌های خارج از کشور می‌گویند همین چیزی است که در برخورد با فامیل خودشان درست متوجهش نمی‌شوند."),

 ("It is not dishonesty. It is a language in which the words are not the message and everybody fluent knows it. The only people it fools are the ones taking it literally.",
  "این دورویی یا بی‌صداقتی نیست. تعارف زبانی است که در آن خودِ کلمات پیام اصلی نیستند و هرکس این زبان را بلد باشد این را می‌داند. تنها کسانی را به اشتباه می‌اندازد که حرف‌ها را تحت‌اللفظی می‌گیرند."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


# Culture lives in its own file, and in two places within it: the card in
# CULTURE_TOPICS and the body in CULTURE_PAGES.
paths = ["constants/culture.ts", "components/culture-blocks.tsx"]
applied = 0
touched = set()

for p in paths:
    try:
        s = open(p).read()
    except FileNotFoundError:
        continue
    before = s

    for en, fa in PAIRS:
        pat = re.compile(
            r"((?:x|title|sub|h|lead|en|blurb|tag|label|front|back|name): '"
            + re.escape(esc(en))
            + r"',\s*(?:[a-zA-Z]*[Ff]a|persian): ')((?:[^'\\]|\\.)*)(')"
        )
        s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
        applied += n

    if s != before:
        open(p, "w").write(s)
        touched.add(p)

for p in sorted(touched):
    print("updated:", p)

blob = "".join(open(p).read() for p in paths)
miss = [en[:52] for en, fa in PAIRS if esc(fa) not in blob]
print("\nreplacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
