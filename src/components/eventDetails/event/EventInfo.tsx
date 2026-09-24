import heart from "../../../assets/images/eventsImages/Heart.svg";
import share from "../../../assets/images/eventsImages/Share.svg";
import date from "../../../assets/images/eventsImages/date.svg";
import location from "../../../assets/images/eventsImages/location.svg";

import { useEvents } from "../../../contexts/EventContext";

const EventInfo = () => {
  const { selectedEvent } = useEvents();

  if (!selectedEvent) {
    return null;
  }

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* TITLE + ACTIONS */}
      <div className="flex text-start items-center justify-between gap-4 max-sm:items-start">
        <p
          className="
            text-[45px]
            font-instrument
            mb-[25px]
            min-w-0
            break-words
            max-sm:text-[30px]
            max-sm:leading-[1.15]
            max-sm:mb-4
          "
        >
          {selectedEvent.title}
        </p>

        <div className="flex gap-8 items-center shrink-0 max-sm:gap-4">
          <img src={share} alt="Share" className="max-sm:w-5 max-sm:h-5" />

          <img src={heart} alt="Like" className="max-sm:w-5 max-sm:h-5" />
        </div>
      </div>

      {/* LOCATION + DATE */}
      <div className="flex items-center justify-between gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-5">
        {/* LOCATION */}
        <div className="flex items-start gap-3.5 min-w-0 max-sm:w-full">
          <img src={location} alt="Location" className="shrink-0" />

          <div className="text-start min-w-0">
            <p className="font-medium text-[16px] text-manrope text-[#ABABAB]">
              Location
            </p>

            <p className="font-medium text-[18px] text-manrope break-words">
              {selectedEvent.location}
            </p>
          </div>
        </div>

        {/* DATE */}
        <div className="flex items-start gap-3.5 min-w-0 max-sm:w-full">
          <img src={date} alt="Date" className="shrink-0" />

          <div className="text-start min-w-0">
            <p className="font-medium text-[16px] text-manrope text-[#ABABAB]">
              Date
            </p>

            <p className="font-medium text-[17px] text-manrope break-words">
              {selectedEvent.date} • {selectedEvent.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
