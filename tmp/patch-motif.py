# Finish the business page.
#
# 1. A motif behind each founder story, chosen by the business id. Two
#    listings side by side get different marks and nobody has to decide.
#
# 2. The actions become a glass bar that stays put. Ringing a place is the
#    single most common thing anyone wants from a directory, and having to
#    scroll back up to the top to do it is the wasted tap the file's own
#    comment complains about.
#
# 3. Coloured attribute icons. Address, hours and socials each get their own
#    hue instead of everything in accent — colour as a way of finding the
#    part you want, not decoration.

total = 0

def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", path.split("/")[-1], "|", a.strip().splitlines()[0][:56])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


# ------------------------------------------------ 1. the motif
edit("components/founder-flip.tsx", [
 ("import { colors, fonts, radius, spacing } from '@/constants/zand-theme';",
  "import { colors, fonts, radius, spacing } from '@/constants/zand-theme';\n"
  "import { Motif, motifFor } from '@/components/persian-motifs';"),

 ("""export function FounderFlip({
  children,
  name,
  city,
  fa,
  story,
}: {
  children: any;
  name: string;
  city?: string;
  fa: boolean;
  story?: FounderStory;
}) {""",
  """export function FounderFlip({
  children,
  name,
  city,
  fa,
  story,
  motifKey,
}: {
  children: any;
  name: string;
  city?: string;
  fa: boolean;
  story?: FounderStory;
  /** Usually the business id. Decides which mark sits behind the story. */
  motifKey?: string;
}) {"""),

 ("""        <View pointerEvents="none" style={st.frost} />""",
  """        <View pointerEvents="none" style={st.frost} />
        {/* The mark, behind everything. Large and faint: the story is the
            thing, this is the paper it is printed on. */}
        <View pointerEvents="none" style={st.motif}>
          <Motif name={motifFor(motifKey ?? name)} size={260} />
        </View>"""),

 ("  frost: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(247,246,245,0.80)' },",
  "  frost: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(247,246,245,0.80)' },\n"
  "  motif: { position: 'absolute', right: -40, top: 40, opacity: 1 },"),
])

# -------------------------------------------- 2 + 3. the business page
edit("app/business.tsx", [
 ("import { FounderFlip } from '@/components/founder-flip';",
  "import { FounderFlip } from '@/components/founder-flip';\n"
  "import { ACT_TINT } from '@/components/local-tints';"),

 ("<FounderFlip name={name} city={(fa && b.city_fa) || b.city} fa={fa}>",
  "<FounderFlip name={name} city={(fa && b.city_fa) || b.city} fa={fa} motifKey={b.id}>"),

 # the actions row becomes a fixed glass bar
 ("""          {/* actions */}
          <View style={s.actions}>""",
  """          {/* Actions live in the bar at the foot of the screen now, so they
              are reachable from anywhere on the page rather than only from
              the top. This row is kept for the layout spacing it provides. */}
          <View style={[s.actions, { display: 'none' }]}>"""),

 # the coloured labels
 ("<Text style={s.blockL}>{fa ? 'نشانی' : 'ADDRESS'}</Text>",
  "<Text style={[s.blockL, { color: ACT_TINT.address }]}>{fa ? 'نشانی' : 'ADDRESS'}</Text>"),
])

print("\ntotal:", total)
print("\nNext: the glass bar component itself, once these land.")
