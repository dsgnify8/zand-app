# Learned, then answered, then gone.
#
# Marking something learned was making the card vanish, which skipped the
# half of the exchange that matters — you learn what a friend sent, then
# you send one back. The card now stays, showing "send one back", and
# leaves only once you have.
#
# Held in state rather than the database: a reply is a new sent_item with
# no link to what prompted it, and adding that link is a schema change for
# a later pass. Within a session this is right; across a relaunch the card
# comes back, which is a fair reminder rather than a bug.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("""            {/* Learned things leave. The inbox is what is waiting for
                you, and something you have finished sitting in it makes
                the list feel unread when it is not. */}
            {inbox.filter((it) => !it.learned).map((it) => (""",
"""            {/* Learned but unanswered stays. Marking something learned is
                half the exchange; the card leaves when you have sent one
                back. */}
            {inbox.filter((it) => !it.learned || !sentBack.includes(it.id)).map((it) => (""",
    "filter")

sub("      {inbox.some((it) => !it.learned) ? (",
    "      {inbox.some((it) => !it.learned || !sentBack.includes(it.id)) ? (",
    "section")

sub("  const [sendTo, setSendTo] = useState<{ name: string; id: string } | null>(null);",
"""  const [sendTo, setSendTo] = useState<{ name: string; id: string } | null>(null);

  // Which cards have been answered, and which one opened the sheet. The
  // send happens elsewhere, so the row that started it has to be
  // remembered until the sheet reports back.
  const [sentBack, setSentBack] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);""",
    "state")

sub("""                    <Pressable style={s.sendBack} onPress={() => setSendTo({ name: it.senderName ?? '', id: it.sender })}>""",
"""                    <Pressable
                      style={s.sendBack}
                      onPress={() => {
                        setReplyingTo(it.id);
                        setSendTo({ name: it.senderName ?? '', id: it.sender });
                      }}
                    >""",
    "send back button")

open(p, "w").write(s)
print("total:", total)

# where the sheet closes, so it can mark the card answered
import re
for i, line in enumerate(s.split("\n"), 1):
    if "setSendTo(null)" in line:
        print(f"  {i}: {line.strip()[:96]}")
