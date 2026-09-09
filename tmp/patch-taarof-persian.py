# Taarof, in Nojan's Persian.
#
# Matched on the complete field value — `x: '<exactly this>'` — never on a
# substring. An earlier pass searched for the English anywhere in the file
# and a heading overwrote a paragraph that happened to contain the same
# words. Requiring the whole field makes that impossible.

import os
import re

PAIRS = [
 ("To an outsider it looks like lying. It is closer to the opposite. It is a system for protecting people from ever having to be humiliated by a direct no.",
  "برای کسی که از بیرون به ماجرا نگاه می‌کند، ممکن است شبیه دروغ گفتن به نظر برسد. اما در واقع، درست برعکس است. تعارف روشی است برای اینکه هیچ‌کس مجبور نشود با شنیدن یک «نه» مستقیم، احساس خجالت یا شرمندگی کند."),

 ("Three Times",
  "سه بار"),

 ("The engine is the rule of three. Nothing is real until it has been offered three times, and nothing is refused until it has been refused three times. Accept on the first offer and you have revealed that you were waiting for it. Refuse a third genuine offer and you have insulted the person giving it.",
  "اساس تعارف، قانونِ سه بار است. هیچ پیشنهادی جدی تلقی نمی‌شود، مگر اینکه سه بار مطرح شده باشد؛ و هیچ پیشنهادی واقعاً ردشده محسوب نمی‌شود، مگر اینکه سه بار رد شده باشد. اگر همان بار اول قبول کنی، معلوم می‌شود که از ابتدا منتظرش بوده‌ای. اما اگر سومین پیشنهادِ واقعاً جدی را هم رد کنی، به کسی که آن را به تو پیشنهاد کرده توهین کرده‌ای."),

 ("Almost always empty. It is politeness. Take it and you have misread the room.",
  "تقریباً همیشه فقط یک تعارفِ توخالی است؛ نشانه‌ای از ادب و احترام. اگر همان بار اول قبولش کنی، یعنی حال‌وهوای جمع را درست متوجه نشده‌ای."),

 ("Getting warmer. Still refuse. This is where the other person shows they meant it.",
  "دارد جدی‌تر می‌شود. اما هنوز باید ردش کنی. اینجاست که طرف مقابل نشان می‌دهد که پیشنهادش واقعاً از روی قصد بوده است."),

 ("Now it is real. Now you may accept, and everyone is satisfied, and nobody was ever exposed.",
  "حالا دیگر پیشنهاد واقعی است. حالا می‌توانی قبولش کنی؛ همه راضی‌اند و هیچ‌کس هم در موقعیتی قرار نگرفته که احساس شرمندگی یا خجالت کند."),

 ("The rule of three exists so that nobody ever has to hear a real no.",
  "قانونِ سه بار وجود دارد تا هیچ‌کس مجبور نشود یک «نه» واقعی و مستقیم بشنود."),

 ("The shopkeeper",
  "مغازه‌دار"),

 ("The purest form. You buy something, you ask the price, and the shopkeeper waves his hand and tells you it is worthless, take it, be my guest. He does not mean it. You do not for one second think he means it. You insist on paying. He refuses. You insist again. He names a price.",
  "شاید خالص‌ترین شکل تعارف را بتوان در مغازه دید. چیزی می‌خری، قیمتش را می‌پرسی، و مغازه‌دار دستش را تکان می‌دهد و می‌گوید: «قابلی نداره، بردار، مهمان ما باش.» خودش می‌داند که واقعاً منظورش این نیست و تو هم حتی برای یک لحظه فکر نمی‌کنی که جدی می‌گوید. اصرار می‌کنی که پولش را بدهی. او قبول نمی‌کند. دوباره اصرار می‌کنی. و در نهایت، قیمت را می‌گوید."),

 ("What It Is For",
  "تعارف برای چیست؟"),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


roots = ["constants", "components", "app"]
touched = set()
applied = 0

for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if not f.endswith((".ts", ".tsx")):
                continue
            p = os.path.join(dirpath, f)
            s = open(p).read()
            before = s

            for en, fa in PAIRS:
                # Whole field to whole field. The English key can be x,
                # title, sub, h, lead or en; the Persian that follows is
                # whatever Fa-suffixed key comes next in the same object.
                pat = re.compile(
                    r"((?:x|title|sub|h|lead|en): '" + re.escape(esc(en))
                    + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
                )
                s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
                applied += n

            if s != before:
                open(p, "w").write(s)
                touched.add(p)

for p in sorted(touched):
    print("updated:", p)

blob = ""
for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if f.endswith((".ts", ".tsx")):
                blob += open(os.path.join(dirpath, f)).read()

miss = [en[:58] for en, fa in PAIRS if esc(fa) not in blob]
print("\nreplacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
