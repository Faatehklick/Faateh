import { HostLayout } from "../../layouts/HostLayout";
import { useHost } from "../../hooks/useHost";
import { Building2, Mail, Phone, Globe, MapPin, ShieldCheck, Star, Sparkles, Layers } from "lucide-react";
import { joinAddress } from "../../utils/helpers";

export default function Profile() {
  const { activeHotel, isVerified } = useHost();

  const address = joinAddress(
    activeHotel?.district,
    activeHotel?.city,
    activeHotel?.region,
  );

  return (
    <HostLayout>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Sparkles className="text-blue-600" size={20} /> Host Profile
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Your registered property and manager credentials overview.
            </p>
          </div>
          <div>
            {isVerified ? (
              <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-550 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl font-bold shadow-sm">
                <ShieldCheck size={15} className="text-emerald-600" /> Verified Property
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-50 border border-amber-200 text-amber-700 px-3.5 py-1.5 rounded-xl font-bold shadow-sm">
                Pending Admin Verification
              </span>
            )}
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
          {/* Decorative Cover Banner */}
          <div className="h-48 relative bg-slate-900">
            {activeHotel?.coverImage ? (
              <img src={activeHotel.coverImage} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Floating Hotel Name Overlay on Cover */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div className="text-white">
                <span className="text-[10px] tracking-widest uppercase font-bold text-blue-300 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  Active Property
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 drop-shadow-sm">
                  {activeHotel?.name || "Your Hotel Name"}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 relative space-y-8">
            {/* Logo Avatar overlapping */}
            <div className="absolute -top-14 left-6 sm:left-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-xl bg-white overflow-hidden flex items-center justify-center">
                {activeHotel?.logoImage ? (
                  <img src={activeHotel.logoImage} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black">
                    {activeHotel?.name ? activeHotel.name.charAt(0) : "H"}
                  </div>
                )}
              </div>
            </div>

            {/* Push content down to clear overlapping avatar */}
            <div className="pt-10 sm:pt-6">
              {/* About description */}
              <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100 space-y-2">
                <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">About Property</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {activeHotel?.description || "No description provided during registration."}
                </p>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-xs">
                {/* Location */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-blue-100 transition">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Location Address</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{address || "Location not specified"}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-blue-100 transition">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Contact Phone</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{activeHotel?.phoneNumber || "Not provided"}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-blue-100 transition">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Support Email</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{activeHotel?.email || "Not provided"}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-blue-100 transition">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 shrink-0">
                    <Star size={18} className="fill-amber-500" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Star Rating</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">
                      {activeHotel?.starRating ? `${activeHotel.starRating} Star Property` : "Not rated"}
                    </span>
                  </div>
                </div>

                {/* Website */}
                {activeHotel?.website && (
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-blue-100 transition sm:col-span-2">
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                      <Globe size={18} />
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block text-[11px]">Official Website</span>
                      <a href={activeHotel.website} target="_blank" rel="noreferrer" className="font-bold text-blue-600 hover:underline mt-0.5 block">
                        {activeHotel.website}
                      </a>
                    </div>
                  </div>
                )}

                {/* Room Types Badges */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm sm:col-span-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                    <Layers size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-400 font-semibold block text-[11px] mb-2">Declared Room Categories</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeHotel?.roomTypes && activeHotel.roomTypes.length > 0 ? (
                        activeHotel.roomTypes.map((type, idx) => (
                          <span key={idx} className="bg-blue-50/60 text-blue-700 border border-blue-100 px-3 py-1 rounded-xl font-bold text-[11px]">
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 font-normal">No room types registered</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HostLayout>
  );
}