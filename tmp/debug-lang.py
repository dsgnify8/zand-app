# Temporary instrumentation. Every line is tagged TEMP-LANG-LOG so it can be
# stripped in one pass afterwards.
#
# I have guessed twice about why the selector does not update and been wrong
# both times, so this measures the chain instead:
#
#   applyLanguage -> setLang -> emit -> useLang subscriber ticks -> row renders
#
# Whichever log stops appearing is where it breaks.

total = 0

def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", path.split("/")[-1], "|", a.strip().splitlines()[0][:52])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n}")


edit("lib/i18n.ts", [
 ("const emit = () => listeners.forEach((l) => l());",
  "const emit = () => { console.log('[lang] emit to', listeners.size, 'listeners'); listeners.forEach((l) => l()); }; // TEMP-LANG-LOG"),

 ("""export async function setLang(v: Lang) {
  lang = v;""",
  """export async function setLang(v: Lang) {
  console.log('[lang] setLang called with', v, 'was', lang); // TEMP-LANG-LOG
  lang = v;"""),

 ("""export function useLang() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);""",
  """export function useLang() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => { console.log('[lang] subscriber ticked'); tick((n) => n + 1); }; // TEMP-LANG-LOG"""),
])

edit("lib/apply-language.ts", [
 ("export async function applyLanguage(next: Lang) {",
  "export async function applyLanguage(next: Lang) {\n  console.log('[lang] applyLanguage', next); // TEMP-LANG-LOG"),
])

edit("components/profile-modals.tsx", [
 ("            {[\n              { code: 'en', label: 'English' },",
  "            {console.log('[lang] language row rendering, curLang =', curLang) as any}\n"
  "            {[\n              { code: 'en', label: 'English' },"),
])

print("\ntotal:", total)
print("\nSwitch the language in Settings and paste everything tagged [lang].")
