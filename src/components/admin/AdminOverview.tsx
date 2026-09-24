import { useState } from "react";
import { LuHeart, LuLayoutGrid, LuUser } from "react-icons/lu";
import add from "../../assets/images/vendorImages/Add.svg";
import right from "../../assets/images/vendorImages/Arrow-Right.svg";
import arrowDown from "../../assets/images/vendorImages/arrow-down.svg";
import previous from "../../assets/images/vendorImages/previous.svg";
import next from "../../assets/images/vendorImages/next.svg";
import idris from "../../assets/images/vendorImages/idris.svg";
import eveimg from "../../assets/images/vendorImages/eventimg2.svg";
import EachEventList from "./EachEventList";
import type { EventDetails, EventSpeaker, EventTicket } from "./EachEventList";

interface Slice {
  label: string;
  color: string;
  value: number;
}

const EVENT_CATEGORIES: Slice[] = [
  { label: "Entertainment", color: "#8B5CF6", value: 6 },
  { label: "Tech", color: "#22C55E", value: 27 },
  { label: "Corporate", color: "#1E1B4B", value: 4 },
  { label: "Sport", color: "#22D3EE", value: 6 },
  { label: "Charity", color: "#EC4899", value: 29 },
  { label: "Education", color: "#F97316", value: 8 },
  { label: "Comedy", color: "#EF4444", value: 10 },
  { label: "Concert", color: "#FACC15", value: 10 },
];

const USER_RATIO: Slice[] = [
  { label: "Female", color: "#A78BFA", value: 60 },
  { label: "Male", color: "#4F46E5", value: 40 },
];

const buildConicGradient = (slices: Slice[]) => {
  let cumulative = 0;
  const stops = slices.map((slice) => {
    const start = cumulative;
    cumulative += slice.value;
    return `${slice.color} ${start}% ${cumulative}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
};

type EventStatus = "Pending" | "Approved" | "Rejected";

interface EventRow {
  id: number;
  name: string;
  createdBy: string;
  category: string;
  status: EventStatus;
  date: string;
  totalTicket: number;
  dateCreated: string;
}

const EVENT_ROWS: EventRow[] = [
  {
    id: 1,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Entertainment",
    status: "Pending",
    date: "12 July, 2024",
    totalTicket: 70,
    dateCreated: "12 July, 2026",
  },
  {
    id: 2,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Sport",
    status: "Pending",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
  {
    id: 3,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Entertainment",
    status: "Pending",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
  {
    id: 4,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Entertainment",
    status: "Pending",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
  {
    id: 5,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Concert",
    status: "Approved",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
  {
    id: 6,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Entertainment",
    status: "Approved",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
  {
    id: 7,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Charity",
    status: "Approved",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
  {
    id: 8,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Entertainment",
    status: "Rejected",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
  {
    id: 9,
    name: "The Social Escape",
    createdBy: "Ajibola Samuel",
    category: "Entertainment",
    status: "Rejected",
    date: "12 July, 2024",
    totalTicket: 76,
    dateCreated: "12 July, 2026",
  },
];

const STATUS_STYLES: Record<EventStatus, string> = {
  Pending: "bg-[#3B2F14] text-[#F5A623]",
  Approved: "bg-[#1F3B24] text-[#5FD787]",
  Rejected: "bg-[#3B1F1F] text-[#FF6B6B]",
};

const PAGE_NUMBERS = [1, 2, 3, "...", 9, 10];

const SHARED_OVERVIEW =
  "Learn how to safely find, download, and manage apps from the App Store and Google Play without unexpected charges. Join Senior Tech Connect for a free, one-hour webinar. What You'll Learn How to search for apps in the App Store and Google Play How to understand app categories and recommendations";
const SHARED_LOCATION = "34, Ejumbe Street, Ikorodu, Lagos State.";
const SHARED_DATETIME = "Friday, May 29 · 6PM - 7PM WAT";
const SHARED_SPEAKERS: EventSpeaker[] = [
  { name: "Idris Kampala", photo: idris, role: "Mark as Headliner" },
  { name: "Idris Kampala", photo: idris, role: "Speaker" },
  { name: "Idris Kampala", photo: idris, role: "Speaker" },
  { name: "Idris Kampala", photo: idris, role: "Speaker" },
  { name: "Idris Kampala", photo: idris, role: "Speaker" },
];

const buildTickets = (total: number): EventTicket[] => {
  const regular = Math.round(total * 0.6);
  return [
    { name: "Regular", quantity: regular },
    { name: "VIP", quantity: total - regular },
  ];
};

const toEventDetails = (row: EventRow): EventDetails => ({
  name: row.name,
  overview: SHARED_OVERVIEW,
  location: SHARED_LOCATION,
  dateTime: SHARED_DATETIME,
  image: eveimg,
  tickets: buildTickets(row.totalTicket),
  speakers: SHARED_SPEAKERS,
});

const AdminOverview = () => {
  const [eventRows, setEventRows] = useState<EventRow[]>(EVENT_ROWS);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const selectedRow = eventRows.find((row) => row.id === selectedRowId);

  const updateStatus = (status: EventStatus, reason?: string) => {
    if (selectedRowId === null) return;
    if (reason) {
      // TODO: send rejection reason to the API
      console.log("Rejection reason:", reason);
    }
    setEventRows((prev) =>
      prev.map((row) => (row.id === selectedRowId ? { ...row, status } : row)),
    );
    setSelectedRowId(null);
  };

  return (
    <div className="flex flex-col w-[78%] min-h-screen border-l border-[#262525] p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5 items-start">
          <h2 className="text-[23px] font-semibold text-white">My Event</h2>
          <div className="flex gap-2 items-center text-[14px] font-normal">
            <p className="text-[#CECECE]">Event</p>
            <span className="text-[#4B4B4B]">•</span>
            <p className="text-[#A485D9]">Overview</p>
          </div>
        </div>

        <button className="flex items-center gap-2.5 rounded-[30px] bg-white px-4.5 py-3.5">
          <img src={add} alt="" />
          <p className="text-[16px] font-normal text-[#0C0C0C]">
            Create New Event
          </p>
        </button>
      </div>

      {/* Ticket Overview banner */}
      <div className="flex flex-col gap-5 rounded-[30px] p-6 bg-gradient-to-br from-[#4C1D95] via-[#241040] to-[#0F0F0F] border border-[#262525]">
        <h3 className="text-[16px] font-medium text-white">Ticket Overview</h3>
        <div className="flex items-center">
          <div className="flex-1 flex items-center justify-between pr-6">
            <div className="flex flex-col gap-1 items-start">
              <p className="text-[#CECECE] text-[15px]">Total Event</p>
              <p className="text-[26px] font-semibold text-white">383,839</p>
            </div>
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <LuHeart className="text-white" size={18} />
            </span>
          </div>
          <div className="w-px self-stretch bg-white/15" />
          <div className="flex-1 flex items-center justify-between pl-6">
            <div className="flex flex-col gap-1 items-start">
              <p className="text-[#CECECE] text-[15px]">Total Vendor</p>
              <p className="text-[26px] font-semibold text-white">12,931</p>
            </div>
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <LuLayoutGrid className="text-white" size={18} />
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex gap-2.5 w-full">
        <div className="w-1/2 flex flex-col gap-5 bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[16px] font-medium">
            Most Created Event
          </h3>
          <div className="flex items-center gap-8">
            <div
              className="relative w-38 h-38 rounded-full shrink-0"
              style={{ background: buildConicGradient(EVENT_CATEGORIES) }}
            >
              <div className="absolute inset-[22%] rounded-full bg-[#0F0F0F]" />
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {EVENT_CATEGORIES.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 text-[14px] text-[#CECECE] whitespace-nowrap"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: c.color }}
                  />
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-5 bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[16px] font-medium">User Ratio</h3>
          <div className="flex items-center gap-8">
            <div
              className="w-38 h-38 rounded-full shrink-0"
              style={{ background: buildConicGradient(USER_RATIO) }}
            />
            <div className="flex flex-col gap-3">
              {USER_RATIO.map((u) => (
                <div
                  key={u.label}
                  className="flex items-center gap-2 text-[14px] text-[#CECECE]"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: u.color }}
                  />
                  {u.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Listing */}
      <div className="flex flex-col gap-3.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-[18px] font-medium text-[#FFFFFF]">
            Events Listing
          </h3>
          <div className="flex items-center gap-2.5 bg-[#262525] py-2 px-3.5 text-[#ECECEC] text-[16px] rounded-[30px] cursor-pointer">
            <p>All</p>
            <img src={arrowDown} alt="" />
          </div>
        </div>

        <div className="w-full overflow-x-auto scrollbar-none rounded-[20px] bg-[#0B0B0B]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#838383] text-[14px] font-normal">
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Event name
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Created by
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Category
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Date
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Total Ticket
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Date created
                </th>
                <th className="py-4 px-4 font-normal whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {eventRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-[#262525] text-[#ECECEC] text-[16px]"
                >
                  <td className="py-4 px-4 whitespace-nowrap">{row.name}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#262525] flex items-center justify-center shrink-0">
                        <LuUser className="text-[#ABABAB]" size={13} />
                      </span>
                      <span className="text-[#ABABAB]">{row.createdBy}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`text-[14px] font-medium px-3 py-1 rounded-[30px] ${STATUS_STYLES[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {row.totalTicket}
                  </td>
                  <td className="py-4 px-4 text-[#ABABAB] whitespace-nowrap">
                    {row.dateCreated}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedRowId(row.id)}
                      className="flex items-center gap-2   bg-[#0B0B0B] px-3 py-1.5"
                    >
                      <p className="text-[14px] font-normal text-[#CECECE]">
                        View
                      </p>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center pt-1">
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

      {selectedRow && (
        <EachEventList
          isOpen
          event={toEventDetails(selectedRow)}
          onClose={() => setSelectedRowId(null)}
          onApprove={() => updateStatus("Approved")}
          onReject={(reason) => updateStatus("Rejected", reason)}
        />
      )}
    </div>
  );
};

export default AdminOverview;
