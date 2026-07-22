# -*- coding: utf-8 -*-
p = "app/(tabs)/profile.tsx"
s = open(p).read()

# ensure imports
if "useFriends" not in s:
    s = s.replace("import { useAuth } from '@/lib/auth';",
                  "import { useAuth } from '@/lib/auth';\nimport { useFriends, acceptRequest, removeFriendship } from '@/lib/friends';\nimport { FriendsSheet } from '@/components/friends-sheet';")

# make sure INBOX and FRIENDS are still imported (they are, from constants/profile)
# replace the current (real-only) FriendsTab with the preview version
start = s.find("function FriendsTab() {")
end = s.find("/* ---------------- Progress", start)
if end == -1:
    end = s.find("\nfunction ProgressTab", start)

fn = '''function FriendsTab() {
  const { user } = useAuth();
  const { accepted, incoming, refresh } = useFriends(user?.id);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [sendTo, setSendTo] = useState<string | null>(null);

  const hasFriends = accepted.length > 0;

  return (
    <>
      <View style={s.frHero}>
        <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <Text style={s.frHeroFa}>\\u0628\\u0641\\u0631\\u0633\\u062a</Text>
        <Text style={s.frHeroT}>Teach each other</Text>
        <Text style={s.frHeroX}>Send a friend anything worth learning: a word, a poet, a place, a story. They learn it, then send one back.</Text>
      </View>

      <Pressable style={s.frMainBtn} onPress={() => setFriendsOpen(true)}>
        <Ionicons name="person-add" size={17} color="#FFF" />
        <Text style={s.frMainBtnT}>Find &amp; add friends</Text>
        {incoming.length > 0 ? (<View style={s.frBadge}><Text style={s.frBadgeT}>{incoming.length}</Text></View>) : null}
      </Pressable>

      {/* Real incoming requests (always live) */}
      {incoming.length > 0 ? (
        <>
          <Text style={s.sectionLabel}>REQUESTS</Text>
          <View style={{ gap: spacing.sm }}>
            {incoming.map((r) => (
              <View key={r.id} style={s.friendRow}>
                <View style={[s.avatar, s.avatarSm]}><Text style={s.avatarT}>{(r.profile.name || \\'?\\')[0].toUpperCase()}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN}>{r.profile.name}</Text>
                  <Text style={s.friendL}>wants to connect</Text>
                </View>
                <Pressable style={s.acceptBtn} onPress={async () => { await acceptRequest(r.id); refresh(); }}>
                  <Text style={s.acceptT}>Accept</Text>
                </Pressable>
                <Pressable hitSlop={8} onPress={async () => { await removeFriendship(r.id); refresh(); }}>
                  <Ionicons name="close" size={16} color={pr.dim} />
                </Pressable>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {/* Real accepted friends (if any) */}
      {hasFriends ? (
        <>
          <Text style={s.sectionLabel}>YOUR PEOPLE</Text>
          <View style={{ gap: spacing.sm }}>
            {accepted.map((r) => (
              <Pressable key={r.id} style={s.friendRow} onPress={() => setSendTo(r.profile.name)}>
                <View style={[s.avatar, s.avatarSm]}><Text style={s.avatarT}>{(r.profile.name || \\'?\\')[0].toUpperCase()}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN}>{r.profile.name}</Text>
                  <Text style={s.friendL}>Tap to send something</Text>
                </View>
                <Ionicons name="paper-plane-outline" size={16} color={pr.friendA} />
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {/* Preview of what the page becomes — locked when you have no friends,
          shown as a labelled example once you do. */}
      <View style={hasFriends ? undefined : s.previewWrap} pointerEvents={hasFriends ? \\'auto\\' : \\'none\\'}>
        <Text style={s.sectionLabel}>{hasFriends ? \\'AN EXAMPLE OF WHAT YOU CAN SEND\\' : \\'A PREVIEW\\'}</Text>
        <View style={{ gap: spacing.md, opacity: hasFriends ? 1 : 0.55 }}>
          {INBOX.slice(0, 1).map((i) => (
            <View key={i.key} style={s.inbox}>
              <View style={s.inboxTop}>
                <View style={s.avatar}><Text style={s.avatarT}>{i.fromFa[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.inboxFrom}>{i.from} sent you {KIND_LABEL[i.kind] ?? \\'something\\'}</Text>
                  <Text style={s.inboxWhen}>{i.when}</Text>
                </View>
                <View style={s.newDot} />
              </View>
              <View style={s.inboxCard}>
                {i.kind === \\'word\\' ? (
                  <>
                    <Text style={s.wordFa}>{i.fa}</Text>
                    <Text style={s.wordTr}>{i.tr}</Text>
                    <View style={s.wordRule} />
                    <Text style={s.wordEn}>{i.en}</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name={KIND_ICON_IN[i.kind] ?? \\'sparkles\\'} size={20} color={pr.friendA} />
                    <Text style={[s.wordTr, { marginTop: 6 }]}>{i.title}</Text>
                  </>
                )}
              </View>
              <Text style={s.inboxNote}>\\u201c{i.note}\\u201d</Text>
            </View>
          ))}
          <View style={{ gap: spacing.sm }}>
            {FRIENDS.slice(0, 2).map((f) => (
              <View key={f.key} style={s.friendRow}>
                <View style={[s.avatar, s.avatarSm]}><Text style={s.avatarT}>{f.persian[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN}>{f.name}</Text>
                  <Text style={s.friendL}>{f.last}</Text>
                </View>
                <View style={s.friendStreak}>
                  <Ionicons name="leaf" size={11} color={pr.streakA} />
                  <Text style={s.friendStreakT}>{f.streak}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {!hasFriends ? (
          <View style={s.previewOverlay} pointerEvents="box-none">
            <Pressable style={s.previewCard} onPress={() => setFriendsOpen(true)}>
              <Ionicons name="people" size={22} color={pr.friendA} />
              <Text style={s.previewT}>This is how it looks with friends</Text>
              <Text style={s.previewX}>Add someone to start sending words, poets, and places back and forth.</Text>
              <View style={s.previewBtn}><Text style={s.previewBtnT}>Find &amp; add friends</Text></View>
            </Pressable>
          </View>
        ) : null}
      </View>

      <SendSheet open={sendTo !== null} onClose={() => setSendTo(null)} to={sendTo ?? \\'\\'} />
      <FriendsSheet open={friendsOpen} onClose={() => { setFriendsOpen(false); refresh(); }} />
    </>
  );
}

'''
s = s[:start] + fn + s[end:]
open(p, "w").write(s)
print("FriendsTab preview version written")
