import { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import verificationBg from "../../assets/images/authImages/verificationBg.png";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";

interface VerifyEmailModalProps {
  email: string;
  onSuccess: () => void;
  onClose: () => void;
}

const VerifyEmailModal = ({
  email,
  onSuccess,
  onClose,
}: VerifyEmailModalProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleVerifyEmail = async () => {
    if (!code) {
      toast.error("Please enter your verification code.");
      return;
    }

    if (code.length !== 4) {
      toast.error("Verification code must be 4 digits.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/verify-email", {
        email: email.trim().toLowerCase(),
        otp: code,
      });

      console.log("VERIFY EMAIL RESPONSE:", response.data);

      // Backend returns:
      // response.data.data.token
      // response.data.data.user
      const { token, user } = response.data.data;

      // Save verified user + JWT
      login(user, token);

      toast.success("Email verified successfully!");

      // Move to onboarding
      onSuccess();
    } catch (error: any) {
      console.error("VERIFY EMAIL ERROR:", error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
          "Invalid or expired verification code.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center pt-[100px] z-50">
      <div className="w-[580px] rounded-[30px] overflow-hidden bg-[#0C0C0C] flex flex-col gap-[22px] p-[20px]">
        <div
          className="relative rounded-t-[20px] overflow-hidden"
          style={{
            backgroundImage: `url(${verificationBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "140px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, #0C0C0C 0%, rgba(12,12,12,0.3) 100%)",
            }}
          />

          <div className="relative z-10 p-[20px]">
            <h2 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[45px] leading-[100%] tracking-[-0.01em] mb-[8px]">
              Check your Email for a Code
            </h2>

            <p className="text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em]">
              Check your inbox and enter the code we have sent you.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
          <div className="flex items-center gap-[12px]">
            <IoLockClosedOutline size={24} className="text-[#838383]" />

            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4 digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="bg-transparent outline-none font-[Manrope] font-medium text-[16px] tracking-[-0.01em]"
              style={{ color: "#ABABAB" }}
            />
          </div>

          <span
            onClick={onClose}
            className="text-[#995DFF] font-[Manrope] font-medium text-[16px] cursor-pointer"
          >
            Change Email
          </span>
        </div>

        <button
          type="button"
          onClick={handleVerifyEmail}
          disabled={loading}
          className="w-full h-[62px] rounded-[30px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Submit"}
        </button>

        <p className="font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]">
          <span className="text-[#CECECE]">Didn't get any code? </span>

          <span className="text-[rgb(153,93,255)] cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
