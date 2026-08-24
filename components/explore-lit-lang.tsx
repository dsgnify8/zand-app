// Two more sections that stop looking like everything else.
//
// Literature is one object: a cover, and the seven poets attached along
// its base on a rail you swipe. Not a card with a strip beneath it —
// the rail is part of the card, which is why it shares its background
// and sits inside its rounded corner.
//
// Language shows what Persian gave away. Lemon, jasmine, bazaar,
// pyjama: words that walked into English without anyone noticing they
// were foreign. It is the section's argument in the fewest possible
// words, and it needs no explanation to land.

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useLang, getLang } from '@/lib/i18n';
import { eduImage } from '@/constants/education-images';
import { AUTHORS } from '@/constants/literature';

/* ---------------- literature ---------------- */

export function LiteratureCard() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const cover = eduImage('lit-hafez-cover');

  return (
    <View style={s.lit}>
      <Pressable onPress={() => router.navigate('/literature' as any)}>
        <View style={s.litTop}>
          {cover ? <Image source={cover} style={StyleSheet.absoluteFill as any} resizeMode="cover" /> : null}
          <LinearGradient
            colors={['rgba(18,14,11,0.1)', 'rgba(18,14,11,0.5)', 'rgba(18,14,11,0.94)']}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill as any}
          />
          <View style={s.litBody}>
            <Text style={s.litFa}>ادبیات</Text>
            <Text style={s.litT}>{fa ? 'ادبیات' : 'Literature'}</Text>
            <Text style={s.litX}>
              {fa
                ? 'هفت شاعر، و زبانی که ساختند.'
                : 'Seven poets, and the language they made.'}
            </Text>
          </View>
        </View>
      </Pressable>

      {/* the rail belongs to the card: same dark ground, inside its corner */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.railInner}
        style={s.rail}
      >
        {(AUTHORS as any[]).map((a) => {
          const src = eduImage(a.cover ?? ('lit-' + a.key + '-cover'));
          return (
            <Pressable
              key={a.key}
              style={s.poet}
              onPress={() => router.navigate(('/literature/reader?author=' + a.key + '&page=0') as any)}
            >
              <View style={s.poetShot}>
                {src ? (
                  <Image source={src} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
                ) : (
                  <View style={[StyleSheet.absoluteFill as any, s.poetEmpty]}>
                    <Text style={s.poetGlyph}>{(a.persian ?? a.name ?? '?')[0]}</Text>
                  </View>
                )}
                <LinearGradient
                  colors={['transparent', 'rgba(18,14,11,0.85)']}
                  style={StyleSheet.absoluteFill as any}
                />
                <Text style={s.poetFa} numberOfLines={1}>{a.persian ?? a.nameFa ?? ''}</Text>
              </View>
              <Text style={s.poetName} numberOfLines={1}>{a.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ---------------- language ---------------- */

// Every one of these travelled: Persian to Arabic or Turkish, then into
// French or Spanish, then into English. Most speakers of English use
// several a week without ever having been told.
const BORROWED = [
  { en: 'paradise', fa: 'پردیس', note: 'a walled garden' },
  { en: 'bazaar', fa: 'بازار', note: 'the market' },
  { en: 'lemon', fa: 'لیمو', note: 'the fruit, and the word' },
  { en: 'orange', fa: 'نارنگ', note: 'by way of Sanskrit' },
  { en: 'spinach', fa: 'اسفناج', note: 'through Arabic, then Spain' },
  { en: 'jasmine', fa: 'یاسمن', note: 'the flower kept its name' },
  { en: 'khaki', fa: 'خاکی', note: 'the colour of dust' },
  { en: 'caravan', fa: 'کاروان', note: 'those who travel together' },
  { en: 'pyjama', fa: 'پاجامه', note: 'leg garment' },
  { en: 'candy', fa: 'قند', note: 'sugar, crystallised' },
  { en: 'kiosk', fa: 'کوشک', note: 'a garden pavilion' },
  { en: 'magic', fa: 'مغ', note: 'from the Magi' },
];

export function LanguageBorrowed() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';

  return (
    <View style={s.lang}>
      <Text style={s.langLead}>
        {fa
          ? 'انگلیسی بی‌آنکه بداند، این‌ها را از فارسی گرفته است.'
          : 'English took all of these, mostly without noticing.'}
      </Text>

      <View style={s.grid}>
        {BORROWED.map((w) => (
          <Pressable
            key={w.en}
            style={s.word}
            onPress={() => router.navigate('/language' as any)}
          >
            <Text style={s.wordFa}>{w.fa}</Text>
            <View style={s.arrow} />
            <Text style={s.wordEn}>{w.en}</Text>
            <Text style={s.wordNote} numberOfLines={1}>{w.note}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  /* literature */
  lit: { borderRadius: 20, overflow: 'hidden', backgroundColor: '#181310' },
  litTop: { height: 230, justifyContent: 'flex-end' },
  litBody: { padding: spacing.lg },
  litFa: { fontFamily: fonts.persian, fontSize: 15, color: 'rgba(255,255,255,0.72)' },
  litT: { fontFamily: fonts.display, fontSize: 27, lineHeight: 32, color: '#FFF', marginTop: 1 },
  litX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: 'rgba(255,255,255,0.8)', marginTop: 4 },

  rail: { backgroundColor: '#181310' },
  railInner: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: spacing.sm },
  poet: { width: 74 },
  poetShot: { width: 74, height: 96, borderRadius: 10, overflow: 'hidden', justifyContent: 'flex-end' },
  poetEmpty: { backgroundColor: 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center' },
  poetGlyph: { fontFamily: fonts.persian, fontSize: 26, color: 'rgba(255,255,255,0.5)' },
  poetFa: { fontFamily: fonts.persian, fontSize: 12, color: '#FFF', paddingHorizontal: 6, paddingBottom: 5 },
  poetName: { fontFamily: fonts.body, fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginTop: 5, textAlign: 'center' },

  /* language */
  lang: { paddingTop: spacing.sm },
  langLead: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  word: {
    width: '31.5%',
    paddingVertical: spacing.md,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(92,74,120,0.07)',
    alignItems: 'center',
  },
  wordFa: { fontFamily: fonts.persian, fontSize: 17, color: '#5C4A78' },
  arrow: { width: 14, height: 1, backgroundColor: 'rgba(92,74,120,0.35)', marginVertical: 6 },
  wordEn: { fontFamily: fonts.heading, fontSize: 15, color: colors.textPrimary },
  wordNote: { fontFamily: fonts.body, fontSize: 9, color: colors.textSecondary, marginTop: 2, opacity: 0.8 },
});
