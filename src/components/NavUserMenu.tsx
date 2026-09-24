import type { ReactNode } from "react";
import { LuUser, LuRefreshCw, LuLogOut } from "react-icons/lu";

interface NavUserMenuProps {
  isOpen: boolean;
  onViewProfile: () => void;
  onSwitchToCreate: () => void;
  onLogout: () => void;
  isVendor?: boolean;
}

const MenuItem = ({
  icon,
  label,
  onClick,
  muted,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  muted?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3.5
        rounded-[14px]
        text-left
        text-[14px]
        cursor-pointer
        transition-all
        duration-200
        ease-out
        hover:bg-[#242424]
        active:scale-[0.98]
        ${muted ? "text-[#8A8A8A]" : "text-white"}
      `}
    >
      <span
        className="
          shrink-0
          transition-transform
          duration-200
          ease-out
          group-hover:scale-105
        "
      >
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
};

const NavUserMenu = ({
  isOpen,
  onViewProfile,
  onSwitchToCreate,
  onLogout,
  isVendor = false,
}: NavUserMenuProps) => {
  return (
    <div
      className={`
        absolute
        right-[6px]
        top-[calc(100%+12px)]
        z-[999]

        w-[245px]

        rounded-[22px]
        border
        border-[#2B2B2B]

        bg-[#171717]

        p-2

        shadow-[0_20px_60px_rgba(0,0,0,0.5)]

        origin-top-right
        cursor-pointer

        transition-all
        duration-[350ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          isOpen
            ? "visible opacity-100 translate-y-0 scale-100"
            : "invisible pointer-events-none opacity-0 -translate-y-3 scale-[0.96]"
        }
      `}
    >
      {/* Small top glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-px
          right-8
          h-px
          w-16
          bg-gradient-to-r
          from-transparent
          via-[#995DFF]
          to-transparent
          opacity-60
        "
      />

      {/* PROFILE */}
      <MenuItem
        icon={<LuUser size={18} />}
        label="View Profile"
        onClick={onViewProfile}
      />

      {/* CREATOR */}
      <MenuItem
        icon={<LuRefreshCw size={18} />}
        label={isVendor ? "Creator Dashboard" : "Switch to create event"}
        onClick={onSwitchToCreate}
      />

      <div className="my-1.5 h-px bg-[#292929]" />

      {/* LOGOUT */}
      <MenuItem
        icon={<LuLogOut size={18} />}
        label="Log out"
        onClick={onLogout}
        muted
      />
    </div>
  );
};

export default NavUserMenu;
