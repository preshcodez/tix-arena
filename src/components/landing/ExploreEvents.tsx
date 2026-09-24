import { useState } from "react";
import EventCard from "./EventCard";
import { useSearch } from "../../contexts/SearchContext";
import { useEvents } from "../../contexts/EventContext";

const ExploreEvents = () => {
  const { searchQuery } = useSearch();
  const { events, loading } = useEvents();

  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Entertainment",
    "Tech",
    "Corporate",
    "Sport",
    "Education",
    "Charity",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesCategory = true;

    if (activeCategory !== "All") {
      if (activeCategory === "Tech") {
        matchesCategory =
          event.category === "Tech" || event.category === "Technology";
      } else if (activeCategory === "Entertainment") {
        matchesCategory =
          event.category === "Entertainment" || event.category === "Music";
      } else if (activeCategory === "Sport") {
        matchesCategory =
          event.category === "Sport" || event.category === "Games";
      } else {
        matchesCategory = event.category === activeCategory;
      }
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-[1020px] border-0 mt-4">
        <h2 className="text-[36px] sm:text-[42px] md:text-[50px] font-Instrument Serif font-normal text-white text-left instrument-serif">
          Explore Events
        </h2>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-2">
          <div className="shrink-0">
            <p className="text-[#CECECE] text-[16px] font-inter font-normal leading-6 text-left max-w-[320px]">
              Browse events tailored to your interests, location, and vibe—all
              in one seamless experience.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap text-[#CECECE] text-[14px] sm:text-[16px] font-inter font-normal border rounded-full px-4 py-2 cursor-pointer transition ${
                    activeCategory === category
                      ? "bg-[#995DFF] border-[#995DFF] text-white"
                      : "border-[#1E1E1E] hover:bg-[#262525] hover:border-[#995DFF]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <p className="text-gray-400 mt-6">Loading events...</p>
          ) : filteredEvents.length === 0 ? (
            <p className="text-gray-400 mt-6">
              No events found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreEvents;
