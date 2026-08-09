# -*- coding: utf-8 -*-
# Culture: تعارف. Register is deliberately different from the rest of the
# app — conversational, amused, a Persian talking to a Persian who already
# knows all of this. The English explains taarof; the Persian recognises it.
# Shorter sentences, spoken connectives (خب، آخه، یعنی), direct address.

p = "constants/culture.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'lead', x: 'Everything is offered. Almost nothing is meant. And everyone in the room knows exactly which is which.'",
  "{ t: 'lead', x: 'Everything is offered. Almost nothing is meant. And everyone in the room knows exactly which is which.', fa: 'همه‌چیز تعارف می‌شود. تقریباً هیچ‌کدامش جدی نیست. و همهٔ کسانی که در اتاق‌اند دقیقاً می‌دانند کدام کدام است.'"),

 ("{ t: 'p', x: 'Taarof is the ritual of not saying the thing. You offer what you would rather keep. You refuse what you badly want. You insist, and are refused, and insist again, and the whole exchange is a piece of theatre both people are performing perfectly while appearing to mean every word.' }",
  "{ t: 'p', x: 'Taarof is the ritual of not saying the thing. You offer what you would rather keep. You refuse what you badly want. You insist, and are refused, and insist again, and the whole exchange is a piece of theatre both people are performing perfectly while appearing to mean every word.', fa: 'تعارف یعنی هنرِ نگفتنِ آن چیزی که می‌خواهی بگویی. چیزی را تعارف می‌کنی که دلت می‌خواهد برای خودت بماند. چیزی را رد می‌کنی که بدجور می‌خواهی‌اش. اصرار می‌کنی، رد می‌شوی، باز اصرار می‌کنی؛ و تمامش نمایشی است که هر دو طرف بی‌نقص بازی‌اش می‌کنند، آن هم طوری که انگار هر کلمه‌اش را از ته دل می‌گویند.' }"),

 ("{ t: 'p', x: 'To an outsider it looks like lying. It is closer to the opposite. It is a system for protecting people from ever having to be humiliated by a direct no.' }",
  "{ t: 'p', x: 'To an outsider it looks like lying. It is closer to the opposite. It is a system for protecting people from ever having to be humiliated by a direct no.', fa: 'برای کسی که از بیرون نگاه می‌کند شبیه دروغ است. در واقع تقریباً برعکسش است: سازوکاری است برای اینکه هیچ‌کس مجبور نشود یک «نه»ی خشک و خالی بشنود و کوچک شود.' }"),

 ("{ t: 'p', x: 'The engine is the rule of three. Nothing is real until it has been offered three times, and nothing is refused until it has been refused three times. Accept on the first offer and you have revealed that you were waiting for it. Refuse a third genuine offer and you have insulted the person giving it.' }",
  "{ t: 'p', x: 'The engine is the rule of three. Nothing is real until it has been offered three times, and nothing is refused until it has been refused three times. Accept on the first offer and you have revealed that you were waiting for it. Refuse a third genuine offer and you have insulted the person giving it.', fa: 'موتورِ ماجرا قانون سه بار است. هیچ‌چیز جدی نیست مگر سه بار تعارف شده باشد، و هیچ‌چیز رد نشده مگر سه بار رد شده باشد. بار اول قبول کنی، لو رفته‌ای که منتظرش بودی. بار سومِ یک تعارفِ واقعی را رد کنی، به طرف برخورده است.' }"),

 ("{ t: 'mark', x: 'The rule of three exists so that nobody ever has to hear a real no.' }",
  "{ t: 'mark', x: 'The rule of three exists so that nobody ever has to hear a real no.', fa: 'قانون سه بار هست تا هیچ‌کس مجبور نشود یک «نه»ی واقعی بشنود.' }"),

 ("{ t: 'h', x: 'The shopkeeper' }",
  "{ t: 'h', x: 'The shopkeeper', fa: 'مغازه‌دار' }"),

 ("{ t: 'p', x: 'The purest form. You buy something, you ask the price, and the shopkeeper waves his hand and tells you it is worthless, take it, be my guest. He does not mean it. You do not for one second think he means it. You insist on paying. He refuses. You insist again. He names a price.' }",
  "{ t: 'p', x: 'The purest form. You buy something, you ask the price, and the shopkeeper waves his hand and tells you it is worthless, take it, be my guest. He does not mean it. You do not for one second think he means it. You insist on paying. He refuses. You insist again. He names a price.', fa: 'خالص‌ترین شکلش. چیزی می‌خری، قیمتش را می‌پرسی، و مغازه‌دار دستش را تکان می‌دهد و می‌گوید قابل شما را ندارد. جدی نمی‌گوید. تو هم یک لحظه هم فکر نمی‌کنی جدی می‌گوید. اصرار می‌کنی که پول بدهی. قبول نمی‌کند. باز اصرار می‌کنی. آن وقت قیمت را می‌گوید.' }"),
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
