import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Sparkles,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUpRight
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
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center space-y-3 shadow-sm max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Building2 size={32} />
          </div>
          <h3 className="font-extrabold text-gray-900 text-base">No property registered yet</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
            You haven't submitted a hotel application. Complete the Become a
            Host wizard to initialize your host management dashboard.
          </p>
        </div>
      </HostLayout>
    );
  }

  return (
    <HostLayout>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Verification Notice Banner */}
        {!isVerified && (
          <div className="flex items-center gap-3.5 bg-amber-50 border border-amber-200/80 text-amber-900 rounded-2xl p-4 text-xs shadow-sm">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
              <Hourglass size={18} />
            </div>
            <div>
              <p className="font-extrabold text-amber-900">Waiting for admin approval</p>
              <p className="text-amber-700/90 mt-0.5">
                Your hotel details are safely stored. Once an admin reviews and approves your application, room publishing and reservations will be fully unlocked.
              </p>
            </div>
          </div>
        )}

        {/* Hero Hotel Showcase Card with Taller Cover Image */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
          {/* Taller Cover Image Banner */}
          <div className="h-64 sm:h-72 relative bg-slate-900">
            {activeHotel.coverImage ? (
              <img src={activeHotel.coverImage} alt="Hotel Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 opacity-90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-[11px] font-bold flex items-center gap-1.5">
              <Sparkles size={13} className="text-blue-400" /> Host Dashboard
            </div>
          </div>

          <div className="p-6 sm:p-8 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-20 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                {/* Floating Logo Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-xl bg-white overflow-hidden flex items-center justify-center shrink-0">
                  {activeHotel.logoImage ? (
                    <img src={activeHotel.logoImage} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-black text-blue-600">
                      {activeHotel.name ? activeHotel.name.charAt(0) : "H"}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex flex-wrap items-center gap-2.5">
                    {activeHotel.name || "Your Hotel Name"}
                    {isVerified ? (
                      <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-0.5 rounded-full font-extrabold flex items-center gap-1 shadow-sm">
                        <ShieldCheck size={13} className="text-emerald-600" /> Verified
                      </span>
                    ) : (
                      <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-3 py-0.5 rounded-full font-bold shadow-sm">
                        Pending review
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <MapPin size={13} className="text-blue-600 shrink-0" /> {address || "Location not set"}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 max-w-3xl leading-relaxed font-medium">
              {activeHotel.description || "No description provided yet."}
            </p>

            {/* Contact Footer Chips */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-600 font-semibold">
              <div className="flex items-center gap-1.5 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-100">
                <Phone size={13} className="text-blue-600" />
                <span>{activeHotel.phoneNumber || "No phone"}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-100">
                <Mail size={13} className="text-indigo-600" />
                <span>{activeHotel.email || "No email"}</span>
              </div>
              {activeHotel.website && (
                <a href={activeHotel.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-blue-50/50 text-blue-600 px-3.5 py-2 rounded-xl border border-blue-100 hover:bg-blue-50 transition">
                  <Globe size={13} />
                  <span>{activeHotel.website}</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stylish Modern Metric Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Declared</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Building2 size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">{activeHotel.totalRooms || "0"}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Total capacity rooms</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-100 transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Published</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <DoorClosed size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">{rooms.length}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Active on listings</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-100 transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Today</span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <CalendarCheck size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">{todaysBookings}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Check-ins today</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-amber-100 transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pending</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Clock size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">{pendingBookings}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Awaiting action</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-yellow-100 transition space-y-3 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Rating</span>
              <div className="p-2 rounded-xl bg-yellow-50 text-yellow-500">
                <Star size={16} className="fill-yellow-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">{activeHotel.starRating || "—"}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Guest feedback score</p>
            </div>
          </div>
        </div>

        {/* Quick Insights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-lg shadow-blue-600/10 flex flex-col justify-between space-y-6 md:col-span-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Performance Overview</span>
                <h3 className="text-lg font-black">Your hosting metrics are looking great!</h3>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
                <TrendingUp size={20} className="text-blue-200" />
              </div>
            </div>
            <p className="text-xs text-blue-100/90 leading-relaxed font-medium">
              Keep your room availability updated in the calendar section and respond to pending reservations promptly to maximize guest satisfaction ratings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Quick Actions</span>
              <h3 className="text-sm font-bold text-gray-900">Manage Rooms</h3>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Add new inventory or update pricing tiers directly.
            </p>
            <Link to="/host/rooms" className="inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold text-xs py-2.5 px-4 rounded-xl border border-gray-200 transition">
              View Rooms List →
            </Link>
          </div>
        </div>
      </div>
    </HostLayout>
  );
}