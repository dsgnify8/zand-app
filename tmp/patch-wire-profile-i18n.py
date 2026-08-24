# Wire the profile screens to i18n.
#
# The Persian was reviewed line by line; this only moves the English out of
# the JSX and points both languages at the same keys.
#
# Two strings stop being concatenations. "The ten people send most. Search
# for any of the N." and "N of M words" were glued together around a number,
# which cannot be translated — Persian puts the count first and does not
# repeat the noun. They become single strings with {n} and {total}.

import re

total = 0

# --------------------------------------------------- 1. the last keys
p = "constants/i18n/profile.ts"
s = open(p).read()

if "termsTitle" not in s:
    a = "  // notifications"
    b = """  // help and terms
  helpRead: { en: 'Our team reads everything.', fa: 'تیم ما همه را می‌خواند.' },
  termsTitle: { en: 'Terms and privacy', fa: 'شرایط و حریم خصوصی' },
  termsData: { en: 'Your data', fa: 'اطلاعات تو' },
  termsDataX: {
    en: 'ZAND keeps your progress, saved items, and preferences on your device. We do not sell your data.',
    fa: 'زند پیشرفت، ذخیره‌شده‌ها و تنظیماتت را روی دستگاه خودت نگه می‌دارد. ما اطلاعاتت را نمی‌فروشیم.',
  },
  // Sources and authorship, not licensing — hence منابع rather than حق مؤلف.
  termsCredit: { en: 'Content and credit', fa: 'محتوا و منابع' },
  termsCreditX: {
    en: 'Some articles draw on outside reporting, always credited with a link to the source. Historical and cultural content is written for ZAND.',
    fa: 'بعضی مطالب به گزارش‌های بیرونی تکیه دارند و همیشه با لینک به منبع اصلی نام برده می‌شوند. محتوای تاریخی و فرهنگی برای زند نوشته شده است.',
  },
  // برنامه rather than اپ: the loanword is what people say, but this is the
  // most formal screen in the app.
  termsUsing: { en: 'Using the app', fa: 'استفاده از برنامه' },
  termsUsingX: {
    en: 'ZAND is here to help you learn and stay connected to Persian heritage. Please use it kindly.',
    fa: 'زند برای این است که یاد بگیری و با میراث ایرانی در پیوند بمانی. با مهربانی ازش استفاده کن.',
  },
  termsContact: { en: 'Questions about any of this? Email contact@zand.com.', fa: 'پرسشی داری؟ به contact@zand.com ایمیل بزن.' },

  // Placeholders, not concatenation: Persian leads with the count and does
  // not repeat the noun, so the pieces cannot be glued in English order.
  wordHits: { en: '{n} of {total} words', fa: '{n} واژه از {total}' },
  wordBankNote: {
    en: 'The ten people send most. Search for any of the {total}.',
    fa: 'ده واژه‌ای که بیشتر از همه فرستاده می‌شوند. از میان {total} واژه جست‌وجو کن.',
  },

  // notifications"""
    s = s.replace(a, b, 1)
    open(p, "w").write(s)
    total += 1
    print("i18n keys added")
else:
    print("i18n keys already present")


# ------------------------------------------------- 2. profile.tsx
p = "app/(tabs)/profile.tsx"
s = open(p).read()
n = 0
PAIRS = [
    ("'Nothing opened yet. Start reading and it shows up here.'", "t(PROFILE.emptyHistory)"),
    ("'No favourites yet. Tap the heart on anything you love.'", "t(PROFILE.emptyFavourites)"),
    ("'Nothing saved yet. Tap the bookmark to keep something for later.'", "t(PROFILE.emptySaved)"),
    ("<Text style={s.libX}>Everything you tapped save on, in one place.</Text>",
     "<Text style={s.libX}>{t(PROFILE.libraryBlurb)}</Text>"),
    ("<Text style={s.finEmpty}>Hold any of these to see what is behind it.</Text>",
     "<Text style={s.finEmpty}>{t(PROFILE.holdForMore)}</Text>"),
    ("'Longest you have ever gone: '", "t(PROFILE.longestRun) + ' '"),
    ("k: 'Poets read', i: 'book-outline'", "k: 'Poets read', kT: PROFILE.poetsRead, i: 'book-outline'"),
    ("""    word: 'Words', verse: 'Verses', topic: 'Topics', poet: 'Poets',
    place: 'Places', culture: 'Culture', business: 'Businesses', other: 'Everything else',""",
     """    word: t(PROFILE.kindWords), verse: t(PROFILE.kindVerses), topic: t(PROFILE.kindTopics),
    poet: t(PROFILE.kindPoets), place: t(PROFILE.kindPlaces), culture: t(PROFILE.kindCulture),
    business: t(PROFILE.kindBusinesses), other: t(PROFILE.kindOther),"""),
]
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b); n += 1
    else:
        print("   skipped [profile]:", a[:54])
open(p, "w").write(s)
total += n
print("profile.tsx:", n, "of", len(PAIRS))


# --------------------------------------------- 3. profile-modals.tsx
p = "components/profile-modals.tsx"
s = open(p).read()
n = 0
PAIRS = [
    ("'Enter your password to confirm.'", "t(PROFILE.confirmPassword)"),
    ("'That password is not right.'", "t(PROFILE.wrongPassword)"),
    ("'Check your new email to confirm the change.'", "t(PROFILE.checkNewEmail)"),
    ("'Saving…'", "t(PROFILE.saving)"),
    ("'Add your number'", "t(PROFILE.addNumber)"),
    ("'Tap again to permanently delete your account'", "t(PROFILE.deleteAgain)"),
    (">Keep my account<", ">{t(PROFILE.keepAccount)}<"),
    ("'Your name'", "t(PROFILE.fieldName)"),
    ("'New email'", "t(PROFILE.fieldEmail)"),
    ("'Phone number'", "t(PROFILE.fieldPhone)"),
    ("Any questions about your information? Get in touch at contact@zand.com.",
     "{t(PROFILE.dataQuestions)}"),

    # notifications
    ("t: 'Language practice', x: 'A daily nudge to keep your streak'",
     "t: t(PROFILE.notifLearning), x: t(PROFILE.notifLearningX)"),
    ("t: 'Pick up where you left off', x: 'If you have not opened something in a few days'",
     "t: t(PROFILE.notifIdle), x: t(PROFILE.notifIdleX)"),
    ("t: 'Something new', x: 'When a new piece or topic goes up'",
     "t: t(PROFILE.notifNew), x: t(PROFILE.notifNewX)"),
    ("t: 'From friends', x: 'When someone sends you a word or topic'",
     "t: t(PROFILE.notifFriends), x: t(PROFILE.notifFriendsX)"),

    # help and terms
    (">Our team reads everything.<", ">{t(PROFILE.helpRead)}<"),
    ('<Header title="Terms and privacy" />', "<Header title={t(PROFILE.termsTitle)} />"),
    (">Your data<", ">{t(PROFILE.termsData)}<"),
    (">ZAND keeps your progress, saved items, and preferences on your device. We do not sell your data.<",
     ">{t(PROFILE.termsDataX)}<"),
    (">Content and credit<", ">{t(PROFILE.termsCredit)}<"),
    (">Some articles draw on outside reporting, always credited with a link to the source. Historical and cultural content is written for ZAND.<",
     ">{t(PROFILE.termsCreditX)}<"),
    (">Using the app<", ">{t(PROFILE.termsUsing)}<"),
    (">ZAND is here to help you learn and stay connected to Persian heritage. Please use it kindly.<",
     ">{t(PROFILE.termsUsingX)}<"),
    (">Questions about any of this? Email contact@zand.com.<", ">{t(PROFILE.termsContact)}<"),

    # friends
    (">Send them a link, or find them by the email they signed up with.<", ">{t(PROFILE.findByLink)}<"),
    (">Share your link<", ">{t(PROFILE.shareLink)}<"),
    (">They tap it, and you are connected. Nothing else to do.<", ">{t(PROFILE.shareLinkX)}<"),
    (">They must already have an account for this to work. If they do not, send the link instead.<",
     ">{t(PROFILE.needAccount)}<"),
    (">What do you call them<", ">{t(PROFILE.nicknameLabel)}<"),
    (">They will get a notification. Now it is their turn.<", ">{t(PROFILE.theirTurn)}<"),
    (">Nothing matches. Try the Persian or the English.<", ">{t(PROFILE.noMatches)}<"),

    # the two that were concatenations
    ("{q ? hits.length + ' of ' + WORD_BANK.length + ' words' : 'The ten people send most. Search for any of the ' + WORD_BANK.length + '.'}",
     """{q
                    ? t(PROFILE.wordHits).replace('{n}', String(hits.length)).replace('{total}', String(WORD_BANK.length))
                    : t(PROFILE.wordBankNote).replace('{total}', String(WORD_BANK.length))}"""),
]
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b); n += 1
    else:
        print("   skipped [modals]:", a[:54])
open(p, "w").write(s)
total += n
print("profile-modals.tsx:", n, "of", len(PAIRS))

# PROFILE and t must both be in scope in each file
for f in ("app/(tabs)/profile.tsx", "components/profile-modals.tsx"):
    src = open(f).read()
    print(f, "| PROFILE imported:", "PROFILE" in src.split("\n\n")[0] or "i18n/profile" in src)

print("\ntotal:", total)
