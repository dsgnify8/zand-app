# Two small corrections.
#
#   1. The break in the history spine sits low — it clears the rail but the
#      gap reads as below the words rather than around them. Both numbers
#      move up by the same amount, so the gap keeps its size and shifts.
#   2. The Read link beside the poet deck opened that poet's reader. It
#      should go to the literature hub: the deck is a browse, and dropping
#      someone straight into page one of whoever happened to be face up
#      skips the choice they were making.

total = 0

def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", path.split("/")[-1], "|", a.strip()[:56])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


edit("components/history-chapters.tsx", [
 ("const RAIL_TOP = 44; // the break opens here", "const RAIL_TOP = 58; // the break opens here"),
 ("const RAIL_BOTTOM = 10; // and closes here", "const RAIL_BOTTOM = 24; // and closes here"),
])

edit("components/poet-deck.tsx", [
 ("  const openTop = () => router.navigate(('/literature/reader?author=' + topKey + '&page=0') as any);",
  "  // The hub, not the reader. The deck is for choosing; opening page one of\n"
  "  // whoever is face up would make the choice for them.\n"
  "  const openTop = () => router.navigate('/literature' as any);"),
])

print("\ntotal:", total)
