import NavBar from "../components/auth/NavBar";
import illustration from "../assets/images/authImages/illustration2.svg";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="
        w-full
        min-h-screen
        relative
        overflow-x-hidden
        bg-[#0B0B0B]
        bg-no-repeat
        bg-cover
        bg-[position:right_center]
        sm:bg-[position:right_center]
      "
      style={{
        backgroundImage: `url(${illustration})`,
      }}
    >
      {/* Desktop Overlay */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          hidden
          sm:block
        "
        style={{
          background:
            "linear-gradient(to right, #0B0B0B 0%, #0B0B0B 45%, transparent 75%)",
        }}
      />

      {/* Mobile Overlay */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          block
          sm:hidden
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,11,11,0.90) 0%, rgba(11,11,11,0.82) 35%, rgba(11,11,11,0.92) 100%)",
        }}
      />

      <div className="relative z-10 min-h-screen">
        <NavBar />

        {/* Content */}
        <div
          className="
            w-full
            px-4
            py-8
            pt-16
            sm:w-1/2
            sm:px-16
            sm:py-12
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
