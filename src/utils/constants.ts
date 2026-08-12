import type { BookingStatus, PaymentMethod, PaymentStatus } from "../types";

export const APP_NAME = "Faateh";
export const SUPPORT_EMAIL = "faateh209@gmail.com";
export const SUPPORT_PHONE = "+252 123 456 789";

/** Guests pay 30% of the booking total online as a deposit. */
export const DEPOSIT_RATE = 0.3;
/** The platform charges hosts 10% of the booking total. */
export const SITE_FEE_RATE = 0.1;

export const PAYMENT_METHODS: PaymentMethod[] = ["EVC_PLUS", "ZAAD", "SAHAL"];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  EVC_PLUS: "EVC Plus",
  ZAAD: "Zaad",
  SAHAL: "Sahal",
};

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING_PAYMENT: "Awaiting deposit",
  IN_BOOKING: "Deposit received",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

/** Tailwind classes per booking status, so badges stay consistent everywhere. */
export const BOOKING_STATUS_STYLES: Record<BookingStatus, string> = {
  PENDING_PAYMENT: "bg-amber-100 text-amber-800",
  IN_BOOKING: "bg-blue-100 text-blue-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-slate-200 text-slate-700",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: "Pending",
  PARTIALLY_PAID: "Deposit paid",
  PAID: "Paid in full",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  PARTIALLY_PAID: "bg-blue-100 text-blue-800",
  PAID: "bg-emerald-100 text-emerald-800",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-slate-200 text-slate-700",
};

/** Somali regions, used by the host wizard and hotel filters. */
export const REGIONS = [
  "Banaadir",
  "Woqooyi Galbeed",
  "Bari",
  "Nugaal",
  "Mudug",
  "Galguduud",
  "Hiiraan",
  "Shabeellaha Dhexe",
  "Shabeellaha Hoose",
  "Bay",
  "Bakool",
  "Gedo",
  "Jubbada Dhexe",
  "Jubbada Hoose",
  "Awdal",
  "Togdheer",
  "Sanaag",
  "Sool",
] as const;

export const ROOM_TYPES = [
  "Single Room",
  "Double Room",
  "Twin Room",
  "Deluxe Room",
  "Family Room",
  "Suite",
] as const;

export const AMENITIES = [
  "Free WiFi",
  "Air Conditioning",
  "Restaurant",
  "Parking",
  "Swimming Pool",
  "Gym",
  "Airport Shuttle",
  "Laundry",
  "24/7 Reception",
  "Generator / Backup Power",
  "Conference Room",
  "Room Service",
] as const;
