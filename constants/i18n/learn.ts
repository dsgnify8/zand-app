// The learning interface, in both languages.
//
// Register note: Persian interface copy is terser than English by
// convention. Where the English says "Tap the speaker to hear it", the
// Persian says the equivalent of "for the sound, touch" — warmth lives
// in the content here, not in the chrome, and a chatty interface in
// Persian reads as an app that was translated rather than written.
//
// Headings that are set in caps in English are sentence case in Persian,
// because Persian has no capitals and small caps are a Latin convention.

export const LEARN = {
  // shared chrome
  learn: { en: 'Learn', fa: 'یادگیری' },
  done: { en: 'Done', fa: 'تمام' },
  again: { en: 'Again', fa: 'دوباره' },
  tryAgain: { en: 'Try again', fa: 'دوباره' },
  check: { en: 'Check', fa: 'بررسی' },
  next: { en: 'Next', fa: 'بعدی' },
  previous: { en: 'Previous', fa: 'قبلی' },
  begin: { en: 'Begin', fa: 'شروع' },
  continueOn: { en: 'Continue', fa: 'ادامه' },
  finish: { en: 'Finish', fa: 'پایان' },
  goToPath: { en: 'Go to your path', fa: 'برو به مسیرت' },
  allCaughtUp: { en: 'All caught up', fa: 'همه‌چیز مرتب است' },

  // the map and the path
  yourRoute: { en: 'YOUR ROUTE', fa: 'مسیر تو' },
  yourPath: { en: 'YOUR PATH', fa: 'راه تو' },
  offRoute: { en: 'OFF THE ROUTE', fa: 'بیرون از مسیر' },
  offRouteX: { en: 'Useful whenever you want them. Not required.', fa: 'هر وقت خواستی به کار می‌آیند. اجباری نیستند.' },
  chapters: { en: 'Chapters', fa: 'فصل‌ها' },

  // review
  reviewTitle: { en: 'Review what you know', fa: 'مرور آنچه بلدی' },
  reviewX: { en: 'Ten words, drawn from everything you have finished.', fa: 'ده واژه، از میان هر چه تمام کرده‌ای.' },
  nothingToReview: { en: 'Nothing to review yet', fa: 'هنوز چیزی برای مرور نیست' },
  nothingToReviewX: { en: 'Finish a lesson or two and your words will collect here.', fa: 'یکی دو درس تمام کن تا واژه‌هایت اینجا جمع شوند.' },

  // lessons
  lessonNotFound: { en: 'Lesson not found.', fa: 'درس پیدا نشد.' },
  lessonComplete: { en: 'Lesson complete', fa: 'درس تمام شد' },
  chapterFinished: { en: 'That is the chapter finished.', fa: 'فصل تمام شد.' },
  startNextChapter: { en: 'Start the next chapter', fa: 'فصل بعد را شروع کن' },
  backToMap: { en: 'Back to the map', fa: 'برگرد به نقشه' },
  goThroughAgain: { en: 'Go through it again', fa: 'یک بار دیگر برو' },
  ofRight: { en: 'right', fa: 'درست' },

  // cards and decks
  flashcards: { en: 'Flashcards', fa: 'کارت‌ها' },
  deckNotFound: { en: 'Deck not found.', fa: 'دسته پیدا نشد.' },
  noCardsYet: { en: 'No cards here yet.', fa: 'هنوز کارتی اینجا نیست.' },
  tapToFlip: { en: 'Tap to turn it over', fa: 'برای برگرداندن، بزن' },

  // quizzes
  quizzes: { en: 'Quizzes', fa: 'آزمون‌ها' },
  quizzesX: { en: 'Test what you have learned. Choose a quiz to begin.', fa: 'آنچه یاد گرفته‌ای را بیازما. یک آزمون انتخاب کن.' },
  quizNotFound: { en: 'Quiz not found.', fa: 'آزمون پیدا نشد.' },
  chooseAnother: { en: 'Choose another quiz', fa: 'آزمون دیگری انتخاب کن' },
  whatDoesThisMean: { en: 'WHAT DOES THIS MEAN', fa: 'معنی‌اش چیست' },
  finishLessonsFirst: { en: 'Finish some lessons in this chapter first.', fa: 'اول چند درس از این فصل را تمام کن.' },

  // blanks
  fillTheBlank: { en: 'Fill the Blank', fa: 'جای خالی' },
  chooseCategory: { en: 'CHOOSE A CATEGORY', fa: 'یک دسته انتخاب کن' },
  categoryNotFound: { en: 'Category not found.', fa: 'دسته پیدا نشد.' },
  completeSentence: { en: 'COMPLETE THE SENTENCE', fa: 'جمله را کامل کن' },
  notEnoughSentences: { en: 'Not enough sentences here yet.', fa: 'هنوز جملهٔ کافی اینجا نیست.' },

  // the alphabet
  alphabet: { en: 'The alphabet', fa: 'الفبا' },
  howItSounds: { en: 'HOW IT SOUNDS', fa: 'چطور صدا می‌دهد' },
  englishExample: { en: 'ENGLISH EXAMPLE', fa: 'نمونهٔ انگلیسی' },
  howToSayIt: { en: 'HOW TO SAY IT', fa: 'چطور بگویی' },
  strokes: { en: 'STROKES', fa: 'حرکت قلم' },
  writing: { en: 'Writing', fa: 'نوشتن' },

  // pronunciation and phrasebook
  pronunciation: { en: 'Pronunciation', fa: 'تلفظ' },
  pronunciationX: { en: 'Tap the speaker to hear it. Search in English or Persian.', fa: 'برای شنیدن، بلندگو را بزن. به انگلیسی یا فارسی جست‌وجو کن.' },
  phrasebookX: { en: 'Tap any line to hear it. Hold it to send to a friend.', fa: 'هر سطر را بزن تا بشنوی. نگه دار تا برای دوستی بفرستی.' },
  searchBoth: { en: 'Search in English or Persian', fa: 'به انگلیسی یا فارسی جست‌وجو کن' },

  // reading
  reading: { en: 'READING', fa: 'خواندن' },
  readingX: { en: 'Tap any word you do not know. Nothing is hidden from you.', fa: 'هر واژه‌ای را که نمی‌دانی بزن. چیزی از تو پنهان نیست.' },

  // translate
  translate: { en: 'Translate', fa: 'برگردان' },
  from: { en: 'FROM', fa: 'از' },
  to: { en: 'TO', fa: 'به' },
  typeAnything: { en: 'Type anything', fa: 'هر چه می‌خواهی بنویس' },
  tapToSpeak: { en: 'tap to speak', fa: 'برای گفتن بزن' },
  tapToStop: { en: 'tap to stop', fa: 'برای توقف بزن' },
  thinking: { en: 'thinking…', fa: 'دارد گوش می‌دهد…' },

  // conversation
  conversation: { en: 'Conversation', fa: 'گفت‌وگو' },
  whichLanguage: { en: 'Which language?', fa: 'کدام زبان؟' },

  // the level questionnaire
  ratherLookAround: { en: 'I would rather just look around', fa: 'فعلاً فقط نگاهی می‌اندازم' },

  // alphabet screen
  persianAlphabet: { en: 'Persian Alphabet', fa: 'الفبای فارسی' },
  flipAllToNames: { en: 'Flip all to names', fa: 'همه را به نام برگردان' },
  showLetters: { en: 'Show letters', fa: 'حرف‌ها را نشان بده' },
  tapAnyCard: { en: 'Tap any card to flip it', fa: 'هر کارتی را بزن تا برگردد' },
  close: { en: 'Close', fa: 'بستن' },

  // writing
  dots: { en: 'DOTS', fa: 'نقطه‌ها' },
  fourForms: { en: 'THE FOUR FORMS', fa: 'چهار شکل' },
  practiceOnPaper: { en: 'PRACTICE ON PAPER', fa: 'روی کاغذ تمرین کن' },
  practiceX: { en: 'Copy the letter onto your own paper, working right to left.', fa: 'حرف را روی کاغذ خودت بنویس، از راست به چپ.' },

  // flashcards
  stillLearning: { en: 'Still learning', fa: 'هنوز یاد می‌گیرم' },
  gotIt: { en: 'Got it', fa: 'بلدم' },
  sessionComplete: { en: 'Session complete', fa: 'این دور تمام شد' },
  studyWholeDeck: { en: 'Study whole deck', fa: 'کل دسته را مرور کن' },
  backToDecks: { en: 'Back to decks', fa: 'برگرد به دسته‌ها' },

  // cards
  showMe: { en: 'Show me', fa: 'نشانم بده' },
  notYet: { en: 'Not yet', fa: 'هنوز نه' },
  iKnewIt: { en: 'I knew it', fa: 'بلد بودم' },

  // map and elsewhere
  phrasebook: { en: 'Phrasebook', fa: 'عبارت‌ها' },
  phrasebookCount: { en: 'Fifty things worth being able to say', fa: 'پنجاه چیز که ارزش گفتن دارد' },
  moreComing: { en: 'More stages are being written', fa: 'مرحله‌های بیشتری در راه است' },
  whatDidYouHear: { en: 'WHAT DID YOU HEAR', fa: 'چه شنیدی' },
  howDoYouSay: { en: 'HOW DO YOU SAY THIS', fa: 'این را چطور می‌گویی' },
  chooseAnotherCategory: { en: 'Choose another category', fa: 'دستهٔ دیگری انتخاب کن' },

  // the rest
  searchLetterOrWord: { en: 'Search a letter or word…', fa: 'حرف یا واژه‌ای را بجو…' },
  letters: { en: 'Letters', fa: 'حرف‌ها' },
  words: { en: 'Words', fa: 'واژه‌ها' },
  finishTheSentence: { en: 'FINISH THE SENTENCE', fa: 'جمله را تمام کن' },
  moreUnits: { en: 'More units are being written.', fa: 'واحدهای بیشتری در راه است.' },
  chooseQuiz: { en: 'CHOOSE A QUIZ', fa: 'یک آزمون انتخاب کن' },
} as const;
