// Where an invitation lands.
//
// zandapplication.com/add?from=<id>, and zand://add?from=<id> from the
// website's button. Both arrive here.
//
// This screen has to exist. Without it the path matched no route, and an
// unmatched route in expo-router is a blank screen — so every invitation
// anyone sent opened ZAND to black and stopped there. The friendship was
// being made correctly all along; there was simply nothing to look at.

import { useCallback, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { HandoffScreen } from '@/components/handoff-screen';
import { HANDOFF } from '@/constants/i18n/handoff';
import { useAuth } from '@/lib/auth';
import { t as tr, useLang } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { acceptRequest, nameOf, sendRequest } from '@/lib/friends';

type State = 'working' | 'connected' | 'asked' | 'self' | 'signin';

export default function AddScreen() {
  useLang();
  const { from } = useLocalSearchParams<{ from?: string }>();
  const { user, loading } = useAuth();

  const [state, setState] = useState<State>('working');
  const [who, setWho] = useState('');

  const run = useCallback(async () => {
    const other = (from ?? '').trim();
    const me = user?.id;

    if (!other) { router.replace('/(tabs)' as any); return; }
    if (other === me) { setState('self'); return; }

    // Not signed in. Remember nothing: the link itself is the memory, so
    // it is handed to onboarding and comes back here afterwards.
    if (!me) { setState('signin'); return; }

    try {
      // If they already asked for us, accept theirs rather than filing a
      // second request in the other direction.
      const { data: theirs } = await supabase
        .from('friendships')
        .select('id, status')
        .eq('requester', other)
        .eq('addressee', me)
        .limit(1);

      if (theirs && theirs[0]) {
        if (theirs[0].status !== 'accepted') await acceptRequest(theirs[0].id);
        setWho(await nameOf(other));
        setState('connected');
        return;
      }

      // Already ours, already sent: say so rather than trying again.
      const { data: mine } = await supabase
        .from('friendships')
        .select('id, status')
        .eq('requester', me)
        .eq('addressee', other)
        .limit(1);

      if (!mine || !mine[0]) await sendRequest(me, other);
      setWho(await nameOf(other));
      setState(mine && mine[0]?.status === 'accepted' ? 'connected' : 'asked');
    } catch {
      // A failed invitation is not worth a dead end. They are in the app;
      // the friends sheet is two taps away.
      router.replace('/(tabs)' as any);
    }
  }, [from, user?.id]);

  // Waits for auth to settle. Deciding while the session is still loading
  // told a signed-in person to make an account.
  useEffect(() => { if (!loading) run(); }, [loading, run]);

  if (state === 'signin') {
    return (
      <HandoffScreen
        title={tr(HANDOFF.needAccount)}
        line={tr(HANDOFF.needAccountX)}
        cta={tr(HANDOFF.makeOne)}
        onPress={() => router.replace(
          ('/onboarding?step=2&next=' + encodeURIComponent('/add?from=' + (from ?? ''))) as any,
        )}
      />
    );
  }

  if (state === 'self') {
    return (
      <HandoffScreen
        title={tr(HANDOFF.ownLink)}
        line={tr(HANDOFF.ownLinkX)}
        cta={tr(HANDOFF.goOn)}
        onPress={() => router.replace('/(tabs)' as any)}
      />
    );
  }

  if (state === 'connected' || state === 'asked') {
    const fill = (s: string) => s.replace('{name}', who || tr(HANDOFF.someone));
    return (
      <HandoffScreen
        title={tr(state === 'connected' ? HANDOFF.connected : HANDOFF.asked)}
        line={fill(tr(state === 'connected' ? HANDOFF.connectedX : HANDOFF.askedX))}
        cta={tr(HANDOFF.goOn)}
        onPress={() => router.replace('/profile' as any)}
      />
    );
  }

  return <HandoffScreen title={tr(HANDOFF.connecting)} busy />;
}
