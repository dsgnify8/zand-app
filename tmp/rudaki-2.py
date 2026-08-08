# -*- coding: utf-8 -*-
# Rudaki, second batch: بوی جوی مولیان. The analysis paragraph can quote
# the actual lines, since the poem is short and every Persian reader knows
# the opening:
#   بوی جوی مولیان آید همی / یاد یار مهربان آید همی
#   ریگ آموی و درشتی راه او / زیر پایم پرنیان آید همی
#   آب جیحون از نشاط روی دوست / خنگ ما را تا میان آید همی
#   ای بخارا شاد باش و دیر زی / میر زی تو شادمان آید همی
#   میر ماه است و بخارا آسمان / ماه سوی آسمان آید همی

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'That is worth remembering when you read any of it. These were songs. The rhythm is not decoration. It is the missing music.' }",
  "{ t: 'p', x: 'That is worth remembering when you read any of it. These were songs. The rhythm is not decoration. It is the missing music.', fa: 'هر چه از او می‌خوانی، این را به یاد داشته باش: اینها ترانه بودند. وزن، تزیین نیست؛ همان موسیقیِ گم‌شده است.' }"),

 ("{ t: 'p', x: 'This is the most famous story in Persian literature, and it is about the practical power of a poem.' }",
  "{ t: 'p', x: 'This is the most famous story in Persian literature, and it is about the practical power of a poem.', fa: 'این نامدارترین حکایت ادبیات فارسی است، و دربارهٔ قدرت عملی یک شعر.' }"),

 ("{ t: 'p', x: 'The Samanid king, Nasr II, took his court to Herat one summer. He liked it. He stayed. A season became a year, and a year became four, and the entire court was homesick for Bukhara and could not say so, because you do not tell a king he is wrong.' }",
  "{ t: 'p', x: 'The Samanid king, Nasr II, took his court to Herat one summer. He liked it. He stayed. A season became a year, and a year became four, and the entire court was homesick for Bukhara and could not say so, because you do not tell a king he is wrong.', fa: 'نصر بن احمد سامانی تابستانی دربارش را به هرات برد. خوشش آمد. ماند. یک فصل شد یک سال، و یک سال شد چهار سال، و تمام درباریان دلتنگ بخارا بودند و نمی‌توانستند بگویند، چون به شاه نمی‌گویند که اشتباه می‌کند.' }"),

 ("{ t: 'p', x: 'So they went to Rudaki and offered him money to do something. He waited for a morning when the king was drinking, took up his harp, and sang.' }",
  "{ t: 'p', x: 'So they went to Rudaki and offered him money to do something. He waited for a morning when the king was drinking, took up his harp, and sang.', fa: 'پس سراغ رودکی رفتند و به او پول دادند تا کاری بکند. صبحی را که شاه در حال باده‌نوشی بود انتظار کشید، چنگ را برداشت، و خواند.' }"),

 ("{ t: 'p', x: 'The king got up. He did not send for his boots. He got onto his horse barefoot and rode for Bukhara, and the court scrambled after him, and someone caught up with him two stages down the road to put his boots on him.' }",
  "{ t: 'p', x: 'The king got up. He did not send for his boots. He got onto his horse barefoot and rode for Bukhara, and the court scrambled after him, and someone caught up with him two stages down the road to put his boots on him.', fa: 'شاه از جا برخاست. کسی را پی چکمه‌هایش نفرستاد. پابرهنه بر اسب نشست و به سوی بخارا تاخت، و درباریان دست‌وپا زدند تا پشت سرش برسند، و دو منزل آن‌سوتر کسی به او رسید تا چکمه‌هایش را پایش کند.' }"),

 ("{ t: 'h', x: 'Why it worked' }",
  "{ t: 'h', x: 'Why it worked', fa: 'چرا کارگر افتاد' }"),

 ("{ t: 'p', x: 'Look at what he actually did, because it is a masterclass. He never says come home. He never mentions the court, or duty, or the four wasted years. He does not argue at all.' }",
  "{ t: 'p', x: 'Look at what he actually did, because it is a masterclass. He never says come home. He never mentions the court, or duty, or the four wasted years. He does not argue at all.', fa: 'نگاه کن ببین در واقع چه کرد، چون درسی است تمام. هیچ‌جا نمی‌گوید به خانه برگرد. از دربار حرفی نمی‌زند، از وظیفه، از آن چهار سال بر باد رفته. اصلاً استدلال نمی‌کند.' }"),

 ("{ t: 'p', x: 'He starts with a smell. The scent of a particular stream, the Muliyan, that ran through Bukhara. Not a description of the city, a smell of it, which goes past the reasoning part of a man entirely. Then he makes the hard road home feel like silk underfoot, so returning is not effort. Then he turns the king into the moon and Bukhara into the sky.' }",
  "{ t: 'p', x: 'He starts with a smell. The scent of a particular stream, the Muliyan, that ran through Bukhara. Not a description of the city, a smell of it, which goes past the reasoning part of a man entirely. Then he makes the hard road home feel like silk underfoot, so returning is not effort. Then he turns the king into the moon and Bukhara into the sky.', fa: 'با یک بو آغاز می‌کند: «بوی جوی مولیان آید همی» — بوی همان جویِ مشخصی که در بخارا جاری بود. نه وصفِ شهر، بلکه بویِ شهر، که یکسره از بخش استدلال‌کنندهٔ آدم می‌گذرد. بعد راه سخت بازگشت را زیر پا مثل ابریشم می‌کند: «ریگ آموی و درشتی راه او، زیر پایم پرنیان آید همی» — پس بازگشتن دیگر زحمت نیست. و بعد شاه را ماه می‌کند و بخارا را آسمان: «میر ماه است و بخارا آسمان، ماه سوی آسمان آید همی».' }"),
]

lit_scope.apply("rudaki", PAIRS)

# --- the two components ---
p = "components/rudaki-blocks.tsx"
s = open(p).read()
did = []

REPL = [
 ("<Text style={styles.changKicker}>THE CHANG</Text>",
  "<Text style={styles.changKicker}>{fa ? 'چنگ' : 'THE CHANG'}</Text>"),
 ("<Text style={styles.changHint}>touch the strings</Text>",
  "<Text style={styles.changHint}>{fa ? 'سیم‌ها را لمس کن' : 'touch the strings'}</Text>"),
 ("<Text style={styles.changNote}>His voice is lost. The instrument is not.</Text>",
  "<Text style={[styles.changNote, fa && styles.faSmall]}>{fa ? 'صدایش گم شده است. ساز، نه.' : 'His voice is lost. The instrument is not.'}</Text>"),
 ("<Text style={styles.lostLabel}>VERSES WRITTEN</Text>",
  "<Text style={styles.lostLabel}>{fa ? 'بیتِ سروده' : 'VERSES WRITTEN'}</Text>"),
 ("<Text style={[styles.lostLabel, styles.lostLabelOn]}>VERSES SURVIVING</Text>",
  "<Text style={[styles.lostLabel, styles.lostLabelOn]}>{fa ? 'بیتِ به جا مانده' : 'VERSES SURVIVING'}</Text>"),
 ("<Text style={styles.lostHint}>{faded ? 'what remains' : 'touch to lose them'}</Text>",
  "<Text style={styles.lostHint}>{fa ? (faded ? 'آنچه مانده' : 'لمس کن تا از دست بروند') : (faded ? 'what remains' : 'touch to lose them')}</Text>"),
]
n = 0
for a, b in REPL:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("labels:" + str(n) + "/" + str(len(REPL)))

import re
for fn in ["Chang", "LostVerses"]:
    m = re.search(r"export function " + fn + r"\(\)[^{]*\{\n", s)
    if m and "const fa" not in s[m.end():m.end()+90]:
        s = s[:m.end()] + "  const fa = getLang() === 'fa';\n" + s[m.end():]
        did.append(fn)

if "faSmall:" not in s:
    s = s.replace("const styles = StyleSheet.create({\n",
                  "const styles = StyleSheet.create({\n  faSmall: { fontFamily: fonts.persian, fontSize: 11.5, fontStyle: 'normal' },\n", 1)

if "getLang" not in s:
    last = None
    for last in re.finditer(r"^import .*\n", s, re.M): pass
    s = s[:last.end()] + "import { getLang } from '@/lib/i18n';\n" + s[last.end():]
    did.append("import")

open(p, "w").write(s)
print("components:", did)
