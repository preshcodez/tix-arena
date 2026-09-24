import { useState } from "react";
import { LuQrCode } from "react-icons/lu";
import searchIcon from "../../assets/images/search-01.svg";
import arrowDown from "../../assets/images/vendorImages/arrow-down.svg";
import previous from "../../assets/images/vendorImages/previous.svg";
import next from "../../assets/images/vendorImages/next.svg";
import nochechIn from "../../assets/images/vendorImages/Ticket-checkin.svg";
import api from "../../api/axios";

interface CheckInEntry {
  id: number;
  name: string;
  email: string;
  ticketId: string;
  ticketType: string;
  quantity: number;
  checkInTime: string;
  checkedIn: boolean;
}

const inputBase =
  "w-full bg-[#161616] text-[#ABABAB] text-[15px] rounded-full border border-[#262525] pl-11 pr-4 py-3.5 placeholder:text-[#6E6E6E] outline-none focus:border-[#995DFF] transition-colors";

const PAGE_NUMBERS = [1, 2, 3, "...", 9, 10];

const CheckInAttendants = () => {
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
 const [checkIns, setCheckIns] = useState<CheckInEntry[]>([]);

  const filtered = checkIns.filter((entry) =>
    entry.name.toLowerCase().includes(search.toLowerCase()),
  );

 const handleCheckIn = async () => {
   if (!code.trim()) {
     return;
   }

   try {
     const response = await api.post("/api/tickets/check-in", {
       ticketCode: code.trim(),
     });

     const ticket = response.data.data;

     const newEntry: CheckInEntry = {
       id: Date.now(),
       name: ticket.fullName,
       email: ticket.email,
       ticketId: ticket.ticketCode,
       ticketType: ticket.ticketType,
       quantity: ticket.quantity,
       checkInTime: ticket.checkedInAt
         ? new Date(ticket.checkedInAt).toLocaleString()
         : "-",
       checkedIn: ticket.checkedIn,
     };

     setCheckIns((prev) => [newEntry, ...prev]);

     setCode("");

     console.log("Check-in successful:", ticket);
   } catch (error: any) {
     console.error(
       "Check-in failed:",
       error.response?.data?.message || error.message,
     );
   }
 };

  return (
    <div className="flex flex-col w-[78%] min-h-screen border-l border-[#262525] p-6 gap-6">
      <div className="flex flex-col gap-0.5 items-start">
        <h2 className="text-[23px] font-semibold text-white">My Event</h2>
        <div className="flex gap-2 items-center text-[14px] font-normal">
          <p className="text-[#CECECE]">Event</p>
          <span className="text-[#4B4B4B]">•</span>
          <p className="text-[#CECECE]">Overview</p>
          <span className="text-[#4B4B4B]">•</span>
          <p className="text-[#CECECE]">The Social Escape</p>
          <span className="text-[#4B4B4B]">•</span>
          <p className="text-[#A485D9]">Check-in Attendants</p>
        </div>
      </div>

      {/* CONNECT CAMERA */}
      <div className="flex flex-col items-center gap-5 max-w-md w-full mx-auto py-8">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h3 className="text-[22px] font-semibold text-white">
            Connect External Camera or Use Mobile
          </h3>
          <p className="text-[14px] text-[#ABABAB] max-w-sm">
            For better scan experience on PC,{" "}
            <span className="text-[#A485D9] cursor-pointer hover:underline">
              connect external camera
            </span>{" "}
            or use a mobile device
          </p>
        </div>

        <div className="flex items-center gap-3 w-full">
          <span className="flex-1 h-px bg-[#262525]" />
          <span className="text-[#6E6E6E] text-[14px]">or</span>
          <span className="flex-1 h-px bg-[#262525]" />
        </div>

        <div className="relative w-full flex items-center">
          <span className="absolute left-4">
            <LuQrCode size={18} className="text-[#ABABAB]" />
          </span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code here"
            className={inputBase}
          />
        </div>

        <button
          type="button"
          onClick={handleCheckIn}
          className="w-full bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[16px] font-medium py-3.5 rounded-full transition-colors"
        >
          Check-in
        </button>
      </div>

      {/* ATTENDEE MANAGEMENT */}
      <div className="flex flex-col gap-3.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-[18px] font-medium text-[#FFFFFF]">
            Attendee Management
          </h3>
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center">
              <img
                src={searchIcon}
                alt=""
                className="absolute left-3.5 w-4.5"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-[#262525] text-[#ECECEC] text-[14px] rounded-[30px] pl-9.5 pr-4 py-2.5 outline-none placeholder:text-[#838383] w-40"
              />
            </div>
            <div className="flex items-center gap-2.5 bg-[#262525] py-2 px-3.5 text-[#ECECEC] text-[16px] rounded-[30px] cursor-pointer">
              <p>All</p>
              <img src={arrowDown} alt="" />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-[20px] bg-[#0B0B0B]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#838383] text-[14px] font-normal">
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Name
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Email
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Ticket ID
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Ticket Type
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Quantity
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Check-in Time
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Check-in Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-t border-[#262525] text-[#ECECEC] text-[16px]"
                >
                  <td className="py-4 px-4 whitespace-nowrap">{entry.name}</td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {entry.email}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {entry.ticketId}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {entry.ticketType}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {entry.quantity}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {entry.checkInTime}
                  </td>
                  <td className="py-4 px-4">
                    {entry.checkedIn ? (
                      <span className="bg-[#1F3B24] text-[#5FD787] text-[14px] font-medium px-4 py-1.5 rounded-[30px]">
                        Checked In
                      </span>
                    ) : (
                      <span className="bg-[#1A1A1A] text-[#838383] text-[14px] font-medium px-6 py-1.5 rounded-[30px]">
                        ---
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <img src={nochechIn} alt="" />
              <p className="text-white text-[18px] font-semibold">
                No Check-in
              </p>
              <p className="text-[#838383] text-[14px] text-center max-w-xs">
                You haven't check-in any users yet, when you do you will find
                them here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-normal text-[#ECECEC]">
          9 Entries per page
        </p>
        <div className="flex gap-7.5 items-center">
          <div className="bg-[#262525] flex gap-2.5 px-3 py-2.25 rounded-[60px] cursor-pointer">
            <img src={previous} alt="" />
            <p className="text-[#ECECEC] text-[16px] font-normal">Previous</p>
          </div>
          <div className="flex gap-2.5">
            {PAGE_NUMBERS.map((n, i) => (
              <p
                key={i}
                className={`bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC] cursor-pointer ${
                  n === 1 ? "border border-[#995DFF]" : ""
                }`}
              >
                {n}
              </p>
            ))}
          </div>
          <div className="bg-[#262525] text-[#ECECEC] flex gap-2.5 px-3 py-2.25 rounded-[60px] cursor-pointer">
            <p>Next</p>
            <img src={next} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInAttendants;
