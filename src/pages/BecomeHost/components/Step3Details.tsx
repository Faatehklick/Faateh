import React, { useState } from "react";
import { Info } from "lucide-react";
import type { HostFormData } from "../types";

interface Step3Props {
  formData: HostFormData;
  updateForm: (fields: Partial<HostFormData>) => void;
}

export const Step3Details: React.FC<Step3Props> = ({ formData, updateForm }) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isInvalid = (field: keyof HostFormData) => {
    const value = formData[field];
    return touched[field] && (!value || (typeof value === "string" && !value.trim()));
  };

  const roomOptions = ["Standard Room", "Deluxe Room", "Twin Room", "Double Room", "Single Room", "Family Room", "Executive Suite", "Presidential Suite"];

  const facilityOptions = [
    "Free WiFi", "Restaurant", "Breakfast Included", "Airport Pickup", "Parking", "Conference Hall", "Gym",
    "Swimming Pool", "Laundry", "Generator", "Air Conditioning", "Security 24/7", "Beach Access", "Prayer Area"
  ];

  const toggleRoomType = (room: string) => {
    const list = formData.roomTypes.includes(room)
      ? formData.roomTypes.filter((r) => r !== room)
      : [...formData.roomTypes, room];
    updateForm({ roomTypes: list });
    setTouched((prev) => ({ ...prev, roomTypes: true }));
  };

  const toggleFacility = (facility: string) => {
    const list = formData.amenities.includes(facility)
      ? formData.amenities.filter((a) => a !== facility)
      : [...formData.amenities, facility];
    updateForm({ amenities: list });
  };

  return (
    <div className="space-y-4 text-xs">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Hotel Details</h2>
        <p className="text-xs text-gray-500">Provide additional information about your hotel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Hotel Capacity & Star Rating */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-800">Hotel Capacity</h3>
          <div>
            <label className="block text-gray-600 mb-1">
              Total Number of Rooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="85"
              value={formData.totalRooms}
              onBlur={() => handleBlur("totalRooms")}
              onChange={(e) => updateForm({ totalRooms: e.target.value })}
              className={`w-full border rounded-lg p-2.5 focus:outline-none transition-all ${
                isInvalid("totalRooms")
                  ? "border-red-500 bg-red-50/30"
                  : "border-gray-200 focus:border-blue-600"
              }`}
            />
            {isInvalid("totalRooms") && (
              <p className="text-[10px] text-red-500 mt-1">Total rooms is required!</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Star Rating <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => setTouched((prev) => ({ ...prev, starRating: true }))}
              className="flex gap-1 text-amber-400 text-lg cursor-pointer"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => updateForm({ starRating: star })}
                  className={star <= formData.starRating ? "text-amber-400" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>
            {touched.starRating && formData.starRating <= 0 && (
              <p className="text-[10px] text-red-500 mt-1">Star rating is required!</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-600 mb-1">
                Check-in Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.checkInTime}
                onBlur={() => handleBlur("checkInTime")}
                onChange={(e) => updateForm({ checkInTime: e.target.value })}
                className={`w-full border rounded-lg p-2 focus:outline-none ${
                  isInvalid("checkInTime")
                    ? "border-red-500 bg-red-50/30"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              />
              {isInvalid("checkInTime") && (
                <p className="text-[10px] text-red-500 mt-1">Required!</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">
                Check-out Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.checkOutTime}
                onBlur={() => handleBlur("checkOutTime")}
                onChange={(e) => updateForm({ checkOutTime: e.target.value })}
                className={`w-full border rounded-lg p-2 focus:outline-none ${
                  isInvalid("checkOutTime")
                    ? "border-red-500 bg-red-50/30"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              />
              {isInvalid("checkOutTime") && (
                <p className="text-[10px] text-red-500 mt-1">Required!</p>
              )}
            </div>
          </div>
        </div>

        {/* Middle Column: Room Types Available */}
        <div>
          <h3 className="font-bold text-gray-800 mb-2">
            Room Types Available <span className="text-red-500">*</span>
          </h3>
          <div
            onClick={() => setTouched((prev) => ({ ...prev, roomTypes: true }))}
            className={`grid grid-cols-2 gap-2 border p-3 rounded-xl bg-gray-50/50 ${
              touched.roomTypes && formData.roomTypes.length === 0 ? "border-red-500 bg-red-50/20" : "border-gray-100"
            }`}
          >
            {roomOptions.map((room) => (
              <label key={room} className="flex items-center gap-2 cursor-pointer text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.roomTypes.includes(room)}
                  onChange={() => toggleRoomType(room)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{room}</span>
              </label>
            ))}
          </div>
          {touched.roomTypes && formData.roomTypes.length === 0 && (
            <p className="text-[10px] text-red-500 mt-1">Select at least one room type!</p>
          )}
        </div>

        {/* Right Column: Facilities & Amenities */}
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Facilities & Amenities</h3>
          <div className="grid grid-cols-2 gap-2 border border-gray-100 p-3 rounded-xl bg-gray-50/50">
            {facilityOptions.map((facility) => (
              <label key={facility} className="flex items-center gap-2 cursor-pointer text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(facility)}
                  onChange={() => toggleFacility(facility)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{facility}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Info Notice Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 text-blue-900">
        <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[11px]">
          Room creation is disabled until your hotel is approved by administrators. After approval, you will be able to add rooms, set prices, manage availability, and receive bookings.
        </p>
      </div>

      {/* Hotel Policies */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-gray-800">Hotel Policies</h3>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-gray-600 mb-1">Smoking Allowed?</label>
            <select
              value={formData.smokingAllowed}
              onChange={(e) => updateForm({ smokingAllowed: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-600"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Pets Allowed?</label>
            <select
              value={formData.petsAllowed}
              onChange={(e) => updateForm({ petsAllowed: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-600"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Children Allowed?</label>
            <select
              value={formData.childrenAllowed}
              onChange={(e) => updateForm({ childrenAllowed: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-600"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">
            Cancellation Policy <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.cancellationPolicy}
            onBlur={() => handleBlur("cancellationPolicy")}
            onChange={(e) => updateForm({ cancellationPolicy: e.target.value })}
            className={`w-full border rounded-lg p-2.5 focus:outline-none ${
              isInvalid("cancellationPolicy")
                ? "border-red-500 bg-red-50/30"
                : "border-gray-200 focus:border-blue-600"
            }`}
          >
            <option value="">Select cancellation policy...</option>
            <option value="Free cancellation up to 24 hours">Free cancellation up to 24 hours</option>
            <option value="Free cancellation up to 48 hours">Free cancellation up to 48 hours</option>
            <option value="Non-refundable">Non-refundable</option>
          </select>
          {isInvalid("cancellationPolicy") && (
            <p className="text-[10px] text-red-500 mt-1">Cancellation policy is required!</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">
            Additional Policy <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="We are committed to providing the best service and comfort to our guests."
            value={formData.additionalPolicy}
            onChange={(e) => updateForm({ additionalPolicy: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};