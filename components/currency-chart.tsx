import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

import { fonts, spacing } from '@/constants/zand-theme';
import { useLang, getLang } from '@/lib/i18n';

// The rial against the dollar, 1979 to 2026.
//
// Plotted on a log scale, because on a linear one the first thirty years
// would be a flat line on the floor and the shape would be lost. Each
// gridline is a tenfold increase.

const POINTS = [
  { year: 1979, rials: 70, label: '1979' },
  { year: 1989, rials: 1000, label: '1989' },
  { year: 1999, rials: 8000, label: '1999' },
  { year: 2009, rials: 9900, label: '2009' },
  { year: 2015, rials: 32000, label: '2015' },
  { year: 2018, rials: 58650, label: '2018' },
  { year: 2022, rials: 331800, label: '2022' },
  { year: 2024, rials: 777000, label: '2024' },
  { year: 2026, rials: 1500000, label: '2026' },
];

const MARKS = [
  { year: 1979, note: 'Revolution', noteFa: 'انقلاب' },
  { year: 2015, note: 'Nuclear deal', noteFa: 'برجام' },
  { year: 2018, note: 'US withdrawal', noteFa: 'خروج آمریکا' },
  { year: 2026, note: 'Protests', noteFa: 'اعتراض‌ها' },
];

const W = 320;
const H = 200;
const PAD_L = 44;
const PAD_R = 12;
const PAD_T = 16;
const PAD_B = 30;

export function CurrencyChart({ dark = true }: { dark?: boolean }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const ink = dark ? '#EFE7DC' : '#221E1A';
  const dim = dark ? 'rgba(239,231,220,0.45)' : 'rgba(34,30,26,0.45)';
  const grid = dark ? 'rgba(239,231,220,0.12)' : 'rgba(34,30,26,0.12)';
  const line = '#C4433F';

  const minY = Math.log10(50);
  const maxY = Math.log10(2000000);
  const minX = 1979;
  const maxX = 2026;

  const px = (year: number) => PAD_L + ((year - minX) / (maxX - minX)) * (W - PAD_L - PAD_R);
  const py = (rials: number) =>
    PAD_T + (1 - (Math.log10(rials) - minY) / (maxY - minY)) * (H - PAD_T - PAD_B);

  const d = POINTS.map((p, i) => (i === 0 ? 'M' : 'L') + px(p.year) + ' ' + py(p.rials)).join(' ');

  // a tenfold gridline at each power of ten
  const decades = [100, 1000, 10000, 100000, 1000000];
  const decadeLabel = (n: number) =>
    n >= 1000000 ? '1m' : n >= 1000 ? n / 1000 + 'k' : String(n);

  return (
    <View style={s.wrap}>
      <Text style={[s.label, { color: dim }]}>{fa ? 'ریال در برابر یک دلار آمریکا' : 'RIALS TO ONE US DOLLAR'}</Text>

      <Svg width="100%" height={H} viewBox={'0 0 ' + W + ' ' + H}>
        {decades.map((n) => (
          <Line key={n} x1={PAD_L} y1={py(n)} x2={W - PAD_R} y2={py(n)} stroke={grid} strokeWidth={1} />
        ))}
        {decades.map((n) => (
          <SvgText key={'t' + n} x={PAD_L - 8} y={py(n) + 3} fill={dim} fontSize={8} textAnchor="end">
            {decadeLabel(n)}
          </SvgText>
        ))}

        <Path d={d} stroke={line} strokeWidth={2} fill="none" strokeLinejoin="round" />

        {POINTS.map((p) => (
          <Circle key={p.year} cx={px(p.year)} cy={py(p.rials)} r={2.6} fill={line} />
        ))}

        {[1979, 1999, 2015, 2026].map((y) => (
          <SvgText key={'x' + y} x={px(y)} y={H - 12} fill={dim} fontSize={8} textAnchor="middle">
            {y}
          </SvgText>
        ))}
      </Svg>

      <Text style={[s.note, { color: dim }]}>
        {fa
          ? 'هر خط شبکه ده برابر خط زیر خودش است. روی مقیاس معمولی، بیست سال اول صاف روی کف نمودار می‌نشست.'
          : 'Each gridline is ten times the one below it. On an ordinary scale the first twenty years would sit flat against the floor.'}
      </Text>

      <View style={s.marks}>
        {MARKS.map((m) => (
          <View key={m.year} style={s.mark}>
            <Text style={[s.markY, { color: ink }]}>{m.year}</Text>
            <Text style={[s.markN, { color: dim }, fa && s.faSmall]}>{fa && (m as any).noteFa ? (m as any).noteFa : m.note}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// What a household could buy, then and now.
const BASKET = [
  { item: 'A month of an average salary, in dollars', itemFa: 'یک ماه حقوق متوسط، به دلار', then: 'about $650', thenFa: 'حدود ۶۵۰ دلار', now: 'about $110', nowFa: 'حدود ۱۱۰ دلار' },
  { item: 'Gold, one gram', itemFa: 'یک گرم طلا', then: '1,100 rials', thenFa: '۱٬۱۰۰ ریال', now: 'above 90,000,000 rials', nowFa: 'بالای ۹۰٬۰۰۰٬۰۰۰ ریال' },
  { item: 'A simple lunch in Tehran', itemFa: 'یک ناهار ساده در تهران', then: 'a few rials', thenFa: 'چند ریال', now: 'hundreds of thousands', nowFa: 'صدها هزار تومان' },
];

export function BasketTable({ dark = true }: { dark?: boolean }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const ink = dark ? '#EFE7DC' : '#221E1A';
  const dim = dark ? 'rgba(239,231,220,0.5)' : 'rgba(34,30,26,0.5)';
  const hair = dark ? 'rgba(239,231,220,0.14)' : 'rgba(34,30,26,0.14)';

  return (
    <View style={s.basket}>
      <View style={[s.bRow, { borderBottomColor: hair }]}>
        <Text style={[s.bHead, { color: dim, flex: 1.6 }]} />
        <Text style={[s.bHead, { color: dim }]}>{fa ? 'پیش از ۱۳۵۷' : 'BEFORE 1979'}</Text>
        <Text style={[s.bHead, { color: dim }]}>{fa ? 'امروز' : 'TODAY'}</Text>
      </View>
      {BASKET.map((b) => (
        <View key={b.item} style={[s.bRow, { borderBottomColor: hair }]}>
          <Text style={[s.bItem, { color: ink, flex: 1.6 }, fa && s.faSmall]}>{fa && (b as any).itemFa ? (b as any).itemFa : b.item}</Text>
          <Text style={[s.bVal, { color: dim }, fa && s.faSmall]}>{fa && (b as any).thenFa ? (b as any).thenFa : b.then}</Text>
          <Text style={[s.bVal, { color: ink }, fa && s.faSmall]}>{fa && (b as any).nowFa ? (b as any).nowFa : b.now}</Text>
        </View>
      ))}
      <Text style={[s.note, { color: dim }]}>
        {fa
          ? 'ارقام تقریبی‌اند و مدام تغییر می‌کنند. آنچه اهمیت دارد جهت است.'
          : 'Figures are approximate and move constantly. The direction is the point.'}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  faSmall: { fontFamily: fonts.persian, fontSize: 11.5, lineHeight: 22, textAlign: 'right', writingDirection: 'rtl' },
  wrap: { marginVertical: spacing.xl },
  label: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 2, marginBottom: spacing.md },
  note: { fontFamily: fonts.body, fontSize: 11, lineHeight: 17, marginTop: spacing.md },
  marks: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, marginTop: spacing.md },
  mark: {},
  markY: { fontFamily: fonts.bodyStrong, fontSize: 12 },
  markN: { fontFamily: fonts.body, fontSize: 10, marginTop: 1 },

  basket: { marginVertical: spacing.xl },
  bRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, paddingVertical: spacing.md, borderBottomWidth: 1 },
  bHead: { flex: 1, fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.4 },
  bItem: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18 },
  bVal: { flex: 1, fontFamily: fonts.body, fontSize: 12, lineHeight: 18 },
});
