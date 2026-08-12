import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Star, Edit3, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const EditProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [checkIn, setCheckIn] = useState("2025-07-20");
  const [checkOut, setCheckOut] = useState("2025-07-22");
  const [guests, setGuests] = useState("2 Guests");
  const [rooms, setRooms] = useState("1 Room");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Title & Breadcrumbs */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Booking</h1>
          <nav className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600 hover:underline">
              Home
            </Link>
            <span>&gt;</span>
            <Link to="/profile" className="hover:text-blue-600 hover:underline">
              My Profile
            </Link>
            <span>&gt;</span>
            <span className="font-medium text-gray-800">Edit Booking</span>
          </nav>
        </div>

        {/* Main Grid */}
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
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Calendar size={18} />
                <div>
                  <div className="font-semibold text-xs text-gray-800">My Booking</div>
                  <div className="text-[11px] text-gray-400">View your bookings</div>
                </div>
              </Link>

              <Link
                to="/profile/reviews"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Star size={18} />
                <div>
                  <div className="font-semibold text-xs text-gray-800">Review</div>
                  <div className="text-[11px] text-gray-400">Rate and review your stay</div>
                </div>
              </Link>

              <Link
                to="/profile/edit"
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium text-sm transition-colors"
              >
                <Edit3 size={18} />
                <div>
                  <div className="font-semibold text-xs text-blue-900">Edit</div>
                  <div className="text-[11px] text-blue-600/80">Edit your booking details</div>
                </div>
              </Link>

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

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Hotel Preview Card */}
                <div className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400"
                      alt="Jazeera Palace Hotel"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-bold text-gray-900 text-sm">Jazeera Palace Hotel</h3>
                    <p className="text-xs text-gray-500 mt-0.5">📍 Mogadishu, Somalia</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span>Booking ID: #ALF1256789</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Confirmed
                    </span>
                  </div>
                </div>

                {/* Edit Booking Form */}
                <form className="md:col-span-2 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <h2 className="text-base font-bold text-gray-900">Edit Your Booking</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Check-in Date</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Check-out Date</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:ring-blue-600 focus:border-blue-600"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Rooms</label>
                      <select
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:ring-blue-600 focus:border-blue-600"
                      >
                        <option>1 Room</option>
                        <option>2 Rooms</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Special Request (Optional)</label>
                    <textarea
                      rows={3}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="Enter your special request..."
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Link
                      to="/profile"
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;