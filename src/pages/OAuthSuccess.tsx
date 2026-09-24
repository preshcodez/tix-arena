import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const hasExchanged = useRef(false);

  useEffect(() => {
    if (hasExchanged.current) return;

    hasExchanged.current = true;

    const exchangeCode = async () => {
      const code = searchParams.get("code");

      if (!code) {
        toast.error("Google authentication failed.");
        navigate("/signin");
        return;
      }

      try {
        const response = await api.post("/api/auth/google/exchange", {
          code,
        });

        console.log("GOOGLE LOGIN SUCCESS:", response.data);

        const { user, token } = response.data.data;

        login(user, token);

        if (user.onboardingCompleted) {
          navigate("/explore");
        } else {
          navigate("/onboarding/step1");
        }
      } catch (error: any) {
        console.error("GOOGLE EXCHANGE ERROR:", error.response?.data || error);

        toast.error(
          error.response?.data?.message || "Google authentication failed.",
        );

        navigate("/signin");
      }
    };

    exchangeCode();
  }, [navigate, searchParams, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] text-white">
      <p className="text-lg">Completing Google sign in...</p>
    </div>
  );
};

export default OAuthSuccess;
