import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, DoorOpen, Star, Settings, User, LogOut } from "lucide-react";

interface HostLayoutProps {
  children: ReactNode;
}

export function HostLayout({ children }: HostLayoutProps) {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/host/dashboard", icon: LayoutDashboard },
    { label: "Bookings", path: "/host/bookings", icon: Calendar },
    { label: "Rooms", path: "/host/rooms", icon: DoorOpen },
    { label: "Reviews", path: "/host/reviews", icon: Star },
    { label: "Settings", path: "/host/settings", icon: Settings },
    { label: "Profile", path: "/host/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex border-r border-slate-800">
        <div>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-base font-black tracking-wider text-blue-400">FAATEH HOST</h1>
            <p className="text-[10px] text-slate-400">Property Management</p>
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
        <div className="p-4 border-t border-slate-800 text-xs">
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