import { Alert, I18nManager } from 'react-native';
import { setLang, type Lang, getLang } from '@/lib/i18n';

// Farsi needs right-to-left. Flipping RTL requires a reload to take effect,
// so we set it, then offer to restart into the correct layout.
export async function applyLanguage(next: Lang) {
  const prev = getLang();
  await setLang(next);

  const wantRTL = next === 'fa';
  const rtlChanged = I18nManager.isRTL !== wantRTL;

  if (rtlChanged) {
    I18nManager.allowRTL(wantRTL);
    I18nManager.forceRTL(wantRTL);

    const title = wantRTL
      ? 'برای فارسی، برنامه دوباره باز می‌شود'
      : 'Restart to apply';
    const body = wantRTL
      ? 'برای چیدمان درست فارسی، برنامه بسته و دوباره باز می‌شود.\nThe app will reopen to switch to Farsi.'
      : 'The app will reopen to apply the new layout.';
    const ok = wantRTL ? 'باز کن  ·  Restart' : 'Restart';

    Alert.alert(title, body, [
      {
        text: ok,
        onPress: async () => {
          try {
            const Updates = await import('expo-updates');
            await Updates.reloadAsync();
          } catch {
            // dev/Expo Go: reload not available; the change applies on next manual reload
          }
        },
      },
    ]);
  }
}
