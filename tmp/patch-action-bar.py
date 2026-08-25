# Mount the action bar, and tidy what it replaces.
#
# The hidden actions row goes entirely rather than staying as a display:none
# ghost — dead JSX left behind is how a file becomes hard to read.
#
# Also collapses the fa ? 'Persian' : t(...) ternaries on this page. Each one
# holds the Persian inline and the English in i18n, so there are two places
# to change one string and they will drift.

total = 0
p = "app/business.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("import { ACT_TINT } from '@/components/local-tints';",
    "import { ACT_TINT } from '@/components/local-tints';\n"
    "import { BusinessActionBar } from '@/components/business-action-bar';",
    "import")

# the old row out
sub("""          {/* Actions live in the bar at the foot of the screen now, so they
              are reachable from anywhere on the page rather than only from
              the top. This row is kept for the layout spacing it provides. */}
          <View style={[s.actions, { display: 'none' }]}>
            {b.phone ? (
              <Pressable style={s.act} onPress={() => Linking.openURL('tel:' + b.phone)}>
                <Ionicons name="call-outline" size={16} color={colors.accent} />
                <Text style={s.actT}>{fa ? 'تماس' : 'Call'}</Text>
              </Pressable>
            ) : null}
            {b.lat != null ? (
              <Pressable style={s.act} onPress={directions}>
                <Ionicons name="navigate-outline" size={16} color={colors.accent} />
                <Text style={s.actT}>{fa ? 'مسیر' : t(LOCAL.directions)}</Text>
              </Pressable>
            ) : null}
            {b.website ? (
              <Pressable
                style={s.act}
                onPress={() => Linking.openURL(b.website!.startsWith('http') ? b.website! : 'https://' + b.website)}
              >
                <Ionicons name="globe-outline" size={16} color={colors.accent} />
                <Text style={s.actT}>{fa ? 'وب‌سایت' : t(LOCAL.website)}</Text>
              </Pressable>
            ) : null}
          </View>
""", "", "old actions row")

# the bar, outside the scroll view so it stays put
sub("""      </Animated.ScrollView>
    </View>
  );
}""",
"""      </Animated.ScrollView>

      <BusinessActionBar
        phone={b.phone}
        website={b.website}
        hasMap={b.lat != null}
        onDirections={directions}
      />
    </View>
  );
}""",
    "bar mount")

# the doubled strings
for a, b, label in [
    ("{fa ? 'نشانی' : 'ADDRESS'}", "{t(LOCAL.addressLabel)}", "address"),
    ("{fa ? 'روی نقشه' : t(LOCAL.seeOnMap)}", "{t(LOCAL.seeOnMap)}", "seeOnMap"),
]:
    sub(a, b, "ternary: " + label)

open(p, "w").write(s)
print("business.tsx:", total)

# ------------------------------------------------------------- the keys
p = "constants/i18n/local.ts"
s = open(p).read()
if "addressLabel" not in s:
    a = "  // a single business"
    b = """  // a single business
  call: { en: 'Call', fa: 'تماس' },
  addressLabel: { en: 'ADDRESS', fa: 'نشانی' },
  hoursLabel: { en: 'HOURS', fa: 'ساعت کار' },
  socialLabel: { en: 'SOCIAL', fa: 'شبکه‌های اجتماعی' },
  nearbyLabel: { en: 'NEARBY', fa: 'همین نزدیکی' },"""
    if a in s:
        s = s.replace(a, b, 1); open(p, "w").write(s); total += 1
        print("local.ts: keys added")
    else:
        print("   skipped: local.ts anchor — add call/addressLabel by hand")
else:
    print("local.ts: keys already present")

print("\ntotal:", total)
src = open("app/business.tsx").read()
print("action bar mounted:", src.count("<BusinessActionBar"))
print("display:none left:", src.count("display: 'none'"))
