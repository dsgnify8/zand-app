# The back buttons on History and Literature said "Education".
#
# Both actually do router.back(), so the word is a label rather than a
# destination — and people reach these pages from Explore. APP.explore
# already exists (en 'Explore', fa 'کشف'), so nothing new is needed.
#
# Not touched: the fallback when there is no history to go back to is
# router.replace('/'), which lands on Home rather than Explore. That only
# fires on a cold deep link into these pages, but it does mean the label and
# the fallback disagree in that one case.

total = 0
for path, style in [
    ("app/education/history.tsx", "backBtnText"),
    ("app/literature/index.tsx", "backText"),
]:
    s = open(path).read()
    a = "<Text style={styles." + style + "}>{t(APP.education)}</Text>"
    b = "<Text style={styles." + style + "}>{t(APP.explore)}</Text>"
    if a in s:
        open(path, "w").write(s.replace(a, b, 1))
        total += 1
        print("ok:", path)
    else:
        print("   skipped:", path)

print("changed:", total, "of 2")

# Anything else still pointing back at Education from inside a world?
import subprocess
out = subprocess.run(
    ["grep", "-rn", "APP.education", "app", "components"],
    capture_output=True, text=True,
).stdout.strip()
print("remaining APP.education:", out if out else "none")
