import { useState } from "react";
import { useNavigate } from "react-router-dom";

import eventLoverIcon from "../../assets/images/authImages/event-lover-icon.svg";
import createEventIcon from "../../assets/images/authImages/create-event-icon.svg";
import AuthLayout from "../../layouts/AuthLayout";

const OnboardingStep1 = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<
    "event_lover" | "event_creator" | null
  >(null);

  const handleNext = () => {
    if (!selected) {
      return;
    }

    if (selected === "event_lover") {
      localStorage.setItem("onboardingRole", "event-lover");
    }

    if (selected === "event_creator") {
      localStorage.setItem("onboardingRole", "event-creator");
    }

    navigate("/onboarding/step2");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] px-4 sm:px-0 flex flex-col gap-[25px]">
        <div className="relative">
          <div className="flex flex-col gap-[8px] pr-[45px]">
            <h1 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[38px] sm:text-[45px] leading-[100%] tracking-[-0.02em] text-left">
              You're Almost There
            </h1>

            <p className="text-[#CECECE] font-[Manrope] font-normal text-[15px] sm:text-[16px] leading-[140%] tracking-[-0.01em] text-left">
              Complete the final steps to get your personalized account up and
              running.
            </p>
          </div>

          <span
            onClick={() => {
              localStorage.removeItem("onboardingRole");
              navigate("/onboarding/step2");
            }}
            className="absolute top-0 right-0 text-[#CECECE] font-[Manrope] font-normal text-[14px] sm:text-[16px] cursor-pointer"
          >
            Skip
          </span>
        </div>

        {/* Progress */}
        <div className="flex gap-[8px]">
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#434343]" />
        </div>

        <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[20px] sm:text-[23px] leading-[100%] tracking-[-0.01em] text-left">
          What are you here for?
        </h3>

        {/* Event Lover */}
        <div
          onClick={() => setSelected("event_lover")}
          className="flex items-center gap-[15px] sm:gap-[20px] w-full min-h-[104px] rounded-[30px] px-[20px] sm:px-[30px] py-[14px] cursor-pointer"
          style={{
            backgroundColor: selected === "event_lover" ? "#110B1A" : "#191919",
            border:
              selected === "event_lover"
                ? "2px solid #995DFF"
                : "2px solid #262525",
          }}
        >
          <img
            src={eventLoverIcon}
            alt=""
            className="w-[48px] h-[40px] sm:w-[57px] sm:h-[47px] shrink-0"
          />

          <div className="flex flex-col items-start gap-[4px]">
            <h4 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[21px] sm:text-[23px] leading-[100%] tracking-[-0.01em]">
              Event Lover
            </h4>

            <p className="text-[#CECECE] font-[Manrope] font-normal text-[14px] sm:text-[16px] leading-[140%] tracking-[-0.01em] text-left">
              I want to find events, buy tickets, and follow my favorite
              creators.
            </p>
          </div>
        </div>

        {/* Create Event */}
        <div
          onClick={() => setSelected("event_creator")}
          className="flex items-center gap-[15px] sm:gap-[20px] w-full min-h-[104px] rounded-[30px] px-[20px] sm:px-[30px] py-[14px] cursor-pointer"
          style={{
            backgroundColor:
              selected === "event_creator" ? "#110B1A" : "#191919",
            border:
              selected === "event_creator"
                ? "2px solid #995DFF"
                : "2px solid #262525",
          }}
        >
          <img
            src={createEventIcon}
            alt=""
            className="w-[48px] h-[49px] sm:w-[56px] sm:h-[57px] shrink-0"
          />

          <div className="flex flex-col items-start gap-[4px]">
            <h4 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[21px] sm:text-[23px] leading-[100%] tracking-[-0.01em]">
              Create Event
            </h4>

            <p className="text-[#CECECE] font-[Manrope] font-normal text-[14px] sm:text-[16px] leading-[140%] tracking-[-0.01em] text-left">
              I want to create events, sell tickets, and manage my attendees.
            </p>
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </AuthLayout>
  );
};

export default OnboardingStep1;
