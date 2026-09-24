import VendorPageLinks from "../../components/vendor/VendorPageLinks";
import CheckInAttendants from "../../components/vendor/CheckInAttendants";

const CheckIn = () => {
  return (
    <div className="flex w-full">
      <VendorPageLinks />
      <CheckInAttendants />
    </div>
  );
};

export default CheckIn;
