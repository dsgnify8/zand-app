// Marks for the founder stories.
//
// Ten thin-line drawings, chosen by the business id rather than by anyone
// picking. Two listings side by side get different marks, every story looks
// considered, and nobody has to make a decision when they submit a listing.
//
// Deliberately drawn rather than iconography off the shelf: these are the
// objects a Persian business is actually built around — the samovar in the
// corner, the pomegranate on the counter, the carpet under the table — and
// no icon set has them.
//
// They sit behind the text as a watermark. Large, faint, and never
// competing with the words: the story is the thing, the mark is the paper
// it is printed on.

import Svg, { Circle, Ellipse, Line, Path, Rect } from 'react-native-svg';

export type MotifName =
  | 'samovar' | 'pomegranate' | 'teaglass' | 'knot' | 'tilestar'
  | 'arch' | 'cypress' | 'chang' | 'saffron' | 'bowl';

export const MOTIFS: MotifName[] = [
  'samovar', 'pomegranate', 'teaglass', 'knot', 'tilestar',
  'arch', 'cypress', 'chang', 'saffron', 'bowl',
];

/**
 * A stable mark for a given id.
 *
 * Summing the characters rather than using the raw string means two ids
 * that differ only slightly still land on different motifs.
 */
export function motifFor(id: string | undefined): MotifName {
  if (!id) return 'tilestar';
  let n = 0;
  for (let i = 0; i < id.length; i++) n = (n + id.charCodeAt(i) * (i + 1)) % 9973;
  return MOTIFS[n % MOTIFS.length];
}

export function Motif({
  name,
  size = 220,
  color = '#8C3A2E',
  opacity = 0.07,
  strokeWidth = 1.5,
}: {
  name: MotifName;
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const p = { stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" opacity={opacity}>
      {name === 'samovar' ? (
        <>
          {/* body, tapering to the lid */}
          <Path d="M34 40 C34 26 66 26 66 40 L68 72 C68 80 32 80 32 72 Z" {...p} />
          <Path d="M40 26 C40 18 60 18 60 26" {...p} />
          <Circle cx="50" cy="16" r="3.5" {...p} />
          {/* tap */}
          <Path d="M68 58 L78 58 L78 64" {...p} />
          <Path d="M74 64 L82 64" {...p} />
          {/* handles */}
          <Path d="M32 46 C24 46 24 58 32 58" {...p} />
          <Path d="M68 46 C76 46 76 58 68 58" {...p} />
          <Path d="M28 80 L72 80" {...p} />
        </>
      ) : null}

      {name === 'pomegranate' ? (
        <>
          <Path d="M50 26 C74 26 82 48 76 66 C70 84 30 84 24 66 C18 48 26 26 50 26 Z" {...p} />
          {/* crown */}
          <Path d="M44 26 L42 14 L48 20 L50 10 L52 20 L58 14 L56 26" {...p} />
          {/* seeds, sparse enough to read as suggestion */}
          <Circle cx="42" cy="52" r="3" {...p} />
          <Circle cx="54" cy="48" r="3" {...p} />
          <Circle cx="60" cy="60" r="3" {...p} />
          <Circle cx="46" cy="66" r="3" {...p} />
        </>
      ) : null}

      {name === 'teaglass' ? (
        <>
          {/* the estekan: waisted, never straight-sided */}
          <Path d="M36 24 C36 24 32 44 40 56 L42 78 L58 78 L60 56 C68 44 64 24 64 24 Z" {...p} />
          <Path d="M36 24 L64 24" {...p} />
          <Ellipse cx="50" cy="84" rx="18" ry="4" {...p} />
          {/* steam */}
          <Path d="M44 18 C48 14 44 10 48 6" {...p} />
          <Path d="M56 18 C60 14 56 10 60 6" {...p} />
        </>
      ) : null}

      {name === 'knot' ? (
        <>
          {/* a carpet knot, interlaced */}
          <Path d="M30 40 C30 26 50 26 50 40 C50 54 70 54 70 40" {...p} />
          <Path d="M30 60 C30 74 50 74 50 60 C50 46 70 46 70 60" {...p} />
          <Line x1="20" y1="30" x2="80" y2="30" {...p} />
          <Line x1="20" y1="70" x2="80" y2="70" {...p} />
          <Line x1="20" y1="30" x2="20" y2="70" {...p} />
          <Line x1="80" y1="30" x2="80" y2="70" {...p} />
        </>
      ) : null}

      {name === 'tilestar' ? (
        <>
          {/* the eight-point star of a tiled wall */}
          <Path d="M50 12 L61 28 L79 22 L73 40 L88 50 L73 60 L79 78 L61 72 L50 88 L39 72 L21 78 L27 60 L12 50 L27 40 L21 22 L39 28 Z" {...p} />
          <Circle cx="50" cy="50" r="12" {...p} />
        </>
      ) : null}

      {name === 'arch' ? (
        <>
          {/* a pointed arch, the shape of every doorway */}
          <Path d="M24 88 L24 46 C24 26 50 8 50 8 C50 8 76 26 76 46 L76 88" {...p} />
          <Path d="M34 88 L34 50 C34 34 50 22 50 22 C50 22 66 34 66 50 L66 88" {...p} />
          <Line x1="16" y1="88" x2="84" y2="88" {...p} />
        </>
      ) : null}

      {name === 'cypress' ? (
        <>
          {/* the leaning cypress of a carpet border */}
          <Path d="M50 84 C34 74 32 46 44 26 C48 18 52 12 52 12 C52 12 62 24 64 40 C66 58 60 76 50 84 Z" {...p} />
          <Line x1="50" y1="84" x2="50" y2="92" {...p} />
          <Line x1="42" y1="92" x2="58" y2="92" {...p} />
        </>
      ) : null}

      {name === 'chang' ? (
        <>
          {/* the harp Rudaki played */}
          <Path d="M26 86 C26 46 50 18 76 12" {...p} />
          <Line x1="26" y1="86" x2="72" y2="86" {...p} />
          <Line x1="38" y1="86" x2="42" y2="52" {...p} />
          <Line x1="48" y1="86" x2="54" y2="38" {...p} />
          <Line x1="58" y1="86" x2="64" y2="26" {...p} />
          <Line x1="68" y1="86" x2="74" y2="16" {...p} />
        </>
      ) : null}

      {name === 'saffron' ? (
        <>
          {/* crocus: six petals and the three threads that matter */}
          <Path d="M50 52 C42 40 42 24 50 14 C58 24 58 40 50 52 Z" {...p} />
          <Path d="M50 52 C38 48 26 36 24 24 C38 26 48 38 50 52 Z" {...p} />
          <Path d="M50 52 C62 48 74 36 76 24 C62 26 52 38 50 52 Z" {...p} />
          <Line x1="50" y1="52" x2="50" y2="88" {...p} />
          <Line x1="50" y1="62" x2="38" y2="74" {...p} />
          <Line x1="50" y1="62" x2="62" y2="74" {...p} />
        </>
      ) : null}

      {name === 'bowl' ? (
        <>
          {/* a bowl with a rim pattern, the way they are painted */}
          <Path d="M18 42 C18 70 34 82 50 82 C66 82 82 70 82 42 Z" {...p} />
          <Line x1="14" y1="42" x2="86" y2="42" {...p} />
          <Path d="M26 34 L34 26 L42 34 L50 26 L58 34 L66 26 L74 34" {...p} />
          <Path d="M30 56 C38 62 62 62 70 56" {...p} />
        </>
      ) : null}
    </Svg>
  );
}
