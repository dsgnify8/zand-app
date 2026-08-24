# The achievements sheet cannot scroll.
#
# It has a ScrollView, but the ScrollView sits inside a Pressable — the one
# wrapped round the sheet to stop taps falling through to the backdrop. A
# Pressable claims the touch and the drag never reaches the scroll view.
# (Same cause as the photo carousel that would not swipe.)
#
# The backdrop becomes an absolutely-filled Pressable behind a plain View, so
# tapping outside still closes and the sheet itself has no press handler to
# swallow anything.

p = "components/achievements-sheet.tsx"
s = open(p).read()

PAIRS = [
 # backdrop behind, sheet beside it rather than inside it
 ("""      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={s.sheet} onPress={() => {}}>""",
  """      <View style={s.backdrop}>
        {/* Behind the sheet, so a tap outside closes without the sheet
            itself needing a press handler that would eat the scroll. */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={s.sheet}>"""),

 ("""        </Pressable>
      </Pressable>
    </Modal>""",
  """        </View>
      </View>
    </Modal>"""),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a.strip().splitlines()[0][:56])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)

# StyleSheet is imported already, but check rather than assume.
print("StyleSheet imported:", "StyleSheet" in s.split("\n")[0] or "StyleSheet," in s)
print("Pressables left in sheet:", s.count("<Pressable"))
