# Replace only within the mohammad-reza-shah topic.
def apply(pairs, path="constants/education.ts"):
    s = open(path).read()
    i = s.find("key: 'mohammad-reza-shah'")
    i = s.rfind("const ", 0, i)
    j = s.find("\nconst ", i + 10)
    if j == -1: j = len(s)
    head, block, tail = s[:i], s[i:j], s[j:]
    ok, miss = 0, []
    for a, b in pairs:
        if a in block:
            block = block.replace(a, b, 1); ok += 1
        else:
            miss.append(a[:70])
    open(path, "w").write(head + block + tail)
    print("applied", ok, "of", len(pairs))
    for m in miss: print("   skipped:", m)
