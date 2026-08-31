# Library moves into You.
#
# It was a tab of its own holding two cards and a list. Two cards do not
# need a tab, and a page whose whole job is to point at two other pages is
# a page too many.
#
# So: the saved strip on You becomes Library, carrying the Favourites and
# Saved cards, and opening either shows the sub-page in place. The Library
# tab goes, leaving You, Friends and Progress.
#
# LibrarySub is untouched. It was always the part doing the work.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


# ------------------------------------------------ the strip becomes Library
sub("""function SavedStrip({ onSeeAll }: { onSeeAll: () => void }) {""",
"""function LibrarySection({ onOpen }: { onOpen: (v: 'favourites' | 'saved') => void }) {
  useLang();

  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text style={s.sectionLabelInline}>{t(PROFILE.yourLibrary)}</Text>
      <View style={s.grid}>
        {[
          { key: 'favourites' as const, i: 'heart-outline', t: t(PROFILE.favourites), x: t(PROFILE.favouritesX) },
          { key: 'saved' as const, i: 'bookmark-outline', t: t(PROFILE.saveLater), x: t(PROFILE.saveLaterX) },
        ].map((g) => (
          <Pressable key={g.key} style={s.gridCell} onPress={() => onOpen(g.key)}>
            <Ionicons name={g.i as any} size={19} color={pr.saveA} />
            <Text style={s.gridT}>{g.t}</Text>
            <Text style={s.gridX}>{g.x}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SavedStrip({ onSeeAll }: { onSeeAll: () => void }) {""",
    "library section")

# ------------------------------------------------------- the You tab
sub("""function YouTab({ onGoFriends, onGoLibrary }: { onGoFriends: () => void; onGoLibrary: () => void }) {""",
"""function YouTab({ onGoFriends }: { onGoFriends: () => void }) {
  // The library opens here now rather than on a tab of its own. Two cards
  // pointing at two pages did not need a third place to live.
  const [libView, setLibView] = useState<null | 'favourites' | 'saved'>(null);""",
    "you tab signature")

sub("""      <StreakCard />
      <KeepReading />
      <SavedStrip onSeeAll={onGoLibrary} />
      <DiscoverRow />""",
"""      <StreakCard />
      <KeepReading />
      <LibrarySection onOpen={setLibView} />
      <DiscoverRow />""",
    "you tab body")

# and the sub-page takes over the whole tab when open
sub("""  return (
    <>
      {pending.length > 0 ? (""",
"""  if (libView) return <LibrarySub view={libView} onBack={() => setLibView(null)} />;

  return (
    <>
      {pending.length > 0 ? (""",
    "sub view")

# ------------------------------------------------- the tab row and switch
sub("""        {tab === 'you' ? <YouTab onGoFriends={() => setTab('friends')} onGoLibrary={() => setTab('library')} /> : null}""",
"""        {tab === 'you' ? <YouTab onGoFriends={() => setTab('friends')} /> : null}""",
    "tab switch")

sub("""  { k: 'library', label: t(PROFILE.library), icon: 'bookmark' },
""", "", "tab entry")

open(p, "w").write(s)
print("total:", total)

# what still refers to the tab that no longer exists
for i, line in enumerate(s.split("\n"), 1):
    if "'library'" in line or "LibraryTab" in line:
        print(f"  {i}: {line.strip()[:92]}")
