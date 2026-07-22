import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { light } from '@/constants/traditions';

const ICONS: Record<string, string> = {
  sun: 'sunny-outline',
  mirror: 'ellipse-outline',
  fire: 'flame-outline',
  wheat: 'leaf-outline',
  leaf: 'flower-outline',
};

export function TraditionSymbol({ symbol }: { symbol: string }) {
  const icon = ICONS[symbol] ?? 'sparkles-outline';
  return (
    <View style={styles.wrap}>
      <View style={styles.ring} />
      <Ionicons name={icon as any} size={20} color={light.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: light.gold, opacity: 0.4 },
});
