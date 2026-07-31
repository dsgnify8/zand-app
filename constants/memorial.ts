// A memorial, not a list. Each name here is documented by human rights
// organisations, by name and by date. There are thousands more.
//
// Positions are fractions of the illustration box, the same model the
// province map uses.

export type Remembered = {
  key: string;
  name: string;
  persian?: string;
  age?: string;
  when: string;
  where: string;
  what: string;
  image: string;   // admin-uploadable slot
  x: number;
  y: number;
};

export const REMEMBERED: Remembered[] = [
  {
    key: 'diana',
    name: 'Diana Nasseri',
    persian: 'دیانا ناصری',
    age: '19',
    when: 'January 2026',
    where: 'Gorgan',
    what: 'Nineteen, and known online to a large following for ordinary things. She was killed by security forces during the crackdown in Gorgan. Her family were pressured over what could be said about how she died.',
    image: 'mem-diana',
    x: 0.66, y: 0.58,
  },
  {
    key: 'ghazaleh',
    name: 'Ghazaleh Chalabi',
    persian: 'غزاله چلابی',
    age: '33',
    when: 'September 2022',
    where: 'Amol',
    what: 'She was filming the protest when she was shot. The footage keeps running for a few seconds after she falls, and her own voice can be heard on it saying, do not be afraid, do not be afraid.',
    image: 'mem-ghazaleh',
    x: 0.34, y: 0.74,
  },
  {
    key: 'siavash',
    name: 'Siavash Mahmoudi',
    persian: 'سیاوش محمودی',
    age: '18',
    when: 'September 2022',
    where: 'Tehran',
    what: 'Eighteen, shot in the street during the protests in Tehran. His family were told to bury him quietly and quickly, as many families were.',
    image: 'mem-siavash',
    x: 0.44, y: 0.86,
  },
  {
    key: 'neda',
    name: 'Neda Agha-Soltan',
    persian: 'ندا آقاسلطان',
    age: '26',
    when: 'June 2009',
    where: 'Tehran',
    what: 'A philosophy student who had stepped out of a car in the heat during the Green Movement protests. She was shot in the chest and died in the street. Someone filmed it, and the footage travelled around the world within hours. She had not been chanting.',
    image: 'mem-neda',
    x: 0.63, y: 0.34,
  },
  {
    key: 'mahsa',
    name: 'Mahsa Jina Amini',
    persian: 'مهسا ژینا امینی',
    age: '22',
    when: 'September 2022',
    where: 'Tehran, from Saqqez',
    what: 'A Kurdish woman visiting Tehran with her family, detained by the morality police over how she was wearing her hijab. She collapsed in custody and died three days later. Her family said she had been beaten. Her funeral became the first protest of what followed.',
    image: 'mem-mahsa',
    x: 0.72, y: 0.44,
  },
  {
    key: 'kian',
    name: 'Kian Pirfalak',
    persian: 'کیان پیرفلک',
    age: '9',
    when: 'November 2022',
    where: 'Izeh',
    what: 'Nine years old, in the back of his family car when it was fired on. His mother spoke at his funeral and said plainly who had shot him, in front of everyone. He had recorded a video weeks earlier explaining a boat he was building.',
    image: 'mem-kian',
    x: 0.78, y: 0.55,
  },
  {
    key: 'nika',
    name: 'Nika Shakarami',
    persian: 'نیکا شاکرمی',
    age: '16',
    when: 'September 2022',
    where: 'Tehran',
    what: 'Sixteen, at a protest in Tehran. She told a friend she was being followed and was not heard from again. Her body was returned to her family ten days later, and they were pressured over what they could say about it.',
    image: 'mem-nika',
    x: 0.58, y: 0.5,
  },
  {
    key: 'sarina',
    name: 'Sarina Esmailzadeh',
    persian: 'سارینا اسماعیل‌زاده',
    age: '16',
    when: 'September 2022',
    where: 'Karaj',
    what: 'Sixteen, and a video blogger who posted about ordinary teenage things and about the life she hoped for. She was killed during protests in Karaj. The authorities said she had jumped from a roof; her family did not accept it.',
    image: 'mem-sarina',
    x: 0.84, y: 0.53,
  },
  {
    key: 'hadis',
    name: 'Hadis Najafi',
    persian: 'حدیث نجفی',
    age: '22',
    when: 'September 2022',
    where: 'Karaj',
    what: 'Filmed tying up her hair before walking towards a protest line. She was shot several times and died. The clip of her tying her hair became one of the images of that autumn.',
    image: 'mem-hadis',
    x: 0.52, y: 0.42,
  },
  {
    key: 'khodanoor',
    name: 'Khodanoor Lajaei',
    persian: 'خدانور لجه‌ای',
    age: '27',
    when: 'September 2022',
    where: 'Zahedan',
    what: 'A Baluch man killed on the day known as Bloody Friday in Zahedan, when around a hundred people were shot. A photograph taken earlier, showing him chained to a flagpole with water left out of reach, had already circulated widely.',
    image: 'mem-khodanoor',
    x: 0.4, y: 0.66,
  },
  {
    key: 'mohsen',
    name: 'Mohsen Shekari',
    persian: 'محسن شکاری',
    age: '23',
    when: 'December 2022',
    where: 'Tehran',
    what: 'A café worker, the first person executed in connection with the 2022 protests. He was convicted of blocking a street and wounding a member of the Basij, after a trial that lasted a matter of days and a confession his family said was extracted under torture.',
    image: 'mem-mohsen',
    x: 0.46, y: 0.58,
  },
  {
    key: 'majidreza',
    name: 'Majidreza Rahnavard',
    persian: 'مجیدرضا رهنورد',
    age: '23',
    when: 'December 2022',
    where: 'Mashhad',
    what: 'Publicly hanged from a crane twenty-three days after his arrest. He asked that no one read the Quran or mourn at his grave, and that people celebrate instead.',
    image: 'mem-majidreza',
    x: 0.83, y: 0.61,
  },
  {
    key: 'hatami',
    name: 'Amirhossein Hatami',
    persian: 'امیرحسین حاتمی',
    age: '18',
    when: 'January to April 2026',
    where: 'Tehran',
    what: 'Eighteen years old, arrested on 8 January 2026. He could not afford a lawyer of his own and was given one by the court. A confession was broadcast on state television ten days after his arrest. He was sentenced to death for enmity against God and executed eighty-four days after he was taken.',
    image: 'mem-hatami',
    x: 0.7, y: 0.83,
  },
  {
    key: 'isfahan',
    name: 'Amirhossein Safari and Abolfazl Sepahi',
    persian: 'امیرحسین صفری و ابوالفضل سپاهی',
    age: 'both in their twenties',
    when: 'July 2026',
    where: 'Isfahan',
    what: 'Two of twelve young men sentenced to death over the protests in Alikhani Square on 8 January. They were hanged in public before dawn. A crowd gathered through the night to try to stop it and was cleared by security forces. Ten others from the same case are still under sentence.',
    image: 'mem-isfahan',
    x: 0.82, y: 0.9,
  },
];
