// Profile, in both languages.
//
// The Persian here was written and reviewed by Nz, not translated. Two
// conventions run through it, and new strings should follow them:
//
//   1. Relative clauses, not nominal compounds. "موضوع‌هایی که تمام کرده‌ای"
//      rather than "موضوع‌های تمام‌شده" — the first is how someone speaks,
//      the second is how a database column is named.
//
//   2. The app addresses the reader informally, but a button speaks in the
//      reader's own voice. So the sheet says "برای حذف دائمی حسابت دوباره
//      بزن" and the button next to it says "حسابم را نگه دار".
//
// Written Persian throughout: کتابخانه not کتابخونه, همان not همون. The
// spoken spellings that used to be in here read as chat, not as an app.

import type { T } from '@/lib/i18n';

export const PROFILE: Record<string, T> = {
  // tabs
  you: { en: 'You', fa: 'خودت' },
  library: { en: 'Library', fa: 'کتابخانه' },
  friends: { en: 'Friends', fa: 'دوستان' },
  progress: { en: 'Progress', fa: 'پیشرفت' },

  welcome: { en: 'Welcome back', fa: 'خوش برگشتی' },

  // you
  pickUp: { en: 'PICK UP WHERE YOU LEFT OFF', fa: 'از همان‌جا ادامه بده' },
  notSeen: { en: 'SOMETHING YOU HAVE NOT SEEN', fa: 'چیزی که هنوز ندیده‌ای' },
  daysRow: { en: 'DAYS IN A ROW', fa: 'روز پشت سر هم' },

  // library
  yourLibrary: { en: 'YOUR LIBRARY', fa: 'کتابخانهٔ تو' },
  mySaved: { en: 'MY SAVED', fa: 'ذخیره‌شده‌های من' },
  thingsKept: { en: 'THINGS YOU KEPT', fa: 'چیزهایی که نگه داشته‌ای' },
  history: { en: 'History', fa: 'تاریخچه' },
  historyX: { en: 'everything you have opened', fa: 'هر چیزی که باز کرده‌ای' },
  favourites: { en: 'Favourites', fa: 'علاقه‌مندی‌ها' },
  favouritesX: { en: 'the ones you loved', fa: 'آن‌هایی که دوست داشتی' },
  watched: { en: 'Watched', fa: 'دیده‌شده‌ها' },
  watchedX: { en: 'videos you watched', fa: 'ویدیوهایی که دیده‌ای' },
  saveLater: { en: 'Saved', fa: 'ذخیره‌شده‌ها' },
  saveLaterX: { en: 'to come back to', fa: 'که بعداً برگردی سراغش' },
  libraryBlurb: { en: 'Everything you tapped save on, in one place.', fa: 'همهٔ چیزهایی که ذخیره کرده‌ای، یکجا.' },

  // saved categories
  kindWords: { en: 'Words', fa: 'واژه‌ها' },
  kindVerses: { en: 'Verses', fa: 'بیت‌ها' },
  kindTopics: { en: 'Topics', fa: 'موضوع‌ها' },
  kindPoets: { en: 'Poets', fa: 'شاعران' },
  kindPlaces: { en: 'Places', fa: 'مکان‌ها' },
  kindCulture: { en: 'Culture', fa: 'فرهنگ' },
  kindBusinesses: { en: 'Businesses', fa: 'کسب‌وکارها' },
  kindOther: { en: 'Everything else', fa: 'بقیه' },

  // library empty states
  emptyHistory: { en: 'Nothing opened yet. Start reading and it shows up here.', fa: 'هنوز چیزی باز نکرده‌ای. هرچه باز کنی، اینجا می‌ماند.' },
  emptyFavourites: { en: 'No favourites yet. Tap the heart on anything you love.', fa: 'هنوز چیزی به علاقه‌مندی‌هایت اضافه نکرده‌ای. روی قلب بزن.' },
  emptyWatched: { en: 'No videos watched yet.', fa: 'هنوز ویدیویی تماشا نکرده‌ای.' },
  emptySaved: { en: 'Nothing saved yet. Tap the bookmark to keep something for later.', fa: 'هنوز چیزی ذخیره نکرده‌ای. برای نگه‌داشتن، نشان کتاب را بزن تا برای بعد بماند.' },

  // friends
  teachEachOther: { en: 'Teach each other', fa: 'به هم یاد بدهید' },
  teachX: {
    en: 'Send a friend anything worth learning: a word, a poet, a place, a story. They learn it, then send one back.',
    fa: 'هر چیزی که ارزش یادگرفتن دارد برای یک دوست بفرست: یک واژه، یک شاعر، یک جا، یک قصه. یاد می‌گیرد و یکی برایت می‌فرستد.',
  },
  findFriends: { en: 'Find & add friends', fa: 'دوست پیدا کن' },
  requests: { en: 'REQUESTS', fa: 'درخواست‌ها' },
  yourPeople: { en: 'YOUR PEOPLE', fa: 'آدم‌های تو' },
  nobodyYet: { en: 'Nobody here yet', fa: 'هنوز کسی اینجا نیست' },
  nobodyYetX: {
    en: 'A friend sends you a word. You learn it, then send one back. Here is what that looks like.',
    fa: 'یک دوست برایت واژه‌ای می‌فرستد. یاد می‌گیری و یکی برایش می‌فرستی. این‌طوری می‌شود.',
  },
  aPreview: { en: 'A PREVIEW', fa: 'یک نمونه' },
  exampleSend: { en: 'AN EXAMPLE OF WHAT YOU CAN SEND', fa: 'نمونه‌ای از چیزی که می‌شود فرستاد' },
  wantsConnect: { en: 'wants to connect', fa: 'می‌خواهد اضافه شود' },
  accept: { en: 'Accept', fa: 'قبول' },
  markLearned: { en: 'Mark as learned', fa: 'یاد گرفتم' },
  sendBack: { en: 'Send one back', fa: 'یکی بفرست' },
  waitingForYou: { en: 'WAITING FOR YOU', fa: 'منتظر توست' },

  findByLink: { en: 'Send them a link, or find them by the email they signed up with.', fa: 'برایشان لینک بفرست، یا با ایمیلی که با آن ثبت‌نام کرده‌اند پیدایشان کن.' },
  shareLink: { en: 'Share your link', fa: 'لینکت را به اشتراک بگذار' },
  shareLinkX: { en: 'They tap it, and you are connected. Nothing else to do.', fa: 'روی لینک می‌زنند و به هم وصل می‌شوید. کار دیگری لازم نیست.' },
  needAccount: { en: 'They must already have an account for this to work. If they do not, send the link instead.', fa: 'برای این کار باید از قبل حساب داشته باشند. اگر حساب ندارند، لینک را برایشان بفرست.' },
  nicknameLabel: { en: 'What do you call them', fa: 'چه اسمی صدایش می‌کنی؟' },
  theirTurn: { en: 'They will get a notification. Now it is their turn.', fa: 'برای‌شان اعلان می‌رود. حالا نوبت آن‌هاست.' },
  filterAll: { en: 'Everything', fa: 'همه' },
  filterRecent: { en: 'What you just read', fa: 'تازه‌خوانده‌ها' },
  noMatches: { en: 'Nothing matches. Try the Persian or the English.', fa: 'چیزی پیدا نشد. فارسی یا انگلیسی را امتحان کن.' },

  yourSends: { en: 'WHAT YOU SENT', fa: 'چیزهایی که فرستادی' },
  theyLearnedIt: { en: 'learned it', fa: 'یاد گرفت' },
  sentWaiting: { en: 'waiting for', fa: 'منتظرِ' },
  sentYou: { en: 'sent you', fa: 'برایت فرستاد' },
  aWord: { en: 'a word', fa: 'یک واژه' },
  aTopic: { en: 'a topic', fa: 'یک موضوع' },
  aPoet: { en: 'a poet', fa: 'یک شاعر' },
  aPlace: { en: 'a place', fa: 'یک جا' },
  anArticle: { en: 'an article', fa: 'یک مقاله' },
  something: { en: 'something', fa: 'چیزی' },
  seeAll: { en: 'see all', fa: 'همه را ببین' },
  showLess: { en: 'show less', fa: 'کمتر' },

  // progress
  whatDoing: { en: 'WHAT YOU HAVE BEEN DOING', fa: 'کارهایی که انجام داده‌ای' },
  achievements: { en: 'Achievements', fa: 'دستاوردها' },
  unlockedOf: { en: 'unlocked', fa: 'باز شده' },
  lastFourteen: { en: 'THE LAST FOURTEEN DAYS', fa: 'چهارده روز گذشته' },
  longestRun: { en: 'Longest you have ever gone:', fa: 'بهترین رکوردت:' },
  holdForMore: { en: 'Hold any of these to see what is behind it.', fa: 'روی هرکدام نگه دار تا بیشتر درباره‌اش ببینی.' },

  topicsFinished: { en: 'Topics finished', fa: 'موضوع‌هایی که تمام کرده‌ای' },
  poetsRead: { en: 'Poets read', fa: 'شاعرانی که خوانده‌ای' },
  pagesRead: { en: 'Pages read', fa: 'صفحه‌هایی که خوانده‌ای' },
  thingsSaved: { en: 'Things saved', fa: 'چیزهایی که ذخیره کرده‌ای' },
  sentToFriends: { en: 'Sent to friends', fa: 'چیزهایی که برای دوستانت فرستاده‌ای' },
  streakNudge: { en: 'Come back each day to keep your streak', fa: 'هر روز سر بزن تا رکوردت حفظ شود' },

  // archived features. Kept so uncommenting the section brings its copy back.
  articlesRead: { en: 'Articles read', fa: 'مقاله‌هایی که خوانده‌ای' },
  videosWatched: { en: 'Videos watched', fa: 'ویدیوهایی که دیده‌ای' },

  // account
  confirmPassword: { en: 'Enter your password to confirm.', fa: 'برای تأیید رمز عبورت را وارد کن.' },
  wrongPassword: { en: 'That password is not right.', fa: 'رمز عبور درست نیست.' },
  checkNewEmail: { en: 'Check your new email to confirm the change.', fa: 'برای تأیید تغییر، ایمیل جدیدت را چک کن.' },
  saved: { en: 'Saved.', fa: 'ذخیره شد.' },
  saving: { en: 'Saving…', fa: 'در حال ذخیره‌سازی…' },
  addNumber: { en: 'Add your number', fa: 'شماره‌ات را اضافه کن' },
  deleteAgain: { en: 'Tap again to permanently delete your account', fa: 'برای حذف دائمی حسابت، دوباره بزن' },
  keepAccount: { en: 'Keep my account', fa: 'حسابم را نگه دار' },
  fieldName: { en: 'Your name', fa: 'نام' },
  fieldEmail: { en: 'New email', fa: 'ایمیل جدید' },
  fieldPhone: { en: 'Phone number', fa: 'شمارهٔ تلفن' },
  dataQuestions: { en: 'Any questions about your information? Get in touch at admin@zandapplication.com.', fa: 'دربارهٔ اطلاعاتت سؤالی داری؟ با ما در admin@zandapplication.com در تماس باش.' },

  // help and terms
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
  termsContact: { en: 'Questions about any of this? Email admin@zandapplication.com.', fa: 'پرسشی داری؟ به admin@zandapplication.com ایمیل بزن.' },

  // Placeholders, not concatenation: Persian leads with the count and does
  // not repeat the noun, so the pieces cannot be glued in English order.
  wordHits: { en: '{n} of {total} words', fa: '{n} واژه از {total}' },
  wordBankNote: {
    en: 'The ten people send most. Search for any of the {total}.',
    fa: 'ده واژه‌ای که بیشتر از همه فرستاده می‌شوند. از میان {total} واژه جست‌وجو کن.',
  },

  // notifications
  notifLearning: { en: 'Language practice', fa: 'تمرین زبان' },
  notifLearningX: { en: 'A daily nudge to keep your streak', fa: 'یادآوری روزانه برای حفظ رکوردت' },
  notifIdle: { en: 'Pick up where you left off', fa: 'ادامه از جایی که رها کردی' },
  notifIdleX: { en: 'If you have not opened something in a few days', fa: 'اگر چند روز است چیزی باز نکرده‌ای' },
  notifNew: { en: 'Something new', fa: 'چیزی تازه' },
  notifNewX: { en: 'When a new piece or topic goes up', fa: 'وقتی مطلب یا موضوع تازه‌ای منتشر می‌شود' },
  notifFriends: { en: 'From friends', fa: 'از دوستان' },
  notifFriendsX: { en: 'When someone sends you a word or topic', fa: 'وقتی کسی واژه یا موضوعی برایت می‌فرستد' },
};
