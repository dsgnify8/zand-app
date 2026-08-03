# -*- coding: utf-8 -*-
# Modern Iran, chapter four: the presidents. Each name in its Persian form,
# each term in Iranian years, برجام for the nuclear deal.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'Khomeini died in June 1989. Ali Khamenei, then president, was elevated to Supreme Leader, a post he still holds. The presidency, meanwhile, changed hands repeatedly, and the swings between its holders are the clearest picture of how divided the country has been about its own direction.' }",
  "{ t: 'p', x: 'Khomeini died in June 1989. Ali Khamenei, then president, was elevated to Supreme Leader, a post he still holds. The presidency, meanwhile, changed hands repeatedly, and the swings between its holders are the clearest picture of how divided the country has been about its own direction.', fa: 'خمینی در خرداد ۱۳۶۸ درگذشت. علی خامنه‌ای که آن زمان رئیس‌جمهور بود، به رهبری رسید؛ جایگاهی که هنوز در دست اوست. ریاست‌جمهوری اما بارها دست به دست شد، و نوسان میان کسانی که این مقام را داشتند، روشن‌ترین تصویر است از اینکه این کشور بر سر مسیر خودش چقدر دوپاره بوده.' }"),

 ("{ t: 'p', x: 'Across all of it the Supreme Leader and the institutions around him remained constant. Presidents in Iran arrive with mandates and discover the limits of the office; this has happened to reformists and hardliners alike.' }",
  "{ t: 'p', x: 'Across all of it the Supreme Leader and the institutions around him remained constant. Presidents in Iran arrive with mandates and discover the limits of the office; this has happened to reformists and hardliners alike.', fa: 'در سرتاسر این سال‌ها، رهبری و نهادهای پیرامونش ثابت ماندند. رئیس‌جمهورها در ایران با آرای مردم می‌آیند و بعد به حدود اختیارات این مقام پی می‌برند؛ این هم برای اصلاح‌طلب‌ها اتفاق افتاده و هم برای اصولگراها.' }"),

 # the timeline
 ("{ year: '1989 - 1997', label: 'Akbar Hashemi Rafsanjani', x: 'Reconstruction after the war. Pragmatic, business-minded, and willing to reopen some doors to the world. The economy grew; so did inequality and the wealth of those close to power.' }",
  "{ year: '1989 - 1997', yearFa: '۱۳۶۸ تا ۱۳۷۶', label: 'Akbar Hashemi Rafsanjani', labelFa: 'اکبر هاشمی رفسنجانی', x: 'Reconstruction after the war. Pragmatic, business-minded, and willing to reopen some doors to the world. The economy grew; so did inequality and the wealth of those close to power.', fa: 'دورهٔ سازندگی پس از جنگ. عمل‌گرا، با نگاه اقتصادی، و حاضر به باز کردن دوبارهٔ بعضی درها به روی جهان. اقتصاد رشد کرد؛ نابرابری و ثروت نزدیکان قدرت هم همین‌طور.' }"),

 ("{ year: '1997 - 2005', label: 'Mohammad Khatami', x: 'Won nearly seventy per cent of the vote on a platform of civil society and dialogue among civilisations. Newspapers opened, students organised, and much of it was rolled back by institutions the president does not control.' }",
  "{ year: '1997 - 2005', yearFa: '۱۳۷۶ تا ۱۳۸۴', label: 'Mohammad Khatami', labelFa: 'محمد خاتمی', x: 'Won nearly seventy per cent of the vote on a platform of civil society and dialogue among civilisations. Newspapers opened, students organised, and much of it was rolled back by institutions the president does not control.', fa: 'با شعار جامعهٔ مدنی و گفت‌وگوی تمدن‌ها، نزدیک هفتاد درصد آرا را گرفت. روزنامه‌ها باز شدند، دانشجویان سازمان یافتند، و بخش بزرگی از این‌ها را نهادهایی که زیر نظر رئیس‌جمهور نیستند پس گرفتند.' }"),

 ("{ year: '2005 - 2013', label: 'Mahmoud Ahmadinejad', x: 'A populist from outside the clerical establishment who spoke to those the boom had left behind. Cash handouts, confrontation abroad, an accelerating nuclear programme, and the sanctions that followed it.' }",
  "{ year: '2005 - 2013', yearFa: '۱۳۸۴ تا ۱۳۹۲', label: 'Mahmoud Ahmadinejad', labelFa: 'محمود احمدی‌نژاد', x: 'A populist from outside the clerical establishment who spoke to those the boom had left behind. Cash handouts, confrontation abroad, an accelerating nuclear programme, and the sanctions that followed it.', fa: 'پوپولیستی از بیرون دستگاه روحانیت که با کسانی حرف می‌زد که از رونق جا مانده بودند. یارانهٔ نقدی، تقابل با جهان، برنامهٔ هسته‌ای شتاب‌گرفته، و تحریم‌هایی که پشت سرش آمد.' }"),

 ("{ year: '2013 - 2021', label: 'Hassan Rouhani', x: 'Elected to end the isolation. Negotiated the 2015 nuclear agreement, which lifted sanctions and briefly steadied the currency. The United States withdrew from it in 2018 and the recovery reversed.' }",
  "{ year: '2013 - 2021', yearFa: '۱۳۹۲ تا ۱۴۰۰', label: 'Hassan Rouhani', labelFa: 'حسن روحانی', x: 'Elected to end the isolation. Negotiated the 2015 nuclear agreement, which lifted sanctions and briefly steadied the currency. The United States withdrew from it in 2018 and the recovery reversed.', fa: 'برای پایان دادن به انزوا انتخاب شد. برجام را در سال ۱۳۹۴ به سرانجام رساند؛ توافقی که تحریم‌ها را برداشت و برای مدتی کوتاه ارزش پول را ثابت نگه داشت. آمریکا در ۱۳۹۷ از آن خارج شد و آن بهبود برگشت.' }"),

 ("{ year: '2021 - 2024', label: 'Ebrahim Raisi', x: 'A hardline judiciary figure elected on the lowest turnout in the republic\\u2019s history. Died in a helicopter crash in May 2024.' }",
  "{ year: '2021 - 2024', yearFa: '۱۴۰۰ تا ۱۴۰۳', label: 'Ebrahim Raisi', labelFa: 'ابراهیم رئیسی', x: 'A hardline judiciary figure elected on the lowest turnout in the republic\\u2019s history. Died in a helicopter crash in May 2024.', fa: 'چهره‌ای تندرو از دستگاه قضایی که با کمترین میزان مشارکت در تاریخ جمهوری اسلامی انتخاب شد. در اردیبهشت ۱۴۰۳ در سقوط بالگرد کشته شد.' }"),

 ("{ year: '2024 -', label: 'Masoud Pezeshkian', x: 'A reformist surgeon, elected on a promise of easing restrictions and reopening talks. Took office into the hardest circumstances any Iranian president has faced.' }",
  "{ year: '2024 -', yearFa: '۱۴۰۳ تا کنون', label: 'Masoud Pezeshkian', labelFa: 'مسعود پزشکیان', x: 'A reformist surgeon, elected on a promise of easing restrictions and reopening talks. Took office into the hardest circumstances any Iranian president has faced.', fa: 'جراحی اصلاح‌طلب، که با وعدهٔ کم کردن محدودیت‌ها و از سرگیری مذاکرات انتخاب شد. در سخت‌ترین شرایطی که هر رئیس‌جمهور ایرانی با آن روبه‌رو شده، کار را تحویل گرفت.' }"),
]

mi_scope.apply(PAIRS)
