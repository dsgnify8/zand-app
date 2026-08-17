# -*- coding: utf-8 -*-
# Four fixes across the Local feature.
#
#   1. The form footer says what happens next, not what it costs. Price
#      belongs at approval, when it is actually a decision.
#   2. WhatsApp becomes a first-class contact route alongside phone and
#      website, because for a lot of these businesses it is the number
#      people actually use.
#   3. Signing in from "list a business" returns you to the form rather
#      than dumping you on the home screen.
#   4. Phone and website are no longer required.

import re

did = []

# ---- 1 and 4: the form ----
p = "app/business-new.tsx"
s = open(p).read()

a = "  if (!b.phone?.trim() && !b.website?.trim()) missing.push('a phone number or website');\n"
if a in s:
    s = s.replace(a, "", 1); did.append("contact optional")

a = """          <Text style={s.foot}>
            We read every listing before it goes up. Once approved it is $15 a month per
            business, and you can stop any time — it comes down at the end of that cycle.
          </Text>"""
b = """          <Text style={s.foot}>
            We read every listing before it goes up. Once it is approved you can edit or
            remove it whenever you like.
          </Text>"""
if a in s:
    s = s.replace(a, b, 1); did.append("footer")

# ---- 2: whatsapp on the form ----
a = """  { key: 'whatsapp', label: 'WhatsApp', icon: 'logo-whatsapp' },
] as const;"""
b = """] as const;"""
if a in s:
    s = s.replace(a, b, 1)
    # promoted out of socials and into contact, where it belongs
    a2 = """          <TextInput
            style={[s.input, { marginTop: spacing.sm }]}
            value={b.website ?? ''}
            onChangeText={(v) => set({ website: v })}
            placeholder="Website"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
          />"""
    b2 = a2 + """
          <TextInput
            style={[s.input, { marginTop: spacing.sm }]}
            value={(b.socials ?? {}).whatsapp ?? ''}
            onChangeText={(v) => set({ socials: { ...(b.socials ?? {}), whatsapp: v } })}
            placeholder="WhatsApp number"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
          />"""
    if a2 in s: s = s.replace(a2, b2, 1)
    did.append("whatsapp field")

open(p, "w").write(s)

# ---- 3: come back to the form after signing in ----
p = "app/(tabs)/local.tsx"
s = open(p).read()
a = "    router.navigate(session ? ('/business-new' as any) : ('/onboarding?step=2' as any));"
b = """    // Signing in should return them to what they were doing, not to the
    // home screen. The onboarding screen honours ?next=.
    router.navigate(session
      ? ('/business-new' as any)
      : ('/onboarding?step=2&next=/business-new' as any));"""
if a in s:
    s = s.replace(a, b, 1); open(p, "w").write(s); did.append("local redirect")

# onboarding sends them onward after a successful sign in
p = "app/onboarding.tsx"
s = open(p).read()
a = "  const { step: wantStep } = useLocalSearchParams<{ step?: string }>();"
b = "  const { step: wantStep, next: nextRoute } = useLocalSearchParams<{ step?: string; next?: string }>();"
if a in s: s = s.replace(a, b, 1)

a = """    try { await AsyncStorage.setItem('onboarded', '1'); } catch {}
    onboardingDone();
    router.replace('/(tabs)' as any);
  };"""
b = """    try { await AsyncStorage.setItem('onboarded', '1'); } catch {}
    onboardingDone();
    // Back to whatever sent them here, if anything did.
    router.replace((nextRoute ? String(nextRoute) : '/(tabs)') as any);
  };"""
if a in s:
    s = s.replace(a, b, 1); did.append("onboarding next")

open(p, "w").write(s)

print("applied:", " | ".join(did) if did else "nothing matched")
