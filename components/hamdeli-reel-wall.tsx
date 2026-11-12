// The videos, all together, at the foot of Hand in Hand.
//
// Up to five covers in two rows, one of two and one of three, so it
// reads as a wall of snapshots rather than a grid. Which videos appear,
// in what order, and which row comes first all change each time the app
// opens, so a regular reader keeps meeting someone new. Each one opens
// its reel on Instagram, on the account of the person who made it.

import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { t, useLang, getLang } from '@/lib/i18n';
import { HAMDELI } from '@/constants/i18n/hamdeli';
import {
  allReels, coverUrl, sessionCoin, sessionShuffle, spreadByOwner, HH,
  type Hamdeli, type OwnedReel,
} from '@/lib/hamdeli';

const MAX = 5;

/** How a given number of videos falls into rows. */
function rowsFor<T>(items: T[]): T[][] {
  const [a, b, c, d, e] = items;
  switch (items.length) {
    case 1: return [[a]];
    case 2: return [[a, b]];
    case 3: return [[a, b, c]];
    case 4: return [[a, b], [c, d]];
    default: return sessionCoin ? [[a, b], [c, d, e]] : [[a, b, c], [d, e]];
  }
}

function Tile({ reel, flex, height }: { reel: OwnedReel; flex: number; height: number }) {
  const fa = getLang() === 'fa';
  const uri = coverUrl(reel.cover);
  const name = (fa && reel.name_fa) || reel.name;
  return (
    <Pressable style={[s.tile, { flex, height }]} onPress={() => Linking.openURL(reel.url).catch(() => {})}>
      {uri ? <Image source={{ uri }} style={StyleSheet.absoluteFill as any} resizeMode="cover" /> : null}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill as any}
        pointerEvents="none"
      />
      <View style={[s.foot, fa && s.footFa]}>
        <Ionicons name="logo-instagram" size={11} color="#FFF" />
        <Text style={[s.name, fa && s.nameFa]} numberOfLines={1}>{name}</Text>
      </View>
    </Pressable>
  );
}

export function HamdeliReelWall({ rows }: { rows: Hamdeli[] }) {
  useLang();
  const fa = getLang() === 'fa';
  const reels = spreadByOwner(sessionShuffle(allReels(rows), (r) => r.url)).slice(0, MAX);
  if (!reels.length) return null;

  const lines = rowsFor(reels);

  return (
    <View style={s.wrap}>
      <View style={s.head}>
        <View style={s.diamond} />
        <Text style={[s.eyebrow, fa && s.eyebrowFa]}>{fa ? 'از کارشان' : 'FROM THEIR WORK'}</Text>
        <Text style={[s.note, fa && s.noteFa]}>{t(HAMDELI.opensIg)}</Text>
      </View>

      <View style={s.rows}>
        {lines.map((line, li) => {
          // Two to a row: taller, and unequal, so the pair is not a mirror.
          // Three to a row: shorter, all the same width.
          const pair = line.length === 2;
          const height = line.length === 1 ? 300 : pair ? 230 : 190;
          const wide = sessionCoin === (li === 0);
          return (
            <View key={li} style={[s.row, fa && s.rowFa]}>
              {line.map((reel, i) => (
                <Tile
                  key={reel.url}
                  reel={reel}
                  height={height}
                  flex={pair ? ((i === 0) === wide ? 1.35 : 1) : 1}
                />
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: spacing.xxl },
  head: { alignItems: 'center', marginBottom: spacing.lg },
  diamond: { width: 7, height: 7, backgroundColor: HH.rose, transform: [{ rotate: '45deg' }] },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 3, color: HH.gold, marginTop: spacing.md },
  eyebrowFa: { fontFamily: fonts.persian, fontSize: 13, letterSpacing: 0 },
  note: { fontFamily: fonts.body, fontStyle: 'italic', fontSize: 11.5, color: HH.textDim, marginTop: 4 },
  noteFa: { fontFamily: fonts.persian, fontStyle: 'normal', fontSize: 12 },

  rows: { gap: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.sm },
  rowFa: { flexDirection: 'row-reverse' },
  tile: { borderRadius: 14, overflow: 'hidden', backgroundColor: HH.hair },
  foot: { position: 'absolute', left: 9, right: 9, bottom: 9, flexDirection: 'row', alignItems: 'center', gap: 5 },
  footFa: { flexDirection: 'row-reverse' },
  name: { flex: 1, fontFamily: fonts.bodyStrong, fontSize: 10.5, color: '#FFF' },
  nameFa: { fontFamily: fonts.persian, fontSize: 11, textAlign: 'right' },
});
