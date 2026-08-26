import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';

import { supabase } from '@/lib/supabase';
import { joinFolderByToken } from '@/lib/collections';

// Handle zand://add?from=<id> and https://zand.app/add?from=<id>
// and zand://folder?t=<token> for a shared folder.
export function useFriendDeepLink(myId: string | undefined) {
  useEffect(() => {
    if (!myId) return;

    const handle = async (url: string | null) => {
      if (!url) return;
      const parsed = Linking.parse(url);

      // A folder link. Joining makes the two people friends as well, so
      // there is nothing further to do here.
      const token = parsed.queryParams?.t as string | undefined;
      if (token) {
        const res = await joinFolderByToken(token);
        if (res?.id) router.navigate(('/local-folder?id=' + res.id) as any);
        return;
      }

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
