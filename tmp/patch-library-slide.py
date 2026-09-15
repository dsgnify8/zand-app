# Closing the library the way iOS does it.
#
# The gesture worked but the page did not move: you swiped, nothing
# happened, and then the state flipped and the profile appeared. What
# makes the system gesture feel right is that the page is attached to
# your finger the whole way — it tracks you, and if you let go halfway it
# goes back rather than committing.
#
# So the content is translated by the drag, and on release it either
# springs home or continues off the edge and then unmounts. The unmount
# happens after the animation, not before, which is the difference
# between sliding away and vanishing.

import re

p = "app/(tabs)/profile.tsx"
s = open(p).read()

# ---------------------------------------------- the shared position
a = "  const [libView, setLibView] = useState<null | 'favourites' | 'saved'>(null);"
b = """  const [libView, setLibView] = useState<null | 'favourites' | 'saved'>(null);
  // How far the library has been dragged. Zero is open, the screen width
  // is gone; anything between is the finger mid-swipe.
  const libX = useSharedValue(0);
  const closeLib = () => { setLibView(null); libX.value = 0; };"""
print("shared value:", a in s)
s = s.replace(a, b, 1)

# ------------------------------------------- the gesture, rewritten
a = """      {libView ? (
        <GestureDetector
          gesture={Gesture.Pan()
            .activeOffsetX(20)
            .onEnd((e) => {
              if (e.translationX > 60) runOnJS(setLibView)(null);
            })}
        >
          <Reanimated.View style={s.swipeCatch} />
        </GestureDetector>
      ) : null}"""
b = """      {libView ? (
        <GestureDetector
          gesture={Gesture.Pan()
            .activeOffsetX(18)
            .onUpdate((e) => {
              // Follows the finger, and only rightward. Dragging left
              // would peel the page off the wrong edge.
              libX.value = Math.max(0, e.translationX);
            })
            .onEnd((e) => {
              // Past a third of the way, or thrown hard enough, it goes.
              // Otherwise it returns, which is what tells someone the
              // gesture was understood and declined.
              const far = e.translationX > SCREEN_W * 0.33;
              const fast = e.velocityX > 800;
              if (far || fast) {
                libX.value = withTiming(SCREEN_W, { duration: 180 }, (done) => {
                  if (done) runOnJS(closeLib)();
                });
              } else {
                libX.value = withSpring(0, { damping: 22, stiffness: 240 });
              }
            })}
        >
          <Reanimated.View style={s.swipeCatch} />
        </GestureDetector>
      ) : null}"""
print("gesture:", a in s)
s = s.replace(a, b, 1)

# ------------------------------------- and the content that follows
a = """      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        {tab === 'you' ? <YouTab onGoFriends={() => setTab('friends')} libView={libView} setLibView={setLibView} /> : null}"""
b = """      <Reanimated.View style={[{ flex: 1 }, libSlide]}>
      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        {tab === 'you' ? <YouTab onGoFriends={() => setTab('friends')} libView={libView} setLibView={closeLib} /> : null}"""
print("wrapper open:", a in s)
s = s.replace(a, b, 1)

a = """        {tab === 'progress' ? <ProgressTab /> : null}
      </ScrollView>"""
b = """        {tab === 'progress' ? <ProgressTab /> : null}
      </ScrollView>
      </Reanimated.View>"""
print("wrapper close:", a in s)
s = s.replace(a, b, 1)

# the animated style, declared next to the value it reads
a = "  const closeLib = () => { setLibView(null); libX.value = 0; };"
b = """  const closeLib = () => { setLibView(null); libX.value = 0; };

  // Only the library moves. The profile underneath does not travel with
  // it, because it is not going anywhere.
  const libSlide = useAnimatedStyle(() => ({
    transform: [{ translateX: libX.value }],
  }));"""
s = s.replace(a, b, 1)
print("animated style added")

# ------------------------------------------------------- imports
m = re.search(r"import Reanimated, \{([^}]*)\} from 'react-native-reanimated';", s)
if m:
    want = ["useSharedValue", "useAnimatedStyle", "withTiming", "withSpring"]
    add = [w for w in want if w not in m.group(1)]
    if add:
        s = s[:m.start(1)] + m.group(1).rstrip() + ", " + ", ".join(add) + " " + s[m.end(1):]
        print("imported:", ", ".join(add))

if "SCREEN_W" not in s.split("export default")[0]:
    m = re.search(r"^import .*from 'react-native';\n", s, re.M)
    s = s[:m.end()] + "\nconst SCREEN_W = Dimensions.get('window').width;\n" + s[m.end():]
    print("SCREEN_W declared")

m = re.search(r"import \{([^}]*)\} from 'react-native';", s, re.S)
if m and "Dimensions" not in m.group(1):
    s = s[:m.start(1)] + " Dimensions," + m.group(1) + s[m.end(1):]
    print("Dimensions imported")

open(p, "w").write(s)
