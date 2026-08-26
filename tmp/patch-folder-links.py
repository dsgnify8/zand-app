# Folder links.
#
# The token lives on the folder and the link carries only the token, so an
# id on its own grants nothing. Joining goes through an edge function
# running with the service key — the alternative was a policy letting
# anyone signed in read every shared folder's row, which is a great deal
# of access for one screen.
#
# The deep link handler follows the friend-invite one already in the file.

total = 0


def sub(s, a, b, label):
    global total
    if a in s:
        total += 1
        return s.replace(a, b, 1)
    print("   skipped:", label)
    return s


# ------------------------------------------------- the token and the link
p = "lib/collections.ts"
s = open(p).read()

s = sub(s, "/* ---------------- sharing ---------------- */",
"""/* ---------------- sharing ---------------- */

/**
 * The link for a folder, making a token if it has none.
 *
 * Lazily: most folders are never shared, and a token on every one is a
 * row of dead data and a slightly larger surface to guess at.
 */
export async function folderLink(collectionId: string) {
  const { data: existing } = await supabase
    .from('saved_collections')
    .select('share_token')
    .eq('id', collectionId)
    .maybeSingle();

  let token = existing?.share_token as string | undefined;

  if (!token) {
    // Long enough that guessing is pointless, short enough to paste.
    token = Array.from({ length: 3 })
      .map(() => Math.random().toString(36).slice(2, 10))
      .join('');
    await supabase.from('saved_collections')
      .update({ share_token: token })
      .eq('id', collectionId);
  }

  return 'https://zand.app/folder?t=' + token;
}

/**
 * Stop every link already handed out.
 *
 * A shared folder is a space, and there has to be a way to close it
 * without deleting what is in it.
 */
export async function revokeFolderLink(collectionId: string) {
  await supabase.from('saved_collections')
    .update({ share_token: null })
    .eq('id', collectionId);
}

/** Join by token. The function checks it, befriends, and adds. */
export async function joinFolderByToken(token: string) {
  const { data, error } = await supabase.functions.invoke('join-folder', {
    body: { token },
  });
  if (error) return null;
  return data as { ok?: boolean; id?: string; name?: string; mine?: boolean; error?: string };
}
""", "sharing helpers")

open(p, "w").write(s)
print("collections.ts done")


# --------------------------------------------------- the deep link
p = "lib/deep-links.ts"
s = open(p).read()

s = sub(s, "// Handle zand://add?from=<id> and https://zand.app/add?from=<id>",
"""// Handle zand://add?from=<id> and https://zand.app/add?from=<id>
// and zand://folder?t=<token> for a shared folder.""", "comment")

s = sub(s, """      const parsed = Linking.parse(url);
      const from = parsed.queryParams?.from as string | undefined;
      if (!from || from === myId) return;""",
"""      const parsed = Linking.parse(url);

      // A folder link. Joining makes the two people friends as well, so
      // there is nothing further to do here.
      const token = parsed.queryParams?.t as string | undefined;
      if (token) {
        const res = await joinFolderByToken(token);
        if (res?.id) router.navigate(('/local-folder?id=' + res.id) as any);
        return;
      }

      const from = parsed.queryParams?.from as string | undefined;
      if (!from || from === myId) return;""", "handler")

s = sub(s, "import { supabase } from '@/lib/supabase';",
        "import { router } from 'expo-router';\n\nimport { supabase } from '@/lib/supabase';\n"
        "import { joinFolderByToken } from '@/lib/collections';", "imports")

open(p, "w").write(s)
print("deep-links.ts done")
print("\ntotal:", total)
