
export function HostRoomStatusChart() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex justify-between items-center text-xs">
        <h3 className="font-bold text-gray-900">Room Status</h3>
        <span className="font-bold text-blue-600 cursor-pointer">View all rooms</span>
      </div>

      <div className="flex items-center justify-center py-4 relative">
        {/* Simple visual ring representation */}
        <div className="w-32 h-32 rounded-full border-8 border-blue-600 border-t-emerald-500 border-r-amber-500 border-b-red-500 flex flex-col items-center justify-center shadow-inner">
          <span className="text-xl font-black text-gray-900">18</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase">Total</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-100 text-gray-600">
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available (8)</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Booked (6)</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Maintenance (2)</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Unavailable (2)</div>
      </div>
    </div>
  );
}