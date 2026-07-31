import { Image, View } from 'react-native';

// The Persian Mag's own mark, used as supplied rather than redrawn.
// No tint is applied: the file has a background, so tinting fills the whole
// rectangle rather than just the letterforms.
const LOGO = require('../assets/brand/tpm-logo.png');

// natural proportions of the file
const RATIO = 2.6;

export function TpmMark({ size = 26 }: { size?: number; color?: string }) {
  return (
    <View pointerEvents="none">
      <Image
        source={LOGO}
        style={{ width: size * RATIO, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}

// In the tab bar the mark sits inside a square, scaled to fit its width.
export function TpmIcon({ size = 24, color }: { size?: number; color?: string }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        // fades when the tab is not selected, since the mark cannot be recoloured
        opacity: color && color !== '#D6221F' ? 0.4 : 1,
      }}
    >
      <Image
        source={LOGO}
        style={{ width: size * 1.9, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}
