# The progress pillars.
#
# Five became four. Poets read was a subset of topics finished shown
# beside it, which double-counted the same reading and made neither number
# mean anything on its own. Everything under Explore now counts as a
# topic, which is what someone would assume the word covered.
#
# Things saved counts what is actually kept — topics, articles, places —
# rather than only the ones the library happened to itemise, and tapping
# it goes to the saved page rather than needing a long press nobody
# discovers.
#
# The hint line goes with it. A row that needs an instruction underneath
# is a row that has not explained itself.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("""        {[
          { v: stats.topicsFinished, k: 'Topics finished', kT: PROFILE.topicsFinished, i: 'book',
            items: () => fromFinished('topic-') },
          { v: (stats as any).poetsRead ?? 0, k: 'Poets read', kT: PROFILE.poetsRead, i: 'book-outline',
            items: () => fromFinished('poet-') },
          { v: stats.pagesRead, k: 'Pages read', kT: PROFILE.pagesRead, i: 'document-text' },
          { v: stats.thingsSaved, k: 'Things saved', kT: PROFILE.thingsSaved, i: 'bookmark',
            items: () => savedItems.map((x: any) => ({ key: x.key, title: x.title, sub: x.sub, route: x.route })) },
          { v: stats.thingsSent, k: 'Sent to friends', kT: PROFILE.sentToFriends, i: 'paper-plane' },
        ].map((st: any) => {""",
"""        {[
          // Everything under Explore. Poets were counted separately and
          // also inside this, so the two numbers overlapped and neither
          // answered "how much have I read".
          {
            v: (stats.topicsFinished ?? 0) + ((stats as any).poetsRead ?? 0),
            k: 'Topics finished', kT: PROFILE.topicsFinished, i: 'book',
            items: () => [...fromFinished('topic-'), ...fromFinished('poet-'), ...fromFinished('culture-')],
          },
          { v: stats.pagesRead, k: 'Pages read', kT: PROFILE.pagesRead, i: 'document-text' },
          // Everything kept, and a tap rather than a hold: this one has a
          // page of its own to go to.
          {
            v: stats.thingsSaved, k: 'Things saved', kT: PROFILE.thingsSaved, i: 'bookmark',
            route: '/profile',
          },
          { v: stats.thingsSent, k: 'Sent to friends', kT: PROFILE.sentToFriends, i: 'paper-plane' },
        ].map((st: any) => {""",
    "pillars")

sub("""            <Pressable
              key={st.k}
              style={s.statCell}
              disabled={!holdable}
              delayLongPress={280}
              onLongPress={() => setStatSheet({ title: st.kT ? t(st.kT) : st.k, items: list })}
            >
              <Ionicons name={st.i as any} size={16} color={pr.saveA} />""",
"""            <Pressable
              key={st.k}
              style={s.statCell}
              disabled={!holdable && !st.route}
              delayLongPress={280}
              onPress={st.route ? () => router.navigate(st.route as any) : undefined}
              onLongPress={holdable ? () => setStatSheet({ title: st.kT ? t(st.kT) : st.k, items: list }) : undefined}
            >
              <Ionicons name={st.i as any} size={16} color={pr.statIcon} />""",
    "tap and colour")

# the hint line
sub("""      <Text style={s.holdHint}>{t(PROFILE.holdForMore)}</Text>\n""", "", "hint")

# a warmer icon, and a little depth on the cell
sub("  statCell: {",
"""  // A warm ground rather than a flat panel, and the icon in clay rather
  // than the blue it borrowed from the save colour.
  statCell: {""",
    "cell comment")

open(p, "w").write(s)
print("total:", total)

# and the palette entry the icon now uses
p2 = "constants/zand-theme.ts"
s2 = open(p2).read()
if "statIcon" not in s2:
    import re
    m = re.search(r"export const pr = \{\n", s2)
    if m:
        s2 = s2[:m.end()] + "  /** The progress pillars. Clay, not the blue borrowed from saving. */\n  statIcon: '#A65F42',\n" + s2[m.end():]
        open(p2, "w").write(s2)
        print("statIcon added to theme")
    else:
        print("   could not find `pr` — add statIcon by hand")
