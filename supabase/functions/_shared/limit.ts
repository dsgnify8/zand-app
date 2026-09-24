// A ceiling on the functions that cost money.
//
// Speech and translation are open to people who have not signed in,
// because the whole app is browsable signed out and a learner should not
// have to make an account to hear a word. That openness is also the
// risk: the key these calls use ships inside the app, so without a limit
// one script could spend a month of credit in an afternoon.
//
// So: a count per caller per minute, and a looser one per day, kept in a
// small table. If the limiter itself fails the call goes through. A
// broken counter must never look like a broken app.

const MINUTE = 60_000;
const DAY = 86_400_000;

/** Who to count against: the signed-in user if there is one, else the IP. */
export function callerKey(req: Request, userId: string | null): string {
  if (userId) return 'u:' + userId;
  const fwd = req.headers.get('x-forwarded-for') ?? '';
  return 'ip:' + (fwd.split(',')[0].trim() || 'unknown');
}

/**
 * True when this caller has had enough for now.
 *
 * Two windows, because a per-minute limit alone lets someone trickle all
 * day and a per-day limit alone lets them spend it all at once.
 */
export async function overLimit(
  admin: any,
  fn: string,
  who: string,
  perMinute: number,
  perDay: number,
): Promise<boolean> {
  try {
    const now = Date.now();
    const minuteKey = `${fn}|${who}|m${Math.floor(now / MINUTE)}`;
    const dayKey = `${fn}|${who}|d${Math.floor(now / DAY)}`;

    const [{ data: m }, { data: d }] = await Promise.all([
      admin.rpc('bump_edge_usage', { key: minuteKey }),
      admin.rpc('bump_edge_usage', { key: dayKey }),
    ]);

    // Now and then, clear out what has expired. Cheaper than a scheduled
    // job for a table that holds a few thousand rows at worst.
    if (Math.random() < 0.02) {
      admin.from('edge_usage').delete().lt('at', new Date(now - DAY).toISOString()).then(
        () => {}, () => {},
      );
    }

    return (typeof m === 'number' && m > perMinute) || (typeof d === 'number' && d > perDay);
  } catch {
    return false;
  }
}
