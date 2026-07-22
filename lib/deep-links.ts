import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';

// Handle zand://add?from=<id> and https://zand.app/add?from=<id>
export function useFriendDeepLink(myId: string | undefined) {
  useEffect(() => {
    if (!myId) return;

    const handle = async (url: string | null) => {
      if (!url) return;
      const parsed = Linking.parse(url);
      const from = parsed.queryParams?.from as string | undefined;
      if (!from || from === myId) return;
      // create a friendship request from the inviter to me, auto-accepted,
      // OR from me to them. Simplest: I send them a request; if they invited me
      // we can auto-accept. Here we send a request to the inviter.
      try {
        // I tapped their link, so I send them a friend request (RLS: I am the requester).
        // If they already requested me, accept theirs instead.
        const { data: theirs } = await supabase
          .from('friendships')
          .select('id, status')
          .eq('requester', from).eq('addressee', myId).limit(1);
        if (theirs && theirs[0]) {
          if (theirs[0].status !== 'accepted') await supabase.from('friendships').update({ status: 'accepted' }).eq('id', theirs[0].id);
        } else {
          await supabase.from('friendships').insert({ requester: myId, addressee: from, status: 'pending' });
        }
      } catch {}
    };

    // cold start
    Linking.getInitialURL().then(handle);
    // warm
    const sub = Linking.addEventListener('url', (e) => handle(e.url));
    return () => sub.remove();
  }, [myId]);
}
