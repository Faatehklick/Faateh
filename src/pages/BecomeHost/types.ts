export interface HostFormData {
  // Step 1: Hotel Information
  hotelName: string;
  ownerName: string;
  managerName: string;
  phoneNumber: string;
  email: string;
  website: string;
  region: string;
  city: string;
  district: string;
  googleMaps: string;
  aboutHotel: string;

  // Step 2: Photos & Media
  coverPhoto: string;
  logoPhoto?: string;
  receptionPhoto?: string;
  lobbyPhoto?: string;
  restaurantPhoto?: string;
  parkingPhoto?: string;
  poolPhoto?: string;
  galleryPhotos?: string[];

  // Step 3: Hotel Details & Policies
  totalRooms: string;
  starRating: number;
  checkInTime: string;
  checkOutTime: string;
  roomTypes: string[];
  amenities: string[];
  smokingAllowed: string;
  petsAllowed: string;
  childrenAllowed: string;
  cancellationPolicy: string;
  additionalPolicy: string;
}