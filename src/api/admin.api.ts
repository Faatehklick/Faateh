import { api, unwrapList, unwrapOne } from "./client";
import type { Booking, BookingFilters } from "../types/booking";
import type { Hotel } from "../types/hotel";
import type { User } from "../types/user";

export const adminApi = {
  /** GET /api/admin/bookings — every booking across all customers. */
  bookings: async (filters: BookingFilters = {}): Promise<Booking[]> => {
    const { data } = await api.get("/admin/bookings", { params: filters });
    return unwrapList<Booking>(data);
  },

  /**
   * PATCH /api/admin/bookings/:id/site-fee
   * Marks the platform's 10% site fee as settled by the host.
   */
  markSiteFeePaid: async (
    bookingId: string,
    siteFeePaid = true,
  ): Promise<Booking> => {
    const { data } = await api.patch(`/admin/bookings/${bookingId}/site-fee`, {
      siteFeePaid,
    });
    return unwrapOne<Booking>(data);
  },

  /** All hotels, including unverified applications awaiting review. */
  hotels: async (): Promise<Hotel[]> => {
    const { data } = await api.get("/admin/hotels");
    return unwrapList<Hotel>(data);
  },

  /**
   * Approves a host application. Falls back to the public hotel PATCH route
   * if the backend has no dedicated admin verify endpoint.
   */
  verifyHotel: async (hotelId: string, isVerified = true): Promise<Hotel> => {
    try {
      const { data } = await api.patch(`/admin/hotels/${hotelId}/verify`, {
        isVerified,
      });
      return unwrapOne<Hotel>(data);
    } catch {
      const { data } = await api.patch(`/hotels/${hotelId}`, { isVerified });
      return unwrapOne<Hotel>(data);
    }
  },

  /** GET /api/admin/users */
  users: async (): Promise<User[]> => {
    const { data } = await api.get("/admin/users");
    return unwrapList<User>(data);
  },
};
