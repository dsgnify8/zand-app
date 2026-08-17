# -*- coding: utf-8 -*-
# The map's half sheet.
#
# Tapping a card in the rail raises a panel over the map rather than
# leaving for another screen. The map stays behind it, so you keep your
# bearings — the pin you tapped is still visible above the sheet.
#
# The address is the point of this sheet. On a map, the question is
# nearly always "how do I get there", so the address is the largest
# tappable thing on it and opens whichever maps app they prefer.

import re

# ---- taller photos on the listing ----
p = "app/business.tsx"
s = open(p).read()
s = s.replace("style={{ width: W, height: 330 }}", "style={{ width: W, height: 420 }}", 1)
open(p, "w").write(s)

# ---- the sheet ----
p = "app/local-map.tsx"
s = open(p).read()
did = []

# tapping a rail card opens the sheet instead of leaving the screen
a = """            <Pressable
              key={b.id}
              style={s.railCard}
              onPress={() => router.navigate(('/business?id=' + b.id) as any)}
            >"""
b = """            <Pressable
              key={b.id}
              style={s.railCard}
              onPress={() => { setSel(b); setSheet(true); }}
            >"""
if a in s:
    s = s.replace(a, b, 1); did.append("rail opens sheet")

# state
s = s.replace("  const [listOpen, setListOpen] = useState(false);",
              "  const [listOpen, setListOpen] = useState(false);\n  const [sheet, setSheet] = useState(false);", 1)

# the sheet itself, mounted last so it sits over everything
a2 = """      {sel && !listOpen ? ("""
b2 = """      {sheet && sel ? (
        <>
          <Pressable style={s.sheetBack} onPress={() => setSheet(false)} />
          <View style={s.sheet}>
            <View style={s.grab} />

            {sel.photos?.[0] ? (
              <Image source={bizImage(sel.photos[0])} style={s.sheetShot} />
            ) : null}

            <Pressable onPress={() => router.navigate(('/business?id=' + sel.id) as any)}>
              <Text style={s.sheetName}>{fa && sel.name_fa ? sel.name_fa : sel.name}</Text>
              <Text style={s.sheetMeta}>
                {categoryLabel(sel.category, fa)}
                {sel.city ? '  ·  ' + sel.city : ''}
              </Text>
              {sel.tagline ? <Text style={s.sheetTag} numberOfLines={2}>{sel.tagline}</Text> : null}
            </Pressable>

            {/* The address is why someone is on a map. It gets the space
                and it opens whichever app they actually navigate with. */}
            {sel.address || sel.lat != null ? (
              <Pressable style={s.addr} onPress={() => openDirections(sel)}>
                <Ionicons name="navigate" size={17} color={colors.accent} />
                <View style={{ flex: 1 }}>
                  <Text style={s.addrT}>{sel.address || (fa ? 'روی نقشه' : 'On the map')}</Text>
                  <Text style={s.addrX}>{fa ? 'باز کردن در نقشه' : 'Open in Maps'}</Text>
                </View>
                <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
              </Pressable>
            ) : null}

            <View style={s.sheetActs}>
              {sel.phone ? (
                <Pressable style={s.sheetAct} onPress={() => { trackBusiness(sel.id, 'call'); Linking.openURL('tel:' + sel.phone); }}>
                  <Ionicons name="call-outline" size={15} color={colors.textPrimary} />
                  <Text style={s.sheetActT}>{fa ? 'تماس' : 'Call'}</Text>
                </Pressable>
              ) : null}
              {(sel.socials ?? {}).whatsapp ? (
                <Pressable
                  style={s.sheetAct}
                  onPress={() => {
                    trackBusiness(sel.id, 'whatsapp');
                    Linking.openURL('https://wa.me/' + (sel.socials ?? {}).whatsapp!.replace(/[^\\d]/g, ''));
                  }}
                >
                  <Ionicons name="logo-whatsapp" size={15} color={colors.textPrimary} />
                  <Text style={s.sheetActT}>WhatsApp</Text>
                </Pressable>
              ) : null}
              <Pressable
                style={[s.sheetAct, s.sheetActMain]}
                onPress={() => router.navigate(('/business?id=' + sel.id) as any)}
              >
                <Text style={[s.sheetActT, { color: '#FFF' }]}>{fa ? 'صفحهٔ کامل' : 'Full page'}</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : null}

      {sel && !listOpen && !sheet ? ("""
if a2 in s:
    s = s.replace(a2, b2, 1); did.append("sheet")

# opening directions, shared by the sheet
a3 = "  const goToMe = async () => {"
b3 = """  // Hands off to whatever the person uses. On iOS the maps: scheme
  // opens Apple Maps; on Android geo: lets the system offer Google Maps,
  // Waze and anything else installed, which is the polite thing to do.
  const openDirections = (x: Business) => {
    if (x.lat == null) return;
    trackBusiness(x.id, 'directions');
    const label = encodeURIComponent(x.name);
    const url = Platform.select({
      ios: `maps://?q=${label}&ll=${x.lat},${x.lng}`,
      android: `geo:${x.lat},${x.lng}?q=${x.lat},${x.lng}(${label})`,
      default: `https://maps.google.com/?q=${x.lat},${x.lng}`,
    })!;
    Linking.openURL(url).catch(() => {});
  };

  const goToMe = async () => {"""
if a3 in s:
    s = s.replace(a3, b3, 1); did.append("directions")

# tapping the map closes the sheet too
s = s.replace("onPress={() => { setSel(null); setListOpen(false); }}",
              "onPress={() => { setSel(null); setListOpen(false); setSheet(false); }}", 1)

# imports
m = re.search(r"import \{([^}]*)\} from 'react-native';", s)
if m and "Linking" not in m.group(1):
    s = s.replace(m.group(0), m.group(0).replace("Image,", "Image, Linking,"), 1)

m2 = re.search(r"import \{([^}]*)\} from '@/lib/businesses';", s)
if m2 and "trackBusiness" not in m2.group(1):
    parts = [x.strip() for x in m2.group(1).split(",") if x.strip()] + ["trackBusiness"]
    s = s.replace(m2.group(0), "import { " + ", ".join(sorted(set(parts))) + " } from '@/lib/businesses';", 1)

# styles
if "sheetName:" not in s:
    s = s.replace("  count: {",
"""  sheetBack: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFF', borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: 10, paddingBottom: spacing.xxl, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 20, shadowOffset: { width: 0, height: -6 }, elevation: 12 },
  grab: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.14)', marginBottom: spacing.md },
  sheetShot: { width: '100%', height: 150, borderRadius: 14, marginBottom: spacing.md },
  sheetName: { fontFamily: fonts.bodyStrong, fontSize: 18, letterSpacing: -0.3, color: colors.textPrimary },
  sheetMeta: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 3 },
  sheetTag: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginTop: 6 },
  addr: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: 'rgba(201,162,39,0.08)', borderRadius: 14, padding: spacing.md, marginTop: spacing.lg },
  addrT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: colors.textPrimary },
  addrX: { fontFamily: fonts.body, fontSize: 11.5, color: colors.accent, marginTop: 2 },
  sheetActs: { flexDirection: 'row', gap: 7, marginTop: spacing.md },
  sheetAct: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.14)' },
  sheetActMain: { flex: 1, backgroundColor: 'rgba(34,30,26,0.92)', borderColor: 'transparent' },
  sheetActT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary },
  count: {""", 1)
    did.append("styles")

open(p, "w").write(s)
print("applied:", " | ".join(did) if did else "nothing matched")
