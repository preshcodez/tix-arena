import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiCamera,
  FiMail,
  FiUser,
  FiEdit3,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiCalendar,
  FiArrowUpRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import api from "../../api/axios";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

interface VendorProfileData {
  businessName: string;
  businessLogo?: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
  };
}

const VendorProfile = () => {
  const [vendor, setVendor] = useState<VendorProfileData | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [businessLogo, setBusinessLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const response = await api.get("/api/vendors/profile");

        const data = response.data.data;

        setVendor(data);
        setBusinessName(data.businessName || "");
        setDescription(data.description || "");
      } catch (error: any) {
        console.error("Get Vendor Profile Error:", error);

        toast.error(
          error?.response?.data?.message || "Unable to load vendor profile",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, []);

  useEffect(() => {
    if (!businessLogo) {
      setLogoPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(businessLogo);
    setLogoPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [businessLogo]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setBusinessLogo(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!businessName.trim()) {
      toast.error("Business name is required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("businessName", businessName.trim());
      formData.append("description", description.trim());

      if (businessLogo) {
        formData.append("businessLogo", businessLogo);
      }

      const response = await api.patch("/api/vendors/profile", formData);

      const updatedVendor = response.data.data;

      setVendor(updatedVendor);
      setBusinessName(updatedVendor.businessName || "");
      setDescription(updatedVendor.description || "");
      setBusinessLogo(null);
      setLogoPreview("");

      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Update Vendor Profile Error:", error);

      toast.error(
        error?.response?.data?.message || "Unable to update vendor profile",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <NavBar />

        <main className="flex min-h-[65vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#995DFF]" />

            <p className="font-manrope text-sm text-white/40">
              Loading your profile...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <NavBar />

        <main className="flex min-h-[65vh] items-center justify-center px-5">
          <div className="w-full max-w-[460px] rounded-[28px] border border-white/[0.08] bg-[#111111] p-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.05]">
              <FiUser className="text-xl text-white/40" />
            </div>

            <h1 className="font-manrope text-xl font-semibold">
              Profile unavailable
            </h1>

            <p className="mt-2 font-manrope text-sm leading-6 text-white/40">
              We couldn't find your vendor profile.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-manrope text-sm font-semibold text-black"
            >
              Back Home
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const ownerName = `${vendor.user?.firstName || ""} ${
    vendor.user?.lastName || ""
  }`.trim();

  const displayOwner = ownerName || "Account Owner";

  const logoSource =
    logoPreview || vendor.businessLogo || vendor.user?.avatar || "";

  const firstLetter = vendor.businessName?.charAt(0)?.toUpperCase() || "V";

  const getStatusDetails = () => {
    if (vendor.status === "approved") {
      return {
        icon: <FiCheckCircle size={14} />,
        text: "Verified vendor",
        className: "border-[#6FDC93]/20 bg-[#6FDC93]/10 text-[#6FDC93]",
      };
    }

    if (vendor.status === "pending") {
      return {
        icon: <FiClock size={14} />,
        text: "Verification pending",
        className: "border-[#E7CB68]/20 bg-[#E7CB68]/10 text-[#E7CB68]",
      };
    }

    return {
      icon: <FiXCircle size={14} />,
      text: "Application rejected",
      className: "border-[#E47777]/20 bg-[#E47777]/10 text-[#E47777]",
    };
  };

  const status = getStatusDetails();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B0B0B] text-white">
      <NavBar />

      <main>
        <section className="px-5 pb-8 pt-12 sm:px-8 md:pb-10 md:pt-16 lg:px-12">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex items-end justify-between gap-6 max-md:flex-col max-md:items-start">
              <div>
                <p className="mb-3 font-manrope text-[11px] font-semibold uppercase tracking-[0.18em] text-[#995DFF]">
                  Vendor account
                </p>

                <h1 className="font-manrope text-[34px] font-semibold tracking-[-0.04em] sm:text-[42px]">
                  Your business profile
                </h1>

                <p className="mt-3 max-w-[570px] text-left font-manrope text-[14px] leading-6 text-white/40 sm:text-[15px]">
                  Keep your business information up to date so customers know
                  who is behind the events they discover on Tix-Arena.
                </p>
              </div>

              <Link
                to="/vendor"
                className="group flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-5 py-3 font-manrope text-[13px] text-white/70 transition hover:bg-white/[0.07] hover:text-white"
              >
                Vendor dashboard
                <FiArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
              <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#111111]">
                <div className="relative h-[190px] overflow-hidden sm:h-[220px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(153,93,255,0.28),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(135deg,#17121F,#0F0F0F_55%,#141414)]" />

                  <div className="absolute -right-20 -top-28 h-[300px] w-[300px] rounded-full border border-white/[0.04]" />

                  <div className="absolute -right-10 -top-16 h-[210px] w-[210px] rounded-full border border-white/[0.04]" />

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />

                  <div className="absolute left-6 top-6 rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 backdrop-blur-md">
                    <span className="font-manrope text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
                      Tix-Arena vendor
                    </span>
                  </div>
                </div>

                <div className="relative px-6 pb-8 sm:px-8">
                  <div className="relative -mt-[62px] mb-6 h-[112px] w-[112px]">
                    <div className="h-full w-full overflow-hidden rounded-[30px] border-[5px] border-[#111111] bg-[#191919] shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
                      {logoSource ? (
                        <img
                          src={logoSource}
                          alt={vendor.businessName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#17121F]">
                          <span className="font-manrope text-[42px] font-semibold text-[#995DFF]">
                            {firstLetter}
                          </span>
                        </div>
                      )}
                    </div>

                    <label className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#111111] bg-white text-black shadow-lg transition hover:scale-105">
                      <FiCamera size={15} />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-manrope text-[27px] font-semibold tracking-[-0.035em] sm:text-[31px]">
                          {vendor.businessName}
                        </h2>

                        <span
                          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-manrope text-[11px] font-medium ${status.className}`}
                        >
                          {status.icon}
                          {status.text}
                        </span>
                      </div>

                      <p className="mt-3 max-w-[650px] text-left font-manrope text-[14px] leading-6 text-white/40">
                        {vendor.description ||
                          "Add a short description to tell customers more about your business."}
                      </p>
                    </div>

                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.03] sm:flex">
                      <FiEdit3 size={16} className="text-white/30" />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#0D0D0D]">
                    <div className="px-4 py-5 sm:px-6">
                      <p className="font-manrope text-[10px] uppercase tracking-[0.12em] text-white/30">
                        Account
                      </p>

                      <p className="mt-2 font-manrope text-sm font-medium">
                        Vendor
                      </p>
                    </div>

                    <div className="border-l border-white/[0.06] px-4 py-5 sm:px-6">
                      <p className="font-manrope text-[10px] uppercase tracking-[0.12em] text-white/30">
                        Status
                      </p>

                      <p className="mt-2 font-manrope text-sm font-medium capitalize">
                        {vendor.status}
                      </p>
                    </div>

                    <div className="border-l border-white/[0.06] px-4 py-5 sm:px-6">
                      <p className="font-manrope text-[10px] uppercase tracking-[0.12em] text-white/30">
                        Profile
                      </p>

                      <p className="mt-2 font-manrope text-sm font-medium">
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/[0.08] bg-[#111111] p-6 sm:p-7">
                <div className="mb-7">
                  <p className="font-manrope text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    Account
                  </p>

                  <h3 className="mt-2 font-manrope text-[21px] font-semibold">
                    Account owner
                  </h3>

                  <p className="mt-2 text-left font-manrope text-[13px] leading-5 text-white/35">
                    Your vendor account is connected to this information.
                  </p>
                </div>

                <div className="border-t border-white/[0.07] py-5">
                  <div className="mb-3 flex items-center gap-2">
                    <FiUser size={14} className="text-[#995DFF]" />

                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                      Full name
                    </span>
                  </div>

                  <p className="font-manrope text-[15px] font-medium">
                    {displayOwner}
                  </p>
                </div>

                <div className="border-t border-white/[0.07] py-5">
                  <div className="mb-3 flex items-center gap-2">
                    <FiMail size={14} className="text-[#995DFF]" />

                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                      Email address
                    </span>
                  </div>

                  <p className="break-all text-left font-manrope text-[14px] font-medium">
                    {vendor.user?.email || "Not available"}
                  </p>
                </div>

                <div className="border-t border-white/[0.07] py-5">
                  <div className="mb-3 flex items-center gap-2">
                    <FiCalendar size={14} className="text-[#995DFF]" />

                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
                      Vendor status
                    </span>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-manrope text-[11px] font-medium ${status.className}`}
                  >
                    {status.icon}
                    {status.text}
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#111111]"
            >
              <div className="flex items-center justify-between gap-5 border-b border-white/[0.07] px-6 py-6 sm:px-8">
                <div>
                  <p className="font-manrope text-[10px] font-semibold uppercase tracking-[0.16em] text-[#995DFF]">
                    Business details
                  </p>

                  <h3 className="mt-2 font-manrope text-[21px] font-semibold">
                    Edit your profile
                  </h3>

                  <p className="mt-2 text-left font-manrope text-[13px] leading-5 text-white/35">
                    Update the information customers see about your business.
                  </p>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.03] sm:flex">
                  <FiEdit3 size={16} className="text-white/40" />
                </div>
              </div>

              <div className="grid gap-6 px-6 py-7 sm:px-8 lg:grid-cols-2">
                <div className="flex flex-col items-start">
                  <label className="mb-2.5 font-manrope text-[12px] font-medium text-white/55">
                    Business name
                  </label>

                  <input
                    type="text"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    placeholder="Enter your business name"
                    className="h-[52px] w-full rounded-[16px] border border-white/[0.08] bg-[#0B0B0B] px-4 font-manrope text-[14px] text-white outline-none transition placeholder:text-white/20 focus:border-[#995DFF]/60"
                  />
                </div>

                <div className="flex flex-col items-start">
                  <label className="mb-2.5 font-manrope text-[12px] font-medium text-white/55">
                    Business logo
                  </label>

                  <label className="flex h-[52px] w-full cursor-pointer items-center justify-between rounded-[16px] border border-white/[0.08] bg-[#0B0B0B] px-4 transition hover:border-white/[0.14]">
                    <div className="flex min-w-0 items-center gap-3">
                      <FiCamera size={17} className="shrink-0 text-white/35" />

                      <span className="truncate font-manrope text-[13px] text-white/45">
                        {businessLogo ? businessLogo.name : "Choose a new logo"}
                      </span>
                    </div>

                    <span className="shrink-0 font-manrope text-[11px] font-medium text-[#995DFF]">
                      Browse
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex flex-col items-start lg:col-span-2">
                  <div className="mb-2.5 flex w-full items-center justify-between">
                    <label className="font-manrope text-[12px] font-medium text-white/55">
                      Business description
                    </label>

                    <span className="font-manrope text-[11px] text-white/25">
                      {description.length}/500
                    </span>
                  </div>

                  <textarea
                    value={description}
                    maxLength={500}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Tell customers what your business is about..."
                    rows={6}
                    className="w-full resize-none rounded-[16px] border border-white/[0.08] bg-[#0B0B0B] px-4 py-3.5 font-manrope text-[14px] leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-[#995DFF]/60"
                  />
                </div>

                {businessLogo && logoPreview && (
                  <div className="flex items-center justify-between gap-4 rounded-[18px] border border-[#995DFF]/15 bg-[#995DFF]/[0.05] p-3 lg:col-span-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[12px] border border-white/[0.08]">
                        <img
                          src={logoPreview}
                          alt="Selected logo"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 text-left">
                        <p className="truncate font-manrope text-[13px] font-medium">
                          {businessLogo.name}
                        </p>

                        <p className="mt-0.5 font-manrope text-[11px] text-white/35">
                          New logo ready to upload
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBusinessLogo(null)}
                      className="shrink-0 font-manrope text-[12px] text-white/40 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end border-t border-white/[0.07] px-6 py-5 sm:px-8">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex min-w-[145px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-manrope text-[13px] font-semibold text-[#0B0B0B] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VendorProfile;
