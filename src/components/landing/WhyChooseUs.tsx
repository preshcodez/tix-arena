import React from "react";
import { Link } from "react-router-dom";

import free from "../../assets/images/landingPage/Layer_1.svg";
import speaker from "../../assets/images/landingPage/Frame.svg";
import booking from "../../assets/images/landingPage/Layer_1 (1).svg";
import backgroundImg from "../../assets/images/landingPage/50c3949d293f5b3f71bdb0102c53d413a83d949e (1).png";

const WhyChooseUs = () => {
  return (
    <div>
      {/* Why Choose Us */}
      <div className="flex justify-center mt-12 px-4">
        <div className="w-full max-w-[1020px]">
          <h2 className="text-[40px] sm:text-[50px] md:text-[60px] font-Instrument Serif font-normal text-white">
            Why Choose Us
          </h2>

          <div className="flex flex-col md:flex-row justify-between gap-4 mt-5">
            {/* Register for Free */}
            <Link
              to="/signup"
              className="border border-[#1E1E1E] hover:border-[#995DFF] rounded-3xl px-4 py-2 w-full md:w-[300px] min-h-[100px] transition"
            >
              <div className="flex gap-3 items-center h-full">
                <div className="shrink-0">
                  <img src={free} alt="" />
                </div>

                <div className="text-left">
                  <p className="font-bold text-lg text-white">
                    Register for Free
                  </p>

                  <p className="text-[#CECECE] text-sm">
                    Sign up with email or Google and create events in minutes.
                  </p>
                </div>
              </div>
            </Link>

            {/* Promote Your Event */}
            <Link
              to="/vendor"
              className="border border-[#1E1E1E] hover:border-[#995DFF] rounded-3xl px-4 py-2 w-full md:w-[300px] min-h-[100px] transition"
            >
              <div className="flex gap-3 items-center h-full">
                <div className="shrink-0">
                  <img src={speaker} alt="" />
                </div>

                <div className="text-left">
                  <p className="font-bold text-lg text-white">
                    Promote Your Event
                  </p>

                  <p className="text-[#CECECE] text-sm">
                    Share on social media & email in a few clicks.
                  </p>
                </div>
              </div>
            </Link>

            {/* Fast Booking */}
            <Link
              to="/explore"
              className="border border-[#1E1E1E] hover:border-[#995DFF] rounded-3xl px-4 py-2 w-full md:w-[300px] min-h-[100px] transition"
            >
              <div className="flex gap-3 items-center h-full">
                <div className="shrink-0">
                  <img src={booking} alt="" />
                </div>

                <div className="text-left">
                  <p className="font-bold text-lg text-white">Fast Booking</p>

                  <p className="text-[#CECECE] text-sm">
                    Swift payments with top-notch security.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Hosting an Event */}
      <div className="flex items-center justify-center px-4">
        <div className="relative w-full max-w-[1020px] h-[350px] mt-10 overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url("${backgroundImg}")`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
            <div className="relative px-6 sm:px-10 md:px-20 mt-15 flex flex-col items-start text-white">
              <h2 className="text-[40px] sm:text-[50px] md:text-[60px] font-Instrument Serif font-normal">
                Hosting an event?
              </h2>

              <p className="text-[#CECECE] text-sm max-w-[350px] leading-6">
                Create, manage, and sell tickets effortlessly while reaching the
                right audience.
              </p>

              <Link
                to="/vendor"
                className="bg-[#995DFF] text-white px-4 py-2 rounded-full mt-5"
              >
                List Your Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
