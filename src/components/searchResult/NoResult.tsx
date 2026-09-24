import ticketImage from "../../assets/images/searchResult/Ticket.svg";
import { useEvents } from "../../contexts/EventContext";

const NoResult = () => {
  const {
    selectedCategory,
    selectedDate,
    selectedHappening,
    clearFilters,
    setSelectedCategory,
    setSelectedDate,
    setSelectedHappening,
  } = useEvents();

  return (
    <div>
      {/* =========================
          FILTER HEADING
      ========================= */}

      <div className="flex items-center justify-between mb-5">
        {/* SELECTED FILTERS */}

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* CATEGORY */}

          {selectedCategory !== "All" && (
            <div className="flex items-center px-3 py-2 rounded-[60px] gap-2 border border-[#2D2D2D] text-[#ABABAB]">
              <p className="capitalize">{selectedCategory}</p>

              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="cursor-pointer hover:text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* DATE */}

          {selectedDate !== "" && (
            <div className="flex items-center px-3 py-2 rounded-[60px] gap-2 border border-[#2D2D2D] text-[#ABABAB]">
              <p>{selectedDate}</p>

              <button
                type="button"
                onClick={() => setSelectedDate("")}
                className="cursor-pointer hover:text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* HAPPENING */}

          {selectedHappening !== "" && (
            <div className="flex items-center px-3 py-2 rounded-[60px] gap-2 border border-[#2D2D2D] text-[#ABABAB]">
              <p>{selectedHappening}</p>

              <button
                type="button"
                onClick={() => setSelectedHappening("")}
                className="cursor-pointer hover:text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* CLEAR FILTER */}

          {(selectedCategory !== "All" ||
            selectedDate !== "" ||
            selectedHappening !== "") && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[#838383] hover:text-white cursor-pointer ml-2"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* RESULTS */}

        <span className="text-[#838383]">Results: 0</span>
      </div>

      {/* =========================
          NO RESULT
      ========================= */}

      <div className="flex flex-col justify-between items-center text-center gap-4 border border-[#262525] rounded-[30px] mb-17.5">
        <div className="max-w-sm mx-auto py-25">
          <img src={ticketImage} alt="No result" className="max-w-sm mx-auto" />

          <h1 className="text-[45px] text-white">No Result Found</h1>

          <p className="text-[#CECECE]">
            Complete the final steps to get your personalized account up and
            running.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResult;
