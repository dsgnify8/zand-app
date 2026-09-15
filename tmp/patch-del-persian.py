# The Heart, in Nojan's Persian.
#
# Seventeen pairs. The register here is deliberately closer to speech
# than the history topics — this is someone explaining something over
# tea, and the Persian is written that way.
#
# One line worth noting: "Del means heart" is circular for a Persian
# reader, who already knows what del means. The Persian answers that
# with "دل، یعنی همان دل" and then goes on to say what it is not, which
# is the only way the sentence works in the language it is about.

import re

PAIRS = [
 ("The Heart", "دل"),
 ("ONE WORD, A WHOLE LIFE", "یک کلمه، یک زندگی کامل"),

 ("Persian runs its entire emotional life through a single organ. Miss someone and your heart goes tight.",
  "فارسی تمام زندگی احساسی‌اش را از یک عضو بدن عبور می‌دهد. دلت برای کسی تنگ می‌شود، همین."),

 ("Everything Is in the Heart", "همه‌چیز در دل است"),

 ("Persian did not build a vocabulary for feeling. It built one word, and then built everything out of it.",
  "فارسی برای احساس، یک دایرهٔ واژگان نساخت. یک کلمه ساخت، و بعد هر چیز دیگری را از دل همان بیرون کشید."),

 ("Del means heart. Not the romantic heart of English, which mostly handles love and courage. The Persian del is the seat of the entire inner life: longing, courage, worry, kindness, grief, nerve, and the thing that goes tight when someone is far away.",
  "دل، یعنی همان دل. اما نه آن قلبِ عاشقانه‌ای که در انگلیسی هست و بیشتر کارش عشق است و شجاعت. دلِ فارسی جایگاه تمام زندگی درونی آدم است: دلتنگی، جرئت، نگرانی، مهربانی، اندوه، جربزه، و همان چیزی که وقتی کسی دور است تنگ می‌شود."),

 ("And it compounds. Tap it.",
  "و ترکیب می‌سازد؛ آن هم چه ترکیب‌هایی. رویش بزن."),

 ("When the Heart Goes Tight", "وقتی دل تنگ می‌شود"),

 ("Ask any Iranian abroad which phrase does not survive translation and this is the one they name. I miss you is information. Delam barat tang shode is a symptom.",
  "از هر ایرانی خارج از کشور بپرسی کدام عبارت است که از ترجمه جان به در نمی‌برد، همین را می‌گوید. «I miss you» یک خبر است، یک اطلاع. «دلم برات تنگ شده» یک حال است؛ چیزی که همین حالا در سینه‌ات دارد اتفاق می‌افتد."),

 ("And the other one", "و آن یکی دیگر"),

 ("A language that gave the heart its own road system.",
  "زبانی که برای دل، یک شبکهٔ راه مستقل کشیده است."),

 ("What they tell their sons", "آنچه به پسرهایشان می‌گویند"),

 ("And there is one line that Persian mothers and fathers say to their boys, and it is not advice about behaviour. It is a warning about the value of a thing.",
  "و یک جمله هست که پدر و مادرهای ایرانی به پسرهایشان می‌گویند، و این نصیحتی دربارهٔ رفتار نیست. هشداری است دربارهٔ ارزشِ یک چیز."),

 ("Why One Word", "چرا فقط یک کلمه"),

 ("Because Persian does not put much distance between the body and the feeling. English says I am sad, which is a fact about a state. Persian says my heart is tight, which is a fact about an organ, and it is more accurate, because that is where you feel it.",
  "چون فارسی فاصلهٔ چندانی میان تن و احساس نمی‌گذارد. انگلیسی می‌گوید «I am sad»، که خبری است دربارهٔ یک حالت. فارسی می‌گوید «دلم گرفته»، که خبری است دربارهٔ یک عضو از بدن؛ و دقیق‌تر هم هست، چون آدم واقعاً همان‌جا حسش می‌کند."),

 ("It also means that in Persian you cannot really talk about emotion without talking about the heart, which means the poets and the grandmothers and the taxi drivers are all using the same instrument. Hafez did not invent a special vocabulary. He used del, like everyone else, better.",
  "این یعنی در فارسی نمی‌شود واقعاً از احساس حرف زد بی‌آنکه از دل حرف بزنی؛ و یعنی شاعرها و مادربزرگ‌ها و رانندهٔ تاکسی، همه دارند از یک ساز استفاده می‌کنند. حافظ واژگان ویژه‌ای اختراع نکرد. از همان «دل» استفاده کرد، مثل بقیه؛ فقط بهتر."),

 ("One word, doing the work that other languages spread across fifty. Everything a Persian feels, they feel in the same place, and they say so.",
  "یک کلمه، که کارِ پنجاه کلمه را در زبان‌های دیگر انجام می‌دهد. هر چه یک ایرانی حس می‌کند، در همان یک جا حسش می‌کند؛ و همین را هم می‌گوید."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


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
