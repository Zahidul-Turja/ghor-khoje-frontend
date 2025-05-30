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
import ApplyForHostModal from "./ApplyForHostModal";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

function NavMain({ classes }) {
  const [hasApplied, setHasApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, user, userInfo, logout } = useAuthStore();
  const router = useRouter();

  const handleHostSubmission = async () => {
    try {
      await applyForHost();
      setHasApplied(true);
      setShowModal(false);
      toast.success("Application submitted successfully");
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  useEffect(() => {
    const checkHostApplicationStatus = async () => {
      try {
        if (user?.user_type !== "LANDLORD") {
          const response = await hasAppliedForHost();
          console.log("Has APPILIED", response);
          setHasApplied(response?.has_applied || false);
        }
      } catch (error) {
        console.error("Error checking host application status:", error);
      }
    };

    if (isAuthenticated) {
      checkHostApplicationStatus();
      userInfo();
    }
  }, [hasApplied]);

  return (
    <>
      <nav
        className={`flex items-center justify-between px-24 py-4 ${classes}`}
      >
        <Link
          href={"/"}
          className="text-xl font-extrabold uppercase tracking-widest text-primary"
        >
          Ghor Khojee
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className="cursor-pointer border-b-2 border-gray-700 px-1 text-sm font-bold tracking-wide"
          >
            Buy
          </Link>
          <Link
            href={"/"}
            className="cursor-pointer px-1 text-sm tracking-wide"
          >
            Rent
          </Link>
          <Link
            href={"/"}
            className="cursor-pointer px-1 text-sm tracking-wide"
          >
            Sell
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link
              href={"/auth/login"}
              className="rounded-xl border-2 border-primary px-5 py-1.5 text-sm font-semibold text-primary"
            >
              Login
            </Link>
            <Link
              href={"/auth/signup"}
              className="rounded-xl border-2 border-primary bg-primary px-5 py-1.5 text-sm text-white"
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            {user?.user_type !== "LANDLORD" &&
              (hasApplied ? (
                <button className="rounded-full bg-gray-600 px-2 py-1 text-xs font-normal text-white">
                  Applied
                </button>
              ) : (
                <button
                  className="cursor-pointer border-b-2 border-gray-600 text-xs font-semibold"
                  onClick={() => {
                    console.log("user type", user?.user_type);
                    setShowModal(true);
                  }}
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
                    src={`${user?.profile_image}`}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-full border border-gray-800 p-1">
                  {user?.gender === "FEMALE" ? (
                    <Image
                      src={"/avatar-female.png"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="h-3 w-3 object-cover"
                    />
                  ) : (
                    <Image
                      src={"/avatar-male.png"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="h-4 w-4 object-cover"
                    />
                  )}
                </div>
              )}
              <span className="text-sm font-semibold text-gray-800">
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
      {showModal && (
        <ApplyForHostModal
          handleHostSubmission={handleHostSubmission}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default NavMain;
