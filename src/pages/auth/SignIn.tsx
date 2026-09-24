import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      const { user, token } = response.data.data;

      // Save user + token
      login(user, token);

      // Already completed onboarding
      if (user.onboardingCompleted) {
        navigate("/explore");
      } else {
        // Continue onboarding
        navigate("/onboarding/step1");
      }
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Incorrect email or password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] mx-auto flex flex-col gap-[22px] text-center sm:text-left">
        {/* Heading */}
        <div className="w-full flex flex-col gap-[8px] sm:gap-[2px]">
          <h1 className="w-full text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[40px] sm:text-[45px] leading-[110%] sm:leading-[100%] tracking-[-0.02em] text-left">
            Welcome Back
          </h1>

          <p className="w-full max-w-[450px]  sm:mx-0 text-[#CECECE] font-[Manrope] font-normal text-[16px] leading-[140%] tracking-[-0.01em] text-left">
            Sign in to continue exploring events, manage your bookings, and stay
            updated on what's happening next.
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_API_URL
            }/api/auth/google`;
          }}
          className="flex items-center justify-center gap-[12px] w-full h-[62px] rounded-[30px] px-[18px] py-[20px] border border-[#333333] bg-[#0C0C0C] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em] cursor-pointer"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 w-full h-5.5 rounded-[30px]">
          <div className="flex-1 border-2 border-[#262525]" />

          <span className="shrink-0 text-[#ABABAB] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em]">
            or
          </span>

          <div className="flex-1 border-2 border-[#262525]" />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-[14px] w-full">
          {/* Email */}
          <div className="flex items-center gap-[7px] w-full h-[62px] rounded-[30px] border-2 border-[#262525] bg-[#191919] px-4.5 py-5">
            <HiOutlineMail
              size={20}
              className="shrink-0 text-[#838383]"
              style={{ strokeWidth: 1.5 }}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your mail"
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
        </div>

        {/* Login */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%] tracking-[-0.01em] text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Sign Up */}
        <Link
          to="/signup"
          className="w-full font-[Manrope] font-medium text-[16px] leading-[140%] tracking-[-0.01em] text-center sm:text-left"
        >
          <span className="text-[#CECECE]">Don't you have an account? </span>

          <span className="text-[#995DFF] cursor-pointer">Sign Up</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
