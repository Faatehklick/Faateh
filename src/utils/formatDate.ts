const DATE_LOCALE = "en-GB";

/** "20 Jul 2025" */
export const formatDate = (value?: string | Date | null): string => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString(DATE_LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/** "20 Jul 2025, 14:30" */
export const formatDateTime = (value?: string | Date | null): string => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString(DATE_LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/** "20 Jul – 22 Jul 2025" */
export const formatDateRange = (
  from?: string | Date | null,
  to?: string | Date | null,
): string => {
  if (!from || !to) return "—";
  return `${formatDate(from)} – ${formatDate(to)}`;
};

/** Value for an <input type="date">. */
export const toInputDate = (value?: string | Date | null): string => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

export const todayInputDate = (): string => toInputDate(new Date());

/** Nights between two dates; never negative. */
export const nightsBetween = (
  checkIn?: string | Date | null,
  checkOut?: string | Date | null,
): number => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;

  const MS_PER_NIGHT = 1000 * 60 * 60 * 24;
  const nights = Math.round((end.getTime() - start.getTime()) / MS_PER_NIGHT);
  return nights > 0 ? nights : 0;
};
