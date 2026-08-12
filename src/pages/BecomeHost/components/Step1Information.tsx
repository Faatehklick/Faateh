import React, { useState } from "react";
import { Camera } from "lucide-react";
import type { HostFormData } from "../types";

interface Step1Props {
  formData: HostFormData;
  updateForm: (fields: Partial<HostFormData>) => void;
  triggerValidation?: boolean; // Optional prop to force check all fields if needed
}

export const Step1Information: React.FC<Step1Props> = ({ formData, updateForm }) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Helper function to check if a required field is empty and touched
  const isInvalid = (field: keyof HostFormData) => {
    const value = formData[field];
    return touched[field] && (!value || (typeof value === "string" && !value.trim()));
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateForm({ coverPhoto: url });
    }
    setTouched((prev) => ({ ...prev, coverPhoto: true }));
  };

  return (
    <div className="my-auto space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Register Your Hotel</h2>
        <p className="text-xs text-gray-500">Tell us about your hotel before verification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
        <div className="space-y-3 text-xs">
          {/* Hotel Name & Owner Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Hotel Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Jazeera Palace Hotel"
                value={formData.hotelName}
                onBlur={() => handleBlur("hotelName")}
                onChange={(e) => updateForm({ hotelName: e.target.value })}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                  isInvalid("hotelName")
                    ? "border-red-500 bg-red-50/30 focus:border-red-600"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              />
              {isInvalid("hotelName") && (
                <p className="text-[10px] text-red-500 mt-1">Hotel name is required!</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Owner / Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Jazeera Palace Hotel Ltd"
                value={formData.ownerName}
                onBlur={() => handleBlur("ownerName")}
                onChange={(e) => updateForm({ ownerName: e.target.value })}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                  isInvalid("ownerName")
                    ? "border-red-500 bg-red-50/30 focus:border-red-600"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              />
              {isInvalid("ownerName") && (
                <p className="text-[10px] text-red-500 mt-1">Owner name is required!</p>
              )}
            </div>
          </div>

          {/* Manager Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Hotel Manager Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ahmed Hassan"
                value={formData.managerName}
                onBlur={() => handleBlur("managerName")}
                onChange={(e) => updateForm({ managerName: e.target.value })}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                  isInvalid("managerName")
                    ? "border-red-500 bg-red-50/30 focus:border-red-600"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              />
              {isInvalid("managerName") && (
                <p className="text-[10px] text-red-500 mt-1">Manager name is required!</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className={`inline-flex items-center px-3 rounded-l-lg border border-r-0 bg-gray-50 text-gray-500 text-xs font-medium ${
                  isInvalid("phoneNumber") ? "border-red-500 bg-red-50/30" : "border-gray-200"
                }`}>
                  +252
                </span>
                <input
                  type="text"
                  placeholder="61 234 5678"
                  value={formData.phoneNumber}
                  onBlur={() => handleBlur("phoneNumber")}
                  onChange={(e) => updateForm({ phoneNumber: e.target.value })}
                  className={`w-full border rounded-r-lg p-2.5 text-xs focus:outline-none transition-all ${
                    isInvalid("phoneNumber")
                      ? "border-red-500 bg-red-50/30 focus:border-red-600"
                      : "border-gray-200 focus:border-blue-600"
                  }`}
                />
              </div>
              {isInvalid("phoneNumber") && (
                <p className="text-[10px] text-red-500 mt-1">Phone number is required!</p>
              )}
            </div>
          </div>

          {/* Email & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="info@jazeerapalace.com"
                value={formData.email}
                onBlur={() => handleBlur("email")}
                onChange={(e) => updateForm({ email: e.target.value })}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                  isInvalid("email")
                    ? "border-red-500 bg-red-50/30 focus:border-red-600"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              />
              {isInvalid("email") && (
                <p className="text-[10px] text-red-500 mt-1">Email address is required!</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Website <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="https://jazeerapalace.com"
                value={formData.website}
                onChange={(e) => updateForm({ website: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Region, City, District Dropdowns */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Region <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.region}
                onBlur={() => handleBlur("region")}
                onChange={(e) => updateForm({ region: e.target.value })}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                  isInvalid("region")
                    ? "border-red-500 bg-red-50/30 focus:border-red-600"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              >
                <option value="">Select Region</option>
                <option value="Banadir">Banadir</option>
                <option value="Puntland">Puntland</option>
                <option value="Somaliland">Somaliland</option>
                <option value="Jubaland">Jubaland</option>
              </select>
              {isInvalid("region") && (
                <p className="text-[10px] text-red-500 mt-1">Region is required!</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.city}
                onBlur={() => handleBlur("city")}
                onChange={(e) => updateForm({ city: e.target.value })}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                  isInvalid("city")
                    ? "border-red-500 bg-red-50/30 focus:border-red-600"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              >
                <option value="">Select City</option>
                <option value="Mogadishu">Mogadishu</option>
                <option value="Hargeisa">Hargeisa</option>
                <option value="Garowe">Garowe</option>
                <option value="Kismayo">Kismayo</option>
              </select>
              {isInvalid("city") && (
                <p className="text-[10px] text-red-500 mt-1">City is required!</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.district}
                onBlur={() => handleBlur("district")}
                onChange={(e) => updateForm({ district: e.target.value })}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                  isInvalid("district")
                    ? "border-red-500 bg-red-50/30 focus:border-red-600"
                    : "border-gray-200 focus:border-blue-600"
                }`}
              >
                <option value="">Select District</option>
                <option value="Wadajir">Wadajir</option>
                <option value="Hodan">Hodan</option>
                <option value="Hawl Wadaag">Hawl Wadaag</option>
              </select>
              {isInvalid("district") && (
                <p className="text-[10px] text-red-500 mt-1">District is required!</p>
              )}
            </div>
          </div>

          {/* Google Maps Link */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Google Maps Link <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="https://maps.app.goo.gl/xyz123abc"
              value={formData.googleMaps}
              onChange={(e) => updateForm({ googleMaps: e.target.value })}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* About Hotel */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              About Hotel <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Jazeera Palace Hotel is a premium hotel located in the heart of Mogadishu..."
              value={formData.aboutHotel}
              onBlur={() => handleBlur("aboutHotel")}
              onChange={(e) => updateForm({ aboutHotel: e.target.value })}
              className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none transition-all ${
                isInvalid("aboutHotel")
                  ? "border-red-500 bg-red-50/30 focus:border-red-600"
                  : "border-gray-200 focus:border-blue-600"
              }`}
            />
            {isInvalid("aboutHotel") && (
              <p className="text-[10px] text-red-500 mt-1">About hotel description is required!</p>
            )}
          </div>
        </div>

        {/* Right Side: Cover Photo Upload Box with Validation */}
        <div className="space-y-1.5">
          <label className="block font-medium text-gray-700 text-xs">
            Cover Photo <span className="text-red-500">*</span>
          </label>
          <div
            onClick={() => setTouched((prev) => ({ ...prev, coverPhoto: true }))}
            className={`rounded-2xl overflow-hidden h-[340px] border relative bg-gray-50 shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all ${
              touched.coverPhoto && !formData.coverPhoto
                ? "border-red-500 bg-red-50/20"
                : "border-gray-200 hover:border-blue-500"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
            />

            {formData.coverPhoto ? (
              <img src={formData.coverPhoto} alt="Hotel Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                <div className={`p-3 rounded-full ${touched.coverPhoto && !formData.coverPhoto ? "bg-red-100 text-red-500" : "bg-blue-50 text-blue-600"}`}>
                  <Camera size={24} />
                </div>
                <p className="text-xs font-semibold text-gray-800">Upload Cover Photo</p>
                <p className="text-[10px] text-gray-400">Click to browse from your device (16:9 recommended)</p>
              </div>
            )}
          </div>
          {touched.coverPhoto && !formData.coverPhoto && (
            <p className="text-[10px] text-red-500 mt-1">Cover photo is required!</p>
          )}
        </div>
      </div>
    </div>
  );
};