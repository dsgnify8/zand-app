// What people type, and what they mean.
//
// Nobody searches "restaurant". They search kebab, or dinner, or غذا. A
// directory that only matches the words in a listing finds nothing for any
// of those, and the person concludes it is empty rather than that they
// used the wrong word.
//
// So each term widens to a category key, and the category is searched
// alongside the text. A place whose description never says "lashes" still
// turns up when someone searches for lashes, because it is filed under
// beauty.
//
// Both languages in one map on purpose: someone typing in Persian and
// someone typing in English are asking the same question, and keeping two
// maps would mean one of them quietly falling behind.

export const SEARCH_SYNONYMS: Record<string, string[]> = {
  /* ---------------- eating ---------------- */
  restaurant: [
    'food', 'eat', 'eating', 'dinner', 'lunch', 'meal', 'meals', 'dine',
    'takeaway', 'delivery', 'iranian food', 'persian food',
    'kebab', 'kabab', 'koobideh', 'kubideh', 'joojeh', 'jujeh', 'barg',
    'chelo', 'chelow', 'polo', 'rice', 'stew', 'khoresh', 'ghormeh',
    'fesenjan', 'tahdig', 'tahchin', 'dizi', 'abgoosht', 'ash', 'soup',
    'mazeh', 'starters', 'grill', 'grilled', 'bbq', 'barbecue',
    // فارسی
    'غذا', 'خوراک', 'ناهار', 'شام', 'رستوران', 'کباب', 'کوبیده', 'جوجه',
    'چلو', 'پلو', 'خورش', 'قرمه', 'فسنجان', 'ته‌دیگ', 'دیزی', 'آبگوشت',
    'آش', 'مزه', 'کبابی',
  ],

  cafe: [
    'coffee', 'espresso', 'latte', 'flat white', 'cappuccino', 'tea',
    'chai', 'chay', 'cafe', 'café', 'coffee shop', 'brunch', 'breakfast',
    'sit', 'work', 'wifi', 'saffron ice cream', 'bastani', 'faloodeh',
    'falooda', 'ice cream', 'shake', 'juice', 'smoothie', 'doogh',
    // فارسی
    'قهوه', 'کافه', 'چای', 'چایخانه', 'صبحانه', 'بستنی', 'فالوده',
    'آبمیوه', 'دوغ',
  ],

  bakery: [
    'bread', 'naan', 'nan', 'sangak', 'barbari', 'taftoon', 'taftan',
    'lavash', 'pastry', 'pastries', 'cake', 'cakes', 'dessert', 'desserts',
    'sweet', 'sweets', 'baklava', 'gaz', 'sohan', 'zoolbia', 'bamieh',
    'ranginak', 'nan berenji', 'nan nokhodchi', 'shirini', 'biscuit',
    'cookies', 'birthday cake',
    // فارسی
    'نان', 'سنگک', 'بربری', 'تافتون', 'لواش', 'شیرینی', 'شیرینی‌پزی',
    'کیک', 'دسر', 'باقلوا', 'گز', 'سوهان', 'زولبیا', 'بامیه', 'رنگینک',
    'نان برنجی', 'نان نخودچی',
  ],

  grocery: [
    'grocery', 'groceries', 'supermarket', 'shop', 'shopping', 'store',
    'snacks', 'snack', 'nuts', 'pistachio', 'pistachios', 'saffron',
    'spice', 'spices', 'herbs', 'rice', 'tea leaves', 'torshi', 'pickles',
    'dried lime', 'limoo', 'halal', 'butcher', 'meat', 'lavashak',
    // فارسی
    'سوپرمارکت', 'خواربار', 'بقالی', 'تنقلات', 'آجیل', 'پسته', 'زعفران',
    'ادویه', 'سبزی', 'برنج', 'ترشی', 'لیمو عمانی', 'حلال', 'قصابی',
    'گوشت', 'لواشک',
  ],

  winery: [
    'winery', 'wine', 'wines', 'vineyard', 'tasting', 'cellar', 'drinks',
    'shiraz', 'cabernet', 'napa', 'تاکستان', 'شراب', 'نوشیدنی', 'مزه',
  ],

  dessert: [
    'dessert', 'ice cream', 'bastani', 'gelato', 'baklava', 'baghlava',
    'sweets', 'faloodeh', 'falooda', 'sorbet', 'دسر', 'بستنی', 'باقلوا',
    'فالوده', 'شیرینی',
  ],

  candy: [
    'candy', 'sweets', 'sweet', 'lösgodis', 'losgodis', 'pick and mix',
    'pick n mix', 'chocolate', 'liquorice', 'lakrits', 'gummy', 'gummies',
    'ice cream', 'icecream', 'gelato', 'soft serve', 'glass',
    'souvenir', 'souvenirs', 'gifts', 'gift', 'presents',
    'tobacco', 'cigarettes', 'snus', 'vape', 'kiosk', 'corner shop',
    'nuts', 'dried fruit', 'lavashak', 'noghl', 'gaz', 'sohan',
    // فارسی
    'شیرینی', 'آبنبات', 'شکلات', 'بستنی', 'سوغات', 'سوغاتی', 'کادو',
    'هدیه', 'دخانیات', 'سیگار', 'کیوسک', 'آجیل', 'میوه خشک', 'لواشک',
    'نقل', 'گز', 'سوهان',
  ],

  /* ---------------- looking after yourself ---------------- */
  beauty: [
    'beauty', 'salon', 'hair', 'hairdresser', 'hair stylist', 'hairstyle',
    'haircut', 'cut', 'colour', 'color', 'highlights', 'balayage', 'blowdry',
    'blow dry', 'keratin', 'extensions', 'hair extensions',
    'lashes', 'lash', 'eyelashes', 'lash lift', 'lash extensions',
    'brows', 'brow', 'eyebrows', 'threading', 'microblading', 'tint',
    'nails', 'nail', 'manicure', 'pedicure', 'gel nails', 'acrylics',
    'makeup', 'make up', 'bridal makeup', 'facial', 'facials', 'skincare',
    'skin', 'botox', 'filler', 'fillers', 'laser', 'waxing', 'wax',
    'massage', 'spa', 'barber', 'beard', 'shave',
    // فارسی
    'آرایشگاه', 'آرایش', 'سالن زیبایی', 'زیبایی', 'مو', 'کوتاهی مو',
    'رنگ مو', 'مش', 'کراتین', 'اکستنشن', 'مژه', 'اکستنشن مژه', 'ابرو',
    'بندازی', 'میکروبلیدینگ', 'ناخن', 'مانیکور', 'پدیکور', 'کاشت ناخن',
    'میکاپ', 'آرایش عروس', 'فیشیال', 'پوست', 'بوتاکس', 'فیلر', 'لیزر',
    'اپیلاسیون', 'ماساژ', 'اسپا', 'سلمانی', 'ریش',
  ],

  medical: [
    'doctor', 'gp', 'clinic', 'medical', 'health', 'nurse', 'physio',
    'physiotherapy', 'therapist', 'psychologist', 'pharmacy', 'chemist',
    'blood test', 'checkup',
    // فارسی
    'دکتر', 'پزشک', 'کلینیک', 'درمانگاه', 'سلامت', 'پرستار',
    'فیزیوتراپی', 'روانشناس', 'داروخانه', 'آزمایش',
  ],

  dental: [
    'dentist', 'dental', 'teeth', 'tooth', 'braces', 'invisalign',
    'whitening', 'implant', 'implants', 'hygienist',
    // فارسی
    'دندانپزشک', 'دندان‌پزشکی', 'دندان', 'ارتودنسی', 'ایمپلنت',
    'بلیچینگ', 'جرم‌گیری',
  ],

  /* ---------------- things and services ---------------- */
  clothing: [
    'clothes', 'clothing', 'fashion', 'boutique', 'dress', 'dresses',
    'suit', 'suits', 'tailor', 'tailoring', 'alterations', 'shoes',
    'bags', 'menswear', 'womenswear', 'kids clothes',
    // فارسی
    'لباس', 'پوشاک', 'بوتیک', 'مانتو', 'کت و شلوار', 'خیاط', 'خیاطی',
    'کفش', 'کیف',
  ],

  jewellery: [
    'gold', 'jewellery', 'jewelry', 'jeweller', 'ring', 'rings',
    'necklace', 'earrings', 'bracelet', 'engagement ring', 'wedding ring',
    'watch', 'watches', 'silver', 'turquoise', 'firoozeh',
    // فارسی
    'طلا', 'طلافروشی', 'جواهر', 'جواهرات', 'انگشتر', 'گردنبند',
    'گوشواره', 'دستبند', 'حلقه', 'ساعت', 'نقره', 'فیروزه',
  ],

  repair: [
    'car', 'cars', 'mechanic', 'garage', 'car repair', 'service',
    'mot', 'tyres', 'tires', 'bodywork', 'brakes', 'battery',
    // فارسی
    'ماشین', 'خودرو', 'تعمیرگاه', 'مکانیک', 'سرویس', 'لاستیک',
    'صافکاری', 'ترمز', 'باتری',
  ],

  interior: [
    'interior', 'interiors', 'furniture', 'sofa', 'rug', 'rugs', 'carpet',
    'carpets', 'persian rug', 'kilim', 'curtains', 'lighting', 'decor',
    'renovation', 'design',
    // فارسی
    'دکوراسیون', 'مبل', 'مبلمان', 'فرش', 'قالی', 'گلیم', 'پرده',
    'روشنایی', 'بازسازی', 'طراحی داخلی',
  ],

  photo: [
    'photographer', 'photography', 'photos', 'photo', 'headshots',
    'wedding photographer', 'video', 'videographer', 'studio',
    // فارسی
    'عکاس', 'عکاسی', 'عکس', 'فیلمبردار', 'فیلمبرداری', 'آتلیه',
  ],

  events: [
    'wedding', 'weddings', 'party', 'parties', 'event', 'events',
    'catering', 'caterer', 'venue', 'flowers', 'florist', 'decoration',
    'dj', 'music', 'sofreh', 'sofreh aghd', 'engagement',
    // فارسی
    'عروسی', 'مراسم', 'جشن', 'تشریفات', 'کترینگ', 'تالار', 'گل',
    'گل‌فروشی', 'تزئینات', 'سفره عقد', 'نامزدی',
  ],

  legal: [
    'lawyer', 'legal', 'solicitor', 'attorney', 'immigration', 'visa',
    'contract', 'notary', 'accountant', 'accounting', 'tax',
    // فارسی
    'وکیل', 'حقوقی', 'مهاجرت', 'ویزا', 'قرارداد', 'محضر', 'حسابدار',
    'حسابداری', 'مالیات',
  ],
};

/**
 * The categories a search term implies.
 *
 * Substring rather than exact: someone typing "lash extensions" should hit
 * the "lashes" entry, and "hair salon" should hit both "hair" and "salon"
 * without either being written out in full.
 */
export function categoriesFor(term: string): string[] {
  const q = term.trim().toLowerCase();
  if (q.length < 2) return [];

  const hits = new Set<string>();
  for (const [category, words] of Object.entries(SEARCH_SYNONYMS)) {
    for (const w of words) {
      if (w === q || w.includes(q) || q.includes(w)) {
        hits.add(category);
        break;
      }
    }
  }
  return [...hits];
}
