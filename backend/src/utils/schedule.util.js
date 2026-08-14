import moment from "moment-timezone";

const ACCEPTED_SCHEDULE_FORMATS = [
  "YYYY-MM-DDTHH:mm",
  "YYYY-MM-DD HH:mm",
  "YYYY-MM-DDTHH:mm:ss",
  "YYYY-MM-DD HH:mm:ss",
];

export const isValidTimeZone = (timeZone) => {
  return typeof timeZone === "string" && Boolean(moment.tz.zone(timeZone));
};

/** Start and end of the UTC calendar day that the given instant falls on. */
export const getUtcDayBounds = (date) => {
  const dayStart = new Date(date);
  dayStart.setUTCHours(0, 0, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setUTCHours(23, 59, 59, 999);

  return { dayStart, dayEnd };
};

/**
 * Turns a wall-clock string like "2026-08-20T10:00" plus an IANA zone like
 * "America/New_York" into the matching UTC instant. Returns null when the
 * input cannot be parsed so callers can reject it with a 400.
 */
export const parseScheduledAtToUtc = ({ scheduledAt, timeZone }) => {
  if (typeof scheduledAt !== "string" || !isValidTimeZone(timeZone)) {
    return null;
  }

  const parsed = moment.tz(
    scheduledAt.trim(),
    ACCEPTED_SCHEDULE_FORMATS,
    true,
    timeZone
  );

  if (!parsed.isValid()) {
    return null;
  }

  return parsed.utc().toDate();
};
