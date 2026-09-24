import VendorPageLinks from "../../components/vendor/VendorPageLinks";
import AdminOverview from "../../components/admin/AdminOverview";

const AdminDashboard = () => {
  return (
    <div className="flex w-full">
      <VendorPageLinks />
      <AdminOverview />
    </div>
  );
};

export default AdminDashboard;
