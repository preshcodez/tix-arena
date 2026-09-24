import { useEffect, useState } from "react";
import type React from "react";
import arrowDown from "../../../assets/images/eventsImages/Alt Arrow Down.svg";
import { useEvents } from "../../../contexts/EventContext";

interface TicketWidgetProps {
  ticketCount: number;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
  onRegister: (ticketType: string) => void;
}

const TicketWidget = ({
  ticketCount,
  setTicketCount,
  onRegister,
}: TicketWidgetProps) => {
  const { selectedEvent } = useEvents();

  const tickets = selectedEvent?.tickets || [];

  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
  const [showTickets, setShowTickets] = useState(false);

  /*
   * Find the first ticket that still has available quantity.
   */
  const firstAvailableIndex = tickets.findIndex(
    (ticket) => ticket.quantity > 0,
  );

  /*
   * Make sure the selected ticket is always available.
   */
  useEffect(() => {
    if (tickets.length === 0) {
      setSelectedTicketIndex(0);
      setTicketCount(1);
      return;
    }

    const currentTicket = tickets[selectedTicketIndex];

    if (!currentTicket || currentTicket.quantity <= 0) {
      if (firstAvailableIndex !== -1) {
        setSelectedTicketIndex(firstAvailableIndex);
        setTicketCount(1);
      }
    }
  }, [tickets, selectedTicketIndex, firstAvailableIndex, setTicketCount]);

  const selectedTicket = tickets[selectedTicketIndex];

  const ticketPrice = selectedTicket?.price ?? 0;

  const totalPrice = ticketPrice * ticketCount;

  const noTicketsAvailable =
    tickets.length === 0 || tickets.every((ticket) => ticket.quantity <= 0);

  const formatPrice = (price: number) => {
    if (price === 0) {
      return "Free";
    }

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleTicketSelect = (index: number) => {
    const ticket = tickets[index];

    if (!ticket || ticket.quantity <= 0) {
      return;
    }

    setSelectedTicketIndex(index);
    setTicketCount(1);
    setShowTickets(false);
  };

  const handleIncrease = () => {
    if (!selectedTicket) {
      return;
    }

    if (ticketCount < selectedTicket.quantity) {
      setTicketCount((count) => count + 1);
    }
  };

  const handleDecrease = () => {
    setTicketCount((count) => Math.max(1, count - 1));
  };

  const handleRegister = () => {
    if (!selectedTicket) {
      return;
    }

    if (selectedTicket.quantity <= 0) {
      return;
    }

    if (ticketCount > selectedTicket.quantity) {
      return;
    }

    onRegister(selectedTicket.name);
  };

  return (
    <div className="bg-[#0B0B0B] w-full max-w-[446] min-h-[491p rounded-2xl p-6 border border-[#262525]">
      {/* TITLE */}
      <p className="text-manrope font-medium text-[22px] border-b border-[#262525] pb-[20px]">
        Ticket
      </p>

      {/* TICKET TYPE SELECTOR */}
      <div className="relative mt-[18px]">
        <button
          type="button"
          onClick={() => setShowTickets((prev) => !prev)}
          disabled={noTicketsAvailable}
          className="flex items-center justify-between w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[30px] px-6 py-4 text-white disabled:opacity-50"
        >
          <span>
            {noTicketsAvailable
              ? "No ticket available"
              : `Ticket Type (${selectedTicket?.name || "Ticket"})`}
          </span>

          <img
            src={arrowDown}
            alt="Arrow Down"
            className={`transition-transform ${
              showTickets ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* TICKET OPTIONS */}
        {showTickets && !noTicketsAvailable && (
          <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-[#161616] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-xl">
            {tickets.map((ticket, index) => {
              const soldOut = ticket.quantity <= 0;

              return (
                <button
                  key={`${ticket.name}-${index}`}
                  type="button"
                  onClick={() => handleTicketSelect(index)}
                  disabled={soldOut}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#222222] transition-colors ${
                    selectedTicketIndex === index ? "bg-[#222222]" : ""
                  } ${soldOut ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <div>
                    <p className="text-white font-medium">{ticket.name}</p>

                    <p className="text-gray-400 text-sm">
                      {formatPrice(ticket.price)}
                    </p>
                  </div>

                  <span className="text-gray-500 text-sm">
                    {soldOut ? "Sold out" : `${ticket.quantity} left`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* SELECTED TICKET */}
      <div className="w-full min-h-[92px] flex justify-between items-center mb-4">
        <div>
          <p className="text-white font-medium">
            {selectedTicket?.name || "Ticket"}
          </p>

          <p className="text-gray-400 text-sm">{formatPrice(ticketPrice)}</p>
        </div>

        {/* QUANTITY */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={
              !selectedTicket ||
              selectedTicket.quantity <= 0 ||
              ticketCount <= 1
            }
            className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white cursor-pointer disabled:opacity-40"
          >
            −
          </button>

          <span className="text-white min-w-[20px] text-center">
            {ticketCount}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={
              !selectedTicket ||
              selectedTicket.quantity <= 0 ||
              ticketCount >= selectedTicket.quantity
            }
            className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white cursor-pointer disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="w-full min-h-[202px] bg-[#161616] rounded-[30px] p-[16px]">
        {/* TICKETS */}
        <div className="flex items-center justify-between w-full h-[48px] text-gray-400 border-b border-[#262525]">
          <span>
            {ticketCount} ticket
            {ticketCount > 1 ? "s" : ""}
          </span>

          <span>{formatPrice(totalPrice)}</span>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-white w-full h-[28px] font-medium mt-[20px]">
          <span>Total</span>

          <span>{formatPrice(totalPrice)}</span>
        </div>

        {/* REGISTER */}
        <div className="mx-auto">
          <button
            type="button"
            onClick={handleRegister}
            disabled={
              noTicketsAvailable ||
              !selectedTicket ||
              selectedTicket.quantity <= 0 ||
              ticketCount > selectedTicket.quantity
            }
            className="w-full h-[55px] bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-[17px] py-[14px] rounded-[30px] font-medium transition-colors mt-[15px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {noTicketsAvailable ? "Sold Out" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketWidget;
