# The hero at the top of Local.
#
# The wash sits behind the header rather than inside the list, so it does
# not scroll away with the content and does not need to be part of the
# FlatList's header measurement.
#
# The title and subtitle centre themselves over it, and the search field
# turns translucent so the colour reads through — a solid grey field on a
# warm wash looks stuck on.

total = 0
p = "app/(tabs)/local.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { PlaceChip } from '@/components/local-place-chip';",
    "import { PlaceChip } from '@/components/local-place-chip';\n"
    "import { LocalHeroBg } from '@/components/local-hero';",
    "import")

# behind everything, above the list
sub("""    <SafeAreaView style={s.safe} edges={['top']}>
      <FlatList""",
"""    <SafeAreaView style={s.safe} edges={['top']}>
      <LocalHeroBg />
      <FlatList""",
    "hero mount")

# the title block centres over the wash
sub("""  title: { fontFamily: fonts.body, fontSize: 23, lineHeight: 31, letterSpacing: -0.6, color: colors.textPrimary },""",
"""  title: {
    fontFamily: fonts.body, fontSize: 23, lineHeight: 31, letterSpacing: -0.6,
    color: colors.textPrimary,
    textAlign: 'center', marginTop: spacing.xl, paddingHorizontal: spacing.md,
  },""",
    "title centred")

sub("""  sub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary, marginTop: 5 },""",
"""  sub: {
    fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.textSecondary,
    marginTop: 6, textAlign: 'center',
  },""",
    "sub centred")

# the search field, translucent so the wash reads through it
sub("""  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 10, marginTop: spacing.lg },""",
"""  search: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    // Translucent rather than the flat grey: on the wash a solid field
    // looks stuck on rather than part of the page.
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.75)',
    borderRadius: 999,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    marginTop: spacing.xl,
  },""",
    "search field")

open(p, "w").write(s)
print("total:", total)
print("hero mounted:", s.count("<LocalHeroBg"))
