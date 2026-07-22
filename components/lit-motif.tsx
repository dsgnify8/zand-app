import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lit } from '@/constants/literature';
import { fonts } from '@/constants/zand-theme';

// Poetic decorative motifs for Literature — antique-gold, symmetrical, ornamental.
const ICONS: Record<string, string> = {
  pen: 'brush-outline',
  book: 'book-outline',
  crown: 'diamond-outline',
  bird: 'leaf-outline',
  star: 'star-outline',
  flame: 'flame-outline',
  moon: 'moon-outline',
};

export function LitMotif({ symbol, caption }: { symbol: string; caption?: string }) {
  const icon = ICONS[symbol] ?? 'sparkles-outline';
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.flourish} />
        <View style={styles.diamond}>
          <View style={styles.diamondInner}>
            <Ionicons name={icon as any} size={20} color={lit.gold} />
          </View>
        </View>
        <View style={styles.flourish} />
      </View>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginVertical: 28 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flourish: { width: 46, height: 1, backgroundColor: lit.gold, opacity: 0.5 },
  diamond: { width: 44, height: 44, borderRadius: 8, borderWidth: 1, borderColor: lit.gold, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '45deg' }] },
  diamondInner: { transform: [{ rotate: '-45deg' }] },
  caption: { fontFamily: fonts.body, fontSize: 12, color: lit.textDim, marginTop: 12, textAlign: 'center', fontStyle: 'italic' },
});
