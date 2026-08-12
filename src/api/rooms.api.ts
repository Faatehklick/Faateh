import { api, toFormData, unwrapList, unwrapOne } from "./client";
import type { CreateRoomPayload, Room, UpdateRoomPayload } from "../types/room";

const buildRoomForm = (payload: CreateRoomPayload | UpdateRoomPayload) => {
  const { images, ...fields } = payload;
  return toFormData(fields as Record<string, unknown>, { images });
};

export const roomsApi = {
  /** GET /api/hotels/:hotelId/rooms */
  listByHotel: async (hotelId: string): Promise<Room[]> => {
    const { data } = await api.get(`/hotels/${hotelId}/rooms`);
    return unwrapList<Room>(data);
  },

  /** GET /api/rooms/:roomId */
  getById: async (roomId: string): Promise<Room> => {
    const { data } = await api.get(`/rooms/${roomId}`);
    return unwrapOne<Room>(data);
  },

  /** POST /api/hotels/:hotelId/rooms — HOST/ADMIN only. */
  create: async (
    hotelId: string,
    payload: CreateRoomPayload,
  ): Promise<Room> => {
    const { data } = payload.images?.length
      ? await api.post(`/hotels/${hotelId}/rooms`, buildRoomForm(payload), {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await api.post(`/hotels/${hotelId}/rooms`, payload);
    return unwrapOne<Room>(data);
  },

  /** PATCH /api/rooms/:roomId */
  update: async (
    roomId: string,
    payload: UpdateRoomPayload,
  ): Promise<Room> => {
    const { data } = payload.images?.length
      ? await api.patch(`/rooms/${roomId}`, buildRoomForm(payload), {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await api.patch(`/rooms/${roomId}`, payload);
    return unwrapOne<Room>(data);
  },

  /** DELETE /api/rooms/:roomId */
  remove: async (roomId: string): Promise<void> => {
    await api.delete(`/rooms/${roomId}`);
  },
};
