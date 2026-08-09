# -*- coding: utf-8 -*-
# Culture: the rest of the hospitality steps, and جوانمردی.
# Conversational register, unpacked, intensifiers doing their work.

p = "constants/culture.ts"
s = open(p).read()

PAIRS = [
 ("x: 'More than anyone could eat. If you clear your plate it means you were not given enough, and it is refilled. If you leave food, you are asked what is wrong with it. There is no correct move.'",
  "x: 'More than anyone could eat. If you clear your plate it means you were not given enough, and it is refilled. If you leave food, you are asked what is wrong with it. There is no correct move.', fa: 'بیشتر از آن چیزی که هر آدمی بتواند بخورد. اگر بشقابت را تمام کنی، یعنی به تو کم داده‌اند و دوباره پرش می‌کنند. اگر غذا را نیمه بگذاری، می‌پرسند مگر چه ایرادی داشت. هیچ حرکت درستی در کار نیست.'"),

 ("x: 'This is heard as taarof and dismissed. You will be served again. Say it three times and possibly, possibly, you will be believed.'",
  "x: 'This is heard as taarof and dismissed. You will be served again. Say it three times and possibly, possibly, you will be believed.', fa: 'این را حمل بر تعارف می‌کنند و نادیده می‌گیرند. باز هم برایت می‌کشند. سه بار که بگویی، شاید، فقط شاید، باورت کنند.'"),

 ("x: 'This takes forty minutes. You stand. You are told to sit. You reach the hallway. A conversation begins in the hallway. You reach the door. A new conversation begins at the door.'",
  "x: 'This takes forty minutes. You stand. You are told to sit. You reach the hallway. A conversation begins in the hallway. You reach the door. A new conversation begins at the door.', fa: 'این مرحله چهل دقیقه طول می‌کشد. بلند می‌شوی. می‌گویند بنشین. به راهرو می‌رسی. در راهرو یک گفت‌وگوی تازه شروع می‌شود. به در می‌رسی. دم در یک گفت‌وگوی تازهٔ دیگر شروع می‌شود.'"),

 ("x: 'Someone comes out with food for you to take home. This is not optional either.'",
  "x: 'Someone comes out with food for you to take home. This is not optional either.', fa: 'یکی با ظرف غذا می‌آید بیرون که با خودت ببری. این یکی هم اختیاری نیست.'"),

 ("{ t: 'lead', x: 'Persian chivalry. A thousand years old, still the highest compliment you can pay a man in Iran, and almost unknown outside it.'",
  "{ t: 'lead', x: 'Persian chivalry. A thousand years old, still the highest compliment you can pay a man in Iran, and almost unknown outside it.', fa: 'مرام و مردانگیِ ایرانی. هزار سال قدمت دارد، هنوز بالاترین تعریفی است که می‌شود در ایران از یک مرد کرد، و بیرون از ایران تقریباً هیچ‌کس نمی‌شناسدش.'"),

 ("{ t: 'p', x: 'Javanmardi means, literally, young manliness, and it means almost the opposite of what that sounds like. It is not swagger. It is the opposite of swagger. Its core is strength that refuses to be used on anyone weaker, generosity that does not announce itself, and keeping your word when it costs you.' }",
  "{ t: 'p', x: 'Javanmardi means, literally, young manliness, and it means almost the opposite of what that sounds like. It is not swagger. It is the opposite of swagger. Its core is strength that refuses to be used on anyone weaker, generosity that does not announce itself, and keeping your word when it costs you.', fa: 'جوانمردی، تحت‌اللفظی یعنی جوان‌مرد بودن، و معنایش تقریباً برعکس آن چیزی است که از ظاهرش برمی‌آید. قلدری نیست. دقیقاً نقطهٔ مقابل قلدری است. هستهٔ اصلی‌اش این است: زوری که حاضر نیست روی کسی که ضعیف‌تر است استفاده شود، بخششی که خودش را جار نمی‌زند، و سر قول ماندن، آن هم وقتی که برایت گران تمام می‌شود.' }"),

 ("{ t: 'p', x: 'The javanmard does not humiliate an opponent he has beaten. He does not take from someone who cannot refuse. He does not mention what he gave. Iranians will describe a man as javanmard the way the English might say a man is decent, except with far more weight in it.' }",
  "{ t: 'p', x: 'The javanmard does not humiliate an opponent he has beaten. He does not take from someone who cannot refuse. He does not mention what he gave. Iranians will describe a man as javanmard the way the English might say a man is decent, except with far more weight in it.', fa: 'جوانمرد، حریفی را که شکست داده خوار نمی‌کند. از کسی که نمی‌تواند نه بگوید چیزی نمی‌گیرد. و از آنچه بخشیده حرفی نمی‌زند. ایرانی‌ها وقتی می‌گویند فلانی جوانمرد است، تقریباً همان کاری را می‌کنند که انگلیسی‌زبان‌ها با گفتنِ «آدم درست‌وحسابی» می‌کنند؛ فقط با وزنی به‌مراتب سنگین‌تر.' }"),

 ("{ t: 'p', x: 'And then there is the building. The zurkhaneh, the house of strength, is one of the strangest and best institutions Iran has produced, and it is roughly a thousand years old.' }",
  "{ t: 'p', x: 'And then there is the building. The zurkhaneh, the house of strength, is one of the strangest and best institutions Iran has produced, and it is roughly a thousand years old.', fa: 'و بعد، خودِ آن ساختمان. زورخانه، یعنی خانهٔ زور، یکی از غریب‌ترین و بهترین نهادهایی است که ایران ساخته، و حدود هزار سال قدمت دارد.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:55])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
