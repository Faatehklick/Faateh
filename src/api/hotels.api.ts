import { api, toFormData, unwrapList, unwrapOne } from "./client";
import { mockHotelsApi } from "./mockHotels";
import type {
  CreateHotelPayload,
  Hotel,
  HotelFilters,
  UpdateHotelPayload,
} from "../types/hotel";

const USE_MOCK = import.meta.env.VITE_MOCK_API === "true";

const buildHotelForm = (payload: CreateHotelPayload | UpdateHotelPayload) => {
  const { coverImage, logoImage, images, ...fields } = payload;
  return toFormData(fields as Record<string, unknown>, {
    coverImage,
    logoImage,
    images,
  });
};

const hasFiles = (payload: CreateHotelPayload | UpdateHotelPayload) =>
  Boolean(payload.coverImage || payload.logoImage || payload.images?.length);

export const hotelsApi = {
  list: async (filters: HotelFilters = {}): Promise<Hotel[]> => {
    if (USE_MOCK) return mockHotelsApi.list(filters);
    const { data } = await api.get("/hotels", { params: filters });
    return unwrapList<Hotel>(data);
  },

  getById: async (hotelId: string): Promise<Hotel> => {
    if (USE_MOCK) return mockHotelsApi.getById(hotelId);
    const { data } = await api.get(`/hotels/${hotelId}`);
    return unwrapOne<Hotel>(data);
  },

  create: async (payload: CreateHotelPayload): Promise<Hotel> => {
    if (USE_MOCK) return mockHotelsApi.create(payload);
    const { data } = hasFiles(payload)
      ? await api.post("/hotels", buildHotelForm(payload), {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await api.post("/hotels", payload);
    return unwrapOne<Hotel>(data);
  },

  update: async (hotelId: string, payload: UpdateHotelPayload): Promise<Hotel> => {
    if (USE_MOCK) return mockHotelsApi.update(hotelId, payload);
    const { data } = hasFiles(payload)
      ? await api.patch(`/hotels/${hotelId}`, buildHotelForm(payload), {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await api.patch(`/hotels/${hotelId}`, payload);
    return unwrapOne<Hotel>(data);
  },

  remove: async (hotelId: string): Promise<void> => {
    if (USE_MOCK) return mockHotelsApi.remove(hotelId);
    await api.delete(`/hotels/${hotelId}`);
  },

  myHotels: async (): Promise<Hotel[]> => {
    if (USE_MOCK) return mockHotelsApi.myHotels();
    const { data } = await api.get("/hotels", { params: { mine: true } });
    return unwrapList<Hotel>(data);
  },

  /**
   * Admin-only: every hotel regardless of verification status, for the
   * approvals screen. `list()` deliberately only returns verified hotels,
   * so this needs its own endpoint.
   * NOTE: "/hotels/admin" is a guess — point this at whatever route your
   * real backend exposes for admin hotel review.
   */
  adminList: async (): Promise<Hotel[]> => {
    if (USE_MOCK) return mockHotelsApi.adminList();
    const { data } = await api.get("/hotels/admin");
    return unwrapList<Hotel>(data);
  },

  /**
   * Admin-only: approve (true) or reject (false) a pending hotel.
   * NOTE: "/hotels/:id/verify" is a guess — point this at your real route.
   */
  setVerified: async (hotelId: string, isVerified: boolean): Promise<Hotel> => {
    if (USE_MOCK) return mockHotelsApi.setVerified(hotelId, isVerified);
    const { data } = await api.patch(`/hotels/${hotelId}/verify`, { isVerified });
    return unwrapOne<Hotel>(data);
  },
};