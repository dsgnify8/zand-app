# -*- coding: utf-8 -*-
# Cyrus, chapter seven: the legacy.

p = "constants/education.ts"
s = open(p).read()

if "امپراتوری‌ای که کوروش بنیان نهاد با او نمرد" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'The empire Cyrus founded did not die with him. Under his son Cambyses and then Darius the Great it grew still larger, reaching into Egypt and to the plains of India and the edge of Europe, and it endured for two hundred years as the mightiest power on earth, until the coming of Alexander.' }",
  "{ t: 'p', x: 'The empire Cyrus founded did not die with him. Under his son Cambyses and then Darius the Great it grew still larger, reaching into Egypt and to the plains of India and the edge of Europe, and it endured for two hundred years as the mightiest power on earth, until the coming of Alexander.', fa: 'امپراتوری‌ای که کوروش بنیان نهاد با او نمرد. زیر فرمان پسرش کمبوجیه و سپس داریوش بزرگ باز هم بزرگ‌تر شد، تا مصر و دشت‌های هند و کرانهٔ اروپا پیش رفت، و دویست سال نیرومندترین قدرت روی زمین ماند، تا آمدن اسکندر.' }"),

 ("{ t: 'p', x: 'But the deeper legacy of Cyrus was not his empire. It was his example. He showed that a ruler could be strong and merciful at once, that a conqueror could also be a liberator, and that an empire of many peoples could be bound together by respect rather than fear.' }",
  "{ t: 'p', x: 'But the deeper legacy of Cyrus was not his empire. It was his example. He showed that a ruler could be strong and merciful at once, that a conqueror could also be a liberator, and that an empire of many peoples could be bound together by respect rather than fear.', fa: 'اما میراث ژرف‌تر کوروش امپراتوری‌اش نبود؛ سرمشقی بود که گذاشت. نشان داد فرمانروا می‌تواند هم نیرومند باشد و هم بخشنده، فاتح می‌تواند رهایی‌بخش هم باشد، و امپراتوری‌ای از مردمان بسیار را می‌توان با احترام به هم بست، نه با ترس.' }"),

 ("{ t: 'h', x: 'The king the world remembered' }",
  "{ t: 'h', x: 'The king the world remembered', fa: 'شاهی که جهان به یادش سپرد' }"),

 ("""{ t: 'p', x: 'The Greeks, who were his people\\'s great rivals, could not help but admire him. Xenophon wrote a whole book, the Cyropaedia, holding Cyrus up as the model of the ideal ruler, a book later read by kings and thinkers for centuries. The founders of nations far in the future would look back to Cyrus as an example of just rule.' }""",
  """{ t: 'p', x: 'The Greeks, who were his people\\'s great rivals, could not help but admire him. Xenophon wrote a whole book, the Cyropaedia, holding Cyrus up as the model of the ideal ruler, a book later read by kings and thinkers for centuries. The founders of nations far in the future would look back to Cyrus as an example of just rule.', fa: 'یونانیان، که رقیبان بزرگ مردم او بودند، نتوانستند تحسینش نکنند. گزنفون کتابی تمام دربارهٔ او نوشت، کوروش‌نامه، و او را نمونهٔ فرمانروای آرمانی خواند؛ کتابی که قرن‌ها پس از آن شاهان و اندیشمندان می‌خواندندش. بنیان‌گذاران ملت‌هایی در آینده‌های دور، کوروش را سرمشق فرمانروایی دادگر می‌دانستند.' }"""),

 ("{ t: 'p', x: 'For Iranians above all, he remains the father of the nation, the founder of the first Persian Empire and of an idea of Iran that has lasted through every age since. His name is spoken with a pride that has not dimmed in two and a half thousand years.' }",
  "{ t: 'p', x: 'For Iranians above all, he remains the father of the nation, the founder of the first Persian Empire and of an idea of Iran that has lasted through every age since. His name is spoken with a pride that has not dimmed in two and a half thousand years.', fa: 'و بیش از همه برای ایرانیان، او پدر ملت مانده است؛ بنیان‌گذار نخستین امپراتوری ایران و آغازگر اندیشه‌ای از ایران که از آن پس در هر روزگاری دوام آورده. نامش را با غروری بر زبان می‌آورند که در دو هزار و پانصد سال کم‌رنگ نشده است.' }"),

 ("""{ t: 'p', x: 'This has been a glimpse of the life of Cyrus the Great, the herdsman\\'s foster son who became king of the world, the conqueror who ruled with mercy, the founder of an empire and of an ideal. From a small kingdom in the highlands of Persia, he built something that outlasted his empire and outlasts us still, the belief that power is noblest when it is just.' }""",
  """{ t: 'p', x: 'This has been a glimpse of the life of Cyrus the Great, the herdsman\\'s foster son who became king of the world, the conqueror who ruled with mercy, the founder of an empire and of an ideal. From a small kingdom in the highlands of Persia, he built something that outlasted his empire and outlasts us still, the belief that power is noblest when it is just.', fa: 'این نگاهی بود کوتاه به زندگی کوروش بزرگ؛ پسرخواندهٔ چوپان که شاه جهان شد، فاتحی که با بخشش فرمان راند، بنیان‌گذار یک امپراتوری و یک آرمان. از پادشاهی کوچکی در بلندی‌های پارس، چیزی ساخت که از امپراتوری‌اش دیرتر پایید و هنوز هم از ما دیرتر می‌پاید: این باور که قدرت آنگاه شریف‌ترین است که دادگر باشد.' }"""),

 ("{ t: 'pull', x: 'He won an empire by the sword, and kept it by justice. The world has not forgotten him.' }",
  "{ t: 'pull', x: 'He won an empire by the sword, and kept it by justice. The world has not forgotten him.', fa: 'امپراتوری را با شمشیر گرفت و با داد نگه داشت. جهان او را از یاد نبرده است.' }"),
]

missing = [a for a, _ in PAIRS if a not in s]
if missing:
    print("ABORT: could not find", len(missing), "block(s):")
    for m in missing:
        print("   -", m[:80])
    raise SystemExit

for a, b in PAIRS:
    s = s.replace(a, b, 1)

open(p, "w").write(s)
print("chapter seven translated:", len(PAIRS), "blocks")
