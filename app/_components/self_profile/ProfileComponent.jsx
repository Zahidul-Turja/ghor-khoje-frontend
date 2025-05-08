"use client";

import useAuthStore from "@/app/_store/authStore";
import Image from "next/image";
import { FaMapMarkerAlt, FaBriefcase, FaPen } from "react-icons/fa";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import SocialSection from "./sections/SocialSection";

const NEXT_PUBLIC_BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export default function ProfileComponent({ userData }) {
  const { user } = useAuthStore();

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
    <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Header with cover image */}
      <div className="relative h-48 bg-gradient-to-r from-primary/80 to-primary/70">
        {/* Profile image */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg">
            {user?.profile_image ? (
              <Image
                src={`${NEXT_PUBLIC_BASE_API_ENDPOINT}/${profile_image}`}
                alt={full_name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : user?.gender === "FEMALE" ? (
              <Image
                src={`/avatar-female.png`}
                alt={full_name}
                width={128}
                height={128}
                className="absolute left-[50%] top-[50%] h-20 w-20 translate-x-[-50%] translate-y-[-50%] object-cover"
              />
            ) : (
              <Image
                src={`/avatar-male.png`}
                alt={full_name}
                width={128}
                height={128}
                className="absolute left-[50%] top-[50%] h-20 w-20 translate-x-[-50%] translate-y-[-50%] object-cover"
              />
            )}
          </div>
        </div>

        {/* Edit profile button - just for UI, no functionality */}
        <button className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-gray-900 shadow-md transition duration-300 hover:bg-blue-50">
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
