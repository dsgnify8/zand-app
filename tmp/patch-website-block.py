# Where to find them.
#
# An address always wins that slot: it is the thing you can walk to, and it
# comes with a map. A listing without one is usually online-only, and
# showing an empty Address block above a shop that has no door is worse
# than showing nothing.
#
# So: address if there is one, otherwise the website under a name the owner
# chose. "Our online store" rather than forty characters of URL — the URL is
# still what opens, it is just not what is read.

total = 0
p = "app/(tabs)/business.tsx"
s = open(p).read()

a = """          {b.address || b.lat != null ? (
            <Pressable
              style={s.block}
              onPress={() => b.lat != null && router.navigate(('/local-map?focus=' + b.id) as any)}
            >
              <Text style={[s.blockL, { color: ACT_TINT.address }]}>{t(LOCAL.addressLabel)}</Text>
              <View style={s.addrRow}>
                <Text style={[s.blockV, fa && s.rtl, { flex: 1 }]}>{b.address || (fa ? 'روی نقشه' : t(LOCAL.seeOnMap))}</Text>
                {b.lat != null ? (
                  <View style={s.mapChip}>
                    <Ionicons name="map-outline" size={14} color={colors.accent} />
                  </View>
                ) : null}
              </View>
            </Pressable>
          ) : null}"""

b = """          {b.address || b.lat != null ? (
            <Pressable
              style={s.block}
              onPress={() => b.lat != null && router.navigate(('/local-map?focus=' + b.id) as any)}
            >
              <Text style={[s.blockL, { color: ACT_TINT.address }]}>{t(LOCAL.addressLabel)}</Text>
              <View style={s.addrRow}>
                <Text style={[s.blockV, fa && s.rtl, { flex: 1 }]}>{b.address || t(LOCAL.seeOnMap)}</Text>
                {b.lat != null ? (
                  <View style={s.mapChip}>
                    <Ionicons name="map-outline" size={14} color={colors.accent} />
                  </View>
                ) : null}
              </View>
            </Pressable>
          ) : b.website ? (
            /* No door, so the website takes the slot. The owner names it,
               because a URL is an instruction to a machine and this line is
               read by a person. */
            <Pressable
              style={s.block}
              onPress={() =>
                Linking.openURL(b.website!.startsWith('http') ? b.website! : 'https://' + b.website)
              }
            >
              <Text style={[s.blockL, { color: ACT_TINT.website }]}>{t(LOCAL.website).toUpperCase()}</Text>
              <View style={s.addrRow}>
                <Text style={[s.blockV, fa && s.rtl, { flex: 1 }]} numberOfLines={1}>
                  {b.website_label
                    || b.website!.replace(/^https?:\\/\\//, '').replace(/^www\\./, '').replace(/\\/$/, '')}
                </Text>
                <View style={s.mapChip}>
                  <Ionicons name="open-outline" size={14} color={colors.accent} />
                </View>
              </View>
            </Pressable>
          ) : null}"""

if a in s:
    s = s.replace(a, b, 1); total += 1
    open(p, "w").write(s)
    print("block replaced")
else:
    print("   skipped: address block")

print("Linking imported:", "Linking" in s.split("from 'react-native'")[0])


# ------------------------------------------------------------- the form
p = "app/(tabs)/business-new.tsx"
s = open(p).read()

print("\nwebsite in the form:")
for i, line in enumerate(s.split("\n"), 1):
    if "website" in line.lower():
        print(f"   {i}: {line.strip()[:88]}")
print("\ntotal:", total)
