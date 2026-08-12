import type { Hotel } from "./hotel";
import type { Room } from "./room";
import type { Payment, PaymentStatus } from "./payment";
import type { User } from "./user";

/** Prisma enum: BookingStatus */
export type BookingStatus =
  | "PENDING_PAYMENT"
  | "IN_BOOKING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export interface Booking {
  id: string;
  /** Human-friendly reference the API generates. */
  reference?: string | null;

  userId: string;
  hotelId: string;
  roomId: string;

  checkIn: string;
  checkOut: string;
  guests: number;
  nights?: number;
  specialRequest?: string | null;

  // Money — all in USD.
  /** Room price x nights. Deposit and site fee are both derived from this. */
  totalAmount: number;
  /** 30% of totalAmount, paid online before confirmation. */
  depositAmount: number;
  /** 10% of totalAmount, owed by the host to the platform. */
  siteFeeAmount: number;
  /** totalAmount - siteFeeAmount. */
  hotelPayoutAmount: number;
  /** Whether the host has settled the site fee with the platform. */
  siteFeePaid: boolean;

  status: BookingStatus;
  paymentStatus: PaymentStatus;

  /** True for walk-in bookings the host recorded manually. */
  isOffline?: boolean;

  // Relations the API may include.
  hotel?: Hotel;
  room?: Room;
  user?: User;
  payment?: Payment | null;

  createdAt?: string;
  updatedAt?: string;
}

/** Body for POST /api/bookings */
export interface CreateBookingPayload {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequest?: string;
}

/** Body for POST /api/bookings/host/offline */
export interface CreateOfflineBookingPayload extends CreateBookingPayload {
  guestName: string;
  guestPhone: string;
}

/** Body for PATCH /api/bookings/:id/host-status */
export interface UpdateBookingStatusPayload {
  status: BookingStatus;
}

export interface BookingFilters {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  hotelId?: string;
  search?: string;
  page?: number;
  limit?: number;
}
