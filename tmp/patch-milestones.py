# Achievements beyond the language course.
#
# Two milestones counted things that cannot happen any more: articles were
# deleted app-wide and videos are archived, so 'articles4' and 'videos5' were
# permanently locked. A locked-forever achievement is worse than no
# achievement — it reads as a bug.
#
# The rest of the list was almost entirely about lessons and words. These add
# reading, keeping and sending, all backed by counters that already exist and
# already increment. Nothing here is aspirational.
#
# Not added: anything about poets. Nothing counts poets separately from
# topics, so "learnt about 4 poets" would sit at 0/4 forever. That needs a
# counter wiring into the literature reader first.

p = "lib/stats-store.ts"
s = open(p).read()
applied, skipped = 0, []


def sub(a, b, label):
    global s, applied
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(label)


# ---- the two that can never fire ------------------------------------
sub("  { key: 'articles4', label: '4 articles read', field: 'articlesRead', target: 4 },\n", "", "articles4")
sub("  { key: 'videos5', label: '5 videos watched', field: 'videosWatched', target: 5 },\n", "", "videos5")

# ---- reading, keeping, sending --------------------------------------
sub(
"  { key: 'topics4', label: '4 topics finished', field: 'topicsFinished', target: 4 },",
"""  // Reading the app, not the course.
  { key: 'topic1', label: 'First topic finished', field: 'topicsFinished', target: 1 },
  { key: 'topics4', label: '4 topics finished', field: 'topicsFinished', target: 4 },
  { key: 'topics10', label: '10 topics finished', field: 'topicsFinished', target: 10 },""",
"topics group")

sub(
"  { key: 'pages20', label: '20 pages read', field: 'pagesRead', target: 20 },",
"""  { key: 'pages20', label: '20 pages read', field: 'pagesRead', target: 20 },
  { key: 'pages100', label: '100 pages read', field: 'pagesRead', target: 100 },
  { key: 'pages500', label: '500 pages read', field: 'pagesRead', target: 500 },""",
"pages group")

sub(
"  { key: 'saved10', label: '10 things saved', field: 'thingsSaved', target: 10 },",
"""  { key: 'saved1', label: 'Kept something', field: 'thingsSaved', target: 1 },
  { key: 'saved10', label: '10 things saved', field: 'thingsSaved', target: 10 },
  { key: 'saved30', label: '30 things saved', field: 'thingsSaved', target: 30 },""",
"saved group")

sub(
"  { key: 'sent6', label: '6 sent to friends', field: 'thingsSent', target: 6 },",
"""  { key: 'sent1', label: 'Sent your first thing', field: 'thingsSent', target: 1 },
  { key: 'sent6', label: '6 sent to friends', field: 'thingsSent', target: 6 },
  { key: 'stages10', label: '10 chapters finished', field: 'stagesFinished', target: 10 },""",
"sent group")

open(p, "w").write(s)
print("applied", applied, "of 6")
for k in skipped:
    print("   skipped:", k)

# Every milestone must point at a field that exists on Stats, or it silently
# reads undefined and renders NaN.
import re
fields = set(re.findall(r"^  (\w+): number;", s, re.M))
used = re.findall(r"field: '(\w+)'", s)
bad = sorted({f for f in used if f not in fields})
print("milestones:", len(used))
print("fields not on Stats:", bad if bad else "none")
