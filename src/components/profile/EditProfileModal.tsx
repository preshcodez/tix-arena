import React, { useRef, useState } from "react";
import { LuX, LuCamera, LuMaximize2 } from "react-icons/lu";
import api from "../../api/axios";
import type { User } from "../../types/auth";

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  initialName?: string;
  initialEmail?: string;
  initialInterests?: string[];
  initialAvatar?: string;
}

const AVAILABLE_INTERESTS = [
  "Sport",
  "Tech",
  "Education",
  "Concert",
  "Entertainment",
  "Corporate",
];

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  onSave,
  initialName = "",
  initialEmail = "",
  initialInterests = [],
  initialAvatar = "https://i.pravatar.cc/100?img=12",
}) => {
  const [name, setName] = useState(initialName);
  const [email] = useState(initialEmail);
  const [interests, setInterests] = useState<string[]>(initialInterests);

  const [avatar, setAvatar] = useState(initialAvatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeInterest = (tag: string) => {
    setInterests((prev) => prev.filter((item) => item !== tag));
  };

  const addInterest = (tag: string) => {
    setInterests((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  };

  const remainingInterests = AVAILABLE_INTERESTS.filter(
    (tag) => !interests.includes(tag),
  );

  // Open file picker
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // View profile picture
  const handleViewProfilePicture = () => {
    if (!avatar) return;

    setIsImagePreviewOpen(true);
  };

  // Handle selected image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Check file size - 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB.");
      return;
    }

    setError("");
    setSelectedFile(file);

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);
  };

  const handleSave = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    // Split full name into first and last name
    const nameParts = trimmedName.split(/\s+/);

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    if (!lastName) {
      setError("Please enter your full name.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);

      // Send interests as JSON string because this is FormData
      formData.append("interests", JSON.stringify(interests));

      // Only send avatar if a new image was selected
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const response = await api.patch("/api/users/me", formData);

      const updatedUser = response.data?.data?.user;

      if (!updatedUser) {
        throw new Error("Unable to update profile.");
      }

      // Update AuthContext/ProfilePage
      onSave(updatedUser);
    } catch (err: any) {
      console.error("Profile update failed:", err);

      setError(
        err?.response?.data?.message || "Unable to update your profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* ============================= */}
      {/* EDIT PROFILE MODAL */}
      {/* ============================= */}

      <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
          px-3
          py-4
          sm:p-4
        "
      >
        <div
          className="
            relative
            w-full
            max-w-md
            rounded-2xl
            bg-[#12141c]
            border
            border-white/10
            p-4
            sm:p-6
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-serif text-slate-50">
              Edit Profile
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                w-8
                h-8
                sm:w-9
                sm:h-9
                rounded-full
                bg-white/5
                flex
                items-center
                justify-center
                text-slate-300
                hover:bg-white/10
                transition
                cursor-pointer
                shrink-0
              "
              aria-label="Close"
            >
              <LuX size={16} />
            </button>
          </div>

          {/* ============================= */}
          {/* PROFILE IMAGE */}
          {/* ============================= */}

          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="relative">
              {/* Click image to view */}
              <button
                type="button"
                onClick={handleViewProfilePicture}
                className="
                  relative
                  block
                  rounded-full
                  cursor-pointer
                  group
                  focus:outline-none
                "
                aria-label="View profile picture"
              >
                <img
                  src={avatar}
                  alt="Profile"
                  className="
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    rounded-full
                    object-cover
                    ring-2
                    ring-white/10
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
                  <LuMaximize2 size={18} className="text-white" />
                </span>
              </button>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Camera button */}
              <button
                type="button"
                onClick={handleCameraClick}
                className="
                  absolute
                  bottom-0
                  right-0
                  w-7
                  h-7
                  sm:w-8
                  sm:h-8
                  rounded-full
                  bg-indigo-400
                  flex
                  items-center
                  justify-center
                  border-2
                  border-[#12141c]
                  hover:bg-indigo-500
                  transition
                  cursor-pointer
                "
                aria-label="Change profile picture"
              >
                <LuCamera
                  size={13}
                  className="text-white sm:w-[15px] sm:h-[15px]"
                />
              </button>
            </div>
          </div>

          {/* Helper text */}
          <p className="text-center text-[11px] sm:text-xs text-slate-500 -mt-2 mb-4">
            Click your photo to view it
          </p>

          {/* Error */}
          {error && (
            <div
              className="
                mb-4
                rounded-xl
                border
                border-red-400/20
                bg-red-400/10
                px-3
                py-2
                text-xs
                text-red-300
              "
            >
              {error}
            </div>
          )}

          {/* ============================= */}
          {/* FULL NAME */}
          {/* ============================= */}

          <label className="block text-xs text-slate-400 mb-1.5">
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="
              w-full
              rounded-xl
              bg-white/5
              border
              border-white/10
              px-4
              py-2.5
              text-sm
              text-slate-100
              placeholder:text-slate-500
              mb-3
              sm:mb-4
              focus:outline-none
              focus:ring-1
              focus:ring-indigo-400
            "
          />

          {/* ============================= */}
          {/* EMAIL */}
          {/* ============================= */}

          <label className="block text-xs text-slate-400 mb-1.5">Email</label>

          <input
            type="email"
            value={email}
            disabled
            className="
              w-full
              rounded-xl
              bg-white/5
              border
              border-white/10
              px-4
              py-2.5
              text-sm
              text-slate-500
              mb-3
              sm:mb-4
              cursor-not-allowed
              opacity-70
            "
          />

          {/* ============================= */}
          {/* INTERESTS */}
          {/* ============================= */}

          <label className="block text-xs text-slate-400 mb-1.5">
            Interest
          </label>

          <div
            className="
              rounded-xl
              bg-white/5
              border
              border-white/10
              p-3
              mb-4
            "
          >
            {/* Selected interests */}
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.length > 0 ? (
                interests.map((tag) => (
                  <span
                    key={tag}
                    className="
                      flex
                      items-center
                      gap-1.5
                      px-3
                      py-1.5
                      rounded-full
                      bg-white/[0.08]
                      text-xs
                      text-slate-200
                      border
                      border-white/10
                    "
                  >
                    {tag}

                    <button
                      type="button"
                      onClick={() => removeInterest(tag)}
                      className="
                        hover:text-red-300
                        cursor-pointer
                        transition
                      "
                      aria-label={`Remove ${tag}`}
                    >
                      <LuX size={11} />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-500">No interests selected</p>
              )}
            </div>

            {/* Add interests */}
            {remainingInterests.length > 0 && (
              <>
                <p className="text-[11px] text-slate-500 mb-2">
                  Add more interest
                </p>

                <div className="flex flex-wrap gap-2">
                  {remainingInterests.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addInterest(tag)}
                      className="
                        flex
                        items-center
                        gap-1
                        px-3
                        py-1.5
                        rounded-full
                        bg-transparent
                        text-xs
                        text-slate-300
                        border
                        border-dashed
                        border-white/20
                        hover:border-indigo-300
                        hover:text-indigo-200
                        cursor-pointer
                        transition
                      "
                    >
                      {tag}

                      <span className="text-indigo-300">+</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ============================= */}
          {/* SAVE */}
          {/* ============================= */}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="
              w-full
              rounded-xl
              py-3
              text-sm
              font-medium
              text-white
              bg-gradient-to-r
              from-indigo-400
              via-violet-400
              to-indigo-300
              hover:opacity-90
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ============================= */}
      {/* VIEW PROFILE PICTURE */}
      {/* ============================= */}

      {isImagePreviewOpen && (
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
          onClick={() => setIsImagePreviewOpen(false)}
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
            {/* Close preview */}
            <button
              type="button"
              onClick={() => setIsImagePreviewOpen(false)}
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

            {/* Large profile picture */}
            <img
              src={avatar}
              alt="Profile preview"
              className="
                w-auto
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

export default EditProfileModal;
