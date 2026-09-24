import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUpload, FiX } from "react-icons/fi";

import AuthLayout from "../../layouts/AuthLayout";
import api from "../../api/axios";

const OnboardingStep3 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [businessLogo, setBusinessLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const clearOnboardingData = () => {
    localStorage.removeItem("onboardingRole");
    localStorage.removeItem("onboardingInterests");
    localStorage.removeItem("onboardingGender");
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Business logo must be less than 5MB.");
      return;
    }

    setBusinessLogo(file);

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  const removeLogo = () => {
    setBusinessLogo(null);
    setLogoPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContinue = async () => {
    if (!businessName.trim()) {
      toast.error("Please enter your business or creator name.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("businessName", businessName.trim());
      formData.append("description", description.trim());

      if (businessLogo) {
        formData.append("businessLogo", businessLogo);
      }

      const response = await api.post("/api/vendors/apply", formData);

      console.log("VENDOR APPLICATION RESPONSE:", response.data);

      clearOnboardingData();

      toast.success("Vendor application submitted successfully!");

      navigate("/vendor/pending");
    } catch (error: any) {
      console.error("VENDOR APPLICATION ERROR:", error.response?.data || error);

      const message = error.response?.data?.message;

      if (message === "Vendor application already exists") {
        clearOnboardingData();

        navigate("/vendor/pending");
        return;
      }

      if (message === "You are already a vendor") {
        clearOnboardingData();

        navigate("/vendor");
        return;
      }

      toast.error(
        message ||
          "Could not submit your vendor application. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] px-4 sm:px-0 flex flex-col gap-[25px]">
        {/* Header */}
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

          <button
            type="button"
            onClick={() => navigate("/onboarding/step2")}
            disabled={loading}
            className="absolute top-0 right-0 text-[#CECECE] font-[Manrope] font-normal text-[14px] sm:text-[16px] cursor-pointer disabled:opacity-50"
          >
            Back
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-[8px]">
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
          <div className="flex-1 h-[6px] rounded-[30px] bg-[#995DFF]" />
        </div>

        {/* Section heading */}
        <div className="flex flex-col gap-[8px]">
          <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[20px] sm:text-[23px] text-left">
            Tell us about your events
          </h3>

          <p className="text-[#CECECE] font-[Manrope] text-[14px] sm:text-[15px] leading-[140%] text-left">
            Add a few details about your creator profile to get started.
          </p>
        </div>

        {/* Business Name */}
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[18px] text-left">
            Business or Creator Name
          </h3>

          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. TixArena Events"
            disabled={loading}
            className="w-full h-[61px] rounded-[30px] px-[25px] sm:px-[30px] py-[14px] bg-[#191919] border-[2px] border-[#262525] outline-none text-[#FFFFFF] placeholder:text-[#777777] font-['Instrument_Serif'] text-[22px] sm:text-[25px] focus:border-[#995DFF] transition-colors disabled:opacity-60"
          />
        </div>

        {/* Business Logo */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[18px]">
              Business Logo
            </h3>

            <span className="text-[#777777] font-[Manrope] text-[13px]">
              Optional
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            disabled={loading}
            className="hidden"
          />

          {!logoPreview ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-full min-h-[130px] rounded-[30px] px-[25px] py-[25px] bg-[#191919] border-[2px] border-dashed border-[#262525] hover:border-[#995DFF] transition-colors flex flex-col items-center justify-center gap-[10px] disabled:opacity-60"
            >
              <FiUpload className="text-[#995DFF] text-[25px]" />

              <span className="text-[#FFFFFF] font-[Manrope] text-[14px]">
                Upload your business logo
              </span>

              <span className="text-[#777777] font-[Manrope] text-[12px]">
                PNG, JPG or WEBP · Max 5MB
              </span>
            </button>
          ) : (
            <div className="relative w-full min-h-[130px] rounded-[30px] overflow-hidden bg-[#191919] border-[2px] border-[#262525] flex items-center justify-center p-[15px]">
              <img
                src={logoPreview}
                alt="Business logo preview"
                className="max-h-[150px] max-w-full object-contain rounded-[20px]"
              />

              <button
                type="button"
                onClick={removeLogo}
                disabled={loading}
                className="absolute top-[12px] right-[12px] w-[34px] h-[34px] rounded-full bg-[#191919] border border-[#363636] text-[#FFFFFF] flex items-center justify-center hover:bg-[#262525] transition-colors disabled:opacity-50"
                aria-label="Remove logo"
              >
                <FiX size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[#FFFFFF] font-[Manrope] font-medium text-[18px]">
              About Your Events
            </h3>

            <span className="text-[#777777] font-[Manrope] text-[13px]">
              Optional
            </span>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about the kind of events you create..."
            rows={5}
            disabled={loading}
            className="w-full rounded-[30px] px-[25px] sm:px-[30px] py-[18px] bg-[#191919] border-[2px] border-[#262525] outline-none text-[#FFFFFF] placeholder:text-[#777777] font-[Manrope] text-[15px] sm:text-[16px] leading-[140%] resize-none focus:border-[#995DFF] transition-colors disabled:opacity-60"
          />
        </div>

        {/* Info */}
        <div className="rounded-[30px] px-[25px] sm:px-[30px] py-[18px] bg-[#110B1A] border-[2px] border-[#262525]">
          <p className="text-[#CECECE] font-[Manrope] text-[13px] sm:text-[14px] leading-[140%]">
            Your creator application will be reviewed before you can start
            creating and publishing events on Tix-Arena.
          </p>
        </div>

        {/* Continue */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading || !businessName.trim()}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Continue"}
        </button>
      </div>
    </AuthLayout>
  );
};

export default OnboardingStep3;
