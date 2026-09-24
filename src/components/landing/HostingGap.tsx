import React from "react";
import flower from "../../assets/images/landingPage/flower.svg";
import girl from "../../assets/images/landingPage/image 15 (1).png";
import people from "../../assets/images/landingPage/030b723a3d9c5bf6714ea159f717b57b0729cd48.png";
import { IoIosStar } from "react-icons/io";
import fineboy from "../../assets/images/landingPage/Ellipse 4.svg";
import red from "../../assets/images/landingPage/Frame 45.png";

const HostingGap = () => {
  return (
    <section className="flex justify-center mt-16 mb-32 px-4 text-white">
      <div className="w-full max-w-[1020px]">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-Instrument Serif font-normal leading-tight instrument-serif">
            Loved by Event Lovers Everywhere
          </h1>

          <p className="text-[#CECECE] text-[16px] sm:text-[18px] md:text-[20px] font-inter font-normal max-w-[700px] mx-auto mt-4 leading-7">
            From unforgettable concerts to seamless bookings, people are
            discovering and enjoying events like never before.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-[200px_250px_1fr] gap-6 mt-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 h-auto lg:h-[498px]">
            {/* Award */}
            <div className="relative h-[150px] shrink-0 rounded-3xl overflow-hidden border border-[#1E1E1E]">
              <img
                src={flower}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
                <p className="text-[#CECECE]">winner</p>

                <h3 className="text-white font-medium text-[30px] leading-8">
                  Most Innovative Company
                </h3>
              </div>
            </div>

            {/* Girl */}
            <div className="relative h-[320px] lg:flex-1 lg:min-h-0 rounded-3xl overflow-hidden border border-[#1E1E1E]">
              <img
                src={girl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 p-4 text-center bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-medium text-[20px]">
                  Vibe City Live 2.0
                </p>

                <p className="text-[#CECECE] text-sm font-semibold">
                  18 June 2025
                </p>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="flex flex-col gap-6 h-auto lg:h-[498px]">
            {/* People */}
            <div className="relative h-[350px] lg:flex-1 lg:min-h-0 rounded-3xl overflow-hidden border border-[#1E1E1E]">
              <img
                src={people}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-4xl leading-none">“</p>

                  <p className="font-Manrope font-semibold text-white text-[16px] leading-6">
                    The event reminders and updates were really helpful.
                    Everything felt organized from start to finish.
                  </p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="h-[110px] shrink-0 border border-[#1E1E1E] rounded-3xl flex flex-col justify-center items-center text-center">
              <p className="text-[30px] font-bold leading-8">4.80</p>

              <p className="text-[18px] font-medium font-serif">
                2,146 Reviews
              </p>

              <div className="flex text-amber-300 items-center justify-center">
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="h-auto lg:h-[498px] min-w-0">
            {/* Amanda */}
            <div className="border border-[#1E1E1E] rounded-3xl p-5 min-h-[150px] lg:h-[150px]">
              <div className="flex items-center gap-2 mb-3">
                <img src={fineboy} alt="" className="w-10 h-10" />

                <p className="font-medium">Amanda K</p>
              </div>

              <p className="text-[#CECECE] text-sm leading-5">
                “The interface is clean, fun, and super easy to use. Definitely
                my new go-to platform for nightlife events and discovering
                exciting experiences happening around the city every single
                weekend.”
              </p>
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Stats */}
              <div className="border border-[#1E1E1E] rounded-3xl overflow-hidden">
                <div className="min-h-[107px] flex flex-col items-center justify-center text-center border-b border-[#1E1E1E] px-3 py-4">
                  <p className="text-[26px] font-bold">50k</p>

                  <p className="text-sm text-[#CECECE]">
                    Tickets Successfully Booked
                  </p>
                </div>

                <div className="min-h-[107px] flex flex-col items-center justify-center text-center border-b border-[#1E1E1E] px-3 py-4">
                  <p className="text-[26px] font-bold">1,200k</p>

                  <p className="text-sm text-[#CECECE]">
                    Tickets Successfully Booked
                  </p>
                </div>

                <div className="min-h-[107px] flex flex-col items-center justify-center text-center px-3 py-4">
                  <p className="text-[26px] font-bold">98%</p>

                  <p className="text-sm text-[#CECECE]">
                    Tickets Successfully Booked
                  </p>
                </div>
              </div>

              {/* Red */}
              <div className="relative h-[330px] rounded-3xl border border-[#1E1E1E] overflow-hidden">
                <img
                  src={red}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 pt-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <p className="text-4xl text-center font-bold text-white">“</p>

                  <p className="text-center font-semibold text-[18px] leading-6">
                    I discovered so many exciting events I wouldn’t have known
                    about otherwise. The experience feels modern and exciting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostingGap;
