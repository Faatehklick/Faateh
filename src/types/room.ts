export type RoomStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "UNAVAILABLE";

export interface RoomImage {
  id: string;
  roomId?: string;
  imageUrl: string;
}

export interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  type: string;
  description?: string | null;
  /** Price per night, in USD. */
  price: number;
  capacity: number;
  status: RoomStatus;
  images?: RoomImage[];
  createdAt?: string;
  updatedAt?: string;
}

/** Body for POST /api/hotels/:hotelId/rooms */
export interface CreateRoomPayload {
  roomNumber: string;
  type: string;
  description?: string;
  price: number;
  capacity: number;
  status?: RoomStatus;
  /** Optional room photos uploaded to Cloudinary. */
  images?: File[];
}

export type UpdateRoomPayload = Partial<CreateRoomPayload>;
