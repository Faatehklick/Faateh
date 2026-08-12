import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LayoutDashboard } from "lucide-react";

interface ProfileSidebarProps {
  activeTab: "booking" | "reviews" | "edit";
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab }) => {
  const { user } = useAuth();
  const isHost = user?.role === "host";

  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm">
        <div className="w-16 h-16 bg-[#003B2B] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h3 className="font-bold text-gray-900">{user?.name || "User"}</h3>
        <p className="text-xs text-gray-400">{user?.email || ""}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-2 shadow-sm space-y-1">
        {isHost ? (
          <Link
            to="/host/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium bg-emerald-50 text-[#003B2B] hover:bg-emerald-100 transition-colors"
          >
            <LayoutDashboard size={18} />
            <div>
              <p className="font-semibold leading-none">Host Dashboard</p>
              <p className="text-xs text-gray-400 mt-1">Manage your hotel</p>
            </div>
          </Link>
        ) : (
          <>
            <Link to="/profile" className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "booking" ? "bg-emerald-50 text-[#003B2B]" : "text-gray-600 hover:bg-gray-50"}`}>
              <span>📅</span>
              <div><p className="font-semibold leading-none">My Booking</p><p className="text-xs text-gray-400 mt-1">View your bookings</p></div>
            </Link>
            <Link to="/profile/reviews" className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "reviews" ? "bg-emerald-50 text-[#003B2B]" : "text-gray-600 hover:bg-gray-50"}`}>
              <span>⭐</span>
              <div><p className="font-semibold leading-none">Review</p><p className="text-xs text-gray-400 mt-1">Rate and review your stay</p></div>
            </Link>
            <Link to="/profile/edit" className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "edit" ? "bg-emerald-50 text-[#003B2B]" : "text-gray-600 hover:bg-gray-50"}`}>
              <span>✏️</span>
              <div><p className="font-semibold leading-none">Edit</p><p className="text-xs text-gray-400 mt-1">Edit your booking details</p></div>
            </Link>
          </>
        )}

        <button className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 text-left">
          <span>🚪</span>
          <div><p className="font-semibold leading-none">Sign Out</p><p className="text-xs text-gray-400 mt-1">Sign out from your account</p></div>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;