import { createContext } from "react";
import type { CreateHotelPayload, Hotel, UpdateHotelPayload } from "../types/hotel";
import type { CreateRoomPayload, Room, UpdateRoomPayload } from "../types/room";

export interface HostContextValue {
  /** Every hotel owned by the signed-in host. */
  hotels: Hotel[];
  /** The hotel currently being managed (first one by default). */
  activeHotel: Hotel | null;
  rooms: Room[];

  isLoading: boolean;
  error: string | null;
  /** True once an admin has verified the active hotel. Gates room creation. */
  isVerified: boolean;
  /** The host has submitted an application but it is not verified yet. */
  hasPendingApplication: boolean;

  setActiveHotel: (hotelId: string) => void;
  refresh: () => Promise<void>;

  createHotel: (payload: CreateHotelPayload) => Promise<Hotel>;
  updateHotel: (payload: UpdateHotelPayload) => Promise<Hotel>;

  addRoom: (payload: CreateRoomPayload) => Promise<Room>;
  updateRoom: (roomId: string, payload: UpdateRoomPayload) => Promise<Room>;
  removeRoom: (roomId: string) => Promise<void>;
}

export const HostContext = createContext<HostContextValue | undefined>(
  undefined,
);
