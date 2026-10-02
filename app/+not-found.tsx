// A path that matches nothing.
//
// This file is the whole reason the invitation links went black: expo-router
// draws nothing at all for an unmatched route, and with no fallback the app
// sat there empty with no way out. Every link ZAND shares is a URL somebody
// can mistype, shorten, or open on a version that does not know it yet, so
// there has to be a floor under all of them.
//
// It does not explain itself for long. Anything unrecognised goes home.

import { useEffect } from 'react';
import { router } from 'expo-router';

import { HandoffScreen } from '@/components/handoff-screen';
import { HANDOFF } from '@/constants/i18n/handoff';
import { t as tr, useLang } from '@/lib/i18n';

export default function NotFound() {
  useLang();

  useEffect(() => {
    const t = setTimeout(() => router.replace('/(tabs)' as any), 900);
    return () => clearTimeout(t);
  }, []);

  return <HandoffScreen title={tr(HANDOFF.lost)} line={tr(HANDOFF.lostX)} />;
}
