# -*- coding: utf-8 -*-
# Mohammad Reza Shah, second batch. Matching on the x: value alone, since
# some blocks carry extra fields that break a whole-block anchor.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

def pair(en, fa, q='"'):
    a = 'x: ' + q + en + q
    b = 'x: ' + q + en + q + ", fa: '" + fa + "'"
    return (a, b)

PAIRS = [
 pair("A childhood set apart", 'کودکی‌ای جدا از بقیه'),
 pair("A brush with death", 'یک قدمی مرگ'),

 pair("As a small boy he fell gravely ill with typhoid fever and very nearly died. In his own account he emerged from the fever changed, believing he had been visited in his delirium by a saint and spared for a reason.",
      'در کودکی به تیفوئید مبتلا شد و تا آستانهٔ مرگ رفت. به روایت خودش، از آن تب دگرگون بیرون آمد؛ باور داشت که در هذیان تب، بزرگی بر او ظاهر شده و او را به دلیلی زنده نگه داشته‌اند.'),

 pair("That conviction, that his life had been set apart for a purpose, never left him. It gave him courage in dark moments and, his critics would later say, a certainty that could shade into stubbornness.",
      'این باور، که زندگی‌اش برای هدفی کنار گذاشته شده، هرگز رهایش نکرد. در لحظه‌های تاریک به او جرئت می‌داد، و به گفتهٔ منتقدانش، یقینی به او می‌داد که گاه به لجاجت پهلو می‌زد.'),

 pair("Reza Shah wanted his heir ready for a world his own generation had never seen. The boy was taken early from the women's quarters of the palace and placed under the care of tutors and officers, groomed with deliberate discipline for the throne.",
      'رضاشاه می‌خواست ولیعهدش برای جهانی آماده باشد که نسل خودش هرگز ندیده بود. پسر را زود از اندرونی کاخ بیرون آوردند و به معلم‌ها و افسرها سپردند، و با انضباطی حساب‌شده برای تخت آماده‌اش کردند.'),

 pair("In 1931, at the age of twelve, he was sent abroad to the Institut Le Rosey in Switzerland. He was the first Iranian royal ever educated in Europe. His father meant it as preparation. The prince, at first, felt it as exile from everything he knew.",
      'در سال ۱۳۱۰، در دوازده سالگی، به مدرسهٔ لوروزه در سوئیس فرستاده شد. نخستین عضو خاندان سلطنتی ایران بود که در اروپا درس می‌خواند. پدرش این را آماده‌سازی می‌دانست. ولیعهد اما در آغاز، آن را تبعید از هر چه می‌شناخت حس کرد.'),

 pair("At Le Rosey he learned French, took to football and skiing, and absorbed the manners and ideas of Europe. For the first time he lived among boys who did not bow to him, and he had to earn his place by character rather than birth. It was a lesson in standing on his own.",
      'در لوروزه فرانسه یاد گرفت، به فوتبال و اسکی رو آورد، و آداب و اندیشه‌های اروپا را در خود گرفت. برای نخستین بار میان پسرهایی زندگی می‌کرد که در برابرش تعظیم نمی‌کردند، و باید جایگاهش را با شخصیتش به دست می‌آورد نه با نسبش. درسی بود در روی پای خود ایستادن.'),

 pair("He formed friendships that followed him home, among them the Swiss born Ernest Perron, who would remain close to him for years. In his memoirs he described these as the years his vision took shape.",
      'دوستی‌هایی در آنجا بست که تا ایران دنبالش آمدند؛ از جمله با ارنست پرون سوئیسی، که سال‌ها نزدیک او ماند. در خاطراتش این سال‌ها را سال‌هایی خواند که نگاهش در آن شکل گرفت.'),
]

mrp_scope.apply(PAIRS)
