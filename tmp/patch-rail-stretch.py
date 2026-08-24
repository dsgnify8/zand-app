# Two one-liners.
#
#   1. s.header is alignItems:'center', so the rail would take its natural
#      width and sit centred instead of spanning the page. Stretch it.
#   2. The Typical Persian badge said 'تایپیکال پرشن', which I transliterated
#      because I did not know the feature's Persian name. culture.ts has it:
#      the topic is titled 'ایرانیِ اصیل'.

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


edit("components/topics-rail.tsx", [
 ("  wrap: { marginTop: 14 },",
  "  // The header centres its children, so without this the rail would size\n"
  "  // to its content and sit in the middle rather than running off both edges.\n"
  "  wrap: { marginTop: 14, alignSelf: 'stretch' },"),
])

edit("components/culture-quote.tsx", [
 ("{fa ? 'تایپیکال پرشن' : 'TYPICAL PERSIAN'}",
  "{fa ? 'ایرانیِ اصیل' : 'TYPICAL PERSIAN'}"),
])

print("\ntotal:", total)
