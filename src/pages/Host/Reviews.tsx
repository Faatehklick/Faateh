import { HostLayout } from "../../layouts/HostLayout";
import { useHost } from "../../hooks/useHost";
import { MessageSquare } from "lucide-react";

// TODO: no reviews endpoint exists yet in src/api/. Once the backend exposes
// something like GET /api/hotels/:hotelId/reviews, replace this with a real
// fetch the same way Bookings.tsx uses bookingsApi.hostList — add a
// src/types/review.ts and src/api/reviews.api.ts first.
interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function Reviews() {
  const { activeHotel } = useHost();
  const reviews: Review[] = [];

  return (
    <HostLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Reviews</h1>
          <p className="text-xs text-gray-500">
            See what your guests are saying about{" "}
            {activeHotel?.name || "your property"}
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">No reviews yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Customer feedback and star ratings will show up here as soon as guests complete their stays.
            </p>
          </div>
        ) : null}
      </div>
    </HostLayout>
  );
}