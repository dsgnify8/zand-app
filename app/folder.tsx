// A shared folder of saved places.
//
// zandapplication.com/folder?t=<token>, and zand://folder?t=<token>. Same
// reason this file exists as app/add.tsx: the path matched no route, so
// the link opened ZAND to a blank screen.
//
// The joining itself happens on the server, in the join-folder function,
// which checks the token, makes the two people friends and adds the
// membership row. All this screen does is ask, and then get out of the way.

import { useCallback, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { HandoffScreen } from '@/components/handoff-screen';
import { HANDOFF } from '@/constants/i18n/handoff';
import { useAuth } from '@/lib/auth';
import { t as tr, useLang } from '@/lib/i18n';
import { joinFolderByToken } from '@/lib/collections';

export default function FolderLinkScreen() {
  useLang();
  const { t: token } = useLocalSearchParams<{ t?: string }>();
  const { user, loading } = useAuth();
  const [gone, setGone] = useState(false);
  const [signin, setSignin] = useState(false);

  const run = useCallback(async () => {
    const tk = (token ?? '').trim();
    if (!tk) { router.replace('/local' as any); return; }
    if (!user?.id) { setSignin(true); return; }

    const res = await joinFolderByToken(tk);
    if (res?.id) {
      // replace, not navigate: nobody wants this screen in their history.
      router.replace(('/local/folder?id=' + res.id) as any);
      return;
    }
    setGone(true);
  }, [token, user?.id]);

  useEffect(() => { if (!loading) run(); }, [loading, run]);

  if (signin) {
    return (
      <HandoffScreen
        title={tr(HANDOFF.needAccount)}
        line={tr(HANDOFF.needAccountX)}
        cta={tr(HANDOFF.makeOne)}
        onPress={() => router.replace(
          ('/onboarding?step=2&next=' + encodeURIComponent('/folder?t=' + (token ?? ''))) as any,
        )}
      />
    );
  }

  if (gone) {
    return (
      <HandoffScreen
        title={tr(HANDOFF.folderGone)}
        line={tr(HANDOFF.folderGoneX)}
        cta={tr(HANDOFF.toLocal)}
        onPress={() => router.replace('/local' as any)}
      />
    );
  }

  return <HandoffScreen title={tr(HANDOFF.folderOpening)} busy />;
}
