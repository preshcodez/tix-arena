import React, { useState } from "react";
import ScrollToTopButton from "../components/ScrollToTopButton";

import Footer from "../components/Footer";
import type { UserProfile } from "../types/profile";
import Navbar from "../components/profile/Navbar";
import ProfileCard from "../components/profile/ProfileCard";
import TicketsSection from "../components/profile/TicketsSection";
import EditProfileModal from "../components/profile/EditProfileModal";
import { useAuth } from "../contexts/AuthContext";
import type { User } from "../types/auth";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const profile: UserProfile = {
    name: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "User",

    email: user?.email || "",

    avatar: user?.avatar || "https://i.pravatar.cc/100?img=12",

    interests: user?.interests || [],
  };

  const handleSave = (updatedUser: User) => {
    updateUser(updatedUser);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#060612] text-white font-sans">
      <Navbar avatarUrl={profile.avatar} />

      <div className="max-w-[1100px] mx-auto px-6 py-9">
        <div className="mb-10">
          <ProfileCard
            profile={profile}
            onEditClick={() => setShowModal(true)}
          />
        </div>

        <TicketsSection />
      </div>

      {showModal && (
        <EditProfileModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initialName={profile.name}
          initialEmail={profile.email}
          initialInterests={profile.interests}
          initialAvatar={profile.avatar}
        />
      )}

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ProfilePage;
