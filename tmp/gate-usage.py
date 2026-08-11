# -*- coding: utf-8 -*-
# Gate the two paid APIs.
#
# speak() and the transcribe path both check the meter before spending a
# call. When the allowance is gone they return a sentinel rather than
# throwing, and the screen decides whether to show the paywall — keeping
# the decision about UI out of the library.

import re

did = []

# ---- speak ----
p = "lib/speak.ts"
s = open(p).read()

if "canUse" not in s:
    # import
    s = s.replace("import { supabase } from '@/lib/supabase';",
                  "import { supabase } from '@/lib/supabase';\nimport { canUse, useOne } from '@/lib/usage';", 1)

    # the guard, right at the top of speak()
    a = """export async function speak(text: string, lang = 'fa', opts?: { slow?: boolean }) {
  const slow = opts?.slow ?? false;
  try {"""
    b = """// Returns 'limit' when the free allowance is spent, so the caller can
// show the paywall. Returns undefined otherwise, as before.
export async function speak(text: string, lang = 'fa', opts?: { slow?: boolean }): Promise<'limit' | void> {
  const slow = opts?.slow ?? false;

  // A cached url costs nothing to play, so replaying something already
  // fetched this session does not count against the allowance.
  const cached = urls.has(lang + '|' + (slow ? 's' : 'n') + '|' + text);
  if (!cached) {
    if (!canUse('speak')) return 'limit';
    await useOne('speak');
  }

  try {"""
    if a in s:
        s = s.replace(a, b, 1); did.append("speak guarded")
    open(p, "w").write(s)

# ---- listen ----
p = "lib/listen.ts"
s = open(p).read()

if "canUse" not in s:
    m = re.search(r"^import .*\n(?![\s\S]*^import )", s, re.M)
    last = None
    for last in re.finditer(r"^import .*\n", s, re.M): pass
    s = s[:last.end()] + "import { canUse, useOne } from '@/lib/usage';\n" + s[last.end():]

    a = """export async function transcribe(uri: string, lang = 'fa-IR'): Promise<string | null> {
  try {"""
    b = """// Returns the literal 'limit' when the allowance is spent. Callers
// already handle null for a failed transcription, so the sentinel is a
// distinct value rather than another null.
export async function transcribe(uri: string, lang = 'fa-IR'): Promise<string | null | 'limit'> {
  if (!canUse('listen')) return 'limit';
  await useOne('listen');
  try {"""
    if a in s:
        s = s.replace(a, b, 1); did.append("listen guarded")
    open(p, "w").write(s)

print("applied:", " | ".join(did) if did else "nothing matched")
