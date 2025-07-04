"use client";

import Link from "next/link";
import Image from "next/image";
import { LuLogOut, LuMenu, LuX } from "react-icons/lu";
import toast from "react-hot-toast";

import useAuthStore from "@/app/_store/authStore";
import { applyForHost, hasAppliedForHost } from "@/app/_lib/apiCalls";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApplyForHostModal from "./ApplyForHostModal";

function NavMain({ classes }) {
  const [hasApplied, setHasApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, userInfo, logout, setTheme } = useAuthStore();
  const theme = useAuthStore((state) => state.theme);
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
        className={`flex items-center justify-between px-3 py-4 md:px-24 ${classes}`}
      >
        {/* Logo */}
        <Link
          href={"/"}
          className="text-lg font-extrabold uppercase tracking-widest text-primary md:text-xl"
        >
          Ghor Khojee
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href={"/"}
            className="cursor-pointer border-b-2 border-gray-700 px-1 text-sm font-bold tracking-wide dark:border-gray-50"
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

        {/* Desktop Auth Section */}
        <div className="hidden items-center md:flex">
          <button
            id="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-6 rounded-full bg-gray-200 p-2 transition-colors duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            aria-label="Toggle Theme"
          >
            {/* Sun icon (light mode button for dark theme) */}
            {theme === "dark" ? (
              <svg
                className="h-5 w-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.243l-.707-.707M4.222 19.778l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                />
              </svg>
            ) : (
              // Moon icon (dark mode button for light theme)
              <svg
                className="h-5 w-5 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 116.707 2.707 8.001 8.001 0 0017.293 13.293z" />
              </svg>
            )}
          </button>
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
                  <button className="rounded-full bg-gray-600 px-2 py-1 text-xs font-normal text-white dark:bg-gray-700 dark:text-gray-50">
                    Applied
                  </button>
                ) : (
                  <button
                    className="cursor-pointer border-b-2 border-gray-600 text-xs font-semibold dark:border-gray-50"
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
                  <div className="relative h-8 w-8 overflow-hidden rounded-full dark:border-gray-100">
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
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-50">
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
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex items-center justify-center md:hidden">
          <button
            id="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2 rounded-full bg-gray-200 p-1 transition-colors duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            aria-label="Toggle Theme"
          >
            {/* Sun icon (light mode button for dark theme) */}
            {theme === "dark" ? (
              <svg
                className="h-4 w-4 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.243l-.707-.707M4.222 19.778l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                />
              </svg>
            ) : (
              // Moon icon (dark mode button for light theme)
              <svg
                className="h-4 w-4 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 116.707 2.707 8.001 8.001 0 0017.293 13.293z" />
              </svg>
            )}
          </button>
          <button
            className="text-2xl text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 w-screen bg-black bg-opacity-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-lg dark:bg-gray-900">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
              <span className="text-lg font-bold text-primary">Menu</span>
              <button
                className="text-2xl text-gray-600"
                onClick={closeMobileMenu}
              >
                <LuX />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col p-4">
              {/* Navigation Links */}
              <div className="flex flex-col gap-4 border-b pb-4 dark:border-gray-700">
                <Link
                  href={"/"}
                  className="cursor-pointer px-1 text-base font-bold tracking-wide text-primary"
                  onClick={closeMobileMenu}
                >
                  Buy
                </Link>
                <Link
                  href={"/"}
                  className="cursor-pointer px-1 text-base tracking-wide"
                  onClick={closeMobileMenu}
                >
                  Rent
                </Link>
                <Link
                  href={"/"}
                  className="cursor-pointer px-1 text-base tracking-wide"
                  onClick={closeMobileMenu}
                >
                  Sell
                </Link>
              </div>

              {/* Mobile Auth Section */}
              {!isAuthenticated ? (
                <div className="flex flex-col gap-4 pt-4">
                  <Link
                    href={"/auth/login"}
                    className="rounded-xl border-2 border-primary px-5 py-2.5 text-center text-base font-semibold text-primary"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href={"/auth/signup"}
                    className="rounded-xl border-2 border-primary bg-primary px-5 py-2.5 text-center text-base text-white"
                    onClick={closeMobileMenu}
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-4">
                  {/* User Profile Section */}
                  <Link
                    href={"/user/profile/?section=profile"}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                    onClick={closeMobileMenu}
                  >
                    {user?.profile_image ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={`${user?.profile_image}`}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
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
                            className="h-8 w-8 object-cover"
                          />
                        ) : (
                          <Image
                            src={"/avatar-male.png"}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-cover"
                          />
                        )}
                      </div>
                    )}
                    <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
                      {user?.full_name}
                    </span>
                  </Link>

                  {/* Host Application */}
                  {user?.user_type !== "LANDLORD" &&
                    (hasApplied ? (
                      <div className="rounded-full bg-gray-600 px-4 py-2 text-center text-sm font-normal text-white">
                        Applied for Host
                      </div>
                    ) : (
                      <button
                        className="cursor-pointer rounded-lg border-2 border-gray-600 px-4 py-2 text-sm font-semibold"
                        onClick={() => {
                          console.log("user type", user?.user_type);
                          setShowModal(true);
                          closeMobileMenu();
                        }}
                      >
                        Become a Host
                      </button>
                    ))}

                  {/* Logout Button */}
                  <button
                    className="flex items-center gap-3 rounded-lg p-2 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      logout();
                      router.push("/");
                      closeMobileMenu();
                    }}
                  >
                    <LuLogOut className="text-xl" />
                    <span className="text-base font-semibold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
