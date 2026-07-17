const hotels = [
  { name: 'Ocean Breeze Resort', location: 'Malé, Maldives', price: 189, rating: 4.9 },
  { name: 'Skyline Grand Hotel', location: 'Dubai, UAE', price: 145, rating: 4.7 },
  { name: 'The Alpine Lodge', location: 'Zermatt, Switzerland', price: 220, rating: 4.8 },
];

const FeaturedHotels = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Featured Hotels</h2>
          <p className="text-gray-500 mt-2">Handpicked stays our guests love most.</p>
        </div>
        <a href="/hotels" className="text-blue-600 font-semibold text-sm hover:underline">View all →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.name} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600" />
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-slate-900">{hotel.name}</h3>
                <span className="text-sm font-semibold text-amber-500">★ {hotel.rating}</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{hotel.location}</p>
              <p className="text-sm text-gray-900">
                <span className="font-bold text-lg">${hotel.price}</span> / night
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedHotels;