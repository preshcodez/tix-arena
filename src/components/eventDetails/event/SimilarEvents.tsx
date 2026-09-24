import locationIcon from "../../../assets/images/eventsImages/location-06.svg";
import { useEvents } from "../../../contexts/EventContext";

const SimilarEvents = () => {
  const { events, selectedEvent } = useEvents();

  if (!selectedEvent) {
    return null;
  }

  // Remove the event currently being viewed
  const otherEvents = events.filter((event) => event._id !== selectedEvent._id);

  // First try to find events from the same category
  const sameCategoryEvents = otherEvents.filter(
    (event) =>
      event.category?.toLowerCase() === selectedEvent.category?.toLowerCase(),
  );

  // If there are not enough same-category events,
  // fill the remaining spaces with other real events.
  const similarEvents = [
    ...sameCategoryEvents,
    ...otherEvents.filter(
      (event) =>
        !sameCategoryEvents.some(
          (similarEvent) => similarEvent._id === event._id,
        ),
    ),
  ].slice(0, 6);

  if (similarEvents.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    if (price === 0) {
      return "Free";
    }

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4 w-full min-w-0">
      <h2 className="text-white text-xl font-semibold">Similar Events</h2>

      {/* Carousel wrapper */}
      <div className="overflow-hidden w-full">
        {/* Moving track */}
        <div className="flex animate-marquee">
          {/* First set */}
          {similarEvents.map((event) => (
            <div
              key={event._id}
              className="
                min-w-[280px]
                mr-4
                bg-[#0C0C0C]
                rounded-[30px]
                overflow-hidden
                border
                border-[#2A2A2A]
                flex-shrink-0

                max-sm:min-w-[250px]
                max-sm:mr-3
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={event.image || "/placeholder-event.jpg"}
                  alt={event.title}
                  className="
                    w-full
                    h-48
                    object-cover
                    bg-[#2A2A2A]

                    max-sm:h-40
                  "
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* CATEGORY */}
                <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                  {event.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                {/* DATE */}
                <p className="text-gray-400 text-xs">
                  {formatDate(event.date)} • {event.time}
                </p>

                {/* TITLE */}
                <p className="text-white font-semibold truncate">
                  {event.title}
                </p>

                {/* LOCATION */}
                <div className="flex items-center gap-1 min-w-0">
                  <img src={locationIcon} alt="" className="w-3 h-3 shrink-0" />

                  <p className="text-gray-400 text-xs truncate">
                    {event.location}
                  </p>
                </div>

                {/* PRICE + DETAILS */}
                <div className="flex justify-between items-center pt-2 gap-2">
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs">From</p>

                    <p className="text-white font-bold truncate">
                      {formatPrice(event.price)}
                    </p>
                  </div>

                  <span className="text-[#995DFF] text-sm cursor-pointer whitespace-nowrap">
                    View details ›
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless marquee */}
          {similarEvents.map((event) => (
            <div
              key={`duplicate-${event._id}`}
              className="
                min-w-[280px]
                mr-4
                bg-[#0C0C0C]
                rounded-[30px]
                overflow-hidden
                border
                border-[#2A2A2A]
                flex-shrink-0

                max-sm:min-w-[250px]
                max-sm:mr-3
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={event.image || "/placeholder-event.jpg"}
                  alt={event.title}
                  className="
                    w-full
                    h-48
                    object-cover
                    bg-[#2A2A2A]

                    max-sm:h-40
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                  {event.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <p className="text-gray-400 text-xs">
                  {formatDate(event.date)} • {event.time}
                </p>

                <p className="text-white font-semibold truncate">
                  {event.title}
                </p>

                <div className="flex items-center gap-1 min-w-0">
                  <img src={locationIcon} alt="" className="w-3 h-3 shrink-0" />

                  <p className="text-gray-400 text-xs truncate">
                    {event.location}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 gap-2">
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs">From</p>

                    <p className="text-white font-bold truncate">
                      {formatPrice(event.price)}
                    </p>
                  </div>

                  <span className="text-[#995DFF] text-sm cursor-pointer whitespace-nowrap">
                    View details ›
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarEvents;
