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
        const response = await hasAppliedForHost();
        setHasApplied(response.has_applied);
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
                <button className="rounded-full bg-gray-600 px-2 py-1 text-xs font-normal text-white">
                  Applied
                </button>
              ) : (
                <button
                  className="cursor-pointer border-b-2 border-gray-600 text-xs font-semibold"
                  onClick={() => {
                    console.log("user type", user.user_type);
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
function ApplyForHostModal({ handleHostSubmission, setShowModal }) {
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setShowModal(false);
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold">Apply for Host</h2>
        <p>Are you sure you want to apply for host?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="cursor-pointer rounded-lg border-2 border-gray-600 px-5 py-1 text-sm font-semibold text-gray-600"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
          <button
            className="cursor-pointer rounded-lg border-2 bg-primary px-5 py-1 text-sm font-semibold text-white"
            onClick={handleHostSubmission}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
