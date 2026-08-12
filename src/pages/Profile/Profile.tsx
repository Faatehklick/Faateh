import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Eye, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useBooking } from "../../hooks/useBooking";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
} from "../../utils/constants";
import { formatCurrency, firstImage, joinAddress } from "../../utils/helpers";
import { formatDate } from "../../utils/formatDate";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { myBookings, isLoading } = useBooking();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <nav className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span>&gt;</span>
            <span className="font-medium text-gray-800">My Profile</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <h2 className="font-bold text-gray-900">{user?.name || "User Name"}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{user?.email || "user@example.com"}</p>
            </div>

            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm space-y-1">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium text-sm">
                <Calendar size={18} />
                <div>
                  <div className="font-semibold text-xs text-blue-900">My Booking</div>
                  <div className="text-[11px] text-blue-600/80">View your bookings</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <LogOut size={18} />
                <div>
                  <div className="font-semibold text-xs text-gray-800">Sign Out</div>
                  <div className="text-[11px] text-gray-400">Sign out from your account</div>
                </div>
              </button>
            </div>
          </aside>

          {/* Main Booking Content */}
          <main className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                    <Calendar size={20} className="text-gray-700" />
                    <h2>My Booking</h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">View your current and past bookings</p>
                </div>

                <Link
                  to="/"
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  + New Booking
                </Link>
              </div>

              {isLoading ? (
                <div className="py-12 text-center text-xs text-gray-400">Loading your bookings…</div>
              ) : myBookings.length === 0 ? (
                <div className="border border-dashed border-gray-200 rounded-xl p-12 text-center">
                  <UserCircle size={40} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-sm font-bold text-gray-700">No bookings yet</h3>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    You haven't booked a hotel yet. Once you do, it'll show up here.
                  </p>
                  <Link
                    to="/"
                    className="inline-block bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Browse Hotels
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myBookings.map((b) => {
                    const image = firstImage(b.hotel?.images, b.hotel?.coverImage);
                    const location = joinAddress(b.hotel?.city, b.hotel?.region);

                    return (
                      <div
                        key={b.id}
                        className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-start"
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={b.hotel?.name ?? "Hotel"}
                            className="w-full md:w-56 h-40 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full md:w-56 h-40 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                            No image
                          </div>
                        )}

                        <div className="flex-1 w-full flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-base font-bold text-gray-900">
                                  {b.hotel?.name ?? "Hotel"}
                                </h3>
                                {location && (
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                    📍 {location}
                                  </p>
                                )}
                              </div>
                              <span
                                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${BOOKING_STATUS_STYLES[b.status]}`}
                              >
                                {BOOKING_STATUS_LABELS[b.status]}
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 my-4 py-3 border-y border-gray-100 text-xs">
                              <div>
                                <span className="text-gray-400 block mb-1">Check-in</span>
                                <p className="font-bold text-gray-800">{formatDate(b.checkIn)}</p>
                              </div>
                              <div>
                                <span className="text-gray-400 block mb-1">Check-out</span>
                                <p className="font-bold text-gray-800">{formatDate(b.checkOut)}</p>
                              </div>
                              <div>
                                <span className="text-gray-400 block mb-1">Guests</span>
                                <p className="font-bold text-gray-800">{b.guests}</p>
                                {b.room && (
                                  <p className="text-[10px] text-gray-400">{b.room.type}</p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="text-[11px] text-gray-400 flex items-center gap-2">
                              <span>Booking ID: {b.reference ?? b.id}</span>
                              <span>|</span>
                              <span>Booked on: {formatDate(b.createdAt)}</span>
                            </div>

                            <div className="flex items-center gap-3 ml-auto">
                              <div className="text-right mr-2">
                                <span className="text-[10px] text-gray-400 block">Total Amount</span>
                                <span className="text-lg font-bold text-blue-900">
                                  {formatCurrency(b.totalAmount)}
                                </span>
                              </div>
                              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                                <Eye size={14} /> View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;