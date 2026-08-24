# Make every screen answer a language change where it stands.
#
# 93 files render language-dependent text; 86 of them never subscribed. They
# read getLang() or t() at render, which is correct — but nothing tells them
# to render again, so a switch made in Settings does not reach them until
# something else happens to push them. That is the "navigate away and come
# back" behaviour, and it is why Profile stayed English: Profile subscribes,
# but its work happens in StreakCard, LibraryTab, ProgressTab and the rest,
# and a parent re-render does not reach a child React can skip.
#
# The fix is one line per component: useLang() with no value taken from it.
# Subscribe with the hook, read with getLang() or t().
#
# What this touches, deliberately narrowly:
#   - top-level functions only, ending at a closing brace in column 0
#   - names starting a capital, so helpers never receive a hook
#   - only bodies that actually return JSX
#   - only bodies that actually read the language
#   - never twice
#
# It also strips the TEMP-LANG-LOG debugging lines.
#
# Undo the whole thing with:  git checkout app components

import os
import re

ROOTS = ("app", "components")
READS = ("getLang()", "t(", "tr(", "tl(", "tset(")

# a top-level component: function Foo(...) { ... }  or  const Foo = (...) => {
DECL = re.compile(
    r"^(?:export\s+)?(?:default\s+)?function\s+([A-Z]\w*)\s*\([^)]*\)\s*(?::[^{]+)?\{\s*$"
    r"|^(?:export\s+)?const\s+([A-Z]\w*)\s*(?::[^=]+)?=\s*\([^)]*\)\s*(?::[^=]+)?=>\s*\{\s*$",
    re.M,
)

SUB = ("  // Subscribe to the language so a switch elsewhere reaches this screen\n"
       "  // where it stands. The value is deliberately unused: read with\n"
       "  // getLang() or t(), which are always current.\n"
       "  useLang();")

changed = []
skipped = []
comps = 0


def ensure_import(src):
    """Merge useLang into the i18n import, or add one. None if impossible."""
    if re.search(r"import\s*\{[^}]*\buseLang\b[^}]*\}\s*from\s*'@/lib/i18n'", src):
        return src
    m = re.search(r"import\s*\{([^}]*)\}\s*from\s*'@/lib/i18n';", src)
    if m:
        return src[: m.start(1)] + " useLang," + m.group(1) + src[m.end(1):]
    last = None
    for im in re.finditer(r"^import .*?;\s*$", src, re.M):
        last = im
    if not last:
        return None
    return src[: last.end()] + "\nimport { useLang } from '@/lib/i18n';" + src[last.end():]


def body_end(lines, start):
    """From the declaration line to the closing brace in column 0."""
    for i in range(start + 1, len(lines)):
        if lines[i].rstrip() == "}":
            return i
    return None


for base in ROOTS:
    for root, _, files in os.walk(base):
        for f in sorted(files):
            if not f.endswith(".tsx"):
                continue
            path = os.path.join(root, f)
            src = open(path).read()

            # strip debugging first, wherever it landed
            if "TEMP-LANG-LOG" in src:
                src = "\n".join(l for l in src.split("\n") if "TEMP-LANG-LOG" not in l)

            if not any(r in src for r in READS):
                open(path, "w").write(src)
                continue

            lines = src.split("\n")
            inserts = []
            for m in DECL.finditer(src):
                name = m.group(1) or m.group(2)
                ln = src[: m.start()].count("\n")
                end = body_end(lines, ln)
                if end is None:
                    continue
                body = "\n".join(lines[ln + 1:end])
                if "useLang()" in body:
                    continue
                if not any(r in body for r in READS):
                    continue
                if not re.search(r"return\s*\(?\s*<|=>\s*\(?\s*<", body):
                    continue
                inserts.append((ln, name))

            if not inserts:
                open(path, "w").write(src)
                continue

            for ln, _ in sorted(inserts, reverse=True):
                lines.insert(ln + 1, SUB)
            src = "\n".join(lines)

            withimp = ensure_import(src)
            if withimp is None:
                skipped.append(path + "  (no import anchor)")
                continue

            open(path, "w").write(withimp)
            changed.append((path, [n for _, n in inserts]))
            comps += len(inserts)

for p, names in changed:
    print("%2d  %s" % (len(names), p))
    print("      " + ", ".join(names))

print("\nfiles changed: %d   components subscribed: %d" % (len(changed), comps))
for sk in skipped:
    print("  SKIPPED:", sk)

with open("tmp/lang-changed.txt", "w") as fh:
    fh.write("\n".join(p for p, _ in changed))
print("\nlist written to tmp/lang-changed.txt")
