import React, { useCallback, useEffect, useState } from "react";
import { Building2, CheckCircle2, XCircle, MapPin, Phone, Mail, Clock3 } from "lucide-react";
import toast from "react-hot-toast";
import { hotelsApi } from "../../api/hotels.api";
import { getApiErrorMessage } from "../../api/client";
import type { Hotel } from "../../types/hotel";

type Tab = "pending" | "approved";

const TABS: { key: Tab; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
];

const HotelApprovals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const all = await hotelsApi.adminList();
      setHotels(all);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not load hotel applications."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = hotels.filter((h) => (activeTab === "pending" ? !h.isVerified : h.isVerified));

  const handleApprove = async (hotel: Hotel) => {
    setBusyId(hotel.id);
    try {
      await hotelsApi.setVerified(hotel.id, true);
      toast.success(`${hotel.name} approved — now live on the homepage.`);
      await load();
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not approve this hotel."));
    } finally {
      setBusyId(null);
    }
  };

  // There's no separate "rejected" status on the Hotel record today — only
  // isVerified. So reject removes the listing outright rather than leaving
  // it in limbo. If you want rejected hotels to stay visible to the host
  // with a reason, that needs a status field added to the Hotel type first.
  const handleReject = async (hotel: Hotel) => {
    if (!window.confirm(`Reject and remove "${hotel.name}"? This can't be undone.`)) return;
    setBusyId(hotel.id);
    try {
      await hotelsApi.remove(hotel.id);
      toast(`${hotel.name} rejected and removed.`, { icon: "🚫" });
      await load();
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not reject this hotel."));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Hotel Applications</h1>
        <p className="text-xs text-gray-500 mt-1">
          Review host submissions. Approved hotels appear immediately on the homepage.
        </p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-[#043328] text-[#043328]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {tab.key === "pending" && hotels.some((h) => !h.isVerified) && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[9px]">
                {hotels.filter((h) => !h.isVerified).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-28 rounded-2xl border border-gray-100 bg-gray-50 animate-pulse" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl bg-gray-50/60">
          <Building2 className="mx-auto text-gray-300 mb-3" size={28} />
          <p className="text-xs text-gray-500">No {activeTab} applications right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((hotel) => (
            <div
              key={hotel.id}
              className="flex flex-col sm:flex-row gap-4 border border-gray-100 rounded-2xl p-4 bg-white shadow-sm"
            >
              <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                {hotel.coverImage ? (
                  <img src={hotel.coverImage} alt={hotel.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Building2 size={22} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{hotel.name}</h3>
                  <span className="shrink-0 text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock3 size={10} />
                    {new Date(hotel.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={11} />
                  {hotel.district ? `${hotel.district}, ` : ""}
                  {hotel.city}, {hotel.region}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[11px] text-gray-500">
                  {hotel.phoneNumber && (
                    <span className="flex items-center gap-1">
                      <Phone size={11} /> {hotel.phoneNumber}
                    </span>
                  )}
                  {hotel.email && (
                    <span className="flex items-center gap-1">
                      <Mail size={11} /> {hotel.email}
                    </span>
                  )}
                </div>

                {hotel.description && (
                  <p className="text-[11px] text-gray-600 mt-2 line-clamp-2">{hotel.description}</p>
                )}
              </div>

              {activeTab === "pending" && (
                <div className="flex sm:flex-col gap-2 shrink-0 sm:justify-center">
                  <button
                    onClick={() => handleApprove(hotel)}
                    disabled={busyId === hotel.id}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    <CheckCircle2 size={14} /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(hotel)}
                    disabled={busyId === hotel.id}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelApprovals;