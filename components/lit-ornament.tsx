import { StyleSheet, View, Text } from 'react-native';
import { fonts, spacing } from '@/constants/zand-theme';
import { lit } from '@/constants/literature';

/* A different signature under each poet's opening line, drawn from their own world. */
export function LitOrnament({ mark }: { mark?: string }) {
  if (mark === 'cup') {
    return (
      <View style={s.row}>
        <View style={s.hair} />
        <View style={s.cupWrap}>
          <View style={s.cupBowl} />
          <View style={s.cupStem} />
          <View style={s.cupFoot} />
        </View>
        <View style={s.hair} />
      </View>
    );
  }
  if (mark === 'rose') {
    return (
      <View style={s.row}>
        <View style={s.hair} />
        <View style={s.roseWrap}>
          <View style={[s.petal, { transform: [{ rotate: '0deg' }] }]} />
          <View style={[s.petal, { transform: [{ rotate: '60deg' }] }]} />
          <View style={[s.petal, { transform: [{ rotate: '120deg' }] }]} />
          <View style={s.roseHeart} />
        </View>
        <View style={s.hair} />
      </View>
    );
  }
  if (mark === 'star') {
    return (
      <View style={s.row}>
        <View style={s.hair} />
        <View style={s.starWrap}>
          <View style={[s.starBar, { transform: [{ rotate: '0deg' }] }]} />
          <View style={[s.starBar, { transform: [{ rotate: '45deg' }] }]} />
          <View style={[s.starBar, { transform: [{ rotate: '90deg' }] }]} />
          <View style={[s.starBar, { transform: [{ rotate: '135deg' }] }]} />
        </View>
        <View style={s.hair} />
      </View>
    );
  }
  if (mark === 'strings') {
    return (
      <View style={s.col}>
        <View style={s.stringsRow}>
          {[10, 15, 20, 24, 20, 15, 10].map((h, i) => (
            <View key={i} style={[s.stringBar, { height: h }]} />
          ))}
        </View>
        <View style={s.wideHair} />
      </View>
    );
  }
  if (mark === 'domes') {
    return (
      <View style={s.col}>
        <View style={s.domesRow}>
          {['#241C19', '#C8A23C', '#5F7F5A', '#9E3B33', '#3E7F86', '#A98763', '#E8E1D4'].map((c, i) => (
            <View key={i} style={[s.dome, { backgroundColor: c }]} />
          ))}
        </View>
        <View style={s.wideHair} />
      </View>
    );
  }
  if (mark === 'spiral') {
    return (
      <View style={s.col}>
        <View style={s.spiralWrap}>
          <View style={[s.ring, { width: 34, height: 34, borderRadius: 17, opacity: 0.25 }]} />
          <View style={[s.ring, { width: 23, height: 23, borderRadius: 12, opacity: 0.5 }]} />
          <View style={[s.ring, { width: 12, height: 12, borderRadius: 6, opacity: 0.85 }]} />
          <View style={s.spiralDot} />
        </View>
      </View>
    );
  }
  if (mark === 'crown') {
    return (
      <View style={s.col}>
        <View style={s.crownRow}>
          <View style={[s.crownPeak, { height: 9 }]} />
          <View style={[s.crownPeak, { height: 14 }]} />
          <View style={[s.crownPeak, { height: 9 }]} />
        </View>
        <View style={s.crownBase} />
        <View style={s.wideHair} />
      </View>
    );
  }
  // default: the plain gold rule
  return <View style={s.plain} />;
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md, marginTop: spacing.lg },
  col: { alignItems: 'center', marginTop: spacing.lg },
  hair: { width: 34, height: 1, backgroundColor: lit.gold, opacity: 0.5 },
  wideHair: { width: 64, height: 1, backgroundColor: lit.gold, opacity: 0.5, marginTop: spacing.sm },
  plain: { width: 40, height: 1, backgroundColor: lit.gold, opacity: 0.6, marginTop: spacing.lg },

  cupWrap: { alignItems: 'center' },
  cupBowl: { width: 16, height: 8, borderBottomLeftRadius: 9, borderBottomRightRadius: 9, borderWidth: 1, borderTopWidth: 0, borderColor: lit.gold },
  cupStem: { width: 1, height: 6, backgroundColor: lit.gold },
  cupFoot: { width: 11, height: 1, backgroundColor: lit.gold },

  roseWrap: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  petal: { position: 'absolute', width: 18, height: 7, borderRadius: 5, borderWidth: 1, borderColor: lit.gold, opacity: 0.75 },
  roseHeart: { width: 3, height: 3, borderRadius: 2, backgroundColor: lit.gold },

  starWrap: { width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  starBar: { position: 'absolute', width: 16, height: 1, backgroundColor: lit.gold, opacity: 0.8 },

  stringsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 24 },
  stringBar: { width: 1, backgroundColor: lit.gold, opacity: 0.7 },

  domesRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  dome: { width: 9, height: 6, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderWidth: 0.5, borderColor: 'rgba(176,138,70,0.5)' },

  spiralWrap: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', borderWidth: 1, borderColor: lit.gold },
  spiralDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: lit.gold },

  crownRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  crownPeak: { width: 1, backgroundColor: lit.gold, opacity: 0.8 },
  crownBase: { width: 22, height: 1, backgroundColor: lit.gold, marginTop: 2 },
});
