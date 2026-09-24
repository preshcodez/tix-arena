import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import { toast } from "react-toastify";

import VerifyEmailModal from "../../components/auth/VerifyEmailModal";
import AuthLayout from "../../layouts/AuthLayout";
import api from "../../api/axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    console.log("SIGN UP BUTTON CLICKED");
    console.log("API URL:", import.meta.env.VITE_API_URL);

    if (!firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!lastName.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      console.log("REGISTER SUCCESS:", response.data);

      setShowModal(true);
    } catch (error: any) {
      console.log("REGISTER ERROR:", error.response?.data || error);

      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] mx-auto flex flex-col gap-[22px] text-left px-4 sm:px-0">
        {/* Heading */}
        <div className="w-full flex flex-col gap-[8px] sm:gap-[2px]">
          <h1 className="w-full text-[#ffffff] font-['Instrument_Serif'] font-normal text-[45px] leading-[110%] sm:leading-[100%] tracking-[-0.02em] text-left ">
            Create Your Account
          </h1>

          <p className="w-full sm:w-[450px] mx-auto sm:mx-0 text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em] text-left">
            Create an account to explore events, manage your bookings, and stay
            updated on what's happening next.
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center gap-[12px] w-full h-[62px] rounded-[30px] px-[18px] py-[20px] border border-[#333333] bg-[#0C0C0C] text-[#FFFFFF] font-[Manrope] font-[500] text-[16px] leading-[140%] tracking-[-0.01em] cursor-pointer"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* OR */}
        <div className="flex items-center gap-2 w-full h-5.5 rounded-[30px]">
          <div className="flex-1 border-2 border-[#262525]" />

          <span className="shrink-0 text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em]">
            or
          </span>

          <div className="flex-1 border-2 border-[#262525]" />
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-[14px] w-full">
          {/* First Name + Last Name */}
          <div className="flex flex-col sm:flex-row gap-[14px] sm:gap-5 w-full">
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full sm:w-[262px] h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5 text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em] outline-none"
            />

            <input
              type="text"
              placeholder="Enter your surname/Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full sm:w-[262px] h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5 text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em] outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-[7px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
            <HiOutlineMail
              size={20}
              className="shrink-0 text-[#838383]"
              style={{ strokeWidth: 1.5 }}
            />

            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
            />
          </div>

          {/* Password */}
          <div className="flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
            <div className="flex items-center gap-[12px] min-w-0 flex-1 h-[24px]">
              <IoLockClosedOutline
                size={24}
                className="shrink-0 text-[#838383]"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your New Password"
                className="min-w-0 flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="shrink-0"
            >
              {showPassword ? (
                <PiEyeLight size={20} className="text-[#838383]" />
              ) : (
                <PiEyeClosedLight size={20} className="text-[#838383]" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center justify-between gap-[12px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
            <div className="flex items-center gap-[12px] min-w-0 flex-1 h-[24px]">
              <IoLockClosedOutline
                size={24}
                className="shrink-0 text-[#838383]"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your New Password"
                className="min-w-0 flex-1 bg-transparent outline-none text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em]"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="shrink-0"
            >
              {showConfirmPassword ? (
                <PiEyeLight size={20} className="text-[#838383]" />
              ) : (
                <PiEyeClosedLight size={20} className="text-[#838383]" />
              )}
            </button>
          </div>
        </div>

        {/* Create Account Button */}
        <button
          type="button"
          onClick={handleSignUp}
          disabled={loading}
          className={`w-full h-[62px] rounded-[30px] px-[17px] py-[14px] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#995DFF]"
          }`}
        >
          {loading ? "Creating Account..." : "Create Your Account"}
        </button>

        {/* Login */}
        <p className="w-full font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em] text-center sm:text-left">
          <span className="text-[#CECECE]">
            Do you have an account?{" "}
          </span>

          <span
            onClick={() => navigate("/signin")}
            className="text-[#995DFF] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>

      {/* Verify Email Modal */}
      {showModal && (
        <VerifyEmailModal
          email={email}
          onSuccess={() => navigate("/onboarding/step1")}
          onClose={() => setShowModal(false)}
        />
      )}
    </AuthLayout>
  );
};

export default SignUp;