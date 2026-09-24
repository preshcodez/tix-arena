import entertainment from "../../assets/images/landingPage/Group.svg";
import tech from "../../assets/images/landingPage/Hack--Streamline-Manila.svg";
import corporate from "../../assets/images/landingPage/Group (1).svg";
import sport from "../../assets/images/landingPage/Women-Led--Streamline-Manila.svg";
import education from "../../assets/images/landingPage/Online-Learning--Streamline-Manila.svg";
import charity from "../../assets/images/landingPage/Investing-3--Streamline-Manila.svg";

const EventCategories = () => {
  return (
    <div className="flex  justify-center px-5 sm:px-8 md:px-10 pt-8">
      <div className="w-full max-w-[1020px] h-auto">
        {/* HEADING */}
        <h2 className="text-left text-[36px] sm:text-[50px] md:text-[76px] font-Instrument Serif font-normal text-white instrument-serif">
          Discover Event Category.
        </h2>

        {/* DESCRIPTION */}
        <p className="text-[#CECECE] text-[14px] sm:text-[16px] font-inter font-normal leading-6 text-left">
          Discover events that match your vibe from concerts{" "}
          <br className="hidden sm:block" />
          and parties to experiences you didn’t even know you needed.
        </p>

        {/* CATEGORIES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {/* ENTERTAINMENT */}
          <div className="flex items-center justify-center border border-[#1E1E1E] rounded-3xl gap-2 w-full h-[100px]">
            <div className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-[#FFFFFF]">
              Entertainment
            </div>
            <img src={entertainment} alt="" className="w-8 sm:w-10" />
          </div>

          {/* TECH */}
          <div className="flex items-center justify-center border border-[#1E1E1E] rounded-3xl gap-2 w-full h-[100px]">
            <div className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-[#FFFFFF]">
              Tech
            </div>
            <img src={tech} alt="" className="w-8 sm:w-10" />
          </div>

          {/* CORPORATE */}
          <div className="flex items-center justify-center border border-[#1E1E1E] rounded-3xl gap-2 w-full h-[100px]">
            <div className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-[#FFFFFF]">
              Corporate
            </div>
            <img src={corporate} alt="" className="w-8 sm:w-10" />
          </div>

          {/* SPORT */}
          <div className="flex items-center justify-center border border-[#1E1E1E] rounded-3xl gap-2 w-full h-[100px]">
            <div className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-[#FFFFFF]">
              Sport
            </div>
            <img src={sport} alt="" className="w-8 sm:w-10" />
          </div>

          {/* EDUCATION */}
          <div className="flex items-center justify-center border border-[#1E1E1E] rounded-3xl gap-2 w-full h-[100px]">
            <div className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-[#FFFFFF]">
              Education
            </div>
            <img src={education} alt="" className="w-8 sm:w-10" />
          </div>

          {/* CHARITY */}
          <div className="flex items-center justify-center border border-[#1E1E1E] rounded-3xl gap-2 w-full h-[100px]">
            <div className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-[#FFFFFF]">
              Charity
            </div>
            <img src={charity} alt="" className="w-8 sm:w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
