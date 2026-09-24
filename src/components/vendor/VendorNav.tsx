import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

import logo from "../../assets/images/vendorImages/Vendor-logo.svg";
import backArrow from "../../assets/images/vendorImages/backArrow.svg";
import refresh from "../../assets/images/vendorImages/Refresh.svg";
import prof from "../../assets/images/vendorImages/profile.svg";
import arrDwn from "../../assets/images/vendorImages/arrow-down.svg";

import { useAuth } from "../../contexts/AuthContext";

const VendorNav = () => {
  const { user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayName = user?.firstName || user?.lastName || "Creator";

  return (
    <>
      {/* =====================================================
          DESKTOP NAVBAR
      ===================================================== */}

      <div className="hidden md:flex w-full items-center border-b border-[#262525] bg-[#0B0B0B]">
        {/* LEFT SIDE */}
        <div className="w-[22%] flex justify-between items-center px-6 py-4.5 border-r border-[#262525]">
          <img src={logo} alt="Tix-Arena" className="max-w-[150px] h-auto" />

          <img src={backArrow} alt="Back" className="cursor-pointer" />
        </div>

        {/* RIGHT SIDE */}
        <div className="py-[12.5px] px-6 flex items-center justify-between w-[78%] border-l border-[#262525]">
          <h2 className="font-semibold text-[23px] text-[#ABABAB]">
            Welcome!, <span className="text-[#FFFFFF]">{displayName}</span>
          </h2>

          <div className="flex items-center gap-3.5">
            {/* SWITCH TO BROWSER */}
            <div className="flex items-center gap-2.5 px-3.5 py-4.25 bg-[#262525] rounded-[30px] cursor-pointer hover:bg-[#303030] transition-colors">
              <img src={refresh} alt="" className="w-[18px] h-[18px]" />

              <p className="font-normal text-[16px] text-[#FFFFFF]">
                Switch to Browser
              </p>
            </div>

            {/* PROFILE */}
            <img
              src={user?.avatar || prof}
              alt="Profile"
              className="w-[42px] h-[42px] rounded-full object-cover"
            />

            <img
              src={arrDwn}
              alt="Open profile menu"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVBAR
      ===================================================== */}

      <div className="md:hidden w-full border-b border-[#262525] bg-[#0B0B0B]">
        <div className="w-full min-h-[70px] px-4 flex items-center justify-between">
          {/* LOGO */}
          <img src={logo} alt="Tix-Arena" className="w-[125px] h-auto" />

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || prof}
              alt="Profile"
              className="w-[36px] h-[36px] rounded-full object-cover"
            />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-[40px] h-[40px] rounded-full bg-[#191919] border border-[#262525] flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiOutlineX size={22} />
              ) : (
                <HiOutlineMenu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="w-full border-t border-[#262525] bg-[#0F0F0F] px-4 py-4">
            <div className="flex flex-col gap-3">
              {/* WELCOME */}
              <div className="px-4 py-3 rounded-[20px] bg-[#191919]">
                <p className="font-[Manrope] text-[12px] text-[#777777]">
                  Welcome
                </p>

                <p className="font-[Manrope] text-[15px] text-white mt-1">
                  {displayName}
                </p>
              </div>

              {/* SWITCH TO BROWSER */}
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[20px] bg-[#191919] text-left"
              >
                <img src={refresh} alt="" className="w-[18px] h-[18px]" />

                <span className="font-[Manrope] text-[14px] text-white">
                  Switch to Browser
                </span>
              </button>

              {/* PROFILE */}
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[20px] bg-[#191919] text-left"
              >
                <img
                  src={user?.avatar || prof}
                  alt=""
                  className="w-[32px] h-[32px] rounded-full object-cover"
                />

                <span className="font-[Manrope] text-[14px] text-white">
                  Profile
                </span>

                <img
                  src={arrDwn}
                  alt=""
                  className="w-[16px] h-[16px] ml-auto"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VendorNav;
