import cancelIcon from "../../../assets/images/eventsImages/name.svg";
import bgImage from "../../../assets/images/eventsImages/62cae83f02e515ccbf643ad394caae5f42aa7121.png";
import bgText from "../../../assets/images/eventsImages/Subtract.svg";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleMyTicket = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        px-4
        py-6
        backdrop-blur-sm

        max-sm:px-3
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-[580px]
          h-[224px]
          max-w-lg
          overflow-hidden
          rounded-2xl
          border
          border-[#2A2A2A]
          bg-[#0B0B0B]

          max-sm:w-full
          max-sm:h-auto
          max-sm:min-h-[210px]
          max-sm:rounded-[18px]
        "
      >
        {/* Background Image */}
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            filter
            blur-sm
            scale-110
          "
          style={{
            backgroundImage: `url("${bgImage}")`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Content */}
        <div
          className="
            relative
            p-8

            max-sm:p-5
            max-sm:pr-5
          "
        >
          {/* Close Button */}
          <button
            type="button"
            className="
              absolute
              top-4
              right-4
              cursor-pointer

              max-sm:top-3
              max-sm:right-3
            "
            onClick={onClose}
            aria-label="Close"
          >
            <img
              src={cancelIcon}
              alt=""
              className="
                h-7
                w-7

                max-sm:h-6
                max-sm:w-6
              "
            />
          </button>

          {/* Decorative Background Text */}
          <img
            src={bgText}
            alt=""
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              opacity-20
              pointer-events-none
            "
          />

          {/* Heading */}
          <h2
            className="
              relative
              mb-4
              pr-10
              text-[35px]
              font-medium
              font-instrument
              leading-tight
              text-white

              max-sm:mb-3
              max-sm:pr-8
              max-sm:text-[27px]
            "
          >
            Ticket Purchased Successfully
          </h2>

          {/* Message */}
          <p
            className="
              relative
              text-sm
              leading-relaxed
              text-gray-300

              max-sm:text-[13px]
              max-sm:leading-5
            "
          >
            We&apos;ve sent your ticket to your email for easy access.
            You&apos;ll also find it saved in your profile whenever under{" "}
            <button
              type="button"
              onClick={handleMyTicket}
              className="
                text-[#995DFF]
                hover:underline
                cursor-pointer
              "
            >
              My Ticket
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
