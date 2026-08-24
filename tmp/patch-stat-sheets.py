# The Finished list goes; the stat boxes gain it.
#
# Progress ended with every completed thing in one long column, below the
# stats that already counted them — the same information twice, once as a
# number and once as a list. Holding a box now shows the things behind that
# number, which puts the list where the number is.
#
# Poets read joins the grid, since there is now a counter for it.
#
# Pages read and Sent to friends stay plain: nothing records which pages or
# which sends, so they have no list to show and do not respond to a hold.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
applied, skipped = 0, []


def sub(a, b, label):
    global s, applied
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(label)


# ---- 1. import ------------------------------------------------------
sub("import { LearnProgressBlock } from '@/components/learn-progress-block';",
    "import { LearnProgressBlock } from '@/components/learn-progress-block';\n"
    "import { StatItemsSheet, type StatItem } from '@/components/stat-items-sheet';",
    "import")

# ---- 2. the lists behind the numbers --------------------------------
sub("""  const finished = stats.finished;
  const shown = showAllFinished ? finished : finished.slice(0, 10);""",
"""  // What sits behind each number. Only the counters that actually record
  // what they counted can offer a list — pages read and things sent are
  // totals with nothing itemised behind them.
  const savedItems = useSavedItems();
  const [statSheet, setStatSheet] = useState<{ title: string; items: StatItem[] } | null>(null);

  const fromFinished = (prefix: string): StatItem[] =>
    (stats.finished ?? [])
      .filter((f: any) => f.key.startsWith(prefix))
      .map((f: any) => ({ key: f.key, title: f.title, sub: f.sub, route: f.route, meta: timeAgo(f.at) }));""",
    "stat lists")

# ---- 3. the grid ----------------------------------------------------
sub("""        {[
          { v: stats.topicsFinished, k: 'Topics finished', kT: PROFILE.topicsFinished, i: 'book' },
          { v: stats.pagesRead, k: 'Pages read', kT: PROFILE.pagesRead, i: 'document-text' },
          { v: stats.thingsSaved, k: 'Things saved', kT: PROFILE.thingsSaved, i: 'bookmark' },
          { v: stats.thingsSent, k: 'Sent to friends', kT: PROFILE.sentToFriends, i: 'paper-plane' },
        ].map((st) => (
          <View key={st.k} style={s.statCell}>
            <Ionicons name={st.i as any} size={16} color={pr.saveA} />
            <Text style={s.statV}>{st.v}</Text>
            <Text style={s.statK}>{st.kT ? t(st.kT) : st.k}</Text>
          </View>
        ))}""",
"""        {[
          { v: stats.topicsFinished, k: 'Topics finished', kT: PROFILE.topicsFinished, i: 'book',
            items: () => fromFinished('topic-') },
          { v: (stats as any).poetsRead ?? 0, k: 'Poets read', i: 'book-outline',
            items: () => fromFinished('poet-') },
          { v: stats.pagesRead, k: 'Pages read', kT: PROFILE.pagesRead, i: 'document-text' },
          { v: stats.thingsSaved, k: 'Things saved', kT: PROFILE.thingsSaved, i: 'bookmark',
            items: () => savedItems.map((x: any) => ({ key: x.key, title: x.title, sub: x.sub, route: x.route })) },
          { v: stats.thingsSent, k: 'Sent to friends', kT: PROFILE.sentToFriends, i: 'paper-plane' },
        ].map((st: any) => {
          // Only the ones with something itemised behind them open.
          const list = st.items ? st.items() : [];
          const holdable = !!st.items && list.length > 0;
          return (
            <Pressable
              key={st.k}
              style={s.statCell}
              disabled={!holdable}
              delayLongPress={280}
              onLongPress={() => setStatSheet({ title: st.kT ? t(st.kT) : st.k, items: list })}
            >
              <Ionicons name={st.i as any} size={16} color={pr.saveA} />
              <Text style={s.statV}>{st.v}</Text>
              <Text style={s.statK}>{st.kT ? t(st.kT) : st.k}</Text>
            </Pressable>
          );
        })}""",
    "stat grid")

# ---- 4. the Finished section ----------------------------------------
sub("""      <View style={s.finHead}>
        <Text style={s.sectionLabel}>{t(PROFILE.finished)}</Text>
        {finished.length > 10 ? (
          <Pressable hitSlop={8} onPress={() => setShowAllFinished((v) => !v)}>
            <Text style={s.seeAll}>{showAllFinished ? t(PROFILE.showLess) : t(PROFILE.seeAll) + ' ' + finished.length}</Text>
          </Pressable>
        ) : null}
      </View>
      {finished.length === 0 ? (
        <Text style={s.finEmpty}>Finish a topic or an article and it lands here.</Text>
      ) : (
        <View style={{ gap: spacing.sm }}>
          {shown.map((f) => (
            <Pressable key={f.key} style={s.doneRow} onPress={() => f.route && router.navigate(f.route as any)}>
              <View style={s.doneTick}><Ionicons name="checkmark" size={12} color="#FFF" /></View>
              <View style={{ flex: 1 }}>
                <Text style={s.doneT} numberOfLines={1}>{f.title}</Text>
                <Text style={s.doneS}>{f.sub}</Text>
              </View>
              <Text style={s.doneW}>{timeAgo(f.at)}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <AchievementsSheet open={achvOpen} onClose={() => setAchvOpen(false)} />""",
"""      <Text style={s.finEmpty}>Hold any of these to see what is behind it.</Text>

      <AchievementsSheet open={achvOpen} onClose={() => setAchvOpen(false)} />
      <StatItemsSheet
        open={!!statSheet}
        title={statSheet?.title ?? ''}
        items={statSheet?.items ?? []}
        onClose={() => setStatSheet(null)}
      />""",
    "finished section")

open(p, "w").write(s)
print("applied", applied, "of 4")
for k in skipped:
    print("   skipped:", k)

print("showAllFinished left:", s.count("showAllFinished"))
print("PROFILE.finished left:", s.count("PROFILE.finished"))
