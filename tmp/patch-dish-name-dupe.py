# Every dish shows its name twice in Persian.
#
# The row is a pair: the name on one side, the other language on the other.
# In English that reads "Ghormeh Sabzi … قرمه سبزی". In Persian the first
# slot switches to dish.fa while the second is still dish.fa, so the Persian
# name prints twice and the English name is nowhere.
#
# The fix is to make the second slot the counterpart of the first rather than
# always Persian. Same bug, same fix, in the modal.

p = "components/culture-blocks.tsx"
s = open(p).read()

PAIRS = [
 # the row
 ("          <Text style={dstyles.fa}>{dish.fa}</Text>",
  "          {/* The counterpart, not always Persian — in the Persian build\n"
  "              the name above is already Persian. */}\n"
  "          <Text style={dstyles.fa}>{fa ? dish.name : dish.fa}</Text>"),

 # the opened card
 ("              <Text style={dstyles.cardFa}>{d?.fa}</Text>",
  "              <Text style={dstyles.cardFa}>{fa ? d?.name : d?.fa}</Text>"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a.strip()[:56])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
