import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { getApiErrorMessage } from "../api/client";
import { hotelsApi } from "../api/hotels.api";
import { roomsApi } from "../api/rooms.api";
import { useAuth } from "../hooks/useAuth";
import { HostContext, type HostContextValue } from "./host-context";
import type { CreateHotelPayload, Hotel, UpdateHotelPayload } from "../types/hotel";
import type { CreateRoomPayload, Room, UpdateRoomPayload } from "../types/room";

export const HostProvider = ({ children }: { children: ReactNode }) => {
  const { isHost, isAuthenticated } = useAuth();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [activeHotelId, setActiveHotelId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeHotel =
    hotels.find((hotel) => hotel.id === activeHotelId) ?? hotels[0] ?? null;

  const refresh = useCallback(async () => {
    // Only hosts and admins own hotels; skip the request for plain guests.
    if (!isAuthenticated || !isHost) {
      setHotels([]);
      setRooms([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const mine = await hotelsApi.myHotels();
      setHotels(mine);
      setActiveHotelId((current) =>
        current && mine.some((hotel) => hotel.id === current)
          ? current
          : (mine[0]?.id ?? null),
      );
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load your hotel."));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, isHost]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  /** Rooms follow the active hotel. */
  useEffect(() => {
    if (!activeHotel?.id) {
      setRooms([]);
      return;
    }

    let cancelled = false;

    // Prefer rooms already embedded in the hotel payload to save a round trip.
    if (activeHotel.rooms?.length) {
      setRooms(activeHotel.rooms);
      return;
    }

    roomsApi
      .listByHotel(activeHotel.id)
      .then((list) => {
        if (!cancelled) setRooms(list);
      })
      .catch(() => {
        if (!cancelled) setRooms([]);
      });

    return () => {
      cancelled = true;
    };
  }, [activeHotel?.id, activeHotel?.rooms]);

  const createHotel = useCallback(
    async (payload: CreateHotelPayload): Promise<Hotel> => {
      const hotel = await hotelsApi.create(payload);
      setHotels((prev) => [...prev, hotel]);
      setActiveHotelId(hotel.id);
      return hotel;
    },
    [],
  );

  const updateHotel = useCallback(
    async (payload: UpdateHotelPayload): Promise<Hotel> => {
      if (!activeHotel) throw new Error("No hotel to update yet.");
      const updated = await hotelsApi.update(activeHotel.id, payload);
      setHotels((prev) =>
        prev.map((hotel) => (hotel.id === updated.id ? updated : hotel)),
      );
      return updated;
    },
    [activeHotel],
  );

  const addRoom = useCallback(
    async (payload: CreateRoomPayload): Promise<Room> => {
      if (!activeHotel) throw new Error("Create your hotel first.");
      if (!activeHotel.isVerified) {
        throw new Error(
          "Room creation unlocks once an admin approves your hotel.",
        );
      }
      const room = await roomsApi.create(activeHotel.id, payload);
      setRooms((prev) => [...prev, room]);
      return room;
    },
    [activeHotel],
  );

  const updateRoom = useCallback(
    async (roomId: string, payload: UpdateRoomPayload): Promise<Room> => {
      const updated = await roomsApi.update(roomId, payload);
      setRooms((prev) =>
        prev.map((room) => (room.id === roomId ? updated : room)),
      );
      return updated;
    },
    [],
  );

  const removeRoom = useCallback(async (roomId: string) => {
    await roomsApi.remove(roomId);
    setRooms((prev) => prev.filter((room) => room.id !== roomId));
  }, []);

  const value = useMemo<HostContextValue>(
    () => ({
      hotels,
      activeHotel,
      rooms,
      isLoading,
      error,
      isVerified: Boolean(activeHotel?.isVerified),
      hasPendingApplication: Boolean(activeHotel && !activeHotel.isVerified),
      setActiveHotel: setActiveHotelId,
      refresh,
      createHotel,
      updateHotel,
      addRoom,
      updateRoom,
      removeRoom,
    }),
    [
      hotels,
      activeHotel,
      rooms,
      isLoading,
      error,
      refresh,
      createHotel,
      updateHotel,
      addRoom,
      updateRoom,
      removeRoom,
    ],
  );

  return <HostContext.Provider value={value}>{children}</HostContext.Provider>;
};
