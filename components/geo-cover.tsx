import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Line } from 'react-native-svg';

import { fonts } from '@/constants/zand-theme';

// Designed cover tiles for the four geography chapters. Each carries a motif
// that echoes its theme: crossroads, timeline, borders, terrain.
type GeoMeta = { c1: string; c2: string; icon: string; motif: 'cross' | 'time' | 'borders' | 'terrain' };

const META: Record<string, GeoMeta> = {
  g1:  { c1: '#3E6E78', c2: '#22424A', icon: 'compass-outline', motif: 'cross' },
  g2:  { c1: '#8C6A3F', c2: '#4E3A21', icon: 'hourglass-outline', motif: 'time' },
  g3:  { c1: '#6E8C5A', c2: '#3C4E30', icon: 'git-network-outline', motif: 'borders' },
  g4b: { c1: '#8C3A2E', c2: '#4E1F18', icon: 'triangle-outline', motif: 'terrain' },
};

function Motif({ motif }: { motif: GeoMeta['motif'] }) {
  const stroke = 'rgba(255,255,255,0.28)';
  if (motif === 'cross') {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice">
        <Line x1="10" y1="60" x2="110" y2="60" stroke={stroke} strokeWidth="1.2" />
        <Line x1="60" y1="10" x2="60" y2="110" stroke={stroke} strokeWidth="1.2" />
        <Line x1="22" y1="22" x2="98" y2="98" stroke={stroke} strokeWidth="1" />
        <Line x1="98" y1="22" x2="22" y2="98" stroke={stroke} strokeWidth="1" />
        <Circle cx="60" cy="60" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" fill="none" />
      </Svg>
    );
  }
  if (motif === 'time') {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice">
        <Line x1="14" y1="60" x2="106" y2="60" stroke={stroke} strokeWidth="1.2" />
        {[20, 40, 60, 80, 100].map((x) => <Circle key={x} cx={x} cy="60" r="3" fill="rgba(255,255,255,0.4)" />)}
      </Svg>
    );
  }
  if (motif === 'borders') {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice">
        <Path d="M60 24 L86 40 L82 70 L58 92 L34 72 L38 42 Z" stroke={stroke} strokeWidth="1.3" fill="none" />
        <Path d="M60 24 L60 92 M38 42 L82 70 M86 40 L34 72" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
      </Svg>
    );
  }
  return (
    <Svg width="100%" height="100%" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice">
      <Path d="M8 96 L34 54 L52 78 L72 40 L96 82 L112 60" stroke={stroke} strokeWidth="1.4" fill="none" />
      <Path d="M8 108 L40 70 L58 92 L80 58 L104 96 L112 84" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" />
    </Svg>
  );
}

export function GeoCover({ chapterKey, persian }: { chapterKey: string; persian?: string }) {
  const m = META[chapterKey] ?? META.g1;
  return (
    <View style={StyleSheet.absoluteFill as any}>
      <LinearGradient colors={[m.c1, m.c2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
      <View style={StyleSheet.absoluteFill as any}><Motif motif={m.motif} /></View>
      <View style={s.iconWrap} pointerEvents="none">
        <Ionicons name={m.icon as any} size={30} color="rgba(255,255,255,0.95)" />
      </View>
      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.28)']} style={StyleSheet.absoluteFill as any} />
    </View>
  );
}

const s = StyleSheet.create({
  iconWrap: { position: 'absolute', top: 10, left: 10 },
});
