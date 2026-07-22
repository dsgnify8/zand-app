// Fal e Hafez: the omen of Hafez. A ritual six centuries old.
// Translations are plain renderings. Hafez in English is always an interpretation,
// never a fixed text, and every translator hears him differently.

export type FalVerse = {
  id: string;
  lines: string[];
  persian: string;
  reading: string;
};

export const FAL_VERSES: FalVerse[] = [
  {
    id: 'f1',
    lines: ['Come, for the palace of hope is built on sand.', 'Bring wine, for the foundation of life is wind.'],
    persian: 'بیا که قصر امل سخت سست بنیادست',
    reading: 'You are building on something that will not hold. This is not a warning to despair, but to loosen your grip. What you are gripping so tightly was never solid. Hold the moment instead.',
  },
  {
    id: 'f2',
    lines: ['I never saw a lover who was not troubled,', 'and never found the road to the treasure without a serpent.'],
    persian: 'هرگز نمیرد آنکه دلش زنده شد به عشق',
    reading: 'The difficulty is not a sign you took the wrong road. It is a sign you took the road at all. Nothing worth having sits unguarded. What you are facing is the guardian, not the obstacle.',
  },
  {
    id: 'f3',
    lines: ['Sit by the stream and watch life pass,', 'for this sign of the fleeting world is enough for us.'],
    persian: 'بنشین بر لب جوی و گذر عمر ببین',
    reading: 'Stop pushing. There is a moment for effort and a moment for watching, and this is the second kind. What you are trying to force will move on its own if you let it.',
  },
  {
    id: 'f4',
    lines: ['The heart that is alive with love never dies.', 'Our permanence is written in the book of the world.'],
    persian: 'هرگز نمیرد آنکه دلش زنده شد به عشق',
    reading: 'What you give your heart to outlives you. This is an answer of yes, but not the small yes you wanted. It is telling you the thing you love is the thing that lasts.',
  },
  {
    id: 'f5',
    lines: ['Last night I saw the angels knocking at the tavern door,', 'kneading the clay of Adam, and casting it into a cup.'],
    persian: 'دوش دیدم که ملائک در میخانه زدند',
    reading: 'The sacred is not where you are looking for it. It is in the ordinary place you dismissed. Look again at what you walked past.',
  },
  {
    id: 'f6',
    lines: ['If that Shirazi Turk would take my heart in hand,', 'for her Indian mole I would give Samarkand and Bukhara.'],
    persian: 'اگر آن ترک شیرازی به دست آرد دل ما را',
    reading: 'You are being asked what you would trade. The answer reveals what you actually want, not what you say you want. Be honest about the price you are willing to pay.',
  },
  {
    id: 'f7',
    lines: ['Do not grieve. The lost Joseph will return to Canaan.', 'The house of sorrow will become a garden. Do not grieve.'],
    persian: 'یوسف گمگشته بازآید به کنعان غم مخور',
    reading: 'This is the most beloved answer Hafez gives. What has been lost is not gone. The season you are in is a season, not a permanent condition. Wait. It turns.',
  },
  {
    id: 'f8',
    lines: ['Plant the tree of friendship, it bears the fruit of the heart.', 'Uproot the sapling of enmity, it brings countless griefs.'],
    persian: 'درخت دوستی بنشان که کام دل به بار آرد',
    reading: 'The situation asks for repair, not for winning. There is a relationship here worth more than the argument inside it. Choose the tree.',
  },
  {
    id: 'f9',
    lines: ['Years my heart sought the cup of Jamshid from me,', 'and asked a stranger for what it already held.'],
    persian: 'سال‌ها دل طلب جام جم از ما می‌کرد',
    reading: 'You already have it. You have been searching outside for a thing that has been in your own hands the whole time. Stop looking outward.',
  },
  {
    id: 'f10',
    lines: ['The rose is beautiful, and the moment of its beauty is short.', 'Take the news of it, for it will not stay.'],
    persian: 'گل عزیز است غنیمت شمریدش صحبت',
    reading: 'Act now. The window you are considering will not stay open while you deliberate. This is a yes, but a yes with an expiry.',
  },
  {
    id: 'f11',
    lines: ['No one has drawn aside the veil of thought like Hafez,', 'since the hair of the bride of speech was first combed.'],
    persian: 'کس چو حافظ نگشاد از رخ اندیشه نقاب',
    reading: 'You are being asked to speak. What you have been keeping unsaid needs a voice, and you have the words. The veil lifts when someone lifts it.',
  },
  {
    id: 'f12',
    lines: ['I am the slave of a spirit that has no colour of attachment,', 'not to disbelief, not to faith, not to certainty, not to doubt.'],
    persian: 'غلام همت آنم که زیر چرخ کبود',
    reading: 'Stop taking sides in the argument. The freedom you want is not on either side of it. Step out of the frame entirely.',
  },
  {
    id: 'f13',
    lines: ['A hidden treasure lies in the ruined heart.', 'Do not despise the broken place, for that is the door.'],
    persian: 'در خرابات مغان نور خدا می‌بینم',
    reading: 'The thing you are ashamed of is the opening. What broke in you is not the damage, it is the way in. Do not rush to repair it before you have looked inside.',
  },
  {
    id: 'f14',
    lines: ['Whatever the Friend does is lovely.', 'In love there is no need to weigh and measure.'],
    persian: 'هر چه آن خسرو کند شیرین بود',
    reading: 'You are calculating something that cannot be calculated. Trust it, or leave it, but stop weighing it. The scale is the wrong instrument here.',
  },
  {
    id: 'f15',
    lines: ['Neither the endless night nor the sorrow of the heart will remain.', 'Since that is so, do not sit in grief.'],
    persian: 'شب تاریک و بیم موج و گردابی چنین هایل',
    reading: 'This passes. Not because you will fix it, but because nothing holds its shape forever, including this. The night is long, not endless.',
  },
  {
    id: 'f16',
    lines: ['Every word of Hafez is a pearl from the sea of thought,', 'strung by the hand of patience and the breath of the reed.'],
    persian: 'هر سخنی که حافظ گفت گوهری است',
    reading: 'Patience is the instruction. What you want is being made, slowly, and it will not be rushed into being. The pearl takes the time it takes.',
  },
];
