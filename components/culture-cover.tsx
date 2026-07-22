import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { fonts } from '@/constants/zand-theme';

// A designed cover tile for culture topics: accent gradient, a large faded
// glyph, and the Persian word as a watermark. Used when no photo is uploaded.
function shade(hex: string, amt: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 0xff) + amt, b = (n & 0xff) + amt;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function CultureCover({ accent, glyph, persian }: { accent: string; glyph: string; persian?: string }) {
  return (
    <View style={StyleSheet.absoluteFill as any}>
      <LinearGradient
        colors={[shade(accent, 28), accent, shade(accent, -34)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill as any}
      />
      {persian ? <Text style={s.persian}>{persian}</Text> : null}
      <View style={s.glyphWrap} pointerEvents="none">
        <Ionicons name={glyph as any} size={46} color="rgba(255,255,255,0.92)" />
      </View>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.18)']}
        style={StyleSheet.absoluteFill as any}
      />
    </View>
  );
}

const s = StyleSheet.create({
  persian: { position: 'absolute', right: 8, bottom: 4, fontFamily: fonts.persian, fontSize: 52, color: 'rgba(255,255,255,0.16)' },
  glyphWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
