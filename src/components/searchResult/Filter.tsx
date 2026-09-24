import { useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { filters } from "../../data/filters";
import { useEvents } from "../../contexts/EventContext";

interface FilterProps {
  onClearMobileFilter?: () => void;
}

const Filter = ({ onClearMobileFilter }: FilterProps) => {
  const {
    selectedCategory,
    setSelectedCategory,

    selectedDate,
    setSelectedDate,

    selectedHappening,
    setSelectedHappening,

    clearFilters,
  } = useEvents();

  const [pickedDate, setPickedDate] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleClearFilters = () => {
    clearFilters();
    setPickedDate("");

    // Close the mobile filter and bring back
    // the Filter button with the icon
    onClearMobileFilter?.();
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;

    setPickedDate(date);
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] text-[#ECECEC] font-normal">Filter</h1>

        <button
          type="button"
          onClick={handleClearFilters}
          className="text-[16px] text-[#995DFF] cursor-pointer"
        >
          Clear filter
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {filters
          .filter((filter) => filter.title !== "Format")
          .map((filter) => (
            <div
              key={filter.id}
              className="rounded-3xl border border-[#2D2D2D] p-6"
            >
              <h3 className="pb-3.5 text-[20px] text-[#ECECEC]">
                {filter.title}
              </h3>

              {/* CATEGORY */}
              {filter.title === "Category" && (
                <div className="grid grid-cols-[1fr_2fr] gap-4">
                  {filter.options.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setSelectedCategory(option)}
                      className={`
                        rounded-[20px]
                        border
                        py-2.5
                        text-[14px]
                        font-medium
                        transition
                        cursor-pointer

                        ${
                          selectedCategory === option
                            ? "border-[#995DFF] text-white"
                            : "border-[#2E2E2E] text-white hover:border-[#995DFF]"
                        }

                        ${option === "All" ? "w-12 rounded-full" : ""}
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* DATE */}
              {filter.title === "Date" && (
                <div className="flex flex-col gap-4">
                  {filter.options.map((option) => {
                    /* PICK DATE */
                    if (option === "Pick Date") {
                      return (
                        <div key={option} className="relative">
                          <button
                            type="button"
                            onClick={openDatePicker}
                            className={`
                              w-full
                              flex
                              cursor-pointer
                              items-center
                              justify-between
                              rounded-[20px]
                              border
                              px-4
                              py-3
                              transition

                              ${
                                pickedDate
                                  ? "border-[#995DFF]"
                                  : "border-[#2E2E2E]"
                              }

                              hover:border-[#995DFF]
                            `}
                          >
                            <span className="text-[16px] text-[#ECECEC]">
                              {pickedDate || "Pick Date"}
                            </span>

                            <CiCalendar size={22} className="text-[#ECECEC]" />
                          </button>

                          {/* HIDDEN DATE INPUT */}
                          <input
                            ref={dateInputRef}
                            type="date"
                            value={pickedDate}
                            onChange={handleDateChange}
                            className="
                              absolute
                              w-0
                              h-0
                              opacity-0
                              pointer-events-none
                            "
                            tabIndex={-1}
                          />
                        </div>
                      );
                    }

                    /* TODAY / TOMORROW / THIS WEEKEND */
                    return (
                      <label
                        key={option}
                        className={`
                          flex
                          cursor-pointer
                          items-center
                          justify-between
                          rounded-[20px]
                          border
                          px-4
                          py-3
                          transition

                          ${
                            selectedDate === option
                              ? "border-[#995DFF]"
                              : "border-[#2E2E2E]"
                          }

                          hover:border-[#995DFF]
                        `}
                      >
                        <span className="text-[16px] text-[#ECECEC]">
                          {option}
                        </span>

                        <input
                          type="checkbox"
                          checked={selectedDate === option}
                          onChange={() => {
                            if (selectedDate === option) {
                              setSelectedDate("");
                            } else {
                              setSelectedDate(option);
                              setPickedDate("");
                            }
                          }}
                          className="accent-[#995DFF]"
                        />
                      </label>
                    );
                  })}
                </div>
              )}

              {/* HAPPENING */}
              {filter.title === "Happening?" && (
                <div className="flex flex-col gap-5">
                  {filter.options.map((option) => (
                    <label
                      key={option}
                      className={`
                        flex
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-[20px]
                        border
                        px-4
                        py-3
                        transition

                        ${
                          selectedHappening === option
                            ? "border-[#995DFF]"
                            : "border-[#2E2E2E]"
                        }

                        hover:border-[#995DFF]
                      `}
                    >
                      <span className="text-[#ECECEC]">{option}</span>

                      <input
                        type="radio"
                        name="happening"
                        checked={selectedHappening === option}
                        onChange={() => setSelectedHappening(option)}
                        className="accent-[#995DFF]"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
