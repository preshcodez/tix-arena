import { CiSearch } from "react-icons/ci";
import { FiSliders } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";

function Hero() {
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search-result?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="text-center py-8 sm:py-10 px-4">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-serif">
        Top Event Near You
      </h1>

      <div
        className="
          w-full
          max-w-2xl
          mx-auto
          mt-5
          sm:mt-6
          flex
          items-center
          bg-[#1a1a1a]
          rounded-full
          px-3
          sm:px-4
          py-2.5
          sm:py-3
        "
      >
        {/* Search */}
        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 cursor-pointer"
          aria-label="Search"
        >
          <CiSearch className="text-gray-400 text-lg sm:text-xl" />
        </button>

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="Search event"
          className="
            min-w-0
            flex-1
            bg-transparent
            text-white
            text-sm
            sm:text-base
            px-2
            sm:px-3
            outline-none
            placeholder-gray-400
          "
        />

        {/* Location */}
        <span
          className="
            shrink-0
            text-white
            text-xs
            sm:text-sm
            border-l
            border-gray-600
            pl-2
            sm:pl-3
          "
        >
          Lagos
        </span>

        {/* Filter */}
        <FiSliders className="text-gray-400 ml-2 shrink-0" size={15} />
      </div>
    </div>
  );
}

export default Hero;
