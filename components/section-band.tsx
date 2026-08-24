// A ground under a section, with no edges.
//
// The explore page is six sections on one colour, and past a certain length
// that reads as one long pour rather than a sequence. The usual fix is to
// put things in boxes, which is worse: boxes make a page of cards.
//
// This is the other option. A gradient from nothing, to a faint warm ground,
// to nothing — so a section sits on something without ever having a line
// around it. Scrolling past, you feel the page change weight rather than see
// a border.
//
// Used deliberately, not everywhere. Sections that already carry their own
// edge — the history spine, the culture panel, the language frame — get
// none. Only the ones that would otherwise float.
//
// It bleeds past the page's own padding with negative insets, which iOS
// renders fine. Android clips absolutely positioned children to the parent's
// bounds, so if the band ever stops reaching the screen edge there, it needs
// hoisting into the page background instead.

import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { spacing } from '@/constants/zand-theme';

const NONE = 'rgba(196,180,170,0)';
const GROUND = 'rgba(196,180,170,0.20)';

export function SectionBand({
  bleed = spacing.lg,
  top = 36,
  bottom = 36,
}: {
  /** How far past the page's horizontal padding to reach. */
  bleed?: number;
  top?: number;
  bottom?: number;
}) {
  return (
    <LinearGradient
      pointerEvents="none"
      colors={[NONE, GROUND, GROUND, NONE]}
      // The long flat middle is what keeps it from reading as a glow; the
      // fade happens only in the outer fifth at each end.
      locations={[0, 0.2, 0.8, 1]}
      style={[styles.band, { left: -bleed, right: -bleed, top: -top, bottom: -bottom }]}
    />
  );
}

const styles = StyleSheet.create({
  band: { position: 'absolute' },
});
