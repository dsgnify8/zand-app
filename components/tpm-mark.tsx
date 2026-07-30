import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

import { tpm } from '@/constants/tpm-theme';

// The tpm wordmark, drawn rather than set in type, because the letterforms
// are custom: the t crosses the p, and the p and m share a stem.
export function TpmMark({ size = 26, color = tpm.red }: { size?: number; color?: string }) {
  const h = size;
  const w = size * 2.6;
  return (
    <View pointerEvents="none">
      <Svg width={w} height={h} viewBox="0 0 104 40">
        {/* t */}
        <Path d="M14 4 h9 v10 h9 v9 h-9 v6 a5 5 0 0 0 5 5 h4 v9 h-4 a14 14 0 0 1 -14 -14 v-6 h-8 v-9 h8 z" fill={color} />
        {/* p, with the descender */}
        <Path
          d="M34 14 h9 v3 a13 13 0 1 1 0 20 v-1 h-9 z M47 23 a5 5 0 1 0 0 10 a5 5 0 0 0 0 -10 z"
          fill={color}
        />
        {/* m */}
        <Path d="M68 43 h-9 v-29 h9 v2 a11 11 0 0 1 15 1 a11 11 0 0 1 19 8 v18 h-9 v-17 a5 5 0 0 0 -10 0 v17 h-9 v-17 a5 5 0 0 0 -6 -5 z" fill={color} />
      </Svg>
    </View>
  );
}

// A compact glyph for the tab bar: just the t/p crossing.
export function TpmIcon({ size = 24, color = tpm.red }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path d="M13 4 h8 v9 h9 v8 h-9 v6 a5 5 0 0 0 5 5 h4 v8 h-4 a13 13 0 0 1 -13 -13 v-6 h-8 v-8 h8 z" fill={color} />
      <Path d="M24 13 h8 v2 a11 11 0 1 1 0 17 v6 h-8 z M32 20 a5 5 0 1 0 0 9 a5 5 0 0 0 0 -9 z" fill={color} opacity={0.55} />
    </Svg>
  );
}
