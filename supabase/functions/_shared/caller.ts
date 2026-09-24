// Who is calling.
//
// Every function here is reachable by anyone holding the anon key, and
// the anon key ships inside the app, so it is public in the way a door
// number is public. That is fine for reading a listing and not fine for
// anything that costs money or reaches into someone else's day.
//
// So: the ones that spend (speech, translation) require a real signed-in
// user rather than the anon key, and the one that notifies (send-push)
// also asks whether the caller has any business notifying that person.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/** A call made with the service role key, from our own server code. */
export function isServiceCall(req: Request): boolean {
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const auth = req.headers.get('Authorization') ?? '';
  return !!service && auth.includes(service);
}

/**
 * The signed-in user behind this request, or null.
 *
 * The anon key is a valid JWT but belongs to nobody, so it comes back
 * null here, which is the whole point.
 */
export async function callerId(req: Request): Promise<string | null> {
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const anon = Deno.env.get('SUPABASE_ANON_KEY');
    const auth = req.headers.get('Authorization') ?? '';
    if (!url || !anon || !auth) return null;

    const asUser = createClient(url, anon, { global: { headers: { Authorization: auth } } });
    const { data } = await asUser.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}
