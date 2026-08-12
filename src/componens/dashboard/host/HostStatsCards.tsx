import { Building2, CheckCircle2, Clock, Star } from "lucide-react";

export function HostStatsCards() {
  const stats = [
    { label: "Total Rooms", val: "85", sub: "View all rooms", icon: Building2, color: "text-blue-600 bg-blue-50" },
    { label: "Available Rooms", val: "42", sub: "49% availability", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Today's Bookings", val: "18", sub: "View bookings", icon: Clock, color: "text-indigo-600 bg-indigo-50" },
    { label: "Average Rating", val: "4.8", sub: "412 reviews", icon: Star, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-3 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-medium text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.val}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <Icon size={18} />
              </div>
            </div>
            <p className="text-[10px] text-blue-600 font-bold cursor-pointer hover:underline">{stat.sub} →</p>
          </div>
        );
      })}
    </div>
  );
}