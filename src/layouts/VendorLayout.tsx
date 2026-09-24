import VendorNav from "../components/vendor/VendorNav";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div>
      <VendorNav />
      <Outlet />
    </div>
  );
};

export default VendorLayout;
