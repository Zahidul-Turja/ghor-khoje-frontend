"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { HiMiniFlag } from "react-icons/hi2";

import Listings from "@/app/_components/host_page/Listings";
import ProfileCard from "@/app/_components/host_page/ProfileCard";
import ProfileDescription from "@/app/_components/host_page/ProfileDescription";

import { aboutHost } from "@/app/_lib/apiCalls";

function UserHostPage() {
  const user_id = usePathname().replace("/user/", "");
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        setLoading(true);
        const data = await aboutHost(user_id);
        setHost(data.data);
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    fetchHostData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!host) {
    return (
      <div className="flex h-screen items-center justify-center">
        Host not found
      </div>
    );
  }

  return (
    <div className="flex justify-between px-52 py-8">
      <div className="top-8 flex w-[30%] flex-col gap-8">
        <ProfileCard host={host} />
        <ProfileReviewsCard host={host} />
        <ProfileInfoCard host={host} />
      </div>
      <div className="w-[65%]">
        <ProfileDescription host={host} />
      </div>
    </div>
  );
}

export default UserHostPage;

import { MdFeedback } from "react-icons/md";

function ProfileReviewsCard({ host }) {
  // Function to render horizontal progress bar
  const renderProgressBar = (rating) => {
    const percentage = (rating / 5) * 100;

    return (
      <div className="flex w-full items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Performance metrics configuration
  const performanceMetrics = [
    {
      label: "Average Rating",
      rating: host?.average_rating || 0,
      key: "average_rating",
    },
    {
      label: "Cleanliness",
      rating: host?.cleanliness_rating || 0,
      key: "cleanliness_rating",
    },
    {
      label: "Communication",
      rating: host?.communication_rating || 0,
      key: "communication_rating",
    },
    {
      label: "Financial Transparency",
      rating: host?.financial_transparency_rating || 0,
      key: "financial_transparency_rating",
    },
    {
      label: "Maintenance",
      rating: host?.maintenance_rating || 0,
      key: "maintenance_rating",
    },
    {
      label: "Privacy",
      rating: host?.privacy_rating || 0,
      key: "privacy_rating",
    },
  ];

  return (
    <div>
      <div className="w-full rounded-2xl border border-gray-300 p-4">
        <h3 className="text-lg font-semibold">
          {host?.full_name}'s Performance Matrices
        </h3>
        <div className="px-4 pt-2">
          {performanceMetrics.map((metric, index) => (
            <div
              key={metric.key}
              className={`flex items-center justify-between px-2 py-3 ${
                index < performanceMetrics.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <div className="flex flex-1 flex-col">
                <p className="text-sm font-medium">{metric.label}</p>
                <div className="mt-2 flex items-center gap-2">
                  {renderProgressBar(metric.rating)}
                  <span className="min-w-[45px] text-xs text-gray-600">
                    {metric.rating.toFixed(1)}/5.0
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {metric.rating.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link href={"/"} className="my-5 flex items-center gap-2">
        <MdFeedback className="text-sm" />
        <span className="text-xs font-bold underline">Give Feedback</span>
      </Link>
    </div>
  );
}

import { SiVerizon } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";

function ProfileInfoCard({ host }) {
  return (
    <div>
      <div className="w-full rounded-2xl border border-gray-300 p-4">
        <h3 className="text-lg font-semibold">
          {host.full_name}'s Confirmed Information
        </h3>
        <div className="px-4 pt-2">
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            {host?.profession ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Profession</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            {host?.email ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Email</p>
          </div>
          <div className="flex gap-2 border-b border-gray-300 px-2 py-2">
            {host?.phone ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Phone</p>
          </div>
          <div className="flex gap-2 px-2 py-2">
            {host?.address ? (
              <SiVerizon />
            ) : (
              <RxCross2 className="text-lg text-red-500" />
            )}
            <p className="text-sm">Address</p>
          </div>
        </div>
      </div>
      <Link href={"/"} className="my-5 flex items-center gap-2">
        <HiMiniFlag className="text-sm" />
        <span className="text-xs font-bold underline">Report this user</span>
      </Link>
    </div>
  );
}
