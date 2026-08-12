import { useEffect, useState } from "react";
import { HostLayout } from "../../layouts/HostLayout";
import { useHost } from "../../hooks/useHost";
import { bookingsApi } from "../../api/bookings.api";
import { joinAddress } from "../../utils/helpers";
import { todayInputDate } from "../../utils/formatDate";
import type { Booking } from "../../types/booking";
import {
  Building2,
  DoorClosed,
  CalendarCheck,
  Clock,
  Star,
  ShieldCheck,
  Hourglass,
} from "lucide-react";

export default function Dashboard() {
  const { activeHotel, rooms, isVerified } = useHost();
  const [hostBookings, setHostBookings] = useState<Booking[]>([]);

  const address = joinAddress(
    activeHotel?.district,
    activeHotel?.city,
    activeHotel?.region,
  );

  useEffect(() => {
    if (!activeHotel) {
      setHostBookings([]);
      return;
    }

    let cancelled = false;
    bookingsApi
      .hostList({ hotelId: activeHotel.id })
      .then((list) => {
        if (!cancelled) setHostBookings(list);
      })
      .catch(() => {
        if (!cancelled) setHostBookings([]);
      });

    return () => {
      cancelled = true;
    };
  }, [activeHotel]);

  const today = todayInputDate();
  const todaysBookings = hostBookings.filter(
    (b) => b.checkIn.slice(0, 10) === today,
  ).length;
  const pendingBookings = hostBookings.filter(
    (b) => b.status === "PENDING_PAYMENT",
  ).length;

  if (!activeHotel) {
    return (
      <HostLayout>
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-2">
          <h3 className="font-bold text-gray-900 text-sm">No hotel yet</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            You haven't submitted a hotel application. Complete the Become a
            Host wizard to get started.
          </p>
        </div>
      </HostLayout>
    );
  }

  return (
    <HostLayout>
      <div className="space-y-6">
        {!isVerified && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs">
            <Hourglass size={18} className="shrink-0" />
            <div>
              <p className="font-bold">Waiting for admin approval</p>
              <p className="text-amber-700/80">
                Your hotel details are saved. Once an admin approves your application, you'll be able to add rooms and receive bookings.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-48 relative bg-gray-200">
            {activeHotel.coverImage && (
              <img src={activeHotel.coverImage} alt="Hotel Cover" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-14 mb-4">
              <div className="flex items-end gap-4">
                <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md bg-white overflow-hidden flex items-center justify-center">
                  {activeHotel.logoImage ? (
                    <img src={activeHotel.logoImage} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-black text-gray-400">
                      {activeHotel.name ? activeHotel.name.charAt(0) : "H"}
                    </span>
                  )}
                </div>
                <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    {activeHotel.name || "Your Hotel Name"}
                    {isVerified ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <ShieldCheck size={11} /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                        Pending review
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-gray-500">📍 {address || "Location not set"}</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 max-w-2xl leading-relaxed">
              {activeHotel.description || "No description provided yet."}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-6 text-xs text-gray-500">
              <span>📞 {activeHotel.phoneNumber || "—"}</span>
              <span>✉️ {activeHotel.email || "—"}</span>
              {activeHotel.website && <span>🌐 {activeHotel.website}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Declared Rooms</span>
              <Building2 size={16} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900">{activeHotel.totalRooms || "0"}</h3>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Rooms Published</span>
              <DoorClosed size={16} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900">{rooms.length}</h3>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Today's Bookings</span>
              <CalendarCheck size={16} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900">{todaysBookings}</h3>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Pending Bookings</span>
              <Clock size={16} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900">{pendingBookings}</h3>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm col-span-2 md:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Star Rating</span>
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
            </div>
            <h3 className="text-xl font-black text-gray-900">{activeHotel.starRating || "—"}</h3>
          </div>
        </div>
      </div>
    </HostLayout>
  );
}