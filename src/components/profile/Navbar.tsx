import { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { CiSearch, CiCircleQuestion } from "react-icons/ci";
import { LuUser, LuTicket, LuMenu, LuX } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/landingPage/Frame 21.svg";
import { useSearch } from "../../contexts/SearchContext";
import { useAuth } from "../../contexts/AuthContext";
import NavUserMenu from "../NavUserMenu";

const NavBar = () => {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useSearch();
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleHelpClick = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);

    navigate("/help");
  };

  return (
    <nav className="relative border-b border-[#1E1E1E] px-5 sm:px-8 md:px-15 py-5 md:py-10">
      {/* =====================================================
          DESKTOP NAVBAR
      ====================================================== */}
      <div className="hidden md:flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex gap-4">
          <div className="flex gap-[30px] items-center">
            <Link to="/explore" className="text-[#FFFFFF] cursor-pointer">
              Explore
            </Link>

            <p className="text-[#FFFFFF] cursor-pointer">Cinema</p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center px-4 py-2 gap-2 w-[250px] rounded-full bg-[#262525]">
            <CiSearch className="text-[#FFFFFF] text-lg shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event"
              className="flex-1 outline-none text-[#FFFFFF] bg-[#262525] placeholder:text-[#FFFFFF] text-sm h-8.5"
            />
          </div>
        </div>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 cursor-pointer">
          <img src={logo} alt="Tix Arena" />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* HELP */}
          <button
            type="button"
            onClick={handleHelpClick}
            className="w-8 h-8 rounded-full bg-[#262525] flex items-center justify-center"
          >
            <CiCircleQuestion className="text-lg text-white cursor-pointer" />
          </button>

          {user ? (
            <>
              {/* TICKET */}
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? "bg-[#995DFF]" : "bg-[#262525]"
                  }`
                }
              >
                <LuTicket className="text-white" size={15} />
              </NavLink>

              {/* USER BUTTON */}
              <button
                type="button"
                onClick={() => {
                  setIsUserMenuOpen((prev) => !prev);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-1.5"
              >
                {/* PROFILE IMAGE */}
                <span className="w-8 h-8 rounded-full bg-[#262525] flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName || "User"} profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <LuUser size={16} className="text-white" />
                  )}
                </span>

                {/* ARROW */}
                <IoIosArrowDown
                  className={`text-[#ABABAB] transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  size={14}
                />
              </button>

              {/* USER DROPDOWN */}
              <NavUserMenu
                isOpen={isUserMenuOpen}
                onViewProfile={() => {
                  setIsUserMenuOpen(false);
                  navigate("/profile");
                }}
                onSwitchToCreate={() => {
                  setIsUserMenuOpen(false);
                  navigate("/vendor");
                }}
                onLogout={() => {
                  setIsUserMenuOpen(false);
                  logout();
                  navigate("/");
                }}
              />
            </>
          ) : (
            /* GET STARTED */
            <Link
              to="/signup"
              className="bg-[#995DFF] text-[#FFFFFF] rounded-full px-6 py-3"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVBAR
      ====================================================== */}
      <div className="md:hidden grid grid-cols-[1fr_auto_1fr] items-center">
        {/* HAMBURGER BUTTON */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsUserMenuOpen(false);
          }}
          className="justify-self-start w-9 h-9 rounded-full bg-[#262525] flex items-center justify-center cursor-pointer"
        >
          {isMenuOpen ? (
            <LuX className="text-white cursor-pointer" size={19} />
          ) : (
            <LuMenu className="text-white cursor-pointer" size={19} />
          )}
        </button>

        {/* CENTER LOGO */}
        <div className="justify-self-center px-4">
          <img src={logo} alt="Tix Arena" className="w-[90px] sm:w-[110px]" />
        </div>

        {/* MOBILE RIGHT SIDE */}
        <div className="justify-self-end flex items-center gap-2 sm:gap-3">
          {/* HELP */}
          <button
            type="button"
            onClick={handleHelpClick}
            className="w-9 h-9 rounded-full bg-[#262525] flex items-center justify-center"
          >
            <CiCircleQuestion className="text-lg text-white cursor-pointer" />
          </button>

          {user ? (
            <>
              {/* TICKET */}
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `w-9 h-9 rounded-full flex items-center justify-center ${
                    isActive ? "bg-[#995DFF]" : "bg-[#262525]"
                  }`
                }
              >
                <LuTicket className="text-white" size={16} />
              </NavLink>

              {/* USER */}
              <button
                type="button"
                onClick={() => {
                  setIsUserMenuOpen((prev) => !prev);
                  setIsMenuOpen(false);
                }}
                className="w-9 h-9 rounded-full bg-[#262525] flex items-center justify-center overflow-hidden cursor-pointer"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName || "User"} profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <LuUser size={16} className="text-white " />
                )}
              </button>

              {/* USER DROPDOWN */}
              <NavUserMenu
                isOpen={isUserMenuOpen}
                onViewProfile={() => {
                  setIsUserMenuOpen(false);
                  navigate("/profile");
                }}
                onSwitchToCreate={() => {
                  setIsUserMenuOpen(false);
                  navigate("/vendor");
                }}
                onLogout={() => {
                  setIsUserMenuOpen(false);
                  logout();
                  navigate("/");
                }}
              />
            </>
          ) : (
            /* GET STARTED */
            <Link
              to="/signup"
              className="bg-[#995DFF] text-white rounded-full px-4 py-2 text-sm whitespace-nowrap"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* =====================================================
          MOBILE HAMBURGER MENU
      ====================================================== */}
      {isMenuOpen && (
        <div className="md:hidden px-5 py-6">
          <div className="flex flex-col items-start gap-6">
            {/* EXPLORE */}
            <Link
              to="/explore"
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-base"
            >
              Explore
            </Link>

            {/* CINEMA */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-base text-left"
            >
              Cinema
            </button>

            {/* SEARCH */}
            <div className="flex items-center px-4 py-2 gap-2 w-full rounded-full bg-[#262525]">
              <CiSearch className="text-white text-lg shrink-0" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event"
                className="flex-1 min-w-0 outline-none text-white bg-[#262525] placeholder:text-white text-sm h-8"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
