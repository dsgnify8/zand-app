# -*- coding: utf-8 -*-
# A small line at the top of the learning world when signed out, so the
# nudge is present without interrupting anything. Tapping it opens the
# same onboarding-styled auth page.

import re

p = "app/learn/map.tsx"
s = open(p).read()
did = []

# the nudge, placed right above the chapter picker
anchor = "      <Pressable style={s.pick} onPress={() => setPickOpen(true)}>"
nudge = """      {!session ? (
        <Pressable style={s.nudge} onPress={() => router.push('/onboarding?step=2' as any)}>
          <Ionicons name="cloud-upload-outline" size={12} color={lw.muted} />
          <Text style={s.nudgeT}>
            {getLang() === 'fa' ? 'برای ذخیرهٔ پیشرفتت وارد شو' : 'Sign in to track your learning'}
          </Text>
        </Pressable>
      ) : null}

"""
if anchor in s and "s.nudge" not in s:
    s = s.replace(anchor, nudge + anchor, 1); did.append("nudge")

# session from auth
m = re.search(r"export default function \w+\([^)]*\)[^{]*\{\n", s)
if m and "useAuth()" not in s[m.end():m.end()+400]:
    s = s[:m.end()] + "  const { session } = useAuth();\n" + s[m.end():]
    did.append("session")

if "@/lib/auth" not in s:
    last = None
    for last in re.finditer(r"^import .*\n", s, re.M): pass
    s = s[:last.end()] + "import { useAuth } from '@/lib/auth';\n" + s[last.end():]
    did.append("auth import")

if "getLang" not in s:
    last = None
    for last in re.finditer(r"^import .*\n", s, re.M): pass
    s = s[:last.end()] + "import { getLang } from '@/lib/i18n';\n" + s[last.end():]
    did.append("i18n import")

# styles
if "nudgeT:" not in s:
    s = s.replace("  pick: {", """  nudge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, alignSelf: 'center', paddingHorizontal: spacing.md, paddingVertical: 5, marginBottom: 6 },
  nudgeT: { fontFamily: fonts.body, fontSize: 11, color: lw.muted },
  pick: {""", 1)
    did.append("styles")

open(p, "w").write(s)
print("applied:", " | ".join(did))
