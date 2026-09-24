import AttendeeManagement from "./AttendeeManagement";
import TicketsOverview from "./TicketsOverview";
import previous from "../../assets/images/vendorImages/previous.svg";
import next from "../../assets/images/vendorImages/next.svg";

const EachEvent = () => {
  return (
    <div className="flex flex-col w-[78%]  border-l border-[#262525] p-6 gap-6">
      <div className="flex flex-col gap-0.5 items-start">
        <h2 className="text-[23px] font-semibold text-white">My Events</h2>

        <div className="flex gap-2">
          <p className="text-[16px] font-normal text-[#CECECE]">Event</p>
          <p className="text-[16px] font-normal text-[#CECECE]">Overview</p>
          <p className="text-[16px] font-normal text-[#A485D9]">
            The Social Escape
          </p>
        </div>
      </div>
      {/* TICKET OVERVIEW */}
      <TicketsOverview />

      <AttendeeManagement />

      {/* ================= Page Navigation Buttons ================== */}
      <div className="flex justify-between items-center ">
        <p className="text-[16px] font-normal text-[#ECECEC] ">
          10 Entries per page{" "}
        </p>
        <div className="flex gap-7.5 items-center ">
          <div className="bg-[#262525] flex gap-2.5 px-3 py-2.25 rounded-[60px] ">
            <img src={previous} alt="" />
            <p className="text-[#ECECEC] text-[16px] font-normal  ">Previous</p>
          </div>
          <div className="flex gap-2.5 ">
            <p className="bg-[#262525] px-3 py-2.25 border border-[#995DFF] rounded-[60px] text-[16px] font-semibold text-[#ECECEC] ">
              1
            </p>
            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC] ">
              2
            </p>
            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC] ">
              3
            </p>
            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC] ">
              ...
            </p>
            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC] ">
              9
            </p>
            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC] ">
              10
            </p>
          </div>
          <div className="bg-[#262525] text-[#ECECEC] flex gap-2.5 px-3 py-2.25 rounded-[60px] ">
            <p>Next</p>
            <img src={next} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachEvent;
