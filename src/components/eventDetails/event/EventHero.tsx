import { useEvents } from "../../../contexts/EventContext";

const EventHero = () => {
  const { selectedEvent } = useEvents();

  if (!selectedEvent) {
    return <div className="w-full text-gray-400">Event not found.</div>;
  }

  return (
    <div className="w-full">
      <img
        src={selectedEvent.image || "/placeholder-event.jpg"}
        alt={selectedEvent.title}
        className="
          w-full
          rounded-[20px]
          object-cover
          max-sm:aspect-[16/10]
          max-sm:h-auto
        "
      />
    </div>
  );
};

export default EventHero;
