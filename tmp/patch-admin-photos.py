# Photographs, from the admin editor.
#
# The editor could show a listing's photos and not change them — the note
# said the owner adds these from their own page, which is true and is also
# no help when a listing was entered by hand and has none.
#
# Uploads go to the same bucket the owner's page writes to, and the row
# holds a storage path. So the app and the website read the same file, and
# neither keeps a copy: change the row and both change.

p = "app/admin-business.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("""              {(b.photos ?? []).length ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.shots}>
                  {(b.photos ?? []).map((p) => (
                    <View key={p} style={s.shot}>
                      <Image source={bizImage(p)} style={StyleSheet.absoluteFill as any} />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text style={s.hint}>No photographs. The owner adds these from their own page.</Text>
              )}""",
"""              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.shots}>
                {(b.photos ?? []).map((p) => (
                  <View key={p} style={s.shot}>
                    <Image source={bizImage(p)} style={StyleSheet.absoluteFill as any} />
                    {/* Removing takes it off the listing everywhere at
                        once — the app and the website read this same row,
                        so there is no second place to tidy up. */}
                    <Pressable
                      style={s.shotX}
                      onPress={() => set({ photos: (b.photos ?? []).filter((x) => x !== p) } as any)}
                    >
                      <Ionicons name="close" size={13} color="#FFF" />
                    </Pressable>
                  </View>
                ))}

                <Pressable style={[s.shot, s.shotAdd]} onPress={addPhoto} disabled={uploading}>
                  {uploading ? (
                    <ActivityIndicator size="small" color={colors.accent} />
                  ) : (
                    <>
                      <Ionicons name="add" size={20} color={colors.accent} />
                      <Text style={s.shotAddT}>Add</Text>
                    </>
                  )}
                </Pressable>
              </ScrollView>""",
    "photo rail")


sub("""  const [tab, setTab] = useState""",
"""  // Uploading a photograph. Straight to the bucket the owner's own page
  // writes to, so a picture added here is the same object they would see
  // and can replace.
  const [uploading, setUploading] = useState(false);

  const addPhoto = async () => {
    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
    });
    if (picked.canceled || !picked.assets?.[0]?.uri) return;

    setUploading(true);
    try {
      const slug = (b.name ?? 'listing')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const path = await uploadPhoto(slug, picked.assets[0].uri);
      if (path) set({ photos: [...(b.photos ?? []), path] } as any);
    } finally {
      setUploading(false);
    }
  };

  const [tab, setTab] = useState""",
    "handler")


sub("  shot: {",
"""  shotX: {
    position: 'absolute', top: 5, right: 5,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: 'rgba(20,16,12,0.55)',
    alignItems: 'center', justifyContent: 'center',
  },
  // Dashed, so it reads as a space rather than a picture.
  shotAdd: {
    alignItems: 'center', justifyContent: 'center', gap: 3,
    borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(140,58,46,0.35)',
    backgroundColor: 'rgba(140,58,46,0.05)',
  },
  shotAddT: { fontFamily: fonts.body, fontSize: 10.5, color: colors.accent },

  shot: {""",
    "styles")


open(p, "w").write(s)
print("total:", total)

# and the imports it now needs
import re

want = {
    "expo-image-picker": "import * as ImagePicker from 'expo-image-picker';",
    "uploadPhoto": None,      # handled below, it joins an existing import
}

s = open(p).read()
if "expo-image-picker" not in s:
    m = re.search(r"^import .*from 'react-native';\n", s, re.M)
    s = s[:m.end()] + want["expo-image-picker"] + "\n" + s[m.end():]
    print("imported: ImagePicker")

m = re.search(r"import \{([^}]*)\} from '@/lib/business-photos';", s)
if m and "uploadPhoto" not in m.group(1):
    s = s[:m.start(1)] + " uploadPhoto," + m.group(1) + s[m.end(1):]
    print("imported: uploadPhoto")

m = re.search(r"import \{([^}]*)\} from 'react-native';", s)
for name in ["ActivityIndicator", "Pressable"]:
    if name not in m.group(1):
        s = s[:m.start(1)] + " " + name + "," + m.group(1) + s[m.end(1):]
        m = re.search(r"import \{([^}]*)\} from 'react-native';", s)
        print("imported:", name)

open(p, "w").write(s)
