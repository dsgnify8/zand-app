# -*- coding: utf-8 -*-
# The taarof simulator verdicts and the del-word map.
# The del words keep their English gloss (heart tight, heart burning) —
# that gloss is the point of the exercise — but the explanation goes Farsi.

p = "components/culture-blocks.tsx"
s = open(p).read()
did = []

# ---- simulator verdicts ----
V = [
 ("t: 'Too soon.', x: 'You accepted on offer ' + (step + 1) + '. The first offers are not real, and everyone at the table now knows you were waiting for it. The host is smiling. The host is not pleased.'",
  "t: 'Too soon.', tFa: 'زود بود.', x: 'You accepted on offer ' + (step + 1) + '. The first offers are not real, and everyone at the table now knows you were waiting for it. The host is smiling. The host is not pleased.', fa: 'تعارف شمارهٔ ' + (step + 1) + ' را قبول کردی. تعارف‌های اول واقعی نیستند، و حالا همهٔ کسانی که سر سفره‌اند می‌دانند که منتظرش بودی. میزبان لبخند می‌زند. میزبان راضی نیست.'"),

 ("t: 'Correct.', x: 'Three refusals, then acceptance on the third genuine offer. Nobody was exposed, nobody was refused, and everybody got exactly what they wanted. This is the whole machine working.'",
  "t: 'Correct.', tFa: 'درست بود.', x: 'Three refusals, then acceptance on the third genuine offer. Nobody was exposed, nobody was refused, and everybody got exactly what they wanted. This is the whole machine working.', fa: 'سه بار رد کردی، و بعد تعارف سومِ واقعی را پذیرفتی. آبروی کسی نرفت، به کسی نه گفته نشد، و همه دقیقاً همان چیزی را گرفتند که می‌خواستند. این یعنی تمام آن دستگاه، درست کار کرده.'"),

 ("t: 'You overdid it.', x: 'The third offer was real and you refused it. The host has withdrawn it, because you have now insisted, and they have to take you at your word. You wanted it. You do not have it.'",
  "t: 'You overdid it.', tFa: 'زیاده‌روی کردی.', x: 'The third offer was real and you refused it. The host has withdrawn it, because you have now insisted, and they have to take you at your word. You wanted it. You do not have it.', fa: 'تعارف سوم واقعی بود و تو ردش کردی. میزبان پسش گرفت، چون تو اصرار کردی و او ناچار است حرفت را باور کند. می‌خواستی‌اش. و حالا نداری‌اش.'"),
]
n = 0
for a, b in V:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("verdicts " + str(n) + "/3")

a = "<Text style={[styles.simVerdict, { color: map.c }]}>{map.t}</Text>"
b = "<Text style={[styles.simVerdict, { color: map.c }]}>{fa && (map as any).tFa ? (map as any).tFa : map.t}</Text>"
if a in s: s = s.replace(a, b, 1); did.append("verdict title")

for a, b in [
 ("<Text style={styles.simAgainT}>again</Text>",
  "<Text style={styles.simAgainT}>{fa ? 'دوباره' : 'again'}</Text>"),
 ("<Text style={styles.simKicker}>OFFER {step + 1} OF 3</Text>",
  "<Text style={styles.simKicker}>{fa ? 'تعارف ' + (step + 1) + ' از ۳' : 'OFFER ' + (step + 1) + ' OF 3'}</Text>"),
 ("<Text style={styles.simHost}>{round.host}</Text>",
  "<Text style={[styles.simHost, fa && styles.faBody]}>{fa && (round as any).hostFa ? (round as any).hostFa : round.host}</Text>"),
]:
    if a in s: s = s.replace(a, b, 1)
did.append("sim chrome")

# ---- del words ----
D = [
 ("{ fa: 'دلتنگ', tr: 'deltang', en: 'heart tight', x: 'Missing someone.' }",
  "{ fa: 'دلتنگ', tr: 'deltang', en: 'heart tight', x: 'Missing someone.', xFa: 'دلت برای کسی تنگ شده.' }"),
 ("{ fa: 'دلسوز', tr: 'delsuz', en: 'heart burning', x: 'Compassionate. Your heart burns for them.' }",
  "{ fa: 'دلسوز', tr: 'delsuz', en: 'heart burning', x: 'Compassionate. Your heart burns for them.', xFa: 'مهربان و دلواپس دیگری. دلت برایش می‌سوزد.' }"),
 ("{ fa: 'دلبر', tr: 'delbar', en: 'heart carrier', x: 'The beloved. They took it with them.' }",
  "{ fa: 'دلبر', tr: 'delbar', en: 'heart carrier', x: 'The beloved. They took it with them.', xFa: 'معشوق. دل را با خودش برد.' }"),
 ("{ fa: 'دلدار', tr: 'deldar', en: 'heart holder', x: 'The one who holds your heart.' }",
  "{ fa: 'دلدار', tr: 'deldar', en: 'heart holder', x: 'The one who holds your heart.', xFa: 'آن که دلت دست اوست.' }"),
 ("{ fa: 'دل‌شکسته', tr: 'delshekaste', en: 'heart broken', x: 'The same image in every language, but Persian got there first.' }",
  "{ fa: 'دل‌شکسته', tr: 'delshekaste', en: 'heart broken', x: 'The same image in every language, but Persian got there first.', xFa: 'همین تصویر در هر زبانی هست، اما فارسی زودتر از همه به آن رسید.' }"),
]
n = 0
for a, b in D:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("del " + str(n) + "/" + str(len(D)))

open(p, "w").write(s)
print("applied:", " | ".join(did))
