// The wash at the top of Local.
//
// A photograph would compete with the listings, which are all photographs.
// A colour field does not: it gives the header somewhere to sit and warms
// the page without adding another thing to look at.
//
// Two gradients over it. A slight darkening at the very top so the status
// bar and the header controls stay legible whatever the image is doing
// underneath, and a long fade at the bottom into the page colour so there
// is no edge — the wash should end without anyone noticing where.
//
// Sized so the search field lands around a third of the way down, which
// leaves the first row of big cards half on screen. Something cut off at
// the fold is the clearest possible invitation to scroll.

import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '@/constants/zand-theme';

export function LocalHeroBg({ heightFactor = 0.58 }: { heightFactor?: number }) {
  const { height: H } = useWindowDimensions();
  const h = Math.round(H * heightFactor);

  return (
    <View pointerEvents="none" style={[st.wrap, { height: h }]}>
      <Image
        source={require('@/assets/local-hero.jpg')}
        style={StyleSheet.absoluteFill as any}
        resizeMode="cover"
      />

      {/* Legibility at the top, without making it look like a dark image. */}
      <LinearGradient
        colors={['rgba(38,26,20,0.22)', 'rgba(38,26,20,0.08)', 'transparent']}
        locations={[0, 0.4, 1]}
        style={[StyleSheet.absoluteFill as any, { height: h * 0.42 }]}
      />

      {/* The long way out. Three stops rather than two: a straight fade to
          the page colour leaves a visible band where the image stops. */}
      <LinearGradient
        colors={[
          'transparent',
          hexA(colors.background, 0.10),
          hexA(colors.background, 0.78),
          colors.background,
        ]}
        locations={[0, 0.42, 0.76, 1]}
        style={st.fade}
      />
    </View>
  );
}

/** #RRGGBB at an alpha, since the gradient needs rgba and the theme is hex. */
function hexA(hex: string, a: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

const st = StyleSheet.create({
  wrap: {
    // In the flow, not pinned. Absolute meant the wash stayed on the
    // viewport while the page scrolled under it, so every card below was
    // sitting on the image instead of on the page.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '68%' },
});
