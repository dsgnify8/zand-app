# The Guest, in Nojan's Persian.
#
# Eighteen pairs. The topic's argument is that hospitality is not
# friendliness but a refusal to let anyone be alone, and the Persian
# keeps that edge rather than softening it into politeness.

import re

PAIRS = [
 ("The Guest", "مهمان"),
 ("HOSPITALITY AS COMBAT", "مهمان‌نوازی در قامت نبرد"),

 ("The guest is beloved of God, and you will be fed until you suffer, and you are not permitted to leave.",
  "مهمان حبیب خداست؛ آن‌قدر به تو غذا می‌دهند تا دیگر از خوردن به زحمت بیفتی، و اجازهٔ رفتن هم نداری."),

 ("Beloved of God", "حبیب خدا"),

 ("The guest is beloved of God. This is not a saying. It is an instruction, and it will be carried out.",
  "مهمان حبیب خداست. این فقط یک حرف نیست؛ یک دستور است و به آن عمل خواهد شد."),

 ("You Are Not Leaving", "اجازهٔ رفتن نداری"),

 ("Shoes off at the door, always, without discussion. Tea appears before you have sat down. Fruit is cut, whether or not anyone wants fruit.",
  "کفش‌ها را دم در درمی‌آوری، همیشه، بی‌هیچ بحثی. هنوز ننشسته‌ای که چای از راه می‌رسد. میوه را هم می‌برند، چه کسی میوه بخواهد و چه نخواهد."),

 ("More than anyone could eat. If you clear your plate it means you were not given enough, and it is refilled. If you leave food, you are asked what is wrong with it. There is no correct move.",
  "بیشتر از چیزی که یک نفر بتواند بخورد. اگر بشقابت را کامل خالی کنی، یعنی به تو کم داده‌اند و دوباره پرش می‌کنند. اگر غذا را باقی بگذاری، می‌پرسند مگر چه ایرادی داشت. هیچ راه درستی برای این کار وجود ندارد."),

 ("This is heard as taarof and dismissed. You will be served again. Say it three times and possibly, possibly, you will be believed.",
  "حرفت را تعارف حساب می‌کنند و نادیده می‌گیرند. باز هم برایت غذا می‌کشند. سه بار که بگویی، شاید، فقط شاید، باورت کنند."),

 ("This takes forty minutes. You stand. You are told to sit. You reach the hallway. A conversation begins in the hallway. You reach the door. A new conversation begins at the door.",
  "این مرحله چهل دقیقه طول می‌کشد. بلند می‌شوی. می‌گویند بنشین. به راهرو می‌رسی و گفت‌وگویی در راهرو شروع می‌شود. به در می‌رسی و گفت‌وگوی تازه‌ای دم در آغاز می‌شود."),

 ("Someone comes out with food for you to take home. This is not optional either.",
  "یکی با ظرف غذایی می‌آید تا با خودت به خانه ببری. این یکی هم اختیاری نیست."),

 ("The Persian goodbye is not the end of the visit. It is a distinct event, and it is longer than most meetings.",
  "خداحافظی ایرانی پایان مهمانی نیست. خودش یک مراسم جداگانه است و از خیلی از دیدارها هم طولانی‌تر است."),

 ("What Is Actually Happening", "در واقع چه خبر است؟"),

 ("And some of it is simpler. Feeding people is how affection is expressed in a culture where saying it outright is difficult. The plate that keeps being refilled is a sentence that nobody in the room is able to say.",
  "و بخشی از ماجرا ساده‌تر است. در فرهنگی که ابراز مستقیم محبت دشوار است، غذا دادن راهی برای نشان دادن محبت است. آن بشقابی که مدام دوباره پر می‌شود، جمله‌ای است که هیچ‌کس در آن اتاق نمی‌تواند به زبان بیاورد."),

 ("This is why Persian mothers send you home with food. It is not about the food.",
  "برای همین است که مادرهای ایرانی موقع رفتن ظرف غذا دستت می‌دهند. ماجرا اصلاً خودِ غذا نیست."),

 ("And look at what all of it is actually doing. Eat more. Take this. Sit down. Stay a little longer. It is called friendliness, and it is not friendliness. It is a refusal to let anyone be alone in our presence, carried out by force if necessary.",
  "و ببین همهٔ این کارها در واقع چه می‌گویند: بیشتر بخور. این را بردار. بنشین. کمی دیگر بمان. اسمش را می‌گذارند خوش‌برخوردی، اما فقط خوش‌برخوردی نیست. این یعنی ما حاضر نیستیم بگذاریم کسی در حضور ما احساس تنهایی کند؛ حتی اگر لازم باشد، به زور."),

 ("It is not that Iranians are welcoming. It is that we will not permit you to be lonely in front of us.",
  "مسئله این نیست که ایرانی‌ها فقط مهمان‌نوازند. مسئله این است که ما اجازه نمی‌دهیم جلوی چشم ما احساس تنهایی کنی."),

 ("You will be fed until you suffer, kept at the door for forty minutes, and sent home with a bag you did not ask for. All of it is one message, delivered in the only vocabulary available.",
  "آن‌قدر به تو غذا می‌دهند تا از خوردن به زحمت بیفتی، چهل دقیقه دم در نگهت می‌دارند و با کیسه‌ای که اصلاً نخواسته بودی راهی خانه‌ات می‌کنند. همهٔ اینها یک پیام است، با تنها زبانی که برای بیانش در اختیار داریم."),
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
