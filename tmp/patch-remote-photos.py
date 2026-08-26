# Let a listing's photo be a URL.
#
# Photos are either a storage path or a bundled demo key. A third case is
# useful and costs almost nothing: a full URL, used as-is. It means a
# listing can be seeded with images that live somewhere else without
# uploading each one first.
#
# Not something owners can do — the submission form uploads, as it should.
# This is for seeding.

p = "lib/business-photos.ts"
s = open(p).read()

a = """export function photoUrl(path: string): string {"""
b = """/**
 * A photo that already lives somewhere else.
 *
 * Storage paths and bundled keys never start with a scheme, so this is
 * unambiguous.
 */
export function isRemote(path: string) {
  return /^https?:\\/\\//.test(path);
}

export function photoUrl(path: string): string {
  // Already a URL: nothing to resolve.
  if (isRemote(path)) return path;"""
print("photoUrl:", a in s)
s = s.replace(a, b, 1)
open(p, "w").write(s)
print("isRemote exported:", "export function isRemote" in s)
PY_END = None

# and the callers, which check isBundled first
import re
import subprocess
out = subprocess.run(["grep", "-rn", "isBundled(", "app", "components"],
                     capture_output=True, text=True).stdout
print("\ncallers to update:")
for line in out.strip().split("\n"):
    print("   ", line[:100])
