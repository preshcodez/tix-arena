import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../api/axios";

export interface Ticket {
  name: string;
  price: number;
  totalQuantity: number;
  quantity: number;
  ticketSold: number;
}

export interface CreateTicket {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateSpeaker {
  id: number;
  name: string;
  photo: string | null;
  isHeadliner: boolean;
}

export interface CreateEventData {
  name: string;
  overview: string;
  location: string;
  date: Date | null;
  time: string;
  category: string;
  subCategory: string;
  format: "Physical";
  image: string | null;
  imageFile: File | null;
}

export interface Event {
  _id: string;
  title: string;
  image?: string | null;
  description?: string;
  location: string;
  date: string;
  time: string;
  category: string;
  subCategory?: string;
  format?: string;
  price: number;
  tags: string[];
  tickets: Ticket[];
  speakers: {
    name: string;
    photo?: string | null;
    isHeadliner: boolean;
  }[];
  attendees: string[];
  isActive: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  happening?: string;
}

interface EventContextType {
  events: Event[];
  filteredEvents: Event[];

  selectedEvent: Event | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;

  loading: boolean;
  error: string;

  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;

  selectedHappening: string;
  setSelectedHappening: React.Dispatch<React.SetStateAction<string>>;

  clearFilters: () => void;

  createEventData: CreateEventData;
  setCreateEventData: React.Dispatch<React.SetStateAction<CreateEventData>>;

  createTickets: CreateTicket[];
  setCreateTickets: React.Dispatch<React.SetStateAction<CreateTicket[]>>;

  createSpeakers: CreateSpeaker[];
  setCreateSpeakers: React.Dispatch<React.SetStateAction<CreateSpeaker[]>>;

  resetCreateEvent: () => void;
}

interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedHappening, setSelectedHappening] = useState("");

  /*
   * CREATE EVENT STATE
   */

  const [createEventData, setCreateEventData] = useState<CreateEventData>({
    name: "",
    overview: "",
    location: "",
    date: null,
    time: "",
    category: "",
    subCategory: "",
    format: "Physical",
    image: null,
    imageFile: null,
  });

  const [createTickets, setCreateTickets] = useState<CreateTicket[]>([]);

  const [createSpeakers, setCreateSpeakers] = useState<CreateSpeaker[]>([]);

  /*
   * FETCH EVENTS
   */

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/events");

        const fetchedEvents = response.data?.events ?? [];

        setEvents(fetchedEvents);
      } catch (err: any) {
        console.error("Fetch Events Error:", err);

        setError(err?.response?.data?.message || "Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /*
   * FILTER EVENTS
   */

  const filteredEvents = events.filter((event) => {
    if (event.status !== "approved" || event.isActive !== true) {
      return false;
    }

    if (selectedCategory !== "All" && event.category !== selectedCategory) {
      return false;
    }

    if (selectedDate) {
      const eventDate = new Date(event.date).toISOString().split("T")[0];

      if (eventDate !== selectedDate) {
        return false;
      }
    }

    if (selectedHappening && event.happening !== selectedHappening) {
      return false;
    }

    return true;
  });

  /*
   * CLEAR FILTERS
   */

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedDate("");
    setSelectedHappening("");
  };

  /*
   * RESET CREATE EVENT
   */

  const resetCreateEvent = () => {
    setCreateEventData({
      name: "",
      overview: "",
      location: "",
      date: null,
      time: "",
      category: "",
      subCategory: "",
      format: "Physical",
      image: null,
      imageFile: null,
    });

    setCreateTickets([]);
    setCreateSpeakers([]);
  };

  /*
   * PROVIDER
   */

  return (
    <EventContext.Provider
      value={{
        events,
        filteredEvents,

        selectedEvent,
        setSelectedEvent,

        loading,
        error,

        selectedCategory,
        setSelectedCategory,

        selectedDate,
        setSelectedDate,

        selectedHappening,
        setSelectedHappening,

        clearFilters,

        createEventData,
        setCreateEventData,

        createTickets,
        setCreateTickets,

        createSpeakers,
        setCreateSpeakers,

        resetCreateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

/*
 * HOOK
 */

export const useEvents = () => {
  const context = useContext(EventContext);

  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }

  return context;
};
