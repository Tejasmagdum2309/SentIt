/**
 * Convert a wall-clock datetime (YYYY-MM-DDTHH:mm) in an IANA timezone to a UTC Date.
 * Matches backend behavior: scheduledAt is local to timeZone, not the browser clock.
 */
export function wallClockToUtcDate(scheduledAt, timeZone) {
  if (!scheduledAt || !timeZone) return null;

  const normalized = scheduledAt.length === 16 ? `${scheduledAt}:00` : scheduledAt;
  const [datePart, timePart] = normalized.split('T');

  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second = 0] = timePart.split(':').map(Number);

  if ([year, month, day, hour, minute, second].some((n) => Number.isNaN(n))) {
    return null;
  }

  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);

  const getOffsetMs = (utcMs) => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(new Date(utcMs));

    const values = Object.fromEntries(
      parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value])
    );

    const asUtc = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second)
    );

    return asUtc - utcMs;
  };

  // Two passes handle DST boundaries more reliably.
  let utcMs = utcGuess - getOffsetMs(utcGuess);
  utcMs = utcGuess - getOffsetMs(utcMs);

  return new Date(utcMs);
}

export function isWallClockInFuture(scheduledAt, timeZone) {
  const utcDate = wallClockToUtcDate(scheduledAt, timeZone);
  if (!utcDate || Number.isNaN(utcDate.getTime())) return false;
  return utcDate.getTime() > Date.now();
}
