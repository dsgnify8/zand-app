// Switching language.
//
// The old version called I18nManager.forceRTL(), which flips the native
// layout engine and genuinely does need a reload — hence the restart
// alert with no way out.
//
// But this app never relied on that. Every right-to-left treatment is
// explicit in the styles: textAlign, writingDirection, and row-reverse
// where a row has an icon beside text. Persian renders correctly with
// the layout engine left alone. So we do not touch I18nManager, the
// change is instant, and there is nothing to restart.
//
// The brief overlay is not a loading state — the switch is immediate.
// It is there so the change registers as deliberate rather than the
// screen appearing to glitch.

import { setLang, type Lang } from '@/lib/i18n';

let overlayFn: ((msg: string | null) => void) | null = null;

/** The root layout registers here so we can show the switching message. */
export function registerLangOverlay(fn: (msg: string | null) => void) {
  overlayFn = fn;
  return () => { overlayFn = null; };
}

export async function applyLanguage(next: Lang) {
  console.log('[lang] applyLanguage', next); // TEMP-LANG-LOG
  const msg = next === 'fa' ? 'در حال تغییر به فارسی…' : 'Switching to English…';
  overlayFn?.(msg);

  await setLang(next);

  // Long enough to read, short enough not to be a wait. The language has
  // already changed underneath by the time this clears.
  await new Promise((r) => setTimeout(r, 700));
  overlayFn?.(null);
}
