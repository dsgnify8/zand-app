// The tab bar's icons, drawn rather than set.
//
// Ionicons and Feather both render from a font, so their stroke weight is
// baked into the glyph and no prop will thin it. These are SVG paths at a
// single hairline weight, which is the only way to the line quality we
// wanted — light enough to sit under the label rather than compete.
//
// Each is drawn on a 24-grid and scales from there. Stroke stays visually
// constant because vectorEffect is not available in react-native-svg; the
// width is instead scaled against the size so a larger icon does not
// arrive with a heavier line.

import Svg, { Path, Circle } from 'react-native-svg';

type Props = { size?: number; color?: string; weight?: number };

/** A hairline at any size: 1.1 at 24pt, scaled proportionally. */
const w = (size: number, weight?: number) => (weight ?? 1.1) * (size / 24);

export function HomeIcon({ size = 24, color = '#000', weight }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.5 10.2 12 3.5l8.5 6.7V20a.9.9 0 0 1-.9.9h-4.4v-6.2H8.8v6.2H4.4a.9.9 0 0 1-.9-.9z"
        stroke={color}
        strokeWidth={w(size, weight)}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function LearnIcon({ size = 24, color = '#000', weight }: Props) {
  // An open book: two leaves meeting at a spine.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.4C10.3 5.1 8.2 4.5 5.6 4.5c-.9 0-1.6.1-2.1.2v13.6c.5-.1 1.2-.2 2.1-.2 2.6 0 4.7.6 6.4 1.9 1.7-1.3 3.8-1.9 6.4-1.9.9 0 1.6.1 2.1.2V4.7c-.5-.1-1.2-.2-2.1-.2-2.6 0-4.7.6-6.4 1.9z"
        stroke={color}
        strokeWidth={w(size, weight)}
        strokeLinejoin="round"
      />
      <Path d="M12 6.4v13.6" stroke={color} strokeWidth={w(size, weight)} strokeLinecap="round" />
    </Svg>
  );
}

export function ExploreIcon({ size = 24, color = '#000', weight }: Props) {
  // A compass: circle and needle.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth={w(size, weight)} />
      <Path
        d="m15.2 8.8-1.7 4.7-4.7 1.7 1.7-4.7z"
        stroke={color}
        strokeWidth={w(size, weight)}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LocalIcon({ size = 24, color = '#000', weight }: Props) {
  // A shopfront: awning over a doorway.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 9.6h16V19a.9.9 0 0 1-.9.9H4.9A.9.9 0 0 1 4 19z"
        stroke={color}
        strokeWidth={w(size, weight)}
        strokeLinejoin="round"
      />
      <Path
        d="M3.2 9.6 5 4.6h14l1.8 5"
        stroke={color}
        strokeWidth={w(size, weight)}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <Path
        d="M9.8 19.9v-5.3h4.4v5.3"
        stroke={color}
        strokeWidth={w(size, weight)}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ProfileIcon({ size = 24, color = '#000', weight }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8.4" r="3.9" stroke={color} strokeWidth={w(size, weight)} />
      <Path
        d="M4.8 20.4a7.2 7.2 0 0 1 14.4 0"
        stroke={color}
        strokeWidth={w(size, weight)}
        strokeLinecap="round"
      />
    </Svg>
  );
}
