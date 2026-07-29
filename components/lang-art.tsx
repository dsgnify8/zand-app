import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';

import { lw } from '@/constants/lang-theme';

// Spot illustrations for the language world. Line art, one weight, sage.
// Objects rather than characters: a tea glass, a cypress, an arch, a pen.

type P = { size?: number; color?: string; faint?: string };

const base = (size = 120) => ({ width: size, height: size, viewBox: '0 0 120 120' });

/* A Persian tea glass in its saucer, with steam. */
export function ArtTea({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M20 44 L28 92 Q30 100 38 100 L62 100 Q70 100 72 92 L80 44 Z" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M22 56 L78 56" stroke={faint} strokeWidth={1.4} />
      <Ellipse cx="50" cy="44" rx="30" ry="6" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M14 108 Q50 116 86 108" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M42 28 q6 -8 0 -16 M52 30 q7 -9 0 -18 M62 28 q6 -8 0 -16" stroke={faint} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <Circle cx="96" cy="98" r="7" stroke={faint} strokeWidth={1.4} fill="none" />
    </Svg>
  );
}

/* A cypress, the tree that stands in every Persian garden and carpet. */
export function ArtCypress({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M60 12 C42 34 40 62 46 88 L74 88 C80 62 78 34 60 12 Z" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M60 20 L60 88" stroke={faint} strokeWidth={1.3} />
      <Path d="M60 34 q-8 6 -12 12 M60 34 q8 6 12 12 M60 52 q-9 6 -13 12 M60 52 q9 6 13 12" stroke={faint} strokeWidth={1.2} fill="none" />
      <Path d="M56 88 L56 104 L64 104 L64 88" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M34 104 L86 104" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

/* A pointed arch, the shape of every doorway worth walking through. */
export function ArtArch({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M28 104 L28 56 Q28 22 60 12 Q92 22 92 56 L92 104" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M40 104 L40 60 Q40 34 60 26 Q80 34 80 60 L80 104" stroke={faint} strokeWidth={1.4} fill="none" />
      <Path d="M60 26 L60 104" stroke={faint} strokeWidth={1.1} />
      <Path d="M20 104 L100 104" stroke={color} strokeWidth={1.6} />
      <Circle cx="60" cy="52" r="5" stroke={faint} strokeWidth={1.3} fill="none" />
    </Svg>
  );
}

/* A reed pen, the qalam, and a line of ink. */
export function ArtPen({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M92 20 L44 68 L34 86 L52 76 L100 28 Z" stroke={color} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <Path d="M86 26 L94 34" stroke={faint} strokeWidth={1.4} />
      <Path d="M44 68 L52 76" stroke={faint} strokeWidth={1.3} />
      <Path d="M18 100 q16 -8 32 0 t32 0" stroke={faint} strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

/* A pomegranate, split. Yalda, and every table in autumn. */
export function ArtPomegranate({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Circle cx="60" cy="66" r="34" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M60 32 L60 20 M60 20 l-8 -6 M60 20 l8 -6 M60 20 l0 -8" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <Circle cx="50" cy="58" r="3.4" stroke={faint} strokeWidth={1.2} fill="none" />
      <Circle cx="62" cy="54" r="3.4" stroke={faint} strokeWidth={1.2} fill="none" />
      <Circle cx="72" cy="62" r="3.4" stroke={faint} strokeWidth={1.2} fill="none" />
      <Circle cx="54" cy="70" r="3.4" stroke={faint} strokeWidth={1.2} fill="none" />
      <Circle cx="66" cy="74" r="3.4" stroke={faint} strokeWidth={1.2} fill="none" />
      <Circle cx="48" cy="80" r="3.4" stroke={faint} strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

/* An open book, for reading. */
export function ArtBook({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M60 34 Q42 24 18 28 L18 88 Q42 84 60 94 Q78 84 102 88 L102 28 Q78 24 60 34 Z" stroke={color} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <Path d="M60 34 L60 94" stroke={color} strokeWidth={1.5} />
      <Path d="M28 42 L48 40 M28 54 L48 52 M28 66 L44 64" stroke={faint} strokeWidth={1.3} strokeLinecap="round" />
      <Path d="M72 40 L92 42 M72 52 L92 54 M76 64 L92 66" stroke={faint} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

/* A moon and a star, for night and for the calendar. */
export function ArtMoon({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M74 22 A38 38 0 1 0 74 98 A30 30 0 1 1 74 22 Z" stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M88 40 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" stroke={faint} strokeWidth={1.3} fill="none" strokeLinejoin="round" />
      <Circle cx="94" cy="72" r="2.4" stroke={faint} strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

/* A samovar, for the house and the long conversation. */
export function ArtSamovar({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M40 30 L40 74 Q40 90 60 90 Q80 90 80 74 L80 30 Z" stroke={color} strokeWidth={1.6} fill="none" />
      <Ellipse cx="60" cy="30" rx="20" ry="5" stroke={color} strokeWidth={1.5} fill="none" />
      <Path d="M60 20 L60 26" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx="60" cy="17" r="3.5" stroke={faint} strokeWidth={1.3} fill="none" />
      <Path d="M80 50 L90 50 L90 60" stroke={color} strokeWidth={1.5} fill="none" />
      <Path d="M40 46 q-12 6 0 14" stroke={faint} strokeWidth={1.4} fill="none" />
      <Path d="M44 90 L44 100 M76 90 L76 100" stroke={color} strokeWidth={1.5} />
      <Path d="M32 100 L88 100" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

/* A bird in flight, light and unfussy. */
export function ArtBird({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M20 66 Q40 40 60 58 Q80 76 100 50" stroke={color} strokeWidth={1.7} fill="none" strokeLinecap="round" />
      <Path d="M34 82 Q52 62 70 76" stroke={faint} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <Circle cx="60" cy="58" r="2.6" stroke={color} strokeWidth={1.3} fill="none" />
    </Svg>
  );
}

/* A simple carpet medallion, for chapter markers. */
export function ArtMedallion({ size = 120, color = lw.green, faint = lw.greenPale }: P) {
  return (
    <Svg {...base(size)}>
      <Path d="M60 16 L86 60 L60 104 L34 60 Z" stroke={color} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <Path d="M60 30 L76 60 L60 90 L44 60 Z" stroke={faint} strokeWidth={1.4} fill="none" strokeLinejoin="round" />
      <Circle cx="60" cy="60" r="6" stroke={color} strokeWidth={1.4} fill="none" />
      <Path d="M24 60 L34 60 M86 60 L96 60" stroke={faint} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

const ART = {
  tea: ArtTea, cypress: ArtCypress, arch: ArtArch, pen: ArtPen,
  pomegranate: ArtPomegranate, book: ArtBook, moon: ArtMoon,
  samovar: ArtSamovar, bird: ArtBird, medallion: ArtMedallion,
};

export type ArtName = keyof typeof ART;

export function Art({ name, size = 120, color, faint, style }: {
  name: ArtName; size?: number; color?: string; faint?: string; style?: any;
}) {
  const C = ART[name] ?? ArtMedallion;
  return (
    <View style={style} pointerEvents="none">
      <C size={size} color={color} faint={faint} />
    </View>
  );
}
