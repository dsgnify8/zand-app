// Daily "Did You Know?" — rotates to a new fact each day, deterministically.

export type DailyFact = { text: string; word: string };

export const DAILY_FACTS: DailyFact[] = [
  { text: 'The pomegranate is one of the oldest symbols in Persian art and mythology — a sign of abundance, life, and eternity.', word: 'انار' },
  { text: 'Nowruz, the Persian New Year, has been celebrated at the spring equinox for over three thousand years.', word: 'نوروز' },
  { text: 'The English word “paradise” traces back to an ancient Persian word for a walled garden.', word: 'پردیس' },
  { text: 'On Yalda, the longest night of the year, families gather over poetry and pomegranates to welcome the return of the light.', word: 'یلدا' },
  { text: 'Ferdowsi spent about thirty years writing the Shahnameh — nearly 50,000 couplets that helped keep the Persian language alive.', word: 'شاهنامه' },
  { text: 'The Pazyryk carpet, around 2,500 years old, is the oldest known surviving pile carpet in the world.', word: 'فرش' },
  { text: 'Long before electricity, Persian windcatchers — tall towers called bâdgir — cooled homes by guiding the breeze downward.', word: 'بادگیر' },
  { text: 'Qanats, gently sloping underground channels, carried water across the desert for thousands of years.', word: 'قنات' },
  { text: 'Iran grows the vast majority of the world’s saffron, the crimson spice worth more than its weight in gold.', word: 'زعفران' },
  { text: 'The 13th-century Persian poet Rumi remains one of the best-selling poets in the world today.', word: 'مولانا' },
  { text: 'Many Persian homes keep a book of Hafez to open at random for guidance — a cherished tradition called fâl-e Hâfez.', word: 'حافظ' },
  { text: 'The Cyrus Cylinder, from the reign of Cyrus the Great, is often described as one of the earliest declarations of tolerance.', word: 'کوروش' },
  { text: 'Around 550 BCE, Cyrus the Great founded the Achaemenid Empire — the largest the ancient world had yet seen, reaching from the Aegean Sea to the Indus Valley. At its height it is thought to have ruled a striking share of the world’s people.', word: 'هخامنشی' },
  { text: 'Built by Darius I around 518 BCE, Persepolis was the ceremonial capital of the Achaemenid Empire. Its grand stairways and reliefs welcomed delegations from across the empire — a record in stone of many nations united under one rule.', word: 'تخت‌جمشید' },
  { text: 'Under Cyrus the Great and Darius I, the Persian Empire built the Royal Road — a vast relay network of stations and couriers. Messages travelled across the empire with remarkable speed, making it the ancient world’s first true postal system.', word: 'راه‌شاهی' },
  { text: 'Completed around 1010 CE by Ferdowsi, the Shahnameh preserved Iran’s myths, kings, and heroes in more than 50,000 verses — giving the Persian world one of history’s greatest literary epics centuries before Shakespeare.', word: 'فردوسی' },
];

// Same fact all day; a new one tomorrow.
export function getDailyFact(date = new Date()): DailyFact {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  return DAILY_FACTS[dayOfYear % DAILY_FACTS.length];
}
