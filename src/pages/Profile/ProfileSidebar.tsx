import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Calendar, LogOut, LayoutDashboard } from "lucide-react";

interface ProfileSidebarProps {
  activeTab?: "booking";
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = () => {
  const { user, logout } = useAuth();
  const isHost = user?.role === "host";

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm">
        <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h3 className="font-bold text-gray-900">{user?.name || "User"}</h3>
        <p className="text-xs text-gray-400">{user?.email || ""}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-2 shadow-sm space-y-1">
        {isHost ? (
          <Link
            to="/host/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium bg-blue-50 text-blue-900 hover:bg-blue-100 transition-colors"
          >
            <LayoutDashboard size={18} />
            <div>
              <p className="font-semibold leading-none">Host Dashboard</p>
              <p className="text-xs text-gray-400 mt-1">Manage your hotel</p>
            </div>
          </Link>
        ) : (
          <Link
            to="/profile"
            className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium bg-blue-50 text-blue-900 transition-colors"
          >
            <Calendar size={18} />
            <div>
              <p className="font-semibold leading-none">My Booking</p>
              <p className="text-xs text-blue-600/80 mt-1">View your bookings</p>
            </div>
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={18} />
          <div>
            <p className="font-semibold leading-none">Logout</p>
            <p className="text-xs text-gray-400 mt-1">Sign out from your account</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;