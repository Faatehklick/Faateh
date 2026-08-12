import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-stretch bg-white rounded-xl shadow-2xl p-1.5 sm:p-2 max-w-xl"
    >
      <div className="flex items-center gap-2 flex-1 px-3 sm:px-4 min-w-0">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Destination, city or hotel name"
          className="w-full min-w-0 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent py-2.5"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 sm:px-7 rounded-lg transition-colors"
      >
        Search stays
      </button>
    </form>
  );
};

export default SearchBar;