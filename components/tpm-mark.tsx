import { Image, View } from 'react-native';

// The Persian Mag's own mark, as supplied. Two files rather than one
// tinted: the red is theirs and the white is theirs, and tinting a mark
// someone else designed is a decision that is not ours to make.
const LOGO_RED = require('../assets/brand/tpm-logo-red.png');
const LOGO_WHITE = require('../assets/brand/tpm-logo-white.png');

// natural proportions of the file
// The cropped file's true proportions. The original was a print-ready
// A4 with the mark floating in the middle, so `contain` fitted the whole
// page into the box and the logo arrived small and surrounded by nothing.
const RATIO = 2000 / 900;

export function TpmMark({ size = 26, white }: { size?: number; color?: string; white?: boolean }) {
  return (
    <View pointerEvents="none">
      <Image
        source={white ? LOGO_WHITE : LOGO_RED}
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
        source={LOGO_RED}
        style={{ width: size * 1.9, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}
