import type { ChangeEvent } from "react";
import { LuUser, LuX, LuCheck } from "react-icons/lu";
import camera from "../../assets/images/vendorImages/Camera.svg";
import { useEvents } from "../../contexts/EventContext";

const LineUpsForm = () => {
  const { createSpeakers, setCreateSpeakers } = useEvents();

  const handleName = (id: number, value: string) => {
    setCreateSpeakers((prev) =>
      prev.map((speaker) =>
        speaker.id === id ? { ...speaker, name: value } : speaker,
      ),
    );
  };

  const handlePhoto = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setCreateSpeakers((prev) =>
      prev.map((speaker) =>
        speaker.id === id ? { ...speaker, photo: url } : speaker,
      ),
    );
  };

  const removePhoto = (id: number) => {
    setCreateSpeakers((prev) =>
      prev.map((speaker) =>
        speaker.id === id ? { ...speaker, photo: null } : speaker,
      ),
    );
  };

  const toggleHeadliner = (id: number) => {
    setCreateSpeakers((prev) =>
      prev.map((speaker) =>
        speaker.id === id
          ? {
              ...speaker,
              isHeadliner: !speaker.isHeadliner,
            }
          : speaker,
      ),
    );
  };

  const addSpeaker = () => {
    setCreateSpeakers((prev) => [
      ...prev,
      {
        id:
          prev.length > 0
            ? Math.max(...prev.map((speaker) => speaker.id)) + 1
            : 1,
        name: "",
        photo: null,
        isHeadliner: false,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-3.5 text-start bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
      <h3 className="text-white text-[18px] font-semibold">Speakers/Line up</h3>

      {createSpeakers.map((speaker) => (
        <div key={speaker.id} className="flex flex-col gap-[3px]">
          <div className="flex items-center justify-between bg-[#1A1A1A] rounded-t-[20px] p-3.5">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <span className="w-10 h-10 rounded-full bg-[#262525] overflow-hidden flex items-center justify-center shrink-0">
                {speaker.photo ? (
                  <img
                    src={speaker.photo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <LuUser size={18} className="text-[#7A7A7A]" />
                )}
              </span>

              <span className="text-[#ECECEC] text-[15px] flex items-center gap-1.5">
                Upload Photo
                <span className="w-6 h-6 rounded-full bg-[#262525] flex items-center justify-center">
                  <img src={camera} alt="" className="w-3.5 h-3.5" />
                </span>
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhoto(speaker.id, e)}
                className="hidden"
              />
            </label>

            {speaker.photo && (
              <button
                type="button"
                onClick={() => removePhoto(speaker.id)}
                className="flex items-center gap-1.5 bg-[#262525] rounded-full px-3 py-1.5 text-[#ECECEC] text-[14px] hover:bg-[#333] transition-colors"
              >
                Remove
                <LuX size={10} className="text-[#ECECEC]" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between bg-[#1A1A1A] rounded-b-[20px] p-3.5">
            <input
              value={speaker.name}
              onChange={(e) => handleName(speaker.id, e.target.value)}
              placeholder="Enter Name"
              className="bg-transparent text-[#ECECEC] text-[15px] placeholder:text-[#7A7A7A] outline-none flex-1"
            />

            <button
              type="button"
              onClick={() => toggleHeadliner(speaker.id)}
              className="flex items-center gap-2.5 text-[#ECECEC] text-[14px] shrink-0"
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
        </div>
      ))}

      <button
        type="button"
        onClick={addSpeaker}
        className="text-[#A485D9] text-[16px] font-medium flex items-center gap-1 w-fit"
      >
        Add New Member
        <span className="text-[18px]">+</span>
      </button>
    </div>
  );
};

export default LineUpsForm;
