import { Link } from "react-router-dom";
import type { Event } from "../../contexts/EventContext";

interface EventCardProps extends Event {
  _id: string;
}

const EventCard = ({
  _id,
  image,
  date,
  time,
  title,
  location,
  price,
  category,
}: EventCardProps) => {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shrink-0 mx-auto">
      {/* EVENT IMAGE */}
      <img
        src={image ?? undefined}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* DARK GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      {/* CATEGORY */}
      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        {category}
      </span>

      {/* EVENT INFORMATION */}
      <div className="absolute bottom-24 left-4 right-4">
        <p className="text-gray-200 text-xs">
          {date} · {time}
        </p>

        <h3 className="text-white font-semibold text-lg mt-1">{title}</h3>

        <p className="text-gray-300 text-xs mt-1">{location}</p>
      </div>

      {/* BOTTOM SECTION */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 border-t border-white/10">
        <div>
          <p className="text-gray-300 text-xs">From</p>

          <p className="text-white font-normal text-sm">
            ₦{Number(price ?? 0).toLocaleString()}
          </p>
        </div>

        {/* REAL EVENT DETAILS */}
        <Link
          to={`/event/${_id}`}
          className="text-[#995DFF] text-sm hover:text-white transition-colors"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
