import { useState } from "react";

import EventCategories from "../components/landing/EventCategories";
import ExploreEvents from "../components/landing/ExploreEvents";
import Hero from "../components/landing/Hero";
import HostingGap from "../components/landing/HostingGap";
import TopEvent from "../components/landing/TopEvent";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import AboutSection from "../components/landing/AboutSection";

import Footer from "../components/Footer";

const LandingPage = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      <Hero />

      <EventCategories />

      <TopEvent />

      <ExploreEvents />

      <WhyChooseUs />

      <HostingGap />

      <Footer
        onAboutClick={() => {
          alert("LANDING PAGE RECEIVED CLICK");
          setShowAbout(true);
        }}
      />
      <AboutSection isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

export default LandingPage;
