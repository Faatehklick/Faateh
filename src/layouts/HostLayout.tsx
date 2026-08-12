import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, DoorOpen, Star, User, LogOut, ArrowLeft, Building2 } from "lucide-react";
import { useHost } from "../hooks/useHost";

interface HostLayoutProps {
  children: ReactNode;
}

export function HostLayout({ children }: HostLayoutProps) {
  const location = useLocation();
  const { activeHotel } = useHost();

  const navItems = [
    { label: "Dashboard", path: "/host/dashboard", icon: LayoutDashboard },
    { label: "Bookings", path: "/host/bookings", icon: Calendar },
    { label: "Rooms", path: "/host/rooms", icon: DoorOpen },
    { label: "Reviews", path: "/host/reviews", icon: Star },
    { label: "Profile", path: "/host/profile", icon: User },
  ];

  const hotelDisplayName = activeHotel?.name || "FAATEH HOST";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - sticky with h-screen so it stays fixed and doesn't grow longer than the viewport */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex border-r border-slate-800 sticky top-0 h-screen shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30 font-bold">
              {activeHotel?.logoImage ? (
                <img src={activeHotel.logoImage} alt="Logo" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Building2 size={18} />
              )}
            </div>
            <div className="overflow-hidden">
              <h1 className="text-xs font-black tracking-wider uppercase text-white truncate" title={hotelDisplayName}>
                {hotelDisplayName}
              </h1>
              <p className="text-[10px] text-slate-400">Property Management</p>
            </div>
          </div>
          <nav className="p-4 space-y-1 text-xs">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${
                    isActive ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800 text-xs space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-4 rounded-xl transition"
          >
            <ArrowLeft size={14} /> Go Back Home
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 w-full rounded-xl font-bold transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
          <h2 className="text-sm font-bold text-gray-900">Host Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              AH
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}