import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

const VendorPending = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="w-full max-w-[540px] px-4 sm:px-0 flex flex-col gap-[25px]">
        <div className="flex flex-col items-center text-center gap-[12px]">
          <div className="w-[72px] h-[72px] rounded-full bg-[#110B1A] border-2 border-[#995DFF] flex items-center justify-center">
            <span className="text-[#995DFF] text-[30px]">✓</span>
          </div>

          <h1 className="text-[#FFFFFF] font-['Instrument_Serif'] font-normal text-[38px] sm:text-[45px] leading-[100%] ">
            Application Submitted
          </h1>

          <p className="text-[#CECECE] font-[Manrope] text-[15px] sm:text-[16px] leading-[140%]">
            Your creator application has been submitted successfully and is
            currently being reviewed.
          </p>
        </div>

        <div className="rounded-[30px] px-[25px] sm:px-[30px] py-[20px] bg-[#191919] border-2 border-[#262525]">
          <div className="flex items-center justify-between">
            <span className="text-[#CECECE] font-[Manrope] text-[14px]">
              Application status
            </span>

            <span className="px-[14px] py-[7px] rounded-full bg-[#110B1A] border border-[#995DFF] text-[#995DFF] font-[Manrope] text-[13px]">
              Pending
            </span>
          </div>
        </div>

        <div className="rounded-[30px] px-[25px] sm:px-[30px] py-[18px] bg-[#110B1A] border-2 border-[#262525]">
          <p className="text-[#CECECE] font-[Manrope] text-[13px] sm:text-[14px] leading-[140%] text-center">
            Once your application is approved, you'll be able to access your
            creator dashboard and start creating events.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full h-[62px] rounded-[30px] px-[17px] py-[14px] bg-[#995DFF] text-[#FFFFFF] font-[Manrope] font-medium text-[16px] leading-[100%]"
        >
          Back to Home
        </button>
      </div>
    </AuthLayout>
  );
};

export default VendorPending;
