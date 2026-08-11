// One hook that owns the paywall, so 21 call sites do not each have to.
//
// Usage in a screen:
//
//   const { say, listen, PaywallHost } = useMetered();
//   ...
//   <Pressable onPress={() => say(word)} />
//   ...
//   {PaywallHost}
//
// The screen calls `say` exactly as it used to call `speak`, and renders
// PaywallHost once anywhere in its tree. Everything about limits and the
// sheet stays in here.

import { useCallback, useState } from 'react';
import { speak as rawSpeak } from '@/lib/speak';
import { transcribe as rawTranscribe } from '@/lib/listen';
import { Paywall } from '@/components/paywall';
import type { Meter } from '@/lib/usage';

export function useMetered() {
  const [hit, setHit] = useState<Meter | null>(null);

  const say = useCallback(async (text: string, lang = 'fa', opts?: { slow?: boolean }) => {
    const r = await rawSpeak(text, lang, opts);
    if (r === 'limit') setHit('speak');
  }, []);

  const listen = useCallback(async (uri: string, lang = 'fa-IR') => {
    const r = await rawTranscribe(uri, lang);
    if (r === 'limit') { setHit('listen'); return null; }
    return r;
  }, []);

  const PaywallHost = (
    <Paywall
      open={hit !== null}
      meter={hit ?? 'speak'}
      onClose={() => setHit(null)}
      onSubscribe={() => {
        // Real purchase goes here once App Store Connect has the product.
        // Deliberately left as a no-op rather than a fake success: a
        // stub that pretends to charge would be worse than one that
        // visibly does nothing yet.
        setHit(null);
      }}
    />
  );

  return { say, listen, PaywallHost };
}
