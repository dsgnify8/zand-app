// Sends a push notification to a user's devices.
//
// Call it with a user id, a title and a body. It looks up that user's
// device tokens, checks the category is one they have left switched on,
// and hands the batch to Expo's push service.
//
// Two things it deliberately does not do:
//
//   * It does not trust the caller about who to send to beyond the id.
//     Only the service role can invoke it, so it is called from other
//     server code — when an article publishes, when an item is sent —
//     never from a client.
//
//   * It does not retry. Expo's receipts endpoint is the right place to
//     handle failures properly, and a naive retry loop on a push service
//     is how you end up sending someone the same thing nine times.
//
// Deploy with:  supabase functions deploy send-push

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type Category = 'articles' | 'friends';

Deno.serve(async (req) => {
  try {
    const { userId, title, body, category, data } = await req.json() as {
      userId: string;
      title: string;
      body: string;
      category: Category;
      data?: Record<string, unknown>;
    };

    if (!userId || !title || !body) {
      return new Response(JSON.stringify({ error: 'userId, title and body are required' }), { status: 400 });
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Has this person switched this category off? Their preferences live
    // in the same blob as the rest of their state.
    const { data: state } = await admin
      .from('user_state')
      .select('payload')
      .eq('user_id', userId)
      .maybeSingle();

    const prefs = (state?.payload as any)?.['notif:v1'];
    if (prefs && category && prefs[category] === false) {
      return new Response(JSON.stringify({ skipped: 'category off' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data: rows } = await admin
      .from('push_tokens')
      .select('token')
      .eq('user_id', userId);

    const tokens = (rows ?? []).map((r: any) => r.token).filter(Boolean);
    if (tokens.length === 0) {
      return new Response(JSON.stringify({ skipped: 'no devices' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const messages = tokens.map((to: string) => ({
      to,
      title,
      body,
      sound: 'default',
      data: data ?? {},
    }));

    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify(messages),
    });

    const out = await res.json();
    return new Response(JSON.stringify({ sent: tokens.length, out }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});
