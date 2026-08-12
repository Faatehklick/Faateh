import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { bookingsApi } from "../api/bookings.api";
import { getApiErrorMessage } from "../api/client";
import { useAuth } from "../hooks/useAuth";
import { BookingContext, type BookingContextValue } from "./booking-context";
import type { Booking, CreateBookingPayload } from "../types/booking";

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setMyBookings([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      setMyBookings(await bookingsApi.myBookings());
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load your bookings."));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Load on sign-in, clear on sign-out.
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createBooking = useCallback(
    async (payload: CreateBookingPayload): Promise<Booking> => {
      const booking = await bookingsApi.create(payload);
      setMyBookings((prev) => [booking, ...prev]);
      return booking;
    },
    [],
  );

  const cancelBooking = useCallback(async (bookingId: string) => {
    const updated = await bookingsApi.cancel(bookingId);
    setMyBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? updated : booking)),
    );
  }, []);

  const value = useMemo<BookingContextValue>(
    () => ({
      myBookings,
      isLoading,
      error,
      refresh,
      createBooking,
      cancelBooking,
    }),
    [myBookings, isLoading, error, refresh, createBooking, cancelBooking],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
