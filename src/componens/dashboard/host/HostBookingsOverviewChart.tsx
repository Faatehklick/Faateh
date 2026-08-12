
export function HostBookingsOverviewChart() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 lg:col-span-2">
      <div className="flex justify-between items-center text-xs">
        <div>
          <h3 className="font-bold text-gray-900">Bookings Overview</h3>
          <p className="text-[10px] text-gray-400">Track booking trends over the current month</p>
        </div>
        <select className="border border-gray-200 rounded-xl px-3 py-1.5 bg-gray-50 font-semibold text-gray-600 focus:outline-none">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Graphical simulated wave line view */}
      <div className="h-44 w-full flex items-end justify-between px-4 pt-6 pb-2 relative border-b border-l border-gray-200">
        <div className="absolute inset-x-4 top-1/4 border-t border-dashed border-gray-100" />
        <div className="absolute inset-x-4 top-2/4 border-t border-dashed border-gray-100" />
        <div className="absolute inset-x-4 top-3/4 border-t border-dashed border-gray-100" />

        {/* Data points */}
        {[{ d: "1 May", h: "30%" }, { d: "8 May", h: "45%" }, { d: "15 May", h: "75%" }, { d: "22 May", h: "60%" }, { d: "31 May", h: "80%" }].map((pt, i) => (
          <div key={i} className="flex flex-col items-center gap-2 z-10">
            <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow" style={{ marginBottom: pt.h }} />
            <span className="text-[10px] font-medium text-gray-400">{pt.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}