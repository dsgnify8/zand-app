# The exchange, both directions.
#
# Two changes to FriendsTab.
#
# 1. An inbox card opens the thing it is about. Marking a word learned used
#    to be the last time you could look at it; now the card is pressable
#    whatever its state, and only items with somewhere to go navigate — a
#    word has no page of its own, so its card stays the whole of it.
#
# 2. A "waiting for them / they learned it" section. Until now the app only
#    knew what had been sent *to* you, so half of every exchange was
#    invisible and there was no moment of "they got it" to close the loop.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
applied, skipped = 0, []


def sub(a, b, label):
    global s, applied
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(label)


# ---- read the outbox too --------------------------------------------
sub("  const { items: inbox, refresh: refreshInbox } = useInbox(user?.id);",
    "  const { items: inbox, refresh: refreshInbox } = useInbox(user?.id);\n"
    "  const { items: outbox, refresh: refreshOutbox } = useOutbox(user?.id);",
    "useOutbox")

# ---- the card opens -------------------------------------------------
sub("""              <View key={it.id} style={[s.inbox, it.learned && s.inboxDone]}>""",
"""              <Pressable
                key={it.id}
                style={[s.inbox, it.learned && s.inboxDone]}
                onPress={() => {
                  // A word is its own card; everything else has a page.
                  const to = itemRoute(it);
                  if (to) router.navigate(to as any);
                }}
              >""",
    "card open")

sub("""                  <Pressable style={s.complete} onPress={async () => { await markLearned(it.id); refreshInbox(); }}>
                    <Text style={s.completeT}>{t(PROFILE.markLearned)}</Text>
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  </Pressable>
                )}
              </View>""",
"""                  <Pressable style={s.complete} onPress={async () => { await markLearned(it.id); refreshInbox(); }}>
                    <Text style={s.completeT}>{t(PROFILE.markLearned)}</Text>
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  </Pressable>
                )}
              </Pressable>""",
    "card close")

# ---- the sender's side ----------------------------------------------
sub("""      {/* Real accepted friends (if any) */}""",
"""      {/* Your side of it: what you sent, and whether it landed. */}
      {outbox.length > 0 ? (
        <>
          <Text style={s.sectionLabel}>{t(PROFILE.yourSends)}</Text>
          <View style={{ gap: spacing.sm }}>
            {outbox.slice(0, 8).map((it) => (
              <Pressable
                key={'out-' + it.id}
                style={s.friendRow}
                onPress={() => {
                  const to = itemRoute(it);
                  if (to) router.navigate(to as any);
                }}
              >
                <View style={[s.avatar, s.avatarSm]}>
                  <Text style={s.avatarT}>{(it.recipientName || '?')[0].toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN} numberOfLines={1}>
                    {it.fa || it.title || t(PROFILE.something)}
                  </Text>
                  <Text style={s.friendL}>
                    {it.learned
                      ? (it.recipientName ?? '') + ' ' + t(PROFILE.theyLearnedIt)
                      : t(PROFILE.sentWaiting) + ' ' + (it.recipientName ?? '')}
                  </Text>
                </View>
                <Ionicons
                  name={it.learned ? 'checkmark-circle' : 'time-outline'}
                  size={17}
                  color={it.learned ? pr.streakA : pr.dim}
                />
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {/* Real accepted friends (if any) */}""",
    "outbox section")

open(p, "w").write(s)
print("applied", applied, "of 4")
for k in skipped:
    print("   skipped:", k)

# imports
src = open(p).read()
need = [n for n in ["useOutbox", "itemRoute"] if n not in src.split("export default")[0]]
print("missing from imports:", need if need else "none")
print("inbox import line:", [l for l in src.split("\n") if "lib/inbox" in l])
