// Opening hours that survive crossing a border.
//
// The problem with storing "9 – 17" is that it does not say whose nine.
// Someone in Stockholm looking at a Dubai restaurant needs to know
// whether it is open *now*, and that is only answerable if we know the
// business's timezone and store the times numerically.
//
// So: minutes since local midnight, an array of ranges per day, and the
// IANA timezone the business sits in. Everything else here is formatting
// — turning that into something a person reads, in whichever convention
// they are used to.

export type Range = [number, number];              // [open, close]
export type Hours = Record<string, Range[]>;       // { mon: [[540,1020]] }

export const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type Day = (typeof DAYS)[number];

export const DAY_EN: Record<Day, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
  fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};
export const DAY_FA: Record<Day, string> = {
  mon: 'دوشنبه', tue: 'سه‌شنبه', wed: 'چهارشنبه', thu: 'پنجشنبه',
  fri: 'جمعه', sat: 'شنبه', sun: 'یکشنبه',
};

/* ---------------- formatting ---------------- */

// Does this locale use am/pm? Rather than keeping a list of countries,
// ask Intl what it would do with a time and look at the answer.
export function uses12Hour(locale?: string): boolean {
  try {
    const s = new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(new Date(2020, 0, 1, 13));
    return /[ap]\.?m/i.test(s);
  } catch {
    return false;
  }
}

/** 540 → "9:00 am" or "09:00", depending on the convention. */
export function fmtMinutes(mins: number, ampm: boolean): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  if (!ampm) return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  const suffix = h < 12 ? 'am' : 'pm';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return h12 + ':' + String(m).padStart(2, '0') + ' ' + suffix;
}

/** A whole day: "9:00 am – 2:00 pm, 5:00 – 10:00 pm" or "Closed". */
export function fmtDay(ranges: Range[] | undefined, ampm: boolean, closedLabel = 'Closed'): string {
  if (!ranges?.length) return closedLabel;
  return ranges.map(([a, b]) => fmtMinutes(a, ampm) + ' – ' + fmtMinutes(b, ampm)).join(', ');
}

/* ---------------- what time is it there ---------------- */

/**
 * The current day and minute-of-day in a given timezone. Uses Intl
 * rather than any date library: it is built in, it knows about daylight
 * saving, and it is right about places that shift on odd dates.
 */
export function nowIn(tz?: string): { day: Day; minutes: number } {
  const d = new Date();
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz || undefined,
      weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
    }).formatToParts(d);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
    const wd = get('weekday').toLowerCase().slice(0, 3) as Day;
    const mins = Number(get('hour')) * 60 + Number(get('minute'));
    return { day: DAYS.includes(wd) ? wd : 'mon', minutes: mins };
  } catch {
    const wd = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][d.getDay()] as Day;
    return { day: wd, minutes: d.getHours() * 60 + d.getMinutes() };
  }
}

export type OpenState =
  | { open: true; until: number }
  | { open: false; nextDay?: Day; nextAt?: number };

/**
 * Open right now, in the business's own time? Handles a range that runs
 * past midnight — a kitchen open until 1am is stored as [1080, 1500],
 * and someone looking at it at half past midnight should be told yes.
 */
export function openState(hours: Hours | undefined, tz?: string): OpenState {
  if (!hours) return { open: false };
  const { day, minutes } = nowIn(tz);

  for (const [a, b] of hours[day] ?? []) {
    if (minutes >= a && minutes < b) return { open: true, until: b };
  }

  // yesterday's late session may still be running
  const yIdx = (DAYS.indexOf(day) + 6) % 7;
  const yday = DAYS[yIdx];
  for (const [a, b] of hours[yday] ?? []) {
    if (b > 1440 && minutes < b - 1440) return { open: true, until: b - 1440 };
  }

  // otherwise, when next
  for (let step = 0; step < 8; step++) {
    const d = DAYS[(DAYS.indexOf(day) + step) % 7];
    for (const [a] of hours[d] ?? []) {
      if (step > 0 || a > minutes) return { open: false, nextDay: d, nextAt: a };
    }
  }
  return { open: false };
}

/** "Open until 10:00 pm" / "Opens 9:00 am" / "Closed" */
export function openLabel(hours: Hours | undefined, tz: string | undefined, ampm: boolean, fa = false): string {
  const st = openState(hours, tz);
  if (st.open) {
    return fa
      ? 'باز تا ' + fmtMinutes(st.until, ampm)
      : 'Open until ' + fmtMinutes(st.until, ampm);
  }
  if (st.nextAt != null) {
    const { day } = nowIn(tz);
    const soon = st.nextDay === day;
    const when = fmtMinutes(st.nextAt, ampm);
    const dayName = st.nextDay ? (fa ? DAY_FA[st.nextDay] : DAY_EN[st.nextDay]) : '';
    if (fa) return soon ? 'باز می‌شود ' + when : dayName + ' باز می‌شود ' + when;
    return soon ? 'Opens ' + when : 'Opens ' + dayName + ' ' + when;
  }
  return fa ? 'بسته' : 'Closed';
}

/* ---------------- timezone from coordinates ---------------- */

// A coarse lookup, no network and no library. It is right for the places
// this directory actually covers; anything it does not recognise falls
// back to a UTC offset zone, which still gives correct arithmetic even
// if the name is less pretty.
const ZONES: { lat: [number, number]; lng: [number, number]; tz: string }[] = [
  { lat: [55, 70], lng: [10, 25], tz: 'Europe/Stockholm' },
  { lat: [54, 58], lng: [7, 13], tz: 'Europe/Copenhagen' },
  { lat: [57, 71], lng: [4, 12], tz: 'Europe/Oslo' },
  { lat: [59, 71], lng: [19, 32], tz: 'Europe/Helsinki' },
  { lat: [49, 61], lng: [-11, 2], tz: 'Europe/London' },
  { lat: [41, 52], lng: [-5, 9], tz: 'Europe/Paris' },
  { lat: [47, 55], lng: [5, 16], tz: 'Europe/Berlin' },
  { lat: [35, 48], lng: [6, 19], tz: 'Europe/Rome' },
  { lat: [35, 44], lng: [-10, 4], tz: 'Europe/Madrid' },
  { lat: [50, 54], lng: [3, 8], tz: 'Europe/Amsterdam' },
  { lat: [22, 27], lng: [51, 57], tz: 'Asia/Dubai' },
  { lat: [24, 33], lng: [34, 56], tz: 'Asia/Riyadh' },
  { lat: [25, 40], lng: [44, 64], tz: 'Asia/Tehran' },
  { lat: [36, 42], lng: [26, 45], tz: 'Europe/Istanbul' },
  { lat: [24, 50], lng: [-125, -66], tz: 'America/New_York' },
  { lat: [32, 50], lng: [-125, -114], tz: 'America/Los_Angeles' },
  { lat: [-45, -10], lng: [112, 154], tz: 'Australia/Sydney' },
];

export function tzFor(lat: number, lng: number): string {
  for (const z of ZONES) {
    if (lat >= z.lat[0] && lat <= z.lat[1] && lng >= z.lng[0] && lng <= z.lng[1]) return z.tz;
  }
  // Nothing matched: derive a fixed offset from longitude. Not elegant,
  // but arithmetically sound and better than pretending it is UTC.
  const offset = Math.round(lng / 15);
  const sign = offset >= 0 ? '-' : '+';   // Etc/GMT signs are inverted
  return 'Etc/GMT' + sign + Math.abs(offset);
}

/** The device's own zone, for comparing against the business's. */
export function deviceTz(): string {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return 'UTC'; }
}

/** True when the viewer is somewhere else, so we should say whose time it is. */
export function differentZone(tz?: string): boolean {
  if (!tz) return false;
  try {
    const now = new Date();
    const a = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
    const b = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
    return a !== b;
  } catch {
    return false;
  }
}
