
export function HostTodaysBookingsTable() {
  const todaysList = [
    { id: "#FB-00062", guest: "Abdi Mohamed", room: "Deluxe Sea View (DR-101)", time: "2:00 PM", status: "Confirmed" },
    { id: "#FB-00061", guest: "Ayaan Hassan", room: "Family Suite (FS-201)", time: "3:00 PM", status: "Pending" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-xs">
      <h3 className="font-bold text-gray-900">Today's Check-ins</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
            <tr>
              <th className="p-3 font-semibold">Booking ID</th>
              <th className="p-3 font-semibold">Guest</th>
              <th className="p-3 font-semibold">Room</th>
              <th className="p-3 font-semibold">Check-in Time</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {todaysList.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="p-3 font-mono font-bold text-gray-700">{row.id}</td>
                <td className="p-3 font-bold text-gray-900">{row.guest}</td>
                <td className="p-3 text-gray-600">{row.room}</td>
                <td className="p-3 text-gray-600">{row.time}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${row.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}