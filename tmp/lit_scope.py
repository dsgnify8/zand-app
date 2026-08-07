# Replace only within one poet's block in literature.ts.
POETS = ['ferdowsi', 'hafez', 'saadi', 'khayyam', 'rudaki', 'nizami', 'rumi']

def apply(poet, pairs, path="constants/literature.ts"):
    s = open(path).read()
    i = s.find("key: '" + poet + "'")
    i = s.rfind("const ", 0, i)
    nxt = POETS[POETS.index(poet) + 1] if POETS.index(poet) + 1 < len(POETS) else None
    j = s.find("key: '" + nxt + "'") if nxt else -1
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
