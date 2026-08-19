# -*- coding: utf-8 -*-
# Drag the sheet away.
#
# Tapping a small strip of exposed map to dismiss a panel is a hard
# target and an unobvious one. Dragging it down is what the shape of the
# thing suggests, so that is what it should do: follow the finger, close
# past a threshold, spring back short of it.
#
# The responder only claims vertical drags. A horizontal one belongs to
# the photo carousel inside, and claiming both is how the two end up
# fighting.

import re

p = "app/local-map.tsx"
s = open(p).read()
did = []

# ---- the gesture ----
a = "  const sheetFade = useRef(new Animated.Value(0)).current;"
b = """  const sheetFade = useRef(new Animated.Value(0)).current;

  // How far down the sheet has been dragged. Separate from the fade so
  // the two can be driven independently: the fade is the open and close
  // animation, this is the finger.
  const dragY = useRef(new Animated.Value(0)).current;

  const sheetPan = useRef(
    PanResponder.create({
      // Claim only a downward drag, and only once it is clearly vertical
      // — otherwise a swipe across the photograph gets swallowed.
      onMoveShouldSetPanResponder: (_e, g) =>
        g.dy > 6 && Math.abs(g.dy) > Math.abs(g.dx) * 1.6,
      onPanResponderMove: (_e, g) => {
        if (g.dy > 0) dragY.setValue(g.dy);
      },
      onPanResponderRelease: (_e, g) => {
        // far enough, or thrown hard enough
        const gone = g.dy > 110 || g.vy > 0.9;
        if (gone) {
          Animated.timing(dragY, { toValue: 420, duration: 180, useNativeDriver: true })
            .start(() => {
              setSheet(false);
              dragY.setValue(0);
            });
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 6,
            speed: 14,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragY, { toValue: 0, useNativeDriver: true }).start();
      },
    }),
  ).current;"""
if a in s:
    s = s.replace(a, b, 1); did.append("responder")

# ---- attach it, and follow the finger ----
a2 = """          <Animated.View
            style={[
              s.sheet,
              {
                opacity: sheetFade,
                // a short rise as it fades, so it reads as coming from
                // the card rather than materialising
                transform: [{ translateY: sheetFade.interpolate({ inputRange: [0, 1], outputRange: [26, 0] }) }],
              },
            ]}
          >
            <View style={s.grab} />"""
b2 = """          <Animated.View
            {...sheetPan.panHandlers}
            style={[
              s.sheet,
              {
                opacity: sheetFade,
                transform: [
                  // the open animation and the drag, added together
                  { translateY: Animated.add(
                    sheetFade.interpolate({ inputRange: [0, 1], outputRange: [26, 0] }),
                    dragY,
                  ) },
                ],
              },
            ]}
          >
            {/* a wider grip than the bar itself, so the drag is easy to
                start without aiming */}
            <View style={s.grabZone}>
              <View style={s.grab} />
            </View>"""
if a2 in s:
    s = s.replace(a2, b2, 1); did.append("attached")

# ---- styles and import ----
if "grabZone:" not in s:
    s = s.replace("  grab: {", "  grabZone: { paddingTop: 4, paddingBottom: 10, alignItems: 'center' },\n  grab: {", 1)
    did.append("styles")

m = re.search(r"import \{([^}]*)\} from 'react-native';", s)
if m and "PanResponder" not in m.group(1):
    s = s.replace(m.group(0), m.group(0).replace("Platform,", "PanResponder, Platform,"), 1)
    did.append("import")

open(p, "w").write(s)
print("applied:", " | ".join(did) if did else "nothing matched")
