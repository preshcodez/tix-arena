import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEvents } from "../../contexts/EventContext";

const TopEvent = () => {
  const { events, loading } = useEvents();

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const topEvents = events.slice(0, 6);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const visibleCards = isMobile ? 1 : 3;

  const maxIndex = Math.max(0, topEvents.length - visibleCards);

  const nextSlide = () => {
    if (current < maxIndex) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [current, maxIndex]);

  return (
    <div className="flex justify-center mt-7 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="w-full max-w-[1020px]">
        {/* HEADER */}
        <div className="mb-7">
          <h2 className="text-[40px] sm:text-[50px] md:text-[60px] text-start text-[#FFFFFF] font-Instrument Serif font-normal instrument-serif">
            Top Event
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="text-[#CECECE] text-[16px] font-inter font-normal text-left max-w-[450px]">
              Discover the hottest events people are talking about and secure
              your spot before tickets sell out.
            </p>

            <Link
              to="/explore"
              className="bg-[#995DFF] text-[#FFFFFF] rounded-full px-8 sm:px-10 py-2 w-fit"
            >
              Explore More
            </Link>
          </div>
        </div>

        {/* EVENTS */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#838383]">Loading events...</p>
          </div>
        ) : topEvents.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#838383]">No events available.</p>
          </div>
        ) : (
          <>
            <div className="w-full overflow-hidden">
              <div
                className="grid transition-transform duration-500 ease-in-out"
                style={{
                  gridTemplateColumns: isMobile
                    ? `repeat(${topEvents.length}, 100%)`
                    : `repeat(${topEvents.length}, calc((100% - 32px) / 3))`,
                  gap: "16px",
                  transform: isMobile
                    ? `translateX(calc(-${current} * (100% + 16px)))`
                    : `translateX(calc(-${current} * (((100% - 32px) / 3) + 16px)))`,
                }}
              >
                {topEvents.map((event) => (
                  <div key={event._id} className="w-full min-w-0">
                    <EventCard {...event} />
                  </div>
                ))}
              </div>
            </div>

            {/* ARROWS */}
            {topEvents.length > visibleCards && (
              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={prevSlide}
                  disabled={current === 0}
                  className={`w-10 h-10 rounded-full bg-[#262525] flex items-center justify-center ${
                    current === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-[#333] cursor-pointer text-white"
                  }`}
                >
                  <MdOutlineKeyboardArrowLeft size={22} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  disabled={current >= maxIndex}
                  className={`w-10 h-10 rounded-full bg-[#262525] flex items-center justify-center ${
                    current >= maxIndex
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-[#333] cursor-pointer text-white"
                  }`}
                >
                  <MdKeyboardArrowRight size={22} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopEvent;
