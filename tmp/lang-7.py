# -*- coding: utf-8 -*-
# Language, seventh batch: چهارباغ, دری and تاجیکی, and the script.
# The script paragraph compares to English 'ough' — a Persian reader has
# no feel for that, so the comparison is turned round.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'The garden came too. The four quartered garden split by water channels, the chahar bagh, is the Persian design that produced the Taj Mahal gardens and every formal garden that followed them east.' }",
  "{ t: 'p', x: 'The garden came too. The four quartered garden split by water channels, the chahar bagh, is the Persian design that produced the Taj Mahal gardens and every formal garden that followed them east.', fa: 'خودِ باغ هم رفت. آن باغِ چهارقسمتی که جوی‌های آب از میانش می‌گذرند، یعنی چهارباغ، همان طرح ایرانی است که باغ‌های تاج‌محل و هر باغ رسمیِ پس از آن در شرق از رویش ساخته شد.' }"),

 ("{ t: 'p', x: 'Persian is spoken by well over a hundred million people, and not only in Iran. It is Dari in Afghanistan and Tajik in Tajikistan, three names for what is substantially one language, and a speaker of each can follow the others.' }",
  "{ t: 'p', x: 'Persian is spoken by well over a hundred million people, and not only in Iran. It is Dari in Afghanistan and Tajik in Tajikistan, three names for what is substantially one language, and a speaker of each can follow the others.', fa: 'بیش از صد میلیون نفر فارسی حرف می‌زنند، و نه فقط در ایران. در افغانستان دری است و در تاجیکستان تاجیکی؛ سه نام برای چیزی که در اساس یک زبان است، و گویشور هر کدام حرف آن دو تای دیگر را می‌فهمد.' }"),

 ("{ t: 'p', x: 'It runs right to left, joins its letters, and drops most short vowels from the writing, which is why the script looks harder than the language is. A reader supplies the vowels from knowing the word, exactly as you read English without noticing that ough says six different things.' }",
  "{ t: 'p', x: 'It runs right to left, joins its letters, and drops most short vowels from the writing, which is why the script looks harder than the language is. A reader supplies the vowels from knowing the word, exactly as you read English without noticing that ough says six different things.', fa: 'از راست به چپ می‌رود، حروفش به هم می‌چسبند، و بیشتر مصوت‌های کوتاه را نمی‌نویسد؛ برای همین خط سخت‌تر از خودِ زبان به نظر می‌رسد. خواننده مصوت‌ها را از شناختن خودِ واژه پر می‌کند، درست همان‌طور که تو «کرد» را می‌خوانی و از روی جمله می‌فهمی kard است یا kord یا Kord، بی‌آنکه یک لحظه هم مکث کنی.' }"),

 ("{ t: 'h', x: 'Why it held' }",
  "{ t: 'h', x: 'Why it held', fa: 'چرا ماند' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:50])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
