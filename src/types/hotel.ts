import type { PaymentAccount } from "./payment";
import type { Room } from "./room";

export interface HotelImage {
  id: string;
  hotelId?: string;
  imageUrl: string;
}

export interface Hotel {
  id: string;
  hostId: string;
  name: string;
  description?: string | null;

  // Location
  region: string;
  city: string;
  district?: string | null;
  googleMaps?: string | null;

  // Contact
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  ownerName?: string | null;
  managerName?: string | null;

  // Details
  starRating?: number | null;
  totalRooms?: number | null;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  amenities?: string[];
  roomTypes?: string[];

  // Policies
  smokingAllowed?: boolean;
  petsAllowed?: boolean;
  childrenAllowed?: boolean;
  cancellationPolicy?: string | null;
  additionalPolicy?: string | null;

  // Status
  isVerified: boolean;

  // Relations
  coverImage?: string | null;
  logoImage?: string | null;
  images?: HotelImage[];
  rooms?: Room[];
  paymentAccounts?: PaymentAccount[];

  /** Aggregates the API may include. */
  averageRating?: number | null;
  reviewCount?: number;
  minPrice?: number | null;

  /** Always set at creation — every hotel (mock or real) has one. */
  createdAt: string;
  updatedAt?: string;
}

/** Query params for GET /api/hotels */
export interface HotelFilters {
  search?: string;
  city?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  starRating?: number;
  page?: number;
  limit?: number;
  /** When true, restricts results to the current user's own hotels (used by myHotels()). */
  mine?: boolean;
}

/** Body for POST /api/hotels — mirrors the Become-a-Host wizard. */
export interface CreateHotelPayload {
  name: string;
  description?: string;
  region: string;
  city: string;
  district?: string;
  googleMaps?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  ownerName?: string;
  managerName?: string;
  starRating?: number;
  totalRooms?: number;
  checkInTime?: string;
  checkOutTime?: string;
  roomTypes?: string[];
  amenities?: string[];
  smokingAllowed?: boolean;
  petsAllowed?: boolean;
  childrenAllowed?: boolean;
  cancellationPolicy?: string;
  additionalPolicy?: string;
  coverImage?: File | null;
  logoImage?: File | null;
  images?: File[];
  /** Mock-mode only: base64 data URLs from Step2Photos, used until real file upload exists on the backend. */
  coverImagePreview?: string;
  logoImagePreview?: string;
}

export type UpdateHotelPayload = Partial<CreateHotelPayload>;

/** Standard paginated envelope. */
export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}