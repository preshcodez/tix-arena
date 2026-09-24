import ScrollToTopButton from "../components/ScrollToTopButton";
import { useState } from "react";
import { FiSliders } from "react-icons/fi";

import { useEvents } from "../contexts/EventContext";
import Filter from "../components/searchResult/Filter";
import EventList from "../components/searchResult/EventList";
import NoResult from "../components/searchResult/NoResult";

const Event = () => {
  const { filteredEvents, loading, error } = useEvents();

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <div className="w-full min-w-0 px-4 sm:px-6 lg:px-25 pt-8 sm:pt-10 lg:pt-12.5 pb-20 lg:pb-25">
      {/* SEARCH RESULT CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-7.5 w-full min-w-0">
        {/* DESKTOP FILTER */}
        <div className="hidden lg:block min-w-0">
          <Filter />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full min-w-0">
          {/* MOBILE FILTER BUTTON */}
          {!showMobileFilter && (
            <div className="lg:hidden w-full mb-5">
              <button
                type="button"
                onClick={() => setShowMobileFilter(true)}
                className="
                  w-full
                  h-[52px]
                  flex
                  items-center
                  pl-6
                  gap-2
                  rounded-[14px]
                  border
                  border-[#2D2D2D]
                  bg-[#121212]
                  text-white
                  text-[16px]
                  font-medium
                  cursor-pointer
                "
              >
                <FiSliders size={18} className="text-[#995DFF]" />

                <span>Filter</span>
              </button>
            </div>
          )}

          {/* MOBILE FILTER CONTENT */}
          {showMobileFilter && (
            <div className="lg:hidden w-full mb-6 text-left">
              <Filter
                onClearMobileFilter={() => {
                  setShowMobileFilter(false);
                }}
              />
            </div>
          )}

          {/* RESULTS COUNT */}
          <div className="flex justify-end mb-4">
            <span className="text-[#838383] text-[16px]">
              Results: {filteredEvents.length}
            </span>
          </div>

          {/* EVENTS */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-[#838383]">Loading events...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-red-400">{error}</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <EventList events={filteredEvents} />
          ) : (
            <NoResult />
          )}
        </div>
      </div>

      

      {/* SCROLL TO TOP */}
      <ScrollToTopButton />
    </div>
  );
};

export default Event;
