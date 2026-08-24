# Wire the friend nudges, and fix two things they would otherwise trip over.
#
# 1. setReminders(false) called cancelAllScheduledNotificationsAsync — so
#    turning off the daily reminder silently killed the idle nudge and every
#    friend nudge with it. It now cancels only its own.
#
# 2. scheduleIdle composed its message in English regardless of language, so
#    a Persian reader already receives an English notification today. Local,
#    so unlike the push messages this one is fixable here.

total = 0

def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", path.split("/")[-1], "|", a.strip().splitlines()[0][:56])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


# ---------------------------------------------- 1. the blunt cancel
edit("lib/reminders.ts", [
 ("""  if (on) await schedule();
  else await Notifications.cancelAllScheduledNotificationsAsync();""",
  """  if (on) await schedule();
  // Only this reminder. cancelAll took the idle nudge and every friend
  // nudge with it — turning off one notification should not silently
  // disable the others.
  else await cancelDaily();"""),
])

# the daily schedule needs a stable identifier to cancel by
p = "lib/reminders.ts"
s = open(p).read()
if "DAILY_ID" not in s:
    s = s.replace("const K_HOUR = 'remind:hour';",
                  "const K_HOUR = 'remind:hour';\nconst DAILY_ID = 'daily-reminder';", 1)
    s = s.replace("export function remindersOn() { return enabled; }",
"""async function cancelDaily() {
  try { await Notifications.cancelScheduledNotificationAsync(DAILY_ID); } catch {}
}

export function remindersOn() { return enabled; }""", 1)
    open(p, "w").write(s)
    total += 1
    print("reminders.ts: DAILY_ID added")
print("   NOTE: schedule() must pass identifier: DAILY_ID — check it below")

# ------------------------------------------- 2. the English-only idle
edit("lib/notif-prefs.ts", [
 ("""      content: {
        title: 'Still here when you are',
        body: 'Your place is saved. Pick up where you left off.',
      },""",
  """      content: {
        // Composed on this device, so it can be in this reader's language.
        title: getLang() === 'fa' ? 'هر وقت خواستی، همین‌جاست' : 'Still here when you are',
        body: getLang() === 'fa'
          ? 'جایت محفوظ است. از همان‌جا ادامه بده.'
          : 'Your place is saved. Pick up where you left off.',
      },"""),
])

p = "lib/notif-prefs.ts"
s = open(p).read()
if "from '@/lib/i18n'" not in s:
    s = s.replace("import { syncTouch } from '@/lib/cloud-sync';",
                  "import { syncTouch } from '@/lib/cloud-sync';\nimport { getLang } from '@/lib/i18n';", 1)
    open(p, "w").write(s)
    total += 1
    print("notif-prefs.ts: getLang imported")

# --------------------------------------------- 3. run them on inbox load
edit("app/(tabs)/profile.tsx", [
 ("import { useInbox, useOutbox, itemRoute, markLearned } from '@/lib/inbox';",
  "import { useInbox, useOutbox, itemRoute, markLearned } from '@/lib/inbox';\n"
  "import { syncNudges, cancelNudge } from '@/lib/friend-nudges';"),

 ("  const { items: outbox, refresh: refreshOutbox } = useOutbox(user?.id);",
  """  const { items: outbox, refresh: refreshOutbox } = useOutbox(user?.id);

  // Keep the pending nudges in step with what is actually unlearned.
  // Cheap, idempotent, and the inbox is the only place that knows.
  useEffect(() => { syncNudges(inbox); }, [inbox]);"""),

 ("onPress={async () => { await markLearned(it.id); refreshInbox(); }}",
  "onPress={async () => { await markLearned(it.id); await cancelNudge(it.id); refreshInbox(); }}"),
])

print("\ntotal:", total)
print("\nCheck: does schedule() in reminders.ts set identifier: DAILY_ID?")
import subprocess
print(subprocess.run(["grep", "-n", "scheduleNotificationAsync", "-A", "3", "lib/reminders.ts"],
                     capture_output=True, text=True).stdout[:600])
