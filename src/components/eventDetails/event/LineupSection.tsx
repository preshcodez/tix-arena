import { useEvents } from "../../../contexts/EventContext";

const LineupSection = () => {
  const { selectedEvent } = useEvents();

  if (!selectedEvent) {
    return null;
  }

  if (!selectedEvent.speakers || selectedEvent.speakers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 w-full min-w-0">
      <h2 className="text-white text-xl font-semibold">Lineup</h2>

      <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {selectedEvent.speakers.map((speaker, index) => (
          <div
            key={`${speaker.name}-${index}`}
            className="
              flex
              items-center
              gap-3
              bg-[#0C0C0C]
              border
              border-[#262525]
              rounded-[30px]
              p-3
              min-w-0
            "
          >
            <img
              src={speaker.photo || "/placeholder-event.jpg"}
              alt={speaker.name}
              className="w-10 h-10 rounded-full object-cover bg-gray-600 shrink-0"
            />

            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {speaker.name}
              </p>

              {speaker.isHeadliner && (
                <p className="text-gray-400 text-xs">Headliner</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineupSection;
