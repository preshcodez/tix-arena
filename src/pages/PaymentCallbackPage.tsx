import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import api from "../api/axios";

const PaymentCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const ticketId = searchParams.get("ticketId");
      const reference = searchParams.get("reference");

      if (!ticketId || !reference) {
        setStatus("error");
        setErrorMessage(
          "Payment information is missing. We could not verify your payment.",
        );
        return;
      }

      try {
        const response = await api.post(`/api/tickets/${ticketId}/verify`, {
          reference,
        });

        if (response.data?.success) {
          setStatus("success");

          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        } else {
          setStatus("error");
          setErrorMessage(
            response.data?.message || "Payment verification failed.",
          );
        }
      } catch (err: any) {
        console.error("Payment verification error:", err);

        setStatus("error");
        setErrorMessage(
          err?.response?.data?.message ||
            "We could not verify your payment. Please try again.",
        );
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5F3FF] text-[#171717]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#995DFF]/20 blur-[130px]" />

        <div className="absolute -right-40 -top-20 h-[450px] w-[450px] rounded-full bg-[#7C3AED]/15 blur-[130px]" />

        <div className="absolute -bottom-60 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#995DFF]/10 blur-[140px]" />

        <div className="absolute left-[8%] top-[18%] h-32 w-32 rounded-full border border-[#995DFF]/10" />

        <div className="absolute left-[11%] top-[21%] h-16 w-16 rounded-full border border-[#995DFF]/10" />

        <div className="absolute bottom-[15%] right-[8%] h-40 w-40 rounded-full border border-[#995DFF]/10" />

        <div className="absolute bottom-[20%] right-[11%] h-20 w-20 rounded-full border border-[#995DFF]/10" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#995DFF 1px, transparent 1px), linear-gradient(90deg, #995DFF 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Main */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
        <div className="w-full max-w-[620px]">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Tix<span className="text-[#995DFF]">Arena</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your event. Your ticket. Your experience.
            </p>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-[32px] border border-black/[0.06] bg-white/95 shadow-[0_30px_90px_rgba(0,0,0,0.10)] backdrop-blur-xl">
            {/* Purple top line */}
            <div className="h-[5px] w-full bg-gradient-to-r from-[#7C3AED] via-[#995DFF] to-[#C084FC]" />

            {/* Loading */}
            {status === "loading" && (
              <div className="px-8 py-16 text-center sm:px-14">
                <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#995DFF]/15" />

                  <div className="absolute inset-3 rounded-full border border-[#995DFF]/20" />

                  <div className="absolute inset-6 animate-spin rounded-full border-[3px] border-[#995DFF]/15 border-t-[#995DFF]" />

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#995DFF]/10">
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#995DFF"
                      strokeWidth="2"
                    >
                      <path d="M12 6v6l4 2" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#995DFF]">
                  Please wait
                </p>

                <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
                  Verifying Your Payment
                </h1>

                <p className="mx-auto max-w-md text-[15px] leading-7 text-gray-500">
                  We&apos;re securely confirming your payment with Paystack.
                  Please don&apos;t close this page.
                </p>

                <div className="mx-auto mt-10 max-w-sm">
                  <div className="mb-3 flex justify-between text-xs text-gray-400">
                    <span>Payment verification</span>
                    <span>Processing...</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-[#995DFF]" />
                  </div>
                </div>
              </div>
            )}

            {/* Success */}
            {status === "success" && (
              <div className="px-8 py-16 text-center sm:px-14">
                <div className="relative mx-auto mb-8 h-28 w-28">
                  <div className="absolute inset-0 rounded-full bg-[#995DFF]/20 blur-2xl" />

                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#995DFF]/20 bg-[#995DFF]/10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#995DFF] shadow-[0_0_40px_rgba(153,93,255,0.30)]">
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#995DFF]">
                  Payment Confirmed
                </p>

                <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
                  Ticket Purchased!
                </h1>

                <p className="mx-auto max-w-md text-[15px] leading-7 text-gray-500">
                  Your payment was successful and your ticket has been
                  confirmed. You&apos;re all set for the event!
                </p>

                <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#995DFF]/10 bg-[#FAF9FF] text-left">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#995DFF]/5" />

                  <div className="flex items-center justify-between border-b border-[#995DFF]/10 px-5 py-4">
                    <span className="text-sm text-gray-500">
                      Payment Status
                    </span>

                    <span className="flex items-center gap-2 text-sm font-semibold text-[#7C3AED]">
                      <span className="h-2 w-2 rounded-full bg-[#995DFF]" />
                      Successful
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-gray-500">Ticket Status</span>

                    <span className="rounded-full bg-[#995DFF]/10 px-3 py-1 text-xs font-semibold text-[#7C3AED]">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-4 text-sm text-gray-400">
                    Taking you to your tickets...
                  </p>

                  <div className="mx-auto h-1 max-w-xs overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-full origin-left animate-[shrink_3s_linear] rounded-full bg-[#995DFF]" />
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <div className="px-8 py-16 text-center sm:px-14">
                <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-red-500/10 blur-2xl" />

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-red-500/15 bg-red-50">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-100">
                      <span className="text-3xl font-bold text-red-500">!</span>
                    </div>
                  </div>
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                  Something went wrong
                </p>

                <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
                  Payment Not Verified
                </h1>

                <p className="mx-auto max-w-md text-[15px] leading-7 text-gray-500">
                  {errorMessage}
                </p>

                <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/70 px-5 py-4 text-left">
                  <p className="text-sm leading-6 text-gray-500">
                    If money was deducted from your account, don&apos;t worry.
                    Please contact support with your payment reference so we can
                    help you resolve it.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => navigate("/explore")}
                    className="w-full rounded-full bg-[#995DFF] px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-[#7C3AED] hover:shadow-[0_10px_30px_rgba(153,93,255,0.25)]"
                  >
                    Browse Events
                  </button>

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full rounded-full border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-900 transition-all duration-200 hover:border-[#995DFF]/40 hover:bg-[#FAF9FF]"
                  >
                    Go to Profile
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>

            <span>Secure payment powered by Paystack</span>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }

          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentCallbackPage;
