// A listing's page on the website, opened here instead.
//
// The site has no id in its URLs — it builds them from the name and the
// city — so the slug is matched the same way at this end. Shared by the
// /en/local/<slug> and /fa/local/<slug> routes, which is the same screen
// twice and so lives in one place.

import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { HandoffScreen } from '@/components/handoff-screen';
import { HANDOFF } from '@/constants/i18n/handoff';
import { t as tr, useLang } from '@/lib/i18n';
import { businessIdForSlug } from '@/lib/businesses';

export function ListingLink() {
  useLang();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const s = (slug ?? '').trim();
      if (!s) { router.replace('/local' as any); return; }
      const id = await businessIdForSlug(s);
      if (!alive) return;
      if (id) router.replace(('/local/business?id=' + id) as any);
      else setGone(true);
    })();
    return () => { alive = false; };
  }, [slug]);

  if (gone) {
    return (
      <HandoffScreen
        title={tr(HANDOFF.listingGone)}
        line={tr(HANDOFF.listingGoneX)}
        cta={tr(HANDOFF.toLocal)}
        onPress={() => router.replace('/local' as any)}
      />
    );
  }

  return <HandoffScreen title={tr(HANDOFF.listingOpening)} busy />;
}
