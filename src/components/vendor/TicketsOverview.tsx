import dots from "../../assets/images/vendorImages/dots.svg";
import backArr from "../../assets/images/vendorImages/arrow-left.svg";
import edit from "../../assets/images/vendorImages/Pen.svg";
import userCheck from "../../assets/images/vendorImages/User Check.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import EventActionsMenu from "./EventActionsMenu";
import CloseEventModal from "./CloseEventModal";
import DeleteEventModal from "./DeleteEventModal";

const TicketsOverview = () => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCloseOpen, setIsCloseOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex justify-between ">
        <div className="flex flex-col gap-1 items-start ">
          <div className="flex gap-2.5 items-center">
            <img src={backArr} alt="" />
            <h2 className="font-semibold text-[28px] text-[#FFFFFF] ">
              The Social Escape
            </h2>
          </div>
          <p className="font-medium text-[14px] text-[#ECECEC] ">
            <span className="text-[#838383] font-normal ">Created:</span> Jan
            28, 2026
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div
            onClick={() => setIsEditOpen(true)}
            className="flex gap-2.5 py-3.5 px-4.25 items-center bg-[#262525] rounded-[30px] cursor-pointer "
          >
            <img src={edit} alt="" />
            <p className="text-[#ECECEC] text-[16px]  ">Edit event</p>
          </div>
          <div className="relative">
            <img
              src={dots}
              alt="More options"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="h-8 w-8 rounded-full border border-[#262525] bg-[#262525] p-1.5 cursor-pointer"
            />
            <EventActionsMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onEdit={() => {
                setIsMenuOpen(false);
                setIsEditOpen(true);
              }}
              onViewDetails={() => {
                setIsMenuOpen(false);
                navigate("/event");
              }}
              onCloseEvent={() => {
                setIsMenuOpen(false);
                setIsCloseOpen(true);
              }}
              onDelete={() => {
                setIsMenuOpen(false);
                setIsDeleteOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* OVERVIEW */}
      <div className="flex items-start flex-col gap-2.5 p-3.5 rounded-[25px] bg-[#0F0F0F]">
        <h3 className="text-[18px] font-medium text-[#FFFFFF] ">
          Ticket Overview
        </h3>
        {/* ===================== */}
        <div className="w-full flex bg-[#0B0B0B] px-4 py-5 justify-between items-center rounded-[20px] ">
          <div className="flex flex-col gap-px items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Total Check-Ins
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">670</p>
          </div>
          <div className="flex items-center gap-2.5 bg-[#262525] py-2 px-2.5 text-[#ECECEC] text-[16px] rounded-[30px] ">
            <p>Check-in Attendants</p>
            <img src={userCheck} alt="" />
          </div>
        </div>
        {/* ===================== */}
        <div className="flex gap-2.5 w-full ">
          <div className="w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Total Tickets Created
            </p>
            <p className="text-[23px] font-semibold text-[#FFFFFF] ">60</p>
          </div>
          <div className="w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Tickets Sold
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">14</p>
          </div>
          <div className="w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Tickets Remaining
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">679</p>
          </div>
        </div>
        {/* ===================== */}
        <div className="flex gap-2.5 w-full ">
          <div className="w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              Regular Tickets
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">
              12<span className="text-[#838383] text-[18px]">/30</span>
            </p>
          </div>
          <div className="w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              VIP Tickets
            </p>
            <p className="text-[23px] text-[#FFFFFF] font-semibold">
              07<span className="text-[#838383] text-[18px]">/30</span>
            </p>
          </div>
          <div className="w-1/3 bg-[#0B0B0B] rounded-[25px] flex flex-col gap-2.5 p-3.5 items-start">
            <p className="text-[#ABABAB] text-[16px] font-normal ">
              VVIP Tickets
            </p>
            <p className="text-[18px] text-[#838383] font-semibold">
              Not Available
            </p>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={() => setIsEditOpen(false)}
      />

      <CloseEventModal
        isOpen={isCloseOpen}
        onClose={() => setIsCloseOpen(false)}
        onConfirm={() => {
          // TODO: call close-event API
          console.log("Event closed");
          setIsCloseOpen(false);
        }}
      />

      <DeleteEventModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          // TODO: call delete-event API
          console.log("Event deleted");
          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
};

export default TicketsOverview;
