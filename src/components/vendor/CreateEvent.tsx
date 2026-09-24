import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";

import long from "../../assets/images/vendorImages/longdots.svg";
import arrowLeft from "../../assets/images/vendorImages/arrow-left.svg";

import EventForm from "./EventForm";
import TicketForm from "./TicketForm";
import LineUpsForm from "./LineUpsForm";
import EventListedModal from "./EventListedModal";

import { useEvents } from "../../contexts/EventContext";
import api from "../../api/axios";

const STEPS = [
  {
    title: "Event Overview",
    description: "Event Name, Overview, Location, Date, Cover image.",
  },
  {
    title: "Ticket Overview",
    description: "Ticket name, price and quantity for each ticket type.",
  },
  {
    title: "Speakers/Line up",
    description: "Speaker photos, names and headliners.",
  },
];

const CreateEvent = () => {
  const { createEventData, createTickets, createSpeakers, resetCreateEvent } =
    useEvents();

  const [activeStep, setActiveStep] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === STEPS.length - 1;

  const handlePrevious = () => {
    setSubmitError("");

    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setSubmitError("");

    if (!createEventData.name.trim()) {
      setSubmitError("Please enter an event name.");
      setActiveStep(0);
      return;
    }

    if (!createEventData.overview.trim()) {
      setSubmitError("Please enter an event overview.");
      setActiveStep(0);
      return;
    }

    if (!createEventData.location.trim()) {
      setSubmitError("Please enter an event location.");
      setActiveStep(0);
      return;
    }

    if (!createEventData.date) {
      setSubmitError("Please select an event date.");
      setActiveStep(0);
      return;
    }

    if (!createEventData.time.trim()) {
      setSubmitError("Please enter an event time.");
      setActiveStep(0);
      return;
    }

    if (!createEventData.category) {
      setSubmitError("Please select an event category.");
      setActiveStep(0);
      return;
    }

    const validTickets = createTickets.filter(
      (ticket) =>
        ticket.name.trim() &&
        Number(ticket.quantity) > 0 &&
        Number(ticket.price) >= 0,
    );

    if (validTickets.length === 0) {
      setSubmitError(
        "Please add at least one ticket with a name and quantity.",
      );
      setActiveStep(1);
      return;
    }

    const tickets = validTickets.map((ticket) => ({
      name: ticket.name.trim(),
      price: Number(ticket.price),
      totalQuantity: Number(ticket.quantity),
      quantity: Number(ticket.quantity),
      ticketSold: 0,
    }));

    const eventPrice = Math.min(...tickets.map((ticket) => ticket.price));

    const speakers = createSpeakers
      .filter((speaker) => speaker.name.trim())
      .map((speaker) => ({
        name: speaker.name.trim(),
        photo:
          speaker.photo && !speaker.photo.startsWith("blob:")
            ? speaker.photo
            : null,
        isHeadliner: speaker.isHeadliner,
      }));

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("title", createEventData.name.trim());
      formData.append("description", createEventData.overview.trim());
      formData.append("location", createEventData.location.trim());
      formData.append("date", createEventData.date.toISOString());
      formData.append("time", createEventData.time.trim());
      formData.append("category", createEventData.category);

      /*
       * Keep this here because your backend expects subCategory.
       * It does not change the Event Overview UI.
       */
      formData.append("subCategory", createEventData.subCategory?.trim() || "");

      formData.append("format", createEventData.format);
      formData.append("price", String(eventPrice));
      formData.append("tags", JSON.stringify([]));
      formData.append("tickets", JSON.stringify(tickets));
      formData.append("speakers", JSON.stringify(speakers));

      /*
       * Send the actual File.
       * Do NOT fetch the blob preview URL.
       *
       * Multer receives this as "image" and your backend
       * can continue uploading it to Cloudinary.
       */
      if (createEventData.imageFile) {
        formData.append("image", createEventData.imageFile);
      }

      const response = await api.post("/api/events", formData);

      if (response.data?.success) {
        setIsSuccessOpen(true);
      } else {
        setSubmitError(response.data?.message || "Failed to create event.");
      }
    } catch (error: any) {
      console.error("Create Event Error:", error);

      setSubmitError(
        error?.response?.data?.message ||
          "Something went wrong while creating the event.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    setSubmitError("");

    if (isLastStep) {
      await handleSubmit();
      return;
    }

    setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    setActiveStep(0);
    setSubmitError("");

    resetCreateEvent();
  };

  return (
    <div className="w-[78%] flex flex-col items-start gap-6 p-6">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-white font-['Instrument_Serif'] text-[32px]">
            Create Event
          </h1>

          <p className="text-[#777777] font-[Manrope] text-[14px] mt-1">
            Create and publish your event on Tix-Arena.
          </p>
        </div>
      </div>

      <div className="w-full flex items-center gap-4">
        {STEPS.map((step, index) => (
          <div key={step.title} className="flex items-center gap-3">
            <div
              className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[14px] font-[Manrope] ${
                index <= activeStep
                  ? "bg-[#995DFF] text-white"
                  : "bg-[#191919] text-[#777777] border border-[#262525]"
              }`}
            >
              {index + 1}
            </div>

            <div className="hidden lg:flex flex-col">
              <span
                className={`font-[Manrope] text-[14px] ${
                  index === activeStep ? "text-white" : "text-[#777777]"
                }`}
              >
                {step.title}
              </span>

              <span className="text-[#555555] font-[Manrope] text-[11px]">
                {step.description}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <img src={long} alt="" className="hidden lg:block w-[55px]" />
            )}
          </div>
        ))}
      </div>

      {submitError && (
        <div className="w-full rounded-[20px] border border-[#FF7466] bg-[#211311] px-5 py-4">
          <p className="text-[#FF7466] font-[Manrope] text-[14px]">
            {submitError}
          </p>
        </div>
      )}

      <div className="w-full">
        {activeStep === 0 && <EventForm />}
        {activeStep === 1 && <TicketForm />}
        {activeStep === 2 && <LineUpsForm />}
      </div>

      <div className="w-full flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isFirstStep || isSubmitting}
          className="h-[58px] px-6 rounded-[30px] border-2 border-[#262525] bg-[#1A1A1A] text-white font-[Manrope] text-[15px] flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#995DFF] transition-colors"
        >
          <img src={arrowLeft} alt="" className="w-[18px] h-[18px]" />
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="h-[58px] px-7 rounded-[30px] bg-[#995DFF] text-white font-[Manrope] text-[15px] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8950ED] transition-colors"
        >
          {isSubmitting ? "Creating..." : isLastStep ? "Create Event" : "Next"}

          {!isSubmitting && <LuArrowRight size={18} />}
        </button>
      </div>

      <EventListedModal isOpen={isSuccessOpen} onClose={handleSuccessClose} />
    </div>
  );
};

export default CreateEvent;
