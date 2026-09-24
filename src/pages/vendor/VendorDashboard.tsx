import React from "react";
import VendorNav from "../../components/vendor/VendorNav";
import VendorPageLinks from "../../components/vendor/VendorPageLinks";
import EventsList from "../../components/vendor/EventsList";

const VendorDashboard = () => {
  return (
    <div className="flex w-full">
      <VendorPageLinks />
      <EventsList />
    </div>
  );
};

export default VendorDashboard;
