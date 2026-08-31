# Persian, corrected by Nojan.
#
# Most of these already matched. The ones that did not are instructive:
# "برای بررسی فرستاده شد" for "sent for review" is the passive built the
# English way, where Persian wants "ارسال شد"; and the nudge led with the
# time rather than the person, which puts the wrong word first in a line
# whose whole job is to say who is waiting.

total = 0


def sub(p, a, b, label):
    global total
    s = open(p).read()
    if a in s:
        open(p, "w").write(s.replace(a, b, 1)); total += 1
    else:
        print("   skipped:", label)


# ------------------------------------------------------- folders
sub("constants/i18n/local.ts",
    "  nameIt: { en: 'Name it', fa: ",
    "  nameIt: { en: 'Name it', fa: 'نام‌گذاری' }, // was: ",
    "nameIt")

# ------------------------------------------------------- listing
sub("constants/i18n/listing.ts",
    "  sent: { en: 'Sent for review', fa: 'برای بررسی فرستاده شد' },",
    "  sent: { en: 'Sent for review', fa: 'برای بررسی ارسال شد.' },",
    "sent for review")

sub("constants/i18n/listing.ts",
    "'نتوانستیم موقعیت شما را بخوانیم. می‌توانید منطقه را تایپ کنید.'",
    "'نتوانستیم موقعیتت را پیدا کنیم. می‌توانی منطقه را خودت وارد کنی.'",
    "location unreadable")

sub("constants/i18n/listing.ts",
    "'نتوانستیم آن مکان را پیدا کنیم. یک شهر یا منطقه را امتحان کنید.'",
    "'نتوانستیم این مکان را پیدا کنیم. نام یک شهر یا محله را وارد کن.'",
    "place not found")

sub("constants/i18n/listing.ts",
    "  saveFailed: { en: 'Could not save.', fa: 'ذخیره نشد.' },",
    "  saveFailed: { en: 'Could not save.', fa: 'ذخیره نشد.' },",
    "could not save")

sub("constants/i18n/listing.ts",
    "'بازگشت به لوکال'",
    "'بازگشت به محلی'",
    "back to local")

# --------------------------------------------------------- nudges
sub("lib/friend-nudges.ts",
    "  { en: '{name} sent you something three days ago.', fa: 'سه روز پیش {name} چیزی برایت فرستاد.' },",
    "  { en: '{name} sent you something three days ago.', fa: '{name} سه روز پیش چیزی برایت فرستاد.' },",
    "nudge 1")

print("applied:", total)

# and the rest of the nudges, to check against what is there
import re
s = open("lib/friend-nudges.ts").read()
print("\ncurrent nudges:")
for m in re.finditer(r"\{ en: '([^']*)', fa: '([^']*)' \}", s):
    print("  en:", m.group(1))
    print("  fa:", m.group(2), "\n")
