# -*- coding: utf-8 -*-
# The last eight loanwords. Each keeps its English form in Latin script,
# since the point is where the word went; the Persian original gets its
# own script, and the notes are conversational.

p = "constants/language.ts"
s = open(p).read()

L = [
 ("candy", "qand", 'قند', "Crystallised sugar.", 'قند.'),
 ("lemon", "limu", 'لیمو', "And lime with it.", 'و lime هم با آن رفت.'),
 ("orange", "narang", 'نارنگ', "The n was lost in the crossing. A narange became an orange.",
  'حرف «ن» در راه گم شد. a narange شد an orange.'),
 ("spinach", "esfenaj", 'اسفناج', "The plant travelled west from Iran.", 'خودِ این گیاه از ایران رو به غرب رفت.'),
 ("jasmine", "yasamin", 'یاسمین', "The flower, and the name.", 'هم گل، هم نام.'),
 ("caravan", "karvan", 'کاروان', "And caravanserai with it, the inn on the road.",
  'و کاروانسرا هم با آن رفت؛ همان منزلگاه سر راه.'),
 ("kiosk", "kushk", 'کوشک', "A garden pavilion. It became a newsstand.",
  'کوشک، یعنی عمارت کوچک میان باغ. در آن سر دنیا شد دکهٔ روزنامه‌فروشی.'),
 ("magic", "magush", 'مُغ', "From the Magi, the Zoroastrian priests of Persia.",
  'از مُغان، همان موبدان زرتشتی ایران.'),
]

applied, skipped = 0, []
for en, frm, frmFa, note, noteFa in L:
    a = "{ en: '" + en + "', from: '" + frm + "', note: '" + note + "' }"
    b = ("{ en: '" + en + "', from: '" + frm + "', fromFa: '" + frmFa +
         "', note: '" + note + "', noteFa: '" + noteFa + "' }")
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(en)

open(p, "w").write(s)
print("applied", applied, "of", len(L))
for k in skipped: print("   skipped:", k)
