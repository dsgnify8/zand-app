// Reaching people who have stopped opening the app.
//
// Every other notification in this app is scheduled on the device, which
// works well and costs nothing — but it has one blind spot, and it is
// exactly the one that matters here. A device schedules when the app
// closes, so somebody who stops opening it stops being scheduled. The
// nudge meant for people who have drifted away is the only one they can
// never receive.
//
// So this runs on a timer, server-side, once a day. It looks for two
// kinds of person and says one thing to each.
//
// Deploy:   supabase functions deploy dormant-nudge
// Schedule: in the dashboard, Database > Cron, daily at 18:00 UTC.
//
// It sends through send-push, which already checks each person's
// notification preferences — so somebody who has turned this category
// off is filtered there, not here.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const DAY = 86400000;

// How long away counts as away. Four days is a lapse; fourteen is a
// habit broken. Below four we say nothing at all, because somebody who
// missed a Tuesday does not need telling.
const QUIET_DAYS = 7;

// And how long between nudges. Once a fortnight at the very most: the
// whole point is that this person is not asking to hear from us.
const COOLDOWN_DAYS = 14;

type Row = { user_id: string; last_seen: string; nudged_at: string | null; city: string | null };

Deno.serve(async (req) => {
  // Only the schedule, or someone holding the service key, may run this.
  const auth = req.headers.get('Authorization') ?? '';
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  if (!service || !auth.includes(service)) {
    return json({ error: 'Not allowed.' }, 401);
  }

  const db = createClient(Deno.env.get('SUPABASE_URL')!, service);

  try {
    const now = Date.now();

    // Everyone with a device registered, and when they were last here.
    // user_state.updated_at moves whenever anything syncs, which is a
    // fair proxy for having opened the app.
    const { data, error } = await db
      .from('dormant_candidates')
      .select('user_id, last_seen, nudged_at, city')
      .limit(500);

    if (error) return json({ error: error.message }, 500);

    const due = (data ?? []).filter((r: Row) => {
      const away = (now - new Date(r.last_seen).getTime()) / DAY;
      if (away < QUIET_DAYS) return false;
      if (!r.nudged_at) return true;
      return (now - new Date(r.nudged_at).getTime()) / DAY >= COOLDOWN_DAYS;
    });

    let sent = 0;
    for (const r of due) {
      // Somewhere they might go, if we know where they are. A specific
      // invitation beats a general one: "three new places in Milan" is
      // a reason, "come back" is not.
      let title = 'Something to start with';
      let body = 'Five minutes on Hafez, or the letters. Whichever suits tonight.';

      if (r.city) {
        const since = new Date(now - 30 * DAY).toISOString();
        const { count } = await db
          .from('businesses')
          .select('id', { count: 'exact', head: true })
          .eq('city', r.city)
          .eq('status', 'active')
          .gte('created_at', since);

        if ((count ?? 0) > 0) {
          title = count === 1 ? 'A new place in ' + r.city : count + ' new places in ' + r.city;
          body = 'Worth a look this week.';
        }
      }

      // send-push checks their preferences and their tokens. If they
      // have turned this off, nothing happens and that is correct.
      await db.functions.invoke('send-push', {
        body: { userId: r.user_id, title, body, category: 'articles' },
      });

      await db
        .from('push_tokens')
        .update({ nudged_at: new Date().toISOString() })
        .eq('user_id', r.user_id);

      sent += 1;
    }

    return json({ considered: data?.length ?? 0, due: due.length, sent });
  } catch (e) {
    console.error(e);
    return json({ error: 'Something went wrong.' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
