import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const HelpCenter = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const helpSections = [
    {
      title: "Tickets & Bookings",
      questions: [
        {
          question: "How do I book a ticket?",
          answer:
            "Go to the Explore page and find the event you want to attend. Click on the event to view its details, select your preferred ticket type and quantity, then click Book Ticket and complete your payment. After successful payment, your ticket will be available in your tickets section.",
        },
        {
          question: "Where do I find my ticket after booking?",
          answer:
            "After your payment has been completed successfully, your ticket will be available in the Tickets section of your account. Click the ticket icon in the navigation bar to view your booked tickets and ticket details.",
        },
        {
          question: "What happens if a ticket tier sells out?",
          answer:
            "Once a ticket tier reaches its available quantity, it can no longer be purchased. You can check if the event has another available ticket tier or look for another event.",
        },
      ],
    },
    {
      title: "Hosting Events",
      questions: [
        {
          question: "How do I become an organizer?",
          answer:
            "Create an account and complete the organizer registration process. Once your information has been submitted, your account will go through the required approval process. After approval, you can create and manage your events.",
        },
        {
          question: "How long does event approval take?",
          answer:
            "Event approval depends on the review process. Once your event has been submitted, it will remain pending until it has been reviewed and approved by the appropriate administrator.",
        },
        {
          question: "Can I edit an event after publishing it?",
          answer:
            "Yes. If you need to make changes to your event, go to your event management dashboard, select the event, and choose the edit option. Make your changes and save them.",
        },
      ],
    },
    {
      title: "Account & Security",
      questions: [
        {
          question: "How do I reset my password?",
          answer:
            "Go to the Sign In page and select the Forgot Password option. Follow the instructions sent to your registered email address to create a new password.",
        },
        {
          question: "Is my payment or personal information safe?",
          answer:
            "We take the security of your account and personal information seriously. Payment information is handled through our secure payment process, and your account information should never be shared with anyone.",
        },
      ],
    },
  ];

  const handleQuestionClick = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="min-h-screen  text-white px-5 sm:px-8 md:px-15 py-10 md:py-16">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto">
        <p className="text-[#995DFF] text-sm mb-4">Help Center</p>

        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          How can we help?
        </h1>

        <p className="text-[#ABABAB] text-sm md:text-base max-w-2xl mb-12">
          Answers to the questions we get asked most, plus how to reach us
          directly.
        </p>

        {/* HELP SECTIONS */}
        <div className="space-y-10">
          {helpSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl md:text-2xl font-medium mb-4">
                {section.title}
              </h2>

              <div className="border border-[#2A2A2A] rounded-2xl overflow-hidden">
                {section.questions.map((item) => {
                  const isOpen = openQuestion === item.question;

                  return (
                    <div
                      key={item.question}
                      className="border-b border-[#2A2A2A] last:border-b-0"
                    >
                      {/* QUESTION */}
                      <button
                        type="button"
                        onClick={() => handleQuestionClick(item.question)}
                        className="w-full flex items-center justify-between px-5 py-5 hover:bg-[#1E1E1E] transition"
                      >
                        <span className="text-sm md:text-base text-left">
                          {item.question}
                        </span>

                        <IoIosArrowForward
                          className={`text-[#ABABAB] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                          size={18}
                        />
                      </button>

                      {/* ANSWER */}
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-[#ABABAB] text-sm md:text-base leading-7 max-w-4xl">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
