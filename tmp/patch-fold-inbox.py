# Tucking something away.
#
# A card you have not got to yet still takes a screen, and someone with
# four waiting has a page of things asking for attention. The × folds one
# down to a line — still there, still openable, no longer shouting.
#
# Held in state, so it comes back on relaunch. That is deliberate: this is
# "not now", not "never", and a gentle return tomorrow is the right
# behaviour for something a friend sent you.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


# ------------------------------------------------------------ the state
sub("""  const [sentBack, setSentBack] = useState<number[]>([]);""",
"""  const [sentBack, setSentBack] = useState<number[]>([]);

  // Folded down, this session. Not persisted: tucking something away for
  // now should not mean hiding it for good.
  const [folded, setFolded] = useState<number[]>([]);""",
    "state")

# ------------------------------------------------------------- the card
sub("""              <Pressable
                key={it.id}
                style={[s.inbox, it.learned && s.inboxDone]}
                onPress={() => {
                  // A word is its own card; everything else has a page.
                  const to = itemRoute(it);
                  if (to) router.navigate(to as any);
                }}
              >""",
"""              folded.includes(it.id) ? (
                // Folded: one line, and a tap to bring it back.
                <Pressable
                  key={it.id}
                  style={s.inboxFold}
                  onPress={() => setFolded((v) => v.filter((x) => x !== it.id))}
                >
                  <View style={[s.avatar, s.avatarSm]}>
                    <Text style={s.avatarT}>{(it.senderName || '?')[0].toUpperCase()}</Text>
                  </View>
                  <Text style={s.inboxFoldT} numberOfLines={1}>
                    {it.senderName} {t(PROFILE.sentYou)}{' '}
                    {KIND_LABEL_T[it.kind] ? t(KIND_LABEL_T[it.kind]) : t(PROFILE.something)}
                  </Text>
                  <Ionicons name="chevron-down" size={15} color={pr.dim} />
                </Pressable>
              ) : (
              <Pressable
                key={it.id}
                style={[s.inbox, it.learned && s.inboxDone]}
                onPress={() => {
                  // A word is its own card; everything else has a page.
                  const to = itemRoute(it);
                  if (to) router.navigate(to as any);
                }}
              >
                {/* Not now. Folds the card to a line rather than marking
                    it learned — those are different answers and the card
                    only offered one of them. */}
                <Pressable
                  hitSlop={10}
                  style={s.inboxFoldBtn}
                  onPress={(e) => { e.stopPropagation(); setFolded((v) => [...v, it.id]); }}
                >
                  <Ionicons name="close" size={15} color={pr.dim} />
                </Pressable>""",
    "card open")

# and the close, which now has a branch to end
sub("""                )}
              </Pressable>
            ))}
          </View>
        </>
      ) : null}""",
"""                )}
              </Pressable>
              )
            ))}
          </View>
        </>
      ) : null}""",
    "card close")

# ----------------------------------------------------------- the styles
sub("  inboxDone: {",
"""  // The folded state: one row, the sender, and a chevron back.
  inboxFold: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: spacing.md, paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 12,
  },
  inboxFoldT: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: pr.dim },
  inboxFoldBtn: { position: 'absolute', top: spacing.sm, right: spacing.sm, zIndex: 2 },

  inboxDone: {""",
    "styles")

open(p, "w").write(s)
print("total:", total)
