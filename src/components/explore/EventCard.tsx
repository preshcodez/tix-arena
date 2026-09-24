import { FaLocationDot } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../contexts/EventContext";

type Ticket = {
  name: string;
  price: number;
  totalQuantity: number;
  quantity: number;
  ticketSold: number;
};

type EventCardProps = {
  _id: string;
  image?: string | null;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  tickets?: Ticket[];
};

function EventCard({
  _id,
  image,
  title,
  date,
  time,
  location: venue,
  price,
  category,
  tickets = [],
}: EventCardProps) {
  const navigate = useNavigate();
  const { events, setSelectedEvent } = useEvents();

  const ticketPrices = tickets
    .map((ticket) => ticket.price)
    .filter((ticketPrice) => ticketPrice > 0);

  const lowestTicketPrice =
    ticketPrices.length > 0 ? Math.min(...ticketPrices) : 0;

  const displayPrice = price > 0 ? price : lowestTicketPrice;

  const formattedPrice =
    displayPrice === 0
      ? "Free"
      : new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0,
        }).format(displayPrice);

  const handleViewDetails = () => {
    const selected = events.find((event) => event._id === _id);

    if (!selected) {
      console.error("Event not found:", _id);
      return;
    }

    setSelectedEvent(selected);
    navigate(`/event/${_id}`);
  };

  return (
    <div
      className="
        w-full
        min-w-0
        bg-[#111111]
        border
        border-[#262525]
        rounded-[22px]
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={image || "/placeholder-event.jpg"}
          alt={title}
          className="
            w-full
            h-[145px]
            sm:h-[180px]
            md:h-[190px]
            lg:h-[180px]
            object-cover
          "
        />

        <span
          className="
            absolute
            top-3
            left-3
            bg-[#262626]
            text-white
            text-[9px]
            sm:text-[10px]
            px-2.5
            sm:px-3
            py-1
            rounded-full
            whitespace-nowrap
            max-w-[80%]
            truncate
          "
        >
          {category}
        </span>
      </div>

      {/* EVENT INFO */}
      <div className="px-3 sm:px-4 py-3">
        <p className="text-[#8E8E8E] text-[9px] sm:text-[10px] mb-2 truncate">
          {date} • {time}
        </p>

        <h3
          className="
            text-white
            text-[14px]
            sm:text-[18px]
            font-semibold
            mb-3
            line-clamp-2
            min-h-[38px]
            sm:min-h-[44px]
            leading-tight
          "
        >
          {title}
        </h3>

        {/* LOCATION */}
        <div
          className="
            inline-flex
            max-w-full
            items-center
            gap-1.5
            sm:gap-2
            bg-[#242424]
            rounded-full
            px-2.5
            sm:px-3
            py-2
          "
        >
          <FaLocationDot className="text-[#995DFF] w-3 h-3 shrink-0" />

          <span
            className="
              text-[9px]
              sm:text-[11px]
              text-[#D1D1D1]
              truncate
            "
          >
            {venue}
          </span>
        </div>
      </div>

      {/* PRICE + DETAILS */}
      <div
        className="
          border-t
          border-[#2A2A2A]
          px-3
          sm:px-4
          py-3
          flex
          justify-between
          items-end
          gap-2
        "
      >
        {/* PRICE */}
        <div className="min-w-0">
          <p className="text-[#8A8A8A] text-[9px] sm:text-[10px]">From</p>

          <p
            className="
              text-white
              text-[16px]
              sm:text-[24px]
              font-bold
              truncate
            "
          >
            {formattedPrice}
          </p>
        </div>

        {/* VIEW DETAILS */}
        <button
          type="button"
          onClick={handleViewDetails}
          className="
            flex
            items-center
            gap-1
            text-[#8B5CF6]
            text-[8px]
            sm:text-[11px]
            font-medium
            whitespace-nowrap
            shrink-0
            cursor-pointer
          "
        >
          View details
          <LuArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

export default EventCard;
