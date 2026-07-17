const houses = [
  { name: 'Modern Lakeside Villa', location: 'Lake Como, Italy', price: 310, rating: 4.9 },
  { name: 'Cozy Countryside Cabin', location: 'Aspen, USA', price: 175, rating: 4.6 },
  { name: 'Minimalist City Loft', location: 'Tokyo, Japan', price: 130, rating: 4.8 },
];

const FeaturedHouses = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Houses</h2>
            <p className="text-gray-500 mt-2">Whole homes for a more private stay.</p>
          </div>
          <a href="/houses" className="text-blue-600 font-semibold text-sm hover:underline">View all →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <div key={house.name} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-600" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">{house.name}</h3>
                  <span className="text-sm font-semibold text-amber-500">★ {house.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{house.location}</p>
                <p className="text-sm text-gray-900">
                  <span className="font-bold text-lg">${house.price}</span> / night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHouses;