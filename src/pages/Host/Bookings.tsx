import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";

import { HostLayout } from "../../layouts/HostLayout";
import { useHost } from "../../hooks/useHost";
import { bookingsApi } from "../../api/bookings.api";
import { getApiErrorMessage } from "../../api/client";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
} from "../../utils/constants";
import { formatCurrency } from "../../utils/helpers";
import { formatDate } from "../../utils/formatDate";
import type { Booking } from "../../types/booking";

export default function Bookings() {
  const { activeHotel } = useHost();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeHotel) {
      setBookings([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    bookingsApi
      .hostList({ hotelId: activeHotel.id })
      .then((list) => {
        if (!cancelled) setBookings(list);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(getApiErrorMessage(err, "Could not load bookings."));
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeHotel]);

  return (
    <HostLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Bookings</h1>
          <p className="text-xs text-gray-500">
            Manage incoming customer reservations for{" "}
            {activeHotel?.name || "your property"}
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-xs text-gray-400">
            Loading bookings…
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-12 text-center text-xs text-red-600">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <CalendarCheck size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">No bookings yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Customer reservations will show up here as soon as guests book your rooms.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="p-3 font-semibold">Booking ID</th>
                  <th className="p-3 font-semibold">Guest</th>
                  <th className="p-3 font-semibold">Room</th>
                  <th className="p-3 font-semibold">Check-in</th>
                  <th className="p-3 font-semibold">Check-out</th>
                  <th className="p-3 font-semibold">Amount</th>
                  <th className="p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50">
                    <td className="p-3 font-mono font-bold text-gray-700">
                      {b.reference ?? b.id}
                    </td>
                    <td className="p-3 font-bold text-gray-900">
                      {b.user?.name ?? "Guest"}
                    </td>
                    <td className="p-3 text-gray-600">
                      {b.room?.type ?? "—"}
                    </td>
                    <td className="p-3 text-gray-600">{formatDate(b.checkIn)}</td>
                    <td className="p-3 text-gray-600">{formatDate(b.checkOut)}</td>
                    <td className="p-3 font-semibold text-gray-800">
                      {formatCurrency(b.totalAmount)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${BOOKING_STATUS_STYLES[b.status]}`}
                      >
                        {BOOKING_STATUS_LABELS[b.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </HostLayout>
  );
}