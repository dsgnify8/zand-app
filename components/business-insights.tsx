// What a listing is actually doing.
//
// Two questions an owner has: is anyone looking, and are they doing
// anything about it. So views sit alongside the actions that follow from
// them — calls, messages, directions — because a listing with a thousand
// views and no calls has a different problem from one with neither.
//
// The comparison is a percentile against the same category in the same
// city, not a rank. "Better than 80% of salons in Gothenburg" tells an
// owner something; "seventh" tells them who to resent.

import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { insightsFor, percentileFor, type Business, type Insight } from '@/lib/businesses';

export function BusinessInsights({ b, admin = false }: { b: Business; admin?: boolean }) {
  const [data, setData] = useState<Insight | null>(null);
  const [pct, setPct] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const d = await insightsFor(b.id, 30);
      setData(d);
      setPct(await percentileFor(b, d.views));
      setLoading(false);
    })();
  }, [b.id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.accent} />;
  }
  if (!data) return null;

  // Only the actions we can honestly say happened: a website opened, a
  // route asked for. A tap on a call button is not a call.
  const acted = data.website + data.directions;
  // Of the people who opened the listing, how many did something. This is
  // the number worth watching: views measure the photograph, this
  // measures whether the place itself is convincing.
  const rate = data.views > 0 ? Math.round((acted / data.views) * 100) : 0;
  const peak = Math.max(1, ...data.byDay.map((d) => d.views));

  return (
    <View style={{ paddingTop: spacing.lg }}>
      <Text style={s.range}>LAST 30 DAYS</Text>

      <View style={s.pair}>
        <View style={s.big}>
          <Text style={s.bigN}>{data.views}</Text>
          <Text style={s.bigL}>opened your listing</Text>
        </View>
        <View style={s.big}>
          <Text style={s.bigN}>{acted}</Text>
          <Text style={s.bigL}>website or directions</Text>
        </View>
      </View>

      {data.views > 0 ? (
        <Text style={s.rate}>{rate}% of people who looked went further.</Text>
      ) : null}

      {/* A plain bar chart. A smooth line would imply more precision than
          daily counts of small numbers deserve. */}
      <View style={s.chart}>
        {data.byDay.map((d) => (
          <View key={d.day} style={s.barSlot}>
            <View style={[s.bar, { height: Math.max(2, (d.views / peak) * 68) }]} />
          </View>
        ))}
      </View>
      <View style={s.chartAxis}>
        <Text style={s.axisT}>30 days ago</Text>
        <Text style={s.axisT}>today</Text>
      </View>

      <Text style={s.sectionL}>WHAT PEOPLE DID</Text>
      {[
        { icon: 'eye-outline', label: 'Saw you in the feed or on the map', n: data.cards },
        ...(admin ? [
          { icon: 'call-outline', label: 'Tapped call', n: data.calls },
          { icon: 'logo-whatsapp', label: 'Tapped WhatsApp', n: data.whatsapp },
        ] : []),
        { icon: 'globe-outline', label: 'Opened your website', n: data.website },
        { icon: 'navigate-outline', label: 'Asked for directions', n: data.directions },
      ].map((r) => (
        <View key={r.label} style={s.row}>
          <Ionicons name={r.icon as any} size={15} color={colors.textSecondary} />
          <Text style={s.rowL}>{r.label}</Text>
          <Text style={s.rowN}>{r.n}</Text>
        </View>
      ))}

      {admin && pct != null ? (
        <View style={s.compare}>
          <Text style={s.compareN}>{pct}%</Text>
          <Text style={s.compareT}>
            You are getting more views than {pct}% of similar listings in {b.city}.
          </Text>
        </View>
      ) : null}

      {data.views === 0 ? (
        <Text style={s.note}>
          Nothing yet. Numbers start the day your listing goes live, so give it a little time.
        </Text>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  range: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginBottom: spacing.md },

  pair: { flexDirection: 'row', gap: spacing.sm },
  big: { flex: 1, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.1)', borderRadius: radius.lg, paddingVertical: spacing.lg, alignItems: 'center' },
  bigN: { fontFamily: fonts.bodyStrong, fontSize: 26, letterSpacing: -0.8, color: colors.textPrimary },
  bigL: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary, marginTop: 3, textAlign: 'center' },

  rate: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },

  chart: { flexDirection: 'row', alignItems: 'flex-end', height: 72, gap: 2, marginTop: spacing.xl },
  barSlot: { flex: 1, justifyContent: 'flex-end' },
  bar: { backgroundColor: colors.accent, borderRadius: 2, opacity: 0.75 },
  chartAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  axisT: { fontFamily: fonts.body, fontSize: 10, color: colors.textSecondary, opacity: 0.7 },

  sectionL: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary, marginTop: spacing.xl, marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.05)' },
  rowL: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.textPrimary },
  rowN: { fontFamily: fonts.bodyStrong, fontSize: 14, color: colors.textPrimary },

  compare: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: 'rgba(201,162,39,0.08)', borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.xl },
  compareN: { fontFamily: fonts.bodyStrong, fontSize: 22, color: colors.accent },
  compareT: { flex: 1, fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: colors.textPrimary },

  note: { fontFamily: fonts.body, fontSize: 12, lineHeight: 19, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg, opacity: 0.9 },
});
