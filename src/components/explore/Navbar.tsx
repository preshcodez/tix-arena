import { useState } from "react";

import fotlogo from "../assets/images/fotlogo.png";
import sideicon from "../assets/images/sideicon.png";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) return;

    window.location.href = `/search-result?search=${encodeURIComponent(query)}`;
  };

  return (
    <nav className="relative bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* LEFT GROUP */}
      <div className="flex items-center gap-6">
        <div className="flex gap-6 text-sm whitespace-nowrap">
          <p>Explore</p>
          <p>Cinema</p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-full">
          <div>🔍</div>

          <input
            type="text"
            placeholder="Search event"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            className="bg-transparent text-white text-sm outline-none placeholder-gray-400 w-32"
          />

          <div className="text-sm border-l border-gray-600 pl-2 whitespace-nowrap">
            Lagos
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="text-sm"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* CENTER: LOGO */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <img
          src={fotlogo}
          alt="Tix Arena logo"
          className="w-6 h-6"
        />
      </div>

      {/* RIGHT GROUP */}
      <div className="flex items-center gap-3">
        <button className="bg-[#1a1a1a] p-2 rounded-full">
          <img
            src={sideicon}
            alt="Menu"
            className="w-5 h-5"
          />
        </button>

        <button className="bg-[#1a1a1a] text-white text-sm px-4 py-2 rounded-full whitespace-nowrap">
          Switch to Creator
        </button>

        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
      </div>
    </nav>
  );
}

export default Navbar;