import { Link, useLocation } from "react-router-dom";
import dash from "../../assets/images/vendorImages/dashboardimg.svg";
import eve from "../../assets/images/vendorImages/eventimg.svg";

const NAV_ITEMS = [
  { label: "Dashboard", icon: dash, path: "/admin-dashboard" },
  { label: "My Event", icon: eve, path: "/vendor" },
  // Profile will be added here once we create the page
];

const VendorPageLinks = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="
        w-[22%] min-h-screen
        flex flex-col
        bg-[#0C0C0C]
        pt-5.5
        items-center
        px-6
        border-r border-[#262525]

        max-md:w-[80px]
        max-md:px-2
        max-md:pt-5
      "
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.label}
            to={item.path}
            className={`
              w-full
              flex items-center gap-2.5
              rounded-[30px]
              px-4.25 py-3.5

              max-md:justify-center
              max-md:px-2
              max-md:py-3

              ${isActive ? "bg-[#262525]" : ""}
            `}
          >
            <img src={item.icon} alt="" className="w-5 h-5 shrink-0" />

            <p
              className={`
                font-medium text-[16px]

                max-md:hidden

                ${isActive ? "text-[#FFFFFF]" : "text-[#838383]"}
              `}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default VendorPageLinks;
