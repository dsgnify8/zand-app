# What a listing calls the place you find it.
#
# "Address" is wrong for a shop that only exists online, and the section
# reading Address above a URL is the kind of small wrongness that makes a
# directory feel like it was not built for you.
#
# Five choices, because more than that is a decision rather than a pick.
# Null keeps meaning Address, so nothing already listed changes.

total = 0


def sub(s, a, b, label):
    global total
    if a in s:
        total += 1
        return s.replace(a, b, 1)
    print("   skipped:", label)
    return s


# ------------------------------------------------------------- the type
p = "lib/businesses.ts"
s = open(p).read()

s = sub(s, "  featured?: boolean;",
"""  featured?: boolean;
  /**
   * What to call the place: 'address' | 'website' | 'online' | 'studio' |
   * 'appointment'. Null means address, so nothing already listed changes.
   */
  location_label?: string | null;
  /** Offered at submission; whether it becomes a page is decided later. */
  has_story?: boolean;
  story_pitch?: string | null;""",
        "type")

# the options, next to CATEGORIES so they are found together
s = sub(s, "export const CATEGORIES = [",
"""/**
 * How a listing describes where to find it.
 *
 * Deliberately short. A picker with twelve entries is a form; one with
 * five is a choice.
 */
export const LOCATION_LABELS = [
  { key: 'address',     en: 'Address',        fa: 'نشانی' },
  { key: 'website',     en: 'Website',        fa: 'وب‌سایت' },
  { key: 'online',      en: 'Online store',   fa: 'فروشگاه اینترنتی' },
  { key: 'studio',      en: 'Studio',         fa: 'استودیو' },
  { key: 'appointment', en: 'By appointment', fa: 'با وقت قبلی' },
] as const;

export function locationLabel(key: string | null | undefined, fa: boolean) {
  const l = LOCATION_LABELS.find((x) => x.key === (key || 'address'));
  return l ? (fa ? l.fa : l.en) : (fa ? 'نشانی' : 'Address');
}

export const CATEGORIES = [""",
        "options")

open(p, "w").write(s)
print("businesses.ts done")


# ------------------------------------------------------ the page label
p = "app/(tabs)/business.tsx"
s = open(p).read()

s = sub(s, "<Text style={[s.blockL, { color: ACT_TINT.address }]}>{t(LOCAL.addressLabel)}</Text>",
        "<Text style={[s.blockL, { color: ACT_TINT.address }]}>{locationLabel(b.location_label, fa).toUpperCase()}</Text>",
        "page label")

s = sub(s, "import { colors, fonts, radius, spacing } from '@/constants/zand-theme';",
        "import { colors, fonts, radius, spacing } from '@/constants/zand-theme';\n"
        "import { locationLabel } from '@/lib/businesses';",
        "page import")

open(p, "w").write(s)
print("business.tsx done")


# ------------------------------------------------------- the form
p = "app/(tabs)/business-new.tsx"
s = open(p).read()

# find where address is captured so the picker can sit above it
import re
m = re.search(r"[^\n]*address[^\n]*\n", s)
print("\naddress in the form:")
for line in s.split("\n"):
    if "address" in line.lower():
        print("   ", line.strip()[:90])

open(p, "w").write(s)

print("\ntotal:", total)
print("\nThe form lines are above — the picker goes next to whichever one")
print("renders the address field.")
