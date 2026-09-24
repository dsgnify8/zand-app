import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';

import { supabase } from '@/lib/supabase';
import { joinFolderByToken } from '@/lib/collections';
import { acceptRequest, sendRequest } from '@/lib/friends';
import { businessSlug } from '@/lib/links';

// Handles zand://add?from=<id> and zandapplication.com/add?from=<id>,
// zand://folder?t=<token> for a shared folder, and a listing's page on
// the site, /en/local/<slug>, which opens that listing here.
export function useFriendDeepLink(myId: string | undefined) {
  useEffect(() => {
    const handle = async (url: string | null) => {
      if (!url) return;
      const parsed = Linking.parse(url);

      // A listing. Nothing here needs an account, so this is answered
      // before the signed-in cases.
      const slug = listingSlug(parsed.path ?? '');
      if (slug) {
        const id = await businessIdForSlug(slug);
        if (id) router.navigate(('/local/business?id=' + id) as any);
        return;
      }

      if (!myId) return;

      // A folder link. Joining makes the two people friends as well, so
      // there is nothing further to do here.
      const token = parsed.queryParams?.t as string | undefined;
      if (token) {
        const res = await joinFolderByToken(token);
        if (res?.id) router.navigate(('/local/folder?id=' + res.id) as any);
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
        // Through the shared helpers rather than the table, so tapping
        // an invite tells the other person the same way the friends
        // sheet does. Written twice, it was silent here.
        if (theirs && theirs[0]) {
          if (theirs[0].status !== 'accepted') await acceptRequest(theirs[0].id);
        } else {
          await sendRequest(myId, from);
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

/** /en/local/<slug> or /fa/local/<slug>, and nothing else. */
function listingSlug(path: string): string | null {
  const m = path.replace(/^\/+/, '').match(/^(?:en|fa)\/local\/([^/?#]+)$/);
  return m ? m[1] : null;
}

/**
 * Which listing a slug belongs to.
 *
 * The site builds its URLs from the name and the city, so the match is
 * made the same way here rather than by adding a column that would have
 * to be kept in step with two codebases.
 */
async function businessIdForSlug(slug: string): Promise<string | null> {
  const { data } = await supabase
    .from('businesses')
    .select('id, name, city')
    .eq('status', 'active');
  const hit = ((data ?? []) as any[])
    .find((b) => businessSlug(b.name, b.city) === slug);
  return hit?.id ?? null;
}
