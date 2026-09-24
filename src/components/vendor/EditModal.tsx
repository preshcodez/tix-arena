import { useState } from "react";
import type { ChangeEvent } from "react";
import { LuCheck } from "react-icons/lu";
import DatePickerField from "./DatePickerField";
import cole from "../../assets/images/vendorImages/cole.svg";
import martins from "../../assets/images/vendorImages/martins.svg";
import idris from "../../assets/images/vendorImages/idris.svg";
import camera from "../../assets/images/vendorImages/Camera.svg";
import eveimg from "../../assets/images/vendorImages/eventimg2.svg";
import close from "../../assets/images/vendorImages/close.svg";

interface TicketOverview {
  id: number;
  name: string;
  quantity: number;
}

interface Speaker {
  id: number;
  name: string;
  photo: string | null;
  isHeadliner: boolean;
}

interface EventOverview {
  name: string;
  overview: string;
  location: string;
  date: Date | null;
  time: string;
  image: string | null;
}

export interface EditModalData {
  event: EventOverview;
  tickets: TicketOverview[];
  speakers: Speaker[];
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: EditModalData) => void;
}

const CloseIcon = () => (
  <div>
    <img src={close} alt="" />
  </div>
);

const CameraIcon = () => (
  <div>
    <img src={camera} alt="" />
  </div>
);

const inputBase =
  "w-full  bg-[#1A1A1A] text-[#ABABAB] text-[16px] rounded-[30px] border-2 border-[#262525] px-4.5 py-5 placeholder:text-[#6E6E6E] outline-none border border-transparent focus:border-[#995DFF] transition-colors";
const labelBase = "text-[#FFFFFF] text-[16px] font-normal";

let idCounter = 100;
const nextId = () => idCounter++;

const EditModal = ({ isOpen, onClose, onSave }: EditModalProps) => {
  const [event, setEvent] = useState<EventOverview>({
    name: "Accessing the App & Google Play Store",
    overview:
      "Learn how to safely find, download, and manage apps from the App Store and Google Play without unexpected charges. Join Senior Tech Connect for a free, one-hour webinar. What You'll Learn How to search for apps in the App Store and Google Play How to understand app categories and recommendations",
    location: "34, Ejumbe Street, Ikorodu, Lagos State.",
    date: new Date(2026, 4, 29),
    time: "6PM - 7PM WAT",
    image: eveimg,
  });

  const [tickets, setTickets] = useState<TicketOverview[]>([
    { id: nextId(), name: "Regular", quantity: 30 },
    { id: nextId(), name: "VIP", quantity: 30 },
  ]);

  const [speakers, setSpeakers] = useState<Speaker[]>([
    { id: nextId(), name: "Idris Kampela", photo: idris, isHeadliner: false },
    { id: nextId(), name: "Sule Martins", photo: martins, isHeadliner: false },
    { id: nextId(), name: "Cole Palmer", photo: cole, isHeadliner: false },
  ]);

  if (!isOpen) return null;

  const handleEventImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file)
      setEvent((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const handleTicketChange = (
    id: number,
    field: "name" | "quantity",
    value: string,
  ) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              [field]:
                field === "quantity" ? Math.max(0, Number(value) || 0) : value,
            }
          : t,
      ),
    );
  };

  const adjustQuantity = (id: number, delta: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, quantity: Math.max(0, t.quantity + delta) } : t,
      ),
    );
  };

  const addTicket = () => {
    setTickets((prev) => [...prev, { id: nextId(), name: "", quantity: 0 }]);
  };

  const handleSpeakerName = (id: number, value: string) => {
    setSpeakers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: value } : s)),
    );
  };

  const handleSpeakerPhoto = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSpeakers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, photo: url } : s)),
    );
  };

  const toggleHeadliner = (id: number) => {
    setSpeakers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isHeadliner: !s.isHeadliner } : s,
      ),
    );
  };

  const addSpeaker = () => {
    setSpeakers((prev) => [
      ...prev,
      { id: nextId(), name: "", photo: null, isHeadliner: false },
    ]);
  };

  const handleSave = () => {
    onSave?.({ event, tickets, speakers });
  };

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-end bg-black/70 px-4">
      <div className="w-full max-w-md max-h-[95vh] overflow-y-auto hide-scrollbar bg-[#0F0F0F] border border-[#262525] rounded-3xl p-5 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-[20px] font-semibold">Edit Event</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] hover:bg-[#262525] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Event Overview */}
        <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[15px] font-semibold">
            Event Overview
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>
              Event Name <span className="text-[#FF7466]">*</span>
            </label>
            <input
              value={event.name}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, name: e.target.value }))
              }
              className={inputBase}
            />
          </div>

          <div className="flex flex-col items-start gap-1.5">
            <label className={labelBase}>
              Overview{" "}
              <label className={labelBase}>
                Ticket Quantity <span className="text-[#FF7466]">*</span>
              </label>
            </label>
            <textarea
              value={event.overview}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, overview: e.target.value }))
              }
              rows={5}
              className={`${inputBase} h-auto py-3 resize-none leading-relaxed hide-scrollbar`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>
              Location <span className="text-[#FF7466]">*</span>
            </label>
            <input
              value={event.location}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, location: e.target.value }))
              }
              className={inputBase}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>
              Date <span className="text-[#FF7466]">*</span>
            </label>
            <div className="flex gap-2.5">
              <DatePickerField
                value={event.date ?? undefined}
                onChange={(date) =>
                  setEvent((prev) => ({ ...prev, date: date ?? null }))
                }
                placeholder="Select date"
                className={`${inputBase} flex-1`}
              />
              <input
                value={event.time}
                onChange={(e) =>
                  setEvent((prev) => ({ ...prev, time: e.target.value }))
                }
                placeholder="e.g. 6PM - 7PM WAT"
                className={`${inputBase} w-44`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase}>
              Image <span className="text-[#FF7466]">*</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer w-fit">
              <span className="w-9 h-9 rounded-full bg-[#262525] overflow-hidden flex items-center justify-center">
                {event.image ? (
                  <img
                    src={event.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CameraIcon />
                )}
              </span>
              <span className="text-[#ECECEC] text-[14px] flex items-center gap-1.5">
                Change Photo <CameraIcon />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleEventImage}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="h-px bg-[#262525]" />

        {/* Ticket Overview */}
        <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[15px] font-semibold">
            Ticket Overview
          </h3>

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex flex-col gap-3 bg-[#161616] rounded-[16px] p-3.5"
            >
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>
                  Ticket Name <span className="text-[#FF7466]">*</span>
                </label>
                <input
                  value={ticket.name}
                  onChange={(e) =>
                    handleTicketChange(ticket.id, "name", e.target.value)
                  }
                  placeholder="e.g. Regular"
                  className={inputBase}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelBase}>
                  Ticket Quantity <span className="text-[#FF7466]">*</span>
                </label>
                <div className="w-full h-13 bg-[#1A1A1A] rounded-xl px-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => adjustQuantity(ticket.id, -1)}
                    className="w-9 h-9 rounded-full bg-[#262525] text-white text-lg flex items-center justify-center hover:bg-[#333]"
                  >
                    −
                  </button>
                  <input
                    value={ticket.quantity}
                    onChange={(e) =>
                      handleTicketChange(ticket.id, "quantity", e.target.value)
                    }
                    className="w-16 bg-transparent text-white text-center outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => adjustQuantity(ticket.id, 1)}
                    className="w-9 h-9 rounded-full bg-[#262525] text-white text-lg flex items-center justify-center hover:bg-[#333]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addTicket}
            className="text-[#A485D9] text-[14px] font-medium flex items-center gap-1 w-fit"
          >
            Add <span className="text-[16px]">+</span>
          </button>
        </div>

        <div className="h-px bg-[#262525]" />

        {/* Speakers / Line up */}
        <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
          <h3 className="text-white text-[15px] font-semibold">
            Speakers/Line up
          </h3>

          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="flex flex-col gap-3 bg-[#161616] rounded-2xl p-3.5"
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <span className="w-9 h-9 rounded-full bg-[#262525] overflow-hidden flex items-center justify-center">
                    {speaker.photo ? (
                      <img
                        src={speaker.photo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CameraIcon />
                    )}
                  </span>
                  <span className="text-[#ECECEC] text-[14px] flex items-center gap-1.5">
                    Upload Photo <CameraIcon />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSpeakerPhoto(speaker.id, e)}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => toggleHeadliner(speaker.id)}
                  className="flex items-center gap-2 text-[#ECECEC] text-[14px]"
                >
                  Mark as Headliner
                  <span
                    className={`w-5 h-5 rounded-[5px] border flex items-center justify-center transition-colors ${
                      speaker.isHeadliner
                        ? "bg-[#995DFF] border-[#995DFF]"
                        : "bg-transparent border-[#4D4D4D]"
                    }`}
                  >
                    {speaker.isHeadliner && (
                      <LuCheck size={12} className="text-white" />
                    )}
                  </span>
                </button>
              </div>

              <input
                value={speaker.name}
                onChange={(e) => handleSpeakerName(speaker.id, e.target.value)}
                placeholder="Speaker name"
                className={inputBase}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addSpeaker}
            className="text-[#A485D9] text-[14px] font-medium flex items-center gap-1 w-fit"
          >
            Add New Member <span className="text-[16px]">+</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[16px] py-3.5 px-4.25 font-medium rounded-[30px] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditModal;
