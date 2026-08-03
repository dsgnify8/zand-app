# -*- coding: utf-8 -*-
# Hafez: the ghazals and the veil blocks. Every line here is real Hafez, so
# the Persian restores the original from the دیوان rather than translating
# the English rendering back.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 # ---- ghazal one: يوسف گمگشته باز آيد به کنعان غم مخور ----
 ("""{ a: 'Do not grieve. The lost Joseph will return to Canaan.', b: 'The house of sorrow will become a garden. Do not grieve.' }""",
  """{ a: 'Do not grieve. The lost Joseph will return to Canaan.', b: 'The house of sorrow will become a garden. Do not grieve.', aFa: 'یوسف گمگشته بازآید به کنعان غم مخور', bFa: 'کلبهٔ احزان شود روزی گلستان غم مخور' }"""),

 ("""{ a: 'Do not grieve, sorrowing heart, your state will mend.', b: 'That head will find its calm again. Do not grieve.' }""",
  """{ a: 'Do not grieve, sorrowing heart, your state will mend.', b: 'That head will find its calm again. Do not grieve.', aFa: 'ای دل غمدیده حالت به شود دل بد مکن', bFa: 'وین سر شوریده بازآید به سامان غم مخور' }"""),

 ("""{ a: 'The dark night and the fear of waves and the terrible whirlpool,', b: 'what do they know of our state, those light on the shore.' }""",
  """{ a: 'The dark night and the fear of waves and the terrible whirlpool,', b: 'what do they know of our state, those light on the shore.', aFa: 'شب تاریک و بیم موج و گردابی چنین هایل', bFa: 'کجا دانند حال ما سبکباران ساحل‌ها' }"""),

 ("note: 'From the most beloved ghazal in the Persian language. Every Iranian knows the refrain.'",
  "note: 'From the most beloved ghazal in the Persian language. Every Iranian knows the refrain.', noteFa: 'از محبوب‌ترین غزل زبان فارسی. ردیفش را هر ایرانی از بر است.'"),

 # ---- ghazal two: واعظان کاین جلوه در محراب و منبر می‌کنند ----
 ("""{ a: 'Preachers who make their display in pulpit and prayer niche,', b: 'do other work when they are alone behind the door.' }""",
  """{ a: 'Preachers who make their display in pulpit and prayer niche,', b: 'do other work when they are alone behind the door.', aFa: 'واعظان کاین جلوه در محراب و منبر می‌کنند', bFa: 'چون به خلوت می‌روند آن کار دیگر می‌کنند' }"""),

 ("""{ a: 'I have a question. Ask the learned of the assembly:', b: 'why do those who order repentance so seldom repent.' }""",
  """{ a: 'I have a question. Ask the learned of the assembly:', b: 'why do those who order repentance so seldom repent.', aFa: 'مشکلی دارم ز دانشمند مجلس بازپرس', bFa: 'توبه‌فرمایان چرا خود توبه کمتر می‌کنند' }"""),

 # ---- the veils ----
 ("surface: 'Come, for the palace of hope is built on sand. Bring wine, for the foundation of life is wind.'",
  "surface: 'Come, for the palace of hope is built on sand. Bring wine, for the foundation of life is wind.', surfaceFa: 'بیا که قصر امل سخت سست بنیادست\\u200Cبیار باده که بنیاد عمر بر بادست'"),

 ("surface: 'Last night I saw the angels knocking at the tavern door, kneading the clay of Adam and casting it into a cup.'",
  "surface: 'Last night I saw the angels knocking at the tavern door, kneading the clay of Adam and casting it into a cup.', surfaceFa: 'دوش دیدم که ملائک در میخانه زدند\\u200Cگِل آدم بسرشتند و به پیمانه زدند'"),

 ("surface: 'I am the slave of the spirit that has no colour of attachment, not to disbelief, not to faith, not to certainty, not to doubt.'",
  "surface: 'I am the slave of the spirit that has no colour of attachment, not to disbelief, not to faith, not to certainty, not to doubt.', surfaceFa: 'غلام همت آنم که زیر چرخ کبود\\u200Cز هر چه رنگ تعلق پذیرد آزاد است'"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
