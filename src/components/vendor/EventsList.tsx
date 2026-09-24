import { useEffect, useMemo, useState } from "react";
import add from "../../assets/images/vendorImages/Add.svg";
import right from "../../assets/images/vendorImages/Arrow-Right.svg";
import dots from "../../assets/images/vendorImages/dots.svg";
import previous from "../../assets/images/vendorImages/previous.svg";
import next from "../../assets/images/vendorImages/next.svg";
import store from "../../assets/images/vendorImages/store.svg";
import tic1 from "../../assets/images/vendorImages/ticket-02.svg";
import tic2 from "../../assets/images/vendorImages/Ticket-01.svg";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

interface Ticket {
  name: string;
  price: number;
  totalQuantity: number;
  quantity: number;
  ticketSold: number;
}

interface VendorEvent {
  _id: string;
  title: string;
  image: string | null;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
  tickets: Ticket[];
}

const EventsList = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<VendorEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendorEvents = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await api.get("/api/events/vendor/me");

        if (response.data?.success) {
          setEvents(response.data.data || []);
        } else {
          setError(response.data?.message || "Unable to load your events.");
        }
      } catch (error: any) {
        console.error("Fetch Vendor Events Error:", error);

        setError(
          error?.response?.data?.message ||
            "Something went wrong while loading your events.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorEvents();
  }, []);

  const eventStats = useMemo(() => {
    return events.map((event) => {
      const totalTickets = (event.tickets || []).reduce(
        (total, ticket) => total + Number(ticket.totalQuantity || 0),
        0,
      );

      const soldTickets = (event.tickets || []).reduce(
        (total, ticket) => total + Number(ticket.ticketSold || 0),
        0,
      );

      const remainingTickets = Math.max(totalTickets - soldTickets, 0);

      return {
        ...event,
        totalTickets,
        soldTickets,
        remainingTickets,
      };
    });
  }, [events]);

  const formatCreatedDate = (date: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleMenuToggle = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setOpenMenu((current) => (current === eventId ? null : eventId));
  };

  const handleView = (eventId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();

    setOpenMenu(null);

    navigate(`/event-details/${eventId}`);
  };

  const handleEdit = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setOpenMenu(null);

    navigate(`/event-details/${eventId}/edit`);
  };

  const handleCloseEvent = async (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await api.patch(`/api/events/${eventId}/close`);

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event._id === eventId
            ? {
                ...event,
                isActive: false,
              }
            : event,
        ),
      );

      setOpenMenu(null);
    } catch (error: any) {
      console.error("Close Event Error:", error);

      setError(error?.response?.data?.message || "Unable to close this event.");
    }
  };

  const handleDelete = async (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!shouldDelete) return;

    try {
      await api.delete(`/api/events/${eventId}`);

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event._id !== eventId),
      );

      setOpenMenu(null);
    } catch (error: any) {
      console.error("Delete Event Error:", error);

      setError(
        error?.response?.data?.message || "Unable to delete this event.",
      );
    }
  };

  return (
    <div className="flex flex-col w-[78%] h-screen border-l border-[#262525] p-6 gap-6">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5 items-start">
          <h2 className="text-[23px] font-semibold text-white">My Events</h2>

          <div className="flex gap-2">
            <p className="text-[16px] font-normal text-[#CECECE]">Event</p>

            <p className="text-[16px] font-normal text-[#A485D9]">Overview</p>
          </div>
        </div>

        <Link
          to="/create-event"
          className="flex items-center gap-2.5 rounded-[30px] bg-white px-4.5 py-3.5"
        >
          <img src={add} alt="Add event" />

          <p className="text-[16px] font-normal text-[#0C0C0C]">
            Create New Event
          </p>
        </Link>
      </div>

      {/* ================= Scrollable Event List ================= */}
      <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
        <div className="flex flex-col gap-5">
          {isLoading && (
            <div className="bg-[#262525] w-full rounded-[25px] p-6">
              <p className="text-[#ABABAB] text-[15px]">
                Loading your events...
              </p>
            </div>
          )}

          {!isLoading && error && (
            <div className="bg-[#211311] border border-[#FF7466] w-full rounded-[25px] p-6">
              <p className="text-[#FF7466] text-[15px]">{error}</p>
            </div>
          )}

          {!isLoading && !error && eventStats.length === 0 && (
            <div className="bg-[#262525] w-full rounded-[25px] p-6">
              <p className="text-white text-[18px] font-semibold">
                No events yet
              </p>

              <p className="text-[#838383] text-[14px] mt-1">
                Create your first event to see it here.
              </p>
            </div>
          )}

          {!isLoading &&
            !error &&
            eventStats.map((event) => (
              <div
                key={event._id}
                className="bg-[#262525] w-full rounded-[25px] p-3.5 flex flex-col gap-2.5"
              >
                {/* ================= Card Header ================= */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-11 w-11 rounded-[5px] border border-[#262525] object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-[5px] border border-[#262525] bg-[#0B0B0B] shrink-0" />
                    )}

                    <div className="flex flex-col gap-0.5 items-start min-w-0">
                      <p className="text-[20px] font-semibold text-white truncate max-w-full">
                        {event.title}
                      </p>

                      <p className="text-[14px] font-medium text-white">
                        <span className="font-normal text-[#838383]">
                          Created:{" "}
                        </span>

                        {formatCreatedDate(event.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* ================= Actions ================= */}
                  <div className="relative flex items-center gap-3 shrink-0">
                    {/* 3 DOTS */}
                    <button
                      type="button"
                      onClick={(e) => handleMenuToggle(event._id, e)}
                      className="h-8 w-8 rounded-full border border-[#262525] bg-[#0B0B0B] p-1.5 cursor-pointer flex items-center justify-center"
                      aria-label="More options"
                    >
                      <img
                        src={dots}
                        alt="More options"
                        className="h-full w-full"
                      />
                    </button>

                    {/* DROPDOWN */}
                    {openMenu === event._id && (
                      <div
                        className="absolute right-0 top-10 z-50 w-[160px] rounded-[15px] border border-[#3A3A3A] bg-[#0B0B0B] p-2 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleView(event._id, e)}
                          className="w-full rounded-[10px] px-3 py-2.5 text-left text-[14px] text-[#CECECE] hover:bg-[#262525]"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleEdit(event._id, e)}
                          className="w-full rounded-[10px] px-3 py-2.5 text-left text-[14px] text-[#CECECE] hover:bg-[#262525]"
                        >
                          Edit
                        </button>

                        {event.isActive && (
                          <button
                            type="button"
                            onClick={(e) => handleCloseEvent(event._id, e)}
                            className="w-full rounded-[10px] px-3 py-2.5 text-left text-[14px] text-[#CECECE] hover:bg-[#262525]"
                          >
                            Close Event
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handleDelete(event._id, e)}
                          className="w-full rounded-[10px] px-3 py-2.5 text-left text-[14px] text-[#FF7466] hover:bg-[#262525]"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {/* VIEW */}
                    <button
                      type="button"
                      onClick={() => handleView(event._id)}
                      className="flex items-center gap-2.5 rounded-full border border-[#262525] bg-[#0B0B0B] px-3.5 py-1.5"
                    >
                      <p className="text-[16px] font-normal text-[#CECECE]">
                        View
                      </p>

                      <img src={right} alt="View event" />
                    </button>
                  </div>
                </div>

                {/* ================= Ticket Summary ================= */}
                <div className="flex gap-2.5">
                  <div className="flex w-1/3 items-center justify-between rounded-[20px] border border-[#141414] bg-[#0B0B0B] px-6 py-7">
                    <div className="flex flex-col items-start">
                      <p className="text-[16px] font-normal text-[#CECECE]">
                        Total Tickets Created
                      </p>

                      <p className="text-[23px] font-semibold text-white">
                        {event.totalTickets}
                      </p>
                    </div>

                    <img src={store} alt="" />
                  </div>

                  <div className="flex w-1/3 items-center justify-between rounded-[20px] border border-[#141414] bg-[#0B0B0B] px-6 py-7">
                    <div className="flex flex-col items-start">
                      <p className="text-[16px] font-normal text-[#CECECE]">
                        Tickets Sold
                      </p>

                      <p className="text-[23px] font-semibold text-white">
                        {event.soldTickets}
                      </p>
                    </div>

                    <img src={tic1} alt="" />
                  </div>

                  <div className="flex w-1/3 items-center justify-between rounded-[20px] border border-[#141414] bg-[#0B0B0B] px-6 py-7">
                    <div className="flex flex-col items-start">
                      <p className="text-[16px] font-normal text-[#CECECE]">
                        Tickets Remaining
                      </p>

                      <p className="text-[23px] font-semibold text-white">
                        {event.remainingTickets}
                      </p>
                    </div>

                    <img src={tic2} alt="" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ================= Page Navigation Buttons ================== */}
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-normal text-[#ECECEC]">
          10 Entries per page
        </p>

        <div className="flex gap-7.5 items-center">
          <div className="bg-[#262525] flex gap-2.5 px-3 py-2.25 rounded-[60px]">
            <img src={previous} alt="" />

            <p className="text-[#ECECEC] text-[16px] font-normal">Previous</p>
          </div>

          <div className="flex gap-2.5">
            <p className="bg-[#262525] px-3 py-2.25 border border-[#995DFF] rounded-[60px] text-[16px] font-semibold text-[#ECECEC]">
              1
            </p>

            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC]">
              2
            </p>

            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC]">
              3
            </p>

            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC]">
              ...
            </p>

            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC]">
              9
            </p>

            <p className="bg-[#262525] px-3 py-2.25 rounded-[60px] text-[16px] font-semibold text-[#ECECEC]">
              10
            </p>
          </div>

          <div className="bg-[#262525] text-[#ECECEC] flex gap-2.5 px-3 py-2.25 rounded-[60px]">
            <p>Next</p>

            <img src={next} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
