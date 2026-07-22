// Persian alphabet — shared source of truth for Alphabet, Flashcards, Quiz, Pronunciation.

export type PersianLetter = {
  char: string;
  name: string;
  sound: string;
  exampleWord?: string;
  exampleHint?: string;
  note?: string;
};

const ZWJ = '\u200D';

// Build the four positional forms from a base letter using zero-width joiners.
export function positionalForms(char: string) {
  return {
    isolated: char,          // FINAL · DETACHED
    final: ZWJ + char,       // FINAL · ATTACHED
    medial: ZWJ + char + ZWJ,// MEDIAL
    initial: char + ZWJ,     // INITIAL
  };
}

export const PERSIAN_ALPHABET: PersianLetter[] = [
  { char: 'آ', name: 'alef mad', sound: 'â', exampleWord: 'father', exampleHint: 'long open “ah”', note: 'a long vowel' },
  { char: 'ا', name: 'alef', sound: 'a', exampleWord: 'apple', exampleHint: 'short “a”', note: 'a vowel carrier · never joins left' },
  { char: 'ب', name: 'be', sound: 'b', exampleWord: 'book' },
  { char: 'پ', name: 'pe', sound: 'p', exampleWord: 'pen' },
  { char: 'ت', name: 'te', sound: 't', exampleWord: 'tea' },
  { char: 'ث', name: 'se', sound: 's', exampleWord: 'sun', note: 'one of three s-sounds' },
  { char: 'ج', name: 'jim', sound: 'j', exampleWord: 'jam' },
  { char: 'چ', name: 'che', sound: 'ch', exampleWord: 'chair' },
  { char: 'ح', name: 'he', sound: 'h', exampleWord: 'hat', note: 'one of two h-sounds' },
  { char: 'خ', name: 'khe', sound: 'kh', exampleWord: 'Bach', exampleHint: 'guttural, from the throat' },
  { char: 'د', name: 'dâl', sound: 'd', exampleWord: 'door', note: 'never joins left' },
  { char: 'ذ', name: 'zâl', sound: 'z', exampleWord: 'zebra', note: 'never joins left' },
  { char: 'ر', name: 're', sound: 'r', exampleWord: 'rain', exampleHint: 'lightly rolled', note: 'never joins left' },
  { char: 'ز', name: 'ze', sound: 'z', exampleWord: 'zoo', note: 'never joins left' },
  { char: 'ژ', name: 'zhe', sound: 'zh', exampleWord: 'measure', exampleHint: 'the “s” in measure', note: 'never joins left' },
  { char: 'س', name: 'sin', sound: 's', exampleWord: 'sand' },
  { char: 'ش', name: 'shin', sound: 'sh', exampleWord: 'ship' },
  { char: 'ص', name: 'sâd', sound: 's', exampleWord: 'sun' },
  { char: 'ض', name: 'zâd', sound: 'z', exampleWord: 'zoo' },
  { char: 'ط', name: 'tâ', sound: 't', exampleWord: 'top' },
  { char: 'ظ', name: 'zâ', sound: 'z', exampleWord: 'zone' },
  { char: 'ع', name: 'eyn', sound: 'ʼ', exampleWord: 'uh-oh', exampleHint: 'a catch in the throat' },
  { char: 'غ', name: 'gheyn', sound: 'gh', exampleHint: 'gargled, like a French “r”' },
  { char: 'ف', name: 'fe', sound: 'f', exampleWord: 'fish' },
  { char: 'ق', name: 'qâf', sound: 'q', exampleHint: 'deep in the throat' },
  { char: 'ک', name: 'kâf', sound: 'k', exampleWord: 'key' },
  { char: 'گ', name: 'gâf', sound: 'g', exampleWord: 'go' },
  { char: 'ل', name: 'lâm', sound: 'l', exampleWord: 'lamp' },
  { char: 'م', name: 'mim', sound: 'm', exampleWord: 'moon' },
  { char: 'ن', name: 'nun', sound: 'n', exampleWord: 'night' },
  { char: 'و', name: 'vâv', sound: 'v', exampleWord: 'van', note: 'also the vowels “u” / “o” · never joins left' },
  { char: 'ه', name: 'he', sound: 'h', exampleWord: 'hello', note: 'one of two h-sounds' },
  { char: 'ی', name: 'ye', sound: 'y', exampleWord: 'yes', note: 'also the vowel “i”' },
  { char: 'ء', name: 'hamze', sound: 'ʼ', exampleWord: 'uh-oh', exampleHint: 'a glottal stop' },
];
