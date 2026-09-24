import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import EventCard from "./EventCard";

type Ticket = {
  name: string;
  price: number;
  totalQuantity: number;
  quantity: number;
  ticketSold: number;
};

type Event = {
  _id: string;
  image?: string | null;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  tickets?: Ticket[];
};

type EventSectionProps = {
  title: string;
  events: Event[];
};

function EventSection({ title, events }: EventSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [itemsPerSlide]);

  const slides: Event[][] = [];

  for (let i = 0; i < events.length; i += itemsPerSlide) {
    slides.push(events.slice(i, i + itemsPerSlide));
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  return (
    <section className="w-full max-w-310 mx-auto mt-14 px-4 sm:px-6 lg:px-12">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-white text-[28px] sm:text-[32px] md:text-[34px] font-serif">
          {title}
        </h2>

        {/* SLIDE BUTTONS */}
        <div className="flex items-center gap-2 ">
          <button
            type="button"
            onClick={previousSlide}
            disabled={slides.length <= 1}
            className="
              w-9
              h-9
              rounded-full
              bg-[#262525]
              border
              border-[#3A3A3A]
              text-white
              flex
              items-center
              justify-center
              hover:bg-[#995DFF]
              transition
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <LuArrowLeft size={17} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            disabled={slides.length <= 1}
            className="
              w-9
              h-9
              rounded-full
              bg-[#262525]
              border
              border-[#3A3A3A]
              text-white
              flex
              items-center
              justify-center
              hover:bg-[#995DFF]
              transition
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <LuArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* SLIDES */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="
                min-w-full
                grid
                grid-cols-2
                sm:grid-cols-3
                lg:grid-cols-4
                gap-3
                sm:gap-5
                lg:gap-6
              "
            >
              {slide.map((event) => (
                <EventCard
                  key={event._id}
                  _id={event._id}
                  image={event.image}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  price={event.price}
                  category={event.category}
                  tickets={event.tickets}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`
                h-1.5 rounded-full transition-all
                ${
                  currentSlide === index
                    ? "w-6 bg-[#995DFF]"
                    : "w-1.5 bg-[#444444]"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default EventSection;
