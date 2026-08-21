/**
 * "2h ago", "Yesterday", "6 Aug" — the short form used in every list row.
 *
 * Intl.RelativeTimeFormat alone would render "6 days ago" for anything up to a
 * week and then "1 month ago" for everything older, which is exactly the range
 * where a developer wants the actual date instead. So this crosses over: a
 * relative form while "how long ago" is the useful question, an absolute date
 * once it stops being one.
 *
 * Formatting happens on the client only. Rendering a relative time on the
 * server and again on the client is a hydration mismatch waiting to happen —
 * the two runs are milliseconds apart, but "59s ago" and "1m ago" are
 * different strings and React will warn. Every caller is inside a `"use
 * client"` page that fetches its data after mount, so there is no server pass
 * to disagree with.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function relativeTime(iso: string, now: number = Date.now()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";

  const delta = now - then;

  // A clock skew between the API host and the browser can put a timestamp a
  // few seconds in the future; "in 4 seconds" for something just saved reads
  // as a bug, so anything not yet past reads as just now.
  if (delta < MINUTE) return "Just now";
  if (delta < HOUR) return `${Math.floor(delta / MINUTE)}m ago`;
  if (delta < DAY) return `${Math.floor(delta / HOUR)}h ago`;
  if (delta < 2 * DAY) return "Yesterday";
  if (delta < 7 * DAY) return `${Math.floor(delta / DAY)}d ago`;

  const date = new Date(then);
  const sameYear = date.getFullYear() === new Date(now).getFullYear();
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}
