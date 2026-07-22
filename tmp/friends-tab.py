# -*- coding: utf-8 -*-
p = "app/(tabs)/profile.tsx"
s = open(p).read()

# 1. imports
if "useFriends" not in s:
    s = s.replace("import { useAuth } from '@/lib/auth';",
                  "import { useAuth } from '@/lib/auth';\nimport { useFriends, acceptRequest, removeFriendship } from '@/lib/friends';\nimport { FriendsSheet } from '@/components/friends-sheet';")

# 2. Replace the whole FriendsTab function body up to YOUR PEOPLE list.
# We find "function FriendsTab() {" and replace until the marker just before its closing.
start = s.find("function FriendsTab() {")
# find the end of FriendsTab: the next "\nfunction " after start
end = s.find("\nfunction ", start + 10)
# also could end at "/* ---------------- Progress" — find whichever comes first
alt = s.find("/* ---------------- Progress", start)
if alt != -1 and alt < end:
    end = alt

new_fn = '''function FriendsTab() {
  const { user } = useAuth();
  const { accepted, incoming, refresh } = useFriends(user?.id);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [sendTo, setSendTo] = useState<string | null>(null);

  return (
    <>
      <View style={s.frHero}>
        <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <Text style={s.frHeroFa}>\\u0628\\u0641\\u0631\\u0633\\u062a</Text>
        <Text style={s.frHeroT}>Teach each other</Text>
        <Text style={s.frHeroX}>Send a friend anything worth learning: a word, a poet, a place, a story. They learn it, then send one back.</Text>
      </View>

      <Pressable style={s.frMainBtn} onPress={() => setFriendsOpen(true)}>
        <Ionicons name="people" size={18} color="#FFF" />
        <Text style={s.frMainBtnT}>Find &amp; add friends</Text>
        {incoming.length > 0 ? (
          <View style={s.frBadge}><Text style={s.frBadgeT}>{incoming.length}</Text></View>
        ) : null}
      </Pressable>

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

      <Text style={s.sectionLabel}>YOUR PEOPLE</Text>
      {accepted.length === 0 ? (
        <Text style={s.friendEmpty}>No friends yet. Tap the button above to find people and send a request.</Text>
      ) : (
        <View style={{ gap: spacing.sm }}>
          {accepted.map((r) => (
            <Pressable key={r.id} style={s.friendRow} onPress={() => setSendTo(r.profile.name)}>
              <View style={[s.avatar, s.avatarSm]}><Text style={s.avatarT}>{(r.profile.name || \\'?\\')[0].toUpperCase()}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.friendN}>{r.profile.name}</Text>
                <Text style={s.friendL}>@{r.profile.handle}</Text>
              </View>
              <Ionicons name="paper-plane-outline" size={16} color={pr.friendA} />
            </Pressable>
          ))}
        </View>
      )}

      <SendSheet open={sendTo !== null} onClose={() => setSendTo(null)} to={sendTo ?? \\'\\'} />
      <FriendsSheet open={friendsOpen} onClose={() => { setFriendsOpen(false); refresh(); }} />
    </>
  );
}

'''
s = s[:start] + new_fn + s[end+1:]
open(p, "w").write(s)
print("FriendsTab replaced")
