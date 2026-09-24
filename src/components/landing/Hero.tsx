import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowUp } from "react-icons/lu";
import image from "../../assets/images/landingPage/image 10.svg";

const Hero = () => {
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollArrow(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-10 px-4">
        <div className="w-[250px] lg:w-[450px] border-0 text-center">
          <h1
            className="
              text-[38px]
              sm:text-[48px]
              md:text-[60px]
              lg:text-[76px]
              font-normal
              instrument-serif
              text-[#CECECE]
              leading-[1.05]
            "
          >
            Your Next Great Time Starts Here.
          </h1>

          <p className="text-[#CECECE] text-[16px] py-4">
            Discover events that match your vibe from concerts and parties to
            experiences you didn’t even know you needed.
          </p>

          <Link
            to="/explore"
            className="inline-block bg-[#995DFF] text-[#FFFFFF] rounded-full px-5 py-3 mt-5"
          >
            Discover
          </Link>
        </div>
      </div>

      <img src={image} alt="" className="mt-7 w-[1200px] max-w-[95%] mx-auto" />

      {/* SCROLL TO TOP ARROW */}
      {showScrollArrow && (
        <button
          type="button"
          onClick={scrollToTop}
          className="
            fixed
            bottom-8
            right-8
            z-50
            w-11
            h-11
            rounded-full
            bg-[#995DFF]
            flex
            items-center
            justify-center
            text-white
            transition-all
            duration-300
            cursor-pointer
          "
          aria-label="Scroll to top"
        >
          <LuArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Hero;
