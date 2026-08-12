import React, { useState } from "react";
import { UploadCloud, Building, User, Car, Utensils, Waves, Camera, X } from "lucide-react";
import type { HostFormData } from "../types";

interface Step2Props {
  formData: HostFormData;
  updateForm: (fields: Partial<HostFormData>) => void;
}

export const Step2Photos: React.FC<Step2Props> = ({ formData, updateForm }) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Generic handler to upload any specific photo category from device.
  // Converts to a base64 data URL (via FileReader) instead of a blob
  // preview URL, so the image survives a page refresh once it's saved.
  const handleSinglePhotoUpload = (field: keyof HostFormData, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateForm({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Handler for multiple gallery photos (up to 10). Same base64 approach.
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentGallery = (formData.galleryPhotos as string[]) || [];
    const remainingSlots = 10 - currentGallery.length;
    const filesToRead = files.slice(0, remainingSlots);

    Promise.all(
      filesToRead.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          }),
      ),
    ).then((newUrls) => {
      updateForm({ galleryPhotos: [...currentGallery, ...newUrls].slice(0, 10) });
      setTouched((prev) => ({ ...prev, galleryPhotos: true }));
    });
  };

  const removeGalleryPhoto = (index: number) => {
    const currentGallery = (formData.galleryPhotos as string[]) || [];
    const updatedGallery = currentGallery.filter((_, i) => i !== index);
    updateForm({ galleryPhotos: updatedGallery });
  };

  // Cover photo is required in Step 2 validation
  const isCoverMissing = touched.coverPhoto && !formData.coverPhoto;

  const photoCategories = [
    { field: "logoPhoto" as keyof HostFormData, label: "Hotel Logo", desc: "Upload logo", icon: Building, required: false },
    { field: "coverPhoto" as keyof HostFormData, label: "Cover Photo", desc: "Recommended 16:9", icon: Camera, required: true },
    { field: "receptionPhoto" as keyof HostFormData, label: "Reception", desc: "Upload photo", icon: User, required: false },
    { field: "lobbyPhoto" as keyof HostFormData, label: "Lobby", desc: "Upload photo", icon: Building, required: false },
    { field: "restaurantPhoto" as keyof HostFormData, label: "Restaurant", desc: "Upload photo", icon: Utensils, required: false },
    { field: "parkingPhoto" as keyof HostFormData, label: "Parking Area", desc: "Upload photo", icon: Car, required: false },
    { field: "poolPhoto" as keyof HostFormData, label: "Swimming Pool", desc: "(Optional)", icon: Waves, required: false },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Upload Hotel Photos</h2>
        <p className="text-xs text-gray-500">High quality photos attract more guests. Upload directly from your device.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
        <div className="space-y-4">
          {/* Photo Category Grid */}
          <div className="grid grid-cols-3 gap-3">
            {photoCategories.map((cat) => {
              const Icon = cat.icon;
              const currentVal = formData[cat.field] as string;
              const isRequiredCover = cat.required;

              return (
                <div
                  key={cat.field}
                  onClick={() => setTouched((prev) => ({ ...prev, [cat.field]: true }))}
                  className={`border rounded-xl p-3 text-center cursor-pointer bg-white transition-all relative flex flex-col items-center justify-center space-y-1.5 overflow-hidden ${
                    isRequiredCover && isCoverMissing
                      ? "border-red-500 bg-red-50/20"
                      : currentVal
                      ? "border-blue-500 bg-blue-50/10"
                      : "border-gray-200 hover:border-blue-500"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSinglePhotoUpload(cat.field, e)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />

                  {currentVal ? (
                    <img src={currentVal} alt={cat.label} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <Icon size={18} className={isRequiredCover && isCoverMissing ? "text-red-500" : "text-gray-500"} />
                      <p className="text-xs font-semibold text-gray-800">
                        {cat.label} {isRequiredCover && <span className="text-red-500">*</span>}
                      </p>
                      <p className="text-[10px] text-gray-400">{cat.desc}</p>
                    </>
                  )}
                </div>
              );
            })}

            {/* Gallery Upload Card */}
            <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-3 text-center bg-gray-50/50 flex flex-col items-center justify-center space-y-1 cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <UploadCloud size={18} className="text-blue-600" />
              <p className="text-xs font-bold text-gray-800">Gallery Photos</p>
              <p className="text-[10px] text-gray-400">Click to upload up to 10</p>
            </div>
          </div>

          {isCoverMissing && (
            <p className="text-[10px] text-red-500 font-medium">
              Cover Photo is required to proceed! Please upload one from your device.
            </p>
          )}

          {/* Gallery Previews list */}
          {Array.isArray(formData.galleryPhotos) && formData.galleryPhotos.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-gray-700">Uploaded Gallery Photos:</p>
              <div className="flex flex-wrap gap-2">
                {formData.galleryPhotos.map((url, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryPhoto(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 z-20 hover:bg-red-700"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-[11px] text-gray-400 text-center">You can upload all photos directly from your computer or phone storage.</p>
        </div>

        {/* Live Preview Cards */}
        <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-3">
          <p className="text-xs font-bold text-gray-800">Preview</p>
          <p className="text-[10px] text-gray-400">This is how guests will see your hotel.</p>

          <div>
            <p className="text-[11px] font-semibold text-gray-600 mb-1">Desktop Preview</p>
            <div className="relative rounded-lg overflow-hidden h-28 bg-gray-800 text-white p-2 flex flex-col justify-end">
              {formData.coverPhoto && (
                <img src={formData.coverPhoto} alt="Desktop Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              )}
              <div className="relative z-10">
                <p className="text-xs font-bold">{formData.hotelName || "Jazeera Palace Hotel"}</p>
                <p className="text-[9px] text-gray-200">{formData.city || "Mogadishu"}, Somalia</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-600 mb-1">Mobile Preview</p>
            <div className="relative rounded-xl overflow-hidden h-32 bg-gray-900 text-white p-2.5 flex flex-col justify-between max-w-[160px] mx-auto">
              {formData.coverPhoto && (
                <img src={formData.coverPhoto} alt="Mobile Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              )}
              <div className="relative z-10">
                <p className="text-[11px] font-bold">{formData.hotelName || "Jazeera Palace Hotel"}</p>
              </div>
              <button className="relative z-10 bg-blue-600 text-white text-[9px] font-bold py-1 px-2 rounded-md w-full">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};