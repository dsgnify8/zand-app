// A listing's photographs, in the order they will appear.
//
// The first one is the cover — on the card, on the map, on the website —
// so the order is not decoration. Somebody has to be able to say which
// picture speaks for their shop.
//
// Rebuilt on Reanimated after a PanResponder version that fought the
// rail's own scrolling, moved nothing aside, and snapped on release.
// Those three faults were one fault: the gesture ran on the JS thread, a
// frame behind the finger, with no way to tell the other photographs
// what to do while it moved.
//
// Now: long press to lift, the others slide out of the way as you pass
// them, and the held one settles into the gap when you let go. All of it
// on the UI thread, which is the difference between smooth and glitchy.

import { useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';

const W = 116;
const GAP = 10;
const STEP = W + GAP;

// One spring for everything, so a photograph settling and a photograph
// stepping aside share a physics. Two would look like two animations.
const SETTLE = { damping: 20, stiffness: 220, mass: 0.6 };

export function PhotoRail({
  photos, resolve, onChange, onAdd, uploading, max = 10,
}: {
  photos: string[];
  /** Bundled keys and storage paths resolve differently; the caller knows which. */
  resolve: (p: string) => any;
  onChange: (next: string[]) => void;
  onAdd: () => void;
  uploading?: boolean;
  max?: number;
}) {
  // Which one is in the air. Kept on both threads: the gesture needs it
  // without a round trip, React needs it to stop the rail scrolling.
  const heldIndex = useSharedValue(-1);
  const [held, setHeld] = useState<number | null>(null);

  const dx = useSharedValue(0);
  const lift = useSharedValue(0);

  // Where the finger sits, in places rather than pixels. The other
  // photographs read this to decide whether to move.
  const slot = useSharedValue(-1);

  const commit = (from: number, to: number) => {
    if (from !== to && from >= 0 && to >= 0) {
      const next = [...photos];
      const [one] = next.splice(from, 1);
      next.splice(to, 0, one);
      onChange(next);
    }
    setHeld(null);
  };

  const drag = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, state) => {
      // Only once something has been lifted. Before that the touch
      // belongs to the rail, which should still scroll.
      if (heldIndex.value >= 0) state.activate();
      else state.fail();
    })
    .onUpdate((e) => {
      dx.value = e.translationX;
      const moved = Math.round(e.translationX / STEP);
      slot.value = Math.max(0, Math.min(photos.length - 1, heldIndex.value + moved));
    })
    .onEnd(() => {
      const from = heldIndex.value;
      const to = slot.value;

      // Settle into the gap rather than snapping home. The photograph is
      // already where it belongs; the reorder that follows brings the
      // list into agreement with what the eye has just seen.
      dx.value = withSpring((to - from) * STEP, SETTLE, () => {
        dx.value = 0;
        heldIndex.value = -1;
        slot.value = -1;
        lift.value = withTiming(0, { duration: 140 });
        runOnJS(commit)(from, to);
      });
    });

  const pickUp = Gesture.LongPress()
    .minDuration(200)
    .onStart((e) => {
      // Which one was pressed, from where the finger landed.
      const i = Math.floor(e.x / STEP);
      if (i < 0 || i >= photos.length) return;
      heldIndex.value = i;
      slot.value = i;
      lift.value = withSpring(1, SETTLE);
      runOnJS(setHeld)(i);
    });

  const gesture = Gesture.Simultaneous(pickUp, drag);

  const remove = (i: number) => onChange(photos.filter((_, n) => n !== i));

  return (
    <View>
      <GestureDetector gesture={gesture}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={held === null}
          contentContainerStyle={s.rail}
        >
          {photos.map((p, i) => (
            <Shot
              key={p}
              index={i}
              source={resolve(p)}
              heldIndex={heldIndex}
              slot={slot}
              dx={dx}
              lift={lift}
              isCover={i === 0}
              onRemove={() => remove(i)}
            />
          ))}

          {photos.length < max ? (
            <Pressable style={[s.shot, s.add]} onPress={onAdd} disabled={uploading}>
              {uploading ? (
                <ActivityIndicator size="small" color={colors.accent} />
              ) : (
                <>
                  <Ionicons name="add" size={20} color={colors.accent} />
                  <Text style={s.addT}>Add</Text>
                </>
              )}
            </Pressable>
          ) : null}
        </ScrollView>
      </GestureDetector>

      {photos.length > 1 ? (
        <Text style={s.hint}>
          {held === null
            ? 'Hold a photograph to move it. The first one is the cover.'
            : 'Drag left or right, then let go.'}
        </Text>
      ) : null}
    </View>
  );
}

/** One photograph, which knows how to get out of the way. */
function Shot({
  index, source, heldIndex, slot, dx, lift, isCover, onRemove,
}: any) {
  const style = useAnimatedStyle(() => {
    const from = heldIndex.value;

    // The one in the air: follows the finger, lifted and shadowed.
    if (from === index) {
      return {
        zIndex: 2,
        transform: [{ translateX: dx.value }, { scale: 1 + lift.value * 0.06 }],
        shadowOpacity: lift.value * 0.28,
        shadowRadius: 14 * lift.value,
      };
    }

    // Everyone else steps aside once the held one has passed over them.
    // This is what was missing before: without it the row stays still
    // and there is nowhere obvious to drop.
    let shift = 0;
    if (from >= 0) {
      const to = slot.value;
      if (from < index && index <= to) shift = -STEP;
      else if (to <= index && index < from) shift = STEP;
    }

    return {
      zIndex: 1,
      transform: [{ translateX: withSpring(shift, SETTLE) }, { scale: 1 }],
      shadowOpacity: 0,
      shadowRadius: 0,
    };
  });

  return (
    <Animated.View style={[s.shot, s.shadow, style]}>
      <Image source={source} style={StyleSheet.absoluteFill as any} />

      {/* The cover, said plainly. Otherwise nobody knows the first one is
          the one everybody sees. */}
      {isCover ? (
        <View style={s.cover}><Text style={s.coverT}>COVER</Text></View>
      ) : null}

      <Pressable style={s.x} onPress={onRemove} hitSlop={6}>
        <Ionicons name="close" size={13} color="#FFF" />
      </Pressable>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  rail: { gap: GAP, paddingVertical: spacing.md, paddingRight: spacing.lg },
  shot: {
    width: W, height: W * 1.25, borderRadius: 14, overflow: 'hidden',
    backgroundColor: 'rgba(40,28,24,0.06)',
  },
  // Set here so the animated style only has to change its strength.
  shadow: { shadowColor: '#2A1C14', shadowOffset: { width: 0, height: 8 } },

  x: {
    position: 'absolute', top: 5, right: 5,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: 'rgba(20,16,12,0.55)',
    alignItems: 'center', justifyContent: 'center',
  },
  cover: {
    position: 'absolute', left: 5, bottom: 5,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999,
    backgroundColor: 'rgba(20,16,12,0.55)',
  },
  coverT: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.2, color: '#FFF' },

  // Dashed, so it reads as a space rather than a photograph.
  add: {
    alignItems: 'center', justifyContent: 'center', gap: 3,
    borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(140,58,46,0.35)',
    backgroundColor: 'rgba(140,58,46,0.05)',
  },
  addT: { fontFamily: fonts.body, fontSize: 10.5, color: colors.accent },

  hint: {
    fontFamily: fonts.body, fontSize: 11.5, color: colors.textSecondary,
    marginTop: 2, marginBottom: spacing.sm,
  },
});
