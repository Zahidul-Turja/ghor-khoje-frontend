"use client";

import { useState } from "react";
import Link from "next/link";
import useAuthStore from "@/app/_store/authStore";

import { FaChevronLeft } from "react-icons/fa";
import OTPVerificationModal from "../OTPVerificationModal";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const forgetPassword = useAuthStore((state) => state.forgetPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await forgetPassword(email, password);
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md space-y-8 rounded-lg border border-gray-200 px-10 py-12 shadow-md">
        <div>
          <a
            href="/"
            className="absolute left-6 top-6 rounded-full border border-gray-200 p-3"
          >
            <FaChevronLeft />
          </a>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set your new password
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-primary/90 hover:text-primary/80"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary/90 focus:outline-none focus:ring-primary/90 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary/90 focus:outline-none focus:ring-primary/90 sm:text-sm"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/90 focus:ring-offset-2"
            >
              {isLoading ? "Setting..." : "Set password"}
            </button>
          </div>
        </form>
      </div>

      <OTPVerificationModal email={email} />
    </div>
  );
}

export default ForgetPasswordPage;
