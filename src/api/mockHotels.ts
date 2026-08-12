import type { CreateHotelPayload, Hotel, HotelFilters, UpdateHotelPayload } from "../types/hotel";

const HOTELS_KEY = "mock_hotels";
const DELAY_MS = 400;

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS));

const readHotels = (): Hotel[] => {
  try {
    const raw = localStorage.getItem(HOTELS_KEY);
    return raw ? (JSON.parse(raw) as Hotel[]) : [];
  } catch {
    return [];
  }
};

const writeHotels = (hotels: Hotel[]) => {
  localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));
};

/** Reads the mock-auth token to find the current user's id, without importing mockAuth. */
const currentUserId = (): string => {
  const token = localStorage.getItem("faateh_token") ?? "";
  return token.split("-")[2] ?? "anonymous";
};

export const mockHotelsApi = {
  list: async (_filters: HotelFilters = {}): Promise<Hotel[]> => {
    await delay();
    return readHotels().filter((h) => h.isVerified);
  },

  getById: async (hotelId: string): Promise<Hotel> => {
    await delay();
    const hotel = readHotels().find((h) => h.id === hotelId);
    if (!hotel) throw { response: { status: 404, data: { message: "Hotel not found." } } };
    return hotel;
  },

  create: async (payload: CreateHotelPayload): Promise<Hotel> => {
    await delay();
    const hotels = readHotels();

    const newHotel: Hotel = {
      id: crypto.randomUUID(),
      hostId: currentUserId(),
      name: payload.name,
      description: payload.description ?? null,
      region: payload.region,
      city: payload.city,
      district: payload.district ?? null,
      googleMaps: payload.googleMaps ?? null,
      phoneNumber: payload.phoneNumber ?? null,
      email: payload.email ?? null,
      website: payload.website ?? null,
      ownerName: payload.ownerName ?? null,
      managerName: payload.managerName ?? null,
      starRating: payload.starRating ?? null,
      totalRooms: payload.totalRooms ?? null,
      checkInTime: payload.checkInTime ?? null,
      checkOutTime: payload.checkOutTime ?? null,
      amenities: payload.amenities ?? [],
      roomTypes: payload.roomTypes ?? [],
      smokingAllowed: payload.smokingAllowed ?? false,
      petsAllowed: payload.petsAllowed ?? false,
      childrenAllowed: payload.childrenAllowed ?? true,
      cancellationPolicy: payload.cancellationPolicy ?? null,
      additionalPolicy: payload.additionalPolicy ?? null,
      isVerified: false, // mimics real flow: awaits admin approval
      coverImage: payload.coverImagePreview ?? null,
      logoImage: payload.logoImagePreview ?? null,
      images: [],
      rooms: [],
      createdAt: new Date().toISOString(),
    };

    writeHotels([...hotels, newHotel]);
    return newHotel;
  },

  update: async (hotelId: string, payload: UpdateHotelPayload): Promise<Hotel> => {
    await delay();
    const hotels = readHotels();
    const index = hotels.findIndex((h) => h.id === hotelId);
    if (index === -1) throw { response: { status: 404, data: { message: "Hotel not found." } } };

    const updated: Hotel = {
      ...hotels[index],
      ...payload,
      coverImage: payload.coverImagePreview ?? hotels[index].coverImage,
      logoImage: payload.logoImagePreview ?? hotels[index].logoImage,
      updatedAt: new Date().toISOString(),
    } as Hotel;

    hotels[index] = updated;
    writeHotels(hotels);
    return updated;
  },

  remove: async (hotelId: string): Promise<void> => {
    await delay();
    writeHotels(readHotels().filter((h) => h.id !== hotelId));
  },

  myHotels: async (): Promise<Hotel[]> => {
    await delay();
    const uid = currentUserId();
    return readHotels().filter((h) => h.hostId === uid);
  },
};