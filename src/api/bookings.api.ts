import { api, unwrapList, unwrapOne } from "./client";
import type {
  Booking,
  BookingFilters,
  BookingStatus,
  CreateBookingPayload,
  CreateOfflineBookingPayload,
} from "../types/booking";
import type { BookingPaymentInfo } from "../types/payment";

export const bookingsApi = {
  /** POST /api/bookings — creates a PENDING_PAYMENT booking. */
  create: async (payload: CreateBookingPayload): Promise<Booking> => {
    const { data } = await api.post("/bookings", payload);
    return unwrapOne<Booking>(data);
  },

  /** GET /api/bookings/my-bookings */
  myBookings: async (): Promise<Booking[]> => {
    const { data } = await api.get("/bookings/my-bookings");
    return unwrapList<Booking>(data);
  },

  /** GET /api/bookings/:id/payment — deposit details + host payment accounts. */
  getPaymentInfo: async (bookingId: string): Promise<BookingPaymentInfo> => {
    const { data } = await api.get(`/bookings/${bookingId}/payment`);
    return unwrapOne<BookingPaymentInfo>(data);
  },

  /** PATCH /api/bookings/:id/cancel */
  cancel: async (bookingId: string): Promise<Booking> => {
    const { data } = await api.patch(`/bookings/${bookingId}/cancel`);
    return unwrapOne<Booking>(data);
  },

  /** GET /api/bookings/host/list — bookings for the host's own hotels. */
  hostList: async (filters: BookingFilters = {}): Promise<Booking[]> => {
    const { data } = await api.get("/bookings/host/list", { params: filters });
    return unwrapList<Booking>(data);
  },

  /** PATCH /api/bookings/:id/host-status */
  updateHostStatus: async (
    bookingId: string,
    status: BookingStatus,
  ): Promise<Booking> => {
    const { data } = await api.patch(`/bookings/${bookingId}/host-status`, {
      status,
    });
    return unwrapOne<Booking>(data);
  },

  /** POST /api/bookings/host/offline — walk-in booking recorded by the host. */
  createOffline: async (
    payload: CreateOfflineBookingPayload,
  ): Promise<Booking> => {
    const { data } = await api.post("/bookings/host/offline", payload);
    return unwrapOne<Booking>(data);
  },
};
