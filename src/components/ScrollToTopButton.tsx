import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const ScrollToTopButton = () => {
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

  if (!showScrollArrow) {
    return null;
  }

  return (
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

        max-sm:bottom-5
        max-sm:right-5
        max-sm:w-10
        max-sm:h-10
      "
      aria-label="Scroll to top"
    >
      <LuArrowUp size={20} className="max-sm:w-[18px] max-sm:h-[18px]" />
    </button>
  );
};

export default ScrollToTopButton;
