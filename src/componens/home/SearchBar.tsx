const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const IconBuilding = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="1" />
  </svg>
);

const SearchBar = () => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-5 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] font-semibold tracking-wide text-gray-500 uppercase mb-1.5">
            Destination
          </label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-700">
            <IconLocation />
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full outline-none text-sm bg-transparent placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold tracking-wide text-gray-500 uppercase mb-1.5">
              Check In
            </label>
            <input
              type="date"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold tracking-wide text-gray-500 uppercase mb-1.5">
              Check Out
            </label>
            <input
              type="date"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] font-semibold tracking-wide text-gray-500 uppercase mb-1.5">
            Guests
          </label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-700">
            <IconUsers />
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold tracking-wide text-gray-500 uppercase mb-1.5">
            Property Type
          </label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-700">
            <IconBuilding />
            <select defaultValue="any" className="w-full outline-none text-sm bg-transparent">
              <option value="any">Any</option>
              <option value="hotel">Hotel</option>
              <option value="house">House</option>
              <option value="room">Room</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search Properties
      </button>
    </div>
  );
};

export default SearchBar;