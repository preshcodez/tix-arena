import arrowDown from "../../assets/images/vendorImages/arrow-down.svg";
import { attendeeList } from "../../data/attendeeList";

const AttendeeManagement = () => {
  return (
    <div className="flex flex-col gap-2.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-[18px] font-medium text-[#FFFFFF]">
          Attendee Management
        </h3>
        <div className="flex items-center gap-2.5 bg-[#262525] py-2 px-3.5 text-[#ECECEC] text-[16px] rounded-[30px] cursor-pointer">
          <p>All</p>
          <img src={arrowDown} alt="" />
        </div>
      </div>

      <div className="w-full  rounded-[20px] bg-[#0B0B0B]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[#838383] text-[14px] font-normal">
              <th className="py-4 px-4 font-normal whitespace-nowrap">Name</th>
              <th className="py-4 px-4 font-normal whitespace-nowrap">Email</th>
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
                Reg. date
              </th>
              <th className="py-4 px-4 font-normal whitespace-nowrap">
                Check-in Status
              </th>
            </tr>
          </thead>
          <tbody>
            {attendeeList.map((attendee) => (
              <tr
                key={attendee.id}
                className="border-t border-[#262525] text-[#ECECEC] text-[16px]"
              >
                <td className="py-4 px-4 whitespace-nowrap">
                  {attendee.name}
                </td>
                <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                  {attendee.email}
                </td>
                <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                  {attendee.ticketId}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {attendee.ticketType}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {attendee.quantity}
                </td>
                <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                  {attendee.regDate}
                </td>
                <td className=" py-4 px-4">
                  {attendee.checkedIn ? (
                    <span className=" bg-[#1F3B24] text-[#5FD787] text-[14px] font-medium px-1 py-1.5 rounded-[30px]">
                      Checked In
                    </span>
                  ) : (
                    <span className=" bg-[#1A1A1A] text-[#838383] text-[14px] font-medium px-6 py-1.5 rounded-[30px]">
                      ---
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendeeManagement;
