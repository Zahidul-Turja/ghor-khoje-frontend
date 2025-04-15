"use client";

import Link from "next/link";
import Image from "next/image";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";

import useAuthStore from "@/app/_store/authStore";
import { applyForHost, hasAppliedForHost } from "@/app/_lib/apiCalls";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function NavMain({ classes }) {
  const [hasApplied, setHasApplied] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const handleHostSubmission = async () => {
    try {
      await applyForHost();
      setHasApplied(true);
      toast.success("Application submitted successfully");
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  useEffect(() => {
    const checkHostApplicationStatus = async () => {
      try {
        const response = await hasAppliedForHost();
        setHasApplied(response.has_applied);
      } catch (error) {
        console.error("Error checking host application status:", error);
      }
    };

    if (isAuthenticated) {
      checkHostApplicationStatus();
    }
  }, [hasApplied]);

  return (
    <nav className={`flex items-center justify-between px-24 py-4 ${classes}`}>
      <Link
        href={"/"}
        className="text-xl font-extrabold uppercase tracking-widest text-primary"
      >
        Ghor Khoje
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href={"/"}
          className="border-b-2 border-gray-700 px-1 text-sm font-bold tracking-wide"
        >
          Buy
        </Link>
        <Link href={"/"} className="px-1 text-sm tracking-wide">
          Rent
        </Link>
        <Link href={"/"} className="px-1 text-sm tracking-wide">
          Sell
        </Link>
      </div>

      {!isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Link
            href={"/auth/login"}
            className="rounded-lg border-2 border-primary px-5 py-1 text-sm font-semibold text-primary"
          >
            Login
          </Link>
          <Link
            href={"/auth/signup"}
            className="rounded-lg border-2 border-primary bg-primary px-5 py-1 text-sm text-white"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-8">
          {user.user_type !== "LANDLORD" &&
            (hasApplied ? (
              <button
                className="rounded-full bg-gray-600 px-2 py-1 text-xs font-normal text-white"
                onClick={handleHostSubmission}
              >
                Applied
              </button>
            ) : (
              <button
                className="cursor-pointer border-b-2 border-gray-600 text-xs font-semibold"
                onClick={handleHostSubmission}
              >
                Become a Host
              </button>
            ))}

          <Link
            href={"/user/profile/?section=profile"}
            className="flex items-center gap-2"
          >
            {user?.profile_image ? (
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={`${BASE_URL}${user?.profile_image}`}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            ) : (
              <CgProfile className="h-8 w-8 rounded-full text-gray-600" />
            )}
            <span className="text-sm font-light text-gray-800">
              {user?.full_name}
            </span>
          </Link>
          <button
            className="text-xl text-primary"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LuLogOut />
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavMain;
