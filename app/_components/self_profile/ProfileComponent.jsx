"use client";

import useAuthStore from "@/app/_store/authStore";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaBirthdayCake,
  FaIdCard,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPen,
  FaEnvelope,
  FaPhone,
  FaTransgender,
  FaTelegramPlane,
} from "react-icons/fa";

const NEXT_PUBLIC_BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export default function ProfileComponent({ userData }) {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("about");

  if (!user) return null;

  const {
    full_name,
    email,
    phone,
    profile_image,
    bio,
    gender,
    date_of_birth,
    nid,
    user_type,
    profession,
    address,
    languages,
    preferred_language,
    social_links,
  } = user;

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Header with cover image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        {/* Profile image */}
        <div className="absolute -bottom-16 left-8">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <img
              src={`${NEXT_PUBLIC_BASE_API_ENDPOINT}/${profile_image}`}
              alt={full_name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Edit profile button - just for UI, no functionality */}
        <button className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-blue-600 shadow-md transition duration-300 hover:bg-blue-50">
          <FaPen size={14} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Main content */}
      <div className="px-8 pb-8 pt-20">
        {/* Basic info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{full_name}</h1>
          <div className="mt-1 flex items-center gap-2 text-gray-600">
            <FaBriefcase />
            <span>{profession}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt />
            <span>{`${address.city}, ${address.country}`}</span>
          </div>
        </div>

        <AboutSection
          bio={bio}
          gender={gender}
          date_of_birth={date_of_birth}
          languages={languages}
          nid={nid}
          preferred_language={preferred_language}
        />
        <ContactSection email={email} phone={phone} address={address} />
        <SocialSection social_links={social_links} />
      </div>
    </div>
  );
}

function AboutSection({
  bio,
  gender,
  date_of_birth,
  languages,
  preferred_language,
  nid,
}) {
  // Format date of birth
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format languages array
  const formattedLanguages = languages
    .split(",")
    .map((lang) => lang.trim().charAt(0).toUpperCase() + lang.trim().slice(1))
    .join(", ");

  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Biography</h2>
      <p className="mb-8 leading-relaxed text-gray-600">{bio}</p>

      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaTransgender className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium text-gray-800">
              {gender.charAt(0) + gender.slice(1).toLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaBirthdayCake className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium text-gray-800">
              {formatDate(date_of_birth)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaIdCard className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">NID</p>
            <p className="font-medium text-gray-800">{nid}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaGlobe className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Languages</p>
            <p className="font-medium text-gray-800">{formattedLanguages}</p>
            <p className="mt-1 text-sm text-gray-500">
              Preferred:{" "}
              {preferred_language.charAt(0).toUpperCase() +
                preferred_language.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection({ address, phone, email }) {
  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaEnvelope className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaPhone className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">{phone}</p>
          </div>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800">Address</h2>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaMapMarkerAlt className="text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">{address.address}</p>
            <p className="mt-1 text-gray-600">
              {address.city}, {address.state}, {address.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialSection({ social_links }) {
  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Social Media</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {social_links.facebook && (
          <a
            href={social_links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="rounded-full bg-white p-1 text-blue-600">
              <FaFacebook className="text-3xl" />
            </div>
            <span className="font-medium">Facebook</span>
          </a>
        )}

        {social_links.twitter && (
          <a
            href={social_links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="rounded-full bg-blue-400 p-2 text-white">
              <FaTwitter className="text-lg" />
            </div>
            <span className="font-medium">Twitter</span>
          </a>
        )}

        {social_links.instagram && (
          <a
            href={social_links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="rounded-full bg-pink-600 p-3 text-white">
              <FaInstagram />
            </div>
            <span className="font-medium">Instagram</span>
          </a>
        )}

        {social_links.linkedin && (
          <a
            href={social_links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="rounded-full bg-blue-700 p-3 text-white">
              <FaLinkedin />
            </div>
            <span className="font-medium">LinkedIn</span>
          </a>
        )}

        {social_links.youtube && (
          <a
            href={social_links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="rounded-full bg-red-600 p-3 text-white">
              <FaYoutube />
            </div>
            <span className="font-medium">YouTube</span>
          </a>
        )}
        {social_links.telegram && (
          <a
            href={social_links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="rounded-full bg-[#0088CC] p-3 text-white">
              <FaTelegramPlane />
            </div>
            <span className="font-medium">Telegram</span>
          </a>
        )}
      </div>
    </div>
  );
}
