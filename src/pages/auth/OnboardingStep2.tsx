import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/AuthLayout";
import api from "../../api/axios";

const CATEGORIES = [
  "Entertainment",
  "Tech",
  "Corporate",
  "Sport",
  "Education",
  "Charity",
  "Comedy",
  "Concert",
];

const GENDERS = ["Male", "Female"];

const OnboardingStep2 = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onboardingRole = localStorage.getItem("onboardingRole");

  const isEventCreator = onboardingRole === "event-creator";

  const toggleCategory = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  const handleComplete = async () => {
    if (!gender) {
      toast.error("Please select your gender.");
      return;
    }

    if (selected.length === 0) {
      toast.error("Please select at least one event interest.");
      return;
    }

    /*
     * EVENT CREATOR
     *
     * Do not complete normal onboarding yet.
     * Save the information temporarily and go to Step 3.
     */
    if (isEventCreator) {
      localStorage.setItem("onboardingInterests", JSON.stringify(selected));

      localStorage.setItem("onboardingGender", gender.toLowerCase());

      navigate("/onboarding/step3");
      return;
    }

    /*
     * EVENT LOVER
     *
     * Complete normal onboarding and go to Explore.
     */
    try {
      setLoading(true);

      const response = await api.post("/api/users/onboarding", {
        gender: gender.toLowerCase(),
        interests: selected,
      });

      console.log("ONBOARDING RESPONSE:", response.data);

      localStorage.removeItem("onboardingRole");
      localStorage.removeItem("onboardingInterests");
      localStorage.removeItem("onboardingGender");

      toast.success("Welcome to Tix-Arena!");

      navigate("/explore");
    } catch (error: any) {
      console.error("ONBOARDING ERROR:", error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
          "Could not complete onboarding. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    /*
     * Event Creator:
     * Skip normal onboarding and continue to Step 3.
     */
    if (isEventCreator) {
      navigate("/onboarding/step3");
      return;
    }

    /*
     * Event Lover:
     * Keep the existing completion behavior.
     */
    handleComplete();
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] px-4 sm:px-0 flex flex-col gap-[25px]">
        <div className="relative">
          <div className="flex flex-col gap-[8px] pr-[45px]">
            <h1 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[38px] sm:text-[45px] leading-[100%] tracking-[-0.02em] text-left">
              You're Almost There
            </h1>

            <p className="text-[#CECECE] font-[Manrope] font-normal text-[15px] sm:text-[16px] leading-[140%] text-left">
              Complete the final steps to get your personalized account up and
              running.
            </p>
          </div>

          <span
            onClick={handleSkip}
            className="absolute top-0 right-0 text-[#CECECE] font-[Manrope] font-normal text-[14px] sm:text-[16px] cursor-pointer"
          >
            Skip
          </span>
        </div>

        {/* Progress */}
        <div className="flex gap-[8px]">
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />

          {isEventCreator && (
            <div className="flex-1 h-[6px] rounded-[30px] bg-[#434343]" />
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-[16px]">
          <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[18px] text-left">
            Gender
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[22px]">
            {GENDERS.map((g) => (
              <div
                key={g}
                onClick={() => setGender(g)}
                className="flex items-center justify-between h-[61px] rounded-[30px] px-[25px] sm:px-[30px] py-[14px] cursor-pointer"
                style={{
                  backgroundColor: gender === g ? "#110B1A" : "#191919",
                  border:
                    gender === g ? "2px solid #995DFF" : "2px solid #262525",
                }}
              >
                <span className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[22px] sm:text-[25px]">
                  {g}
                </span>

                {gender === g && (
                  <div className="w-[18px] h-[18px] rounded-full bg-[#995DFF] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[20px] sm:text-[23px] text-left">
          Select the kind of event that interest you?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[22px]">
          {CATEGORIES.map((category) => {
            const isSelected = selected.includes(category);

            return (
              <div
                key={category}
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between h-[61px] w-full rounded-[30px] px-[25px] sm:px-[30px] py-[14px] cursor-pointer"
                style={{
                  backgroundColor: isSelected ? "#110B1A" : "#191919",
                  border: isSelected
                    ? "2px solid #995DFF"
                    : "2px solid #262525",
                }}
              >
                <span className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[22px] sm:text-[25px]">
                  {category}
                </span>

                {isSelected && (
                  <div className="w-[18px] h-[18px] rounded-full bg-[#995DFF] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue */}
        <button
          type="button"
          onClick={handleComplete}
          disabled={loading}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Completing..." : isEventCreator ? "Continue" : "Complete"}
        </button>
      </div>
    </AuthLayout>
  );
};

export default OnboardingStep2;
