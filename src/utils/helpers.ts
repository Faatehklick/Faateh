import { DEPOSIT_RATE, SITE_FEE_RATE } from "./constants";
import { nightsBetween } from "./formatDate";

/** "$250" / "$249.50" — trims a trailing ".00". */
export const formatCurrency = (amount?: number | null): string => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return "$0";
  }
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? `$${rounded}` : `$${rounded.toFixed(2)}`;
};

/** Rounds to cents, avoiding float dust like 74.99999999. */
export const roundMoney = (amount: number): number =>
  Math.round(amount * 100) / 100;

/**
 * Mirrors the backend's money rules so the UI can preview totals before the
 * booking exists. Source of truth is still the API response.
 */
export const quoteBooking = (
  pricePerNight: number,
  checkIn?: string | null,
  checkOut?: string | null,
) => {
  const nights = nightsBetween(checkIn, checkOut);
  const totalAmount = roundMoney(pricePerNight * nights);

  return {
    nights,
    totalAmount,
    depositAmount: roundMoney(totalAmount * DEPOSIT_RATE),
    siteFeeAmount: roundMoney(totalAmount * SITE_FEE_RATE),
    hotelPayoutAmount: roundMoney(totalAmount * (1 - SITE_FEE_RATE)),
  };
};

export const initials = (name?: string | null): string => {
  if (!name?.trim()) return "U";
  const parts = name.trim().split(/\s+/);
  const letters = parts.slice(0, 2).map((part) => part[0] ?? "");
  return letters.join("").toUpperCase() || "U";
};

/** "Banaadir, Mogadishu, Hodan" from sparse parts. */
export const joinAddress = (
  ...parts: (string | null | undefined)[]
): string => parts.filter((part) => Boolean(part?.trim())).join(", ");

/** Turns SCREAMING_SNAKE_CASE into "Screaming snake case". */
export const humanizeEnum = (value?: string | null): string => {
  if (!value) return "—";
  const spaced = value.replace(/_/g, " ").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

export const truncate = (text: string, max = 120): string =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

/** First usable image from a hotel/room image relation. */
export const firstImage = (
  images?: { imageUrl: string }[] | null,
  fallback?: string | null,
): string | null => images?.[0]?.imageUrl ?? fallback ?? null;

export const pluralize = (count: number, singular: string, plural?: string) =>
  `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
