import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEvents } from "../../contexts/EventContext";

interface EventListProps {
  events?: any[];
}

const EventList = ({ events: searchedEvents }: EventListProps) => {
  const {
    filteredEvents,
    selectedCategory,
    selectedDate,
    selectedHappening,
    clearFilters,
  } = useEvents();

  const [currentPage, setCurrentPage] = useState(1);

  // Use searched events if they are passed from Event page.
  // Otherwise use filtered events directly.
  const eventsToDisplay = searchedEvents ?? filteredEvents;

  // EVENTS PER PAGE
  const eventsPerPage = 5;

  // TOTAL PAGES
  const totalPages = Math.ceil(
    eventsToDisplay.length / eventsPerPage
  );

  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedDate,
    selectedHappening,
    eventsToDisplay.length,
  ]);

  // GET EVENTS FOR CURRENT PAGE
  const startIndex =
    (currentPage - 1) * eventsPerPage;

  const endIndex =
    startIndex + eventsPerPage;

  const currentEvents =
    eventsToDisplay.slice(startIndex, endIndex);

  const hasFilters =
    selectedCategory !== "All" ||
    selectedDate !== "" ||
    selectedHappening !== "";

  // NEXT PAGE
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  // PREVIOUS PAGE
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  // PAGE BUTTONS
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-3.75">

      {/* FILTER HEADING */}
      <div className="flex items-center justify-between">

        {/* SELECTED FILTERS */}
        <div className="flex items-center gap-2.5 flex-wrap">

          {/* CATEGORY */}
          {selectedCategory !== "All" && (
            <div className="flex items-center px-3 py-2 rounded-[60px] gap-2 border border-[#2D2D2D] text-[#ABABAB]">
              <p className="capitalize">
                {selectedCategory}
              </p>

              <button
                type="button"
                onClick={() => {
                  clearFilters();
                }}
                className="cursor-pointer text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* DATE */}
          {selectedDate !== "" && (
            <div className="flex items-center px-3 py-2 rounded-[60px] gap-2 border border-[#2D2D2D] text-[#ABABAB]">
              <p>{selectedDate}</p>

              <button
                type="button"
                onClick={() => {
                  clearFilters();
                }}
                className="cursor-pointer text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* HAPPENING */}
          {selectedHappening !== "" && (
            <div className="flex items-center px-3 py-2 rounded-[60px] gap-2 border border-[#2D2D2D] text-[#ABABAB]">
              <p>
                {selectedHappening}
              </p>

              <button
                type="button"
                onClick={() => {
                  clearFilters();
                }}
                className="cursor-pointer text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* CLEAR FILTER */}
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                clearFilters();
                setCurrentPage(1);
              }}
              className="text-[#838383] hover:text-white cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* RESULTS */}
        {/* <div>
          <span className="text-[#838383]">
            Results: {eventsToDisplay.length}
          </span>
        </div> */}
      </div>

      {/* EVENTS */}
      {currentEvents.length > 0 ? (
        <div className="flex flex-col gap-3.75">

          {currentEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
            />
          ))}

        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-[#838383]">
            No events found.
          </p>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-8 text-white">

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#262525] ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#333] cursor-pointer"
            }`}
          >
            <MdOutlineKeyboardArrowLeft />

            <span>
              Previous
            </span>
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex items-center gap-2">

            {getPageNumbers().map(
              (page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="px-2 text-[#838383]"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      setCurrentPage(page as number)
                    }
                    className={`px-4 py-3 rounded-full font-semibold ${
                      currentPage === page
                        ? "bg-[#262525] text-white border-2 border-[#995DFF]"
                        : "bg-[#262525] text-[#ECECEC] hover:bg-[#333]"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
            )}

          </div>

          {/* NEXT */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#262525] ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#333] cursor-pointer"
            }`}
          >
            <span>
              Next
            </span>

            <MdKeyboardArrowRight />
          </button>

        </div>
      )}
    </div>
  );
};

export default EventList;