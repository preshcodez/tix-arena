import { IoClose } from "react-icons/io5";

interface AboutSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutSection = ({ isOpen, onClose }: AboutSectionProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* About panel */}
      <div className="relative z-10 w-full sm:max-w-md h-full bg-[#0b0b0b] border-l border-[#2A2A2A] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A2A2A]">
          <h2 className="font-manrope text-white text-lg font-semibold">
            About Tix Arena
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-[#DCC7BC] hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <p className="font-manrope text-sm text-[#995DFF] font-medium mb-4">
            ABOUT TIX ARENA
          </p>

          <h3 className="font-manrope text-3xl text-white font-semibold leading-tight">
            Your gateway to unforgettable experiences.
          </h3>

          <p className="font-manrope text-sm text-[#B7B7B7] leading-7 mt-8">
            Tix Arena makes discovering and booking events simple. From concerts
            and entertainment to conferences, sports and other experiences, we
            bring everything together in one place.
          </p>

          <p className="font-manrope text-sm text-[#B7B7B7] leading-7 mt-5">
            Whether you're looking for your next event or planning one of your
            own, Tix Arena gives you the tools to discover experiences, manage
            events and connect with the people who matter.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="font-manrope text-white font-semibold">Discover</p>

              <p className="font-manrope text-sm text-[#8E8E8E] leading-6 mt-1">
                Find events and experiences that match your interests.
              </p>
            </div>

            <div>
              <p className="font-manrope text-white font-semibold">Book</p>

              <p className="font-manrope text-sm text-[#8E8E8E] leading-6 mt-1">
                Secure your tickets through a simple and convenient process.
              </p>
            </div>

            <div>
              <p className="font-manrope text-white font-semibold">
                Experience
              </p>

              <p className="font-manrope text-sm text-[#8E8E8E] leading-6 mt-1">
                Enjoy memorable events and experiences with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
