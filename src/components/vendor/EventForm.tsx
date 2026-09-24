import type { ChangeEvent } from "react";
import { LuImage } from "react-icons/lu";
import arrowDown from "../../assets/images/vendorImages/arrow-down.svg";
import camera from "../../assets/images/vendorImages/Camera.svg";
import DatePickerField from "./DatePickerField";
import { useEvents } from "../../contexts/EventContext";

const inputBase =
  "w-full bg-[#1A1A1A] text-[#ABABAB] text-[16px] rounded-[30px] border-2 border-[#262525] px-4.5 py-5 placeholder:text-[#6E6E6E] outline-none focus:border-[#995DFF] transition-colors";

const labelBase = "text-[#FFFFFF] text-[16px] font-normal";

const requiredMark = <span className="text-[#FF7466]">*</span>;

const EventForm = () => {
  const { createEventData, setCreateEventData } = useEvents();

  const update = (patch: Partial<typeof createEventData>) => {
    setCreateEventData((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      update({
        image: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  };

  return (
    <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
      <h3 className="text-white text-[18px] font-semibold">Event Overview</h3>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Event Name {requiredMark}</label>

        <input
          value={createEventData.name}
          onChange={(e) =>
            update({
              name: e.target.value,
            })
          }
          placeholder="Enter event name"
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Overview {requiredMark}</label>

        <textarea
          value={createEventData.overview}
          onChange={(e) =>
            update({
              overview: e.target.value,
            })
          }
          placeholder="Enter event details"
          rows={4}
          className={`${inputBase} rounded-[24px] resize-none leading-relaxed hide-scrollbar`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Location {requiredMark}</label>

        <div className="relative flex items-center">
          <input
            value={createEventData.location}
            onChange={(e) =>
              update({
                location: e.target.value,
              })
            }
            placeholder="Enter location address"
            className={`${inputBase} pr-12`}
          />

          <img
            src={arrowDown}
            alt=""
            className="absolute right-5 pointer-events-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Date {requiredMark}</label>

        <DatePickerField
          value={createEventData.date ?? undefined}
          onChange={(date) =>
            update({
              date: date ?? null,
            })
          }
          placeholder="Select date"
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Time{requiredMark}</label>

        <input
          value={createEventData.time}
          onChange={(e) =>
            update({
              time: e.target.value,
            })
          }
          placeholder="Enter event time (e.g 7:00)"
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Category {requiredMark}</label>

        <select
          value={createEventData.category}
          onChange={(e) =>
            update({
              category: e.target.value,
            })
          }
          className={inputBase}
        >
          <option value="" disabled>
            Select a category
          </option>

          <option value="Entertainment">Entertainment</option>

          <option value="Corporate">Corporate</option>

          <option value="Education">Education</option>

          <option value="Charity">Charity</option>

          <option value="Tech">Tech</option>

          <option value="Sport">Sport</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelBase}>Image {requiredMark}</label>

        <div className="flex items-center gap-3">
          <span className="w-13 h-13 rounded-2xl bg-[#1A1A1A] border-2 border-[#262525] overflow-hidden flex items-center justify-center shrink-0">
            {createEventData.image ? (
              <img
                src={createEventData.image}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <LuImage size={20} className="text-[#7A7A7A]" />
            )}
          </span>

          <label className="flex items-center gap-2.5 bg-[#1A1A1A] border-2 border-[#262525] rounded-full pl-4 pr-1.5 py-1.5 cursor-pointer">
            <span className="text-[#ABABAB] text-[15px]">Upload Photo</span>

            <span className="w-7 h-7 rounded-full bg-[#262525] flex items-center justify-center">
              <img src={camera} alt="" className="w-4 h-4" />
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
