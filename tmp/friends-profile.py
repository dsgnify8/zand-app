# -*- coding: utf-8 -*-
# Three changes to the profile, and one to sending.
#
#   1. The You-tab alert shows the thing that arrived, the way the home
#      screen does. It was showing a note field that real rows do not
#      have, so it rendered a name and then a gap.
#
#   2. The friends tab leads with what is waiting rather than with a
#      pitch. Someone who already has friends does not need to be told
#      what friends are for.
#
#   3. Adding a friend moves to a plus beside "Your people", where you
#      would look for it, instead of a full-width button above
#      everything.
#
#   4. The push carries the sender's name, which it was not doing —
#      sendItem is given the name at the call site rather than looking
#      it up, since the caller already knows who they are.

import re

did = []

# ---- 1. the alert ----
p = "app/(tabs)/profile.tsx"
s = open(p).read()

a = """            <Text style={s.alertX}>
              {pending.length > 1 ? 'and ' + (pending.length - 1) + ' more waiting' : pending[0].note}
            </Text>"""
b = """            {/* what actually arrived: the Persian and its meaning for a
                word, the title for anything else */}
            {(pending[0] as any).fa ? (
              <View style={s.alertWord}>
                <Text style={s.alertFa}>{(pending[0] as any).fa}</Text>
                {(pending[0] as any).tr ? <Text style={s.alertTr}>{(pending[0] as any).tr}</Text> : null}
                {(pending[0] as any).en ? <Text style={s.alertEn}>{(pending[0] as any).en}</Text> : null}
              </View>
            ) : (pending[0] as any).title ? (
              <Text style={s.alertX}>{(pending[0] as any).title}</Text>
            ) : (pending[0] as any).note ? (
              <Text style={s.alertX}>{(pending[0] as any).note}</Text>
            ) : null}
            {pending.length > 1 ? (
              <Text style={s.alertMore}>and {pending.length - 1} more waiting</Text>
            ) : null}"""
if a in s:
    s = s.replace(a, b, 1); did.append("alert shows the item")

# ---- 2 and 3. the friends tab ----
a2 = """      <View style={s.frHero}>
        <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <Text style={s.frHeroFa}>بفرست</Text>
        <Text style={s.frHeroT}>{t(PROFILE.teachEachOther)}</Text>
        <Text style={s.frHeroX}>Send a friend anything worth learning: a word, a poet, a place, a story. They learn it, then send one back.</Text>
      </View>

      <Pressable style={s.frMainBtn} onPress={() => setFriendsOpen(true)}>
        <Ionicons name="person-add" size={17} color="#FFF" />
        <Text style={s.frMainBtnT}>{t(PROFILE.findFriends)}</Text>
        {incoming.length > 0 ? (<View style={s.frBadge}><Text style={s.frBadgeT}>{incoming.length}</Text></View>) : null}
      </Pressable>
"""
b2 = """      {/* The pitch only shows to someone who has nobody yet. With
          friends and things arriving, the page leads with those. */}
      {!hasActivity ? (
        <>
          <View style={s.frHero}>
            <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
            <Text style={s.frHeroFa}>بفرست</Text>
            <Text style={s.frHeroT}>{t(PROFILE.teachEachOther)}</Text>
            <Text style={s.frHeroX}>Send a friend anything worth learning: a word, a poet, a place, a story. They learn it, then send one back.</Text>
          </View>

          <Pressable style={s.frMainBtn} onPress={() => setFriendsOpen(true)}>
            <Ionicons name="person-add" size={17} color="#FFF" />
            <Text style={s.frMainBtnT}>{t(PROFILE.findFriends)}</Text>
          </Pressable>
        </>
      ) : null}
"""
if a2 in s:
    s = s.replace(a2, b2, 1); did.append("hero only when empty")

# the plus lives on the Your people row
a3 = """          <Text style={s.sectionLabel}>{t(PROFILE.yourPeople)}</Text>"""
b3 = """          <View style={s.peopleRow}>
            <Text style={[s.sectionLabel, { marginTop: 0 }]}>{t(PROFILE.yourPeople)}</Text>
            <Pressable hitSlop={10} onPress={() => setFriendsOpen(true)} style={s.plus}>
              <Ionicons name="add" size={16} color={pr.friendA} />
            </Pressable>
          </View>"""
if a3 in s:
    s = s.replace(a3, b3, 1); did.append("plus on your people")

if "peopleRow:" not in s:
    s = s.replace("  sectionLabel: {", """  peopleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl, marginBottom: spacing.sm },
  plus: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  alertWord: { marginTop: 6 },
  alertFa: { fontFamily: fonts.persian, fontSize: 20, color: pr.ink },
  alertTr: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, marginTop: 1 },
  alertEn: { fontFamily: fonts.bodyStrong, fontSize: 13, color: pr.ink, marginTop: 3 },
  alertMore: { fontFamily: fonts.body, fontSize: 11.5, color: pr.dim, marginTop: 5 },
  sectionLabel: {""", 1)
    did.append("styles")

open(p, "w").write(s)

# ---- 4. the sender's name reaches the push ----
p = "components/profile-modals.tsx"
s = open(p).read()
a4 = "      sendItem({ sender: user.id, recipient: toId, ...payload }).catch(() => {});"
b4 = "      sendItem({ sender: user.id, recipient: toId, senderName: displayName, ...payload }).catch(() => {});"
if a4 in s:
    s = s.replace(a4, b4, 1); open(p, "w").write(s); did.append("sender name on send")

p = "lib/inbox.ts"
s = open(p).read()
a5 = "  sender: string; recipient: string; kind: string;"
b5 = "  sender: string; recipient: string; kind: string; senderName?: string;"
if a5 in s:
    s = s.replace(a5, b5, 1)
    # the column does not exist, so it must not reach the insert
    a6 = "  const res = await supabase.from('sent_items').insert(payload);"
    b6 = """  const { senderName, ...row } = payload as any;
  const res = await supabase.from('sent_items').insert(row);"""
    if a6 in s: s = s.replace(a6, b6, 1)
    s = s.replace("((payload as any).senderName ?? 'A friend')", "(senderName ?? 'A friend')", 1)
    open(p, "w").write(s); did.append("inbox accepts the name")

print("applied:", " | ".join(did) if did else "nothing")
