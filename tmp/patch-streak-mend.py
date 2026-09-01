# The line under the streak.
#
# It said one thing — days to your first week — and then nothing at all
# from day seven onward, which is exactly when someone has proved they
# will keep coming and is most worth speaking to.
#
# Now it always has something true to say: the next milestone, or the
# offer to mend a missed day. The offer is the interesting one — it is
# rare, it is claimed rather than applied, and claiming it fills the empty
# pip with a spring so the week visibly repairs itself.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


# --------------------------------------------------- the milestone line
sub("""/**
 * This week, Monday to Sunday, lit where they showed up.""",
"""/**
 * What to say under the number.
 *
 * A streak with nothing to reach for is a streak someone stops counting,
 * so this always names the next mark: the first week, a fortnight, a
 * month, a hundred days, then every hundred after that.
 */
function nextMark(days: number): string {
  const marks = [7, 14, 30, 60, 100];
  const target = marks.find((m) => m > days)
    ?? (Math.floor(days / 100) + 1) * 100;
  const left = target - days;
  const name =
    target === 7 ? 'your first week'
    : target === 14 ? 'two weeks'
    : target === 30 ? 'a month'
    : target === 60 ? 'two months'
    : target === 100 ? 'a hundred days'
    : target + ' days';
  return left === 1 ? '1 more day to ' + name : left + ' more days to ' + name;
}

/**
 * This week, Monday to Sunday, lit where they showed up.""",
    "nextMark")

# ----------------------------------------------------------- the offer
sub("""  const streakDays = demo ? ME.streak : ((realStats as any)?.streakDays ?? 0);""",
"""  const streakDays = demo ? ME.streak : ((realStats as any)?.streakDays ?? 0);

  // A single missed day, mendable once every sixty. Checked on render
  // rather than at boot so it appears the moment someone returns.
  const [mendable, setMendable] = useState<string | null>(null);
  const [mending, setMending] = useState(false);
  const mendPop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (demo) return;
    setMendable(mendableDay(visitedDays()));
  }, [demo, streakDays]);

  const claim = async () => {
    if (!mendable) return;
    setMending(true);
    const next = await mendDay(visitedDays(), mendable);
    // The pip springs in, then the number catches up.
    Animated.spring(mendPop, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }).start();
    setTimeout(() => { refreshStreakFromDays(next); setMendable(null); setMending(false); }, 320);
  };""",
    "offer state")

# ------------------------------------------------------------- the note
sub("""          <Text style={s.streakNote}>
            {demo
              ? ME.freezes + ' rest days left this month'
              : (realStats as any)?.streakNudge
              ? t(PROFILE.streakNudge)
              : streakDays < 7 && streakDays > 0
              ? (7 - streakDays) + ' more days to your first week'
              : ''}
          </Text>""",
"""          {/* The offer comes first when there is one: a missed day is
              the only thing here that expires. */}
          {mendable && !demo ? (
            <Pressable style={s.mend} onPress={claim} disabled={mending}>
              <Ionicons name="sparkles-outline" size={12} color={pr.streakA} />
              <Text style={s.mendT}>
                {mending ? 'Mending…' : 'You missed a day. Mend it?'}
              </Text>
            </Pressable>
          ) : (
            <Text style={s.streakNote}>
              {demo
                ? ME.freezes + ' rest days left this month'
                : streakDays > 0
                ? nextMark(streakDays)
                : ''}
            </Text>
          )}""",
    "note")

# ----------------------------------------------------------- the styles
sub("  streakNote: {",
"""  // Small, and quiet enough that it reads as an offer rather than an
  // alert. Nothing has gone wrong; something can be put right.
  mend: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    alignSelf: 'flex-start', marginTop: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4,
  },
  mendT: { fontFamily: fonts.bodyStrong, fontSize: 10.5, color: pr.streakA },

  streakNote: {""",
    "styles")

open(p, "w").write(s)
print("total:", total)
