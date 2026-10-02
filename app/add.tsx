// Where an invitation lands.
//
// zandapplication.com/add?i=<token>, and zand://add?i=<token> from the
// website's button. Both arrive here.
//
// Tapping an invitation connects the two people outright rather than
// filing a request. The inviter made the link and whoever tapped it went
// looking, so both have said yes already, and asking one of them to
// confirm a third time is a question with no information in it. The
// accepted friendship is written by accept_invite on the server, which is
// the only thing that can write one: a phone may ask for a friendship but
// never grant itself one.
//
// This screen also has to exist at all. Before it did, the path matched no
// route, and an unmatched route in expo-router draws nothing — so every
// invitation anyone sent opened ZAND to black and stopped there.

import { useCallback, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { HandoffScreen } from '@/components/handoff-screen';
import { HANDOFF } from '@/constants/i18n/handoff';
import { useAuth } from '@/lib/auth';
import { t as tr, useLang } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import {
  acceptInvite, acceptRequest, nameOf, sendRequest, stashInvite, tellInviter,
} from '@/lib/friends';

type State = 'working' | 'connected' | 'asked' | 'self' | 'stale' | 'signin';

export default function AddScreen() {
  useLang();
  // `i` is a token and is what a current invitation carries. `from` is a
  // user id and is what links already sitting in people's messages carry;
  // those can only manage a request, which is the right limit for
  // something anybody could have constructed.
  const { i, from } = useLocalSearchParams<{ i?: string; from?: string }>();
  const { user, loading } = useAuth();

  const [state, setState] = useState<State>('working');
  const [who, setWho] = useState('');

  const run = useCallback(async () => {
    const token = (i ?? '').trim();
    const other = (from ?? '').trim();
    const me = user?.id;

    if (!token && !other) { router.replace('/(tabs)' as any); return; }

    // Not signed in. The token is put down where a session will find it,
    // because making an account means confirming an address, which means
    // leaving ZAND and coming back through a screen that knows nothing
    // about this one. The `next` below still takes them straight back when
    // it can; the stash is what makes it work when it cannot.
    if (!me) {
      if (token) await stashInvite(token);
      setState('signin');
      return;
    }

    if (token) {
      const inviter = await acceptInvite(token);
      if (!inviter) {
        // An unknown token: their own link, or one that has been replaced.
        setState('stale');
        return;
      }
      setWho(inviter.name);
      setState('connected');
      // Fire and forget. A notification that fails must not undo a
      // friendship that worked.
      tellInviter(inviter.id, me).catch(() => {});
      return;
    }

    /* ---- the old shape of link ---- */

    if (other === me) { setState('self'); return; }
    try {
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
      router.replace('/(tabs)' as any);
    }
  }, [i, from, user?.id]);

  // Waits for auth to settle. Deciding while the session was still loading
  // told a signed-in person to make an account.
  useEffect(() => { if (!loading) run(); }, [loading, run]);

  if (state === 'signin') {
    const back = '/add?' + (i ? 'i=' + encodeURIComponent(String(i)) : 'from=' + encodeURIComponent(String(from)));
    return (
      <HandoffScreen
        title={tr(HANDOFF.needAccount)}
        line={tr(HANDOFF.needAccountX)}
        cta={tr(HANDOFF.makeOne)}
        onPress={() => router.replace(
          ('/onboarding?step=2&next=' + encodeURIComponent(back)) as any,
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

  if (state === 'stale') {
    return (
      <HandoffScreen
        title={tr(HANDOFF.staleLink)}
        line={tr(HANDOFF.staleLinkX)}
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
