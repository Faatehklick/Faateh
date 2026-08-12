import React from "react";
import { CheckCircle2, ShieldCheck, Clock, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { HostFormData } from "../types";

interface Step4Props {
  formData: HostFormData;
}

export const Step4Submitted: React.FC<Step4Props> = ({ formData }) => {
  return (
    <div className="my-auto space-y-6 max-w-2xl mx-auto text-center py-4">
      {/* Success Badge */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-2 border border-emerald-100 shadow-sm">
        <CheckCircle2 size={36} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Application Submitted!
        </h2>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Thank you for registering <span className="font-semibold text-gray-700">{formData.hotelName || "your hotel"}</span>. Our review team has received your details and started the verification process.
        </p>
      </div>

      {/* Review Timeline */}
      <div className="bg-gray-50/80 border border-gray-200/80 rounded-2xl p-4 text-left grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-start gap-2.5">
          <Clock size={16} className="text-[#043328] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-gray-800">Review Window</p>
            <p className="text-[11px] text-gray-500">Usually verified within 24 to 48 hours.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <ShieldCheck size={16} className="text-[#043328] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-gray-800">Verification</p>
            <p className="text-[11px] text-gray-500">We verify contact info & hotel legitimacy.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Layers size={16} className="text-[#043328] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-gray-800">Next Step</p>
            <p className="text-[11px] text-gray-500">Once approved, room creation unlocks.</p>
          </div>
        </div>
      </div>

      {/* Account Unlocked Capabilities Box */}
      <div className="border border-emerald-100 bg-emerald-50/30 rounded-2xl p-4 text-left">
        <h3 className="text-xs font-bold text-gray-800 mb-2">
          What happens after approval?
        </h3>
        <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
          <li>You will receive an email notification upon approval.</li>
          <li>Your host dashboard will unlock full room inventory management.</li>
          <li>You can publish pricing, manage calendar availability, and take bookings.</li>
        </ul>
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to="/profile"
          className="w-full sm:w-auto bg-[#043328] hover:bg-[#084D3B] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span>Go to Profile Dashboard</span>
          <ArrowRight size={14} />
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all text-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};