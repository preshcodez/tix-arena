import { useNavigate } from "react-router-dom";
import { CiCircleQuestion } from "react-icons/ci";
import logo from "../../assets/images/authImages/Tixlogo.svg";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="
        relative
        z-[100]
        flex
        items-center
        justify-between
        px-5
        sm:px-8
        md:px-15
        py-5
        md:py-10
        border-b
        border-[#1E1E1E]
        bg-[#0B0B0B]
      "
    >
      {/* BACK BUTTON */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="
          text-white
          text-[14px]
          font-[Manrope]
          whitespace-nowrap
          max-sm:text-[12px]
          cursor-pointer
        "
      >
        ← <span className="max-sm:hidden">Back to Exploring</span>
        <span className="hidden max-sm:inline">Back</span>
      </button>

      {/* LOGO */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="
          absolute
          left-1/2
          -translate-x-1/2
        "
      >
        <img
          src={logo}
          alt="Tix Arena"
          className="h-10.5 max-sm:h-8 cursor-pointer"
        />
      </button>

      {/* HELP BUTTON */}
      <button
        type="button"
        onClick={() => navigate("/help")}
        className="
          flex
          items-center
          justify-center
          gap-2
          w-[102px]
          h-[45px]
          rounded-[30px]
          bg-[#262525]
          text-white
          text-[16px]
          font-[Manrope]
          font-[300]
          max-sm:w-[72px]
          max-sm:h-[36px]
          max-sm:gap-1
          max-sm:text-[13px]
          cursor-pointer
        "
      >
        <CiCircleQuestion className="text-lg max-sm:text-base" />
        Help
      </button>
    </nav>
  );
};

export default NavBar;
