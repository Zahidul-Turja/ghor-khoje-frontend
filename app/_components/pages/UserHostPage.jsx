"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ProfileCard from "@/app/_components/host_page/ProfileCard";
import ProfileDescription from "@/app/_components/host_page/ProfileDescription";
import ProfileInfoCard from "../host_page/ProfileInfoCard";
import ProfileReviewsCard from "../host_page/ProfileReviewsCard";

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
