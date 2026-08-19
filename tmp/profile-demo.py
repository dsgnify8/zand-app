# -*- coding: utf-8 -*-
# The last of the seeded data on the profile.
#
# A new account should find an empty app, not a stranger's history. Three
# places were still reaching for the demo constants unconditionally: the
# alert at the top of You, the word card beneath it, and the progress
# page's milestones.
#
# Where something is empty, it says what would fill it and offers a way
# there — an empty shelf that explains itself is better than one
# pretending to hold someone else's books.

import re

p = "app/(tabs)/profile.tsx"
s = open(p).read()
did = []

# ---- 1. the alert at the top of You ----
a = "  const pending = INBOX.filter((i) => !i.done);"
b = """  // Real things waiting: a friend request, or something sent that has
  // not been opened. Seeded items only stand in for a visitor.
  const { user: youUser } = useAuth();
  const youDemo = showDemoData(youUser?.email);
  const { incoming: youReq } = useFriends(youUser?.id);
  const { items: youInbox } = useInbox(youUser?.id);
  const pending = youDemo
    ? INBOX.filter((i) => !i.done)
    : [
        ...(youReq ?? []).map((r: any) => ({
          kind: 'friend', from: r.profile?.name ?? 'Someone', fromFa: r.profile?.name ?? '?',
          note: 'wants to connect', done: false,
        })),
        ...(youInbox ?? []).filter((i: any) => !i.done).map((i: any) => ({
          ...i, from: i.senderName ?? 'A friend', fromFa: i.senderName ?? '?',
        })),
      ];"""
if a in s:
    s = s.replace(a, b, 1); did.append("you alert")

# ---- 2. the word card ----
a2 = "            {INBOX.filter((x) => x.kind === 'word').slice(0, 1).map((i) => ("
b2 = """            {(youDemo
              ? INBOX.filter((x) => x.kind === 'word')
              : (youInbox ?? []).filter((x: any) => x.kind === 'word' && !x.done)
            ).slice(0, 1).map((i: any) => ("""
if a2 in s:
    s = s.replace(a2, b2, 1); did.append("word card")

# ---- 3. the progress page ----
for a3, b3 in [
 ("{FINISHED.map(", "{(progDemo ? FINISHED : ((progStats as any)?.finished ?? [])).map("),
 ("{STATS.map(", "{(progDemo ? STATS : realProgStats).map("),
]:
    if a3 in s:
        s = s.replace(a3, b3, 1); did.append(a3.strip("{.map("))

# the real figures, in the same shape the seeded ones use
a4 = "  const progStreak = progDemo ? ME.streak : ((progStats as any)?.streakDays ?? 0);"
b4 = """  const progStreak = progDemo ? ME.streak : ((progStats as any)?.streakDays ?? 0);
  const ps: any = progStats ?? {};
  const realProgStats = [
    { v: String(ps.lessonsFinished ?? 0), k: 'lessons finished' },
    { v: String(ps.wordsSolid ?? 0), k: 'words solid' },
    { v: String(ps.topicsFinished ?? 0), k: 'topics read' },
    { v: String(ps.articlesRead ?? 0), k: 'articles read' },
    { v: String(ps.thingsSaved ?? 0), k: 'things saved' },
    { v: String(ps.learnDays ?? 0), k: 'days learning' },
  ];"""
if a4 in s:
    s = s.replace(a4, b4, 1); did.append("real stats")

# ---- 4. the library count ----
a5 = "<Text style={s.libN}>{items.length}</Text>"
if a5 in s:
    did.append("library count already real")

open(p, "w").write(s)
print("applied:", " | ".join(did) if did else "nothing matched")
