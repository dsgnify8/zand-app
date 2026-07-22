import Svg, { Path, Circle, G } from 'react-native-svg';
import { View, StyleSheet, Text } from 'react-native';
import { colors, fonts, fontSize, spacing } from '@/constants/zand-theme';

// Accurate Iran outline, derived from public boundary data. viewBox 1000 x 762.
const IRAN_PATH = "M41.0 6.8 L74.9 40.3 L109.9 47.0 L132.4 45.3 L162.4 22.8 L206.0 4.0 L223.4 20.5 L211.8 27.8 L221.2 40.3 L209.3 43.0 L207.1 49.2 L224.1 60.7 L228.5 60.9 L238.2 71.3 L251.9 73.8 L255.8 97.6 L268.9 113.4 L321.8 124.6 L328.5 137.0 L366.4 157.2 L418.5 164.2 L517.5 148.0 L497.4 150.5 L518.6 152.4 L526.9 126.8 L557.8 116.8 L561.6 104.1 L576.8 94.0 L607.3 85.6 L637.2 87.1 L639.8 80.1 L648.2 78.4 L675.6 81.7 L682.3 77.4 L698.3 95.8 L733.4 103.1 L736.0 109.0 L743.7 110.9 L769.0 109.0 L793.5 116.9 L801.0 133.0 L830.6 143.9 L854.0 162.2 L888.9 164.2 L891.4 189.3 L887.3 197.2 L892.9 203.6 L894.5 219.9 L885.1 233.9 L881.6 257.2 L876.5 266.0 L864.8 272.3 L870.3 282.6 L861.7 284.2 L853.3 294.1 L857.8 320.3 L875.7 324.2 L858.0 351.1 L870.9 393.9 L872.3 429.4 L916.4 435.7 L922.3 454.7 L920.5 463.1 L876.0 517.8 L897.8 539.9 L910.7 566.1 L927.0 582.1 L951.9 588.7 L969.9 596.4 L971.3 598.8 L973.5 638.1 L972.3 649.5 L993.3 648.4 L999.1 655.2 L990.8 681.0 L952.9 684.5 L946.7 687.9 L944.3 695.2 L922.2 703.1 L918.1 723.6 L914.3 727.2 L910.3 754.7 L907.9 752.6 L892.5 759.4 L860.0 750.5 L855.6 741.9 L848.5 745.9 L851.6 750.0 L796.8 741.8 L777.5 744.3 L766.6 736.0 L744.6 733.6 L726.8 735.4 L720.6 728.8 L712.8 730.0 L688.4 723.7 L681.2 708.5 L683.0 703.1 L676.6 690.7 L673.2 668.4 L669.5 663.9 L669.7 662.0 L662.1 654.9 L626.8 653.5 L617.1 660.4 L601.8 663.3 L594.1 673.6 L581.1 673.2 L557.6 687.6 L536.5 680.7 L532.1 676.1 L499.8 674.6 L486.8 661.9 L443.7 642.3 L447.5 637.7 L435.6 628.1 L411.8 618.1 L381.5 610.2 L365.6 580.5 L363.7 569.8 L351.4 560.0 L356.6 560.6 L357.7 554.4 L342.9 549.1 L343.3 533.6 L317.4 509.1 L313.1 495.6 L284.3 503.1 L282.5 497.8 L270.4 497.6 L269.1 492.1 L265.7 494.1 L254.7 485.6 L269.0 487.5 L268.6 480.2 L255.8 480.3 L259.1 484.7 L251.7 488.7 L252.9 504.6 L230.1 506.4 L225.0 493.1 L207.1 480.6 L206.5 454.6 L189.7 442.1 L197.1 411.7 L180.0 394.5 L174.5 381.2 L157.7 377.0 L122.5 354.3 L106.8 351.1 L109.1 347.6 L105.4 344.8 L111.9 341.4 L110.2 336.7 L101.3 325.2 L96.0 324.3 L95.8 318.3 L88.7 320.2 L71.8 299.9 L79.2 291.2 L79.1 281.8 L73.1 275.3 L79.0 268.8 L87.6 270.1 L83.9 260.8 L91.3 251.8 L95.5 250.7 L98.7 242.5 L109.6 240.4 L110.8 235.4 L100.9 221.1 L103.7 211.6 L119.4 204.9 L88.9 204.9 L77.0 195.1 L67.6 195.7 L62.5 173.6 L54.6 173.0 L50.7 166.9 L51.6 157.8 L42.4 152.2 L44.9 142.3 L38.2 137.7 L39.6 127.3 L29.2 118.9 L28.2 104.6 L9.8 96.7 L22.6 73.4 L14.1 71.5 L10.7 47.0 L6.4 40.3 L6.9 31.3 L0.6 20.0 L20.2 17.5 L29.8 0.0 L41.0 6.8 Z";

const TEHRAN = { x: 382, y: 211 };

type Pin = { x: number; y: number; label?: string };

export function IranMap({
  fill,
  stroke,
  showTehran = false,
  pins = [],
  caption,
}: {
  fill?: string;
  stroke?: string;
  showTehran?: boolean;
  pins?: Pin[];
  caption?: string;
}) {
  return (
    <View style={styles.wrap}>
      <Svg width="100%" height={220} viewBox="0 0 1000 762">
        <G>
          <Path d={IRAN_PATH} fill={fill ?? colors.accent} stroke={stroke ?? colors.background} strokeWidth={4} strokeLinejoin="round" />
          {showTehran ? <Circle cx={TEHRAN.x} cy={TEHRAN.y} r={14} fill={colors.background} stroke={colors.accent} strokeWidth={5} /> : null}
          {pins.map((p, i) => (
            <Circle key={i} cx={p.x} cy={p.y} r={12} fill={colors.background} stroke={colors.accent} strokeWidth={4} />
          ))}
        </G>
      </Svg>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: spacing.lg, alignItems: 'center' },
  caption: { fontFamily: fonts.body, fontSize: fontSize.xs, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm, paddingHorizontal: spacing.lg },
});
