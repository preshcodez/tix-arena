import { useEvents } from "../../../contexts/EventContext";

const MapSection = () => {
  const { selectedEvent } = useEvents();

  if (!selectedEvent) {
    return null;
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    selectedEvent.location
  )}&output=embed`;

  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]">
      <h2 className="text-white text-2xl font-bold font-instrument mb-4">
        Location
      </h2>

      <div className="w-full h-64 rounded-xl overflow-hidden bg-[#2A2A2A] flex items-center justify-center">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Event Location Map"
        />
      </div>

      <p className="text-gray-400 mt-3 text-sm">
        {selectedEvent.location}
      </p>
    </div>
  );
};

export default MapSection;