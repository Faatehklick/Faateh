import { createContext } from "react";
import type { Booking, CreateBookingPayload } from "../types/booking";

export interface BookingContextValue {
  /** Bookings belonging to the signed-in user. */
  myBookings: Booking[];
  isLoading: boolean;
  error: string | null;

  refresh: () => Promise<void>;
  /** Creates a PENDING_PAYMENT booking and returns it so the caller can
   *  send the user straight to the deposit screen. */
  createBooking: (payload: CreateBookingPayload) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<void>;
}

export const BookingContext = createContext<BookingContextValue | undefined>(
  undefined,
);
