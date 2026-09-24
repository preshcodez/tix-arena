import { Route, Routes } from "react-router-dom";
import "./App.css";

import GeneralLayout from "./layouts/GeneralLayout";
import VendorLayout from "./layouts/VendorLayout";

import LandingPage from "./pages/LandingPage";
import HelpCenter from "./pages/HelpCenter";
import Explore from "./pages/Explore";
import Event from "./pages/Event";
import EventDetailPage from "./pages/EventDetailPage";
import Error404 from "./pages/Error404";

import VendorDashboard from "./pages/vendor/VendorDashboard";
import EventDetails from "./pages/vendor/EventDetails";
import CreateNewEvent from "./pages/vendor/CreateNewEvent";
import CheckIn from "./pages/vendor/CheckIn";
import VendorPending from "./pages/vendor/VendorPending";

import AdminDashboard from "./pages/admin/AdminDashboard";

import VendorProfile from "./components/vendor/VendorProfile";

import PaymentCallbackPage from "./pages/PaymentCallbackPage";

import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import OAuthSuccess from "./pages/OAuthSuccess";
import OnboardingStep1 from "./pages/auth/OnboardingStep1";
import OnboardingStep2 from "./pages/auth/OnboardingStep2";
import OnboardingStep3 from "./pages/auth/OnboardingStep3";

import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      {/* ================= GENERAL LAYOUT ================= */}

      <Route element={<GeneralLayout />}>
        <Route path="/" element={<LandingPage />} />

        <Route path="/help" element={<HelpCenter />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/event/:id" element={<EventDetailPage />} />

        <Route path="/search-result" element={<Event />} />

        <Route path="*" element={<Error404 />} />
      </Route>

      {/* ================= AUTH ================= */}

      <Route path="/signup" element={<SignUp />} />

      <Route path="/signin" element={<SignIn />} />

      <Route path="/oauth-success" element={<OAuthSuccess />} />

      <Route path="/onboarding/step1" element={<OnboardingStep1 />} />

      <Route path="/onboarding/step2" element={<OnboardingStep2 />} />

      <Route path="/onboarding/step3" element={<OnboardingStep3 />} />

      {/* ================= VENDOR PENDING ================= */}

      <Route path="/vendor/pending" element={<VendorPending />} />

      {/* ================= PAYMENT ================= */}

      <Route path="/payment/callback" element={<PaymentCallbackPage />} />

      {/* ================= VENDOR LAYOUT ================= */}

      <Route element={<VendorLayout />}>
        <Route path="/vendor" element={<VendorDashboard />} />

        <Route path="/event-details/:id" element={<EventDetails />} />

        <Route path="/create-event" element={<CreateNewEvent />} />

        <Route path="/check-in" element={<CheckIn />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

      {/* ================= VENDOR PROFILE ================= */}

      <Route path="/vendor/profile" element={<VendorProfile />} />

      {/* ================= USER PROFILE ================= */}

      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
