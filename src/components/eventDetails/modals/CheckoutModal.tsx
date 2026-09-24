import { useState } from "react";
import Paystack from "@paystack/inline-js";

import cancelIcon from "../../../assets/images/eventsImages/name.svg";
import { useEvents } from "../../../contexts/EventContext";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../api/axios";

interface CheckoutModalProps {
  isOpen: boolean;
  ticketCount: number;
  ticketType: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal = ({
  isOpen,
  ticketCount,
  ticketType,
  onClose,
  onSuccess,
}: CheckoutModalProps) => {
  const { selectedEvent } = useEvents();
  const { user } = useAuth();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "";

  const email = user?.email || "";

  const selectedTicket = selectedEvent?.tickets?.find(
    (ticket) => ticket.name === ticketType,
  );

  const ticketPrice = selectedTicket?.price ?? selectedEvent?.price ?? 0;

  const totalPrice = ticketPrice * ticketCount;

  const formatPrice = (price: number) => {
    if (price === 0) {
      return "Free";
    }

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("Please sign in before purchasing a ticket.");
      return;
    }

    if (!selectedEvent?._id) {
      setError("Event information is missing.");
      return;
    }

    if (!ticketType) {
      setError("Please select a ticket type.");
      return;
    }

    if (!selectedTicket) {
      setError("The selected ticket is no longer available.");
      return;
    }

    if (selectedTicket.quantity < ticketCount) {
      setError("There are not enough tickets available.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1. Create the ticket
      const response = await api.post("/api/tickets/book", {
        eventId: selectedEvent._id,
        phoneNumber: phone.trim() || undefined,
        ticketType,
        quantity: ticketCount,
      });

      const ticket = response.data?.data;

      if (!ticket?._id) {
        throw new Error("Ticket could not be created.");
      }

      // 2. Free ticket - skip Paystack
      if (Number(ticket.totalAmount) === 0) {
        setLoading(false);
        onSuccess();
        return;
      }

      // 3. Initialize Paystack payment
      const paymentResponse = await api.post(`/api/tickets/${ticket._id}/pay`);

      const payment = paymentResponse.data?.data;

      if (!payment?.accessCode) {
        throw new Error("Unable to start payment.");
      }

      // 4. Open Paystack popup
      const paystack = new Paystack();

      paystack.resumeTransaction(payment.accessCode, {
        // 5. Payment successful
        onSuccess: async (transaction) => {
          try {
            setLoading(true);
            setError("");

            // 6. Verify payment with backend
            const verifyResponse = await api.post(
              `/api/tickets/${ticket._id}/verify`,
              {
                reference: transaction.reference,
              },
            );

            if (verifyResponse.data?.success) {
              setLoading(false);
              onSuccess();
            } else {
              setError(
                verifyResponse.data?.message || "Payment verification failed.",
              );
              setLoading(false);
            }
          } catch (err: any) {
            console.error("Payment verification error:", err);

            setError(
              err?.response?.data?.message ||
                "Payment was successful, but we could not verify it. Please try again.",
            );

            setLoading(false);
          }
        },

        // 7. User cancelled Paystack
        onCancel: () => {
          setLoading(false);
          setError("Payment was cancelled.");
        },

        // 8. Paystack error
        onError: (error) => {
          setLoading(false);
          setError(error?.message || "Unable to load payment.");
        },
      });
    } catch (err: any) {
      console.error("Checkout Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.",
      );

      setLoading(false);
    }
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
        bg-black/50
        px-4
        py-6
        overflow-y-auto
        max-sm:px-3
      "
    >
      <div
        className="
          relative
          w-full
          max-w-lg
          max-h-[calc(100vh-48px)]
          overflow-y-auto
          rounded-2xl
          border-2
          border-[#2A2A2A]
          bg-[#0B0B0B]
          px-8
          py-5
          shadow-2xl

          max-sm:max-h-[calc(100vh-32px)]
          max-sm:rounded-[18px]
          max-sm:px-5
          max-sm:py-5
        "
      >
        {/* Close button */}
        <button
          type="button"
          className="
            absolute
            right-4
            top-4
            cursor-pointer

            max-sm:right-3
            max-sm:top-3
          "
          onClick={onClose}
          disabled={loading}
        >
          <img
            src={cancelIcon}
            alt="Close"
            className="
              h-7
              w-7

              max-sm:h-6
              max-sm:w-6
            "
          />
        </button>

        {/* Heading */}
        <h2
          className="
            mb-3
            pr-10
            text-[38px]
            font-bold
            text-white

            max-sm:mb-2
            max-sm:text-[28px]
          "
        >
          Checkout
        </h2>

        <p
          className="
            mb-3
            text-[21px]
            text-white

            max-sm:mb-3
            max-sm:text-[17px]
          "
        >
          Order Summary
        </p>

        {/* Ticket Summary */}
        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            gap-4
            text-white
          "
        >
          <div className="min-w-0">
            <p className="font-medium truncate">{ticketType || "Ticket"}</p>

            <p className="text-sm text-gray-400">
              {ticketCount} ticket
              {ticketCount > 1 ? "s" : ""}
            </p>
          </div>

          <span className="shrink-0 text-sm sm:text-base">
            {formatPrice(ticketPrice * ticketCount)}
          </span>
        </div>

        {/* Total */}
        <div
          className="
            mb-4
            flex
            justify-between
            gap-4
            border-t
            border-[#262525]
            pt-3
            font-semibold
            text-white
          "
        >
          <span>
            Total ({ticketCount} ticket
            {ticketCount > 1 ? "s" : ""})
          </span>

          <span className="shrink-0">{formatPrice(totalPrice)}</span>
        </div>

        {/* Full Name */}
        <label className="mb-1 block text-sm text-white">Full Name</label>

        <input
          type="text"
          value={fullName}
          disabled
          className="
            mb-3
            w-full
            cursor-not-allowed
            rounded-[30px]
            border
            border-[#2A2A2A]
            bg-[#191919]
            px-4
            py-2.5
            text-gray-300
            outline-none

            max-sm:py-2.5
          "
        />

        {/* Email */}
        <label className="mb-1 block text-sm text-white">Email</label>

        <input
          type="email"
          value={email}
          disabled
          className="
            mb-3
            w-full
            cursor-not-allowed
            rounded-[30px]
            border
            border-[#2A2A2A]
            bg-[#191919]
            px-4
            py-2.5
            text-gray-300
            outline-none

            max-sm:py-2.5
          "
        />

        {/* Phone */}
        <label className="mb-1 block text-sm text-white">Phone</label>

        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
          className="
            mb-3
            w-full
            rounded-[30px]
            border
            border-[#2A2A2A]
            bg-[#191919]
            px-4
            py-2.5
            text-white
            placeholder-gray-500
            outline-none
            focus:border-[#995DFF]

            max-sm:py-2.5
          "
        />

        {/* Error */}
        {error && (
          <p className="mb-3 text-sm leading-5 text-red-400">{error}</p>
        )}

        {/* Pay / Register Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !selectedTicket}
          className="
            w-full
            rounded-[30px]
            border-2
            border-[#995DFF]
            bg-[#995DFF]
            px-5
            py-2.5
            font-medium
            text-white
            transition-colors
            hover:bg-[#7C3AED]
            disabled:cursor-not-allowed
            disabled:opacity-50

            max-sm:py-3
          "
        >
          {loading
            ? "Processing..."
            : totalPrice > 0
              ? `Pay ${formatPrice(totalPrice)}`
              : "Complete Registration"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
