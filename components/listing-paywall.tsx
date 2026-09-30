// Buying a listing.
//
// The look lives in listing-paywall-card. This file is the wiring, and
// it is written so the card can still be drawn on a build that has no
// StoreKit in it: the purchase module is required at run time rather
// than imported, and when it is missing the card appears with its button
// doing nothing. That is how the design gets looked at before a build
// exists, and it is why the hook sits in its own component: hooks cannot
// be called conditionally.

import { useState } from 'react';
import { requireOptionalNativeModule } from 'expo-modules-core';

import { ListingPaywallCard } from '@/components/listing-paywall-card';
import { LISTING_PRODUCT_ID, recordPurchase } from '@/lib/billing';
import { useAuth } from '@/lib/auth';
import { getLang, t } from '@/lib/i18n';
import { BILLING } from '@/constants/i18n/billing';

// Requiring the package always works: it is the native side that is
// missing on a build made before it was added, and that only shows up
// when the hook runs. Asking for the native module directly is the only
// honest test, and it is what keeps this screen drawable in a dev build.
const HAS_IAP = !!requireOptionalNativeModule('ExpoIap');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const IAP: any = HAS_IAP ? require('expo-iap') : null;

export type PaywallProps = {
  open: boolean;
  businessId: string | null;
  onDone: () => void;
  onClose: () => void;
};

export function ListingPaywall(props: PaywallProps) {
  if (!props.open) return null;
  // No StoreKit here: the card is drawn for the look of it, and says so
  // rather than pretending to sell anything.
  if (!IAP?.useIAP) return <PaywallPreview {...props} />;
  return <PaywallLive {...props} />;
}

function PaywallPreview({ onClose }: PaywallProps) {
  const [note, setNote] = useState<string | null>(null);
  return (
    <ListingPaywallCard
      note={note}
      onStart={() => setNote(
        getLang() === 'fa'
          ? 'این نسخه‌ی آزمایشی است. خرید در بیلد بعدی فعال می‌شود.'
          : 'Preview only. Buying works in the next build.',
      )}
      onRestore={() => setNote(t(BILLING.nothingToRestore))}
      onClose={onClose}
    />
  );
}

function PaywallLive({ businessId, onDone, onClose }: PaywallProps) {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const {
    requestPurchase, finishTransaction, restorePurchases,
    getAvailablePurchases, availablePurchases,
  } = IAP.useIAP({
    onPurchaseSuccess: async (purchase: any) => {
      // Our server checks with Apple before anything counts. The
      // transaction is finished afterwards, so a failed call cannot
      // throw away the proof.
      const res = await recordPurchase({
        businessId, jws: purchase?.purchaseToken, transactionId: purchase?.id,
      });
      try { await finishTransaction({ purchase }); } catch {}
      setBusy(false);
      if (res.ok) onDone();
      else setNote(t(BILLING.failed));
    },
    onPurchaseError: () => setBusy(false),
  });

  const start = async () => {
    setBusy(true);
    setNote(null);
    try {
      await requestPurchase({
        type: 'subs',
        request: {
          // Ties Apple's transaction to this person, so a renewal months
          // from now still knows whose listing it is.
          apple: { sku: LISTING_PRODUCT_ID, appAccountToken: user?.id ?? undefined },
        },
      });
    } catch {
      setBusy(false);
    }
  };

  const restore = async () => {
    setBusy(true);
    setNote(null);
    try {
      await restorePurchases();
      await getAvailablePurchases();
      const hit = (availablePurchases ?? []).find((p: any) => p.productId === LISTING_PRODUCT_ID);
      if (hit) {
        const res = await recordPurchase({
          businessId, jws: hit.purchaseToken, transactionId: hit.id,
        });
        setBusy(false);
        if (res.ok) { setNote(t(BILLING.restored)); onDone(); return; }
      }
      setBusy(false);
      setNote(t(BILLING.nothingToRestore));
    } catch {
      setBusy(false);
      setNote(t(BILLING.nothingToRestore));
    }
  };

  return (
    <ListingPaywallCard
      busy={busy}
      note={note}
      onStart={start}
      onRestore={restore}
      onClose={onClose}
    />
  );
}
