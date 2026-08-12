import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, ShieldCheck, Clock3, ArrowUpRight } from "lucide-react";
import { hotelsApi } from "../../api/hotels.api";
import { useAuth } from "../../hooks/useAuth";
import type { Hotel } from "../../types/hotel";

const FeaturedHotels = () => {
  const { user } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        // Everyone sees verified hotels. A logged-in host also sees their
        // own hotel while it's still pending, since hotelsApi.list() only
        // returns verified ones publicly.
        const [approved, mine] = await Promise.all([
          hotelsApi.list(),
          user ? hotelsApi.myHotels().catch(() => []) : Promise.resolve([] as Hotel[]),
        ]);

        const merged = new Map<string, Hotel>();
        approved.forEach((h) => merged.set(h.id, h));
        mine.forEach((h) => merged.set(h.id, h));

        if (!cancelled) {
          setHotels(
            Array.from(merged.values())
              .sort(
                (a, b) =>
                  new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
              )
              .slice(0, 6),
          );
        }
      } catch {
        if (!cancelled) setHotels([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Featured Hotels</h2>
          <p className="text-gray-500 mt-2">Handpicked stays our guests love most.</p>
        </div>
        <a href="/hotels" className="text-blue-600 font-semibold text-sm hover:underline">
          View all →
        </a>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-72 bg-gray-100" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-gray-200 bg-gray-50/60">
          <p className="text-gray-500 text-sm mb-4">No hotels listed yet.</p>
          <a
            href="/host"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            List Your Hotel
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => {
            const isApproved = hotel.isVerified;
            const roomTypeCount = hotel.roomTypes?.length ?? 0;
            const amenityPreview = (hotel.amenities ?? []).slice(0, 3);

            const card = (
              <div
                className={`group flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 ${
                  isApproved
                    ? "hover:shadow-2xl hover:-translate-y-1.5 hover:border-gray-200"
                    : "opacity-80"
                }`}
              >
                {/* Image with gradient title overlay */}
                <div className="relative h-72 bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-700 overflow-hidden">
                  {hotel.coverImage && (
                    <img
                      src={hotel.coverImage}
                      alt={hotel.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                        isApproved ? "group-hover:scale-105" : "grayscale-[35%]"
                      }`}
                    />
                  )}

                  {/* darken bottom of image so title text stays legible over any photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <span
                    className={`absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
                      isApproved
                        ? "bg-emerald-500/15 text-emerald-50 border border-emerald-300/40"
                        : "bg-amber-500/15 text-amber-50 border border-amber-300/40"
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <ShieldCheck size={12} /> Verified
                      </>
                    ) : (
                      <>
                        <Clock3 size={12} /> Pending Review
                      </>
                    )}
                  </span>

                  {hotel.starRating ? (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-amber-500 backdrop-blur-sm">
                      ★ {hotel.starRating}
                    </span>
                  ) : null}

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl font-bold leading-tight drop-shadow-sm">
                      {hotel.name}
                    </h3>
                    <p className="flex items-center gap-1 text-white/85 text-xs mt-1">
                      <MapPin size={12} />
                      {hotel.district ? `${hotel.district}, ` : ""}
                      {hotel.city}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  {hotel.description ? (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {hotel.description}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 italic leading-relaxed">
                      No description provided yet.
                    </p>
                  )}

                  {amenityPreview.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {amenityPreview.map((a) => (
                        <span
                          key={a}
                          className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md"
                        >
                          {a}
                        </span>
                      ))}
                      {(hotel.amenities?.length ?? 0) > 3 && (
                        <span className="text-[11px] font-medium text-slate-400 px-2 py-1">
                          +{(hotel.amenities?.length ?? 0) - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    {roomTypeCount > 0 ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <BedDouble size={14} />
                        {roomTypeCount} room {roomTypeCount === 1 ? "type" : "types"}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Details coming soon</span>
                    )}

                    {isApproved ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
                        View hotel <ArrowUpRight size={14} />
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-amber-600">
                        Awaiting verification
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return isApproved ? (
              <Link key={hotel.id} to={`/hotels/${hotel.id}`} className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={hotel.id} aria-disabled="true" title="Awaiting admin approval" className="h-full">
                {card}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedHotels;