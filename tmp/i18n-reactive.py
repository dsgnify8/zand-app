# -*- coding: utf-8 -*-
# Make the language reactive.
#
# getLang() stays exactly as it is, so the ~200 call sites keep working.
# We add a listener set and a useLang() hook. Any screen that calls the
# hook re-renders when the language changes; screens that only call
# getLang() still read the right value, they just will not re-render on
# their own — which is why the switch is driven from a root-level
# remount as well.

import re

p = "lib/i18n.ts"
s = open(p).read()
did = []

# drop the two languages that are not built
if "'es' | 'fr'" in s:
    s = s.replace("export type Lang = 'en' | 'fa' | 'es' | 'fr';", "export type Lang = 'en' | 'fa';")
    did.append("langs trimmed")

# listeners
if "langListeners" not in s:
    s = s.replace("const KEY", """const langListeners = new Set<() => void>();
const emitLang = () => langListeners.forEach((l) => l());

/** Subscribe to language changes. Returns an unsubscribe. */
export function onLangChange(fn: () => void) {
  langListeners.add(fn);
  return () => { langListeners.delete(fn); };
}

const KEY""", 1)
    did.append("listeners")

# emit on set
m = re.search(r"(export async function setLang[^{]*\{)", s)
if m and "emitLang" not in s[m.end():m.end() + 400]:
    # add the emit right after the awaited write
    s = re.sub(r"(await AsyncStorage\.setItem\(KEY, v\); syncTouch\(\);|await AsyncStorage\.setItem\(KEY, v\);)",
               r"\1 emitLang();", s, count=1)
    did.append("emit on set")

# the hook
if "export function useLang" not in s:
    s += """

/**
 * Re-renders the calling component whenever the language changes.
 * Use this in any screen whose text should switch without a restart.
 */
export function useLang(): Lang {
  const [, tick] = useState(0);
  useEffect(() => onLangChange(() => tick((n) => n + 1)), []);
  return getLang();
}
"""
    if "from 'react'" not in s:
        s = "import { useEffect, useState } from 'react';\n" + s
    did.append("useLang hook")

open(p, "w").write(s)
print("i18n:", " | ".join(did) if did else "nothing changed")
