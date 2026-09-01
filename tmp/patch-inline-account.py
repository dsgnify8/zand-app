# Editing where the value is.
#
# The three account fields opened a sheet at the foot of the screen, which
# on a phone is exactly where the keyboard arrives — so the field you were
# editing was the one thing you could not see.
#
# Now the row edits in place. The pencil turns the value into an input, a
# tick saves it, and each field saves on its own. Nothing moves, nothing
# is covered, and the sheet goes.

p = "components/profile-modals.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


# ------------------------------------------------------ the three rows
sub("""            <Pressable style={m.field} onPress={() => startEdit('name', displayName)}>
              <Text style={m.fieldL}>{tset(SETTINGS.name)}</Text>
              <View style={m.fieldRow}><Text style={m.fieldV}>{displayName}</Text><Ionicons name="pencil-outline" size={14} color={pr.dim} /></View>
            </Pressable>
            <Pressable style={m.field} onPress={() => startEdit('email', email)}>
              <Text style={m.fieldL}>{tset(SETTINGS.email)}</Text>
              <View style={m.fieldRow}><Text style={m.fieldV}>{email}</Text><Ionicons name="pencil-outline" size={14} color={pr.dim} /></View>
            </Pressable>
            <Pressable style={m.field} onPress={() => startEdit('phone', phone)}>
              <Text style={m.fieldL}>{tset(SETTINGS.phone)}</Text>
              <View style={m.fieldRow}><Text style={m.fieldV}>{phone || tset(PROFILE.addNumber)}</Text><Ionicons name="pencil-outline" size={14} color={pr.dim} /></View>
            </Pressable>""",
"""            {([
              { f: 'name' as const, label: tset(SETTINGS.name), value: displayName, keyboard: 'default' as const },
              { f: 'email' as const, label: tset(SETTINGS.email), value: email, keyboard: 'email-address' as const },
              { f: 'phone' as const, label: tset(SETTINGS.phone), value: phone || tset(PROFILE.addNumber), keyboard: 'phone-pad' as const },
            ]).map((row) => {
              const editing = editField === row.f;
              return (
                <Pressable
                  key={row.f}
                  style={m.field}
                  onPress={() => { if (!editing) startEdit(row.f, row.f === 'phone' ? phone : row.value); }}
                >
                  <Text style={m.fieldL}>{row.label}</Text>
                  <View style={m.fieldRow}>
                    {editing ? (
                      <>
                        <TextInput
                          style={[m.fieldV, m.fieldInput]}
                          value={editVal}
                          onChangeText={setEditVal}
                          keyboardType={row.keyboard}
                          autoCapitalize={row.f === 'name' ? 'words' : 'none'}
                          autoCorrect={false}
                          autoFocus
                          onSubmitEditing={saveEdit}
                          returnKeyType="done"
                        />
                        <Pressable hitSlop={10} onPress={saveEdit} disabled={editBusy}>
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color={editBusy ? pr.dim : colors.accent}
                          />
                        </Pressable>
                        <Pressable hitSlop={10} onPress={() => { setEditField(null); setEditMsg(''); }}>
                          <Ionicons name="close" size={17} color={pr.dim} />
                        </Pressable>
                      </>
                    ) : (
                      <>
                        <Text style={m.fieldV}>{row.value}</Text>
                        <Ionicons name="pencil-outline" size={14} color={pr.dim} />
                      </>
                    )}
                  </View>
                  {editing && editMsg ? <Text style={m.fieldMsg}>{editMsg}</Text> : null}
                </Pressable>
              );
            })}""",
    "rows")

# ------------------------------------------------- a style for the input
sub("  fieldRow: {",
"""  // The input sits exactly where the value did, so nothing shifts when
  // the pencil is pressed.
  fieldInput: { flex: 1, paddingVertical: 0 },
  fieldMsg: { fontFamily: fonts.body, fontSize: 11.5, color: pr.dim, marginTop: 6 },
  fieldRow: {""",
    "styles")

open(s and p, "w").write(s)
print("total:", total)

# what is left of the sheet
for i, line in enumerate(s.split("\n"), 1):
    if "editField ?" in line:
        print("  sheet still at line", i, "-", line.strip()[:60])
