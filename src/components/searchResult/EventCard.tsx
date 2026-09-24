import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import type { Event } from "../../contexts/EventContext";
import { useEvents } from "../../contexts/EventContext";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  const { setSelectedEvent } = useEvents();

  const handleEventClick = () => {
    setSelectedEvent(event);
    navigate(`/event/${event._id}`);
  };

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(event.price);

  return (
    <div
      onClick={handleEventClick}
      className="
        w-full
        min-w-0
        flex
        flex-col
        md:flex-row
        md:items-start
        md:justify-between
        bg-[#121212]
        border
        border-[#2A2A2A]
        rounded-[22px]
        md:rounded-[28px]
        overflow-hidden
        p-3
        sm:p-4
        md:p-6
        text-white
        cursor-pointer
        hover:border-[#995DFF]
        transition
      "
    >
      {/* EVENT IMAGE */}
      <div
        className="
          w-full
          h-[180px]
          sm:h-[220px]
          md:w-[240px]
          md:h-[180px]
          shrink-0
        "
      >
        <img
          src={event.image || "/placeholder-event.png"}
          alt={event.title}
          className="
            w-full
            h-full
            object-cover
            rounded-[16px]
            md:rounded-[20px]
          "
        />
      </div>

      {/* EVENT INFORMATION */}
      <div
        className="
          w-full
          md:flex-1
          flex
          flex-col
          items-start
          ml-0
          md:ml-7
          mt-4
          md:mt-0
          min-w-0
        "
      >
        {/* TITLE */}
        <h1
          className="
            w-full
            text-[23px]
            font-semibold
            leading-tight
            line-clamp-2
            text-left
          "
        >
          {event.title}
        </h1>

        {/* DATE + TIME */}
        <div
          className="
            flex
            items-center
            gap-3
            md:gap-6
            mt-3
            md:mt-5
            text-[#CECECE]
            text-[13px]
            sm:text-[14px]
            md:text-base
          "
        >
          <span>
            {new Date(event.date).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

          <div className="w-px h-4 md:h-5 bg-[#555]" />

          <span>{event.time}</span>
        </div>

        {/* PRICE */}
        <h3
          className="
            text-[20px]
            sm:text-[22px]
            md:text-[23px]
            font-semibold
            mt-4
            md:mt-6
          "
        >
          {formattedPrice}
        </h3>

        {/* LOCATION */}
        <div
          className="
            max-w-full
            flex
            items-center
            gap-2
            bg-[#262525]
            px-3
            py-2.5
            rounded-[60px]
            mt-4
            md:mt-5
          "
        >
          <FaLocationDot
            className="
              text-[#995DFF]
              shrink-0
            "
          />

          <p
            className="
              text-[#ECECEC]
              text-[12px]
              sm:text-[13px]
              md:text-base
              truncate
            "
          >
            {event.location}
          </p>
        </div>
      </div>

      {/* CATEGORY */}
      <div
        className="
          self-start
          mt-3
          md:mt-0
          md:ml-4
          bg-[#262525]
          px-3
          md:px-4
          py-2
          md:py-2.5
          text-[#ECECEC]
          rounded-[60px]
          shrink-0
        "
      >
        <p
          className="
            capitalize
            whitespace-nowrap
            text-[11px]
            sm:text-[12px]
            md:text-base
          "
        >
          {event.category}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
