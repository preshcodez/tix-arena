import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import api from "../../api/axios";

interface Ticket {
  _id: string;
  fullName: string;
  email: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  ticketStatus: "active" | "used" | "cancelled";
  ticketCode: string;
  qrCode: string;
  checkedIn: boolean;
  checkedInAt?: string;
  purchasedAt: string;

  event?: {
    _id: string;
    title: string;
    image?: string;
    location?: string;
    date?: string;
    time?: string;
    category?: string;
  };
}

const TicketsSection: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  const [removingTicketId, setRemovingTicketId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/tickets/my-tickets");

        setTickets(response.data?.data || []);
      } catch (err: any) {
        console.error("Failed to fetch tickets:", err);

        setError(
          err?.response?.data?.message || "Unable to load your tickets.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const formatPrice = (price: number) => {
    if (price === 0) {
      return "Free";
    }

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleViewTicket = (ticketId: string) => {
    setExpandedTicketId((current) => (current === ticketId ? null : ticketId));
  };

  const handleRemoveTicket = async (ticketId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this ticket from My Tickets?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setRemovingTicketId(ticketId);

      await api.patch(`/api/tickets/${ticketId}/hide`);

      setTickets((currentTickets) =>
        currentTickets.filter((ticket) => ticket._id !== ticketId),
      );

      if (expandedTicketId === ticketId) {
        setExpandedTicketId(null);
      }
    } catch (err: any) {
      console.error("Failed to remove ticket:", err);

      window.alert(
        err?.response?.data?.message ||
          "Unable to remove this ticket from My Tickets.",
      );
    } finally {
      setRemovingTicketId(null);
    }
  };

  const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
    const event = ticket.event;

    const isExpanded = expandedTicketId === ticket._id;

    const isRemoving = removingTicketId === ticket._id;

    return (
      <div
        style={{
          backgroundColor: "#0d0c1e",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #1e1e30",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* EVENT IMAGE */}
        <div
          style={{
            position: "relative",
          }}
        >
          {event?.image ? (
            <img
              src={event.image}
              alt={event.title || "Event"}
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: 160,
                background: "linear-gradient(135deg, #1a1230, #0d0c1e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7c3aed",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              TixArena
            </div>
          )}

          {/* CATEGORY */}
          {event?.category && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
              }}
            >
              <span
                style={{
                  backgroundColor: "#a855f733",
                  color: "#fff",
                  borderRadius: 6,
                  padding: "2px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {event.category}
              </span>
            </div>
          )}
        </div>

        {/* TICKET DETAILS */}
        <div
          style={{
            padding: "12px 14px 14px",
          }}
        >
          {/* DATE */}
          <p
            style={{
              fontSize: 11,
              color: "#6b7280",
              margin: "0 0 4px",
            }}
          >
            {formatDate(event?.date)}
            {event?.time ? ` · ${event.time}` : ""}
          </p>

          {/* EVENT TITLE */}
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 4px",
            }}
          >
            {event?.title || "Event"}
          </h3>

          {/* LOCATION */}
          <p
            style={{
              fontSize: 11,
              color: "#6b7280",
              margin: "0 0 12px",
            }}
          >
            📍 {event?.location || "Location unavailable"}
          </p>

          {/* PRICE + ACTIONS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 12,
            }}
          >
            {/* PRICE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "#4b5563",
                  margin: 0,
                }}
              >
                {ticket.ticketType}
              </p>

              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                }}
              >
                {formatPrice(ticket.totalAmount)}
              </p>
            </div>

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 10,
                flexShrink: 0,
              }}
            >
              {/* VIEW TICKET */}
              <button
                type="button"
                onClick={() => handleViewTicket(ticket._id)}
                className="cursor-pointer"
                style={{
                  background: "none",
                  border: "none",
                  color: "#7c3aed",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {isExpanded ? "Hide ticket ↑" : "View ticket ›"}
              </button>

              {/* REMOVE TICKET */}
              <button
                type="button"
                onClick={() => handleRemoveTicket(ticket._id)}
                disabled={isRemoving}
                title="Remove from My Tickets"
                aria-label="Remove ticket from My Tickets"
                className="cursor-pointer"
                style={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "1px solid #2a2438",
                  borderRadius: 8,
                  color: "#9ca3af",
                  opacity: isRemoving ? 0.5 : 1,
                  cursor: isRemoving ? "not-allowed" : "pointer",
                  flexShrink: 0,
                }}
              >
                <LuTrash2 size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* QR CODE / TICKET DETAILS */}
        {isExpanded && (
          <div
            style={{
              borderTop: "1px solid #1e1e30",
              padding: "18px 14px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                margin: "0 0 10px",
              }}
            >
              Your Ticket QR Code
            </p>

            {/* QR CODE */}
            {ticket.qrCode ? (
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 12,
                }}
              >
                <img
                  src={ticket.qrCode}
                  alt="Ticket QR Code"
                  style={{
                    width: 150,
                    height: 150,
                    display: "block",
                  }}
                />
              </div>
            ) : (
              <p
                style={{
                  color: "#6b7280",
                  fontSize: 12,
                }}
              >
                QR code unavailable
              </p>
            )}

            {/* TICKET CODE */}
            <p
              style={{
                color: "#6b7280",
                fontSize: 11,
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              Ticket Code
            </p>

            <p
              style={{
                color: "#a78bfa",
                fontSize: 12,
                fontWeight: 600,
                margin: "3px 0 0",
                letterSpacing: 1,
              }}
            >
              {ticket.ticketCode}
            </p>

            {/* CHECK-IN STATUS */}
            <span
              style={{
                marginTop: 10,
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 600,
                backgroundColor: ticket.checkedIn ? "#22c55e22" : "#a78bfa22",
                color: ticket.checkedIn ? "#4ade80" : "#a78bfa",
              }}
            >
              {ticket.checkedIn ? "Checked in" : "Not checked in"}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            margin: 0,
            color: "#fff",
          }}
        >
          My Tickets
        </h2>
      </div>

      {/* LOADING */}
      {loading && (
        <div
          style={{
            padding: "50px 20px",
            textAlign: "center",
            color: "#9ca3af",
          }}
        >
          Loading your tickets...
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div
          style={{
            padding: "30px 20px",
            textAlign: "center",
            color: "#f87171",
          }}
        >
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && tickets.length === 0 && (
        <div
          style={{
            padding: "50px 20px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          You haven't purchased any tickets yet.
        </div>
      )}

      {/* TICKETS */}
      {!loading && !error && tickets.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            mb-8
          "
        >
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsSection;
