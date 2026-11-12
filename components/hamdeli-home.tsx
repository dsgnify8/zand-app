// Hand in Hand, on the home page.
//
// A small fan of real pictures from the section, the covers of the
// videos people are making, so the card shows the work rather than
// describing it. Reel covers first because they are moments; profile
// photos fill in when there are fewer than three.
//
// Hidden until something is published. A card that leads to an empty
// page is worse than no card.

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, spacing } from '@/constants/zand-theme';
import { t, useLang, getLang } from '@/lib/i18n';
import { HAMDELI } from '@/constants/i18n/hamdeli';
import { useHamdeli, coverUrl, allReels, sessionShuffle, spreadByOwner, HH } from '@/lib/hamdeli';

// A slight fan rather than a grid: three snapshots laid on a table.
const FAN = [
  { rotate: '-9deg', top: 10, z: 1 },
  { rotate: '0deg', top: 0, z: 3 },
  { rotate: '9deg', top: 10, z: 2 },
];

export function HamdeliHome() {
  useLang();
  const fa = getLang() === 'fa';
  const { rows } = useHamdeli();
  const live = rows.filter((r) => r.published);
  if (!live.length) return null;

  // Same rotation as the wall on the section itself, so the fan shows
  // different moments from one launch to the next.
  const pictures: string[] = spreadByOwner(sessionShuffle(allReels(live), (r) => r.url)).map((r) => r.cover);
  for (const r of sessionShuffle(live, (r) => r.slug)) if (r.cover) pictures.push(r.cover);
  const shots = Array.from(new Set(pictures)).slice(0, 3).map(coverUrl).filter(Boolean) as string[];

  return (
    <View>
      <Text style={[s.label, fa && s.labelFa]}>{fa ? 'همدلی' : 'HAND IN HAND'}</Text>
      <Pressable style={[s.card, fa && s.cardFa]} onPress={() => router.navigate('/hamdeli' as any)}>
        <View style={[s.text, fa && s.textFa]}>
          <View style={[s.heartRow, fa && s.heartRowFa]}>
            <View style={s.heart}><Ionicons name="heart" size={13} color="#FFF" /></View>
            <Text style={s.fa}>همدلی</Text>
          </View>
          {!fa ? <Text style={s.title}>{t(HAMDELI.title)}</Text> : null}
          <Text style={[s.line, fa && s.lineFa]}>{t(HAMDELI.bigger)}</Text>
          <Text style={[s.more, fa && s.moreFa]}>{t(HAMDELI.meet)}</Text>
        </View>

        {shots.length ? (
          <View style={[s.fan, { width: 52 + (shots.length - 1) * 30 }]}>
            {shots.map((uri, i) => {
              // With fewer than three, keep the middle one straight.
              const pose = shots.length === 1 ? FAN[1] : shots.length === 2 ? [FAN[0], FAN[2]][i] : FAN[i];
              return (
                <View
                  key={uri}
                  style={[s.shot, { left: i * 30, top: pose.top, zIndex: pose.z, transform: [{ rotate: pose.rotate }] }]}
                >
                  <Image source={{ uri }} style={s.shotImg} resizeMode="cover" />
                </View>
              );
            })}
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  // Matches the home page's own section labels exactly.
  label: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.textSecondary, letterSpacing: 2.5, marginTop: spacing.lg, marginBottom: spacing.sm },
  labelFa: { fontFamily: fonts.persian, fontSize: 13, letterSpacing: 0, textAlign: 'right', writingDirection: 'rtl' },

  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: HH.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: HH.rose + '55', paddingVertical: spacing.lg, paddingLeft: spacing.lg, paddingRight: spacing.md, minHeight: 138, overflow: 'hidden' },
  cardFa: { flexDirection: 'row-reverse', paddingLeft: spacing.md, paddingRight: spacing.lg },

  text: { flex: 1 },
  textFa: { alignItems: 'flex-end' },
  heartRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  heartRowFa: { flexDirection: 'row-reverse' },
  heart: { width: 24, height: 24, borderRadius: 12, backgroundColor: HH.rose, alignItems: 'center', justifyContent: 'center' },
  fa: { fontFamily: fonts.persian, fontSize: 15, color: HH.rose },
  title: { fontFamily: fonts.heading, fontSize: 23, color: HH.text, marginTop: spacing.sm },
  line: { fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 16, color: HH.textDim, marginTop: 2 },
  lineFa: { fontFamily: fonts.persian, fontStyle: 'normal', fontSize: 15, marginTop: spacing.sm, textAlign: 'right' },
  more: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 1.5, color: HH.rose, marginTop: spacing.md, textTransform: 'uppercase' },
  moreFa: { fontFamily: fonts.persian, fontSize: 11, letterSpacing: 0 },

  fan: { height: 96, position: 'relative', marginHorizontal: spacing.sm },
  shot: { position: 'absolute', width: 52, height: 78, borderRadius: 9, borderWidth: 2, borderColor: '#FFF', backgroundColor: HH.hair, overflow: 'hidden', shadowColor: '#2E2823', shadowOpacity: 0.16, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  shotImg: { width: '100%', height: '100%' },
});
