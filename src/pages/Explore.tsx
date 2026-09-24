import ScrollToTopButton from "../components/ScrollToTopButton";
import CategoryTabs from "../components/explore/CategoryTabs";
import Hero from "../components/explore/Hero";
import EventSection from "../components/explore/EventSection";
import Footer from "../components/explore/Footer";
import { useEvents } from "../contexts/EventContext";

function Explore() {
  const { filteredEvents, loading, error } = useEvents();

  return (
    <div className="bg-[#0B0B0B] min-h-screen">
      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <CategoryTabs />

      {/* EVENTS */}
      {loading ? (
        <p className="text-gray-400 text-center mt-14">Loading events...</p>
      ) : error ? (
        <p className="text-red-400 text-center mt-14">{error}</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-gray-400 text-center mt-14">
          No events found in this category.
        </p>
      ) : (
        <EventSection
          title="Explore Events"
          events={filteredEvents.map((event) => ({
            _id: event._id,
            image: event.image,
            title: event.title,
            date: new Date(event.date).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            time: event.time,
            location: event.location,
            price: event.price,
            category: event.category,
            tickets: event.tickets,
          }))}
        />
      )}

      {/* FOOTER */}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default Explore;
