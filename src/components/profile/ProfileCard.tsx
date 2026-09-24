import React, { useState } from "react";
import { LuPencil, LuMaximize2, LuX } from "react-icons/lu";
import type { UserProfile } from "../../types/profile";

interface ProfileCardProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditClick }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      <section
        className="
          relative
          border
          border-white/15
          rounded-3xl
          bg-white/[0.02]
          p-5
          sm:p-6
          md:p-8
          w-full
          max-w-4xl
          mx-auto
        "
      >
        {/* Profile Content */}
        <div
          className="
            flex
            items-start
            gap-4
            sm:gap-5
            pr-0
            pb-14
            sm:pb-12
          "
        >
          {/* Profile Image */}
          <button
            type="button"
            onClick={() => setIsImageOpen(true)}
            className="
              relative
              shrink-0
              rounded-full
              group
              cursor-pointer
              focus:outline-none
            "
            aria-label="View profile picture"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="
                w-16
                h-16
                sm:w-20
                sm:h-20
                rounded-full
                object-cover
                ring-2
                ring-white/80
                transition
                duration-200
                group-hover:brightness-75
              "
            />

            {/* View icon */}
            <span
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                rounded-full
                bg-black/30
                opacity-0
                group-hover:opacity-100
                transition
              "
            >
              <LuMaximize2 size={17} className="text-white" />
            </span>
          </button>

          {/* Profile Info */}
          <div className="min-w-0 flex-1">
            <h1
              className="
                text-xl
                sm:text-2xl
                font-serif
                text-slate-50
                break-words
                text-left
              "
            >
              {profile.name}
            </h1>

            <p
              className="
                text-slate-400
                text-xs
                sm:text-sm
                mt-1
                break-all
                text-left
              "
            >
              {profile.email}
            </p>

            {/* Interests */}
            <div
              className="
                flex
                flex-wrap
                gap-2
                sm:gap-2.5
                mt-3
                sm:mt-4
                max-w-md
              "
            >
              {profile.interests.map((tag) => (
                <span
                  key={tag}
                  className="
                    px-3
                    sm:px-4
                    py-1.5
                    rounded-full
                    bg-white/[0.06]
                    text-[11px]
                    sm:text-xs
                    text-slate-300
                    border
                    border-white/10
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Profile */}
        <button
          type="button"
          onClick={onEditClick}
          className="
            absolute
            bottom-5
            right-5
            sm:bottom-8
            sm:right-8
            flex
            items-center
            gap-1.5
            text-xs
            sm:text-sm
            text-indigo-300
            bg-white/[0.06]
            rounded-full
            px-3
            sm:px-4
            py-2
            hover:bg-white/10
            transition
            cursor-pointer
          "
        >
          <LuPencil size={13} />
          Edit Profile
        </button>
      </section>

      {/* ============================= */}
      {/* VIEW PROFILE PICTURE */}
      {/* ============================= */}

      {isImageOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/80
            backdrop-blur-sm
            p-4
          "
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="
              relative
              flex
              items-center
              justify-center
              w-full
              max-w-[500px]
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              className="
                absolute
                -top-3
                -right-3
                z-10
                w-9
                h-9
                rounded-full
                bg-[#202020]
                border
                border-white/10
                flex
                items-center
                justify-center
                text-white
                hover:bg-[#2a2a2a]
                transition
                cursor-pointer
              "
              aria-label="Close profile picture"
            >
              <LuX size={18} />
            </button>

            {/* Large Image */}
            <img
              src={profile.avatar}
              alt={profile.name}
              className="
                max-w-full
                max-h-[80vh]
                rounded-2xl
                object-contain
                shadow-2xl
              "
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
