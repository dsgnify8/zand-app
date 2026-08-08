# -*- coding: utf-8 -*-
# Chapter titles and nav labels for all six remaining poets.
# Nav labels stay short — they sit in a tab rail. Persian names where one
# exists: گلستان, بنی‌آدم, رباعیات, مجنون, فرهاد, سماع, شمس, هفت پیکر.

import sys
sys.path.insert(0, "tmp")
import lit_scope

def t(en, fa): return ("title: '" + en + "'", "title: '" + en + "', titleFa: '" + fa + "'")
def n(en, fa): return ("nav: '" + en + "'", "nav: '" + en + "', navFa: '" + fa + "'")

HAFEZ = [
 t("The One Who Remembered", 'آن‌که از بر داشت'),      n("Shiraz", 'شیراز'),
 t("The Art of Saying Two Things", 'هنر دو معنا گفتن'), n("His Art", 'هنر او'),
 t("The Book That Answers", 'کتابی که پاسخ می‌دهد'),    n("The Fal", 'فال'),
 t("What He Believed", 'به چه باور داشت'),              n("His Mind", 'اندیشهٔ او'),
 t("Still Answering", 'هنوز پاسخ می‌دهد'),              n("Legacy", 'میراث'),
]

SAADI = [
 t("The Long Road Home", 'راه دراز بازگشت'),   n("The Road", 'راه'),
 t("The Rose Garden", 'گلستان'),               n("Golestan", 'گلستان'),
 t("Of One Body", 'از یک پیکر'),               n("Bani Adam", 'بنی‌آدم'),
 t("The Stolen Chapter", 'آن باب دزدیده'),     n("The West", 'غرب'),
 t("The Garden Still Open", 'باغی که هنوز باز است'), n("Legacy", 'میراث'),
]

KHAYYAM = [
 t("The Tentmaker Son", 'پسرِ خیمه‌دوز'),           n("Neyshabur", 'نیشابور'),
 t("The Measure of a Year", 'اندازهٔ یک سال'),      n("The Science", 'دانش'),
 t("The Quatrains", 'رباعیات'),                     n("Rubaiyat", 'رباعیات'),
 t("The Englishman", 'آن مرد انگلیسی'),             n("FitzGerald", 'فیتزجرالد'),
 t("Where the Blossoms Fall", 'آنجا که شکوفه می‌ریزد'), n("Legacy", 'میراث'),
]

RUDAKI = [
 t("Before Anyone", 'پیش از همه'),                     n("The First", 'نخستین'),
 t("The Poem That Moved a King", 'شعری که شاهی را به راه انداخت'), n("The Ride", 'آن سواری'),
 t("What Was Lost", 'آنچه از دست رفت'),                n("The Loss", 'فقدان'),
 t("The Old Man", 'پیرمرد'),                           n("The Fall", 'افتادن'),
 t("The Adam of Poets", 'آدم‌الشعرا'),                 n("Legacy", 'میراث'),
]

NIZAMI = [
 t("The Quiet Man of Ganja", 'مرد خاموش گنجه'),        n("Ganja", 'گنجه'),
 t("The Man Who Carved a Mountain", 'مردی که کوه را تراشید'), n("Farhad", 'فرهاد'),
 t("The Madman", 'مجنون'),                             n("Majnun", 'مجنون'),
 t("Seven Domes", 'هفت پیکر'),                         n("The Domes", 'هفت گنبد'),
 t("What He Left", 'آنچه بر جای گذاشت'),               n("Legacy", 'میراث'),
]

RUMI = [
 t("The Road Out", 'راه بیرون'),                       n("The Road", 'راه'),
 t("The Meeting", 'آن دیدار'),                         n("Shams", 'شمس'),
 t("The Reed Cut from the Bed", 'نی، بریده از نیستان'), n("The Voice", 'آن صدا'),
 t("The Turning", 'چرخیدن'),                           n("Sama", 'سماع'),
 t("What Was Taken Out", 'آنچه حذف شد'),               n("The West", 'غرب'),
 t("The Wedding Night", 'شب عروس'),                    n("Legacy", 'میراث'),
]

for poet, pairs in [("hafez", HAFEZ), ("saadi", SAADI), ("khayyam", KHAYYAM),
                    ("rudaki", RUDAKI), ("nizami", NIZAMI), ("rumi", RUMI)]:
    print("### " + poet)
    lit_scope.apply(poet, pairs)
