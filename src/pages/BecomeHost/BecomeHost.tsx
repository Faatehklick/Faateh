import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import { Step1Information } from "./components/Step1Information";
import { Step2Photos } from "./components/Step2Photos";
import { Step3Details } from "./components/Step3Details";
import { Step4Submitted } from "./components/Step4Submitted";

import type { HostFormData } from "./types";
import { useHost } from "../../hooks/useHost";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../api/client";
import type { CreateHotelPayload } from "../../types/hotel";

const BecomeHost: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createHotel } = useHost();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/become-host",
        },
        replace: true,
      });
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState<HostFormData>({
    hotelName: "",
    ownerName: "",
    managerName: "",
    phoneNumber: "",
    email: "",
    website: "",
    region: "",
    city: "",
    district: "",
    googleMaps: "",
    aboutHotel: "",
    coverPhoto: "",
    totalRooms: "",
    starRating: 0,
    checkInTime: "",
    checkOutTime: "",
    roomTypes: [],
    amenities: [],
    smokingAllowed: "No",
    petsAllowed: "No",
    childrenAllowed: "Yes",
    cancellationPolicy: "",
    additionalPolicy: "",
  });

  const updateForm = (fields: Partial<HostFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const isStepValid = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        return Boolean(
          formData.hotelName.trim() &&
            formData.ownerName.trim() &&
            formData.managerName.trim() &&
            formData.phoneNumber.trim() &&
            formData.email.trim() &&
            formData.region.trim() &&
            formData.city.trim() &&
            formData.district.trim() &&
            formData.aboutHotel.trim()
        );

      case 2:
        return Boolean(
          formData.coverPhoto && formData.coverPhoto.trim()
        );

      case 3:
        return Boolean(
          formData.totalRooms.trim() &&
            formData.starRating > 0 &&
            formData.checkInTime.trim() &&
            formData.checkOutTime.trim() &&
            formData.cancellationPolicy.trim() &&
            formData.roomTypes.length > 0
        );

      default:
        return true;
    }
  };

  const getMissingFields = (stepNum: number): string[] => {
    const missing: string[] = [];

    if (stepNum === 1) {
      if (!formData.hotelName.trim()) missing.push("Hotel Name");
      if (!formData.ownerName.trim()) missing.push("Owner/Company Name");
      if (!formData.managerName.trim()) missing.push("Manager Name");
      if (!formData.phoneNumber.trim()) missing.push("Phone Number");
      if (!formData.email.trim()) missing.push("Email Address");
      if (!formData.region.trim()) missing.push("Region");
      if (!formData.city.trim()) missing.push("City");
      if (!formData.district.trim()) missing.push("District");
      if (!formData.aboutHotel.trim()) missing.push("About Hotel Description");
    }

    if (stepNum === 2) {
      if (!formData.coverPhoto) missing.push("Cover Photo");
    }

    if (stepNum === 3) {
      if (!formData.totalRooms.trim()) missing.push("Total Number of Rooms");
      if (formData.starRating <= 0) missing.push("Star Rating");
      if (!formData.checkInTime.trim()) missing.push("Check-in Time");
      if (!formData.checkOutTime.trim()) missing.push("Check-out Time");
      if (!formData.cancellationPolicy.trim()) missing.push("Cancellation Policy");
      if (formData.roomTypes.length === 0) missing.push("At least one Room Type");
    }

    return missing;
  };

  const handleStepChange = (targetStep: 1 | 2 | 3 | 4) => {
    if (targetStep < step) {
      setStep(targetStep);
      return;
    }

    for (let i = 1; i < targetStep; i++) {
      if (!isStepValid(i)) {
        const missing = getMissingFields(i);
        toast.error(
          `Please complete required fields in Step ${i}: ${missing.join(", ")}`
        );
        return;
      }
    }

    setStep(targetStep);
  };

  /**
   * Converts the wizard's form state (all strings, for easy controlled
   * inputs) into the payload shape the API expects. coverImagePreview /
   * logoImagePreview carry the base64 data URLs from Step2Photos so mock
   * mode can display them without a real file-upload endpoint.
   */
  const buildPayload = (): CreateHotelPayload => ({
    name: formData.hotelName.trim(),
    description: formData.aboutHotel.trim(),
    ownerName: formData.ownerName.trim(),
    managerName: formData.managerName.trim(),
    phoneNumber: formData.phoneNumber.trim(),
    email: formData.email.trim(),
    website: formData.website.trim() || undefined,
    region: formData.region.trim(),
    city: formData.city.trim(),
    district: formData.district.trim() || undefined,
    googleMaps: formData.googleMaps.trim() || undefined,
    totalRooms: formData.totalRooms.trim()
      ? Number(formData.totalRooms)
      : undefined,
    starRating: formData.starRating || undefined,
    checkInTime: formData.checkInTime.trim() || undefined,
    checkOutTime: formData.checkOutTime.trim() || undefined,
    roomTypes: formData.roomTypes,
    amenities: formData.amenities,
    smokingAllowed: formData.smokingAllowed === "Yes",
    petsAllowed: formData.petsAllowed === "Yes",
    childrenAllowed: formData.childrenAllowed === "Yes",
    cancellationPolicy: formData.cancellationPolicy.trim() || undefined,
    additionalPolicy: formData.additionalPolicy.trim() || undefined,
    coverImagePreview: formData.coverPhoto || undefined,
    logoImagePreview: formData.logoPhoto || undefined,
  });

  const handleFinalSubmit = async () => {
    for (let i = 1; i <= 3; i++) {
      if (!isStepValid(i)) {
        const missing = getMissingFields(i);
        toast.error(
          `Please complete required fields in Step ${i}: ${missing.join(", ")}`
        );
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await createHotel(buildPayload());
      toast.success("Application submitted! We'll review it shortly.");
      setStep(4);
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Could not submit your application.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  const progressPercent =
    step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

  const isCurrentValid = isStepValid(step);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center p-4 md:p-8">
      <div className="w-full max-w-[1240px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-[720px]">
        <Sidebar step={step} setStep={handleStepChange} isStepValid={isStepValid} />

        <div className="p-6 md:p-8 flex flex-col justify-between bg-white text-gray-800">
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-gray-700">Step {step} of 4</span>
              <span className="text-gray-400">{progressPercent}%</span>
            </div>

            <div className="w-full bg-gray-100 h-1.5 rounded-full mb-6">
              <div
                className="bg-[#043328] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {step === 1 && <Step1Information formData={formData} updateForm={updateForm} />}
            {step === 2 && <Step2Photos formData={formData} updateForm={updateForm} />}
            {step === 3 && <Step3Details formData={formData} updateForm={updateForm} />}
            {step === 4 && <Step4Submitted formData={formData} />}
          </div>

          {step < 4 && (
            <div className="flex justify-between items-center pt-5 border-t border-gray-100 mt-6">
              <button
                type="button"
                onClick={() => handleStepChange((step - 1) as 1 | 2 | 3)}
                disabled={step === 1}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold border ${
                  step === 1
                    ? "opacity-40 cursor-not-allowed border-gray-200 text-gray-400"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700"
                }`}
              >
                ← Back
              </button>

              <button
                type="button"
                disabled={!isCurrentValid || isSubmitting}
                onClick={
                  step === 3
                    ? handleFinalSubmit
                    : () => handleStepChange((step + 1) as 2 | 3 | 4)
                }
                className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isCurrentValid && !isSubmitting
                    ? "bg-[#043328] hover:bg-[#084D3B] text-white shadow-sm cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>
                  {step === 3
                    ? isSubmitting
                      ? "Submitting…"
                      : "Submit Application"
                    : "Continue →"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;