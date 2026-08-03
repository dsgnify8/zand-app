# -*- coding: utf-8 -*-
# Modern Iran, chapter five: the currency. And the chart component's own
# labels, which render alongside it.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'No single fact about Iran since the revolution is easier to state or harder to live with than this one. In 1979 a United States dollar bought about seventy rials. In January 2026 it bought around one and a half million.' }",
  "{ t: 'p', x: 'No single fact about Iran since the revolution is easier to state or harder to live with than this one. In 1979 a United States dollar bought about seventy rials. In January 2026 it bought around one and a half million.', fa: 'هیچ واقعیتی دربارهٔ ایرانِ پس از انقلاب به این سادگی گفته نمی‌شود و به این سختی زیسته نمی‌شود. در سال ۱۳۵۷، یک دلار آمریکا حدود هفتاد ریال می‌ارزید. در دی ۱۴۰۴، حدود یک و نیم میلیون ریال.' }"),

 ("{ t: 'p', x: 'The line does not fall evenly. It steps. Each step corresponds to something: the war, the sanctions of the 2000s, the withdrawal from the nuclear agreement in 2018, the reimposition of United Nations sanctions in September 2025, and the collapse at the end of that year.' }",
  "{ t: 'p', x: 'The line does not fall evenly. It steps. Each step corresponds to something: the war, the sanctions of the 2000s, the withdrawal from the nuclear agreement in 2018, the reimposition of United Nations sanctions in September 2025, and the collapse at the end of that year.', fa: 'این نمودار یکنواخت پایین نمی‌آید؛ پله‌پله می‌افتد. هر پله به چیزی مربوط است: جنگ، تحریم‌های دههٔ ۸۰، خروج آمریکا از برجام در ۱۳۹۷، بازگشت تحریم‌های سازمان ملل در شهریور ۱۴۰۴، و سقوط پایان همان سال.' }"),

 ("{ t: 'p', x: 'The causes are argued over and they are not all external. Sanctions cut oil revenue and cut Iran out of the international banking system. But the money supply also grew far faster than the economy did, subsidised exchange rates created a system where access to dollars depended on political standing rather than price, and large parts of the economy came under the control of institutions that answer to no shareholder.' }",
  "{ t: 'p', x: 'The causes are argued over and they are not all external. Sanctions cut oil revenue and cut Iran out of the international banking system. But the money supply also grew far faster than the economy did, subsidised exchange rates created a system where access to dollars depended on political standing rather than price, and large parts of the economy came under the control of institutions that answer to no shareholder.', fa: 'بر سر علت‌ها بحث هست، و همه‌شان هم بیرونی نیستند. تحریم درآمد نفت را قطع کرد و ایران را از نظام بانکی جهان بیرون گذاشت. اما نقدینگی هم خیلی سریع‌تر از اقتصاد رشد کرد، ارز دولتی نظامی ساخت که در آن دسترسی به دلار به جای قیمت، به جایگاه سیاسی بستگی داشت، و بخش بزرگی از اقتصاد به دست نهادهایی افتاد که به هیچ سهامداری پاسخگو نیستند.' }"),

 ("{ t: 'p', x: 'What that means in a household is simple enough. Salaries are paid in rials and prices track the dollar, so a wage buys less each month than it did the month before. Savings held in rials evaporate, which is why Iranians buy gold, dollars, property, and lately cryptocurrency: not as investment but as a way of not losing what they already have. Iran has an educated, capable population with an unusually high proportion of engineers and graduates, and a great many of them have left.' }",
  "{ t: 'p', x: 'What that means in a household is simple enough. Salaries are paid in rials and prices track the dollar, so a wage buys less each month than it did the month before. Savings held in rials evaporate, which is why Iranians buy gold, dollars, property, and lately cryptocurrency: not as investment but as a way of not losing what they already have. Iran has an educated, capable population with an unusually high proportion of engineers and graduates, and a great many of them have left.', fa: 'معنی‌اش در یک خانه ساده است. حقوق را به ریال می‌دهند و قیمت‌ها دنبال دلار می‌روند، پس دستمزد هر ماه کمتر از ماه قبل می‌خرد. پس‌اندازی که به ریال بماند آب می‌رود، و برای همین ایرانی‌ها طلا و دلار و ملک می‌خرند و این اواخر رمزارز: نه به‌عنوان سرمایه‌گذاری، بلکه برای اینکه آنچه را دارند از دست ندهند. ایران جمعیتی تحصیل‌کرده و توانمند دارد، با سهم غیرعادی بالایی از مهندس و دانش‌آموخته، و شمار زیادی از آنها رفته‌اند.' }"),

 ("{ t: 'pull', x: 'A country can be rich in oil, water, land and people, and still have a currency nobody wants to hold.' }",
  "{ t: 'pull', x: 'A country can be rich in oil, water, land and people, and still have a currency nobody wants to hold.', fa: 'یک کشور می‌تواند از نفت و آب و خاک و آدم غنی باشد، و باز پولی داشته باشد که هیچ‌کس نمی‌خواهد نگهش دارد.' }"),
]

mi_scope.apply(PAIRS)

# the chart component's own labels
p = "components/currency-chart.tsx"
s = open(p).read()
did = []

REPL = [
 ("<Text style={[s.label, { color: dim }]}>RIALS TO ONE US DOLLAR</Text>",
  "<Text style={[s.label, { color: dim }]}>{fa ? 'ریال در برابر یک دلار آمریکا' : 'RIALS TO ONE US DOLLAR'}</Text>"),

 ("""      <Text style={[s.note, { color: dim }]}>
        Each gridline is ten times the one below it. On an ordinary scale the first
        twenty years would sit flat against the floor.
      </Text>""",
  """      <Text style={[s.note, { color: dim }]}>
        {fa
          ? 'هر خط شبکه ده برابر خط زیر خودش است. روی مقیاس معمولی، بیست سال اول صاف روی کف نمودار می‌نشست.'
          : 'Each gridline is ten times the one below it. On an ordinary scale the first twenty years would sit flat against the floor.'}
      </Text>"""),

 ("{ year: 1979, note: 'Revolution' }", "{ year: 1979, note: 'Revolution', noteFa: 'انقلاب' }"),
 ("{ year: 2015, note: 'Nuclear deal' }", "{ year: 2015, note: 'Nuclear deal', noteFa: 'برجام' }"),
 ("{ year: 2018, note: 'US withdrawal' }", "{ year: 2018, note: 'US withdrawal', noteFa: 'خروج آمریکا' }"),
 ("{ year: 2026, note: 'Protests' }", "{ year: 2026, note: 'Protests', noteFa: 'اعتراض‌ها' }"),

 ("<Text style={[s.markN, { color: dim }]}>{m.note}</Text>",
  "<Text style={[s.markN, { color: dim }, fa && s.faSmall]}>{fa && (m as any).noteFa ? (m as any).noteFa : m.note}</Text>"),

 ("{ item: 'A month of an average salary, in dollars', then: 'about $650', now: 'about $110' }",
  "{ item: 'A month of an average salary, in dollars', itemFa: 'یک ماه حقوق متوسط، به دلار', then: 'about $650', thenFa: 'حدود ۶۵۰ دلار', now: 'about $110', nowFa: 'حدود ۱۱۰ دلار' }"),
 ("{ item: 'Gold, one gram', then: '1,100 rials', now: 'above 90,000,000 rials' }",
  "{ item: 'Gold, one gram', itemFa: 'یک گرم طلا', then: '1,100 rials', thenFa: '۱٬۱۰۰ ریال', now: 'above 90,000,000 rials', nowFa: 'بالای ۹۰٬۰۰۰٬۰۰۰ ریال' }"),
 ("{ item: 'A simple lunch in Tehran', then: 'a few rials', now: 'hundreds of thousands' }",
  "{ item: 'A simple lunch in Tehran', itemFa: 'یک ناهار ساده در تهران', then: 'a few rials', thenFa: 'چند ریال', now: 'hundreds of thousands', nowFa: 'صدها هزار تومان' }"),

 ("<Text style={[s.bHead, { color: dim }]}>BEFORE 1979</Text>",
  "<Text style={[s.bHead, { color: dim }]}>{fa ? 'پیش از ۱۳۵۷' : 'BEFORE 1979'}</Text>"),
 ("<Text style={[s.bHead, { color: dim }]}>TODAY</Text>",
  "<Text style={[s.bHead, { color: dim }]}>{fa ? 'امروز' : 'TODAY'}</Text>"),
 ("<Text style={[s.bItem, { color: ink, flex: 1.6 }]}>{b.item}</Text>",
  "<Text style={[s.bItem, { color: ink, flex: 1.6 }, fa && s.faSmall]}>{fa && (b as any).itemFa ? (b as any).itemFa : b.item}</Text>"),
 ("<Text style={[s.bVal, { color: dim }]}>{b.then}</Text>",
  "<Text style={[s.bVal, { color: dim }, fa && s.faSmall]}>{fa && (b as any).thenFa ? (b as any).thenFa : b.then}</Text>"),
 ("<Text style={[s.bVal, { color: ink }]}>{b.now}</Text>",
  "<Text style={[s.bVal, { color: ink }, fa && s.faSmall]}>{fa && (b as any).nowFa ? (b as any).nowFa : b.now}</Text>"),

 ("""      <Text style={[s.note, { color: dim }]}>
        Figures are approximate and move constantly. The direction is the point.
      </Text>""",
  """      <Text style={[s.note, { color: dim }]}>
        {fa
          ? 'ارقام تقریبی‌اند و مدام تغییر می‌کنند. آنچه اهمیت دارد جهت است.'
          : 'Figures are approximate and move constantly. The direction is the point.'}
      </Text>"""),
]

n = 0
for a, b in REPL:
    if a in s: s = s.replace(a, b, 1); n += 1
    else: did.append("miss: " + a[:55])

# fa flags in both components
s = s.replace("export function CurrencyChart({ dark = true }: { dark?: boolean }) {",
              "export function CurrencyChart({ dark = true }: { dark?: boolean }) {\n  const fa = getLang() === 'fa';")
s = s.replace("export function BasketTable({ dark = true }: { dark?: boolean }) {",
              "export function BasketTable({ dark = true }: { dark?: boolean }) {\n  const fa = getLang() === 'fa';")

if "faSmall:" not in s:
    s = s.replace("const s = StyleSheet.create({\n",
                  "const s = StyleSheet.create({\n  faSmall: { fontFamily: fonts.persian, fontSize: 11.5, lineHeight: 22, textAlign: 'right', writingDirection: 'rtl' },\n", 1)

if "getLang" not in s:
    import re as _re
    last = None
    for last in _re.finditer(r"^import .*\n", s, _re.M): pass
    s = s[:last.end()] + "import { getLang } from '@/lib/i18n';\n" + s[last.end():]

open(p, "w").write(s)
print("chart labels:", n, "of", len(REPL))
for d in did: print("   " + d)
