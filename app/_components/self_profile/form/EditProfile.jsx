"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaTimes,
  FaSave,
  FaCamera,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";
import Image from "next/image";
import useAuthStore from "@/app/_store/authStore";

function EditProfile({ user, setEditMode }) {
  const updateProfile = useAuthStore((state) => state.updateProfile);
  // const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    gender: user?.gender || "MALE",
    date_of_birth: user?.date_of_birth || "",
    nid: user?.nid || "",
    profession: user?.profession || "",
    address: user?.address || "",
    country: user?.country || "",
    state: user?.state || "",
    city: user?.city || "",
    languages: user?.languages || "",
    preferred_language: user?.preferred_language || "",
    facebook: user?.facebook || "",
    twitter: user?.twitter || "",
    instagram: user?.instagram || "",
    linkedin: user?.linkedin || "",
    youtube: user?.youtube || "",
    telegram: user?.telegram || "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(
    user?.profile_image ||
      (user?.gender === "MALE"
        ? "/profile-placeholder-male.png"
        : "/profile-placeholder-female.png"),
  );
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(
    user?.cover_image || "/cover-placeholder-1.jpg",
  );

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data for submission
    const submitData = new FormData();

    // Add all text fields
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    // Add images if changed
    if (profileImage) {
      submitData.append("profile_image", profileImage);
    }

    if (coverImage) {
      submitData.append("cover_image", coverImage);
    }

    // Pass the FormData object directly
    await updateProfile(submitData);

    // Close edit mode
    setEditMode(false);
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Cover Image Section */}
      <div className="relative h-64 w-full">
        <div className="absolute inset-0">
          <Image
            src={coverImagePreview}
            alt="Cover image"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-4 right-4 flex items-center">
          <button
            onClick={() => coverInputRef.current.click()}
            className="flex items-center gap-2 rounded-md bg-black bg-opacity-50 px-4 py-2 text-white transition hover:bg-opacity-70"
          >
            <FaCamera className="text-lg" />
            <span>Change Cover</span>
          </button>
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* Profile Image (Positioned at bottom of cover) */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white">
            <Image
              src={profileImagePreview}
              alt="Profile image"
              fill
              className="object-cover"
            />
            <button
              onClick={() => profileInputRef.current.click()}
              className="absolute bottom-0 left-0 right-0 flex h-10 items-center justify-center bg-black bg-opacity-50 text-white transition hover:bg-opacity-70"
            >
              <FaCamera />
            </button>
            <input
              type="file"
              ref={profileInputRef}
              onChange={handleProfileImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {/* Form Header */}
      <div className="sticky right-0 top-0 mt-20 flex items-center justify-between border-b border-gray-200 px-8 pb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border-2 border-gray-700 px-4 py-2 font-semibold text-gray-700 shadow-md transition duration-300 hover:bg-gray-300"
            onClick={() => setEditMode(false)}
          >
            <FaTimes size={14} />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            form="profile-form"
            className="flex items-center gap-2 rounded-md border-2 border-green-700 bg-green-700 px-4 py-2 text-white shadow-md transition duration-300 hover:bg-green-800"
            onClick={handleSubmit}
          >
            <FaSave size={14} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="px-8 py-6">
        <form id="profile-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Info Section */}
            <div className="col-span-full">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Basic Information
              </h2>
            </div>

            {/* Full Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* NID */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                National ID
              </label>
              <input
                type="text"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Profession */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Profession
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Bio */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Location Section */}
            <div className="col-span-full mt-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Location
              </h2>
            </div>

            {/* Address */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* State */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Language Section */}
            <div className="col-span-full mt-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Languages
              </h2>
            </div>

            {/* Languages */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Languages
              </label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="English, Bangla, etc."
              />
            </div>

            {/* Preferred language */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Preferred Language
              </label>
              <input
                type="text"
                name="preferred_language"
                value={formData.preferred_language}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Social Media Section */}
            <div className="col-span-full mt-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Social Media
              </h2>
            </div>

            {/* Facebook */}
            <div className="col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaFacebook className="text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://facebook.com/username"
              />
            </div>

            {/* Twitter */}
            <div className="col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaTwitter className="text-blue-400" />
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://twitter.com/username"
              />
            </div>

            {/* Instagram */}
            <div className="col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaInstagram className="text-pink-600" />
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://instagram.com/username"
              />
            </div>

            {/* LinkedIn */}
            <div className="col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaLinkedin className="text-blue-700" />
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            {/* YouTube */}
            <div className="col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaYoutube className="text-red-600" />
                YouTube
              </label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://youtube.com/channel/channelId"
              />
            </div>

            {/* Telegram */}
            <div className="col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaTelegram className="text-blue-500" />
                Telegram
              </label>
              <input
                type="url"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://t.me/username"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
