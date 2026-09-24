import ScrollToTopButton from "../components/ScrollToTopButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import arrowLeft from "../assets/images/eventsImages/arrow-down-01.svg";

import EventHero from "../components/eventDetails/event/EventHero";
import TicketWidget from "../components/eventDetails/event/TicketWidget";
import EventInfo from "../components/eventDetails/event/EventInfo";
import EventOverview from "../components/eventDetails/event/EventOverview";
import LineupSection from "../components/eventDetails/event/LineupSection";
import SimilarEvents from "../components/eventDetails/event/SimilarEvents";
import CheckoutModal from "../components/eventDetails/modals/CheckoutModal";
import SuccessModal from "../components/eventDetails/modals/SuccessModal";
import Footer from "../components/explore/Footer";

import api from "../api/axios";
import { useEvents, type Event } from "../contexts/EventContext";

const EventDetailPage = () => {
  const { id } = useParams();

  const { selectedEvent, setSelectedEvent } = useEvents();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [ticketCount, setTicketCount] = useState(1);

  const [selectedTicketType, setSelectedTicketType] = useState("");

  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError("Event ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/api/events/${id}`);

        const rawEvent = response.data.data;

        let tickets = [];

        if (
          Array.isArray(rawEvent?.ticketTypes) &&
          rawEvent.ticketTypes.length > 0
        ) {
          tickets = rawEvent.ticketTypes.map((ticket: any) => ({
            name: ticket.name || "Ticket",
            price: Number(ticket.price) || 0,
            totalQuantity: Number(ticket.quantity) || 0,
            quantity: Math.max(
              0,
              Number(ticket.quantity || 0) - Number(ticket.quantitySold || 0),
            ),
            ticketSold: Number(ticket.quantitySold) || 0,
          }));
        } else if (
          Array.isArray(rawEvent?.tickets) &&
          rawEvent.tickets.length > 0
        ) {
          tickets = rawEvent.tickets.map((ticket: any) => ({
            name: ticket.name || "Ticket",
            price: Number(ticket.price) || Number(ticket.quantity) || 0,
            totalQuantity:
              Number(ticket.totalQuantity) || Number(ticket.quantity) || 0,
            quantity: Number(ticket.quantity) || 0,
            ticketSold: Number(ticket.ticketSold) || 0,
          }));
        }

        let speakers = [];

        if (Array.isArray(rawEvent?.speakers) && rawEvent.speakers.length > 0) {
          speakers = rawEvent.speakers;
        } else if (
          Array.isArray(rawEvent?.lineup) &&
          rawEvent.lineup.length > 0
        ) {
          speakers = rawEvent.lineup.map((speaker: any) => ({
            name: speaker.name || "",
            photo: speaker.photo || speaker.avatar || null,
            isHeadliner: speaker.isHeadliner || speaker.role === "Headliner",
          }));
        }

        const event: Event = {
          ...rawEvent,
          price: Number(rawEvent?.price) || 0,
          tickets,
          speakers,
          attendees: Array.isArray(rawEvent?.attendees)
            ? rawEvent.attendees
            : [],
          tags: Array.isArray(rawEvent?.tags) ? rawEvent.tags : [],
        };

        console.log("RAW EVENT:", rawEvent);
        console.log("NORMALIZED EVENT TICKETS:", event.tickets);

        setSelectedEvent(event);

        const firstAvailableTicket = event.tickets.find(
          (ticket) => ticket.quantity > 0,
        );

        if (firstAvailableTicket) {
          setSelectedTicketType(firstAvailableTicket.name);
        } else {
          setSelectedTicketType("");
        }

        setTicketCount(1);
      } catch (error) {
        console.error("Failed to fetch event:", error);

        setError("Unable to load this event.");

        setSelectedEvent(null);
        setSelectedTicketType("");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, setSelectedEvent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  if (error || !selectedEvent) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <p className="text-gray-400">{error || "Event not found."}</p>
      </div>
    );
  }

  const handleRegister = (ticketType: string) => {
    setSelectedTicketType(ticketType);
    setShowCheckout(true);
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen overflow-x-hidden">
      <div
        className="
          mx-auto
          flex
          flex-col
          gap-12.5
          px-25
          max-lg:px-6
          max-sm:px-4
        "
      >
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 py-4 text-sm overflow-hidden">
          <span className="text-gray-400 shrink-0">Events</span>

          <img src={arrowLeft} alt="" className="w-3 h-3 shrink-0" />

          <span className="text-white truncate">{selectedEvent.title}</span>
        </div>

        {/* HERO + TICKET */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_340px]
            gap-8
            w-full
          "
        >
          {/* HERO */}
          <div className="w-full min-w-0">
            <EventHero />
          </div>

          {/* TICKET */}
          <div className="w-full min-w-0">
            <TicketWidget
              ticketCount={ticketCount}
              setTicketCount={setTicketCount}
              onRegister={handleRegister}
            />
          </div>
        </div>

        {/* EVENT INFO + OVERVIEW */}
        <div
          className="
            space-y-8
            w-[53%]
            h-[331px]
            mb-[50px]

            max-lg:w-full
            max-lg:h-auto
            max-lg:mb-8
          "
        >
          <EventInfo />

          <EventOverview />
        </div>

        {/* LINEUP */}
        <div className="space-y-8 py-8 w-full">
          <LineupSection />
        </div>
      </div>

      {/* SIMILAR EVENTS */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <SimilarEvents />
      </div>
      {/* FOOTER */}
      <div className="w-full mt-16">
        <Footer />
      </div>
      <ScrollToTopButton />

      {/* CHECKOUT */}
      {showCheckout && (
        <CheckoutModal
          isOpen={showCheckout}
          ticketCount={ticketCount}
          ticketType={selectedTicketType}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            setShowSuccess(true);
          }}
        />
      )}

      {/* SUCCESS */}
      {showSuccess && (
        <SuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
