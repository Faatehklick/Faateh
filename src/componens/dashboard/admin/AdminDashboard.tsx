import React, { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ChevronDown,
  Bookmark,
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  User,
  Phone,
  MapPin,
  FileText,
  Layers
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hotelsApi } from "../../../api/hotels.api";
import type { Hotel } from "../../../types/hotel";
import toast from "react-hot-toast";

interface LoggedUser {
  name: string;
  email: string;
  role: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  const [adminUser, setAdminUser] = useState<LoggedUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("faateh_user");
      if (rawUser) {
        setAdminUser(JSON.parse(rawUser));
      } else {
        setAdminUser({ name: "System Admin", email: "admin@faateh.com", role: "ADMIN" });
      }
    } catch {
      setAdminUser({ name: "System Admin", email: "admin@faateh.com", role: "ADMIN" });
    }
  }, []);

  const fetchAdminHotels = async () => {
    try {
      setLoading(true);
      const data = await hotelsApi.adminList();
      setHotels(data);
    } catch (err: any) {
      toast.error("Failed to load hotels data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminHotels();
  }, []);

  const handleVerifyHotel = async (hotelId: string, currentStatus: boolean) => {
    try {
      await hotelsApi.setVerified(hotelId, !currentStatus);
      toast.success(!currentStatus ? "Hotel confirmed successfully and published to Home!" : "Hotel unverified.");
      fetchAdminHotels();
      if (selectedHotel && selectedHotel.id === hotelId) {
        setSelectedHotel((prev: any) => prev ? { ...prev, isVerified: !currentStatus } : null);
      }
    } catch (err: any) {
      toast.error("Failed to update hotel status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("faateh_token");
    localStorage.removeItem("faateh_user");
    navigate("/admin/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col justify-between p-6 shadow-md">
        <div>
          <div className="text-2xl font-bold tracking-wider mb-10 flex items-center">
            Dash<span className="text-blue-300">.</span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "dashboard" ? "bg-blue-700 text-white shadow-sm" : "text-blue-100 hover:bg-blue-500/50"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("hotels")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "hotels" ? "bg-blue-700 text-white shadow-sm" : "text-blue-100 hover:bg-blue-500/50"
              }`}
            >
              <Building2 size={18} />
              Hotels Approvals
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "bookings" ? "bg-blue-700 text-white shadow-sm" : "text-blue-100 hover:bg-blue-500/50"
              }`}
            >
              <CalendarCheck size={18} />
              Bookings
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "users" ? "bg-blue-700 text-white shadow-sm" : "text-blue-100 hover:bg-blue-500/50"
              }`}
            >
              <Users size={18} />
              Users
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "settings" ? "bg-blue-700 text-white shadow-sm" : "text-blue-100 hover:bg-blue-500/50"
              }`}
            >
              <Settings size={18} />
              Settings
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-blue-500/40 text-xs text-blue-200">
          <p className="font-semibold mb-1">System Support</p>
          <span className="text-white">Active Session</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-xs">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search hotels, users..."
                className="w-full bg-gray-100 border border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {adminUser ? getInitials(adminUser.name) : "AD"}
              </div>
              <div className="hidden md:block text-left">
                <span className="block text-sm font-semibold text-gray-800">
                  {adminUser?.name || "System Admin"}
                </span>
                <span className="block text-xs text-gray-500 capitalize">
                  {adminUser?.role || "Manager"}
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Dashboard Body View */}
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <span className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs">System Active</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hotels</p>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">{hotels.length}</h3>
                  </div>
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Building2 size={20} /></div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Verified Hotels (Home)</p>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">{hotels.filter(h => h.isVerified).length}</h3>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle size={20} /></div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Submissions</p>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">{hotels.filter(h => !h.isVerified).length}</h3>
                  </div>
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Bookmark size={20} /></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">New Hotel Submissions (Become Host)</h3>
                <div className="space-y-3">
                  {loading ? (
                    <p className="text-sm text-gray-500 py-4 text-center">Loading hotels...</p>
                  ) : hotels.filter(h => !h.isVerified).length === 0 ? (
                    <p className="text-sm text-gray-500 py-4 text-center">No pending hotels waiting for confirmation.</p>
                  ) : (
                    hotels.filter(h => !h.isVerified).map((hotel: any) => (
                      <div key={hotel.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                          <h4 className="font-semibold text-gray-800">{hotel.name}</h4>
                          <p className="text-xs text-gray-500">Owner: {hotel.ownerName || hotel.managerName || "N/A"} • City: {hotel.city}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedHotel(hotel)}
                            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <Eye size={14} /> View All Info
                          </button>
                          <button 
                            onClick={() => handleVerifyHotel(hotel.id, hotel.isVerified)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <CheckCircle size={14} /> Confirm & Publish
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "hotels" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Hotels Verification & Management</h1>
                <span className="text-sm text-gray-500">{hotels.length} Total Hotels Registered</span>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                      <th className="py-3 px-6">Hotel Name</th>
                      <th className="py-3 px-6">Owner / Manager</th>
                      <th className="py-3 px-6">City</th>
                      <th className="py-3 px-6">Rooms</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm">
                    {hotels.map((hotel: any) => (
                      <tr key={hotel.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium text-gray-800">{hotel.name}</td>
                        <td className="py-4 px-6 text-gray-600">{hotel.ownerName || hotel.managerName || "Not Specified"}</td>
                        <td className="py-4 px-6 text-gray-500">{hotel.city}</td>
                        <td className="py-4 px-6 text-gray-500">{hotel.roomsCount || hotel.rooms?.length || "N/A"}</td>
                        <td className="py-4 px-6">
                          {hotel.isVerified ? (
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium inline-flex items-center gap-1">
                              <CheckCircle size={12} /> Confirmed (Active on Home)
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium inline-flex items-center gap-1">
                              <XCircle size={12} /> Pending Review
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => setSelectedHotel(hotel)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                          >
                            View All Info
                          </button>
                          <button
                            onClick={() => handleVerifyHotel(hotel.id, hotel.isVerified)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-white ${
                              hotel.isVerified ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {hotel.isVerified ? "Revoke" : "Confirm"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs text-center text-gray-500">
                Client booking records will appear here as soon as reservations are made.
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800">System Users</h1>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs text-center text-gray-500">
                Registered platform hosts and guests list.
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800">Admin Settings</h1>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs text-center text-gray-500">
                Configure platform settings and preferences.
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Comprehensive Hotel Details Modal (Styled ala Dash) */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Hotel Complete Submission Info</span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">{selectedHotel.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedHotel(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* Owner / Manager Details */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                  <User size={14} /> Owner / Manager Info
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Full Name:</span>
                  <p className="font-semibold text-gray-800">{selectedHotel.ownerName || selectedHotel.managerName || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Contact Email / Phone:</span>
                  <p className="font-semibold text-gray-800">{selectedHotel.email || selectedHotel.phone || "N/A"}</p>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                  <MapPin size={14} /> Location Details
                </div>
                <div>
                  <span className="text-gray-500 text-xs">City:</span>
                  <p className="font-semibold text-gray-800">{selectedHotel.city || "N/A"}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Street Address:</span>
                  <p className="font-semibold text-gray-800">{selectedHotel.address || "N/A"}</p>
                </div>
              </div>

              {/* Rooms & Capacity Info */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                  <Layers size={14} /> Rooms Setup
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Rooms Number / Count:</span>
                  <p className="font-semibold text-gray-800">{selectedHotel.roomsCount || selectedHotel.rooms?.length || "0"} Rooms Listed</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Price Range:</span>
                  <p className="font-semibold text-gray-800">{selectedHotel.pricePerNight ? `$${selectedHotel.pricePerNight} / night` : "Configured per room"}</p>
                </div>
              </div>

              {/* Verification & Status */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                  <Phone size={14} /> Contact & Status
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Phone Number:</span>
                  <p className="font-semibold text-gray-800">{selectedHotel.phone || "N/A"}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Current State:</span>
                  <p className={selectedHotel.isVerified ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                    {selectedHotel.isVerified ? "Confirmed & Active on Home" : "Pending Approval"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                <FileText size={14} /> Hotel Description & Amenities
              </div>
              <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                {selectedHotel.description || "No description provided during host registration."}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedHotel(null)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleVerifyHotel(selectedHotel.id, selectedHotel.isVerified);
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors shadow-xs ${
                  selectedHotel.isVerified ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {selectedHotel.isVerified ? "Revoke Verification" : "Confirm & Publish to Home"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;