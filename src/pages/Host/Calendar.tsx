import { HostLayout } from "../../layouts/HostLayout";
import { Calendar as CalendarIcon, Check, Clock, Wrench, X } from "lucide-react";

export default function Calendar() {
  const dates = ["22 May (Thu)", "23 May (Fri)", "24 May (Sat)", "25 May (Sun)", "26 May (Mon)", "27 May (Tue)", "28 May (Wed)", "29 May (Thu)", "30 May (Fri)", "31 May (Sat)"];
  
  const roomsAvailability = [
    { num: "DR-101", type: "Deluxe Room", statuses: ["available", "available", "booked", "booked", "available", "available", "maintenance", "available", "booked", "available"] },
    { num: "SR-102", type: "Standard Room", statuses: ["booked", "available", "available", "available", "available", "available", "available", "available", "unavailable", "available"] },
    { num: "TR-103", type: "Twin Room", statuses: ["available", "available", "booked", "booked", "booked", "available", "available", "booked", "available", "available"] },
    { num: "FR-104", type: "Family Room", statuses: ["booked", "booked", "available", "available", "available", "available", "available", "available", "available", "available"] },
    { num: "SR-105", type: "Single Room", statuses: ["available", "available", "available", "available", "available", "maintenance", "available", "available", "available", "booked"] },
  ];

  return (
    <HostLayout>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Room Availability</h2>
            <p className="text-gray-400">Manage room availability for your hotel.</p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl text-gray-600 font-semibold">
            <CalendarIcon size={14} className="text-blue-600" />
            <span>22 May 2025 – 31 May 2025</span>
          </div>
        </div>

        {/* Legend Row */}
        <div className="flex flex-wrap items-center gap-6 p-3 bg-gray-50 rounded-xl border border-gray-100 text-[11px] font-semibold text-gray-600">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Available</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> Booked</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Maintenance</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Unavailable</div>
        </div>

        {/* Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <th className="p-3 text-left font-semibold">Room Number</th>
                {dates.map((d, i) => (
                  <th key={i} className="p-3 font-semibold whitespace-nowrap">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roomsAvailability.map((room, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="p-3 text-left font-bold text-gray-900">
                    <div>{room.num}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{room.type}</div>
                  </td>
                  {room.statuses.map((status, sIdx) => {
                    let badgeColor = "bg-emerald-50 text-emerald-600";
                    let Icon = Check;
                    if (status === "booked") { badgeColor = "bg-blue-50 text-blue-600"; Icon = Clock; }
                    else if (status === "maintenance") { badgeColor = "bg-amber-50 text-amber-600"; Icon = Wrench; }
                    else if (status === "unavailable") { badgeColor = "bg-red-50 text-red-600"; Icon = X; }

                    return (
                      <td key={sIdx} className="p-3">
                        <div className={`w-7 h-7 mx-auto rounded-lg flex items-center justify-center ${badgeColor}`}>
                          <Icon size={14} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HostLayout>
  );
}