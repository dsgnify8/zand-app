import Svg, { Rect } from 'react-native-svg';
import { View } from 'react-native';

export function SvgTest() {
  return (
    <View style={{ alignItems: 'center', marginVertical: 24 }}>
      <Svg width={120} height={120} viewBox="0 0 100 100">
        <Rect x="10" y="10" width="80" height="80" fill="red" />
      </Svg>
    </View>
  );
}
