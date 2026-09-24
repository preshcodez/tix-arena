import { useEvents } from "../../../contexts/EventContext";

const EventOverview = () => {
  const { selectedEvent } = useEvents();

  if (!selectedEvent) {
    return null;
  }

  return (
    <div className="text-manrope font-medium leading-[1.45] text-start w-full min-w-0">
      <p className="text-[22px] max-sm:text-[20px]">Overview</p>

      <p className="text-[18px] text-[#ABABAB] break-words max-sm:text-[15px]">
        {selectedEvent.description ||
          "No description available for this event."}
      </p>
    </div>
  );
};

export default EventOverview;
